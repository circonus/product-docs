---
title: Apache Aurora
sidebar_custom_props:
  image: apache-aurora.svg
description: ""
implementation: cua
module: httptrap:cua:aurora
---

# Apache Aurora

## Overview

The Aurora Input Plugin gathers metrics from [Apache Aurora](https://aurora.apache.org/) schedulers.

For monitoring recommendations reference [Monitoring your Aurora cluster](https://aurora.apache.org/documentation/latest/operations/monitoring/)

## Configuration

```toml
[[inputs.aurora]]
  ## Schedulers are the base addresses of your Aurora Schedulers
  schedulers = ["http://127.0.0.1:8081"]

  ## Set of role types to collect metrics from.
  ##
  ## The scheduler roles are checked each interval by contacting the
  ## scheduler nodes; zookeeper is not contacted.
  # roles = ["leader", "follower"]

  ## Timeout is the max time for total network operations.
  # timeout = "5s"

  ## Username and password are sent using HTTP Basic Auth.
  # username = "username"
  # password = "pa$$word"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```

## Troubleshooting

Check the Scheduler role, the leader will return a 200 status:

```
curl -v http://127.0.0.1:8081/leaderhealth
```

Get available metrics:

```
curl http://127.0.0.1:8081/vars
```
