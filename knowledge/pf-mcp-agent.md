# PF MCP Agent Knowledge

## Purpose

This MCP server exposes Trimble Cloud Processing Framework endpoints from `knowledge/pf_openapi_prod.yaml` as MCP tools.

## Authentication model

- PF API uses bearer JWTs from Trimble Identity (TID).
- Auth tools:
  - `pf_tid_login_url`
  - `pf_tid_exchange_code`
  - `pf_tid_status`
- OAuth flow:
  1. Build authorize URL with PKCE challenge.
  2. User signs in and receives `code`.
  3. Exchange code at `POST https://id.trimble.com/oauth/token`.
  4. Use `Authorization: Bearer <access_token>` for PF API calls.
  5. Refresh with `grant_type=refresh_token` as needed.

## Processing Framework concepts

- **Operations**: atomic processing actions.
- **Procedures**: workflows chaining operations.
- **Executions**: procedure runs.
- **Engines**: container images for operations.
- **Deployments**: runtime deployment specs for engines.
- **Deployment Secrets**: secure values attached to deployments.
- **Workspaces**: FME workspace resources.
- **Execution Schedules**: scheduled procedure executions.

## Environments

- Dev (selected): `https://cloud.dev.api.trimblecloud.com/Processing/testapi/1`
- Stage: `https://cloud.stage.api.trimblecloud.com/Processing/api/1`
- Prod: `https://cloud.api.trimble.com/Processing/api/1`

## Tool argument conventions

- Path params use underscore names: `{operation-id}` -> `operation_id`.
- `query` is an object of query params.
- `body` is JSON payload.
- For complete list answers, use `auto_paginate=true` on list tools.

## Tool orchestration rules

1. Run `pf_auth_ready_check` before PF API calls unless auth readiness is already known in current context.
2. For broad or ambiguous requests, run `pf_workflow_plan` first to get ordered tool steps.
3. If tool selection is uncertain, run `pf_tool_recommend`.
4. If required args are missing:
   - First check previous tool outputs.
   - Then run the relevant `*_list` tool to discover IDs.
   - Ask the user only for the minimal remaining missing value.
5. For POST/PUT mutations:
   - Call `pf_contract_get` for body requirements.
   - Call `pf_contract_validate_input` before execution.

## Response handling rules

- Prefer `structuredContent` when available.
- Parse and surface `data` directly; do not rely on status metadata alone.
- For list responses, include `item_count`, major statuses, and sample identifiers in user-facing summaries.
- On errors, parse the `error` envelope (`type`, `message`, `status`, `retryable`) and provide actionable next steps.

## Common execution sequences

- **Inspect resource by intent**
  - `pf_tool_recommend` -> `pf_*_list` -> `pf_*_get`

- **Mutation with safety checks**
  - `pf_requirement_graph` -> `pf_contract_get` -> `pf_contract_validate_input` -> mutation tool

- **Engine/deployment troubleshooting**
  - `pf_engines_list` -> `pf_engines_get` -> `pf_deployments_list` -> `pf_deployments_get`

## References

- OpenAPI: `knowledge/pf_openapi_prod.yaml`
- Trimble Identity docs:
  - `https://developer.trimble.com/docs/authentication`
  - `https://developer.trimble.com/docs/authentication/authorization-code-pkce`
