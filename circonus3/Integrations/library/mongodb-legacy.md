---
title: MongoDB
sidebar_custom_props:
  image: mongodb.svg
description: ""
legacy: true
implementation: broker
module: mongodb
tags:
  - nosql
  - database
---

# MongoDB

## Overview

MongoDB is an open-source NoSQL database that uses a document-oriented database model to make it easier to split data across multiple servers for increased security and productivity.

The MongoDB Check collects metrics from your MongoDB instances. Circonus pulls information from MongoDB in JSON format via the database's native interface.

## Configuration

Required parameters:
| Name | Description |
|--------|------------------------------------------------|
| port | The TCP port to connect to the MongoDB server. |
| dbname | The name of the database to query. |

Optional parameters:
| Name | Description |
|----------|------------------------------------------------------------------------------------------------------|
| username | The user name to be used for authentication to the MongoDB server. |
| password | The password to be used for authentication to the MongoDB server. |
| command | A command (query) that will be run using the runCommand method, and metrics created from the result. |
