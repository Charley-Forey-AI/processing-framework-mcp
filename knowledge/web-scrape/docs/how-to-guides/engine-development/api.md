---
title: "Submitting an Engine"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/engine-development/api/
fetched_at: 2026-03-20T19:37:23.767697+00:00
---

# Submitting an Engine

The Processing Framework API provides two important interfaces—Engines and Deployments. You've just finished the
development of an *Engine,* and it is ready to be uploaded into the service.

The Engines API acts similarly to a container registry. You provide relevant metadata about the Engine, and it will
provide temporary credentials that allow you to use native Docker commands to log in, tag, and push an image into the
system.

## Practical Examples

### Define an Engine

#### Request

```
 curl -X POST \
 --data @"engine.json" \
 --header "Content-Type: application/json" \
 --header 'Authorization: Bearer {TID Access Token}' \
 {{ pf_api }}/api/engines
```

You can find the value for `engine.json` [here](../../../../snippets/json/engine.json)

#### Response (`GENERATING_TOKEN`)

```
{
    "engine": {
        "owner": "docs_app",
        "trn": "trn:pfapi-1::engine:aa5e1ad2-91e0-42d0-a3df-89780a091915",
        "name": "Example Engine",
        "identifier": "example-engine",
        "tag": "v1",
        "os": "linux",
        "os_build": null,
        "id": "aa5e1ad2-91e0-42d0-a3df-89780a091915",
        "description": "A description the of the engine.",
        "status": "GENERATING_TOKEN",
        "ingestion_type": "acr_token",
        "regions": [
            "azure-us1"
        ],
        "created_at": "2023/11/02 02:39:45 +0000",
        "updated_at": "2023/11/02 02:39:45 +0000",
        "public": false,
        "env_vars": null,
        "secret_variables": null,
        "secret_files": null,
        "container_upload": {
            "acr_token": {
                "status": "GENERATING",
                "tag_command": "UNAVAILABLE",
                "push_command": "UNAVAILABLE",
                "login_command": "UNAVAILABLE"
            }
        }
    }
}
```

Note that `engine["container_upload"]["acr_token"]` is populated in the response body and has a `status` of
`GENERATING`.

#### Response (`AWAITING_IMAGE_UPLOAD`)

```
{
    "engine": {
        "owner": "docs_app",
        "trn": "trn:pfapi-1::engine:aa5e1ad2-91e0-42d0-a3df-89780a091915",
        "name": "Example Engine",
        "identifier": "example-engine",
        "tag": "v1",
        "os": "linux",
        "os_build": null,
        "id": "aa5e1ad2-91e0-42d0-a3df-89780a091915",
        "description": "A description the of the engine.",
        "status": "AWAITING_IMAGE_UPLOAD",
        "ingestion_type": "acr_token",
        "regions": [
            "azure-us1"
        ],
        "created_at": "2023/11/02 02:39:45 +0000",
        "updated_at": "2023/11/02 02:40:45 +0000",
        "public": false,
        "env_vars": null,
        "secret_variables": null,
        "secret_files": null,
        "container_upload": {
            "acr_token": {
                "status": "AVAILABLE",
                "tag_command": "docker tag <HASH> processingdevingestionazus2.azurecr.io/ingestion/30f385396cfd4d40bb428170c8cb2ac1:v009",
                "push_command": "docker push processingdevingestionazus2.azurecr.io/ingestion/30f385396cfd4d40bb428170c8cb2ac1:v009",
                "login_command": "docker login processingdevingestionazus2.azurecr.io -u tkn30f385396cfd4d40bb428170c8cb2ac1 -p RcoBa0IgSVTNie8tl3nSbhuOh8WjGUqfwRulkU5hYX+ACRA3Z1qT"
            }
        }
    }
}
```

### Ingest an Engine Image

The Engine has provided temporary credentials as well as `tag` and `push` commands that can be used to send the
container image to the Processing Framework. You must first login from your client using the provided command found in
`engine["container_upload"]["acr_token"]["login_command"]`. Next, tag the desired image on the client machine with the
tag provided in `engine["container_upload"]["acr_token"]["tag_command"]` - NOTE: you must replace `<HASH>` with the
desired image on the client machine. Finally, using the `engine["container_upload"]["acr_token"]["push_command"]` you
can send the tagged image into the Processing Framework.

### Define a Deployment

