---
title: Log Ingestion
sidebar_position: 6
---

# Log Collection and Ingestion

## Overview

Log Ingestion provides a way to transform unstructured log data into structured data and ingest it using Circonus. Structured log data allows for improved queries and filtering based on the data format when searching logs for an event.

Circonus log ingestion requires either [Fluent-bit](/circonus3/integrations/agents/fluentbit/) or [Data-prepper](/circonus3/integrations/agents/data-prepper/introduction/) to be deployed to collect logs, which are then passed to the Circonus Pipeline Exporter for ingestion into Circonus.

**Basic Log Ingestion Data Flow into Circonus**

![Data flow diagram from a distributed application to Circonus](../img/analytics-observability_log_analytics_flow.png)

1. Log Ingestion relies on you adding log collection to your application's environment to gather and send log data.

2. [Fluent-bit](/circonus3/integrations/agents/fluentbit/) is used as the log collector that collects log data from a file and sends the log data to Circonus Pipeline Exporter which encrypts, compresses and transports to the Circonus platform).

3. The data can then be explored through Circonus search queries or the **Logs Explorer** in Circonus.

## Quick Installation Guide

**Overview**

Let's get some log data flowing into your new Circonus account. This quick install guide will get you up and running by shipping your linux or Windows logs to your Circonus account using Fluent-bit and the Circonus pipeline exporter.

After, you logs have been setup to be shipped to Circonus, we will then create an index pattern to then visualize your data.

**Installation Steps**

1. Fluent-bit
2. Circonus Pipeline Exporter
3. Circonus index pattern creation

### Fluent-bit for Linux

#### Install

A simple installation script is provided to be used for most Linux targets. This will by default install the most recent version released.

```ssh
curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
```

#### Configure

Modify the Fluent-bit configuration file to collect logs and sent them to the c3-exporter found at `/etc/fluent-bit/fluent-bit.conf`

Using nano as an example to edit the file:

```ssh
sudo nano /etc/fluent-bit/fluent-bit.conf
```

```ssh
# Example config

[SERVICE]
    # Flush
    # =====
    # set an interval of seconds before to flush records to a destination
    flush        15

    # Daemon
    # ======
    # instruct Fluent Bit to run in foreground or background mode.
    daemon       Off

    # Log_Level
    # =========
    # Set the verbosity level of the service, values can be:
    #
    # - error
    # - warning
    # - info
    # - debug
    # - trace
    #
    # by default 'info' is set, that means it includes 'error' and 'warning'.
    log_level    info

    # Parsers File
    # ============
    # specify an optional 'Parsers' configuration file
    parsers_file parsers.conf

    # Plugins File
    # ============
    # specify an optional 'Plugins' configuration file to load external plugins.
    plugins_file plugins.conf

    # HTTP Server
    # ===========
    # Enable/Disable the built-in HTTP Server for metrics
    http_server  Off
    http_listen  0.0.0.0
    http_port    2020

    # Storage
    # =======
    # Fluent Bit can use memory and filesystem buffering based mechanisms
    #
    # - https://docs.fluentbit.io/manual/administration/buffering-and-storage
    #
    # storage metrics
    # ---------------
    # publish storage pipeline metrics in '/api/v1/storage'. The metrics are
    # exported only if the 'http_server' option is enabled.
    #
    storage.metrics on

    # storage.path
    # ------------
    # absolute file system path to store filesystem data buffers (chunks).
    #
    # storage.path /tmp/storage

    # storage.sync
    # ------------
    # configure the synchronization mode used to store the data into the
    # filesystem. It can take the values normal or full.
    #
    # storage.sync normal

    # storage.checksum
    # ----------------
    # enable the data integrity check when writing and reading data from the
    # filesystem. The storage layer uses the CRC32 algorithm.
    #
    # storage.checksum off

    # storage.backlog.mem_limit
    # -------------------------
    # if storage.path is set, Fluent Bit will look for data chunks that were
    # not delivered and are still in the storage layer, these are called
    # backlog data. This option configure a hint of maximum value of memory
    # to use when processing these records.
    #
    # storage.backlog.mem_limit 5M

[INPUT]
    name           systemd
    tag            systemd
    strip_underscores on
    read_from_tail on

# Optional: Comment out if you don't setup syslog
[INPUT]
    name   syslog
    parser syslog-rfc3164
    listen 127.0.0.1
    port   5140
    mode   tcp
    tag    syslog

# Add your specific Circonus host, user, and password to the following
[OUTPUT]
    name         opensearch
    host         <hostIpHere>
    port         9200
    http_user    <userNameHere>
    http_passwd  <passWordHere>
    generate_id  on
    logstash_format on
    logstash_prefix logs-systemd
    logstash_dateformat %Y-%m-%d
    time_key on @timestamp
    time_key_Format %Y-%m-%dT%H:%M:%S
    tls          on
    match        systemd

# Optional: Comment out if you don't setup syslog
[OUTPUT]
    name         opensearch
    host         <hostIpHere>
    port         9200
    http_user    <userNameHere>
    http_passwd  <passWordHere>
    generate_id  on
    logstash_format on
    logstash_prefix logs-syslog
    logstash_dateformat %Y-%m-%d
    time_key on @timestamp
    time_key_Format %Y-%m-%dT%H:%M:%S
    tls          on
    match        syslog

# Testing purposes only
#[OUTPUT]
#    name  stdout
#    match *
```

