---
title: Lustre
sidebar_custom_props:
image: lustre.png
description: ""
implementation: cua
module: httptrap:cua:lustre2
---

# Lustre

## Overview

The [Lustre®](http://lustre.org/) file system is an open-source, parallel file system that supports many requirements of leadership class HPC simulation environments.

This plugin monitors the Lustre file system using its entries in the proc filesystem.

## Configuration

```toml
# Read metrics from local Lustre service on OST, MDS
[[inputs.lustre2]]
  ## An array of /proc globs to search for Lustre stats
  ## If not specified, the default will work on Lustre 2.5.x
  ##
  # ost_procfiles = [
  #   "/proc/fs/lustre/obdfilter/*/stats",
  #   "/proc/fs/lustre/osd-ldiskfs/*/stats",
  #   "/proc/fs/lustre/obdfilter/*/job_stats",
  # ]
  # mds_procfiles = [
  #   "/proc/fs/lustre/mdt/*/md_stats",
  #   "/proc/fs/lustre/mdt/*/job_stats",
  # ]
```

## Troubleshooting

Check for the default or custom procfiles in the proc filesystem, and reference the [Lustre Monitoring and Statistics Guide](http://wiki.lustre.org/Lustre_Monitoring_and_Statistics_Guide. This plugin does not report all information from these files, only a limited set of items corresponding to the above metric fields.
