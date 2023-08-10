---
title: NTP
sidebar_custom_props:
  image: ntp.svg
logo_light: /img/library/ntp.svg
description: ""
implementation: broker
module: ntp
tags:
  - network
  - time
  - protocol
  - clock
  - skew
---

# NTP

## Overview

Check clock skew via Network Time Protocol services.

## Configuration

If the control parameter is not enabled, the NTP check will determine the time telemetry relative to the Circonus broker's local time. If the control parameter is enabled, the Circonus broker will request the telemetry of the target relative to its preferred peer.

Optional parameters:
|Name|Description|
|----|-----------|
|port|The port used to contact the NTP target host (default: 123).|
|control|Use NTP control (mode 6) packets to query the server (default: false/off). Note that in the Circonus UI, control defaults to enabled, via the Use Control Protocol checkbox.|

## Metrics

Typical metrics when using control mode include:
|Name|Type|Description|
|----|----|-----------|
|clock_name|text|The name of the currently synced peer.|
|stratum|numeric|The stratum value of the currently synced peer.|
|when|numeric|Time difference between when the target received our query and now, calculated with the receive timestamp (rec), or the reference timestamp (reftime) if receive timestamp is not available.|
|poll|numeric|The current poll interval, in seconds.|
|delay|numeric|The round-trip delay, in milliseconds, between the target and its currently synced peer.|
|offset|numeric|The offset of the server clock relative to the system clock.|
|offset_ms|numeric|Same value as offset above, but expressed in milliseconds.|
|jitter|numeric|The root-mean-square (RMS) average of the most recent offset differences, representing the nominal error in estimating the offset.|
|dispersion|numeric|The estimated maximum error of the peer's time source, including network.|
|xleave|numeric|Interleave delay.|
|peers|numeric|Count of the target's associated peers.|

Typical metrics when not using control mode include:
|Name|Type|Description|
|----|----|-----------|
|offset|numeric|The offset of the target's clock relative to the broker's clock.|
|offset_ms|numeric|Same value as offset above, but expressed in milliseconds.|
|requests|numeric|Number of request packets sent to the target.|
|responses|numeric|Number of responses received from the target.|
|stratum|numeric|The stratum value of the target.|
|poll|numeric|The current poll interval, in seconds.|
|precision|numeric|Precision of the system clock, in seconds.|
|rtdisp|numeric|Root dispersion, the total accumulated dispersion to the reference clock in seconds.|
|rtdelay|numeric|Total round-trip delay to the reference clock.|

For more details on the metrics below, consult the NTPv4 specification, RFC 5905.
