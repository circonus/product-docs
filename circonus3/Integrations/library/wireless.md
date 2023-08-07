---
title: Wireless
sidebar_custom_props:
  image: wireless.svg
logo_dark: "/images/circonus/library/wireless-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:wireless
---

# Wireless

## Overview

The wireless plugin gathers metrics about wireless link quality by reading the `/proc/net/wireless` file. This plugin currently supports linux only.

## Configuration

```toml
# Monitor wifi signal strength and quality
[[inputs.wireless]]
  ## Sets 'proc' directory path
  ## If not specified, then default is /proc
  # host_proc = "/proc"
```
