---
title: Postfix
sidebar_custom_props:
  image: postfix.png
description: ""
implementation: cua
module: httptrap:cua:postfix
---

# Postfix

## Overview

The postfix plugin reports metrics on the postfix queues.

For each of the active, hold, incoming, maildrop, and deferred queues
([http://www.postfix.org/QSHAPE_README.html#queues](http://www.postfix.org/QSHAPE_README.html#queues)), it will report the queue
length (number of items), size (bytes used by items), and age (age of oldest
item in seconds).

## Configuration

```toml
[[inputs.postfix]]
  ## Postfix queue directory. If not provided, agent will try to use
  ## 'postconf -h queue_directory' to determine it.
  # queue_directory = "/var/spool/postfix"
```

### Permissions

Agent will need read access to the files in the queue directory. You may
need to alter the permissions of these directories to provide access to the
cua user.

This can be setup either using standard unix permissions or with Posix ACLs,
you will only need to use one method:

Unix permissions:

```sh
$ sudo chgrp -R cua /var/spool/postfix/{active,hold,incoming,deferred}
$ sudo chmod -R g+rXs /var/spool/postfix/{active,hold,incoming,deferred}
$ sudo usermod -a -G postdrop cua
$ sudo chmod g+r /var/spool/postfix/maildrop
```

Posix ACL:

```sh
$ sudo setfacl -Rm g:cua:rX /var/spool/postfix/
$ sudo setfacl -dm g:cua:rX /var/spool/postfix/
```
