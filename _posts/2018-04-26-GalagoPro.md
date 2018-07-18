---
layout: post
title:  "Galago Pro: first impressions"
date:   2018-04-26
author: Kevin Thornton
categories: hardware
---

# System76 Galago Pro

These are my thoughts on the [System 76](http://www.system76.com) Galago Pro, which is best described as their "MacBook
Air".  It is a 13" high-DPI display in a machine weighing about 3lbs.

# Background

I last used a Linux laptop in 2000 or thereabouts.  Since then, I've had a series of Apple laptops, including several
MacBook Pros.  I currently have a 15" 2015 MB Pro.  It is an excellent machine, and the best Apple laptop I've owned.
It is also incredibly expensive, with my config pushing $3,000US.

My day to day work is mostly writing code, writing documents, or writing emails.  The main tools I use are:

* [neovim](http://neovim.io)
* [R](http://r-project.org)
* [Python](http://www.python.org), [iPython](http://www.ipython.org), [Jupyter](http://www.jupyter.org) and [Jupyter lab](https://github.com/jupyterlab/jupyterlab).
* [Inkscape](http://www.inkscape.org)
* The Chrome web browser.  I use [paperpile](http://paperpile.com) for reference management, which is a Chrome plugin.

That list hides a lot.  My typical day involves a lot of gcc and/or clang, and probably some LaTeX.

One problem with using Chrome for email and reference management is that it is CPU-hungry, which means power-hungry.

I've had growing frustrations with OS X and Apple over the years.  Briefly:

* Keeping the Xcode clang at an older version is painful.  Overall, my opinion is that the ecosystem for developing open-source software on
  OS X is degrading with time.
* Doing things like possibly wiping /usr/local at major releases is really painful.
* The ethics of these essentially one-piece soldered-together laptops and iMacs is starting to bug me.
* I have a problem looking at Retina displays for too long.  I spent nearly a year almost unable to work due to constant
  nausea.  The solutions involved a lot of changes to ambient lighting, changing default white points, getting special
  glasses, etc.
* Killing off Aperture was not fun.  It was truly good software.  Darktable works OK on OS X, but there are some UI
  issues due to the different mouse/trackpad model on OS X vs Linux.  Lightroom's subscription model is unnacceptable,
  and Darktable has more features out-of-the box, too.
* I have yet to talk to someone who likes the current MacBook Pro line.  That keyboard seems to be driving folks nuts.
  I have RSI issues. The keyboard matters to me, which I'll talk about below regarding the Galago Pro.
* Phones no longer really talk to computers.  Way back when, you used to sync your music to your machine, etc.  It seems
  those days are over, so what do I need Itunes for anymore?
* The've killed off the MagSafe charger, which is the best idea in portable computing, probably ever.
* Some Unixy apps are not fully-powered on OS X.  Inkscape is one. The Mactex installation doesn't have the right stuff
  to enable LaTex rendering in Inkscape. (If it does, it seems really hard to figure it out...)  I've spent a lot of
  time making a figure via X forwarding from Linux, rendering the LaTex there, then rsync-ing the file to my OS X
  machine for final edits. That's not a great work flow.  Darktable and Gimp also suffer on the Mac--their command-line
  tools are not readily accessible.  The load time for Gimp is dreadful, too.

With MS office available "free" now at my institution, and runnable from the cloud, the only application that I think
I'll miss is Keynote.

# Update, July 18, 2018

The Hi DPI monitor is at first a bit "funny" for applications using GTK2.  Specifically, the icons are tiny when using
GIMP and Inkscape.  Although it is two mouse clicks to change into Lo DPI mode, it is discombobulating to have your apps
resizing.  Fortunately, this issue is easy to solve:

1. Install Gimp 2.10 via an unofficial PPA for Ubuntu 18. Details [here](https://itsfoss.com/gimp-2-10-release/).
2. Install the "trunk" (development) version of Inkscape.  Details
   [here](https://www.reddit.com/r/linux/comments/79yzvk/tip_inkscape_on_hidpi_displays/).

Also, Gimp 2.10 is an amazing update.  It is much faster, and there are tons of new features.  See [Davies Media
Design](https://www.daviesmediadesign.com/)'s excellent tutorials for details.

# TL;DR

For the impatient: this is a fantastic machine.  Great configurations available at a big range of price points.  Small,
portable.  Linux has evolved a huge amount since the early 2000s, and Pop OS feels very well thought out.  I cannot wait
to get my Ubuntu desktop set up this summer.

The deal-breaker for some would be the sub-par battery life.


# The machine

* 32Gb Ram
* 0.25Tb PCI2 system HD
* 1.0Tb NVMe second drive.

The machine comes out to about $2,000US.  This is more hardware than a MB Pro for much less.  If you don't get the fancy
hard drives, you can get the same storage for something in the $1,300-1,400US range.  Same RAM, too, btw.


## The screen

I'm sensitive to eye strain.  After several days of use, this screen is good for me.  I'm using solarized dark for the
Gnome terminal, and 256-color solarized light for my neovim theme.  Usually, I'd prefer the light theme for the
terminal, but for some reason the dark is working better for me.

I may eventually change the default white point to be a bit more yellow.  We'll see.

There is a "night mode" (think f.lux or OS X's built-in Night Shift).  It works quite nicely.

The biggest difference from Apple is in the fonts.  Apple has beautiful fonts.  Linux has good fonts.  That matters a
lot to some people.

## The keyboard

Slightly "squishy", but not bad at all.  The only oddity is that it is "PC-like", meaning that there's Function key
where left Ctrl "should be".  I'm about 90% used to it.  The main key area is about the same size as on the MB pro.

I remapped CapsLock to Esc, of course.  

I'm not in the best position to judge right now, as RSI is flaring up.  I wish I could have a split mechanical keyboard
on all machines at all times.


## The track pad

It is fine. Two button with limited gesture support.  I've tried using touchegg to enable more gestures, but to no
avail. Either I'm doing something wrong or what I'm trying cannot be done.  Touch pad gestures is an area where Apple is
an industry leader.

## The battery

This is the weak point for Linux laptops.  I'm guessing it'll be five hours on a light day. When compiling a lot, it'll
be less.  Also, when writing C/C++/Python code, I have the [YouCompleteMe](https://valloric.github.io/YouCompleteMe/)
plugin running, which runs an LLVM-based code completion engine in the background.  Yes, that is as awesome as it
sounds, but it definitely uses CPU in the background.

The charger is smaller and lighter than most Apple chargers.  It works as advertised.

Perhaps oddly, [tlp](https://www.tecmint.com/tlp-increase-and-optimize-linux-battery-life/) is not installed by default.
The [support page](http://support.system76.com/) notes this, and discusses battery life in some detail.

The short battery life will bug a lot of folks.  I'll see how I feel in a year. I'm too tall to use a laptop on a plane,
etc., and so I'm rarely far from a plug.

# Pop OS

There are lots of reviews online.  They generally like it.  I like it.  I cannot really compare it to stock Gnome or the
Ubuntu desktop, but Pop is well put together.  Most settings are easy to find.  The packages are nice and current. GCC7
is the default compiler, and it found some bugs for me instantly.  Their [support page](http://support.system76.com/) has a lot of nice hints.

# Some wacky things

* The 1Tb second drive doesn't auto-mount.  The "Disks" application finds it for me.  When I need it, I'll
  get around to making an entry in /fstab.  To be fair, this is addressed in their nice [support
  page](http://support.system76.com/).
* cp and rm are not aliased to their safer versions.  Common, but kinda funny, IMO.

# Google Drive integration

Google, in truly lame fashion, do not have a syncing app like they do for other platforms. One can use Nautilus to
browse your Google Drive. That's fine, but I like to be able to do terminal stuff for some of what's on my Drive.  On my
servers, I use the Golang [drive](https://github.com/odeke-em/drive) command-line app, and I imagine I'll be using it a
lot on this laptop, too.

# Digital photography

I use [darktable](http://darktable.org) and [gimp](http://gimp.org) for digital photography.  I have a Sony APS-C DSLR
and a full-frame mirrorless.  I was able to import directly from the mirrorless camera, set to "Auto" mode for USB
connectivity, using Darktable.  This is something I am unable to do on OS X, where I have to set the camera to "mass
storage" and import with OS X's Image Capture application.  Of course, Lightroom works just fine on OS X for importing,
but I'm not a fan of that software.

* exfat-fuse required to mount the funny format used via the SD card.  After that, direct import into Darktable worked.

# Libre Office

I have not played with this yet. I really like Keynote on OS X.  I typically really dislike making slides using
LaTeX/Beamer. (Google Images searches for "Beamer slides" make me sad.) I'll definitely give Libre a shot, but I expect to need to have an Apple around to prep slides for
teaching as well as get better at Beamer.
