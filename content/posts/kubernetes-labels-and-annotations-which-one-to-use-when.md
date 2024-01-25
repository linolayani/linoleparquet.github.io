---
title: "Kubernetes Labels and Annotations Which One to Use When"
date: 2022-10-23T12:31:49-06:00
tags: ["Kubernetes", "Labels", "Annotations", "Cloud"]
author: "Lino Layani"
draft: false

description: ""

disableShare: false
searchHidden: false

cover:
  image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*5q5SgXBFDuB1KYE9vlviYw.png" # image path/url
  alt: "Labels and Annotations" # alt text
  # caption: "" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
---

The difference between Kubernetes Labels and Annotation can be misleading at first. Both are metadata attached to a pod, but serve different purposes.

<!--more-->

---

# Kubernetes Labels and Annotations: Which one to use when ?

> **TL;DR**  
> Labels are **identifying** information intended to be read by Kubernetes.  
> Annotations are **non-identifying** information intended to be read by humans and third party applications.

---

## **Label: what is it, and what is it used for?**

Let’s look at the official definition:

> _Labels are key/value pairs that are attached to objects, such as pods. Labels are intended to be used to specify identifying attributes of objects that are meaningful and relevant to users, but do not directly imply semantics to the core system. Labels can be used to organize and to select subsets of objects._

Labels are at the heart of Kubernetes objects relationship. Those pieces of information are used by the Kubernetes engine to link, group, and recognise objects.

To illustrate that, let’s run a simple nginx pod and expose it:  
`kubectl run nginx --image nginx --expose --port=80 --dry-run=client -o=yaml`

Here, the service is redirecting the incoming requests to the pod because the pod’s label is matching the service’s selector.  
If we create a new pod with the label `run=nginx` , the service will load balance the incoming requests between those two pods.

This is the same mechanism that link a Deployment to a ReplicaSet , or a ReplicaSet to a Pod. And it’s the same mechanism behind nodes toleration or Quality of Service eviction, just to name a few.  
Labels are also used by others applications, such as Helm, to identify the objects he created — and delete them in case of a rollback.  
That’s the magic behind labels.

---

## Annotation: what is it, and what is it used for?

Let’s look at the official documentation:

> _You can use Kubernetes annotations to attach arbitrary non-identifying metadata to objects. Clients such as tools and libraries can retrieve this metadata._

Annotation, are also key/values pairs.  
On the other hands those are not used by Kubernetes internally. Annotation are meant to contain non-identifying metadata. It can contain raw information for the people running the cluster, such as which team is taking care of the service.

`kubectl annotate pod nginx really_imporant_info=’Mr X really really like this pod. Do not delete it otherwise he be heartbroken.’`

It can also contain configuration information meant to be interpreted by a specific tool. Most IngressController rely on annotations to handle configuration. [Nginx](https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/advanced-configuration-with-annotations/) is one of them.

---

## Conclusion

So, which one should you use ? Well it depends on your use-case:  
If you want to create relationship between Kubernetes objects, labels is the way to go.  
If you want to write non-technical information attached to a Kubernetes Object, or to leverage an option of a tool, annotation is going to serve you better.

---

I hope this was useful, feel free to leave a comment in case you have any questions.

Thank you for taking the time to read my article. If you’re as passionate about cloud technology as I am, make sure to check out my other article or follow me on Medium.  
I‘m always sharing new insights and information, and I’d love to have you along for the journey!
