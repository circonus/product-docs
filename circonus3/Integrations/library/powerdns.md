---
title: PowerDNS
sidebar_custom_props:
image: powerdns.svg
description: ""
implementation: cua
module: httptrap:cua:powerdns
---

# PowerDNS

## Overview

The powerdns plugin gathers metrics about PowerDNS using unix socket.

## Configuration

```toml
# Description
[[inputs.powerdns]]
  # An array of sockets to gather stats about.
  # Specify a path to unix socket.
  #
  # If no servers are specified, then '/var/run/pdns.controlsocket' is used as the path.
  unix_sockets = ["/var/run/pdns.controlsocket"]
```

### Permissions

Agent will need read access to the powerdns control socket.

On many systems this can be accomplished by adding the `cua` user to the
`pdns` group:

```
usermod cua -a -G pdns
```
