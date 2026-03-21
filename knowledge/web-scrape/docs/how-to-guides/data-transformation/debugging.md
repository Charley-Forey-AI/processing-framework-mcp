---
title: "Debugging an Execution"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/data-transformation/debugging/
fetched_at: 2026-03-20T19:37:14.013035+00:00
---

# Debugging an Execution

## Activities and Events

### Activities

Procedure Execution Activities map to the Operations defined within the Procedure being executed. Calling this endpoint
provides an informative way to see the progress of an Execution. You will be able to follow along the steps in which the
Procedure Execution passes through.

*Note: Activities will only be retained for 7 days. After this period Activities will no longer be accessible.*

### Events

Procedure Execution Events are logged by the *Log Events for an Execution* request.

## Engine Logs

An Engine author likely has coded log messages into their Operation functions. These logs can help with understanding
the logical flow of an Operation. They are also beneficial to debug failed Executions. Engine logs can be retrieved
after an Execution has processed by making a request to have them saved to the client's Data Ocean location of their
choosing.

## Engine Data

During development, you may find the need to retrieve data that was produced during the processing of an Execution.
You must enable this functionality when you create a Procedure Execution.
