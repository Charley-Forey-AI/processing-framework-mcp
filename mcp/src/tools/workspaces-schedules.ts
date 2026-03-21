import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { PfClient } from "../client/pfClient.js";
import type { PfMcpConfig } from "../config.js";
import { registerPfToolsWithConfig } from "./helpers.js";

export function registerWorkspacesSchedulesTools(
  server: McpServer,
  client: PfClient,
  config: PfMcpConfig,
): void {
  registerPfToolsWithConfig(server, client, config, [
    {
      name: "pf_workspaces_list",
      title: "List Workspaces",
      description: "List workspace resources.",
      method: "GET",
      path: "/api/workspaces",
    },
    {
      name: "pf_workspaces_get",
      title: "Get Workspace",
      description: "Get one workspace by ID.",
      method: "GET",
      path: "/api/workspaces/{workspace-id}",
    },
    {
      name: "pf_workspaces_create",
      title: "Create Workspace",
      description: "Create a new workspace resource.",
      method: "POST",
      path: "/api/workspaces",
    },
    {
      name: "pf_workspaces_update",
      title: "Update Workspace",
      description: "Update workspace metadata by ID.",
      method: "PUT",
      path: "/api/workspaces/{workspace-id}",
    },
    {
      name: "pf_workspaces_retire",
      title: "Retire Workspace",
      description: "Retire a workspace by ID.",
      method: "PUT",
      path: "/api/workspaces/{workspace-id}/retire",
    },
    {
      name: "pf_workspace_operation_get",
      title: "Get Workspace Operation",
      description: "Get operation mapped to a workspace by ID.",
      method: "GET",
      path: "/api/workspaces/{workspace-id}/operation",
    },
    {
      name: "pf_workspace_operation_update",
      title: "Update Workspace Operation",
      description: "Update operation mapped to a workspace by ID.",
      method: "PUT",
      path: "/api/workspaces/{workspace-id}/operation",
    },
    {
      name: "pf_execution_schedules_list",
      title: "List Execution Schedules",
      description: "List execution schedules.",
      method: "GET",
      path: "/api/execution_schedules",
    },
    {
      name: "pf_execution_schedules_get",
      title: "Get Execution Schedule",
      description: "Get one execution schedule by ID.",
      method: "GET",
      path: "/api/execution_schedules/{execution-schedule-id}",
    },
    {
      name: "pf_execution_schedules_create",
      title: "Create Execution Schedule",
      description: "Create a new execution schedule.",
      method: "POST",
      path: "/api/execution_schedules",
    },
    {
      name: "pf_execution_schedules_update",
      title: "Update Execution Schedule",
      description: "Update an execution schedule by ID or action.",
      method: "PUT",
      path: "/api/execution_schedules/{execution-schedule-id}",
    },
  ]);
}
