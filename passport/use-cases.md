---
title: Use Cases
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

# Use Cases

To get you up and running with the Circonus Rules engine, here are some examples of how and when you can use rules to manage your configuration deployments

<Tabs>
  <TabItem value="precisionVisability" label="Precision-Visibility" default attributes={{className: styles.newFilledTab}}>

  Precision visibility (preventing alert fatigue, helping with metrics discovery, speed MTTR/responses)

  Alert suppression directly with the data: enrich the data at collection during a deployment; rather than track down alert rules, (apply tags to the data, and then remove that data after time elapses)


  </TabItem>
  <TabItem value="timeBased" label="Time-based" attributes={{className: styles.newFilledTab}}>

  Time-based config pushes and incident response (change the way you collect mid-incident)

  </TabItem>
  <TabItem value="specialEventConfig" label="Special Event Config" attributes={{className: styles.newFilledTab}}>

  schedule config pushes to prepare for special events, like black friday, prime day

  </TabItem>
  <TabItem value="incidentResponse" label="Incident Response" attributes={{className: styles.newFilledTab}}>

  similar to time-based configs: most practitioners do this intuitively; change sample rate of traces for example: from manual to automated, safer way 

  </TabItem>
</Tabs>


