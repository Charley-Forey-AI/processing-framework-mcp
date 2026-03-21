import "dotenv/config";

export type PfMcpConfig = {
  mcpHost: string;
  mcpPort: number;
  mcpPath: string;
  mcpCorsOrigins: string[];
  mcpApiKey?: string;
  mcpSessionTtlMs: number;
  pfApiBaseUrl: string;
  pfTimeoutMs: number;
  pfRetryCount: number;
  pfReadOnlyMode: boolean;
  pfMutationAllowlist: string[];
  pfMutationDenylist: string[];
  pfRequireMutationConfirmation: boolean;
  tidClientId: string;
  tidRedirectUri: string;
  tidScope: string;
  tidAuthorizeUrl: string;
  tidTokenUrl: string;
  tidTokenFile?: string;
  tidAllowAmbientToken: boolean;
  tidAmbientTokenHeader: string;
  tidRequiredScopes: string[];
  tidTokenSourceOrder: string[];
  tidAllowedAudiences: string[];
};

function requiredEnv(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function envOrDefault(value: string | undefined, fallback: string): string {
  if (!value || value.trim().length === 0) {
    return fallback;
  }
  return value;
}

export function loadConfig(): PfMcpConfig {
  const tidBase = envOrDefault(process.env.TID_BASE_URL, "https://id.trimble.com").replace(/\/$/, "");

  const config: PfMcpConfig = {
    mcpHost: envOrDefault(process.env.MCP_HOST, "127.0.0.1"),
    mcpPort: Number(process.env.MCP_PORT ?? "3000"),
    mcpPath: envOrDefault(process.env.MCP_PATH, "/mcp"),
    mcpCorsOrigins: (process.env.MCP_CORS_ORIGINS ?? "*")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    mcpApiKey: process.env.MCP_API_KEY,
    mcpSessionTtlMs: Number(process.env.MCP_SESSION_TTL_MS ?? "1800000"),
    pfApiBaseUrl:
      envOrDefault(
        process.env.PF_API_BASE_URL,
        "https://cloud.dev.api.trimblecloud.com/Processing/testapi/1",
      ),
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
    pfRequireMutationConfirmation:
      (process.env.PF_REQUIRE_MUTATION_CONFIRMATION ?? "false").toLowerCase() === "true",
    tidClientId: requiredEnv("TID_CLIENT_ID", process.env.TID_CLIENT_ID),
    tidRedirectUri: envOrDefault(process.env.TID_REDIRECT_URI, "http://localhost:8765/callback"),
    tidScope: envOrDefault(process.env.TID_SCOPE, "openid"),
    tidAuthorizeUrl: envOrDefault(process.env.TID_AUTHORIZE_URL, `${tidBase}/oauth/authorize`),
    tidTokenUrl: envOrDefault(process.env.TID_TOKEN_URL, `${tidBase}/oauth/token`),
    tidTokenFile: process.env.TID_TOKEN_FILE,
    tidAllowAmbientToken: (process.env.TID_ALLOW_AMBIENT_TOKEN ?? "true").toLowerCase() !== "false",
    tidAmbientTokenHeader: (process.env.TID_AMBIENT_TOKEN_HEADER ?? "authorization").toLowerCase(),
    tidRequiredScopes: (process.env.TID_REQUIRED_SCOPES ?? "")
      .split(" ")
      .map((x) => x.trim())
      .filter(Boolean),
    tidTokenSourceOrder: (process.env.TID_TOKEN_SOURCE_ORDER ?? "ambient,cached,pkce")
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean),
    tidAllowedAudiences: (process.env.TID_ALLOWED_AUDIENCES ?? process.env.TID_CLIENT_ID ?? "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  };

  validateConfig(config);
  return config;
}

function validateConfig(config: PfMcpConfig): void {
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
  if (config.tidTokenSourceOrder.length === 0) {
    throw new Error("TID_TOKEN_SOURCE_ORDER must include at least one source.");
  }
  const validSources = new Set(["ambient", "cached", "pkce"]);
  for (const source of config.tidTokenSourceOrder) {
    if (!validSources.has(source)) {
      throw new Error(`Invalid TID token source in TID_TOKEN_SOURCE_ORDER: ${source}`);
    }
  }
  try {
    new URL(config.pfApiBaseUrl);
    new URL(config.tidAuthorizeUrl);
    new URL(config.tidTokenUrl);
    new URL(config.tidRedirectUri);
  } catch {
    throw new Error("One or more configured URLs are invalid.");
  }
}
