---
layout: "../../layouts/BlogPost.astro"
title: "First steps with GNU Guix"
description: "The demes standard"
pubDate: "September 5 2023"
draft: true
tags: [guix]
---

# Intro

## Installation and setup

Install from the shell script online.
Be sure to say Yes to "do the SELinux setup".
Reboot.

After reboot:

```sh
guix pull
``

```
guix pull: error: remounting /gnu/store writable: Permission denied
```

Googling this message yields little useful info.
This has happened on 2 different machines.

Instructions from [here](https://jfearn.fedorapeople.org/fdocs/en-US/Fedora/20/html/Security_Guide/sect-Security-Enhanced_Linux-Fixing_Problems-Allowing_Access_audit2allow.html), suggested [here](https://mastodon.social/@starlily/111013341929599928) didn't help:

sudo grep guix /var/log/audit/audit.log|sudo audit2allow -R -M guixremount.te
could not open interface info [/var/lib/sepolgen/interface_info]

sudo semodule -i guixremount.te 
libsemanage.semanage_pipe_data: Child process /usr/libexec/selinux/hll/te failed with code: 1. (No such file or directory).
guixremount: libsemanage.semanage_pipe_data: Unable to execute /usr/libexec/selinux/hll/te : No such file or directory
guixremount:  (No such file or directory).
libsemanage.semanage_direct_commit: Failed to compile hll files into cil files.
 (No such file or directory).
semodule:  Failed!

From [here](https://unix.stackexchange.com/questions/665410/how-to-install-selinux-policy-for-guix-daemon-service-on-fedora), tried the mods of /gnu/store.
Then reboot...

Failed

## guix describe

```sh
guix describe -f channels
``` 


gives:

```scheme
(list (channel
        (name 'guix)
        (url "https://git.savannah.gnu.org/git/guix.git")
        (branch "master")
        (commit
          "8e2f32cee982d42a79e53fc1e9aa7b8ff0514714")
        (introduction
          (make-channel-introduction
            "9edb3f66fd807b096b48283debdcddccfea34bad"
            (openpgp-fingerprint
              "BBB0 2DDF 2CEA F6A8 0D1D  E643 A2A0 6DF2 A33A 54FA")))))
```

## guix shell

```sh
guix shell --export-manifest r r-tidyverse
````

gives:

```scheme
(specifications->manifest
  (list "r" "r-tidyverse"))
```

### Weirdness

If you don't specific `r` in the shell command, you end up with a shell that has no `R` binary!
This is definitely an "explicit over implicit" way to manage dependencies.

## Reproducing this environment later

```sh
guix time-machine -C channels.scm -- shell -m tidyverse.scm
```

### Notes

This command can take a while to execute over wifi.

