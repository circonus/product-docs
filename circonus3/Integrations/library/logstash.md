---
title: Logstash
sidebar_custom_props:
image: logstash.svg
logo_dark: "/images/circonus/library/logstash-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:logstash
---

# Logstash

## Overview

This plugin reads metrics exposed by [Logstash Monitoring API](https://www.elastic.co/guide/en/logstash/current/monitoring-logstash.html).

Logstash 5 and later is supported.

## Configuration

```toml
[[inputs.logstash]]
  ## The URL of the exposed Logstash API endpoint.
  url = "http://127.0.0.1:9600"

  ## Use Logstash 5 single pipeline API, set to true when monitoring
  ## Logstash 5.
  # single_pipeline = false

  ## Enable optional collection components.  Can contain
  ## "pipelines", "process", and "jvm".
  # collect = ["pipelines", "process", "jvm"]

  ## Timeout for HTTP requests.
  # timeout = "5s"

  ## Optional HTTP Basic Auth credentials.
  # username = "username"
  # password = "pa$$word"

  ## Optional TLS Config.
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"

  ## Use TLS but skip chain & host verification.
  # insecure_skip_verify = false

  ## Optional HTTP headers.
  # [inputs.logstash.headers]
  #   "X-Special-Header" = "Special-Value"
```
