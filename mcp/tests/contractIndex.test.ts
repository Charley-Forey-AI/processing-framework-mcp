import { describe, expect, it } from "vitest";

import {
  getContractChangelog,
  getEndpointContract,
  getOpenApiContractHash,
} from "../src/schemas/openapiToolSchemas.js";

describe("Contract index adaptability", () => {
  it("produces deterministic hash", () => {
    const a = getOpenApiContractHash();
    const b = getOpenApiContractHash();
    expect(a).toBe(b);
    expect(a.length).toBeGreaterThan(20);
  });

  it("returns endpoint responses and body contract for mutation", () => {
    const contract = getEndpointContract("POST", "/api/operations");
    expect(contract.method).toBe("POST");
    expect(Object.keys(contract.responses).length).toBeGreaterThan(0);
  });

  it("exposes changelog state", () => {
    const result = getContractChangelog();
    expect(typeof result.changed).toBe("boolean");
    expect(typeof result.current_hash).toBe("string");
  });
});
