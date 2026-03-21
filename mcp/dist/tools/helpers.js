import { z } from "zod";
import { PfApiError } from "../client/pfClient.js";
import { getEndpointContract, getToolInputSchema } from "../schemas/openapiToolSchemas.js";
import { sanitizeForLogs } from "../utils/sanitize.js";
const registeredDefs = [];
const dedupeCache = new Map();
export function getRegisteredToolDefs() {
    return [...registeredDefs];
}
export function registerPfTool(server, client, config, def) {
    registeredDefs.push(def);
    const outputSchema = {
        status: z.number(),
        request_id: z.string().optional(),
        data: z.any(),
        response_contract: z.string(),
        data_shape: z.array(z.string()).optional(),
        deduped: z.boolean().optional(),
        dry_run: z.boolean().optional(),
    };
    const inputSchema = getToolInputSchema(def.method, def.path);
    server.registerTool(def.name, {
        title: def.title,
        description: `${def.description} [${def.method} ${def.path}] ` +
            "Use list tools first to discover IDs, then use get/update/delete/retire with path IDs. " +
            "Do not mutate unless you have confirmed target IDs and payload.",
        inputSchema,
        outputSchema,
        _meta: {
            requires_auth: true,
            requires_ids: extractPathPlaceholders(def.path).map(placeholderToArg),
            supports_auto_paginate: def.method === "GET",
            is_mutation: isMutation(def.method),
        },
    }, async (args) => {
        try {
            const rawArgs = args;
            enforcePolicy(def, rawArgs, config);
            const path = resolvePath(def.path, rawArgs);
            const query = asRecord(rawArgs.query);
            const body = rawArgs.body;
            const autoPaginate = Boolean(rawArgs.auto_paginate);
            const dryRun = Boolean(rawArgs.dry_run);
            const contract = getEndpointContract(def.method, def.path);
            if (dryRun && isMutation(def.method)) {
                const dryRunResult = {
                    status: 0,
                    data: {
                        mode: "dry_run",
                        normalized: {
                            path,
                            query: query ?? {},
                            body: body ?? null,
                        },
                        warnings: contract.input.body?.required && body === undefined
                            ? ["Body is required for this endpoint."]
                            : [],
                    },
                    response_contract: `pf://contracts/tool/${def.name}`,
                    data_shape: ["mode", "normalized", "warnings"],
                    dry_run: true,
                };
                return {
                    structuredContent: dryRunResult,
                    content: [{ type: "text", text: JSON.stringify(dryRunResult, null, 2) }],
                };
            }
            const fingerprint = createRequestFingerprint(def, path, query, body);
            const maybeCached = dedupeCache.get(fingerprint);
            if (isMutation(def.method) && maybeCached && Date.now() - maybeCached.time < 30_000) {
                const deduped = maybeCached.result;
                return {
                    structuredContent: {
                        ...deduped,
                        deduped: true,
                    },
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({ note: "Duplicate mutation request detected; returning cached recent result." }, null, 2),
                        },
                    ],
                };
            }
            const result = await client.request(def.method, path, { query, body, autoPaginate });
            const wrappedResult = {
                ...result,
                response_contract: `pf://contracts/tool/${def.name}`,
                data_shape: inferShape(result.data),
            };
            if (isMutation(def.method)) {
                dedupeCache.set(fingerprint, { time: Date.now(), result: wrappedResult });
            }
            return {
                structuredContent: wrappedResult,
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            status: wrappedResult.status,
                            request_id: wrappedResult.request_id,
                            response_contract: wrappedResult.response_contract,
                            note: "Full response is available in structuredContent.data.",
                        }, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: formatError(error),
                    },
                ],
            };
        }
    });
}
export function registerPfTools(server, client, defs) {
    throw new Error("Use registerPfToolsWithConfig to ensure policy controls are applied.");
}
export function registerPfToolsWithConfig(server, client, config, defs) {
    for (const def of defs)
        registerPfTool(server, client, config, def);
}
function resolvePath(pathTemplate, args) {
    return pathTemplate.replace(/\{([^}]+)\}/g, (_full, placeholder) => {
        const argKey = placeholderToArg(placeholder);
        const value = args[argKey];
        if (!value) {
            throw new Error(`Missing required path parameter: ${argKey}`);
        }
        return encodeURIComponent(String(value));
    });
}
function placeholderToArg(placeholder) {
    return placeholder.replace(/-/g, "_");
}
function extractPathPlaceholders(pathTemplate) {
    return [...pathTemplate.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
}
function asRecord(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return undefined;
    return value;
}
function isMutation(method) {
    return method === "POST" || method === "PUT" || method === "DELETE";
}
function enforcePolicy(def, args, config) {
    const mutation = isMutation(def.method);
    if (!mutation)
        return;
    if (config.pfReadOnlyMode) {
        throw new Error("Mutation blocked: PF_READ_ONLY_MODE is enabled.");
    }
    if (config.pfMutationAllowlist.length > 0 && !config.pfMutationAllowlist.includes(def.name)) {
        throw new Error(`Mutation blocked: ${def.name} is not in PF_MUTATION_ALLOWLIST.`);
    }
    if (config.pfMutationDenylist.includes(def.name)) {
        throw new Error(`Mutation blocked: ${def.name} is in PF_MUTATION_DENYLIST.`);
    }
    if (config.pfRequireMutationConfirmation && !Boolean(args.confirm_mutation)) {
        throw new Error("Mutation confirmation required: set confirm_mutation=true.");
    }
}
function createRequestFingerprint(def, path, query, body) {
    return JSON.stringify({
        tool: def.name,
        method: def.method,
        path,
        query: query ?? null,
        body: body ?? null,
    });
}
function inferShape(data) {
    if (!data || typeof data !== "object")
        return undefined;
    if (Array.isArray(data))
        return ["array", `len:${data.length}`];
    return Object.keys(data).slice(0, 12);
}
function formatError(error) {
    if (error instanceof PfApiError) {
        return JSON.stringify(sanitizeForLogs({
            error: error.message,
            status: error.status,
            response: error.responseBody,
        }), null, 2);
    }
    if (error instanceof Error)
        return error.message;
    return String(error);
}
