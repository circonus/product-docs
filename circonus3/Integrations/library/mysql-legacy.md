---
title: MySQL
sidebar_custom_props:
image: mysql.svg
description: ""
legacy: true
implementation: broker
module: mysql
tags:
  - database
  - SQL
---

# MySQL

The MySQL Check allows querying of your MySQL database, enabling you to collect arbitrary metrics stored therein.

MySQL is an open-source relational database management developed, distributed, and supported by the Oracle Corporation.

## Configuration

If you are configuring a MySQL check via the Circonus API, the values for host, database, username, and password are combined into a single parameter called dsn: host=5.4.3.2 port=5432 username=myuser password=mypass dbname=test

Required parameters:
|Name|Description|
|----|-----------|
|database|The name of the database to which the check will connect to run a query.|
|sql|The SQL query to run. There are a number of predefined options, or you may enter a |custom query in the SQL Query field.|
|port|The TCP port to which the check will connect to MySQL (default: 3306)|

| Name     | Description                                                    |
| -------- | -------------------------------------------------------------- |
| username | The user name for server authorization.                        |
| password | The password for server authorization.                         |
| sslmode  | Upgrade the TCP connection to use SSL/TLS (default: false/off) |

Additional options allow you to set Server Authorization, use SSL, or to change the default Period (60 second), Timeout (10 seconds), and Port (3306).

## Metrics

Pre-defined SQL queries are provided to retrieve common performance metrics such as binlog status, connections, InnoDB buffer pool, locks, query cache tables, and transactions.

It’s also possible to collect arbitrary metrics with this check. Given this sample database table:
| |Col1 |Col2|Col3|
|-----|-----|----|----|
|Row1 |Name1|Val1|Val3|
|Row2 |Name2|Val2|Val4|

Circonus would parse the above table into the following metrics:
|Name|Value|
|----|-----|
|Name1`Col2|Val1|
|Name1`Col3|Val3|
|Name2`Col2|Val2|
|Name2`Col3|Val4|
