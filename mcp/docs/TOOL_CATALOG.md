# PF MCP Tool Catalog

## Auth tools

- `pf_tid_login_url` - Generate TID authorize URL with PKCE.
- `pf_tid_exchange_code` - Exchange TID auth code for tokens.
- `pf_tid_status` - Check auth/session status.
- `pf_auth_ready_check` - Validate current auth source readiness (ambient/cached) before PF calls.
- `pf_api_server_info` - Show configured PF base URL and MCP endpoint settings.

## Operations

- `pf_operations_list` `GET /api/operations`
- `pf_operations_get` `GET /api/operations/{operation-id}`
- `pf_operations_create` `POST /api/operations`
- `pf_operations_update` `PUT /api/operations/{operation-id}`
- `pf_operations_delete` `DELETE /api/operations/{operation-id}`
- `pf_operations_approve` `PUT /api/operations/{operation-id}/approve`
- `pf_operations_clone` `POST /api/operations/{operation-id}/clone`
- `pf_operations_publish` `PUT /api/operations/{operation-id}/publish`
- `pf_operations_retire` `PUT /api/operations/{operation-id}/retire`

## Procedures

- `pf_procedures_list` `GET /api/procedures`
- `pf_procedures_get` `GET /api/procedures/{procedure-id}`
- `pf_procedures_create` `POST /api/procedures`
- `pf_procedures_update` `PUT /api/procedures/{procedure-id}`
- `pf_procedures_delete` `DELETE /api/procedures/{procedure-id}`
- `pf_procedures_approve` `PUT /api/procedures/{procedure-id}/approve`
- `pf_procedures_publish` `PUT /api/procedures/{procedure-id}/publish`
- `pf_procedures_retire` `PUT /api/procedures/{procedure-id}/retire`

## Executions

- `pf_executions_list` `GET /api/executions`
- `pf_executions_get` `GET /api/executions/{execution-id}`
- `pf_executions_create` `POST /api/executions`
- `pf_execution_activities` `GET /api/executions/{execution-id}/activities`
- `pf_execution_engine_data` `GET /api/executions/engine_data`
- `pf_execution_engine_logs` `GET /api/executions/engine_logs`
- `pf_execution_events` `GET /api/executions/{execution-id}/events`

## Engines

- `pf_engines_list` `GET /api/engines`
- `pf_engines_get` `GET /api/engines/{engine-id}`
- `pf_engines_create` `POST /api/engines`
- `pf_engines_update` `PUT /api/engines/{engine-id}`
- `pf_engines_delete` `DELETE /api/engines/{engine-id}`
- `pf_engines_retire` `PUT /api/engines/{engine-id}/retire`

## Deployments and secrets

- `pf_deployments_list` `GET /api/deployments`
- `pf_deployments_get` `GET /api/deployments/{deployment-id}`
- `pf_deployments_create` `POST /api/deployments`
- `pf_deployments_update` `PUT /api/deployments/{deployment-id}`
- `pf_deployments_delete` `DELETE /api/deployments/{deployment-id}`
- `pf_deployments_retire` `PUT /api/deployments/{deployment-id}/retire`
- `pf_deployment_secrets_create` `POST /api/deployments/{deployment-id}/secrets`
- `pf_deployment_secrets_list` `GET /api/deployments/{deployment-id}/secrets`
- `pf_deployment_secrets_get` `GET /api/deployments/{deployment-id}/secrets/{deployment-secret-id}`
- `pf_deployment_secrets_update` `PUT /api/deployments/{deployment-id}/secrets/{deployment-secret-id}`
- `pf_deployment_secrets_delete` `DELETE /api/deployments/{deployment-id}/secrets/{deployment-secret-id}`
- `pf_deployment_secrets_retire` `PUT /api/deployments/{deployment-id}/secrets/{deployment-secret-id}/retire`

## Workspaces

- `pf_workspaces_list` `GET /api/workspaces`
- `pf_workspaces_get` `GET /api/workspaces/{workspace-id}`
- `pf_workspaces_create` `POST /api/workspaces`
- `pf_workspaces_update` `PUT /api/workspaces/{workspace-id}`
- `pf_workspaces_retire` `PUT /api/workspaces/{workspace-id}/retire`
- `pf_workspace_operation_get` `GET /api/workspaces/{workspace-id}/operation`
- `pf_workspace_operation_update` `PUT /api/workspaces/{workspace-id}/operation`

## Execution schedules

- `pf_execution_schedules_list` `GET /api/execution_schedules`
- `pf_execution_schedules_get` `GET /api/execution_schedules/{execution-schedule-id}`
- `pf_execution_schedules_create` `POST /api/execution_schedules`
- `pf_execution_schedules_update` `PUT /api/execution_schedules/{execution-schedule-id}`

## Common arguments and output

- All API tools can accept:
  - path id fields inferred from placeholders (`operation_id`, `deployment_id`, etc.)
  - `query`: object for query params
  - `body`: object for JSON payload
- Standard output envelope:
  - `status`
  - `request_id`
  - `data`
  - `response_contract` (resource URI)
  - `data_shape` (top-level keys summary)

## Tool selection best practices

- Authenticate first (`pf_auth_ready_check`; if not ready, run `pf_tid_login_url` -> `pf_tid_exchange_code` -> `pf_tid_status`).
- Prefer `*_list` before `*_get`/`*_update` to discover valid IDs.
- Use `auto_paginate=true` with list tools when full result sets are required.
- Only mutate (`create/update/delete/approve/publish/retire`) after confirming target object details with `*_get`.

## Contract-aware helper tools

- `pf_contract_get` - Full request/response contract for a tool
- `pf_contract_validate_input` - Preflight input check before API calls
- `pf_contract_expected_response` - Response schema/examples by status
- `pf_tool_recommend` - Ranked suggestions from intent + known IDs
- `pf_dependencies_status` - Runtime dependency and reachability checks
- `pf_contract_changelog` - OpenAPI hash diff check
- `pf_response_project` - Response projection helper

## Request body and response expectations

- For POST/PUT bodies, use `pf_contract_get` or `pf://contracts/tool/{tool_name}`.
- For GET response expectations, use `pf_contract_expected_response` or `pf://examples/tool/{tool_name}`.
