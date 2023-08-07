---
title: Dashboards Query Language (DQL)
weight: 100
---

# Dashboards Query Language (DQL)

You can use the [Dashboards Query Language (DQL)](https://opensearch.org/docs/1.2/dashboards/dql/) in Circonus to search for data and visualizations.

For example, to see all visualizations on a dashboard with visits to a host based in the US, you would enter `geo.dest:US` into the search field.

Just like [Query DSL (Domain Specific Language)](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html), DQL has a handful of query types, so use whichever best fits your use case.

This section uses the **Sample Web Traffic Log** data. To add this sample data in Circonus, choose **Home**, **Add sample data**, and then **Add data**.

## Terms query

The most basic query is to just specify the term you're searching for:

```
host:www.example.com
```

To access an object's nested field, list the complete path to the field separated by periods. For example, to retrieve the `lat` field in the `coordinates` object:

```
coordinates.lat:43.7102
```

DQL also supports leading and trailing wildcards, so you can search for any terms that match your pattern.

```
host.keyword:*.example.com/*
```

To check if a field exists or has any data, use a wildcard to see if any results will be returned:

```
host.keyword:*
```

## Boolean query

To mix and match or combine multiple queries for more refined results, you can use the boolean operators `and`, `or`, and `not`. DQL is not case sensitive, so `AND` and `and` are the same.

```
host.keyword:www.example.com and response.keyword:200
```

The following example demonstrates how to use multiple operators in one query.

```
geo.dest:US or response.keyword:200 and host.keyword:www.example.com
```

Remember that boolean operators follow the logical precedence order of `not`, `and`, and `or`, so if you have an expression like the previous example, `response.keyword:200 and host.keyword:www.example.com` gets evaluated first, and then compared with `geo.dest:US`.

To avoid confusion, we recommend using parentheses to dictate the order you want to evaluate in. If you want to evaluate `geo.dest:US or response.keyword:200` first, your expression becomes:

```
(geo.dest:US or response.keyword:200) and host.keyword:www.example.com
```

## Date and range queries

DQL also supports numeric inequalities.

```
bytes >= 15 and memory < 15
```

Similarly, you can use the same method to find a date before or after your query. `>` indicates a search for a date after your specified date, and `<` returns dates before.

```
@timestamp > "2020-12-14T09:35:33"
```

## Nested field query

If you have a document with nested fields, you have to specify which parts of the document you want to retrieve.

Suppose that you have the following document:

``` shell
{
  "superheroes":[
    {
      "hero-name": "Superman",
      "real-identity": "Clark Kent",
      "age": 28
    },
    {
      "hero-name": "Batman",
      "real-identity": "Bruce Wayne",
      "age": 26
    },
    {
      "hero-name": "Flash",
      "real-identity": "Barry Allen",
      "age": 28
    },
    {
      "hero-name": "Robin",
      "real-identity": "Dick Grayson",
      "age": 15
    }
  ]
}
```

The following example demonstrates how to use DQL to retrieve a specific field.

```
superheroes: {hero-name: Superman}
```

If you want to retrieve multiple objects from your document, just specify all of the fields you want to retrieve.

```
superheroes: {hero-name: Superman} and superheroes: {hero-name: Batman}
```

The previous boolean and range queries still work, so you can submit a more refined query.

```
superheroes: {hero-name: Superman and age < 50}
```

If your document has an object nested within another object, you can still retrieve data by specifying all of the levels.

```
justice-league.superheroes: {hero-name:Superman}
```