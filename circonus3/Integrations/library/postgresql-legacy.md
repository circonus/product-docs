---
title: PostgreSQL
sidebar_custom_props:
  image: postgresql.svg
logo_light: /img/library/postgresql.svg
description: ""
legacy: true
implementation: broker
module: postgres
tags:
  - database
  - SQL
---

# PostgreSQL

## Overview

The PostgreSQL Check allows querying of your PostgreSQL database, enabling you to collect arbitrary metrics stored therein.

PostgreSQL, often simply called Postgres, is a free open source object-relational database management system with an emphasis on extensibility and standards compliance.

## Configuration

If you are configuring a Postgres check via the Circonus API, the values for host, database, username, and password are combined into a single parameter called dsn: host=5.4.3.2 port=5432 username=myuser password=mypass dbname=test

Required parameters:
|Name|Description|
|----|-----------|
|database|The name of the database to which the check will connect to run a query.|
|sql|The SQL query to run. There are a number of predefined options, or you may enter a custom query in the SQL Query field.|
|port|The TCP port to which the check will connect to PostgreSQL (default: 5432).|

Optional parameters:
|Name|Description|
|----|-----------|
|username|The user name for server authorization.|
|password|The password for server authorization.|
|sslmode|Upgrade the TCP connection to use SSL/TLS (default: false/off).|

Additional options allow you to set Server Authorization, use SSL, or to change the default Period (60 second), Timeout (10 seconds), and Port (5432).

## Metrics

Pre-defined SQL queries will populate the SQL Query field for you, from there you can customize it to suit your needs. Pre-defined SQL queries for PostgreSQL checks include:

- autovac
- connections
- tables
- transactions
- wal_files

It’s also possible to collect arbitrary metrics with this check. Given this sample database table:

|      | Col1  | Col2 | Col3 |
| ---- | ----- | ---- | ---- |
| Row1 | Name1 | Val1 | Val3 |
| Row2 | Name2 | Val2 | Val4 |

Circonus would parse the above table into the following metrics:
|Name|Value|
|----|-----|
|Name1`Col2|Val1|
|Name1`Col3|Val3|
|Name2`Col2|Val2|
|Name2`Col3|Val4|

Tutorials exist [online](http://www.w3schools.com/sql/default.asp) for those unfamiliar with SQL.
