import "dotenv/config";
function requiredEnv(name, value) {
    if (!value || value.trim().length === 0) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
export function loadConfig() {
    const tidBase = (process.env.TID_BASE_URL ?? "https://id.trimble.com").replace(/\/$/, "");
    const config = {
        mcpHost: process.env.MCP_HOST ?? "127.0.0.1",
        mcpPort: Number(process.env.MCP_PORT ?? "3000"),
        mcpPath: process.env.MCP_PATH ?? "/mcp",
        mcpCorsOrigins: (process.env.MCP_CORS_ORIGINS ?? "*")
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
        mcpApiKey: process.env.MCP_API_KEY,
        mcpSessionTtlMs: Number(process.env.MCP_SESSION_TTL_MS ?? "1800000"),
        pfApiBaseUrl: process.env.PF_API_BASE_URL ??
            "https://cloud.dev.api.trimblecloud.com/Processing/testapi/1",
        pfTimeoutMs: Number(process.env.PF_TIMEOUT_MS ?? "20000"),
        pfRetryCount: Number(process.env.PF_RETRY_COUNT ?? "2"),
        pfReadOnlyMode: (process.env.PF_READ_ONLY_MODE ?? "false").toLowerCase() === "true",
        pfMutationAllowlist: (process.env.PF_MUTATION_ALLOWLIST ?? "")
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
        pfMutationDenylist: (process.env.PF_MUTATION_DENYLIST ?? "")
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
        pfRequireMutationConfirmation: (process.env.PF_REQUIRE_MUTATION_CONFIRMATION ?? "false").toLowerCase() === "true",
        tidClientId: requiredEnv("TID_CLIENT_ID", process.env.TID_CLIENT_ID),
        tidRedirectUri: process.env.TID_REDIRECT_URI ?? "http://localhost:8765/callback",
        tidScope: process.env.TID_SCOPE ?? "openid",
        tidAuthorizeUrl: process.env.TID_AUTHORIZE_URL ?? `${tidBase}/oauth/authorize`,
        tidTokenUrl: process.env.TID_TOKEN_URL ?? `${tidBase}/oauth/token`,
        tidTokenFile: process.env.TID_TOKEN_FILE,
    };
    validateConfig(config);
    return config;
}
function validateConfig(config) {
    if (!Number.isInteger(config.mcpPort) || config.mcpPort <= 0) {
        throw new Error("MCP_PORT must be a positive integer.");
    }
    if (!Number.isInteger(config.pfRetryCount) || config.pfRetryCount < 0) {
        throw new Error("PF_RETRY_COUNT must be a non-negative integer.");
    }
    if (config.pfTimeoutMs <= 0) {
        throw new Error("PF_TIMEOUT_MS must be > 0.");
    }
    if (config.mcpSessionTtlMs <= 0) {
        throw new Error("MCP_SESSION_TTL_MS must be > 0.");
    }
    try {
        new URL(config.pfApiBaseUrl);
        new URL(config.tidAuthorizeUrl);
        new URL(config.tidTokenUrl);
        new URL(config.tidRedirectUri);
    }
    catch {
        throw new Error("One or more configured URLs are invalid.");
    }
}
