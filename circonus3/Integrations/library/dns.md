---
title: DNS
sidebar_custom_props:
image: dns.svg
description: ""
implementation: cua
module: httptrap:cua:dns_query
---

# DNS

## Overview

The DNS plugin gathers dns query times in miliseconds - like [Dig](<https://en.wikipedia.org/wiki/Dig_(command)>)

## Configuration

```toml
# Query given DNS server and gives statistics
[[inputs.dns_query]]
  ## servers to query
  servers = ["8.8.8.8"]

  ## Network is the network protocol name.
  # network = "udp"

  ## Domains or subdomains to query.
  # domains = ["."]

  ## Query record type.
  ## Possible values: A, AAAA, CNAME, MX, NS, PTR, TXT, SOA, SPF, SRV.
  # record_type = "A"

  ## Dns server port.
  # port = 53

  ## Query timeout in seconds.
  # timeout = 2
```
