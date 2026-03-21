---
title: "Deployment"
source_url: https://docs.trimblecloud.com/processing-framework/content/concepts/deployments/
fetched_at: 2026-03-20T19:36:52.953394+00:00
---

# Deployment

Deployments provide the configurable interface for the following features:

* Operation to Engine relationship
* Compute resource definition
* Scaling

A Deployment allows the Operation author to seamlessly transition from one image tag (Engine) to another with a single
update to the `deployment.active_engine` property. This means that if a bug is fixed or a backward-compatible
enhancement is made, a Deployment owner can push that change out to all consumers of the Operation without requiring any
change from the consumer side of things.

The interface also offers the ability to configure scaling requirements on-demand as well. During development, you may
set your `deployment.scaling.min` to a value of 1 so that while testing an Active Engine, there would be no wait time
for the Deployment to be running. Then it may be desired to set the minimum to 0 if your workload does not need a
Deployment running at all times.

## Quotas

Deployments are subject to the quotas defined for your subscription. These quotas include limits on the amount of CPU
and memory that can be used across all Deployments in your subscription.

The default quotas are:

| Property | Value |
| --- | --- |
| CPU | 12 |
| Memory | 80 GB |

Within these limits, you could define one Deployment that has 12 CPU and 80 GB of memory and can scale to a maximum of
one concurrent instance for that Deployment. Or you could define one Deployment with 1 CPU and 6.6 GB of memory that can
scale to a maximum of 12 concurrent instances. Any combination of Deployments is possible as long as the total CPU and
memory used by all Deployments does not exceed the quotas defined for your subscription.

If your combined Deployments exceed these quotas, you may experience failures when attempting to define Deployments.
To request an increase in your quotas, please contact [Trimble Support](https://docs.trimblecloud.com/resources-info/content/support/).
