import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { TidAuthService } from "../src/auth/tidAuth.js";
import { TokenStore } from "../src/auth/tokenStore.js";
import type { PfMcpConfig } from "../src/config.js";

const baseConfig: PfMcpConfig = {
  mcpHost: "127.0.0.1",
  mcpPort: 3000,
  mcpPath: "/mcp",
  mcpCorsOrigins: ["*"],
  mcpApiKey: undefined,
  mcpSessionTtlMs: 1800000,
  pfApiBaseUrl: "https://cloud.dev.api.trimblecloud.com/Processing/testapi/1",
  pfTimeoutMs: 20000,
  pfRetryCount: 1,
  pfReadOnlyMode: false,
  pfMutationAllowlist: [],
  pfMutationDenylist: [],
  pfRequireMutationConfirmation: false,
  tidClientId: "client-id",
  tidRedirectUri: "http://localhost:8765/callback",
  tidScope: "openid processing.read",
  tidAuthorizeUrl: "https://id.trimble.com/oauth/authorize",
  tidTokenUrl: "https://id.trimble.com/oauth/token",
  tidAllowAmbientToken: true,
  tidAmbientTokenHeader: "authorization",
  tidRequiredScopes: ["processing.read"],
  tidTokenSourceOrder: ["ambient", "cached", "pkce"],
  tidAllowedAudiences: ["client-id", "studio-client-id"],
};

describe("TidAuthService", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({}), { status: 200 })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("creates login URL with PKCE fields", async () => {
    const service = new TidAuthService(baseConfig, new TokenStore());
    await service.initialize();
    const result = service.createLoginUrl();
    const url = new URL(result.login_url);
    expect(url.searchParams.get("client_id")).toBe(baseConfig.tidClientId);
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(result.state.length).toBeGreaterThan(10);
  });

  it("exchanges code and stores token", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            access_token: "token-a",
            refresh_token: "token-r",
            expires_in: 3600,
          }),
          { status: 200 },
        ),
      ),
    );
    const store = new TokenStore();
    const service = new TidAuthService(baseConfig, store);
    await service.initialize();
    const login = service.createLoginUrl();
    await service.exchangeCode({ code: "abc", state: login.state });
    expect(service.getStatus().authenticated).toBe(true);
    expect(service.getStatus().has_refresh_token).toBe(true);
  });

  it("prefers valid ambient token over cached token", async () => {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: "https://id.trimble.com",
      aud: "client-id",
      exp: now + 3600,
      scope: "openid processing.read",
    };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const ambientToken = `h.${encodedPayload}.s`;

    const store = new TokenStore();
    await store.set({
      accessToken: "cached-token",
      expiresAt: Date.now() + 300_000,
    });

    const service = new TidAuthService(baseConfig, store);
    await service.initialize();
    const resolved = await service.resolveAccessToken({ ambientToken });
    expect(resolved.source).toBe("ambient");
    expect(resolved.token).toBe(ambientToken);
  });

  it("rejects ambient token without required scopes", async () => {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: "https://id.trimble.com",
      aud: "client-id",
      exp: now + 3600,
      scope: "openid",
    };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const ambientToken = `h.${encodedPayload}.s`;

    const service = new TidAuthService(baseConfig, new TokenStore());
    await service.initialize();
    await expect(service.resolveAccessToken({ ambientToken })).rejects.toThrow(
      /missing required scope/i,
    );
  });
});
