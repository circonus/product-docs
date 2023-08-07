---
title: VMware vSphere
sidebar_custom_props:
  image: vmware.svg
logo_dark: "/images/circonus/library/vmware-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:vsphere
---

# VMware vSphere

## Overview

The VMware vSphere plugin uses the vSphere API to gather metrics from multiple vCenter servers.

- Clusters
- Hosts
- VMs
- Datastores

### Supported versions of vSphere

This plugin supports vSphere version 5.5 through 6.7.

## Configuration

NOTE: To disable collection of a specific resource type, simply exclude all metrics using the XX_metric_exclude.
For example, to disable collection of VMs, add this:

```
vm_metric_exclude = [ "*" ]
```

```toml
# Read metrics from one or many vCenters
[[inputs.vsphere]]
    ## List of vCenter URLs to be monitored. These three lines must be uncommented
  ## and edited for the plugin to work.
  vcenters = [ "https://vcenter.local/sdk" ]
  username = "user@corp.local"
  password = "secret"

  ## VMs
  ## Typical VM metrics (if omitted or empty, all metrics are collected)
  # vm_include = [ "/*/vm/**"] # Inventory path to VMs to collect (by default all are collected)
  # vm_exclude = [] # Inventory paths to exclude
  vm_metric_include = [
    "cpu.demand.average",
    "cpu.idle.summation",
    "cpu.latency.average",
    "cpu.readiness.average",
    "cpu.ready.summation",
    "cpu.run.summation",
    "cpu.usagemhz.average",
    "cpu.used.summation",
    "cpu.wait.summation",
    "mem.active.average",
    "mem.granted.average",
    "mem.latency.average",
    "mem.swapin.average",
    "mem.swapinRate.average",
    "mem.swapout.average",
    "mem.swapoutRate.average",
    "mem.usage.average",
    "mem.vmmemctl.average",
    "net.bytesRx.average",
    "net.bytesTx.average",
    "net.droppedRx.summation",
    "net.droppedTx.summation",
    "net.usage.average",
    "power.power.average",
    "virtualDisk.numberReadAveraged.average",
    "virtualDisk.numberWriteAveraged.average",
    "virtualDisk.read.average",
    "virtualDisk.readOIO.latest",
    "virtualDisk.throughput.usage.average",
    "virtualDisk.totalReadLatency.average",
    "virtualDisk.totalWriteLatency.average",
    "virtualDisk.write.average",
    "virtualDisk.writeOIO.latest",
    "sys.uptime.latest",
  ]
  # vm_metric_exclude = [] ## Nothing is excluded by default
  # vm_instances = true ## true by default

  ## Hosts
  ## Typical host metrics (if omitted or empty, all metrics are collected)
  # host_include = [ "/*/host/**"] # Inventory path to hosts to collect (by default all are collected)
  # host_exclude [] # Inventory paths to exclude
  host_metric_include = [
    "cpu.coreUtilization.average",
    "cpu.costop.summation",
    "cpu.demand.average",
    "cpu.idle.summation",
    "cpu.latency.average",
    "cpu.readiness.average",
    "cpu.ready.summation",
    "cpu.swapwait.summation",
    "cpu.usage.average",
    "cpu.usagemhz.average",
    "cpu.used.summation",
    "cpu.utilization.average",
    "cpu.wait.summation",
    "disk.deviceReadLatency.average",
    "disk.deviceWriteLatency.average",
    "disk.kernelReadLatency.average",
    "disk.kernelWriteLatency.average",
    "disk.numberReadAveraged.average",
    "disk.numberWriteAveraged.average",
    "disk.read.average",
    "disk.totalReadLatency.average",
    "disk.totalWriteLatency.average",
    "disk.write.average",
    "mem.active.average",
    "mem.latency.average",
    "mem.state.latest",
    "mem.swapin.average",
    "mem.swapinRate.average",
    "mem.swapout.average",
    "mem.swapoutRate.average",
    "mem.totalCapacity.average",
    "mem.usage.average",
    "mem.vmmemctl.average",
    "net.bytesRx.average",
    "net.bytesTx.average",
    "net.droppedRx.summation",
    "net.droppedTx.summation",
    "net.errorsRx.summation",
    "net.errorsTx.summation",
    "net.usage.average",
    "power.power.average",
    "storageAdapter.numberReadAveraged.average",
    "storageAdapter.numberWriteAveraged.average",
    "storageAdapter.read.average",
    "storageAdapter.write.average",
    "sys.uptime.latest",
  ]
    ## Collect IP addresses? Valid values are "ipv4" and "ipv6"
  # ip_addresses = ["ipv6", "ipv4" ]

  # host_metric_exclude = [] ## Nothing excluded by default
  # host_instances = true ## true by default


  ## Clusters
  # cluster_include = [ "/*/host/**"] # Inventory path to clusters to collect (by default all are collected)
  # cluster_exclude = [] # Inventory paths to exclude
  # cluster_metric_include = [] ## if omitted or empty, all metrics are collected
  # cluster_metric_exclude = [] ## Nothing excluded by default
  # cluster_instances = false ## false by default

  ## Datastores
  # datastore_include = [ "/*/datastore/**"] # Inventory path to datastores to collect (by default all are collected)
  # datastore_exclude = [] # Inventory paths to exclude
  # datastore_metric_include = [] ## if omitted or empty, all metrics are collected
  # datastore_metric_exclude = [] ## Nothing excluded by default
  # datastore_instances = false ## false by default

  ## Datacenters
  # datacenter_include = [ "/*/host/**"] # Inventory path to clusters to collect (by default all are collected)
  # datacenter_exclude = [] # Inventory paths to exclude
  datacenter_metric_include = [] ## if omitted or empty, all metrics are collected
  datacenter_metric_exclude = [ "*" ] ## Datacenters are not collected by default.
  # datacenter_instances = false ## false by default

  ## Plugin Settings
  ## separator character to use for measurement and field names (default: "_")
  # separator = "_"

  ## number of objects to retrieve per query for realtime resources (vms and hosts)
  ## set to 64 for vCenter 5.5 and 6.0 (default: 256)
  # max_query_objects = 256

  ## number of metrics to retrieve per query for non-realtime resources (clusters and datastores)
  ## set to 64 for vCenter 5.5 and 6.0 (default: 256)
  # max_query_metrics = 256

  ## number of go routines to use for collection and discovery of objects and metrics
  # collect_concurrency = 1
  # discover_concurrency = 1

  ## the interval before (re)discovering objects subject to metrics collection (default: 300s)
  # object_discovery_interval = "300s"

  ## timeout applies to any of the api request made to vcenter
  # timeout = "60s"

  ## When set to true, all samples are sent as integers.  Normally all
  ## samples from vCenter, with the exception of percentages, are integer
  ## values, but under some conditions, some averaging takes place internally in
  ## the plugin. Setting this flag to "false" will send values as floats to
  ## preserve the full precision when averaging takes place.
  # use_int_samples = true

  ## Custom attributes from vCenter can be very useful for queries in order to slice the
  ## metrics along different dimension and for forming ad-hoc relationships. They are disabled
  ## by default, since they can add a considerable amount of tags to the resulting metrics. To
  ## enable, simply set custom_attribute_exclude to [] (empty set) and use custom_attribute_include
  ## to select the attributes you want to include.
  ## By default, since they can add a considerable amount of tags to the resulting metrics. To
  ## enable, simply set custom_attribute_exclude to [] (empty set) and use custom_attribute_include
  ## to select the attributes you want to include.
  # custom_attribute_include = []
  # custom_attribute_exclude = ["*"]

  ## Optional SSL Config
  # ssl_ca = "/path/to/cafile"
  # ssl_cert = "/path/to/certfile"
  # ssl_key = "/path/to/keyfile"
  ## Use SSL but skip chain & host verification
  # insecure_skip_verify = false
```

