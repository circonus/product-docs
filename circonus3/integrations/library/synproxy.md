---
title: Synproxy
sidebar_custom_props:
  image: synproxy.svg
logo_light: /img/library/synproxy.svg
description: ""
implementation: cua
module: httptrap:cua:synproxy
---

# Synproxy

## Overview

The synproxy plugin gathers the synproxy counters. Synproxy is a Linux netfilter module used for SYN attack mitigation.
The use of synproxy is documented in `man iptables-extensions` under the SYNPROXY section.

## Configuration

The synproxy plugin does not need any configuration

```toml
[[inputs.synproxy]]
  # no configuration
```

## Troubleshooting

Execute the following CLI command in Linux to test the synproxy counters:

```sh
cat /proc/net/stat/synproxy
```
