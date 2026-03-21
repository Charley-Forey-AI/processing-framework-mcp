import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { z } from "zod";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type OpenApiDocument = {
  paths?: Record<string, Record<string, unknown> & { parameters?: unknown[] }>;
  components?: {
    parameters?: Record<string, unknown>;
    schemas?: Record<string, unknown>;
  };
};

type OpenApiSchema = {
  $ref?: string;
  type?: string;
  format?: string;
  enum?: unknown[];
  items?: OpenApiSchema;
  properties?: Record<string, OpenApiSchema>;
  required?: string[];
  oneOf?: OpenApiSchema[];
  anyOf?: OpenApiSchema[];
  allOf?: OpenApiSchema[];
  description?: string;
  example?: unknown;
  examples?: Record<string, unknown>;
};

type OpenApiParameter = {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  required?: boolean;
  description?: string;
  schema?: OpenApiSchema;
  $ref?: string;
};

type OpenApiRequestBody = {
  required?: boolean;
  content?: Record<string, { schema?: OpenApiSchema }>;
  $ref?: string;
};

type OpenApiResponse = {
  description?: string;
  content?: Record<
    string,
    {
      schema?: OpenApiSchema;
      example?: unknown;
      examples?: Record<string, unknown>;
    }
  >;
  $ref?: string;
};

type EndpointContract = {
  method: HttpMethod;
  path: string;
  input: {
    path: Record<string, unknown>;
    query: Record<string, unknown>;
    body?: {
      required: boolean;
      schema: unknown;
      examples: unknown[];
    };
  };
  responses: Record<
    string,
    {
      description?: string;
      schema?: unknown;
      examples?: unknown[];
    }
  >;
  examples: {
    requestBody: unknown[];
    responses: Record<string, unknown[]>;
  };
};

let cachedDoc: OpenApiDocument | null = null;
let cachedDocHash: string | null = null;
const snapshotPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.openapi-contract-snapshot.json",
);

export function getToolInputSchema(
  method: HttpMethod,
  endpointPath: string,
): Record<string, z.ZodTypeAny> {
  const doc = loadDocument();
  const operation = getOperation(doc, method, endpointPath);
  const pathPlaceholders = extractPathPlaceholders(endpointPath);
  const parameters = getMergedParameters(doc, endpointPath, operation);

  const shape: Record<string, z.ZodTypeAny> = {};

  for (const placeholder of pathPlaceholders) {
    const argName = placeholderToArg(placeholder);
    const matching = parameters.find((p) => p.in === "path" && p.name === placeholder);
    const schema = matching?.schema ? schemaToZod(doc, matching.schema, 0) : z.string();
    shape[argName] = schema.describe(matching?.description ?? `Path parameter: ${placeholder}`);
  }

  const queryParams = parameters.filter((p) => p.in === "query");
  if (queryParams.length > 0) {
    const queryShape: Record<string, z.ZodTypeAny> = {};
    for (const parameter of queryParams) {
      const field = schemaToZod(doc, parameter.schema, 0).describe(
        parameter.description ?? `Query parameter: ${parameter.name}`,
      );
      queryShape[parameter.name] = parameter.required ? field : field.optional();
    }
    shape.query = z
      .object(queryShape)
      .strict()
      .optional()
      .describe("Query parameters for this endpoint.");
  }

  const requestBody = resolveRequestBody(doc, (operation?.requestBody as OpenApiRequestBody) ?? undefined);
  if (requestBody?.content?.["application/json"]?.schema) {
    const bodySchema = schemaToZod(doc, requestBody.content["application/json"].schema, 0).describe(
      "JSON request body for this endpoint.",
    );
    shape.body = requestBody.required ? bodySchema : bodySchema.optional();
  }

  shape.auto_paginate = z
    .boolean()
    .optional()
    .describe("For list endpoints, request all pages when true.");
  shape.dry_run = z
    .boolean()
    .optional()
    .describe("For POST/PUT, validate and normalize payload without calling API.");
  shape.confirm_mutation = z
    .boolean()
    .optional()
    .describe("Required when mutation confirmation policy is enabled.");
  shape.workflow_id = z
    .string()
    .optional()
    .describe("Optional workflow identifier for multi-step orchestration telemetry.");
  shape.step_index = z
    .number()
    .int()
    .optional()
    .describe("Optional 1-based workflow step index for telemetry.");
  shape.missing_inputs_count = z
    .number()
    .int()
    .optional()
    .describe("Optional count of missing inputs identified before this call.");
  shape.self_resolved_count = z
    .number()
    .int()
    .optional()
    .describe("Optional count of missing inputs auto-resolved before this call.");

  return shape;
}

