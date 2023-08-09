---
title: Graphite to CAQL Conversion
sidebar_position: 4
---

# Graphite to CAQL Conversion

## Supported Functions

Below you'll find the Graphite functions that we directly support and their CAQL equivalents. 

| Graphite Function | CAQL Equivalent | Notes |
| ------ | ------ | ------ |
| [`absolute(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.absolute) | `math:abs()` | 
| [`add(seriesList, constant)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.add) | `find(...) \| each:add(x)` |
| [`aggregate(seriesList, func, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aggregate) | `find(...) \| stats:<func>('VIEW_PERIOD')` |
| [`aggregateLine(seriesList, func='average', keepStep=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aggregateLine) | `find(...) \| rolling:<func>('VIEW_PERIOD')` |
| [`aggregateWithWildcards(seriesList, func, *positions)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aggregateWithWildcards) | `find(seriesList) \| graphite:removenode(positions) \| group_by:<func>('__name')` | 
| [`alias(seriesList, newName)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.alias) | `find(...) \| label("new_label")` |
| [`aliasByMetric(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aliasByMetric) | `tag:synth \| label` |
| [`aliasByNode(seriesList, *nodes)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aliasByNode) | `find(...) \| graphite:aliasbynode(<NODE NUMBER>)` |
| [`aliasByTags(seriesList, *tags)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aliasByTags) | `find(...) \| graphite:aliasbytags(tag1, tag2...)` |
| [`aliasSub(seriesList, search, replace)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aliasSub) | `find(...) \| graphite:aliasSub('search', 'replace')` |
| [`alpha(seriesList, alpha)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.alpha) | `pass()` | CAQL is not supporting output picture manipulation | 
| [`areaBetween(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.areaBetween) | `pass()` | CAQL is not supporting output picture manipulation | 
| [`asPercent(S)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.asPercent) | `graphite:find(S) \| stats:ratio(of=100)` |  Returns percentage from a total sum or serie S |
| [`asPercent(S, N)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.asPercent) | `graphite:find(S) \| each:mul(100) \| each:div(N)` |  Returns percentage of serie S from number N |
| [`asPercent(S1, S2)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.asPercent) | `op:div2{graphite:find(S1),graphite:find(S2)} \| each:mul(100)` |  Returns percentage of series S1 from series S2. Unfortunately, this translation works only with series but not seriesLists, because CAQL has no determined order of series lists, as Graphite has. |
| [`asPercent(S1, S2, N)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.asPercent) | `op:div2{graphite:find(S1) \| graphite:tagbynode('__gbtag',N),graphite:find(S2) \|graphite:tagbynode('__gbtag',N) \|group_by:sum('__gbtag')}\| each:mul(100)` |  Returns percentage of series S1 from sum of series S2 made by node N (same as [sumSeriesWithWildcards(S2, N)](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sumSeriesWithWildcards)). Unfortunately, this translation works only with series but not seriesLists, because CAQL has no determined order of series lists, as Graphite has. |
| [`asPercent(S1, None, N)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.asPercent) | `graphite:find(S1) \| graphite:tagbynode('__gbtag',N) \| stats:ratio(of=100,partition='__gbtag')` |  Return percentage of series or serieslist S1 from sum of itself by node N. |
| [`averageAbove(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.averageAbove) | `find(...) \| filter:mean:gt(x)` |
| [`averageBelow(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.averageBelow) | `find(...) \| filter:mean:lt(x)` |
| [`averageOutsidePercentile(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.averageOutsidePercentile) | `find(...) \| graphite:averageoutsidepercentile(lower_percentile=n)` | 
| [`averageSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.averageSeries) | `find(...) \| stats:mean` |
| [`averageSeriesWithWildcards(seriesList, *position)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.averageSeriesWithWildcards) | `find(seriesList) \| graphite:removenode(position) \| group_by:mean('__name')` | 
| [`avg(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.averageSeries) | alias for `averageSeries(*seriesLists)` |
| [`changed(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.changed) | `find(seriesList) \| diff() \| math:abs() \| op:gt(0)` |
| [`color(seriesList, theColor)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.color) | `pass()` | CAQL is not supporting output picture manipulation |
| [`consolidateBy(seriesList, consolidationFunc)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.consolidateBy) | `find(...) \| window:<sum\|max\|min\|etc.>([period=VIEW_PERIOD])` |
| [`constantLine(value)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.constantLine) | `time:epoch() \| op:gt(0) \| each:mul(value)` | 
| [`countSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.countSeries) | `\| count()` |
| [`currentAbove(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.currentAbove) | `graphite:find(seriesList) \| filter:latest:gt(n)` |
| [`currentBelow(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.currentBelow) | `graphite:find(seriesList) \| filter:latest:leq(n)` |
| [`cumulative(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.cumulative) | `find(...) \| window:sum('VIEW_PERIOD')` |
| [`dashed(seriesList, dashLength=5)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.dashed) | `pass()` | CAQL is not supporting output picture manipulation |
| [`delay(seriesList, steps)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.delay) | `find(seriesList) \| delay(<steps>M)` | same as timeShift() but supports only datapoints |
| [`derivative(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.derivative) | `find(...) \| diff()` |
| [`diffSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.diffSeries) | `find(...) \| op:sub()` | first argument must be a single metric; if the `find()` gets multiples, then behavior will be wrong |
| [`divideSeries(dividendSeriesList, divisorSeries)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.divideSeries) | `op:div { find(dividendSeriesList), find(divisorSeries) }` |
| [`divideSeriesLists(dividendSeriesList, divisorSeriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.divideSeriesLists) | `op:div { find(dividendSeriesList) \| vector(), find(divisorSeriesList) \| vector()} | vector:unpack()` |
| [`events(*tags)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.events) | `pass()` | we do not support the Graphite events API |
| [`exclude(seriesList, pattern)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.exclude) | `exclude:label` | queries with exclude should be rewritten to not request the things being excluded |
| [`exp(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.exp) | `find(seriesList) \| math:exp()` |
| [`exponentialMovingAverage(seriesList, windowSize)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.exponentialMovingAverage) | `find(seriesList) \| forecasting:ewma(0.5)` | we're ignoring interval and replacing it with some arbitrary alpha value (0.5) |
| [`fallbackSeries(seriesList, fallback)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.fallbackSeries) | `if{graphite:find(seriesList)|count(),graphite:find(seriesList),graphite:find(fallback)}` |
| [`filterSeries(seriesList, func, operator, threshold)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.filterSeries) | `graphite:find('seriesList') \| window:func('VIEW_PERIOD') \| filter:all:OP(threshold)` |
| [`grep(seriesList, pattern)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.grep) |  `find(seriesList) \| filter:label:matches(pattern)` |
| [`group(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.group) | `pass()` |
| [`groupByNode(seriesList, nodeNum, callback='average')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.groupByNode) | `group_by::<agg>(__tag)` |
| [`groupByNodes(seriesList, callback, *nodes)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.groupByNodes) | `group_by::<agg>(__tag)` |
| [`groupByTags(seriesList, callback, *tags)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.groupByTags) | `group_by::<agg>(__tag)` |
| [`highest(seriesList, n=1, func='average')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.highest) | `find(...) \| sort:<func> \| filter:limit(n)` |  func can be only max, min and average |
| [`highestAverage(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.highestAverage) | `\| top(1)` |
| [`highestMax(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.highestMax) | `\| top(1, method="max")` |
| [`hitcount(seriesList, intervalString, alignToInterval=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.hitcount) | `\| window:sum(interval) \| each:mul(interval)` |
| [`holtWintersAberration(seriesList, delta=3, bootstrapInterval='7d', seasonality='1d')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.holtWintersAberration) | `graphite:holtwintersaberration` |
| [`holtWintersConfidenceArea(seriesList, delta=3, bootstrapInterval='7d', seasonality='1d')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.holtWintersConfidenceArea) | `graphite:holtwintersconfidencebands` | Can be translated as `AreaBetween(holtWintersConfidenceBands(...))` but `AreaBetween()` is just `pass()` in CAQL |
| [`holtWintersConfidenceBands(seriesList, delta=3, bootstrapInterval='7d', seasonality='1d')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.holtWintersConfidenceBands) | `graphite:holtwintersconfidencebands` |
| [`holtWintersForecast(seriesList, bootstrapInterval='7d', seasonality='1d')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.holtWintersForecast) | `graphite:holtwintersforecast` |
| [`identity(name)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.identity) | `time:epoch() \| label('name')`
| [`integral(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.integral) | `find(...) \| integrate` |
| [`integralByInterval(seriesList, intervalUnit)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.integralByInterval) | `find(seriesList) \| graphite:integralbyinterval(interval=intervalUnit)` |
| [`interpolate(seriesList, limit=inf)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.interpolate) | `find(seriesList) \| graphite:interpolate(limit=N)` |
| [`invert(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.invert) | `op:exp(-1)` |
| [`isNonNull(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.isNonNull) | `\| count()` |
| [`keepLastValue(seriesList, limit=inf)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.keepLastValue) | `find(...) \| fill:forward` | second argument ignored |
| [`legendValue(seriesList, *valueTypes)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.legendValue) | `pass()` |  CAQL is not supporting output picture manipulation |
| [`limit(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.limit) | `filter:limit()` |
| [`linearRegression(seriesList, startSourceAt=None, endSourceAt=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.linearRegression) | `find(seriesList) \| graphite:linearregression(bootstrap=N)` | Only startSourceAt parameter supported, in relative form, e.g. '-2d'|
| [`lineWidth(seriesList, width)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.lineWidth) | `pass()` | CAQL is not supporting output picture manipulation | 
| [`logarithm(seriesList, base=10)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.logarithm) | `find(seriesList) \| math:log(base)` 
| [`logit(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.logit) | `\| math:logit()` |
| [`lowest(seriesList, n=1, func='average')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.lowest) | `find(...) \| sort:<func>(reverse=1) \| filter:limit(n)` | func can be only max, min and average |
| [`lowestAverage(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.lowestAverage) | `find(...) \| sort:mean(reverse=1) \| filter:limit(n)` |
| [`maximumAbove(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.maximumAbove) | `filter::all:gt` |
| [`maximumBelow(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.maximumBelow) | `filter:all:lt` |
| [`maxSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.maxSeries) | `find(...) \| stats:max()` |
| [`minimumAbove(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.minimumAbove) | `filter:all:gt` |
| [`minimumBelow(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.minimumBelow) | `filter:all:lt` |
| [`minMax(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.minMax) | `normalize()` |
| [`minSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.minimumBelow) | `find(...) \| stats:min()` |
| [`movingAverage(seriesList, windowSize, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingAverage) | `find(...) \| rolling:mean(<window_duration>)` |
| [`movingMax(seriesList, windowSize, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingMax) | `find(...) \| rolling:max(<window_dur>)` |
| [`movingMedian(seriesList, windowSize, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingMedian) | `find(...) \| rolling:percentile(<window_dur>, 50)` |
| [`movingMin(seriesList, windowSize, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingMin) | `find(...) \| rolling:min(<window_dur>)` |
| [`movingSum(seriesList, windowSize, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingSum) | `find(...) \| rolling:sum(<window_duration>)` |
| [`movingWindow(seriesList, windowSize, func='average', xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.movingWindow) | `find(seriesList) \| rolling:<func>(<window_duration>)` | we're ignoring xFilesFactor parameter |
| [`multiplySeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.multiplySeries) | `op:prod{ find("metric1"), find("metric2"), find("metricN") }` |
| [`multiplySeriesWithWildcards(seriesList, *position)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.multiplySeriesWithWildcards) | `find(seriesList) \| graphite:removenode(position) \| group_by:prod('__name')` |
| [`nonNegativeDerivative(seriesList, maxValue=None, minValue=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.nonNegativeDerivative) | `\| counter() \| each:mul(60)` |
| [`nPercentile(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.nPercentile) | `find(...) \| rolling:percentile(VIEW_PERIOD,n)` |
| [`offset(seriesList, factor)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.offset) | `find(...) \| each:add(x)` |
| [`offsetToZero(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.offsetToZero) | `graphite:offsettozero()` |
| [`rangeOfSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.rangeOfSeries) | `graphite:rangeofseries()` |
| [`percentileOfSeries(seriesList, n, interpolate=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.percentileOfSeries) | `find(...) \| stats:percentile(N)` |
| [`perSecond(seriesList, maxValue=None, minValue=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.perSecond) | `find() \| counter()` |
| [`pieAverage(series)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.pieAverage) | `find(...) \| stats:mean` | CAQL not supporting pie graphs, but we're replacing it with average function |
| [`pieMaximum(series)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.pieMaximum) | `find(...) \| stats:max` | CAQL not supporting pie graphs, but we're replacing it with max function |
| [`pieMinimum(series)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.pieMinimum) | `find(...) \| stats:min` | CAQL not supporting pie graphs, but we're replacing it with min function |
| [`pow(seriesList, factor)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.pow) | `find(...) \| each:exp(factor)` | 
| [`powSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.powSeries) | `find(...) \| op:exp()` | 
| [`randomWalkFunction(name, step=60)`](https://graphite.readthedocs.io/en/latest/functions.html#graphite.render.functions.randomWalkFunction) | `randomwalk()` |  Name and step parameter are ignored
| [`removeAbovePercentile(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.removeAbovePercentile) | `filter:values:percentile:lt` |
| [`removeAboveValue(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.removeAboveValue) | `find(...) \| filter:all:lt([filter_value])` |
| [`removeBelowPercentile(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.removeBelowPercentile) | `filter:values:percentile:gt` |
| [`removeBelowValue(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.removeBelowValue) | `find(...) \| filter:all:gt([filter_value])` |
| [`removeBetweenPercentile(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.removeBetweenPercentile) | `find(...) \| graphite:removebetweenpercentile(lower_percentile=n)` |
| [`removeEmptySeries(seriesList, xFilesFactor=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.removeEmptySeries) | `filter:all:<>:missing` | for the second arg, only 0 or 1 is supported |
| [`roundFunction(seriesList, precision=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.roundFunction) | `find(seriesList) \| math:floor()` | precision is ignored, i.e. only rounds to integer |
| [`scale(seriesList, factor)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.scale) | `find(...) \| each:mul(x)` |
| [`scaleToSeconds(seriesList, seconds)`](https://graphite.readthedocs.io/en/latest/functions.html#graphite.render.functions.scaleToSeconds) | `\| each:mul(x) \| each:div(60)` |
| [`secondYAxis(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.secondYAxis) | `pass()` | CAQL is not supporting output picture manipulation, but user can choose second Y axis in graph options |
| [`setXFilesFactor(seriesList, xFilesFactor)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.setXFilesFactor) | `pass()` | setXFilesFactor has not many sense in CAQL |
| [`sigmoid(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sigmoid) | `\| math:sigmoid()` |
| [`sinFunction(name, amplitude=1, step=60)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sinFunction) | `\| math:sin() \| each:mul(amplitude)` | Step is not supported because it's outside of CAQL control |
| [`smartSummarize(seriesList, intervalString, func='sum', alignTo=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.smartSummarize) | `find(...) \| window:<sum\|count\|mean\|stddev\|max\|min\|first\|last\|percentile>(<window_duration>)` |
| [`sortBy(seriesList, func='average', reverse=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sortBy) | `... \| sort:<func>(reverse=X)` | func can be only max, min and average |
| [`sortByMaxima(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sortByMaxima) | `... \| sort:max()` | 
| [`sortByMinima(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sortByMinima) | `... \| filter:all:gt(0) \| sort:min() ` |
| [`sortByName(seriesList, natural=False, reverse=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sortByName) | `... \| sort:name` | 
| [`sortByTotal(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sortByTotal) | `pass()` | no need to sort in CAQL - passthrough |
| [`squareRoot(seriesList)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.squareRoot) | `\| each:exp(0.5)` |
| [`stddevSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.stddevSeries) | `find(...) \| stats:stddev()` |
| [`stdev(seriesList, points, windowTolerance=0.1)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.stdev) | `find(...) \| rolling:stddev(<points>M)` | points assumed in minutes, windowTolerance ignored |
| [`substr(seriesList, start=0, stop=0)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.substr) | `\| graphite:substr(start, stop)` |
| [`summarize(seriesList, intervalString, func='sum', alignToFrom=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.summarize) | `find(...) \| window:sum()` | `alignToFrom=True` is ignored |
| [`sum()`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.summarize) | alias for `sumSeries()` |  |
| [`sumSeries(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.summarize) | `find(...) \| stats:sum()` |
| [`sumSeriesWithWildcards(seriesList, *position)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.sumSeriesWithWildcards) | `find(seriesList) \| graphite:removenode(position) \| group_by:sum('__name')` |
| [`time(name, step=60)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.timeFunction) | `time:epoch() \| label("name")` | Alias for `timeFunction()`, see below |
| [`timeFunction(name, step=60)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.timeFunction) | `time:epoch() \| label("name")` | Step is not supported because it's outside of CAQL control |
| [`timeShift(seriesList, timeShift, resetEnd=True, alignDST=False)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.timeShift) | `\| delay()` |
| [`timeSlice(seriesList, startSliceAt, endSliceAt='now')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.timeSlice) | `\| filter:whence()` | startSliceAt/endSliceAt parameters can be either absolute unix timestamp or relative format (e.g. '-6h') |
| [`transformNull(seriesList, default=0, referenceSeries=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.transformNull) | `find(...) \| fill([value])` |
| [`threshold(value, label=None, color=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.threshold) | `pass()` | CAQL is not supporting output picture manipulation | 
| [`unique(*seriesLists)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.unique) | `find(...) \| filter:label:unique()` |
| [`useSeriesAbove(seriesList, value, search, replace)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.useSeriesAbove) | `\| filter:any:geq(value) \| graphite:aliassub(search, replace)` |
| [`verticalLine(ts, label=None, color=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.verticalLine) |  `pass()` | CAQL is not supporting output picture manipulation | 

## Functions Not Yet Supported

The following Graphite functions are not currently available in CAQL but can be implemented. 

| Graphite Function |
| ------ |
| [`aliasQuery(seriesList, search, replace, newName)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.aliasQuery) |
| [`cactiStyle(seriesList, system=None, units=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.cactiStyle) |
| [`highestCurrent(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.highestCurrent) | `top(method=last)` or `sort:last` needed in CAQL | 
| [`lowestCurrent(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.lowestCurrent) | `sort:last` needed in CAQL |
| [`mapSeries(seriesList, *mapNodes)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.mapSeries) |
| [`mostDeviant(seriesList, n)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.mostDeviant) |
| [`reduceSeries(seriesLists, reduceFunction, reduceNode, *reduceMatchers)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.reduceSeries) |
| [`seriesByTag(*tagExpressions)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.seriesByTag) |
| [`stacked(seriesLists, stackName='__DEFAULT__')`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.stacked) |
| [`timeStack(seriesList, timeShiftUnit='1d', timeShiftStart=0, timeShiftEnd=7)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.timeStack) |
| [`weightedAverage(seriesListAvg, seriesListWeight, *nodes)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.weightedAverage) |

## Functions that will not be supported

| Graphite Function |
| ------ |
| [`applyByNode(seriesList, nodeNum, templateFunction, newName=None)`](https://graphite.readthedocs.io/en/stable/functions.html#graphite.render.functions.applyByNode) |
