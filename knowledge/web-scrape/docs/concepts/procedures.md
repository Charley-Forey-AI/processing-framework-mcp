---
title: "Procedures"
source_url: https://docs.trimblecloud.com/processing-framework/content/concepts/procedures/
fetched_at: 2026-03-20T19:37:00.473631+00:00
---

# Procedures

A Procedure is a customized Processing Framework workflow constructed from one or more Operations. An Operation can be
used multiple times within a Procedure. Each time an Operation is used in a Procedure, it is identified with an activity
ID.

Procedures support processing in parallel and conditional logic. Workflows can be defined that have multiple input
sources, and they can write to multiple destination locations. Information can be passed between Operations in a
Procedure by leveraging the concept of Output Parameters. Note that these must be supported by the Operation(s)
themselves to be utilized.

Procedures can remain private to the original author, shared to specific users, or made public for any subscriber to
use.

![Simple Procedure](../../../images/procedure-simple.png)
![Complex Procedure](../../../images/procedure-complex.png)
