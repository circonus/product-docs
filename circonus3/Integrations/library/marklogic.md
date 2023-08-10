---
title: MarkLogic
sidebar_custom_props:
image: marklogic.svg
description: ""
implementation: cua
module: httptrap:cua:marklogic
---

# MarkLogic

## Overview

The MarkLogic plugin gathers health status metrics from one or more host.

## Configuration

This section contains the default TOML to configure the plugin. You can
generate it using `circonus-unified-agent --usage mailchimp`.

```toml
[[inputs.marklogic]]
  ## Base URL of the MarkLogic HTTP Server.
  url = "http://localhost:8002"

  ## List of specific hostnames to retrieve information. At least (1) required.
  # hosts = ["hostname1", "hostname2"]

  ## Using HTTP Basic Authentication. Management API requires 'manage-user' role privileges
  # username = "myuser"
  # password = "mypassword"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
