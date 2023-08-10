---
title: Prometheus
sidebar_custom_props:
  image: prometheus.svg
logo_light: /img/library/prometheus.svg
description: ""
legacy: true
implementation: broker
module: prometheus
---

# Prometheus

## Overview

The prometheus module provides a simple way to push data into Circonus via the prometheus write support.

## Configuration

Create the prometheus check, and then configure your prometheus with the provided URL in its /write endpoint.

See: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write
