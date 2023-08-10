---
title: OpenLDAP
sidebar_custom_props:
image: openldap.png
description: ""
implementation: cua
module: httptrap:cua:openldap
---

# OpenLDAP

## Overview

This plugin gathers metrics from OpenLDAP's cn=Monitor backend.

## Configuration

To use this plugin you must enable the [slapd monitoring](https://www.openldap.org/devel/admin/monitoringslapd.html) backend.

```toml
[[inputs.openldap]]
  host = "localhost"
  port = 389

  # ldaps, starttls, or no encryption. default is an empty string, disabling all encryption.
  # note that port will likely need to be changed to 636 for ldaps
  # valid options: "" | "starttls" | "ldaps"
  tls = ""

  # skip peer certificate verification. Default is false.
  insecure_skip_verify = false

  # Path to PEM-encoded Root certificate to use to verify server certificate
  tls_ca = "/etc/ssl/certs.pem"

  # dn/password to bind with. If bind_dn is empty, an anonymous bind is performed.
  bind_dn = ""
  bind_password = ""

  # reverse metric names so they sort more naturally
  # Defaults to false if unset, but is set to true when generating a new config
  reverse_metric_names = true
```
