---
title: "Overview"
source_url: https://docs.trimblecloud.com/processing-framework/content/reference/tdsplitengine/overview/
fetched_at: 2026-03-20T19:37:41.962877+00:00
---

# Overview

A framework that simplifies the development of an engine container component of a split engine.

There are actions that every Engine container must take at startup and shutdown to interface with the Processing
Framework. One option for minimizing the effort for required to implement the required common actions is to use the
`tdsplitengine` Python package provided by the processing framework team.

The `tdsplitengine` targets the common case where an Engine’s unique logic is already implemented as a command line
executable. An Engine derived from tdsplitenge shells out to the command line executable to implement the unique Engine
logic.

See the [Reference Documentation](../referencedocs/) for more information.

## Installation

This package is available on [Trimble Artifactory PyPI registry](https://artifactory.trimble.tools/ui/repos/tree/General/trimblecloudplatform-engagement-pypi).
You can install with `pip`:

```
>>> pip install --index-url="https://<USERNAME>:<ETOOLS-API-KEY>@artifactory.trimble.tools/artifactory/api/pypi/trimblecloudplatform-engagement-pypi/simple" --extra-index-url=https://pypi.python.org/simple tdsplitengine
```

Where:

* `USERNAME`: Your trimble email address with the @ sign encoded as %40
  (i.e. firstname\_lastname%40trimble.com)
* `ETOOLS_API_KEY`: Your artifactory api key, which can be found
  [here](https://artifactory.trimble.tools/ui/user_profile)

## Usage

The following is an example of how to use tdsplitengine to implement an Engine. It includes usage of the various
features provided. This example is described in more detail in
[using tdsplitengine](../../../how-to-guides/engine-development/supplemental/using-tdsplitengine/)

```
"""
A minimalist Engine implemented as an example of creating a Processing
Framework Engine that executes a sub process to perform its actual work.
The Python code in this module builds a command line and then executes
another program to perform the useful work
"""
import json
import logging
from pathlib import Path
import subprocess

import tdsplitengine

_logger = logging.getLogger(__name__)

# Create an instance of the Dispatcher class
operation_dispatcher = tdsplitengine.Dispatcher()

# This decorator matches this function named `compute_checksum`
# to the Operation named `compute_checksum`
@operation_dispatcher.operation
def compute_checksum(task_input: dict) -> dict:
    """
    The compute_checksum Operation executes the sha256sum program to
    compute the sha256 or md5 hash of each file in its input port.
    """
    parameters = task_input["parameters"]
    algorithm = parameters["algorithm"]

    input_ports = task_input["inputs"]
    sources_port = input_ports["sources"]

    hashes_out_port: Path = Path(task_input["outputs"]["hashes"])
    output_path: Path = hashes_out_port / "file_hashes.txt"

    secondary_logs_dir: Path = Path(task_input["secondary_logs"])
    stderr_path = secondary_logs_dir / "sum.log"

    relative_port_contents = []
    for source in sources_port:
        base_directory = Path(source["base-directory"])
        relative_paths = [
            Path(local_path).relative_to(base_directory)
            for local_path in source["local-paths"]
        ]
        relative_port_contents.extend(relative_paths)

    executable = "sha256sum" if algorithm == "sha256" else "md5sum"

    if len(relative_port_contents) > 0:
        sum_args = (executable, "--tag", *relative_port_contents)
        _logger.debug("Argument Tuple: %s", sum_args)

        try:
            with output_path.open("wt") as out_hashes:
                with stderr_path.open("wt") as out_error:
                    completed = subprocess.run(
                        sum_args,
                        check=True,
                        stdout=out_hashes,
                        stderr=out_error,
                        cwd=base_directory,
                        timeout=600,
                    )
        except Expection as err:
            # If this fails for some reason, lets try and reschedule it
            # This is not the desired error handling behavior
            # But is useful to show how rescheduling works
            reschedule_info = tdsplitengine.Reschedule(
                # Wait 60 seconds before rescheduling
                delay=60,
                # Properties is an optional field with metadata about retry
                properties={"attempt_count": 1},
            )
            # Also note how a tuple return can be used if no details string is desired
            return None, reschedule_info
    else:
        # This is a built in error to raise that will fail the task
        # with the expected information
        raise tdsplitengine.TaskError(
            # This is the high level error reason
            "No files in input port",
            # This is the detailed error message
            details="The input port must contain at least one file",
        )

    # This is an example of an Operation that sets 2 output parameters
    # Hash the generated file of hashes and return as an output parameter.
    verify_args = (executable, "--tag", output_path)
    verify_completed = subprocess.run(
        verify_args, capture_output=True, check=True, timeout=30
    )
    output_parameters = {
        "hashhash": verify_completed.stdout.decode("UTF-8").strip(),
        "count": str(len(relative_port_contents)),
    }

    # Add a details string about the execution's success.
    # This is added to the corresponding COMPLETED event
    # In the Event Service's "Processing Framework Operation Execution Status" event
    # Here, it is a json-encoded object, but can be any valid string
    details = json.dumps({"port_count": len(relative_port_contents)})

    result = tdsplitengine.TaskResult(
        output_parameters=output_parameters,
        # We do not want to reschedule
        reschedule=None,
        details=details,
    )
    return result

def main():
    """
    Configure logging and then call the dispatcher to process the Operation execution request
    """

    # Configure the logging module
    logging.basicConfig(level=logging.DEBUG)

    # execute was not passed a task json, so it will look for JSON at the path specified by
    # the PF_TASK_JSON_PATH environment variable
    Operation_dispatcher.execute()


if __name__ == "__main__":
    # Launching this module using the Python interpreter's -m switch executes
    # this code
    main()
```

## Features Used

### `tdsplitengine.Dispatcher`

The `tdsplitengine.Dispatcher` class is the main class of the tdsplitengine package.
It is used to poll for incoming task input files and provide that information to the
respective Operation function defined. It then handles any exceptions raised,
and formats the function’s return into the expected task result file schema.
It should only be defined once in the Engine’s module.

```
>>> operation_dispatcher = tdsplitengine.Dispatcher()
```

It is then told to start polling by the `execute` method.

```
>>> operation_dispatcher.execute()
```

### `tdsplitengine.Operation`

The `tdsplitengine.Operation` decorator is used to match a function to an Operation name.
If the function name is the same as the operation name, it will assume that.
However, if the function name is different, you can pass the operation name as an argument to the decorator.

```
@operation_dispatcher.operation
def compute_checksum(task_input: dict) -> dict:
```

```
@operation_dispatcher.operation("my_operation_name")
def my_function_name(task_input: dict) -> dict:
    pass
```

### `tdsplitengine.TaskResult`

The `tdsplitengine.TaskResult` dataclass is used to return the result of the Operation function.
See [TaskResult](../referencedocs/#class-tdsplitenginetaskresultoutput_parametersnone-reschedulenone-detailsnone) for more information.

```
return tdsplitengine.TaskResult(
    # All fields are optionsl
    output_parameters=None
    # We do not want to reschedule
    reschedule=None,
    details="We finished with no errors. Rejoice!"
)
```

There are multiple valid return types for the Operation function.
See [Operation Result](../referencedocs/#tdsplitenginedispatcheroperation_result) for more information.

### `tdsplitengine.Reschedule`

The `tdsplitengine.Reschedule` class is used to reschedule a task. It is optional, and only used
when there is an issue with business logic that may be fixed by retrying the operation at a later date
(ie. a a transient network error).

```
# This specifies to reschedule without any output parameters or details
return None, tdsplitengine.Reschedule(
    # Wait 60 seconds before rescheduling
    delay=60,
    # Properties is an optional field with metadata about retry
    properties={"attempt_count": 1},
)
```

See [Reschedule](../referencedocs/#class-tdsplitenginereschedulewait_time0-propertiesnone) for more information.

### `tdsplitengine.TaskError`

The `tdsplitengine.TaskError` exception is used to raise an error that will fail the task. It is useful
for when the task cannot be completed due to an error in the business logic (ie. an executable failed with a non-zero exit code).

The required `reason` field is a high-level message explaining the error that occurred. This field will be shown in a
Operation Status Event in the `failure_reason` field.

The optional `details` field is used to provide more in-depth information about the error (ie. a traceback).
For the event, it is truncated to 1024k, while it can be up to 30k outside of the event.

```
raise tdsplitengine.TaskError(
    # This is the high level error reason
    "No files in input port",
    # This is the detailed error message
    details="The input port must contain at least one file",
)
```

See [TaskError](../referencedocs/#exception-tdsplitenginetaskerrorreason-details) for more information.
