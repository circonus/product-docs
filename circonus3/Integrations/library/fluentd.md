---
title: Fluentd
sidebar_custom_props:
  image: fluentd.svg
description: ""
implementation: cua
module: httptrap:cua:fluentd
---

# Fluentd

## Overview

The fluentd plugin gathers metrics from plugin endpoint provided by [in_monitor plugin](https://docs.fluentd.org/input/monitor_agent).
This plugin understands data provided by /api/plugin.json resource (/api/config.json is not covered).

You might need to adjust your fluentd configuration, in order to reduce series cardinality in case your fluentd restarts frequently. Every time fluentd starts, `plugin_id` value is given a new random value.
According to [fluentd documentation](https://docs.fluentd.org/configuration/config-file#common-plugin-parameter), you are able to add `@id` parameter for each plugin to avoid this behaviour and define custom `plugin_id`.

example configuration with `@id` parameter for http plugin:

```
<source>
  @type http
  @id http
  port 8888
</source>
```

## Configuration

```toml
# Read metrics exposed by fluentd in_monitor plugin
[[inputs.fluentd]]
  ## This plugin reads information exposed by fluentd (using /api/plugins.json endpoint).
  ##
  ## Endpoint:
  ## - only one URI is allowed
  ## - https is not supported
  endpoint = "http://localhost:24220/api/plugins.json"

  ## Define which plugins have to be excluded (based on "type" field - e.g. monitor_agent)
  exclude = [
	  "monitor_agent",
	  "dummy",
  ]
```
