---
title: Tengine
sidebar_custom_props:
image: tengine.svg
description: ""
implementation: cua
module: httptrap:cua:tengine
---

# Tengine

## Overview

The tengine plugin gathers metrics from the
[Tengine Web Server](http://tengine.taobao.org/) via the
[reqstat](http://tengine.taobao.org/document/http_reqstat.html) module.

## Configuration

```toml
# Read Tengine's basic status information (ngx_http_reqstat_module)
[[inputs.tengine]]
  ## An array of Tengine reqstat module URI to gather stats.
  urls = ["http://127.0.0.1/us"]

  ## HTTP response timeout (default: 5s)
  # response_timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
