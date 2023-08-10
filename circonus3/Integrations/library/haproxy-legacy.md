---
title: HAProxy
sidebar_custom_props:
image: haproxy.svg
description: ""
legacy: true
implementation: broker
module: haproxy
tags:
  - proxy
  - accelerator
  - load
  - balancer
  - balancing
---

# HAProxy

## Overview

HAProxy, which stands for High Availability Proxy, is an open source, high performance TCP/HTTP load balancer and proxy server that spreads requests across multiple backend servers.

The HAProxy Check monitors your HAProxy load-balancers.

## Configuration

The only required parameter is the stats URI, typically /admin?stats;csv to pull management stats in comma-separated-value format.

Optional parameters:
| Name | Description |
|----------|-------------|
| host | The Host header value to include in the HTTP request. |
| port | TCP port to which the broker should connect (default: 80) |
| select |A regular expression to choose which metrics to report (default is to report all metrics found). The match is against the pxname and svname columns concatenated with a comma. |
| auth_user | The user to authenticate as. |
| auth_password | The password to use during authentication. |
| use_ssl | Upgrade the TCP connection to use SSL/TLS (default: false) |
