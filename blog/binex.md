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

Let's write a program to read in the above data, and output it in a binary format.  Our program will read in the records from the standard input stream (stdin) and write the output to a file.

##Step 1: reading the data.

###Using libsequence

This example will be completely standalone.  In practice, however, it is more effective to make use of existing libraries, like [libsequence](https://molpopgen.github.io/libsequence).  Reading in "ms" data using that library is trivial:

~~~~ {.cpp}
#include <Sequence/SimData.hpp>
#include <iostream>

int main( int argc, char ** argv )
{
	Sequence::SimData d;
	while(! std::cin.eof() )
	{	
		std::cin >> d >> std::ws;
		//Now, we can do something interesting with d
	}	  
}
~~~~~~~

###A standalone function

This function will read in the data from stdin, and return the following:

1.  A vector of the mutation positions
2.  A vector of strings containing the haplotypes


~~~~~ {.cpp}
#include <vector>
#include <string>
#include <iostream>
#include <utility>

std::pair<std::vector<double>, std::vector<std::string> >
readMS( std::istream & in )
{
  
  std::string temp;
  std::getline(in,temp); //read the "//"
  unsigned S;
  in >> temp >> S;
  //reads in the segsites line, through the positions: string
  if( !S ) return std::make_pair(std::vector<double>(), std::vector<std::string>());
  in >> temp >> std::ws; 
  std::vector<double> pos(S);
  for( unsigned i = 0 ; i < S ; ++i )
    {
      in >> pos[i] >> std::ws;
    }
  //Read in the haplotypes until the next // and the stream is still ok
  std::vector<std::string> haps;
  while( in.peek() != '/' && !in.eof() && !in.fail() ) {
    in >> std::ws;
    getline(in,temp);
    in >> std::ws;
    haps.emplace_back(temp);
  } 

  return std::make_pair(pos,haps);
}
~~~~~~~~~

###Converting the output to binary

~~~ {.cpp}
void writeMSbin( std::ostream & o,
		 const std::pair<std::vector<double>, std::vector<std::string> > & msdata )
{
  //Typedefs for sanity
  using UINT = std::uint32_t;

  //Step 1: write out the number of mutations and the sample size
  UINT S = msdata.first.size(),
    nsam = msdata.second.size();
  o.write( reinterpret_cast<char *>(&S),sizeof(UINT) );
  o.write( reinterpret_cast<char *>(&nsam),sizeof(UINT) );

  //Write the mutation positions
  o.write( reinterpret_cast<const char *>(&msdata.first[0]),S*sizeof(double) );

  //Step 2: write out the positions of each of those '1's
  for( auto h : msdata.second )
    {
      UINT nones = std::count(h.begin(),h.end(),'1');
      o.write( reinterpret_cast<char*>(&nones),sizeof(UINT) );
      //find all the 1s in this string
      auto one = h.find('1');
      while( one != std::string::npos ) {
	//enter position of the derived mutation
	o.write( reinterpret_cast<char*>(&one),sizeof(UINT) );
	//search again starting at next place in string
	one = h.find('1',one+1);
      }
    }
}
~~~