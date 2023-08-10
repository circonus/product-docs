---
title: Arista LANZ
sidebar_custom_props:
  image: arista.svg
logo_light: /img/library/arista.svg
logo_dark: /img/library/arista-dark.svg
description: ""
implementation: cua
module: httptrap:cua:lanz
---

# Arista LANZ

## Overview

This plugin provides a consumer for use with Arista Networks’ Latency Analyzer (LANZ)

Metrics are read from a stream of data via TCP through port 50001 on the
switches management IP. The data is in Protobuffers format. For more information on Arista LANZ

- https://www.arista.com/en/um-eos/eos-latency-analyzer-lanz

This plugin uses Arista's sdk.

- https://github.com/aristanetworks/goarista

## Configuration

You will need to configure LANZ and enable streaming LANZ data.

- https://www.arista.com/en/um-eos/eos-section-44-3-configuring-lanz
- https://www.arista.com/en/um-eos/eos-section-44-3-configuring-lanz#ww1149292

```toml
[[inputs.lanz]]
  servers = [
    "tcp://switch1.int.example.com:50001",
    "tcp://switch2.int.example.com:50001",
  ]
```
