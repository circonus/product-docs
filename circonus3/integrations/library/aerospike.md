---
title: Aerospike
description: ""
sidebar_custom_props:
  image: aerospike.svg
logo_light: /img/library/aerospike.svg
---

# Aerospike

## Overview

The aerospike plugin queries aerospike server(s) and gets node statistics and stats for all the configured namespaces.

For what the measurements mean, please consult the [Aerospike Metrics Reference Docs](http://www.aerospike.com/docs/reference/metrics).

The metric names, to make it less complicated in querying, have replaced all `-` with `_` as Aerospike metrics come in both forms (no idea why).

All metrics are attempted to be cast to integers, then booleans, then strings.

## Configuration

```toml
# Read stats from aerospike server(s)
[[inputs.aerospike]]
  ## Aerospike servers to connect to (with port)
  ## This plugin will query all namespaces the aerospike
  ## server has configured and get stats for them.
  servers = ["localhost:3000"]

  # username = "circonus"
  # password = "pa$$word"

  ## Optional TLS Config
  # enable_tls = false
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## If false, skip chain & host verification
  # insecure_skip_verify = true

  # Feature Options
  # Add namespace variable to limit the namespaces executed on
  # Leave blank to do all
  # disable_query_namespaces = true # default false
  # namespaces = ["namespace1", "namespace2"]

  # Enable set level telmetry
  # query_sets = true # default: false
  # Add namespace set combinations to limit sets executed on
  # Leave blank to do all
  # sets = ["namespace1/set1", "namespace1/set2"]
  # sets = ["namespace1/set1", "namespace1/set2", "namespace3"]

  # Histograms
  # enable_ttl_histogram = true # default: false
  # enable_object_size_linear_histogram = true # default: false

  # by default, aerospike produces a 100 bucket histogram
  # this is not great for most graphing tools, this will allow
  # the ability to squash this to a smaller number of buckets
  # To have a balanced histogram, the number of buckets chosen
  # should divide evenly into 100.
  # num_histogram_buckets = 100 # default: 10
```
