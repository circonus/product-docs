---
title: Redfish
sidebar_custom_props:
  image: redfish.png
description: ""
implementation: cua
module: httptrap:cua:redfish
---

# Redfish

## Overview

The `redfish` plugin gathers metrics and status information about CPU temperature, fanspeed, Powersupply, voltage, hostname and Location details (datacenter, placement, rack and room) of hardware servers for which [DMTF's Redfish](https://redfish.dmtf.org/) is enabled.

## Configuration

```toml
[[inputs.redfish]]
  ## Redfish API Base URL.
  address = "https://127.0.0.1:5000"

  ## Credentials for the Redfish API.
  username = "root"
  password = "password123456"

  ## System Id to collect data for in Redfish APIs.
  computer_system_id="System.Embedded.1"

  ## Amount of time allowed to complete the HTTP request
  # timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
