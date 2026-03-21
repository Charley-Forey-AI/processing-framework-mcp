import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { z } from "zod";
let cachedDoc = null;
let cachedDocHash = null;
const snapshotPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../.openapi-contract-snapshot.json");
export function getToolInputSchema(method, endpointPath) {
    const doc = loadDocument();
    const operation = getOperation(doc, method, endpointPath);
    const pathPlaceholders = extractPathPlaceholders(endpointPath);
    const parameters = getMergedParameters(doc, endpointPath, operation);
    const shape = {};
    for (const placeholder of pathPlaceholders) {
        const argName = placeholderToArg(placeholder);
        const matching = parameters.find((p) => p.in === "path" && p.name === placeholder);
        const schema = matching?.schema ? schemaToZod(doc, matching.schema, 0) : z.string();
        shape[argName] = schema.describe(matching?.description ?? `Path parameter: ${placeholder}`);
    }
    const queryParams = parameters.filter((p) => p.in === "query");
    if (queryParams.length > 0) {
        const queryShape = {};
        for (const parameter of queryParams) {
            const field = schemaToZod(doc, parameter.schema, 0).describe(parameter.description ?? `Query parameter: ${parameter.name}`);
            queryShape[parameter.name] = parameter.required ? field : field.optional();
        }
        shape.query = z
            .object(queryShape)
            .strict()
            .optional()
            .describe("Query parameters for this endpoint.");
    }
    const requestBody = resolveRequestBody(doc, operation?.requestBody ?? undefined);
    if (requestBody?.content?.["application/json"]?.schema) {
        const bodySchema = schemaToZod(doc, requestBody.content["application/json"].schema, 0).describe("JSON request body for this endpoint.");
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
    return shape;
}
export function getEndpointContract(method, endpointPath) {
    const doc = loadDocument();
    const operation = getOperation(doc, method, endpointPath) ?? {};
    const parameters = getMergedParameters(doc, endpointPath, operation);
    const pathParams = parameters.filter((p) => p.in === "path");
    const queryParams = parameters.filter((p) => p.in === "query");
    const requestBody = resolveRequestBody(doc, operation.requestBody ?? undefined);
    const responsesRaw = operation.responses ?? {};
    const responses = {};
    const responseExamples = {};
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
    const requestExamples = extractContentExamples(requestBody?.content?.["application/json"]?.schema?.example, requestBody?.content?.["application/json"]?.schema?.examples);
    return {
        method,
        path: endpointPath,
        input: {
            path: Object.fromEntries(pathParams.map((p) => [
                p.name.replace(/-/g, "_"),
                {
                    required: true,
                    description: p.description,
                    schema: normalizeSchema(doc, p.schema, 0),
                },
            ])),
            query: Object.fromEntries(queryParams.map((p) => [
                p.name,
                {
                    required: Boolean(p.required),
                    description: p.description,
                    schema: normalizeSchema(doc, p.schema, 0),
                },
            ])),
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
export function getOpenApiContractHash() {
    if (cachedDocHash)
        return cachedDocHash;
    const doc = loadDocument();
    cachedDocHash = createHash("sha256").update(JSON.stringify(doc)).digest("hex");
    return cachedDocHash;
}
export function getContractChangelog() {
    const currentHash = getOpenApiContractHash();
    if (!existsSync(snapshotPath)) {
        return { changed: true, current_hash: currentHash };
    }
    try {
        const previous = JSON.parse(readFileSync(snapshotPath, "utf8"));
        return {
            changed: previous.hash !== currentHash,
            current_hash: currentHash,
            previous_hash: previous.hash,
        };
    }
    catch {
        return { changed: true, current_hash: currentHash };
    }
}
function loadDocument() {
    if (cachedDoc)
        return cachedDoc;
    const current = path.dirname(fileURLToPath(import.meta.url));
    const openapiPath = path.resolve(current, "../../../knowledge/pf_openapi_prod.yaml");
    const yaml = readFileSync(openapiPath, "utf8");
    cachedDoc = YAML.parse(yaml);
    return cachedDoc;
}
function getOperation(doc, endpointMethod, endpointPath) {
    const pathItem = doc.paths?.[endpointPath];
    if (!pathItem)
        return undefined;
    return pathItem[endpointMethod.toLowerCase()];
}
function getMergedParameters(doc, endpointPath, operation) {
    const pathItem = doc.paths?.[endpointPath];
    const raw = [
        ...(pathItem?.parameters ?? []),
        ...(operation?.parameters ?? []),
    ];
    const seen = new Set();
    const merged = [];
    for (const candidate of raw) {
        const resolved = resolveParameter(doc, candidate);
        if (!resolved)
            continue;
        const key = `${resolved.in}:${resolved.name}`;
        if (seen.has(key))
            continue;
        seen.add(key);
        merged.push(resolved);
    }
    return merged;
}
function resolveParameter(doc, parameter) {
    if (!parameter || typeof parameter !== "object")
        return undefined;
    const raw = parameter;
    if (raw.$ref) {
        return resolveRef(doc, raw.$ref);
    }
    return raw;
}
function resolveRequestBody(doc, requestBody) {
    if (!requestBody)
        return undefined;
    if (requestBody.$ref) {
        return resolveRef(doc, requestBody.$ref);
    }
    return requestBody;
}
function resolveResponse(doc, response) {
    if (!response)
        return undefined;
    if (response.$ref)
        return resolveRef(doc, response.$ref);
    return response;
}
function resolveRef(doc, ref) {
    if (!ref.startsWith("#/"))
        return undefined;
    const parts = ref.replace(/^#\//, "").split("/");
    let current = doc;
    for (const part of parts) {
        if (!current || typeof current !== "object")
            return undefined;
        current = current[part];
    }
    return current;
}
function schemaToZod(doc, schema, depth) {
    if (!schema)
        return z.any();
    if (depth > 8)
        return z.any();
    if (schema.$ref) {
        const resolved = resolveRef(doc, schema.$ref);
        return schemaToZod(doc, resolved, depth + 1);
    }
    if (schema.enum && schema.enum.length > 0) {
        const values = schema.enum;
        if (values.every((x) => typeof x === "string")) {
            return z.enum(values);
        }
        // Non-string enums are uncommon here; keep permissive to avoid fragile literal typing.
        return z.any();
    }
    if (schema.oneOf?.length) {
        if (schema.oneOf.length === 1)
            return schemaToZod(doc, schema.oneOf[0], depth + 1);
        return z.union(schema.oneOf.map((x) => schemaToZod(doc, x, depth + 1)));
    }
    if (schema.anyOf?.length) {
        if (schema.anyOf.length === 1)
            return schemaToZod(doc, schema.anyOf[0], depth + 1);
        return z.union(schema.anyOf.map((x) => schemaToZod(doc, x, depth + 1)));
    }
    if (schema.allOf?.length) {
        // Keep allOf permissive to avoid fragile deep composition failures.
        return z.any();
    }
    switch (schema.type) {
        case "string":
            if (schema.format === "uuid")
                return z.string().uuid();
            if (schema.format === "uri")
                return z.string().url();
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
            const shape = {};
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
function normalizeSchema(doc, schema, depth) {
    if (!schema || depth > 8)
        return undefined;
    if (schema.$ref) {
        const resolved = resolveRef(doc, schema.$ref);
        return normalizeSchema(doc, resolved, depth + 1);
    }
    const result = {
        type: schema.type,
        format: schema.format,
        description: schema.description,
    };
    if (schema.enum)
        result.enum = schema.enum;
    if (schema.required)
        result.required = schema.required;
    if (schema.properties) {
        result.properties = Object.fromEntries(Object.entries(schema.properties).map(([key, value]) => [key, normalizeSchema(doc, value, depth + 1)]));
    }
    if (schema.items) {
        result.items = normalizeSchema(doc, schema.items, depth + 1);
    }
    if (schema.oneOf)
        result.oneOf = schema.oneOf.map((x) => normalizeSchema(doc, x, depth + 1));
    if (schema.anyOf)
        result.anyOf = schema.anyOf.map((x) => normalizeSchema(doc, x, depth + 1));
    if (schema.allOf)
        result.allOf = schema.allOf.map((x) => normalizeSchema(doc, x, depth + 1));
    return result;
}
function extractContentExamples(example, examples) {
    const out = [];
    if (example !== undefined)
        out.push(example);
    if (examples) {
        for (const val of Object.values(examples)) {
            if (val && typeof val === "object" && "value" in val) {
                out.push(val.value);
            }
            else {
                out.push(val);
            }
        }
    }
    return out;
}
function extractPathPlaceholders(pathTemplate) {
    return [...pathTemplate.matchAll(/\{([^}]+)\}/g)].map((x) => x[1]);
}
function placeholderToArg(placeholder) {
    return placeholder.replace(/-/g, "_");
}
