---
title: NGINX Upstream Check
sidebar_custom_props:
  image: nginx.svg
logo_light: /img/library/nginx.svg
description: ""
implementation: cua
module: httptrap:cua:nginx_upstream_check
---

# NGINX Upstream Check

## Overview

Read the status output of the [nginx_upstream_check](https://github.com/yaoweibin/nginx_upstream_check_module).
This module can periodically check the servers in the Nginx's upstream with configured request and interval to determine
if the server is still available. If checks are failed the server is marked as "down" and will not receive any requests
until the check will pass and a server will be marked as "up" again.

The status page displays the current status of all upstreams and servers as well as number of the failed and successful
checks. This information can be exported in JSON format and parsed by this input.

## Configuration

```toml
  ## An URL where Nginx Upstream check module is enabled
  ## It should be set to return a JSON formatted response
  url = "http://127.0.0.1/status?format=json"

  ## HTTP method
  # method = "GET"

  ## Optional HTTP headers
  # headers = {"X-Special-Header" = "Special-Value"}

  ## Override HTTP "Host" header
  # host_header = "check.example.com"

  ## Timeout for HTTP requests
  timeout = "5s"

  ## Optional HTTP Basic Auth credentials
  # username = "username"
  # password = "pa$$word"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
