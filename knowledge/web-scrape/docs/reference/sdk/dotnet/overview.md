---
title: "TrimbleCloud.Processing"
source_url: https://docs.trimblecloud.com/processing-framework/content/reference/sdk/dotnet/overview/
fetched_at: 2026-03-20T19:37:46.732314+00:00
---

# TrimbleCloud.Processing

Processing Framework SDK for .NET provides an interface for interacting with the Processing Framework service. It is a wrapper around the Processing Framework API.

## Installation

This SDK is available as a NuGet package from [Trimble Artifactory](https://artifactory.trimble.tools/ui/repos/tree/General/trimblecloudplatform-engagement-nuget). To install, use the following command:

```
dotnet add package trimblecloud.processing
```

## Processing Endpoints

| Environment | Base URL Endpoint |
| --- | --- |
| Stage | https://cloud.stage.api.trimblecloud.com/Processing/api/1/ |
| Production | https://cloud.api.trimble.com/Processing/api/1/ |

## Error Handling

The Processing Framework SDK uses standardized error handling with `TrimbleServiceException` from the `TrimbleCloud.Processing` package.

### TrimbleServiceException

All HTTP error responses from the Processing Framework API are wrapped in `TrimbleServiceException`, providing:

* **HTTP Status Code** - The HTTP status code of the failed request
* **Request ID** - A unique identifier for tracking and support purposes
* **Error Details** - Structured error information from the service
* **Raw Response** - Access to the original HTTP response for debugging

### ValidationException

The Processing Framework includes input validation with `ValidationException` for client-side validation errors before making API calls.

### Basic Error Handling

```
try
{
    var operation = await client.Operations.Create(operationCreate);
    Console.WriteLine($"Operation created: {operation.Data.Name}");
}
catch (ValidationException ex)
{
    Console.WriteLine($"Validation failed: {ex.Message}");
}
catch (TrimbleServiceException ex)
{
    Console.WriteLine($"Processing service error: {ex.Message}");
    Console.WriteLine($"Status Code: {ex.StatusCode}");
    Console.WriteLine($"Request ID: {ex.RequestId}");
}
```

### Exception message output example

`Service request failed. Status: <STATUS_CODE> <STATUS_MESSAGE> RequestId: <REQUEST_ID> Response Content: <API_ERROR_RESPONSE_BODY>`

## Create Processing Client

To create a client object to access the Processing framework, you will need a processing endpoint and a token provider. The Processing client can use token providers from the `Trimble.ID` sdk to authenticate and access the processing endpoint. The `BearerTokenHttpClientProvider` is used to include the bearer token in the HTTP requests made by the Processing client.

For more details on token providers, refer to the [Trimble Identity Dotnet SDK Documentation](https://docs.trimblecloud.com/trimble-identity/content/reference/sdk/dotnet/overview/).

```
using Trimble.ID;
using TrimbleCloud.Processing;

//Setup a TID provider for communications with our authorization server TID
var endpointProvider = new OpenIdEndpointProvider(new Uri("<CONFIG_ENDPOINT>", UriKind.Absolute));

//Setup a token provider to handle the token exchange with TID
var tokenProvider = new ClientCredentialTokenProvider(endpointProvider, "<CLIENT_ID>", "<CLIENT_SECRET>").WithScopes("<SCOPES>");

// Create a processing client
var client = new ProcessingClient(new BearerTokenHttpClientProvider(tokenProvider, new Uri("<PROCESSING_ENDPOINT>")));
```

Refer to the [Trimble ID SDK](https://docs.trimblecloud.com/trimble-identity/content/reference/sdk/dotnet/overview/) documentation for more information on setting up the token provider and HttpClientProvider.

## Operations

Operations are the basic building blocks of processing. An Operation exposes a single function of a backend processing engine such as reprojection, writing a file to data ocean, or transforming one type of data into another.

### List

Get a list of Operation objects that the user has access to view.

```
var list = client.Operations.GetList();
```

### Create

Create a new operation.

```
var operation = await client.Operations.Create(
    new OperationCreate()
    {
        Identifier = "unique_identitfier",
        Name = "valid name",
        Description = "description about the operation",
        EngineName = "valid engine name",  // Deprecated
        Version = 3,
        DeploymentIdentifier = "dataoceanoperations",
        SharedWith = new[] { "API-Testing" },
        OutputParameters = new Dictionary<string, OutputParameter>(){
        {
                "download_file", new OutputParameter(){
                    Type =  DataType.String,
                    Description= "a sample output parameter",
                    Optional = false
                }
            }
        },
        Parameters = new Dictionary<string, Parameter>() {
            {
                "parameter_identifier", new Parameter(){
                    Type= DataType.String,
                    Description= "description",
                    Optional = true
                }
            },
            {
                "format_parameter", new Parameter(){
                    Type= DataType.String,
                    Description= "Select output format",
                    Optional = false,
                    Options = new List<string> { "jpeg", "png", "webp" }
                }
            }
        },
        Inputs = new Dictionary<string, Input>() {
            {
                "input_identifier", new Input(){
                    DataTypes = new string[]{ "*" },
                    Description = "description",
                }
            }
        },
        Outputs = new Dictionary<string, Output> {
            {
                "output_identifier",new Output(){
                    DataType="*",
                    Description ="description",
                }
            }
        }
    }
);
```

#### Create Operation Parameters

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `Identifier` | Unique identifier string for the Operation. Must be between 8 to 256 characters, start with a letter, and can contain only lowercase letters, numbers, underscores, and hyphens. | string | Required |
| `Version` | The version of the Operation. | integer | Required |
| `Public` | The state of the Operation's publication. If true, the Operation is available for public use. | boolean |  |
| `Name` | Human-readable name of the Operation. | string |  |
| `DeploymentIdentifier` | The identifier of the Deployment that supports this Operation. | string | Required |
| `Description` | A description of an Operation and its function. | string |  |
| `EngineName(Deprecated)` | The name of the backend engine that supports this Operation. LEGACY is used for Engine's that have already been established in the system prior to the creation of the Engines APIs. | string |  |
| `SharedWith` | List of names of Users with whom this Operation has been shared. | IEnumerable <string> |  |
| `Parameters` | A list of parameter objects attached to the Operation. Parameters can optionally include an Options list to define valid values. | Dictionary<string, Parameter> |  |
| `OutputParameters` | A list of parameter objects that define values to be output from an Operation. | Dictionary<string, OutputParameter> |  |
| `Inputs` | Named inputs for the Operation. | Dictionary <string, Input> |  |
| `Outputs` | Named outputs for the Operation. | Dictionary<string, Output> |  |
| `DepreciationMessage` | Optional string parameter. | string |  |
| `RetiredAfter` | Optional string parameter. | string |  |

Refer [reference document](../referencedocs/#T-TrimbleCloud-Processing-Model-Operation) for more details on parameters.

### Get

Get an Operation object by ID.

```
var operation = await client.Operations.Get(id);
```

### Update

Update an Operation by ID.

```
var operation = await client.Operations.Update(id, new OperationUpdate() {
    Name = "Updated name",
    Description = "Updated description"
});
```

### Delete

Delete an Operation by ID.

```
await client.Operations.Delete(id);
```

### Approve

Approve an Operation.

```
var operation = await client.Operations.Approve(id);
```

### Publish

Publish an Operation.

```
var operation = await client.Operations.Publish(id);
```

### Retire

Retire an Operation.

```
var operation = await client.Operations.Retire(id);
```

### Clone

Clone an Operation.

```
var operation = await client.Operations.Clone(id);
```

## Procedures

A procedure is a customized Processing Framework workflow constructed from one or more operations. An operation can be used multiple times within a procedure.

### List

Get a list of procedures.

```
var list = client.Procedures.List(page: 1, pageSize: 100, filters: queryFilters);
```

### Create

Create a new procedure.

```
 var procedure = await client.Procedures.Create(
    new ProcedureCreate()
    {
        Identifier = "unique_identifier",
        Version = 1,
        Name = "some_name",
        Description = "description of the procediure",
        DefaultRegion = "aws-us1",
        Operations = new Dictionary<string, OperationChain>()
        {
            {
                "download_file", new OperationChain()
                {
                    Name =  "test_name",
                    Identifier= "unique_identifier",
                    Version = 2,
                    Parameters =  new Dictionary<string, OpParameter>()
                    {
                        {
                            "target" ,
                            new OpParameter()
                            {
                                Source="test_source"
                            }
                        }
                    },
                    Inputs =  new Dictionary<string, OpInput>()
                    {
                        {
                            "in_files" ,
                            new OpInput()
                            {
                                Sources =new string[]{ "test_source" }
                            }
                        }
                    }

                }
            }
        },
        ProcedureParameters = new Dictionary<string, ProcedureParameter>() {
            {
                "test_param",
                new ProcedureParameter()
                {
                    Name= "test name",
                    Description="description"
                }
            }
        }
    }
);
```

#### Create Procedure Parameters

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `Identifier` | Unique identifier string for the Procedure. Must be between 8 to 256 characters, start with a letter, and can contain only lowercase letters, numbers, underscores, and hyphens. | string | Required |
| `Version` | The version of the Procedure. | integer | Required |
| `Name` | Human-readable name of the Procedure. | string |  |
| `Description` | A description of an Procedure and its function. | string |  |
| `DefaultRegion` | Region name the Procedure should execute in by default. | string | Required |
| `Tags` | List of tags (as strings) associated with the Procedure. | string |  |
| `DocumentationUrl` | Optional URL to reference external documentation for the Procedure. | string |  |
| `SharedWith` | List of names of Users with whom this Procedure has been shared. | IEnumerable <string> |  |
| `ProcedureParameter` | Parameter mappings for the Procedures contained within the Procedure. Think of it as a "master list". The identifier of each parameter must be referenced at least once within an Procedure's parameter sources. | Dictionary <string, ProcedureParameter> |  |
| `Operations` | Mapping of Procedure names and definitions.This is where the user specifies which Procedures make up the Procedure and how those Operations chain together. 1 or many Procedures can be combined in to a procedure. All Procedures in a Procedure must share at least one common Region. | Dictionary <string, OperationChain> | Required |

Refer [reference document](../docs/REFERENCE.md) for more details on parameters.

### Get

Get a procedure. Optionally specify a view parameter to retrieve procedure with specific projections.

```
// Get basic procedure information
var procedure = await client.Procedures.Get(id);

// Get procedure with detailed view
var detailedProcedure = await client.Procedures.Get(id, procedureView: "definition");
```

Passing a value of `definition` with this query parameter will return the POST contents used to initially create the procedure. This is useful for creating a new version of the procedure or to promote the procedure definition to a new environment.

### Update

A Procedure can only be updated after its creation but before its approval. i.e. It must have a status of MUTABLE and an execution\_status of NOT\_READY. Once a Procedure has been approved, only its shared\_with, documentation\_url, and default\_region attributes can be updated.

```
var procedure = await client.Procedures.Update(id, new ProcedureUpdate() {
    Description = "Example procedure to take DO image, convert to PDF, load to DO"
});
```

### Delete

Delete a procedure.

```
await client.Procedures.Delete(id);
```

### Approve

Approve a Procedure for execution. This locks the Procedure into an unchangeable state (with the exception of shared\_with and documentation\_url attributes). A Procedure cannot be executed until it has been approved.

```
var procedure = await client.Procedures.Approve(id);
```

### Publish

Publish a Procedure so all Users have access to it. This action is effectively the same as sharing the Procedure with all other users simultaneously.

```
var procedure = await client.Procedures.Publish(id);
```

### Retire

Retire a Procedure from use. This moves its status from EXECUTABLE to RETIRED. A Procedure can only be retired if no associated Procedure Executions are active. Retiring a Procedure is a non-reversible action.

```
var procedure = await client.Procedures.Retire(id);
```

## Executions

Execution is a request for processing data using a defined procedure. The first operation in any execution is to pull source data for processing. The last operation in most executions is to put the processed data in a specified storage location.

### Execution Properties

The Execution model includes the following key properties:

| Property | Description | Type |
| --- | --- | --- |
| `Id` | The unique identifier of the execution. | string |
| `ProcedureId` | The unique identifier of the procedure. | string |
| `ExecutionScheduleId` | The unique identifier of the execution schedule that created this execution (if applicable). | string |
| `Status` | The execution progress status (UNSUBMITTED, SUBMITTED, WAITING, QUEUED, EXECUTING, FINISHED, FAILED, UNKNOWN). | ExecutionProgressStatus |
| `ExecutionStatus` | The logical execution status (READY/NOT\_READY/etc.). | string |
| `Region` | The region where the execution is running. | string |
| `Parameters` | Mapping of procedure-specified parameter names to parameter values. | IDictionary |
| `BoundParameters` | Mapping of operation-specified output parameter names to output parameter values. | IDictionary |
| `Procedure` | The underlying Procedure definition. Only included when `details=true` is passed. Restricted to BACKEND access level. | IDictionary |
| `SubmittedAt` | The time the execution was submitted. | DateTime? |
| `CompletedAt` | The time the execution completed. | DateTime? |
| `FailedAt` | The time the execution failed. | DateTime? |
| `LatestAttempt` | The latest execution attempt summary. | Attempt |

#### Attempt Properties

The Attempt model represents the latest execution attempt and includes the following properties:

| Property | Description | Type |
| --- | --- | --- |
| `SubmittedAt` | The time the attempt was submitted. | DateTime? |
| `CompletedAt` | The time the attempt completed. | DateTime? |
| `FailedAt` | The time the attempt failed. | DateTime? |
| `Status` | The attempt progress status (e.g., "FINISHED", "FAILED", "EXECUTING"). | string |
| `BoundParameters` | Mapping of operation-specified output parameter names to output parameter values for this attempt. | IDictionary |

### Create

Creates and starts a new Procedure Execution in the system.

```
var execution = await client.Executions.Create(
    new ExecutionCreate()
    {
        ProcedureId = "id",
        Parameters = new Dictionary<string, object>()
        {
            {
                "param_name","value"
            }
        }
    }
);
```

#### Create Execution Parameters

| Parameter | Description | Type | Required Fields |
| --- | --- | --- | --- |
| `ProcedureId` | The unique identifier of the target Procedure. | string | Required |
| `Parameters` | Mapping of Procedure-specified parameter names to parameter values. This is where the user specifies Procedure specific parameter field names and values for the Execution. | object |  |

Refer [reference document](../docs/REFERENCE.md) for more details on parameters.

### Get

Get an execution. Optionally request detailed view with execution attempt information and procedure definition.

```
// Get basic execution information
var execution = await client.Executions.Get(id);

// Get detailed execution information including latest attempt and procedure definition
var detailedExecution = await client.Executions.Get(id, details: true);

// Access execution status and latest attempt
Console.WriteLine($"Status: {detailedExecution.Data.Status}");
Console.WriteLine($"Execution Status: {detailedExecution.Data.ExecutionStatus}");

if (detailedExecution.Data.LatestAttempt != null)
{
    var attempt = detailedExecution.Data.LatestAttempt;
    Console.WriteLine($"Attempt Status: {attempt.Status}");
    Console.WriteLine($"Submitted: {attempt.SubmittedAt}");
    Console.WriteLine($"Completed: {attempt.CompletedAt}");
}

// Access procedure definition (only available with details=true, restricted to BACKEND access level)
if (detailedExecution.Data.Procedure != null)
{
    Console.WriteLine($"Procedure Identifier: {detailedExecution.Data.Procedure["identifier"]}");
    Console.WriteLine($"Procedure Version: {detailedExecution.Data.Procedure["version"]}");
    Console.WriteLine($"Procedure Name: {detailedExecution.Data.Procedure["name"]}");
}
```

### List

List executions. Apply filters to narrow down results and sort by specific fields.

```
// List executions with pagination
var list = await client.Executions.List(page, pageSize);

// List executions with filters and sorting
var filter = new ExecutionListFilter
{
    ExecutionStatus = Execution.ExecutionProgressStatus.FINISHED,
    SortBy = ExecutionSortBy.CompletedAtDescending,
    CreatedAfter = DateTime.UtcNow.AddDays(-7)
};
var filteredList = await client.Executions.List(page, pageSize, filters: filter);
```

#### ExecutionSortBy Options

The `SortBy` property in `ExecutionListFilter` accepts the following enum values:

| Enum Value | API Value | Description |
| --- | --- | --- |
| `ExecutionSortBy.CompletedAtDescending` | `-completed_at` | Sort by completion date, most recent first |
| `ExecutionSortBy.CompletedAtAscending` | `+completed_at` | Sort by completion date, oldest first |
| `ExecutionSortBy.CreatedAtDescending` | `-created_at` | Sort by creation date, most recent first |
| `ExecutionSortBy.CreatedAtAscending` | `+created_at` | Sort by creation date, oldest first |

Example usage:

```
// Get most recently completed executions
var recentExecution = new ExecutionListFilter
{
    SortBy = ExecutionSortBy.CompletedAtDescending
};
```

### List Activities

Get a list of execution activities.

```
var list = await client.Executions.ListActivities(executionId, page, pageSize);
```

### List Events

Get the events tied to an Execution. Events are logged by the Log Events for an Execution request.

```
var list = await client.Executions.ListEvents(executionId, page, pageSize);
```

### Post Execution Engine Data

Post engine data for an execution. This is typically called by the engine to provide output information.

```
var dataRequest = new ExecutionEngineRequest
{
    ExecutionId = "execution-id",
    OutputPath = "/path/to/output/data"
};

var result = await client.Executions.GetExecutionData(dataRequest);
Console.WriteLine($"Execution ID: {result.Data.Id}");
Console.WriteLine($"Status: {result.Data.Status}");
```

### Post Execution Engine Logs

Post engine logs for an execution. This is typically called by the engine to provide log information.

```
var logsRequest = new ExecutionEngineRequest
{
    ExecutionId = "execution-id",
    OutputPath = "/path/to/logs"
};

var result = await client.Executions.GetExecutionLogs(logsRequest);
Console.WriteLine($"Execution ID: {result.Data.Id}");
Console.WriteLine($"Status: {result.Data.Status}");
```

## Engines

Engines are low-level resource in the Processing Framework that represent a container image stored in the service. They provide the interface for how to define and configure a container with direct, optional, relation to how the code in the container is written. Properties such as environment variables or secrets are defined in the API model, but must be properly referenced in the associated code in the container. This is optional because not all use cases will require environment variables or secrets.

The Engine and Deployment relationship provides the interface for you to manage your container images while minimizing the impact to your upstream clients that are consuming Operations from your Engine.

### List

Get a list of engines.

```
var list = await client.Engines.List(page, pageSize, queryfilters);
```

### Create

Create a new engine.

```
var engine = await client.Engines.Create(
    new EngineCreate()
    {
        Name = "Example Engine",
        Identifier = "example-engine",
        Description = "A description of the engine.",
        OSType = OSType.Windows,
        OSBuild = "10.0.17763",
        Regions = new string[] { "aws-us1" },
        IngestionType = IngestionType.ACRToken,
        EnvironmentVariables = new List<EnvironmentVariable>()
        {
            new EnvironmentVariable()
            {
                Name = "MY_ENV_VAR",
                Value = "MY_ENV_VAR_VALUE"
            }
        },
        Tag = "example-engine-tag"
    }
);
```

### Get

Get an engine.

```
var engine = await client.Engines.Get(engine_id);
```

### Update

Update an engine.

```
 var engine = await client.Engines.Update(engine_id, new EngineUpdate()
                    {
                        Name = "A New Name",
                        Description = "A new description."
                    });
```

### Delete

Delete an engine.

```
await client.Engines.Delete(engine_id);
```

### Retire

Retire an engine.

```
var engine = await client.Engines.Retire(engine_id);
```

## Deployments

The following is a compiled list of actions that can be performed on Deployments. The concept of Deployments provides the configurable interface for the following topics:

* Operation to Engine Image relationship
* Scaling
* Compute resource definition

### List

Get a list of deployments. Apply filters to narrow down results by owner, status, or active engine.

```
// Basic list
var list = await client.Deployments.List(page: 1, pageSize: 100);

// List with filters
var filter = new DeploymentListFilter
{
    Owner = "my-organization",
    Status = DeploymentStatus.AVAILABLE,
    ActiveEngine = "my-engine"
};
var filteredList = await client.Deployments.List(page: 1, pageSize: 100, filters: filter);
```

### Create

Create a deployment. Optionally configure GPU resources.

```
// Create a basic deployment
var deployment = await client.Deployments.Create(
    new DeploymentCreate()
    {
        Name = "Example Deployment",
        Description = "A description of this deployment.",
        Identifier = "example-deployment",
        EngineId = "example-engine",
        Regions = new[] { "azure-us1" },
        AutoScaling = new AutoScaling()
        {
            MinCount = 1,
            MaxCount = 10
        },
        Compute = new Compute
        {
            CPU = 2,
            Memory = 1024
        }
        // IsPublic = false  // Publishing Deployments is not currently supported
    }
);

// Create a GPU-accelerated deployment
var gpuDeployment = await client.Deployments.Create(
    new DeploymentCreate()
    {
        Name = "GPU Deployment",
        Description = "A GPU-enabled deployment for compute-intensive workloads.",
        Identifier = "gpu-deployment",
        EngineId = "ml-engine",
        Regions = new[] { "azure-us1" },
        AutoScaling = new AutoScaling()
        {
            MinCount = 1,
            MaxCount = 5
        },
        Compute = new Compute
        {
            CPU = 8.0,
            Memory = 16384,
            GpuType = "nvidia-tesla-v100",
            GpuCount = 2,
            Interruptable = true
        }
        // IsPublic = false  // Publishing Deployments is not currently supported
    }
);
```

#### Compute Parameters

| Parameter | Description | Type | Required |
| --- | --- | --- | --- |
| `CPU` | The amount of CPU to assign to a single instance. | double | Required |
| `Memory` | The amount of Memory in megabytes to assign to a single instance. | integer | Required |
| `GpuType` | Optional GPU type for the compute profile (e.g., "nvidia-tesla-t4", "nvidia-tesla-v100"). | string | Optional |
| `GpuCount` | Optional GPU count for the compute profile. | integer | Optional |
| `Interruptable` | Whether the compute should be scheduled as interruptible/preemptible. Useful for cost savings with spot instances. | boolean | Optional |

### Get

Get a deployment.

```
var result = await client.Deployments.Get(engine_id);
```

### Update

Update a Deployment.

```
var result = await client.Deployments.Update(deploymentId, new DeploymentUpdate()
            {
                Name = "Example Engine Version",
                Description = "A description the Owner wrote about this Engine Version.",
                EngineId = "example-engine",
                AutoScaling = new AutoScaling()
                {
                    MinCount = 1,
                    MaxCount = 10
                },
                Compute = new Compute{
                    CPU = 2,
                    Memory = 1024,
                }
            });
```

> ***NOTE:*** The EngineId and Regions cannot be updated in the same request. You must update the EngineId and Regions separately.

### Retire

Retire a deployment. This moves the deployment status to RETIRED.

```
var retired = await client.Deployments.Retire(deployment_id);
```

### Delete

Delete a deployment. This permanently removes the deployment from the system.

```
var result = await client.Deployments.Delete(deployment_id);
if (result.Data)
{
    Console.WriteLine("Deployment deleted successfully");
}
```

> ***NOTE:*** A deployment must be retired before it can be deleted.

## Deployment Secrets

The following is a compiled list of actions that can be performed on Deployment Secrets. Deployment Secrets represent sensitive information that is mounted on an Engine container. Secrets are an optional capability that are used to provide a means of keeping sensitive information out of built container images. A common use case that this interface supports is the ability to update sensitive information if you need to rotate credentials for example.

A Secret is a key, value pair. These values can be mounted to an Engine container as either an environment variable or a file. See the Deployments schema for more information.

### List

Get a list of deployment secrets.

```
var list = await client.DeploymentSecrets.List(deploymentId, page, pageSize);
```

### Create

Create a new deployment secret.

```
var value = await client.DeploymentSecrets.Create("deployment_id", new DeploymentSecretCreate()
            {
                Name = "secret_name",
                Value = "secret_value",
                Description = "description",
                Identifier = "unique_identifier"
            });
```

### Get

Get a deployment secret.

```
var secret = await client.DeploymentSecrets.Get(deploymentId, secretID);
```

### Update

Update a deployment secret.

```
var updated = await client.DeploymentSecrets.Update(deployment_id, deployment_secret_id, new DeploymentSecretUpdate
            {
                Value = "new_value"
            });
```

### Delete

Delete a deployment secret.

```
await client.DeploymentSecrets.Delete(deployment_id, deployment_secret_id);
```

### Retire

Retire a deployment secret.

```
var retired = await client.DeploymentSecrets.Retire(deployment_id, deployment_secret_id);
```
