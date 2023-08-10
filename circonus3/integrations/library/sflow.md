---
title: SFlow
sidebar_custom_props:
  image: sflow.png
logo_light: /img/library/sflow.png
logo_dark: /img/library/sflow-dark.png
description: ""
implementation: cua
module: httptrap:cua:sflow
---

# SFlow

## Overview

The SFlow Input Plugin provides support for acting as an SFlow V5 collector in
accordance with the specification from [sflow.org](https://sflow.org/).

Currently only Flow Samples of Ethernet / IPv4 & IPv4 TCP & UDP headers are
turned into metrics. Counters and other header samples are ignored.

## Configuration

```toml
[[inputs.sflow]]
  ## Address to listen for sFlow packets.
  ##   example: service_address = "udp://:6343"
  ##            service_address = "udp4://:6343"
  ##            service_address = "udp6://:6343"
  service_address = "udp://:6343"

  ## Set the size of the operating system's receive buffer.
  ##   example: read_buffer_size = "64KiB"
  # read_buffer_size = ""
```

## Troubleshooting

The [sflowtool](https://github.com/sflow/sflowtool) utility can be used to print sFlow packets, and compared
against the metrics produced by agent.

```
sflowtool -p 6343
```

If opening an issue, in addition to the output of sflowtool it will also be
helpful to collect a packet capture. Adjust the interface, host and port as
needed:

```
$ sudo tcpdump -s 0 -i eth0 -w circonus-unified-agent-sflow.pcap host 127.0.0.1 and port 6343
```
