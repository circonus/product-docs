---
title: Dovecot
sidebar_custom_props:
image: dovecot.svg
description: ""
implementation: cua
module: httptrap:cua:dovecot
---

# Dovecot

## Overview

The dovecot plugin uses the Dovecot [v2.1 stats protocol](http://wiki2.dovecot.org/Statistics/Old) to gather
metrics on configured domains.

When using Dovecot v2.3 you are still able to use this protocol by following
the [upgrading steps](https://wiki2.dovecot.org/Upgrading/2.3#Statistics_Redesign).

## Configuration

```toml
# Read metrics about dovecot servers
[[inputs.dovecot]]
  ## specify dovecot servers via an address:port list
  ##  e.g.
  ##    localhost:24242
  ##
  ## If no servers are specified, then localhost is used as the host.
  servers = ["localhost:24242"]

  ## Type is one of "user", "domain", "ip", or "global"
  type = "global"

  ## Wildcard matches like "*.com". An empty string "" is same as "*"
  ## If type = "ip" filters should be <IP/network>
  filters = [""]
```
