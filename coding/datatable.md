#R's data.table package

Never use read.table again!  data.table's fread function is much faster, and you'll appreciate it for large files.

Get the package [here](http://cran.r-project.org/web/packages/data.table/index.html) or use install.packages on your system.

Basic usage:

~~~~ {r}
library(data.table)

x=fread("filename")
~~~~~~~

To read a gzip-compressed text file:

~~~~ {r}
library(data.table)

x=fread("gunzip -c filename.gz")
~~~~~~~~