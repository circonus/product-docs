---
title: Munin
sidebar_custom_props:
  image: munin.svg
logo_light: /img/library/munin.svg
logo_dark: /img/library/munin-dark.svg
description: ""
implementation: broker
module: munin
---

# Munin

## Overview

Munin is a free open-source computer system monitoring, network monitoring and infrastructure monitoring software application. It is designed around a client-server architecture and can be configured to monitor any number of client machines.

The Munin Check collects metrics from the Munin Monitoring tool. Circonus will pull the metrics from the specified Munin Master host.

## Configuration

| Name | Description                                               |
| ---- | --------------------------------------------------------- |
| port | The TCP port to connect to the Munin host (default: 4949) |

## Metrics

The metrics available from the Munin check depend on the specific statistics returned by the target node. One additional text metric, remote_plugins, will be either set to the list of plugins returned by the target node, or set to no plugins if no plugins were found.
