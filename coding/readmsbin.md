#Reading binary data in R

In [R](http://www.r-project.org), you can read binary data using the [readBin](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readBin.html) function and write it with [writeBin](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readBin.html).

In a previous [post](ms2bin.html), I showed how to convert data from the coalescent simulation program [ms](http://http://home.uchicago.edu/~rhudson1/source/mksamples.html) to a more compact compressed format.

The following R code shows how to use readBin to read in the first record of such data:

<script src="https://gist.github.com/molpopgen/9e8f7ab2711ab751420e.js"></script>