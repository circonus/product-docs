---
title: Agent Manager
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

# Agent Manager

Agent Manager is the ultimate sidekick for your configuration files. It’s always on the lookout for new files and triggers the appropriate restart/reload functionality of the [supported agents](/passport/intro#supported-agents). With its simple installation and infrequent updates, you can rest assured that your configuration files are always up-to-date and running smoothly.

Once you install the agent manager on a host where your collection agents are located, you can easily manage everything through the intuitive Passport UI.

![agent-managers-overview](video/agent-managers-overview.gif)

## Installation

The Circonus Agent Manager is supported on both Linux and macOS operating systems with Windows soon to come. The following installation instructions will guide you through installing Agent Manager on your host(s) and then being able to create/assign configurations to them from the Passport UI.

:::tip Pro Tip

Circonus recommends installing one or more [supported agents](/passport/intro#supported-agents) **before** installing the Agent Manager. If an agent is installed after the Agent Manager's installation then you will need to stop, re-inventory and restart the Agent Manager for it to detect the new agents.

:::

<!--start of copy at ###Support Platforms-->

### Supported Platforms

:::info

If the following guided installation doesn't fit your environment, please review the available Agent Manager packages on the **[GitHub packages release page](https://github.com/circonus/agent-manager/releases)**.

:::

<br></br>

<Tabs groupId="operating-systems">
  <TabItem value="linuxPrivileged" label="Linux" default attributes={{className: styles.largeTab}}>

<Tabs groupId="linuxArch">
  <TabItem value="ubuntu_2204" label="Ubuntu & Debian" default attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Add the Manager Repo and Install</b></font>

- _**Note:** Regardless of the Ubuntu or Debian version or name, use the following commands to install the Manager._

```bash title="amd64"
sudo wget -O /etc/apt/trusted.gpg.d/circonus.asc https://keybase.io/circonuspkg/pgp_keys.asc?fingerprint=14ff6826503494d85e62d2f22dd15eba6d4fa648 &&
echo "deb http://updates.circonus.net/ubuntu/ jammy main" | sudo tee -a /etc/apt/sources.list.d/circonus.list &&
sudo apt update && sudo apt install circonus-am
```

<font size="4.5"><b>Step 2 - Register, restart and view the status</b></font>

- Navigate to **Passport > Agent Management > Registration** to retrieve a valid registration token secret and replace `<registrationTokenSecret>` with your account registration token secret and then run the following terminal command.

  - _**Note:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

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

<TabItem value="redHat-centos" label="RedHat & CentOS" attributes={{className: styles.smallTab}}>

<font size="4.5"><b>Step 1 - Add the Manager Repo</b></font>

- _**Note:** Regardless of the RedHat or CentOS version, use the following commands._

```bash title="amd64"
cat <<EOF | sudo tee /etc/yum.repos.d/Circonus.repo
[circonus]
name=Circonus - Stable
baseurl=http://updates.circonus.net/centos/7/x86_64/
enabled=1
gpgcheck = 1
gpgkey = https://keybase.io/circonuspkg/pgp_keys.asc?fingerprint=14ff6826503494d85e62d2f22dd15eba6d4fa648
EOF
```

<font size="4.5"><b>Step 2 - Install</b></font>

```bash title="amd64"
sudo yum install circonus-am
```

<font size="4.5"><b>Step e - Register, restart and view status</b></font>

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

<font size="4.5"><b>Step 1 - Download and install the Manager</b></font>

- _**Note:** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

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

  - _**Note:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

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

<font size="4.5"><b>Step 1 - Download and install the Manager</b></font>

- _**Note:** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

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

  - _**Note:** This secret can not be retrieved again once the window is closed and a new one will need to be created, so keep this for future use._

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

<font size="4.5"><b>Step 1 - Download the Manager</b></font>

- _**Note** Ensure you are installing the most recent version of the Agent Manager by visiting the [releases page](https://github.com/circonus/agent-manager/releases) and update the following commands to download that version if a newer version exists._

```bash title="amd64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_linux_amd64.tar.gz
```

```bash title="arm64"
curl -LO https://github.com/circonus/agent-manager/releases/download/v0.2.9/circonus-am_0.2.9_linux_arm64.tar.gz
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
  <TabItem value="macOsHomebrew" label="macOS" attributes={{className: styles.largeTab}}>

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
/usr/local/opt/circonus-am/sbin/circonus-am --register="<registrationTokenSecret>" &&
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

<br></br>

---

<!--


Uninstalling


-->

## Uninstalling

To uninstall Agent Manage, run the following CMD.

<Tabs groupId="operating-systems">
  <TabItem value="linuxPrivileged" label="Linux" default attributes={{className: styles.largeTab}}>

<Tabs groupId="linuxPkgMgr">
  <TabItem value="apt" label="Apt" attributes={{className: styles.smallTab}}>

```bash
sudo /opt/circonus/am/sbin/circonus-am --decommission &&
sudo apt remove -y circonus-am &&
sudo rm -r /opt/circonus/am
```

  </TabItem>
  <TabItem value="yum" label="Yum" attributes={{className: styles.smallTab}}>

```bash
sudo /opt/circonus/am/sbin/circonus-am --decommission &&
sudo yum remove -y circonus-am &&
sudo rm -r /opt/circonus/am
```

  </TabItem>
</Tabs>

  </TabItem>
  
  <TabItem value="macOsHomebrew" label="macOS" attributes={{className: styles.largeTab}}>

<Tabs groupId="macOsArch">
  <TabItem value="arm" label="Apple Silicon (ARM64)" attributes={{className: styles.smallTab}}>

```zsh
brew remove circonus/circonus-agent-manager/circonus-am
```

  </TabItem>
  <TabItem value="amd64" label="Intel (AMD64)" attributes={{className: styles.smallTab}}>

```zsh
brew remove circonus/circonus-agent-manager/circonus-am
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>

<br></br>

---

<!--


Troubleshooting


-->

## Troubleshooting

<Tabs groupId="operating-systems">
  <TabItem value="linuxPrivileged" label="Linux" default attributes={{className: styles.largeTab}}>

Agent Manager usage flags

```bash title="Linux Ubuntu" showLineNumbers
# Check all available usage flags for the Agent Manager
ubuntu-testing-dev-box:/opt/circonus/am/sbin$ sudo ./circonus-am -h
Manager for local agents (metrics, logs, etc.)

Usage:
  circonus-am [flags]

Flags:
      --agents strings         [ENV: CAM_AGENTS] List of agents (Docker specific)
      --apiurl string          [ENV: CAM_API_URL] Circonus API URL (default "https://agents-api.circonus.app/configurations/v1")
      --aws-ec2-tags strings   [ENV: CAM_AWS_EC2_TAGS] AWS EC2 tags for registration meta data
  -c, --config string          config file (default: /opt/circonus/am/etc/circonus-am.yaml|.json|.toml)
  -d, --debug                  [ENV: CAM_DEBUG] Enable debug messages
      --decommission           Decommission agent manager and exit
      --force-register         [ENV: CAM_FORCE_REGISTER] Force registration attempt, even if manager is already registered
  -h, --help                   help for circonus-am
      --instance-id string     [ENV: CAM_INSTANCE_ID] Instance ID (Docker specific)
      --inventory              Inventory installed agents and exit
      --log-level string       [ENV: CAM_LOG_LEVEL] Log level [(panic|fatal|error|warn|info|debug|disabled)] (default "info")
      --log-pretty             Output formatted/colored log lines [ignored on windows]
      --poll-interval string   [ENV: CAM_POLL_INTERVAL] Polling interval for actions (default "60s")
      --register string        [ENV: CAM_REGISTER] Registration token -- register agent manager, inventory installed agents and exit
      --tags strings           [ENV: CAM_TAGS] Custom key:value tags for registration meta data
  -V, --version                Show version and exit
```

Check to see if the Agent Manager is running

```bash title="Linux Ubuntu" showLineNumbers
# Check the status of the Agent Manager
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

```bash title="Linux Ubuntu" showLineNumbers
# View the logs of the running service
ubuntu-host:/opt/circonus/am/etc$ sudo journalctl -u circonus-am.service
Aug 15 18:07:28 ubuntu-qa21-1-observability systemd[1]: Started Circonus Agent Manager.
Aug 15 18:07:28 ubuntu-qa21-1-observability circonus-am[4079997]: {"level":"info","name":"circonus-am","version":"0.1.3","time":1692122848,"message":"starting"}
...
```

  </TabItem>
  <TabItem value="macOsHomebrew" label="macOS" attributes={{className: styles.largeTab}}>

<Tabs groupId="macOsArch">
<TabItem value="arm" label="Apple Silicon (ARM64)" attributes={{className: styles.smallTab}}>

Agent Manager usage flags

```bash title="Apple Silicon (ARM64) Homebrew" showLineNumbers
# Check all the usage flags for the Agent Manager
➜  ~ /opt/homebrew/opt/circonus-am/sbin/circonus-am -h
Manager for local agents (metrics, logs, etc.)

Usage:
  circonus-am [flags]

Flags:
      --agents strings         [ENV: CAM_AGENTS] List of agents (Docker specific)
      --apiurl string          [ENV: CAM_API_URL] Circonus API URL (default "https://agents-api.circonus.app/configurations/v1")
      --aws-ec2-tags strings   [ENV: CAM_AWS_EC2_TAGS] AWS EC2 tags for registration meta data
  -c, --config string          config file (default: /opt/circonus/am/etc/circonus-am.yaml|.json|.toml)
  -d, --debug                  [ENV: CAM_DEBUG] Enable debug messages
      --decommission           Decommission agent manager and exit
      --force-register         [ENV: CAM_FORCE_REGISTER] Force registration attempt, even if manager is already registered
  -h, --help                   help for circonus-am
      --instance-id string     [ENV: CAM_INSTANCE_ID] Instance ID (Docker specific)
      --inventory              Inventory installed agents and exit
      --log-level string       [ENV: CAM_LOG_LEVEL] Log level [(panic|fatal|error|warn|info|debug|disabled)] (default "info")
      --log-pretty             Output formatted/colored log lines [ignored on windows]
      --poll-interval string   [ENV: CAM_POLL_INTERVAL] Polling interval for actions (default "60s")
      --register string        [ENV: CAM_REGISTER] Registration token -- register agent manager, inventory installed agents and exit
      --tags strings           [ENV: CAM_TAGS] Custom key:value tags for registration meta data
  -V, --version                Show version and exit
```

Check to see if Agent Manager is running.

```bash title="Apple Silicon (ARM64) Homebrew" showLineNumbers
# Check the status of the Agent Manager
➜  ~ brew services info circonus-am
circonus-am (homebrew.mxcl.circonus-am)
Running: ✔
Loaded: ✔
Schedulable: ✔
```

View the logs of Agent Manager while it is running

```bash title="Apple Silicon (ARM64) Homebrew" showLineNumbers
# Manually start the Agent Manager and write the last 20 lines of logs to stdout
➜  ~ brew services start circonus-am && tail -f -n20 /opt/homebrew/var/log/circonus-agent-manager.log
==> Successfully started `circonus-am` (label: homebrew.mxcl.circonus-am)
{"level":"fatal","error":"open /opt/homebrew/etc/circonus-am.yaml: no such file or directory","config_file":"/opt/homebrew/etc/circonus-am.yaml","time":1692194609,"message":"unable to load config file"}
{"level":"fatal","error":"open /opt/homebrew/etc/circonus-am.yaml: no such file or directory","config_file":"/opt/homebrew/etc/circonus-am.yaml","time":1692194619,"message":"unable to load config file"}
{"level":"fatal","error":"open /opt/homebrew/etc/circonus-am.yaml: no such file or directory","config_file":"/opt/homebrew/etc/circonus-am.yaml","time":1692194629,"message":"unable to load config file"}
...
```

  </TabItem>
  <TabItem value="amd64" label="Intel (AMD64)" attributes={{className: styles.smallTab}}>

Agent Manager usage flags

```bash title="macOS (Intel (AMD64)) Homebrew" showLineNumbers
# Check all the usage flags for the Agent Manager
joshuajohnson@ubuntu-testing-jj:~$ /opt/circonus/am/sbin/circonus-am -h
Manager for local agents (metrics, logs, etc.)

Usage:
  circonus-am [flags]

Flags:
      --agents strings         [ENV: CAM_AGENTS] List of agents (Docker specific)
      --apiurl string          [ENV: CAM_API_URL] Circonus API URL (default "https://agents-api.circonus.app/configurations/v1")
      --aws-ec2-tags strings   [ENV: CAM_AWS_EC2_TAGS] AWS EC2 tags for registration meta data
  -c, --config string          config file (default: /opt/circonus/am/etc/circonus-am.yaml|.json|.toml)
  -d, --debug                  [ENV: CAM_DEBUG] Enable debug messages
      --decommission           Decommission agent manager and exit
      --force-register         [ENV: CAM_FORCE_REGISTER] Force registration attempt, even if manager is already registered
  -h, --help                   help for circonus-am
      --instance-id string     [ENV: CAM_INSTANCE_ID] Instance ID (Docker specific)
      --inventory              Inventory installed agents and exit
      --log-level string       [ENV: CAM_LOG_LEVEL] Log level [(panic|fatal|error|warn|info|debug|disabled)] (default "info")
      --log-pretty             Output formatted/colored log lines [ignored on windows]
      --poll-interval string   [ENV: CAM_POLL_INTERVAL] Polling interval for actions (default "60s")
      --register string        [ENV: CAM_REGISTER] Registration token -- register agent manager, inventory installed agents and exit
      --tags strings           [ENV: CAM_TAGS] Custom key:value tags for registration meta data
  -V, --version                Show version and exit
```

Check to see if Agent Manager is running.

```bash title="macOS (Intel (AMD64)) Homebrew" showLineNumbers
# Check the status of the Agent Manager
➜  ~ brew services info circonus-am
circonus-am (homebrew.mxcl.circonus-am)
Running: ✔
Loaded: ✔
Schedulable: ✔
```

View the logs of Agent Manager while it is running

```bash title="macOS (Intel (AMD64)) Homebrew" showLineNumbers
# Manually start the Agent Manager and write the last 20 lines of logs to stdout
➜  opt brew services start circonus-am && tail -f -n20 /usr/local/var/log/circonus-agent-manager.log
Service `circonus-am` already started, use `brew services restart circonus-am` to restart.
{"level":"info","name":"circonus-am","version":"0.2.6","time":1695177514,"message":"starting"}
{"level":"info","interval":"1m0s","time":1695177514,"message":"starting poller"}
...
```

  </TabItem>

</Tabs>

  </TabItem>
</Tabs>
