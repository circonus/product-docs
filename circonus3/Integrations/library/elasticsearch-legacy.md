---
title: Elasticsearch
sidebar_custom_props:
image: elasticsearch.svg
logo_dark: "/images/circonus/library/elasticsearch-dark.svg"
description: ""
legacy: true
implementation: broker
module: elasticsearch
tags:
  - nosql
---

# Elasticsearch

## Overview

[Elasticsearch](http://www.elasticsearch.org/) is a flexible and powerful open source, distributed, real-time search and analytics engine because of its robust set of APIs and query DSLs, with clients for the most popular programming languages. Almost any action can be performed using a simple RESTful API using JSON over HTTP.

With an elasticsearch check, you can set alerts within Circonus to send notifications allowing you to make any necessary changes to your resources.

## Metrics

Circonus collects information from elasticsearch in JSON format via the elasticsearch NoSQL database's native interface. Circonus turns these JSON documents into metrics for trending and alerting. Circonus uses this to track the inserts, deletes, and the searches performed on each node.
