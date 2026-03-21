---
title: "Define a Procedure"
source_url: https://docs.trimblecloud.com/processing-framework/content/how-to-guides/data-transformation/procedure/
fetched_at: 2026-03-20T19:37:10.057259+00:00
---

# Define a Procedure

Once you have defined a problem and identified the Operations that will be used to accomplish the desired data
transformation, a Procedure can be created. It is important to know about the concepts of a
[Procedure](../../../concepts/procedures/). Specifically, inputs, outputs, and parameters are the key topics that need to
be understood.

## Common Procedure Definition

### Goal

Turn a raster image into XYZ tiles so that they can be viewed in a web browser. The source data is stored in a Data
Ocean account, and the tiles should also be stored in Data Ocean after they have been created.

### Identify the Operations

#### Read Source Data

* `dataocean_download_path`

#### Create XYZ Tiles

* `raster_tiler_xyz`

#### Write Output Data

* `dataocean_upload_path`

### Link the Operations

At this point, all the building blocks have been identified, and now they need to be connected to create the data flow.
The output of the Data Ocean Read Operation should be connected with the input of the Raster Tiler XYZ Operation and the
output of that should be connected to the input of the Data Ocean Write Operation.

## Practical Example

### Request

```
 curl -X POST \
 --data @"procedure.json" \
 --header "Content-Type: application/json" \
 --header 'Authorization: Bearer {TID Access Token}' \
 {{ pf_api }}/api/procedures
```

You can find the value for `procedure.json` [here](../../../../snippets/json/procedure.json)

### Response

```
{
    "procedure": {
        "owner_name": "manager",
        "identifier": "raster_tiler_xyz",
        "id": "abe58ec1-84a3-464a-8a1e-afe8dd00d8c7",
        "version": 4,
        "name": "Raster Tiler XYZ",
        "description": "Perform the raster-to-tile Operation and write to a multifile.",
        "status": "EXECUTABLE",
        "execution_status": "READY",
        "tags": [
            "Tiles",
            "Raster"
        ],
        "documentation_url": null,
        "retired_after": null,
        "shared_with": [],
        "public": true,
        "regions": [
            "aws-us1"
        ],
        "default_region": "aws-us1",
        "operations": {
            "dataocean_upload": {
                "id": "eb18f5ce-e3e3-4c45-8a34-658b8f30256f",
                "identifier": "dataocean_upload_path",
                "version": 4,
                "engine_name": "DataOceanOperations",
                "dynamic_output": false,
                "encrypted_parameters": [],
                "parameters": {
                    "output_path": {
                        "source": "output_path"
                    },
                    "metadata": {
                        "source": "metadata"
                    },
                    "recursive": {
                        "source": "recursive"
                    },
                    "restricted_access": {
                        "source": "restricted_access"
                    }
                },
                "inputs": {
                    "input": {
                        "sources": [
                            "raster_tiler_xyz:out_data"
                        ]
                    }
                },
                "outputs": {
                    "flow_control": {
                        "data_type": "*",
                        "description": "Other operations can use this as an input for the purpose of defining operation execution order",
                        "name": null
                    }
                }
            },
            "raster_tiler_xyz": {
                "id": "ea38e5d1-3cb2-451e-a77b-c2dec296b6f7",
                "identifier": "raster_tiler_xyz",
                "version": 1,
                "engine_name": "fme",
                "dynamic_output": false,
                "encrypted_parameters": [],
                "parameters": {
                    "tile_crs": {
                        "source": "tile_crs"
                    },
                    "tile_order": {
                        "source": "tile_order"
                    },
                    "out_format": {
                        "source": "tile_output_format"
                    },
                    "tile_export_format": {
                        "source": "tile_export_format"
                    }
                },
                "inputs": {
                    "in_data": {
                        "sources": [
                            "dataocean_download:output"
                        ]
                    }
                },
                "outputs": {
                    "out_data": {
                        "data_type": "data:other",
                        "description": "The tilepack that will be exported.",
                        "name": "Output Data"
                    }
                }
            },
            "dataocean_download": {
                "id": "b12306ae-6cb4-49ac-940a-ea041527fa54",
                "identifier": "dataocean_download_path",
                "version": 4,
                "engine_name": "DataOceanOperations",
                "dynamic_output": false,
                "encrypted_parameters": [],
                "parameters": {
                    "source_path": {
                        "source": "source_path"
                    }
                },
                "inputs": {},
                "outputs": {
                    "output": {
                        "data_type": "*",
                        "description": "The file or directory downloaded from Data Ocean."
                    }
                }
            }
        },
        "parameters": {
            "tile_crs": {
                "name": "Tile Coordinate System",
                "description": "The CRS of the tilepack. Either EPSG:3857 or EPSG:4326."
            },
            "tile_order": {
                "name": "Tile Order",
                "description": "The desired tile order schema of the tilepack. This can either be YX or XY"
            },
            "tile_output_format": {
                "name": "Tile File Format",
                "description": "The desired output file format for the tiles. This must be a valid FME format shortname."
            },
            "tile_export_format": {
                "name": "Exported Tile Format",
                "description": "The desired style of tiles to output. This can either be XYZ or OGC GeoPackage."
            },
            "source_path": {
                "name": "Data Ocean: Source Path",
                "description": "The desired input path of the Data Ocean file."
            },
            "output_path": {
                "name": "Data Ocean: Output Path",
                "description": "The desired output path of the Data Oceaan file."
            },
            "metadata": {
                "name": "Data Ocean: Metadata",
                "description": "JSON-encoded string of metadata to add to the File object."
            },
            "recursive": {
                "name": "Data Ocean: Recursive",
                "description": "Whether or not to upload the output recursively. When false, a singe output file is expected."
            },
            "restricted_access": {
                "default_value": "false",
                "name": "Data Ocean: Restricted Access",
                "description": "Whether the Data Ocean File object is to be public or not."
            }
        }
    }
}
```

