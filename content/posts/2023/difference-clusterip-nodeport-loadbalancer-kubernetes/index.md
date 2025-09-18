---
title: "The difference between ClusterIP, NodePort, LoadBalancer, and ExternalName Kubernetes services"
author: "Lino Layani"
date: 2023-09-21T01:52:26.295Z
lastmod: 2024-01-26T13:19:14-06:00
tags: ["kubernetes", "ClusterIP", "LoadBalancer", "NodePort"]

summary: "Several types of services can be used to expose an application outside the cluster. Choose wisely."

cover:
  image: "/posts/2023/difference-clusterip-nodeport-loadbalancer-kubernetes/images/1.png"
  alt: "The difference between ClusterIP, NodePort, and LoadBalancer Kubernetes services"

images:
  - "/posts/2023/difference-clusterip-nodeport-loadbalancer-kubernetes/images/1.png"
---

> **TLDR;**  
> **LoadBalancer** for exposing your service **externally**,  
> **ClusterIP** for exposing your service **internally**,  
> **NodePort** for testing and **development** or **batch** purpose.

## What is a service ?

Pods get assigned an internal IP address at their creation. Client within the cluster can reach the pod on their internal IP address.  
But pods are ephemeral. A restarted pod might get assigned a new IP address. Relying on the pod's internal IP isn't a reliable solution.  
That's exactly the issue a service attend to resolve: provide a reliable address to reach pods.

## ClusterIP

ClusterIP type is the **default** type. It exposes the service on a **cluster-internal IP**. Only client within the cluster are able to access this service. Clients outside of the cluster cannot reach it, which can be desirable for security purpose.

![image](./images/clusterip.png#center)

## LoadBalancer

This type of service exposes the application to **external traffic** through a load balancer provided by the cloud provider.  
It’s the most used service overall. This is a more **advanced** and **scalable** way to expose an application, as it provides **load balancing and high availability**, but it may require additional configuration and resources.

![image](./images/loadbalancer.png#center)

## NodePort

NodePort exposes the Service on each Node's IP at a static port. It is the most primitive way to get external traffic directly to your service. This is a **simple** and **straightforward** way to expose an application, but it does **not provide load balancing or high availability**.

![image](./images/nodeport.png#center)

## ExternalName

ExternalName map a Service to a **DNS name**.  
This allows to **represent an external resource as an internal one**, and appreciate Kubernetes built in resource mapping using selectors and tags.

![image](./images/externalname.png#center)

## Conclusion

Overall, the best service type for you will **depend on your specific needs and requirements**. If you need to expose an application to external traffic and you do not need advanced features like load balancing or high availability, then a **NodePort** service may be sufficient.

If you need more advanced features, then a **LoadBalancer** service may be a better option. If you don’t want to expose your service to the world wide web for security reason, then use **ClusterIP**.
