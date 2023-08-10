---
title: NATS
sidebar_custom_props:
image: nats.svg
description: ""
implementation: cua
module: httptrap:cua:nats
---

# NATS

## Overview

The [NATS](http://www.nats.io/about/) monitoring plugin gathers metrics from
the NATS [monitoring http server](https://www.nats.io/documentation/server/gnatsd-monitoring/).

## Configuration

```toml
[[inputs.nats]]
  ## The address of the monitoring endpoint of the NATS server
  server = "http://localhost:8222"

  ## Maximum time to receive response
  # response_timeout = "5s"
```