### Objects and Metrics Per Query

By default, in vCenter's configuration a limit is set to the number of entities that are included in a performance chart query. Default settings for vCenter 6.5 and above is 256. Prior versions of vCenter have this set to 64.
A vCenter administrator can change this setting, see this [VMware KB article](https://kb.vmware.com/s/article/2107096) for more information.

Any modification should be reflected in this plugin by modifying the parameter `max_query_objects`

```
  ## number of objects to retrieve per query for realtime resources (vms and hosts)
  ## set to 64 for vCenter 5.5 and 6.0 (default: 256)
  # max_query_objects = 256
```

### Collection and Discovery concurrency

On large vCenter setups it may be prudent to have multiple concurrent go routines collect performance metrics
in order to avoid potential errors for time elapsed during a collection cycle. This should never be greater than 8,
though the default of 1 (no concurrency) should be sufficient for most configurations.

For setting up concurrency, modify `collect_concurrency` and `discover_concurrency` parameters.

```
  ## number of go routines to use for collection and discovery of objects and metrics
  # collect_concurrency = 1
  # discover_concurrency = 1
```

### Inventory Paths

Resources to be monitored can be selected using Inventory Paths. This treats the vSphere inventory as a tree structure similar
to a file system. A vSphere inventory has a structure similar to this:

```
<root>
+-DC0 # Virtual datacenter
   +-datastore # Datastore folder (created by system)
   | +-Datastore1
   +-host # Host folder (created by system)
   | +-Cluster1
   | | +-Host1
   | | | +-VM1
   | | | +-VM2
   | | | +-hadoop1
   | +-Host2 # Dummy cluster created for non-clustered host
   | | +-Host2
   | | | +-VM3
   | | | +-VM4
   +-vm # VM folder (created by system)
   | +-VM1
   | +-VM2
   | +-Folder1
   | | +-hadoop1
   | | +-NestedFolder1
   | | | +-VM3
   | | | +-VM4
```

#### Using Inventory Paths

Using familiar UNIX-style paths, one could select e.g. VM2 with the path `/DC0/vm/VM2`.

Often, we want to select a group of resource, such as all the VMs in a folder. We could use the path `/DC0/vm/Folder1/*` for that.

Another possibility is to select objects using a partial name, such as `/DC0/vm/Folder1/hadoop*` yielding all vms in Folder1 with a name starting with "hadoop".

Finally, due to the arbitrary nesting of the folder structure, we need a "recursive wildcard" for traversing multiple folders. We use the "**" symbol for that. If we want to look for a VM with a name starting with "hadoop" in any folder, we could use the following path: ```/DC0/vm/**/hadoop\*```

#### Multiple paths to VMs

As we can see from the example tree above, VMs appear both in its on folder under the datacenter, as well as under the hosts. This is useful when you like to select VMs on a specific host. For example, `/DC0/host/Cluster1/Host1/hadoop*` selects all VMs with a name starting with "hadoop" that are running on Host1.

We can extend this to looking at a cluster level: `/DC0/host/Cluster1/*/hadoop*`. This selects any VM matching "hadoop\*" on any host in Cluster1.

### Performance Considerations

#### Realtime vs. historical metrics

vCenter keeps two different kinds of metrics, known as realtime and historical metrics.

- Realtime metrics: Available at a 20 second granularity. These metrics are stored in memory and are very fast and cheap to query. Our tests have shown that a complete set of realtime metrics for 7000 virtual machines can be obtained in less than 20 seconds. Realtime metrics are only available on **ESXi hosts** and **virtual machine** resources. Realtime metrics are only stored for 1 hour in vCenter.
- Historical metrics: Available at a 5 minute, 30 minutes, 2 hours and 24 hours rollup levels. The vSphere agent plugin only uses the 5 minute rollup. These metrics are stored in the vCenter database and can be expensive and slow to query. Historical metrics are the only type of metrics available for **clusters**, **datastores** and **datacenters**.

For more information, refer to the vSphere documentation here: https://pubs.vmware.com/vsphere-50/index.jsp?topic=%2Fcom.vmware.wssdk.pg.doc_50%2FPG_Ch16_Performance.18.2.html

This distinction has an impact on how agent collects metrics. A single instance of an input plugin can have one and only one collection interval, which means that you typically set the collection interval based on the most frequently collected metric. Let's assume you set the collection interval to 1 minute. All realtime metrics will be collected every minute. Since the historical metrics are only available on a 5 minute interval, the vSphere agent plugin automatically skips four out of five collection cycles for these metrics. This works fine in many cases. Problems arise when the collection of historical metrics takes longer than the collection interval. This will cause error messages similar to this to appear in the agent logs:

`2019-01-16T13:41:10Z W! [agent] input "inputs.vsphere" did not complete within its interval`

This will disrupt the metric collection and can result in missed samples. The best practice workaround is to specify two instances of the vSphere plugin, one for the realtime metrics with a short collection interval and one for the historical metrics with a longer interval. You can use the `*_metric_exclude` to turn off the resources you don't want to collect metrics for in each instance. For example:

```toml
## Realtime instance
[[inputs.vsphere]]
  interval = "60s"
  vcenters = [ "https://someaddress/sdk" ]
  username = "someuser@vsphere.local"
  password = "secret"

  insecure_skip_verify = true
  force_discover_on_init = true

  # Exclude all historical metrics
  datastore_metric_exclude = ["*"]
  cluster_metric_exclude = ["*"]
  datacenter_metric_exclude = ["*"]

  collect_concurrency = 5
  discover_concurrency = 5

# Historical instance
[[inputs.vsphere]]

  interval = "300s"

  vcenters = [ "https://someaddress/sdk" ]
  username = "someuser@vsphere.local"
  password = "secret"

  insecure_skip_verify = true
  force_discover_on_init = true
  host_metric_exclude = ["*"] # Exclude realtime metrics
  vm_metric_exclude = ["*"] # Exclude realtime metrics

  max_query_metrics = 256
  collect_concurrency = 3
```

#### Configuring max_query_metrics setting

The `max_query_metrics` determines the maximum number of metrics to attempt to retrieve in one call to vCenter. Generally speaking, a higher number means faster and more efficient queries. However, the number of allowed metrics in a query is typically limited in vCenter by the `config.vpxd.stats.maxQueryMetrics` setting in vCenter. The value defaults to 64 on vSphere 5.5 and older and 256 on newver versions of vCenter. The vSphere plugin always checks this setting and will automatically reduce the number if the limit configured in vCenter is lower than max_query_metrics in the plugin. This will result in a log message similar to this:

`2019-01-21T03:24:18Z W! [input.vsphere] Configured max_query_metrics is 256, but server limits it to 64. Reducing.`

You may ask a vCenter administrator to increase this limit to help boost performance.

#### Cluster metrics and the max_query_metrics setting

Cluster metrics are handled a bit differently by vCenter. They are aggregated from ESXi and virtual machine metrics and may not be available when you query their most recent values. When this happens, vCenter will attempt to perform that aggregation on the fly. Unfortunately, all the subqueries needed internally in vCenter to perform this aggregation will count towards `config.vpxd.stats.maxQueryMetrics`. This means that even a very small query may result in an error message similar to this:

`2018-11-02T13:37:11Z E! Error in plugin [inputs.vsphere]: ServerFaultCode: This operation is restricted by the administrator - 'vpxd.stats.maxQueryMetrics'. Contact your system administrator`

There are two ways of addressing this:

- Ask your vCenter administrator to set `config.vpxd.stats.maxQueryMetrics` to a number that's higher than the total number of virtual machines managed by a vCenter instance.
- Exclude the cluster metrics and use either the basicstats aggregator to calculate sums and averages per cluster or use queries in the visualization tool to obtain the same result.

#### Concurrency settings

The vSphere plugin allows you to specify two concurrency settings:

- `collect_concurrency`: The maximum number of simultaneous queries for performance metrics allowed per resource type.
- `discover_concurrency`: The maximum number of simultaneous queries for resource discovery allowed.

While a higher level of concurrency typically has a positive impact on performance, increasing these numbers too much can cause performance issues at the vCenter server. A rule of thumb is to set these parameters to the number of virtual machines divided by 1500 and rounded up to the nearest integer.
