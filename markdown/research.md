# Research

We do work in several different areas, all of which fall under the broader topic of population genetics.  We are
interested in developing tools for the analysis of large genomic data sets as well as efficient simulation tools to
enable exploration of complex population genetic models.  The overal goals are to (1) understand the contribution of
structural changes to genome evolution and function, (2) understand the genetics of adaptation, and (3) explore the
interfact of traditional population- and quantitative- genetics theory with an eye towards understanding adaptation and
the genetics of heritable traits, especially human disease.

### Specific areas of interest

#### The intersection of population- and quantitative- genetics

We have been exploring the implications of explicit models of allelic heterogeneity on the study of human heritable
diseases.  A major result from the cloning of single-gene disorders was that there are many different disease-causing
mutations in the population (allelic heterogeneity).  We have been exploring the implications of such heterogeneity for
complex diseases via explicit simulations of the heterogeneity models (1).  Recent results (2) suggest that such models
are broadly compatible with a wide range of observations from human GWAS.  In fact, we show that the heterogeneity model
in fact reconciles seemingly contradictory observations regarding the contribution of non-additive (dominance) variance
to human traits.  We have also estimated parameters of stabilizing selection models on human traits (3).

* (1) [Thornton et al. 2013](http://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1003258)
* (2) [Sanjak et al. 2017](http://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1006573)
* (3) [Sanjak et al. 2018](http://dx.doi.org/10.1073/pnas.1707227114)

Related work includes modeling the adaptation of quantitative traits to changing environments ("optimum shifts").  We
are seeking to understand the dynamics of phenotype adaptation using a framework that doesn't rely on restrictive _a
priori_
assumptions about the number of potential "soft" or "hard" selective sweeps (4).  This work is directly tied in to research
on effective methods for forward-time simulation (5) and the development of a [Python
package](https://molpopgen.github.io/fwdpy11) for running and analyzing such simulations.

* (4) [Thornton 2019](http://dx.doi.org/10.1534/genetics.119.302662)
* (5) [Thornton 2014](http://dx.doi.org/10.1534/genetics.114.165019)

We also actively collaborate with the tree sequence development team, aka, [`tskit-dev`](https://tskit.dev/).
This collaboration has led to:

* New methods for forward-time simulation. [Kelleher et al. 2018](http://dx.doi.org/10.1371/journal.pcbi.1006581
)
* New methods to analyze genetic data, leveraging the relatedness amongst samples. [Ralph et al. 2020](http://dx.doi.org/10.1534/genetics.120.303253
)
* Improved tools for coalescent simulation. [Baumdicker et al. 2020](https://www.biorxiv.org/content/10.1101/2021.08.31.457499v1)

The lab has active and ongoing collaborations with:

* [JJ Emerson](http://emersonlab.github.io), UC Irvine
* [Tony Long](http://wfitch.bio.uci.edu/~tdlong/), UC Irvine
