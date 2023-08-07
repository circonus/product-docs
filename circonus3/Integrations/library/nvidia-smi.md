---
title: Nvidia SMI
sidebar_custom_props:
  image: nvidia.svg
description: ""
implementation: cua
module: httptrap:cua:nvidia_smi
---

# Nvidia SMI

## Overview

The Nvidia SMI (System Management Interface) plugin uses a query on the [`nvidia-smi`](https://developer.nvidia.com/nvidia-system-management-interface) binary to pull GPU stats including memory and GPU usage, temp and other.

## Configuration

```toml
# Pulls statistics from nvidia GPUs attached to the host
[[inputs.nvidia_smi]]
  ## Optional: path to nvidia-smi binary, defaults to $PATH via exec.LookPath
  # bin_path = "/usr/bin/nvidia-smi"

  ## Optional: timeout for GPU polling
  # timeout = "5s"
```

### Windows

On Windows, `nvidia-smi` is generally located at `C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe`
On Windows 10, you may also find this located here `C:\Windows\System32\nvidia-smi.exe`

You'll need to escape the `\` within the `circonus-unified-agent.conf` like this: `C:\\Program Files\\NVIDIA Corporation\\NVSMI\\nvidia-smi.exe`

## Troubleshooting

Check the full output by running `nvidia-smi` binary manually.

Linux:

```sh
sudo -u cua -- /usr/bin/nvidia-smi -q -x
```

Windows:

```
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" -q -x
```

Please include the output of this command if opening an GitHub issue.

### Limitations

Note that there seems to be an issue with getting current memory clock values when the memory is overclocked.
This may or may not apply to everyone but it's confirmed to be an issue on an EVGA 2080 Ti.
