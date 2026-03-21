---
title: "Operations"
source_url: https://docs.trimblecloud.com/processing-framework/content/concepts/operations/
fetched_at: 2026-03-20T19:36:58.633040+00:00
---

# Operations

An Operation is the basic building block of data processing. An Operation can have inputs, outputs, and parameters. It
represents a single function in the overall processing workflow. An individual Operation can be used multiple times in
a single workflow.

Operations are mutable when first created. In order to use them within a Procedure, they must be approved. Once
approved, most properties become immutable in order to maintain a consistent interface for consumers of the Operation.
Besides simple metadata properties, the `operation.deployment_identifier` is mutable so that the Operation Engine can be
updated as needed.

Operations can remain private to the original author, shared to specific users, or made public for any subscriber to
use.

![Operations](../../../images/operation.png)
