---
title: "Example Lifecycle of API Resource Management"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/engine-development/lifecycle/
fetched_at: 2026-03-20T19:37:27.794466+00:00
---

# Example Lifecycle of API Resource Management

Define a set of Processing Framework resources that demonstrates a pattern of definition and resource management to have
a robust and extensible development lifecycle that your customers can depend on. Some customers will not be concerned
about an Engine owner making backward-compatible changes to an Operation so they wouldn’t care about any minor version
changes. Others will be very strict on expecting to pin their Procedure definition to specific Operation versions.

It is important to know that as an Engine developer, you can control the management of your resources. This guide only
outlines one way of managing content. If it is not suitable for your needs, that is fine. You will need to consider
resource management and availability from a costing point of view. If you intend on maintaining all Engine tags,
consider the scaling expectations on the Deployment. Perhaps moving previous tags to scale from 0.

## Resources

Example inventory of API resources that will be created by the end of the full lifecycle.

### Engines

* Tag: `v1.0.0`
* Tag: `v1.1.0`
* Tag: `v2.0.0`

### Deployments

* Identifier: `an-engine-latest`
* Identifier: `an-engine-1-0-0`
* Identifier: `an-engine-1-1-0`
* Identifier: `an-engine-2-0-0`

### Operations

* Identifier: `an_operation`, version: `1`
* Identifier: `an_operation`, version `100`
* Identifier: `an_operation`, version `110`
* Identifier: `an_operation`, version `200`

## Development Lifecycle

As an Engine developer, you are responsible for providing consistent functionality to your customers and communicating
changes with them as you see fit. The recommended approach for developing, maintaining, and publishing Processing
Framework resources is as follows:

### Initial Resource Setup

In this initial stage, we configure a single Engine resource. This is the Engine Image that we have built and tested
locally. In addition to that, we will define a version-specific Deployment in order to concretely link this Engine to
this Deployment. We will also define a second Deployment, but this will be marked as "latest" — at the beginning, these
two Deployments are essentially identical.

#### Create an Engine

* Tag: `v1.0.0`

#### Create two Deployments

* Identifier: `an-engine-latest`

The purpose of this Deployment is to provide a stable definition of the newest implementation of your Engine.
Customers that use an Operation linked to this Deployment will automatically inherit any changes that have been made
without requiring them to do anything. The risk with this is that an Engine owner may have introduced an issue that
unknowingly impacts a customer even if it was not intended. This Deployment should reference `active_engine: v1.0.0`
at the initial onset, but this value will be updated by the Engine Owner as they create new tags.

* Identifier: `an-engine-1-0-0`

The purpose of this Deployment is to provide a pinned version of the Engine that a customer could use in their
Procedure and should not have to worry about it changing. This Deployment should reference `active_engine: v1.0.0`.

#### Create two Operations

* Identifier: `an_operation`, version: `1`

The purpose of this Operation is to represent the “latest” version of the functionality. This Operation should always
reference `deployment_identifier: an_engine_latest`. By definition, an Operation’s Deployment Identifier is immutable,
so there will be no need to change anything on the Operation. The modification will be happening between the Engine
and the Deployment.

* Identifier: `an_operation`, version: `100`

The purpose of this Operation is to expose the functionality specifically of Engine tag `v1.0.0` in perpetuity.

### Engine Update is Scheduled

Continuing the story of development, there is an expectation that an Engine developer will have minor version changes
that are backward compatible (`v1.1.0`) as well as major version changes that are not backward compatible (`v2.0.0`).
When making a minor change, the Processing Framework supports the ability to incrementally update your resources without
impacting any consumer of one of your Operations.

You can follow similar steps from the initial set up.

#### Create an Engine

* Tag: `v1.1.0`

#### Create a Deployment

* Identifier: `an-engine-1-1-0`

  The purpose of this Deployment is to provide a pinned version of the Engine that a customer could use in their
  Procedure and should not have to worry about it changing. This Deployment should reference active\_engine: `v1.1.0`.

#### Create an Operation

* Identifier: `an_operation`, version: `110`

The purpose of this Operation is to expose the functionality specifically of Engine tag `v1.1.0` in perpetuity.
This Operation will not impact any existing customers because it is a unique resource and they will have to “opt-in”
by making a new Procedure that utilizes this version.

#### Update existing Deployment

* Identifier: `an-engine-latest`

This existing Deployment should be updated to now reference the `active_engine: v1.1.0`. The upstream impact to
consider here is that the consumers of Operation `an_operation`, `version: 1` will automatically inherit whatever
change was made without them doing any work.

### Engine Update is Scheduled - Major Version

Finally, if a major version upgrade is necessary - something that is not backward compatible, the process is the same
as the last set of instructions, with the caveat that the Deployment with “latest” has the possibility of causing issues
for those integrators that are using that one. This is where advanced notice and communication are critical.

#### Create an Engine

* Tag: `v2.0.0`

#### Create a Deployment

* Identifier: `an-engine-2-0-0`

The purpose of this Deployment is to provide a pinned version of the Engine that a customer could use in their Procedure
and should not have to worry about it changing. This Deployment should reference active\_engine: `v2.0.0`.

#### Create an Operation

* Identifier: `an_operation`, version: `200`

The purpose of this Operation is to expose the functionality specifically of Engine tag `v2.0.0` in perpetuity.
This Operation will not impact any existing customers because it is a unique resource and they will have to “opt-in”
by making a new Procedure that utilizes this version.

#### Update existing Deployment

* Identifier: an-engine-latest

This Deployment should be updated to now reference the `active_engine: v2.0.0`. The upstream impact to consider here
is that the consumers of Operation `an_operation`, `version: 1` will automatically inherit whatever change was made
without them doing any work.
