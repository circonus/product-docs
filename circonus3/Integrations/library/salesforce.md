---
title: Salesforce
sidebar_custom_props:
image: salesforce.svg
description: ""
implementation: cua
module: httptrap:cua:salesforce
---

# Salesforce

## Overview

The Salesforce plugin gathers metrics about the limits in your Salesforce organization and the remaining usage.
It fetches its data from the [limits endpoint](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_limits.htm) of Salesforce's REST API.

## Configuration

```toml
# Gather Metrics about Salesforce limits and remaining usage
[[inputs.salesforce]]
  username = "your_username"
  password = "your_password"
  ## (Optional) security token
  security_token = "your_security_token"
  ## (Optional) environment type (sandbox or production)
  ## default is: production
  # environment = "production"
  ## (Optional) API version (default: "39.0")
  # version = "39.0"
```
