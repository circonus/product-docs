---
title: NGINX Plus API
sidebar_custom_props:
  image: nginx-plus.svg
description: ""
implementation: cua
module: httptrap:cua:nginx_plus_api
---

# NGINX Plus API

## Overview

Nginx Plus is a commercial version of the open source web server Nginx. The use this plugin you will need a license. For more information about the differences between Nginx (F/OSS) and Nginx Plus, visit: https://www.nginx.com/blog/whats-difference-nginx-foss-nginx-plus/.

## Configuration

```toml
# Read Nginx Plus API advanced status information
[[inputs.nginx_plus_api]]
  ## An array of Nginx API URIs to gather stats.
  urls = ["http://localhost/api"]
  # Nginx API version, default: 3
  # api_version = 3
```
