import type { PfMcpConfig } from "../config.js";
import { TidAuthService, type TidAuthContext, type TidAuthSource } from "../auth/tidAuth.js";

export class PfApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly responseBody: unknown,
  ) {
    super(message);
  }
}

export class PfClient {
  constructor(
    private readonly config: PfMcpConfig,
    private readonly auth: TidAuthService,
  ) {}

  async request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    options?: {
      query?: Record<string, unknown>;
      body?: unknown;
      autoPaginate?: boolean;
      authContext?: TidAuthContext;
      excludeSources?: TidAuthSource[];
    },
  ): Promise<{
    status: number;
    request_id?: string;
    data: unknown;
  }> {
    if (options?.autoPaginate && method === "GET") {
      return this.requestWithAutoPagination(path, options.query, options.authContext);
    }

    return this.requestSingle(method, path, options);
  }

  private async requestSingle(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    options?: {
      query?: Record<string, unknown>;
      body?: unknown;
      authContext?: TidAuthContext;
      excludeSources?: TidAuthSource[];
    },
  ): Promise<{
    status: number;
    request_id?: string;
    data: unknown;
  }> {
    const url = this.toUrl(path, options?.query);
    const hasBody = options?.body !== undefined && method !== "GET" && method !== "DELETE";
    const timeoutMs = this.config.pfTimeoutMs;
    const authContext = options?.authContext;

    const excludeSources = options?.excludeSources ?? [];
    const resolvedToken = await this.auth.resolveAccessToken(authContext, { excludeSources });

    let response: Response | undefined = undefined;
    let lastError: unknown = undefined;
    for (let attempt = 0; attempt <= this.config.pfRetryCount; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        response = await fetch(url.toString(), {
          method,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${resolvedToken.token}`,
            ...(hasBody ? { "Content-Type": "application/json" } : {}),
          },
          body: hasBody ? JSON.stringify(options?.body) : undefined,
          signal: controller.signal,
        });
        clearTimeout(timeout);
      } catch (error) {
        clearTimeout(timeout);
        lastError = error;
        if (attempt < this.config.pfRetryCount) {
          await this.sleep(this.backoffMs(attempt));
          continue;
        }
        throw error;
      }

      if ((response.status >= 500 || response.status === 429) && attempt < this.config.pfRetryCount) {
        await this.sleep(this.retryDelayMs(response, attempt));
        continue;
      }
      break;
    }

    if (!response) {
      throw new Error(`Request failed after retries: ${String(lastError)}`);
    }

    const requestId = response.headers.get("tpaas-request-id") ?? undefined;
    const text = await response.text();
    let data: unknown = undefined;

    try {
      data = text ? (JSON.parse(text) as unknown) : undefined;
    } catch {
      data = text;
    }

    if (response.status === 401) {
      await this.auth.invalidateSource(resolvedToken.source);
      if (excludeSources.includes(resolvedToken.source)) {
        await this.auth.clearToken();
      } else {
        try {
          return await this.requestSingle(method, path, {
            query: options?.query,
            body: options?.body,
            authContext: options?.authContext,
            excludeSources: [...excludeSources, resolvedToken.source],
          });
        } catch (fallbackError) {
          if (resolvedToken.source === "cached") {
            throw new PfApiError(
              "PF API rejected the exchanged TID token (401). The token is valid for login but likely missing PF API scopes or client entitlement/subscription for this API.",
              401,
              data,
            );
          }
          throw fallbackError;
        }
      }
    }

    if (!response.ok) {
      throw new PfApiError(
        `PF API request failed: ${method} ${path} (${response.status})`,
        response.status,
        data,
      );
    }

    return {
      status: response.status,
      request_id: requestId,
      data,
    };
  }

  private async requestWithAutoPagination(
    path: string,
    query?: Record<string, unknown>,
    authContext?: TidAuthContext,
  ): Promise<{
    status: number;
    request_id?: string;
    data: unknown;
  }> {
    const mergedItems: unknown[] = [];
    let page = Number(query?.page ?? 1);
    const perPage = Number(query?.per_page ?? 50);
    const maxPages = Number(query?.max_pages ?? Number.POSITIVE_INFINITY);
    let lastResponse:
      | {
          status: number;
          request_id?: string;
          data: unknown;
        }
      | undefined;
    let totalPages = Number.POSITIVE_INFINITY;
    let pagesFetched = 0;
    let truncated = false;

    while (page <= totalPages && pagesFetched < maxPages) {
      const currentQuery = { ...(query ?? {}), page, per_page: perPage };
      const response = await this.requestSingle("GET", path, { query: currentQuery, authContext });
      lastResponse = response;
      pagesFetched += 1;

      const data =
        response.data && typeof response.data === "object"
          ? (response.data as Record<string, unknown>)
          : {};
      const items = Array.isArray(data.items) ? data.items : [];
      mergedItems.push(...items);

      const maybeTotalPages = Number(data?.total_pages ?? page);
      totalPages = Number.isFinite(maybeTotalPages) && maybeTotalPages > 0 ? maybeTotalPages : page;
      if (page >= totalPages) break;
      page += 1;
    }
    if (page <= totalPages && pagesFetched >= maxPages) truncated = true;

    return {
      status: lastResponse?.status ?? 200,
      request_id: lastResponse?.request_id,
      data: {
        ...(typeof lastResponse?.data === "object" && lastResponse?.data !== null
          ? (lastResponse.data as Record<string, unknown>)
          : {}),
        items: mergedItems,
        auto_paginated: true,
        pages_fetched: pagesFetched,
        total_items: mergedItems.length,
        truncated,
      },
    };
  }

  private toUrl(path: string, query?: Record<string, unknown>): URL {
    const base = this.config.pfApiBaseUrl.endsWith("/")
      ? this.config.pfApiBaseUrl
      : `${this.config.pfApiBaseUrl}/`;
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(normalizedPath, base);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
          for (const item of value) {
            url.searchParams.append(key, String(item));
          }
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url;
  }

  private backoffMs(attempt: number): number {
    const base = 250 * Math.pow(2, attempt);
    const jitter = Math.floor(Math.random() * 100);
    return base + jitter;
  }

  private retryDelayMs(response: Response, attempt: number): number {
    const retryAfter = response.headers.get("retry-after");
    if (retryAfter) {
      const retrySeconds = Number(retryAfter);
      if (Number.isFinite(retrySeconds) && retrySeconds >= 0) {
        return retrySeconds * 1000;
      }
    }
    return this.backoffMs(attempt);
  }

  private async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
