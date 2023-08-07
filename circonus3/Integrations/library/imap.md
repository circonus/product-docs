---
title: IMAP
sidebar_custom_props:
  image: imap.svg
description: ""
implementation: broker
module: imap
tags:
  - email
  - protocol
  - messaging
---

# IMAP

## Overview

The IMAP Check checks mail retrieval over the Internet Message Access Protocol (IMAP).

## Configuration

Advanced Configuration allows you to specify the folder that should be examined, an optional IMAP SEARCH operation to execute after EXAMINE. You can also specify which Folder to examine.

Required parameters:

| Name          | Description                                  |
| ------------- | -------------------------------------------- |
| port          | The TCP port to connect to the IMAP service. |
| auth_user     | The IMAP user to use for authentication.     |
| auth_password | The IMAP password to use for authentication. |

Optional parameters:

| Name    | Description                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| folder  | The folder to be examined (default: INBOX)                                                                                    |
| search  | Specify an IMAP SEARCH operation to execute after EXAMINE.                                                                    |
| fetch   | Perform a FETCH operation on the highest message ID, or the last SEARCH result if a search is configured (default: false/off) |
| use_ssl | Upgrade the TCP connection to use SSL/TLS (default: false/off)                                                                |

If SSL is used, you can also specify a list of ciphers to be used in the SSL protocol and the expected certificate name to check for in SSL certificates.
