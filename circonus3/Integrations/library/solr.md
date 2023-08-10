---
title: Solr
sidebar_custom_props:
image: solr.svg
description: ""
implementation: cua
module: httptrap:cua:solr
---

# Solr

## Overview

The [solr](http://lucene.apache.org/solr/) plugin collects stats via the
[MBean Request Handler](https://cwiki.apache.org/confluence/display/solr/MBean+Request+Handler)

More about [performance statistics](https://cwiki.apache.org/confluence/display/solr/Performance+Statistics+Reference)

Tested from 3.5 to 7.\*

## Configuration

```toml
[[inputs.solr]]
  ## specify a list of one or more Solr servers
  servers = ["http://localhost:8983"]
  ##
  ## specify a list of one or more Solr cores (default - all)
  # cores = ["main"]
  ##
  ## Optional HTTP Basic Auth Credentials
  # username = "username"
  # password = "pa$$word"
```
