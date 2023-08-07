---
title: RabbitMQ
sidebar_custom_props:
  image: rabbitmq.svg
description: ""
implementation: cua
module: httptrap:cua:rabbitmq
tags:
  - messaging
  - queue
---

# RabbitMQ

## Overview

Reads metrics from RabbitMQ servers via the [Management Plugin](https://www.rabbitmq.com/management.html).

For additional details reference the [RabbitMQ Management HTTP Stats](https://raw.githack.com/rabbitmq/rabbitmq-management/rabbitmq_v3_6_9/priv/www/api/index.html).

## Configuration

```toml
[[inputs.rabbitmq]]
  ## Management Plugin url. (default: http://localhost:15672)
  # url = "http://localhost:15672"
  ## Credentials
  # username = "guest"
  # password = "guest"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false

  ## Optional request timeouts
  ##
  ## ResponseHeaderTimeout, if non-zero, specifies the amount of time to wait
  ## for a server's response headers after fully writing the request.
  # header_timeout = "3s"
  ##
  ## client_timeout specifies a time limit for requests made by this client.
  ## Includes connection time, any redirects, and reading the response body.
  # client_timeout = "4s"

  ## A list of nodes to gather as the rabbitmq_node measurement. If not
  ## specified, metrics for all nodes are gathered.
  # nodes = ["rabbit@node1", "rabbit@node2"]

  ## A list of queues to gather as the rabbitmq_queue measurement. If not
  ## specified, metrics for all queues are gathered.
  # queues = ["cua"]

  ## A list of exchanges to gather as the rabbitmq_exchange measurement. If not
  ## specified, metrics for all exchanges are gathered.
  # exchanges = ["cua"]

  ## Queues to include and exclude. Globs accepted.
  ## Note that an empty array for both will include all queues
  # queue_name_include = []
  # queue_name_exclude = []

  ## Federation upstreams to include and exclude specified as an array of glob
  ## pattern strings.  Federation links can also be limited by the queue and
  ## exchange filters.
  # federation_upstream_include = []
  # federation_upstream_exclude = []
```
