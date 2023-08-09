---
title: PromQL Support
sidebar_position: 5
---

# PromQL Support

Circonus' CAQL engine supports the PromQL query language through use of the [#lang directive](/reference/#directives). Anywhere that supports a CAQL query can utilize this to run PromQL queries instead. The engine will translate the PromQL into CAQL, and execute it.

```
#lang="promql" http_requests_total{job="apiserver", handler="/api/comments"}
```

## Supported Functions

Below you'll find the PromQL functions that we directly support and their CAQL equivalents. CAQL find is used to fetch the data in most cases (any exceptions are marked below). To emulate the staleness behavior of PromQL ("lookback delta"), the data from the fetch/find is piped through the CAQL function fill:forward with the 5m default (which can be overridden using the CAQL #lookback_window directive).

| PromQL Function                                                                                                                                           | CAQL Equivalent                                                         | Notes            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------- |
| [`arithmetic operators (+-*/%^)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#arithmetic-binary-operators)                           | `op:add,sub,prod,div2,mod,exp`                                          |
| [`@ modifier`](https://prometheus.io/docs/prometheus/latest/querying/basics/#modifier)                                                                    | `find(..., start_time_override=<@_time>)`                               |
| [`# comment`](https://prometheus.io/docs/prometheus/latest/querying/basics/#comments)                                                                     | `(treated as whitespace, but beware of conflicts with CAQL directives)` |
| [`vector to scalar filter comparison (==,!=,>,<,>=,<=)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#comparison-binary-operators)    | `filter:values:eq,not:eq,gt,lt,geq,leq([scalar])`                       |
| [`vector to scalar bool comparison (==,!=,>,<,>=,<= bool)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#comparison-binary-operators) | `op:eq,not(eq),gt,lt,geq,leq([scalar])`                                 |
| [`abs(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#abs)                                                             | `math:abs`                                                              |
| [`absent(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#absent)                                                       | `stats:absent`                                                          |
| [`absent_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#absent_over_time)                                     | `rolling:absent`                                                        |
| [`acos, acosh(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                 | `math:acos,acosh`                                                       |
| [`asin, asinh(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                 | `math:asin,asinh`                                                       |
| [`atan, atanh(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                 | `math:atan,atanh`                                                       |
| [`avg(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                           | `stats:mean`                                                            |
| [`avg by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                              | `group_by:mean`                                                         |
| [`avg_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                   | `rolling:mean`                                                          |
| [`bottomk(n, instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                    | `opt:fetch(numeric, average, "bottomk, n")`                             |
| [`ceil(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#ceil)                                                           | `math:ceil`                                                             |
| [`changes(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#changes)                                                       | `rolling:changes`                                                       |
| [`clamp, clamp_max, clamp_min(instant_vector, [min, max])`](https://prometheus.io/docs/prometheus/latest/querying/functions/#clamp)                       | `stats:clamp`                                                           |
| [`cos, cosh(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                   | `math:cos,cosh`                                                         |
| [`count(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                         | `stats:count`                                                           |
| [`count by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                            | `group_by:count`                                                        |
| [`count_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                 | `rolling:count`                                                         |
| [`day_of_month(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#day_of_month)                                           | `time:tz("UTC", "monthday")`                                            |
| [`day_of_week(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#day_of_week)                                             | `time:tz("UTC", "weekday")`                                             |
| [`day_of_year(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#day_of_year)                                             | `time:tz("UTC", "yearday")`                                             |
| [`deg(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                         | `math:deg`                                                              |
| [`delta(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#delta)                                                           | `rolling:delta`                                                         |
| [`deriv(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#deriv)                                                           | `find:deriv \| rolling:mean`                                            |
| [`exp(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#exp)                                                             | `math:exp`                                                              |
| [`floor(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#floor)                                                         | `math:floor`                                                            |
| [`group(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                         | `stats:alwaysone`                                                       |
| [`group by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                            | `group_by:alwaysone`                                                    |
| [`histogram_count(histogram_instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_count-and-histogram_sum)         | `find:histogram \| histogram_count`                                     |
| [`histogram_fraction(lower, upper, histogram_instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_fraction)       | `find:histogram \| histogram:ratio_between`                             |
| [`histogram_quantile(n, histogram_instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile)                  | `find:histogram \| histogram:percentile`                                |
| [`histogram_sum(histogram_instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_count-and-histogram_sum)           | `find:histogram \| histogram:sum`                                       |
| [`hour(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#hour)                                                           | `time:tz("UTC", "hour")`                                                |
| [`idelta(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#idelta)                                                         | `rolling:delta`                                                         | aliased to delta |
| [`increase(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#increase)                                                     | `rolling:increase`                                                      |
| [`irate(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#irate)                                                           | `find:counter \| rolling:mean `                                         | aliased to rate  |
| [`last_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                  | `rolling:last`                                                          |
| [`ln(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#ln)                                                               | `math:ln`                                                               |
| [`log2(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#log2)                                                           | `math:log2`                                                             |
| [`log10(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#log10)                                                         | `math:log10`                                                            |
| [`max(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                           | `stats:max`                                                             |
| [`max by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                              | `group_by:max`                                                          |
| [`max_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                   | `rolling:max`                                                           |
| [`min(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                           | `stats:min`                                                             |
| [`min by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                              | `group_by:min`                                                          |
| [`min_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                   | `rolling:min`                                                           |
| [`minute(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#minute)                                                       | `time:tz("UTC", "minute")`                                              |
| [`month(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#month)                                                         | `time:tz("UTC", "month")`                                               |
| [`offset`](https://prometheus.io/docs/prometheus/latest/querying/basics/#offset-modifier)                                                                 | `find(..., start_time_offset=<offset_duration>)`                        |
| [`pi`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                                          | `math:pi`                                                               |
| [`present_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                               | `rolling:present`                                                       |
| [`quantile(n, instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                   | `stats:percentile`                                                      |
| [`quantile_over_time(n, range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                           | `rolling:percentile                  `                                  |
| [`rad(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                         | `math:rad`                                                              |
| [`rate(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#rate)                                                             | `find:counter \| rolling:mean`                                          |
| [`resets(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#resets)                                                         | `rolling:resets`                                                        |
| [`round(instant_vector, to_nearest)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#round)                                             | `math:round`                                                            |
| [`sgn(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#sgn)                                                             | `math:sgn`                                                              |
| [`sin, sinh(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                   | `math:sin,sinh`                                                         |
| [`sqrt(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#sqrt)                                                           | `math:sqrt`                                                             |
| [`stddev(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                        | `stats:stddev`                                                          |
| [`stddev by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                           | `group_by:stddev`                                                       |
| [`stddev_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                | `rolling:stddev`                                                        |
| [`stdvar(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                        | `stats:popvar`                                                          |
| [`stdvar by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                           | `group_by:popvar`                                                       |
| [`stdvar_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                | `rolling:popvar`                                                        |
| [`sum(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                           | `stats:sum`                                                             |
| [`sum by (labels) (instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                              | `group_by:sum`                                                          |
| [`sum_over_time(range_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#aggregation_over_time)                                   | `rolling:sum`                                                           |
| [`tan, tanh(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#trigonometric-functions)                                   | `math:tan,tanh`                                                         |
| [`time`](https://prometheus.io/docs/prometheus/latest/querying/functions/#time)                                                                           | `time:epoch`                                                            |
| [`timestamp(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#timestamp)                                                 | `(directly supported)`                                                  |
| [`topk(n, instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                       | `opt:fetch(numeric, average, "topk, n")`                                |
| [`year(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#year)                                                           | `time:tz("UTC", "year")`                                                |

## Functions Not Yet Supported

The following PromQL functions are not currently available in CAQL but may be implemented in the future.

| PromQL Function                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`vector to vector comparison (==,!=,>,<,>=,<=)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#comparison-binary-operators)                  |
| [`and`](https://prometheus.io/docs/prometheus/latest/querying/operators/#logical-set-binary-operators)                                                           |
| [`atan2`](https://prometheus.io/docs/prometheus/latest/querying/operators/#trigonometric-binary-operators)                                                       |
| [`count_values(value_label, instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                            |
| [`days_in_month(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#days_in_month)                                                |
| [`group_left`](https://prometheus.io/docs/prometheus/latest/querying/operators/#group-modifiers)                                                                 |
| [`group_right`](https://prometheus.io/docs/prometheus/latest/querying/operators/#group-modifiers)                                                                |
| [`holt_winters(range_vector, smoothing_factor, trend_factor)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#holt_winters)                    |
| [`ignoring`](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching-keywords)                                                          |
| [`label_join(instant_vector, dst_label, separator, src_label_1, src_label_2, ...)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#label_join) |
| [`label_replace(instant_vector, dst_label, replacement, src_label, regex)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#label_replace)      |
| [`on`](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching-keywords)                                                                |
| [`or`](https://prometheus.io/docs/prometheus/latest/querying/operators/#logical-set-binary-operators)                                                            |
| [`predict_linear(range_vector, t)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#predict_linear)                                             |
| [`quantile by (labels) (n, instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                             |
| [`scalar(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#scalar)                                                              |
| [`sort(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#sort)                                                                  |
| [`sort_desc(instant_vector)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#sort_desc)                                                        |
| [`unless`](https://prometheus.io/docs/prometheus/latest/querying/operators/#logical-set-binary-operators)                                                        |
| [`vector(scalar)`](https://prometheus.io/docs/prometheus/latest/querying/functions/#vector)                                                                      |
| [`without`](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)                                                              |
