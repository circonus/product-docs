---
title: Introduction
sidebar_position: 1
---

# Aggregations

Circonus aggregations let you tap into our powerful analytics engine to analyze your data and extract statistics from it.

The use cases for aggregations vary from analyzing data in real-time to take some action to visualizing data within a dashboard.

Circonus can perform aggregations on massive datasets in milliseconds. Compared to queries, aggregations consume more CPU cycles and memory.

## Aggregations on text fields

By default, Circonus doesn't support aggregations on a text field. Because text fields are tokenized, an aggregation on a text field has to reverse the tokenization process back to its original string and then formulate an aggregation based on that. This kind of an operation consumes significant memory and degrades cluster performance.

While you can enable aggregations on text fields by setting the `fielddata` parameter to `true` in the mapping, the aggregations are still based on the tokenized words and not on the raw text.

We recommend keeping a raw version of the text field as a `keyword` field that you can aggregate on.

In this case, you can perform aggregations on the `title.raw` field, instead of on the `title` field:

```json
PUT movies
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "fielddata": true,
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      }
    }
  }
}
```

## General aggregation structure

The structure of an aggregation query is as follows:

```json
GET _search
{
  "size": 0,
  "aggs": {
    "NAME": {
      "AGG_TYPE": {}
    }
  }
}
```

If you’re only interested in the aggregation result and not in the results of the query, set `size` to 0.

In the `aggs` property (you can use `aggregations` if you want), you can define any number of aggregations. Each aggregation is defined by its name and one of the types of aggregations that Circonus supports.

The name of the aggregation helps you to distinguish between different aggregations in the response. The `AGG_TYPE` property is where you specify the type of aggregation.

## Sample aggregation

This section uses sample eCommerce and web log data. To add the sample data, log in to Circonus, navigate to **Home** within the main menu, and then choose **Try our sample data**. For **Sample eCommerce orders** and **Sample web logs**, choose **Add data**.

**avg**

To find the average value of the `taxful_total_price` field:

```json
GET opensearch_dashboards_sample_data_ecommerce/_search
{
  "size": 0,
  "aggs": {
    "avg_taxful_total_price": {
      "avg": {
        "field": "taxful_total_price"
      }
    }
  }
}
```

**Sample response**

```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4675,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "avg_taxful_total_price" : {
      "value" : 75.05542864304813
    }
  }
}
```

The aggregation block in the response shows the average value for the `taxful_total_price` field.

## Types of aggregations

There are three main types of aggregations:

- [**Metric aggregations**](/circonus3/visualizations/aggregations/metric-agg/) - Calculate metrics such as `sum`, `min`, `max`, and `avg` on numeric fields.
- [**Bucket aggregations**](/circonus3/visualizations/aggregations/bucket-agg/) - Sort query results into groups based on some criteria.
- [**Pipeline aggregations**](/circonus3/visualizations/aggregations/pipeline-agg/) - Pipe the output of one aggregation as an input to another.

## Nested aggregations

Aggregations within aggregations are called nested or subaggregations.

Metric aggregations produce simple results and can't contain nested aggregations.

Bucket aggregations produce buckets of documents that you can nest in other aggregations. You can perform complex analysis on your data by nesting metric and bucket aggregations within bucket aggregations.

**General nested aggregation syntax**

```json
{
  "aggs": {
    "name": {
      "type": {
        "data"
      },
      "aggs": {
        "nested": {
          "type": {
            "data"
          }
        }
      }
    }
  }
}
```

The inner `aggs` keyword begins a new nested aggregation. The syntax of the parent aggregation and the nested aggregation is the same. Nested aggregations run in the context of the preceding parent aggregations.

You can also pair your aggregations with search queries to narrow down things you’re trying to analyze before aggregating. If you don't add a query, Circonus implicitly uses the `match_all` query.