If your Engine does not specify any Secrets, then you can provide the `engine["id"]` in `deployment["active_engine"]` in
the initial POST request body. If your Engine does specify Secrets, then you must first define your Deployment without
`deployment["active_engine"]` specified because Deployment Secrets are a nested resource of the Deployment. This means
that you'll create the Deployment with no Engine, then you'll define the relevant Secrets, and finally update the
Deployment with the desired Engine ID.

#### Request

```
 curl -X POST \
 --data @"deployment.json" \
 --header "Content-Type: application/json" \
 --header 'Authorization: Bearer {TID Access Token}' \
 {{ pf_api }}/api/deployments
```

You can find the value for `deployment.json` [here](../../../../snippets/json/deployment.json)

#### Response

```
{
    "deployment": {
        "owner": "docs_app",
        "trn": "trn:pfapi-1::deployment:1994720c-3b62-479a-b687-1dd8727dda12",
        "name": "Example Deployment",
        "description": "A description the of the Deployment.",
        "identifier": "example-deployment",
        "id": "1994720c-3b62-479a-b687-1dd8727dda12",
        "status": "AVAILABLE",
        "active_engine": "aa5e1ad2-91e0-42d0-a3df-89780a091915",
        "regions": [
            "azure-us1"
        ],
        "scaling": {
            "max": 1,
            "min": 0
        },
        "computing": {
            "cpu": 0.25,
            "memory": 128
        },
        "created_at": "2023/11/02 01:19:26 +0000",
        "updated_at": "2023/11/02 01:19:28 +0000",
        "public": false,
        "operations": {},
        "secrets": {}
    }
}
```

### Define a Secret

#### Request

```
 curl -X POST \
 --data @"secret.json" \
 --header "Content-Type: application/json" \
 --header 'Authorization: Bearer {TID Access Token}' \
 {{ pf_api }}/api/deployments/:id/secrets
```

You can find the value for `secret.json` [here](../../../../snippets/json/deployment-secret.json)

#### Response

```
{
    "deployment_secret": {
        "owner": "docs_app",
        "trn": "trn:pfapi-1::deployment_secret:5a8d83df-e8e0-42a2-95f8-22a6308ebb92",
        "identifier": "SECRET_1",
        "name": "SECRET_1",
        "value": "SXQncyBhIHNlY3JldCE=",
        "regions": [
            "azure-us1"
        ],
        "description": "Documentation Secret Description",
        "id": "5a8d83df-e8e0-42a2-95f8-22a6308ebb92",
        "status": "AVAILABLE",
        "created_at": "2024/01/19 01:16:53 +0000",
        "updated_at": "2024/01/19 01:16:56 +0000"
    }
}
```

### Define an Operation for Deployment

```
 curl -X POST \
 --data @"operation.json" \
 --header "Content-Type: application/json" \
 --header 'Authorization: Bearer {TID Access Token}' \
 {{ pf_api }}/api/operations
```

You can find the value for `operation.json` [here](../../../../snippets/json/operation.json)

#### Response

```
{
    "operation": {
        "owner_name": "docs_app",
        "identifier": "example_operation",
        "version": 1,
        "name": "Example Deployment",
        "description": "Some descriptive information about the purpose of this Deployment.",
        "id": "b4114466-59da-4ed4-97db-953b660eee5e",
        "deployment_identifier": "example-deployment",
        "status": "EXECUTABLE",
        "execution_status": "READY",
        "created_at": "2023/09/11 20:57:47 +0000",
        "shared_with": [],
        "regions": [
            "azure-us1"
        ],
        "public": false,
        "dynamic_output": false,
        "deprecation_message": null,
        "retired_after": null,
        "parameters": {
            "DST_FORMAT": {
                "type": "single_choice",
                "description": "Destination Format",
                "name": "DST_FORMAT",
                "optional": false,
                "options": [
                    "GEOJSON",
                    "OGCKML",
                    "SHAPEFILE"
                ],
                "encrypted": false
            }
        },
        "inputs": {
            "SRC_DATASET": {
                "name": "Input File",
                "description": "This is the file that will be read into the Operation.",
                "data_types": [
                    "*"
                ],
                "optional": false
            }
        },
        "outputs": {
            "DST_DATASET": {
                "data_type": "*",
                "description": "This is the location that will be created by the Operation and sent out the output port.",
                "name": "Output Dataset"
            }
        }
    }
}
```
