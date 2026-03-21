---
title: "Primer"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/engine-development/basics/
fetched_at: 2026-03-20T19:37:15.926022+00:00
---

# Primer

The Processing Framework is an asynchronous batch processing system. The smallest unit of work dispatched by the
Processing Framework is an Operation. Engines execute Operations. Integrators can share their own intellectual
property with other Trimble teams by developing an Engine that will be deployed into the Processing Framework.

An Operation consists of two parts, a public interface definition written in JSON and the actual Operation
implementation written in the language(s) of your choice.

The JSON Operation definition is submitted to the Processing Framework API. The API uses the Operation definition to
validate the correctness of Procedure definitions that use the Operation. In particular the API verifies that the
Procedure supplies input to mandatory input ports and sets required input parameters.

The API is unable to verify that the implementation of an Operation by an Engine corresponds to the Operation's JSON
definition except through the direct relationship of an Operation's `deployment_identifier` which is subsequently
connected to a Deployment's `active_engine.`

## Prerequisites

## Docker

If you are a Trimble employee and are using Docker to create and manager container images, you must be part of the
Trimble Docker Hub. If you are not, please start by filing a
[licensing request](https://cisjira.trimble.com/servicedesk/customer/portal/23/create/260) to be included in the
corporate account.

*Be sure to request that your account be placed into the `company` Docker Hub Team so that you will have access to
relevant image resources provided by the Processing Framework.*

## Artifactory

[eTools Artifactory](https://artifactory.trimble.tools/artifactory/trimblecloudplatform-engagement-pypi/)

The Processing Framework provides various packages and utilities that can be retrieved from the eTools Artifactory
service.

## Configuration & Downloading Resources

### Split Fixture

#### CLI Utility

Configure `pip` to pull from the Trimble Cloud Engagement repository (`trimblecloudplatform-engagement-pypi`) on the
[eTools Artifactory](https://artifactory.trimble.tools/artifactory/trimblecloudplatform-engagement-pypi/) and run the command `pipx install splitfixture`.

Instead of configuring `pip`, you can also add this information to the `pip` command:

```
pip install --index-url="https://<USERNAME>:<ETOOLS-API-KEY>@artifactory.trimble.tools/artifactory/api/pypi/trimblecloudplatform-engagement-pypi/simple" --extra-index-url=https://pypi.python.org/simple splitfixture
```

* `USERNAME`: Your Trimble email address with the `@` sign encoded as `%40` (i.e. `firstname_lastname%40trimble.com`)
* `ETOOLS_API_KEY`: Your Artifactory API key, which can be found
  [here](https://artifactory.trimble.tools/ui/admin/artifactory/user_profile)

#### Docker Image

The Split Fixture Docker images are available on Trimble's [Docker Hub](https://hub.docker.com/repository/docker/trimble/pf-splitfixture). The OS Version is specified in the image
tags (ie `windows-latest` and `linux-latest`). To get an image locally (Windows, for example) run the command:

```
docker pull trimble/pf-splitfixture:windows-latest
```

If you are using Docker Desktop, ensure you are signed in to your Docker account through Okta and then use the Docker
Desktop app to sign in to the same account. Docker Desktop should open a web prompt that will authenticate with
Docker Hub and redirect you back to the Desktop app. If you do not already have access to Trimble's Docker Hub, you can
submit a Software License Request ticket to the Licensing Department at [cisjira.trimble.com](https://cisjira.trimble.com).

If you are using the Docker CLI, then you will need to provide an access token to authenticate with Docker Hub.
Instructions for creating and using an access token to log in are available in the [Docker documentation](https://docs.docker.com/docker-hub/access-tokens/).
The command to log in with the CLI is

```
docker login -u <username>
```

* `username`: Your Docker Hub username.

Provide the access token when prompted for a password.

### TD Split Engine (optional)

If you plan to implement your Engine using Python, the Processing Framework team provides a convenience library called
`tdsplitengine` that will help simplify Engine development.

Similar to the Split Fixture package above, the `tdsplitengine` package is also available through
[eTools Artifactory](https://artifactory.trimble.tools/artifactory/trimblecloudplatform-engagement-pypi/tdsplitengine).

```
pip install --index-url="https://<USERNAME>:<ETOOLS-API-KEY>@artifactory.trimble.tools/artifactory/api/pypi/trimblecloudplatform-engagement-pypi/simple" --extra-index-url=https://pypi.python.org/simple tdsplitengine
```

* `USERNAME`: Your trimble email address with the `@` sign encoded as `%40` (i.e. `firstname_lastname%40trimble.com`)
* `ETOOLS_API_KEY`: Your artifactory api key, which can be found
  [here](https://artifactory.trimble.tools/ui/admin/artifactory/user_profile)

### Integrity Checker Engine (optional)

The `integritychecker` Engine is provided as a working example available in the `PE` project in Bitbucket. If you need
read access, please reach out to the team to request access. You can clone the repository with

```
git clone ssh://git@bitbucket.trimble.tools/pe/engine-integritychecker.git
```
