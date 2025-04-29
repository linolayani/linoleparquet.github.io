---
title: "Kubernetes: Why is my namespace stuck in Terminating"
author: "Lino Layani"
date:
lastmod: 2025-01-11T18:35:02.510Z
tags: ["Kubernetes"]
draft: true
summary: ""

cover:
  image: /posts/2025/operating-services-in-china/images/wall-china.webp
  alt: "What happens when you type test.webiste.com in your browser ?"
---

Picture this: You're tasked with deploying a complex application on Kubernetes: cutting edge technology, containing CRDs all over the place with subtile specs, stateful-operator based app. In short, things can go wrong in so many directions XX. You play it safe, and work within a newly created namespace: if anything, I can delete the namespace and restart from scratch you think.

# 1/ Finalizer

Finalizers, you little trouble makers. But also part of the magic of our beloved platform.

> Finalizers are namespaced keys that tell Kubernetes to wait until specific conditions are met before it fully deletes resources marked for deletion. Finalizers alert controllers to clean up resources the deleted object owned.

# 2 / APIService

The namespace controller must verify all registered API types are cleaned up before it can safely permit a namespace to be deleted. Deleting a backing service for an APIService without removing the APIService objects is a usage error. It's not generally safe for the controller to assume that it can delete APIService objects (you could be recreating or relocating the service, and the data would appear again when you did)

# 3/ mutatingwebhookconfiguration & validatingwebhookconfiguration
