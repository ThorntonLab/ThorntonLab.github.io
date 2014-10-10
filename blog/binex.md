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

Each record starts with the two slashes and then is followed by a line telling you how many "segregating sites" (polymorphisms) there are, then the mutation positions, and then one line per haplotype.  For each haplotype, 0 is the ancestral state, and 1 is the derived.

The goal is to have a standalone program that reads in these data from stdin and writes them to a binary-format file.  Further, we will compress the binary-format file uzing the [zlib](http://zlib.net) library.

For simplicity, we won't cover how to read in those data from stdin, as it is fairly trivial.  We'll focus instead on the mechanics of writing to binary in C++.

##Background: converting a single data type to binary

The ingredients that you need are:

1. An output stream that supports a member function called write for "manually" writing blocks of data. See [std::ostream](http://www.cplusplus.com/reference/ostream/ostream/) for an example.
2. The data to write.  This could be a double, int, vector of something, etc.

To write an object of type double in binary format to a buffer:

~~~ {.cpp}
#include <fstream> //header for file I/O

//Open a file called out.bin for binary writing
std::ofstream outfile("out.bin", std::ios_base::out | std::ios_base::binary);

//declare some data
double x = 1.0;
outfile.write( reinterpret_cast<char*>(&x), sizeof(double) );
~~~~~~~~

In words, conversion to binary works by writing the data to character buffer.  The conversion works via a pointer to the data (&x) and the sizeof(type) call tells us how big the data are.

If you have data in a std::vector, then you may write the contents of vector to a file in one of two ways:

1. By directly accessing the vector's internal buffer via the [data](http://www.cplusplus.com/reference/vector/vector/data/) member function.  This only works in c++11.
2. By accessing the internal buffer via a pointer to the first element of the vector.  This is the classic way suggested by Scott Meyers.

These methods look like this:
~~~ {.cpp}
#include <vector>
#include <fstream>

using namespace std;

int main(int argc, char **argv)
{
  vector<double> x{1.,5.,10.};

  ofstream out("out.bin",ios_base::out|ios_base::binary);

  //C++11 version:
  out.write( reinterpret_cast<const char *>(x.data()),x.size()*sizeof(double) );
  //"classic" version:
  out.write( reinterpret_cast<char *>(&x[0]),x.size()*sizeof(double) );
}
~~~

##Converting the "ms" data to a binary format

The "ms" data shown above have the following structure:

1. $S$ positions, stored as floating-point values
2. $n$ strings of length $S$ each

Let's assume that we can store the data in the following C++ objects:

~~~~ {.cpp}
//The positions
std::vector<double> positions;
//The haplotypes
std::vector<std::string> haps;
~~~~~~~

