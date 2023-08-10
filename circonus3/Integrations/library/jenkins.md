---
title: Jenkins
sidebar_custom_props:
image: jenkins.svg
description: ""
implementation: cua
module: httptrap:cua:jenkins
---

# Jenkins

## Overview

The jenkins plugin gathers information about the nodes and jobs running in a jenkins instance.

This plugin does not require a plugin on jenkins and it makes use of Jenkins API to retrieve all the information needed.

## Configuration

```toml
[[inputs.jenkins]]
  ## The Jenkins URL in the format "schema://host:port"
  url = "http://my-jenkins-instance:8080"
  # username = "admin"
  # password = "admin"

  ## Set response_timeout
  response_timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use SSL but skip chain & host verification
  # insecure_skip_verify = false

  ## Optional Max Job Build Age filter
  ## Default 1 hour, ignore builds older than max_build_age
  # max_build_age = "1h"

  ## Optional Sub Job Depth filter
  ## Jenkins can have unlimited layer of sub jobs
  ## This config will limit the layers of pulling, default value 0 means
  ## unlimited pulling until no more sub jobs
  # max_subjob_depth = 0

  ## Optional Sub Job Per Layer
  ## In workflow-multibranch-plugin, each branch will be created as a sub job.
  ## This config will limit to call only the lasted branches in each layer,
  ## empty will use default value 10
  # max_subjob_per_layer = 10

  ## Jobs to exclude from gathering
  # job_exclude = [ "job1", "job2/subjob1/subjob2", "job3/*"]

  ## Nodes to exclude from gathering
  # node_exclude = [ "node1", "node2" ]

  ## Worker pool for jenkins plugin only
  ## Empty this field will use default value 5
  # max_connections = 5
```
