---
title: Configuration Files
sidebar_position: 1
---

# Configuration files

Passport makes it easy to manage your configuration files and agents all in one place. With Passport, you can import or create configuration files for your agents using the intuitive UI.

From the Circonus UI, you can fully manage the lifecycle of your agent’s various configuration files with built-in versioning whenever the file is first created or uploaded and throughout any edits or cloning.

Passport supports many agent types such as Telegraf, Fluent-bit, Datadog-agent, Vector, New Relic Infrastructure agent, Filebeat, Metricbeat, Pktvisor and others. With the Passport enhanced low-code configuration building tool, you can build complex configuration files for supported agent types with ease.

:::danger

When a configuration file is deleted, it is gone forever.

:::

The following instructions outline how to add configuration files from the Circonus UI to your account located in the main menu **Passport > Configurations**.

![flow builder](../img/configurations-list-view.png)

:::tip Keep in mind

By default, when a configuration file is added to your Circonus account, it is not being managed by the Agent Manager until you add it to a specific Agent Manager.

:::

## Import a Configuration files

From the configurations list page, select **Import Configuration**.

You have the option to upload a local file or simply paste the configuration in the code block. Fill in the rest of the form and select **Import**.

![flow builder](../img/configurations-import-configuration.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.

## Build a Config with Flow Builder

The Passport Flow Builder is a low-code tool for building configurations for your agents. These configurations can be assigned to the corresponding agents managed by the Agent Manager.

### Creating a config

Go to **Passport > Configurations** and click the **Create Configuration** button at the top of the page.

Fill in the relevant information for your config and click "Add" at the bottom of the form.

![screenshot of the form to create a new flow builder config](../img/passport-create-configuration-form.png)

### Using the flow builder

Once in the flow builder, what you see will be determined in part by which agent you are creating a config for. However, some elements are common to all.

![flow builder](../img/passport-flow-builder.png)

In the left menu, you will see a list of supported plugins broken out by the plugin category supported by the target agent.

You can filter the results by using the search box. To use a plugin, simply drag it from the left menu and drop it over a compatible node on the canvas. The plugins that can connect is agent specific.

:::note Example

When working with Telegraf, you can drag an output plugin over an input plugin, but not the other way around because the output plugin is the last plugin type in that agent's plugin pipeline model.

:::

Your configurations will appear on the right.

To save, click the **Save** button in the canvas button list:

![flow builder](../img/passport-save.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.
