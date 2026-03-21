# Processing Framework MCP Server (TID)

Streamable HTTP MCP server for Trimble Cloud Processing Framework, authenticated with Trimble Identity (PKCE + bearer token).

## Setup

```bash
npm install
```

## Environment variables

- `TID_CLIENT_ID` (required)
- `TID_REDIRECT_URI` (default: `http://localhost:8765/callback`)
- `TID_SCOPE` (default: `openid`, should include PF scopes, e.g. `openid processing.read`)
- `TID_REQUIRED_SCOPES` (space-delimited scopes required for ambient/studio tokens)
- `TID_ALLOW_AMBIENT_TOKEN` (default: `true`, allow studio-forwarded user tokens)
- `TID_AMBIENT_TOKEN_HEADER` (default: `authorization`, can be custom header name)
- `TID_TOKEN_SOURCE_ORDER` (default: `ambient,cached,pkce`)
- `TID_ALLOWED_AUDIENCES` (comma-separated accepted `aud` values for ambient tokens; defaults to `TID_CLIENT_ID`)
- `TID_TOKEN_FILE` (optional token persistence file path)
- `PF_API_BASE_URL` (default: `https://cloud.dev.api.trimblecloud.com/Processing/testapi/1`)
- `MCP_HOST` (default: `127.0.0.1`)
- `MCP_PORT` (default: `3000`)
- `MCP_PATH` (default: `/mcp`)
- `MCP_CORS_ORIGINS` (default: `*`, comma-separated allowlist)
- `MCP_API_KEY` (optional shared secret sent as `x-mcp-api-key`)
- `MCP_SESSION_TTL_MS` (default: `1800000`)
- `PF_TIMEOUT_MS` (default: `20000`)
- `PF_RETRY_COUNT` (default: `2`)
- `PF_READ_ONLY_MODE` (default: `false`)
- `PF_REQUIRE_MUTATION_CONFIRMATION` (default: `false`)
- `PF_MUTATION_ALLOWLIST` (comma-separated allowed mutation tool names)
- `PF_MUTATION_DENYLIST` (comma-separated denied mutation tool names)
- `TID_BASE_URL` (default: `https://id.trimble.com`)
- `TID_AUTHORIZE_URL` / `TID_TOKEN_URL` (optional explicit overrides)

## Run

### Streamable HTTP (primary)

```bash
npm run start
```

Default endpoint:

`http://127.0.0.1:3000/mcp`

### STDIO (optional local transport)

```bash
npm run start:stdio
```

## Cursor MCP config example

Use a remote MCP entry pointed at your streamable endpoint:

- URL: `http://127.0.0.1:3000/mcp`

## Authentication flow in chat

1. Call `pf_auth_ready_check` (if running in Agent Studio with forwarded bearer token, this may already be ready)
2. If not ready, call `pf_tid_login_url`
3. Open `login_url`, sign in, copy `code` (and `state` if available)
4. Call `pf_tid_exchange_code`
5. Call `pf_tid_status` (or `pf_auth_ready_check`)
6. Use `pf_*` tools

## Local auth validation

Run a deterministic local auth check:

```bash
npm run auth:validate
```

This prints:

- `ready` from `pf_auth_ready_check`
- `status` from `pf_tid_status`
- generated `login_url` (PKCE)

Optional ambient/studio-token simulation:

```bash
TEST_BEARER_TOKEN="<jwt>" npm run auth:validate
```

Optional PF smoke call:

```bash
RUN_PF_SMOKE=true npm run auth:validate
```

If `ready=true` but smoke fails, the token is accepted by local validation but rejected by PF API (typically missing PF scopes or entitlement at Identity/API side).

## Tool and usage docs

- `docs/SERVER_USE_INSTRUCTIONS.md`
- `docs/TOOL_CATALOG.md`
- OpenAPI source: `../knowledge/pf_openapi_prod.yaml`

## Contract intelligence tools

- `pf_contract_get`
- `pf_contract_validate_input`
- `pf_contract_expected_response`
- `pf_contract_changelog`
- `pf_tool_recommend`
- `pf_dependencies_status`
- `pf_response_project`
- `pf_auth_ready_check`

## Contract and examples resources

- `pf://contracts/tool/{tool_name}`
- `pf://examples/tool/{tool_name}`
- `pf://dependencies`

## Production hardening checklist

- Use `MCP_CORS_ORIGINS` allowlist (avoid `*` in production)
- Set `MCP_API_KEY` if endpoint is remotely accessible
- Run behind TLS reverse proxy
- Persist tokens with `TID_TOKEN_FILE` in a secure path
- Keep `PF_TIMEOUT_MS` and `PF_RETRY_COUNT` tuned to environment latency

## Troubleshooting TID errors

- `invalid_grant`: auth code expired or reused; generate a fresh login URL
- Redirect mismatch: ensure `TID_REDIRECT_URI` exactly matches registered app redirect
- `401` from PF API: token missing/expired; re-run auth flow
- No refresh token: verify scopes/PKCE settings in TID app configuration
- `invalid_request` with openid only: include PF API scopes in `TID_SCOPE` (not just `openid`)
- `Scope '<name>' matches no known application`: the scope string is not registered for your TID client; use only exact scopes from Trimble app registration
- Ambient `audience mismatch`: add Studio/local client audiences to `TID_ALLOWED_AUDIENCES`
