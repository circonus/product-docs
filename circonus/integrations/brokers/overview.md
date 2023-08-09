---
title: Overview
sidebar_position: 1
---

# Brokers Overview

Circonus Brokers are intermediaries to execute checks and forward data to the rest of the system. They come in two flavors. Circonus Public Brokers (CPBs) are spread around the world and Circonus Enterprise Brokers (CEBs) are deployed within your data centers, offices, clouds, and other private networks. When
Circonus performs a check, it does so from a broker. It is critical that the system from which data is being pulled or pushed be visible to the broker running the check. While it might be appropriate to use a Circonus Public Broker to measure latency to your public website or ICMP availability to a public endpoint within your datacenter, it may be unwise to expose your infrastructure’s private components to the Circonus Public Brokers.

Circonus Enterprise Brokers are isolated to your account. Only accounts approved by you can provision checks on your CEBs. These brokers run inside your data center and should be able to access the systems from which you intend to collect telemetry.

Circonus brokers have the ability to both actively collect and passively receive telemetry data from systems.

## Active Collection (Polling)

Active collection (also known as polling) is when the broker plays an active role in collecting data from a system. This usually is as simple as the broker asking a system a question and then waiting for the answer(s).

Circonus's architecture is specifically designed to overcome scaling challenges often present in polling-based monitoring systems. Circonus can scale to hundreds of thousands of polling checks without issue.

## Passive Collection

The opposite of active collection is when the broker plays a passive role in data collection. In this scenario, the broker collects telemetry data from the system being monitored as it is emitted.

## Choosing Active vs. Passive

Circonus's design eliminates the scaling challenges associated with active data collection, allowing users to choose the method (active or passive) that provides the most value from the data in question.

The decision usually depends on data velocity and observability. If the data you are interested in is occurring quickly and persistently (a high maintained velocity), then it is often the case that you want to assess the system by observing actual work. This would mean we should use a passive monitoring setup to collect such data. However, not all systems expose this data in a way that can be observed passively, so you would be limited to systems that do (rather than protocols such as statsd, collectd, or HTTPtrap).

For example, say you would like to monitor a MySQL database server and must decide whether to use Active or Passive collection. Ideally, you would like to know how many transactions per second are ongoing. The way tools typically acquire this information is to (1) contact the server and ask how many total transactions have been performed, (2) wait, (3) and then contact the server to ask again. By subtracting the second result from the first and dividing the total by the time elapsed between queries we can determine how many queries per second were executed during that time period. This is an active collection method.

Passive collection of the same database requires the observation of every query in the system and the submission of its latency. This is possible within Circonus for some databases. For example, the PostgreSQL database has a plugin that will emit telemetry data regarding every query via the statsd protocol. Circonus can be configured to receive this statsd data and provide rich and wholly-representative information about query latencies over time using histograms.

**Note:** Some systems will deploy an agent on the database server that actively checks the instance at regular intervals and then passively submits the data to a monitoring system. This hybrid approach (while workable) is inappropriate for Circonus. It is intended to avoid scalability problems that are simply not present in Circonus and it removes the value of real-time, on-demand data collection.

## System Requirements

- RHEL/CentOS 7 (7.4-7.9), Ubuntu 20.04
- 2 CPU cores
- 4 Gbytes of RAM
- 40 Gbytes of disk storage
