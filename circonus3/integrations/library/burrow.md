---
title: Burrow
sidebar_custom_props:
  image: apache-kafka.svg
logo_light: /img/library/apache-kafka.svg
description: ""
implementation: cua
module: httptrap:cua:burrow
---

# Burrow

## Overview

Collect Kafka topic, consumer and partition status via [Burrow](https://github.com/linkedin/Burrow) HTTP [API](https://github.com/linkedin/Burrow/wiki/HTTP-Endpoint).

Supported Burrow version: `1.x`

## Configuration

```toml
[[inputs.burrow]]
  ## Burrow API endpoints in format "schema://host:port".
  ## Default is "http://localhost:8000".
  servers = ["http://localhost:8000"]

  ## Override Burrow API prefix.
  ## Useful when Burrow is behind reverse-proxy.
  # api_prefix = "/v3/kafka"

  ## Maximum time to receive response.
  # response_timeout = "5s"

  ## Limit per-server concurrent connections.
  ## Useful in case of large number of topics or consumer groups.
  # concurrent_connections = 20

  ## Filter clusters, default is no filtering.
  ## Values can be specified as glob patterns.
  # clusters_include = []
  # clusters_exclude = []

  ## Filter consumer groups, default is no filtering.
  ## Values can be specified as glob patterns.
  # groups_include = []
  # groups_exclude = []

  ## Filter topics, default is no filtering.
  ## Values can be specified as glob patterns.
  # topics_include = []
  # topics_exclude = []

  ## Credentials for basic HTTP authentication.
  # username = ""
  # password = ""

  ## Optional SSL config
  # ssl_ca = "/etc/circonus-unified-agent/ca.pem"
  # ssl_cert = "/etc/circonus-unified-agent/cert.pem"
  # ssl_key = "/etc/circonus-unified-agent/key.pem"
  # insecure_skip_verify = false
```
