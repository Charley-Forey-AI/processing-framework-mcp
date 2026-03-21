---
title: "Common Issues and Solutions"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/engine-development/issues-solutions/
fetched_at: 2026-03-20T19:37:25.700968+00:00
---

# Common Issues and Solutions

### Splitfixture Mac Permissions

The current split fixture containers do not run as root which can cause permission issues on Mac systems when they
attempt to write to a mounted volume.

The solution is to run the container as root. The `-u root` flag should be included in the docker run command for the
split fixture container in the [split fixture](../supplemental/using-splitfixture/) page.

### Multiple Docker Clients On Virtual Machines

It is occasionally beneficial to develop engines on virtual machines such as EC2 instances. Installing the Docker
Desktop client on an EC2 instance that already has a Docker cli client can break both installations. All uses of Docker
in this document can be done using either Docker environment.

The solution is to not attempt to install Docker Desktop if you already have another Docker client installed. The
[prerequisites and installations](../supplemental/prereqs-and-installations/) page has information for both client types.

### Trouble building and running a container on Apple Silicon

The Processing Framework does not support the ARM-based architecture on which Apple M1 and newer chips are designed. You
can inform Docker which platform you'd like to be operating with by supplying the `--platform` argument, e.g.
`docker run -it --rm --platform linux/amd64 pf-engine:v1`.

You may need to review your Docker settings and enable the use of Rosetta for x86/amd64 emulation on Apple Silicon.

![Rosetta for x86/amd64 emulation on Apple Silicon](../../../../images/docker-mac-amd64-emulation.png)
