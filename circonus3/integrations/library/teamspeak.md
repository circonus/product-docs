---
title: Teamspeak
sidebar_custom_props:
  image: teamspeak.svg
logo_light: /img/library/teamspeak.svg
description: ""
implementation: cua
module: httptrap:cua:teamspeak
---

# Teamspeak

## Overview

This plugin uses the Teamspeak 3 ServerQuery interface of the Teamspeak server to collect statistics of one or more
virtual servers. If you are querying an external Teamspeak server, make sure to add the host which is running the agent
to query_ip_whitelist.txt in the Teamspeak Server directory.

## Configuration

```toml
# Reads metrics from a Teamspeak 3 Server via ServerQuery
[[inputs.teamspeak]]
  ## Server address for Teamspeak 3 ServerQuery
  # server = "127.0.0.1:10011"
  ## Username for ServerQuery
  username = "serverqueryuser"
  ## Password for ServerQuery
  password = "secret"
  ## Array of virtual servers
  # virtual_servers = [1]
```
