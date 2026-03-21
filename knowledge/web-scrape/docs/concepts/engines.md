---
title: "Engines"
source_url: https://docs.trimblecloud.com/processing-framework/content/concepts/engines/
fetched_at: 2026-03-20T19:36:48.993996+00:00
---

# Engines

Engines are a low-level resource in the Processing Framework that represents an image stored in the service. They
provide the interface for how to define and configure a container with direct, optional, relation to how the code in the
container is written. Properties such as environment variables or secrets are defined in the API model, but must be
properly referenced in the associated code in the container. This is optional because not all use cases will require
environment variables or secrets.

An Engine can contain one or more Operations. This configuration allows for shared resourcing when developing an Engine.
If you have an executable that is capable of doing many different things, one Engine can contain all the functions that
will be consumed as Operations to reduce image maintenance.

In relation to the Engine is a [Deployment](../deployments/). The relationship establishes a few important things between
resources. First, it creates the interface for you to define compute and scaling resources. It also provides the ability
to manage your containers while minimizing the impact on your upstream clients that are consuming
[Operations](../operations/) from your Engine.

![Engine to Operation Relationship](../../../images/operation-engine-relationship.png)
