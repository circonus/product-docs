---
title: NGINX Stream Traffic Status (STS)
sidebar_custom_props:
  image: nginx.svg
logo_light: /img/library/nginx.svg
description: ""
implementation: cua
module: httptrap:cua:nginx_sts
---

# NGINX Stream Traffic Status (STS)

## Overview

This plugin gathers Nginx status using external virtual host traffic status
module - https://github.com/vozlt/nginx-module-sts. This is an Nginx module
that provides access to stream host status information. It contains the current
status such as servers, upstreams, caches. This is similar to the live activity
monitoring of Nginx plus. For module configuration details please see its
[documentation](https://github.com/vozlt/nginx-module-sts#synopsis).

## Configuration

```toml
[[inputs.nginx_sts]]
  ## An array of ngx_http_status_module or status URI to gather stats.
  urls = ["http://localhost/status"]

  ## HTTP response timeout (default: 5s)
  response_timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
