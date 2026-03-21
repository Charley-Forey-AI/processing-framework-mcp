import { describe, expect, it } from "vitest";

import { buildToolContentPayload, summarizeListResult } from "../src/tools/helpers.js";

describe("tool response envelope helpers", () => {
  it("summarizes list responses with parseable summary fields", () => {
    const summary = summarizeListResult({
      items: [{ id: "a1" }, { id: "a2" }],
      current_page: 1,
      total_pages: 2,
    });

    expect(summary.item_count).toBe(2);
    expect(summary.sample_ids).toEqual(["a1", "a2"]);
    expect(summary.has_more).toBe(true);
  });

  it("builds content payload with summary and data fields", () => {
    const payload = buildToolContentPayload({
      status: 200,
      request_id: "req-1",
      response_contract: "pf://contracts/tool/pf_engines_list",
      data_shape: ["items", "total_pages"],
      item_count: 2,
      sample_ids: ["eng-1", "eng-2"],
      has_more: false,
      data: { items: [{ id: "eng-1" }, { id: "eng-2" }] },
    });
    const text = JSON.stringify(payload);
    const parsed = JSON.parse(text) as Record<string, unknown>;

    expect(parsed.item_count).toBe(2);
    expect(parsed.has_more).toBe(false);
    expect(parsed.data).toBeDefined();
  });
});
