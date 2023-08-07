---
title: NGINX Plus
sidebar_custom_props:
  image: nginx-plus.svg
description: ""
implementation: cua
module: httptrap:cua:nginx_plus
---

# NGINX Plus

## Overview

Nginx Plus is a commercial version of the open source web server Nginx. To use this plugin you will need a license. For more information about the differences between Nginx (F/OSS) and Nginx Plus, visit: https://www.nginx.com/blog/whats-difference-nginx-foss-nginx-plus/.

Structures for Nginx Plus have been built based on history of
[status module documentation](http://nginx.org/en/docs/http/ngx_http_status_module.html)

## Configuration

```toml
# Read Nginx Plus' advanced status information
[[inputs.nginx_plus]]
  ## An array of Nginx status URIs to gather stats.
  urls = ["http://localhost/status"]
```
