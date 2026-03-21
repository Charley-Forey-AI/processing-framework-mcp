import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { PfClient } from "../client/pfClient.js";
import type { PfMcpConfig } from "../config.js";
import { registerPfToolsWithConfig } from "./helpers.js";

export function registerExecutionsTools(
  server: McpServer,
  client: PfClient,
  config: PfMcpConfig,
): void {
  registerPfToolsWithConfig(server, client, config, [
    {
      name: "pf_executions_list",
      title: "List Executions",
      description: "List procedure executions accessible to the authenticated user.",
      method: "GET",
      path: "/api/executions",
    },
    {
      name: "pf_executions_get",
      title: "Get Execution",
      description: "Get one execution by ID.",
      method: "GET",
      path: "/api/executions/{execution-id}",
    },
    {
      name: "pf_executions_create",
      title: "Create Execution",
      description: "Create a new procedure execution.",
      method: "POST",
      path: "/api/executions",
    },
    {
      name: "pf_execution_activities",
      title: "Get Execution Activities",
      description: "Get execution activities by execution ID.",
      method: "GET",
      path: "/api/executions/{execution-id}/activities",
    },
    {
      name: "pf_execution_engine_data",
      title: "Get Execution Engine Data",
      description: "Fetch execution engine data objects.",
      method: "GET",
      path: "/api/executions/engine_data",
    },
    {
      name: "pf_execution_engine_logs",
      title: "Get Execution Engine Logs",
      description: "Fetch execution engine logs.",
      method: "GET",
      path: "/api/executions/engine_logs",
    },
    {
      name: "pf_execution_events",
      title: "Get Execution Events",
      description: "Get execution events by execution ID.",
      method: "GET",
      path: "/api/executions/{execution-id}/events",
    },
  ]);
}
