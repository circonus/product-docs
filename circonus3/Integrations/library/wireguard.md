---
title: Wireguard
sidebar_custom_props:
image: wireguard.svg
description: ""
implementation: cua
module: httptrap:cua:wireguard
---

# Wireguard

## Overview

The Wireguard input plugin collects statistics on the local Wireguard server
using the [`wgctrl`](https://github.com/WireGuard/wgctrl-go) library. It
reports gauge metrics for Wireguard interface device(s) and its peers.

## Configuration

```toml
# Collect Wireguard server interface and peer statistics
[[inputs.wireguard]]
  ## Optional list of Wireguard device/interface names to query.
  ## If omitted, all Wireguard interfaces are queried.
  # devices = ["wg0"]
```

## Troubleshooting

### Error: `operation not permitted`

When the kernelspace implementation of Wireguard is in use (as opposed to its
userspace implementations), agent communicates with the module over netlink.
This requires agent to either run as root, or for the agent binary to
have the `CAP_NET_ADMIN` capability.

To add this capability to the agent binary (to allow this communication under
the default user `cua`):

```bash
$ sudo setcap CAP_NET_ADMIN+epi $(which circonus-unified-agent)
```

N.B.: This capability is a filesystem attribute on the binary itself. The
attribute needs to be re-applied if the agent binary is rotated (e.g.
on installation of new a agent version from the system package manager).

### Error: `error enumerating Wireguard devices`

This usually happens when the device names specified in config are invalid.
Ensure that `sudo wg show` succeeds, and that the device names in config match
those printed by this command.
