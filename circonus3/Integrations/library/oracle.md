---
title: Oracle
sidebar_custom_props:
  image: oracle.svg
description: ""
implementation: cua
module: httptrap:cua:oracle
---

# Oracle

## Overview

The Oracle database Circonus Unified Agent (CUA) input plugin collects metrics from Oracle's RDBMS using dynamic performance views.

**_This document is oriented around the Oracle database installed on a Windows host._**

## Configuration

There are a few configuration options available for collecting telemetry from an Oracle database where the database is installed on a Windows host. A couple examples are included below to help guide you through the process.

### Configuration Example 1

**_In this example, the Oracle database is installed on a Windows host and you are collecting the metrics from CUA that is installed on this same Windows host._**

This configuration executes a sidecar powered by python3 to gather metrics from an Oracle database. The installation of [python3](https://www.python.org/downloads/) and the [cx_Oracle](https://cx-oracle.readthedocs.io/en/latest/user_guide/installation.html) extension module are required to run the sidecar.

Here is an example configuration for the CUA Oracle input plugin (Windows CUA):

```toml
# ##Input Plugin for Oracle Database (Windows CUA)
[[inputs.exec]]
  # Specify an instance_id for the oracle database
  instance_id = "" # Required
  commands = ['python "C:\\Program Files\\Circonus\\Circonus-Unified-Agent\\external_plugins\\oracle\\oracle_metrics.py" --dsn "(DESCRIPTION=(ADDRESS=(PROTOCOL=<TCP or UDP>)(HOST=<hostIp>)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=<serviceName>)))" --user "<userName>" --password "<password>" --instance "<instanceName>"']
  timeout = "60s"
  data_format = "influx"
#  ## Execution interval, can override default interval setting in [agent] section
  interval = "60s"
```

- Create an `instance_id` tag value that describes this Oracle database deployment.
- Modify the [connection string](https://cx-oracle.readthedocs.io/en/latest/user_guide/connection_handling.html#connection-strings) to connect with your database.
- Create an Oracle username and password with SELECT_CATALOG_ROLE granted, and input those credentials into the connection string above.
- Define the execution interval that the collection happens on. If left commented out, the execution interval defaults to the current CUA polling interval.

### Configuration Example 2

**_In this example, the Oracle database is installed on a Windows host and you are collecting the metrics from CUA that is installed on a remote Linux host._**

This configuration executes a sidecar powered by python3 and Oracle Instant Client to gather metrics from an Oracle database. The installation of [python3](https://www.python.org/downloads/) and the [cx_Oracle](https://cx-oracle.readthedocs.io/en/latest/user_guide/installation.html) extension module are required to run the sidecar.

Install [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html). The Oracle Instant Client will require network configurations that are specific to your deployment model to enable remote connectivity. The remote network configuration will requre IP address modification in the client and in the Oracle Databases's `tnsnames.ora` and `listner.ora` files. These files can be found in your Oracle Database directory. Example: `C:\OracleApp\WINDOWS.X64_193000_db_home\network\admin`

Here is an example configuration for the CUA Oracle input plugin (Linux CUA):

```toml
# ##Input Plugin for Oracle Database (Linux CUA)
[[inputs.exec]]
  # Specify an instance_id for the oracle database
  instance_id = "" # Required
  commands = ['python3 "/opt/circonus/unified-agent/external_plugins/oracle_metrics.py" --dsn "(DESCRIPTION=(ADDRESS=(PROTOCOL=<TCP or UDP>)(HOST=<hostIp>)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=<serviceName>)))" --user "<userName>" --password "<password>" --instance "<instanceName>"']
  timeout = "60s"
  data_format = "influx"
#  ## Execution interval, can override default interval setting in [agent] section
  interval = "60s"

```

- Create an `instance_id` tag value that describes this Oracle database deployment.
- Modify the [connection string](https://cx-oracle.readthedocs.io/en/latest/user_guide/connection_handling.html#connection-strings) to connect with your database.
- Create an Oracle username and password with SELECT_CATALOG_ROLE granted, and input those credentials into the connection string above.
- Define the execution interval that the collection happens on. If left commented out, the execution interval defaults to the current CUA polling interval.
