---
title: Windows Eventlog
sidebar_custom_props:
  image: windows.svg
logo_light: /img/library/windows.svg
description: ""
implementation: cua
module: httptrap:cua:win_eventlog
---

# Windows Eventlog

## Overview

Collect Windows Event Log messages

Supports Windows Vista and higher.

Agent should have Administrator permissions to subscribe for some of the Windows Events Channels, like System Log.

## Configuration

```toml
[[inputs.win_eventlog]]
  ## Agent should have Administrator permissions to subscribe for some Windows Events channels
  ## (System log, for example)

  ## LCID (Locale ID) for event rendering
  ## 1033 to force English language
  ## 0 to use default Windows locale
  # locale = 0

  ## Name of eventlog, used only if xpath_query is empty
  ## Example: "Application"
  # eventlog_name = ""

  ## xpath_query can be in defined short form like "Event/System[EventID=999]"
  ## or you can form a XML Query. Refer to the Consuming Events article:
  ## https://docs.microsoft.com/en-us/windows/win32/wes/consuming-events
  ## XML query is the recommended form, because it is most flexible
  ## You can create or debug XML Query by creating Custom View in Windows Event Viewer
  ## and then copying resulting XML here
  xpath_query = '''
  <QueryList>
    <Query Id="0" Path="Security">
      <Select Path="Security">*</Select>
      <Suppress Path="Security">*[System[( (EventID &gt;= 5152 and EventID &lt;= 5158) or EventID=5379 or EventID=4672)]]</Suppress>
    </Query>
    <Query Id="1" Path="Application">
      <Select Path="Application">*[System[(Level &lt; 4)]]</Select>
    </Query>
    <Query Id="2" Path="Windows PowerShell">
      <Select Path="Windows PowerShell">*[System[(Level &lt; 4)]]</Select>
    </Query>
    <Query Id="3" Path="System">
      <Select Path="System">*</Select>
    </Query>
    <Query Id="4" Path="Setup">
      <Select Path="Setup">*</Select>
    </Query>
  </QueryList>
  '''

  ## System field names:
  ##   "Source", "EventID", "Version", "Level", "Task", "Opcode", "Keywords", "TimeCreated",
  ##   "EventRecordID", "ActivityID", "RelatedActivityID", "ProcessID", "ThreadID", "ProcessName",
  ##   "Channel", "Computer", "UserID", "UserName", "Message", "LevelText", "TaskText", "OpcodeText"

  ## In addition to System, Data fields can be unrolled from additional XML nodes in event.
  ## Human-readable representation of those nodes is formatted into event Message field,
  ## but XML is more machine-parsable

  # Process UserData XML to fields, if this node exists in Event XML
  process_userdata = true

  # Process EventData XML to fields, if this node exists in Event XML
  process_eventdata = true

  ## Separator character to use for unrolled XML Data field names
  separator = "_"

  ## Get only first line of Message field. For most events first line is usually more than enough
  only_first_line_of_message = true

  ## Parse timestamp from TimeCreated.SystemTime event field.
  ## Will default to current time of processing on parsing error or if set to false
  timestamp_from_event = true

  ## Fields to include as tags. Globbing supported ("Level*" for both "Level" and "LevelText")
  event_tags = ["Source", "EventID", "Level", "LevelText", "Task", "TaskText", "Opcode", "OpcodeText", "Keywords", "Channel", "Computer"]

  ## Default list of fields to send. All fields are sent by default. Globbing supported
  event_fields = ["*"]

  ## Fields to exclude. Also applied to data fields. Globbing supported
  exclude_fields = ["TimeCreated", "Binary", "Data_Address*"]

  ## Skip those tags or fields if their value is empty or equals to zero. Globbing supported
  exclude_empty = ["*ActivityID", "UserID"]
```

### Filtering

There are three types of filtering: **Event Log** name, **XPath Query** and **XML Query**.

**Event Log** name filtering is simple:

```toml
  eventlog_name = "Application"
  xpath_query = '''
```

For **XPath Query** filtering set the `xpath_query` value, and `eventlog_name` will be ignored:

```toml
  eventlog_name = ""
  xpath_query = "Event/System[EventID=999]"
```

**XML Query** is the most flexible: you can Select or Suppress any values, and give ranges for other values. XML query is the recommended form, because it is most flexible. You can create or debug XML Query by creating Custom View in Windows Event Viewer and then copying resulting XML in config file.

XML Query documentation:

<https://docs.microsoft.com/en-us/windows/win32/wes/consuming-events>
