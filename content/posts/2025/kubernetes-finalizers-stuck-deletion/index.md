---
title: "Resource stuck in deletion: An Introduction to Kubernetes finalizers"
author: "Lino Layani"
date:
lastmod: 2025-01-11T18:35:02.510Z
tags: [Kubernetes, Resource Stuck Deletion, Finalizer]
draft: true
summary: ""
# cover:
#   image: "/posts/2025/kubernetes-secret-reloader/images/1.png"
#   alt: "Kubernetes Secret Reloader"
---

## Resource stuck in deletion

A while back, I encountered a situation that got me freezing. A resource stuck in deletion. In my case it was an ArgoCD application, but for the sake of simplicity, I'll illustrate with a simple pod.

Here is the yaml:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  finalizers:
    - foo/bar
spec:
  containers:
    - name: nginx
      image: nginx:1.14.2
```

Applying this manifest works as expected. A pod is created, and run nginx.  
However, if one decide to delete the pod, it'll face the following situation:

- pod stuck in terminating
- no logs
- no event (to verify)

On the surface, there's no indication on what is blocking the deletion of the pod.  
Only someone familiar with the notion of finalizer can demystify what is going on. So let's learn what that is.

## What is a finalizer ?

> Finalizers are namespaced keys that tell Kubernetes to wait until specific conditions are met before it fully deletes resources that are marked for deletion. Finalizers alert controllers to clean up resources the deleted object owned.

> Finalizers are special strings on the object — they tell Kubernetes: "Before you actually delete me, someone needs to do some cleanup work."

## Examples

Finalizers comes in handy for multiple use-cases:

- handling the deletion of a resource outside of the cluster
- preventing the deletion of an object to prevent harmful situations
-

Kubernetes covers a lot of use-cases. Finalizers

One use-case of Kubernetes is to manage the configuration and lifecycle of resources living outside of the cluster. Think of persistent volumes, DNS records, or ingresses routes.

These external resources are represented in the cluster by a Kubernetes object.
When this object is scheduled for deletion, we want the following to happen: it triggers the deletion of the external resource, wait for its proper deletion, and delete the object.
We need a component, a mechanism to handle this delayed deletion. And that's exactly what a finalizer do.

## Example of common finalizers

Example of common finalizers:

kubernetes.io/pvc-protection or kubernetes.io/pv-protection -> ??
kubernetes -> namespace cleanup
resources-finalizer.argocd.argoproj.io -> Uninstalling the resources managed by the app before removing the application

## How a finalizer work. Happy path

Let's dig in the machinery of the Kubernetes to try and understand the steps of a finalizer

1. Something (human or process) initiate the deletion of an object containing the finalizer
2. The garbage collector sees it. Can't remove the object because the list of finalizer isn't nil
3. The controller sees it too. Initialize cleanup work
4. Clean up work successfully done. Removes the finalizer from the list
5. List of finalizer is empty, the garbage collector removes the object

## How a finalizer can run short - unhappy path

1. Something (human or process) initiate the deletion of an object containing the finalizer
2. The garbage collector sees it. Can't remove the object because the list of finalizer isn't nil
3. The controller is unhealthy / isn't on the cluster anymore
4. The object is stuck on delete indefinitely

## How to solve the issue

- patching the deleted object with an empty list of finalizer. tradeoff: cleanup work isn't working properly
- ensuring a controller exist, and

## Final Thoughts
