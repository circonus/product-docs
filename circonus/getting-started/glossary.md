---
title: Glossary
weight: 95
---

# Glossary

#### Acknowledgement

A recognition of an alert accompanied by a specified duration during which reminders and escalations will not be triggered. Acknowledgments let other team members know that you are working to resolve the issue associated with the alert.

#### Agent

Circonus programs that enable the continuous and autonomous collection of metrics.

#### Alert

A notification that is sent to contacts (individuals, groups, third-party services) whenever an event occurs. 

#### Annotation

A manual identification made by a Circonus user within a visualization. For example, you might annotate a server being down for maintenance. The same condition might have also caused an event and possibly an alert to occur.

#### Bundle

This is a collection of checks that have the same configuration and target, but collect from different brokers. A bundle can have one check or many checks in it, and changing the bundle affects all the associated checks.

#### Check

An assessment of a service by Circonus which results in the collection of telemetry. Checks are created through the installation of an agent or broker.  

#### Circonus Analytics Query Language (CAQL)

The Circonus Analytic Query Language enables users to formulate queries for graphing complex transformations of collected data and allows fine-tuning of previously hidden parameters. Often referenced via the acronym “CAQL,” which we affectionately pronounce as “cackle.” See CAQL Documentation. 

#### Circonus Broker

Circonus operates a worldwide system of nodes for configuring checks and gathering metrics. These nodes are known as Circonus Public Brokers and are available for use by any active Circonus accounts. Enterprise Brokers are software appliances that can be downloaded and installed in a customer's datacenter for running checks and gathering metrics privately.

#### Circonus Unified Agent (CUA)

The Circonus Unified Agent is our open-source agent to collect metrics through various input plugins, allowing Circonus customers to monitor systems, services, and 3rd party APIs. Often referenced via the acronym “CUA,” which we affectionately pronounce as “see-you-ey.”

#### Contact Group

A collection of users, non-users, and third-party services which share alert preferences. Once configured, contact groups can be assigned to rulesets and ruleset groups.  

#### Event

A term that refers to what occurs when a threshold is breached. An event may or may not generate an alert.

#### Heatmap

A graphical visualization that depicts histogram distributions over time, enabling the visualization of trends. Heatmaps include a time scale on the x-axis and bins along the y-axis as well as a color or opacity scale to indicate the number of occurrences within a given bin.    

#### Histogram

A graphical representation whereby data points are placed into various ranges known as buckets or bins. In a typical histogram, bins are arranged along the x-axis, while the number of occurrences within that bin are represented on the y-axis.  

#### Host

A device or target (computer, server, application, etc.) from which metrics are collected by Circonus. Hosts are identified either by their IP address (IPv4 or IPv6) or by their Fully-Qualified Domain Name (FQDN). 

#### Integrations

Ways to connect Circonus to other systems

#### IRONdb

Circonus' scalable, efficient, and fault-tolerant time series database. 

#### Maintenance

A scheduled maintenance window for an account, check bundle, ruleset, or host. During maintenance windows, alerts are suppressed.

#### Metric

Each data stream produced by a check. For example, round-trip latency, and all the values measured to produce that stream of data, is one metric. CPU 
Utilization is another.

#### Metrics Explorer

A tool within Circonus that lets customers construct queries to find and visualize metrics they are collecting.

#### Primary Navigation

The main menu within Circonus, is located on the left side of the app within desktop view. 

#### Ruleset

A collection of rules applied to a given metric that generates alerts when violated. 

#### Ruleset Group

A group of rulesets associated by expressions or formulas. Ruleset groups enable you to work with farms of servers or any rulesets that need to be related.  

#### Severity

The level of seriousness assigned to a rule within a ruleset. Severity can range from 1 to 5 with 1 being the highest severity and 5 being the lowest severity.

#### Snowth

This is Circonus's data storage system, a distributed time-series storage, and analytics system.

#### Stream Tag

Metadata is composed of a category and value affixed to a metric name which is used to help identify and organize the metric. 

#### User Menu

The list of actions and resources within a Circonus account which are available to a specific user. Examples include User Profile and Preferences. The user menu is located in the upper right corner of the Circonus app within the desktop mode.

#### Widget

A visualization type that can be added to a droppable area within a custom dashboard section. Examples include metrics trends, single metric, heatmap, list, etc. 
