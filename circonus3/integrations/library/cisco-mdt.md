---
title: Cisco MDT
sidebar_custom_props:
  image: cisco.svg
logo_light: /img/library/cisco.svg
description: ""
implementation: cua
module: httptrap:cua:cisco_telemetry_mdt
---

# Cisco MDT

## Overview

Cisco model-driven telemetry (MDT) is an input plugin that consumes
telemetry data from Cisco IOS XR, IOS XE and NX-OS platforms. It supports TCP & GRPC dialout transports.
GRPC-based transport can utilize TLS for authentication and encryption.
Telemetry data is expected to be GPB-KV (self-describing-gpb) encoded.

The GRPC dialout transport is supported on various IOS XR (64-bit) 6.1.x and later, IOS XE 16.10 and later, as well as NX-OS 7.x and later platforms.

The TCP dialout transport is supported on IOS XR (32-bit and 64-bit) 6.1.x and later.

## Configuration

```toml
[[inputs.cisco_telemetry_mdt]]
 ## Telemetry transport can be "tcp" or "grpc".  TLS is only supported when
 ## using the grpc transport.
 transport = "grpc"

 ## Address and port to host telemetry listener
 service_address = ":57000"

 ## Enable TLS; grpc transport only.
 # tls_cert = "/etc/circonus-unified-agent/cert.pem"
 # tls_key = "/etc/circonus-unified-agent/key.pem"

 ## Enable TLS client authentication and define allowed CA certificates; grpc
 ##  transport only.
 # tls_allowed_cacerts = ["/etc/circonus-unified-agent/clientca.pem"]

 ## Define (for certain nested telemetry measurements with embedded tags) which fields are tags
 # embedded_tags = ["Cisco-IOS-XR-qos-ma-oper:qos/interface-table/interface/input/service-policy-names/service-policy-instance/statistics/class-stats/class-name"]

 ## Define aliases to map telemetry encoding paths to simple measurement names
 [inputs.cisco_telemetry_mdt.aliases]
   ifstats = "ietf-interfaces:interfaces-state/interface/statistics"
```
