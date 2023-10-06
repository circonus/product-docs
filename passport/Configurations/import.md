---
title: Import
sidebar_position: 1
---

# Import a configuration file

Passport makes it easy to manage your configuration files and agents all in one place. With Passport, you can import or create configuration files for your agents using the intuitive UI.

From the Circonus UI, you can fully manage the lifecycle of your agent’s various configuration files with built-in versioning whenever the file is first created or uploaded and throughout any edits or cloning.

The following instructions outline how to add configuration files from the Circonus UI to your account located in the main menu **Passport > Configurations**.

:::tip Keep in mind

By default, when a configuration file is added to your Circonus account, it is not being managed by the Agent Manager until you add it to a specific Agent Manager.

:::

## Import

From the configurations list page, select **Import Configuration**.

![flow builder](../img/configurations-list-view.png)

You have the option to upload a local file or simply paste the configuration in the code block. Fill in the rest of the form and select **Import**.

![flow builder](../img/configurations-import-configuration.png)

Once the configuration file is imported, it will be displayed on the **Passport > Configurations** list page.

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/fD6IOvftFZ0?si=a95Bt0KDVKGBQpXP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

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

Assigning a configuration file can either be done from the specific file's **details** page or the **Agent Manager** page.

![configurations-assign-both-ways](../video/configurations-assign-both-ways.gif)

### Configuration details page

From a **Passport > Configurations** details page, select the **Assign** button to view all possible agents that can be assigned this configuration.

![configurations-assign](../img/configurations-assign.png)

### Agent Manager page

![Assign configuration file](../img/agent-manager-assign-configuration-file.png)

All supported agent-type configuration files will be listed. Choose one and select **Assign**.

![Assign configuration file](../img/agent-manager-assign-configuration-list.png)

Next, the assignment will be pulled down by the Agent Manager on its next check which is every 60 seconds. When the configuration file has been updated on the collection agent, the status will change to **Active**.

If the Agent Manager is currently **Disconnected**, when it next checks in it will pull down the new config file.

![Assign configuration file](../img/agent-manager-config-status.png)

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/i-wXHos_y4c?si=grQsyIaprkoELMC6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
