---
title: Mcrouter
sidebar_custom_props:
  image: mcrouter.svg
logo_light: /img/library/mcrouter.svg
description: ""
implementation: cua
module: httptrap:cua:mcrouter
tags:
  - memory
  - cache
  - memcached
  - proxy
  - load
  - balancer
---

# Mcrouter

## Overview

This plugin gathers statistics data from a Mcrouter server.

## Configuration

```toml
# Read metrics from one or many mcrouter servers.
[[inputs.mcrouter]]
  ## An array of address to gather stats about. Specify an ip or hostname
  ## with port. ie tcp://localhost:11211, tcp://10.0.0.1:11211, etc.
  servers = ["tcp://localhost:11211", "unix:///var/run/mcrouter.sock"]

  ## Timeout for metric collections from all servers.  Minimum timeout is "1s".
  # timeout = "5s"
```
