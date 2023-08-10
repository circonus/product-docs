---
title: OpenMetrics
sidebar_custom_props:
image: openmetrics.svg
description: ""
implementation: broker
module: promtext
tags:
  - prometheus
  - scraper
  - open
  - metrics
---

# OpenMetrics

## Overview

The OpenMetrics Check uses the OpenMetrics format which is evolved from the Prometheus standard. It pulls metrics from a standard Prometheus scrape endpoint or "target". This Check affords the ability to leverage the many [Prometheus Exporters](https://prometheus.io/docs/instrumenting/exporters/) to expose metrics and pull them into the Circonus platform, enabling long-term storage and analytics beyond the capabilities of Prometheus.

Evolved from Prometheus, OpenMetrics is an effort to create an open standard for transmitting metrics at scale, with support for both text representation and Protocol Buffers. For more info about OpenMetrics, please see the [OpenMetrics site](https://openmetrics.io/).

## Configuration

The only required parameter is the URL to check, including scheme and hostname (as you would type into a browser's location bar.)

Optional parameters:

| Name              | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| auth_user         | The user to authenticate as.                               |
| auth_password     | The password to use during authentication.                 |
| header name/value | Include an arbitrary header in the HTTP request.           |
| host              | The Host header value to include in the HTTP request.      |
| port              | TCP port to which the broker should connect (default: 80)  |
| use_ssl           | Upgrade the TCP connection to use SSL/TLS (default: false) |
