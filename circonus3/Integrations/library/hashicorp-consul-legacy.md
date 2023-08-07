---
title: Hashicorp Consul
sidebar_custom_props:
  image: hashicorp-consul.svg
description: ""
legacy: true
implementation: broker
module: consul
tags:
  - hashi
  - health
  - service
  - node
  - state
---

# Hashicorp Consul

## Overview

The Hashicorp Consul Check collects metrics from Consul nodes. Consul makes available a range of metrics in various formats in order to measure the health and stability of a cluster, and to diagnose or predict potential issues.

Hashicorp Consul is a distributed service mesh to connect, secure, and configure services across any runtime platform and public or private cloud.

## Configuration

The only required parameter is the URL, made up of the target host and URI path. The URI path defaults to `/v1/health/state/any` to return all checks in all states, but it can be set to a number of other values. See the [Consul Health HTTP endpoint documentation](https://www.consul.io/api/health.html) for details.

Optional parameters:

| Name                 | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| port                 | The TCP port used to connect to the Consul API (default: 8500) |
| check_name           | A check name to use as a filter.                               |
| service_name         | A service name to use as a filter.                             |
| consul_dc            | A datacenter name to use as a filter.                          |
| service_blacklist    | A comma-separated list of service names to skip.               |
| node_blacklist       | A comma-separated list of node names to skip.                  |
| check_name_blacklist | A comma-separated list of check names to skip.                 |
