---
layout: ../layouts/BaseLayout.astro
header: ../components/BaseHead.astro
title: 'Software'
author: the Thornton Lab
date: "Nov 16 2022"
---

# Software from the Thornton lab

## GitHub accounts


* [Kevin Thornton](https://github.com/molpopgen)
* [Thornton Lab](https://github.com/ThorntonLab)
* [Forward Simulation](https://github.com/ForwardSimulation)
* [tskit.dev](https://tskit.dev)

## Software projects

The list below is mostly related to code resulting from publications.  There is a lot of other code available from GitHub accounts associated with lab members:

### Simulation software

* [fwdpy11](https://molpopgen.github.io/fwdpy11) is a powerful Python environment for forward-time simulation.  It uses [fwdpp](http://molpopgen.github.io/fwdpp) as its back-end.

* [pylibseq](http://github.com/molpopgen/pylibseq) is a Python interface to libsequence that can be used to analyze
  output from [msprime](http://github.com/tskit-dev/msprime) and [fwdpy11](http://molpopgen.github.io/fwdpy11).

* [ABCreg](https://github.com/molpopgen/abreg) is a tool for performing statistical inference via approximate Bayesian computation, or ABC.  The software was first described [here](http://www.biomedcentral.com/1471-2156/10/35).

### Rust crates

* [tskit-rust](https://docs.rs/tskit) is a rust interface to [tskit](https://tskit-dev). In addition to the API reference, there is also a [book](https://tskit-dev.github.io/tskit-rust).
* [demes-rs](https://docs.rs/demes) is a rust implementation of 
the [demes](https://doi.org/10.1093/genetics/iyac131) standard.
  See [here](https://popsim-consortium.github.io/demes-spec-docs/main/introduction.html) for more about demes.
* [demes-forward-rs](https://docs.rs/demes-forward) provides an API for forward-time traversal of demes graphs.
* [demes-forward-capi](https://docs.rs/demes-forward-capi) defined a C API allowing C/C++/etc. access to `demes-forward`.
* [forrustts](https://docs.rs/forrustts) refines ideas that began with [fwdpp](http://molpopgen.github.io/fwdpp) and will eventually completely replace that project.

### C++ software libraries

* [libsequence](https://molpopgen.github.io/libsequence) is a C++ software library for evolutionary genetic analysis.  The citation for this work is a [paper from 2003](http://bioinformatics.oxfordjournals.org/content/19/17/2325.short)

* [fwdpp](http://molpopgen.github.io/fwdpp) is a C++ template library for developing forward-time simulations under population- and quantitative- genetic models.  I published a description of the library in [Genetics](http://www.genetics.org/content/198/1/157.abstract).


### Retired software

The following tools are no longer maintained and are unsupported.  Most have been superceded by better tools, either by
us or by others. They are listed here because they have been used in papers, and so we keep the code available for
archival purposes. 

* [Code](https://github.com/molpopgen/newgene) for simulating a neutral coalescent process for copy-number variants that I used in [Thornton 2007](http://www.genetics.org/content/177/2/987.abstract)

* [Code](https://github.com/molpopgen/sweepsims) from [Thornton and Jensen (2007)](http://www.genetics.org/content/175/2/737.abstract). This code simulates a sweep in a bottlenecked population, plus the ancestral population. See paper for details. 

* [Code](https://github.com/molpopgen/sweepsims) for models of recurrent hitch-hlking used in [Jensen, Thornton and Andolfatto (2008) PLoS Genetics](http://www.plosgenetics.org/article/info%3Adoi%2F10.1371%2Fjournal.pgen.1000198)

* [msstats](https://github.com/molpopgen/msstats) processes the output of coalescent simulations and calculates various summary statistics

* [omega](https://github.com/molpopgen/omega) Calculates Kim and Nielsen's (2004, Genetics 167:1513) "omega_max" statistic which was explored in Jensen et al. (2007, Genetics 176 2371-3279). Please read the source code for documentation. Both Kim and Nielsen and Jensen et al. should be cited if this code is used--the first for the statistic, the latter for the implementation.

* [msld](https://github.com/molpopgen/msld) calculates LD-related statistics from the output of simulations using the same format as Hudson's ms.

* [analysis](https://github.com/molpopgen/analysis) programs for the (pre-NGS-era) analysis of population-genetic data.

* [sequtils](https://github.com/molpopgen/sequtils) is a set of tools for manipulation of (pre-NGS-era) sequence data. (Probably only for old folks at this point in time...)

