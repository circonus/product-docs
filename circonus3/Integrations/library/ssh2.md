---
title: SSH2
sidebar_custom_props:
image: ssh2.svg
description: ""
implementation: broker
module: ssh2
tags:
  - protocol
  - network
  - system
  - authentication
---

# SSH2

## Overview

Monitor your SSH server's banner and host key fingerprint. The SSH2 check does not actually perform a login on the target. It proceeds only as far as key exchange, to obtain the server's host-key fingerprint, and then closes the connection.

## Configuration

Except for the target host/IP, there are no required parameters. However, the Circonus UI will pre-fill many of the Advanced Configuration fields with values that are broadly compatible with various SSH server implementations.

Optional parameters:
|Name|Description|
|----|-----------|
|port|The TCP port on which the remote server's ssh service is running (default: 22).
method_hostkey|The host key algorithm supported. Choices are ssh-dss, ssh-rsa, ecdsa-sha2-nistp, or ssh-ed25519 (default: "ssh-rsa").|
|method_kex|The key exchange method to use. Choices are diffie-hellman-group1-sha1, diffie-hellman-group14-sha1, diffie-hellman-group16-sha512, or diffie-hellman-group18-sha512 (default: "diffie-hellman-group14-sha1").|
|method_crypt_cs|The encryption algorithm used from client to server. Choices are chacha20-poly1305@openssh.com, aes256-gcm@openssh.com, aes128-gcm@openssh.com, aes256-ctr, aes192-ctr, aes128-ctr, aes256-cbc, aes192-cbc, aes128-cbc, rijndael128-cbc, rijndael192-cbc, rijndael256-cbc, blowfish-cbc, blowfish-ecb, blowfish-cfb, blowfish-ofb, blowfish-ctr, twofish128-ctr, twofish128-cbc, twofish192-ctr, twofish192-cbc, twofish256-ctr, twofish256-cbc, twofish-cbc, twofish-ecb, twofish-cfb, twofish-ofb, arcfour256, arcfour128, arcfour, cast128-cbc, cast128-ecb, cast128-cfb, cast128-ofb, idea-cbc, idea-ecb, idea-cfb, idea-ofb, 3des-cbc, 3des-ecb, 3des-cfb, 3des-ofb, 3des-ctr, or none.|
|method_crypt_sc|The encryption algorithm used from server to client. Choices are the same as for method_crypt_cs.|
|method_mac_cs|The message authentication code algorithm used from client to server. Choices are hmac-sha2-512-etm@openssh.com, hmac-sha2-256-etm@openssh.com, umac-128-etm@openssh.com, umac-64-etm@openssh.com, hmac-sha2-512, hmac-sha2-256, hmac-sha1, hmac-sha1-96, hmac-md5, hmac-md5-96, hmac-ripemd160, hmac-ripemd160@openssh.com, or none.|
|method_mac_sc|The message authentication code algorithm used from server to client. Choices are the same as for method_mac_cs.|
|method_comp_cs|The compress algorithm used from client to server. Choices are zlib or none (default: "none").|
|method_comp_sc|The compress algorithm used from server to client. Choices are the same as for method_comp_cs (default: "none").|

## Metrics

Typical metrics include:
|Name|Type|Description|
|----|----|-----------|
|banner|text|The banner string received from the target server.|
|error|text|If a connection error occurred, this metric is emitted and contains a brief reason for the error. If no error occurred, this metric is suppressed.|
|key-type|text|The type of host key presented by the target server, such as RSA.|
|bits|numeric|The size of the host key, in bits.|
|fingerprint|text|MD5 checksum of the host key, in hexadecimal format.|
|fingerprint_sha1|text|SHA1 checksum of the host key, in hexadecimal format.|
|fingerprint_sha256|text|SHA256 checksum of the host key, in hexadecimal format.|
|fingerprint_sha1_base64|text|SHA1 digest of the host key, base64-encoded.|
|fingerprint_sha256_base64|text|SHA256 digest of the host key, base64-encoded.|
|duration|numeric|Elapsed time from the start of the connection attempt to the end of the check operation, in milliseconds.|

Additional options allow you to specify the encryption method for client-to-server data encryption, the encryption method for server-to-client data encryption, and the hostkey type.
