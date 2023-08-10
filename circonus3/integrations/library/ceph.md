---
title: Ceph
sidebar_custom_props:
  image: ceph.svg
logo_light: /img/library/ceph.svg
description: ""
implementation: cua
module: httptrap:cua:ceph
---

# Ceph

## Overview

Collects performance metrics from the MON and OSD nodes in a Ceph storage cluster.

The Ceph CUA module is compatible with the agent and can send metrics with a socket_listener.

### Admin Socket Stats

This gatherer works by scanning the configured SocketDir for OSD, MON, MDS and RGW socket files. When it finds
a MON socket, it runs **ceph --admin-daemon $file perfcounters_dump**. For OSDs it runs **ceph --admin-daemon $file perf dump**

The resulting JSON is parsed and grouped into collections, based on top-level key. Top-level keys are
used as collection tags, and all sub-keys are flattened. For example:

```json
{
  "paxos": {
    "refresh": 9363435,
    "refresh_latency": {
      "avgcount": 9363435,
      "sum": 5378.794002
    }
  }
}
```

Would be parsed into the following metrics, all of which would be tagged with collection=paxos:

- refresh = 9363435
- refresh_latency.avgcount: 9363435
- refresh_latency.sum: 5378.794002000

### Cluster Stats

This gatherer works by invoking ceph commands against the cluster thus only requires the ceph client, valid
ceph configuration and an access key to function (the ceph_config and ceph_user configuration variables work
in conjunction to specify these prerequisites). It may be run on any server you wish which has access to
the cluster. The currently supported commands are:

- ceph status
- ceph df
- ceph osd pool stats

## Configuration

```toml
# Collects performance metrics from the MON and OSD nodes in a Ceph storage cluster.
[[inputs.ceph]]
  ## This is the recommended interval to poll.  Too frequent and you will lose
  ## data points due to timeouts during rebalancing and recovery
  interval = '1m'

  ## All configuration values are optional, defaults are shown below

  ## location of ceph binary
  ceph_binary = "/usr/bin/ceph"

  ## directory in which to look for socket files
  socket_dir = "/var/run/ceph"

  ## prefix of MON and OSD socket files, used to determine socket type
  mon_prefix = "ceph-mon"
  osd_prefix = "ceph-osd"
  mds_prefix = "ceph-mds"
  rgw_prefix = "ceph-client"

  ## suffix used to identify socket files
  socket_suffix = "asok"

  ## Ceph user to authenticate as, ceph will search for the corresponding keyring
  ## e.g. client.admin.keyring in /etc/ceph, or the explicit path defined in the
  ## client section of ceph.conf for example:
  ##
  ##     [client.circonus]
  ##         keyring = /etc/ceph/client.circonus.keyring
  ##
  ## Consult the ceph documentation for more detail on keyring generation.
  ceph_user = "client.admin"

  ## Ceph configuration to use to locate the cluster
  ceph_config = "/etc/ceph/ceph.conf"

  ## Whether to gather statistics via the admin socket
  gather_admin_socket_stats = true

  ## Whether to gather statistics via ceph commands, requires ceph_user and ceph_config
  ## to be specified
  gather_cluster_stats = false
```
