---
title: "Kubernetes and Docker: to command or not to cmd ?"
author: "Lino Layani"
date:
lastmod: 2025-01-01T13:19:15-06:00
draft: true
summary: ""
tags: ["kubernetes", "docker", "cmd", "entrypoint"]

cover:
  image: "/posts/2023/docker-and-kubernetes-dont-do-this-mistake/images/1.jpeg"
---

When working with containers in Kubernetes, you should be careful not to mix up Kubernetes `command` and Docker `cmd`.

> TL;DR  
> `entrypoint` and `cmd` are Docker notions.
> `command` and `args` are Kubernetes notions.
> `entrypoint` or `command` define the system call at the startup of the container.
> `cmd` or `args` define the arguments of the system call.
