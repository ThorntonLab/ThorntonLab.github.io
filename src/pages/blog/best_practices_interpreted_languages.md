---
layout: "../../layouts/BlogPost.astro"
title: "Simple steps to improve the reproducibility of Python and R code"
description: "Dependency management, I"
pubDate: "February 1, 2023"
draft: true
tags: ["reproducibility", "python", "rstats"]
---

For code to aid in making our research more reproducible, the code has to be *runnable*.
It is not uncommon that code associated with a paper doesn't "just work".

This post describes some simple things to help make sure that your code will "just work".
This post about analysis code that goes along with a paper as opposed to a new Python or R
package.
The former is often a one-off that will live on GitHub and is unlikely to be maintained or updated.
The latter is intended to be a new tool for others to use and the expectations that it does indeed work are higher and beyond the scope of this post.

We focus on Python and R because both are very popular languages for these types of projects.

## Include all imports

A common issue is that code doesn't include all the libraries that it needs in order to execute.
This error may arise when code is developed in a terminal environment (including IPython and RStudio).
The "meat" of the code that does the heavy lifting may be copy-pasted into a standalone file and then sent to GitHub, emailed to a collaborator, *etc.*.
The code will fail to run because it doesn't bring required libraries into scope:

```python
filtered_data = np.array([i for i in input_data if filter_criterion(i) is True])
```

We get a Python `NameError` stating `name 'np' is not defined`.
For someone not well-versed in Python, this error is perplexing:

* It is not immediately obvious that `np` refers to a package that needs importing.
  The same syntax could refer to a function tied to a variable called `np`.
* The name `np` here refers to the [numpy](https://numpy.org/) package.
  It is a tradition in Python to import this package with the alias `np`.
  There is no chance that someone new to Python will know this.

The solution is simple: make sure all of your imports are declared:

```python
import numpy as np

filtered_data = np.array([i for i in input_data if filter_criterion(i) is True])
```

In R, make sure all required `library()` statements are present at the top of a source file:

```r
library(dplyr)
```

Forgetting these statements will lead to an error message, `could not find function "foo"`.
This message is not helpful.  Is `foo` defined in another source file that you provide? 
Should the user worry that that file may be missing from your repository?

Making sure to get your imports right not only makes your code correct, it also gives more helpful errors if the required packages are not on a user's machine.

## Define the dependencies

Your user will need the imports discussed above on their system.
Help them out and tell them what they are.

### Python: include a requirements.txt file

The idiomatic thing to do with Python is to list your dependencies in a file called `requirements.txt`.
These files are very simple to write and should be included in your GitHub repository.
The file is just a list of packages that your code needs:

```
numpy
```

It is not a bad idea to "pin" the various packages to the version numbers that you used:

```
numpy==1.23.0
```

Using an interactive Python shell, you can find out the version of most installed packages like this:

```py
import numpy as np
np.__version__
```

From the terminal, you can also use `pip freeze` and `grep` for the names of the packages you need:

```sh
# The >> appends the output to the requirements.txt file
pip freeze | grep numpy >> requirements.txt
```

(Don't include all the `pip freeze` output!
That is the nuclear option and often isn't the right thing to do.)

### R

R doesn't have a tradition of writing down dependencies in a `requirements.txt` file.
Rather, you should list them in the `README.md` file that is in your GitHub repository:

```markdown
# Dependencies

In order to work, the following packages mush be available:

* dplyr
* ggplot2
```

You get bonus points for providing links to the packages and/or describing how to install them.

You may consider using [packrat](https://rstudio.github.io/packrat/) to manage dependencies for projects based on R.
If you use that tool, you can provide the lock file in your GitHub repository.


### Dependencies not part of the language ecosystem

#### Dependencies not on PyPi or CRAN

#### Dependencies written in other languages entirely

## Check that code works in isolation

### What to do with notebooks

## Provide a fake data set?

## Decide on the fate of the code

## Other things for your README file

It is useful to include:

* The version of Python that you used.
  The ecosystem moves relatively quickly, so it helps to alert your user which version you were using.
* The version of R that you used.
* The operating system that you used for your work.
  "This work was done on macOS Catalina."    
* The link to the paper and/or source of the data that the code analyzed.

Main points to get across:

* Put all imports in the script.
  Developing in the REPL means this is often missed.
* Be sure scripts work outside of the REPL.
  For example, test in a venv
* For Python, always provide a requirements.txt.
* For R, packrat?
  Provide the `packrat.lock` file?
  Or [devtools](https://support.posit.co/hc/en-us/articles/219949047-Installing-older-versions-of-packages)
* Prefer dependencies from pypi/cran.
  If you must install from github, try to "pin" to the specific commit.
