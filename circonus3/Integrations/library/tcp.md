---
title: TCP
sidebar_custom_props:
image: tcp.svg
description: ""
implementation: broker
module: tcp
tags:
  - protocol
  - network
  - availability
---

# TCP

## Overview

Check TCP service availability and responsiveness.

## Configuration

Required parameters:
|Name|Description|
|----|-----------|
|port|The TCP port on which the target service can be reached.|

Optional parameters:
|Name|Description|
|----|-----------|
|banner_match|This regular expression is matched against the response banner. If a match is not found, the check will be marked as bad.|
|use_ssl|Upgrade the connection to use SSL/TLS.|

## Metrics

Typical metrics include:
|Name|Type|Description|
|----|----|-----------|
|banner_match|text|If the banner_match parameter is supplied, this metric's value will be the string that resulted from the match.|
|tt_connect|numeric|Elapsed time from the start of the check to completing the TCP connection, in milliseconds.|
|duration|numeric|Elapsed time from the start of the check to its completion, in milliseconds.|\
