---
title: BIND
sidebar_custom_props:
image: bind.svg
description: ""
implementation: cua
module: httptrap:cua:bind
---

# BIND

## Overview

This plugin decodes the JSON or XML statistics provided by BIND 9 nameservers.

### XML Statistics Channel

Version 2 statistics (BIND 9.6 - 9.9) and version 3 statistics (BIND 9.9+) are supported. Note that
for BIND 9.9 to support version 3 statistics, it must be built with the `--enable-newstats` compile
flag, and it must be specifically requested via the correct URL. Version 3 statistics are the
default (and only) XML format in BIND 9.10+.

### JSON Statistics Channel

JSON statistics schema version 1 (BIND 9.10+) is supported. As of writing, some distros still do
not enable support for JSON statistics in their BIND packages.

## Configuration

- **urls** []string: List of BIND statistics channel URLs to collect from. Do not include a
  trailing slash in the URL. Default is "http://localhost:8053/xml/v3".
- **gather_memory_contexts** bool: Report per-context memory statistics.
- **gather_views** bool: Report per-view query statistics.

The following table summarizes the URL formats which should be used, depending on your BIND
version and configured statistics channel.

| BIND Version | Statistics Format | Example URL                   |
| ------------ | ----------------- | ----------------------------- |
| 9.6 - 9.8    | XML v2            | http://localhost:8053         |
| 9.9          | XML v2            | http://localhost:8053/xml/v2  |
| 9.9+         | XML v3            | http://localhost:8053/xml/v3  |
| 9.10+        | JSON v1           | http://localhost:8053/json/v1 |

### Configuration of BIND Daemon

Add the following to your named.conf if running the agent on the same host as the BIND daemon:

```
statistics-channels {
    inet 127.0.0.1 port 8053;
};
```

Alternatively, specify a wildcard address (e.g., 0.0.0.0) or specific IP address of an interface to
configure the BIND daemon to listen on that address. Note that you should secure the statistics
channel with an ACL if it is publicly reachable. Consult the BIND Administrator Reference Manual
for more information.
