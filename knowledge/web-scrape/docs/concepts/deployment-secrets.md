---
title: "Deployment Secret"
source_url: https://docs.trimblecloud.com/processing-framework/content/concepts/deployment-secrets/
fetched_at: 2026-03-20T19:36:54.847413+00:00
---

# Deployment Secret

Deployment Secrets represent sensitive information mounted on an Engine container. Secrets are an optional capability
used to provide a means of keeping sensitive information out of built container images. A common use case that this
interface supports is the ability to update sensitive information if you need to rotate credentials.

A Secret is a key, value pair. These values can be mounted to an Engine container as either an environment variable or a
file. See the Deployments schema for more information.

See our implementation documentation for an example of how an environment variable can be accessed.
