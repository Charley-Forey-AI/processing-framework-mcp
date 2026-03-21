---
title: "Hello World Engine"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/engine-development/step-by-step/
fetched_at: 2026-03-20T19:37:19.902618+00:00
---

# Hello World Engine

In this tutorial, we will go through the process of building a split engine and testing it using Processing Framework
split-fixture package. This will be done in the following steps:

1. Setting up your environment
2. Creating an engine
3. Creating a test fixture
4. Testing the engine

If you encounter problems while working through this tutorial refer to the [Issues and Solutions](../issues-solutions/)
page for help.

## Set Up Your Environment

This tutorial will require: a Docker client, Python, Git, a Shell, and a Text Editor.

### Download The Prerequisites

* Download and install the `tdsplitengine` Python package [Instructions](../supplemental/prereqs-and-installations/#td-split-engine)
* Clone the sample Engine repository. [Instructions](../supplemental/prereqs-and-installations/#integrity-checker-engine)
* Download and install the Split Fixture Python package. [Instructions](../supplemental/prereqs-and-installations/#split-fixture-python)
* Download the Split Fixture container image from Trimble Dockerhub. [Instructions](../supplemental/prereqs-and-installations/#split-fixture-docker-image)

## Create an Engine

### Implement an Engine

The first step in this process will be to create an engine that implements your business logic. In this tutorial we will
use the sample `integritychecker` engine as an example, and skip this step. The engine code can be found [here](https://bitbucket.trimble.tools/projects/PE/repos/engine-integritychecker/browse)
This sample Engine is a pure Python Engine that calculates a file hash on the input files. It's a great reference to
understanding the structure of an Engine written in Python, but for now we will simply use it as-is. The process is
described in depth in [Using tdsplitengine](../supplemental/using-tdsplitengine/). See
[here](../supplemental/suggestions-for-building-a-container/) for suggestions on how to organize your Engine repository.

Consider the importance of logging when developing an Engine. Read about the logging interface provided
[here](../supplemental/engine-logging/).

### Build an Image

The next step is to build a container using the engine implementation described above.
This process is described in depth in
[Building a container](../supplemental/suggestions-for-building-a-container/).

In our example, we can run a `docker build` from the `{gitRoot}/container` directory. The integritychecker engine uses
the tdsplitengine package which is available in Trimble Etools Artifactory. To access this package, Artifactory
credentials need to be passed into the docker build command in the form of build arguments.

```
docker build -t int-engine/integritychecker-linux:latest . --build-arg ETA_USER="firstname_lastname%40trimble.com" --build-arg ETA_PASS="etools API key"
```

* `ETA_USER`: Your trimble email address with the `@` sign encoded as `%40` (ie. `firstname_lastname%40trimble.com`)
* `ETA_PASS`: Your etools artifactory api key, which can be found [here](https://artifactory.trimble.tools/ui/admin/artifactory/user_profile)

The names `ETA_USER` and `ETA_PASS` are not themselves important and can be called different things such as
`ETOOLS_USERNAME` and `ETOOLS_PASSWORD` but the name used must match between the build command, the [dockerfile](https://bitbucket.trimble.tools/projects/PE/repos/engine-integritychecker/browse/container/dockerfile),
and the [requirements file](https://bitbucket.trimble.tools/projects/PE/repos/engine-integritychecker/browse/container/requirements.txt).

## Create a Test Fixture

The Split Fixture is a testing structure that populates an input json object that the Processing Framework uses to pass
work to an Engine. The input json is modelled after an
[operation definition](../supplemental/operation-implementation/) The specification for this JSON file is
described in the section [here](../../../../snippets/json/task-request-json-schema.json). The purpose of the json file is
to specify parameters and file locations for the Engine to use. In the Processing Framework the json file location is
passed to the Engines as an environment variable called `PF_TASK_JSON_PATH`. During this section the split-fixture will
populate the JSON file with information provided by the operation definition and command line inputs. After the file is
created, you will have to set the environment variable value to the path returned by the split-fixture.

The Split Fixture is provided in two forms:

* A Python script that can be called from the shell. The shell script will create the task json on your local system and
  then return the path to that file. **NOTE** This version is used for testing the engine code *outside* of a Docker
  container. By running on your local system, you can rapidly make changes to your code and test against the JSON
  returned by the fixture. This rapid iteration is most useful when developing and testing the engine code, but doesn't
  provide any testing of the container aspects of the engine.
* A Linux or Windows container that runs the `tdsplitfixture` package. The container version will place the task json in
  a docker volume that will be mounted to the Engine container on runtime and return the path to the file in to volume.
  This version should be used when testing a built engine container. Testing this way most closely simulates the
  behavior of the engine while deployed in the Processing Framework but requires building the engine container to test
  with, which is appreciably slower than testing code directly.

Since we are using a build container, we will want to use the container version of split fixture. The first step needed
is to create a docker volume. This is a long lasting volume which can be mounted to different docker containers while
retaining data.

```
docker volume create lintask
```

Using the `integritychecker` example, we can build a test fixture with the following command

```
# Bash (Linux, Mac, Windows WSL)
docker run --rm -t \
    --volume lintask:/taskscratch \
    --volume "/mnt/c/path/to/engine-integritychecker/operation_definitions":/opdef \
    --volume "/mnt/c/path/to/scratch_directory/source_ports":/inp \
    trimble/pf-splitfixture:linux-latest \
    /opdef/compute_checksum.json \
    algorithm=sha256

# Windows Powershell
docker run --rm -t `
    --volume lintask:/taskscratch `
    --volume C:\Users\path\to\engine-integritychecker\operation_definitions:/opdef `
    --volume C:\Users\path\to\scratch_directory\source_ports:/inp `
    trimble/pf-splitfixture:linux-latest `
    /opdef/compute_checksum.json `
    algorithm=sha256
```

(Note: If you're developing a Windows engine, replace `trimble/pf-splitfixture:linux-latest` with `trimble/pf-splitfixture:windows-latest`)

You will need to modify the paths in the command above to point to the right locations. The first path should point to
`operation_definitions` directory in the `integritychecker` project. The second path should point to a directory you
create containing the operation input data. If using the Powershell command, these paths cannot be wrapped in
quotations. In-depth information on this command and the input data structure can be found [here](../local-testing/#running-tests-on-the-engine-container).

When this container exists, it will bring out an object that includes `PF_TASK_JSON_PATH`. Take note of this value,
it will need to be used to run the test in the next section.

## Test the Engine

With a built engine image and a test fixture created, we are ready to test the engine.

```
docker run -it --rm \
    --volume lintask:/taskscratch \
    --env PF_TASK_JSON_PATH=/taskscratch/request_33c1a9e6-06d6-11ec-8e65-0242ac110002.json \
    int-engine/integritychecker:latest
```

A description of this command can be found in [Using splitfixture](../local-testing/#running-tests-on-the-engine-container).

## Delegated Authorization

If your Engine needs to access a Trimble customer's resources on their behalf, you can use the Delegated Authorization feature.
Details about how to use this feature can be found [here](../supplemental/delegated-authorization/)

## Closing Notes

### Example scripts

There are example scripts showing the entire process (building an image, creating a test fixture, testing the Engine)

* [Linux](../../../../snippets/examples/test-split-engine.sh)
* [Windows](../../../../snippets/examples/test-split-engine.ps1)

### Next Steps

We have now followed through the steps of creating a working split engine image. If your engine tested successfully,
the next step is to [Submit your Engine](../api/)!
