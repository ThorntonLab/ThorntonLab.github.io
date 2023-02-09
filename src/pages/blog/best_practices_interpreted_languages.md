---
layout: "../../layouts/BlogPost.astro"
title: "Tips to improve the reproducibility of Python and R scripts"
description: "Dependency management, I"
pubDate: "February 1, 2023"
draft: true
tags: ["reproducibility", "python", "rstats"]
---

Main points to get across:

* Put all imports in the script.
  Developing in the REPL means this is often missed.
* Be sure scripts work outside of the REPL.
  For example, test in a venv
* For Python, always provide a requirements.txt.
* For R, packrat?
  Provide the `packrat.lock` file?
  Or [devtools](https://support.posit.co/hc/en-us/articles/219949047-Installing-older-versions-of-packages)
* Prefer dependencies from pypi/cran.
  If you must install from github, try to "pin" to the specific commit.
