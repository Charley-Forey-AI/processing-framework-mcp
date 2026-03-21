import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import type { PfMcpConfig } from "./config.js";
import { TidAuthService } from "./auth/tidAuth.js";
import { PfClient } from "./client/pfClient.js";
import { registerAuthTools } from "./tools/auth-tools.js";
import { registerOperationsTools } from "./tools/operations.js";
import { registerProceduresTools } from "./tools/procedures.js";
import { registerExecutionsTools } from "./tools/executions.js";
import { registerEnginesDeploymentsTools } from "./tools/engines-deployments.js";
import { registerWorkspacesSchedulesTools } from "./tools/workspaces-schedules.js";
import { getEndpointContract, getContractChangelog } from "./schemas/openapiToolSchemas.js";
import { getRegisteredToolDefs } from "./tools/helpers.js";

type ToolDef = ReturnType<typeof getRegisteredToolDefs>[number];

export function createPfMcpServer(
  config: PfMcpConfig,
  auth: TidAuthService,
  client: PfClient,
): McpServer {
  const server = new McpServer({
    name: "pf-processing-mcp",
    version: "1.0.0",
  });

  registerAuthTools(server, auth);
  registerOperationsTools(server, client, config);
  registerProceduresTools(server, client, config);
  registerExecutionsTools(server, client, config);
  registerEnginesDeploymentsTools(server, client, config);
  registerWorkspacesSchedulesTools(server, client, config);

  // Utility tool to show active endpoint environment at runtime.
  server.registerTool(
    "pf_api_server_info",
    {
      title: "Get PF API Server Info",
      description: "Show configured PF API base URL and MCP transport settings.",
      inputSchema: {},
      outputSchema: {
        pf_api_base_url: z.string(),
        mcp_host: z.string(),
        mcp_port: z.number(),
        mcp_path: z.string(),
      },
    },
    async () => {
      const result = {
        pf_api_base_url: config.pfApiBaseUrl,
        mcp_host: config.mcpHost,
        mcp_port: config.mcpPort,
        mcp_path: config.mcpPath,
      };
      return {
        structuredContent: result,
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_help",
    {
      title: "PF MCP Help",
      description:
        "Show auth prerequisites, workflow guidance, and tool usage best practices for this MCP.",
      inputSchema: {},
      outputSchema: {
        auth_steps: z.array(z.string()),
        recommended_flow: z.array(z.string()),
      },
    },
    async () => ({
      structuredContent: {
        auth_steps: [
          "Call pf_auth_ready_check (ambient token from Agent Studio may already be usable)",
          "If not ready, call pf_tid_login_url",
          "Sign in using login_url and call pf_tid_exchange_code with code and state",
          "Verify with pf_tid_status or pf_auth_ready_check",
        ],
        recommended_flow: [
          "Use list tools to discover IDs",
          "Use get tool to inspect one object",
          "Use create/update/delete/retire/approve/publish actions as needed",
        ],
      },
      content: [
        {
          type: "text",
          text: "Use pf_tid_login_url -> pf_tid_exchange_code -> pf_tid_status before PF API tools. Use list tools first, then get/update by ID.",
        },
      ],
    }),
  );

  server.registerTool(
    "pf_contract_get",
    {
      title: "Get Tool Contract",
      description: "Return full request/response contract for a PF MCP tool.",
      inputSchema: {
        tool_name: z.string(),
      },
      outputSchema: {
        tool_name: z.string(),
        method: z.string(),
        path: z.string(),
        contract: z.any(),
      },
    },
    async ({ tool_name }) => {
      const def = getRegisteredToolDefs().find((x) => x.name === tool_name);
      if (!def) {
        throw new Error(`Unknown tool: ${tool_name}`);
      }
      const contract = getEndpointContract(def.method, def.path);
      return {
        structuredContent: {
          tool_name,
          method: def.method,
          path: def.path,
          contract,
        },
        content: [{ type: "text", text: JSON.stringify(contract, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_contract_validate_input",
    {
      title: "Validate Tool Input Against Contract",
      description: "Validate candidate arguments for a tool without calling PF API.",
      inputSchema: {
        tool_name: z.string(),
        args: z.record(z.string(), z.any()),
      },
      outputSchema: {
        valid: z.boolean(),
        issues: z.array(z.string()),
        remediation: z.array(
          z.object({
            type: z.enum(["ask_user", "recommended_tool", "contract_lookup", "hint"]),
            message: z.string(),
            required_arg: z.string().optional(),
            tool_name: z.string().optional(),
          }),
        ),
        dependency_hints: z.array(z.string()),
      },
    },
    async ({ tool_name, args }) => {
      const def = getRegisteredToolDefs().find((x) => x.name === tool_name);
      if (!def) {
        const unknownResult = {
          valid: false,
          issues: [`Unknown tool: ${tool_name}`],
          remediation: [
            {
              type: "hint" as const,
              message: "Call pf_help or pf_tool_recommend to discover valid tool names.",
            },
          ],
          dependency_hints: ["Ensure tool_name exactly matches a registered PF tool."],
        };
        return {
          structuredContent: unknownResult,
          content: [{ type: "text", text: JSON.stringify(unknownResult, null, 2) }],
        };
      }
      const requiredPathArgs = [...def.path.matchAll(/\{([^}]+)\}/g)].map((x) =>
        x[1].replace(/-/g, "_"),
      );
      const issues: string[] = [];
      const remediation: Array<{
        type: "ask_user" | "recommended_tool" | "contract_lookup" | "hint";
        message: string;
        required_arg?: string;
        tool_name?: string;
      }> = [];
      const defs = getRegisteredToolDefs();
      for (const name of requiredPathArgs) {
        if (args[name] === undefined || args[name] === null || args[name] === "") {
          issues.push(`Missing required path arg: ${name}`);
          const discoveryTool = recommendDiscoveryTool(name, defs);
          if (discoveryTool) {
            remediation.push({
              type: "recommended_tool",
              required_arg: name,
              tool_name: discoveryTool,
              message: `Call ${discoveryTool} to discover candidate values for ${name}.`,
            });
          } else {
            remediation.push({
              type: "ask_user",
              required_arg: name,
              message: `Ask the user for ${name}.`,
            });
          }
        }
      }
      if ((def.method === "POST" || def.method === "PUT") && args.body === undefined) {
        issues.push("Mutation tool likely requires body; call pf_contract_get to inspect body contract.");
        remediation.push({
          type: "contract_lookup",
          required_arg: "body",
          tool_name: "pf_contract_get",
          message: `Call pf_contract_get for ${tool_name} and use contract.input.body to build the request payload.`,
        });
      }
      const dependencyHints = [
        "Use *_list tools to discover IDs before calling *_get or mutation tools.",
        "Use pf_contract_get to inspect required body fields for POST/PUT endpoints.",
      ];
      if (issues.length > 0) {
        dependencyHints.push(`Resolve missing inputs, then re-run ${tool_name}.`);
      }
      const validationResult = {
        valid: issues.length === 0,
        issues,
        remediation,
        dependency_hints: dependencyHints,
      };
      return {
        structuredContent: validationResult,
        content: [{ type: "text", text: JSON.stringify(validationResult, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_contract_expected_response",
    {
      title: "Get Expected Response Contract",
      description: "Get expected response schema and examples for a tool/status code.",
      inputSchema: {
        tool_name: z.string(),
        status_code: z.string().optional(),
      },
      outputSchema: {
        tool_name: z.string(),
        responses: z.any(),
      },
    },
    async ({ tool_name, status_code }) => {
      const def = getRegisteredToolDefs().find((x) => x.name === tool_name);
      if (!def) throw new Error(`Unknown tool: ${tool_name}`);
      const contract = getEndpointContract(def.method, def.path);
      const responses = status_code
        ? { [status_code]: contract.responses[status_code] }
        : contract.responses;
      return {
        structuredContent: {
          tool_name,
          responses,
        },
        content: [{ type: "text", text: JSON.stringify(responses, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_tool_recommend",
    {
      title: "Recommend PF Tool",
      description: "Recommend the best PF tool(s) given user intent and known IDs.",
      inputSchema: {
        intent: z.string(),
        known_ids: z
          .record(z.string(), z.string())
          .optional()
          .describe("Known IDs such as operation_id, procedure_id, execution_id."),
      },
      outputSchema: {
        recommendations: z.array(
          z.object({
            tool_name: z.string(),
            score: z.number(),
            rationale: z.string(),
          }),
        ),
      },
    },
    async ({ intent, known_ids }) => {
      const words = tokenizeIntent(intent);
      const defs = getRegisteredToolDefs();
      const recs = defs
        .map((def) => {
          let score = actionScore(words, def.name) + entityScore(words, def.name);

          const requiredArgs = [...def.path.matchAll(/\{([^}]+)\}/g)].map((x) =>
            x[1].replace(/-/g, "_"),
          );
          const missingIds = requiredArgs.filter((x) => !known_ids?.[x]);
          if (missingIds.length > 0) {
            if (def.name.includes("_list")) score += 4;
            if (def.name.includes("_get")) score += 1;
            if (isMutationTool(def.name)) score -= 4;
          }
          if (missingIds.length === 0) score += 2;
          return {
            tool_name: def.name,
            score,
            rationale:
              missingIds.length > 0
                ? `Matches intent, but missing IDs: ${missingIds.join(", ")}`
                : "Matches intent and required IDs are available.",
          };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
      return {
        structuredContent: { recommendations: recs },
        content: [{ type: "text", text: JSON.stringify(recs, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_requirement_graph",
    {
      title: "PF Requirement Graph",
      description: "Show required args for a tool and where each value should come from.",
      inputSchema: {
        tool_name: z.string(),
      },
      outputSchema: {
        tool_name: z.string(),
        required_args: z.array(
          z.object({
            name: z.string(),
            source_options: z.array(z.enum(["from_history", "from_tool", "from_user"])),
            recommended_tool: z.string().optional(),
            ask_user_prompt: z.string(),
          }),
        ),
      },
    },
    async ({ tool_name }) => {
      const defs = getRegisteredToolDefs();
      const def = defs.find((x) => x.name === tool_name);
      if (!def) {
        throw new Error(`Unknown tool: ${tool_name}`);
      }
      const requiredArgs = [...def.path.matchAll(/\{([^}]+)\}/g)].map((x) =>
        x[1].replace(/-/g, "_"),
      );
      const required = requiredArgs.map((arg) => {
        const recommendation = recommendDiscoveryTool(arg, defs);
        return {
          name: arg,
          source_options: ["from_history", "from_tool", "from_user"] as const,
          recommended_tool: recommendation,
          ask_user_prompt: `Please provide ${arg} if you want to target a specific resource.`,
        };
      });
      const result = {
        tool_name,
        required_args: required,
      };
      return {
        structuredContent: result,
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_workflow_plan",
    {
      title: "PF Workflow Plan",
      description:
        "Generate an ordered PF tool sequence from intent with missing requirements and context-aware recommendations.",
      inputSchema: {
        intent: z.string(),
        known_context: z.record(z.string(), z.any()).optional(),
      },
      outputSchema: {
        workflow: z.string(),
        steps: z.array(
          z.object({
            step: z.number(),
            tool_name: z.string(),
            purpose: z.string(),
            required_args: z.array(z.string()).optional(),
          }),
        ),
        missing_requirements: z.array(z.string()),
      },
    },
    async ({ intent, known_context }) => {
      const defs = getRegisteredToolDefs();
      const words = tokenizeIntent(intent);
      const knownIds = known_context as Record<string, unknown> | undefined;

      const workflow = inferWorkflowName(words);
      const primaryEntity = inferPrimaryEntity(words);
      const listTool = pickToolByEntity(defs, primaryEntity, "_list");
      const getTool = pickToolByEntity(defs, primaryEntity, "_get");
      const mutationSuffix = inferMutationSuffix(words);
      const mutationTool = mutationSuffix ? pickToolByEntity(defs, primaryEntity, mutationSuffix) : undefined;

      const candidateTools = [listTool, getTool, mutationTool].filter((x): x is ToolDef => Boolean(x));
      const missingRequirements = collectMissingRequirements(candidateTools, knownIds ?? {});

      const steps = buildWorkflowSteps({
        listTool,
        getTool,
        mutationTool,
        missingRequirements,
      });

      const result = {
        workflow,
        steps,
        missing_requirements: missingRequirements,
      };
      return {
        structuredContent: result,
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_dependencies_status",
    {
      title: "PF Dependencies Status",
      description: "Check required dependencies, auth status, and endpoint reachability.",
      inputSchema: {},
      outputSchema: {
        required: z.record(z.string(), z.any()),
        auth: z.any(),
        reachability: z.any(),
        remediation: z.array(z.string()),
      },
    },
    async () => {
      const required = {
        TID_CLIENT_ID: Boolean(config.tidClientId),
        PF_API_BASE_URL: Boolean(config.pfApiBaseUrl),
        MCP_HOST: Boolean(config.mcpHost),
        MCP_PORT: Boolean(config.mcpPort),
        TID_SCOPE_HAS_API_SCOPE: config.tidScope.trim().split(" ").filter(Boolean).length > 1,
      };
      const authStatus = auth.getStatus();
      let reachability: { pf_api_base_url: string; reachable: boolean; status?: number; error?: string } = {
        pf_api_base_url: config.pfApiBaseUrl,
        reachable: false,
      };
      try {
        const response = await fetch(config.pfApiBaseUrl, { method: "GET" });
        reachability = {
          pf_api_base_url: config.pfApiBaseUrl,
          reachable: response.status > 0,
          status: response.status,
        };
      } catch (error) {
        reachability = {
          pf_api_base_url: config.pfApiBaseUrl,
          reachable: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
      const remediation: string[] = [];
      if (!required.TID_CLIENT_ID) remediation.push("Set TID_CLIENT_ID.");
      if (!required.TID_SCOPE_HAS_API_SCOPE)
        remediation.push("Set TID_SCOPE to include PF API scope(s), not just openid.");
      if (!authStatus.authenticated) remediation.push("Run pf_tid_login_url then pf_tid_exchange_code.");
      if (!reachability.reachable) remediation.push("Verify PF_API_BASE_URL and network access.");
      return {
        structuredContent: {
          required,
          auth: authStatus,
          reachability,
          remediation,
        },
        content: [
          {
            type: "text",
            text: JSON.stringify({ required, authStatus, reachability, remediation }, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    "pf_contract_changelog",
    {
      title: "PF Contract Changelog",
      description: "Report whether the current OpenAPI contract hash changed from snapshot.",
      inputSchema: {},
      outputSchema: {
        changed: z.boolean(),
        current_hash: z.string(),
        previous_hash: z.string().optional(),
      },
    },
    async () => {
      const change = getContractChangelog();
      return {
        structuredContent: change,
        content: [{ type: "text", text: JSON.stringify(change, null, 2) }],
      };
    },
  );

  server.registerTool(
    "pf_response_project",
    {
      title: "Project Response Fields",
      description: "Project a subset of fields from any response object for downstream steps.",
      inputSchema: {
        data: z.any(),
        fields: z.array(z.string()),
      },
      outputSchema: {
        projected: z.record(z.string(), z.any()),
      },
    },
    async ({ data, fields }) => {
      const projected: Record<string, unknown> = {};
      if (data && typeof data === "object") {
        for (const key of fields) {
          projected[key] = (data as Record<string, unknown>)[key];
        }
      }
      return {
        structuredContent: { projected },
        content: [{ type: "text", text: JSON.stringify(projected, null, 2) }],
      };
    },
  );

  server.registerResource(
    "pf_tool_catalog_resource",
    "pf://tool-catalog",
    {
      title: "PF Tool Catalog",
      description: "Quick reference of PF MCP tool categories and usage.",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "pf://tool-catalog",
          mimeType: "application/json",
          text: JSON.stringify(
            {
              auth: ["pf_tid_login_url", "pf_tid_exchange_code", "pf_tid_status"],
              auth_helpers: ["pf_auth_ready_check"],
              categories: [
                "operations",
                "procedures",
                "executions",
                "engines",
                "deployments",
                "deployment_secrets",
                "workspaces",
                "execution_schedules",
              ],
            },
            null,
            2,
          ),
        },
      ],
    }),
  );

  const contractTemplate = new ResourceTemplate("pf://contracts/tool/{tool_name}", {
    list: undefined,
  });
  server.registerResource(
    "pf_contract_resource",
    contractTemplate,
    {
      title: "PF Tool Contract Resource",
      description: "Contract for a specific tool (inputs, body schema, responses, examples).",
      mimeType: "application/json",
    },
    async (_uri, variables) => {
      const toolName = String(variables.tool_name ?? "");
      const def = getRegisteredToolDefs().find((x) => x.name === toolName);
      if (!def) throw new Error(`Unknown tool: ${toolName}`);
      const contract = getEndpointContract(def.method, def.path);
      return {
        contents: [
          {
            uri: `pf://contracts/tool/${toolName}`,
            mimeType: "application/json",
            text: JSON.stringify(contract, null, 2),
          },
        ],
      };
    },
  );

  const examplesTemplate = new ResourceTemplate("pf://examples/tool/{tool_name}", {
    list: undefined,
  });
  server.registerResource(
    "pf_examples_resource",
    examplesTemplate,
    {
      title: "PF Tool Examples Resource",
      description: "Examples for request body and responses for a specific tool.",
      mimeType: "application/json",
    },
    async (_uri, variables) => {
      const toolName = String(variables.tool_name ?? "");
      const def = getRegisteredToolDefs().find((x) => x.name === toolName);
      if (!def) throw new Error(`Unknown tool: ${toolName}`);
      const contract = getEndpointContract(def.method, def.path);
      return {
        contents: [
          {
            uri: `pf://examples/tool/${toolName}`,
            mimeType: "application/json",
            text: JSON.stringify(contract.examples, null, 2),
          },
        ],
      };
    },
  );

  server.registerResource(
    "pf_dependencies_resource",
    "pf://dependencies",
    {
      title: "PF Dependencies",
      description: "Required and optional dependencies with installation guidance.",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "pf://dependencies",
          mimeType: "application/json",
          text: JSON.stringify(
            {
              required_runtime: [
                "Node.js 20+",
                "@modelcontextprotocol/sdk",
                "zod",
                "yaml",
                "TID_CLIENT_ID env var",
              ],
              optional_hardening: [
                "MCP_API_KEY",
                "MCP_CORS_ORIGINS allowlist",
                "PF_READ_ONLY_MODE",
                "PF_MUTATION_ALLOWLIST / PF_MUTATION_DENYLIST",
              ],
              install_commands: ["npm install", "npm run check", "npm run test", "npm run build"],
            },
            null,
            2,
          ),
        },
      ],
    }),
  );

  server.registerPrompt(
    "pf_auth_and_list_prompt",
    {
      title: "Authenticate And List",
      description:
        "Guide the model to authenticate first, then list target resources before performing actions.",
    },
    async () => ({
      description: "Authenticate first then list before action",
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              "1) Run pf_tid_login_url and ask user to sign in.",
              "2) Run pf_tid_exchange_code with returned code.",
              "3) Confirm with pf_tid_status.",
              "4) Run appropriate pf_*_list tool before any mutation.",
            ].join("\n"),
          },
        },
      ],
    }),
  );

  return server;
}

function tokenizeIntent(intent: string): Set<string> {
  return new Set(
    intent
      .toLowerCase()
      .split(/[^a-z0-9_]+/g)
      .map((x) => x.trim())
      .filter(Boolean),
  );
}

function isMutationTool(toolName: string): boolean {
  return ["_create", "_update", "_delete", "_retire", "_approve", "_publish", "_clone"].some((x) =>
    toolName.includes(x),
  );
}

function actionScore(words: Set<string>, toolName: string): number {
  const actionRules: Array<{ words: string[]; suffixes: string[]; score: number }> = [
    { words: ["list", "show", "all", "available"], suffixes: ["_list"], score: 5 },
    { words: ["get", "detail", "details", "inspect"], suffixes: ["_get"], score: 4 },
    { words: ["create", "new", "add"], suffixes: ["_create"], score: 5 },
    { words: ["update", "edit", "modify", "change"], suffixes: ["_update"], score: 5 },
    { words: ["delete", "remove"], suffixes: ["_delete"], score: 5 },
    { words: ["retire"], suffixes: ["_retire"], score: 5 },
    { words: ["approve"], suffixes: ["_approve"], score: 5 },
    { words: ["publish"], suffixes: ["_publish"], score: 5 },
    { words: ["clone", "copy"], suffixes: ["_clone"], score: 5 },
  ];
  let score = 0;
  for (const rule of actionRules) {
    if (!rule.words.some((word) => words.has(word))) continue;
    if (rule.suffixes.some((suffix) => toolName.includes(suffix))) score += rule.score;
  }
  return score;
}

function entityScore(words: Set<string>, toolName: string): number {
  const entityRules: Array<{ words: string[]; fragments: string[] }> = [
    { words: ["operation", "operations"], fragments: ["operation"] },
    { words: ["procedure", "procedures", "workflow", "workflows"], fragments: ["procedure"] },
    { words: ["execution", "executions", "run", "runs", "job", "jobs"], fragments: ["execution"] },
    { words: ["engine", "engines"], fragments: ["engine"] },
    { words: ["deployment", "deployments"], fragments: ["deployment"] },
    { words: ["workspace", "workspaces", "fme"], fragments: ["workspace"] },
    { words: ["schedule", "schedules"], fragments: ["schedule"] },
    { words: ["secret", "secrets"], fragments: ["secret"] },
  ];
  let score = 0;
  for (const rule of entityRules) {
    if (!rule.words.some((word) => words.has(word))) continue;
    if (rule.fragments.some((fragment) => toolName.includes(fragment))) score += 3;
  }
  return score;
}

function recommendDiscoveryTool(argName: string, defs: ToolDef[]): string | undefined {
  const normalized = argName.replace(/_id$/, "");
  const tokens = normalized.split("_").filter(Boolean);
  const exactCandidates = defs.filter((def) => {
    if (!def.name.includes("_list")) return false;
    return tokens.every((token) => def.name.includes(token));
  });
  if (exactCandidates.length > 0) return exactCandidates[0].name;

  const partial = defs.find(
    (def) => def.name.includes("_list") && tokens.some((token) => def.name.includes(token)),
  );
  if (partial) return partial.name;

  return defs.find((def) => def.name.endsWith("_list"))?.name;
}

function inferWorkflowName(words: Set<string>): string {
  if (words.has("audit")) return "auditWorkflow";
  if (words.has("update") || words.has("modify")) return "updateWorkflow";
  if (words.has("create") || words.has("new")) return "createWorkflow";
  if (words.has("delete") || words.has("retire")) return "retireWorkflow";
  if (words.has("get") || words.has("inspect") || words.has("details")) return "inspectWorkflow";
  return "listWorkflow";
}

function inferPrimaryEntity(words: Set<string>): string {
  const entityPriority = [
    "engine",
    "deployment",
    "secret",
    "workspace",
    "schedule",
    "execution",
    "procedure",
    "operation",
  ];
  for (const key of entityPriority) {
    if (words.has(key) || words.has(`${key}s`)) return key;
  }
  return "operation";
}

function inferMutationSuffix(words: Set<string>): "_create" | "_update" | "_delete" | "_retire" | undefined {
  if (words.has("create") || words.has("new") || words.has("add")) return "_create";
  if (words.has("update") || words.has("edit") || words.has("modify") || words.has("change")) return "_update";
  if (words.has("delete") || words.has("remove")) return "_delete";
  if (words.has("retire")) return "_retire";
  return undefined;
}

function pickToolByEntity(defs: ToolDef[], entity: string, suffix: string): ToolDef | undefined {
  const candidates = defs.filter((def) => def.name.includes(suffix) && def.name.includes(entity));
  if (candidates.length > 0) return candidates[0];
  return defs.find((def) => def.name.includes(suffix));
}

function collectMissingRequirements(tools: ToolDef[], knownContext: Record<string, unknown>): string[] {
  const missing = new Set<string>();
  for (const tool of tools) {
    const requiredArgs = [...tool.path.matchAll(/\{([^}]+)\}/g)].map((x) => x[1].replace(/-/g, "_"));
    for (const arg of requiredArgs) {
      if (knownContext[arg] === undefined || knownContext[arg] === null || knownContext[arg] === "") {
        missing.add(arg);
      }
    }
  }
  return [...missing];
}

function buildWorkflowSteps(input: {
  listTool?: ToolDef;
  getTool?: ToolDef;
  mutationTool?: ToolDef;
  missingRequirements: string[];
}): Array<{ step: number; tool_name: string; purpose: string; required_args?: string[] }> {
  const steps: Array<{ step: number; tool_name: string; purpose: string; required_args?: string[] }> = [];
  let step = 1;

  if (input.listTool) {
    steps.push({
      step: step++,
      tool_name: input.listTool.name,
      purpose: "Discover candidate resources and IDs.",
    });
  }
  if (input.getTool) {
    const requiredArgs = [...input.getTool.path.matchAll(/\{([^}]+)\}/g)].map((x) => x[1].replace(/-/g, "_"));
    steps.push({
      step: step++,
      tool_name: input.getTool.name,
      purpose: "Inspect one resource before taking further action.",
      required_args: requiredArgs.length > 0 ? requiredArgs : undefined,
    });
  }
  if (input.mutationTool) {
    const requiredArgs = [...input.mutationTool.path.matchAll(/\{([^}]+)\}/g)].map((x) =>
      x[1].replace(/-/g, "_"),
    );
    steps.push({
      step: step++,
      tool_name: input.mutationTool.name,
      purpose: "Apply the requested change after validation.",
      required_args: requiredArgs.length > 0 ? requiredArgs : undefined,
    });
  }

  if (input.missingRequirements.length > 0) {
    steps.push({
      step,
      tool_name: "pf_contract_validate_input",
      purpose: "Validate final arguments before execution once missing inputs are collected.",
      required_args: ["tool_name", "args"],
    });
  }

  return steps;
}
