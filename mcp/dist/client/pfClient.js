export class PfApiError extends Error {
    status;
    responseBody;
    constructor(message, status, responseBody) {
        super(message);
        this.status = status;
        this.responseBody = responseBody;
    }
}
export class PfClient {
    config;
    auth;
    constructor(config, auth) {
        this.config = config;
        this.auth = auth;
    }
    async request(method, path, options) {
        if (options?.autoPaginate && method === "GET") {
            return this.requestWithAutoPagination(path, options.query);
        }
        return this.requestSingle(method, path, options);
    }
    async requestSingle(method, path, options) {
        const accessToken = await this.auth.getValidAccessToken();
        const url = this.toUrl(path, options?.query);
        const hasBody = options?.body !== undefined && method !== "GET" && method !== "DELETE";
        const timeoutMs = this.config.pfTimeoutMs;
        let response = undefined;
        let lastError = undefined;
        for (let attempt = 0; attempt <= this.config.pfRetryCount; attempt++) {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), timeoutMs);
            try {
                response = await fetch(url.toString(), {
                    method,
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        ...(hasBody ? { "Content-Type": "application/json" } : {}),
                    },
                    body: hasBody ? JSON.stringify(options?.body) : undefined,
                    signal: controller.signal,
                });
                clearTimeout(timeout);
            }
            catch (error) {
                clearTimeout(timeout);
                lastError = error;
                if (attempt < this.config.pfRetryCount) {
                    await this.sleep(this.backoffMs(attempt));
                    continue;
                }
                throw error;
            }
            if (response.status >= 500 && attempt < this.config.pfRetryCount) {
                await this.sleep(this.backoffMs(attempt));
                continue;
            }
            break;
        }
        if (!response) {
            throw new Error(`Request failed after retries: ${String(lastError)}`);
        }
        const requestId = response.headers.get("tpaas-request-id") ?? undefined;
        const text = await response.text();
        let data = undefined;
        try {
            data = text ? JSON.parse(text) : undefined;
        }
        catch {
            data = text;
        }
        if (response.status === 401) {
            await this.auth.clearToken();
        }
        if (!response.ok) {
            throw new PfApiError(`PF API request failed: ${method} ${path} (${response.status})`, response.status, data);
        }
        return {
            status: response.status,
            request_id: requestId,
            data,
        };
    }
    async requestWithAutoPagination(path, query) {
        const mergedItems = [];
        let page = Number(query?.page ?? 1);
        const perPage = Number(query?.per_page ?? 50);
        let lastResponse;
        let totalPages = Number.POSITIVE_INFINITY;
        while (page <= totalPages) {
            const currentQuery = { ...(query ?? {}), page, per_page: perPage };
            const response = await this.requestSingle("GET", path, { query: currentQuery });
            lastResponse = response;
            const data = response.data;
            const items = Array.isArray(data?.items) ? data.items : [];
            mergedItems.push(...items);
            const maybeTotalPages = Number(data?.total_pages ?? page);
            totalPages = Number.isFinite(maybeTotalPages) && maybeTotalPages > 0 ? maybeTotalPages : page;
            if (page >= totalPages)
                break;
            page += 1;
        }
        return {
            status: lastResponse?.status ?? 200,
            request_id: lastResponse?.request_id,
            data: {
                ...(typeof lastResponse?.data === "object" && lastResponse?.data !== null
                    ? lastResponse.data
                    : {}),
                items: mergedItems,
                auto_paginated: true,
            },
        };
    }
    toUrl(path, query) {
        const base = this.config.pfApiBaseUrl.endsWith("/")
            ? this.config.pfApiBaseUrl
            : `${this.config.pfApiBaseUrl}/`;
        const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
        const url = new URL(normalizedPath, base);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value === undefined || value === null)
                    continue;
                if (Array.isArray(value)) {
                    for (const item of value) {
                        url.searchParams.append(key, String(item));
                    }
                }
                else {
                    url.searchParams.set(key, String(value));
                }
            }
        }
        return url;
    }
    backoffMs(attempt) {
        const base = 250 * Math.pow(2, attempt);
        const jitter = Math.floor(Math.random() * 100);
        return base + jitter;
    }
    async sleep(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }
}
