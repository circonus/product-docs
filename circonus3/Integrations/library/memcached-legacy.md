---
title: Memcached
sidebar_custom_props:
  image: memcached.svg
description: ""
legacy: true
implementation: broker
module: memcached
tags:
  - memory
  - cache
---

# Memcached

## Overview

The Memcache Check monitors your Memcached instances.

Memcached is a free open-source general purpose distributed memory caching system.

## Configuration

Optional parameters:

| Name | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| port | The TCP port to connect to the memcached server (default: 11211) |

## Metrics

Typical metrics include memory usage, cache hits, cache misses, cache evictions, cache fill percentage, and many more.
