##Data

This page lists sequence data, alignments, etc., resulting from lab publications.  A lot of our ouptut is software, which you can find at our [software](software.html) page.

###2014

 * [GFF](https://github.com/ThorntonLab/GFF) files from Rogers _et al._ (accepted) Revised annotations, sex-biased expression, and lineage-specific genes in the _Drosophila melanogaster_ group [G3](http://www.g3journal.org/content/early/2014/10/01/g3.114.013532.full.pdf).  The accession numbers for the RNA-seq data are PRJNA196536, PRJNA193071, PRJNA257286, and PRJNA257287.

 * [Supplementary material](rogers2014.html) from Rogers _et al._ (2014) Landscape of tandem duplication in Drosophila yakuba and Drosophila simulans. Please note: the BED files for D. simulans are based on the w501 reference genome, hosted at Peter Andolfatto’s website. If you plug our BED files into the UCSC browser, you’ll be quite a bit off in terms of coordinates, as they are still using the Begun et al. reference. 

* [Code](https://github.com/molpopgen/baldwin_brown_2014) from Baldwin-Brown, Long, and Thornton (2014) Mol Biol Evol is on Thornton’s github repository. 
 
###2013

* [Simulation code](https://github.com/ThorntonLab/TFL2013sim) and [output](http://devlaeminck.bio.uci.edu//www/Data/ThorntonForanLongPLoSGenetics) from Thornton, Foran, and Long (2013) Properties and Modeling of GWAS when Complex Disease Risk is due to non-complementing, deleterious mutations in genes of large effect. PLoS Genetics 9: e1003258.  __NOTE__: the code is out of date in this repo, and you are better off using the version that is in included with [fwdpp](https://github.com/molpopgen/fwdpp) as an example program. 
 
 * There are several resources from from Cridland, MacDonald, Long, and Thornton (2013) Abundance and Distribution of Transposable Elements in two Drosophila QTL Mapping Resources. Molecular Biology and Evolution. [Manuscript](http://mbe.oxfordjournals.org/content/30/10/2311.abstract).  These resource are: 

__NOTE__ (Nov. 17, 2014): the pipeline code linked to below is being re-implemented.  Please keep track of the [pecnv](https://github.com/molpopgen/pecnv) package, which will integrate our existing CNV-calling code from PE mapping with the TE calling pipeline.  The current "dev" branch of that repo re-implements the presence/absence part of the pipline in a more streamlined manner.  This code will eventually become release pecnv-0.1.4.

 1. [Pipeline code](https://github.com/ThorntonLab/Cridland2013pipeline) for calling TE presence/absence 
 2. [Pipeline code](https://github.com/ThorntonLab/Cridland2013AnnotPipeline) for annotating TE calls 
 3. [Regions of high IBD](https://github.com/ThorntonLab/DGRPmasked) in the DGRP lines 
 4. [A version](http://devlaeminck.bio.uci.edu/tepipeline/line99_example.tar.gz) of the pipeline + an example data set.

###2006

* [Alignments](https://github.com/ThorntonLab/FastX) from Thornton, Bachtrog, and Andolfatto (2006) X-chromosomes and autosomes evolve at similar rates in Drosophila - no evidence for faster-X protein evolution. Genome Research 16: 498-504 

###2005

* [Alignments and annotations](https://github.com/ThorntonLab/ThorntonLong2005MBE) from Thornton and Long (2005) Excess of Amino Acid Substitutions Relative to Polymorphism Between X-Linked Duplications in Drosophila melanogaster. Mol. Biol. Evol. 22: 273-284. This contains the alignments used for summary statistics, and the annotation files compatible with "polydNdS" in my analysis software package. It currently does not contain the files used for McDonald-Kreitman tests, or the analysis of gene conversion between paralogs. For the moment, those are available on request to Kevin Thornton.



