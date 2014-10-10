#Concrete example of binary output

I've written a [tutorial](https://github.com/molpopgen/BigDataFormats) of sorts on programming methods for so-called "big data".  That document is an overview of your options (gzip, binary, etc.) for people who want to move away from dealing with large, plain-text files.  For most people, going from a plain-text file to a gzipped file is a big step, and you have to learn how your favorite programming language supports reading and writing such files.  

While gzipping your large files is a big space-saver, you can gain even more once you realize that your files need not be human-readable.  Rather, you can write them in native binary format, and read them in the same way.  This post covers a specific example of doing that, using the data format of Dick Hudson's "[ms](http://home.uchicago.edu/~rhudson1/source/mksamples.html)" as a concrete example.

##The data format

In plain-text, the output of a typical ms run looks something like this:

```
//
segsites: 5
positions: 0.3203 0.3704 0.6564 0.8152 0.8722 
01100
01110
01100
10000
01101
00000
10000
01100
01100
01110
```

You can find a standalone program to write such data to binary format [here]() and another one using [libsequence](http://molpopgen.github.io/libsequence) [here]().  I suggest that the latter implementation is the preferred one.  It is shorter, simpler, and takes advantages of code re-use via a library.

To compile the standalone version:

```
c++ -std=c++11 -O2 -o ms2bin ms2bin.cc
```

To compile the libsequence version (after installing libsequence):

```
c++ -std=c++11 -O2 -o ms2binlseq ms2binlseq.cc -lsequence
```