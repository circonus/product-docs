---
title: Release Notes
sidebar_position: 12
---

# Release Notes

## Changes in 1.1.0

2023-12-12

 * Add preliminary support for operating IRONdb clusters with SSL/TLS. This
   allows securing ingestion, querying, and intra-cluster replication. See
   [TLS Configuration](/irondb/getting-started/configuration#tls-configuration)
   for details.
 * Fix bug where the `reconst_in_progress` file was not being cleaned up after
   reconstitute operations, which could block rollups and deletes from running.
 * The `raw/rollup` and `histogram_raw/rollup` API endpoints will no longer
   block if there is a rollup already running. They will also return sensible
   error messages.
 * Raw shard rollups will not be allowed to run unless all previous rollups
   have run at least once.
 * Fix bug where deferred rollups could cause the rollup process to lock up
   until the node is restarted.
 * Add REST endpoint POST/PUT
   `/histogram/<period>/<check_uuid>/<metric_name>?num_records=<x>` which can
   be used with a json payload to directly insert histogram shard metric data
   for repair purposes.
 * Added configuration file field, `//reconstitute/@max_simultaneous_nodes`,
   that will cause the reconstituting node to only hit a predetermined
   number of peer nodes at once. The default if not specified is "all peers".
   This setting can be used if a reconstitute places too much load on the rest
   of the cluster, causing degradation of service.
 * Disallow starting single-shard reconstitutes with merge enabled if the shard
   exists and is flagged corrupt.
 * Improve NNTBS error messages if unable to open a shard.
 * PromQL - improve error messages on invalid or unsupported range queries.
 * PromQL - fix range nested inside one or more instant functions.
 * Include maintenance mode when pulling lists of raw, histogram, or histogram
   rollup shards.
 * Use read-copy-update (RCU) for Graphite level indexes and the surrogate
   database. It allows more queries to run concurrently without affecting
   ingestion, and vice versa.
 * Defer rollups of raw shards if there is a rollup shard in maintenance that
   the raw shard would write to.
 * Reject live shard reconstitute requests on NNTBS or histogram rollup shards
   if there is a raw shard rollup in progress that would feed into them.
 * Fix bug where the system would report that a live reconstitute was not in
   progress, even when one was running.
 * Allow running single-shard or single-metric reconstitute on non-raw shards,
   even if the shard extends beyond the current time.
 * The reconstitute GUI no longer apppears when doing online reconstitutes.
 * Fix iteration bug when reconstituting NNTBS shards.
 * Added the `merge_all_nodes` flag to live reconstitute which causes all
   available and non-blacklisted write copies to send metric data instead of
   only the "primary" available node.
 * Added the ability to repair a local database by reconstituting a single
   metric stream.
 * Fix bug where `/fetch` would not proxy if the data for a time period was all
   in the raw database, but the relevant raw shards were offline.


## Changes in 1.0.1

2023-09-06

**NOTE: This version updates RocksDB (raw database, histogram shards) from
version 6 to 7. It is not possible to revert a node to a previous version once
this version has been installed.**

 * Add a new configuration parameter, `//rest/@default_connect_timeout`, that
   allows configuring the connect timeout for inter-node communication. This
   was previously hardcoded to 3 seconds.
 * Graphite `series` and `series_multi` fetches now return 500 when there are
   no results and at least one node had an issue returning data.
 * Graphite `series` and `series_multi` fetches now return 200 with an empty
   results set on no data rather than a 404.
 * Fix bug on `/find` proxy calls where activity ranges were being set
   incorrectly.
 * Add ability to filter using multiple account IDs in the
   `snowthsurrogatecontrol` tool by providing the `-a` flag multiple times.
 * Reduce usage of rollup debug log to avoid log spam.
 * Upgrade RocksDB from version 6.20.3 to version 7.9.2.
 * [libmtev 2.5.3](https://github.com/circonus-labs/libmtev/blob/master/ChangeLog.md#253)

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
 * [libmtev 2.5.2](https://github.com/circonus-labs/libmtev/blob/master/ChangeLog.md#252)

## Older Releases

For older release notes, see [Archived Release Notes](/irondb/release-notes-archive).
