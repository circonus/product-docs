---
title: Getting Started Guide
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# The Getting Started Guide

To get up and running quickly with Passport, we will be installing the Agent Manager on a Linux or macOS host for it to manage existing [supported collection agents](/passport/intro#supported-agents).

1. Install any of Passport's [supported collection agents](/passport/intro#supported-agents).
2. [Install and register the Agent Manager](getting-started-guide#install-and-register-the-agent-manager)
3. [Import a configuration file](getting-started-guide#import-a-configuration-file) to your Passport account.
4. [Assign a configuration file](getting-started-guide#assign-a-configuration-file) to your Agent Manager.
5. Optional:
   1. [Create rules](getting-started-guide#create-rules) for your configuration files if you have more than 1 configuration file uploaded.
   2. [Add external alerts](getting-started-guide#add-external-alerts) so you can trigger rules to modify when specific configurations will be enabled.

## Install and register the Agent Manager

**Supported Platforms**

<Tabs groupId="operating-systems">
  <TabItem value="linuxPrivileged" label="Linux (Privileged)" default>

:::info

You will be installing the Agent Manager in a privileged manner.

:::

#### Step 1 - Download and install

- Download the latest version of Agent Manager from the [release page](https://github.com/circonus/agent-manager/releases) for the appropriate operating system and CPU architecture.
- Modify the following commands to fit your platform type and **specify the latest version available**.

```bash title="Example: Download and Install Agent Manager v0.2.3 for Debian"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.3/circonus-am_0.2.3_amd64.deb && sudo dpkg -i circonus-am_0.2.3_amd64.deb
```

#### Step 2 - Register, restart and view the status

:::warning Notice

- Log into the Passport UI and navigate to `Passport > Agent Management > Registration` to retrieve a valid registration token. A secret will be displayed for the user to copy and keep for future Agent Manager registrations. This secret can not be retrieved again once the window is closed and a new one will need to be created.

:::

- Register Agent Manager with the following command flag `circonus-am --register="<validRegistrationToken>"`.
- In the following command, replace `<validRegistrationToken>` with your account registration token and then run it.

```bash title="Example: Register, restart and view the Agent Manager's status"
sudo /opt/circonus/am/sbin/circonus-am --register="<validRegistrationToken>" && sudo systemctl restart circonus-am && sudo systemctl restart circonus-am
```

:::info Success

If the registration is successful, then you should see the following output.

```json
{
  "level": "info",
  "pkg": "manager",
  "time": 1692032136,
  "message": "registration complete"
}
```

:::

<details><summary>Example - Successful installation</summary>
<p>

```bash title="Linux Ubuntu" showLineNumbers
# Install the Agent Manager
ubuntu-host:~$ sudo dpkg -i install ~/downloads/circonus-am_0.1.3_amd64.deb
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

# Register the Agent Manager
ubuntu-host:/opt/circonus/am/etc$ sudo /opt/circonus/am/sbin/circonus-am --register=6850a610-51b6-4829-baf3-f2cc40897211
{"level":"info","name":"circonus-am","version":"0.1.3","time":1692125508,"message":"starting"}
{"level":"info","time":1692125508,"message":"starting registration"}
{"level":"info","agent":"telegraf","time":1692125508,"message":"found"}
{"level":"info","pkg":"manager","time":1692125508,"message":"registration complete"}

# Start the Agent Manager
ubuntu-host:/opt/circonus/am/etc$ sudo systemctl start circonus-am

# Optional: Check the status of Agent Manger
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
  <TabItem value="macOsHomebrew" label="macOS (Homebrew)">

#### Step 1 - Download and install

- Download and install the latest version of Agent Manager `tar.gz` file from the [release page](https://github.com/circonus/agent-manager/releases) for the appropriate operating system and CPU architecture, or install with homebrew package manager.

```bash title="Example: Tap the Agent Manager repo and install"
brew tap circonus/homebrew-circonus-agent-manager && brew install circonus/circonus-agent-manager/circonus-am
```

#### Step 2 - Register, restart and view the status

:::warning Notice

- Log into the Passport UI and navigate to `Passport > Agent Management > Registration` to retrieve a valid registration token. A secret will be displayed for the user to copy and keep for future Agent Manager registrations. This secret can not be retrieved again once the window is closed and a new one will need to be created.

:::

- Register Agent Manager with the following command flag `circonus-am --register="<validRegistrationToken>"`.
- In the following command, replace `<validRegistrationToken>` with your account registration token and then run the command.

```bash title="Register, restart, and view the status"
/opt/homebrew/opt/circonus-am/sbin/circonus-am --register="<validRegistrationToken>" && brew services restart circonus-am && brew services info circonus-am
```

:::info Success

If the registration is successful, then you should see the following output `registration complete`

```json showLineNumbers
{
  "level": "info",
  "pkg": "manager",
  "time": 1692032136,
  "message": "registration complete"
}
```

:::

  </TabItem>
</Tabs>

:::note NOTE

Complete instructions to inventory new agents, uninstall, and troubleshoot can be found on the full [Agent Manager](/passport/agent-manager/) page.

:::

## Import a configuration file

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

Complete instructions to import and build configuration files with the low-code builder can be found on the full **[Configuration Files](/passport/Configurations/configuration-files/)** page.

:::

## Assign a configuration file

Uploaded and low-code built configuration files are supported by the Passport rules engine to define when and how a configuration file is applied to any supported collection agent that the Agent Manager manages.

Assigning a configuration file can either be done from the specific file's details page or the **Passport** > Agent Manager\*\* page.

![Assign configuration file](./img/agent-manager-assign-configuration-file.png)

All supported agent-type configuration files will be listed. Choose one and select **Assign**

![Assign configuration file](./img/agent-manager-assign-configuration-list.png)

Configuration assignment statuses:

- **New** (Recently assigned to an Agent Manager and the config is waiting for the next check-in from the Agent Manager which is every minute.)
- **Active** (The Agent Manager has updated the configuration file for the selected collection agent)
- **Pending** (The Agent Manager is in the process of applying the configuration)
- **Error** (The Agent Manager encountered an error applying the configuration)
- **Canceled** (The assignment was replaced by another **new** assignment before the Agent Manager had a chance to see it)
- **Inactive** (The assignment was previously **active** but has now been replaced)

![Assign configuration file](./img/agent-manager-config-status.png)

:::note NOTE

Complete instructions for configuration files can be found on the **[Configuration file](/passport/Configurations/configuration-files/)** page.

:::

### Create rules

Navigate to the **Passport > Configurations** list view, and select the configuration file to navigate to the details section.

![Configurations List Selected](./img/configurations-selected-config.png)

From here, you can view **details**, **preview the config** file and create **rules\*\***.

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

## Add external alerts

External Alerts are for you to add incoming alerts from outside sources such as Grafana, by using webhooks so you can create rules based on these events to then select which configuration files you want running on your collection agents.

Navigate to **Passport > External Alerts** and select **Create External Alerts** to get started.

![External Alerts List View](./img/external-alerts-list-view.png)

:::note NOTE

Complete instructions for managing external alerts can be found on the **[external alerts](/passport/external-alerts/)** page.

:::
