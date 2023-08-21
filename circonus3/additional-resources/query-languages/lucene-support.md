---
title: Lucene Support
sidebar_position: 2
---

# Lucene Query Support

Circonus supports the use of Lucene Queries across dashboards and within the Logs Explorer.

## Lucene Query Syntax

Using Lucene Query Syntax is recommended for advanced users who already have experience writing queries in Lucene. For all other users, it's recommended that you use [Dashboards Query Language](/circonus3/additional-resources/query-languages/dql).

The following are some tips that can help get you started with Lucene query syntax.

- To perform a free text search, simply enter a text string. For example, if you’re searching web server logs for all users of the Safari browser, you could enter _safari_ to search all fields for mentions of _safari_.

- To search for a value in a specific field, prefix the value with the name of the field. For example, you could enter `status:200` to find all of the entries that contain the value `200` in the status field.

- To search for a range of values, you can use the bracketed range syntax, `[START_VALUE TO END_VALUE]`. For example, to find entries that have 4xx status codes, you could enter `status:[400 TO 499]`.

- To specify more complex search criteria, you can use the Boolean operators `AND`, `OR`, and `NOT`. For example, to find entries that have 4xx status codes and have an extension of `php` or `html`, you could enter `status:[400 TO 499] AND (extension:php OR extension:html)`.
