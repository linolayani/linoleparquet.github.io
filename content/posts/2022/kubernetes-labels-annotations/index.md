---
title: "Kubernetes Labels and Annotations: Which One to Use When"
date: 2022-10-23T12:31:49-06:00
tags: ["kubernetes", "labels", "annotations", "cloud"]
author: "Lino Layani"
draft: false

summary: "The difference between Kubernetes Labels and Annotation can be misleading at first. Both are metadata attached to a pod, but serve different purposes."

cover:
  image: "/posts/2022/kubernetes-labels-annotations/images/1.png" # image path/url
  alt: "Labels and Annotations" # alt text
  # caption: "" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
---

## Label: what is it, and what is it used for?

Let’s look at the official definition:

> _Labels are key/value pairs that are attached to objects, such as pods. Labels are intended to be used to specify identifying attributes of objects that are meaningful and relevant to users, but do not directly imply semantics to the core system. Labels can be used to organize and to select subsets of objects._

Labels are at **the heart of the relationship between Kubernetes objects**. These pieces of information are used by the Kubernetes engine to link, group, and recognize objects.

To illustrate that, let’s run a simple nginx pod and expose it:  
`kubectl run nginx --image nginx --expose --port=80 --dry-run=client -o=yaml`

```yaml {linenos=true,hl_lines=[12,23]}
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  name: nginx
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 80
  selector:
    run: nginx
status:
  loadBalancer: {}
---

---
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  containers:
    - image: nginx
      name: nginx
      ports:
        - containerPort: 80
      resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

Here, **labels are the reason why the service redirects incoming requests to the pod**. The service redirects incoming traffic to every pod matching his selector. The pod is labeled `run=nginx`, which matches the service's selector.  
If a pod is created with the same label, the service will load balance the incoming requests between these two pods.

The same mechanism define the relationship between a Deployment and a ReplicaSet, or a ReplicaSet and a Pod. And it’s the same mechanism behind nodes toleration or Quality of Service eviction, just to name a few.  
Labels are also used by other applications, such as Helm, to identify the objects he created — and delete them in case of a rollback.  
That’s the magic behind labels.

## Annotation: what is it, and what is it used for?

Let’s look at the official documentation:

> _You can use Kubernetes annotations to attach arbitrary non-identifying metadata to objects. Clients such as tools and libraries can retrieve this metadata._

Annotation, are also key/values pairs.  
On the other hands these are not used by Kubernetes internally. Annotation are meant to contain non-identifying metadata. It usually contain raw information destined to the cluster administrator and users, such as the name of the team running the service.

`kubectl annotate pod nginx really_important_info=’Mr X really really like this pod. Do not delete it otherwise he be heartbroken.’`

It can also contain configuration information meant to be interpreted by a specific tool. Most IngressController rely on annotations to handle configuration. [Nginx](https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/advanced-configuration-with-annotations/) is one of them.

## Conclusion

So, which one should you use? Well, it depends on your use case:  
If you want to create **relationships between Kubernetes objects**, **labels** are the way to go.  
If you want to write **non-technical information** attached to a Kubernetes object or leverage an **option of a tool**, **annotations** will serve you better.
