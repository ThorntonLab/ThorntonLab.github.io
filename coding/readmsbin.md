#Reading binary data in R

In [R](http://www.r-project.org), you can read binary data using the [readBin](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readBin.html) function and write it with [writeBin](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readBin.html).

In a previous [post](ms2bin.html), I showed how to convert data from the coalescent simulation program [ms](http://http://home.uchicago.edu/~rhudson1/source/mksamples.html) to a more compact compressed format.

The following R code shows how to use readBin to read in the first record of such data:

<script src="https://gist.github.com/molpopgen/9e8f7ab2711ab751420e.js"></script>

##Why do this?

Reading/writing binary is typically a lot faster than with plain-text data.  Also, you don't lose any precision due to rounding floating-point values, which can be handy.  For R, I think that reading data in this way should be reserved for cases where data frames, etc., are not the best way to represent data.  In the above, example, the 0/1 matrix is great for calculating summary statistics, etc.  However, a lot of your data for R may be better-served by being in a "tidy" format for processing with packages like [dplyr](http://cran.r-project.org/web/packages/dplyr/index.html).  Further, the new [data.table](http://cran.r-project.org/web/packages/data.table/index.html) package reads in files very quickly, and into a data frame-like object.  

Outside of R, there are lots of applications for binary files.  [Bam](http://samtools.github.io/hts-specs/SAMv1.pdf) files are one obvious example, but we find it a very useful way to store the output of simulation, and I imagine that future bioinformatics  projects will use binary formats, too.