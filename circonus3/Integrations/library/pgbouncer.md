---
title: PgBouncer
sidebar_custom_props:
  image: postgresql.svg
description: ""
implementation: cua
module: httptrap:cua:pgbouncer
---

# PgBouncer

## Overview

The `pgbouncer` plugin provides metrics for your PgBouncer load balancer.

More information about the meaning of these metrics can be found in the
[PgBouncer Documentation](https://pgbouncer.github.io/usage.html).

- PgBouncer minimum tested version: 1.5

## Configuration

### Configuration example

```toml
[[inputs.pgbouncer]]
  ## specify address via a url matching:
  ##   postgres://[pqgotest[:password]]@host:port[/dbname]\
  ##       ?sslmode=[disable|verify-ca|verify-full]
  ## or a simple string:
  ##   host=localhost port=5432 user=pqgotest password=... sslmode=... dbname=app_production
  ##
  ## All connection parameters are optional.
  ##
  address = "host=localhost user=pgbouncer sslmode=disable"
```

#### `address`

Specify address via a postgresql connection string:

`host=/run/postgresql port=6432 user=cua database=pgbouncer`

Or via an url matching:

`postgres://[pqgotest[:password]]@host:port[/dbname]?sslmode=[disable|verify-ca|verify-full]`

All connection parameters are optional.

Without the dbname parameter, the driver will default to a database with the same name as the user.
This dbname is just for instantiating a connection with the server and doesn't restrict the databases we are trying to grab metrics for.
