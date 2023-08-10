---
title: Ganglia
sidebar_custom_props:
image: ganglia.svg
description: ""
implementation: broker
module: ganglia
tags:
  - push
  - gmond
  - custom
---

# Ganglia

## Overview

[Ganglia](http://sourceforge.net/projects/ganglia/) is a scalable distributed monitoring system for high-performance computing systems such as clusters and Grids. It is based on a hierarchical design targeted at federations of clusters.

The Ganglia Check is a push-style check which allows you to run [Ganglia](http://ganglia.info/)'s gmond on your hosts and send count and timer metrics directly to an Enterprise Broker.

## Metrics

This check type pushes count and timer metrics to your Circonus Enterprise Broker user .
