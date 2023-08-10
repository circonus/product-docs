---
title: LDAP
sidebar_custom_props:
image: ldap.svg
description: ""
implementation: broker
module: ldap
tags:
  - server
  - protocol
  - authentication
---

# LDAP

## Overview

The LDAP Check monitors directory services using the Lightweight Directory Access Protocol.

## Configuration

Optional parameters:

| Name               | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| port               | The TCP port to connect to the directory server (default: 389)                                  |
| dn                 | The Distinguished Name to query.                                                                |
| authtype           | The authentication type to use for the bind request. Choices are none or simple (default: none) |
| security_principal | The username to be used for authentication to the directory server.                             |
| password           | The password to be used for authentication to the directory server.                             |

## Metrics

| Name                          | Type    | Description                                                             |
| ----------------------------- | ------- | ----------------------------------------------------------------------- |
| time_to_connect_ms            | Numeric | The elapsed time, in milliseconds, to connect to the LDAP server.       |
| total_objects                 | Numeric | The number of objects returned by the query.                            |
| [ objectname ] \_object_count | Numeric | The count of objects of each type (e.g., cn, ou) returned by the query. |
