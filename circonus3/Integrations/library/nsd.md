---
title: NSD
sidebar_custom_props:
  image: nsd.svg
description: ""
implementation: cua
module: httptrap:cua:nsd
---

# NSD

## Overview

This plugin gathers stats from [NSD](https://www.nlnetlabs.nl/projects/nsd/about) - an authoritative DNS name server.

## Configuration

```toml
# A plugin to collect stats from the NSD DNS resolver
[[inputs.nsd]]
  ## Address of server to connect to, optionally ':port'. Defaults to the
  ## address in the nsd config file.
  server = "127.0.0.1:8953"

  ## If running as a restricted user you can prepend sudo for additional access:
  # use_sudo = false

  ## The default location of the nsd-control binary can be overridden with:
  # binary = "/usr/sbin/nsd-control"

  ## The default location of the nsd config file can be overridden with:
  # config_file = "/etc/nsd/nsd.conf"

  ## The default timeout of 1s can be overridden with:
  # timeout = "1s"
```

### Permissions

It's important to note that this plugin references nsd-control, which may
require additional permissions to execute successfully. Depending on the
user/group permissions of the user executing this plugin, you may
need to alter the group membership, set facls, or use sudo.

**Group membership (Recommended)**

```bash
$ groups cua
cua : cua

$ usermod -a -G nsd cua

$ groups cua
cua : cua nsd
```

**Sudo privileges**

If you use this method, you will need the following in your config:

```toml
[[inputs.nsd]]
  use_sudo = true
```

You will also need to update your sudoers file:

```bash
$ visudo
# Add the following line:
Cmnd_Alias NSDCONTROLCTL = /usr/sbin/nsd-control
cua  ALL=(ALL) NOPASSWD: NSDCONTROLCTL
Defaults!NSDCONTROLCTL !logfile, !syslog, !pam_session
```

Please use the solution you see as most appropriate.
