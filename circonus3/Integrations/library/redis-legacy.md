---
title: Redis
sidebar_custom_props:
  image: redis.svg
description: ""
legacy: true
implementation: broker
module: redis
tags:
  - nosql
  - database
---

# Redis

## Overview

Redis is an open source, BSD licensed, advanced key-value cache and store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets, sorted sets, bitmaps and hyperloglogs.

Circonus collects information from Redis in JSON format via the Redis NoSQL database's native interface.

In a multi-process or clustered environment, a tool such as Redis, with its atomic increments, can be used for global aggregation. Once aggregated, it can be checked and monitored by Circonus, with rates being derived from count changes over time.

## Configuration

Required parameters:
|Name|Description|
|----|-----------|
|port|The TCP port to which the check will connect (default: 6379).|
|command|The command to send to the redis server (default: INFO).|

Optional parameters:
|Name|Description|
|----|-----------|
|password|The password for authenticating to the redis server (default: "no password").|
|dbindex|Index of the database the command will run against (default: 0).|
