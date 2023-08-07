---
title: Riak
sidebar_custom_props:
  image: riak.svg
description: ""
implementation: cua
module: httptrap:cua:riak
---

# Riak

## Overview

The Riak plugin gathers metrics from one or more riak instances.

## Configuration

```toml
# Description
[[inputs.riak]]
  # Specify a list of one or more riak http servers
  servers = ["http://localhost:8098"]
```
