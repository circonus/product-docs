---
title: "Linux - OpenTelemetry"
sidebar_position: 1
---

# OTel Collector - Linux

## Overview

Circonus supports the [OpenTelemetry](https://opentelemetry.io/) (OTel) project, which provides a single set of APIs, libraries, agents, and collector services to capture distributed logs, traces and metrics from your application. OTel is a Cloud Native Computing Foundation (CNCF) project.

We will be setting up the OTel Collector to ship logs to Circonus. It is a vendor-agnostic agent that can collect logs from multiple sources, transform them, and export them to multiple destinations. It is a powerful tool in the observability toolkit.

This quick install guide will get you up and running by shipping your linux logs to Circonus.

## Pre-requisites

- [Circonus Telemetry Cloud Account](https://login.circonus.com/signup)
- A Linux host to install the OTel Collector

## Install

Find the most [recent version](https://github.com/open-telemetry/opentelemetry-collector-releases/releases) of the OTel Collector contrib and download/install the appropriate package.

Example: deb amd64 systems.

```bash
curl -LO https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.91.0/otelcol-contrib_0.91.0_linux_amd64.deb &&
sudo dpkg -i otelcol-contrib_0.91.0_linux_amd64.deb
```

Example: rpm amd64 systems.

```bash
curl -LO https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.91.0/otelcol-contrib_0.91.0_linux_amd64.rpm &&
sudo yum install -y otelcol-contrib_0.91.0_linux_amd64.rpm
```

### Configure

Modify the OTel Collector configuration file to collect logs and sent them to the Circonus.

- Update the **Extensions** block containing following values for both `password:` and `username:` with your Circonus ingestion credentials.
- Update the **Exporters** block containing the following value for `endpoint:` with your Circonus ingestion url.

```bash
sudo nano /etc/otelcol-contrib/config.yaml
```

```yaml showLineNumbers
# To limit exposure to denial of service attacks, change the host in endpoints below from 0.0.0.0 to a specific network interface.
# See https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md#safeguards-against-denial-of-service-attacks

extensions:
  health_check:
  basicauth/client:
    client_auth:
      password: ${ingestPassword}
      username: ${ingestUsername}

receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

  # Collecting Standard Linux logs Note: Requires enhanced permissions. CMD: "sudo usermod -aG adm otelcol-contrib"
  filelog:
    include:
      # Logs for CentOS, Amazon Linux, and Red Hat Enterprise Linux
      - /var/log/audit/audit.log
      - /var/log/secure
      - /var/log/messages
      - /var/log/yum.log
      # Logs for Debian and Ubuntu
      - /var/log/auth.log
      - /var/log/syslog
      - /var/log/dpkg.log
      - /var/log/kern.log

processors:
  batch: {}
  memory_limiter:
    check_interval: 5s
    limit_percentage: 80
    spike_limit_percentage: 25
  resourcedetection:
    detectors:
      - gcp
      - env
      - system
    override: false
    timeout: 2s

exporters:
  otlphttp:
    auth:
      authenticator: basicauth/client
    compression: gzip
    endpoint: ${circonusIngestUrl}
  debug:

service:
  pipelines:
    logs:
      exporters:
        - otlphttp
      processors:
        - resourcedetection
        - batch
      receivers:
        - filelog

  extensions:
    - health_check
    - basicauth/client

```

### Restart and modify the service

To collect logs from linux, the OTel Collector needs enhanced permissions. The following command will add the OTel Collector service to the **adm** group.

Then, instruct **systemd** to restart the service so the configuration file changes will take effect and data will start being sent to Circonus.

```bash
sudo usermod -aG adm otelcol-contrib && 
sudo systemctl restart otelcol-contrib
```

## Troubleshooting

If logs are not showing in your account, start with the following

### Is the OTel Collector service running

Check the OTel Collector status is ```active (running)```

```bash showLineNumbers

```bash showLineNumbers
joshuajohnson@jj-ubuntu-dev:~$ sudo systemctl status otelcol-contrib
● otelcol-contrib.service - OpenTelemetry Collector Contrib
     Loaded: loaded (/lib/systemd/system/otelcol-contrib.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2023-12-07 22:00:17 UTC; 3 days ago
   Main PID: 19153 (otelcol-contrib)
      Tasks: 9 (limit: 1129)
     Memory: 70.0M
        CPU: 21min 54.283s
     CGroup: /system.slice/otelcol-contrib.service
             └─19153 /usr/bin/otelcol-contrib --config=/etc/otelcol-contrib/config.yaml

Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.490Z        info        internal/resourcedetection.go>
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.586Z        warn        system/system.go:166        T>
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.589Z        warn        system/system.go:185        T>
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        internal/resourcedetection.go>
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        adapter/receiver.go:45       >
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        healthcheck/handler.go:132   >
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        service@v0.90.1/service.go:17>
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.791Z        info        fileconsumer/file.go:261     >
Dec 10 00:00:05 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-10T00:00:04.991Z        info        fileconsumer/file.go:261     >
Dec 10 00:02:33 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-10T00:02:33.190Z        info        fileconsumer/file.go:261     >
lines 1-20/20 (END)
```

### Is it collecting logs

Check to ensure the OTel Collector has access to the log files you want to collect.

The following will show the groups the OTel Collector service is a member of. The log directories for linux require the OTel Collector service to be a member of the **adm** group.

```bash showLineNumbers
groups otelcol-contrib
```

Ensure you see the following output: `otelcol-contrib : otelcol-contrib adm`

### Is it sending logs to Circonus

Check the OTel Collector logs

```bash showLineNumbers
 sudo journalctl -u otelcol-contrib -f
```

Example output showing no permissions issues and logs being sent to Circonus:

```bash showLineNumbers
joshuajohnson@jj-ubuntu-dev:~$ sudo journalctl -u otelcol-contrib -f
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.586Z        warn        system/system.go:166        This attribute will change from int to string. Switch now using the feature gate.        {"kind": "processor", "name": "resourcedetection", "pipeline": "logs", "attribute": "host.cpu.family", "feature gate": "processor.resourcedetection.hostCPUModelAndFamilyAsString"}
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.589Z        warn        system/system.go:185        This attribute will change from int to string. Switch now using the feature gate.        {"kind": "processor", "name": "resourcedetection", "pipeline": "logs", "attribute": "host.cpu.model.id", "feature gate": "processor.resourcedetection.hostCPUModelAndFamilyAsString"}
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        internal/resourcedetection.go:139        detected resource information        {"kind": "processor", "name": "resourcedetection", "pipeline": "logs", "resource": {"cloud.account.id":"yourCloudAccount","cloud.availability_zone":"yourZoneHere","cloud.platform":"gcp_compute_engine","cloud.provider":"yourCloudProvidor","cloud.region":"yourRegion","host.id":"844959060600594838","host.name":"jj-ubuntu-dev","host.type":"projects/844959060600594838/machineTypes/e2-micro","os.type":"linux"}}
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        adapter/receiver.go:45        Starting stanza receiver        {"kind": "receiver", "name": "filelog", "data_type": "logs"}
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        healthcheck/handler.go:132        Health Check state change        {"kind": "extension", "name": "health_check", "status": "ready"}
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        service@v0.90.1/service.go:174        Everything is ready. Begin running and processing data.
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.791Z        info        fileconsumer/file.go:261        Started watching file        {"kind": "receiver", "name": "filelog", "data_type": "logs", "component": "fileconsumer", "path": "/var/log/auth.log"}
Dec 10 00:00:05 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-10T00:00:04.991Z        info        fileconsumer/file.go:261        Started watching file        {"kind": "receiver", "name": "filelog", "data_type": "logs", "component": "fileconsumer", "path": "/var/log/syslog"}
Dec 10 00:02:33 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-10T00:02:33.190Z        info        fileconsumer/file.go:261        Started watching file        {"kind": "receiver", "name": "filelog", "data_type": "logs", "component": "fileconsumer", "path": "/var/log/auth.log"}
Dec 12 09:49:56 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-12T09:49:55.991Z        info        fileconsumer/file.go:261        Started watching file        {"kind": "receiver", "name": "filelog", "data_type": "logs", "component": "fileconsumer", "path": "/var/log/kern.log"}
```

In the above example, this log line is the data output being sent to Circonus:

```bash showLineNumbers
Dec 07 22:00:22 jj-ubuntu-dev otelcol-contrib[19153]: 2023-12-07T22:00:22.590Z        info        internal/resourcedetection.go:139        detected resource information        {"kind": "processor", "name": "resourcedetection", "pipeline": "logs", "resource": {"cloud.account.id":"yourCloudAccount","cloud.availability_zone":"yourZoneHere","cloud.platform":"gcp_compute_engine","cloud.provider":"yourCloudProvidor","cloud.region":"yourRegion","host.id":"844959060600594838","host.name":"jj-ubuntu-dev","host.type":"projects/844959060600594838/machineTypes/e2-micro","os.type":"linux"}}
```
