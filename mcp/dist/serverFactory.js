import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { registerAuthTools } from "./tools/auth-tools.js";
import { registerOperationsTools } from "./tools/operations.js";
import { registerProceduresTools } from "./tools/procedures.js";
import { registerExecutionsTools } from "./tools/executions.js";
import { registerEnginesDeploymentsTools } from "./tools/engines-deployments.js";
import { registerWorkspacesSchedulesTools } from "./tools/workspaces-schedules.js";
import { getEndpointContract, getContractChangelog } from "./schemas/openapiToolSchemas.js";
import { getRegisteredToolDefs } from "./tools/helpers.js";
export function createPfMcpServer(config, auth, client) {
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
    server.registerTool("pf_api_server_info", {
        title: "Get PF API Server Info",
        description: "Show configured PF API base URL and MCP transport settings.",
        inputSchema: {},
        outputSchema: {
            pf_api_base_url: z.string(),
            mcp_host: z.string(),
            mcp_port: z.number(),
            mcp_path: z.string(),
        },
    }, async () => {
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
    });
    server.registerTool("pf_help", {
        title: "PF MCP Help",
        description: "Show auth prerequisites, workflow guidance, and tool usage best practices for this MCP.",
        inputSchema: {},
        outputSchema: {
            auth_steps: z.array(z.string()),
            recommended_flow: z.array(z.string()),
        },
    }, async () => ({
        structuredContent: {
            auth_steps: [
                "Call pf_tid_login_url",
                "Sign in using login_url",
                "Call pf_tid_exchange_code with code and state",
                "Verify with pf_tid_status",
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
    }));
    server.registerTool("pf_contract_get", {
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
    }, async ({ tool_name }) => {
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
    });
    server.registerTool("pf_contract_validate_input", {
        title: "Validate Tool Input Against Contract",
        description: "Validate candidate arguments for a tool without calling PF API.",
        inputSchema: {
            tool_name: z.string(),
            args: z.record(z.string(), z.any()),
        },
        outputSchema: {
            valid: z.boolean(),
            issues: z.array(z.string()),
        },
    }, async ({ tool_name, args }) => {
        const def = getRegisteredToolDefs().find((x) => x.name === tool_name);
        if (!def) {
            return {
                structuredContent: { valid: false, issues: [`Unknown tool: ${tool_name}`] },
                content: [{ type: "text", text: `Unknown tool: ${tool_name}` }],
            };
        }
        const requiredPathArgs = [...def.path.matchAll(/\{([^}]+)\}/g)].map((x) => x[1].replace(/-/g, "_"));
        const issues = [];
        for (const name of requiredPathArgs) {
            if (args[name] === undefined || args[name] === null || args[name] === "") {
                issues.push(`Missing required path arg: ${name}`);
            }
        }
        if ((def.method === "POST" || def.method === "PUT") && args.body === undefined) {
            issues.push("Mutation tool likely requires body; call pf_contract_get to inspect body contract.");
        }
        return {
            structuredContent: {
                valid: issues.length === 0,
                issues,
            },
            content: [{ type: "text", text: JSON.stringify({ issues }, null, 2) }],
        };
    });
    server.registerTool("pf_contract_expected_response", {
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
    }, async ({ tool_name, status_code }) => {
        const def = getRegisteredToolDefs().find((x) => x.name === tool_name);
        if (!def)
            throw new Error(`Unknown tool: ${tool_name}`);
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
    });
    server.registerTool("pf_tool_recommend", {
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
            recommendations: z.array(z.object({
                tool_name: z.string(),
                score: z.number(),
                rationale: z.string(),
            })),
        },
    }, async ({ intent, known_ids }) => {
        const words = intent.toLowerCase();
        const defs = getRegisteredToolDefs();
        const recs = defs
            .map((def) => {
            let score = 0;
            if (words.includes("list") && def.name.includes("_list"))
                score += 5;
            if (words.includes("create") && def.name.includes("_create"))
                score += 5;
            if (words.includes("update") && def.name.includes("_update"))
                score += 5;
            if (words.includes("delete") && def.name.includes("_delete"))
                score += 5;
            if (words.includes("retire") && def.name.includes("_retire"))
                score += 5;
            if (words.includes("approve") && def.name.includes("_approve"))
                score += 5;
            if (words.includes("publish") && def.name.includes("_publish"))
                score += 5;
            if (words.includes("clone") && def.name.includes("_clone"))
                score += 5;
            if (words.includes("execution") && def.name.includes("execution"))
                score += 3;
            if (words.includes("operation") && def.name.includes("operation"))
                score += 3;
            if (words.includes("procedure") && def.name.includes("procedure"))
                score += 3;
            const requiredArgs = [...def.path.matchAll(/\{([^}]+)\}/g)].map((x) => x[1].replace(/-/g, "_"));
            const missingIds = requiredArgs.filter((x) => !known_ids?.[x]);
            if (missingIds.length === 0)
                score += 2;
            return {
                tool_name: def.name,
                score,
                rationale: missingIds.length > 0
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
    });
    server.registerTool("pf_dependencies_status", {
        title: "PF Dependencies Status",
        description: "Check required dependencies, auth status, and endpoint reachability.",
        inputSchema: {},
        outputSchema: {
            required: z.record(z.string(), z.any()),
            auth: z.any(),
            reachability: z.any(),
            remediation: z.array(z.string()),
        },
    }, async () => {
        const required = {
            TID_CLIENT_ID: Boolean(config.tidClientId),
            PF_API_BASE_URL: Boolean(config.pfApiBaseUrl),
            MCP_HOST: Boolean(config.mcpHost),
            MCP_PORT: Boolean(config.mcpPort),
        };
        const authStatus = auth.getStatus();
        let reachability = {
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
        }
        catch (error) {
            reachability = {
                pf_api_base_url: config.pfApiBaseUrl,
                reachable: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
        const remediation = [];
        if (!required.TID_CLIENT_ID)
            remediation.push("Set TID_CLIENT_ID.");
        if (!authStatus.authenticated)
            remediation.push("Run pf_tid_login_url then pf_tid_exchange_code.");
        if (!reachability.reachable)
            remediation.push("Verify PF_API_BASE_URL and network access.");
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
    });
    server.registerTool("pf_contract_changelog", {
        title: "PF Contract Changelog",
        description: "Report whether the current OpenAPI contract hash changed from snapshot.",
        inputSchema: {},
        outputSchema: {
            changed: z.boolean(),
            current_hash: z.string(),
            previous_hash: z.string().optional(),
        },
    }, async () => {
        const change = getContractChangelog();
        return {
            structuredContent: change,
            content: [{ type: "text", text: JSON.stringify(change, null, 2) }],
        };
    });
    server.registerTool("pf_response_project", {
        title: "Project Response Fields",
        description: "Project a subset of fields from any response object for downstream steps.",
        inputSchema: {
            data: z.any(),
            fields: z.array(z.string()),
        },
        outputSchema: {
            projected: z.record(z.string(), z.any()),
        },
    }, async ({ data, fields }) => {
        const projected = {};
        if (data && typeof data === "object") {
            for (const key of fields) {
                projected[key] = data[key];
            }
        }
        return {
            structuredContent: { projected },
            content: [{ type: "text", text: JSON.stringify(projected, null, 2) }],
        };
    });
    server.registerResource("pf_tool_catalog_resource", "pf://tool-catalog", {
        title: "PF Tool Catalog",
        description: "Quick reference of PF MCP tool categories and usage.",
        mimeType: "application/json",
    }, async () => ({
        contents: [
            {
                uri: "pf://tool-catalog",
                mimeType: "application/json",
                text: JSON.stringify({
                    auth: ["pf_tid_login_url", "pf_tid_exchange_code", "pf_tid_status"],
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
                }, null, 2),
            },
        ],
    }));
    const contractTemplate = new ResourceTemplate("pf://contracts/tool/{tool_name}", {
        list: undefined,
    });
    server.registerResource("pf_contract_resource", contractTemplate, {
        title: "PF Tool Contract Resource",
        description: "Contract for a specific tool (inputs, body schema, responses, examples).",
        mimeType: "application/json",
    }, async (_uri, variables) => {
        const toolName = String(variables.tool_name ?? "");
        const def = getRegisteredToolDefs().find((x) => x.name === toolName);
        if (!def)
            throw new Error(`Unknown tool: ${toolName}`);
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
    });
    const examplesTemplate = new ResourceTemplate("pf://examples/tool/{tool_name}", {
        list: undefined,
    });
    server.registerResource("pf_examples_resource", examplesTemplate, {
        title: "PF Tool Examples Resource",
        description: "Examples for request body and responses for a specific tool.",
        mimeType: "application/json",
    }, async (_uri, variables) => {
        const toolName = String(variables.tool_name ?? "");
        const def = getRegisteredToolDefs().find((x) => x.name === toolName);
        if (!def)
            throw new Error(`Unknown tool: ${toolName}`);
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
    });
    server.registerResource("pf_dependencies_resource", "pf://dependencies", {
        title: "PF Dependencies",
        description: "Required and optional dependencies with installation guidance.",
        mimeType: "application/json",
    }, async () => ({
        contents: [
            {
                uri: "pf://dependencies",
                mimeType: "application/json",
                text: JSON.stringify({
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
                }, null, 2),
            },
        ],
    }));
    server.registerPrompt("pf_auth_and_list_prompt", {
        title: "Authenticate And List",
        description: "Guide the model to authenticate first, then list target resources before performing actions.",
    }, async () => ({
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
    }));
    return server;
}
