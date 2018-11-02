---
layout: post
title:  "Tree sequence recording with fwdpy11"
date:   2018-11-02
author: Kevin Thornton
categories: simulation
---

# Tree sequence recording

Today, an article co-authored with Jerome Kelleher, Jaime Ashander, and Peter Ralph appeared in [Plos Computational
Biology](https://doi.org/10.1371/journal.pcbi.1006581).  A preprint on Biorxiv has been up since the beginning of 2018.

The article describes how to use "tree sequences", which are the data structures behind the hyper-efficient coalescent
simulation [msprime](https://msprime.readthedocs.io/en/stable/), to improve the performance of forward-time simulations.
The paper shows that multiple order of magnitude speed improvements are possible.  Additionally, you end up with the
*entire ancestral recombination history* of the population in memory.  This is a game-changer in the field of
computational population genetics.  We are now able to connect the forwards process to the backwards process via tree
sequences.  In essence, the boils down to being able to take the mess of transmission events from a forward simulation
and then, after recording them in the "right" manner, simplify the data down to a proper representation of the ancestral
recombination graph.  (Technically, we are not recording an ARG, but rather something ARG-like.  I'd prefer to call it
an HRG, or Hudson Recombination Graph, as it is closest in spirit to what he did in *ms*, but that term would probably
just confuse everyone, so we'll call it a *nedigree* and be done with it!)

Below is an example of a simulation using [fwdpy11](https://molpopgen.github.io/fwdpy11/) using tree sequences.  An
overview of the model is:

1. Gaussian stabilizing selection for 10N generations of a Wright-Fisher population
2. A sudden shift in the optimal trait value, followed by N further generations of evolution.
3. During the simulation, we randomly sample 50 diploids at various time points.  These individuals are preserved
in the tree.  This preservation is possible because the algorithms described in Kelleher et al are agnostic with respect
to when the nodes existed, meaning that we are able to "simplify" a messy genealogy with respect to any valid set of
nodes.
4. We also record the average trait value and the genetic variance each generation.

(This code requires a development branch of fwdpy11 that is currently a pull request adding tree sequence support.  It'll
be merged "when it is ready".)

The mechanics of a tree-sequence simulation are basically the same as a non-tree-sequence simulation as far as the
Python code is concerned.  We just initialize our population a bit differently and call a different evolve function.

This simulation took a bit under 15 minutes on my desktop, which is an Intel NuC with a core i7 processor (the System76
[Meerkat](https://system76.com/desktops/meerkat) for anyone curious).  In that 15 minutes, 5,000 diploids were
simulated, trait value stuff was recorded, and we end up with an entire ARG/HRG/**nedigree** containing a large number
of 'dead' individuals.  Very cool.  The compressed output file is 121MB. That's not small, but it is *much* smaller than
pre-tree-sequence approaches involving writing samples as you go or writing the entire population out at regular
intervals, etc..  The output file contains the entire simulated population plus the tables describing its tree sequence.

```py
import fwdpy11 as fp11
import fwdpy11.model_params
import fwdpy11.genetic_values
import fwdpy11.ts
import fwdpy11.tsrecorders
import fwdpy11.wright_fisher_ts
import numpy as np
import pickle
import lzma

# Number of diploids
N = 5000

# Pass a "genome length"
# as the second param to the pop.
# This length is used to initialize
# a TableCollection.  Here,
# I'll make the region size equal to
# 11 because of:
# a. Spinal Tap
# b. I'll put all selected mutations
# into the interval [5,6), and neutral
# mutations throughout.  The 11-ness
# lets me make 11 equal-sized windows
# for downstream analysis
pop = fp11.SlocusPop(N, 11.0)

rng = fp11.GSLrng(42)

# need to seed numpy, too, which we don't do rigorously:
np.random.seed(42*42)

# 10 megabases in "humans"
rho = 10000.0
theta = rho


# Parameters of the optimum shift.
# The optimum is 0 with VS=1 starting at generation 0
# After 10N generations, the optimum shifts to 1.0
optima = [(0, 0, 1), (10*N, 1.0, 1.0)]

# Set up model parameters.
# Set up a sim w/no neutral params
# Currently, attempting to simulate
# neutral variant will throw an error b/c
# I've not put some of the requisite tooling
# into the back-end, but that will come soon.
p = {'nregions': [],
     # Variants affecting the trait
     # are ~Gaussian(0,sd)
     'sregions': [fp11.GaussianS(5, 6, 1, 0.25)],
     'recregions': [fp11.Region(0, 11, 1)],
     # Neutral and selected mutation rates, recombination rate
     'rates': (0.0, 1e-3, rho/float(4*N)),
     # Genetic value and fitness  calculations
     'gvalue': fwdpy11.genetic_values.SlocusAdditive(2.0,
                                                     fwdpy11.genetic_values.GSSmo(optima)),
     'prune_selected': False,
     'demography': np.array([N]*11*N, dtype=np.uint32)
     }
params = fp11.model_params.ModelParams(**p)


class CustomSampler(object):
    """
    Marks ancient samples and records some other stuff
    about the pop during a simulation.

    These samplers can be written in C++ or Python.

    The amount of code is basically the same in each
    case...
    """
    def __init__(self, N, nsam, timepoints):
        self.individuals = np.array(np.arange(0, N), dtype=np.uint32)
        self.nsam = nsam
        self.timepoints = timepoints
        self.timepoints.reverse()
        self.mean_trait_value = []
        self.vg = []

    def __call__(self, pop, sampler):
        # Every generation, record mean trait value and the genetic
        # variance.  You may use NumPy to look at properties of the
        # population, which means looking directly at memory
        # allocated on the C++ side.  NO COPIES
        tv = np.array(pop.diploid_metadata, copy=False)
        self.mean_trait_value.append(tv['g'].mean())
        self.vg.append(tv['g'].var())
        if len(self.timepoints) > 0 and pop.generation == self.timepoints[-1]:
            # Randomly choose nsam individuals out of the N
            # to preserve as "ancient samples"
            s = np.random.choice(self.individuals, self.nsam, False)
            sampler.assign(s)
            self.timepoints.pop()


# set up our time points for taking ancient samples
# we will sample sparsely at first, then densley after the 
# shift, and then sparsely again
timepoints = [i for i in range(8*N, 10*N, 500)]
timepoints.extend([i for i in range(10*N+1, 10*N+100, 1)])
timepoints.extend([i for i in range(10*N+100, 11*N, 100)])
ras = CustomSampler(N, 50, timepoints)

# Run it, simplifying every 100 generations
fwdpy11.wright_fisher_ts.evolve(rng, pop, params, 100, ras)

# Add neutral mutations to our TableCollection
# The large number of ancient samples means
# that this takes a few seconds.
nmuts = fwdpy11.ts.infinite_sites(rng, pop, theta/float(4*N))

# Some fun facts:
# We can view the edges and nodes using numpy without making 
# ANY copies from the c++!!!
edges = np.array(pop.tables.edges, copy=False)
nodes = np.array(pop.tables.nodes, copy=False)

# Finally, let's pickle the population to a file
with lzma.open("pop.lzma", 'wb', preset=9) as f:
    pickle.dump(pop, f)
```
