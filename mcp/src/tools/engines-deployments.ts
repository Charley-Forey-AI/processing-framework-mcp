import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { PfClient } from "../client/pfClient.js";
import type { PfMcpConfig } from "../config.js";
import { registerPfToolsWithConfig } from "./helpers.js";

export function registerEnginesDeploymentsTools(
  server: McpServer,
  client: PfClient,
  config: PfMcpConfig,
): void {
  registerPfToolsWithConfig(server, client, config, [
    {
      name: "pf_engines_list",
      title: "List Engines",
      description: "List engine resources.",
      method: "GET",
      path: "/api/engines",
    },
    {
      name: "pf_engines_get",
      title: "Get Engine",
      description: "Get one engine by ID.",
      method: "GET",
      path: "/api/engines/{engine-id}",
    },
    {
      name: "pf_engines_create",
      title: "Create Engine",
      description: "Create a new engine.",
      method: "POST",
      path: "/api/engines",
    },
    {
      name: "pf_engines_update",
      title: "Update Engine",
      description: "Update an engine by ID.",
      method: "PUT",
      path: "/api/engines/{engine-id}",
    },
    {
      name: "pf_engines_delete",
      title: "Delete Engine",
      description: "Delete an engine by ID.",
      method: "DELETE",
      path: "/api/engines/{engine-id}",
    },
    {
      name: "pf_engines_retire",
      title: "Retire Engine",
      description: "Retire an engine by ID.",
      method: "PUT",
      path: "/api/engines/{engine-id}/retire",
    },
    {
      name: "pf_deployments_list",
      title: "List Deployments",
      description: "List deployment resources.",
      method: "GET",
      path: "/api/deployments",
    },
    {
      name: "pf_deployments_get",
      title: "Get Deployment",
      description: "Get one deployment by ID.",
      method: "GET",
      path: "/api/deployments/{deployment-id}",
    },
    {
      name: "pf_deployments_create",
      title: "Create Deployment",
      description: "Create a new deployment.",
      method: "POST",
      path: "/api/deployments",
    },
    {
      name: "pf_deployments_update",
      title: "Update Deployment",
      description: "Update a deployment by ID.",
      method: "PUT",
      path: "/api/deployments/{deployment-id}",
    },
    {
      name: "pf_deployments_delete",
      title: "Delete Deployment",
      description: "Delete a deployment by ID.",
      method: "DELETE",
      path: "/api/deployments/{deployment-id}",
    },
    {
      name: "pf_deployments_retire",
      title: "Retire Deployment",
      description: "Retire a deployment by ID.",
      method: "PUT",
      path: "/api/deployments/{deployment-id}/retire",
    },
    {
      name: "pf_deployment_secrets_create",
      title: "Create Deployment Secret",
      description: "Create deployment secret(s) for a deployment.",
      method: "POST",
      path: "/api/deployments/{deployment-id}/secrets",
    },
    {
      name: "pf_deployment_secrets_list",
      title: "List Deployment Secrets",
      description: "List deployment secrets for a deployment.",
      method: "GET",
      path: "/api/deployments/{deployment-id}/secrets",
    },
    {
      name: "pf_deployment_secrets_get",
      title: "Get Deployment Secret",
      description: "Get one deployment secret by IDs.",
      method: "GET",
      path: "/api/deployments/{deployment-id}/secrets/{deployment-secret-id}",
    },
    {
      name: "pf_deployment_secrets_update",
      title: "Update Deployment Secret",
      description: "Update a deployment secret by IDs.",
      method: "PUT",
      path: "/api/deployments/{deployment-id}/secrets/{deployment-secret-id}",
    },
    {
      name: "pf_deployment_secrets_delete",
      title: "Delete Deployment Secret",
      description: "Delete a deployment secret by IDs.",
      method: "DELETE",
      path: "/api/deployments/{deployment-id}/secrets/{deployment-secret-id}",
    },
    {
      name: "pf_deployment_secrets_retire",
      title: "Retire Deployment Secret",
      description: "Retire a deployment secret by IDs.",
      method: "PUT",
      path: "/api/deployments/{deployment-id}/secrets/{deployment-secret-id}/retire",
    },
  ]);
}
