---
title: SMTP
sidebar_custom_props:
  image: smtp.svg
description: ""
implementation: broker
module: smtp
tags:
  - email
  - protocol
  - messaging
---

# SMTP

## Overview

Check mail deliverability with the Simple Mail Transport Protocol. The check will deliver a test message to the configured recipient and create metrics based on the various commands and responses during the interaction with the target mail server.

## Notes

Required parameters:
|Name|Description|
|----|-----------|
|to|The email address of a recipient to whom the test message will be sent.|

Optional parameters:
|Name|Description|
|----|-----------|
|port|The TCP port to which the check will connect (default: 25).|
|ehlo|The EHLO identification string to send (default: "noit.local").|
|from|The SMTP envelope sender.|
|starttls|Whether the check should attempt a STARTTLS upgrade of the connection (default: false).|
|sasl_authentication|Specify the type of SASL (Simple Authentication and Security Layer) authentication to use. Values are off, login, or plain (default: off).|
|sasl_user|The SASL authentication username.|
|sasl_password|The SASL authentication password.|
|sasl_auth_id|The SASL authorization identity, only used for the plain type of authentication.|
|payload|Specifies the payload sent (on the wire). CR LF DOT CR LF is appended automatically (default: "Subject: Testing").|
|proxy_protocol|If set to true, test mail server response to a PROXY protocol header (default: false).|
|proxy_family|The protocol family to send in the PROXY header, either TCP4 or TCP6 (default: TCP4).|
|proxy_source_address|The IP (or string) to use as the source address portion of the PROXY protocol. More on the PROXY protocol in the HAproxy documentation.|
|proxy_dest_address|The IP (or string) to use as the destination address portion of the PROXY protocol. More on the PROXY protocol in the HAproxy documentation.|
|proxy_source_port|The port to use as the source port portion of the PROXY protocol. Defaults to the actual source port of the connection to the target.|
|proxy_dest_port|The port to use as the dest port portion of the PROXY protocol. Defaults to the value of the port parameter or 25.|

## Metrics

The SMTP check proceeds in phases, from the initial connection through to the final QUIT command. The elapsed time from the start to the end of each phase is emitted as a numeric metric, in milliseconds (ms), named [phasename]\_time. An SMTP connection goes through the following phases:
|Phase|Description|
|-----|-----------|
|banner|From initial TCP connect to receiving server greeting|
|ehlo|From sending EHLO to server response|
|starttls|From sending STARTTLS to server response|
|sasl_auth|From sending AUTH, username, and password to server response|
|mailfrom|From sending MAIL FROM to server response|
|rcptto|From sending RCPT TO to server response|
|data|From sending DATA to server response|
|body|From sending payload to server response|
|quit|From sending QUIT to server response|

Typical metrics also include:
|Name|Type|Description|
|----|----|-----------|
cert_end|numeric|The Unix epoch time representing the expiration date of the TLS certificate.
cert_end_in|numeric|The number of seconds between now (as measured at the Circonus broker) and the cert_end value.
cert_error|text|Text of any certificate validation error(s), or null if no errors.
cert_issuer|text|The subject of the issuer's certificate, typically a Certificate Authority (CA) certificate.
cert_start|numeric|The Unix epoch time representing the validity start date of the TLS certificate.
cert_subject|text|The subject of the server's TLS certificate.
cert_subject_alternative_names|text|A list of any X509v3 Subject Alternative Names (SAN) that the TLS certificate protects.
duration|numeric|The elapsed time from start to end of the entire check operation, in milliseconds.
