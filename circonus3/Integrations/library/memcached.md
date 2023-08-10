---
title: Memcached
sidebar_custom_props:
image: memcached.svg
description: ""
implementation: cua
module: httptrap:cua:memcached
tags:
  - memory
  - cache
---

# Memcached

## Overview

This plugin gathers statistics data from a Memcached server.

## Configuration

```toml
# Read metrics from one or many memcached servers.
[[inputs.memcached]]
  # An array of address to gather stats about. Specify an ip on hostname
  # with optional port. ie localhost, 10.0.0.1:11211, etc.
  servers = ["localhost:11211"]
  # An array of unix memcached sockets to gather stats about.
  # unix_sockets = ["/var/run/memcached.sock"]
```
