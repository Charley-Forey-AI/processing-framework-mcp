import { describe, expect, it } from "vitest";
import { z } from "zod";

import { getToolInputSchema } from "../src/schemas/openapiToolSchemas.js";

describe("OpenAPI tool input schemas", () => {
  it("builds operation get schema with path parameter", () => {
    const shape = getToolInputSchema("GET", "/api/operations/{operation-id}");
    expect(Object.keys(shape)).toContain("operation_id");
  });

  it("builds create operation schema with required body", () => {
    const shape = getToolInputSchema("POST", "/api/operations");
    const schema = z.object(shape);
    const parsed = schema.safeParse({ body: { operation: { identifier: "x" } } });
    expect(parsed.success).toBe(true);
  });
});
