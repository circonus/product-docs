---
title: JMX
sidebar_custom_props:
image: java.svg
description: ""
implementation: broker
module: jmx
tags:
  - Java
  - MBeans
---

# JMX

## Overview

The JMX Check monitors a JMX-enabled service. Circonus queries the JMX Application and pulls all available metrics, including those available as MBeans (such as Tomcat and JBoss).

Java Management Extensions (JMX) is an architecture to manage resources dynamically at runtime. JMX is used mostly in enterprise applications to make the system configurable or to get the state of application at any point of time.

## Configuration

To set up a JMX check, select a host and destination port between 0 and 65535. Advanced Configuration allows you to set server authorization information and specify MBean domains.
