---
title: Release Notes
weight: 40
---

# Release Notes

## Changes in 1.0.0

2023-07-28

**IMPORTANT NOTE: Any node running 0.23.7 or earlier MUST do a [surrogate3
migration](/irondb/getting-started/configuration#surrogate_database) PRIOR to
upgrading to 1.0.0. This is due to removal of support for the previous
surrogate database format.**

 * Prevent ingestion stalls by setting a better eventer mask on socket read
   errors.
 * Fix bug where surrogate deletes running at the same time as level index
   compactions can cause crashes.
 * Improve scalability of lock protecting `all_surrogates` in indexes.
 * Fix logging of old-data ingestion.
 * Don't stop a rollup in progress if new data is received; finish and reroll
   later.
 * Add ability to filter by account ID in the `snowthsurrogatecontrol` utility
   by using the `-a` flag.
 * Fix full-delete crash on malformed tag query.
 * Rewrite Graphite level-index query cache to remove race on lookup.
 * Remove surrogate2.
 * Some data was hidden post arts compaction, make sure it stays visible.
 * Fix bug where if a fetch to the `/raw` endpoint exceeded the raw streaming
   limit (10,000 by default), the fetch would hang.
 * Reduce memory usage during extremely large `/raw` fetches.
 * Fix bug where extremely large double values generated invalid JSON on `/raw`
   data fetches.
 * Handle surrogate duplicates on migration from `s2` to `s3`.
 * Require all nodes for `active_count` queries.
 * Add back-pressure to raw puts, allows the database to shed load by returning
   HTTP 503.

## Changes in 0.23.7

2023-06-15

 * Cleaning rollup-suppressed metrics will now happen asynchronously in a jobq,
   preventing this operation from blocking the delete queue.
 * Cleaning rollup-suppressed metrics will now auto-delete metrics that are old
   enough - not just metrics that are older than the shard being deleted.
 * Reduce lock contention on lock `all_surrogates_lock` at crossroads of
   indexing and ingestion.
 * Perform ordered interval list compactions off-heap, reducing memory usage.
 * Perform surrogate compactions off-heap, reducing memory usage.
 * Use memory map files to perform level index compactions, reducing memory
   usage.
 * Fix issue where raw shard could be erroneously deleted.
 * Fix bug where a set of metric indexes were regenerated during a full reconstitute.
 * Avoid contention on all-surrogates lock inside indexes.
 * Respect `X-Snowth-Advisory-Limit` field when proxying to other nodes during
   graphite-style metric find operations.
 * Fix missing data when queried using level index when levels are partially in
   WAL.
 * Fix find timeouts so they're respected and stop processing once they're reached.
 * Allow providing a `node_blacklist` field when running live shard reconstitutes. This
   will allow the reconstitute process to skip specific nodes.
 * Improve loading times of RocksDB-backed shards.
 * Remove from surrogate indexes on-disk surrogates that are tombstoned in
   subsequent files.
 * Add optional `//histogram//rollup//@retention` config to delete histogram rollup
   shards after a specified amount of time.
 * Restore functionality of lua `reg_v2` (linear/exponential regression)
   extension.
 * Migrate to using an external library package for RoaringBitmap.
 * Optimize surrogate lookup for presence of tombstones.
 * [libmtev 2.4.4](https://github.com/circonus-labs/libmtev/blob/master/ChangeLog.md#244)

## Changes in 0.23.6

2023-03-08

 * Fix bug where old timestamps could cause inter-node replication to stall.
 * Better handling of back pressure on journal replication.
 * Make node selection during find calls latency aware so we choose to pull from nodes
   that are up to date if up to date nodes are available.
 * Fix bad reference count on shard closure that could lead to use after free.
 * Fix bug where graphite finds would not expand their proxy server set if the cluster is
   sided and one or more of the initial proxy nodes did not return successfully.
 * Additional validations on metric timestamps on ingestion.
 * Use HTTP connection pooling for graphite inter-node traffic.
 * CAQL: Add `group_by:stddev/popvar/percentile/alwaysone`, `math:sgn` and inverse hyperbolic functions
   (`asanh`, `acosh`, `atanh`), `stats:alwaysone/count/var/popvar`, and `window/rolling:popvar`, `delta`,
   `changes`, `absent`, `resets`, `increase`, `last`, and `present`.
 * Fix `stats.json` delay measurement value to reflect the node latency calculated in the gossip
   data.
 * Update the `stats.json` delay measurement values at a more regular cadence to make sure that
   it reflects the current system state.
 * Fix crash bug with empty histogram entries in `mvalue` and `inverse_quantile` extensions.
 * Negative timestamp on metric could bypass validations and stall replication
 * `graphite_translate` additions/fixes to better match graphite behavior:
   * `holtWintersConfidenceBands()` and `holtWintersForecast()` translation
   * `holtWintersAberration()` and `holtWintersConfidenceArea()` translation
   * `offsetToZero()`, `rangeOfSeries()`, `aggregateLine()` and `removeBetweenPercentile()` translation
   * `averageOutsidePercentile()`, `fallbackSeries()` and `integralByInterval()` translation
   * `interpolate()` and `linearRegression()` translation
   * Proper translation of `first` and `last` aggregation functions
 * Change CAQL processing model to allow for larger datasets.
 * Support using mdbx as an alternative storage backend.
 * Add support for Rocksdb 7.8.3.
 * [libmtev 2.4.1](https://github.com/circonus-labs/libmtev/blob/master/ChangeLog.md#241)

## Changes in 0.23.5

2023-01-16

 * Fix bugs that could cause out-of-date data to be returned when fetching data on a sided cluster
   with one or more of the nodes being extremely far behind in replication.
 * CAQL: Add functions `stats:clamp`, `math:sqrt`, `math:log2`
 * [libmtev 2.4.0](https://github.com/circonus-labs/libmtev/blob/master/ChangeLog.md#240)

## Changes in 0.23.4

2023-01-03

 **IMPORTANT: This release includes an update to the on-disk metric indexes. These
   will be rebuilt automatically when a node is restarted after updating to this version.
   This will result in the startup time for a node the first time after upgrading to be
   considerably longer. After the first boot, boot times should be consistently faster.**

 * Add `fill:forward(limit=DUR)` function that will limit filling to the specified duration.
 * Add `fill=forward:<ms>` as a `/fetch` param and tie into the optimizer.
 * Add cluster-wide version tracking for `/fetch` to prevent CAQL over-optimization during upgrades.
 * Fix handling of error returns when reading jlog interval.
 * Discard incoming metrics that match the `//snowth//discard_data_filters/discard_data_filter` configured
   for the corresponding account, e.g., `<discard_data_filter account="1234" filter="and(__storage:false)"/>`
 * New level index format that allows for faster loads and lowers memory usage.  This requires regenerating the indexes
   on the first startup after upgrade.
 * Reduce loading times for level indexes.
 * Fix ingestion of multiple opentsdb records.
 * [libmtev 2.3.9](https://github.com/circonus-labs/libmtev/blob/master/ChangeLog.md#239)

## Older Releases

For older release notes, see [Archived Release Notes](/irondb/release-notes-archive).
