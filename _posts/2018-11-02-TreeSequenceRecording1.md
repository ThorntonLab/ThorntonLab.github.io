---
layout: post
title:  "Tree sequence recording with fwdpy11"
date:   2018-11-02
author: Kevin Thornton
categories: simulation
---

# Tree sequence recording

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
import libsequence.variant_matrix
import libsequence.summstats

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


# Parameters of the optimim shift.
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


# Go over ancient samples and get Tajima's D from neutral
# variants.  We send data from fwdpy11 to libsequence
# (via pylibseq) for the calculations.
D = []

# Rec now contains (time, node 1, node 2) records 
# for all preserved diploids
rec = np.array(pop.ancient_sample_records, copy=False)
ut = np.unique(rec['time'])
for i in ut:
    w = np.where(rec['time'] == i)
    nodes = np.stack((rec['n1'][w[0]], rec['n2'][w[0]]), axis=1).flatten()
    dm = fwdpy11.ts.make_data_matrix(pop, nodes, True, True)
    nvm = libsequence.variant_matrix.VariantMatrix(
        np.array(dm.neutral, copy=False), np.array(dm.neutral.positions))
    rs = np.sum(np.array(dm.neutral, copy=False), axis=1)
    ac = nvm.count_alleles()
    d = libsequence.summstats.tajd(ac)
    D.append(d)

# Finally, let's pickle the population to a file
with lzma.open("pop.lzma", 'wb', preset=9) as f:
    pickle.dump(pop, f)
```
