---
title: Mailchimp
sidebar_custom_props:
image: mailchimp.svg
logo_dark: "/images/circonus/library/mailchimp-dark.svg"
description: ""
implementation: cua
module: httptrap:cua:mailchimp
---

# Mailchimp

## Overview

Pulls campaign reports from the [Mailchimp API](https://developer.mailchimp.com/).

## Configuration

This section contains the default TOML to configure the plugin. You can
generate it using `circonus-unified-agent --usage mailchimp`.

```toml
[[inputs.mailchimp]]
  ## MailChimp API key
  ## get from https://admin.mailchimp.com/account/api/
  api_key = "" # required

  ## Reports for campaigns sent more than days_old ago will not be collected.
  ## 0 means collect all and is the default value.
  days_old = 0

  ## Campaign ID to get, if empty gets all campaigns, this option overrides days_old
  # campaign_id = ""
```
