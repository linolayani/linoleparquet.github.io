---
title: "Kubernetes and Docker: to command or not to cmd ?"
author: "Lino Layani"
date:
lastmod: 2025-01-01T13:19:15-06:00
draft: false
summary: "Containerization is confusing. Even more when two of the most successful projects on the subject share a term that has 2 separated definition."
tags: ["kubernetes", "docker", "cmd", "entrypoint"]

cover:
  image: "/posts/docker-and-kubernetes-dont-do-this-mistake/images/1.jpeg"
---

When working with containers in Kubernetes, you should be careful not to mix up Kubernetes `command` and Docker `cmd`.

> TL;DR  
> `entrypoint` and `cmd` are Docker notions.  
> `command` and `args` are Kubernetes notions.  
> `entrypoint` or `command` define the system call at the startup of the container.  
> `cmd` or `args` define the arguments of the system call.
