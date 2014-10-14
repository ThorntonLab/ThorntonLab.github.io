#!/bin/bash

#Process the header
pandoc -S -s -c pandoc.css header.md -o header.html

# cd Data

# for i in *.md
# do
#     n=`basename $i .md`
#     echo processing $i
#     pandoc -S -s -c ../pandoc.css -H ../header.html -o $n.html $i
# done

# cd ../software

# for i in *.md
# do
#     n=`basename $i .md`
#     echo processing $i
#     pandoc -S -s -c ../pandoc.css -H ../header.html -o $n.html $i
# done


cd markdown

for i in *.md
do
    n=`basename $i .md`
    echo processing $i
    pandoc -S -s -c ../pandoc.css -H ../header.html -o ../$n.html $i
done

#cd ..


cd ../blog

for i in *.md; 
do
    echo "processing $i"
    n=`basename $i .md`
    pandoc -S -s -c ../pandoc.css -H ../header.html -o ./$n.html $i	
    #git add ./${i//md/html}
done

cd ../coding

for i in *.md; 
do
    echo "processing $i"
    n=`basename $i .md`
    pandoc -S -s -c ../pandoc.css -H ../header.html -o ./$n.html $i	
    #git add ./${i//md/html}
done

#git commit -am "update"; 
#git push
