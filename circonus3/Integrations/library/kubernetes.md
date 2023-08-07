---
title: Kubernetes
sidebar_custom_props:
  image: kubernetes.svg
description: ""
implementation: kubernetes_agent
module: httptrap:kubernetes
tags:
  - agent
---

# Kubernetes

## Overview

For automated monitoring of a Kubernetes cluster, install the [Circonus Kubernetes Agent](https://docs.circonus.com/circonus/integrations/agents/circonus-kubernetes-agent/). Follow the provided instructions to install the agent and run it; the agent will automatically create a Kubernetes check for its metrics.

The Circonus Kubernetes Agent relies on [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) to be installed and enabled within your cluster.

## Configuration

### 1. Clone repo

Execute the following command within the terminal to clone the repository to a local directory of your choosing:

```
git clone https://github.com/circonus-labs/circonus-kubernetes-agent
```

### 2. Edit configs

In `deploy/default/configuration.yaml`, set the following required attributes:

**circonus-api-key**
Your unique Circonus API token

**kubernetes-name**
The name corresponding to your Kubernetes cluster. We recommend a short, unique string without spaces.

**contact.email**
The email address that you would like to use for default alerts. _See the section entitled `default-alerts.json`._

### 3. Deploy

From within the cloned directory (`circonus-kubernetes-agent`) execute the following command within the terminal to deploy:

```
kubectl apply -f deploy/default/
```

The Circonus Kubernetes Agent will fetch a variety of different metrics depending on the services for which it is configured. [Learn more](https://docs.circonus.com/circonus/integrations/agents/circonus-kubernetes-agent/#configuration-options)
