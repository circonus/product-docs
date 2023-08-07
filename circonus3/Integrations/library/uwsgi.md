---
title: uWSGI
sidebar_custom_props:
  image: uwsgi.svg
logo_dark: "/images/circonus/library/uwsgi-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:uwsgi
---

# uWSGI

## Overview

The uWSGI input plugin gathers metrics about uWSGI using its [Stats Server](https://uwsgi-docs.readthedocs.io/en/latest/StatsServer.html).

## Configuration

```toml
[[inputs.uwsgi]]
  ## List with urls of uWSGI Stats servers. Url must match pattern:
  ## scheme://address[:port]
  ##
  ## For example:
  ## servers = ["tcp://localhost:5050", "http://localhost:1717", "unix:///tmp/statsock"]
  servers = ["tcp://127.0.0.1:1717"]

  ## General connection timeout
  # timeout = "5s"
```
