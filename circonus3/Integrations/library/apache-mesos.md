---
title: Apache Mesos
sidebar_custom_props:
  image: apache-mesos.svg
description: ""
implementation: cua
module: httptrap:cua:mesos
---

# Apache Mesos

## Overview

This input plugin gathers metrics from Mesos. For more information, please check the [Mesos Observability Metrics](http://mesos.apache.org/documentation/latest/monitoring/) page.

## Configuration

```toml
# plugin for gathering metrics from N Mesos masters
[[inputs.mesos]]
  ## Timeout, in ms.
  timeout = 100

  ## A list of Mesos masters.
  masters = ["http://localhost:5050"]

  ## Master metrics groups to be collected, by default, all enabled.
  master_collections = [
    "resources",
    "master",
    "system",
    "agents",
    "frameworks",
    "framework_offers",
    "tasks",
    "messages",
    "evqueue",
    "registrar",
    "allocator",
  ]

  ## A list of Mesos slaves, default is []
  # slaves = []

  ## Slave metrics groups to be collected, by default, all enabled.
  # slave_collections = [
  #   "resources",
  #   "agent",
  #   "system",
  #   "executors",
  #   "tasks",
  #   "messages",
  # ]

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```

By default this plugin is not configured to gather metrics from mesos. Since a mesos cluster can be deployed in numerous ways it does not provide any default
values. User needs to specify master/slave nodes this plugin will gather metrics from.
