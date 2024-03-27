---
title: IRONdb Relay Release Notes
sidebar_position: 4
---

# IRONdb-relay Release Notes

## 0.1.1

2024-03-27

* Update libmtev dependency, which fixes potential memory corruption
  issues.

## 0.1.0

2024-01-31

* Add TLS support

## 0.0.57

2024-01-25

* Fix Docker build to bust apt caches and avoid errors.
* Update setup script to better support HTTPS URLs in the bootstrap list.
* Add C++ guards to headers and convert send code to C++ to take advantage of
  libsnowth features.

## 0.0.56

2023-11-06

* Add Docker support.

## 0.0.55

2023-09-05

* Use new `libsnowth_init` function to avoid potential buffer overflow.

## 0.0.54

2023-06-06

* Remove unused DH parameter files from configuration.

## 0.0.53

2023-03-06

* Fix simdjson linking.

## 0.0.52

2022-09-14

* Fix log rotation.

## 0.0.51

2022-06-09

* Initialize `metric_t` structures to avoid data corruption.

## 0.0.50

2022-02-07

* Replace deprecated `mtev_atomic*` types and functions with compatibles ones
  from ConcurrencyKit (libck).

## 0.0.49

2022-02-04

* Fix an issue where some jlog subscribers were not advanced when they did not
  have work to do. This led to increased disk usage from processed segments
  that could not be removed.

## 0.0.48

2021-04-09

* Bring setup and start scripts into the repo.

## 0.0.47

2021-03-24

* Improved error handling/data parsing.
* Accept UTF-8 Graphite data.
* Move `debug/parsing` log to `debug/parsing/graphite` and add
  `error/parsing/graphite` log to catch parsing errors.
* Add configurable limits to acceptable data timestamps. Default is one year
  into the past or future from the current time. This is available at
  `<ingestion max_allowable_days_before_current_time="<num days">/>` and
  `<ingestion max_allowable_days_after_current_time="<num_dats">/>`. A value
   of `0` means no limit.

