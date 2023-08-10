---
title: HTTP
sidebar_custom_props:
  image: http.svg
logo_light: /img/library/http.svg
description: ""
legacy: true
implementation: broker
module: http
tags:
  - protocol
  - website
  - performance
  - availability
  - hypertext
---

# HTTP

## Overview

The HTTP Check monitors the status of your local or remote HTTP endpoints by issuing HTTP requests and collecting HTTP response data like response code, time and size.

## Configuration

The only required parameter is the URL to check, including scheme and hostname (as you would type into a browser's location bar.)

Optional parameters:
|Name|Description|
|----|-----------|
|method|The HTTP method to use (default: GET)|
|http_version|The HTTP protocol version to use (default: 1.1)|
|header name/value|Include an arbitrary header in the HTTP request.|
|payload|Information sent as the payload of the HTTP request.|
|auth_method|HTTP authentication method to use (default: None)|
|auth_user|The user to authenticate as.|
|auth_password|The password to use during authentication.|
|redirects|The maximum number of Location header redirects to follow (default: 0)|

If server authorization is necessary for this resource, you will need to enter the server authorization information (Auth Username, Auth Password, Auth Method) under "Advanced Configuration". You can also enter a payload to send and copy and paste a CA Certificate under "Advanced Configuration".

## Metrics

Typical metrics include:
|Name|Type|Description|
|----|----|-----------|
|bytes|numeric|Total bytes received.|
|code|text|Response code received.|
|duration|numeric|Total request duration, in milliseconds.|
|truncated|numeric|Response, truncated.|
|tt_connect|numeric|Time to connect, in milliseconds.|
|tt_firstbyte|numeric|Time to receive first byte, in milliseconds.|

If SSL/TLS is enabled, the following additional metrics are returned:
|Name|Type|Description|
|----|----|-----------|
|cert_end|numeric|The Unix epoch time representing the expiration date of the TLS certificate.|
|cert_end_in|numeric|The number of seconds between now (as measured at the Circonus broker) and the cert_end value.|
|cert_error|text|Text of any certificate validation error(s), or null if no errors.|
|cert_issuer|text|The subject of the issuer's certificate, typically a Certificate Authority (CA) certificate.|
|cert_start|numeric|The Unix epoch time representing the validity start date of the TLS certificate.|
|cert_subject|text|The subject of the server's TLS certificate.|
|cert_subject_alternative_names|text|A list of any X509v3 Subject Alternative Names (SAN) that the TLS certificate protects.|
