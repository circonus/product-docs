---
title: Apache ActiveMQ
sidebar_custom_props:
  image: apache-activemq.svg
logo_light: /img/library/apache-activemq.svg
description: ""
implementation: cua
module: httptrap:cua:activemq
---

# Apache ActiveMQ

## Overview

This plugin uses the ActiveMQ Console API to gather metrics for queues, topics, and subscribers.

## Configuration

```toml
# Description
[[inputs.activemq]]
  ## ActiveMQ WebConsole URL
  url = "http://127.0.0.1:8161"

  ## Required ActiveMQ Endpoint
  ##   deprecated in 1.11; use the url option
  # server = "192.168.50.10"
  # port = 8161

  ## Credentials for basic HTTP authentication
  # username = "admin"
  # password = "admin"

  ## Required ActiveMQ webadmin root path
  # webadmin = "admin"

  ## Maximum time to receive response.
  # response_timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
