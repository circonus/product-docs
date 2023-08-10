---
title: Varnish
sidebar_custom_props:
image: varnish.svg
description: ""
legacy: true
implementation: broker
module: varnish
tags:
  - proxy
  - accelerator
  - load-balancer
  - cache
  - server
---

# Varnish

This check type gathers Varnish statistics.

## Overview

Gather Varnish statistics. The check will connect to the Varnish server and issue the stats command. Metrics will be created for each key seen in the server's response, and each metric's value will be the value of that key.

For more info about Varnish, please see the Varnish site.

## Configuration

This check is only compatible with versions of Varnish prior to 3.0 (in Varnish 3.0, the stats command was removed).

Except for the target host/IP, there are no required parameters.

Optional parameters:
|Name|Description|
|----|-----------|
|port|The TCP port on which to contact the Varnish server (default: 8081).|

## Metrics

Typical metrics include:
|Name|Type|
|----|----|
|bytes_free|numeric|
|Client_uptime|numeric|
|N_backends|numeric|
|N_large_free_smf|numeric|
|N_new_purges_added|numeric|
|N_struct_sess_mem|numeric|
|N_struct_smf|numeric|
|N_total_active_purges|numeric|
|N_vcl_available|numeric|
|N_vcl_total|numeric|
|N_worker_threads|numeric|
|N_worker_threads_created|numeric|
|SHM_records|numeric|
|SHM_writes|numeric|
