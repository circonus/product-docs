---
title: ZFS
sidebar_custom_props:
  image: zfs.svg
description: ""
implementation: cua
module: httptrap:cua:zfs
tags:
  - system
  - filesystem
  - performance
---

# ZFS

## Overview

This ZFS plugin provides metrics from your ZFS filesystems. It supports ZFS on
Linux and FreeBSD. It gets ZFS stat from `/proc/spl/kstat/zfs` on Linux and
from `sysctl`, `zfs`, and `zpool` on FreeBSD.

## Configuration

```toml
[[inputs.zfs]]
  ## an instance id is required
  instance_id  ""
  ## By default, gather zpool stats
  poolMetrics = true

  # ATTENTION LINUX USERS:
  # Because circonus-unified-agent normally runs as an unprivileged user, it may not be
  # able to run "zpool {status,list}" without root privileges, due to the
  # permissions on /dev/zfs.
  # This was addressed in ZFSonLinux 0.7.0 and later.
  # See https://github.com/zfsonlinux/zfs/issues/362 for a potential workaround
  # if your distribution does not support unprivileged access to /dev/zfs.

  ## ZFS kstat path. Ignored on FreeBSD
  ## If not specified, then default is:
  # kstatPath = "/proc/spl/kstat/zfs"

  ## By default, agent gathers all zfs stats
  ## Override the stats list using the kstatMetrics array:
  ## For FreeBSD, the default is:
  # kstatMetrics = ["arcstats", "zfetchstats", "vdev_cache_stats"]
  ## For Linux, the default is:
  # kstatMetrics = ["abdstats", "arcstats", "dnodestats", "dbufcachestats",
  #     "dmu_tx", "fm", "vdev_mirror_stats", "zfetchstats", "zil"]

  ## By default, don't gather dataset stats
  # datasetMetrics = false
```
