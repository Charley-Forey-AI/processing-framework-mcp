---
title: "TrimbleCloud.Processing"
source_url: https://docs.trimblecloud.com/processing-framework/content/reference/sdk/dotnet/referencedocs/
fetched_at: 2026-03-20T19:37:51.004908+00:00
---

# TrimbleCloud.Processing

## Contents

* [ACRToken](#T-TrimbleCloud-Processing-Model-ACRToken "TrimbleCloud.Processing.Model.ACRToken")
* [LoginCommand](#P-TrimbleCloud-Processing-Model-ACRToken-LoginCommand "TrimbleCloud.Processing.Model.ACRToken.LoginCommand")
* [PushCommand](#P-TrimbleCloud-Processing-Model-ACRToken-PushCommand "TrimbleCloud.Processing.Model.ACRToken.PushCommand")
* [TagCommand](#P-TrimbleCloud-Processing-Model-ACRToken-TagCommand "TrimbleCloud.Processing.Model.ACRToken.TagCommand")
* [UploadStatus](#P-TrimbleCloud-Processing-Model-ACRToken-UploadStatus "TrimbleCloud.Processing.Model.ACRToken.UploadStatus")
* [APIBase](#T-TrimbleCloud-Processing-APIBase "TrimbleCloud.Processing.APIBase")
* [AutoScaling](#T-TrimbleCloud-Processing-Model-AutoScaling "TrimbleCloud.Processing.Model.AutoScaling")
* [MaxCount](#P-TrimbleCloud-Processing-Model-AutoScaling-MaxCount "TrimbleCloud.Processing.Model.AutoScaling.MaxCount")
* [MinCount](#P-TrimbleCloud-Processing-Model-AutoScaling-MinCount "TrimbleCloud.Processing.Model.AutoScaling.MinCount")
* [Client](#T-TrimbleCloud-Processing-Model-Client "TrimbleCloud.Processing.Model.Client")
* [access\_level](#P-TrimbleCloud-Processing-Model-Client-access_level "TrimbleCloud.Processing.Model.Client.access_level")
* [name](#P-TrimbleCloud-Processing-Model-Client-name "TrimbleCloud.Processing.Model.Client.name")
* [ClientsAPI](#T-TrimbleCloud-Processing-ClientsAPI "TrimbleCloud.Processing.ClientsAPI")
* [Read()](#M-TrimbleCloud-Processing-ClientsAPI-Read "TrimbleCloud.Processing.ClientsAPI.Read")
* [Compute](#T-TrimbleCloud-Processing-Model-Compute "TrimbleCloud.Processing.Model.Compute")
* [CPU](#P-TrimbleCloud-Processing-Model-Compute-CPU "TrimbleCloud.Processing.Model.Compute.CPU")
* [Memory](#P-TrimbleCloud-Processing-Model-Compute-Memory "TrimbleCloud.Processing.Model.Compute.Memory")
* [Validate()](#M-TrimbleCloud-Processing-Model-Compute-Validate "TrimbleCloud.Processing.Model.Compute.Validate")
* [ContainerUpload](#T-TrimbleCloud-Processing-Model-ContainerUpload "TrimbleCloud.Processing.Model.ContainerUpload")
* [AcrToken](#P-TrimbleCloud-Processing-Model-ContainerUpload-AcrToken "TrimbleCloud.Processing.Model.ContainerUpload.AcrToken")
* [ContainerUploadStatus](#T-TrimbleCloud-Processing-Model-ContainerUploadStatus "TrimbleCloud.Processing.Model.ContainerUploadStatus")
* [AVAILABLE](#F-TrimbleCloud-Processing-Model-ContainerUploadStatus-AVAILABLE "TrimbleCloud.Processing.Model.ContainerUploadStatus.AVAILABLE")
* [GENERATING](#F-TrimbleCloud-Processing-Model-ContainerUploadStatus-GENERATING "TrimbleCloud.Processing.Model.ContainerUploadStatus.GENERATING")
* [IMAGE\_RECEIVED](#F-TrimbleCloud-Processing-Model-ContainerUploadStatus-IMAGE_RECEIVED "TrimbleCloud.Processing.Model.ContainerUploadStatus.IMAGE_RECEIVED")
* [UNAVAILABLE](#F-TrimbleCloud-Processing-Model-ContainerUploadStatus-UNAVAILABLE "TrimbleCloud.Processing.Model.ContainerUploadStatus.UNAVAILABLE")
* [DataType](#T-TrimbleCloud-Processing-Model-DataType "TrimbleCloud.Processing.Model.DataType")
* [Array](#F-TrimbleCloud-Processing-Model-DataType-Array "TrimbleCloud.Processing.Model.DataType.Array")
* [Boolean](#F-TrimbleCloud-Processing-Model-DataType-Boolean "TrimbleCloud.Processing.Model.DataType.Boolean")
* [Number](#F-TrimbleCloud-Processing-Model-DataType-Number "TrimbleCloud.Processing.Model.DataType.Number")
* [Object](#F-TrimbleCloud-Processing-Model-DataType-Object "TrimbleCloud.Processing.Model.DataType.Object")
* [SingleChoice](#F-TrimbleCloud-Processing-Model-DataType-SingleChoice "TrimbleCloud.Processing.Model.DataType.SingleChoice")
* [String](#F-TrimbleCloud-Processing-Model-DataType-String "TrimbleCloud.Processing.Model.DataType.String")
* [Wildcard](#F-TrimbleCloud-Processing-Model-DataType-Wildcard "TrimbleCloud.Processing.Model.DataType.Wildcard")
* [Deployment](#T-TrimbleCloud-Processing-Model-Deployment "TrimbleCloud.Processing.Model.Deployment")
* [AutoScaling](#P-TrimbleCloud-Processing-Model-Deployment-AutoScaling "TrimbleCloud.Processing.Model.Deployment.AutoScaling")
* [Compute](#P-TrimbleCloud-Processing-Model-Deployment-Compute "TrimbleCloud.Processing.Model.Deployment.Compute")
* [Description](#P-TrimbleCloud-Processing-Model-Deployment-Description "TrimbleCloud.Processing.Model.Deployment.Description")
* [EngineId](#P-TrimbleCloud-Processing-Model-Deployment-EngineId "TrimbleCloud.Processing.Model.Deployment.EngineId")
* [Identifier](#P-TrimbleCloud-Processing-Model-Deployment-Identifier "TrimbleCloud.Processing.Model.Deployment.Identifier")
* [Name](#P-TrimbleCloud-Processing-Model-Deployment-Name "TrimbleCloud.Processing.Model.Deployment.Name")
* [Owner](#P-TrimbleCloud-Processing-Model-Deployment-Owner "TrimbleCloud.Processing.Model.Deployment.Owner")
* [Regions](#P-TrimbleCloud-Processing-Model-Deployment-Regions "TrimbleCloud.Processing.Model.Deployment.Regions")
* [Status](#P-TrimbleCloud-Processing-Model-Deployment-Status "TrimbleCloud.Processing.Model.Deployment.Status")
* [Trn](#P-TrimbleCloud-Processing-Model-Deployment-Trn "TrimbleCloud.Processing.Model.Deployment.Trn")
* [DeploymentCreate](#T-TrimbleCloud-Processing-Model-DeploymentCreate "TrimbleCloud.Processing.Model.DeploymentCreate")
* [AutoScaling](#P-TrimbleCloud-Processing-Model-DeploymentCreate-AutoScaling "TrimbleCloud.Processing.Model.DeploymentCreate.AutoScaling")
* [Compute](#P-TrimbleCloud-Processing-Model-DeploymentCreate-Compute "TrimbleCloud.Processing.Model.DeploymentCreate.Compute")
* [Description](#P-TrimbleCloud-Processing-Model-DeploymentCreate-Description "TrimbleCloud.Processing.Model.DeploymentCreate.Description")
* [EngineId](#P-TrimbleCloud-Processing-Model-DeploymentCreate-EngineId "TrimbleCloud.Processing.Model.DeploymentCreate.EngineId")
* [Identifier](#P-TrimbleCloud-Processing-Model-DeploymentCreate-Identifier "TrimbleCloud.Processing.Model.DeploymentCreate.Identifier")
* [Name](#P-TrimbleCloud-Processing-Model-DeploymentCreate-Name "TrimbleCloud.Processing.Model.DeploymentCreate.Name")
* [Regions](#P-TrimbleCloud-Processing-Model-DeploymentCreate-Regions "TrimbleCloud.Processing.Model.DeploymentCreate.Regions")
* [Validate()](#M-TrimbleCloud-Processing-Model-DeploymentCreate-Validate "TrimbleCloud.Processing.Model.DeploymentCreate.Validate")
* [DeploymentListFilter](#T-TrimbleCloud-Processing-Model-DeploymentListFilter "TrimbleCloud.Processing.Model.DeploymentListFilter")
* [ActiveEngine](#P-TrimbleCloud-Processing-Model-DeploymentListFilter-ActiveEngine "TrimbleCloud.Processing.Model.DeploymentListFilter.ActiveEngine")
* [Status](#P-TrimbleCloud-Processing-Model-DeploymentListFilter-Status "TrimbleCloud.Processing.Model.DeploymentListFilter.Status")
* [DeploymentSecret](#T-TrimbleCloud-Processing-Model-DeploymentSecret "TrimbleCloud.Processing.Model.DeploymentSecret")
* [Description](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Description "TrimbleCloud.Processing.Model.DeploymentSecret.Description")
* [Identifier](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Identifier "TrimbleCloud.Processing.Model.DeploymentSecret.Identifier")
* [Name](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Name "TrimbleCloud.Processing.Model.DeploymentSecret.Name")
* [Owner](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Owner "TrimbleCloud.Processing.Model.DeploymentSecret.Owner")
* [Regions](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Regions "TrimbleCloud.Processing.Model.DeploymentSecret.Regions")
* [Status](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Status "TrimbleCloud.Processing.Model.DeploymentSecret.Status")
* [Trn](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Trn "TrimbleCloud.Processing.Model.DeploymentSecret.Trn")
* [Value](#P-TrimbleCloud-Processing-Model-DeploymentSecret-Value "TrimbleCloud.Processing.Model.DeploymentSecret.Value")
* [DeploymentSecretCreate](#T-TrimbleCloud-Processing-Model-DeploymentSecretCreate "TrimbleCloud.Processing.Model.DeploymentSecretCreate")
* [Description](#P-TrimbleCloud-Processing-Model-DeploymentSecretCreate-Description "TrimbleCloud.Processing.Model.DeploymentSecretCreate.Description")
* [Identifier](#P-TrimbleCloud-Processing-Model-DeploymentSecretCreate-Identifier "TrimbleCloud.Processing.Model.DeploymentSecretCreate.Identifier")
* [Name](#P-TrimbleCloud-Processing-Model-DeploymentSecretCreate-Name "TrimbleCloud.Processing.Model.DeploymentSecretCreate.Name")
* [Value](#P-TrimbleCloud-Processing-Model-DeploymentSecretCreate-Value "TrimbleCloud.Processing.Model.DeploymentSecretCreate.Value")
* [Validate()](#M-TrimbleCloud-Processing-Model-DeploymentSecretCreate-Validate "TrimbleCloud.Processing.Model.DeploymentSecretCreate.Validate")
* [DeploymentSecretUpdate](#T-TrimbleCloud-Processing-Model-DeploymentSecretUpdate "TrimbleCloud.Processing.Model.DeploymentSecretUpdate")
* [Description](#P-TrimbleCloud-Processing-Model-DeploymentSecretUpdate-Description "TrimbleCloud.Processing.Model.DeploymentSecretUpdate.Description")
* [Name](#P-TrimbleCloud-Processing-Model-DeploymentSecretUpdate-Name "TrimbleCloud.Processing.Model.DeploymentSecretUpdate.Name")
* [Value](#P-TrimbleCloud-Processing-Model-DeploymentSecretUpdate-Value "TrimbleCloud.Processing.Model.DeploymentSecretUpdate.Value")
* [Validate()](#M-TrimbleCloud-Processing-Model-DeploymentSecretUpdate-Validate "TrimbleCloud.Processing.Model.DeploymentSecretUpdate.Validate")
* [DeploymentSecretsAPI](#T-TrimbleCloud-Processing-DeploymentSecretsAPI "TrimbleCloud.Processing.DeploymentSecretsAPI")
* [Create(deploymentId,deploymentSecretCreate)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-Create-System-String,TrimbleCloud-Processing-Model-DeploymentSecretCreate- "TrimbleCloud.Processing.DeploymentSecretsAPI.Create(System.String,TrimbleCloud.Processing.Model.DeploymentSecretCreate)")
* [Delete(deploymentId,deploymentSecretId)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-Delete-System-String,System-String- "TrimbleCloud.Processing.DeploymentSecretsAPI.Delete(System.String,System.String)")
* [Get(deploymentId,deploymentSecretId)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-Get-System-String,System-String- "TrimbleCloud.Processing.DeploymentSecretsAPI.Get(System.String,System.String)")
* [GetList(deploymentId)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-GetList-System-String- "TrimbleCloud.Processing.DeploymentSecretsAPI.GetList(System.String)")
* [List(deploymentId,page,pageSize)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-List-System-String,System-Int32,System-Int32- "TrimbleCloud.Processing.DeploymentSecretsAPI.List(System.String,System.Int32,System.Int32)")
* [Retire(deploymentId,deploymentSecretId)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-Retire-System-String,System-String- "TrimbleCloud.Processing.DeploymentSecretsAPI.Retire(System.String,System.String)")
* [Update(deploymentId,deploymentSecretId,deploymentSecretUpdate)](#M-TrimbleCloud-Processing-DeploymentSecretsAPI-Update-System-String,System-String,TrimbleCloud-Processing-Model-DeploymentSecretUpdate- "TrimbleCloud.Processing.DeploymentSecretsAPI.Update(System.String,System.String,TrimbleCloud.Processing.Model.DeploymentSecretUpdate)")
* [DeploymentStatus](#T-TrimbleCloud-Processing-Model-DeploymentStatus "TrimbleCloud.Processing.Model.DeploymentStatus")
* [AVAILABLE](#F-TrimbleCloud-Processing-Model-DeploymentStatus-AVAILABLE "TrimbleCloud.Processing.Model.DeploymentStatus.AVAILABLE")
* [DELETING](#F-TrimbleCloud-Processing-Model-DeploymentStatus-DELETING "TrimbleCloud.Processing.Model.DeploymentStatus.DELETING")
* [FAILED](#F-TrimbleCloud-Processing-Model-DeploymentStatus-FAILED "TrimbleCloud.Processing.Model.DeploymentStatus.FAILED")
* [PREPARING](#F-TrimbleCloud-Processing-Model-DeploymentStatus-PREPARING "TrimbleCloud.Processing.Model.DeploymentStatus.PREPARING")
* [RETIRED](#F-TrimbleCloud-Processing-Model-DeploymentStatus-RETIRED "TrimbleCloud.Processing.Model.DeploymentStatus.RETIRED")
* [RETIRING](#F-TrimbleCloud-Processing-Model-DeploymentStatus-RETIRING "TrimbleCloud.Processing.Model.DeploymentStatus.RETIRING")
* [SUBMITTED](#F-TrimbleCloud-Processing-Model-DeploymentStatus-SUBMITTED "TrimbleCloud.Processing.Model.DeploymentStatus.SUBMITTED")
* [UPDATING](#F-TrimbleCloud-Processing-Model-DeploymentStatus-UPDATING "TrimbleCloud.Processing.Model.DeploymentStatus.UPDATING")
* [DeploymentUpdate](#T-TrimbleCloud-Processing-Model-DeploymentUpdate "TrimbleCloud.Processing.Model.DeploymentUpdate")
* [AutoScaling](#P-TrimbleCloud-Processing-Model-DeploymentUpdate-AutoScaling "TrimbleCloud.Processing.Model.DeploymentUpdate.AutoScaling")
* [Compute](#P-TrimbleCloud-Processing-Model-DeploymentUpdate-Compute "TrimbleCloud.Processing.Model.DeploymentUpdate.Compute")
* [Description](#P-TrimbleCloud-Processing-Model-DeploymentUpdate-Description "TrimbleCloud.Processing.Model.DeploymentUpdate.Description")
* [EngineId](#P-TrimbleCloud-Processing-Model-DeploymentUpdate-EngineId "TrimbleCloud.Processing.Model.DeploymentUpdate.EngineId")
* [Name](#P-TrimbleCloud-Processing-Model-DeploymentUpdate-Name "TrimbleCloud.Processing.Model.DeploymentUpdate.Name")
* [Regions](#P-TrimbleCloud-Processing-Model-DeploymentUpdate-Regions "TrimbleCloud.Processing.Model.DeploymentUpdate.Regions")
* [Validate()](#M-TrimbleCloud-Processing-Model-DeploymentUpdate-Validate "TrimbleCloud.Processing.Model.DeploymentUpdate.Validate")
* [DeploymentsAPI](#T-TrimbleCloud-Processing-DeploymentsAPI "TrimbleCloud.Processing.DeploymentsAPI")
* [Create(deploymentCreate)](#M-TrimbleCloud-Processing-DeploymentsAPI-Create-TrimbleCloud-Processing-Model-DeploymentCreate- "TrimbleCloud.Processing.DeploymentsAPI.Create(TrimbleCloud.Processing.Model.DeploymentCreate)")
* [Get(id)](#M-TrimbleCloud-Processing-DeploymentsAPI-Get-System-String- "TrimbleCloud.Processing.DeploymentsAPI.Get(System.String)")
* [GetList(engineId)](#M-TrimbleCloud-Processing-DeploymentsAPI-GetList-System-String- "TrimbleCloud.Processing.DeploymentsAPI.GetList(System.String)")
* [List(page,pageSize,filters)](#M-TrimbleCloud-Processing-DeploymentsAPI-List-System-Int32,System-Int32,TrimbleCloud-Processing-Model-DeploymentListFilter- "TrimbleCloud.Processing.DeploymentsAPI.List(System.Int32,System.Int32,TrimbleCloud.Processing.Model.DeploymentListFilter)")
* [Retire(id)](#M-TrimbleCloud-Processing-DeploymentsAPI-Retire-System-String- "TrimbleCloud.Processing.DeploymentsAPI.Retire(System.String)")
* [Update(id,deploymentUpdate)](#M-TrimbleCloud-Processing-DeploymentsAPI-Update-System-String,TrimbleCloud-Processing-Model-DeploymentUpdate- "TrimbleCloud.Processing.DeploymentsAPI.Update(System.String,TrimbleCloud.Processing.Model.DeploymentUpdate)")
* [Engine](#T-TrimbleCloud-Processing-Model-Engine "TrimbleCloud.Processing.Model.Engine")
* [ContainerUpload](#P-TrimbleCloud-Processing-Model-Engine-ContainerUpload "TrimbleCloud.Processing.Model.Engine.ContainerUpload")
* [Description](#P-TrimbleCloud-Processing-Model-Engine-Description "TrimbleCloud.Processing.Model.Engine.Description")
* [EnvironmentVariables](#P-TrimbleCloud-Processing-Model-Engine-EnvironmentVariables "TrimbleCloud.Processing.Model.Engine.EnvironmentVariables")
* [Identifier](#P-TrimbleCloud-Processing-Model-Engine-Identifier "TrimbleCloud.Processing.Model.Engine.Identifier")
* [IngestionType](#P-TrimbleCloud-Processing-Model-Engine-IngestionType "TrimbleCloud.Processing.Model.Engine.IngestionType")
* [Name](#P-TrimbleCloud-Processing-Model-Engine-Name "TrimbleCloud.Processing.Model.Engine.Name")
* [OSBuild](#P-TrimbleCloud-Processing-Model-Engine-OSBuild "TrimbleCloud.Processing.Model.Engine.OSBuild")
* [OSType](#P-TrimbleCloud-Processing-Model-Engine-OSType "TrimbleCloud.Processing.Model.Engine.OSType")
* [Owner](#P-TrimbleCloud-Processing-Model-Engine-Owner "TrimbleCloud.Processing.Model.Engine.Owner")
* [Regions](#P-TrimbleCloud-Processing-Model-Engine-Regions "TrimbleCloud.Processing.Model.Engine.Regions")
* [SecretFiles](#P-TrimbleCloud-Processing-Model-Engine-SecretFiles "TrimbleCloud.Processing.Model.Engine.SecretFiles")
* [SecretVariables](#P-TrimbleCloud-Processing-Model-Engine-SecretVariables "TrimbleCloud.Processing.Model.Engine.SecretVariables")
* [Status](#P-TrimbleCloud-Processing-Model-Engine-Status "TrimbleCloud.Processing.Model.Engine.Status")
* [Tag](#P-TrimbleCloud-Processing-Model-Engine-Tag "TrimbleCloud.Processing.Model.Engine.Tag")
* [Trn](#P-TrimbleCloud-Processing-Model-Engine-Trn "TrimbleCloud.Processing.Model.Engine.Trn")
* [EngineCreate](#T-TrimbleCloud-Processing-Model-EngineCreate "TrimbleCloud.Processing.Model.EngineCreate")
* [Description](#P-TrimbleCloud-Processing-Model-EngineCreate-Description "TrimbleCloud.Processing.Model.EngineCreate.Description")
* [EnvironmentVariables](#P-TrimbleCloud-Processing-Model-EngineCreate-EnvironmentVariables "TrimbleCloud.Processing.Model.EngineCreate.EnvironmentVariables")
* [Identifier](#P-TrimbleCloud-Processing-Model-EngineCreate-Identifier "TrimbleCloud.Processing.Model.EngineCreate.Identifier")
* [IngestionType](#P-TrimbleCloud-Processing-Model-EngineCreate-IngestionType "TrimbleCloud.Processing.Model.EngineCreate.IngestionType")
* [Name](#P-TrimbleCloud-Processing-Model-EngineCreate-Name "TrimbleCloud.Processing.Model.EngineCreate.Name")
* [OSBuild](#P-TrimbleCloud-Processing-Model-EngineCreate-OSBuild "TrimbleCloud.Processing.Model.EngineCreate.OSBuild")
* [OSType](#P-TrimbleCloud-Processing-Model-EngineCreate-OSType "TrimbleCloud.Processing.Model.EngineCreate.OSType")
* [Regions](#P-TrimbleCloud-Processing-Model-EngineCreate-Regions "TrimbleCloud.Processing.Model.EngineCreate.Regions")
* [SecretFiles](#P-TrimbleCloud-Processing-Model-EngineCreate-SecretFiles "TrimbleCloud.Processing.Model.EngineCreate.SecretFiles")
* [SecretVariables](#P-TrimbleCloud-Processing-Model-EngineCreate-SecretVariables "TrimbleCloud.Processing.Model.EngineCreate.SecretVariables")
* [Tag](#P-TrimbleCloud-Processing-Model-EngineCreate-Tag "TrimbleCloud.Processing.Model.EngineCreate.Tag")
* [Validate()](#M-TrimbleCloud-Processing-Model-EngineCreate-Validate "TrimbleCloud.Processing.Model.EngineCreate.Validate")
* [EngineListFilter](#T-TrimbleCloud-Processing-Model-EngineListFilter "TrimbleCloud.Processing.Model.EngineListFilter")
* [OSType](#P-TrimbleCloud-Processing-Model-EngineListFilter-OSType "TrimbleCloud.Processing.Model.EngineListFilter.OSType")
* [Owner](#P-TrimbleCloud-Processing-Model-EngineListFilter-Owner "TrimbleCloud.Processing.Model.EngineListFilter.Owner")
* [Status](#P-TrimbleCloud-Processing-Model-EngineListFilter-Status "TrimbleCloud.Processing.Model.EngineListFilter.Status")
* [EngineStatus](#T-TrimbleCloud-Processing-Model-EngineStatus "TrimbleCloud.Processing.Model.EngineStatus")
* [AVAILABLE](#F-TrimbleCloud-Processing-Model-EngineStatus-AVAILABLE "TrimbleCloud.Processing.Model.EngineStatus.AVAILABLE")
* [AWAITING\_IMAGE\_UPLOAD](#F-TrimbleCloud-Processing-Model-EngineStatus-AWAITING_IMAGE_UPLOAD "TrimbleCloud.Processing.Model.EngineStatus.AWAITING_IMAGE_UPLOAD")
* [FAILED](#F-TrimbleCloud-Processing-Model-EngineStatus-FAILED "TrimbleCloud.Processing.Model.EngineStatus.FAILED")
* [GENERATING\_TOKEN](#F-TrimbleCloud-Processing-Model-EngineStatus-GENERATING_TOKEN "TrimbleCloud.Processing.Model.EngineStatus.GENERATING_TOKEN")
* [PREPARING](#F-TrimbleCloud-Processing-Model-EngineStatus-PREPARING "TrimbleCloud.Processing.Model.EngineStatus.PREPARING")
* [RETIRED](#F-TrimbleCloud-Processing-Model-EngineStatus-RETIRED "TrimbleCloud.Processing.Model.EngineStatus.RETIRED")
* [RETIRING](#F-TrimbleCloud-Processing-Model-EngineStatus-RETIRING "TrimbleCloud.Processing.Model.EngineStatus.RETIRING")
* [SUBMITTED](#F-TrimbleCloud-Processing-Model-EngineStatus-SUBMITTED "TrimbleCloud.Processing.Model.EngineStatus.SUBMITTED")
* [EngineUpdate](#T-TrimbleCloud-Processing-Model-EngineUpdate "TrimbleCloud.Processing.Model.EngineUpdate")
* [Description](#P-TrimbleCloud-Processing-Model-EngineUpdate-Description "TrimbleCloud.Processing.Model.EngineUpdate.Description")
* [Name](#P-TrimbleCloud-Processing-Model-EngineUpdate-Name "TrimbleCloud.Processing.Model.EngineUpdate.Name")
* [Validate()](#M-TrimbleCloud-Processing-Model-EngineUpdate-Validate "TrimbleCloud.Processing.Model.EngineUpdate.Validate")
* [EnginesAPI](#T-TrimbleCloud-Processing-EnginesAPI "TrimbleCloud.Processing.EnginesAPI")
* [Create(engineCreate)](#M-TrimbleCloud-Processing-EnginesAPI-Create-TrimbleCloud-Processing-Model-EngineCreate- "TrimbleCloud.Processing.EnginesAPI.Create(TrimbleCloud.Processing.Model.EngineCreate)")
* [Get(id)](#M-TrimbleCloud-Processing-EnginesAPI-Get-System-String- "TrimbleCloud.Processing.EnginesAPI.Get(System.String)")
* [GetList()](#M-TrimbleCloud-Processing-EnginesAPI-GetList "TrimbleCloud.Processing.EnginesAPI.GetList")
* [List(page,pageSize,filters)](#M-TrimbleCloud-Processing-EnginesAPI-List-System-Int32,System-Int32,TrimbleCloud-Processing-Model-EngineListFilter- "TrimbleCloud.Processing.EnginesAPI.List(System.Int32,System.Int32,TrimbleCloud.Processing.Model.EngineListFilter)")
* [Retire(id)](#M-TrimbleCloud-Processing-EnginesAPI-Retire-System-String- "TrimbleCloud.Processing.EnginesAPI.Retire(System.String)")
* [Update(id,engineUpdate)](#M-TrimbleCloud-Processing-EnginesAPI-Update-System-String,TrimbleCloud-Processing-Model-EngineUpdate- "TrimbleCloud.Processing.EnginesAPI.Update(System.String,TrimbleCloud.Processing.Model.EngineUpdate)")
* [EnumHelper`1](#T-TrimbleCloud-Processing-Helper-EnumHelper1 'TrimbleCloud.Processing.Helper.EnumHelper1')
* [GetEnumMemberValue()](#M-TrimbleCloud-Processing-Helper-EnumHelper1-GetEnumMemberValue-0- "TrimbleCloud.Processing.Helper.EnumHelper1.GetEnumMemberValue(0)")
* [EnvironmentVariable](#T-TrimbleCloud-Processing-Model-EnvironmentVariable "TrimbleCloud.Processing.Model.EnvironmentVariable")
* [Name](#P-TrimbleCloud-Processing-Model-EnvironmentVariable-Name "TrimbleCloud.Processing.Model.EnvironmentVariable.Name")
* [Value](#P-TrimbleCloud-Processing-Model-EnvironmentVariable-Value "TrimbleCloud.Processing.Model.EnvironmentVariable.Value")
* [Validate()](#M-TrimbleCloud-Processing-Model-EnvironmentVariable-Validate "TrimbleCloud.Processing.Model.EnvironmentVariable.Validate")
* [Execution](#T-TrimbleCloud-Processing-Model-Execution "TrimbleCloud.Processing.Model.Execution")
* [BoundParameters](#P-TrimbleCloud-Processing-Model-Execution-BoundParameters "TrimbleCloud.Processing.Model.Execution.BoundParameters")
* [CompletedAt](#P-TrimbleCloud-Processing-Model-Execution-CompletedAt "TrimbleCloud.Processing.Model.Execution.CompletedAt")
* [DataExport](#P-TrimbleCloud-Processing-Model-Execution-DataExport "TrimbleCloud.Processing.Model.Execution.DataExport")
* [FailedAt](#P-TrimbleCloud-Processing-Model-Execution-FailedAt "TrimbleCloud.Processing.Model.Execution.FailedAt")
* [Metadata](#P-TrimbleCloud-Processing-Model-Execution-Metadata "TrimbleCloud.Processing.Model.Execution.Metadata")
* [Parameters](#P-TrimbleCloud-Processing-Model-Execution-Parameters "TrimbleCloud.Processing.Model.Execution.Parameters")
* [ProcedureId](#P-TrimbleCloud-Processing-Model-Execution-ProcedureId "TrimbleCloud.Processing.Model.Execution.ProcedureId")
* [ProcedureIdentifier](#P-TrimbleCloud-Processing-Model-Execution-ProcedureIdentifier "TrimbleCloud.Processing.Model.Execution.ProcedureIdentifier")
* [ProcedureVersion](#P-TrimbleCloud-Processing-Model-Execution-ProcedureVersion "TrimbleCloud.Processing.Model.Execution.ProcedureVersion")
* [Region](#P-TrimbleCloud-Processing-Model-Execution-Region "TrimbleCloud.Processing.Model.Execution.Region")
* [Status](#P-TrimbleCloud-Processing-Model-Execution-Status "TrimbleCloud.Processing.Model.Execution.Status")
* [SubmittedAt](#P-TrimbleCloud-Processing-Model-Execution-SubmittedAt "TrimbleCloud.Processing.Model.Execution.SubmittedAt")
* [ExecutionActivity](#T-TrimbleCloud-Processing-Model-ExecutionActivity "TrimbleCloud.Processing.Model.ExecutionActivity")
* [ActivityId](#P-TrimbleCloud-Processing-Model-ExecutionActivity-ActivityId "TrimbleCloud.Processing.Model.ExecutionActivity.ActivityId")
* [HistoricalInfo](#P-TrimbleCloud-Processing-Model-ExecutionActivity-HistoricalInfo "TrimbleCloud.Processing.Model.ExecutionActivity.HistoricalInfo")
* [ExecutionCreate](#T-TrimbleCloud-Processing-Model-ExecutionCreate "TrimbleCloud.Processing.Model.ExecutionCreate")
* [BoundParameters](#P-TrimbleCloud-Processing-Model-ExecutionCreate-BoundParameters "TrimbleCloud.Processing.Model.ExecutionCreate.BoundParameters")
* [DataExport](#P-TrimbleCloud-Processing-Model-ExecutionCreate-DataExport "TrimbleCloud.Processing.Model.ExecutionCreate.DataExport")
* [Metadata](#P-TrimbleCloud-Processing-Model-ExecutionCreate-Metadata "TrimbleCloud.Processing.Model.ExecutionCreate.Metadata")
* [Parameters](#P-TrimbleCloud-Processing-Model-ExecutionCreate-Parameters "TrimbleCloud.Processing.Model.ExecutionCreate.Parameters")
* [ProcedureId](#P-TrimbleCloud-Processing-Model-ExecutionCreate-ProcedureId "TrimbleCloud.Processing.Model.ExecutionCreate.ProcedureId")
* [ProcedureIdentifier](#P-TrimbleCloud-Processing-Model-ExecutionCreate-ProcedureIdentifier "TrimbleCloud.Processing.Model.ExecutionCreate.ProcedureIdentifier")
* [ProcedureVersion](#P-TrimbleCloud-Processing-Model-ExecutionCreate-ProcedureVersion "TrimbleCloud.Processing.Model.ExecutionCreate.ProcedureVersion")
* [Region](#P-TrimbleCloud-Processing-Model-ExecutionCreate-Region "TrimbleCloud.Processing.Model.ExecutionCreate.Region")
* [ToJson()](#M-TrimbleCloud-Processing-Model-ExecutionCreate-ToJson "TrimbleCloud.Processing.Model.ExecutionCreate.ToJson")
* [Validate()](#M-TrimbleCloud-Processing-Model-ExecutionCreate-Validate "TrimbleCloud.Processing.Model.ExecutionCreate.Validate")
* [ExecutionEvent](#T-TrimbleCloud-Processing-Model-ExecutionEvent "TrimbleCloud.Processing.Model.ExecutionEvent")
* [Contents](#P-TrimbleCloud-Processing-Model-ExecutionEvent-Contents "TrimbleCloud.Processing.Model.ExecutionEvent.Contents")
* [CreatedAt](#P-TrimbleCloud-Processing-Model-ExecutionEvent-CreatedAt "TrimbleCloud.Processing.Model.ExecutionEvent.CreatedAt")
* [Type](#P-TrimbleCloud-Processing-Model-ExecutionEvent-Type "TrimbleCloud.Processing.Model.ExecutionEvent.Type")
* [UpdatedAt](#P-TrimbleCloud-Processing-Model-ExecutionEvent-UpdatedAt "TrimbleCloud.Processing.Model.ExecutionEvent.UpdatedAt")
* [ExecutionListFilter](#T-TrimbleCloud-Processing-Model-ExecutionListFilter "TrimbleCloud.Processing.Model.ExecutionListFilter")
* [CompletedAfter](#P-TrimbleCloud-Processing-Model-ExecutionListFilter-CompletedAfter "TrimbleCloud.Processing.Model.ExecutionListFilter.CompletedAfter")
* [CompletedBefore](#P-TrimbleCloud-Processing-Model-ExecutionListFilter-CompletedBefore "TrimbleCloud.Processing.Model.ExecutionListFilter.CompletedBefore")
* [CreatedAfter](#P-TrimbleCloud-Processing-Model-ExecutionListFilter-CreatedAfter "TrimbleCloud.Processing.Model.ExecutionListFilter.CreatedAfter")
* [CreatedBefore](#P-TrimbleCloud-Processing-Model-ExecutionListFilter-CreatedBefore "TrimbleCloud.Processing.Model.ExecutionListFilter.CreatedBefore")
* [ExecutionStatus](#P-TrimbleCloud-Processing-Model-ExecutionListFilter-ExecutionStatus "TrimbleCloud.Processing.Model.ExecutionListFilter.ExecutionStatus")
* [ProcedureId](#P-TrimbleCloud-Processing-Model-ExecutionListFilter-ProcedureId "TrimbleCloud.Processing.Model.ExecutionListFilter.ProcedureId")
* [ExecutionProgressStatus](#T-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus")
* [EXECUTING](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-EXECUTING "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.EXECUTING")
* [FAILED](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-FAILED "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.FAILED")
* [FINISHED](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-FINISHED "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.FINISHED")
* [QUEUED](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-QUEUED "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.QUEUED")
* [SUBMITTED](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-SUBMITTED "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.SUBMITTED")
* [UNSUBMITTED](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-UNSUBMITTED "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.UNSUBMITTED")
* [WAITING](#F-TrimbleCloud-Processing-Model-Execution-ExecutionProgressStatus-WAITING "TrimbleCloud.Processing.Model.Execution.ExecutionProgressStatus.WAITING")
* [ExecutionStatus](#T-TrimbleCloud-Processing-Model-ExecutionStatus "TrimbleCloud.Processing.Model.ExecutionStatus")
* [NOT\_READY](#F-TrimbleCloud-Processing-Model-ExecutionStatus-NOT_READY "TrimbleCloud.Processing.Model.ExecutionStatus.NOT_READY")
* [READY](#F-TrimbleCloud-Processing-Model-ExecutionStatus-READY "TrimbleCloud.Processing.Model.ExecutionStatus.READY")
* [SUSPENDED](#F-TrimbleCloud-Processing-Model-ExecutionStatus-SUSPENDED "TrimbleCloud.Processing.Model.ExecutionStatus.SUSPENDED")
* [ExecutionsAPI](#T-TrimbleCloud-Processing-ExecutionsAPI "TrimbleCloud.Processing.ExecutionsAPI")
* [Create(executionCreate)](#M-TrimbleCloud-Processing-ExecutionsAPI-Create-TrimbleCloud-Processing-Model-ExecutionCreate- "TrimbleCloud.Processing.ExecutionsAPI.Create(TrimbleCloud.Processing.Model.ExecutionCreate)")
* [Get(id)](#M-TrimbleCloud-Processing-ExecutionsAPI-Get-System-String- "TrimbleCloud.Processing.ExecutionsAPI.Get(System.String)")
* [List(page,pageSize,filters)](#M-TrimbleCloud-Processing-ExecutionsAPI-List-System-Int32,System-Int32,TrimbleCloud-Processing-Model-ExecutionListFilter- "TrimbleCloud.Processing.ExecutionsAPI.List(System.Int32,System.Int32,TrimbleCloud.Processing.Model.ExecutionListFilter)")
* [ListActivities(executionId,page,pageSize)](#M-TrimbleCloud-Processing-ExecutionsAPI-ListActivities-System-String,System-Int32,System-Int32- "TrimbleCloud.Processing.ExecutionsAPI.ListActivities(System.String,System.Int32,System.Int32)")
* [ListEvents(executionId,page,pageSize)](#M-TrimbleCloud-Processing-ExecutionsAPI-ListEvents-System-String,System-Int32,System-Int32- "TrimbleCloud.Processing.ExecutionsAPI.ListEvents(System.String,System.Int32,System.Int32)")
* [HistoricalInfo](#T-TrimbleCloud-Processing-Model-HistoricalInfo "TrimbleCloud.Processing.Model.HistoricalInfo")
* [ActivityTaskCompleted](#P-TrimbleCloud-Processing-Model-HistoricalInfo-ActivityTaskCompleted "TrimbleCloud.Processing.Model.HistoricalInfo.ActivityTaskCompleted")
* [ActivityTaskScheduled](#P-TrimbleCloud-Processing-Model-HistoricalInfo-ActivityTaskScheduled "TrimbleCloud.Processing.Model.HistoricalInfo.ActivityTaskScheduled")
* [ActivityTaskStarted](#P-TrimbleCloud-Processing-Model-HistoricalInfo-ActivityTaskStarted "TrimbleCloud.Processing.Model.HistoricalInfo.ActivityTaskStarted")
* [IPage`1](#T-TrimbleCloud-Processing-IPage1 'TrimbleCloud.Processing.IPage1')
* [CurrentPage](#P-TrimbleCloud-Processing-IPage1-CurrentPage 'TrimbleCloud.Processing.IPage1.CurrentPage')
* [Items](#P-TrimbleCloud-Processing-IPage1-Items 'TrimbleCloud.Processing.IPage1.Items')
* [PageSize](#P-TrimbleCloud-Processing-IPage1-PageSize 'TrimbleCloud.Processing.IPage1.PageSize')
* [TotalItems](#P-TrimbleCloud-Processing-IPage1-TotalItems 'TrimbleCloud.Processing.IPage1.TotalItems')
* [TotalPages](#P-TrimbleCloud-Processing-IPage1-TotalPages 'TrimbleCloud.Processing.IPage1.TotalPages')
* [IngestionType](#T-TrimbleCloud-Processing-Model-IngestionType "TrimbleCloud.Processing.Model.IngestionType")
* [ACRToken](#F-TrimbleCloud-Processing-Model-IngestionType-ACRToken "TrimbleCloud.Processing.Model.IngestionType.ACRToken")
* [Input](#T-TrimbleCloud-Processing-Model-Input "TrimbleCloud.Processing.Model.Input")
* [DataTypes](#P-TrimbleCloud-Processing-Model-Input-DataTypes "TrimbleCloud.Processing.Model.Input.DataTypes")
* [Description](#P-TrimbleCloud-Processing-Model-Input-Description "TrimbleCloud.Processing.Model.Input.Description")
* [Name](#P-TrimbleCloud-Processing-Model-Input-Name "TrimbleCloud.Processing.Model.Input.Name")
* [Optional](#P-TrimbleCloud-Processing-Model-Input-Optional "TrimbleCloud.Processing.Model.Input.Optional")
* [Validate()](#M-TrimbleCloud-Processing-Model-Input-Validate "TrimbleCloud.Processing.Model.Input.Validate")
* [ListFilterBase](#T-TrimbleCloud-Processing-Model-ListFilterBase "TrimbleCloud.Processing.Model.ListFilterBase")
* [Identifier](#P-TrimbleCloud-Processing-Model-ListFilterBase-Identifier "TrimbleCloud.Processing.Model.ListFilterBase.Identifier")
* [Region](#P-TrimbleCloud-Processing-Model-ListFilterBase-Region "TrimbleCloud.Processing.Model.ListFilterBase.Region")
* [OSType](#T-TrimbleCloud-Processing-Model-OSType "TrimbleCloud.Processing.Model.OSType")
* [Linux](#F-TrimbleCloud-Processing-Model-OSType-Linux "TrimbleCloud.Processing.Model.OSType.Linux")
* [Windows](#F-TrimbleCloud-Processing-Model-OSType-Windows "TrimbleCloud.Processing.Model.OSType.Windows")
* [OpInput](#T-TrimbleCloud-Processing-Model-OpInput "TrimbleCloud.Processing.Model.OpInput")
* [OpInput](#T-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpInput "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpInput")
* [DataTypes](#P-TrimbleCloud-Processing-Model-OpInput-DataTypes "TrimbleCloud.Processing.Model.OpInput.DataTypes")
* [Sources](#P-TrimbleCloud-Processing-Model-OpInput-Sources "TrimbleCloud.Processing.Model.OpInput.Sources")
* [DataTypes](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpInput-DataTypes "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpInput.DataTypes")
* [Sources](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpInput-Sources "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpInput.Sources")
* [OpOutput](#T-TrimbleCloud-Processing-Model-OpOutput "TrimbleCloud.Processing.Model.OpOutput")
* [OpOutput](#T-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpOutput "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpOutput")
* [DataType](#P-TrimbleCloud-Processing-Model-OpOutput-DataType "TrimbleCloud.Processing.Model.OpOutput.DataType")
* [Description](#P-TrimbleCloud-Processing-Model-OpOutput-Description "TrimbleCloud.Processing.Model.OpOutput.Description")
* [Name](#P-TrimbleCloud-Processing-Model-OpOutput-Name "TrimbleCloud.Processing.Model.OpOutput.Name")
* [DataType](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpOutput-DataType "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpOutput.DataType")
* [Description](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpOutput-Description "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpOutput.Description")
* [Name](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpOutput-Name "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpOutput.Name")
* [OpParamater](#T-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpParamater "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpParamater")
* [Optional](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpParamater-Optional "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpParamater.Optional")
* [Source](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OpParamater-Source "TrimbleCloud.Processing.Model.Procedure.OperationChain.OpParamater.Source")
* [OpParameter](#T-TrimbleCloud-Processing-Model-OpParameter "TrimbleCloud.Processing.Model.OpParameter")
* [Optional](#P-TrimbleCloud-Processing-Model-OpParameter-Optional "TrimbleCloud.Processing.Model.OpParameter.Optional")
* [Source](#P-TrimbleCloud-Processing-Model-OpParameter-Source "TrimbleCloud.Processing.Model.OpParameter.Source")
* [Operation](#T-TrimbleCloud-Processing-Model-Operation "TrimbleCloud.Processing.Model.Operation")
* [DeploymentIdentifier](#P-TrimbleCloud-Processing-Model-Operation-DeploymentIdentifier "TrimbleCloud.Processing.Model.Operation.DeploymentIdentifier")
* [DeprecationMessage](#P-TrimbleCloud-Processing-Model-Operation-DeprecationMessage "TrimbleCloud.Processing.Model.Operation.DeprecationMessage")
* [Description](#P-TrimbleCloud-Processing-Model-Operation-Description "TrimbleCloud.Processing.Model.Operation.Description")
* [DynamicOutput](#P-TrimbleCloud-Processing-Model-Operation-DynamicOutput "TrimbleCloud.Processing.Model.Operation.DynamicOutput")
* [EngineName](#P-TrimbleCloud-Processing-Model-Operation-EngineName "TrimbleCloud.Processing.Model.Operation.EngineName")
* [ExecutionStatus](#P-TrimbleCloud-Processing-Model-Operation-ExecutionStatus "TrimbleCloud.Processing.Model.Operation.ExecutionStatus")
* [Identifier](#P-TrimbleCloud-Processing-Model-Operation-Identifier "TrimbleCloud.Processing.Model.Operation.Identifier")
* [Inputs](#P-TrimbleCloud-Processing-Model-Operation-Inputs "TrimbleCloud.Processing.Model.Operation.Inputs")
* [IsPublic](#P-TrimbleCloud-Processing-Model-Operation-IsPublic "TrimbleCloud.Processing.Model.Operation.IsPublic")
* [Name](#P-TrimbleCloud-Processing-Model-Operation-Name "TrimbleCloud.Processing.Model.Operation.Name")
* [OutputParameters](#P-TrimbleCloud-Processing-Model-Operation-OutputParameters "TrimbleCloud.Processing.Model.Operation.OutputParameters")
* [Outputs](#P-TrimbleCloud-Processing-Model-Operation-Outputs "TrimbleCloud.Processing.Model.Operation.Outputs")
* [Owner](#P-TrimbleCloud-Processing-Model-Operation-Owner "TrimbleCloud.Processing.Model.Operation.Owner")
* [Parameters](#P-TrimbleCloud-Processing-Model-Operation-Parameters "TrimbleCloud.Processing.Model.Operation.Parameters")
* [Regions](#P-TrimbleCloud-Processing-Model-Operation-Regions "TrimbleCloud.Processing.Model.Operation.Regions")
* [RetriedAfter](#P-TrimbleCloud-Processing-Model-Operation-RetriedAfter "TrimbleCloud.Processing.Model.Operation.RetriedAfter")
* [SharedWith](#P-TrimbleCloud-Processing-Model-Operation-SharedWith "TrimbleCloud.Processing.Model.Operation.SharedWith")
* [Status](#P-TrimbleCloud-Processing-Model-Operation-Status "TrimbleCloud.Processing.Model.Operation.Status")
* [Version](#P-TrimbleCloud-Processing-Model-Operation-Version "TrimbleCloud.Processing.Model.Operation.Version")
* [OperationChain](#T-TrimbleCloud-Processing-Model-OperationChain "TrimbleCloud.Processing.Model.OperationChain")
* [OperationChain](#T-TrimbleCloud-Processing-Model-Procedure-OperationChain "TrimbleCloud.Processing.Model.Procedure.OperationChain")
* [Description](#P-TrimbleCloud-Processing-Model-OperationChain-Description "TrimbleCloud.Processing.Model.OperationChain.Description")
* [EngineName](#P-TrimbleCloud-Processing-Model-OperationChain-EngineName "TrimbleCloud.Processing.Model.OperationChain.EngineName")
* [Identifier](#P-TrimbleCloud-Processing-Model-OperationChain-Identifier "TrimbleCloud.Processing.Model.OperationChain.Identifier")
* [Inputs](#P-TrimbleCloud-Processing-Model-OperationChain-Inputs "TrimbleCloud.Processing.Model.OperationChain.Inputs")
* [Name](#P-TrimbleCloud-Processing-Model-OperationChain-Name "TrimbleCloud.Processing.Model.OperationChain.Name")
* [OutputParameters](#P-TrimbleCloud-Processing-Model-OperationChain-OutputParameters "TrimbleCloud.Processing.Model.OperationChain.OutputParameters")
* [Outputs](#P-TrimbleCloud-Processing-Model-OperationChain-Outputs "TrimbleCloud.Processing.Model.OperationChain.Outputs")
* [Parameters](#P-TrimbleCloud-Processing-Model-OperationChain-Parameters "TrimbleCloud.Processing.Model.OperationChain.Parameters")
* [Version](#P-TrimbleCloud-Processing-Model-OperationChain-Version "TrimbleCloud.Processing.Model.OperationChain.Version")
* [Description](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Description "TrimbleCloud.Processing.Model.Procedure.OperationChain.Description")
* [EncryptedParameters](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-EncryptedParameters "TrimbleCloud.Processing.Model.Procedure.OperationChain.EncryptedParameters")
* [EngineName](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-EngineName "TrimbleCloud.Processing.Model.Procedure.OperationChain.EngineName")
* [Identifier](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Identifier "TrimbleCloud.Processing.Model.Procedure.OperationChain.Identifier")
* [Inputs](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Inputs "TrimbleCloud.Processing.Model.Procedure.OperationChain.Inputs")
* [Name](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Name "TrimbleCloud.Processing.Model.Procedure.OperationChain.Name")
* [OutputParameters](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-OutputParameters "TrimbleCloud.Processing.Model.Procedure.OperationChain.OutputParameters")
* [Outputs](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Outputs "TrimbleCloud.Processing.Model.Procedure.OperationChain.Outputs")
* [Parameters](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Parameters "TrimbleCloud.Processing.Model.Procedure.OperationChain.Parameters")
* [Version](#P-TrimbleCloud-Processing-Model-Procedure-OperationChain-Version "TrimbleCloud.Processing.Model.Procedure.OperationChain.Version")
* [Validate()](#M-TrimbleCloud-Processing-Model-OperationChain-Validate "TrimbleCloud.Processing.Model.OperationChain.Validate")
* [OperationCreate](#T-TrimbleCloud-Processing-Model-OperationCreate "TrimbleCloud.Processing.Model.OperationCreate")
* [DeploymentIdentifier](#P-TrimbleCloud-Processing-Model-OperationCreate-DeploymentIdentifier "TrimbleCloud.Processing.Model.OperationCreate.DeploymentIdentifier")
* [Description](#P-TrimbleCloud-Processing-Model-OperationCreate-Description "TrimbleCloud.Processing.Model.OperationCreate.Description")
* [DynamicOutput](#P-TrimbleCloud-Processing-Model-OperationCreate-DynamicOutput "TrimbleCloud.Processing.Model.OperationCreate.DynamicOutput")
* [EngineName](#P-TrimbleCloud-Processing-Model-OperationCreate-EngineName "TrimbleCloud.Processing.Model.OperationCreate.EngineName")
* [Identifier](#P-TrimbleCloud-Processing-Model-OperationCreate-Identifier "TrimbleCloud.Processing.Model.OperationCreate.Identifier")
* [Inputs](#P-TrimbleCloud-Processing-Model-OperationCreate-Inputs "TrimbleCloud.Processing.Model.OperationCreate.Inputs")
* [IsPublic](#P-TrimbleCloud-Processing-Model-OperationCreate-IsPublic "TrimbleCloud.Processing.Model.OperationCreate.IsPublic")
* [Name](#P-TrimbleCloud-Processing-Model-OperationCreate-Name "TrimbleCloud.Processing.Model.OperationCreate.Name")
* [OutputParameters](#P-TrimbleCloud-Processing-Model-OperationCreate-OutputParameters "TrimbleCloud.Processing.Model.OperationCreate.OutputParameters")
* [Outputs](#P-TrimbleCloud-Processing-Model-OperationCreate-Outputs "TrimbleCloud.Processing.Model.OperationCreate.Outputs")
* [Parameters](#P-TrimbleCloud-Processing-Model-OperationCreate-Parameters "TrimbleCloud.Processing.Model.OperationCreate.Parameters")
* [Regions](#P-TrimbleCloud-Processing-Model-OperationCreate-Regions "TrimbleCloud.Processing.Model.OperationCreate.Regions")
* [SharedWith](#P-TrimbleCloud-Processing-Model-OperationCreate-SharedWith "TrimbleCloud.Processing.Model.OperationCreate.SharedWith")
* [Version](#P-TrimbleCloud-Processing-Model-OperationCreate-Version "TrimbleCloud.Processing.Model.OperationCreate.Version")
* [Validate()](#M-TrimbleCloud-Processing-Model-OperationCreate-Validate "TrimbleCloud.Processing.Model.OperationCreate.Validate")
* [OperationListFilter](#T-TrimbleCloud-Processing-Model-OperationListFilter "TrimbleCloud.Processing.Model.OperationListFilter")
* [DeploymentIdentifier](#P-TrimbleCloud-Processing-Model-OperationListFilter-DeploymentIdentifier "TrimbleCloud.Processing.Model.OperationListFilter.DeploymentIdentifier")
* [EngineName](#P-TrimbleCloud-Processing-Model-OperationListFilter-EngineName "TrimbleCloud.Processing.Model.OperationListFilter.EngineName")
* [ExecutionStatus](#P-TrimbleCloud-Processing-Model-OperationListFilter-ExecutionStatus "TrimbleCloud.Processing.Model.OperationListFilter.ExecutionStatus")
* [ProcedureId](#P-TrimbleCloud-Processing-Model-OperationListFilter-ProcedureId "TrimbleCloud.Processing.Model.OperationListFilter.ProcedureId")
* [Public](#P-TrimbleCloud-Processing-Model-OperationListFilter-Public "TrimbleCloud.Processing.Model.OperationListFilter.Public")
* [Status](#P-TrimbleCloud-Processing-Model-OperationListFilter-Status "TrimbleCloud.Processing.Model.OperationListFilter.Status")
* [OperationUpdate](#T-TrimbleCloud-Processing-Model-OperationUpdate "TrimbleCloud.Processing.Model.OperationUpdate")
* [DeploymentIdentifier](#P-TrimbleCloud-Processing-Model-OperationUpdate-DeploymentIdentifier "TrimbleCloud.Processing.Model.OperationUpdate.DeploymentIdentifier")
* [Description](#P-TrimbleCloud-Processing-Model-OperationUpdate-Description "TrimbleCloud.Processing.Model.OperationUpdate.Description")
* [DynamicOutput](#P-TrimbleCloud-Processing-Model-OperationUpdate-DynamicOutput "TrimbleCloud.Processing.Model.OperationUpdate.DynamicOutput")
* [EngineName](#P-TrimbleCloud-Processing-Model-OperationUpdate-EngineName "TrimbleCloud.Processing.Model.OperationUpdate.EngineName")
* [Identifier](#P-TrimbleCloud-Processing-Model-OperationUpdate-Identifier "TrimbleCloud.Processing.Model.OperationUpdate.Identifier")
* [Inputs](#P-TrimbleCloud-Processing-Model-OperationUpdate-Inputs "TrimbleCloud.Processing.Model.OperationUpdate.Inputs")
* [IsPublic](#P-TrimbleCloud-Processing-Model-OperationUpdate-IsPublic "TrimbleCloud.Processing.Model.OperationUpdate.IsPublic")
* [Name](#P-TrimbleCloud-Processing-Model-OperationUpdate-Name "TrimbleCloud.Processing.Model.OperationUpdate.Name")
* [OutputParameters](#P-TrimbleCloud-Processing-Model-OperationUpdate-OutputParameters "TrimbleCloud.Processing.Model.OperationUpdate.OutputParameters")
* [Outputs](#P-TrimbleCloud-Processing-Model-OperationUpdate-Outputs "TrimbleCloud.Processing.Model.OperationUpdate.Outputs")
* [Parameters](#P-TrimbleCloud-Processing-Model-OperationUpdate-Parameters "TrimbleCloud.Processing.Model.OperationUpdate.Parameters")
* [Regions](#P-TrimbleCloud-Processing-Model-OperationUpdate-Regions "TrimbleCloud.Processing.Model.OperationUpdate.Regions")
* [SharedWith](#P-TrimbleCloud-Processing-Model-OperationUpdate-SharedWith "TrimbleCloud.Processing.Model.OperationUpdate.SharedWith")
* [Version](#P-TrimbleCloud-Processing-Model-OperationUpdate-Version "TrimbleCloud.Processing.Model.OperationUpdate.Version")
* [Validate()](#M-TrimbleCloud-Processing-Model-OperationUpdate-Validate "TrimbleCloud.Processing.Model.OperationUpdate.Validate")
* [OperationsAPI](#T-TrimbleCloud-Processing-OperationsAPI "TrimbleCloud.Processing.OperationsAPI")
* [Approve(id)](#M-TrimbleCloud-Processing-OperationsAPI-Approve-System-String- "TrimbleCloud.Processing.OperationsAPI.Approve(System.String)")
* [Clone(id)](#M-TrimbleCloud-Processing-OperationsAPI-Clone-System-String- "TrimbleCloud.Processing.OperationsAPI.Clone(System.String)")
* [Create(operationCreate)](#M-TrimbleCloud-Processing-OperationsAPI-Create-TrimbleCloud-Processing-Model-OperationCreate- "TrimbleCloud.Processing.OperationsAPI.Create(TrimbleCloud.Processing.Model.OperationCreate)")
* [Delete(id)](#M-TrimbleCloud-Processing-OperationsAPI-Delete-System-String- "TrimbleCloud.Processing.OperationsAPI.Delete(System.String)")
* [Get(id)](#M-TrimbleCloud-Processing-OperationsAPI-Get-System-String- "TrimbleCloud.Processing.OperationsAPI.Get(System.String)")
* [GetList(include\_public)](#M-TrimbleCloud-Processing-OperationsAPI-GetList-System-Boolean- "TrimbleCloud.Processing.OperationsAPI.GetList(System.Boolean)")
* [List(page,pageSize,filters)](#M-TrimbleCloud-Processing-OperationsAPI-List-System-Int32,System-Int32,TrimbleCloud-Processing-Model-OperationListFilter- "TrimbleCloud.Processing.OperationsAPI.List(System.Int32,System.Int32,TrimbleCloud.Processing.Model.OperationListFilter)")
* [Publish(id)](#M-TrimbleCloud-Processing-OperationsAPI-Publish-System-String- "TrimbleCloud.Processing.OperationsAPI.Publish(System.String)")
* [Retire(id)](#M-TrimbleCloud-Processing-OperationsAPI-Retire-System-String- "TrimbleCloud.Processing.OperationsAPI.Retire(System.String)")
* [Update(id,operationUpdate)](#M-TrimbleCloud-Processing-OperationsAPI-Update-System-String,TrimbleCloud-Processing-Model-OperationUpdate- "TrimbleCloud.Processing.OperationsAPI.Update(System.String,TrimbleCloud.Processing.Model.OperationUpdate)")
* [Output](#T-TrimbleCloud-Processing-Model-Output "TrimbleCloud.Processing.Model.Output")
* [DataType](#P-TrimbleCloud-Processing-Model-Output-DataType "TrimbleCloud.Processing.Model.Output.DataType")
* [Description](#P-TrimbleCloud-Processing-Model-Output-Description "TrimbleCloud.Processing.Model.Output.Description")
* [Name](#P-TrimbleCloud-Processing-Model-Output-Name "TrimbleCloud.Processing.Model.Output.Name")
* [Validate()](#M-TrimbleCloud-Processing-Model-Output-Validate "TrimbleCloud.Processing.Model.Output.Validate")
* [OutputParameter](#T-TrimbleCloud-Processing-Model-OutputParameter "TrimbleCloud.Processing.Model.OutputParameter")
* [Description](#P-TrimbleCloud-Processing-Model-OutputParameter-Description "TrimbleCloud.Processing.Model.OutputParameter.Description")
* [Name](#P-TrimbleCloud-Processing-Model-OutputParameter-Name "TrimbleCloud.Processing.Model.OutputParameter.Name")
* [Optional](#P-TrimbleCloud-Processing-Model-OutputParameter-Optional "TrimbleCloud.Processing.Model.OutputParameter.Optional")
* [Type](#P-TrimbleCloud-Processing-Model-OutputParameter-Type "TrimbleCloud.Processing.Model.OutputParameter.Type")
* [Validate()](#M-TrimbleCloud-Processing-Model-OutputParameter-Validate "TrimbleCloud.Processing.Model.OutputParameter.Validate")
* [Page`1](#T-TrimbleCloud-Processing-Page1 'TrimbleCloud.Processing.Page1')
* [CurrentPage](#P-TrimbleCloud-Processing-Page1-CurrentPage 'TrimbleCloud.Processing.Page1.CurrentPage')
* [Items](#P-TrimbleCloud-Processing-Page1-Items 'TrimbleCloud.Processing.Page1.Items')
* [PageSize](#P-TrimbleCloud-Processing-Page1-PageSize 'TrimbleCloud.Processing.Page1.PageSize')
* [TotalItems](#P-TrimbleCloud-Processing-Page1-TotalItems 'TrimbleCloud.Processing.Page1.TotalItems')
* [TotalPages](#P-TrimbleCloud-Processing-Page1-TotalPages 'TrimbleCloud.Processing.Page1.TotalPages')
* [GetEnumerator()](#M-TrimbleCloud-Processing-Page1-GetEnumerator 'TrimbleCloud.Processing.Page1.GetEnumerator')
* [System#Collections#IEnumerable#GetEnumerator()](#M-TrimbleCloud-Processing-Page1-System#Collections#IEnumerable#GetEnumerator 'TrimbleCloud.Processing.Page1.System#Collections#IEnumerable#GetEnumerator')
* [Parameter](#T-TrimbleCloud-Processing-Model-Parameter "TrimbleCloud.Processing.Model.Parameter")
* [Description](#P-TrimbleCloud-Processing-Model-Parameter-Description "TrimbleCloud.Processing.Model.Parameter.Description")
* [Encrypted](#P-TrimbleCloud-Processing-Model-Parameter-Encrypted "TrimbleCloud.Processing.Model.Parameter.Encrypted")
* [Name](#P-TrimbleCloud-Processing-Model-Parameter-Name "TrimbleCloud.Processing.Model.Parameter.Name")
* [Optional](#P-TrimbleCloud-Processing-Model-Parameter-Optional "TrimbleCloud.Processing.Model.Parameter.Optional")
* [Type](#P-TrimbleCloud-Processing-Model-Parameter-Type "TrimbleCloud.Processing.Model.Parameter.Type")
* [Validate()](#M-TrimbleCloud-Processing-Model-Parameter-Validate "TrimbleCloud.Processing.Model.Parameter.Validate")
* [Procedure](#T-TrimbleCloud-Processing-Model-Procedure "TrimbleCloud.Processing.Model.Procedure")
* [DefaultRegion](#P-TrimbleCloud-Processing-Model-Procedure-DefaultRegion "TrimbleCloud.Processing.Model.Procedure.DefaultRegion")
* [Description](#P-TrimbleCloud-Processing-Model-Procedure-Description "TrimbleCloud.Processing.Model.Procedure.Description")
* [DocumentationUrl](#P-TrimbleCloud-Processing-Model-Procedure-DocumentationUrl "TrimbleCloud.Processing.Model.Procedure.DocumentationUrl")
* [ExecutionStatus](#P-TrimbleCloud-Processing-Model-Procedure-ExecutionStatus "TrimbleCloud.Processing.Model.Procedure.ExecutionStatus")
* [Identifier](#P-TrimbleCloud-Processing-Model-Procedure-Identifier "TrimbleCloud.Processing.Model.Procedure.Identifier")
* [IsPublic](#P-TrimbleCloud-Processing-Model-Procedure-IsPublic "TrimbleCloud.Processing.Model.Procedure.IsPublic")
* [Name](#P-TrimbleCloud-Processing-Model-Procedure-Name "TrimbleCloud.Processing.Model.Procedure.Name")
* [Operations](#P-TrimbleCloud-Processing-Model-Procedure-Operations "TrimbleCloud.Processing.Model.Procedure.Operations")
* [Owner](#P-TrimbleCloud-Processing-Model-Procedure-Owner "TrimbleCloud.Processing.Model.Procedure.Owner")
* [Parameters](#P-TrimbleCloud-Processing-Model-Procedure-Parameters "TrimbleCloud.Processing.Model.Procedure.Parameters")
* [Regions](#P-TrimbleCloud-Processing-Model-Procedure-Regions "TrimbleCloud.Processing.Model.Procedure.Regions")
* [RetriedAfter](#P-TrimbleCloud-Processing-Model-Procedure-RetriedAfter "TrimbleCloud.Processing.Model.Procedure.RetriedAfter")
* [SharedWith](#P-TrimbleCloud-Processing-Model-Procedure-SharedWith "TrimbleCloud.Processing.Model.Procedure.SharedWith")
* [Status](#P-TrimbleCloud-Processing-Model-Procedure-Status "TrimbleCloud.Processing.Model.Procedure.Status")
* [Tags](#P-TrimbleCloud-Processing-Model-Procedure-Tags "TrimbleCloud.Processing.Model.Procedure.Tags")
* [Version](#P-TrimbleCloud-Processing-Model-Procedure-Version "TrimbleCloud.Processing.Model.Procedure.Version")
* [ProcedureCreate](#T-TrimbleCloud-Processing-Model-ProcedureCreate "TrimbleCloud.Processing.Model.ProcedureCreate")
* [DefaultRegion](#P-TrimbleCloud-Processing-Model-ProcedureCreate-DefaultRegion "TrimbleCloud.Processing.Model.ProcedureCreate.DefaultRegion")
* [Description](#P-TrimbleCloud-Processing-Model-ProcedureCreate-Description "TrimbleCloud.Processing.Model.ProcedureCreate.Description")
* [DocumentationUrl](#P-TrimbleCloud-Processing-Model-ProcedureCreate-DocumentationUrl "TrimbleCloud.Processing.Model.ProcedureCreate.DocumentationUrl")
* [Identifier](#P-TrimbleCloud-Processing-Model-ProcedureCreate-Identifier "TrimbleCloud.Processing.Model.ProcedureCreate.Identifier")
* [Name](#P-TrimbleCloud-Processing-Model-ProcedureCreate-Name "TrimbleCloud.Processing.Model.ProcedureCreate.Name")
* [Operations](#P-TrimbleCloud-Processing-Model-ProcedureCreate-Operations "TrimbleCloud.Processing.Model.ProcedureCreate.Operations")
* [ProcedureParameters](#P-TrimbleCloud-Processing-Model-ProcedureCreate-ProcedureParameters "TrimbleCloud.Processing.Model.ProcedureCreate.ProcedureParameters")
* [SharedWith](#P-TrimbleCloud-Processing-Model-ProcedureCreate-SharedWith "TrimbleCloud.Processing.Model.ProcedureCreate.SharedWith")
* [Tags](#P-TrimbleCloud-Processing-Model-ProcedureCreate-Tags "TrimbleCloud.Processing.Model.ProcedureCreate.Tags")
* [Version](#P-TrimbleCloud-Processing-Model-ProcedureCreate-Version "TrimbleCloud.Processing.Model.ProcedureCreate.Version")
* [Validate()](#M-TrimbleCloud-Processing-Model-ProcedureCreate-Validate "TrimbleCloud.Processing.Model.ProcedureCreate.Validate")
* [ProcedureListFilter](#T-TrimbleCloud-Processing-Model-ProcedureListFilter "TrimbleCloud.Processing.Model.ProcedureListFilter")
* [ExecutionStatus](#P-TrimbleCloud-Processing-Model-ProcedureListFilter-ExecutionStatus "TrimbleCloud.Processing.Model.ProcedureListFilter.ExecutionStatus")
* [OperationId](#P-TrimbleCloud-Processing-Model-ProcedureListFilter-OperationId "TrimbleCloud.Processing.Model.ProcedureListFilter.OperationId")
* [Public](#P-TrimbleCloud-Processing-Model-ProcedureListFilter-Public "TrimbleCloud.Processing.Model.ProcedureListFilter.Public")
* [Status](#P-TrimbleCloud-Processing-Model-ProcedureListFilter-Status "TrimbleCloud.Processing.Model.ProcedureListFilter.Status")
* [ProcedureParameter](#T-TrimbleCloud-Processing-Model-ProcedureParameter "TrimbleCloud.Processing.Model.ProcedureParameter")
* [DefaultValue](#P-TrimbleCloud-Processing-Model-ProcedureParameter-DefaultValue "TrimbleCloud.Processing.Model.ProcedureParameter.DefaultValue")
* [Description](#P-TrimbleCloud-Processing-Model-ProcedureParameter-Description "TrimbleCloud.Processing.Model.ProcedureParameter.Description")
* [Name](#P-TrimbleCloud-Processing-Model-ProcedureParameter-Name "TrimbleCloud.Processing.Model.ProcedureParameter.Name")
* [Source](#P-TrimbleCloud-Processing-Model-ProcedureParameter-Source "TrimbleCloud.Processing.Model.ProcedureParameter.Source")
* [Type](#P-TrimbleCloud-Processing-Model-ProcedureParameter-Type "TrimbleCloud.Processing.Model.ProcedureParameter.Type")
* [Value](#P-TrimbleCloud-Processing-Model-ProcedureParameter-Value "TrimbleCloud.Processing.Model.ProcedureParameter.Value")
* [ProcedureUpdate](#T-TrimbleCloud-Processing-Model-ProcedureUpdate "TrimbleCloud.Processing.Model.ProcedureUpdate")
* [DefaultRegion](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-DefaultRegion "TrimbleCloud.Processing.Model.ProcedureUpdate.DefaultRegion")
* [Description](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-Description "TrimbleCloud.Processing.Model.ProcedureUpdate.Description")
* [DocumentationUrl](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-DocumentationUrl "TrimbleCloud.Processing.Model.ProcedureUpdate.DocumentationUrl")
* [Identifier](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-Identifier "TrimbleCloud.Processing.Model.ProcedureUpdate.Identifier")
* [Name](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-Name "TrimbleCloud.Processing.Model.ProcedureUpdate.Name")
* [Operations](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-Operations "TrimbleCloud.Processing.Model.ProcedureUpdate.Operations")
* [ProcedureParameters](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-ProcedureParameters "TrimbleCloud.Processing.Model.ProcedureUpdate.ProcedureParameters")
* [SharedWith](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-SharedWith "TrimbleCloud.Processing.Model.ProcedureUpdate.SharedWith")
* [Tags](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-Tags "TrimbleCloud.Processing.Model.ProcedureUpdate.Tags")
* [Version](#P-TrimbleCloud-Processing-Model-ProcedureUpdate-Version "TrimbleCloud.Processing.Model.ProcedureUpdate.Version")
* [Validate()](#M-TrimbleCloud-Processing-Model-ProcedureUpdate-Validate "TrimbleCloud.Processing.Model.ProcedureUpdate.Validate")
* [ProceduresAPI](#T-TrimbleCloud-Processing-ProceduresAPI "TrimbleCloud.Processing.ProceduresAPI")
* [Approve(id)](#M-TrimbleCloud-Processing-ProceduresAPI-Approve-System-String- "TrimbleCloud.Processing.ProceduresAPI.Approve(System.String)")
* [Create(procedureCreate)](#M-TrimbleCloud-Processing-ProceduresAPI-Create-TrimbleCloud-Processing-Model-ProcedureCreate- "TrimbleCloud.Processing.ProceduresAPI.Create(TrimbleCloud.Processing.Model.ProcedureCreate)")
* [Delete(id)](#M-TrimbleCloud-Processing-ProceduresAPI-Delete-System-String- "TrimbleCloud.Processing.ProceduresAPI.Delete(System.String)")
* [Get(id)](#M-TrimbleCloud-Processing-ProceduresAPI-Get-System-String- "TrimbleCloud.Processing.ProceduresAPI.Get(System.String)")
* [GetList(include\_public)](#M-TrimbleCloud-Processing-ProceduresAPI-GetList-System-Boolean- "TrimbleCloud.Processing.ProceduresAPI.GetList(System.Boolean)")
* [List(page,pageSize,filters)](#M-TrimbleCloud-Processing-ProceduresAPI-List-System-Int32,System-Int32,TrimbleCloud-Processing-Model-ProcedureListFilter- "TrimbleCloud.Processing.ProceduresAPI.List(System.Int32,System.Int32,TrimbleCloud.Processing.Model.ProcedureListFilter)")
* [Publish(id)](#M-TrimbleCloud-Processing-ProceduresAPI-Publish-System-String- "TrimbleCloud.Processing.ProceduresAPI.Publish(System.String)")
* [Retire(id)](#M-TrimbleCloud-Processing-ProceduresAPI-Retire-System-String- "TrimbleCloud.Processing.ProceduresAPI.Retire(System.String)")
* [Update(id,procedureUpdate)](#M-TrimbleCloud-Processing-ProceduresAPI-Update-System-String,TrimbleCloud-Processing-Model-ProcedureUpdate- "TrimbleCloud.Processing.ProceduresAPI.Update(System.String,TrimbleCloud.Processing.Model.ProcedureUpdate)")
* [ProcessingClient](#T-TrimbleCloud-Processing-ProcessingClient "TrimbleCloud.Processing.ProcessingClient")
* [#ctor(clientProvider)](#M-TrimbleCloud-Processing-ProcessingClient-#ctor-Trimble-ID-IHttpClientProvider- "TrimbleCloud.Processing.ProcessingClient.#ctor(Trimble.ID.IHttpClientProvider)")
* [\_clientProvider](#F-TrimbleCloud-Processing-ProcessingClient-_clientProvider "TrimbleCloud.Processing.ProcessingClient._clientProvider")
* [DeploymentSecrets](#P-TrimbleCloud-Processing-ProcessingClient-DeploymentSecrets "TrimbleCloud.Processing.ProcessingClient.DeploymentSecrets")
* [Deployments](#P-TrimbleCloud-Processing-ProcessingClient-Deployments "TrimbleCloud.Processing.ProcessingClient.Deployments")
* [Engines](#P-TrimbleCloud-Processing-ProcessingClient-Engines "TrimbleCloud.Processing.ProcessingClient.Engines")
* [Executions](#P-TrimbleCloud-Processing-ProcessingClient-Executions "TrimbleCloud.Processing.ProcessingClient.Executions")
* [Operations](#P-TrimbleCloud-Processing-ProcessingClient-Operations "TrimbleCloud.Processing.ProcessingClient.Operations")
* [Procedures](#P-TrimbleCloud-Processing-ProcessingClient-Procedures "TrimbleCloud.Processing.ProcessingClient.Procedures")
* [QueryStringFormatter`1](#T-TrimbleCloud-Processing-Helper-QueryStringFormatter1 'TrimbleCloud.Processing.Helper.QueryStringFormatter1')
* [ToQueryString()](#M-TrimbleCloud-Processing-Helper-QueryStringFormatter1-ToQueryString-0- "TrimbleCloud.Processing.Helper.QueryStringFormatter1.ToQueryString(0)")
* [Region](#T-TrimbleCloud-Processing-Model-Region "TrimbleCloud.Processing.Model.Region")
* [AzureUS1](#F-TrimbleCloud-Processing-Model-Region-AzureUS1 "TrimbleCloud.Processing.Model.Region.AzureUS1")
* [Resource](#T-TrimbleCloud-Processing-Model-Resource "TrimbleCloud.Processing.Model.Resource")
* [CreatedAt](#P-TrimbleCloud-Processing-Model-Resource-CreatedAt "TrimbleCloud.Processing.Model.Resource.CreatedAt")
* [Id](#P-TrimbleCloud-Processing-Model-Resource-Id "TrimbleCloud.Processing.Model.Resource.Id")
* [UpdatedAt](#P-TrimbleCloud-Processing-Model-Resource-UpdatedAt "TrimbleCloud.Processing.Model.Resource.UpdatedAt")
* [Response](#T-TrimbleCloud-Processing-Response "TrimbleCloud.Processing.Response")
* [ContentLength](#P-TrimbleCloud-Processing-Response-ContentLength "TrimbleCloud.Processing.Response.ContentLength")
* [IsError](#P-TrimbleCloud-Processing-Response-IsError "TrimbleCloud.Processing.Response.IsError")
* [Metadata](#P-TrimbleCloud-Processing-Response-Metadata "TrimbleCloud.Processing.Response.Metadata")
* [ReasonPhrase](#P-TrimbleCloud-Processing-Response-ReasonPhrase "TrimbleCloud.Processing.Response.ReasonPhrase")
* [RequestId](#P-TrimbleCloud-Processing-Response-RequestId "TrimbleCloud.Processing.Response.RequestId")
* [Status](#P-TrimbleCloud-Processing-Response-Status "TrimbleCloud.Processing.Response.Status")
* [Dispose()](#M-TrimbleCloud-Processing-Response-Dispose "TrimbleCloud.Processing.Response.Dispose")
* [FromValue``1(value,response)](#M-TrimbleCloud-Processing-Response-FromValue1-0,TrimbleCloud-Processing-Response- "TrimbleCloud.Processing.Response.FromValue1(0,TrimbleCloud.Processing.Response)")
* [ToString()](#M-TrimbleCloud-Processing-Response-ToString "TrimbleCloud.Processing.Response.ToString")
* [Response`1](#T-TrimbleCloud-Processing-Response1 'TrimbleCloud.Processing.Response1')
* [Data](#P-TrimbleCloud-Processing-Response1-Data 'TrimbleCloud.Processing.Response1.Data')
* [HasData](#P-TrimbleCloud-Processing-Response1-HasData 'TrimbleCloud.Processing.Response1.HasData')
* [GetResponse()](#M-TrimbleCloud-Processing-Response1-GetResponse 'TrimbleCloud.Processing.Response1.GetResponse')
* [op\_Implicit(response)](#M-TrimbleCloud-Processing-Response`1-op_Implicit-TrimbleCloud-Processing-Response{`0}-~`0 'TrimbleCloud.Processing.Response`1.op\_Implicit(TrimbleCloud.Processing.Response{`0})~`0')
* [SecretFile](#T-TrimbleCloud-Processing-Model-SecretFile "TrimbleCloud.Processing.Model.SecretFile")
* [FilePath](#P-TrimbleCloud-Processing-Model-SecretFile-FilePath "TrimbleCloud.Processing.Model.SecretFile.FilePath")
* [Identifier](#P-TrimbleCloud-Processing-Model-SecretFile-Identifier "TrimbleCloud.Processing.Model.SecretFile.Identifier")
* [SecretVariable](#T-TrimbleCloud-Processing-Model-SecretVariable "TrimbleCloud.Processing.Model.SecretVariable")
* [Identifier](#P-TrimbleCloud-Processing-Model-SecretVariable-Identifier "TrimbleCloud.Processing.Model.SecretVariable.Identifier")
* [VariableName](#P-TrimbleCloud-Processing-Model-SecretVariable-VariableName "TrimbleCloud.Processing.Model.SecretVariable.VariableName")
* [Status](#T-TrimbleCloud-Processing-Model-Status "TrimbleCloud.Processing.Model.Status")
* [DELETING](#F-TrimbleCloud-Processing-Model-Status-DELETING "TrimbleCloud.Processing.Model.Status.DELETING")
* [EXECUTABLE](#F-TrimbleCloud-Processing-Model-Status-EXECUTABLE "TrimbleCloud.Processing.Model.Status.EXECUTABLE")
* [MUTABLE](#F-TrimbleCloud-Processing-Model-Status-MUTABLE "TrimbleCloud.Processing.Model.Status.MUTABLE")
* [RETIRED](#F-TrimbleCloud-Processing-Model-Status-RETIRED "TrimbleCloud.Processing.Model.Status.RETIRED")
* [Type](#T-TrimbleCloud-Processing-Model-Type "TrimbleCloud.Processing.Model.Type")
* [ERROR](#F-TrimbleCloud-Processing-Model-Type-ERROR "TrimbleCloud.Processing.Model.Type.ERROR")
* [INFO](#F-TrimbleCloud-Processing-Model-Type-INFO "TrimbleCloud.Processing.Model.Type.INFO")
* [ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException")
* [#ctor(message)](#M-TrimbleCloud-Processing-ValidationException-#ctor-System-String- "TrimbleCloud.Processing.ValidationException.#ctor(System.String)")
* [#ctor(message,innerException)](#M-TrimbleCloud-Processing-ValidationException-#ctor-System-String,System-Exception- "TrimbleCloud.Processing.ValidationException.#ctor(System.String,System.Exception)")
* [#ctor(message,errors)](#M-TrimbleCloud-Processing-ValidationException-#ctor-System-String,System-Collections-Generic-IEnumerable{System-String}- "TrimbleCloud.Processing.ValidationException.#ctor(System.String,System.Collections.Generic.IEnumerable{System.String})")
* [Errors](#P-TrimbleCloud-Processing-ValidationException-Errors "TrimbleCloud.Processing.ValidationException.Errors")

## ACRToken `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

ACR Token

### LoginCommand `property`

##### Summary

ACR Token login command

### PushCommand `property`

##### Summary

ACR Token push command

### TagCommand `property`

##### Summary

ACR Token tag command

### UploadStatus `property`

##### Summary

ACR Token upload status

## APIBase `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Base class for API requests

## AutoScaling `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Auto-scaling configuration

### MaxCount `property`

##### Summary

Maximum count

### MinCount `property`

##### Summary

Minimum count

## Client `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Client model

### access\_level `property`

### name `property`

## ClientsAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

API Methods relating to Trimble Cloud Platform Processing Framework executions

### Read() `method`

##### Summary

Read the current client

##### Returns

A Task that resolves to the current client on completion

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when the current client cannot be read |

## Compute `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

The configuration object to define the Engine-compute resources for memory and CPU allocation.

### CPU `property`

##### Summary

The amount of CPU to assign to a single instance of an Engine.

### Memory `property`

##### Summary

The amount of Memory to assign to a single instance of an Engine. The unit for this property is megabytes. For example, if an Engine requires 1GB of memory, then the `deployment.computing.memory` specification will be `1024`

### Validate() `method`

##### Summary

Validate the compute parameters.

##### Parameters

This method has no parameters.

## ContainerUpload `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Container upload

### AcrToken `property`

##### Summary

ACR Token

## ContainerUploadStatus `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Container upload status

### AVAILABLE `constants`

##### Summary

Available

### GENERATING `constants`

##### Summary

Generating

### IMAGE\_RECEIVED `constants`

##### Summary

Image received

### UNAVAILABLE `constants`

##### Summary

Unavailable

## DataType `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Data type of the parameter

### Array `constants`

##### Summary

A list of parameters of any type

### Boolean `constants`

##### Summary

Boolean true/false (not surrounded by quotes)

### Number `constants`

##### Summary

An integer or a float

### Object `constants`

##### Summary

Any valid JSON object

### SingleChoice `constants`

##### Summary

Value must match an item in the options field

### String `constants`

##### Summary

String text surrounded by double quotes

### Wildcard `constants`

##### Summary

Wildcard type

## Deployment `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Deployment create model

### AutoScaling `property`

##### Summary

Auto scaling configuration

### Compute `property`

##### Summary

The configuration object to define the Engine-compute resources for memory and CPU allocation.

### Description `property`

##### Summary

The description of the deployment.

### EngineId `property`

##### Summary

The Engine Identifier to use for this deployment.

### Identifier `property`

##### Summary

A Deployment Identifier is unique within the system.

### Name `property`

##### Summary

The name of the deployment.

### Owner `property`

##### Summary

The owner of the Deployment

### Regions `property`

##### Summary

region to deploy the deployment

### Status `property`

##### Summary

Deployment status

### Trn `property`

##### Summary

TRN value of the Deployment

## DeploymentCreate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Deployment create model

### AutoScaling `property`

##### Summary

Auto scaling configuration

### Compute `property`

##### Summary

The configuration object to define the Engine-compute resources for memory and CPU allocation.

### Description `property`

##### Summary

The description of the deployment.

### EngineId `property`

##### Summary

The Engine Identifier to use for this deployment.

### Identifier `property`

##### Summary

A Deployment Identifier is unique within the system.

### Name `property`

##### Summary

The name of the deployment.

### Regions `property`

##### Summary

The region this Deployment can run in

### Validate() `method`

##### Summary

Validate the deployment creation parameters.

##### Parameters

This method has no parameters.

## DeploymentListFilter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Deployment List Filters

### ActiveEngine `property`

##### Summary

The active engine of a deployment

### Status `property`

##### Summary

Filters a resource based on status.

## DeploymentSecret `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the Deployment Secret.

### Description `property`

##### Summary

Deployment Secret description

### Identifier `property`

##### Summary

The expected identifier of a Deployment Secret.

### Name `property`

##### Summary

The name of the Deployment Secret.

### Owner `property`

##### Summary

The owner of the Deployment secret

### Regions `property`

##### Summary

The regions where the Deployment Secret is available.

### Status `property`

##### Summary

Deployment status

### Trn `property`

##### Summary

TRN value of the deployment secret

### Value `property`

##### Summary

The value of the Deployment Secret.

## DeploymentSecretCreate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents a deployment secret creation.

### Description `property`

##### Summary

Deployment Secret description

### Identifier `property`

##### Summary

The expected identifier of a Deployment Secret.

### Name `property`

##### Summary

The name of the Deployment Secret.

### Value `property`

##### Summary

The value of the Deployment Secret.

### Validate() `method`

##### Summary

Validate the deployment secret creation parameters.

##### Parameters

This method has no parameters.

## DeploymentSecretUpdate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the updation parameters for the deployment secret.

### Description `property`

##### Summary

Deployment Secret description

### Name `property`

##### Summary

The name of the Deployment Secret.

### Value `property`

##### Summary

The value of the Deployment Secret.

### Validate() `method`

##### Summary

Validate the deployment creation parameters.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [System.ArgumentException](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.ArgumentException "System.ArgumentException") |  |

## DeploymentSecretsAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Deployment Secrets API Resource

### Create(deploymentId,deploymentSecretCreate) `method`

##### Summary

Create a deployemnt secret

##### Returns

A Task that resolves to the created deployment secret on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |
| deploymentSecretCreate | [TrimbleCloud.Processing.Model.DeploymentSecretCreate](#T-TrimbleCloud-Processing-Model-DeploymentSecretCreate "TrimbleCloud.Processing.Model.DeploymentSecretCreate") | The value of the deployment secret to create |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a deployment secret cannot be created |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") | Thrown when the deployment secret is invalid |

### Delete(deploymentId,deploymentSecretId) `method`

##### Summary

Delete a deployment secret

##### Returns

An awaitiable Task

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |
| deploymentSecretId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment secret to delete |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an deployment secret cannot be deleted |

### Get(deploymentId,deploymentSecretId) `method`

##### Summary

Get deployment secret by id

##### Returns

A Task that resolves to the requested deployment secret on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |
| deploymentSecretId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment secret to read |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when deployment secret cannot be read |

### GetList(deploymentId) `method`

##### Summary

Get a list of deployment secret

##### Returns

An asynchronous list of deployment secrets for the deployment

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |

### List(deploymentId,page,pageSize) `method`

##### Summary

Get a list of deployment secrets

##### Returns

An asynchronous list of deployment secrets for the deployment

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |

### Retire(deploymentId,deploymentSecretId) `method`

##### Summary

Retire a deployment secret

##### Returns

A Task that resolves to the retired deployment secret on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |
| deploymentSecretId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment secret to retire |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when deployment secret cannot be retired |

### Update(deploymentId,deploymentSecretId,deploymentSecretUpdate) `method`

##### Summary

Update a deployment secret

##### Returns

A Task that resolves to the updated deployment secret on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the deployment |
| deploymentSecretId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment secret to update |
| deploymentSecretUpdate | [TrimbleCloud.Processing.Model.DeploymentSecretUpdate](#T-TrimbleCloud-Processing-Model-DeploymentSecretUpdate "TrimbleCloud.Processing.Model.DeploymentSecretUpdate") | The value of the deployment secret to update |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when deployment secret cannot be updated |

## DeploymentStatus `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Deployment status

### AVAILABLE `constants`

##### Summary

available

### DELETING `constants`

##### Summary

Deleting

### FAILED `constants`

##### Summary

failed

### PREPARING `constants`

##### Summary

Preparing

### RETIRED `constants`

##### Summary

retired

### RETIRING `constants`

##### Summary

being retired

### SUBMITTED `constants`

##### Summary

submitted

### UPDATING `constants`

##### Summary

Updating

## DeploymentUpdate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the updation parameters for the deployment.

### AutoScaling `property`

##### Summary

Auto scaling configuration

### Compute `property`

##### Summary

The configuration object to define the Engine-compute resources for memory and CPU allocation.

### Description `property`

##### Summary

Deployment description

### EngineId `property`

##### Summary

The Engine ID that is connected to this Deployment.

### Name `property`

##### Summary

The name of the Deployment. Max 64 chars

### Regions `property`

##### Summary

The region this Deployment can run in

### Validate() `method`

##### Summary

Validate the deployment updation parameters.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [System.ArgumentException](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.ArgumentException "System.ArgumentException") |  |

## DeploymentsAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Deployments API Resource

### Create(deploymentCreate) `method`

##### Summary

Create a deployment

##### Returns

A Task that resolves to the created deployment on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| deploymentCreate | [TrimbleCloud.Processing.Model.DeploymentCreate](#T-TrimbleCloud-Processing-Model-DeploymentCreate "TrimbleCloud.Processing.Model.DeploymentCreate") | The value of the deployment to create |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an deployment cannot be created |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") | Thrown when the deployment creation parameters are invalid |

### Get(id) `method`

##### Summary

Get deployment by id

##### Returns

A Task that resolves to the requested deployment on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment to read |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when the deployment cannot be read |

### GetList(engineId) `method`

##### Summary

Get a list of deployments

##### Returns

An asynchronous list of deployments

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| engineId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The id of the engine |

### List(page,pageSize,filters) `method`

##### Summary

Get a list of deployments

##### Returns

An asynchronous list of deployments

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |
| filters | [TrimbleCloud.Processing.Model.DeploymentListFilter](#T-TrimbleCloud-Processing-Model-DeploymentListFilter "TrimbleCloud.Processing.Model.DeploymentListFilter") | The filters to apply |

### Retire(id) `method`

##### Summary

Retire a Deployment

##### Returns

A Task that resolves to the retired deployment on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment to retire |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a deployment cannot be retired |

### Update(id,deploymentUpdate) `method`

##### Summary

Update a deployment

##### Returns

A Task that resolves to the updated deployment on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the deployment to update |
| deploymentUpdate | [TrimbleCloud.Processing.Model.DeploymentUpdate](#T-TrimbleCloud-Processing-Model-DeploymentUpdate "TrimbleCloud.Processing.Model.DeploymentUpdate") | The value of the deployment to update |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when the deployment cannot be updated |

## Engine `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the creation parameters for an engine.

### ContainerUpload `property`

##### Summary

Container upload

### Description `property`

##### Summary

Engine description

### EnvironmentVariables `property`

##### Summary

Environment variables that are stored and ingested into the Engine's container

### Identifier `property`

##### Summary

Engine identifier, unique within the system

### IngestionType `property`

##### Summary

Engine ingestion type. Currently the only option is a temporary ACR token upload

### Name `property`

##### Summary

The name of the Engine. Max 64 chars

### OSBuild `property`

##### Summary

Engine OS build. Specify which OS build to use. This is a required parameter for Windows Engines only. At this time, the Engines API directly supports Windows Server 2019 (10.0.17763), and can optionally support Windows Server 2022 (10.0.20348). If the latter is needed, please contact the team for assistance. Windows Server 2019 Windows Server 2022

### OSType `property`

##### Summary

Engine OS type

### Owner `property`

##### Summary

The owner of the Engine

### Regions `property`

##### Summary

Engine region

### SecretFiles `property`

##### Summary

Secret files

### SecretVariables `property`

##### Summary

Secret variables

### Status `property`

##### Summary

Engine status

### Tag `property`

##### Summary

Engine tag

### Trn `property`

##### Summary

TRN value of the Engine

## EngineCreate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the creation parameters for an engine.

### Description `property`

##### Summary

Engine description

### EnvironmentVariables `property`

##### Summary

Environment variables that are stored and ingested into the Engine's container

### Identifier `property`

##### Summary

Engine identifier, unique within the system

### IngestionType `property`

##### Summary

Engine ingestion type. Currently the only option is a temporary ACR token upload

### Name `property`

##### Summary

The name of the Engine. Max 64 chars

### OSBuild `property`

##### Summary

Engine OS build. Specify which OS build to use. This is a required parameter for Windows Engines only. At this time, the Engines API directly supports Windows Server 2019 (10.0.17763), and can optionally support Windows Server 2022 (10.0.20348). If the latter is needed, please contact the team for assistance. Windows Server 2019 Windows Server 2022

### OSType `property`

##### Summary

Engine OS type

### Regions `property`

##### Summary

Engine region

### SecretFiles `property`

##### Summary

Secret files

### SecretVariables `property`

##### Summary

Secret variables

### Tag `property`

##### Summary

Engine tag

### Validate() `method`

##### Summary

Validate the engine creation parameters.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [System.ArgumentException](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.ArgumentException "System.ArgumentException") |  |

## EngineListFilter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Create Engine List Filters

### OSType `property`

##### Summary

Filters a resource based on the Operating System name.

### Owner `property`

##### Summary

Filters a resource based on the owner name.

### Status `property`

##### Summary

Filters a resource based on execution status.

## EngineStatus `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Engine status

### AVAILABLE `constants`

##### Summary

Engine is available

### AWAITING\_IMAGE\_UPLOAD `constants`

##### Summary

Awaiting image upload

### FAILED `constants`

##### Summary

Engine is failed

### GENERATING\_TOKEN `constants`

##### Summary

Generating token

### PREPARING `constants`

##### Summary

Image uploaded

### RETIRED `constants`

##### Summary

Engine is retired

### RETIRING `constants`

##### Summary

Engine is being retired

### SUBMITTED `constants`

##### Summary

Engine is submitted

## EngineUpdate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the updation parameters for an engine.

### Description `property`

##### Summary

Engine description

### Name `property`

##### Summary

The name of the Engine. Max 64 chars

### Validate() `method`

##### Summary

Validate the engine creation parameters.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") |  |

## EnginesAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Engines API Resource

### Create(engineCreate) `method`

##### Summary

Create an engine

##### Returns

A Task that resolves to the created engine on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| engineCreate | [TrimbleCloud.Processing.Model.EngineCreate](#T-TrimbleCloud-Processing-Model-EngineCreate "TrimbleCloud.Processing.Model.EngineCreate") | The value of the engine to create |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an engine cannot be created |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") | Thrown when the engine update is invalid |

### Get(id) `method`

##### Summary

Get an engine by id

##### Returns

A Task that resolves to the requested engine on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the engine to read |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an engine cannot be read |

### GetList() `method`

##### Summary

Get a list of engines

##### Returns

An asynchronous list of engines

##### Parameters

This method has no parameters.

### List(page,pageSize,filters) `method`

##### Summary

Get a list of engines

##### Returns

An asynchronous list of engines

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |
| filters | [TrimbleCloud.Processing.Model.EngineListFilter](#T-TrimbleCloud-Processing-Model-EngineListFilter "TrimbleCloud.Processing.Model.EngineListFilter") | The filters to apply |

### Retire(id) `method`

##### Summary

Retire an engine

##### Returns

A Task that resolves to the retired engine on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the engine to retire |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an engine cannot be retired |

### Update(id,engineUpdate) `method`

##### Summary

Update an engine

##### Returns

A Task that resolves to the updated engine on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the engine to update |
| engineUpdate | [TrimbleCloud.Processing.Model.EngineUpdate](#T-TrimbleCloud-Processing-Model-EngineUpdate "TrimbleCloud.Processing.Model.EngineUpdate") | The value of the engine to update |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an engine cannot be updated |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") | Thrown when the engine update is invalid |

## EnumHelper`1 `type`

##### Namespace

TrimbleCloud.Processing.Helper

##### Summary

Helper class for Enum

### GetEnumMemberValue() `method`

##### Summary

Get the EnumMember value of an Enum

##### Parameters

This method has no parameters.

## EnvironmentVariable `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents the environment variables.

### Name `property`

##### Summary

The name of the environment variable.

### Value `property`

##### Summary

The value of the environment variable.

### Validate() `method`

##### Summary

Validate the environment variables.

##### Parameters

This method has no parameters.

## Execution `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Execution model

### BoundParameters `property`

##### Summary

Mapping of Operation-specified output parameter names to output parameter values. This is where Operation output parameters are written once an Operation within the Execution completes.

### CompletedAt `property`

##### Summary

The time the execution is completed

### DataExport `property`

##### Summary

Whether or not the execution's data will be available for export. Default to false.

### FailedAt `property`

##### Summary

The time the execution is failed

### Metadata `property`

##### Summary

The metadata of the execution.

### Parameters `property`

##### Summary

Mapping of Procedure-specified parameter names to parameter values.

### ProcedureId `property`

##### Summary

ID of the procedure to execute.

### ProcedureIdentifier `property`

##### Summary

The identifier of the Procedure that supports this Operation.

### ProcedureVersion `property`

##### Summary

The version of the Procedure that supports this Operation.

### Region `property`

##### Summary

region where the execution will be run.

### Status `property`

##### Summary

Execution status

### SubmittedAt `property`

##### Summary

The time the execution was submitted

## ExecutionActivity `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Execution Activity response class model

### ActivityId `property`

##### Summary

Activity Id

### HistoricalInfo `property`

##### Summary

Historical Information about the activity

## ExecutionCreate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

ExecutionCreate

### BoundParameters `property`

##### Summary

Mapping of Operation-specified output parameter names to output parameter values. This is where Operation output parameters are written once an Operation within the Execution completes.

### DataExport `property`

##### Summary

Whether or not the execution's data will be available for export. Default to false.

### Metadata `property`

##### Summary

The metadata of the execution.

### Parameters `property`

##### Summary

Mapping of Procedure-specified parameter names to parameter values.

### ProcedureId `property`

##### Summary

ID of the procedure to execute.

### ProcedureIdentifier `property`

##### Summary

The identifier of the Procedure that supports this Operation.

### ProcedureVersion `property`

##### Summary

The version of the Procedure that supports this Operation.

### Region `property`

##### Summary

region where the execution will be run.

### ToJson() `method`

##### Summary

Converts the object to a JSON string

##### Parameters

This method has no parameters.

### Validate() `method`

##### Summary

Validate the creation of an execution

##### Parameters

This method has no parameters.

## ExecutionEvent `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Execution Event response class model

### Contents `property`

##### Summary

The type of Execution Event that is being described. It can be either object or string.

### CreatedAt `property`

##### Summary

Created At

### Type `property`

##### Summary

The type of Execution Event that is being described.

### UpdatedAt `property`

##### Summary

Updated At

## ExecutionListFilter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Execution List Filters

### CompletedAfter `property`

##### Summary

Filter results that have a completed\_at time that is after the supplied value.

### CompletedBefore `property`

##### Summary

Filter results that have a completed\_at time that is before the supplied value.

### CreatedAfter `property`

##### Summary

Filter results that have a created\_at time that is after the supplied value.

### CreatedBefore `property`

##### Summary

Filter results that have a created\_at time that is before the supplied value.

### ExecutionStatus `property`

##### Summary

Filters a resource based on execution status.

### ProcedureId `property`

##### Summary

Filters a resource based on the procedure identifier.

## ExecutionProgressStatus `type`

##### Namespace

TrimbleCloud.Processing.Model.Execution

##### Summary

Execution status enumeration

### EXECUTING `constants`

##### Summary

Execution is currently being executed

### FAILED `constants`

##### Summary

Execution has failed

### FINISHED `constants`

##### Summary

Execution has been completed

### QUEUED `constants`

##### Summary

Execution is queued

### SUBMITTED `constants`

##### Summary

Execution has been submitted and is waiting to be processed

### UNSUBMITTED `constants`

##### Summary

Execution has not been submitted yet

### WAITING `constants`

##### Summary

Execution is currently being waited

## ExecutionStatus `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

The execution status of the operation.

### NOT\_READY `constants`

##### Summary

This Operation cannot be used to create any Procedures and thus cannot be part of an execution.

### READY `constants`

##### Summary

This Operation can now by used to create Procedures and thus be part of executions.

### SUSPENDED `constants`

##### Summary

The processing of this Operation has been suspended and cannot be part of executions.

## ExecutionsAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

API Methods relating to Trimble Cloud Platform Processing Framework executions

### Create(executionCreate) `method`

##### Summary

Create an execution

##### Returns

A Task that resolves to the created execution on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| executionCreate | [TrimbleCloud.Processing.Model.ExecutionCreate](#T-TrimbleCloud-Processing-Model-ExecutionCreate "TrimbleCloud.Processing.Model.ExecutionCreate") | The value of the execution to create |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an execution cannot be created |

### Get(id) `method`

##### Summary

Get an execution by id

##### Returns

A Task that resolves to the requested execution on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the execution to read |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an execution cannot be read |

### List(page,pageSize,filters) `method`

##### Summary

Get a list of executions

##### Returns

An asynchronous list of executions

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number to retrieve |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |
| filters | [TrimbleCloud.Processing.Model.ExecutionListFilter](#T-TrimbleCloud-Processing-Model-ExecutionListFilter "TrimbleCloud.Processing.Model.ExecutionListFilter") | The filters to apply to the list |

### ListActivities(executionId,page,pageSize) `method`

##### Summary

Get a list of execution activities

##### Returns

An asynchronous list of execution activities

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| executionId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the execution to retrieve activities for |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number to retrieve |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |

### ListEvents(executionId,page,pageSize) `method`

##### Summary

Get the events tied to an Execution. Events are logged by the Log Events for an Execution request.

##### Returns

An asynchronous list of execution events

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| executionId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the execution to retrieve activities for |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number to retrieve |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |

## HistoricalInfo `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Historical Info class

### ActivityTaskCompleted `property`

##### Summary

Activity Task Completed

### ActivityTaskScheduled `property`

##### Summary

Activity Task Scheduled

### ActivityTaskStarted `property`

##### Summary

Activity Task Started

## IPage`1 `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Defines a page interface

##### Generic Types

| Name | Description |
| --- | --- |
| T | The type of item in the page. |

### CurrentPage `property`

##### Summary

The number of items in the page.

### Items `property`

##### Summary

The items in the page.

### PageSize `property`

##### Summary

The number of items per page.

### TotalItems `property`

##### Summary

The total number of items available.

### TotalPages `property`

##### Summary

The total number of pages available.

## IngestionType `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Ingestion type

### ACRToken `constants`

##### Summary

A unique and temporary ACR token will be generated on your behalf so that you may upload a container image into our system. The API will provide a set of commands in the 'container\_upload' object that will allow you login and upload your container image.

## Input `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Input parameters for an operation

### DataTypes `property`

##### Summary

List of accepted input data types.

### Description `property`

##### Summary

Description of the input

### Name `property`

##### Summary

Name of the input

### Optional `property`

##### Summary

Is the parameter optional. Defaults to false

### Validate() `method`

##### Summary

Validate the inputs

##### Parameters

This method has no parameters.

## ListFilterBase `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

List Filter Base

### Identifier `property`

##### Summary

Identifier of the resource

### Region `property`

##### Summary

Region

## OSType `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

OS Type

### Linux `constants`

##### Summary

Create a linux Engine.

### Windows `constants`

##### Summary

Create a windows Engine.

## OpInput `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Operation input class

## OpInput `type`

##### Namespace

TrimbleCloud.Processing.Model.Procedure.OperationChain

##### Summary

Operation input class

### DataTypes `property`

### Sources `property`

### DataTypes `property`

### Sources `property`

## OpOutput `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Operation output class

## OpOutput `type`

##### Namespace

TrimbleCloud.Processing.Model.Procedure.OperationChain

##### Summary

Operation output class

### DataType `property`

### Description `property`

### Name `property`

### DataType `property`

### Description `property`

### Name `property`

## OpParamater `type`

##### Namespace

TrimbleCloud.Processing.Model.Procedure.OperationChain

##### Summary

Operation parameter class

### Optional `property`

##### Summary

Is the parameter optional. Defaults to false

### Source `property`

##### Summary

The source of the Operation parameter

## OpParameter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Operation parameter class

### Optional `property`

##### Summary

Is the parameter optional. Defaults to false

### Source `property`

##### Summary

The source of the Operation parameter

## Operation `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Operation model

### DeploymentIdentifier `property`

##### Summary

The identifier of the Deployment that supports this Operation.

### DeprecationMessage `property`

##### Summary

Message given to indicate impending retirement/deprecation

### Description `property`

##### Summary

The description of the operation.

### DynamicOutput `property`

##### Summary

Indicates whether or not the Output content is considered dynamic or not. In all cases except for the Switcher Operation, this will be false

### EngineName `property`

##### Summary

The name of the backend engine that supports this Operation. (Deprecated: Use DeploymentIdentifier instead.)

### ExecutionStatus `property`

##### Summary

The execution status of the operation.

### Identifier `property`

##### Summary

The identifier of the operation.

### Inputs `property`

##### Summary

Named inputs for the Operation. This is an object containing one or more inputs that describe the data types which will be accepted as input to the Operation.

### IsPublic `property`

##### Summary

The state of the Operation's publication. If true, the Operation is available for public use. This is not unlike sharing it with every other User in the system. If this field is false, then it follows the normal rules with regard to sharing and individual ownership.

### Name `property`

##### Summary

The name of the operation.

### OutputParameters `property`

##### Summary

A list of parameter objects that define values to be output from an Operation.

### Outputs `property`

##### Summary

Named outputs for the Operation. This is an object containing one or more outputs that emit data. Each such output specifies a single output data type.

### Owner `property`

##### Summary

The owner of the Operation

### Parameters `property`

##### Summary

A list of parameter objects attached to the Operation.

### Regions `property`

##### Summary

Allowable locations that a particular Operation can run in.

### RetriedAfter `property`

##### Summary

Timestamp indicating when this Operation will move to RETIRED status, and will no longer be executable

### SharedWith `property`

##### Summary

List of names of Users with whom this Operation has been shared.

### Status `property`

##### Summary

The status of the operation.

### Version `property`

##### Summary

The version of the operation.

## OperationChain `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

OperationChain class

## OperationChain `type`

##### Namespace

TrimbleCloud.Processing.Model.Procedure

##### Summary

OperationChain class

### Description `property`

##### Summary

The description of the operation.

### EngineName `property`

##### Summary

name of the Engine

### Identifier `property`

##### Summary

The identifier of the operation.

### Inputs `property`

### Name `property`

##### Summary

The name of the operation.

### OutputParameters `property`

##### Summary

A list of parameter objects that define values to be output from an Operation.

### Outputs `property`

### Parameters `property`

### Version `property`

##### Summary

The version of the operation.

### Description `property`

##### Summary

The description of the operation.

### EncryptedParameters `property`

##### Summary

List of encrypted parameters

### EngineName `property`

##### Summary

name of the Engine

### Identifier `property`

##### Summary

The identifier of the operation.

### Inputs `property`

### Name `property`

##### Summary

The name of the operation.

### OutputParameters `property`

##### Summary

A list of parameter objects that define values to be output from an Operation.

### Outputs `property`

### Parameters `property`

### Version `property`

##### Summary

The version of the operation.

### Validate() `method`

##### Summary

Validate the Operation object.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") |  |

## OperationCreate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents OperationCreate.

### DeploymentIdentifier `property`

##### Summary

The identifier of the Deployment that supports this Operation.

### Description `property`

##### Summary

The description of the operation.

### DynamicOutput `property`

##### Summary

Indicates whether or not the Output content is considered dynamic or not. In all cases except for the Switcher Operation, this will be false

### EngineName `property`

##### Summary

The name of the backend engine that supports this Operation. (Deprecated: Use DeploymentIdentifier instead.)

### Identifier `property`

##### Summary

The identifier of the operation.

### Inputs `property`

##### Summary

Named inputs for the Operation. This is an object containing one or more inputs that describe the data types which will be accepted as input to the Operation.

### IsPublic `property`

##### Summary

The state of the Operation's publication. If true, the Operation is available for public use. This is not unlike sharing it with every other User in the system. If this field is false, then it follows the normal rules with regard to sharing and individual ownership.

### Name `property`

##### Summary

The name of the operation.

### OutputParameters `property`

##### Summary

A list of parameter objects that define values to be output from an Operation.

### Outputs `property`

##### Summary

Named outputs for the Operation. This is an object containing one or more outputs that emit data. Each such output specifies a single output data type.

### Parameters `property`

##### Summary

A list of parameter objects attached to the Operation.

### Regions `property`

##### Summary

Allowable locations that a particular Operation can run in.

### SharedWith `property`

##### Summary

List of names of Users with whom this Operation has been shared.

### Version `property`

##### Summary

The version of the operation.

### Validate() `method`

##### Summary

Validate the operation creation parameters.

##### Parameters

This method has no parameters.

## OperationListFilter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Operation List Filters

### DeploymentIdentifier `property`

##### Summary

Filters a resource based on the Deployment identifier.

### EngineName `property`

##### Summary

Filters a resource based on the Engine name.

### ExecutionStatus `property`

##### Summary

Filters a resource based on execution status.

### ProcedureId `property`

##### Summary

Filters a resource based on the Procedure identifier.

### Public `property`

##### Summary

Filters results by public status

### Status `property`

##### Summary

Filters a resource based on status

## OperationUpdate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents OperationUpdate.

### DeploymentIdentifier `property`

##### Summary

The identifier of the Deployment that supports this Operation.

### Description `property`

##### Summary

The description of the operation.

### DynamicOutput `property`

##### Summary

Indicates whether or not the Output content is considered dynamic or not. In all cases except for the Switcher Operation, this will be false

### EngineName `property`

##### Summary

The name of the backend engine that supports this Operation. (Deprecated: Use DeploymentIdentifier instead.)

### Identifier `property`

##### Summary

The identifier of the operation.

### Inputs `property`

##### Summary

Named inputs for the Operation. This is an object containing one or more inputs that describe the data types which will be accepted as input to the Operation.

### IsPublic `property`

##### Summary

The state of the Operation's publication. If true, the Operation is available for public use. This is not unlike sharing it with every other User in the system. If this field is false, then it follows the normal rules with regard to sharing and individual ownership.

### Name `property`

##### Summary

The name of the operation.

### OutputParameters `property`

##### Summary

A list of parameter objects that define values to be output from an Operation.

### Outputs `property`

##### Summary

Named outputs for the Operation. This is an object containing one or more outputs that emit data. Each such output specifies a single output data type.

### Parameters `property`

##### Summary

A list of parameter objects attached to the Operation.

### Regions `property`

##### Summary

Allowable locations that a particular Operation can run in.

### SharedWith `property`

##### Summary

List of names of Users with whom this Operation has been shared.

### Version `property`

##### Summary

The version of the operation.

### Validate() `method`

##### Summary

Validate the operation creation parameters.

##### Parameters

This method has no parameters.

## OperationsAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

API Methods relating to Trimble Cloud Platform Processing Framework operations

### Approve(id) `method`

##### Summary

Approve an operation

##### Returns

A Task that resolves to the approved operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to approve |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be approved |

### Clone(id) `method`

##### Summary

Clone an operation

##### Returns

A Task that resolves to the newly cloned operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to clone |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be cloned |

### Create(operationCreate) `method`

##### Summary

Create an operation

##### Returns

A Task that resolves to the created operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| operationCreate | [TrimbleCloud.Processing.Model.OperationCreate](#T-TrimbleCloud-Processing-Model-OperationCreate "TrimbleCloud.Processing.Model.OperationCreate") | The value of the operation to create |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when an operation cannot be created |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") | Thrown when the operation update is invalid |

### Delete(id) `method`

##### Summary

Delete an operation

##### Returns

An awaitiable Task

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to delete |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be deleted |

### Get(id) `method`

##### Summary

Get an operation by id

##### Returns

A Task that resolves to the requested operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to read |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be read |

### GetList(include\_public) `method`

##### Summary

Get a list of operations

##### Returns

An asynchronous list of operations

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| include\_public | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean "System.Boolean") | Whether to include public operations in the returned list |

### List(page,pageSize,filters) `method`

##### Summary

Get a list of operations

##### Returns

An asynchronous list of operations

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number to retrieve |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |
| filters | [TrimbleCloud.Processing.Model.OperationListFilter](#T-TrimbleCloud-Processing-Model-OperationListFilter "TrimbleCloud.Processing.Model.OperationListFilter") | The filters to apply to the list |

### Publish(id) `method`

##### Summary

Publish an operation

##### Returns

A Task that resolves to the published operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to publish |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be published |

### Retire(id) `method`

##### Summary

Retire an operation

##### Returns

A Task that resolves to the retired operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to retire |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be retired |

### Update(id,operationUpdate) `method`

##### Summary

Update an operation

##### Returns

A Task that resolves to the updated operation on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the operation to update |
| operationUpdate | [TrimbleCloud.Processing.Model.OperationUpdate](#T-TrimbleCloud-Processing-Model-OperationUpdate "TrimbleCloud.Processing.Model.OperationUpdate") | The value of the operation to update |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a operation cannot be updated |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") | Thrown when the operation update is invalid |

## Output `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Input parameters for an operation

### DataType `property`

##### Summary

Type of data output from the Operation

### Description `property`

##### Summary

Description of the output

### Name `property`

##### Summary

Name of the output

### Validate() `method`

##### Summary

Validate the output

##### Parameters

This method has no parameters.

## OutputParameter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents a OutputParameter.

### Description `property`

##### Summary

A description of the parameter

### Name `property`

##### Summary

Human-readable name for the parameter.

### Optional `property`

##### Summary

Is the parameter optional. Defaults to false

### Type `property`

##### Summary

The type of the parameter.

### Validate() `method`

##### Summary

Validate the parameter.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") |  |

## Page`1 `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Defines a page in responses.

##### Generic Types

| Name | Description |
| --- | --- |
| T | Type of the page content items |

### CurrentPage `property`

##### Summary

The number of items in the page.

### Items `property`

##### Summary

The items in the page.

### PageSize `property`

##### Summary

The number of items per page.

### TotalItems `property`

##### Summary

The total number of items available.

### TotalPages `property`

##### Summary

The total number of pages available.

### GetEnumerator() `method`

##### Summary

Returns an enumerator that iterates through the collection.

##### Returns

A an enumerator that can be used to iterate through the collection.

##### Parameters

This method has no parameters.

### System#Collections#IEnumerable#GetEnumerator() `method`

##### Summary

Returns an enumerator that iterates through the collection.

##### Returns

A an enumerator that can be used to iterate through the collection.

##### Parameters

This method has no parameters.

## Parameter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents a parameter.

### Description `property`

##### Summary

A description of the parameter

### Encrypted `property`

##### Summary

Indicates that the parameter contains sensitive information. Defaults to false

### Name `property`

##### Summary

Human-readable name for the parameter.

### Optional `property`

##### Summary

Is the parameter optional. Defaults to false

### Type `property`

##### Summary

The type of the parameter.

### Validate() `method`

##### Summary

Validate the parameter.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") |  |

## Procedure `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Procedure model

### DefaultRegion `property`

##### Summary

The default region for the Procedure

### Description `property`

##### Summary

Description of the Procedure

### DocumentationUrl `property`

##### Summary

URL to external documentation for the Procedure

### ExecutionStatus `property`

##### Summary

The execution status of the Procedure

### Identifier `property`

##### Summary

Identifier of the Procedure

### IsPublic `property`

##### Summary

IsPublic

### Name `property`

##### Summary

The name of the Procedure

### Operations `property`

##### Remarks

This is the definition of Procedure contents and how inputs & outputs are linked together between individual Operations

### Owner `property`

##### Summary

The owner of the Procedure

### Parameters `property`

##### Remarks

The user will specify parameter values via these mapping names

### Regions `property`

##### Summary

regions

### RetriedAfter `property`

##### Summary

Timestamp indicating when this Operation will move to RETIRED status, and will no longer be executable

### SharedWith `property`

##### Summary

List of names of Users with whom this Operation has been shared.

### Status `property`

##### Summary

The status of the Procedure

### Tags `property`

##### Summary

List of tags (as strings) associated with the Procedure.

### Version `property`

##### Summary

The version of the Procedure

## ProcedureCreate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

ProcedureCreate model

### DefaultRegion `property`

##### Summary

The default region for the Procedure

### Description `property`

##### Summary

Description of the Procedure

### DocumentationUrl `property`

##### Summary

URL to external documentation for the Procedure

### Identifier `property`

##### Summary

Identifier of the Procedure

### Name `property`

##### Summary

The name of the Procedure

### Operations `property`

##### Remarks

This is the definition of Procedure contents and how inputs & outputs are linked together between individual Operations

### ProcedureParameters `property`

##### Remarks

The user will specify parameter values via these mapping names

### SharedWith `property`

##### Summary

List of names of Users with whom this Operation has been shared.

### Tags `property`

##### Summary

List of tags (as strings) associated with the Procedure.

### Version `property`

##### Summary

The version of the Procedure

### Validate() `method`

##### Summary

Validate the ProcedureCreate object.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") |  |

## ProcedureListFilter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Procedure List Filters

### ExecutionStatus `property`

##### Summary

Filters a resource based on execution status.

### OperationId `property`

##### Summary

Filters a resource based on the operation id.

### Public `property`

##### Summary

Filters results by public status

### Status `property`

##### Summary

Filters a resource based on status

## ProcedureParameter `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Parmeter class

### DefaultValue `property`

### Description `property`

### Name `property`

### Source `property`

### Type `property`

### Value `property`

## ProcedureUpdate `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

ProcedureUpdate model

### DefaultRegion `property`

##### Summary

The default region for the Procedure

### Description `property`

##### Summary

Description of the Procedure

### DocumentationUrl `property`

##### Summary

URL to external documentation for the Procedure

### Identifier `property`

##### Summary

Identifier of the Procedure

### Name `property`

##### Summary

The name of the Procedure

### Operations `property`

##### Remarks

This is the definition of Procedure contents and how inputs & outputs are linked together between individual Operations

### ProcedureParameters `property`

##### Remarks

The user will specify parameter values via these mapping names

### SharedWith `property`

##### Summary

List of names of Users with whom this Operation has been shared.

### Tags `property`

##### Summary

List of tags (as strings) associated with the Procedure.

### Version `property`

##### Summary

The version of the Procedure

### Validate() `method`

##### Summary

Validate the ProcedureCreate object.

##### Parameters

This method has no parameters.

##### Exceptions

| Name | Description |
| --- | --- |
| [TrimbleCloud.Processing.ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") |  |

## ProceduresAPI `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

API Methods relating to Trimble Cloud Platform Processing Framework procedures

### Approve(id) `method`

##### Summary

Approve a procedure

##### Returns

A Task that resolves to the approved procedure on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the procedure to approve |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be approved |

### Create(procedureCreate) `method`

##### Summary

Create a procedure

##### Returns

A Task that resolves to the created procedure on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| procedureCreate | [TrimbleCloud.Processing.Model.ProcedureCreate](#T-TrimbleCloud-Processing-Model-ProcedureCreate "TrimbleCloud.Processing.Model.ProcedureCreate") | The value of the procedure to create |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be created |

### Delete(id) `method`

##### Summary

Delete a procedure

##### Returns

An awaitiable Task

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the procedure to delete |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be deleted |

### Get(id) `method`

##### Summary

Get a procedure by id

##### Returns

A Task that resolves to the requested procedure on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the procedure to read |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be read |

### GetList(include\_public) `method`

##### Summary

Get a list of procedures

##### Returns

An asynchronous list of procedures

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| include\_public | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean "System.Boolean") | Whether to include public procedures in the returned list |

### List(page,pageSize,filters) `method`

##### Summary

Get a list of procedures

##### Returns

An asynchronous list of procedures

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The page number to retrieve |
| pageSize | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 "System.Int32") | The number of items per page |
| filters | [TrimbleCloud.Processing.Model.ProcedureListFilter](#T-TrimbleCloud-Processing-Model-ProcedureListFilter "TrimbleCloud.Processing.Model.ProcedureListFilter") | The filters to apply to the list |

### Publish(id) `method`

##### Summary

Publish a procedure

##### Returns

A Task that resolves to the published procedure on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the procedure to publish |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be published |

### Retire(id) `method`

##### Summary

Retire a procedure

##### Returns

A Task that resolves to the retired procedure on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the procedure to retire |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be retired |

### Update(id,procedureUpdate) `method`

##### Summary

Update a procedure

##### Returns

A Task that resolves to the updated procedure on completion

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| id | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | The identifier of the procedure to update |
| procedureUpdate | [TrimbleCloud.Processing.Model.ProcedureUpdate](#T-TrimbleCloud-Processing-Model-ProcedureUpdate "TrimbleCloud.Processing.Model.ProcedureUpdate") | The value of the procedure to update |

##### Exceptions

| Name | Description |
| --- | --- |
| [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Thrown when a procedure cannot be updated |

## ProcessingClient `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

A client for the Trimble Cloud Platform Processing Framework

##### Example

```
const TOKEN = "...";
const BASE_URL = "https://api-usw2.trimblepaas.com/processing-v1.0";
var tokenProvider = new FixedTokenProvider(TOKEN);
var httpclientProvider = new BearerTokenHttpClientProvider(tokenProvider, new Uri(BASE_URL, UriKind.Absolute));
var processingClient = new ProcessingClient(httpclientProvider);
var operations = await processingClient.Operations.GetList().GetItems();
var procedures = await processingClient.Procedures.GetList().GetItems();
var execution = await processingClient.Executions.Create(new Execution() { ... });
var engine = await processingClient.Engines.Create(new Engine() { ... });
var engineVersion = await processingClient.EngineVersions.Create(engineId, new EngineVersion() { ... });
var engineSecret = await processingClient.EngineSecrets.Read(id, engineId);
```

### #ctor(clientProvider) `constructor`

##### Summary

Public constructor for a Processing Client

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| clientProvider | [Trimble.ID.IHttpClientProvider](#T-Trimble-ID-IHttpClientProvider "Trimble.ID.IHttpClientProvider") | A provider of a pre-configured HttpClient used for API calls made by this client |

### \_clientProvider `constants`

### DeploymentSecrets `property`

### Deployments `property`

### Engines `property`

### Executions `property`

### Operations `property`

### Procedures `property`

## QueryStringFormatter`1 `type`

##### Namespace

TrimbleCloud.Processing.Helper

##### Summary

Query String Formatter

### ToQueryString() `method`

##### Summary

Convert the filter to query string

##### Parameters

This method has no parameters.

## Region `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Region

### AzureUS1 `constants`

##### Summary

Azure US1

## Resource `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Represents a resource.

### CreatedAt `property`

##### Summary

Resouce creation date time

### Id `property`

##### Summary

Gets resource Id

### UpdatedAt `property`

##### Summary

Resouce updation date time

## Response `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Represents a response.

### ContentLength `property`

##### Summary

Returns the content length of the HTTP response.

### IsError `property`

##### Summary

Indicates whether the status code of the returned response is considered
an error code.

### Metadata `property`

##### Summary

Get the HTTP response headers.

### ReasonPhrase `property`

##### Summary

Gets the HTTP reason phrase.

### RequestId `property`

##### Summary

Gets the client request id that was sent to the server as `tcp-request-id` headers.

### Status `property`

##### Summary

Gets the HTTP status code.

### Dispose() `method`

##### Summary

Frees resources held by this [Response](#T-TrimbleCloud-Processing-Response "TrimbleCloud.Processing.Response") instance.

##### Parameters

This method has no parameters.

### FromValue``1(value,response) `method`

##### Summary

Creates a new instance of [Response`1](#T-TrimbleCloud-Processing-Response1 'TrimbleCloud.Processing.Response1') with the provided value and HTTP response.

##### Returns

A new instance of [Response`1](#T-TrimbleCloud-Processing-Response1 'TrimbleCloud.Processing.Response1') with the provided value and HTTP response.

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| value | [``0](#T-0 '0') | The value. |
| response | [TrimbleCloud.Processing.Response](#T-TrimbleCloud-Processing-Response "TrimbleCloud.Processing.Response") | The HTTP response. |

##### Generic Types

| Name | Description |
| --- | --- |
| T | The type of the value. |

### ToString() `method`

##### Summary

Returns the string representation of this [Response](#T-TrimbleCloud-Processing-Response "TrimbleCloud.Processing.Response").

##### Returns

The string representation of this [Response](#T-TrimbleCloud-Processing-Response "TrimbleCloud.Processing.Response")

##### Parameters

This method has no parameters.

## Response`1 `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Represents a response.

##### Generic Types

| Name | Description |
| --- | --- |
| T | The type of returned value. |

### Data `property`

##### Summary

Gets the value returned by the service. Accessing this property will throw if [HasData](#P-TrimbleCloud-Processing-Response1-HasData 'TrimbleCloud.Processing.Response1.HasData') is false.

### HasData `property`

##### Summary

Gets a value indicating whether the current instance has a valid value of its underlying type.

### GetResponse() `method`

##### Summary

Get HTTP raw response

##### Parameters

This method has no parameters.

### op\_Implicit(response) `method`

##### Summary

Returns the value of this [Response`1](#T-TrimbleCloud-Processing-Response1 'TrimbleCloud.Processing.Response1') object.

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| response | [TrimbleCloud.Processing.Response{`0})~`0](#T-TrimbleCloud-Processing-Response{0}-~0 "TrimbleCloud.Processing.Response{0})~0") | The [Response`1](#T-TrimbleCloud-Processing-Response1 'TrimbleCloud.Processing.Response1') instance. |

## SecretFile `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Secret files

### FilePath `property`

##### Summary

The file path of an ingested Deployment Secret file.

### Identifier `property`

##### Summary

The expected identifier of a Deployment Secret.

## SecretVariable `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

Secret variables

### Identifier `property`

##### Summary

The expected identifier of a Deployment Secret.

### VariableName `property`

##### Summary

The name of the environment variable inside the container.

## Status `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

The status of the operation.

### DELETING `constants`

##### Summary

DELETING status

### EXECUTABLE `constants`

##### Summary

EXECUTABLE status

### MUTABLE `constants`

##### Summary

MUTABLE status

### RETIRED `constants`

##### Summary

RETIRED status

## Type `type`

##### Namespace

TrimbleCloud.Processing.Model

##### Summary

The type of Execution Event that is being described.

### ERROR `constants`

##### Summary

ERROR

### INFO `constants`

##### Summary

INFO

## ValidationException `type`

##### Namespace

TrimbleCloud.Processing

##### Summary

Represents an exception that occurs during validation.

### #ctor(message) `constructor`

##### Summary

Initializes a new instance of the [ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") class.

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| message | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | Exception message. |

### #ctor(message,innerException) `constructor`

##### Summary

Initializes a new instance of the [ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") class.

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| message | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | Exception message. |
| innerException | [System.Exception](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Exception "System.Exception") | Inner exception. |

### #ctor(message,errors) `constructor`

##### Summary

Initializes a new instance of the [ValidationException](#T-TrimbleCloud-Processing-ValidationException "TrimbleCloud.Processing.ValidationException") class.

##### Parameters

| Name | Type | Description |
| --- | --- | --- |
| message | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String "System.String") | Exception message. |
| errors | [System.Collections.Generic.IEnumerable{System.String}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable "System.Collections.Generic.IEnumerable{System.String}") | List of errors. |

### Errors `property`

##### Summary

Gets the list of errors.
