---
title: Configuration Files
sidebar_position: 4
---

# Configuration files

## Overview

## Flow Builder

The Passport Flow Builder is a low code tool for building configurations for your agents. These configurations can be assigned to the corresponding agents managed by the Agent Manager.

### Creating a config

Go to `/app/passport/configuration` and click the "Create configuration" button at the top of the table.

Fill in the relevant information for your config and click "Add" at the bottom of the form.

![screenshot of the form to create a new flow builder config](./img/passport-create-configuration-form.png)

### Using the flow builder

Once in the flow builder, what you see will be determined in part by which agent you are creating a config for. However, there are some elements that are common to all.

![flow builder](./img/passport-flow-builder.png)

In the left menu, you will see a list of supported plugins broken out by the plugin category supported by the target agent.

You can filter the results by using the search box. To use a plugin, simply drag it from the left menu and dropt it over a compatible node on the canvas. Which plugins can connect to each other is agent specific. For example, for Telegraf, you can drag an output plugin over an input plugin, but not the other way around because the output plugin is the last plugin type in that agent's plugin pipeline model.

Your configurations will appear on the right.

To save, click the save button in the canvas button list:

![flow builder](./img/passport-save.png)
