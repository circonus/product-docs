---
title: NGINX Vhost Traffic Status (VTS)
sidebar_custom_props:
image: nginx.svg
description: ""
implementation: cua
module: httptrap:cua:nginx_vts
---

# NGINX Vhost Traffic Status (VTS)

## Overview

This plugin gathers Nginx status using external virtual host traffic status module - https://github.com/vozlt/nginx-module-vts. This is an Nginx module that provides access to virtual host status information. It contains the current status such as servers, upstreams, caches. This is similar to the live activity monitoring of Nginx plus.

For module configuration details please see its [documentation](https://github.com/vozlt/nginx-module-vts#synopsis).

## Configuration

```toml
# Read nginx status information using nginx-module-vts module
[[inputs.nginx_vts]]
  ## An array of Nginx status URIs to gather stats.
  urls = ["http://localhost/status"]
```
