---
title: "TrimbleCloud.Processing"
source_url: https://docs.trimblecloud.com/processing-framework/content/reference/sdk/javascript/overview/
fetched_at: 2026-03-20T19:37:57.482047+00:00
---

# TrimbleCloud.Processing

Processing Framework SDK for TypeScript.

## Installation

This package is available in [Trimble Artifactory NPM registry](https://artifactory.trimble.tools/ui/repos/tree/General/trimblecloudplatform-engagement-npm). It can be installed with the following command:

`npm install @trimblecloudplatform/trimblecloud.processing`

## Processing Endpoints

| Environment | Base URL Endpoint |
| --- | --- |
| Stage | https://cloud.stage.api.trimblecloud.com/Processing/api/1/ |
| Production | https://cloud.api.trimble.com/Processing/api/1/ |

## Create Processing Client

To create a client object to access the Processing framework, you will need a processing endpoint and a token provider. The Processing client can use token providers from the `@trimble-oss/trimble-id` sdk to authenticate and access the processing endpoint.

For more details on token providers, refer to the [Trimble Identity JavaScript/TypeScript SDK Documentation](https://docs.trimblecloud.com/trimble-identity/content/reference/sdk/js/overview/).

```
import { OpenIdEndpointProvider, ClientCredentialTokenProvider } from "@trimble-oss/trimble-id";
import { ProcessingClient } from "@trimblecloudplatform/trimblecloud.processing";

// Step 1: Setup an OpenID endpoint provider for communications with the authorization server
const endpointProvider = new OpenIdEndpointProvider("https://stage.id.trimblecloud.com/.well-known/openid-configuration");

// Step 2: Setup a token provider to handle the token exchange with the authorization server
// Using ClientCredentialTokenProvider for client credentials authentication
const tokenProvider = new ClientCredentialTokenProvider(endpointProvider, "<CLIENT_ID>", "<CLIENT_SECRET>").WithScopes(["<SCOPE>"]);

// Step 3: Create a processing client
const client = new ProcessingClient(tokenProvider, "<PROCESSING_END_POINT>");
```

## Operations

Operations are the basic building blocks of processing. An Operation exposes a single function of a backend processing engine such as reprojection, writing a file to data ocean, or transforming one type of data into another.

### List

Gets Operation objects that the user has access to view.

```
import { ListOperationQueryParameters } from "@trimblecloudplatform/trimblecloud.processing";

let operationQueryParameter: ListOperationQueryParameters = {
    perPage: 10,
    page: 5,
};

let operations = await client.operations.getList(operationQueryParameter)
```

### Get

Get an Operation object by ID.

```
var operation = await client.operations.get("<operationId>");
```

### Create

Creates an Operation object based on the scope of the requesting User.

```
import { CreateOperationParameters } from "@trimblecloudplatform/trimblecloud.processing";

let operation: CreateOperationParameters = {
  name: "test_name",
  description: "test_description",
}

let operationCreated = await client.operations.create("identifier", 1, "deployement_identifier", operation)
```

`Operation Parameters`

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `identifier` | Unique identifier string for the Operation. Must be between 8 to 256 characters, start with a letter, and can contain only lowercase letters, numbers, underscores, and hyphens. | string | Required |
| `version` | The version of the Operation. | integer | Required |
| `deploymentIdentifier` | The identifier of the Deployment that supports this Operation. | string | Required |
| `public` | The state of the Operation's publication. If true, the Operation is available for public use. | boolean |  |
| `name` | Human-readable name of the Operation. | string |  |
| `description` | A description of an Operation and its function. | string |  |
| `engineName` | The name of the backend engine that supports this Operation. LEGACY is used for Engine's that have already been established in the system prior to the creation of the Engines APIs. | string |  |
| `sharedWith` | List of names of Users with whom this Operation has been shared. | array of strings |  |
| `parameters` | A list of parameter objects attached to the Operation. | Record |  |
| `outputParameters` | A list of parameter objects that define values to be output from an Operation. | Record |  |
| `inputs` | Named inputs for the Operation. | Record |  |
| `outputs` | Named outputs for the Operation. | Record |  |
| `deprecationMessage` | Optional string parameter. | string |  |
| `retiredAfter` | Optional string parameter. | string |  |

### Update

Update an Operation object by ID. An Operation can only be updated when it is in a MUTABLE state (prior to approval).

```
import { UpdateOperationParameters } from "@trimblecloudplatform/trimblecloud.processing";

let operation: UpdateOperationParameters = { description : "description updated" };

let operationUpdated = await client.operations.update("<operationId>", operation)
```

### Delete

Delete an Operation by ID. Note that this action can only be performed on an Operation that is in a MUTABLE state. Once an Operation has been approved, it can only be decommissioned via retirement.

```
await client.operations.delete("<operationId>")
```

### Approve

Approve an Operation for use in Procedures. This locks the Operation into an unchangeable state with the exception of its shared\_with attribute.

```
let approvedOperation = await client.operations.approve("<operationId>")
```

### Clone

Make an exact copy of a given Operation within the requesting User's scope, bump its version, and assign direct ownership to requesting User. The new Operation will also be in a fresh, unapproved state (MUTABLE and NOT\_READY) regardless of the statuses of the Operation that was cloned.

```
let clonedOperation = await client.operations.clone("<operationId>")
```

### Publish

Publish an Operation so that all Users have access to it. This action is effectively the same as sharing the Operation with everyone simultaneously. This action is irreversible.

```
let publishedOperation = await client.operations.publish("<operationId>")
```

### Retire

Retire an Operation from use. This moves its status from EXECUTABLE to RETIRED. An Operation can only be retired if all associated Procedure definitions have also been retired.

```
let retiredOperation = await client.operations.retire("<operationId>")
```

## Procedures

A procedure is a customized Processing Framework workflow constructed from one or more operations. An operation can be used multiple times within a procedure.

### List

Gets Procedure objects that the user has access to view.

```
import { ListProcedureQueryParameters } from "@trimblecloudplatform/trimblecloud.processing";

let procedureQueryParameters : ListProcedureQueryParameters = { operationUuid: "value" };

let procedures = await client.procedures.getList(procedureQueryParameters);
```

### Create

Create a new Procedure in the system.

```
import { OperationForCreateUpdateProcedure } from "@trimblecloudplatform/trimblecloud.processing";

let operation: Record<string, OperationForCreateUpdateProcedure> = {
  "operation1": {
    identifier: "identifier",
    version: 2,
    name: "some_name"

  }
}

var procedureCreated = await client.procedures.create("<identifier>", <version>, "<defaultRegion>", operation);
```

`Procedure Parameters`

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `identifier` | Unique identifier string for the Procedure. Must be between 8 to 256 characters, start with a letter, and can contain only lowercase letters, numbers, underscores, and hyphens. | string | Required |
| `version` | The version of the Procedure. | integer | Required |
| `name` | Human-readable name of the Procedure. | string |  |
| `description` | A description of an Procedure and its function. | string |  |
| `tags` | List of tags (as strings) associated with the Procedure. | string |  |
| `documentationUrl` | Optional URL to reference external documentation for the Procedure. | string |  |
| `sharedWith` | List of names of Users with whom this Procedure has been shared. | Array of strings |  |
| `defaultRegion` | Region name the Procedure should execute in by default. | string | Required |
| `parameters` | Parameter mappings for the Procedures contained within the Procedure. Think of it as a "master list". The identifier of each parameter must be referenced at least once within an Procedure's parameter sources. | Record |  |
| `operations` | Mapping of Procedure names and definitions.This is where the user specifies which Procedures make up the Procedure and how those Operations chain together. 1 or many Procedures can be combined in to a procedure. All Procedures in a Procedure must share at least one common Region. | Record | Required |

### Get

Get a Procedure object by ID.

```
let procedure = await client.procedures.get("<procedureId>");
```

### Update

Update a Procedure object by ID. A Procedure can only be updated after its creation but before its approval. i.e. It must have a status of MUTABLE and an execution\_status of NOT\_READY.

```
import { UpdateProcedureParameters } from "@trimblecloudplatform/trimblecloud.processing";

let procedure: UpdateProcedureParameters = { description: "desc changed",};

var procedureUpdated = await client.procedures.update("<procedureId>", procedure);
```

### Delete

Delete a Procedure by ID.

```
await client.procedures.delete("<procedureId>");
```

### Approve

Approve a Procedure for execution. This locks the Procedure into an unchangeable state (with the exception of sharedWith and documentationUrl attributes). A Procedure cannot be executed until it has been approved.

```
let procedureApproved = await client.procedures.approve("<procedureId>");
```

### Publish

Publish a Procedure so all Users have access to it. This action is effectively the same as sharing the Procedure with all other users simultaneously. This action is irreversible.

```
let procedurePublished = await client.procedures.publish("<procedureId>");
```

### Retire

Retire a Procedure from use. This moves its status from EXECUTABLE to RETIRED. A Procedure can only be retired if no associated Procedure Executions are active.

```
let procedureRetired = await client.procedures.retire("<procedureId>");
```

## Executions

Execution is a request for processing data using a defined procedure. The first operation in any execution is to pull source data for processing. The last operation in most executions is to put the processed data in a specified storage location.

### List

Gets Procedure Execution objects that the user has access to view.

```
import { ListExecutionQueryParameters } from "@trimblecloudplatform/trimblecloud.processing";

let executionQueryParameters: ListExecutionQueryParameters = { procedureId: "<procedureId>" };

let executions = await client.executions.getList(executionQueryParameters);
```

### Execute

Creates and starts a new Procedure Execution in the system.

```
import { CreateExecutionParameters } from "@trimblecloudplatform/trimblecloud.processing";

let execution : CreateExecutionParameters = {
    dataExport: false,
    region: "aws-us1",
    parameters: {
        "parameter1": "value"
    }
};

var execution = await client.Executions.create("<procedureId>", execution);
```

`Create Execution Parameters`

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `procedureId` | The unique identifier of the target Procedure. | string | Required |
| `dataExport` | Whether or not the execution's data will be available for export. Default to false. | boolean |  |
| `region` | Region name for the Execution to run in. Must be a name seen in the Procedure's regions list. If not provided, then defaultRegion of the Procedure is used. | string |  |
| `procedureIdentifier` | The identifier of the target Procedure for Execution. | string |  |
| `procedureVersion` | The version of the target Procedure for Execution. | integer |  |
| `metadata` | User-specified metadata to be associated with the Execution. | string |  |
| `boundParameters` | Mapping of Operation-specified output parameter names to output parameter values. This is where Operation output parameters are written once an Operation within the Execution completes. | Record |  |
| `parameters` | Mapping of Procedure-specified parameter names to parameter values. This is where the user specifies Procedure specific parameter field names and values for the Execution. | Record |  |

### Get

Get Execution object by ID

```
let execution = await client.executions.get("<executionId>");
```

### Get Execution Activites

Get the activities tied to a Processing Execution. Activities map to the operations defined within the Procedure being executed.

```typescript

let executionActivities = await client.executions.getActivities("");
```

### Get Execution Data

Data Export relies on the new Split Container engine architecture, and cannot be used with single-container or EC2-based engines. If Data Export is specified for an execution which contains operations on single-container or EC2-based engines, those operations will not have any data exported.

```typescript

let executionData = await client.executions.getExecutionData("", "");
```

### Get Execution Logs

Data Export relies on the new Split Container engine architecture, and cannot be used with single-container or EC2-based engines. If Data Export is specified for an execution which contains operations on single-container or EC2-based engines, those operations will not have any data exported.

```typescript

let executionData = await client.executions.getExecutionLogs("", "");
```

### Get Execution Event

Get the events tied to an Execution. Events are logged by the Log Events for an Execution request.

```
let executionActivities = await client.executions.getEvents("<executionId>");
```
