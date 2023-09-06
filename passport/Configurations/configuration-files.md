---
title: Configuration Files
sidebar_position: 1
---

# Configuration Files

Passport makes it easy to manage your configuration files and agents all in one place. With Passport, you can import or create configuration files for your agents using the intuitive UI.

From the Circonus UI, you can fully manage the lifecycle of your agent’s various configuration files with built-in versioning whenever the file is first created or uploaded and throughout any edits or cloning.

Passport supports many agent types such as Telegraf, Fluent-bit, Datadog-agent, Vector, New Relic Infrastructure agent, Filebeat, Metricbeat, Pktvisor and others. With the Passport enhanced low-code configuration building tool, you can build complex configuration files for supported agent types with ease.

:::danger

When a configuration file is deleted, it is gone forever.

:::

## Import a configuration

The following instructions outline how to add configuration files from the Circonus UI to your account located in the main menu **Passport > Configurations**.

![flow builder](../img/configurations-list-view.png)

:::tip Keep in mind

By default, when a configuration file is added to your Circonus account, it is not being managed by the Agent Manager until you add it to a specific Agent Manager.

:::

From the configurations list page, select **Import Configuration**.

You have the option to upload a local file or simply paste the configuration in the code block. Fill in the rest of the form and select **Import**.

![flow builder](../img/configurations-import-configuration.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.

## Build a configuration with flow builder

The Passport Flow Builder is a low-code tool for building configurations for your agents. These configurations can be assigned to the corresponding agents managed by the Agent Manager.

### Creating a configuration

Go to **Passport > Configurations** and click the **Create Configuration** button at the top of the page.

Fill in the relevant information for your config and click "Add" at the bottom of the form.

![screenshot of the form to create a new flow builder config](../img/passport-create-configuration-form.png)

### Using the flow builder

Once in the flow builder, what you see will be determined in part by which agent you are creating a config for. However, some elements are common to all.

![flow builder](../img/passport-flow-builder.png)

In the left menu, you will see a list of supported plugins broken out by the plugin category supported by the target agent.

You can filter the results by using the search box. To use a plugin, simply drag it from the left menu and drop it over a compatible node on the canvas. The plugins that can connect are agent-specific.

:::note Example

When working with Telegraf, you can drag an output plugin over an input plugin, but not the other way around because the output plugin is the last plugin type in that agent's plugin pipeline model.

:::

Your configurations will appear on the right.

To save, click the **Save** button in the canvas button list:

![flow builder](../img/passport-save.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.

## Assigning a configuration

After the Agent Manager has been installed and some collection agents are now being managed, you can start assigning configuration files to the collection agents under management.

:::note

If the Agent Manager is **Disconnected** during this process, once it comes back online it will pull down any assigned configs.

:::

Configuration assignment statuses:

- **New** (Recently assigned to an Agent Manager and the config is waiting for the next check-in from the Agent Manager which is every minute.)
- **Active** (The Agent Manager has updated the configuration file for the selected collection agent)
- **Pending** (The Agent Manager is in the process of applying the configuration)
- **Error** (The Agent Manager encountered an error applying the configuration)
- **Canceled** (The assignment was replaced by another **new** assignment before the Agent Manager had a chance to see it)
- **Inactive** (The assignment was previously **active** but has now been replaced)

Assigning a configuration file can either be done from the specific file's details page or the **Passport > Agent Manager** page.

![Assign configuration file](../img/agent-manager-assign-configuration-file.png)

All supported agent-type configuration files will be listed. Choose one and select **Assign**.

![Assign configuration file](../img/agent-manager-assign-configuration-list.png)

Next, the assignment will be pulled down by the Agent Manager on its next check which is every 60 seconds. When the configuration file has been updated on the collection agent, the status will change to **Active**.

If the Agent Manager is currently **Disconnected**, when it next checks in it will pull down the new config file.

![Assign configuration file](../img/agent-manager-config-status.png)