export function getEndpointContract(method: HttpMethod, endpointPath: string): EndpointContract {
  const doc = loadDocument();
  const operation = getOperation(doc, method, endpointPath) ?? {};
  const parameters = getMergedParameters(doc, endpointPath, operation);
  const pathParams = parameters.filter((p) => p.in === "path");
  const queryParams = parameters.filter((p) => p.in === "query");
  const requestBody = resolveRequestBody(doc, (operation.requestBody as OpenApiRequestBody) ?? undefined);

  const responsesRaw = (operation.responses as Record<string, OpenApiResponse>) ?? {};
  const responses: EndpointContract["responses"] = {};
  const responseExamples: Record<string, unknown[]> = {};

  for (const [status, responseCandidate] of Object.entries(responsesRaw)) {
    const response = resolveResponse(doc, responseCandidate) ?? {};
    const appJson = response.content?.["application/json"];
    responses[status] = {
      description: response.description,
      schema: appJson?.schema ? normalizeSchema(doc, appJson.schema, 0) : undefined,
      examples: extractContentExamples(appJson?.example, appJson?.examples),
    };
    responseExamples[status] = responses[status].examples ?? [];
  }

  const requestExamples = extractContentExamples(
    requestBody?.content?.["application/json"]?.schema?.example,
    requestBody?.content?.["application/json"]?.schema?.examples,
  );

  return {
    method,
    path: endpointPath,
    input: {
      path: Object.fromEntries(
        pathParams.map((p) => [
          p.name.replace(/-/g, "_"),
          {
            required: true,
            description: p.description,
            schema: normalizeSchema(doc, p.schema, 0),
          },
        ]),
      ),
      query: Object.fromEntries(
        queryParams.map((p) => [
          p.name,
          {
            required: Boolean(p.required),
            description: p.description,
            schema: normalizeSchema(doc, p.schema, 0),
          },
        ]),
      ),
      ...(requestBody?.content?.["application/json"]?.schema
        ? {
            body: {
              required: Boolean(requestBody.required),
              schema: normalizeSchema(doc, requestBody.content["application/json"].schema, 0),
              examples: requestExamples,
            },
          }
        : {}),
    },
    responses,
    examples: {
      requestBody: requestExamples,
      responses: responseExamples,
    },
  };
}

export function getOpenApiContractHash(): string {
  if (cachedDocHash) return cachedDocHash;
  const doc = loadDocument();
  cachedDocHash = createHash("sha256").update(JSON.stringify(doc)).digest("hex");
  return cachedDocHash;
}

export function getContractChangelog(): {
  changed: boolean;
  current_hash: string;
  previous_hash?: string;
} {
  const currentHash = getOpenApiContractHash();
  if (!existsSync(snapshotPath)) {
    return { changed: true, current_hash: currentHash };
  }
  try {
    const previous = JSON.parse(readFileSync(snapshotPath, "utf8")) as { hash?: string };
    return {
      changed: previous.hash !== currentHash,
      current_hash: currentHash,
      previous_hash: previous.hash,
    };
  } catch {
    return { changed: true, current_hash: currentHash };
  }
}

function loadDocument(): OpenApiDocument {
  if (cachedDoc) return cachedDoc;

  const current = path.dirname(fileURLToPath(import.meta.url));
  const openapiPath = path.resolve(current, "../../../knowledge/pf_openapi_prod.yaml");
  const yaml = readFileSync(openapiPath, "utf8");
  cachedDoc = YAML.parse(yaml) as OpenApiDocument;
  return cachedDoc;
}

function getOperation(
  doc: OpenApiDocument,
  endpointMethod: HttpMethod,
  endpointPath: string,
): Record<string, unknown> | undefined {
  const pathItem = doc.paths?.[endpointPath];
  if (!pathItem) return undefined;
  return pathItem[endpointMethod.toLowerCase()] as Record<string, unknown> | undefined;
}

