---
title: PowerDNS Recursor
sidebar_custom_props:
  image: powerdns.svg
logo_light: /img/library/powerdns.svg
description: ""
implementation: cua
module: httptrap:cua:powerdns_recursor
---

# PowerDNS Recursor

## Overview

The `powerdns_recursor` plugin gathers metrics about PowerDNS Recursor using
the unix controlsocket.

## Configuration

```toml
[[inputs.powerdns_recursor]]
  ## Path to the Recursor control socket.
  unix_sockets = ["/var/run/pdns_recursor.controlsocket"]

  ## Directory to create receive socket.  This default is likely not writable,
  ## please reference the full plugin documentation for a recommended setup.
  # socket_dir = "/var/run/"
  ## Socket permissions for the receive socket.
  # socket_mode = "0666"
```

### Permissions

Agent will need read/write access to the control socket and to the
`socket_dir`. PowerDNS will need to be able to write to the `socket_dir`.

The setup described below was tested on a Debian Stretch system and may need
adapted for other systems.

First change permissions on the controlsocket in the PowerDNS recursor
configuration, usually in `/etc/powerdns/recursor.conf`:

```
socket-mode = 660
```

Then place the `cua` user into the `pdns` group:

```
usermod cua -a -G pdns
```

Since `circonus-unified-agent` cannot write to to the default `/var/run` socket directory,
create a subdirectory and adjust permissions for this directory so that both
users can access it.

```sh
$ mkdir /var/run/pdns
$ chown root:pdns /var/run/pdns
$ chmod 770 /var/run/pdns
```
