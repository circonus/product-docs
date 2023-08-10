---
title: Apache Zookeeper
sidebar_custom_props:
  image: apache-zookeeper.svg
logo_light: /img/library/apache-zookeeper.svg
description: ""
implementation: cua
module: httptrap:cua:zookeeper
---

# Apache Zookeeper

## Overview

The zookeeper plugin collects variables outputted from the 'mntr' command
[Zookeeper Admin](https://zookeeper.apache.org/doc/current/zookeeperAdmin.html).

## Configuration

```toml
# Reads 'mntr' stats from one or many zookeeper servers
[[inputs.zookeeper]]
  ## An array of address to gather stats about. Specify an ip or hostname
  ## with port. ie localhost:2181, 10.0.0.1:2181, etc.

  ## If no servers are specified, then localhost is used as the host.
  ## If no port is specified, 2181 is used
  servers = [":2181"]

  ## Timeout for metric collections from all servers.  Minimum timeout is "1s".
  # timeout = "5s"

  ## Optional TLS Config
  # enable_tls = true
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## If false, skip chain & host verification
  # insecure_skip_verify = true
```

## Troubleshooting

If you have any issues please check the direct Zookeeper output using netcat:

```sh
$ echo mntr | nc localhost 2181
zk_version      3.4.9-3--1, built on Thu, 01 Jun 2017 16:26:44 -0700
zk_avg_latency  0
zk_max_latency  0
zk_min_latency  0
zk_packets_received     8
zk_packets_sent 7
zk_num_alive_connections        1
zk_outstanding_requests 0
zk_server_state standalone
zk_znode_count  129
zk_watch_count  0
zk_ephemerals_count     0
zk_approximate_data_size        10044
zk_open_file_descriptor_count   44
zk_max_file_descriptor_count    4096
```
