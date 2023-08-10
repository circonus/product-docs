---
title: Windows Services
sidebar_custom_props:
  image: windows.svg
logo_light: /img/library/windows.svg
description: ""
implementation: cua
module: httptrap:cua:win_services
---

# Windows Services

## Overview

Reports information about Windows service status.

Monitoring some services may require running agent with administrator privileges.

## Configuration

```toml
[[inputs.win_services]]
  ## Names of the services to monitor. Leave empty to monitor all the available services on the host
  service_names = [
    "LanmanServer",
    "TermService",
  ]
```
