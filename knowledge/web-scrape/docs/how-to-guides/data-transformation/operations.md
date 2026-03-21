---
title: "Discover Operations"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/data-transformation/operations/
fetched_at: 2026-03-20T19:37:07.998966+00:00
---

# Discover Operations

Operations are the building blocks that are used to solve data transformation workflows. The Processing Framework offers
various different Operations today and more can be added by Engine Developers.

You can discover Operations by performing a GET request on the `/api/operations` endpoint. This API returns an array of
Operations using a slimmed-down schema. For full Operation definition, make a GET request on the specific Operation ID
`/api/operations/:id`.

Listing Operations provides the ability to view all content that is available to the authenticated client. This means
you will be able to see Operations that own, have been shared with you, or are publicly available. In addition, this
API supports filtering by various attributes:

* `engine`
* `deployment_identifier`
* `procedure_uuid`
* `identifier`
* `status`
* `execution_status`
* `region`

# Practical Example

## Request

```
curl {{ pf_api }}/api/operations?status=EXECUTABLE&per_page=1 \
--header 'Authorization: Bearer {TID Access Token}'
```

## Response

```
{
    "items": [
        {
            "owner_name": "manager",
            "identifier": "dataocean_download_id",
            "version": 10,
            "name": "dataocean download id",
            "description": "Download a file from Data Ocean by ID.",
            "id": "1374e92f-fce5-4222-ae42-6fb43f01320b",
            "engine_version": "d79af21a-c6f9-4f59-8ac2-b82344b76cea",
            "engine_name": "DataOceanOperations",
            "status": "EXECUTABLE",
            "execution_status": "READY",
            "created_at": "2023/04/24 19:07:56 +0000",
            "shared_with": [],
            "regions": [
                "aws-us1",
                "azure-us1"
            ],
            "public": true,
            "dynamic_output": false
        }
    ],
    "current_page": 1,
    "per_page": 1,
    "total_entries": 70,
    "total_pages": 70
}
```
