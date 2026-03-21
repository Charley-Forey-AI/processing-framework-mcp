---
title: "Managing Workspaces"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/workspaces/manage/
fetched_at: 2026-03-20T19:37:31.649846+00:00
---

# Managing Workspaces

## Preparing the Workspace

This guide will assume that you have already created and tested an FME workspace locally.

If your Workspace includes multiple files (ie. multiple FMW files or supporting Python scripts), these must all be bundled into a ZIP file. An FMW file with your desired Workspace's name must be included.

Example: For a workspace called `test_workspace`, here is the structure of a valid zip file that can be used

```
zipfile
├── assisting_script.py
├── supporting_workspace.fmw
└── test_workspace.fmw
```

This zip file is a collection of files and does not have a parent directory. To create a zipfile with this structure, you can run

```
zip test_workspace.zip test_workspace.fmw supporting_workspace.fmw assisting_script.py
```

Please be sure to test your workspace locally using the directory structure that will be provided.

## Creating a Workspace

### Upload a file to Data Ocean

The first step is to upload your FME Workspace to Data Ocean. If you have not done so, you must subscribe your application to Data Ocean in the Console.

For the Processing Framework to ingest your file, it must be granted read permission via the `acl` field on the Data Ocean File object. You will find the relevant TRNs for the Processing Framework Workspace Ingestion App below:

* Staging Application ID: `1bd7bee9-4035-4225-8c7b-6f29014daa2b`
* Production Application ID: `7d01d448-e666-454f-b8b4-7c0e251aa71c`

`POST {dataocean_api}/api/files`

```
{
    "file": {
        "path": "/fme-ingestion/test_workspace.fmw",
        "acl": {
            "trn:tid:application:<application-id>": "r"
        },
        "regions": ["us1"]
    }
}
```

* path: Data Ocean path to your file
* acl: Shares the file with Processing Framework. This field *must* be supplied with the appropriate environment's Application TRN in order for the Workspace to be ingested.
* regions: Regions that Data Ocean will store your file. This is required, but the value will not affect your
  Workspace in Processing Framework.

This request will return an `upload_url` field. You will make a PUT request to this url proving your `.fmw` or `.zip` file to finish uploading your file.

See the [Data Ocean Documentation](https://docs.trimblecloud.com/dataocean/index.html) for more information.

### Create a Workspace in Processing Framework

After your file has been uploaded to dataocean, you can proceed with defining your Workspace in Processing Framework.

`POST {{ pf_api }}/api/workspaces`

```
{
  "workspace": {
    "identifier": "test_workspace",
    "dataocean_path": "368b8e7c-822a-4bea-bf39-8dfd7b753264:/fme-ingestion/my_test_workspace.fmw"
  }
}
```

* identifier: Name of your Workspace. Note how this is the same as the name of the FMW file, this is required.
  This will also the associated Operation's identifier
* dataocean\_path: Full path to your file in Data Ocean. Note how it is prefixed with the application ID, this is required.
  You can find this value in the `.file.path` field of your Data Ocean object.
* deployment\_identifier: This specifies which version of FME your Workspace is intended to run on.
  This is an optional field. The default value is `fme-2023-linux-v1-2023-0-0-3`.
  Current supported values are [`fme-2023-linux-v1-2023-0-0-3`].

The response to this request will show a status of `CREATING` while your Workspace is being processed into the
Processing Framework system. When this is complete, a `GET` request will indicate that the status is `AVAILABLE`.
This means your Workspace is ready for use.

## Updating a Workspace

A Workspace can be updated to change the functionality of the Operation. A change can be made by submitting a
new `dataocean_path` to your Workspace object.

`PUT {{ pf_api }}/api/workspaces/{workspace-id}`

```
{
  "workspace": {
    "dataocean_path": "368b8e7c-822a-4bea-bf39-8dfd7b753264:/fmetest-1/test_workspace.fmw"
  }
}
```

Note: You can upload the new file to the same Data Ocean path. If you do so, you can submit the above request with the same path.
This will still trigger an update to the Workspace.

## Retiring a Workspace

If a workspace is no longer needed, it can be retired. During this process, all corresponding Operations will also be retired.
Before doing so, all active Procedures using the Workspace will be retired.
This process will delete your Workspace file(s) from Processing Framework

`PUT {{ pf_api }}/api/workspacecs/{workspace-id}/retire`
