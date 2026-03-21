import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

import { startPfMcpServer } from "../src/server.js";

describe("Streamable HTTP MCP E2E", () => {
  let closer: { close: () => Promise<void> } | undefined;
  const port = 3219;
  const endpoint = `http://127.0.0.1:${port}/mcp`;

  beforeAll(async () => {
    process.env.MCP_HOST = "127.0.0.1";
    process.env.MCP_PORT = String(port);
    process.env.MCP_PATH = "/mcp";
    process.env.MCP_API_KEY = "";
    process.env.TID_CLIENT_ID = "test-client-id";
    closer = await startPfMcpServer();
  });

  afterAll(async () => {
    if (closer) await closer.close();
  });

  it("initializes and lists tools", async () => {
    const client = new Client(
      {
        name: "vitest-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      },
    );
    const transport = new StreamableHTTPClientTransport(new URL(endpoint));
    await client.connect(transport);

    const tools = await client.listTools();
    const names = tools.tools.map((x) => x.name);
    expect(names).toContain("pf_tid_status");
    expect(names).toContain("pf_auth_ready_check");
    expect(names).toContain("pf_operations_list");

    await client.close();
  });
});
