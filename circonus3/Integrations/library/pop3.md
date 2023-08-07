---
title: POP3
sidebar_custom_props:
  image: pop3.svg
description: ""
implementation: broker
module: pop3
tags:
  - email
  - protocol
---

# POP3

# Overview

This check type checks mail retrieval with the Post Office Protocol 3 (POP3).

The check performs a login, followed by a STAT command, after which the associated telemetry is recorded.

## Configuration

Required parameters:
|Name|Description|
|----|-----------|
|port|The TCP port to which the POP3 check will connect (default: 110).|
|username|The user name required for access.|
|password|The password required for access.|

Optional parameters:
|Name|Description|
|----|-----------|
|use_ssl|Upgrade the TCP connection to use SSL/TLS (default: false).|
|expected_certificate_name|The expected subject name of the server's certificate.|

## Metrics

Metrics

Typical metrics include:
|Name|Type|Description|
|----|----|-----------|
|tt_firstbyte|numeric|The elapsed time between initiating the connection to receiving the first byte of the banner.|
|banner|text|The initial greeting banner sent by the server after connection.|
|login`duration|numeric|The elapsed time from the start of the login to login response.|
|login`status|text|A string representing the success or failure of the login.|
|stat`duration|numeric|The elapsed time from the start of the STAT operation to STAT response.|
|stat`message_count|numeric|The number of messages in the mailbox.|
|stat`message_size|numeric|The total number of bytes used by the mailbox.|
|quit|text|The server's response to the QUIT command, if the login was successful.|