> **Optional:** Adding syslogs as an `[INPUT]` collection
>
> In the following directory `/etc/rsyslog.d/` , create a file called `60-c3opensearch.conf` with the following content `action(type="omfwd" target="127.0.0.1" port="5140" protocol="TCP")` to start collecting **syslogs** using the configuration example from above.
>
> Run the following command to create the file.
>
> ```ssh
> $ sudo echo 'action(type="omfwd" target="127.0.0.1" port="5140" protocol="TCP")' > /etc/rsyslog.d/60-c3opensearch.conf
> ```
>
> Check the contents of the newly created file
>
> ```ssh
> $ cat /etc/rsyslog.d/60-c3opensearch.conf
> action(type="omfwd" target="127.0.0.1" port="5140" protocol="tcp")
> ```
>
> After creating the file, restart the rsyslog service
>
> ```ssh
> sudo systemctl restart rsyslog
> ```

#### Start the service

Now the following step is to instruct **systemd** to enable the service:

```ssh
sudo systemctl start fluent-bit
```

Checking Fluent-bit's status

```ssh
sudo systemctl status fluent-bit.service
● fluent-bit.service - Fluent Bit
     Loaded: loaded (/lib/systemd/system/fluent-bit.service; disabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-02-13 15:27:25 UTC; 1 week 1 day ago
       Docs: https://docs.fluentbit.io/manual/
   Main PID: 1265874 (fluent-bit)
      Tasks: 3 (limit: 19187)
     Memory: 6.9M
        CPU: 5min 11.783s
     CGroup: /system.slice/fluent-bit.service
             └─1265874 /opt/fluent-bit/bin/fluent-bit -c //etc/fluent-bit/fluent-bit.conf

Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [fluent bit] version=2.0.9, commit=, pid=1265874
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [storage] ver=1.4.0, type=memory, sync=normal, checksum=off, max_chunks_up=128
...
```

The default configuration of **fluent-bit** is collecting metrics of CPU usage and sending the records to the standard output, you can see the outgoing data in your **/var/log/syslog** file.

### Fluent-bit for Windows

#### Download and Install

