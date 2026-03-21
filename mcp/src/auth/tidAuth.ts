import { createHash, randomBytes } from "node:crypto";
import { AsyncLocalStorage } from "node:async_hooks";

import type { PfMcpConfig } from "../config.js";
import { sanitizeForLogs } from "../utils/sanitize.js";
import { TokenStore } from "./tokenStore.js";

type PendingPkce = {
  state: string;
  verifier: string;
  redirectUri: string;
  createdAt: number;
};

type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
};

export type TidAuthSource = "ambient" | "cached" | "pkce";

export type TidAuthContext = {
  ambientToken?: string;
  headers?: Record<string, string | undefined>;
};

export type ResolvedTidToken = {
  token: string;
  source: TidAuthSource;
  expiresAt?: number;
  scopesOk: boolean;
};

export class TidAuthService {
  private readonly pendingByState = new Map<string, PendingPkce>();
  private readonly requestContext = new AsyncLocalStorage<TidAuthContext>();

  constructor(
    private readonly config: PfMcpConfig,
    private readonly tokenStore: TokenStore,
  ) {}

  async initialize(): Promise<void> {
    await this.tokenStore.initialize();
  }

  async runWithRequestContext<T>(
    context: TidAuthContext,
    handler: () => Promise<T>,
  ): Promise<T> {
    return await this.requestContext.run(context, handler);
  }

  getRequestContext(): TidAuthContext | undefined {
    return this.requestContext.getStore();
  }

  getStatus(context?: TidAuthContext): {
    authenticated: boolean;
    expires_at?: number;
    expires_in?: number;
    has_refresh_token: boolean;
    auth_source?: TidAuthSource;
    scopes_ok?: boolean;
  } {
    const ambientToken = this.extractAmbientToken(context ?? this.requestContext.getStore());
    if (ambientToken && this.config.tidAllowAmbientToken) {
      const validation = this.validateAmbientToken(ambientToken);
      if (validation.valid) {
        return {
          authenticated: true,
          expires_at: validation.expiresAt,
          expires_in:
            validation.expiresAt && validation.expiresAt > Date.now()
              ? Math.floor((validation.expiresAt - Date.now()) / 1000)
              : undefined,
          has_refresh_token: false,
          auth_source: "ambient",
          scopes_ok: validation.scopesOk,
        };
      }
    }

    const token = this.tokenStore.get();
    return {
      authenticated: Boolean(token?.accessToken && this.isNotExpiringSoon(token.expiresAt)),
      expires_at: token?.expiresAt,
      expires_in:
        token?.expiresAt && token.expiresAt > Date.now()
          ? Math.floor((token.expiresAt - Date.now()) / 1000)
          : undefined,
      has_refresh_token: Boolean(token?.refreshToken),
      auth_source: token?.accessToken ? "cached" : undefined,
      scopes_ok: true,
    };
  }

  createLoginUrl(redirectUri?: string): {
    login_url: string;
    state: string;
    redirect_uri: string;
    instructions: string;
  } {
    const verifier = base64Url(randomBytes(48));
    const challenge = base64Url(createHash("sha256").update(verifier).digest());
    const state = base64Url(randomBytes(24));
    const effectiveRedirect = redirectUri ?? this.config.tidRedirectUri;

    this.pendingByState.set(state, {
      state,
      verifier,
      redirectUri: effectiveRedirect,
      createdAt: Date.now(),
    });

    const url = new URL(this.config.tidAuthorizeUrl);
    url.searchParams.set("client_id", this.config.tidClientId);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("redirect_uri", effectiveRedirect);
    url.searchParams.set("scope", this.config.tidScope);
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge", challenge);
    url.searchParams.set("code_challenge_method", "S256");

    return {
      login_url: url.toString(),
      state,
      redirect_uri: effectiveRedirect,
      instructions:
        "Open login_url in a browser, sign in, then call pf_tid_exchange_code with the returned code and state when available.",
    };
  }

