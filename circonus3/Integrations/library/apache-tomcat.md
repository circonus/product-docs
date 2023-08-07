---
title: Apache Tomcat
sidebar_custom_props:
  image: apache-tomcat.svg
description: ""
implementation: cua
module: httptrap:cua:tomcat
---

# Apache Tomcat

## Overview

The Tomcat plugin collects statistics available from the tomcat manager status page from the `http://<host>/manager/status/all?XML=true URL.` (`XML=true` will return only xml data).

See the [Tomcat documentation](https://tomcat.apache.org/tomcat-9.0-doc/manager-howto.html#Server_Status) for details of these statistics.

## Configuration

```toml
# Gather metrics from the Tomcat server status page.
[[inputs.tomcat]]
  ## URL of the Tomcat server status
  # url = "http://127.0.0.1:8080/manager/status/all?XML=true"

  ## HTTP Basic Auth Credentials
  # username = "tomcat"
  # password = "s3cret"

  ## Request timeout
  # timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
