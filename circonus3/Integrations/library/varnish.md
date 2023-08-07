---
title: Varnish
sidebar_custom_props:
  image: varnish.svg
description: ""
implementation: cua
module: httptrap:cua:varnish
---

# Varnish

## Overview

This plugin gathers stats from [Varnish HTTP Cache](https://varnish-cache.org/)

## Configuration

```toml
[[inputs.varnish]]
  ## If running as a restricted user you can prepend sudo for additional access:
  #use_sudo = false

  ## The default location of the varnishstat binary can be overridden with:
  binary = "/usr/bin/varnishstat"

  ## By default, agent gathers stats for 3 metric points.
  ## Setting stats will override the defaults shown below.
  ## Glob matching can be used, ie, stats = ["MAIN.*"]
  ## stats may also be set to ["*"], which will collect all stats
  stats = ["MAIN.cache_hit", "MAIN.cache_miss", "MAIN.uptime"]

  ## Optional name for the varnish instance (or working directory) to query
  ## Usually append after -n in varnish cli
  # instance_name = instanceName

  ## Timeout for varnishstat command
  # timeout = "1s"
```

### Permissions

It's important to note that this plugin references varnishstat, which may require additional permissions to execute successfully.
Depending on the user/group permissions of the agent user executing this plugin, you may need to alter the group membership, set facls, or use sudo.

**Group membership (Recommended)**:

```bash
$ groups cua
cua : cua

$ usermod -a -G varnish cua

$ groups cua
cua : cua varnish
```

**Extended filesystem ACL's**:

```bash
$ getfacl /var/lib/varnish/<hostname>/_.vsm
# file: var/lib/varnish/<hostname>/_.vsm
# owner: root
# group: root
user::rw-
group::r--
other::---

$ setfacl -m u:cua:r /var/lib/varnish/<hostname>/_.vsm

$ getfacl /var/lib/varnish/<hostname>/_.vsm
# file: var/lib/varnish/<hostname>/_.vsm
# owner: root
# group: root
user::rw-
user:cua:r--
group::r--
mask::r--
other::---
```

**Sudo privileges**:

If you use this method, you will need the following in your agent config:

```toml
[[inputs.varnish]]
  use_sudo = true
```

You will also need to update your sudoers file:

```bash
$ visudo
# Add the following line:
Cmnd_Alias VARNISHSTAT = /usr/bin/varnishstat
cua  ALL=(ALL) NOPASSWD: VARNISHSTAT
Defaults!VARNISHSTAT !logfile, !syslog, !pam_session
```

Please use the solution you see as most appropriate.
