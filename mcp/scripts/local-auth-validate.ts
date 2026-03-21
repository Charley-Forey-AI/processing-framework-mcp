import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

import { startPfMcpServer } from "../src/server.js";

type ToolResult = {
  structuredContent?: unknown;
  content?: unknown;
  isError?: boolean;
};

async function main(): Promise<void> {
  const closer = await startPfMcpServer();
  const endpoint = process.env.MCP_TEST_ENDPOINT ?? "http://127.0.0.1:3000/mcp";
  const bearer = process.env.TEST_BEARER_TOKEN;
  const runSmoke = String(process.env.RUN_PF_SMOKE ?? "").toLowerCase() === "true";

  const headers: Record<string, string> = {};
  if (bearer && bearer.trim().length > 0) {
    headers.Authorization = bearer.toLowerCase().startsWith("bearer ")
      ? bearer
      : `Bearer ${bearer}`;
  }

  const client = new Client(
    { name: "local-auth-validator", version: "1.0.0" },
    { capabilities: {} },
  );

  try {
    const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
      requestInit: {
        headers,
      },
    });
    await client.connect(transport);

    const ready = (await client.callTool({
      name: "pf_auth_ready_check",
      arguments: {},
    })) as ToolResult;
    const status = (await client.callTool({
      name: "pf_tid_status",
      arguments: {},
    })) as ToolResult;
    const login = (await client.callTool({
      name: "pf_tid_login_url",
      arguments: {},
    })) as ToolResult;

    const output: Record<string, unknown> = {
      ready: ready.structuredContent ?? ready.content,
      status: status.structuredContent ?? status.content,
      login: login.structuredContent ?? login.content,
    };

    if (bearer && bearer.trim().length > 0) {
      output.ambient_token_claims = decodeJwtPayload(
        bearer.toLowerCase().startsWith("bearer ") ? bearer.slice(7).trim() : bearer.trim(),
      );
    }

    if (runSmoke) {
      const smoke = (await client.callTool({
        name: "pf_operations_list",
        arguments: {},
      })) as ToolResult;
      output.smoke = smoke.structuredContent ?? smoke.content;
    }

    console.log(JSON.stringify(output, null, 2));
    await client.close();
  } finally {
    try {
      await closer.close();
    } catch {
      // Listener might already be closed in some local runs.
    }
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | undefined {
  const parts = token.split(".");
  if (parts.length < 2) return undefined;
  try {
    const normalized = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const parsed = JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, unknown>;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
