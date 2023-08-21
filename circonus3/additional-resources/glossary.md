---
title: Glossary
sidebar_position: 9
---

# Glossary

#### Acknowledgment ("Ack")

Recognition of an alert accompanied by a specified duration during which notifications and escalations will not be sent. Acknowledgments let other team members know that you are working to resolve the issue associated with the alert. Often abbreviated as "ack".

#### Action Group

A set of permissions. For example, the predefined `SEARCH` action group authorizes roles to use the `_search` and `_msearch` APIs.

#### Agent

Circonus programs that enable the continuous and autonomous collection of metrics.

#### Alert

An event that occurs when conditions for a rule are met. Alerts will always have a severity level. They are communicated through notifications associated with the rule that is triggered.

#### Annotation

A manual identification made by a Circonus user within a visualization. For example, you might annotate a server being down for maintenance. The same condition might have also caused an event and possibly an alert to occur.

#### Bundle

This is a collection of checks that have the same configuration and target but collect from different brokers. A bundle can have one check or many checks in it, and changing the bundle affects all the associated checks.

#### Chart

A chart (sometimes known as a graph) is a graphical representation used in data visualization.

#### Check

An assessment of a service by Circonus which results in the collection of telemetry. Checks are created through the installation of an agent or broker.

#### Circonus Analytics Query Language (CAQL)

The Circonus Analytic Query Language enables users to formulate queries for graphing complex transformations of collected data and allows fine-tuning of previously hidden parameters. Often referenced via the acronym “CAQL,” which we affectionately pronounce as “cackle.” [See CAQL Documentation](/caql/).

#### Circonus Unified Agent (CUA)

The Circonus Unified Agent is our open-source agent to collect metrics through various input plugins, allowing Circonus customers to monitor systems, services, and 3rd party APIs. Often referenced via the acronym “CUA,” which we affectionately pronounce as “see-you-ey.” [See CUA Documentation](/circonus3/integrations/agents/circonus-unified-agent/introduction/).

#### Command Bar

The series of main links or actions for a given page within Circonus. This element is typically located in the upper right, above the page content, and may include options such as **Save**, **Share**, **Edit**, etc.

#### Contact Group

A collection of one or more email addresses or webhook URLs that can be selected for notification. Contact groups are assigned to rules along with an associated severity. [See Contact Groups Documentation](/circonus3/alerting/contact-groups/).

#### Dashboards Query Language (DQL)

A syntax that enables users to search for data and visualizations within Circonus. Often referenced by the acronym "DQL". [See DQL Documentation](/circonus3/appendix/dql).

#### Distributed Tracing

Distributed Tracing more commonly known as tracing, records the path and performance of
taken by requests (made by an application or end-user) as they propagate through or [span](/circonus3/getting-started/glossary/#span)
multi-service architectures, like microservice and serverless
applications.

#### Event

A term that refers to what occurs when a threshold is breached. An event may or may not generate an alert.

<!--
#### Heatmap

A graphical visualization that depicts histogram distributions over time, enabling the visualization of trends. Heatmaps include a time scale on the x-axis and bins along the y-axis as well as a color or opacity scale to indicate the number of occurrences within a given bin.

#### Histogram

A graphical representation whereby data points are placed into various ranges known as buckets or bins. In a typical histogram, bins are arranged along the x-axis, while the number of occurrences within that bin are represented on the y-axis.
-->

#### Host

A device or target (computer, server, application, etc.) from which metrics are collected by Circonus. Hosts are identified either by their IP address (IPv4 or IPv6) or by their Fully-Qualified Domain Name (FQDN).

#### Integrations

Ways to connect Circonus to other systems.

#### IRONdb

Circonus' scalable, efficient, and fault-tolerant time series database. [See IRONdb Documentation](/irondb/).

#### Log

A record of the operating system or application events. It's normally stored as a log or JSON file in a semi-structured format.

#### Maintenance

A scheduled maintenance window for an account, check bundle, ruleset, or host. During maintenance windows, alerts are suppressed.

#### Metric

Metrics are numeric data about your infrastructure or application. Each data stream is produced by a check.
Examples include system error rate, CPU utilization, request rate for a given service, round-trip latency, and CPU Utilization.

#### Main Menu

The principal navigation links within Circonus, are located on the left side of the app within the desktop view when the menu is either docked or expanded.

#### Notification

A message is sent to a specified contact group when rule conditions are met and an alert is triggered.

#### Permission

An individual action, such as creating an index (e.g. `indices:admin/create`). For a complete list, see [Permissions](/circonus3/management/access-control/permissions/).

#### Role

Security roles define a logical group or permission scope action, that defines both rights to functional capabilities or data. In Circonus we support three levels of roles admin, normal (general user with read/write) and read-only.

#### Role Mapping

Users assume roles after they successfully authenticate. Role mappings, well, map roles to users (or backend roles). For example, a mapping of `circonus_user` (role) to `jdoe` (user) means that John Doe gains all the permissions of `circonus_user` after authenticating.

#### Rule

Conditions specified by the user which, if met, trigger an alert. One or more notifications can be added to a rule.

#### Ruleset

A collection of rules applied to a given metric that generates alerts when violated.

#### Severity

A level between 1 and 5 specifies the relative importance and priority of an alert. Level 1 is the most severe, while level 5 is the least severe.

#### Span

A Span represents a unit of work or operation. It tracks specific operations
that a request makes, painting a picture of what happened during the time in
which that operation was executed. Multiple spans are combined to form a [distributed trace](/circonus3/getting-started/glossary/#distributed-tracing).

#### Stream Tag

Metadata is composed of a category and value affixed to a metric name which is used to help identify and organize the metric.

#### Service Level Indicator (SLI)

An SLI is a measurement of a service's behavior. A good SLI measures your service from the perspective of your users. An example of SLI can be the speed at which a web page loads.

#### Service Level Objective (SLO)

An SLO is how reliability is communicated to an organization/other teams. This is accomplished by attaching one or more SLIs to business value.

#### Trace

Detailed records of the actions performed by the application and also of the messages about events that occurred during the operation of an application.

#### User

An individual using Circonus. A user has credentials (e.g. a username and password), zero or more backend roles, and zero or more custom attributes.

#### User Menu

The list of actions and resources within a Circonus account that are available to a specific user. Examples include User Profiles and Preferences. The user menu is located in the upper right corner of the Circonus app within the desktop mode.

#### Widget

A visualization type that can be added to a droppable area within a custom dashboard section. Examples include metrics trends, single metrics, heatmaps, lists, etc.
