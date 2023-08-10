---
title: DHCP
sidebar_custom_props:
image: dhcp.svg
description: ""
implementation: broker
module: dhcp
tags:
  - network
  - Dynamic
  - Host
  - Configuration
  - Protocol
---

# DHCP

## Overview

This check type monitors your DHCP system.

## Configuration

You will need to provide the hardware address of the DHCP client, in "`00:00:00:00:00:00`" format.

You further have the option to specify the port to which DHCP requests are sent, the IP address of the agent running the DHCP check, and to select a request type, such as DHCPDiscover or DHCPInform.

> This check will only operate on Enterprise Brokers.
