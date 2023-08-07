---
title: Docker
sidebar_custom_props:
  image: docker.svg
description: ""
implementation: cua
module: httptrap:cua:docker
tags:
  - containers
  - management
  - virtual
---

# Docker

## Overview

The docker plugin uses the Docker Engine API to gather metrics on running docker containers and the [Official Docker Client](https://github.com/moby/moby/tree/master/client) to gather stats from the [Engine API](https://docs.docker.com/engine/api/v1.24/).

## Configuration

```toml
# Read metrics about docker containers
[[inputs.docker]]
  ## Docker Endpoint
  ##   To use TCP, set endpoint = "tcp://[ip]:[port]"
  ##   To use environment variables (ie, docker-machine), set endpoint = "ENV"
  endpoint = "unix:///var/run/docker.sock"

  ## Set to true to collect Swarm metrics(desired_replicas, running_replicas)
  ## Note: configure this in one of the manager nodes in a Swarm cluster.
  ## configuring in multiple Swarm managers results in duplication of metrics.
  gather_services = false

  ## Only collect metrics for these containers. Values will be appended to
  ## container_name_include.
  ## Deprecated (1.4.0), use container_name_include
  container_names = []

  ## Set the source tag for the metrics to the container ID hostname, eg first 12 chars
  source_tag = false

  ## Containers to include and exclude. Collect all if empty. Globs accepted.
  container_name_include = []
  container_name_exclude = []

  ## Container states to include and exclude. Globs accepted.
  ## When empty only containers in the "running" state will be captured.
  ## example: container_state_include = ["created", "restarting", "running", "removing", "paused", "exited", "dead"]
  ## example: container_state_exclude = ["created", "restarting", "running", "removing", "paused", "exited", "dead"]
  # container_state_include = []
  # container_state_exclude = []

  ## Timeout for docker list, info, and stats commands
  timeout = "5s"

  ## Whether to report for each container per-device blkio (8:0, 8:1...) and
  ## network (eth0, eth1, ...) stats or not
  perdevice = true

  ## Whether to report for each container total blkio and network stats or not
  total = false

  ## docker labels to include and exclude as tags.  Globs accepted.
  ## Note that an empty array for both will include all labels as tags
  docker_label_include = []
  docker_label_exclude = []

  ## Which environment variables should we use as a tag
  tag_env = ["JAVA_HOME", "HEAP_SIZE"]

  ## Optional TLS Config
  # tls_ca = "/etc/circonus-unified-agent/ca.pem"
  # tls_cert = "/etc/circonus-unified-agent/cert.pem"
  # tls_key = "/etc/circonus-unified-agent/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```

### Environment Configuration

When using the `"ENV"` endpoint, the connection is configured using the
[cli Docker environment variables](https://godoc.org/github.com/moby/moby/client#NewEnvClient).

### Security

Giving the agent access to the Docker daemon expands the [attack surface](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface) that could result in an attacker gaining root access to a machine. This is especially relevant if the agent configuration can be changed by untrusted users.

### Docker Daemon Permissions

Typically, the agent must be given permission to access the docker daemon unix
socket when using the default endpoint. This can be done by adding the
`cua` unix user (created when installing the circonus-unified-agent package) to the
`docker` unix group with the following command:

```
sudo usermod -aG docker cua
```

If the agent is run within a container, the unix socket will need to be exposed
within the container. This can be done in the docker CLI by add the
option `-v /var/run/docker.sock:/var/run/docker.sock` or adding the following
lines to the circonus-unified-agent container definition in a docker compose file:

```
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

### source tag

Selecting the containers measurements can be tricky if you have many containers with the same name.
To alleviate this issue you can set the below value to `true`

```toml
source_tag = true
```

This will cause all measurements to have the `source` tag be set to the first 12 characters of the container id. The first 12 characters is the common hostname for containers that have no explicit hostname set, as defined by docker.

### Kubernetes Labels

Kubernetes may add many labels to your containers, if they are not needed you
may prefer to exclude them:

```
  docker_label_exclude = ["annotation.kubernetes*"]
```
