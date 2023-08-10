---
title: OpenWeatherMap
sidebar_custom_props:
  image: openweathermap.svg
logo_light: /img/library/openweathermap.svg
description: ""
implementation: cua
module: httptrap:cua:openweathermap
---

# OpenWeatherMap

## Overview

Collect current weather and forecast data from OpenWeatherMap.

To use this plugin you will need an [api key](https://openweathermap.org/appid) (app_id).

City identifiers can be found in the [city list](http://bulk.openweathermap.org/sample/city.list.json.gz). Alternately you can [search](https://openweathermap.org/find) by name; the `city_id` can be found as the last digits of the URL: https://openweathermap.org/city/2643743. Language identifiers can be found in the [lang list](https://openweathermap.org/current#multi). Documentation for condition ID, icon, and main is at [weather conditions](https://openweathermap.org/weather-conditions).

## Configuration

```toml
[[inputs.openweathermap]]
  ## OpenWeatherMap API key.
  app_id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

  ## City ID's to collect weather data from.
  city_id = ["5391959"]

  ## Language of the description field. Can be one of "ar", "bg",
  ## "ca", "cz", "de", "el", "en", "fa", "fi", "fr", "gl", "hr", "hu",
  ## "it", "ja", "kr", "la", "lt", "mk", "nl", "pl", "pt", "ro", "ru",
  ## "se", "sk", "sl", "es", "tr", "ua", "vi", "zh_cn", "zh_tw"
  # lang = "en"

  ## APIs to fetch; can contain "weather" or "forecast".
  fetch = ["weather", "forecast"]

  ## OpenWeatherMap base URL
  # base_url = "https://api.openweathermap.org/"

  ## Timeout for HTTP response.
  # response_timeout = "5s"

  ## Preferred unit system for temperature and wind speed. Can be one of
  ## "metric", "imperial", or "standard".
  # units = "metric"

  ## Query interval; OpenWeatherMap weather data is updated every 10
  ## minutes.
  interval = "10m"
```
