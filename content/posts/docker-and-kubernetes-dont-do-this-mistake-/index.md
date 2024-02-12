---
title: "Docker and Kubernetes: don’t do this mistake !"
author: ""
date:
lastmod: 2024-01-26T13:19:15-06:00
draft: true
description: "When working with containers in Kubernetes, you should be careful not to mix up Kubernetes command and Docker cmd."
summary: "When working with containers in Kubernetes, you should be careful not to mix up Kubernetes command and Docker cmd."
tags: ["kubernetes", "docker", "cmd", "entrypoint"]

cover:
  image: "/posts/docker-and-kubernetes-dont-do-this-mistake-/images/1.jpeg"
  alt: "Docker and Kubernetes: don’t do this mistake !"

images:
  - "/posts/docker-and-kubernetes-dont-do-this-mistake-/images/1.jpeg"
---

When working with containers in Kubernetes, you should be careful not to mix up Kubernetes `command` and Docker `cmd`.

![image](/posts/docker-and-kubernetes-dont-do-this-mistake-/images/1.jpeg#center)

> TL;DR  
> `entrypoint` and `cmd` are Docker notions.  
> `command` and `args` are Kubernetes notions.  
> `entrypoint` or `command` define the system call at the startup of the container.  
> `cmd` or `args` define the arguments of the system call.
