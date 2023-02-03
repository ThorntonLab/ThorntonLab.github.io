---
layout: "../../layouts/BlogPost.astro"
title: "Running software in isolation"
description: "Intro to environment isolation"
pubDate: "February 1, 2023"
draft: true
tags: ["dependency management", "reproducibility"]
---

## Motivating examples

Let's begin with examples of challenges that a computational biologist might face:

### A new version just came out!

You are partway through an analysis of a large data set.
Your analysis requires `toolX`, which is the "go-to" software in your field for this kind of analysis.
The author of `toolX` announces a new version on social media.
Buried in a long thread about the new release, the author reveals that "results with the new version may differ a lot from what the old version gave".
In addition, several other tools that `toolX` require will also need to be updated in order to use the new version.    

### "It works for me!"

You are trying to use `coolpythonthing` for part of your analysis pipeline.
The documentation suggests that it works on your platform.
There's even a package on [PyPi](https://pypi.org/), the official repository of Python packages, which seems to give the package some extra credibility.

Great, you install it and try to import it:

```py
import coolpythonthing
```

You see lots of error messages.
They seem to say that some required things are missing.
From the error messages, you aren't sure that Python things are missing or something else.

You file an issue on the package's [GitHub](https://www.github.com) page and describe your problem.
The author replies, "No idea, it works for me!", and closes the issue.

A variant of "it works for me" happens within research groups all the time:

* You and a lab mate both bought the same model of laptop at the same time.
* You are collaborating on a data analysis.
* You write an [R](https://www.r-project.org) script to do some of the analysis.
* It works, so you email the file to your lab mate.
* They get errors when they try to run it.

## Software is hard

The title of this section explains why one runs into the kinds of issues described above.
For a variety of reasons, software is hard to write, hard to test, hard to install, hard to document, etc..

In many sub disciplines of biology, scientists writing software are not trained how to do so.

Notes:

* Probably not good to hammer on the meme that biologists are bad at coding.
  Same pessimism, not productive.
* Rather, focus on what we can do to teach PhD students how to do better.
* This series is about how to properly manage software.
* One way to do that is isolation.

## What is causing the problem?

## Isolation is one solution

## When isolation may be overkill
