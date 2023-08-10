---
title: JSON:Pull
sidebar_custom_props:
  image: json.svg
logo_light: /img/library/json.svg
description: ""
implementation: broker
module: json
tags:
  - JSON
---

# JSON:Pull

## Overview

The JSON: Pull Check retrieves metrics formatted as JSON. Circonus will pull the metrics from a specified HTTP endpoint.

JavaScript Object Notation (JSON) is a lightweight format for storing and transporting data. JSON is often used when data is sent from a server to a web page, and is a convenient way to format metrics for Circonus.

## Configuration

Gather metrics formatted in JSON. Here is an example of the JSON format:

```
{
  "number": 1.23,
  'bignum_as_string': '281474976710656',
  'test': 'a text string',
  'container': { 'key1': 1234 },
  'array': [  1234,
              'string',
              { 'crazy': 'like a fox' }
           ]
}
```

There is no particular data structure required by Circonus; format your data however you wish and Circonus will parse it accordingly. Circonus would parse the above example into the following metrics (services tells how many metrics resulted from parsing):

| Name             | Type    | Value             |
| ---------------- | ------- | ----------------- |
| array`0          | numeric | 1234              |
| array`1          | text    | "string"          |
| array\`2\`crazy  | text    | "like a fox"      |
| bignum_as_string | text    | "281474976710656" |
| container`key1   | numeric | 1234              |
| number           | numeric | 1.23000000        |
| test             | text    | "a text string"   |
| services         | numeric | 7                 |
