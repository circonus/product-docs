---
title: OpenTelemetry
sidebar_custom_props:
  image: opentelemetry.svg
logo_light: /img/library/opentelemetry.svg
description: ""
implementation: broker
module: otlphttp
---

# OpenTelemetry

## Overview

The OpenTelemetry module provides a simple way to push native OpenTelemetry data into reconnoiter via the otlphttp exporter.

## Configuration

Simply configure otel collector to write to the provided URL in its otlphttp endpoint.

### Example

```
  exporters:
      otlphttp:
        metrics_endpoint: https://broker:43191/module/otlphttp/1b4e28ba-2fa1-11d2-893f-e9b761bde3fb/s3cr3tk3y
```
