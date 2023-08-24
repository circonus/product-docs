---
title: Use Cases
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

# Use Cases

![Work in progress image](./img/work-in-progress-image.png)

To get you up and running with the Circonus Rules engine, here are some examples of how and when you can use rules to manage your configuration deployments


<Tabs>
  <TabItem value="precisionVisability" label="Precision-Visibility" default attributes={{className: styles.newFilledTab}}>

  Changing quantity and cadence of metrics based on certain defined conditions from your environments.

  ...

  </TabItem>

  <TabItem value="timeBased" label="Time-based" attributes={{className: styles.newFilledTab}}>

  Time-based config pushes and incident response (change the way you collect mid-incident)

  </TabItem>

  <TabItem value="specialEventConfig" label="Special Event Config" attributes={{className: styles.newFilledTab}}>

  Schedule config pushes to prepare for special events, like black Friday, Amazon Prime day to collect more data in the right places.

  </TabItem>

  <TabItem value="incidentResponse" label="Incident Response" attributes={{className: styles.newFilledTab}}>

Similar to time-based configs: most practitioners do this intuitively; change sample rate of traces for example: from manual to automated, safer way 

  Removing the manual operation of updating the collection agent. Sometimes these are forgotten about until the big bill comes at the end of the month. Strem lined!
  </TabItem>

  <TabItem value="avoidVendorLockin" label="Avoid Vendor Lock in" attributes={{className: styles.newFilledTab}}>

We make it easy to redirect the data.
  - Enable agent to write to multiple locations if supported by the agent type
  - Running and managing multiple agent types when assessing new Obserbality vendors.
    - We make this much easier to accomplish, manage and see the value.

Removing the manual operation of updating the collection agent. Sometimes these are forgotten about until the big bill comes at the end of the month. Strem lined!
  </TabItem>

</Tabs>


