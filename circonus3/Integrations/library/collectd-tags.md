---
title: collectd + tags
sidebar_custom_props:
image: collectd+tags.svg
logo_dark: "/images/circonus/library/collectd+tags-dark.svg"
description: ""
implementation: broker
module: opentsdb:collectd_write_tsdb
tags:
  - collectd
  - tags
  - push
  - write_tsdb
---

# collectd + tags

## Overview

This check type allows you to run [collectd](http://collectd.org/) on your hosts and send that data directly to Circonus. Collectd is a lightweight C-based tool that has a variety of plugins available for data collection.

The collectd + tags Check allows you to run [collectd](https://collectd.org/) in combination with the [write_tsdb](https://collectd.org/wiki/index.php/Plugin:Write_TSDB) plugin to submit tagged metrics directly to Circonus.

## Configuration

Provided metrics depend on what is submitted by the underlying collectd daemon, and how it’s configured.

This Check _requires_ the write_tsdb plugin be used in combination with collectd.

For additional instructions in using collectd to submit metrics to Circonus, see the [collectd documentation](https://docs.circonus.com/circonus/integrations/library/collectd/).

## Metrics

Provided metrics depend on what is submitted by the underlying collectd daemon, and how it’s configured.
