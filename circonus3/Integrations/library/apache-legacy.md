---
title: Apache
sidebar_custom_props:
image: apache.svg
description: ""
legacy: true
implementation: broker
module: http:apache
tags:
  - HTTP
  - server
  - status
---

# Apache

## Overview

This check type extracts metrics from an Apache HTTP Server status page.

## Configuration

With this check type, select from a variety of health and usage metrics, select the HTTP method to be used (GET, POST, HEAD), provide SSL and Server Authentication (username/password), add additional checks by parsing specific strings or patterns in BODY, or add any additional headers you may need.

## Metrics

Available metrics depend on the Apache server and relevant documentation can be found on the Apache HTTP Server project [website](https://httpd.apache.org/docs/).

The following metrics are typically available from Apache servers:

- bytes
- code
- duration
- truncated
- tt_connect
- tt_firstbyte
