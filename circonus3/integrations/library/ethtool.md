---
title: Ethtool
sidebar_custom_props:
  image: ethtool.svg
logo_light: /img/library/ethtool.svg
description: ""
implementation: cua
module: httptrap:cua:ethtool
---

# Ethtool

## Overview

The ethtool input plugin pulls ethernet device stats. Fields pulled will depend on the network device and driver.

## Configuration

```toml
# Returns ethtool statistics for given interfaces
[[inputs.ethtool]]
  ## List of interfaces to pull metrics for
  # interface_include = ["eth0"]

  ## List of interfaces to ignore when pulling metrics.
  # interface_exclude = ["eth1"]
```

Interfaces can be included or ignored using:

- `interface_include`
- `interface_exclude`

Note that loopback interfaces will be automatically ignored.
