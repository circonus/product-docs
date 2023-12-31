---
title: RethinkDB
sidebar_custom_props:
  image: rethinkdb.svg
logo_light: /img/library/rethinkdb.svg
logo_dark: /img/library/rethinkdb-dark.svg
description: ""
implementation: cua
module: httptrap:cua:rethinkdb
---

# RethinkDB

## Overview

Collect metrics from [RethinkDB](https://www.rethinkdb.com/).

## Configuration

This section contains the default TOML to configure the plugin. You can
generate it using `circonus-unified-agent --usage rethinkdb`.

```toml
[[inputs.rethinkdb]]
  ## An array of URI to gather stats about. Specify an ip or hostname
  ## with optional port add password. ie,
  ##   rethinkdb://user:auth_key@10.10.3.30:28105,
  ##   rethinkdb://10.10.3.33:18832,
  ##   10.0.0.1:10000, etc.
  servers = ["127.0.0.1:28015"]

  ## If you use actual rethinkdb of > 2.3.0 with username/password authorization,
  ## protocol have to be named "rethinkdb2" - it will use 1_0 H.
  # servers = ["rethinkdb2://username:password@127.0.0.1:28015"]

  ## If you use older versions of rethinkdb (<2.2) with auth_key, protocol
  ## have to be named "rethinkdb".
  # servers = ["rethinkdb://username:auth_key@127.0.0.1:28015"]
```
