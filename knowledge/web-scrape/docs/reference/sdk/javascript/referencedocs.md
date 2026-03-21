---
title: "Reference Documentation"
source_url: https://docs.trimblecloud.com/processing-framework/content/reference/sdk/javascript/referencedocs/
fetched_at: 2026-03-20T19:38:00.079487+00:00
---

# Reference Documentation

### Table of Contents

* [ProcessingClient](#processingclient)
  + [Parameters](#parameters)
  + [httpClientProvider](#httpclientprovider)
  + [tokenProvider](#tokenprovider)
  + [operations](#operations)
  + [procedures](#procedures)
  + [executions](#executions)
* [sendInitEvent](#sendinitevent)
* [OperationsImpl](#operationsimpl)
  + [Parameters](#parameters-1)
  + [getList](#getlist)
    - [Parameters](#parameters-2)
  + [create](#create)
    - [Parameters](#parameters-3)
  + [get](#get)
    - [Parameters](#parameters-4)
  + [update](#update)
    - [Parameters](#parameters-5)
  + [delete](#delete)
    - [Parameters](#parameters-6)
  + [approve](#approve)
    - [Parameters](#parameters-7)
  + [clone](#clone)
    - [Parameters](#parameters-8)
  + [publish](#publish)
    - [Parameters](#parameters-9)
  + [retire](#retire)
    - [Parameters](#parameters-10)
* [getQueryParameters](#getqueryparameters)
  + [Parameters](#parameters-11)
* [validateIdentifier](#validateidentifier)
  + [Parameters](#parameters-12)
* [mapperRecord](#mapperrecord)
* [OneWayMaps](#onewaymaps)
* [mapRequest](#maprequest)
  + [Parameters](#parameters-13)
* [mapResponse](#mapresponse)
  + [Parameters](#parameters-14)
* [ProceduresImpl](#proceduresimpl)
  + [Parameters](#parameters-15)
  + [getList](#getlist-1)
    - [Parameters](#parameters-16)
  + [create](#create-1)
    - [Parameters](#parameters-17)
  + [get](#get-1)
    - [Parameters](#parameters-18)
  + [update](#update-1)
    - [Parameters](#parameters-19)
  + [delete](#delete-1)
    - [Parameters](#parameters-20)
  + [approve](#approve-1)
    - [Parameters](#parameters-21)
  + [publish](#publish-1)
    - [Parameters](#parameters-22)
  + [retire](#retire-1)
    - [Parameters](#parameters-23)
* [ExecutionsImpl](#executionsimpl)
  + [Parameters](#parameters-24)
  + [getList](#getlist-2)
    - [Parameters](#parameters-25)
  + [create](#create-2)
    - [Parameters](#parameters-26)
  + [get](#get-2)
    - [Parameters](#parameters-27)
  + [getActivities](#getactivities)
    - [Parameters](#parameters-28)
  + [getExecutionData](#getexecutiondata)
    - [Parameters](#parameters-29)
  + [getExecutionLogs](#getexecutionlogs)
    - [Parameters](#parameters-30)
  + [getEvents](#getevents)
    - [Parameters](#parameters-31)
* [OperationsList](#operationslist)
  + [items](#items)
* [Operation](#operation)
  + [id](#id)
  + [identifier](#identifier)
  + [version](#version)
  + [regions](#regions)
  + [public](#public)
  + [status](#status)
  + [executionStatus](#executionstatus)
  + [ownerName](#ownername)
  + [name](#name)
  + [description](#description)
  + [engineName](#enginename)
  + [deploymentIdentifier](#deploymentidentifier)
  + [createdAt](#createdat)
  + [sharedWith](#sharedwith)
  + [parameters](#parameters-32)
  + [outputParameters](#outputparameters)
  + [inputs](#inputs)
  + [outputs](#outputs)
  + [dynamicOutput](#dynamicoutput)
  + [deprecationMessage](#deprecationmessage)
* [type](#type)
* [description](#description-1)
* [name](#name-1)
* [optional](#optional)
* [encrypted](#encrypted)
* [type](#type-1)
* [description](#description-2)
* [name](#name-2)
* [optional](#optional-1)
* [name](#name-3)
* [description](#description-3)
* [dataTypes](#datatypes)
* [optional](#optional-2)
* [dataType](#datatype)
* [description](#description-4)
* [name](#name-4)
* [ListOperationQueryParameters](#listoperationqueryparameters)
  + [engine](#engine)
  + [deploymentIdentifier](#deploymentidentifier-1)
  + [procedureUuid](#procedureuuid)
  + [identifier](#identifier-1)
  + [status](#status-1)
  + [executionStatus](#executionstatus-1)
* [CreateOperationParameters](#createoperationparameters)
  + [regions](#regions-1)
  + [public](#public-1)
  + [name](#name-5)
  + [description](#description-5)
  + [engineName](#enginename-1)
  + [sharedWith](#sharedwith-1)
  + [parameters](#parameters-33)
  + [outputParameters](#outputparameters-1)
  + [inputs](#inputs-1)
  + [outputs](#outputs-1)
  + [dynamicOutput](#dynamicoutput-1)
  + [deprecationMessage](#deprecationmessage-1)
  + [retiredAfter](#retiredafter)
* [UpdateOperationParameters](#updateoperationparameters)
  + [identifier](#identifier-2)
  + [version](#version-1)
  + [deploymentIdentifier](#deploymentidentifier-2)
  + [regions](#regions-2)
  + [public](#public-2)
  + [name](#name-6)
  + [description](#description-6)
  + [engineName](#enginename-2)
  + [sharedWith](#sharedwith-2)
  + [parameters](#parameters-34)
  + [outputParameters](#outputparameters-2)
  + [inputs](#inputs-2)
  + [outputs](#outputs-2)
  + [dynamicOutput](#dynamicoutput-2)
  + [deprecationMessage](#deprecationmessage-2)
  + [retiredAfter](#retiredafter-1)
* [ParameterType](#parametertype)
* [PageResponse](#pageresponse)
  + [currentPage](#currentpage)
  + [perPage](#perpage)
  + [totalEntries](#totalentries)
  + [totalPages](#totalpages)
* [ListQueryParameters](#listqueryparameters)
  + [region](#region)
  + [perPage](#perpage-1)
  + [page](#page)
* [ProceduresList](#procedureslist)
  + [items](#items-1)
* [Procedure](#procedure)
  + [id](#id-1)
  + [ownerName](#ownername-1)
  + [identifier](#identifier-3)
  + [version](#version-2)
  + [name](#name-7)
  + [description](#description-7)
  + [tags](#tags)
  + [documentationUrl](#documentationurl)
  + [sharedWith](#sharedwith-3)
  + [regions](#regions-3)
  + [defaultRegion](#defaultregion)
  + [status](#status-2)
  + [executionStatus](#executionstatus-2)
  + [createdAt](#createdat-1)
  + [retiredAfter](#retiredafter-2)
  + [public](#public-3)
  + [operations](#operations-1)
  + [parameters](#parameters-35)
* [identifier](#identifier-4)
* [id](#id-2)
* [version](#version-3)
* [engineName](#enginename-3)
* [encryptedParameters](#encryptedparameters)
* [parameters](#parameters-36)
* [inputs](#inputs-3)
* [outputs](#outputs-3)
* [outputParameters](#outputparameters-3)
* [name](#name-8)
* [description](#description-8)
* [source](#source)
* [options](#options)
* [sources](#sources)
* [dataTypes](#datatypes-1)
* [description](#description-9)
* [dataType](#datatype-1)
* [name](#name-9)
* [type](#type-2)
* [description](#description-10)
* [name](#name-10)
* [optional](#optional-3)
* [ProcedureParameter](#procedureparameter)
  + [type](#type-3)
  + [defaultValue](#defaultvalue)
  + [name](#name-11)
  + [description](#description-11)
  + [source](#source-1)
  + [value](#value)
* [ListProcedureQueryParameters](#listprocedurequeryparameters)
  + [public](#public-4)
  + [operationUuid](#operationuuid)
  + [identifier](#identifier-5)
  + [status](#status-3)
  + [executionStatus](#executionstatus-3)
* [CreateProcedureParameters](#createprocedureparameters)
  + [name](#name-12)
  + [description](#description-12)
  + [tags](#tags-1)
  + [documentationUrl](#documentationurl-1)
  + [sharedWith](#sharedwith-4)
  + [parameters](#parameters-37)
* [identifier](#identifier-6)
* [version](#version-4)
* [engineName](#enginename-4)
* [parameters](#parameters-38)
* [inputs](#inputs-4)
* [outputs](#outputs-4)
* [outputParameters](#outputparameters-4)
* [name](#name-13)
* [description](#description-13)
* [UpdateProcedureParameters](#updateprocedureparameters)
  + [identifier](#identifier-7)
  + [version](#version-5)
  + [name](#name-14)
  + [description](#description-14)
  + [tags](#tags-2)
  + [documentationUrl](#documentationurl-2)
  + [sharedWith](#sharedwith-5)
  + [defaultRegion](#defaultregion-1)
  + [operations](#operations-2)
  + [parameters](#parameters-39)
* [DefaultType](#defaulttype)
* [ExecutionsList](#executionslist)
  + [items](#items-2)
* [Execution](#execution)
  + [procedureId](#procedureid)
  + [dataExport](#dataexport)
  + [region](#region-1)
  + [parameters](#parameters-40)
  + [procedureIdentifier](#procedureidentifier)
  + [procedureVersion](#procedureversion)
  + [metadata](#metadata)
  + [boundParameters](#boundparameters)
  + [id](#id-3)
  + [progress](#progress)
  + [createdAt](#createdat-2)
  + [updatedAt](#updatedat)
  + [submittedAt](#submittedat)
  + [completedAt](#completedat)
  + [failedAt](#failedat)
* [ExecutionEventsList](#executioneventslist)
  + [items](#items-3)
* [type](#type-4)
* [contents](#contents)
* [createdAt](#createdat-3)
* [updatedAt](#updatedat-1)
* [ListExecutionQueryParameters](#listexecutionqueryparameters)
  + [procedureId](#procedureid-1)
  + [createdStart](#createdstart)
  + [createdEnd](#createdend)
  + [completedStart](#completedstart)
  + [completedEnd](#completedend)
  + [sortBy](#sortby)
* [ExecutionActivitiesList](#executionactivitieslist)
  + [items](#items-4)
* [activityId](#activityid)
* [history](#history)
* [activityTaskScheduled](#activitytaskscheduled)
* [activityTaskStarted](#activitytaskstarted)
* [activityTaskCompleted](#activitytaskcompleted)
* [activityTaskFailed](#activitytaskfailed)
* [ListEventsorActivitiesQueryParameters](#listeventsoractivitiesqueryparameters)
  + [perPage](#perpage-2)
  + [page](#page-1)
* [CreateExecutionParameters](#createexecutionparameters)
  + [dataExport](#dataexport-1)
  + [region](#region-2)
  + [parameters](#parameters-41)
  + [procedureIdentifier](#procedureidentifier-1)
  + [procedureVersion](#procedureversion-1)
  + [metadata](#metadata-1)
  + [boundParameters](#boundparameters-1)
* [BoundType](#boundtype)
* [Progress](#progress-1)
* [EventType](#eventtype)
* [ContentType](#contenttype)
* [Status](#status-4)
* [ExecutionStatus](#executionstatus-4)

## ProcessingClient

Represents a client for interacting with a Trimble Cloud Platform Processing Framework.

### Parameters

* `tokenProvider` **ITokenProvider** A provider of tokens used to authenticate API calls.
* `baseUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The base URL of the Processing Framework API.
  \

### httpClientProvider

A provider of a pre-configured HttpClient used for API calls made by this client.

Type: BearerTokenHttpClientProvider

### tokenProvider

Represents a token provider.

Type: ITokenProvider

### operations

The operations available for this client.

Type: [OperationsImpl](#operationsimpl)

### procedures

The procedures available for this client.

Type: [ProceduresImpl](#proceduresimpl)

### executions

The executions available for this client.

Type: [ExecutionsImpl](#executionsimpl)

## sendInitEvent

Send the init event to the analytics service
\*

## OperationsImpl

API Methods relating to Trimble Cloud Platform Processing Framework operations

### Parameters

* `client` **[ProcessingClient](#processingclient)** A ProcessingClient instance used to make API calls.
* `A` **httpClientProvider** provider of a pre-configured HttpClient used for API calls made by this client

### getList

Retrieves a list of operations based on the provided query parameters.

#### Parameters

* `listOperationQueryParams` **[ListOperationQueryParameters](#listoperationqueryparameters)** Optional query parameters to filter the list of operations.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[OperationsList](#operationslist)>** A Promise that resolves to an instance of Operations.

### create

Creates a new operation.

#### Parameters

* `identifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the operation.
* `version` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the operation.
* `deploymentIdentifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the operation.
* `operationParameters` **[CreateOperationParameters](#createoperationparameters)** The operation parameters.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves with the created operation.

### get

Retrieves an operation by its ID.

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to retrieve.

* Throws **any** If there was an error retrieving the operation.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves to the retrieved Operation.

### update

Updates an operation with the specified operation ID. An Operation can only be updated when it is in a MUTABLE state (prior to approval).

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to update.
* `operationParameters` **[UpdateOperationParameters](#updateoperationparameters)** The operation parameters to be updated.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves to the updated Operation object.

### delete

Deletes an operation with the specified operation ID. Note that this action can only be performed on an Operation that is in a MUTABLE state. Once an Operation has been approved, it can only be decommissioned via retirement.

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to delete.

* Throws **any** If the operation deletion fails, an error message is thrown.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\** A Promise that resolves when the operation is successfully deleted.

### approve

Approves an operation with the specified operation ID. This locks the Operation into an unchangeable state with the exception of its shared\_with attribute.

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to approve.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves to the approved Operation.

### clone

Make an exact copy of a given Operation within the requesting User's scope, bump its version, and assign direct ownership to requesting User.
The new Operation will also be in a fresh, unapproved state (MUTABLE and NOT\_READY) regardless of the statuses of the Operation that was cloned.

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to clone.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves to the cloned Operation.

### publish

Publish an Operation so that all Users have access to it.
This action is effectively the same as sharing the Operation with everyone simultaneously. This action is irreversible.

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to publish.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves to the published Operation.

### retire

Retire an Operation from use. This moves its status from EXECUTABLE to RETIRED.
An Operation can only be retired if all associated Procedure definitions have also been retired.
Retiring an Operation is a non-reversible action. Once an Operation has been retired, it cannot be brought back into an approved/executable state.

#### Parameters

* `operationId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the operation to retire.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Operation](#operation)>** A Promise that resolves to the retired Operation.

## getQueryParameters

Constructs a query string from the given query parameters object.

### Parameters

* `queryParams` **([ListOperationQueryParameters](#listoperationqueryparameters) | [ListProcedureQueryParameters](#listprocedurequeryparameters) | [ListExecutionQueryParameters](#listexecutionqueryparameters) | [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** The query parameters object.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The generated query string. If no parameters are provided, it returns an empty string.

## validateIdentifier

Validates the identifier based on the specified criteria.

### Parameters

* `params` **any** The parameters object containing the identifier to be validated.

* Throws **any** An error if the identifier does not meet the specified criteria.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** A boolean indicating whether the identifier is valid or not.

## mapperRecord

Mapping of keys from one format to another.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

## OneWayMaps

List of keys that are mapped in one direction only. Do not map them if present in the response object.

## mapRequest

Maps the properties of an object using a mapper record and transforms the values.

### Parameters

* `obj` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The object to be mapped.

Returns **any** The mapped object.

## mapResponse

Maps the response object using a mapper record and transforms the values.

### Parameters

* `obj` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The response object to be mapped.

Returns **any** The mapped response object.

## ProceduresImpl

This class provides API methods related to Trimble Cloud Platform Processing Framework procedures.
It uses a provided ProcessingClient to make API calls.

### Parameters

* `client` **[ProcessingClient](#processingclient)** A ProcessingClient instance used to make API calls.

### getList

Retrieves a list of available procedures.

#### Parameters

* `listProcedureQueryParams` **[ListProcedureQueryParameters](#listprocedurequeryparameters)** Query parameters to filter the list of procedures.

* Throws **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** If an error occurs, it throws an error message: 'Failed to list procedures: {error}' or 'Failed to retrieve HttpClient: {error}'.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[ProceduresList](#procedureslist)>** A promise that resolves to a list of procedures.

### create

Creates a new procedure.

#### Parameters

* `identifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The identifier of the procedure.
* `version` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The version of the procedure.
* `defaultRegion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Region name the Procedure should execute in by default.
* `operations` **Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), ProcedureOperation>** Mapping of Procedure names and definitions. This is where the user specifies which Procedures make up the Procedure and how those Operations chain together.
* `procedureParameters` **[CreateProcedureParameters](#createprocedureparameters)** The procedure parameters.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Procedure](#procedure)>** A Promise that resolves to the created procedure.

### get

Retrieves a procedure by its ID.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the procedure to retrieve.
* `view` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Optional query parameter for the request. Passing a value of definition with this query parameter will return the POST contents used to initially create the procedure. This is useful for creating a new version of the procedure or to promote the procedure definition to a new environment.

* Throws **any** If an error occurs, it throws an error message: 'Failed to read procedure: {error}'.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\** A promise that resolves to the retrieved procedure.

### update

Update a Procedure object by ID. A Procedure can only be updated after its creation but before its approval. i.e. It must have a status of MUTABLE and an execution\_status of NOT\_READY.
Once a Procedure has been approved, only its shared\_with, documentation\_url, and default\_region attributes can be updated.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the procedure to update.
* `procedureParameters` **[UpdateProcedureParameters](#updateprocedureparameters)** The updated procedure object.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Procedure](#procedure)>** A Promise that resolves to the updated Procedure object.

### delete

Deletes an procedure with the specified procedure ID.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the procedure to delete.

* Throws **any** If the procedure deletion fails, an error message is thrown.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Procedure](#procedure)>** A Promise that resolves when the procedure is successfully deleted.

### approve

Approve a Procedure for execution. This locks the Procedure into an unchangeable state (with the exception of shared\_with and documentation\_url attributes).
A Procedure cannot be executed until it has been approved.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the procedure to approve.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Procedure](#procedure)>** A Promise that resolves to the approved Procedure.

### publish

Publish a Procedure so all Users have access to it.
This action is effectively the same as sharing the Procedure with all other users simultaneously. This action is irreversible.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the procedure to publish.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Procedure](#procedure)>** A Promise that resolves to the published procedure.

### retire

Retire a Procedure from use. This moves its status from EXECUTABLE to RETIRED.
A Procedure can only be retired if no associated Procedure Executions are active.
Retiring a Procedure is a non-reversible action. Once a Procedure has been retired, it cannot be brought back into an approved/executable state.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the procedure to retire.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Procedure](#procedure)>** A Promise that resolves to the retired procedure.

## ExecutionsImpl

API Methods relating to Trimble Cloud Platform Processing Framework executions.

### Parameters

* `client` **[ProcessingClient](#processingclient)** A ProcessingClient instance used to make API calls.
* `A` **httpClientProvider** provider of a pre-configured HttpClient used for API calls made by this client

### getList

Gets Procedure Execution objects that the user has access to view.

#### Parameters

* `listExecutionQueryParams` **[ListExecutionQueryParameters](#listexecutionqueryparameters)** Optional query parameters to filter the list of executions.

* Throws **any** If there is an error retrieving the list of executions.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[ExecutionsList](#executionslist)>** A Promise that resolves to an object containing the list of executions.

### create

Creates and starts a new Procedure Execution in the system.

#### Parameters

* `procedureId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The unique identifier of the target Procedure.
* `executionParameters` **[CreateExecutionParameters](#createexecutionparameters)** execution parameters.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Execution](#execution)>** A promise that resolves with the created execution.

### get

Retrieves an execution by its ID.

#### Parameters

* `executionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the execution to retrieve.
* `details` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Boolean to determine if the Execution response contains the underlying Procedure definition. The default is false. This parameter is restricted to BACKEND access level only.

* Throws **any** If there was an error retrieving the execution.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Execution](#execution)>** A Promise that resolves to the retrieved Execution.

### getActivities

Get the activities tied to a Processing Execution. Activities map to the operations defined within the Procedure being executed.

#### Parameters

* `executionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the execution.
* `listActivityQueryParams` **[ListEventsorActivitiesQueryParameters](#listeventsoractivitiesqueryparameters)?** Optional query parameters for filtering the activities.

* Throws **any** If there is an error retrieving the activities.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[ExecutionActivitiesList](#executionactivitieslist)>** A Promise that resolves to the activities for the execution.

### getExecutionData

Data Export relies on the new Split Container engine architecture, and cannot be used with single-container or EC2-based engines.
If Data Export is specified for an execution which contains operations on single-container or EC2-based engines, those operations will not have any data exported.

#### Parameters

* `executionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** UUID of the execution to retrieve engine logs.
* `outputPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Relative path of the user's Data Ocean account where the logs are to be placed.

* Throws **any** If there is an error while retrieving the execution data.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Execution](#execution)>** A promise that resolves to the execution data.

### getExecutionLogs

Obtain log contents for a given execution via DataOcean. Successful requests to this endpoint will create an execution that is responsible for delivering requested contents to the user.

#### Parameters

* `executionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The Execution ID that logs are desired for.
* `outputPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Desired path to write the logs to in the client's Data Ocean account.

* Throws **any** If there is an error retrieving the execution logs.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Execution](#execution)>** A promise that resolves to the execution logs.

### getEvents

Get the events tied to an Execution. Events are logged by the Log Events for an Execution request.

#### Parameters

* `executionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The ID of the execution.
* `listEventsQueryParams` **[ListEventsorActivitiesQueryParameters](#listeventsoractivitiesqueryparameters)?** Optional query parameters for filtering the events.

* Throws **any** If the execution events retrieval fails.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[ExecutionEventsList](#executioneventslist)>** A promise that resolves to an object containing the execution events.

## OperationsList

**Extends PageResponse**

Interface for the response from the API when retrieving a list of operations.
This interface extends the BaseResponse interface and includes an array of operations.

### items

The list of Operations.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Operation](#operation)>

## Operation

The Operation object.

### id

The unique identifier for the Operation, read-only and assigned at creation time. Used to perform actions on specific Operations through the API.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### identifier

Unique identifier string for the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### version

The version of the Operation.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### regions

Allowable locations that a particular Operation can run in.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### public

The state of the Operation's publication. If true, the Operation is available for public use.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### status

The status of the Operation. Allowed:MUTABLE┃EXECUTABLE┃RETIRED

Type: [Status](#status)

### executionStatus

The status of the Operation's execution. Allowed:NOT\_READY┃READY┃SUSPENDED

Type: [ExecutionStatus](#executionstatus)

### ownerName

The owner name maps to the API Cloud application used to originally create the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### name

The name of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

The description of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### engineName

The name of the backend engine that supports this Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### deploymentIdentifier

The identifier of the Deployment that supports this Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### createdAt

Timestamp for the Operation's creation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sharedWith

List of names of Users with whom this Operation has been shared.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### parameters

A list of parameter objects attached to the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Parameter>

### outputParameters

A list of parameter objects that define values to be output from an Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OutputParameter>

### inputs

Named inputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), InputParam>

### outputs

Named outputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OutputParam>

### dynamicOutput

Indicates whether or not the Output content is considered dynamic or not.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### deprecationMessage

Optional string parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## type

Data type of the parameter

Type: [ParameterType](#parametertype)

## description

Descriptive text for the input parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## name

Human readable name for the parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## optional

Whether the parameter is optional or required.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## encrypted

Indicates that the parameter contains sensitive information. T

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## type

Data type of the output parameter

Type: [ParameterType](#parametertype)

## description

Descriptive text for the output parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## name

Human readable name for the parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## optional

Whether the parameter is optional or required.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## name

Human readable name of the input.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## description

Descriptive text for the input type.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## dataTypes

List of accepted input data types.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

## optional

Whether the input file is optional or not.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## dataType

Type of data output from the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## description

Descriptive text for the output and its type.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## name

Human readable name of the output.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ListOperationQueryParameters

**Extends ListQueryParameters**

Interface for the query parameters used to filter the list of operations.

### engine

Filters Operations by the engine name supplied in the query.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### deploymentIdentifier

The unique identifier of a Deployment.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### procedureUuid

Returns resources that belong to the associated procedure id.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### identifier

Filters Operations by the identifier supplied in the query.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### status

Filters Operations by the status supplied in the query.

Type: [Status](#status)

### executionStatus

Filters Operations by the execution status supplied in the query.

Type: [ExecutionStatus](#executionstatus)

## CreateOperationParameters

Parameters passed while creating an operation.

### regions

Allowable locations that a particular Operation can run in.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### public

The state of the Operation's publication. If true, the Operation is available for public use.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### name

The name of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

The description of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### engineName

The name of the backend engine that supports this Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sharedWith

List of names of Users with whom this Operation has been shared.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### parameters

A list of parameter objects attached to the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Parameter>

### outputParameters

A list of parameter objects that define values to be output from an Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OutputParameter>

### inputs

Named inputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), InputParam>

### outputs

Named outputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OutputParam>

### dynamicOutput

Indicates whether or not the Output content is considered dynamic or not.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### deprecationMessage

Optional string parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### retiredAfter

Optional string parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## UpdateOperationParameters

Operation parameters that can updated.

### identifier

Unique identifier string for the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### version

The version of the Operation.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### deploymentIdentifier

The identifier of the Deployment that supports this Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### regions

Allowable locations that a particular Operation can run in.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### public

The state of the Operation's publication. If true, the Operation is available for public use.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### name

The name of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

The description of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### engineName

The name of the backend engine that supports this Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sharedWith

List of names of Users with whom this Operation has been shared.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### parameters

A list of parameter objects attached to the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Parameter>

### outputParameters

A list of parameter objects that define values to be output from an Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OutputParameter>

### inputs

Named inputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), InputParam>

### outputs

Named outputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OutputParam>

### dynamicOutput

Indicates whether or not the Output content is considered dynamic or not.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### deprecationMessage

Optional string parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### retiredAfter

Optional string parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ParameterType

Data type of the output parameter.
string - String text surrounded by double quotes.
single\_choice - Value must match an item in the options field.
boolean - Boolean true/false (not surrounded by quotes).
array - - A list of parameters of any type.
object - A JSON object.

## PageResponse

Interface for the page settings from the API.
This interface includes common properties that are included in all list responses.

### currentPage

Current page of the Procedures object list.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### perPage

The number of items to return per page. The default is 5 and the maximum is 1000.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### totalEntries

The total number of entries in the list.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### totalPages

The total number of pages in the list.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

## ListQueryParameters

Query string parameters for filtering processing API calls.

### region

The region to filter by. Allowed: aws-us1 ┃ azure-us1

Type: region

### perPage

The number of items to return per page. The default is 5 and the maximum is 1000.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### page

The page number to return

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

## ProceduresList

**Extends PageResponse**

Interface representing procedure list.

### items

The list of Procedures.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Procedure](#procedure)>

## Procedure

The Procedure object.

### id

The unique identifier for the Procedure, read-only and assigned at creation time. Used to perform actions on specific Procedures through the API.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### ownerName

The owner name maps to the API Cloud application used to originally create the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### identifier

Unique identifier string for the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### version

The version of the Procedure.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### name

The name of the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

The description of the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### tags

List of tags (as strings) associated with the Procedure.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### documentationUrl

Optional URL to reference external documentation for the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sharedWith

List of names of Users with whom this Procedure has been shared.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### regions

Allowable locations that a particular Procedure can run in.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### defaultRegion

Region name the Procedure should execute in by default.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### status

The status of the Procedure. Allowed : MUTABLE┃EXECUTABLE┃RETIRED

Type: [Status](#status)

### executionStatus

The status of the Procedure's execution. Allowed : NOT\_READY┃READY┃SUSPENDED

Type: [ExecutionStatus](#executionstatus)

### createdAt

Timestamp for the Procedure's creation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### retiredAfter

Optional string parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### public

The state of the Procedure's publication. If true, the Procedure is available for public use.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### operations

Mapping of Procedure names and definitions. This is where the user specifies which Procedures make up the Procedure and how those Operations chain together.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationInProcedure>

### parameters

Parameter mappings for the Procedures contained within the Procedure.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [ProcedureParameter](#procedureparameter)>

## identifier

Unique identifier string for the operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## id

The unique identifier for the Operation, read-only and assigned at creation time.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## version

The version of the Operation.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

## engineName

The name of the backend engine that supports this operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## encryptedParameters

List of Operation parameters defined with encrypted?: true

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

## parameters

Parameters for the Operation. Each Operation can have 0 or more parameters.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationParameters>

## inputs

Named inputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationInputs>

## outputs

A Procedure Operation does not require Output Ports to be defined in the Procedure definition except for the case when a Switcher Operation is being utilized.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationOutputs>

## outputParameters

A list of parameter objects that define values to be output from an Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationOutputParameters>

## name

Human-readable name of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## description

A description of an operation and its function.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## source

The source of the Operation parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## options

Whether the parameter is optional or required.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## sources

Used to chain the output of one Operation into the input of another Operation.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

## dataTypes

Type of data output from the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## description

Descriptive text for the output and its type.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## dataType

Type of data output from the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## name

Human readable name of the output.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## type

Data type of the output parameter

Type: [ParameterType](#parametertype)

## description

Descriptive text for the output parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## name

Human readable name for the parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## optional

Whether the parameter is optional or required.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## ProcedureParameter

Parameter mappings for the Procedures contained within the Procedure.
The identifier of each parameter must be referenced at least once within an Procedure's parameter sources.

### type

The type of the Procedure parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### defaultValue

The default value for the Procedure parameter. If no value is provided by the user then the default value is used instead.

Type: [DefaultType](#defaulttype)

### name

Human readable name for the Procedure parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

Description for the Procedure parameter

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### source

String parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### value

String parameter.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ListProcedureQueryParameters

**Extends ListQueryParameters**

Interface for the query parameters used to filter the list of procedures.

### public

Filters results by public status. If not supplied, or explicitly set to "true",

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### operationUuid

Unique ID of an Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### identifier

Returns all resource(s) that match the provided identifier string.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### status

The status of a resource. Filters the list of returned results by those that have a status matching the supplied value.

Type: [Status](#status)

### executionStatus

The execution\_status of a resource. Filters the list of returned resources by those that have an execution\_status matching the supplied value.

Type: [ExecutionStatus](#executionstatus)

## CreateProcedureParameters

Parameters passed while creating a Procedure.

### name

The name of the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

The description of the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### tags

List of tags (as strings) associated with the Procedure.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### documentationUrl

Optional URL to reference external documentation for the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sharedWith

List of names of Users with whom this Procedure has been shared.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### parameters

Parameter mappings for the Procedures contained within the Procedure.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [ProcedureParameter](#procedureparameter)>

## identifier

Unique identifier string for the operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## version

The version of the Operation.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

## engineName

The name of the backend engine that supports this operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## parameters

Parameters for the Operation. Each Operation can have 0 or more parameters.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationParameters>

## inputs

Named inputs for the Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationInputs>

## outputs

A Procedure Operation does not require Output Ports to be defined in the Procedure definition except for the case when a Switcher Operation is being utilized.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationOutputs>

## outputParameters

A list of parameter objects that define values to be output from an Operation.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationOutputParameters>

## name

Human-readable name of the Operation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## description

A description of an operation and its function.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## UpdateProcedureParameters

Procedure parameters that can updated.

### identifier

Unique identifier string for the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### version

The version of the Procedure.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### name

The name of the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### description

The description of the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### tags

List of tags (as strings) associated with the Procedure.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### documentationUrl

Optional URL to reference external documentation for the Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sharedWith

List of names of Users with whom this Procedure has been shared.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### defaultRegion

Region name the Procedure should execute in by default.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### operations

Mapping of Procedure names and definitions. This is where the user specifies which Procedures make up the Procedure and how those Operations chain together.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), OperationForCreateUpdateProcedure>

### parameters

Parameter mappings for the Procedures contained within the Procedure.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [ProcedureParameter](#procedureparameter)>

## DefaultType

The default value for the Procedure parameter. If no value is provided by the user then the default value is used instead.

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))

## ExecutionsList

**Extends PageResponse**

Interface for the response from the API when retrieving a list of executions.
This interface extends the BaseResponse interface and includes an array of executions.

### items

The list of Operations.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Execution](#execution)>

## Execution

The Execution object.

### procedureId

The unique identifier of the target Procedure.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### dataExport

Whether or not the execution's data will be available for export. Default to false.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### region

Region name for the Execution to run in. Must be a name seen in the Procedure's regions list. If not provided, then default\_region of the Procedure is used.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### parameters

Mapping of Procedure-specified parameter names to parameter values.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))>

### procedureIdentifier

The identifier of the target Procedure for Execution.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### procedureVersion

The version of the target Procedure for Execution.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### metadata

User-specified metadata to be associated with the Execution.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### boundParameters

Mapping of Operation-specified output parameter names to output parameter values. This is where Operation output parameters are written once an Operation within the Execution completes.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [BoundType](#boundtype)>

### id

The unique identifier for the Execution, read-only and assigned at creation time. Used to perform actions on specific Execution through the API.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### progress

The execution\_status of an Execution describes its processing status. Allowed: UNSUBMITTED┃SUBMITTED┃WAITING┃QUEUED┃EXECUTING┃FAILED┃FINISHED

Type: [Progress](#progress)

### createdAt

Timestamp for the Execution's creation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### updatedAt

Timestamp for Execution's latest update

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### submittedAt

Timestamp for Execution's latest submission (start)

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### completedAt

Timestamp for Execution's completion, if applicable.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### failedAt

Timestamp for Execution's failure, if applicable.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ExecutionEventsList

**Extends PageResponse**

Represents the events associated with an execution.

### items

The events in the response.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Event](https://developer.mozilla.org/docs/Web/API/Event)>

## type

The type of Execution Event that is being described. Allowed: INFO┃ERROR

Type: [EventType](#eventtype)

## contents

The contents property is Engine/Operation specific and can be defined as either a single string or an object.

Type: [ContentType](#contenttype)

## createdAt

Timestamp for the Execution's creation.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## updatedAt

Timestamp for the Execution's last update.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ListExecutionQueryParameters

**Extends ListQueryParameters**

Interface for the query parameters used to filter the list of executions.

### procedureId

Returns resources that belong to the associated procedure id.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### createdStart

Filter results that have a created\_at time that is after the supplied value.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### createdEnd

Filter results that have a created\_at time that is before the supplied value.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### completedStart

Filter results that have a completed\_at time that is after the supplied value.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### completedEnd

Filter results that have a completed\_at time that is before the supplied value.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### sortBy

Sort results by created\_at or completed\_at, ascending(+) or descending(-). Note: the '+' sign must be url encoded as '%40' to be interpreted correctly.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ExecutionActivitiesList

**Extends PageResponse**

Activities tied to a Processing Execution.

### items

The Execution Activities in the response.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\

## activityId

The SWF Activity ID from the Processing Framework

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## history

The object containing historical information

Type: HistoricalInformation

## activityTaskScheduled

The time at which the Activity was scheduled.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## activityTaskStarted

The time at which the Activity started processing.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## activityTaskCompleted

The time at which the Activity was finished processing.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## activityTaskFailed

The time at which the Activity failed.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ListEventsorActivitiesQueryParameters

Query string parameters for filtering events & activities related to events.

### perPage

The number of items to return per page. The default is 5 and the maximum is 1000.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### page

The page number to return

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

## CreateExecutionParameters

Parameters passed while creating an execution.

### dataExport

Whether or not the execution's data will be available for export. Default to false.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### region

Region name for the Execution to run in. Must be a name seen in the Procedure's regions list. If not provided, then default\_region of the Procedure is used.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### parameters

Mapping of Procedure-specified parameter names to parameter values.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))>

### procedureIdentifier

The identifier of the target Procedure for Execution.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### procedureVersion

The version of the target Procedure for Execution.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### metadata

User-specified metadata to be associated with the Execution.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### boundParameters

Mapping of Operation-specified output parameter names to output parameter values. This is where Operation output parameters are written once an Operation within the Execution completes.

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [BoundType](#boundtype)>

## BoundType

Variable parameter value dependant on the Operation definition.

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))

## Progress

The execution\_status of an Execution describes its processing status.
Possible values are:

* UNSUBMITTED: The execution was not successfully submitted to SWF.
* SUBMITTED: The execution was successfully submitted to SWF for handling by the Decider.
* WAITING: The execution is not ready to be executed.
* QUEUED: The execution is in the queue.
* EXECUTING: The execution is currently being executed.
* FAILED: The execution has failed.
* FINISHED: The execution has finished successfully.

## EventType

The type of Execution Event that is being described.
Allowed: INFO┃ERROR

## ContentType

An event message provided by the Engine/Operation.

Type: ([object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))

## Status

The status of describes its lifecycle as follows.
MUTABLE - New and can still be altered.
EXECUTABLE - Ready to be executed and can no longer be altered. The Procedure has been put into a non-mutable state to eliminate the possibility of introducing breaking changes to an in-use Procedure.
RETIRED - Retired from service and can no longer be executed.
DELETING - Is in the process of being deleted.

## ExecutionStatus

The execution status.
NOT\_READY - Cannot be used to create any Procedures and thus cannot be part of an execution.
READY - Can now by used to create Procedures and thus be part of executions.
SUSPENDED - The processing has been suspended and cannot be part of executions.
