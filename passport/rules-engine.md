---
title: Rules Engine
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

# Rules Engine

Configuration rules tell the Agent Manager which configuration file to load on your specified collection agents during a given event or time. One or more can be defined and will take action when the event happens updating specified configuration files to run on your agents to give you the data needed when it is needed.

## Creating Rules

Navigate to the **Passport > Configurations** list view, and select the configuration file to navigate to the details section.

Next, view the **details**, **preview the config** file and also create **rules**.

Select the **Rules** tab, and then click on the **Create Rule** button located at the top right of the table

![Configurations Rules Tab](./img/configurations-rules-tab-list-view.png)

From here, you will define a rule to then be applied to this specific configuration file. Fully define the required fields and click **Create**.

:::danger DANGER

If you are creating alert-based rules, ensure the rules align with your expected outcome of the configuration assignment.

:::

![Configurations Rules Tab](./img/configurations-rules-tab-create.png)

All created rules will be listed in the Rules tab and if more than 1 rule has been created, they can be ordered to specify which rule has the most importance.

:::info PRO TIP

The rules can be ordered by clicking and holding each rule on the far left side of the listed row and dragging it.

:::

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/JXQc_pcd-sE?si=vk8CPu_-4lxUWOCG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

---

## Managing Rules

Many **Actions** are available to take for the rules such as **Edit**, **Clone**, **Copy to other configuration** or **Deleting** the rule.

![Configurations Rules Tab](./img/configurations-rules-tab-list-view-expanded.png)

:::tip PRO TIP

For examples of how to set up rules to achieve specific outcomes, explore the **[Use Cases](/passport/use-cases)** page.

:::
