const SENSITIVE_KEY_PATTERN = /(token|secret|password|authorization|api[_-]?key)/i;

export function sanitizeForLogs(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeForLogs);
  }

  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEY_PATTERN.test(key)) {
        result[key] = "***redacted***";
      } else {
        result[key] = sanitizeForLogs(child);
      }
    }
    return result;
  }

  if (typeof value === "string" && value.length > 180 && value.includes(".")) {
    // Avoid echoing long token-like strings.
    return "***redacted***";
  }

  return value;
}
