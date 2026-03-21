---
title: "Execute a Procedure"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/data-transformation/execution/
fetched_at: 2026-03-20T19:37:12.073932+00:00
---

# Execute a Procedure

Once a Procedure has been defined and approved, it can then be executed. An Execution is a unique instantiation of the
Procedure, populated with content for the Procedure Parameters.

## Practical Example

### Request

```
 curl -X POST \
 --data "{
    "execution": {
        "procedure_id": "abe58ec1-84a3-464a-8a1e-afe8dd00d8c7",
        "parameters": {
            "output_path": "loc/output",
            "recursive": "true",
            "source_path": "loc/colorado_counties.tif",
            "tile_crs": "EPSG:3857",
            "tile_export_format": "geopackage",
            "tile_order": "XY",
            "tile_output_format": "PNGRASTER"
        }
    }
}" \
 --header "Content-Type: application/json" \
 --header 'Authorization: Bearer {TID Access Token}' \
 {{ pf_api }}/api/executions
```

### Response

```
{
  "execution": {
    "id": "6ceadde1-ffe6-4677-9e8b-88ecd8714fb5",
    "status": "ORDERED",
    "execution_status": "QUEUED",
    "progress": "QUEUED",
    "procedure_identifier": "raster_tiler_xyz",
    "procedure_version": 1,
    "procedure_id": "abe58ec1-84a3-464a-8a1e-afe8dd00d8c7",
    "region": "aws-us1",
    "data_export": false,
    "parameters": {
        "output_path": "loc/output",
        "recursive": "true",
        "source_path": "loc/colorado_counties.tif",
        "tile_crs": "EPSG:3857",
        "tile_export_format": "geopackage",
        "tile_order": "XY",
        "tile_output_format": "PNGRASTER"
    },
    "created_at": "Mon, 30 May 2023 15:43:05 GMT",
    "updated_at": "Mon, 30 May 2023 15:43:05 GMT",
    "submitted_at": "Mon, 30 May 2023 15:43:05 GMT",
    "completed_at": "Mon, 30 May 2023 15:43:05 GMT",
    "failed_at": null
  }
}
```

## Procedure Execution Statuses

* `UNSUBMITTED` The Execution was not successfully submitted.
* `SUBMITTED` The Execution was successfully submitted.
* `WAITING` The underlying Procedure is locked, causing the Execution to wait for the Procedure to be unlocked.
* `QUEUED` The Execution is queued and waiting to be processed.
* `EXECUTING` The Procedure is being processed.
* `FAILED` Processing of one or more Operations failed.
* `FINISHED` Processing has completed.
