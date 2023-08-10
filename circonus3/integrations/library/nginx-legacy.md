---
title: NGINX
sidebar_custom_props:
  image: nginx.svg
logo_light: /img/library/nginx.svg
description: ""
legacy: true
implementation: broker
module: nginx
tags:
  - reverse-proxy
  - accelerator
  - load-balancer
  - cache
  - server
---

# NGINX

## Overview

NGiNX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. In addition to its HTTP server capabilities, NGiNX can also function as a reverse proxy, load balancer, and cache.

The NGiNX Check collects metrics from your NGiNX instances. Circonus will pull the metrics from the specified Nginx server through the Nginx statistics endpoint.

## Configuration

The only required parameter is the status URL. See the NGiNX documentation for information on configuring a status endpoint.

## Metrics

Typical metrics include the number of upstream servers, the total number of error status codes (broken down by code), the total number of active connections, and cache size, hits, misses, and more.
