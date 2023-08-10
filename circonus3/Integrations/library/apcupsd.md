---
title: Apcupsd
sidebar_custom_props:
  image: apc.svg
logo_light: /img/library/apc.svg
description: ""
implementation: cua
module: httptrap:cua:apcupsd
---

# Apcupsd

## Overview

This plugin reads data from an apcupsd daemon over its NIS network protocol.

Apcupsd should be installed and it's daemon should be running.

## Configuration

```toml
[[inputs.apcupsd]]
  # A list of running apcupsd server to connect to.
  # If not provided will default to tcp://127.0.0.1:3551
  servers = ["tcp://127.0.0.1:3551"]

  ## Timeout for dialing server.
  timeout = "5s"
```
