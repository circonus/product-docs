---
title: ProcStat
sidebar_custom_props:
  image: procstat.svg
description: ""
implementation: cua
module: httptrap:cua:ProcStat
---

# ProcStat

## Overview

The procstat plugin can be used to monitor the system resource usage of one or more processes. The procstat_lookup metric displays the queried information, specifically the number of PIDs returned on a search.

Processes can be selected for monitoring using one of several methods:

pidfile
exe
pattern
user
systemd_unit
cgroup

## Configuration

```toml
# Monitor process cpu and memory usage
[[inputs.procstat]]
  ## PID file to monitor process
  pid_file = "/var/run/nginx.pid"
  ## executable name (ie, pgrep <exe>)
  # exe = "nginx"
  ## pattern as argument for pgrep (ie, pgrep -f <pattern>)
  # pattern = "nginx"
  ## user as argument for pgrep (ie, pgrep -u <user>)
  # user = "nginx"
  ## Systemd unit name, supports globs when include_systemd_children is set to true
  # systemd_unit = "nginx.service"
  # include_systemd_children = false
  ## CGroup name or path, supports globs
  # cgroup = "systemd/system.slice/nginx.service"

  ## Plugin specific polling interval, this will override global polling rate.
  # interval = “60s”

  ## Multiple [[inputs.procstat]] configurations can be utilized to define multiple unique search queries. If you do utilize this method, the “instance_id” needs to be unique for each configuration.

  ## override for process_name
  ## This is optional; default is sourced from /proc/<pid>/status
  # process_name = "bar"

  ## Field name prefix
  # prefix = ""

  ## When true add the full cmdline as a tag.
  # cmdline_tag = false

  ## Mode to use when calculating CPU usage. Can be one of 'solaris' or 'irix'.
  # mode = "irix"


  ## Add the PID as a tag instead of as a field.  When collecting multiple
  ## processes with otherwise matching tags this setting should be enabled to
  ## ensure each process has a unique identity.
  ##
  ## Enabling this option may result in a large number of series, especially
  ## when processes have a short lifetime.
  # pid_tag = false

  ## Method to use when finding process IDs.  Can be one of 'pgrep', or
  ## 'native'.  The pgrep finder calls the pgrep executable in the PATH while
  ## the native finder performs the search directly in a manor dependent on the
  ## platform.  Default is 'pgrep'
  # pid_finder = "pgrep"

```

## Metric Definitions

| Metric                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| cpu_time_guest_nice         | The amount of time that the CPU is running a virtual CPU for a guest                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | operating system, which is low-priority and can be interrupted by other processes. This metric is measured in hundredths of a second. |
| cpu_time_guest              | The amount of time that the CPU is running a virtual CPU for a guest operating system.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| cpu_time_idle               | The amount of time that the CPU is idle. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cpu_time_iowait             | The amount of time that the CPU is waiting for I/O operations to complete. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| cpu_time_irq                | The amount of time that the CPU is servicing interrupts. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cpu_time_nice               | The amount of time that the CPU is in user mode with low-priority processes, which can easily be interrupted by higher-priority processes. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| cpu_time_soft_irq           | The amount of time that the CPU is servicing software interrupts. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| cpu_time_steal              | The amount of time that the CPU is in stolen time, which is time spent in other operating systems in a virtualized environment. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                       |
| cpu_time_system             | The amount of time that the CPU is in system mode. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| cpu_time_user               | The amount of time that the CPU is in user mode. This metric is measured in hundredths of a second.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| cpu_usage                   | The percentage of time that the CPU is active in any capacity for this process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| created_at                  | Process creation timestamp.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| memory_locked               | One segment of memory that is locked into the system's physical memory by a specific process, it is locked until the specified app sends an unlock request, or is flushed from memory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| serviceprocess_memory_rss   | A measurement that shows how much RAM has been allocated to a process during its execution.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| serviceprocess_memory_stack | The stack is used for local variables. Space on the stack is reserved for local variables when they are declared ( at function entrance or elsewhere, depending on the language ), and the space is freed up when the variables go out of scope. Note: that the stack is also used for function return values, and the exact mechanisms of stack management may be language specific.Note: that the stack and the heap start at opposite ends of the process's free space and grow towards each other. If they should ever meet, then either a stack overflow error will occur, or else a call to new or malloc will fail due to insufficient memory available. |
| serviceprocess_memory_swap  | The amount of swap space currently in use. Note: If you run out of physical memory, you use virtual memory, which stores the data in memory on disk, This is “Swap” Memory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| serviceprocess_memory_usage | The amount of memory currently in use by this process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| serviceprocess_memory_vms   | Virtual Memory Size allocated to the process.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| serviceprocess_num_threads  | Number of threads used by the process                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pid                         | Process identifier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
