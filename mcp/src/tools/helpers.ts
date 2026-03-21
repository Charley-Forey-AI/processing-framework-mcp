import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { PfApiError, PfClient } from "../client/pfClient.js";
import { type PfMcpConfig } from "../config.js";
import { getEndpointContract, getToolInputSchema } from "../schemas/openapiToolSchemas.js";
import { sanitizeForLogs } from "../utils/sanitize.js";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ToolDef = {
  name: string;
  title: string;
  description: string;
  method: HttpMethod;
  path: string;
};

const registeredDefs: ToolDef[] = [];
const dedupeCache = new Map<string, { time: number; result: unknown }>();
type ToolErrorEnvelope = {
  ok: false;
  error: {
    type: string;
    message: string;
    status?: number;
    response?: unknown;
    retryable?: boolean;
  };
};

export function getRegisteredToolDefs(): ToolDef[] {
  return [...registeredDefs];
}

export function registerPfTool(
  server: McpServer,
  client: PfClient,
  config: PfMcpConfig,
  def: ToolDef,
): void {
  registeredDefs.push(def);
  const outputSchema = {
    status: z.number(),
    request_id: z.string().optional(),
    data: z.any(),
    response_contract: z.string(),
    data_shape: z.array(z.string()).optional(),
    item_count: z.number().optional(),
    sample_ids: z.array(z.string()).optional(),
    has_more: z.boolean().optional(),
    telemetry: z
      .object({
        workflow_id: z.string().optional(),
        step_index: z.number().optional(),
        missing_inputs_count: z.number().optional(),
        self_resolved_count: z.number().optional(),
      })
      .optional(),
    deduped: z.boolean().optional(),
    dry_run: z.boolean().optional(),
  };

  const inputSchema = getToolInputSchema(def.method, def.path);

  server.registerTool(
    def.name,
    {
      title: def.title,
      description:
        `${def.description} [${def.method} ${def.path}] ` +
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
    },
    async (args) => {
      try {
        const rawArgs = args as Record<string, unknown>;
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
              warnings:
                contract.input.body?.required && body === undefined
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
          const deduped = maybeCached.result as Record<string, unknown>;
          const payload = {
            ...deduped,
            deduped: true,
            note: "Duplicate mutation request detected; returning cached recent result.",
          };
          return {
            structuredContent: payload,
            content: [
              {
                type: "text",
                text: JSON.stringify(payload, null, 2),
              },
            ],
          };
        }

        const result = await client.request(def.method, path, { query, body, autoPaginate });
        const listSummary = summarizeListResult(result.data);
        const telemetry = extractTelemetry(rawArgs);
        const wrappedResult = {
          ...result,
          response_contract: `pf://contracts/tool/${def.name}`,
          data_shape: inferShape(result.data),
          ...listSummary,
          ...(telemetry ? { telemetry } : {}),
        };
        if (isMutation(def.method)) {
          dedupeCache.set(fingerprint, { time: Date.now(), result: wrappedResult });
        }

        const responseText = buildToolContentPayload(wrappedResult);
        return {
          structuredContent: wrappedResult,
          content: [
            {
              type: "text",
              text: JSON.stringify(responseText, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorEnvelope = createErrorEnvelope(error);
        return {
          isError: true,
          structuredContent: errorEnvelope,
          content: [
            {
              type: "text",
              text: JSON.stringify(errorEnvelope, null, 2),
            },
          ],
        };
      }
    },
  );
}

export function registerPfTools(server: McpServer, client: PfClient, defs: ToolDef[]): void {
  throw new Error("Use registerPfToolsWithConfig to ensure policy controls are applied.");
}

export function registerPfToolsWithConfig(
  server: McpServer,
  client: PfClient,
  config: PfMcpConfig,
  defs: ToolDef[],
): void {
  for (const def of defs) registerPfTool(server, client, config, def);
}

function resolvePath(pathTemplate: string, args: Record<string, unknown>): string {
  return pathTemplate.replace(/\{([^}]+)\}/g, (_full, placeholder: string) => {
    const argKey = placeholderToArg(placeholder);
    const value = args[argKey];
    if (!value) {
      throw new Error(`Missing required path parameter: ${argKey}`);
    }
    return encodeURIComponent(String(value));
  });
}

function placeholderToArg(placeholder: string): string {
  return placeholder.replace(/-/g, "_");
}

function extractPathPlaceholders(pathTemplate: string): string[] {
  return [...pathTemplate.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function isMutation(method: HttpMethod): boolean {
  return method === "POST" || method === "PUT" || method === "DELETE";
}

function enforcePolicy(def: ToolDef, args: Record<string, unknown>, config: PfMcpConfig): void {
  const mutation = isMutation(def.method);
  if (!mutation) return;

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

function createRequestFingerprint(
  def: ToolDef,
  path: string,
  query: Record<string, unknown> | undefined,
  body: unknown,
): string {
  return JSON.stringify({
    tool: def.name,
    method: def.method,
    path,
    query: query ?? null,
    body: body ?? null,
  });
}

function inferShape(data: unknown): string[] | undefined {
  if (!data || typeof data !== "object") return undefined;
  if (Array.isArray(data)) return ["array", `len:${data.length}`];
  return Object.keys(data as Record<string, unknown>).slice(0, 12);
}

function formatError(error: unknown): string {
  if (error instanceof PfApiError) {
    return JSON.stringify(
      sanitizeForLogs({
        error: error.message,
        status: error.status,
        response: error.responseBody,
      }),
      null,
      2,
    );
  }
  if (error instanceof Error) return error.message;
  return String(error);
}

function createErrorEnvelope(error: unknown): ToolErrorEnvelope {
  if (error instanceof PfApiError) {
    const retryable = error.status >= 500 || error.status === 429;
    return {
      ok: false,
      error: {
        type: "pf_api_error",
        message: error.message,
        status: error.status,
        response: sanitizeForLogs(error.responseBody),
        retryable,
      },
    };
  }
  return {
    ok: false,
    error: {
      type: error instanceof Error ? error.name : "unknown_error",
      message: formatError(error),
      retryable: false,
    },
  };
}

export function buildToolContentPayload(result: Record<string, unknown>): Record<string, unknown> {
  return {
    status: result.status,
    request_id: result.request_id,
    response_contract: result.response_contract,
    data_shape: result.data_shape,
    item_count: result.item_count,
    sample_ids: result.sample_ids,
    has_more: result.has_more,
    telemetry: result.telemetry,
    data: result.data,
  };
}

export function summarizeListResult(data: unknown): {
  item_count?: number;
  sample_ids?: string[];
  has_more?: boolean;
} {
  if (!data || typeof data !== "object") return {};
  const obj = data as Record<string, unknown>;
  if (!Array.isArray(obj.items)) return {};

  const itemCount = obj.items.length;
  const sampleIds = obj.items
    .slice(0, 5)
    .map((item) =>
      item && typeof item === "object" && "id" in item ? String((item as Record<string, unknown>).id) : "",
    )
    .filter((id) => id.length > 0);
  const currentPage = Number(obj.current_page ?? 0);
  const totalPages = Number(obj.total_pages ?? 0);
  const hasMore =
    Number.isFinite(currentPage) &&
    Number.isFinite(totalPages) &&
    currentPage > 0 &&
    totalPages > 0 &&
    currentPage < totalPages;

  return {
    item_count: itemCount,
    sample_ids: sampleIds.length > 0 ? sampleIds : undefined,
    has_more: hasMore,
  };
}

function extractTelemetry(args: Record<string, unknown>): {
  workflow_id?: string;
  step_index?: number;
  missing_inputs_count?: number;
  self_resolved_count?: number;
} | null {
  const workflowId = typeof args.workflow_id === "string" ? args.workflow_id : undefined;
  const stepIndex = Number.isFinite(Number(args.step_index)) ? Number(args.step_index) : undefined;
  const missingInputsCount = Number.isFinite(Number(args.missing_inputs_count))
    ? Number(args.missing_inputs_count)
    : undefined;
  const selfResolvedCount = Number.isFinite(Number(args.self_resolved_count))
    ? Number(args.self_resolved_count)
    : undefined;

  if (
    workflowId === undefined &&
    stepIndex === undefined &&
    missingInputsCount === undefined &&
    selfResolvedCount === undefined
  ) {
    return null;
  }
  return {
    workflow_id: workflowId,
    step_index: stepIndex,
    missing_inputs_count: missingInputsCount,
    self_resolved_count: selfResolvedCount,
  };
}
