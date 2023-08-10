---
title: Fibaro
sidebar_custom_props:
  image: fibaro.svg
logo_light: /img/library/fibaro.svg
logo_dark: /img/library/fibaro-dark.svg
description: ""
implementation: cua
module: httptrap:cua:fibaro
---

# Fibaro

## Overview

The Fibaro plugin makes HTTP calls to the Fibaro controller API to gather values of hooked devices.
Those values could be true (1) or false (0) for switches, percentage for dimmers, temperature, etc.

## Configuration

```toml
# Read devices value(s) from a Fibaro controller
[[inputs.fibaro]]
  ## Required Fibaro controller address/hostname.
  ## Note: at the time of writing this plugin, Fibaro only implemented http - no https available
  url = "http://<controller>:80"

  ## Required credentials to access the API (http://<controller/api/<component>)
  username = "<username>"
  password = "<password>"

  ## Amount of time allowed to complete the HTTP request
  # timeout = "5s"
```
