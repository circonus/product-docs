---
title: DNS
sidebar_custom_props:
  image: dns.svg
description: ""
legacy: true
implementation: broker
module: dns
tags:
  - protocol
  - server
  - IP
  - address
  - Domain
  - Name
  - Service
---

# DNS

## Overview

This check type monitors your DNS server responses.

## Configuration

The DNS check offers support for a variety of DNS record types. The following record types are supported:

| Record | Description                                                   |
| ------ | ------------------------------------------------------------- |
| A      | Name to number for IPv4 (i.e. circonus.com -> 66.225.209.241) |
| AAAA   | Name to number for IPv6                                       |
| PTR    | Number to name (i.e. 66.225.209.241 -> circonus.com)          |
| TXT    | Text record                                                   |
| MX     | Mail exchange                                                 |
| CNAME  | Canonical name                                                |
| NS     | Nameserver                                                    |

After choosing the record type, enter the record you wish to look up. For example, if you chose the A record type, enter a Fully Qualified Domain Name (FQDN) as the "Record to look up".

## Metrics

| Name   | Type    | Description                                                                                                     |
| ------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| answer | text    | The value returned by the DNS server for the query                                                              |
| rtt    | numeric | The round trip time, in milliseconds, for the DNS request, from the perspective of the broker running the check |
| ttl    | numeric | The time-to-live value of the requested record                                                                  |
