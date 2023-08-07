---
title: Circonus Platform
weight: 10
---

# Circonus Platform Overview

<!-- ![Circonus Platform Diagram](/images/circonus/technology-diagram-condensed-light.png) -->

The Circonus Observability Platform is designed as a full-stack observability solution that provides insight into your applictions and infrastructure. It consists of multiple layers:

- **Data collection** through the Circonus Unified Agent (CUA), and leveraging open source agents like FluentBit and Data Prepper

- **Data ingestion pipeline**

- **Stream Alerting**

- **Analytics** that allow you to explore and contextualize your data, while taking the hardwork out of analyzing metrics, logs, and traces.

- **Data Storage** which leverages our high performance time series database (**IRONdb**) as well as OpenSearch and Elastic compatible log and trace storage

## Data Ingestion

### Metrics

The ingestion of [metrics](/circonus3/additional-resources/glossary/#metric) into the Circonus Observability Platform starts with the [Circonus Unified Agent (CUA)](/circonus3/integrations/agents/circonus-unified-agent/introduction/) which collects the metrics, either push or pull, at the edge with its 300+ [integrations](/circonus3/additional-resources/glossary/#integrations). CUA is open-source, enabling our customers to fork and build on it as needed and inspect it for security audits. CUA is also configurable and includes an ever-growing library of [integrations](/circonus3/additional-resources/glossary/#integrations) to monitor your critical services. Once CUA is set up on the customer's side, the metrics will flow to Circonus' cloud platform over Transport Layer Security (TLS 1.2).

When metrics reach the platform, they are aggregated and two copies are sent out -- one to [Circonus IRONdb](/irondb/) and one to our Stream Processing and Alerting System. This duplication of metrics eliminates querying [IRONdb](/irondb/) for alerting purposes and enables stream processing and alerting on metrics.

CUA communicates with Circonus platform via TLS over port 43191 and with the Circonus API over Port 443.

### Logs

Circonus leverages the opensource [log](/circonus3/additional-resources/glossary/#log) agent [Fluent Bit](http://fluentbit.io) for fast log processing and forwarding for Linux, Windows, embedded Linux, macOS and BSD family operating systems. It runs on the x86_64, x86, arm32v7, and arm64v8 architectures.

Fluent Bit is part of the graduated [Fluentd](http://fluentd.org) ecosystem and a [CNCF](https://cncf.io) sub-project. It allows for the collection of log events or metrics from different sources, processing and delivering them to Circonus. It also comes with full SQL [stream processing](https://docs.fluentbit.io/manual/stream-processing/introduction) capabilities: data manipulation and analytics using SQL queries.

### Traces

The growing use of microservices that enable development teams to build and release software quicker has led to an increased complexity of IT architecture and in turn, an increased complexity of troubleshooting root causes within this architecture. Without the proper observability in place, it's almost impossible to fix problems as they arise.

Circonus leverages open standards so that our customers are not locked into a single platform. Specifically, customers retain data portability.

## Stream Processing and Alerting

Once the metrics have been ingested into the stream processing and fault detection system, they can trigger alerting behaviors based on user-defined criteria for each metric type. There is no limit on the number of alerts that can be created and acted upon.

An [alert](/circonus3/additional-resources/glossary/#alert) can fire off a notification.
