---
title: Circonus Unified Agent
weight: 25
---

# Circonus Unified Agent

The [Circonus Unified Agent (CUA)](/circonus/integrations/agents/circonus-unified-agent/introduction/) is a lightweight GoLang-based application that can be installed in a couple of different ways depending on whether you are just testing Circonus or performing a large deployment in your environment. CUA reports metrics from a host, container, cloud, etc. that it is installed on. CUA can be set up with various integrations by simply updating the CUA configuration file to gather additional metrics.

## Installation

CUA can be installed within containers, hosts, or in the cloud. Installing CUA in most cases is done by a single line command and simply resetting CUA.
Follow the link to your specific platform by clicking on it below to see instructions for installing CUA.

[Windows](/circonus/integrations/agents/circonus-unified-agent/windows/ "CUA for Windows")
[Linux](/circonus/integrations/agents/circonus-unified-agent/linux/ "CUA for Linux")
[macOS](/circonus/integrations/agents/circonus-unified-agent/macos/ "CUA for macOS")
[Docker](/circonus/integrations/agents/circonus-unified-agent/docker/ "CUA for Docker") 
[FreeBSD](/circonus/integrations/agents/circonus-unified-agent/freebsd/ "CUA for FreeBSD")

A [check](/circonus/getting-started/glossary/#check) will be created once you have installed CUA on your particular platform which contains specific metrics. If you need additional metrics from other applications such as Kubernetes then you will need to configure an integration.

## API Key

To have metrics flow into a specific Circonus account, CUA will be configured with your account-specific API key if you install CUA from a package or the one-time installer that pulls from GitHub seen in your account Integrations section. If you download CUA from another source and manually install it you will need to get the API key from your account, add it to the CUA configuration file and then restart CUA.

The API Key is added to the CUA configuration file which is found in the CUA configuration file.

**Linux/macOS**

```
/opt/circonus/unified-agent/etc/circonus-unified-agent.conf
```

**Windows**

```
C:\Program Files\Circonus\Circonus-Unified-Agent\etc\circonus-unified-agent.conf
```

Learn more about using [API tokens](/circonus/integrations/api/api-tokens/).

## Ports ##

CUA communicates with public Circonus brokers via TLS over port 43191, and with the Circonus API over Port 443.

## Troubleshooting

Find in-depth CUA troubleshooting steps in the [Troubleshooting](/circonus/integrations/agents/circonus-unified-agent/introduction/#troubleshooting) section of our CUA documentation.

Join the [Circonus Labs Slack channel](https://slack.s.circonus.com/) to ask questions to the Circonus team now!

## Terminal Commands

Find CUA-specific terminal commands in the [Terminal Commands](/circonus/integrations/agents/circonus-unified-agent/introduction/#terminal-commands) section of our CUA documentation.

Join the [Circonus Labs Slack channel](https://slack.s.circonus.com/) to ask questions to the Circonus team now!

[**Next:** Integrations](/circonus/getting-started/integrations/ "Next Step")