---
title: Getting Started Guide
sidebar_position: 2
---

# The Getting Started Guide

We will be installing Agent Manager on a Linux host for it to manage a local Telegraf agent.

The quickest path to completion is to do the following.

1. Install the supported observability agents and have them operational.
2. [Install and register the Agent Manager](getting-started-guide#install-and-register-agent-manager/)
3. [Import a new configuration file](getting-started-guide#upload-a-configuration-file/) to your Circonus Passport account.
4. [Assign a configuration file](getting-started-guide#assign-a-configuration-file/) to your Agent Manager.
   1. Optional: [Create rules](getting-started-guide#create-rules/) for your configuration files if you have more than 1 configuration file uploaded.

## Install and Register Agent Manager

**Supported Platforms**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
  <TabItem value="Linux" label="Linux" default>

#### Step 1 - Install

Download and install the latest version of Agent Manager from the [release page](https://github.com/circonus/agent-manager/releases) for the appropriate operating system and CPU architecture.

```bash
sudo apt install path/to/file/circonus-am_x.x.x_amd64.deb
```

#### Step 2 - Register

Log into the Passport UI and navigate to `Passport > Agent Management > Registration` to retrieve a valid registration token.

Register Agent Manager with the following CMD `circonus-am --register=<token>`.

```bash
sudo /opt/circonus/am/sbin/circonus-am --register=<validRegistrationToken>
```

:::info Success

If the registration is successful, then you should see the following output.

```bash
{"level":"info","pkg":"manager","time":1692032136,"message":"registration complete"}
```

:::

#### Step 3 - Start

The service does not auto-start when installed via .deb. To start the service run the following cmd.

```bash
sudo systemctl start circonus-am
```

<details><summary>Example - Successful installation</summary>
<p>

```jsx title="Linux Ubuntu" showLineNumbers
ubuntu-host:~$ sudo apt install ~/downloads/circonus-am_0.1.3_amd64.deb
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Note, selecting 'circonus-am' instead of '/home/joshuajohnson/downloads/circonus-am_0.1.3_amd64.deb'
The following package was automatically installed and is no longer required:
  libnuma1
Use 'sudo apt autoremove' to remove it.
The following NEW packages will be installed:
  circonus-am
0 upgraded, 1 newly installed, 0 to remove and 73 not upgraded.
Need to get 0 B/4273 kB of archives.
After this operation, 10.7 MB of additional disk space will be used.
Get:1 /home/joshuajohnson/downloads/circonus-am_0.1.3_amd64.deb circonus-am amd64 0.1.3 [4273 kB]
Selecting previously unselected package circonus-am.
(Reading database ... 124495 files and directories currently installed.)
Preparing to unpack .../circonus-am_0.1.3_amd64.deb ...
Unpacking circonus-am (0.1.3) ...
Setting up circonus-am (0.1.3) ...
Created symlink /etc/systemd/system/multi-user.target.wants/circonus-am.service → /lib/systemd/system/circonus-am.service.
Scanning processes...
Scanning candidates...
Scanning linux images...

Restarting services...
Service restarts being deferred:
 /etc/needrestart/restart.d/dbus.service
 systemctl restart docker.service
 systemctl restart networkd-dispatcher.service
 systemctl restart unattended-upgrades.service
 systemctl restart user@1008.service

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
ubuntu-host:/opt/circonus/am/etc$ sudo /opt/circonus/am/sbin/circonus-am --register=6850a610-51b6-4829-baf3-f2cc40897211
{"level":"info","name":"circonus-am","version":"0.1.3","time":1692125508,"message":"starting"}
{"level":"info","time":1692125508,"message":"starting registration"}
{"level":"info","agent":"telegraf","time":1692125508,"message":"found"}
{"level":"info","pkg":"manager","time":1692125508,"message":"registration complete"}
ubuntu-host:/opt/circonus/am/etc$ sudo systemctl start circonus-am
ubuntu-host:/opt/circonus/am/etc$ sudo systemctl status circonus-am
● circonus-am.service - Circonus Agent Manager
     Loaded: loaded (/lib/systemd/system/circonus-am.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2023-08-15 19:01:14 UTC; 44s ago
       Docs: https://github.com/circonus/agent-manager
   Main PID: 4101958 (circonus-am)
      Tasks: 7 (limit: 9525)
     Memory: 2.6M
        CPU: 6ms
     CGroup: /system.slice/circonus-am.service
             └─4101958 /opt/circonus/am/sbin/circonus-am --config=/opt/circonus/am/etc/circonus-am.yaml

Aug 15 19:01:14 ubuntu-host systemd[1]: Started Circonus Agent Manager.
Aug 15 19:01:14 ubuntu-host circonus-am[4101958]: {"level":"info","name":"circonus-am","version":"0.1.3","time">
Aug 15 19:01:14 ubuntu-host circonus-am[4101958]: {"level":"info","interval":"1m0s","time":1692126074,"message">
lines 1-14/14 (END)
```

</p>
</details>

  </TabItem>
  <TabItem value="macOS" label="macOS">

#### Step 1 - Install

Download and install the latest version of Agent Manager from the [release page](https://github.com/circonus/agent-manager/releases) for the appropriate operating system and CPU architecture.

The Circonus Manager is available to both install and update via Homebrew.

```bash
brew tap circonus/homebrew-circonus-agent-manager
```

```bash
brew install circonus/circonus-agent-manager/circonus-am
```

#### Step 2 - Register

Log into the Passport UI and navigate to `Passport > Agent Management > Registration` to retrieve a valid registration token.

Register Agent Manager with the following CMD `circonus-am --register=<token>`.

```bash
/opt/homebrew/opt/circonus-am/sbin/circonus-am --register="registration token"
```

:::info Success

If the registration is successful, then you should see the following output.

```bash
{"level":"info","pkg":"manager","time":1692032136,"message":"registration complete"}
```

:::

#### Step 3 - Start

The service does not auto-start when installed via .deb. To start the service run the following cmd.

```bash
brew services start circonus-am
```

  </TabItem>
</Tabs>

:::note NOTE

Complete instructions to inventory new agents, uninstall, and troubleshoot can be found on the full [Agent Manager](/passport/agent-manager/) page.

:::

## Import a Configuration files

The following instructions outline how to add configuration files from the Circonus UI to your account located in the main menu **Passport > Configurations**.

From the configurations list page, select **Import Configuration**.

![flow builder](./img/configurations-list-view.png)

:::tip Keep in mind

By default, when a configuration file is added to your Circonus account, it is not being managed by the Agent Manager until you add it to a specific Agent Manager.

:::

You have the option to upload a local file or simply paste the configuration in the code block. Fill in the rest of the form and select **Import**.

![flow builder](./img/configurations-import-configuration.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.

:::note NOTE

Complete instructions import and build configuration files with the low-code builder can be found on the full **[Configuration Files](/passport/Configurations/configuration-files/)** page.

:::

## Assign a Configuration File

Coming soon!

:::note NOTE

Complete instructions for configuration files can be found on the **[Configuration file](/passport/Configurations/configuration-files/)** page.

:::

### Create Rules

Navigate to the **Passport > Configurations** list view, and select the configuration file to navigate to the details section.

![Configurations List Selected](./img/configurations-selected-config.png)

From here, you can view **details**, **preview the config** file and also create **rules**.

Select the **Rules** tab, and then click on the **Create Rule** button located at the top right of the table

![Configurations Rules Tab](./img/configurations-rules-tab-list-view.png)

From here, you will define a rule to then be applied to this specific configuration file. Fully define the required fields and click **Create**.

:::danger DANGER

If you are creating alert-based rules, ensure the rules align with your expected outcome of the configuration assignment.

:::

![Configurations Rules Tab](./img/configurations-rules-tab-create.png)

All created rules will be listed in the Rules tab and if more than 1 rule has been created, they can be ordered to specify which rule has the most importance.

:::info Rules ordering

The rules can be ordered by clicking and holding each rule on the far left side of the listed row and dragging it.

:::

:::note NOTE

Complete instructions for Rules can be found on the **[rules engine](/passport/Configurations/rules-engine/)** page.

:::
