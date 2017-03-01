## Software from the Thornton lab

### GitHub accounts

The list below is mostly related to code resulting from publications.  There is a lot of other code available from GitHub accounts associated with lab members:

* [Kevin Thornton](https://github.com/molpopgen)
* [Thornton Lab](https://github.com/ThorntonLab)

### C++ software libraries

* [libsequence](https://molpopgen.github.io/libsequence) is a C++ software library for evolutionary genetic analysis.  The citation for this work is a [paper from 2003](http://bioinformatics.oxfordjournals.org/content/19/17/2325.short)

* [fwdpp](http://molpopgen.github.io/fwdpp) is a C++ template library for developing forward-time simulations under population- and quantitative- genetic models.  I published a description of the library in [Genetics](http://www.genetics.org/content/198/1/157.abstract).

### Simulation software

* [fwdpy](http://github.com/molpopgen/fwdpy) is a powerful Python environment for forward-time simulation.  It uses [fwdpp](http://github.com/molpopgen/fwdpp) as its back-end.

* [Code](https://github.com/molpopgen/newgene) for simulating a neutral coalescent process for copy-number variants that I used in [Thornton 2007](http://www.genetics.org/content/177/2/987.abstract)

* [Code](https://github.com/molpopgen/sweepsims) from [Thornton and Jensen (2007)](http://www.genetics.org/content/175/2/737.abstract). This code simulates a sweep in a bottlenecked population, plus the ancestral population. See paper for details.

* [Code](https://github.com/molpopgen/sweepsims) for models of recurrent hitch-hlking used in [Jensen, Thornton and Andolfatto (2008) PLoS Genetics](http://www.plosgenetics.org/article/info%3Adoi%2F10.1371%2Fjournal.pgen.1000198)

* [msstats](https://github.com/molpopgen/msstats) processes the output of coalescent simulations and calculates various summary statistics

* [omega](https://github.com/molpopgen/omega) Calculates Kim and Nielsen's (2004, Genetics 167:1513) "omega_max" statistic which was explored in Jensen et al. (2007, Genetics 176 2371-3279). Please read the source code for documentation. Both Kim and Nielsen and Jensen et al. should be cited if this code is used--the first for the statistic, the latter for the implementation.

* [msld](https://github.com/molpopgen/msff) calculates LD-related statistics from the output of simulations using the same format as Hudson's ms.

Some older tools (rhothetapost and msld) will arrive when I get time to update them and put them on github.  These tools should just be binned, as there are currently much better ways to do those tasks than my original attempts.

### Tools for data analysis

* [analysis](https://github.com/molpopgen/analysis) programs for the (pre-NGS-era) analysis of population-genetic data.

* [sequtils](https://github.com/molpopgen/sequtils) is a set of tools for manipulation of (pre-NGS-era) sequence data. (Probably only for old folks at this point in time...)

* [ABCreg](https://github.com/molpopgen/abreg) is a tool for performing statistical inference via approximate Bayesian computation, or ABC.  The software was first described [here](http://www.biomedcentral.com/1471-2156/10/35).