  async exchangeCode(args: {
    code: string;
    state?: string;
    redirect_uri?: string;
  }): Promise<{ ok: true; expires_at?: number }> {
    const pending = this.resolvePending(args.state);
    const redirectUri = args.redirect_uri ?? pending.redirectUri;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: args.code,
      client_id: this.config.tidClientId,
      redirect_uri: redirectUri,
      code_verifier: pending.verifier,
    });

    const json = await this.postTokenRequest(body);
    await this.saveTokenResponse(json);

    this.pendingByState.delete(pending.state);
    return { ok: true, expires_at: this.tokenStore.get()?.expiresAt };
  }

  async getValidAccessToken(
    context?: TidAuthContext,
    options?: { excludeSources?: TidAuthSource[] },
  ): Promise<string> {
    const resolved = await this.resolveAccessToken(context, options);
    return resolved.token;
  }

  async resolveAccessToken(
    context?: TidAuthContext,
    options?: { excludeSources?: TidAuthSource[] },
  ): Promise<ResolvedTidToken> {
    const excluded = new Set(options?.excludeSources ?? []);
    const sourceOrder = this.config.tidTokenSourceOrder.filter((x): x is TidAuthSource =>
      x === "ambient" || x === "cached" || x === "pkce",
    );
    let ambientFailure: string | undefined = undefined;

    for (const source of sourceOrder) {
      if (excluded.has(source)) continue;

      if (source === "ambient") {
        if (!this.config.tidAllowAmbientToken) continue;
        const ambientToken = this.extractAmbientToken(context ?? this.requestContext.getStore());
        if (!ambientToken) continue;

        const validation = this.validateAmbientToken(ambientToken);
        if (validation.valid) {
          return {
            token: ambientToken,
            source: "ambient",
            expiresAt: validation.expiresAt,
            scopesOk: validation.scopesOk,
          };
        }
        ambientFailure = validation.reason;
        continue;
      }

      if (source === "cached") {
        const token = this.tokenStore.get();
        if (!token?.accessToken) continue;

        if (!this.isNotExpiringSoon(token.expiresAt)) {
          if (!token.refreshToken) continue;
          try {
            await this.refresh(token.refreshToken);
          } catch {
            continue;
          }
        }

        const refreshed = this.tokenStore.get();
        if (!refreshed?.accessToken || !this.isNotExpiringSoon(refreshed.expiresAt)) {
          continue;
        }
        return {
          token: refreshed.accessToken,
          source: "cached",
          expiresAt: refreshed.expiresAt,
          scopesOk: true,
        };
      }
    }

    const configuredScopes = this.config.tidScope
      .split(" ")
      .map((x) => x.trim())
      .filter(Boolean);
    const identityScopes = new Set(["openid", "profile", "email", "offline_access"]);
    const hasOnlyIdentityScopes =
      configuredScopes.length > 0 && configuredScopes.every((scope) => identityScopes.has(scope));
    const scopeHint =
      configuredScopes.length === 0 ||
      this.config.tidScope.trim() === "openid" ||
      hasOnlyIdentityScopes;
    const baseMessage =
      scopeHint
        ? "Not authenticated. TID_SCOPE currently resolves to openid only; include PF API scopes, then call pf_tid_login_url and pf_tid_exchange_code."
        : "Not authenticated. Call pf_tid_login_url then pf_tid_exchange_code.";
    throw new Error(
      ambientFailure
        ? `${baseMessage} Ambient token was ignored: ${ambientFailure} If this is a Studio token, set TID_ALLOWED_AUDIENCES to include the Studio audience/client.`
        : baseMessage,
    );
  }

  async invalidateSource(source: TidAuthSource): Promise<void> {
    if (source === "cached") {
      await this.clearToken();
    }
  }

  async clearToken(): Promise<void> {
    await this.tokenStore.clear();
  }

  private isNotExpiringSoon(expiresAt?: number): boolean {
    if (!expiresAt) return true;
    return expiresAt > Date.now() + 60_000;
  }

  private extractAmbientToken(context?: TidAuthContext): string | undefined {
    if (context?.ambientToken) return context.ambientToken;
    if (!context?.headers) return undefined;
    const configured = this.config.tidAmbientTokenHeader.toLowerCase();
    const direct = context.headers[configured];
    if (direct) return this.parseTokenFromHeaderValue(direct);
    const auth = context.headers.authorization;
    if (auth) return this.parseTokenFromHeaderValue(auth);
    return undefined;
  }

  private parseTokenFromHeaderValue(value: string): string {
    const raw = value.trim();
    const bearerPrefix = "bearer ";
    if (raw.toLowerCase().startsWith(bearerPrefix)) {
      return raw.slice(bearerPrefix.length).trim();
    }
    return raw;
  }

  private validateAmbientToken(token: string): {
    valid: boolean;
    expiresAt?: number;
    scopesOk: boolean;
    reason?: string;
  } {
    const payload = this.decodeJwtPayload(token);
    if (!payload) {
      return { valid: false, scopesOk: false, reason: "token is not a parseable JWT." };
    }

    const expClaim = payload.exp;
    const expiresAt =
      typeof expClaim === "number" ? expClaim * 1000 : typeof expClaim === "string" ? Number(expClaim) * 1000 : undefined;
    if (!expiresAt || !Number.isFinite(expiresAt)) {
      return { valid: false, scopesOk: false, reason: "missing exp claim." };
    }
    if (!this.isNotExpiringSoon(expiresAt)) {
      return { valid: false, expiresAt, scopesOk: false, reason: "token is expired or nearly expired." };
    }

    const expectedIssuerHost = new URL(this.config.tidAuthorizeUrl).host;
    const issuer = typeof payload.iss === "string" ? payload.iss : "";
    let issuerHost = "";
    try {
      issuerHost = issuer ? new URL(issuer).host : "";
    } catch {
      issuerHost = "";
    }
    if (!issuer || issuerHost !== expectedIssuerHost) {
      return { valid: false, expiresAt, scopesOk: false, reason: "issuer mismatch." };
    }

    const audienceClaim = payload.aud;
    const audiences = Array.isArray(audienceClaim)
      ? audienceClaim.map((x) => String(x))
      : audienceClaim
        ? [String(audienceClaim)]
        : [];
    const allowedAudiences = new Set(this.config.tidAllowedAudiences);
    if (audiences.length > 0 && !audiences.some((aud) => allowedAudiences.has(aud))) {
      return { valid: false, expiresAt, scopesOk: false, reason: "audience mismatch." };
    }

    const scopeSet = new Set<string>();
    if (typeof payload.scope === "string") {
      for (const part of payload.scope.split(" ").map((x) => x.trim()).filter(Boolean)) {
        scopeSet.add(part);
      }
    }
    if (Array.isArray(payload.scp)) {
      for (const part of payload.scp.map((x) => String(x).trim()).filter(Boolean)) {
        scopeSet.add(part);
      }
    }
    const missingScopes = this.config.tidRequiredScopes.filter((scope) => !scopeSet.has(scope));
    if (missingScopes.length > 0) {
      return {
        valid: false,
        expiresAt,
        scopesOk: false,
        reason: `missing required scope(s): ${missingScopes.join(", ")}.`,
      };
    }

    return { valid: true, expiresAt, scopesOk: true };
  }

  private decodeJwtPayload(token: string): Record<string, unknown> | undefined {
    const parts = token.split(".");
    if (parts.length < 2) return undefined;
    try {
      const payload = parts[1];
      const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
      const decoded = Buffer.from(padded, "base64").toString("utf8");
      const parsed = JSON.parse(decoded) as unknown;
      if (parsed && typeof parsed === "object") {
        return parsed as Record<string, unknown>;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  private async refresh(refreshToken: string): Promise<void> {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: this.config.tidClientId,
    });

    const json = await this.postTokenRequest(body);
    await this.saveTokenResponse(json);
  }

  private resolvePending(state?: string): PendingPkce {
    if (state) {
      const byState = this.pendingByState.get(state);
      if (!byState) {
        throw new Error("Unknown state. Call pf_tid_login_url again and retry.");
      }
      return byState;
    }

    const latest = [...this.pendingByState.values()].sort(
      (a, b) => b.createdAt - a.createdAt,
    )[0];

    if (!latest) {
      throw new Error(
        "No pending login request found. Call pf_tid_login_url before exchanging code.",
      );
    }

    return latest;
  }

  private async postTokenRequest(body: URLSearchParams): Promise<TokenResponse> {
    const response = await fetch(this.config.tidTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const text = await response.text();
    let parsed: unknown = undefined;

    try {
      parsed = text ? (JSON.parse(text) as unknown) : undefined;
    } catch {
      parsed = text;
    }

    if (!response.ok) {
      throw new Error(
        "Token request failed (" +
          response.status +
          "): " +
          (typeof parsed === "string"
            ? parsed
            : JSON.stringify(sanitizeForLogs(parsed))),
      );
    }

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Token endpoint returned an invalid payload.");
    }

    return parsed as TokenResponse;
  }

  private async saveTokenResponse(response: TokenResponse): Promise<void> {
    if (!response.access_token) {
      throw new Error("Token response missing access_token.");
    }

    const previous = this.tokenStore.get();
    const expiresAt = response.expires_in
      ? Date.now() + response.expires_in * 1000
      : previous?.expiresAt;

    await this.tokenStore.set({
      accessToken: response.access_token,
      refreshToken: response.refresh_token ?? previous?.refreshToken,
      expiresAt,
    });
  }
}

function base64Url(value: Buffer): string {
  return value
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
