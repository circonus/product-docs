---
title: Couchbase
sidebar_custom_props:
image: couchbase.svg
description: ""
implementation: cua
module: httptrap:cua:couchbase
---

# Couchbase

## Configuration

```toml
# Read per-node and per-bucket metrics from Couchbase
[[inputs.couchbase]]
  ## specify servers via a url matching:
  ##  [protocol://][:password]@address[:port]
  ##  e.g.
  ##    http://couchbase-0.example.com/
  ##    http://admin:secret@couchbase-0.example.com:8091/
  ##
  ## If no servers are specified, then localhost is used as the host.
  ## If no protocol is specified, HTTP is used.
  ## If no port is specified, 8091 is used.
  servers = ["http://localhost:8091"]
```
