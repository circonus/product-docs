---
title: Ping
sidebar_custom_props:
  image: ping.svg
description: ""
implementation: cua
module: httptrap:cua:ping
tags:
  - protocol
  - system
  - availability
  - network
  - latency
---

# Ping

## Overview

Sends a ping message by executing the system ping command and reports the results.

This plugin has two main methods of operation: `exec` and `native`. The
recommended method is `native`, which has greater system compatibility and
performance.

When using `method = "exec"`, the systems ping utility is executed to send the
ping packets.

Most ping command implementations are supported, one notable exception being
that there is currently no support for GNU Inetutils ping. You may instead use
the iputils-ping implementation:

```sh
apt-get install iputils-ping
```

When using `method = "native"` a ping is sent and the results are reported in
native Go by the agent process, eliminating the need to execute the system
`ping` command.

## Configuration

```toml
[[inputs.ping]]
  instance_id = "" ## REQUIRED

  ## Hosts to send ping packets to.
  urls = ["example.org"]

  ## Method used for sending pings, can be either "exec" or "native".  When set
  ## to "exec" the systems ping command will be executed.  When set to "native"
  ## the plugin will send pings directly.
  ##
  # method = "native"

  ## Number of ping packets to send per interval.  Corresponds to the "-c"
  ## option of the ping command.
  # count = 3

  ## Time to wait between sending ping packets in seconds.  Operates like the
  ## "-i" option of the ping command.
  # ping_interval = 1.0

  ## If set, the time to wait for a ping response in seconds.  Operates like
  ## the "-W" option of the ping command.
  # timeout = 1.0

  ## If set, the total ping deadline, in seconds.  Operates like the -w option
  ## of the ping command.
  # deadline = 10

  ## Interface or source address to send ping from.  Operates like the -I or -S
  ## option of the ping command.
  # interface = ""

  ## Percentiles to calculate. This only works with the native method.
  # percentiles = [50, 95, 99]

  ## Specify the ping executable binary.
  # binary = "ping"

  ## Arguments for ping command. When arguments is not empty, the command from
  ## the binary option will be used and other options (ping_interval, timeout,
  ## etc) will be ignored.
  # arguments = ["-c", "3"]

  ## Use only IPv6 addresses when resolving a hostname.
  # ipv6 = false

  ## Number of data bytes to be sent. Corresponds to the "-s"
  ## option of the ping command. This only works with the native method.
  # size = 56
```

### File Limit

Since this plugin runs the ping command, it may need to open multiple files per
host. The number of files used is lessened with the `native` option but still
many files are used. With a large host list you may receive a `too many open
files` error.

To increase this limit on platforms using systemd the recommended method is to
use the "drop-in directory", usually located at
`/etc/systemd/system/circonus-unified-agent.service.d`.

You can create or edit a drop-in file in the correct location using:

```sh
systemctl edit circonus-unified-agent
```

Increase the number of open files:

```ini
[Service]
LimitNOFILE=8192
```

Restart circonus-unified-agent:

```sh
systemctl edit circonus-unified-agent
```

### Linux Permissions

When using `method = "native"`, agent will attempt to use privileged raw
ICMP sockets. On most systems, doing so requires `CAP_NET_RAW` capabilities.

With systemd:

```sh
systemctl edit circonus-unified-agent
```

```ini
[Service]
CapabilityBoundingSet=CAP_NET_RAW
AmbientCapabilities=CAP_NET_RAW
```

```sh
systemctl restart circonus-unified-agent
```

Without systemd:

```sh
setcap cap_net_raw=eip /opt/circonus/unified-agent/sbin/circonus-unified-agentd
```

Reference [`man 7 capabilities`](http://man7.org/linux/man-pages/man7/capabilities.7.html) for more information about
setting capabilities.

When agent cannot listen on a privileged ICMP socket it will attempt to use
ICMP echo sockets. If you wish to use this method you must ensure agent's
group, usually `cua`, is allowed to use ICMP echo sockets:

```sh
sysctl -w net.ipv4.ping_group_range="GROUP_ID_LOW   GROUP_ID_HIGH"
```

Reference [`man 7 icmp`](http://man7.org/linux/man-pages/man7/icmp.7.html) for more information about ICMP echo
sockets and the `ping_group_range` setting.
