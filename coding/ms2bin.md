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

Below, I show you two programs that convert the ms data into the more compact format, which is written in native binary format to a gzip-compressed file.  The compression is done using the [zlib](http://zlib.net) library, which is a C-language library present on virtually every Unix machine.

##The mechanics of writing to binary.

Most (all?) programming languages have some method for binary I/O.  In C, you can use the low-level functions __write__ or __fwrite__.  You can find an example using __fwrite__ [here](http://www.cprogramming.com/tutorial/cfileio.html) and examples using fwrite in the examples folder of my [tutorial](https://github.com/molpopgen/BigDataFormats).

In C++, you a buffer to a stream using the member function [write](http://www.cplusplus.com/reference/ostream/ostream/write/).  Again, you can find examples in mu [tutorial](https://git\
hub.com/molpopgen/BigDataFormats) repo.

##Specifics for this example.

For this example, all integers will be written as 32-bit unsigned integers type.  The specific type is the C++11 type __std::uint32_t__ in the header file [cstdint](http://www.cplusplus.com/reference/cstdint/).  We'll write the mutation positions as doubles, which are 64-bit on most systems.

##Converting ms data using libsequence

This is how to convert such data using routines already present in [libsequence](http://molpopgen.github.io/libsequence):

<script src="https://gist.github.com/molpopgen/419aab1b84241ec61b61.js"></script>

##A standalone version

We can, of course, write a program to do the conversion that only depends on the [zlib](http://zlib.net) library.  It is much longer, though, and the functions are not as reusable unless we copy/paste the code around.  However, this example shows us the mechanics of binary writing to streams in C++:

<script src="https://gist.github.com/molpopgen/ae23fa55e6bccfb33c60.js"></script>

##Using each example

Let's make some output:

```
ms 100 1000 -t 100 -r 100 1000 > msout.txt
```

This command results in a 53Mb plain-text file.

Let's convert them using our two programs:

```
time tail -n +4 msout.txt | ./ms2bin msout1.bin

real 0m5.431s
user 0m9.750s
sys  0m0.039s

time tail -n +4 msout.txt | ./ms2binlseq msout2.bin

real	       0m5.397s
user	       0m9.706s
sys	       0m0.036s
```

If we compress the original msout.txt, we see that the compressed binary files are both a bit smaller:

```
gzip msout.txt 
krthornt$ ls -lhrt msout.txt.gz msout*.bin.gz
-rw-r--r--  1 krthornt  staff   5.7M Oct 14 19:00 msout.txt.gz
-rw-r--r--  1 krthornt  staff   5.5M Oct 14 19:02 msout1.bin.gz
-rw-r--r--  1 krthornt  staff   5.5M Oct 14 19:02 msout2.bin.gz
```

These space savings are modest, but they get much larger when you simulate more and larger replicates.

Next, we'll cover how to read these .bin.gz file back into a C++ program and into R.