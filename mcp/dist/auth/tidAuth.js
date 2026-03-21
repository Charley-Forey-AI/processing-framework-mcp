import { createHash, randomBytes } from "node:crypto";
import { sanitizeForLogs } from "../utils/sanitize.js";
export class TidAuthService {
    config;
    tokenStore;
    pendingByState = new Map();
    constructor(config, tokenStore) {
        this.config = config;
        this.tokenStore = tokenStore;
    }
    async initialize() {
        await this.tokenStore.initialize();
    }
    getStatus() {
        const token = this.tokenStore.get();
        return {
            authenticated: Boolean(token?.accessToken),
            expires_at: token?.expiresAt,
            has_refresh_token: Boolean(token?.refreshToken),
        };
    }
    createLoginUrl(redirectUri) {
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
            instructions: "Open login_url in a browser, sign in, then call pf_tid_exchange_code with the returned code and state when available.",
        };
    }
    async exchangeCode(args) {
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
    async getValidAccessToken() {
        const token = this.tokenStore.get();
        if (!token?.accessToken) {
            throw new Error("Not authenticated. Call pf_tid_login_url then pf_tid_exchange_code.");
        }
        if (token.expiresAt && token.expiresAt <= Date.now() + 60_000) {
            if (!token.refreshToken) {
                throw new Error("Access token expired and no refresh token is available.");
            }
            await this.refresh(token.refreshToken);
        }
        const refreshed = this.tokenStore.get();
        if (!refreshed?.accessToken) {
            throw new Error("Unable to resolve a valid access token.");
        }
        return refreshed.accessToken;
    }
    async clearToken() {
        await this.tokenStore.clear();
    }
    async refresh(refreshToken) {
        const body = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: this.config.tidClientId,
        });
        const json = await this.postTokenRequest(body);
        await this.saveTokenResponse(json);
    }
    resolvePending(state) {
        if (state) {
            const byState = this.pendingByState.get(state);
            if (!byState) {
                throw new Error("Unknown state. Call pf_tid_login_url again and retry.");
            }
            return byState;
        }
        const latest = [...this.pendingByState.values()].sort((a, b) => b.createdAt - a.createdAt)[0];
        if (!latest) {
            throw new Error("No pending login request found. Call pf_tid_login_url before exchanging code.");
        }
        return latest;
    }
    async postTokenRequest(body) {
        const response = await fetch(this.config.tidTokenUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });
        const text = await response.text();
        let parsed = undefined;
        try {
            parsed = text ? JSON.parse(text) : undefined;
        }
        catch {
            parsed = text;
        }
        if (!response.ok) {
            throw new Error("Token request failed (" +
                response.status +
                "): " +
                (typeof parsed === "string"
                    ? parsed
                    : JSON.stringify(sanitizeForLogs(parsed))));
        }
        if (!parsed || typeof parsed !== "object") {
            throw new Error("Token endpoint returned an invalid payload.");
        }
        return parsed;
    }
    async saveTokenResponse(response) {
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
function base64Url(value) {
    return value
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}