function getMergedParameters(
  doc: OpenApiDocument,
  endpointPath: string,
  operation?: Record<string, unknown>,
): OpenApiParameter[] {
  const pathItem = doc.paths?.[endpointPath];
  const raw = [
    ...((pathItem?.parameters as unknown[]) ?? []),
    ...(((operation?.parameters as unknown[]) ?? []) as unknown[]),
  ];

  const seen = new Set<string>();
  const merged: OpenApiParameter[] = [];
  for (const candidate of raw) {
    const resolved = resolveParameter(doc, candidate);
    if (!resolved) continue;
    const key = `${resolved.in}:${resolved.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(resolved);
  }
  return merged;
}

function resolveParameter(doc: OpenApiDocument, parameter: unknown): OpenApiParameter | undefined {
  if (!parameter || typeof parameter !== "object") return undefined;
  const raw = parameter as OpenApiParameter;

  if (raw.$ref) {
    return resolveRef(doc, raw.$ref) as OpenApiParameter | undefined;
  }

  return raw;
}

function resolveRequestBody(
  doc: OpenApiDocument,
  requestBody: OpenApiRequestBody | undefined,
): OpenApiRequestBody | undefined {
  if (!requestBody) return undefined;
  if (requestBody.$ref) {
    return resolveRef(doc, requestBody.$ref) as OpenApiRequestBody | undefined;
  }
  return requestBody;
}

function resolveResponse(doc: OpenApiDocument, response: OpenApiResponse | undefined): OpenApiResponse | undefined {
  if (!response) return undefined;
  if (response.$ref) return resolveRef(doc, response.$ref) as OpenApiResponse | undefined;
  return response;
}

function resolveRef(doc: OpenApiDocument, ref: string): unknown {
  if (!ref.startsWith("#/")) return undefined;
  const parts = ref.replace(/^#\//, "").split("/");
  let current: unknown = doc;
  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function schemaToZod(
  doc: OpenApiDocument,
  schema: OpenApiSchema | undefined,
  depth: number,
): z.ZodTypeAny {
  if (!schema) return z.any();
  if (depth > 8) return z.any();

  if (schema.$ref) {
    const resolved = resolveRef(doc, schema.$ref) as OpenApiSchema | undefined;
    return schemaToZod(doc, resolved, depth + 1);
  }

  if (schema.enum && schema.enum.length > 0) {
    const values = schema.enum;
    if (values.every((x) => typeof x === "string")) {
      return z.enum(values as [string, ...string[]]);
    }
    // Non-string enums are uncommon here; keep permissive to avoid fragile literal typing.
    return z.any();
  }

  if (schema.oneOf?.length) {
    if (schema.oneOf.length === 1) return schemaToZod(doc, schema.oneOf[0], depth + 1);
    return z.union(
      schema.oneOf.map((x) => schemaToZod(doc, x, depth + 1)) as [
        z.ZodTypeAny,
        z.ZodTypeAny,
        ...z.ZodTypeAny[],
      ],
    );
  }
  if (schema.anyOf?.length) {
    if (schema.anyOf.length === 1) return schemaToZod(doc, schema.anyOf[0], depth + 1);
    return z.union(
      schema.anyOf.map((x) => schemaToZod(doc, x, depth + 1)) as [
        z.ZodTypeAny,
        z.ZodTypeAny,
        ...z.ZodTypeAny[],
      ],
    );
  }
  if (schema.allOf?.length) {
    // Keep allOf permissive to avoid fragile deep composition failures.
    return z.any();
  }

  switch (schema.type) {
    case "string":
      if (schema.format === "uuid") return z.string().uuid();
      if (schema.format === "uri") return z.string().url();
      return z.string();
    case "integer":
      return z.number().int();
    case "number":
      return z.number();
    case "boolean":
      return z.boolean();
    case "array":
      return z.array(schemaToZod(doc, schema.items, depth + 1));
    case "object": {
      const props = schema.properties ?? {};
      const required = new Set(schema.required ?? []);
      const shape: Record<string, z.ZodTypeAny> = {};
      for (const [key, value] of Object.entries(props)) {
        const field = schemaToZod(doc, value, depth + 1);
        shape[key] = required.has(key) ? field : field.optional();
      }
      return z.object(shape).passthrough();
    }
    default:
      return z.any();
  }
}

function normalizeSchema(
  doc: OpenApiDocument,
  schema: OpenApiSchema | undefined,
  depth: number,
): unknown {
  if (!schema || depth > 8) return undefined;
  if (schema.$ref) {
    const resolved = resolveRef(doc, schema.$ref) as OpenApiSchema | undefined;
    return normalizeSchema(doc, resolved, depth + 1);
  }
  const result: Record<string, unknown> = {
    type: schema.type,
    format: schema.format,
    description: schema.description,
  };
  if (schema.enum) result.enum = schema.enum;
  if (schema.required) result.required = schema.required;
  if (schema.properties) {
    result.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]) => [key, normalizeSchema(doc, value, depth + 1)]),
    );
  }
  if (schema.items) {
    result.items = normalizeSchema(doc, schema.items, depth + 1);
  }
  if (schema.oneOf) result.oneOf = schema.oneOf.map((x) => normalizeSchema(doc, x, depth + 1));
  if (schema.anyOf) result.anyOf = schema.anyOf.map((x) => normalizeSchema(doc, x, depth + 1));
  if (schema.allOf) result.allOf = schema.allOf.map((x) => normalizeSchema(doc, x, depth + 1));
  return result;
}

function extractContentExamples(example?: unknown, examples?: Record<string, unknown>): unknown[] {
  const out: unknown[] = [];
  if (example !== undefined) out.push(example);
  if (examples) {
    for (const val of Object.values(examples)) {
      if (val && typeof val === "object" && "value" in (val as Record<string, unknown>)) {
        out.push((val as Record<string, unknown>).value);
      } else {
        out.push(val);
      }
    }
  }
  return out;
}

function extractPathPlaceholders(pathTemplate: string): string[] {
  return [...pathTemplate.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
}

function placeholderToArg(placeholder: string): string {
  return placeholder.replace(/-/g, "_");
}
