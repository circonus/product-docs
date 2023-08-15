---
title: Agent Manager
sidebar_position: 3
---

# Agent Manager

## Overview

Passport aims to simplify this process through the use of an agent manager. The Passport Agent Manager functions as a sidecar utility that checks for new configuration files and triggers the appropriate restart/reload functionality of the supported agent. The agent manager is kept intentionally simple, with the goal that it only needs to be installed once and updated very infrequently.

## Installation

The Circonus Agent Manager is supported on both Linux and macOS operating systems with Windows soon to come. The following installation instructions will guide you through installing Agent Manager on your host(s) and then being able to create/assign configurations to them from the Circonus UI.

:::tip Pro Tip

Circonus recommends installing one or more [supported agents](*/introduction#supported-agents) before installing the Agent Manager. If an agent is installed after the Agent Manager's installation then you will need to stop, re-inventory and restart the Agent Manager for it to detect the new agents.

:::

**Supported Platforms**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
  <TabItem value="Linux" label="Linux" default>

#### Step 1 - Install

Download and install the latest version of Agent Manager from the [release page](https://github.com/circonus/agent-manager/releases) for the appropriate operating system and CPU architecture.

<details><summary>Example</summary>
<p>

#### Download the Agent Manager to a folder on your Linux machine and install it.

```jsx title="Linux Ubuntu"
sudo apt install /path/to/downloded/package/circonus-am_x.x.x_amd64.deb
```

</p>
</details>

#### Step 2 - Register

Log into the Passport UI and navigate to `Passport > Agent Management > Registration` to retrieve a valid registration token.

Register Agent Manager with the following CMD `circonus-am --register=<token>`.

```
sudo /opt/circonus/am/sbin/circonus-am --register=<validRegistrationToken>
```

If the registration is successful, then you should see the following

```
{"level":"info","pkg":"manager","time":1692032136,"message":"registration complete"}
```

<details><summary>Example</summary>
<p>

#### Register Agent Manager and confirm the registration token.

```jsx title="Linux Ubuntu"
// highlight-start
ubuntu-testing-dev-box:/opt/circonus/am/sbin$ sudo ./circonus-am --register=<validRegistrationToken>
// highlight-end
{"level":"info","name":"circonus-am","version":"x.x.x","time":1692032134,"message":"starting"}
{"level":"info","time":1692032134,"message":"starting registration"}
{"level":"info","agent":"telegraf","time":1692032136,"message":"found"}
// highlight-start
{"level":"info","pkg":"manager","time":1692032136,"message":"registration complete"}
// highlight-end
```

</p>
</details>

#### Step 3 - Start

The service does not auto-start when installed via .deb. To start the service run the following cmd.

```
sudo systemctl start circonus-am
```

  </TabItem>
  <TabItem value="macOS" label="macOS">
    Coming soon!
  </TabItem>
</Tabs>

## Managing Additional Agents

If additional agents have been added to the host where Agent Manager is running, then you will need to run a few CMDs so for them to become discovered.

<Tabs groupId="operating-systems">
  <TabItem value="Linux" label="Linux" default>

#### Stop Agent Manager

```
sudo systemctl stop circonus-am
```

#### Re-inventory local agents

```
sudo /opt/circonus/am/sbin/circonus-am --inventory
```

#### Start Agent Manager

```
sudo systemctl start circonus-am
```

<details><summary>Example</summary>
<p>

#### Re-inventory Agent Manager and check its status.

```jsx title="Linux Ubuntu"
// highlight-start
ubuntu-testing-dev-box:/opt/circonus/am/etc$ sudo systemctl stop circonus-am
ubuntu-testing-dev-box:/opt/circonus/am/etc$ sudo /opt/circonus/am/sbin/circonus-am --inventory
// highlight-end
{"level":"info","name":"circonus-am","version":"0.1.3","time":1692044346,"message":"starting"}
{"level":"info","agent":"telegraf","time":1692044346,"message":"found"}
{"level":"info","pkg":"manager","time":1692044346,"message":"invetory complete"}
// highlight-start
ubuntu-testing-dev-box:/opt/circonus/am/etc$ sudo systemctl start circonus-am
// highlight-end
ubuntu-testing-dev-box:/opt/circonus/am/etc$ sudo systemctl status circonus-am
● circonus-am.service - Circonus Agent Manager
     Loaded: loaded (/lib/systemd/system/circonus-am.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-08-14 20:19:14 UTC; 8s ago
       Docs: https://github.com/circonus/agent-manager
   Main PID: 1361941 (circonus-am)
      Tasks: 8 (limit: 4680)
     Memory: 4.6M
        CPU: 3ms
     CGroup: /system.slice/circonus-am.service
             └─1361941 /opt/circonus/am/sbin/circonus-am --config=/opt/circonus/am/etc/circonus-am.yaml

Aug 14 20:19:14 ubuntu-testing-dev-box systemd[1]: Started Circonus Agent Manager.
Aug 14 20:19:14 ubuntu-testing-dev-box circonus-am[1361941]: {"level":"info","name":"circonus-am","version":"0.1.3","time":169204>
Aug 14 20:19:14 ubuntu-testing-dev-box circonus-am[1361941]: {"level":"info","interval":"1m0s","time":1692044354,"message":"start>
lines 1-14/14 (END)
```

</p>
</details>

  </TabItem>
  <TabItem value="macOS" label="macOS">
    Coming soon!
  </TabItem>
</Tabs>

## Uninstalling

<Tabs groupId="operating-systems">
  <TabItem value="Linux" label="Linux" default>
   
To uninstall Agent Manage, run the following CMD.

```
sudo apt remove circonus-am
```

  </TabItem>
  <TabItem value="macOS" label="macOS">
    Coming soon!
  </TabItem>
</Tabs>

## Troubleshooting

<Tabs groupId="operating-systems">
  <TabItem value="Linux" label="Linux" default>
   
Agent Manager usage flags

```jsx {1} title="Linux Ubuntu" showLineNumbers
ubuntu-testing-dev-box:/opt/circonus/am/sbin$ sudo ./circonus-am -h
Manager for local agents (metrics, logs, etc.)

Usage:
  circonus-am [flags]

Flags:
      --apiurl string              [ENV: CAM_API_URL] Circonus API URL (default "https://web-api.svcs-np.circonus.net/collectors/v1")
      --aws-ec2-tags stringArray   [ENV: CAM_AWS_EC2_TAGS] AWS EC2 tags for registration meta data
  -c, --config string              config file (default: /opt/circonus/am/etc/circonus-am.yaml|.json|.toml)
  -d, --debug                      [ENV: CAM_DEBUG] Enable debug messages
  -h, --help                       help for circonus-am
      --inventory                  [ENV: CAM_INVENTORY] Inventory installed collectors
      --log-level string           [ENV: CAM_LOG_LEVEL] Log level [(panic|fatal|error|warn|info|debug|disabled)] (default "info")
      --log-pretty                 Output formatted/colored log lines [ignored on windows]
      --poll-interval string       [ENV: CAM_POLL_INTERVAL] Polling interval for actions (default "60s")
      --register string            [ENV: CAM_REGISTER] Registration token
  -V, --version                    Show version and exit
```

Check to see if the Agent Manager is running

```jsx {1} title="Linux Ubuntu" showLineNumbers
ubuntu-testing-dev-box:/opt/circonus/am/sbin$ sudo systemctl status circonus-am
● circonus-am.service - Circonus Agent Manager
     Loaded: loaded (/lib/systemd/system/circonus-am.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-08-14 19:34:30 UTC; 2min 23s ago
       Docs: https://github.com/circonus/agent-manager
   Main PID: 1359376 (circonus-am)
      Tasks: 8 (limit: 4680)
     Memory: 8.0M
        CPU: 27ms
     CGroup: /system.slice/circonus-am.service
             └─1359376 /opt/circonus/am/sbin/circonus-am --config=/opt/circonus/am/etc/circonus-am.yaml

Aug 14 19:34:30 ubuntu-testing-dev-box systemd[1]: Started Circonus Agent Manager.
Aug 14 19:34:30 ubuntu-testing-dev-box circonus-am[1359376]: {"level":"info","name":"circonus-am","version":"0.1.3","time":1692041670,"message":"starting"}
Aug 14 19:34:30 ubuntu-testing-dev-box circonus-am[1359376]: {"level":"info","interval":"1m0s","time":1692041670,"message":"starting poller"}
```

View the logs of Agent Manager while it is running

```jsx {1} title="Linux Ubuntu"
$ sudo journalctl -u circonus-am.service -f
Aug 14 16:01:04 ubuntu-testing-dev-box systemd[1]: Started Circonus Agent Manager.
...
...
```

  </TabItem>
  <TabItem value="macOS" label="macOS">
    Coming soon!
  </TabItem>
</Tabs>
