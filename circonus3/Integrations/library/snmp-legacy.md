---
title: SNMP
sidebar_custom_props:
image: snmp.svg
description: ""
legacy: true
implementation: broker
module: snmp
---

# SNMP

## Overview

Check one or more Object Identifiers (OIDs) with the Simple Network Management Protocol (SNMP).

## Configuration

The Circonus UI will pre-fill the community and version parameters, matching the API defaults below. At least one `oid_[name]` parameter is required in the Circonus UI.

Optional parameters:
|Name|Description|
|----|-----------|
|community|The SNMP community string providing read access (default: "public").|
|port|The UDP port to which SNMP queries will be sent (default: 161).|
|version|The SNMP version used for queries (default: 2c).|
|oid\_[name]|Defines a metric to query. Key _oid_foo_ will establish a metric called foo. The value of the parameter should be an OID either in decimal notation or MIB name.|
|security*level|The security level to use for the SNMP session. Choices are: \_authPriv* (authenticated and encrypted), _authNoPriv_ (authenticated and unencrypted) and _noAuthNoPriv_ (unauthenticated and unencrypted). Only applicable to SNMP Version 3 (default: authPriv).|
|auth*protocol|The authentication protocol to use. Choices are \_MD5* or SHA. Only applicable to SNMP Version 3 (default: MD5).|
|privacy*protocol|The privacy protocol to use. Choices are \_DES* or _AES128_. Only applicable to SNMP Version 3 (default: DES).|
|auth_passphrase|The authentication passphrase to use. Only applicable to SNMP Version 3.|
|privacy_passphrase|The privacy passphrase to use. Only applicable to SNMP Version 3.|
|security_engine|The security engine hex value to use. Only applicable to SNMP Version 3.|
|context_engine|The context engine hex value to use. Only applicable to SNMP Version 3.|
|security_name|The security name (or user name) to use. Only applicable to SNMP Version 3.|
|context_name|The context name to use. Only applicable to SNMP Version 3.|
|separate_queries|Whether or not to query each OID separately (default: false/off).|
