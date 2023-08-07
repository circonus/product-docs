---
title: Amazon CloudWatch
description: ""
sidebar_custom_props:
  image: amazon-cloudwatch.svg
---

# Amazon CloudWatch

## Overview

The CloudWatch Check monitors your Amazon Web Services (AWS) cloud infrastructure using CloudWatch, providing metrics related to your AWS resources and the AWS applications you run on AWS.

From the CloudWatch Check you can set alerts within Circonus to send notifications allowing you to make changes to the resources within AWS. For example, you can monitor the CPU usage and disk reads and writes of your Amazon Elastic Compute Cloud (Amazon EC2) instances and then use this data to determine whether you should launch additional instances to handle increased load. You can also use this data to stop under-used instances. With the CloudWatch Check, you gain system-wide visibility into resource utilization, application performance, and operational health.

Circonus takes the AWS Region, API Key, and API Secret, then polls the endpoint AWS for a list of all available Namespaces, Metrics, and Dimensions that are specific to the user (Region, API Key, and API Secret combination). Only those returned are displayed in the fields. The names that are displayed under each Dimension type (for example: Volume for EBS) are all instances running this Dimension type that have detailed monitoring enabled.
Metrics

## Advanced

### CloudWatch Namespaces

Within AWS you can create CloudWatch namespaces. Namespaces are containers for metrics. Metrics in different namespaces are isolated from each other, so that metrics from different applications are not mistakenly aggregated into the same statistics.

Namespace names are strings you define when you create a metric. The names must be valid XML characters, typically containing alphanumeric characters, plus the characters period (.), hyphen (-), underscore (\_), slash (/), hash or pound (#), and colon (:). AWS namespaces all follow the naming convention "`AWS/<service>`", for example "`AWS/EC2`" and "`AWS/ELB`".

There is no default namespace; you must specify a namespace for each data element you put into CloudWatch.

Selecting a specific namespace will reduce the amount of time and API queries needed to get a list of available metrics.

### CloudWatch Metrics

A metric represents a time-ordered set of data points and you retrieve statistics about those data points as an ordered set of time- series data. Think of a metric as a variable to monitor, and the data points represent the values of that variable over time. For example, the CPU usage of a particular Amazon EC2 instance is one metric, and the latency of an Elastic Load Balancing load balancer is another. The data points themselves can come from any application or business activity from which you collect data. Metrics are uniquely defined by a name, a namespace, and one or more dimensions.

Depending on the Namespace selected, the Metrics displayed may be different when creating a new CloudWatch check.

Selecting a specific metric name will reduce the amount of time and API queries needed to get a list of available metrics. To get all metrics, either enter "All" in to the "Metric Name to List" field, or leave the field blank.

### CloudWatch Dimensions

A dimension is a name/value pair that helps you to uniquely identify a CloudWatch metric. Every metric has specific characteristics that describe it, and you can think of dimensions as categories for those characteristics. Dimensions help you design a structure for your statistics plan. Because dimensions are part of the unique identifier for a metric, whenever you add a unique name/value pair to one of your metrics, you are creating a new metric.

Depending on the Namespace and metric(s) selected, the Dimensions displayed may be different when creating a new CloudWatch check.

Circonus will create one check for each unique combination of dimensions across categories. For example, if you select five dimensions in two different categories, Circonus will create six checks. Likewise, when editing a CloudWatch check, you will be limited to one dimension per category. If no dimensions are checked, the query will be made with no associated dimension data.
