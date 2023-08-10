---
title: Apache
sidebar_custom_props:
  image: apache.svg
logo_light: /img/library/apache.svg
description: ""
implementation: cua
module: httptrap:cua:apache
---

# Apache

## Overview

The Apache plugin collects server performance information using the [`mod_status`](https://httpd.apache.org/docs/2.4/mod/mod_status.html) module of the [Apache HTTP Server](https://httpd.apache.org/).

Typically, the `mod_status` module is configured to expose a page at the `/server-status?auto` location of the Apache server. The [ExtendedStatus](https://httpd.apache.org/docs/2.4/mod/core.html#extendedstatus) option must be enabled in order to collect all available fields. For information about how to configure your server reference the [module documentation](https://httpd.apache.org/docs/2.4/mod/mod_status.html#enable).

## Configuration

The following defaults are known to work with RabbitMQ:

```toml
# Read Apache status information (mod_status)
[[inputs.apache]]
  ## An array of URLs to gather from, must be directed at the machine
  ## readable version of the mod_status page including the auto query string.
  ## Default is "http://localhost/server-status?auto".
  urls = ["http://localhost/server-status?auto"]

  ## Credentials for basic HTTP authentication.
  # username = "myuser"
  # password = "mypassword"

  ## Maximum time to receive response.
  # response_timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
