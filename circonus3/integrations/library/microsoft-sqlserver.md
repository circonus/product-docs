---
title: Microsoft SQLServer
sidebar_custom_props:
  image: microsoft-sqlserver.svg
logo_light: /img/library/microsoft-sqlserver.svg
description: ""
implementation: cua
module: httptrap:cua:sqlserver
---

# Microsoft SQLServer

## Overview

The `sqlserver` plugin provides metrics for your SQL Server instance. It
currently works with SQL Server 2008 SP3 and newer. Recorded metrics are
lightweight and use Dynamic Management Views supplied by SQL Server.

### The SQL Server plugin supports the following editions/versions of SQL Server

- SQL Server
  - 2008 SP3 (with CU3)
  - SQL Server 2008 R2 SP3 and newer versions
- Azure SQL Database (Single)
- Azure SQL Managed Instance

### Additional Setup:

You have to create a login on every SQL Server instance or Azure SQL Managed instance you want to monitor, with following script:

```sql
USE master;
GO
CREATE LOGIN [cua] WITH PASSWORD = N'mystrongpassword';
GO
GRANT VIEW SERVER STATE TO [cua];
GO
GRANT VIEW ANY DEFINITION TO [cua];
GO
```

For Azure SQL Database, you require the View Database State permission and can create a user with a password directly in the database.

```sql
CREATE USER [cua] WITH PASSWORD = N'mystrongpassword';
GO
GRANT VIEW DATABASE STATE TO [cua];
GO
```

## Configuration

```toml
[agent]
  ## Default data collection interval for all inputs, can be changed as per collection interval needs
  interval = "10s"

# Read metrics from Microsoft SQL Server
[[inputs.sqlserver]]
  ## Specify instances to monitor with a list of connection strings.
  ## All connection parameters are optional.
  ## By default, the host is localhost, listening on default port, TCP 1433.
  ##   for Windows, the user is the currently running AD user (SSO).
  ##   See https://github.com/denisenkom/go-mssqldb for detailed connection
  ##   parameters, in particular, tls connections can be created like so:
  ##   "encrypt=true;certificate=<cert>;hostNameInCertificate=<SqlServer host fqdn>"
  # servers = [
  #  "Server=192.168.1.10;Port=1433;User Id=<user>;Password=<pw>;app name=cua;log=1;",
  # ]

  ## This enables a specific set of queries depending on the database type. If specified, it replaces azuredb = true/false and query_version = 2
  ## In the config file, the sql server plugin section should be repeated  each with a set of servers for a specific database_type.
  ## Possible values for database_type are
  ## "AzureSQLDB"
  ## "SQLServer"
  ## "AzureSQLManagedInstance"
  # database_type = "AzureSQLDB"

  ## Optional parameter, setting this to 2 will use a new version
  ## of the collection queries that break compatibility with the original dashboards.
  ## Version 2 - is compatible from SQL Server 2008 Sp3 and later versions and also for SQL Azure DB
  ## Version 2 is in the process of being deprecated, please consider using database_type.
  # query_version = 2

  ## If you are using AzureDB, setting this to true will gather resource utilization metrics
  # azuredb = false

  ## Possible queries accross different versions of the collectors
  ## Queries enabled by default for specific Database Type

  ## database_type =  AzureSQLDB  by default collects the following queries
  ## - AzureSQLDBWaitStats
  ## - AzureSQLDBResourceStats
  ## - AzureSQLDBResourceGovernance
  ## - AzureSQLDBDatabaseIO
  ## - AzureSQLDBServerProperties
  ## - AzureSQLDBOsWaitstats
  ## - AzureSQLDBMemoryClerks
  ## - AzureSQLDBPerformanceCounters
  ## - AzureSQLDBRequests
  ## - AzureSQLDBSchedulers

   ## database_type =  AzureSQLManagedInstance by default collects the following queries
   ## - AzureSQLMIResourceStats
   ## - AzureSQLMIResourceGovernance
   ## - AzureSQLMIDatabaseIO
   ## - AzureSQLMIServerProperties
   ## - AzureSQLMIOsWaitstats
   ## - AzureSQLMIMemoryClerks
   ## - AzureSQLMIPerformanceCounters
   ## - AzureSQLMIRequests
   ## - AzureSQLMISchedulers

   ## database_type =  SQLServer by default collects the following queries
   ## - SQLServerPerformanceCounters
   ## - SQLServerWaitStatsCategorized
   ## - SQLServerDatabaseIO
   ## - SQLServerProperties
   ## - SQLServerMemoryClerks
   ## - SQLServerSchedulers
   ## - SQLServerRequests
   ## - SQLServerVolumeSpace
   ## - SQLServerCpu

  ## Version 2 by default collects the following queries
  ## Version 2 is being deprecated, please consider using database_type.
  ## - PerformanceCounters
  ## - WaitStatsCategorized
  ## - DatabaseIO
  ## - ServerProperties
  ## - MemoryClerk
  ## - Schedulers
  ## - SqlRequests
  ## - VolumeSpace
  ## - Cpu

  ## Version 1 by default collects the following queries
  ## Version 1 is deprecated, please consider using database_type.
  ## - PerformanceCounters
  ## - WaitStatsCategorized
  ## - CPUHistory
  ## - DatabaseIO
  ## - DatabaseSize
  ## - DatabaseStats
  ## - DatabaseProperties
  ## - MemoryClerk
  ## - VolumeSpace
  ## - PerformanceMetrics



  ## A list of queries to include. If not specified, all the above listed queries are used.
  # include_query = []

  ## A list of queries to explicitly ignore.
  exclude_query = [ 'Schedulers' , 'SqlRequests' ]



```
