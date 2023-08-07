---
title: Fireboard
sidebar_custom_props:
  image: fireboard.svg
description: ""
implementation: cua
module: httptrap:cua:fireboard
---

# Fireboard

## Overview

The fireboard plugin gathers the real time temperature data from fireboard
thermometers. In order to use this input plugin, you'll need to sign up to use
the [Fireboard REST API](https://docs.fireboard.io/reference/restapi.html).

## Configuration

```toml
[[inputs.fireboard]]
  ## Specify auth token for your account
  auth_token = "invalidAuthToken"
  ## You can override the fireboard server URL if necessary
  # url = https://fireboard.io/api/v1/devices.json
  ## You can set a different http_timeout if you need to
  # http_timeout = 4
```

### auth_token

In lieu of requiring a username and password, this plugin requires an
authentication token that you can generate using the [Fireboard REST API](https://docs.fireboard.io/reference/restapi.html#Authentication).

### url

While there should be no reason to override the URL, the option is available
in case Fireboard changes their site, etc.

### http_timeout

If you need to increase the HTTP timeout, you can do so here. You can set this
value in seconds. The default value is four (4) seconds.
