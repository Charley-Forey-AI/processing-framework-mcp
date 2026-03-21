---
title: "Concepts and Interface"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/engine-development/interface/
fetched_at: 2026-03-20T19:37:17.955473+00:00
---

# Concepts and Interface

## Engine

The image that contains the desired operating system and all the software required to accomplish a data transformation.
This resource is a Docker Image that contains the function(s) that are to be exposed in the Processing Framework API as
Operation objects.

Engines may contain an executable, a script, or pure logic that accomplishes the business need. Engines should also be
written with [Executions](../../../concepts/executions/) in mind. Consider what information you would like to know given
either success or failure scenarios as this information should be logged and then can be retrieved after an Execution is
processed.

### Dockerfile Requirements

#### Patching Labels

With security measures from CIS (updated February 2024), all Docker containers must contain a label from
[this list](https://cis-infosec.trimble.com/splunk/trimble-groups.txt).

The "software-patching" and "os-patching" labels must be specified and both must contain valid values that are relevant
to your organization from the list provided by the CIS team.

Please note that the label value that you must specify is found after the `cyberorg::` prefix. If you include the
prefix, the image will fail validation.

```
LABEL software-patching="known-value"
LABEL os-patching="known-value"
```

#### Product Label

The "product" label must be specified and contain a valid value that is relevant to the product owner. These values are
discoverable through the [Products API](https://cybersecurity.trimble.com/tsdlc-tsp/tsp-api#h.baei9k5bawmb)
or from [this list](../supplemental/product-labels/)

```
LABEL product="known-value"
```

#### User

It is crucial that the Engine Container runs as a non-root user. If a root user is specified, the Engine will be
rejected during the ingestion. More specifically, a user cannot be specified as `0` nor can a user specified by the user
name even if that user name is a non-root user. This means that a user must be specified by the integer ID
representation of the non-root user.

#### Architecture

A linux Engine image must be built for the amd64 CPU architecture. When triggering a build, use the
`--platform linux/amd64` flag to specify the target platform for the build output.

## Operation

The unique business logic that performs the data transformation. This is typically written in an Engine as a function.
An Operation function is where input ports, output ports, parameters, output parameters, logs, etc. are interacted with.

If you are leveraging the Python package `tdsplitengine`, you may utilize a decorator such as this to denote the
Operation function:

```
@operation_dispatcher.operation(operation_name="example_operation")
def example_operation(task_input: dict) -> dict:
...
```

It is critical to note that an Operation Identifier must be related to the business logic coded into an Engine by some
means. More explicitly, the name of a function in an Engine should have a corresponding Operation Identifier on the API.
If you are using the Python library `tdsplitengine`, you can utilize the decorator described above as a way to
explicitly define an Operation Identifier.

## Task JSON

The lightweight interface that contains instructions for file and parameter handling. There are two required types of
Task JSON -- Request and Result. The former is provided by the Processing Framework, and the latter is created by the
Engine container.

### Request Schema

The contents of the task request object are written to the `PF_TASK_JSON_PATH` file that is accessible as an environment
variable. Important information such as absolute paths for where to read files from (Input Ports), paths for where to
write files to (Output Ports), parameters and their values, and the location to write log messages to is all contained
within the Request JSON. Detailed information can be found [here](../supplemental/task-request-json/).

### Results Schema

The Engine must write the contents of the Task Results JSON to the absolute path specified by the `results_json`
property from the Task Request JSON. The contents of the Results object provided the communication channel to indicate
success or failure content along with any Output Parameters. Detailed information can be found
[here](../supplemental/task-result-json/).

## Engine Container Interface

Engine containers are *required* to implement the Engine interface. It is the responsibility of the Engine developer to
provide a container image that implements the interface. The Processing Framework interacts with an Engine container
through a defined interface. This interface is implemented using environment variables and JSON files written to a
shared volume.

The Processing Framework controls the lifecycle of the Engine container through this interface.

Each Engine container is used to execute a single Operation. After completing the requested Operation, the container is
expected to terminate.

The Processing Framework sets the **`PF_TASK_JSON_PATH`** environment variable in the container. The value of the
variable is the path to a Task JSON file that specifies details of the Operation the container should perform. The JSON
file specified by `PF_TASK_JSON_PATH` will not exist when the Engine container first starts. **The Engine container's
entry executable must watch or poll for the existence of the `PF_TASK_JSON_PATH` specified file**. The contents of the
[Task JSON](./#task-json) are described below.

The Task Request JSON specifies a `results_json` property. The value of this property is an absolute path where the
Engine should write a results JSON file to communicate the final status of the Operation.

### Lifecycle

* The Processing Framework runs a container using the integrator-provided Engine Docker image.

  + The Framework sets the `PF_TASK_JSON_PATH` environment variable in the container.
  + The Framework doesn't specify the command to run in the container. The dockerfile used to build the image must
    specify the command to run with a `CMD` or `ENTRYPOINT` statement.
* The container waits for a JSON file to be written to the absolute path specified by the `PF_TASK_JSON_PATH`
  environment variable. This file is created *after* the Engine container is running. A Task JSON file will be written
  in approximately one minute of the Engine container's start time. It is important to note that the Engine container
  must watch for the existence of the `PF_TASK_JSON_PATH` specified file. A pseudocode example of this might look like:

  ```
  WHILE True:
    IF IsEnvVarDefined("PF_TASK_JSON_PATH") AND FileExists(GetEnvVar("PF_TASK_JSON_PATH")) THEN
       BREAK;
    END
  DONE
  ```
* The Engine container parses the contents of the file specified by `PF_TASK_JSON_PATH` to obtain a `task_json` object.
* If `task_json` object has a top level `terminate` property with the value `True`, the Engine container should
  immediately exit. The container does not need to write a `results_json` file before exiting.
* Execute the Operation specified in the `task_results` JSON file or exit if instructed.
* Write a Results JSON file to the path specified by the `results_json` property of Task JSON. This file communicates
  whether the requested Operation succeeded or failed. When this file is written, the Processing Framework assumes the
  Operation has finished and does not wait for the Engine container to exit.
* Exit the Engine container. If the Engine container exits without writing a JSON file to the path specified by
  `results_json`, the Processing Framework assumes the Engine crashed and will report the Operation as failed.

### Custom Environment Variables

Custom environment variables (or secrets) are useful for adding information to a container on launch. This prevents
sensitive information from being included within the docker image. Some use cases include:
\* API Key/Secret
\* Executable license key

Secrets can be mounted to an engine using [Deployment Secret](../../../concepts/deployment-secrets/) resources. See the [API documentation](../api/) for a practical example of attaching a Secret to an Engine.
