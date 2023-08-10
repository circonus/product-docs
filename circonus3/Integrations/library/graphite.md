---
title: Graphite
sidebar_custom_props:
image: graphite.png
description: ""
implementation: broker
module: graphite
tags:
  - carbon
  - graphite
  - whisper
---

# Graphite

## Overview

Graphite is an enterprise-ready monitoring tool designed to run on commodity hardware. Teams use Graphite to aggregate metrics regarding the performance of their websites, applications, business services, and networked servers.

The Graphite check allow you to forward your Graphite ingested metrics directly to Circonus, enabling long-term storage and advanced analytics.

## Configuration

There are three different Graphite modules:

- **Plain**: Plain and simple Graphite metric ingestion; must be run on an Enterprise Broker.

- **Pickle**: Ingest Graphite metrics using the Pickle format; must be run on an Enterprise Broker.

- **TLS**: Ingest Graphite metrics over a connection protected by TLS; may be run on a public Circonus Broker.
