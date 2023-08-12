---
title: Introduction
sidebar_position: 1
---

# Passport [Beta]

![Work in progress image](./img/work-in-progress-image.png)

## Overview

** Passport is currently in private beta.**

Passport is a solution for making the collection of observability data responsive to changes in your environment using your pre-existing observability agents. It allows you to collect more data when you need it, and less when you don't.


Almost all observability agents can be managed through the use of configuration files that describe how to collect, enrich and send data. Management of these files and the agent itself is typically left as an exercise for the user and involves leveraging their preferred software distribution tools.

Passport aims to simplify this process through the use of an agent manager. The Passport Agent Manager functions as a sidecar utility that checks for new configuration files and triggers the appropriate restart/reload functionality of the supported agent. The agent manager is kept intentionally simple, with the goal that it only need to be installed once and updated very infrequently.
To change the collection strategy of a managed agent such as Telegraf, there needs to be a place to create and store the relevant configurations for the agent. This can be done through the Passport UI or the Passport API.

The Passport UI provides a place to view the current inventory of all agents under management as well as tools for managing and creating configuration files.

## Supported Agents

- [Telegraf](https://github.com/influxdata/telegraf)
