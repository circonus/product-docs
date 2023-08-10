---
title: Apache Kafka
sidebar_custom_props:
image: apache-kafka.svg
logo_dark: "/images/circonus/library/apache-kafka-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:kafka_consumer
---

# Apache Kafka

## Overview

The [Kafka](http://kafka.apache.org/) consumer plugin polls a specified Kafka
topic and adds messages to Circonus. The plugin assumes messages follow the
line protocol. [Consumer Group](http://godoc.org/github.com/wvanbergen/kafka/consumergroup)
is used to talk to the Kafka cluster so multiple instances of circonus-unified-agent can read
from the same topic in parallel.

## Configuration

```toml
# Read metrics from Kafka topic(s)
[[inputs.kafka_consumer]]
  ## topic(s) to consume
  topics = ["circonus"]

  ## an array of Zookeeper connection strings
  zookeeper_peers = ["localhost:2181"]

  ## Zookeeper Chroot
  zookeeper_chroot = ""

  ## the name of the consumer group
  consumer_group = "circonus_metrics_consumers"

  ## Offset (must be either "oldest" or "newest")
  offset = "oldest"

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/circonus-labs/circonus-unified-agent/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = "json"

  ## Maximum length of a message to consume, in bytes (default 0/unlimited);
  ## larger messages are dropped
  max_message_len = 65536
```

### Testing

Running integration tests requires running Zookeeper & Kafka. See Makefile
for kafka container command.
