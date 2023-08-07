---
title: GitHub
sidebar_custom_props:
  image: github.svg
logo_dark: "/images/circonus/library/github-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:github
---

# GitHub

## Overview

Gather repository information from [GitHub](https://www.github.com/) hosted repositories.

**Note:** The agent also contains the [webhook](https://github.com/circonus-labs/circonus-unified-agent/blob/master/plugins/inputs/webhooks/github) input which can be used as an
alternative method for collecting repository information.

## Configuration

```toml
[[inputs.github]]
  ## List of repositories to monitor
  repositories = [
	  "circonus-labs/circonus-unified-agent",
	  "circonus-labs/circonus-kubernetes-agent"
  ]

  ## Github API access token.  Unauthenticated requests are limited to 60 per hour.
  # access_token = ""

  ## Github API enterprise url. Github Enterprise accounts must specify their base url.
  # enterprise_base_url = ""

  ## Timeout for HTTP requests.
  # http_timeout = "5s"
```
