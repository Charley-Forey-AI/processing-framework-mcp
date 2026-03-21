import { registerPfToolsWithConfig } from "./helpers.js";
export function registerProceduresTools(server, client, config) {
    registerPfToolsWithConfig(server, client, config, [
        {
            name: "pf_procedures_list",
            title: "List Procedures",
            description: "List procedures accessible to the authenticated user.",
            method: "GET",
            path: "/api/procedures",
        },
        {
            name: "pf_procedures_get",
            title: "Get Procedure",
            description: "Get one procedure by ID.",
            method: "GET",
            path: "/api/procedures/{procedure-id}",
        },
        {
            name: "pf_procedures_create",
            title: "Create Procedure",
            description: "Create a new procedure.",
            method: "POST",
            path: "/api/procedures",
        },
        {
            name: "pf_procedures_update",
            title: "Update Procedure",
            description: "Update an existing procedure by ID.",
            method: "PUT",
            path: "/api/procedures/{procedure-id}",
        },
        {
            name: "pf_procedures_delete",
            title: "Delete Procedure",
            description: "Delete a mutable procedure by ID.",
            method: "DELETE",
            path: "/api/procedures/{procedure-id}",
        },
        {
            name: "pf_procedures_approve",
            title: "Approve Procedure",
            description: "Approve a procedure for execution.",
            method: "PUT",
            path: "/api/procedures/{procedure-id}/approve",
        },
        {
            name: "pf_procedures_publish",
            title: "Publish Procedure",
            description: "Publish a procedure by ID.",
            method: "PUT",
            path: "/api/procedures/{procedure-id}/publish",
        },
        {
            name: "pf_procedures_retire",
            title: "Retire Procedure",
            description: "Retire a procedure by ID.",
            method: "PUT",
            path: "/api/procedures/{procedure-id}/retire",
        },
    ]);
}
