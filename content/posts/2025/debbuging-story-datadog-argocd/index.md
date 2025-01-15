---
title: "Debugging story time: Deploying datadog with ArgoCD"
author: "Lino Layani"
date:
lastmod: 2025-01-11T18:35:02.510Z
tags: ["China", "Infrastructure", "AWS"]
draft: true
summary: ""

cover:
  image: /posts/2025/operating-services-in-china/images/wall-china.webp
  alt: "What happens when you type test.webiste.com in your browser ?"
---

Fresh new installation of EKS. Set up ArgoCD as our CD deployment engine.
Our various datadog client logs dropping traces and metrics frequently: let's investigate.
Noticed datadog's agents, installed as a deamonset, randomly restart after ~15min.

[ gif / datadog / restart ]

First instinct: Check the datadog agent logs => Nothing to declare
Checking the pods events => Noticing readinessProbe marks the pods as unhealthy seconds before the pod exit gracefully. Like any normal devops person, I immediately googled these symptoms. Here come the rabbit hole: Found this github issue.

MEME it wasn't me

> Spoiler alert: this behavior is the consequence of the root cause. Spent WAY TOO MUCH TIME considering it as the root cause.
> Checking the datadog daemonset: Horror, everything looks too normal. Noticing normal looking scale up and scale down, normal No error, no stacktrace, nothing. Only scale up to 1 and scale down to 0.
> This takes too much time. Datadog is a payed product, let's make the most of their support team. Opened a ticket. They have been proven useful in other cases: not this time. After exposing my case, my interlocutor ask me to send flare, and another set of flare, and again another set of flare.
> Times go by. I'm caught with others more urgent projects, leaving this at the support team. Traces keep on dropping, qa team keep on complaining, datadog support team keep on asking more flares.

# The cure/explanation: GitOps, AutoSync, and token

Let's be honest: One of the main reason we love ops is for debugging special, unresolvable problems.
Although I had others project on the loop, I couldn't help but look for potentials solution to our setup. Obsessed with the problem as they say. One evening, while others were doing normal people evening types of things, I finally found out the reason behind all this mess. Let met explain
Our datadog setup we adopted is the default one: One datadog agent lives on each node of the cluster (deamonset). These agents send theirs metrics,traces, and others fun things to a in-cluster service called the datadog-cluster-agent. This special agent conglomerate the data and transfers it to datadog.
[ i am special]

The agents and the cluster agent communicate in a secure fashion, using a api token as a authentication method.

On a brand new deployment of the datadog helm chart, the api token is generated randomly. And this random generation, along with the GitOps setup, is the reason behind all this mess.
Our datadog helm chart is deployed as an ArgoCD application, with the AutoSync property enabled. At every push on the gitops repository, ArgoCD reconsider the datadog application sync status, and generate a new random api token. Argo flag a drift between the desired state, with the new api token, and the actual state, with the old api token. Argo then sync the state, which triggering a new deployment, which kill the actual deployment

# The simple solution

Hardcode a token for datadog to work with.
