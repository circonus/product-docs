---
title: HTTP
sidebar_custom_props:
  image: http.svg
logo_light: /img/library/http.svg
description: ""
implementation: cua
module: httptrap:cua:http
---

# HTTP

## Overview

The HTTP input plugin collects metrics from one or more HTTP(S) endpoints. The endpoint should have metrics formatted in one of the supported [input data formats](https://github.com/circonus-labs/circonus-unified-agent/blob/master/docs/DATA_FORMATS_INPUT.md). Each data format has its own unique set of configuration options which can be added to the input configuration.

## Configuration

```toml
# Read formatted metrics from one or more HTTP endpoints
[[inputs.http]]
  ## One or more URLs from which to read formatted metrics
  urls = [
    "http://localhost/metrics"
  ]

  ## HTTP method
  # method = "GET"

  ## Optional HTTP headers
  # headers = {"X-Special-Header" = "Special-Value"}

  ## HTTP entity-body to send with POST/PUT requests.
  # body = ""

  ## HTTP Content-Encoding for write request body, can be set to "gzip" to
  ## compress body or "identity" to apply no encoding.
  # content_encoding = "identity"

  ## Optional file with Bearer token
  ## file content is added as an Authorization header
  # bearer_token = "/path/to/file"

  ## Optional HTTP Basic Auth Credentials
  # username = "username"
  # password = "pa$$word"

  ## HTTP Proxy support
  # http_proxy_url = ""

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false

  ## Amount of time allowed to complete the HTTP request
  # timeout = "5s"

  ## List of success status codes
  # success_status_codes = [200]

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/circonus-labs/circonus-unified-agent/blob/master/docs/DATA_FORMATS_INPUT.md
  # data_format = "json"

```
