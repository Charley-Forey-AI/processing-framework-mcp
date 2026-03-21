import { registerPfToolsWithConfig } from "./helpers.js";
export function registerOperationsTools(server, client, config) {
    registerPfToolsWithConfig(server, client, config, [
        {
            name: "pf_operations_list",
            title: "List Operations",
            description: "List operations accessible to the authenticated user.",
            method: "GET",
            path: "/api/operations",
        },
        {
            name: "pf_operations_get",
            title: "Get Operation",
            description: "Get one operation by ID.",
            method: "GET",
            path: "/api/operations/{operation-id}",
        },
        {
            name: "pf_operations_create",
            title: "Create Operation",
            description: "Create a new operation.",
            method: "POST",
            path: "/api/operations",
        },
        {
            name: "pf_operations_update",
            title: "Update Operation",
            description: "Update an existing operation by ID.",
            method: "PUT",
            path: "/api/operations/{operation-id}",
        },
        {
            name: "pf_operations_delete",
            title: "Delete Operation",
            description: "Delete a mutable operation by ID.",
            method: "DELETE",
            path: "/api/operations/{operation-id}",
        },
        {
            name: "pf_operations_approve",
            title: "Approve Operation",
            description: "Approve an operation for use.",
            method: "PUT",
            path: "/api/operations/{operation-id}/approve",
        },
        {
            name: "pf_operations_clone",
            title: "Clone Operation",
            description: "Clone an operation by ID.",
            method: "POST",
            path: "/api/operations/{operation-id}/clone",
        },
        {
            name: "pf_operations_publish",
            title: "Publish Operation",
            description: "Publish an operation by ID.",
            method: "PUT",
            path: "/api/operations/{operation-id}/publish",
        },
        {
            name: "pf_operations_retire",
            title: "Retire Operation",
            description: "Retire an operation by ID.",
            method: "PUT",
            path: "/api/operations/{operation-id}/retire",
        },
    ]);
}
