---
title: "Preserving our sanity with Kubernetes Secret Reloader"
author: "Lino Layani"
date:
lastmod: 2025-01-11T18:35:02.510Z
tags: [Kubernetes, Secret, Reloader, EKS]
draft: false
summary: Stop wasting time on manual pod restarts. Use Reloader to keep mounted Kubernetes secrets always up to date.

cover:
  image: "/posts/2025/kubernetes-secret-reloader/images/image.png"
  alt: "Kubernetes Secret Reloader"
---

> **TLDR;**  
> **Reloader** automatically restart pods whenever mounted secrets are updated.

## The secret ingestion workflow

At Hivestack where I work, we store our secrets in AWS Secret Manger.  
With the help of External Secrets Operator (ESO), those secrets flow into our Kubernetes clusters as standard Secret objects and eventually land inside containers, mounted as environment variables.

The workflow looks like this:  
`AWS Secret Manager` -> `ESO` -> `Secret (Kubernetes)` -> `Environment variable`

This setup works perfectly when a secret is created for the first time. But when a secret changes, things get tricky.

## The secret update workflow

**Pods only load a secret’s value into memory at startup**.
So by default, when a secret get updated, the latest value isn't reflected in the pod right away. A restart is required, to trigger the pod's boot sequence, and with it the loading of the new value into memory.

From an operational perspective, it means updating a secret means going through multiples steps:

1. Update the value in the vault
2. Wait for ESO to fetch the latest version
3. Manually restart pods that mount that secret

It’s a complex, manual, and time-consuming process. And no one loves manual work, in the ear of CI/CD and automation. Let's explore what can be improved.

## Enters [Reloader](https://github.com/stakater/Reloader).

After some googling, GitHub browsing, and Stack Overflow digging, we found out about Reloader:

> [Reloader](https://github.com/stakater/Reloader) is a controller _that automatically triggers rollouts of workloads (like Deployments, StatefulSets, and more) whenever referenced Secrets or ConfigMaps are updated._

Reloader has been a life saver for us. It completely **replaces the need for manual pods restart**, thus improving the stability and reliability of our clusters, and preserving our sanities along the way. Thanks to it, our secret update workflow is now much simpler.

Reloader can be installed in various ways, depending on your preference. We chose to go with the helm distribution.

Configuration is ridiculously easy. All we had to do was enabling the `--auto-reload-all=true` feature tag.

## Final Thoughts

We have been using Reloader in production for a few months now, and it's one of theses tools that work so well you forget it exist.

It’s simple, effective, and invisible, in the best way. If your team is wrestling with secret updates in Kubernetes, as we have had in the past, Reloader is well worth trying out.