## Additional Information

### Operation Parameters v. Procedure Parameters

It is important to understand the difference between the parameters that an Operation has and subsequently the
parameters that a Procedure exposes to the client. This distinction is important because an Operation may have required
and/or optional parameters. This will influence the parameters exposed in the context of a Procedure.

#### Default Values

Procedure parameters support the ability to define default values. This is offered as a convenience to the Procedure
author if they want to provide an interface to their user and allow them to omit some parameters. If the client omits
the parameter, then the default value will be used.

#### Fixed Values

Fixed value parameters are a useful feature of the Procedure that allows the author to explicitly set the value to be
used without allowing for any ability to set a different value at the Execution. This simplifies the parameter interface
for the Procedure consumer and also provides control to the author to lock in a desired value so it can not be modified.

### Output Parameters

Some Operations provide the ability to pass information between Operations in JSON format. These are called Output
Parameters. The author of an Operation will have defined content that will be found in the output parameters section of
a Procedure Execution. This data can subsequently be used by a consuming application or as an input to a downstream
Operation.

### Control Flow

Processing Framework provides a "Switcher" Operation which allows for conditional control flow within a Procedure.
This is a special system Operation that evaluates a condition statement, such as `variableName != True`, and allows
the result to control which 'downstream' Operations in the Procedure get executed.

The structure of a Switcher Operation is similar to that of a regular Operation definition in a Procedure, with some
important modifications.

For example, let's take a look at a Switcher Operation, named `branch`, being used in a Procedure definition:

```
  "branch": {
    "name": "Switcher",
    "version": 1
    "identifier": "switcher",
    "description": "Implements Procedure Logic flow control.",


    "inputs": {
      "flow_control": {
        "sources": [
          "other_operation:output",
          "another_operation:output"
        ]
      }
    },


    "outputs": {
      "case_1": {
        "condition": "take_path_1 == True",
        "sources": [
          "other_operation:output"
        ]
      },
      "case_2": {
        "condition": "take_path_2 == True",
        "sources": [
          "another_operation:output"
        ]
      },
      "case_3": {
        "condition": "take_path_3 == True"
      }
    }
  }
```

The `inputs` section allows us to "alias" other Operations' outputs via the Switcher Operation.
This means that inputs specified here will be available as *potential* outputs of this specific Switcher Operation.
In our example, this means that the `output` ports of `other_operation` and `another_operation` may become
output ports of our `branch` Operation, if specified conditionals evaluate as True. More on this in a moment.

The `outputs` section is what actually specifies the logical statements to evaluate.
We can see several `case_` statements in this section. Each case contains a `condition` field, which
defines the conditional to be evaluated, and a `sources` field, which defines the ports to be made available
if the condition evaluates to True.

Let's take a closer look at `case_1`. The `condition` statement here evaluates whether `take_path_1` (a Procedure
parameter) is True. If this conditional evaluates as True, our `branch` Operation will have a `case_1` output port.

The Switcher itself doesn't produce data for its own outputs, so we must specify the data that will be
provided via the `case_1` port. To do this we use the `sources` field, which specifies
which input port's data to provide as the data from this Switcher case's output port. In short, if `take_path_1` is True,
the `branch` Operation will have a `case_1` output port, which contains the data from other\_operation's `output` port.

Because we have specified three cases, each with it's own conditional, our `branch` Operation can have between zero and three
output ports. Then, in our Procedure, there would presumably be Operations that consume these output ports.

If an output port becomes available from a Switcher Operation, the Operations that consume that port as input get scheduled and execute
as normal. However, if such a port is *not* present, the Operations which use it are effectively "removed" from the Procedure.
They do not get executed. If any other Operations use the removed Operations' outputs as their inputs, they also get removed.
In short, any chain of Operations which begins at an output port of a Switcher Operation may be removed from a Procedure, depending
on whether that Switcher port's conditional evaluates to True.

Please see the OpenAPI Spec, in the Reference tab, for more information about Switcher's conditional syntax.
