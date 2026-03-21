import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

import { startPfMcpServer } from "../src/server.js";

describe("Intelligence helper tools", () => {
  let closer: { close: () => Promise<void> } | undefined;
  const port = 3220;
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

  async function withClient<T>(run: (client: Client) => Promise<T>): Promise<T> {
    const client = new Client(
      {
        name: "vitest-intel-client",
        version: "1.0.0",
      },
      { capabilities: {} },
    );
    const transport = new StreamableHTTPClientTransport(new URL(endpoint));
    await client.connect(transport);
    try {
      return await run(client);
    } finally {
      await client.close();
    }
  }

  it("recommends engines list for list-engines intent", async () => {
    await withClient(async (client) => {
      const response = await client.callTool({
        name: "pf_tool_recommend",
        arguments: { intent: "list available engines" },
      });
      const content = response.content[0];
      expect(content?.type).toBe("text");
      if (content?.type !== "text") return;
      const parsed = JSON.parse(content.text) as Array<{ tool_name: string; score: number }>;
      expect(parsed.length).toBeGreaterThan(0);
      expect(parsed.some((x) => x.tool_name === "pf_engines_list")).toBe(true);
    });
  });

  it("returns remediation guidance when required args are missing", async () => {
    await withClient(async (client) => {
      const response = await client.callTool({
        name: "pf_contract_validate_input",
        arguments: { tool_name: "pf_deployments_get", args: {} },
      });
      const content = response.content[0];
      expect(content?.type).toBe("text");
      if (content?.type !== "text") return;
      const parsed = JSON.parse(content.text) as {
        valid: boolean;
        issues: string[];
        remediation: Array<{ type: string; required_arg?: string }>;
        dependency_hints: string[];
      };
      expect(parsed.valid).toBe(false);
      expect(parsed.issues.some((x) => x.includes("deployment_id"))).toBe(true);
      expect(parsed.remediation.length).toBeGreaterThan(0);
      expect(parsed.dependency_hints.length).toBeGreaterThan(0);
    });
  });

  it("builds workflow and requirement graph tools", async () => {
    await withClient(async (client) => {
      const graphResponse = await client.callTool({
        name: "pf_requirement_graph",
        arguments: { tool_name: "pf_deployments_get" },
      });
      const graphContent = graphResponse.content[0];
      expect(graphContent?.type).toBe("text");
      if (graphContent?.type !== "text") return;
      const graph = JSON.parse(graphContent.text) as {
        required_args: Array<{ name: string; source_options: string[] }>;
      };
      expect(graph.required_args.some((x) => x.name === "deployment_id")).toBe(true);

      const workflowResponse = await client.callTool({
        name: "pf_workflow_plan",
        arguments: { intent: "update deployment secret", known_context: {} },
      });
      const workflowContent = workflowResponse.content[0];
      expect(workflowContent?.type).toBe("text");
      if (workflowContent?.type !== "text") return;
      const workflow = JSON.parse(workflowContent.text) as {
        workflow: string;
        steps: Array<{ tool_name: string }>;
        missing_requirements: string[];
      };
      expect(workflow.steps.length).toBeGreaterThan(0);
      expect(workflow.missing_requirements.length).toBeGreaterThan(0);
    });
  });
});
