---
title: "FME"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/workspaces/basics/
fetched_at: 2026-03-20T19:37:29.686198+00:00
---

# FME

FME is an application created by Safe Software that enables users to create no-code solutions to perform data transformation. Trimble has partnered with Safe Software to reduce the barrier to creating bespoke transformation processes.

See [here](https://docs.google.com/document/d/1RXOuAb5gYJSbCb234N-qCZaIG1UM3WUprEqP1f9QhnY) for instructions on installing and setting up FME locally.

## Workspaces

In FME, a user creates a workspace using a graphical interface to define a data transformation process.

### Requirements

Based on the way FME is used in Processing Framework, all User Parameters must be UPPER CASE. This continues to the Processing Framework Operation, where its Parameters will also be UPPER CASE

![Safe Software FME Workbench User Parameter Example](../../../../images/safe-software-user-parameters-example.png)

## Processing Framework

Processing Framework supports running FME workspaces within the Trimble Cloud Platform. This workspace can define the entire desired pipeline, or perform a single part of a larger workflow of [Operations](../../data-transformation/operations/) within Processing Framework.

This guide will demonstrate how to create and use a Workspace in the cloud.
