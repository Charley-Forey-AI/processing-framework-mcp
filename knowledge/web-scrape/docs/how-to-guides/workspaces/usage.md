---
title: "Using a Workspace"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/workspaces/usage/
fetched_at: 2026-03-20T19:37:33.677372+00:00
---

# Using a Workspace

## Create an Operation

After the Workspace is available, you will see an `operation_definition` value on the object.
This is a definition for an Operation object that was generated during the creation.

Example GET request reponse

```
{
    "workspace": {
        "owner": "pf-workspace-owner-preprod",
        "trn": "trn:pfapi-1::workspace:3fd88600-e686-47a1-98f8-5652a7759939",
        "identifier": "test_workspace",
        "id": "3fd88600-e686-47a1-98f8-5652a7759939",
        "status": "AVAILABLE",
        "deployment_identifier": "fme-2023-linux-v1-2023-0-0-3",
        "dataocean_path": "368b8e7c-822a-4bea-bf39-8dfd7b753264:/fme-ingestion/test_workspace.fmw",
        "created_at": "2024/02/29 18:28:43 +0000",
        "updated_at": "2024/02/29 18:29:00 +0000",
        "operation_definition": {
            "operation": {
                "identifier": "test_workspace",
                "name": "test workspace",
                "version": 1,
                "deployment_identifier": "fme-2023-linux-v1-2023-0-0-3",
                "inputs": {
                    "SOURCE_DATASET": {
                        "name": "SOURCE_DATASET",
                        "data_types": [
                            "*"
                        ]
                    }
                },
                "outputs": {
                    "OUTPUT_DATASET": {
                        "name": "OUTPUT_DATASET",
                        "data_type": "*"
                    }
                },
                "parameters": {
                    "IN_ATTR": {
                        "type": "string",
                        "optional": false
                    }
                }
            }
        }
    }
}
```

This field should be carefully reviewed for accuracy, and updated as needed. The inputs, outputs and parameters
should match the workspace's User Parameters exactly. Even though any input and output paths are defined as
User Parameters in FME, they need to be defined as inputs and outputs on the Operation definition.
The fields `identifier` and `deployment` cannot be changed.

### Update an Operation Definition

If the `operation_definition` value needs to be corrected, it can be changed via a PUT request.

For example, using the response above we are able to add a missing parameter `ATTR_1` with the following request:

`PUT {{ pf_api }}/api/workspaces/{workspace-id}/operation`

```
{
  "operation": {
        "parameters": {
            "IN_ATTR": {
                "type": "string",
                "optional": false
            },
            "ATTR_1": {
                "type": "string",
                "optional": true
            }
        }
  }
}
```

Even though `IN_ATTR` already existed, it still must be included in the the update request.
Since there are no changes to the `input` or `output` fields, they do not need to be included in the request.

### Create the Operation Resource

Once the Workspace's `operation_definition` field correctly reflects the FME Workspace, it can be used to create an
Operation in Processing Framework. This is done with a PUT request using `?action=approve`.

`PUT {{ pf_api }}/api/workspaces/{workspace-id}/operation?action=approve`

This request will return the Operation object.

## Create a Procedure

Processing Framework operates around Procedures. Procedures outline the "steps" to be done in an Execution.
The Operation created in the previous step can now be included in a Procedure. This is done by referring to the
`identifier` and `version` of the Operation, which is shown in the response from the last step
