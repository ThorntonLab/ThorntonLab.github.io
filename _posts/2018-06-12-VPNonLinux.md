---
layout: post
title:  "VPN on Linux"
date:   2018-06-12
author: Kevin Thornton
categories: linux
---

# Getting VPN to work on Linux

This is a short post on getting a reliable VPN connection working on my [Galago Pro]({{ site.baseurl }}{% post_url 2018-04-26-GalagoPro %}).

UCI [encourages](https://uci.service-now.com/kb_view.do?sysparm_article=KB0010201) us to use the Cisco AnyConnect
application.  My experience was not great.  Compared to the OS X version of the same application, the Linux version
attempts to reconnect to the VPN much more often.  Futher, it does so less-than-gracefully, often resulting in lost
connections. (tmux saved my work more than once!)

On Ubuntu, the solution is:

```{sh}
sudo apt-get -f install network-manager-openconnect-gnome
```

This software provides a VPN client compatible with whatever the Cisco application is doing.  On Pop! OS, you can
configure your VPN under the user settings, and it'll even save your password and which VPN connection you want, for the
case where your institution has several options.

