---
title: PHP-FPM
sidebar_custom_props:
  image: php.svg
logo_light: /img/library/php.svg
description: ""
implementation: cua
module: httptrap:cua:phpfpm
---

# PHP-FPM

## Overview

Get phpfpm stats using either HTTP status page or fpm socket.

## Configuration

```toml
# Read metrics of phpfpm, via HTTP status page or socket
[[inputs.phpfpm]]
  ## An array of addresses to gather stats about. Specify an ip or hostname
  ## with optional port and path
  ##
  ## Plugin can be configured in three modes (either can be used):
  ##   - http: the URL must start with http:// or https://, ie:
  ##       "http://localhost/status"
  ##       "http://192.168.130.1/status?full"
  ##
  ##   - unixsocket: path to fpm socket, ie:
  ##       "/var/run/php5-fpm.sock"
  ##      or using a custom fpm status path:
  ##       "/var/run/php5-fpm.sock:fpm-custom-status-path"
  ##      glob patterns are also supported:
  ##       "/var/run/php*.sock"
  ##
  ##   - fcgi: the URL must start with fcgi:// or cgi://, and port must be present, ie:
  ##       "fcgi://10.0.0.12:9000/status"
  ##       "cgi://10.0.10.12:9001/status"
  ##
  ## Example of multiple gathering from local socket and remote host
  ## urls = ["http://192.168.1.20/status", "/tmp/fpm.sock"]
  urls = ["http://localhost/status"]

  ## Duration allowed to complete HTTP requests.
  # timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```

When using `unixsocket`, you have to ensure that agent runs on same
host, and socket path is accessible to `cua` user.
