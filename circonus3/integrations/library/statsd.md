---
title: StatsD
icon: "./img/statsd.svg"
description: ""
implementation: cua
module: httptrap:cua:statsd
---

# StatsD

## Overview

The statsd plugin is a special type of plugin which runs a backgrounded statsd
listener service while agent is running.

The format of the statsd messages was based on the format described in the
original [etsy statsd](https://github.com/etsy/statsd/blob/master/docs/metric_types.md)
implementation. In short, the agent statsd listener will accept:

- Gauges

  - `users.current.den001.myapp:32|g` <- standard
  - `users.current.den001.myapp:+10|g` <- additive
  - `users.current.den001.myapp:-10|g`

- Counters

  - `deploys.test.myservice:1|c` <- increments by 1
  - `deploys.test.myservice:101|c` <- increments by 101
  - `deploys.test.myservice:1|c|@0.1` <- with sample rate, increments by 10

- Sets
  - `users.unique:101|s`
  - `users.unique:101|s`
  - `users.unique:102|s` <- would result in a count of 2 for `users.unique`
- Timings & Histograms
  - `load.time:320|ms`
  - `load.time.nanoseconds:1|h`
  - `load.time:200|ms|@0.1` <- sampled 1/10 of the time

It is possible to omit repetitive names and merge individual stats into a
single line by separating them with additional colons:

- `users.current.den001.myapp:32|g:+10|g:-10|g`
- `deploys.test.myservice:1|c:101|c:1|c|@0.1`
- `users.unique:101|s:101|s:102|s`
- `load.time:320|ms:200|ms|@0.1`

This also allows for mixed types in a single line:

- `foo:1|c:200|ms`

The string `foo:1|c:200|ms` is internally split into two individual metrics
`foo:1|c` and `foo:200|ms` which are added to the aggregator separately.

## Configuration

```toml
# Statsd Server
[[inputs.statsd]]
  ## Instance ID -- required
  instance_id = ""

  ## Protocol, must be "tcp", "udp4", "udp6" or "udp" (default=udp)
  protocol = "udp"

  ## MaxTCPConnection - applicable when protocol is set to tcp (default=250)
  max_tcp_connections = 250

  ## Enable TCP keep alive probes (default=false)
  tcp_keep_alive = false

  ## Specifies the keep-alive period for an active network connection.
  ## Only applies to TCP sockets and will be ignored if tcp_keep_alive is false.
  ## Defaults to the OS configuration.
  # tcp_keep_alive_period = "2h"

  ## Address and port to host UDP listener on
  service_address = ":8125"

  ## separator to use between elements of a statsd metric
  metric_separator = "_"

  ## Parses extensions to statsd in the datadog statsd format
  ## currently supports metrics and datadog tags.
  ## http://docs.datadoghq.com/guides/dogstatsd/
  datadog_extensions = true

  ## Statsd data translation templates, more info can be read here:
  ## https://github.com/circonus-labs/circonus-unified-agent/blob/master/docs/TEMPLATE_PATTERN.md
  # templates = [
  #     "cpu.* measurement*"
  # ]

  ## Number of UDP messages allowed to queue up, once filled,
  ## the statsd server will start dropping packets
  allowed_pending_messages = 10000

  ## Maximum socket buffer size in bytes, once the buffer fills up, metrics
  ## will start dropping.  Defaults to the OS default.
  # read_buffer_size = 65535
```

### Plugin arguments

- **protocol** string: Protocol used in listener - tcp or udp options

- **max_tcp_connections** []int: Maximum number of concurrent TCP connections to allow. Used when protocol is set to tcp.

- **tcp_keep_alive** boolean: Enable TCP keep alive probes

- **tcp_keep_alive_period** internal.Duration: Specifies the keep-alive period for an active network connection

- **service_address** string: Address to listen for statsd UDP packets on

<!--

* **delete_gauges** boolean: Delete gauges on every collection interval

* **delete_counters** boolean: Delete counters on every collection interval

* **delete_sets** boolean: Delete set counters on every collection interval

* **delete_timings** boolean: Delete timings on every collection interval

* **percentiles** []int: Percentiles to calculate for timing & histogram stats
-->

- **allowed_pending_messages** integer: Number of messages allowed to queue up waiting to be processed. When this fills, messages will be dropped and logged.

<!--
* **percentile_limit** integer: Number of timing/histogram values to track per-measurement in the calculation of percentiles. Raising this limit increases the accuracy of percentiles but also increases the memory usage and cpu time.
-->

- **templates** []string: Templates for transforming statsd buckets into Circonus measurements and tags.

- **datadog_extensions** boolean: Enable parsing of DataDog's extensions to [dogstatsd format](http://docs.datadoghq.com/guides/dogstatsd/) Note: events are ignored at this time.

#### Templates for Statsd bucket --> measurement name and tags

The plugin supports specifying templates for transforming statsd buckets into
measurement names and tags. The templates have a _measurement_ keyword,
which can be used to specify parts of the bucket that are to be used in the
measurement name. Other words in the template are used as tag names. For example,
the following template:

```toml
templates = [
    "measurement.measurement.region"
]
```

would result in the following transformation:

```text
cpu.load.us-west:100|g
=> cpu_load,region=us-west 100
```

Users can also filter the template to use based on the name of the bucket,
using glob matching, like so:

```toml
templates = [
    "cpu.* measurement.measurement.region",
    "mem.* measurement.measurement.host"
]
```

which would result in the following transformation:

```text
cpu.load.us-west:100|g
=> cpu_load,region=us-west 100

mem.cached.localhost:256|g
=> mem_cached,host=localhost 256
```

Consult the [Template Patterns](https://github.com/circonus-labs/circonus-unified-agent/blob/master/docs/TEMPLATE_PATTERN.md) documentation for
additional details.
