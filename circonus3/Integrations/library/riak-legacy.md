---
title: Riak
sidebar_custom_props:
  image: riak.svg
description: ""
legacy: true
implementation: broker
module: json:riak
tags:
  - nosql
  - database
---

# Riak

## Overview

Riak is an open source, distributed NoSQL database. Circonus collects information from riak in JSON format via the Riak database's native interface.

This check type pulls statistics from the Riak stats interface.

## Configuration

The only required parameter is the URL to check, including scheme and hostname (as you would type into a browser's location bar.)

Optional parameters:
|Name|Description|
|----|-----------|
|port|The TCP port to which the check will connect (default: 8098).|
|method|The HTTP method to use (default: GET).|
|http_version|The HTTP protocol version to use (default: 1.1).|
|header name/value|Include an arbitrary header in the HTTP request.|
|auth_method|HTTP authentication method to use (default: None).|
|auth_user|The user name to use during authentication.|
|auth_password|The password to use during authentication.|
