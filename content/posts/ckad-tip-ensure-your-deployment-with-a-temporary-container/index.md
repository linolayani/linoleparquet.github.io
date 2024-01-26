---
title: "CKAD Tip: Ensure your deployment with a temporary container"
author: "Lino Layani"
date: 2022-11-13T18:35:02.510Z
lastmod: 2024-01-26T13:19:07-06:00
tags: ["kubernetes", "CKAD", "service", "cloud"]

description: "During the CKAD exam, you will be more that likely prompted to deploy a service. 
Here is a simple way to test the pod or service you deployed respond properly."
summary: "During the CKAD exam, you will be more that likely prompted to deploy a service. 
Here is a simple way to test the pod or service you deployed respond properly."

cover:
  image: "/posts/ckad-tip-ensure-your-deployment-with-a-temporary-container/images/1.jpeg"
  alt: "CKAD Tip: Ensure your deployment with a temporary container"

images:
 - "/posts/ckad-tip-ensure-your-deployment-with-a-temporary-container/images/1.jpeg"
 - "/posts/ckad-tip-ensure-your-deployment-with-a-temporary-container/images/2.png"

---

> **TL;DR**  
> `kubectl run tmp --image nginx --rm -i --restart=Never -- curl '$IP:$PORT'`

---

## Step 1: Deploy a simple application: Nginx

Let's deploy the simplest frontend service ever: nginx.
To do so, run these two commands:

```bash
kubectl create deployment nginx --image nginx --port 80
kubectl expose deployment nginx
```

If you don’t like the imperative approach, you can apply the following manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: nginx
  name: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx
    spec:
      containers:
        - image: nginx
          name: nginx
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: nginx
  name: nginx
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: nginx
```

---

## Step 2: Test that the service deployed respond properly

Run the following command in the terminal:  
`kubectl run tmp --image nginx --rm -i --restart=Never -- curl 'nginx:80'`

![image](/posts/ckad-tip-ensure-your-deployment-with-a-temporary-container/images/2.png#center)

We reach the deployed nginx service, and get the index.html page deployed on the stdin

---

## Explications

We ran a pod called tmp with the following options:

- `--image nginx`  
  The pod’s image. Here we use `nginx` be we could use whatever image which has curl installed.
- `--rm`  
  This options delete the pod after it exit. This option is the reason why the pod is temporary.
- `-i`  
  This option keep stdin open on the container in the pod.
- `--restart=Never`  
  The `RestartPolicy` of the pod: we specify `Never`. Meaning that wheter the pod success of fail, the pod get deleted at the end.
  It’s not mandatory, but highly recommended: If you don’t set the `RestartPolicy` to `Never` and make a mistake on your command, the pod will exit with an error and restart. Until he reach the `CrashLoopBackOff` state, and you will have to delete it manually.
- `-- curl 'nginx:80'`  
  The argument you pass to the nginx container.  
  We call the curl binairy, and specify the service and the port we want to reach.  
  Here I rely on [Kubernetes DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) to reach the nginx service. But we can put the IP address instead.  
  To get the IP adress of a service, simply type `kubectl get svc`. In my case the IP adress is`172.17.0.4` so the command become `curl '172.17.0.4:80';`
  To get the IP address of a pod, type `kubectl get pods -o wide`

---

I hope this was useful, feel free to leave a comment in case you have any questions. Good luck for your exam !

Thank you for taking the time to read my article. If you’re as passionate about cloud technology as I am, make sure to check out my other article or follow me on Medium.  
I‘m always sharing new insights and information, and I’d love to have you along for the journey!
