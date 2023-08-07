---
title: HTTP JSON
sidebar_custom_props:
  image: json.svg
description: ""
implementation: cua
module: httptrap:cua:circ_http_json
---

# HTTP JSON

## Overview

This input plugin provides the ability to fetch [Circonus HTTPTrap stream tag and structured format metrics](/circonus/integrations/library/json-push-httptrap/#httptrap-json-format) and forward them to a Circonus Unified Agent check.

## Configuration

[IRONdb](https://docs.circonus.com/irondb/administration/monitoring/#json) example:

```toml
[[inputs.circ_http_json]]
  instance_id = "idb_stats"
  url = "http://127.0.0.1:8112/stats.json?format=tagged"

[[inputs.circ_http_json]]
  instance_id = "idb_mtev"
  url = "http://127.0.0.1:8112/mtev/stats.json?format=tagged"
```

Note the addition of `?format=tagged` use for these endpoints to ensure stream tagged, structured metric format.
