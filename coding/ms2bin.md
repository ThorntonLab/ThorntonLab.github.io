#Example: writing data in a binary format

I recently wrote a [tutorial](https://github.com/molpopgen/BigDataFormats) on computational techniques for "big data".  It covers moving beyond large ASCII files to gzip and/or binary format.  For this post, I cover a concrete example of re-writing data data into a gzipped binary format.

##The data
The input data are the output of Hudson's [ms](http://http://home.uchicago.edu/~rhudson1/source/mksamples.html), a widely-used coalescent simulation program.

A typical "ms" output looks something like this:

```
//
segsites: 5
positions: 0.1145 0.4935 0.6554 0.8684 0.9145 
00101
10111
00111
00111
01000
```

In this example, there are 5 mutations with positions on the half-open interval [0,1).  There are then 5 haplotypes.  For each haplotype, 0 is the ancestral state and 1 is the derived (mutant) allele.

We can write this data in a more compact format like this:

```
5 5
0.1145 0.4935 0.6554 0.8684 0.9145
2 2 4
4 0 2 3 4
3 2 3 4
3 2 3 4
1 1
```

The first two numbers are the number of mutations and sample size, respectively.  These are unsigned integers.  There are then 5 floating-point values representing mutation positions.  Finally, there are 5 lines, one per haplotype.  Each haplotype line contains the number of derived mutations on that haplotype, followed by the indexes (numbers from 0 to 4, the total number of mutations) where each derived mutation is found.

##Using libsequence

This is how to convert such data using routines already present in [libsequence](http://molpopgen.github.io/libsequence):

<script src="https://gist.github.com/molpopgen/419aab1b84241ec61b61.js"></script>

##A standalone version

We can, of course, write a program to do the conversion that only depends on the [zlib](http://zlib.net) library.  It is much longer, though, and the functions are not as reusable unless we copy/paste the code around.  However, this example shows us the mechanics of binary writing to streams in C++:

<script src="https://gist.github.com/molpopgen/ae23fa55e6bccfb33c60.js"></script>