---
title: Fluent-bit
weight: 30
---

# Fluent-bit

[Fluent-bit](http://fluentbit.io) is a fast log processor and forwarder for Linux, Windows, embedded Linux, MacOS and BSD family operating systems. It's part of the graduated [Fluentd](http://fluentd.org) ecosystem and a [CNCF](https://cncf.io) sub-project.

Fluent-bit allows you to collect log events or metrics from different sources, process them, and deliver them to different backends such as [Fluentd](http://fluentd.org), Elasticsearch, Splunk, DataDog, Kafka, New Relic, Azure services, AWS services, Google services, NATS, InfluxDB, or any custom HTTP end-point.

Fluent-bit comes with full SQL [stream processing](https://docs.fluentbit.io/manual/stream-processing/introduction) capabilities: data manipulation and analytics using SQL queries.

Fluent-bit runs on x86_64, x86, arm32v7, and arm64v8 architectures.

## Key concepts

There are a few key concepts that are really important to understand how Fluent-bit operates.

Before diving into Fluent-bit, it’s best to get acquainted with some of the key concepts of the service. This document provides a gentle introduction to those concepts as well as common terminology.

We’ve provided a list below of all the terms we’ll cover, but we recommend reading this document from start to finish to gain a more general understanding of this log and stream processor.

- Event or Record
- Filtering
- Tag
- Timestamp
- Match
- Structured Message

### Event or Record

Every incoming piece of data that belongs to a log or a metric that is retrieved by Fluent-bit is considered an event or a record.
```
As an example consider the following content of a Syslog file:
Jan 18 12:52:16 flb systemd[2222]: Starting GNOME Terminal Server
Jan 18 12:52:16 flb dbus-daemon[2243]: [session uid=1000 pid=2243] Successfully activated service 'org.gnome.Terminal'
Jan 18 12:52:16 flb systemd[2222]: Started GNOME Terminal Server.
Jan 18 12:52:16 flb gsd-media-keys[2640]: # watch_fast: "/org/gnome/terminal/legacy/" (establishing: 0, active: 0)
```
It contains four lines and all of them represent **four** independent events.

Internally, an event always has two components (in an array form):
``[TIMESTAMP, MESSAGE]``

### Filtering

In some cases, it is required to perform modifications on the events content. The process to alter, enrich, or drop events is called filtering.

There are many use cases when filtering is required, such as to:
- Append specific information to the Event like an IP address or metadata.
- Select a specific piece of the Event content.
- Drop Events that matches certain pattern.

### Tag

Every event that gets into Fluent-bit gets assigned a tag. This tag is an internal string that is used in a later stage by the router to decide which filter or output phase it must go through.

Most of the tags are assigned manually in the configuration. If a tag is not specified, Fluent-bit will assign the name of the input plugin instance from where that Event was generated.

>**_The only input plugin** that **does NOT** assign tags is input. This plugin speaks the Fluentd wire protocol called [Forward](https://docs.fluentbit.io/manual/pipeline/inputs/forward) where every event already comes with an associated tog. Fluent-bit will always use the incoming tag set by the client.

A tagged record must always have a matching rule.

To learn more about tags and matches, check out the [Router](https://docs.fluentbit.io/manual/concepts/data-pipeline/router) section in the Fluent-bit Documentation.

### Timestamp

The timestamp represents the time when an event was created. Every event contains an associated timestamp. The timestamp is a numeric fractional integer in the format:

``SECONDS.NANOSECONDS``

#### Seconds
The number of seconds that have elapsed since the Unix epoch.

#### Nanoseconds
Fractional second or one thousand-millionth of a second.

>A timestamp always exists, either set by the input plugin or discovered through a data parsing process.

### Match
Fluent-bit lets you deliver your collected and processed events to one or multiple destinations. This is done through a routing phase. A match represents a simple rule to select events where a tag matches a defined rule.

To learn more about tags and matches, check out the [Router](https://docs.fluentbit.io/manual/concepts/data-pipeline/router) section in the Fluent-bit Documentation.

### Structured Messages

Source events may or may not have a structure. A structure defines a set of keys and values inside the event message. As an example, consider the following two messages:

#### No Structured Message

``"Project Fluent Bit created on 1398289291"``

#### Structured Message

``{"project": "Fluent Bit", "created": 1398289291}``

At a low level, both are just an array of bytes, but the structured message defines keys and values. Having a structure helps to implement faster operations on data modifications.

>Fluent-bit **always** handles every event message as a structured message. For performance reasons, a binary serialization data format called [MessagePack](https://msgpack.org/) is used.
>
>Consider [MessagePack](https://msgpack.org/) as a binary version of JSON on steroids.

## Data pipeline

For a detailed explanation of the data pipeline concepts in Fluent-bit, see:

- [Input](https://docs.fluentbit.io/manual/concepts/data-pipeline/input)
- [Parser](https://docs.fluentbit.io/manual/concepts/data-pipeline/parser)
- [Filter](https://docs.fluentbit.io/manual/concepts/data-pipeline/filter)
- [Buffer](https://docs.fluentbit.io/manual/concepts/data-pipeline/buffer)
- [Router](https://docs.fluentbit.io/manual/concepts/data-pipeline/router)
- [Output](https://docs.fluentbit.io/manual/concepts/data-pipeline/output)

## Installation

For comprehensive instructions, see [building and installing Fluent-bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).

Installation instructions for:

- [Linux](https://docs.fluentbit.io/manual/installation/linux)
- [Windows](https://docs.fluentbit.io/manual/installation/windows)
- [Docker](https://docs.fluentbit.io/manual/installation/docker)

### Example Installation for Ubuntu

#### Server GPG key

The first step is to add our server GPG key to your keyring to ensure you can get our signed packages. Follow the official Debian wiki guidance: DebianRepository/UseThirdParty - [Debian Wiki](https://wiki.debian.org/DebianRepository/UseThirdParty#OpenPGP\_Key\_distribution)

```ssh
curl https://packages.fluentbit.io/fluentbit.key | gpg --dearmor > /usr/share/keyrings/fluentbit-keyring.gpg

```

#### Updated key from March 2022 

From the 1.9.0 and 1.8.15 releases please note that the GPG key has been updated at https://packages.fluentbit.io/fluentbit.key so ensure this new one is added.

The GPG Key fingerprint of the new key is:

```ssh
C3C0 A285 34B9 293E AF51  FABD 9F9D DC08 3888 C1CD
Fluentbit releases (Releases signing key) <releases@fluentbit.io>
```

The previous key is still available at https://packages.fluentbit.io/fluentbit-legacy.key and may be required to install previous versions.

The GPG Key fingerprint of the old key is:

```ssh
F209 D876 2A60 CD49 E680 633B 4FF8 368B 6EA0 722A
```

Refer to the [supported platform documentation](https://docs.fluentbit.io/manual/installation/supported-platforms) to see which platforms are supported in each release.

#### Update your sources list

On Ubuntu, you need to add our APT server entry to your sources lists, please add the following content at bottom of your **/etc/apt/sources.list** file - ensure to set ``CODENAME`` to your specific [Ubuntu release name](https://wiki.ubuntu.com/Releases) (e.g. focal for Ubuntu 20.04):

```ssh
deb [signed-by=/usr/share/keyrings/fluentbit-keyring.gpg] https://packages.fluentbit.io/ubuntu/${CODENAME} ${CODENAME} main
```

#### Update your repositories database

Now let your system update the *apt* database:

```ssh
sudo apt-get update
```

- We recommend upgrading your system (``sudo apt-get upgrade``). This could avoid potential issues with expired certificates.

- If you have the following error "Certificate verification failed", you might want to check if the package ``ca-certificates`` is properly installed (``sudo apt-get install ca-certificates``).

#### Install Fluent-bit

Using the following *apt-get* command you are able now to install the latest *fluent-bit*:

```ssh
sudo apt-get install fluent-bit
```

#### Update the Fluent-bit configuration file

Configure the Fluent-bit configuration file to collect logs and sent them to the c3-exporter ``fluent-bit.conf``. See the attached complete fluent-bit.conf file. 

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
    
# Optional
[INPUT]
    name   syslog
    parser syslog-rfc3164
    listen 127.0.0.1
    port   5140
    mode   tcp
    tag    syslog

# Adds a tag field named host.name to correlate metrics to logs
[FILTER]
    Name record_modifier
    Match *
    Record host.name ${HOSTNAME}

# Add your specific Circonus host, user, and password to the following
[OUTPUT]
    name         opensearch
    host         <circonusPipelineExporterIp>
    port         9200
    http_user    <ingestUserName>
    http_passwd  <ingestUserPassword>
    generate_id  on
    logstash_format on
    logstash_prefix logs-systemd
    logstash_dateformat %Y-%m-%d
    tls          off
    match        systemd

# Add your specific Circonus host, user, and password to the following
[OUTPUT]
    name         opensearch
    host         <circonusPipelineExporterIp>
    port         9200
    http_user    <ingestUserName>
    http_passwd  <ingestUserPassword>
    generate_id  on
    logstash_format on
    logstash_prefix logs-syslog
    logstash_dateformat %Y-%m-%d
    tls          off
    match        syslog

# Testing purposes only
#[OUTPUT]
#    name  stdout
#    match *
```

>**Optional:** Adding syslogs as an ``[INPUT]`` collection
>
>In the following directory, **/etc/rsyslog.d/** Create a file called **60-c3opensearch.conf** with the following content **action(type="omfwd" target="127.0.0.1" port="5140" protocol="TCP")** to start collecting syslogs using the configuration example from above.
>
>```ssh
>cat /etc/rsyslog.d/60-c3opensearch.conf 
>action(type="omfwd" target="127.0.0.1" port="5140" protocol="tcp")
>```
>After creating the file, restart the rsyslog ``sudo systemctl restart rsyslog``

Now the following step is to instruct **systemd** to enable the service:

```ssh
sudo systemctl start fluent-bit
```

If you do a status check, you should see a similar output like this:

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
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [cmetrics] version=0.5.8
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [ctraces ] version=0.2.7
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [input:systemd:systemd.0] initializing
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [input:systemd:systemd.0] storage_strategy='memory' (memory only)
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [input:syslog:syslog.1] initializing
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [input:syslog:syslog.1] storage_strategy='memory' (memory only)
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [in_syslog] TCP server binding 127.0.0.1:5140
Feb 13 15:27:25 ubuntu-c3playground-observability-v1 fluent-bit[1265874]: [2023/02/13 15:27:25] [ info] [sp] stream processor started
```

The default configuration of **fluent-bit** is collecting metrics of CPU usage and sending the records to the standard output, you can see the outgoing data in your **/var/log/syslog** file.

## Configuring Fluent-bit

It's recommended that you configure Fluent-bit via its configuration file. See the [Fluent-bit documentation](https://docs.fluentbit.io/manual/).

- [Format and Schmea](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/format-schema)
- [Configuration File](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file)
- [Variables](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/variables)
- [Commands](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/commands)
- [Upstream Servers](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/upstream-servers)
- [Record Accessor](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/record-accessor)

**CLI flags**

Fluent-bit also supports a CLI interface with various flags matching up to the configuration options available.

```shell
$ docker run --rm -it fluent/fluent-bit --help
Usage: /fluent-bit/bin/fluent-bit [OPTION]

Available Options
  -b  --storage_path=PATH specify a storage buffering path
  -c  --config=FILE       specify an optional configuration file
  -d, --daemon            run Fluent Bit in background mode
  -D, --dry-run           dry run
  -f, --flush=SECONDS     flush timeout in seconds (default: 1)
  -C, --custom=CUSTOM     enable a custom plugin
  -i, --input=INPUT       set an input
  -F  --filter=FILTER     set a filter
  -m, --match=MATCH       set plugin match, same as '-p match=abc'
  -o, --output=OUTPUT     set an output
  -p, --prop="A=B"        set plugin configuration property
  -R, --parser=FILE       specify a parser configuration file
  -e, --plugin=FILE       load an external plugin (shared lib)
  -l, --log_file=FILE     write log info to a file
  -t, --tag=TAG           set plugin tag, same as '-p tag=abc'
  -T, --sp-task=SQL       define a stream processor task
  -v, --verbose           increase logging verbosity (default: info)
  -w, --workdir           set the working directory
  -H, --http              enable monitoring HTTP server
  -P, --port              set HTTP server TCP port (default: 2020)
  -s, --coro_stack_size   set coroutines stack size in bytes (default: 24576)
  -q, --quiet             quiet mode
  -S, --sosreport         support report for Enterprise customers
  -V, --version           show version number
  -h, --help              print this help

Inputs
  cpu                     CPU Usage
  mem                     Memory Usage
  thermal                 Thermal
  kmsg                    Kernel Log Buffer
  proc                    Check Process health
  disk                    Diskstats
  systemd                 Systemd (Journal) reader
  netif                   Network Interface Usage
  docker                  Docker containers metrics
  docker_events           Docker events
  node_exporter_metrics   Node Exporter Metrics (Prometheus Compatible)
  fluentbit_metrics       Fluent Bit internal metrics
  prometheus_scrape       Scrape metrics from Prometheus Endpoint
  tail                    Tail files
  dummy                   Generate dummy data
  dummy_thread            Generate dummy data in a separate thread
  head                    Head Input
  health                  Check TCP server health
  http                    HTTP
  collectd                collectd input plugin
  statsd                  StatsD input plugin
  opentelemetry           OpenTelemetry
  nginx_metrics           Nginx status metrics
  serial                  Serial input
  stdin                   Standard Input
  syslog                  Syslog
  tcp                     TCP
  mqtt                    MQTT, listen for Publish messages
  forward                 Fluentd in-forward
  random                  Random

Filters
  alter_size              Alter incoming chunk size
  aws                     Add AWS Metadata
  checklist               Check records and flag them
  record_modifier         modify record
  throttle                Throttle messages using sliding window algorithm
  type_converter          Data type converter
  kubernetes              Filter to append Kubernetes metadata
  modify                  modify records by applying rules
  multiline               Concatenate multiline messages
  nest                    nest events by specified field values
  parser                  Parse events
  expect                  Validate expected keys and values
  grep                    grep events by specified field values
  rewrite_tag             Rewrite records tags
  lua                     Lua Scripting Filter
  stdout                  Filter events to STDOUT
  geoip2                  add geoip information to records
  nightfall               scans records for sensitive content

Outputs
  azure                   Send events to Azure HTTP Event Collector
  azure_blob              Azure Blob Storage
  azure_kusto             Send events to Kusto (Azure Data Explorer)
  bigquery                Send events to BigQuery via streaming insert
  counter                 Records counter
  datadog                 Send events to DataDog HTTP Event Collector
  es                      Elasticsearch
  exit                    Exit after a number of flushes (test purposes)
  file                    Generate log file
  forward                 Forward (Fluentd protocol)
  http                    HTTP Output
  influxdb                InfluxDB Time Series
  logdna                  LogDNA
  loki                    Loki
  kafka                   Kafka
  kafka-rest              Kafka REST Proxy
  nats                    NATS Server
  nrlogs                  New Relic
  null                    Throws away events
  opensearch              OpenSearch
  plot                    Generate data file for GNU Plot
  pgsql                   PostgreSQL
  skywalking              Send logs into log collector on SkyWalking OAP
  slack                   Send events to a Slack channel
  splunk                  Send events to Splunk HTTP Event Collector
  stackdriver             Send events to Google Stackdriver Logging
  stdout                  Prints events to STDOUT
  syslog                  Syslog
  tcp                     TCP Output
  td                      Treasure Data
  flowcounter             FlowCounter
  gelf                    GELF Output
  websocket               Websocket
  cloudwatch_logs         Send logs to Amazon CloudWatch
  kinesis_firehose        Send logs to Amazon Kinesis Firehose
  kinesis_streams         Send logs to Amazon Kinesis Streams
  opentelemetry           OpenTelemetry
  prometheus_exporter     Prometheus Exporter
  prometheus_remote_write Prometheus remote write
  s3                      Send to S3
```

For comprehensive instructions on Fluent-bit configuration, see: [Configuring Fluent-bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit)

## Related links
- [Fluent-bit Documentation](https://docs.fluentbit.io/manual/)
- [Fluent-bit Sandbox Environment (Instruqt)](https://play.instruqt.com/embed/Fluent/tracks/fluent-bit-getting-started-101?token=em_S2zOzhhDQepM0vDS)
- [Circonus Dashboards](/circonus3/dashboards/introduction/)
- [Getting Started with Circonus](/circonus3/getting-started/)
