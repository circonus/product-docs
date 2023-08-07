---
title: Elasticsearch
sidebar_custom_props:
  image: elasticsearch.svg
logo_dark: "/images/circonus/library/elasticsearch-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:elasticsearch
---

# Elasticsearch

## Overview

The [elasticsearch](https://www.elastic.co/) plugin queries endpoints to obtain
[Node Stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-stats.html)
and optionally
[Cluster-Health](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html)
metrics.

In addition, the following optional queries are only made by the master node:
[Cluster Stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-stats.html)
[Indices Stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html)
[Shard Stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html)

Specific Elasticsearch endpoints that are queried:

- Node: either /\_nodes/stats or /\_nodes/\_local/stats depending on 'local' configuration setting
- Cluster Heath: /\_cluster/health?level=indices
- Cluster Stats: /\_cluster/stats
- Indices Stats: /\_all/\_stats
- Shard Stats: /\_all/\_stats?level=shards

Note that specific statistics information can change between Elasticsearch versions. In general, this plugin attempts to stay as version-generic as possible by tagging high-level categories only and using a generic json parser to make unique field names of whatever statistics names are provided at the mid-low level.

## Configuration

```toml
[[inputs.elasticsearch]]
  ## specify a list of one or more Elasticsearch servers
  ## you can add username and password to your url to use basic authentication:
  ## servers = ["http://user:pass@localhost:9200"]
  servers = ["http://localhost:9200"]

  ## Timeout for HTTP requests to the elastic search server(s)
  http_timeout = "5s"

  ## When local is true (the default), the node will read only its own stats.
  ## Set local to false when you want to read the node stats from all nodes
  ## of the cluster.
  local = true

  ## Set cluster_health to true when you want to obtain cluster health stats
  cluster_health = false

  ## Adjust cluster_health_level when you want to obtain detailed health stats
  ## The options are
  ##  - indices (default)
  ##  - cluster
  # cluster_health_level = "indices"

  ## Set cluster_stats to true when you want to obtain cluster stats.
  cluster_stats = false

  ## Only gather cluster_stats from the master node. To work this require local = true
  cluster_stats_only_from_master = true

  ## Indices to collect; can be one or more indices names or _all
  indices_include = ["_all"]

  ## One of "shards", "cluster", "indices"
  ## Currently only "shards" is implemented
  indices_level = "shards"

  ## node_stats is a list of sub-stats that you want to have gathered. Valid options
  ## are "indices", "os", "process", "jvm", "thread_pool", "fs", "transport", "http",
  ## "breaker". Per default, all stats are gathered.
  # node_stats = ["jvm", "http"]

  ## HTTP Basic Authentication username and password.
  # username = ""
  # password = ""

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