[Download the Windows installer](https://releases.fluentbit.io/2.0/fluent-bit-2.0.9-win32.exe) and follow the installation wizard instructions.

#### Configure

Modify the Fluent-bit configuration file to collect logs and sent them to the c3-exporter found at `C:\Program Files\fluent-bit\conf\fluent-bit.conf`

```ssh
[SERVICE]
    # Flush
    # =====
    # set an interval of seconds before to flush records to a destination
    flush        15

    # Daemon
    # ======
    # instruct Fluent Bit to run in foreground or background mode.
    daemon       Off

    # Log_Level
    # =========
    # Set the verbosity level of the service, values can be:
    #
    # - error
    # - warning
    # - info
    # - debug
    # - trace
    #
    # by default 'info' is set, that means it includes 'error' and 'warning'.
    log_level    info

    # Parsers File
    # ============
    # specify an optional 'Parsers' configuration file
    parsers_file parsers.conf

    # Plugins File
    # ============
    # specify an optional 'Plugins' configuration file to load external plugins.
    plugins_file plugins.conf

    # HTTP Server
    # ===========
    # Enable/Disable the built-in HTTP Server for metrics
    http_server  Off
    http_listen  0.0.0.0
    http_port    2020

    # Storage
    # =======
    # Fluent Bit can use memory and filesystem buffering based mechanisms
    #
    # - https://docs.fluentbit.io/manual/administration/buffering-and-storage
    #
    # storage metrics
    # ---------------
    # publish storage pipeline metrics in '/api/v1/storage'. The metrics are
    # exported only if the 'http_server' option is enabled.
    #
    storage.metrics on

    # storage.path
    # ------------
    # absolute file system path to store filesystem data buffers (chunks).
    #
    # storage.path /tmp/storage

    # storage.sync
    # ------------
    # configure the synchronization mode used to store the data into the
    # filesystem. It can take the values normal or full.
    #
    # storage.sync normal

    # storage.checksum
    # ----------------
    # enable the data integrity check when writing and reading data from the
    # filesystem. The storage layer uses the CRC32 algorithm.
    #
    # storage.checksum off

    # storage.backlog.mem_limit
    # -------------------------
    # if storage.path is set, Fluent Bit will look for data chunks that were
    # not delivered and are still in the storage layer, these are called
    # backlog data. This option configure a hint of maximum value of memory
    # to use when processing these records.
    #
    # storage.backlog.mem_limit 5M

[INPUT]
    Name         winlog
    Channels     Setup,Application,Security,System,Windows PowerShell,Microsoft-Windows-sysmon/Operational
    Interval_Sec 1
    tag          winlog

# Adds a tag field named host.name to correlate metrics and logs
[FILTER]
    Name record_modifier
    Match *
    Record host.name ComputerName

[OUTPUT]
    name         opensearch
    # IP address of Circonus Pipeline Exporter
    host         <circonusPipelineExporterIp>
    port         9200
    # Credentials for your customer_ingest user
    http_user    <ingestUserName>
    http_passwd  <ingestUserPassword>
    generate_id  on
    logstash_format on
    logstash_prefix logs-winlog
    logstash_dateformat %Y-%m-%d
    time_key on @timestamp
    time_key_Format %Y-%m-%dT%H:%M:%S
    tls          on
    match        winlog
```

#### Create and Start the Service

Using Windows Powershell, you can manage the Fluent-bit service

Create and start a new Fluent-bit service, and check its status.

```ssh
PS> New-Service fluent-bit -BinaryPathName "C:\PROGRA~1\fluent-bit\bin\fluent-bit.exe -c C:\PROGRA~1\fluent-bit\conf\fluent-bit.conf" -StartupType Automatic && Start-Service fluent-bit && get-service fluent-bit
```

Fluent-bit's service can also be managed with the native Windows **Services Manager**.

1. Right-click on the Start button to open the WinX Menu
2. Select Run
3. Type services.msc in the Run box which opens
4. Windows Services Manager will open.
5. Search for fluent-bit under the **Name** column

Additional information can be found on [Fluent-bit's](https://docs.fluentbit.io/manual/installation/windows) website.

### Circonus Pipeline Exporter

The [Circonus pipeline exporter](https://github.com/circonus/c3-exporter) acts as a proxy between internal data collectors and data ingestion into the Circonus infrastructure. It offers a lower number of egress points, payload compression to reduce egress bandwidth costs, and enhanced security.

The pipeline exporter can be installed with a [package](https://github.com/circonus/c3-exporter/releases) or using a [Docker Container](https://hub.docker.com/r/circonus/c3-exporter). The following example will use a package.

_Note: Reference example OS Linux Ubuntu 22.04_

#### Download

Choose the Debian [package](https://github.com/circonus/c3-exporter/releases) for your platform and download it to your host.

#### Install

Once the package is downloaded on your host, Install the package

```ssh
sudo apt install /path/to/exporter/c3-exporter_0.0.9_amd64.deb
```

#### Configure

Next, set up the exporter to send data to your account. The configuration file is located at **/opt/circonus/c3/etc/c3-exporter.yaml** on your host after installation.

Example **c3-exporter.yaml** file

```ssh
server:
  listen_address: ":9200"
  cert_file: ""
  key_file: ""
  read_timeout: "60s"
  write_timeout: "60s"
  idle_timeout: "30s"
  read_header_timeout: "5s"
  handler_timeout: "30s"

destination:
  # Circonus host name
  host: "<yourAccountName>.c3.circonus.com"
  port: "9200"
  ca_file: ""
  enable_tls: true
  tls_skip_verify: false

circonus:
  check_target: ""
  # Circonus Data Source API Token
  api_key: "<apiToken>"
  api_url: "https://api.circonus.com/"
  flush_interval: "60s"
```

A full list of configuration options can be found at the [Circonus exporter GitHub repo](https://github.com/circonus/c3-exporter).

#### Restart

Restart the exporter so the configuration file changes will take effect and data will start being sent to Circonus.

```ssh
sudo systemctl restart circonus-c3-exporter.service
```

## Troubleshooting

### Fluent-bit

#### Linux

Check if the Fluent-bit service is running

```ssh
~$ sudo systemctl status fluent-bit.service
● fluent-bit.service - Fluent Bit
     Loaded: loaded (/lib/systemd/system/fluent-bit.service; disabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-02-13 15:27:25 UTC; 1 week 1 day ago
       Docs: https://docs.fluentbit.io/manual/
   Main PID: 1265874 (fluent-bit)
      Tasks: 3 (limit: 19187)
     Memory: 6.9M
        CPU: 5min 11.783s
     CGroup: /system.slice/fluent-bit.service
             └─1265874 /opt/fluent-bit/bin/fluent-bit -c //etc/fluent-bit/fluent-bit.conf

Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [fluent bit] version=2.0.9, commit=, pid=1265874
...
```

View the Fluent-bit logs while the service is running

```ssh
~$ sudo journalctl -u fluent-bit.service -f
Apr 05 19:52:04 ubuntu-c3-staging-observability-v1 fluent-bit[688648]: [2023/04/05 19:52:04] [ info] [fluent bit] version=2.0.9, commit=, pid=688648
Apr 05 19:52:04 ubuntu-c3-staging-observability-v1 fluent-bit[688648]: [2023/04/05 19:52:04] [ info] [storage] ver=1.4.0, type=memory, sync=normal, checksum=off, max_chunks_up=128
...
```

Additional information can be found on [Fluent-bit's](https://docs.fluentbit.io/manual/installation/linux) website.

#### Windows

Check if the Fluent-bit service is running

```ssh
PS> get-service fluent-bit

Status   Name               DisplayName
------   ----               -----------
Running  fluent-bit         fluent-bit
```

Start the service

```ssh
PS> Start-Service fluent-bit
```

Stop the service

```ssh
PS> Stop-Service fluent-bit
```

Remove the service

```ssh
PS> Remove-Service fluent-bit
```

Fluent-bit's service can also be managed with the native Windows **Services Manager**.

1. Right-click on the Start button to open the WinX Menu
2. Select Run
3. Type services.msc in the Run box which opens
4. Windows Services Manager will open.
5. Search for fluent-bit under the **Name** column

Additional information can be found on [Fluent-bit's](https://docs.fluentbit.io/manual/installation/windows#windows-service-support) website.

### Circonus Pipeline Exporter

```ssh
~$ sudo systemctl status circonus-c3-exporter.service
● circonus-c3-exporter.service - Circonus C3 Data Exporter
     Loaded: loaded (/lib/systemd/system/circonus-c3-exporter.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-03-29 19:18:09 UTC; 1 week 0 days ago
       Docs: https://github.com/circonus/c3-exporter
   Main PID: 615963 (c3-exporterd)
      Tasks: 10 (limit: 9525)
     Memory: 11.2M
        CPU: 13min 17.823s
     CGroup: /system.slice/circonus-c3-exporter.service
             └─615963 /opt/circonus/c3/sbin/c3-exporterd --config=/opt/circonus/c3/etc/c3-exporter.yaml

Apr 06 13:51:13 ubuntu-c3-staging-observability-v1 c3-exporterd[615963]: {"level":"info","req_id":"d2700936-301b-4aac-892e-4a95853e0765","url":"https://c3-staging.c3.circonus.com:9>
Apr 06 13:51:19 ubuntu-c3-staging-observability-v1 c3-exporterd[615963]: {"level":"info","req_id":"40214b01-85c9-4380-b290-e7d35e07126b","url":"https://c3-staging.c3.circonus.com:9>
...
```

View the circonus-c3-exporter logs while the service is running

```ssh
sudo journalctl -u circonus-c3-exporter -f
Feb 08 22:20:02 ubuntu-c3playground-observability systemd[1]: circonus-c3-exporter.service: Main process exited, code=exited, status=1/FAILURE
Feb 08 22:20:02 ubuntu-c3playground-observability systemd[1]: circonus-c3-exporter.service: Failed with result 'exit-code'.
Feb 08 22:20:03 ubuntu-c3playground-observability systemd[1]: circonus-c3-exporter.service: Scheduled restart job, restart counter is at 5.
Feb 08 22:20:03 ubuntu-c3playground-observability systemd[1]: Stopped Circonus C3 Data Exporter.
...
```

Example of data being processed and sent to Circonus.

```ssh
Feb 08 23:01:02 ubuntu-c3playground-observability c3-exporterd[20077]: {"level":"info","req_id":"ec6ed8da-8b49-4488-9634-a5f7c12d6308","remote":"127.0.0.1:56120","proto":"HTTP/1.1","method":"POST","URI":"/_bulk","upstream_resp_code":200,"handle_dur":"283.960295ms","ups"
```

## Create a Circonus Account Index Pattern

If you collected data using one of the Circonus ingest options or added sample data you get an index pattern, and you can start exploring your data. If you loaded your own data, follow these steps to create an index pattern.

1. Log into your Circonus account and navigate to **Management > Stack Management > Index Patterns > Create index pattern**.

2. Start typing in the **Index pattern name** field, and Circonus looks for the names of indices, data streams, and aliases that match your input.

   - To match multiple sources, use a wildcard (`*`). For example, `filebeat-*` matches `filebeat-apache-a`, `filebeat-apache-b`, and so on.
   - To match multiple single sources, enter their names, separated by a comma. Do not include a space after the comma. `filebeat-a`,`filebeat-b` matches two indices, but does not match `filebeat-c`.
   - To exclude a source, use a minus sign (-), for example, `-test3`.

3. If Circonus detects an index with a timestamp, expand the **Timestamp field** menu, and then select the default field for filtering your data by time.

   - If your index doesn’t have time-based data, choose **I don’t want to use the time filter**.
   - If you don’t set a default time field, you can’t use global time filters on your dashboards. This is useful if you have multiple time fields and want to create dashboards that combine visualizations based on different timestamps.

4. Click **Create index pattern**.

   - Circonus is now configured to use your data. When a new field is added to an index, the index pattern field list is updated the next time the index pattern is loaded.

5. Select this newly created index pattern when you search and visualize your data.
