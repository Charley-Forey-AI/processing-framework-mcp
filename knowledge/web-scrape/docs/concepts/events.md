---
title: "Events"
source_url: https://docs.trimblecloud.com/processing-framework/content/concepts/events/
fetched_at: 2026-03-20T19:36:51.060156+00:00
---

# Events

The Processing Framework provides two events through the Event Service. These are used to notify subscribers of changes to the status of an Execution's Procedure or Operation.

See the [Event Service Documentation](https://docs.trimblecloud.com/events-service/) for information on how to consume these events and more.

## Execution Procedure Event

An Execution Procedure Event is created when the status of a Procedure Execution changes.

### Example

```
{
  "id": "5856daf4-42a2-4e6d-88bf-9f6a22a487c1",
  "specversion": "1.0",
  "source": "trn:tid:application:00af01c1-d90b-431e-9512-65ea20c8fb97",
  "type": "com.trimble.processing.execution.status.v1.0",
  "time": "2024-10-04T17:57:38.228377+00:00",
  "subject": "trn:processing:execution:4a28c98f-ea54-48e8-aa15-c4cbdfba607d",
  "data": {
    "auth": "trn:tid:application:368b8e7c-822a-4bea-bf39-8dfd7b753264",
    "status": "SUCCEEDED"
  }
}
```

Breakdown

* `id`: A unique identifier for the event.
* `specversion`: Version of the Events specification version, which is static.
* `source`: Source of the event. This is the PF application that published the event, which is static per PF Environment.
* `type`: Type of event, which is static.
* `time`: Time the status changed in UTC.
* `subject`: TRN of the Execution.
  + Format is `trn:processing:execution:<execution_id>`
* `data`: Data of the event.
  + `auth`: TRN of the application that created the Execution. Format is `trn:tid:application:<application_id>`
  + `status`: Status of the Execution Procedure.
    - `STARTED`: The Execution has started
    - `SUCCEEDED`: The Execution Procedure has completed successfully
    - `FAILED`: The Execution Procedure has failed

## Execution Operation Event

An Execution Operation Event is created when the status of an Operation Execution changes.

### Example

```
{
  "id": "7ca86df5-57e8-48b1-a14a-dbe3e3525620",
  "specversion": "1.0",
  "source": "trn:tid:application:00af01c1-d90b-431e-9512-65ea20c8fb97",
  "type": "com.trimble.processing.operation.status",
  "time": "2024-10-04T21:06:13.692277+00:00",
  "subject": "trn:processing:azure-us1:execution:65c337c4-e4cb-4319-b494-d3e6684ad860:procedure_operation:sleep",
  "data": {
    "auth": "trn:tid:application:368b8e7c-822a-4bea-bf39-8dfd7b753264",
    "status": "COMPLETED",
    "details": ""
  }
}
```

Breakdown

* `id`: A unique identifier for the event.
* `specversion`: Version of the Events specification version, which is static.
* `source`: Source of the event. This is the PF application that published the event, which is static per PF Environment.
* `type`: Type of event, which is static.
* `time`: Time the status changed in UTC.
* `subject`: TRN of the Operation Execution.
  + Format is `trn:processing:<region>:execution:<execution_id>:procedure_operation:<operation_identifier>`
* `data`: Data of the event. This schema is specific to which `status` is being reported.
  + `auth`: TRN of the application that created the Execution. Format is `trn:tid:application:<application_id>`.
  + `status`: Status of the Operation Execution. One of:
    - `SCHEDULED`
    - `STARTED`
    - `COMPLETED`
    - `FAILED`
    - `TIMED_OUT`
  + `details`: [OPTIONAL] Additional details about the Operation Execution.

### Operation Status Definitions

The schema for the event's `data` field is dependent on the `status` being reported. Below are descriptions of each status
change along with what their `data` schemas will look like.

#### SCHEDULED

An Operation is considered SCHEDULED when it is ready to be handled within the Procedure Execution.
This event does not include any additional information besides the status name.

```
{
  "data": {
    "auth": "trn:tid:application:1bb6c29b-50e2-485d-973a-81f94ceade0a",
    "status": "SCHEDULED"
  }
}
```

#### STARTED

The Operation has started processing.
This event does not include any additional information besides the status name.

```
{
  "data": {
    "auth": "trn:tid:application:1bb6c29b-50e2-485d-973a-81f94ceade0a",
    "status": "STARTED"
  }
}
```

#### COMPLETED

The operation has finished successfully.
This event includes a `details` string field provided by the engine to report detailed information about the Operation's completion.

Engine Developers can find more information in the [results schema](../../../../snippets/json/task-result-json-schema.json) and [tdsplitengine](#../../../reference/tdsplitengine/overview.md) documentation.

```
{
  "data": {
    "auth": "trn:tid:application:1bb6c29b-50e2-485d-973a-81f94ceade0a",
    "status": "COMPLETED",
    "details": "This is info my engine wants to convey after completing."
  }
}
```

#### FAILED

The operation ended in failure.
This event includes `failure_reason` and `details` fields. The values are provided by the engine.

* `failure_reason`: A short, high-level description of the failure that occurred.
* `details`: More detailed about the failure that occurred.

Engine Developers can find more information in the [results schema](../../../../snippets/json/task-result-json-schema.json) and [tdsplitengine](#TODO) documentation.

```
{
  "data": {
    "auth": "trn:tid:application:1bb6c29b-50e2-485d-973a-81f94ceade0a",
    "status": "FAILED",
    "failure_reason": "Executable exited with non 0 status code.",
    "details": "A traceback to the error that occurred."
  }
}
```

#### TIMED\_OUT

The operation has stalled and needs to be attempted again.
This will always be accompanied by a SCHEDULED event very shortly after
This includes a `details` field indicating the time out.

```
{
  "data": {
    "auth": "trn:tid:application:1bb6c29b-50e2-485d-973a-81f94ceade0a",
    "status": "TIMED_OUT",
    "details": "The Operation has stalled and will be retried."
  }
}
```
