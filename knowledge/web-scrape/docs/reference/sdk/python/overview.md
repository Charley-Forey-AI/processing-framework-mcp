---
title: "TrimbleCloud.Processing"
source_url: https://docs.trimblecloud.com/processing-framework/content/reference/sdk/python/overview/
fetched_at: 2026-03-20T19:37:53.362048+00:00
---

# TrimbleCloud.Processing

## Processing Framework SDK for Python

The Processing Framework is the Trimble Cloud Platform system for constructing operations, procedures, and executions for processing.

## Getting Started

### Installation

This SDK is available as a NuGet package from [Trimble Artifactory](https://artifactory.trimble.tools/ui/repos/tree/General/trimblecloudplatform-engagement-pypi). To install, use the following command:

```
pip install TrimbleCloud.Processing
```

### Processing Endpoints

| Environment | Base URL Endpoint |
| --- | --- |
| Stage | https://cloud.stage.api.trimblecloud.com/Processing/api/1/api/ |
| Production | https://cloud.api.trimble.com/Processing/api/1/api/ |

## Create Processing Client

To create a client object to access the Processing framework, you will need a processing endpoint and a token provider. The Processing client can use token providers from the `trimble-id` sdk to authenticate and access the processing endpoint.

For more details on token providers, refer to the [Trimble Identity Python SDK Documentation](https://docs.trimblecloud.com/trimble-identity/content/reference/sdk/python/overview/).

```
from trimble.id import ClientCredentialTokenProvider, OpenIdEndpointProvider, BearerTokenHttpClientProvider

from TrimbleCloud.Processing import ProcessingClient

# We first setup a TID provider for communications with our authorization server TID
endpoint_provider = OpenIdEndpointProvider("https://stage.id.trimblecloud.com/.well-known/openid-configuration")

# We then set up a token provider to handle the token exchange with TID
token_provider = ClientCredentialTokenProvider(endpoint_provider=endpoint_provider, client_id="<CLIENT_ID>", client_secret="<CLIENT_SECRET>").with_scopes(["<SCOPES>"])

# Create processing client
processing_client = ProcessingClient(token_provider=token_provider, base_url="<PROCESSING_BASE_URL>")
```

## Operations

* Operations are the basic building blocks of processing.
* An Operation exposes a single function of a backend Processing Engine such as reprojection, writing a file to data ocean, or transforming one type of data into another.

### List

Gets Operation objects that the user has access to view.

```
query_params = { "per_page": 5, "page": 1 } # Optional
list = await processing_client.operations.list(query_params)
```

### List (Sync)

List all operations that the user has access to view.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
operations = client.operations.list_sync()
for operation in operations:
    print(operation)
```

### Create

Create a new operation.

```
operation = await processing_client.operations.create(
    identifier="dataocean_download_path",
    version=10,
    deployment_identifier="dataoceanoperations",
    name="Data Ocean Download by Path",
    description="Download a file or directory of files from Data Ocean.",
    shared_with=["API-Testing"],
    output_parameters=[
        {
            "output_parameter_identifier": {
                "type": "string",
                "description": "a sample output parameter",
                "name": "sample output parameter",
                "optional": False
            }
        }
    ],
    parameters=[
        {
            "parameter_identifier": {
                "type": "string",
                "description": "The Dropbox access token used to download the file",
                "name": "Dropbox Access Token",
                "optional": True,
                "encrypted": False
            }
        }
    ],
    inputs=[
        {
            "input_identifier": {
                "data_types": [
                "*"
                ],
                "description": "Anything goes",
                "name": "first input",
                "optional": True
            }
        }
    ],
    outputs=[
        {
            "output_identifier": {
                "data_type": "*",
                "description": "this output is x",
                "name": "first output port"
            }
        }
    ]
)
```

**Create Operation Parameters**

| Parameter | Description | Type | Required |
| --- | --- | --- | --- |
| `identifier` | Unique identifier string for the Operation. Must be between 8 to 256 characters, start with a letter, and can contain only lowercase letters, numbers, underscores, and hyphens. | string | Required |
| `version` | The version of the Operation. Operations can be versioned to facilitate lifecycle events of engines and Procedures. | integer | Required |
| `deployment_identifier` | The identifier of the Deployment that supports this Operation. The Deployment is the abstraction layer that accommodates the ability to create a new Engine and expose it through a Deployment so there is no need to change existing Operations and Procedures. | string | Required |
| `regions` | Allowable locations that a particular Operation can run in. | List of strings |  |
| `public` | The state of the Operation's publication. If true, the Operation is available for public use. | boolean |  |
| `name` | Human-readable name of the Operation. | string |  |
| `description` | A description of an Operation and its function. | string |  |
| `engine_name` | The name of the backend engine that supports this Operation. LEGACY is used for Engine's that have already been established in the system prior to the creation of the Engines APIs. | string |  |
| `shared_with` | The UUID of the Engine Version that supports this Operation. | List of strings |  |
| `parameters` | A list of parameter objects attached to this Operation. | dict |  |
| `output_parameters` | A list of parameter objects that define values to be output from an Operation. | dict |  |
| `inputs` | Named inputs for the Operation. | dict |  |
| `outputs` | Named inputs for the Operation. | dict |  |
| `dynamic_output` | Indicates whether or not the Output content is considered dynamic or not. In all cases except for the Switcher Operation, this will be false. | boolean |  |
| `deprecation_message` | Optional string parameter. | string |  |
| `retired_after` | Optional string parameter. | string |  |

Refer this [link](https://docs.trimblecloud.com/processing-framework/content/reference/oas/#post-/api/operations) for more details on parameters.

### Get

Get an operation by ID.

```
operation = await processing_client.operations.get(id="<OPERATION_ID>")
```

### Update

Update an operation.

> ***NOTE:*** An Operation can only be updated when it is in a MUTABLE state (prior to approval).

```
operation = await processing_client.operations.update(id="<OPERATION_ID>", name="New name", description="A new description for the operation.")
```

### Delete

Delete an operation.

```
await processing_client.operations.delete(id="<OPERATION_ID>")
```

### Approve

Approve an operation.

```
operation = await processing_client.operations.approve(id="<OPERATION_ID>")
```

### Clone

Clone an operation.

```
operation = await processing_client.operations.clone(id="<OPERATION_ID>")
```

### Publish

Publish an operation.

```
operation = await processing_client.operations.publish(id="<OPERATION_ID>")
```

### Retire

Retire an operation.

```
operation = await processing_client.operations.retire(id="<OPERATION_ID>")
```

## Procedures

* A Procedure defines a processing workflow in the Processing Framework.
* It encapsulates a set of Operations (one or multiple), describes the workflow's parameters, and defines parameter and input/output mappings between Operations.

### List

Get a list of procedures.

```
query_params = { "per_page": 5, "page": 1 } # Optional
list = await processing_client.procedures.list(query_params)
```

### List (Sync)

List all procedures that the user has access to view.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
procedures = client.procedures.list_sync()
for procedure in procedures:
    print(procedure)
```

### Create

Create a new procedure.

```
procedure = await processing_client.procedures.create(
        identifier="pdf_proc_test",
        version=1,
        default_region="aws-us1",
        operations={
            "download_file": {
                "identifier": "dataocean_read",
                "version": 2,
                "name": "Download file",
                "description": "download a file from Trimble Data Ocean",
                "parameters": {
                    "target": {
                        "source": "INPUT_FILE_ID"
                    }
                }
            }
        },
        name="PDF Proc Example",
        description="Example procedure to take DO image, convert to PDF, load to DO",
        parameters={
            "INPUT_FILE_ID": {
                "name": "Input file id",
                "description": "uuid of the input file"
            }
        }
    )
```

**Create Procedure Parameters**

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `identifier` | Unique identifier string for the Procedure. Must be between 8 to 256 characters, start with a letter, and can contain only lowercase letters, numbers, underscores, and hyphens. | string | Required |
| `version` | The version of the Procedure. | integer | Required |
| `default_region` | Region name the Procedure should execute in by default. | string | Required |
| `operations` | Mapping of Procedure names and definitions.This is where the user specifies which Procedures make up the Procedure and how those Operations chain together. 1 or many Procedures can be combined in to a procedure. All Procedures in a Procedure must share at least one common Region. | dict | Required |
| `name` | Human-readable name of the Procedure. | string |  |
| `description` | A description of an Procedure and its function. | string |  |
| `tags` | List of tags (as strings) associated with the Procedure. | string |  |
| `documentation_url` | Optional URL to reference external documentation for the Procedure. | string |  |
| `shared_with` | List of names of Users with whom this Procedure has been shared. | List of strings |  |
| `parameters` | Parameter mappings for the Procedures contained within the Procedure. | dict |  |

Refer this [link](https://docs.trimblecloud.com/processing-framework/content/reference/oas/#post-/api/procedures) for more details on parameters.

### Get

Get a procedure by ID.

```
procedure = await processing_client.procedures.get(id="<PROCEDURE_ID>")
```

### Update

Update a Procedure object.

A Procedure can only be updated after its creation but before its approval. i.e. It must have a status of MUTABLE and an execution\_status of NOT\_READY. Once a Procedure has been approved, only its shared\_with, documentation\_url, and default\_region attributes can be updated.

```
procedure = await processing_client.procedures.update(id="<PROCEDURE_ID>", description="Description Updated Partial Update - This Procedure tests the tzf_to_las operation.")
```

### Delete

Delete a procedure.

```
await processing_client.procedures.delete(id="<PROCEDURE_ID>")
```

### Approve

Approve a procedure.

```
procedure = await processing_client.procedures.approve(id="<PROCEDURE_ID>")
```

### Publish

Publish a procedure.

```
procedure = await processing_client.procedures.publish(id="<PROCEDURE_ID>")
```

### Retire

Retire a procedure.

```
procedure = await processing_client.procedures.retire(id="<PROCEDURE_ID>")
```

## Executions

* An Execution, or 'Procedure Execution', represents a single request for processing data against a Procedure.
* Executions specify the source data and parameter values used in processing of a desired Procedure.

### List

Get a list of executions.

```
query_params = { "per_page" : 5 , "page" : 1 } # Optional
list = await processing_client.executions.list(query_params)
```

### List (Sync)

List all executions that the user has access to view.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
executions = client.executions.list_sync()
for execution in executions:
    print(execution)
```

### Create

Creates and starts a new execution in the system.

```
execution = await processing_client.executions.create(
    procedure_id="<PROCEDURE_ID>",
    data_export=False,
    region="azure-us1",
)
```

**Create Execution Parameters**

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `procedure_id` | The unique identifier of the target Procedure. | string | Required |
| `data_export` | Whether or not the execution's data will be available for export. Default to false. | boolean |  |
| `region` | Region name for the Execution to run in. Must be a name seen in the Procedure's regions list. If not provided, then default\_region of the Procedure is used. | string |  |
| `parameters` | Mapping of Procedure-specified parameter names to parameter values. This is where the user specifies Procedure specific parameter field names and values for the Execution. | dict |  |
| `procedure_identifier` | The identifier of the target Procedure for Execution. | string |  |
| `procedure_version` | The version of the target Procedure for Execution. | integer |  |
| `metadata` | User-specified metadata to be associated with the Execution. | string |  |
| `bound_parameters` | Mapping of Operation-specified output parameter names to output parameter values. This is where Operation output parameters are written once an Operation within the Execution completes. | dict |  |

Refer this [link](https://docs.trimblecloud.com/processing-framework/content/reference/oas/#post-/api/executions) for more details on parameters.

### Get

Get an execution by ID.

```
execution = await processing_client.executions.get(id="<EXECUTION_ID>")
```

### List Activities

Get the list of activities tied to an execution.

```
query_params = { "per_page" : 10 , "page" : 1 } # Optional
activities_list = await processing_client.executions.list_activities(id="<EXECUTION_ID>", query_params=query_params)
```

### List Activities (Sync)

List all activities tied to an execution.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
activities = client.executions.list_activities_sync(execution_id="<EXECUTION_ID>")
for activity in activities:
    print(activity)
```

### Get Data

Get execution data.

```
execution = await processing_client.executions.get_data(id="<EXECUTION_ID>", output_path="<OUTPUT_PATH>")
```

### Get Logs

Get execution logs via DataOcean.

```
execution = await processing_client.executions.get_logs(id="<EXECUTION_ID>", output_path="<OUTPUT_PATH>")
```

### List Events

Get the list of events tied to an execution.

```
query_params = { "per_page" : 10 , "page" : 1 } # Optional
events_list = await processing_client.executions.list_events(id="<EXECUTION_ID>", query_params=query_params)
```

### List Events (Sync)

List all events tied to an execution.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
events = client.executions.list_events_sync(execution_id="<EXECUTION_ID>")
for event in events:
    print(event)
```

## Engines

* Engines are low-level resource in the Processing Framework that represent a container image stored in the service.
* They provide the interface for how to define and configure a container with direct, optional, relation to how the code in the container is written.

### List

Get a list of engines.

```
query_params = { "per_page" : 5 , "page" : 1 } # Optional
list = await processing_client.engines.list(query_params)
```

### List (Sync)

List all engines available to the requesting user.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
engines = client.engines.list_sync()
for engine in engines:
    print(engine)
```

### Create

Create a new engine.

```
engine = await processing_client.engines.create(
    identifier="example-engine",
    tag="v1",
    ingestion_type="acr_token",
    os="linux",
    regions=[ "azure-us1" ],
    name="Example Engine",
    description="A description the of the engine."
)
```

**Create Engine Parameters**

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `identifier` | Engine identifier, unique within the system. It must 32 characters or less, start with a-z, end with an alphanumeric value, and can only contain the characters a-z, 0-9, and -. | string | Required |
| `tag` | An Engine tag must start with [a-z], end with an alphanumeric value, and can only contain [a-z, 0-9, '-']. | string | Required |
| `ingestion_type` | The method of uploading a container image into our system. Currently the only option is a temporary ACR token upload.  **Allowed:** acr\_token | enum | Required |
| `os` | Which OS for the Engine to use.  **Allowed:** linux | windows | enum | Required |
| `regions` | The location(s) this resource can run in. Regions are a combination of two key pieces of information - the Cloud Provider and the specific region from that Provider. | List of strings | Required |
| `name` | Engine name. Metadata only.  **Constraints:** Max 64 chars | string |  |
| `description` | A description of the Engine and its function. | string |  |
| `os_build` | Specify which OS build to use. This is a required parameter for Windows Engines only. At this time, the Engines API directly supports Windows Server 2019 (10.0.17763), and can optionally support Windows Server 2022 (10.0.20348).  **Allowed:** 10.0.17763 | 10.0.20348 | enum |  |
| `env_vars` | Environment variables that are stored and ingested into the Engine's container as literal plain-text values. | list |  |
| `secret_variables` | Secret variables | list |  |
| `secret_files` | Secret files | list |  |
| `public` | The state of the Engine's publication. Publishing Engines is not currently supported. | boolean |  |

Refer this [link](https://docs.trimblecloud.com/processing-framework/content/reference/oas/#post-/api/engines) for more details on parameters.

### Get

Get an engine by ID.

```
engine = await processing_client.engines.get(id="<ENGINE_ID>")
```

### Update

Update an engine. Only the name and description can be updated.

```
engine = await processing_client.engines.update(
    id="<ENGINE_ID>",
    name="A New Name",
    description="A new description."
)
```

### Retire

Retire an engine.

```
engine = await processing_client.engines.retire(id="<ENGINE_ID>")
```

### Push Image

Push your source image to Processing AWS Container Registry for deployment.

The source image is a local image referenced by name. It must be the full image name in the format of SOURCE\_IMAGE[:TAG]. If the tag is not specified, it will use latest by default.

```
response = await client.engines.push_image(
    id="<ENGINE_ID>",
    source_image_name="source_image_name:tag"
)

for line in response:
    print(line)
```

## Deployments

* The concept of Deployments provides the configurable interface for the following topics:
  + Operation to Engine Image relationship
  + Scaling
  + Compute resource definition

### List

Get a list of deployments.

```
query_params = { "per_page" : 5 , "page" : 1 } # Optional
list = await processing_client.deployments.list(query_params)
```

### List (Sync)

List all deployments available to the requesting user.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
deployments = client.deployments.list_sync()
for deployment in deployments:
    print(deployment)
```

### Create

Create a new deployment.

```
deployment = await processing_client.deployments.create(
    identifier="example-deployment",
    regions=[ "azure-us1" ],
    scaling={ "min": 0, "max": 2 },
    computing={ "cpu": 0.5, "memory": 512 },
    name="Example Deployment",
    description="A description the of the Deployment."
)
```

**Create Deployment Parameters**

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `identifier` | A Deployment Identifier is unique within the system. The value must start with [a-z], end with an alphanumeric value, and can only contain [a-z, 0-9, '-'].  **Constraints:** 1 to 32 chars | string | Required |
| `regions` | The location(s) this resource can run in. Regions are a combination of two key pieces of information - the Cloud Provider and the specific region from that Provider. | List of strings | Required |
| `scaling` | The configuration object to define minimum and maximum number of concurrent Engines that can be running simultaneously. | dict | Required |
| `computing` | The configuration object to define the Engine-compute resources for memory and CPU allocation. | dict | Required |
| `name` | Deployment name. Metadata only. | string |  |
| `description` | A description of the Deployment and its function. | string |  |
| `active_engine` | The Engine ID that is connected to this Deployment. | string |  |
| `public` | The state of the Deployment's publication. Publishing Deployments is not currenty supported. | boolean |  |

Refer this [link](https://docs.trimblecloud.com/processing-framework/content/reference/oas/#post-/api/deployments) for more details on parameters.

### Get

Get a deployment by ID.

```
deployment = await processing_client.deployments.get(id="<DEPLOYMENT_ID>")
```

### Update

Update a deployment. Only the name and description can be updated.

```
deployment = await processing_client.deployments.update(
    id="<DEPLOYMENT_ID>",
    name="A New Name",
    description="A new description."
)
```

### Retire

Retire a deployment.

```
deployment = await processing_client.deployments.retire(id="<DEPLOYMENT_ID>")
```

## Deployment Secrets

* Deployment Secrets represent sensitive information that is mounted on an Engine container.
* Secrets are an optional capability that are used to provide a means of keeping sensitive information out of built container images.

### List

Get a list of secrets belonging to the specified deployment.

```
query_params = { "per_page" : 5 , "page" : 1 } # Optional
list = await processing_client.deployment_secrets.list(deployment_id="<DEPLOYMENT_ID>", query_params=query_params)
```

### List (Sync)

List all secrets belonging to the specified deployment.

> ***NOTE:*** This method abstracts the complexity of pagination and provides an iterable interface to retrieve all items.

```
secrets = client.deployment_secrets.list_sync(deployment_id="<DEPLOYMENT_ID>")
for secret in secrets:
    print(secret)
```

### Create

Create a new secret.

```
deployment_secret = await processing_client.deployment_secrets.create(
    deployment_id="<DEPLOYMENT_ID>",
    identifier="my-api-key",
    value="c29tZSBzZWNyZXQgdGV4dA==",
    name="My API Key",
    description="A description the Owner wrote."
)
```

**Create Deployment Secret Parameters**

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `identifier` | A Deployment Secret identifier is unique within the system. They must start and end with an alphanumeric value and can only contain: [a-z, A-Z, 0-9, '-', '.'].  **Constraints:** 1 to 64 chars | string | Required |
| `value` | A Base64 encoded string of the Secret value. The Base64 encoded string will be displayed in the response body after the Deployment Secret has been processed into the service. | string | Required |
| `name` | Name of the Secret. This is metadata only. | string |  |
| `description` | A description of the Secret. | string |  |

Refer this [link](https://docs.trimblecloud.com/processing-framework/content/reference/oas/#post-/api/deployments/-deployment-id-/secrets) for more details on parameters.

### Get

Get a secret by ID.

```
deployment_secret = await processing_client.deployment_secrets.get(id="<DEPLOYMENT_SECRET_ID>", deployment_id="<DEPLOYMENT_ID>")
```

### Update

Update a secret. Only name, description and value can be updated.

```
deployment_secret = await processing_client.deployment_secrets.update(
    id="<DEPLOYMENT_SECRET_ID>",
    deployment_id="<DEPLOYMENT_ID>",
    name="A New Name",
    description="A new description."
)
```

### Delete

Delete a deployment secret.

```
await processing_client.deployment_secrets.delete(id="<DEPLOYMENT_SECRET_ID>", deployment_id="<DEPLOYMENT_ID>")
```

### Retire

Retire a deployment secret.

```
deployment_secret = await processing_client.deployment_secrets.retire(id="<DEPLOYMENT_SECRET_ID>", deployment_id="<DEPLOYMENT_ID>")
```
