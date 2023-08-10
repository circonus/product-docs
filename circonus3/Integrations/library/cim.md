---
title: CIM
sidebar_custom_props:
  image: cim.svg
logo_light: /img/library/cim.svg
description: ""
implementation: broker
module: cim
tags:
  - protocol
  - Common
  - Information
  - Model
  - system
---

# CIM

## Overview

The CIM Check monitors your [Common Information Model](https://www.dmtf.org/standards/cim) compliant system. This will require server authorization (Username and Password) for the target host.

The Common Information Model (CIM) is a cross-platform, object-oriented data model containing information about different parts of an enterprise. It is commonly used on Microsoft platforms via [Windows Management Instrumentation](https://docs.microsoft.com/en-us/windows/desktop/wmisdk/common-information-model) (WMI) and in VMware deployments.

## Configuration

You may specify fields to pull data from the CIM server classes (for example: "HealthState", or "Operational Status"). These fields are optional; if no fields are specified, all available fields will be returned.

You can also have the option to upgrade the TCP connection to use SSL.
