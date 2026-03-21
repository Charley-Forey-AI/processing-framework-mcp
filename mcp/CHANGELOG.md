# Changelog

## 1.1.0 - Hardening phase 2

- Added OpenAPI-derived endpoint input schemas for MCP tools
- Added structured tool outputs (`structuredContent`) for agent-friendly parsing
- Added PF request timeout/retry and optional auto-pagination support
- Added Streamable HTTP session TTL cleanup
- Added optional MCP API key protection and configurable CORS allowlist
- Added health/readiness endpoints (`/health`, `/ready`)
- Added prompt/resource helpers and `pf_help` tool
- Added tests and CI workflow
