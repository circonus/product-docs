---
title: Configuration Details
sidebar_position: 2
---

# Configuration details

Each configuration file has a details page that displays all the information about the configuration file with feature rich capabilities to taylor the configuration file to your needs.

Features such as the following will give you the ability to manage your configuration files in any way you need:

- Auto Versioning
- Viewing Diffs
- Rollbacks
- Assigning to agents
- Cloning
- Assignment history
- Low-code builder for Telegraf and Fluent-bit with isomorphism support
- Rules
- Deleting

## Versions

From the **Passport > Configurations** list page, select the configuration file you want to view the version history for.

Select the **Versions** tab to view, then under the **Versions** dropdown, select the version you want to view.

![configurations-versions-view-versions](../img/configurations-versions-view-versions.png)

## Diffs

Select the **View Diff** button to view the differences between the current version and the previous version.

Any changes made to the configuration file will be highlighted in green for additions and red for deletions.

![configurations-versions-view-diff](../img/configurations-versions-view-diff.png)

## Rollbacks

From a **Passport > Configurations** details page, select the **Versions** tab to view previous config versions. Then, select the version you want to rollback to and select the **Promote to Latest** button.

:::note NOTE

Rolling back a config version will make the selected version the latest for all agents that have been assigned this configuration and any rules that apply.

:::

![configurations-version-rollback](../img/configurations-version-rollback.png)

## Assign

From a **Passport > Configurations** details page, select the **Assign** button to view all possible agents that can be assigned this configuration.

![configurations-assign](../img/configurations-assign.png)

## Cloning

From a **Passport > Configurations** details page, select the **Clone** button to then clone the configuration file and make changes.

## Assignment History

From a **Passport > Configurations** details page, select the **History** button to then see the assignment history for this configuration file.

![configurations-assignment-history](../img/configurations-assignment-history.png)

## Build

Both **Telegraf** and **Fluent-bit** are supported in the low-code flow builder with isomorphism, meaning you can import any existing config file and the UI will convert it to a visual builder in the UI to modify any way. This is a great way to get started with Passport and see how the UI works and enable easier management of complex and lengthy configuration files.

From a **Passport > Configurations** details page, select the **Build** button to then see the assignment history for this configuration file.

![configurations-upload-build](../img/configurations-upload-build.png)

## Rules

From a **Passport > Configurations** details page, select the **Rules** tab to then see all existing rules and create new ones. See the [Rules Engine](/passport/rules-engine) page for more information.

![Configurations Rules Tab](../img/configurations-rules-tab-list-view.png)

## Deleting

From a **Passport > Configurations** details page, select the **Delete** button to delete a configuration file from Passport.

:::warning WARNING

You will be prompted to confirm the deletion and a list of Managers it is assigned to will be displayed. This configuration file cannot be recovered once deleted.

:::

![configurations-delete](../img/configurations-delete.png)
