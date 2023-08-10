---
title: MongoDB
sidebar_custom_props:
  image: mongodb.svg
logo_light: /img/library/mongodb.svg
description: ""
implementation: cua
module: httptrap:cua:mongodb
---

# MongoDB

## Configuration

```toml
[[inputs.mongodb]]
  ## An array of URLs of the form:
  ##   "mongodb://" [user ":" pass "@"] host [ ":" port]
  ## For example:
  ##   mongodb://user:auth_key@10.10.3.30:27017,
  ##   mongodb://10.10.3.33:18832,
  servers = ["mongodb://127.0.0.1:27017"]

  ## When true, collect cluster status.
  ## Note that the query that counts jumbo chunks triggers a COLLSCAN, which
  ## may have an impact on performance.
  # gather_cluster_status = true

  ## When true, collect per database stats
  # gather_perdb_stats = false

  ## When true, collect per collection stats
  # gather_col_stats = false

  ## List of db where collections stats are collected
  ## If empty, all db are concerned
  # col_stats_dbs = ["local"]

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```

### Permissions:

If your MongoDB instance has access control enabled you will need to connect
as a user with sufficient rights.

With MongoDB 3.4 and higher, the `clusterMonitor` role can be used. In
version 3.2 you may also need these additional permissions:

```
> db.grantRolesToUser("user", [{role: "read", actions: "find", db: "local"}])
```

If the user is missing required privileges you may see an error in the logs similar to:

```
Error in input [mongodb]: not authorized on admin to execute command { serverStatus: 1, recordStats: 0 }
```

Some permission related errors are logged at debug level, you can check these
messages by setting `debug = true` in the agent section of the configuration or
by running agent with the `--debug` argument.
