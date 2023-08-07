---
title: Proxmox
sidebar_custom_props:
  image: proxmox.svg
logo_dark: "/images/circonus/library/proxmox-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:proxmox
---

# Proxmox

## Overview

The proxmox plugin gathers metrics about containers and VMs using the Proxmox API.

## Configuration

```toml
[[inputs.proxmox]]
  ## API connection configuration. The API token was introduced in Proxmox v6.2. Required permissions for user and token: PVEAuditor role on /.
  base_url = "https://localhost:8006/api2/json"
  api_token = "USER@REALM!TOKENID=UUID"
  ## Node name, default to OS hostname
  # node_name = ""

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  insecure_skip_verify = false

  # HTTP response timeout (default: 5s)
  response_timeout = "5s"
```

### Permissions

The plugin will need to have access to the Proxmox API. An API token
must be provided with the corresponding user being assigned at least the PVEAuditor
role on /.
