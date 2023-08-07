---
title: Suricata
sidebar_custom_props:
  image: suricata.svg
description: ""
implementation: cua
module: httptrap:cua:suricata
---

# Suricata

## Overview

This plugin reports internal performance counters of the Suricata IDS/IPS
engine, such as captured traffic volume, memory usage, uptime, flow counters,
and much more. It provides a socket for the Suricata log output to write JSON
stats output to, and processes the incoming data to fit agent's format.

## Configuration

```toml
[[inputs.suricata]]
  ## Data sink for Suricata stats log.
  # This is expected to be a filename of a
  # unix socket to be created for listening.
  source = "/var/run/suricata-stats.sock"

  # Delimiter for flattening field keys, e.g. subitem "alert" of "detect"
  # becomes "detect_alert" when delimiter is "_".
  delimiter = "_"
```

### Suricata configuration

Suricata needs to deliver the 'stats' event type to a given unix socket for
this plugin to pick up. This can be done, for example, by creating an additional
output in the Suricata configuration file:

```yaml
- eve-log:
    enabled: yes
    filetype: unix_stream
    filename: /tmp/suricata-stats.sock
    types:
      - stats:
          threads: yes
```

### FreeBSD tuning

Under FreeBSD it is necessary to increase the localhost buffer space to at least 16384, default is 8192
otherwise messages from Suricata are truncated as they exceed the default available buffer space,
consequently no statistics are processed by the plugin.

```text
sysctl -w net.local.stream.recvspace=16384
sysctl -w net.local.stream.sendspace=16384
```
