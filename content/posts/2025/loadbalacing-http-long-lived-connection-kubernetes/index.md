---
title: "Loadbalancing long lived HTTP connections in Kubernetes"
author: "Lino Layani"
date:
lastmod: 2025-01-11T18:35:02.510Z
tags: [Kubernetes, Secret, Reloader, EKS]
draft: true
summary: Kubernetes doesn't load balance HTTP long lived connections out of the box.
# cover:
#   image: "/posts/2025/kubernetes-secret-reloader/images/1.png"
#   alt: "Kubernetes Secret Reloader"
---

# The context

One part of our infrastructure is the edge. It's the part that delivers ads. This part is a high volume, low latency type of system: ads are to be delivered fast.

To keep up with the demand, our microservices are

Our microservices are running HTTP long lived connections on ECS. Migrating to EKS

# Understanding the challenge of load balancing long lived connections on Kubernetes

https://learnkube.com/kubernetes-long-lived-connections

# The temporary solution: introducing a load balancer between the 2 microservices

# Exploring solutions

- client load balancer
- server load balancer
- service mesh

# Thinking outside of the box

Introducing a middleware that drops the connection after X requests.

++: do what is supposed to do

--:

# Final thoughts

Results:

- replace the need of a load balancer
