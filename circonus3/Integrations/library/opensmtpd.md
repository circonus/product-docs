---
title: OpenSMTPD
sidebar_custom_props:
image: opensmtpd.png
description: ""
implementation: cua
module: httptrap:cua:opensmtpd
---

# OpenSMTPD

## Overview

This plugin gathers stats from [OpenSMTPD - a FREE implementation of the server-side SMTP protocol](https://www.opensmtpd.org/)

## Configuration

```toml
 [[inputs.opensmtpd]]
   ## If running as a restricted user you can prepend sudo for additional access:
   #use_sudo = false

   ## The default location of the smtpctl binary can be overridden with:
   binary = "/usr/sbin/smtpctl"

   # The default timeout of 1s can be overridden with:
   #timeout = "1s"
```

### Permissions

It's important to note that this plugin references smtpctl, which may require additional permissions to execute successfully.
Depending on the user/group permissions of the user executing this plugin, you may need to alter the group membership, set facls, or use sudo.

**Group membership (Recommended)**

```bash
$ groups cua
cua : cua

$ usermod -a -G opensmtpd cua

$ groups cua
cua : cua opensmtpd
```

**Sudo privileges**

If you use this method, you will need the following in your circonus-unified-agent config:

```toml
[[inputs.opensmtpd]]
  use_sudo = true
```

You will also need to update your sudoers file:

```bash
$ visudo
# Add the following line:
Cmnd_Alias SMTPCTL = /usr/sbin/smtpctl
cua  ALL=(ALL) NOPASSWD: SMTPCTL
Defaults!SMTPCTL !logfile, !syslog, !pam_session
```

Please use the solution you see as most appropriate.
