---
title: "Identifying a Data Problem"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/data-transformation/define/
fetched_at: 2026-03-20T19:37:06.097122+00:00
---

# Identifying a Data Problem

The Processing Framework is a data transformation platform that is flexible and customizable. This section of the
documentation is being presented for the "Consumer" persona, which means that existing Operations can be discovered and
used to solve data transformation requirements.

As a general rule of thumb, we recommend documenting the following topics when outlining your data transformation needs:

* Data Source(s).
  + *Where is data stored? What is the format? Who owns it? How can it be accessed? etc.*
* What actions should be performed?
  + *Will data be converted from one format to another? Will data be enriched with other data? Will some processing*
    *occur depending on a condition? etc.*
* Expected output data
  + *Where will the resulting files be written? Should there be a listener on the event stream for status changes?*
    *What action should be taken in the event of failure? etc.*

Having this information will help guide the process of finding Operations in the service and link them together to
complete the transformation workflow.
