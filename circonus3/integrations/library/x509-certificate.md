---
title: x509 Certificate
sidebar_custom_props:
  image: x509-certificate.svg
logo_light: /img/library/x509-certificate.svg
description: ""
implementation: cua
module: httptrap:cua:x509_cert
---

# x509 Certificate

## Overview

This plugin provides information about X509 certificate accessible via local
file or network connection.

## Configuration

```toml
# Reads metrics from a SSL certificate
[[inputs.x509_cert]]
  ## List certificate sources
  sources = ["/etc/ssl/certs/ssl-cert-snakeoil.pem", "https://example.org:443"]

  ## Timeout for SSL connection
  # timeout = "5s"

  ## Pass a different name into the TLS request (Server Name Indication)
  ##   example: server_name = "myhost.example.org"
  # server_name = "myhost.example.org"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
```
