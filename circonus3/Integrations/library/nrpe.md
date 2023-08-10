---
title: NRPE
sidebar_custom_props:
image: nagios.svg
logo_dark: "/images/circonus/library/nagios-dark.svg"
description: ""
implementation: broker
module: nrpe
tags:
  - Nagios
---

# NRPE

## Overview

The NRPE Check type checks your system via the Nagios Remote Plugin Executor (NRPE). Circonus will pull the metrics from the specified NRPE enabled host.

This allows you to remotely monitor machine metrics (disk usage, CPU load, etc.). NRPE can also communicate with some of the Nagios Windows agent addons, so you can execute scripts and check metrics on remote Windows machines as well.

## Configuration

Required parameters:
|Name|Description|
|----|-----------|
|port|The TCP port on which the NRPE agent can be reached.|
|command|The command to run on the remote node.|

Optional parameters:
|Name|Description|
|----|-----------|
|append_uom|If the NRPE value is returned with a unit of measure, append it to the metric name. Values are true/false or on/off.|
|use_ssl|Upgrade the TCP connection to use SSL/TLS (default: true).|
