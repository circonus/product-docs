---
title: Unbound
sidebar_custom_props:
  image: unbound.svg
description: ""
implementation: cua
module: httptrap:cua:unbound
---

# Unbound

## Overview

This plugin gathers stats from [Unbound](https://www.unbound.net/) -
a validating, recursive, and caching DNS resolver.

## Configuration

```toml
# A plugin to collect stats from the Unbound DNS resolver
[[inputs.unbound]]
  ## Address of server to connect to, read from unbound conf default, optionally ':port'
  ## Will lookup IP if given a hostname
  server = "127.0.0.1:8953"

  ## If running as a restricted user you can prepend sudo for additional access:
  # use_sudo = false

  ## The default location of the unbound-control binary can be overridden with:
  # binary = "/usr/sbin/unbound-control"

  ## The default location of the unbound config file can be overridden with:
  # config_file = "/etc/unbound/unbound.conf"

  ## The default timeout of 1s can be overridden with:
  # timeout = "1s"

  ## When set to true, thread metrics are tagged with the thread id.
  ##
  ## The default is false for backwards compatibility, and will be changed to
  ## true in a future version.  It is recommended to set to true on new
  ## deployments.
  thread_as_tag = false
```

### Permissions

It's important to note that this plugin references unbound-control, which may require additional permissions to execute successfully.
Depending on the user/group permissions of the user executing this plugin, you may need to alter the group membership, set facls, or use sudo.

**Group membership (Recommended)**:

```bash
$ groups cua
cua : cua

$ usermod -a -G unbound cua

$ groups cua
cua : cua unbound
```

**Sudo privileges**:

If you use this method, you will need the following in your config:

```toml
[[inputs.unbound]]
  use_sudo = true
```

You will also need to update your sudoers file:

```bash
$ visudo
# Add the following line:
Cmnd_Alias UNBOUNDCTL = /usr/sbin/unbound-control
cua  ALL=(ALL) NOPASSWD: UNBOUNDCTL
Defaults!UNBOUNDCTL !logfile, !syslog, !pam_session
```

Please use the solution you see as most appropriate.
