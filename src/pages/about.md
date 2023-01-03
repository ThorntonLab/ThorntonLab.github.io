---
layout: "../layouts/BaseLayout.astro"
title: "The Thornton Lab"
description: "The Thornton Lab at UC Irvine"
date: "Nov 15 2022"
heroImage: "/treeseq.svg"
---

![A graphical representation of a tree sequence.](/treeseq.svg)

# About

We are in the [Department of Ecology and Evolutionary Biology](https://ecoevo.bio.uci.edu/) at [UC Irvine](https://www.uci.edu).

The principal investigator is [Kevin Thornton](https://scholar.google.com/citations?user=NFGMzB0AAAAJ&hl=en&oi=ao).

# Research

We do research in population genetics with an emphasis on computational methods.
Most current work focuses on methods for efficient simulation and applications of such simulations.
Broadly, we are interested in model-based inferences about evolutionary processes.
We develop and apply simulation methods to perform and evaluate such inferences or ask questions about the properties of complex evolutionary models.

For more detail, see our [publications](publications) and [software](software) pages.

Currently, much of our thinking and collaboration revolves around "tree sequences".
We work closely with the "tree sequence toolkit", a.k.a. [tskit](https://tskit.dev) team.

# Information for prospective students

The lab is associated with the following graduate programs:

* The [EEB](https://ecoevo.bio.uci.edu/) departmental program.
* The [program](https://ccbs.uci.edu/education/mcsb/) in Mathematical, Computational & Systems Biology, aka "MCSB".

I strongly encourage prospective students to contact me by email to discuss which program would be most appropriate for them. 

The lab's research is entirely computational.
Ideally, incoming students are comfortable working in a Linux environment and have some familiarity with programming.
Skill with Python programming is particularly important.
We also work with the `R` and `rust` programming languages.

# The graphic at the top

The following Python code generated the graphic at the top of this page.
It shows a tree sequence generated using [msprime](https://tskit.dev/software/msprime.html).
The code is a simple example of the types of simulations that we do for our research.

```python
import msprime

ts = msprime.sim_ancestry(5, recombination_rate=1e-8,
                          sequence_length=1e7, random_seed=42)
ts = msprime.sim_mutations(
    ts, rate=0.5e-7, random_seed=42**2, model=msprime.InfiniteSites())

style = (
    ".node > .lab {font-size: 80%}"
    ".leaf > .lab {text-anchor: start; transform: rotate(90deg) translate(6px)}"
    ".x-axis .tick .lab {text-anchor: end; font-size: 60%}"
)

ts.draw_svg("treeseq.svg", size=(640, 480), style=style)
```

