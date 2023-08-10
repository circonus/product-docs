---
title: CouchDB
sidebar_custom_props:
image: couchdb.svg
description: ""
implementation: cua
module: httptrap:cua:couchdb
---

# CouchDB

## Overview

The CouchDB plugin gathers metrics of CouchDB using [\_stats](http://docs.couchdb.org/en/1.6.1/api/server/common.html?highlight=stats#get--_stats) endpoint.

## Configuration

```toml
[[inputs.couchdb]]
  ## Works with CouchDB stats endpoints out of the box
  ## Multiple Hosts from which to read CouchDB stats:
  hosts = ["http://localhost:8086/_stats"]

  ## Use HTTP Basic Authentication.
  # basic_username = "circonus"
  # basic_password = "p@ssw0rd"
```
