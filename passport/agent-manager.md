---
title: Agent Manager
sidebar_position: 3
---

# Agent Manager

## Overview

Passport aims to simplify this process through the use of an agent manager. The Passport Agent Manager functions as a sidecar utility that checks for new configuration files and triggers the appropriate restart/reload functionality of the supported agent. The agent manager is kept intentionally simple, with the goal that it only needs to be installed once and updated very infrequently.

## Installation

The Circonus Agent Manager is supported on both Linux and macOS operating systems with Windows soon to come. The following installation instructions will guide you through installing Agent Manager on your host(s) and then being able to control them from the Circonus UI.

:::tip Pro Tip

Circonus recommends installing one or more [supported agents](*/introduction#supported-agents) before installing the Agent Manager.

:::

### Platform type

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Linux" label="Linux" default>

#### Step 1 - Install

Download the latest version of Agent Manager from the [release page](https://github.com/circonus/agent-manager/releases) for the appropriate operating system and CPU architecture.

#### Step 2 - Register

Log into the Passport UI and retrieve a registration token. Navigate to `Passport > Agent Management > Registration` or go directly there `<your_circonus_instance>/app/passport/registration`

Using the registration token, run the following:

```
circonus-am --register=<token>
```

If successful, you should see a jwt token at `etc/.id/token`.

#### Step 3 - Start

The service does not auto-start when installed via .deb. To start the service run the following cmd.

```
systemctl start circonus-am
```
  </TabItem>
  <TabItem value="macOS" label="macOS">
    Coming soon!
  </TabItem>
</Tabs>
