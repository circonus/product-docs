---
title: Scheduling Reports with Cron
sidebar_position: 2
---

# Scheduling Reports with Cron

Reports and proactive log analytic alerts can run at a variety of fixed intervals (e.g. hourly, daily, weekly, monthly, etc.).

You can define a custom schedule using cron expressions for when they should run.

## Cron expression reference

Monitors use the Unix cron syntax and support five fields:

Field | Valid values
:--- | :---
Minute | 0-59
Hour | 0-23
Day of month | 1-31
Month | 1-12
Day of week | 0-7 (0 and 7 are both Sunday) or SUN, MON, TUE, WED, THU, FRI, SAT

For example, the following expression translates to "every Monday through Friday at 11:30 AM":

```bash
30 11 * * 1-5
```

## Features

Feature | Description
:--- | :---
`*` | Wildcard. Specifies all valid values.
`,` | List. Use to specify several values (e.g. `1,15,30`).
`-` | Range. Use to specify a range of values (e.g. `1-15`).
`/` | Step. Use after a wildcard or range to specify the "step" between values. For example, `0-11/2` is equivalent to `0,2,4,6,8,10`.

Note that you can specify the day using two fields: day of month and day of week. For most situations, we recommend that you use just one of these fields and leave the other as `*`.

If you use a non-wildcard value in both fields, the monitor runs when either field matches the time. For example, `15 2 1,15 * 1` causes the monitor to run at 2:15 AM on the 1st of the month, the 15th of the month, and every Monday.

## Sample expressions

Every other day at 1:45 PM:

```bash
45 13 1-31/2 * *
```

Every 10 minutes on Saturday and Sunday:

```bash
0/10 * * * 6-7
```

Every three hours on the first day of every other month:

```bash
0 0-23/3 1 1-12/2 *
```