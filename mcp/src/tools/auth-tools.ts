import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { TidAuthService } from "../auth/tidAuth.js";

function authErrorEnvelope(error: unknown): {
  ok: false;
  error: { type: string; message: string; retryable: boolean };
} {
  return {
    ok: false,
    error: {
      type: error instanceof Error ? error.name : "unknown_error",
      message: error instanceof Error ? error.message : String(error),
      retryable: false,
    },
  };
}

export function registerAuthTools(server: McpServer, auth: TidAuthService): void {
  server.registerTool(
    "pf_tid_login_url",
    {
      title: "Get TID Login URL",
      description:
        "Generate a Trimble Identity OAuth login URL with PKCE. Call this first before using PF API tools.",
      inputSchema: {
        redirect_uri: z
          .string()
          .url()
          .optional()
          .describe("Optional redirect URI override."),
      },
      outputSchema: {
        login_url: z.string(),
        state: z.string(),
        redirect_uri: z.string(),
        instructions: z.string(),
      },
    },
    async ({ redirect_uri }) => {
      try {
        const result = auth.createLoginUrl(redirect_uri);
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        const envelope = authErrorEnvelope(error);
        return {
          isError: true,
          structuredContent: envelope,
          content: [{ type: "text", text: JSON.stringify(envelope, null, 2) }],
        };
      }
    },
  );

  server.registerTool(
    "pf_tid_exchange_code",
    {
      title: "Exchange TID Authorization Code",
      description:
        "Exchange the authorization code from Trimble Identity redirect for access and refresh tokens.",
      inputSchema: {
        code: z.string().describe("Authorization code from the redirect URL."),
        state: z.string().optional().describe("State returned from redirect."),
        redirect_uri: z.string().url().optional().describe("Optional redirect URI override."),
      },
      outputSchema: {
        ok: z.boolean(),
        expires_at: z.number().optional(),
      },
    },
    async ({ code, state, redirect_uri }) => {
      try {
        const result = await auth.exchangeCode({ code, state, redirect_uri });
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        const envelope = authErrorEnvelope(error);
        return {
          isError: true,
          structuredContent: envelope,
          content: [{ type: "text", text: JSON.stringify(envelope, null, 2) }],
        };
      }
    },
  );

  server.registerTool(
    "pf_tid_status",
    {
      title: "Get TID Session Status",
      description: "Check whether a valid Trimble Identity access token is currently available.",
      inputSchema: {},
      outputSchema: {
        authenticated: z.boolean(),
        expires_at: z.number().optional(),
        expires_in: z.number().optional(),
        has_refresh_token: z.boolean(),
        auth_source: z.enum(["ambient", "cached", "pkce"]).optional(),
        scopes_ok: z.boolean().optional(),
      },
    },
    async () => {
      const result = auth.getStatus();
      return {
        structuredContent: result,
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_auth_ready_check",
    {
      title: "Check Auth Readiness",
      description:
        "Resolve whether the current request can call PF API now, including source and expiration details.",
      inputSchema: {},
      outputSchema: {
        ready: z.boolean(),
        auth_source: z.enum(["ambient", "cached", "pkce"]).optional(),
        expires_at: z.number().optional(),
        scopes_ok: z.boolean(),
        message: z.string().optional(),
      },
    },
    async () => {
      try {
        const token = await auth.resolveAccessToken();
        const result = {
          ready: true,
          auth_source: token.source,
          expires_at: token.expiresAt,
          scopes_ok: token.scopesOk,
        };
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        const result = {
          ready: false,
          scopes_ok: false,
          message: error instanceof Error ? error.message : String(error),
        };
        return {
          structuredContent: result,
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    },
  );
}
