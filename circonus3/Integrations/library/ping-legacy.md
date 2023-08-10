---
title: Ping
sidebar_custom_props:
image: ping.svg
description: ""
legacy: true
implementation: broker
module: ping_icmp
tags:
  - protocol
  - system
  - availability
  - network
  - latency
---

# Ping

## Overview

The Ping Check tests the availability of a host on a network and measures the round-trip time for messages exchanged with that host through the Internet Control Message Protocol (ICMP) protocol.

Ping sends ICMP echo request packets to the target host and then waits for a response. It measures the elapsed time between the initial transmission and receiving the response (the round-trip time) and records any packet loss.

## Configuration

Note that the timeout should be adjusted appropriately when changing the number of packets and/or the packet interval. A minimum of packets × interval is required to ensure all packets can be sent before a timeout occurs.

Optional parameters:
|Name|Description|
|----|-----------|
|count|The number of ICMP echo request packets to send (default: 5).|
|interval_seconds|The time, in seconds, between sending each ICMP echo request packet (default: 2).|
|timeout_seconds|The maximum time, in seconds, to wait for responses to all echo request packets (default: 10).|

## Metrics

Typical metrics include:
|Name|Type|Description|
|----|----|-----------|
|count|numeric|The number of ICMP packets sent.|
|available|numeric|The percentage of ICMP requests that received a reply.|
|minimum|numeric|The lowest latency for a request-response among the responses received.|
|maximum|numeric|The highest latency for a request-response among the responses received.|
|average|numeric|The average response latency over all the requests sent by the check.|
