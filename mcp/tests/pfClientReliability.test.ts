import { afterEach, describe, expect, it, vi } from "vitest";

import { PfClient } from "../src/client/pfClient.js";
import type { PfMcpConfig } from "../src/config.js";
import type { TidAuthService } from "../src/auth/tidAuth.js";

const baseConfig: PfMcpConfig = {
  mcpHost: "127.0.0.1",
  mcpPort: 3000,
  mcpPath: "/mcp",
  mcpCorsOrigins: ["*"],
  mcpApiKey: undefined,
  mcpSessionTtlMs: 1800000,
  pfApiBaseUrl: "https://cloud.dev.api.trimblecloud.com/Processing/testapi/1",
  pfTimeoutMs: 1000,
  pfRetryCount: 2,
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
  tidAllowedAudiences: ["client-id"],
};

function makeAuth(): TidAuthService {
  return {
    resolveAccessToken: vi.fn(async () => ({
      token: "token",
      source: "cached",
      scopesOk: true,
      expiresAt: Date.now() + 3600_000,
    })),
    invalidateSource: vi.fn(async () => undefined),
    clearToken: vi.fn(async () => undefined),
  } as unknown as TidAuthService;
}

describe("PfClient reliability", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("retries on 429 responses and succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: "rate_limited" }), {
          status: 429,
          headers: { "retry-after": "0" },
        }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new PfClient(baseConfig, makeAuth());
    const result = await client.request("GET", "/api/engines");

    expect(result.status).toBe(200);
    expect(result.data).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns auto-pagination metadata on merged results", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            items: [{ id: "eng-1" }],
            current_page: 1,
            total_pages: 2,
          }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            items: [{ id: "eng-2" }],
            current_page: 2,
            total_pages: 2,
          }),
          { status: 200 },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const client = new PfClient(baseConfig, makeAuth());
    const result = await client.request("GET", "/api/engines", {
      autoPaginate: true,
      query: { per_page: 1 },
    });
    const data = result.data as Record<string, unknown>;

    expect(data.auto_paginated).toBe(true);
    expect(data.pages_fetched).toBe(2);
    expect(data.total_items).toBe(2);
    expect(data.truncated).toBe(false);
    expect(Array.isArray(data.items)).toBe(true);
  });
});
