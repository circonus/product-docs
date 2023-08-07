---
title: systemd Units
sidebar_custom_props:
  image: systemd.svg
logo_dark: "/images/circonus/library/systemd-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:systemd_units
---

# systemd Units

## Overview

The systemd_units plugin gathers systemd unit status on Linux. It relies on
`systemctl list-units --all --plain --type=service` to collect data on service status.

The results are tagged with the unit name and provide enumerated fields for
loaded, active and running fields, indicating the unit health.

This plugin is related to the [win_services module](https://github.com/circonus-labs/circonus-unified-agent/blob/master/plugins/inputs/win_services), which
fulfills the same purpose on windows.

In addition to services, this plugin can gather other unit types as well,
see `systemctl list-units --all --type help` for possible options.

## Configuration

```toml
[[inputs.systemd_units]]
  ## Set timeout for systemctl execution
  # timeout = "1s"
  #
  ## Filter for a specific unit type, default is "service", other possible
  ## values are "socket", "target", "device", "mount", "automount", "swap",
  ## "timer", "path", "slice" and "scope ":
  # unittype = "service"
```
