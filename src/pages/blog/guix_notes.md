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

