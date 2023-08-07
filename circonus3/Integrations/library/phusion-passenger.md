---
title: Phusion Passenger
sidebar_custom_props:
  image: phusion-passenger.svg
description: ""
implementation: cua
module: httptrap:cua:passenger
---

# Phusion Passenger

## Overview

Gather [Phusion Passenger](https://www.phusionpassenger.com/) metrics using the `passenger-status` command line utility.

**Series Cardinality Warning**

Depending on your environment, this `passenger_process` measurement of this
plugin can quickly create a high number of series which, when unchecked, can
cause high load. You can use the following techniques to
manage your series cardinality:

- Use the
  [measurement filtering](https://github.com/circonus-labs/circonus-unified-agent/blob/master/docs/CONFIGURATION.md#measurement-filtering)
  options to exclude unneeded tags. In some environments, you may wish to use
  `tagexclude` to remove the `pid` and `process_group_id` tags.
- Add `__rollup:false` tag to limit cardinality and manage retention.

## Configuration

```toml
# Read metrics of passenger using passenger-status
[[inputs.passenger]]
  ## Path of passenger-status.
  ##
  ## Plugin gather metric via parsing XML output of passenger-status
  ## More information about the tool:
  ##   https://www.phusionpassenger.com/library/admin/apache/overall_status_report.html
  ##
  ## If no path is specified, then the plugin simply execute passenger-status
  ## hopefully it can be found in your PATH
  command = "passenger-status -v --show=xml"
```

### Permissions:

Agent must have permission to execute the `passenger-status` command. On most systems, agent runs as the `cua` user.
