# PF MCP Server Instructions

This MCP server exposes the Trimble Cloud Processing Framework API and Trimble Identity auth helpers.

## Required auth flow

Auth source precedence is:

1. Ambient user token from request headers (Agent Studio / forwarded bearer token)
2. Cached TID session token (with refresh)
3. Manual PKCE login flow

- Call `pf_auth_ready_check`.
- If not ready, call `pf_tid_login_url`.
- Open `login_url` and sign in.
- Call `pf_tid_exchange_code` with the returned `code` (and `state` when available).
- Confirm with `pf_tid_status` or `pf_auth_ready_check`.

Always run `pf_auth_ready_check` before PF API resource tools unless a valid auth result is already present in the current conversation.

All `pf_*` API tools require a valid TID session and automatically use `Authorization: Bearer <token>`.

## Tool selection guidance

- Use `pf_*_list` tools to discover resources.
- Use `pf_*_get` tools to inspect one resource.
- Use `pf_*_create` tools to create resources.
- Use `pf_*_update` tools to change resources.
- Use `pf_*_delete` tools for deletions where API allows.
- Use `*_approve`, `*_publish`, `*_retire`, `*_clone` for lifecycle actions.
- For ambiguous requests, call `pf_workflow_plan` first to generate ordered steps and missing requirements.
- For uncertain tool choice, call `pf_tool_recommend` with `intent` and any known IDs.

## Input conventions

- Path IDs use underscore names from placeholder names:
  - `{operation-id}` -> `operation_id`
  - `{deployment-secret-id}` -> `deployment_secret_id`
- `query` accepts a JSON object of query parameters.
- `body` accepts a JSON payload as documented in `knowledge/pf_openapi_prod.yaml`.
- When listing resources for user-facing answers, prefer `auto_paginate=true` so returned results are complete.
- For explicit contracts/examples, use:
  - `pf_contract_get`
  - `pf_contract_validate_input`
  - `pf_contract_expected_response`
  - resources `pf://contracts/tool/{tool_name}` and `pf://examples/tool/{tool_name}`

## Output conventions

Every tool returns JSON text with:

- `status`: HTTP status code
- `request_id`: value from `tpaas-request-id` header (if present)
- `data`: parsed JSON response or text body
- `item_count`, `sample_ids`, `has_more` when the response contains list items

Structured outputs are also provided for tools so MCP clients can use machine-readable results.

If a call fails, the response includes an `error` envelope with `type`, `message`, `status` (when available), and retry hints.

## Security notes

- If `MCP_API_KEY` is set, clients must send `x-mcp-api-key`.
- Set `MCP_CORS_ORIGINS` to a strict allowlist in non-local deployments.
- Sensitive fields in error payloads are redacted before logging.
- Ambient tokens must pass issuer/audience/expiry/scope checks before use.
- If Studio tokens use a different audience than `TID_CLIENT_ID`, set `TID_ALLOWED_AUDIENCES`.
- Ambient tokens are request-scoped by default and are not persisted to token storage.

## Decision flows

- **Need the right tool?** Run `pf_tool_recommend` with intent + known IDs.
- **Need request body for POST/PUT?** Run `pf_contract_get` for tool_name and use `input.body`.
- **Need expected GET response shape?** Run `pf_contract_expected_response` with tool_name.
- **Want a safe mutation preflight?** Use target mutation tool with `dry_run=true`.
- **Need required args and where to fetch them?** Run `pf_requirement_graph` with tool_name.
- **Need a deterministic sequence for a user request?** Run `pf_workflow_plan` with `intent` and `known_context`.

## Orchestration policies

- Ask for the minimum missing input only when it cannot be derived from prior tool outputs.
- Prefer self-resolution order for IDs: `conversation_history` -> `*_list` discovery tool -> ask user.
- Before mutation tools:
  1. Discover IDs (`*_list`)
  2. Inspect target (`*_get`)
  3. Validate payload (`pf_contract_validate_input`)
  4. Execute mutation
- Surface actionable results directly to the user (do not hide list data behind metadata-only summaries).

## Example workflows

- **List engines with complete results**
  1. `pf_auth_ready_check`
  2. `pf_engines_list` with `auto_paginate=true`
  3. Return `data.items` with count/status highlights

- **Update deployment secret**
  1. `pf_deployments_list` (discover `deployment_id`)
  2. `pf_deployment_secrets_list` (discover `deployment_secret_id`)
  3. `pf_contract_get` for `pf_deployment_secrets_update`
  4. `pf_contract_validate_input`
  5. `pf_deployment_secrets_update`

## API reference

- Primary source: `knowledge/pf_openapi_prod.yaml`
- Auth source: Trimble Identity docs (`/oauth/authorize` and `/oauth/token`)
