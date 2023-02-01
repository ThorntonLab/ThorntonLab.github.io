---
layout: "../../layouts/BlogPost.astro"
title: "New series on scientific computing skills."
description: "Dependency management, I"
pubDate: "February 1, 2023"
draft: false
tags: ["dependency management", "reproducibility"]
---

I'll be starting a new blog series on topics related to scientific computing skills.

I teach part of a graduate course called "Advanced Bioinformatics".
My part of the course is really more about how to go about "reproducible research" for computational biology.

I will use these posts as a place to collect my thoughts.
The plan is that I'll assign these posts as readings in the next iterations of the class.
Eventually, I will aggregate them into an open-source "book" that will live online.

I will be addressing the following topics:

* The importance of environment isolation.
* Different tools for isolating your working environments:
  * [conda](https://conda.io)
  * Python [virtual environments](https://docs.python.org/3/library/venv.html)
  * [packrat](https://rstudio.github.io/packrat/)
  * Virtual machines such as [VirtualBox](https://www.virtualbox.org/)
  * [Docker](https://docker.com)
  * [distrobox](https://github.com/89luca89/distrobox)
  * [singularity](https://sylabs.io/) for deploying things to HPC systems.
  * etc.

I'll try to address the pros and cons of various methods.
The goal is to give students a flavor of what is possible and to let them find their own way to work productively.
