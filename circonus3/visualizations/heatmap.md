---
title: Heatmap Visualizations
sidebar_position: 8
---

# Working with Heatmaps

![Heatmap Visualizations](../img/visualizations-heatmap.png)

A heat map is a graphical representation of data where the individual values contained in a matrix are represented as colors. The color for each matrix position is determined by the _metrics_ aggregation.

### Metrics

The following aggregations are available for this chart:

- [Count](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Average](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Sum](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Min](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Median](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Max](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Unique Count](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Standard Deviation](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Top Hit](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Percentiles](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)
- [Percentile Rank](/circonus3/visualizations/aggregations/metric-agg/#available-metric-aggregations)

For an explanation of all available aggreggations see: [Metric Aggregations](http://localhost:1313/circonus3/visualizations/aggregations/metric-agg/).

### Parent Pipeline Aggregations:

For each of the parent pipeline aggregations, you have to define the metric for which the aggregation is calculated. That could be one of your existing metrics or a new one.

You can also nest aggregations, for example, to produce 3rd derivative.

Parent pipeline aggregations available in this visualization include:

- [**Derivative**](/circonus3/visualizations/aggregations/pipeline-agg/)
- [**Cumulative Sum**](/circonus3/visualizations/aggregations/pipeline-agg/)
- [**Moving Average**](/circonus3/visualizations/aggregations/pipeline-agg/)
- [**Serial Diff**](/circonus3/visualizations/aggregations/pipeline-agg/)

### Sibling Pipeline Aggregations:

Just like with parent pipeline aggregations, you need to provide a metric for which to calculate the sibling aggregation. On top of that you also need to provide a bucket aggregation which will define the buckets on which the sibling aggregation will run.

- [**Average Bucket**](/circonus3/visualizations/aggregations/pipeline-agg/)
- [**Sum Bucket**](/circonus3/visualizations/aggregations/pipeline-agg/)
- [**Min Bucket**](/circonus3/visualizations/aggregations/pipeline-agg/)
- [**Max Bucket**](/circonus3/visualizations/aggregations/pipeline-agg/)

You can add an aggregation by clicking the **+ Add Metrics** button.

Enter a string in the **Custom Label** field to change the display label.

The _buckets_ aggregations determine what information is being retrieved from your data set.

Before you choose a buckets aggregation, specify if you are defining buckets for X or Y axis within a single chart or splitting into multiple charts. A multiple chart split must run before any other aggregations. When you split a chart, you can change if the splits are displayed in a row or a column by clicking the **Rows | Columns** selector.

This chart’s X and Y axes supports the following aggregations.

- [Date Histogram](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [Date Range](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [Filters](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [Histogram](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [IPv4 Range](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [Range](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [Significant Terms](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)
- [Terms](/circonus3/visualizations/aggregations/pipeline-agg/#sibling-pipeline-aggregations)

Enter a string in the **Custom Label** field to change the display label.

You can click the Advanced link to display more customization options for your metrics or bucket aggregation:

- **JSON Input** is a text field where you can add specific JSON-formatted properties to merge with the aggregation definition, as in the following example:

`{ "script" : "doc['grade'].value * 1.2" }`
The availability of these options varies depending on the aggregation you choose.

## Options

### Basic settings

Select the **Options** tab to change the following aspects of the chart:

- **Legend Position** allows you to select where to display the legend (top, left, right, bottom).

- Check **Show tooltips** to enable the display of tooltips.

- Check **Highlight** to enable highlighting of elements with same label.

### Heatmap setting

- **Color schema** alows you to select an existing color schema or define your own custom colors in the legend. The predefined available color ranges include:

  - Green to Red
  - Yellow to Red
  - Blues
  - Greys
  - Reds

- **Reverse color schema** reverses the color schema.

- **Color scale** allows you to switch between _Linear_, _Log_ and _Square root_ scales for color scale.

- **Scale to data bounds** allows you to change the default upper (max) and lower (zero) bounds to match the values returned in the data.

- **Percentage Mode** will show legend values as percentages.

- **Number of Colors** specifies the number of color buckets to create. Minimum is 2 and maximum is 10.

- **Custom Range** allows you to define custom ranges for your color buckets. For each of the color buckets, you need to specify the minimum value (inclusive) and the maximum value (exclusive) of a range.

### Labels

- **Show Label** enables showing labels with cell values in each cell.

- **Rotate** allows rotating the cell value label by 90 degrees.

- **Overwrite automatic color** allows you to override the automatic label coloring by setting a specific color.

- **Color** is enabled if **Overwrite automatic color** is selected. Here, you can select from a color picker or specify the value in RGB hex codes.

## Related links

- [Circonus Dashboards](/circonus3/dashboards/introduction/)
- [Getting Started with Circonus](/circonus3/getting-started/)
