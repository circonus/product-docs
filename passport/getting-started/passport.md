---
title: Passport
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from '../styles.module.css';

# Getting Started

To get up and running quickly with Passport, we will be installing the Agent Manager on a Linux or macOS host for it to manage existing [supported collection agents](/passport/intro#supported-agents).

1. Install any of Passport's [supported collection agents](/passport/intro#supported-agents).
2. [Install and register the Agent Manager](/passport/getting-started/passport#install-and-register-the-agent-manager)
3. [Import a configuration file](/passport/getting-started/passport#import-a-configuration-file) to your Passport account.
4. [Assign a configuration file](/passport/getting-started/passport#assign-a-configuration-file) to your Agent Manager.
5. Optional:
   1. [Create rules](/passport/getting-started/passport#create-rules) for your configuration files if you have more than 1 configuration file uploaded.
   2. [Add external alerts](/passport/getting-started/passport#add-external-alerts) so you can trigger rules to modify when specific configurations will be enabled.

## Install and register the Agent Manager

<!--start of copy at ###Support Platforms-->

### Supported Platforms

:::info

If the following guided installation doesn't fit your environment, please review the available Agent Manager packages on the **[GitHub packages release page](https://github.com/circonus/agent-manager/releases)**.

:::

<br></br>

<Tabs groupId="operating-systems">
  <TabItem value="linuxPrivileged" label="Linux Package Install" default attributes={{className: styles.largeTab}}>

<Tabs groupId="linuxArch">
  <TabItem value="ubuntu_2204" label="Ubuntu 22.04" default attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Install Agent Manager from the repository with the following commands.</b></font>

```bash title="amd64"
sudo wget -O /etc/apt/trusted.gpg.d/circonus.asc https://keybase.io/circonuspkg/pgp_keys.asc?fingerprint=14ff6826503494d85e62d2f22dd15eba6d4fa648 &&
echo "deb http://updates.circonus.net/ubuntu/ jammy main" | sudo tee -a /etc/apt/sources.list.d/circonus.list &&
sudo apt update && sudo apt install circonus-am
```

<font size="4.5"><b>Step 2 - Register, restart and view the status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
sudo /opt/circonus/am/sbin/circonus-am --register="<registrationTokenSecret>" &&
sudo systemctl restart circonus-am &&
sudo systemctl status circonus-am
```

  </TabItem>
  <TabItem value="ubuntu-2004" label="Ubuntu 20.04" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Install Agent Manager from the repository with the following commands.</b></font>

```bash title="amd64"
sudo wget -O - https://keybase.io/circonuspkg/pgp_keys.asc?fingerprint=14ff6826503494d85e62d2f22dd15eba6d4fa648 | sudo apt-key add - &&
echo "deb http://updates.circonus.net/ubuntu/ focal main" | sudo tee -a /etc/apt/sources.list.d/circonus.list &&
sudo apt update && sudo apt install circonus-am
```

<font size="4.5"><b>Step 2 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
sudo /opt/circonus/am/sbin/circonus-am --register="<registrationTokenSecret>" &&
sudo systemctl restart circonus-am &&
sudo systemctl status circonus-am
```

  </TabItem>
  <TabItem value="install-from-deb-file" label="Install .deb file" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Download and install the Agent Manager for either amd64 or arm64 below</b></font>

- _**NOTE** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

```bash title="amd64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_amd64.deb &&
sudo dpkg -i circonus-am_0.2.9_amd64.deb
```

```bash title="arm64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_arm64.deb &&
sudo dpkg -i circonus-am_0.2.9_arm64.deb
```

<font size="4.5"><b>Step 2 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
sudo /opt/circonus/am/sbin/circonus-am --register="<registrationTokenSecret>" &&
sudo systemctl restart circonus-am &&
sudo systemctl status circonus-am
```

  </TabItem>

<TabItem value="install-from-rpm-file" label="Install .rpm file" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Download and install the Agent Manager for either amd64 or arm64 below</b></font>

- _**NOTE** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

```bash title="amd64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_amd64.rpm &&
sudo yum install circonus-am_0.2.9_amd64.rpm
```

```bash title="arm64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_arm64.rpm &&
sudo yum install circonus-am_0.2.9_arm64.rpm
```

<font size="4.5"><b>Step 2 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
sudo /opt/circonus/am/sbin/circonus-am --register="<registrationTokenSecret>" &&
sudo systemctl restart circonus-am &&
sudo systemctl status circonus-am
```

  </TabItem>
  <TabItem value="install-from-tar.gz" label="Download tar.gz file" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Download the Agent Manager for either amd64 or arm64 below</b></font>

- _**NOTE** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

```bash title="tar.gz amd64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_darwin_amd64.tar.gz
```

```bash title="tar.gz arm64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_darwin_arm64.tar.gz
```

<font size="4.5"><b>Step 2 - Install</b></font>

- Using your preferred method of installation, install the Agent Manager and see the [releases page](https://github.com/circonus/agent-manager/releases) for additional information.

<font size="4.5"><b>Step 3 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
sudo /opt/circonus/am/sbin/circonus-am --register="<registrationTokenSecret>" &&
sudo systemctl restart circonus-am &&
sudo systemctl status circonus-am
```

  </TabItem>
</Tabs>

:::info SUCCESS!

If the registration is successful, then you will see `"message": "registration complete"` from the Agent Manager and also the status of its service as `Active: active (running)`.

:::

<details><summary>Example - Successful installation</summary>
<p>

```bash title="Linux Ubuntu" showLineNumbers
# Step 1
circonus@ubuntu-host:/etc/apt/sources.list.d$ sudo wget -O /etc/apt/trusted.gpg.d/circonus.asc https://keybase.io/circonuspkg/pgp_keys.asc?fingerprint=14ff6826503494d85e62d2f22dd15eba6d4fa648 &&
echo "deb http://updates.circonus.net/ubuntu/ jammy main" | sudo tee -a /etc/apt/sources.list.d/circonus.list &&
sudo apt update && sudo apt install circonus-am
--2023-09-22 14:14:42--  https://keybase.io/circonuspkg/pgp_keys.asc?fingerprint=14ff6826503494d85e62d2f22dd15eba6d4fa648
Resolving keybase.io (keybase.io)... 52.3.107.250, 52.72.123.132
Connecting to keybase.io (keybase.io)|52.3.107.250|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3122 (3.0K) [text/plain]
Saving to: ‘/etc/apt/trusted.gpg.d/circonus.asc’

/etc/apt/trusted.gpg.d/circonus.asc 100%[===================================================================>]   3.05K  --.-KB/s    in 0s

2023-09-22 14:14:42 (773 MB/s) - ‘/etc/apt/trusted.gpg.d/circonus.asc’ saved [3122/3122]

deb http://updates.circonus.net/ubuntu/ jammy main
Hit:1 http://us-central1.gce.archive.ubuntu.com/ubuntu jammy InRelease
Hit:2 http://us-central1.gce.archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:3 http://us-central1.gce.archive.ubuntu.com/ubuntu jammy-backports InRelease
Hit:4 http://security.ubuntu.com/ubuntu jammy-security InRelease
Hit:5 https://download.docker.com/linux/ubuntu jammy InRelease
Hit:6 http://updates.circonus.net/ubuntu jammy InRelease
Hit:7 https://packages.fluentbit.io/ubuntu/jammy jammy InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
78 packages can be upgraded. Run 'apt list --upgradable' to see them.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  circonus-am
0 upgraded, 1 newly installed, 0 to remove and 78 not upgraded.
Need to get 4281 kB of archives.
After this operation, 10.7 MB of additional disk space will be used.
Get:1 http://updates.circonus.net/ubuntu jammy/main amd64 circonus-am amd64 0.2.9 [4281 kB]
Fetched 4281 kB in 1s (5300 kB/s)
Selecting previously unselected package circonus-am.
(Reading database ... 124909 files and directories currently installed.)
Preparing to unpack .../circonus-am_0.2.9_amd64.deb ...
Unpacking circonus-am (0.2.9) ...
Setting up circonus-am (0.2.9) ...
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

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.

# Step 2
circonus@ubuntu-host:/etc/apt/sources.list.d$ sudo /opt/circonus/am/sbin/circonus-am --register="eyJhbGciOiJIUzUxMiIsImtpZCI6IjIzMzAyNjE2ODMwMTgyMDY3NSIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiY29uZmlndXJhdGlvbnMtYXBpIl0sImNpcmNvbnVzOmFjY291bnQiOiJwcm9kdGVzdGluZyIsImNpcmNvbnVzOmdyYW50cyI6WyJjdXN0b21lcl9wYXNzcG9ydHJlZ2lzdGVyIl0sImNpcmNvbnVzOm9yZ2lkIjoiMjMzMDI2MTY4MzAxODIwNjc1IiwiY2lyY29udXM6dG9rZW4iOiIxYjMwNDViMC1lZjA4LTQ0NDMtOGYwYi0wMDZmNTNjOTdmMzQiLCJleHAiOjIwMTA5NzA3NjQsImlhdCI6MTY5NTM5NDc2NSwiaXNzIjoiY29uZmlndXJhdGlvbnMtYXBpIiwibmJmIjoxNjk1Mzk0NzY1LCJzdWIiOiIwIn0.BtN3jnlv78Ib0Dd5M3wQExlvokiobj3NBEkajRLQ6F9PgugmpxkCVgr2bGHXV6Kav-DopSFjVV31jOxjgz0oCg" --tags="os:linux_deb" && sudo systemctl restart c
irconus-am && sudo systemctl status circonus-am
{"level":"info","cfg_file":"/opt/circonus/am/etc/circonus-am.yaml","time":1695395093,"message":"config file found/used"}
{"level":"info","name":"circonus-am","version":"0.2.9","time":1695395093,"message":"starting"}
{"level":"info","time":1695395093,"message":"starting registration"}
{"level":"warn","file":"/usr/bin/newrelic-infra-service","time":1695395093,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/bin/otelcol","time":1695395093,"message":"agent binary not found, skipping"}
{"level":"info","agent":"telegraf","time":1695395093,"message":"found"}
{"level":"info","agent":"cua","time":1695395093,"message":"found"}
{"level":"warn","file":"/usr/bin/datadog-agent","time":1695395093,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/share/filebeat/bin/filebeat","time":1695395093,"message":"agent binary not found, skipping"}
{"level":"info","agent":"fluent-bit","time":1695395093,"message":"found"}
{"level":"warn","file":"/usr/share/metricbeat/bin/metricbeat","time":1695395093,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/bin/vector","time":1695395093,"message":"agent binary not found, skipping"}
{"level":"info","pkg":"manager","time":1695395093,"message":"registration complete"}
● circonus-am.service - Circonus Agent Manager
     Loaded: loaded (/lib/systemd/system/circonus-am.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-09-22 15:04:53 UTC; 23ms ago
       Docs: https://github.com/circonus/agent-manager
   Main PID: 1249575 (circonus-am)
      Tasks: 6 (limit: 9525)
     Memory: 1.4M
        CPU: 4ms
     CGroup: /system.slice/circonus-am.service
             └─1249575 /opt/circonus/am/sbin/circonus-am --config=/opt/circonus/am/etc/circonus-am.yaml
```

</p>
</details>

#### Video Tutorial

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/6SdZ3HOEmok?si=gKsK0KEwMEuES9qp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

  </TabItem>
  <TabItem value="macOsHomebrew" label="macOS Package Install" attributes={{className: styles.largeTab}}>

<Tabs groupId="macOsArch">
  <TabItem value="arm" label="Apple Silicon (ARM64)" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Tap the Agent Manager repository and install</b></font>

```bash
brew tap circonus/homebrew-circonus-agent-manager &&
brew install circonus/circonus-agent-manager/circonus-am
```

<font size="4.5"><b>Step 2 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
/opt/homebrew/opt/circonus-am/sbin/circonus-am --register="<registrationTokenSecret>" &&
brew services start circonus-am &&
brew services info circonus-am
```

  </TabItem>
  <TabItem value="amd64" label="Intel (AMD64)" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Tap the Agent Manager repository and install</b></font>

```bash
brew tap circonus/homebrew-circonus-agent-manager &&
brew install circonus/circonus-agent-manager/circonus-am
```

<font size="4.5"><b>Step 2 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
/usr/local/opt/circonus-am/sbin/circonus-am --register="<registrationTokenSecret>" &&
brew services start circonus-am &&
brew services info circonus-am
```

  </TabItem>
  <TabItem value="targz-file" label="Download tar.gz file" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Download the Agent Manager for either amd64 or arm64 below</b></font>

- _**NOTE** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

```bash title="arm64.tar.gz"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_darwin_arm64.tar.gz
```

```bash title="amd64.tar.gz"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_darwin_amd64.tar.gz
```

```bash title="all.tar.gz"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_darwin_all.tar.gz
```

<font size="4.5"><b>Step 2 - Install</b></font>

- Using your preferred method of installation, install the Agent Manager and see the [releases page](https://github.com/circonus/agent-manager/releases) for additional information.

<font size="4.5"><b>Step 3 - Register, restart and view status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**NOTE:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

- **Agent Manager Tagging - _Optional_**
  - Tags can be added **only during registration** times by using the `--tags` flag either before or after the `--register` flag.
  - _If tags need to be added after the initial registration, re-register your agent manager again with the desired tags._
  - Ex: CLI tags: `--tags="foo:bar,baz:qux"` with `,` separating the `key:val` entries.
  - Ex: Environment variables: `CAM_TAGS="foo:bar baz:qux"` with spaces separating the `key:val` entries.

```bash
/usr/local/opt/circonus-am/sbin/circonus-am --register="<registrationTokenSecret>"&&
brew services start circonus-am &&
brew services info circonus-am
```

  </TabItem>
</Tabs>

:::info

If the registration is successful, then you will see `"message": "registration complete"` from the Agent Manager and also the status of its service as `Active: active (running)`.

:::

  </TabItem>
</Tabs>

<br></br>

---

<!--


Managing additional Agents


-->

## Managing additional collection agents

If additional agents have been added to the host where Agent Manager is running, then you will need to run a few CMDs for them to become discovered.

<Tabs groupId="operating-systems">
  <TabItem value="linuxPrivileged" label="Linux" default attributes={{className: styles.largeTab}}>

<font size="4.5"><b>Take an inventory of local collection agents</b></font>

```bash title="Example: stop, re-inventory, start and view the Agent Manager's status"
sudo systemctl stop circonus-am &&
sudo /opt/circonus/am/sbin/circonus-am --inventory &&
sudo systemctl start circonus-am &&
sudo systemctl status circonus-am
```

:::info Success

Example of what the output will look like when a **telegraf** agent has been found.

```json showLineNumbers
{"level":"info","agent":"telegraf","time":1692044346,"message":"found"}
{"level":"info","pkg":"manager","time":1692044346,"message":"inventory complete"}
```

:::

<details><summary>Example - Successful re-inventory</summary>
<p>

```bash title="Linux Ubuntu" showLineNumbers
ubuntu-host:~$ sudo systemctl stop circonus-am &&
sudo /opt/circonus/am/sbin/circonus-am --inventory &&
sudo systemctl start circonus-am &&
sudo systemctl status circonus-am
{"level":"info","name":"circonus-am","version":"0.2.3","time":1694466173,"message":"starting"}
{"level":"warn","error":"exit status 127","agent":"cua","time":1694466174,"message":"getting agent version"}
{"level":"info","agent":"cua","time":1694466174,"message":"found"}
{"level":"warn","file":"/usr/share/filebeat/bin/filebeat","time":1694466174,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/bin/otelcol","time":1694466174,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/bin/vector","time":1694466174,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/sbin/datadog-agent","time":1694466174,"message":"agent binary not found, skipping"}
{"level":"info","agent":"fluent-bit","time":1694466174,"message":"found"}
{"level":"warn","file":"/usr/share/metricbeat/bin/metricbeat","time":1694466174,"message":"agent binary not found, skipping"}
{"level":"warn","file":"/usr/bin/newrelic-infra-service","time":1694466174,"message":"agent binary not found, skipping"}
{"level":"info","agent":"telegraf","time":1694466175,"message":"found"}
{"level":"info","pkg":"manager","time":1694466175,"message":"invetory complete"}
● circonus-am.service - Circonus Agent Manager
     Loaded: loaded (/lib/systemd/system/circonus-am.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-09-11 21:02:55 UTC; 20ms ago
       Docs: https://github.com/circonus/agent-manager
   Main PID: 3323503 (circonus-am)
      Tasks: 7 (limit: 9525)
     Memory: 2.6M
        CPU: 4ms
     CGroup: /system.slice/circonus-am.service
             └─3323503 /opt/circonus/am/sbin/circonus-am --config=/opt/circonus/am/etc/circonus-am.yaml
```

</p>
</details>

  </TabItem>
  <TabItem value="macOsHomebrew" label="macOS" attributes={{className: styles.largeTab}}>

<Tabs groupId="macOsArch">
  <TabItem value="arm" label="Apple Silicon (ARM64)" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Take an inventory of local collection agents</b></font>

```bash title="Example: stop, re-inventory, start and view the Agent Manager's status"
brew services stop circonus-am &&
/opt/homebrew/opt/circonus-am/sbin/circonus-am --inventory &&
brew services start circonus-am &&
brew services info circonus-am
```

  </TabItem>
  <TabItem value="amd64" label="Intel (AMD64)">

<font size="4.5"><b>Take an inventory of local collection agents</b></font>

```bash title="Example: stop, re-inventory, start and view the Agent Manager's status"
brew services stop circonus-am &&
/usr/local/opt/circonus-am/sbin/circonus-am --inventory &&
brew services start circonus-am &&
brew services info circonus-am
```

  </TabItem>
</Tabs>

:::info Success

Example of what the output will look like when a **telegraf** agent has been found.

```json showLineNumbers
{"level":"info","agent":"telegraf","time":1692044346,"message":"found"}
{"level":"info","pkg":"manager","time":1692044346,"message":"invetory complete"}
```

:::
</TabItem>
</Tabs>

<!--End of copy from am page-->

Complete instructions to inventory new agents, uninstall, and troubleshoot can be found on the full [Agent Manager](/passport/agent-manager/) page.

---

## Import a configuration file

The following instructions outline how to add configuration files from the Circonus UI to your account located in the main menu **Passport > Configurations**.

From the configurations list page, select **Import**.

![flow builder](../img/configurations-list-view.png)

:::tip Keep in mind

By default, when a configuration file is added to your Circonus account, it is not being managed by the Agent Manager until you assign it to a specific Agent Manager.

:::

You have the option to upload a local file or simply paste the configuration in the code block. Fill in the rest of the form and select **Import**.

![flow builder](../img/configurations-import-configuration.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.

:::note NOTE

Complete instructions to import and build configuration files with the low-code builder can be found on the full **[Configuration Files](/passport/Configurations/configuration-files/)** page.

:::

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/fD6IOvftFZ0?si=a95Bt0KDVKGBQpXP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

---

## Assign a configuration file

Uploaded and low-code built configuration files are supported by the Passport rules engine to define when and how a configuration file is applied to any supported collection agent that the Agent Manager manages.

Assigning a configuration file can either be done from the specific file's details page or the **Passport > Agent Manager** page.

![Assign configuration file](../img/agent-manager-assign-configuration-file.png)

All supported agent-type configuration files will be listed. Choose one and select **Assign**.

![Assign configuration file](../img/agent-manager-assign-configuration-list.png)

Next, the assignment will be pulled down by the Agent Manager on its next check which is every 60 seconds. When the configuration file has been updated on the collection agent, the status will change to **Active**.

If the Agent Manager is currently **Disconnected**, when it next checks in it will pull down the new config file.

Configuration assignment statuses:

- **New** (Recently assigned to an Agent Manager and the config is waiting for the next check-in from the Agent Manager which is every minute.)
- **Active** (The Agent Manager has updated the configuration file for the selected collection agent)
- **Pending** (The Agent Manager is in the process of applying the configuration)
- **Error** (The Agent Manager encountered an error applying the configuration)
- **Canceled** (The assignment was replaced by another **new** assignment before the Agent Manager had a chance to see it)
- **Inactive** (The assignment was previously **active** but has now been replaced)

![Assign configuration file](../img/agent-manager-config-status.png)

Complete instructions for configuration files can be found on the **[Configuration file](/passport/Configurations/configuration-files/)** page.

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/i-wXHos_y4c?si=Y4lWW9ytGMb3sa-W" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

### Create rules

Navigate to the **Passport > Configurations** list view, and select the configuration file to navigate to the details section.

Next, you can view **details**, **preview the config** file and create **rules**.

Select the **Rules** tab, and then click on the **Create Rule** button located at the top right of the table

![Configurations Rules Tab](../img/configurations-rules-tab-list-view.png)

From here, you will define a rule to then be applied to this specific configuration file. Fully define the required fields and click **Create**.

:::danger DANGER

If you are creating alert-based rules, ensure the rules align with your expected outcome of the configuration assignment.

:::

![Configurations Rules Tab](../img/configurations-rules-tab-create.png)

All created rules will be listed in the Rules tab and if more than 1 rule has been created, they can be ordered to specify which rule has the most importance.

:::info Rules ordering

The rules can be ordered by clicking and holding each rule on the far left side of the listed row and dragging it.

:::

Complete instructions for Rules can be found on the **[rules engine](/passport/Configurations/rules-engine/)** page.

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/JXQc_pcd-sE?si=xRaY73evGzq54yYd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

---

## Add external alerts

External Alerts are for you to add incoming alerts from outside sources such as Grafana, by using webhooks so you can create rules based on these events to then select which configuration files you want running on your collection agents.

Navigate to **Passport > External Alerts** and select **Create External Alerts** to get started.

![External Alerts List View](../img/external-alerts-list-view.png)

Complete instructions for managing external alerts can be found on the **[external alerts](/passport/external-alerts/)** page.
