---
title: "CKAD Tip: Ensure your deployment with a temporary container"
author: "Lino Layani"
date: 2022-11-13T18:35:02.510Z
lastmod: 2024-01-26T13:19:07-06:00
tags: ["kubernetes", "CKAD", "service", "cloud"]

summary: "During the CKAD exam, you will be more that likely prompted to deploy a service. 
Here is a simple way to test the pod or service you deployed respond properly."

cover:
  image: "/posts/2022//ckad-tip-ensure-your-deployment-with-a-temporary-container/images/1.jpeg"
  alt: "CKAD Tip: Ensure your deployment with a temporary container"

images:
 - "./images/1.jpeg"
 - "./images/2.png"

---

> **TL;DR**  
> `kubectl run tmp --image nginx --rm -i --restart=Never -- curl '$IP:$PORT'`

---

## Step 1: Deploy a simple application: Nginx

Let’s deploy nginx. To do so, run these two commands:

```bash
kubectl create deployment nginx --image nginx --port 80
kubectl expose deployment nginx
```

If you don’t like the imperative approach, you can apply this manifest:

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

## Step 2: Test the deployed service

Run the following command in the terminal:  
`kubectl run tmp --image nginx --rm -i --restart=Never -- curl 'nginx:80'`

![image](./images/2.png#center)

We reach the deployed nginx service, and get the index.html page deployed on the stdin

---

## Explications

We ran a pod called tmp with the following options:

- `--image nginx`  
  Pod image to run. We use `nginx` here, but any image containing curl will do the trick.
- `--rm`  
  Delete the pod after it exit. This is the reason why the pod is temporary.
- `-i`  
  This option keep stdin open on the container in the pod.
- `--restart=Never`  
  `RestartPolicy` of the pod: we specify `Never`. Meaning that whether the pod succeed of failed, it get deleted at the end.
  It’s not mandatory, but highly recommended: If `RestartPolicy` isn't set to `Never` it will be set to his default value, `Always`. If there is a mistake on your command, like a silly typo, the pod will restart until he reach the `CrashLoopBackOff` state, and you will have to delete it manually, making you loose precious seconds.
- `-- curl 'nginx:80'`  
  Argument passed to the container.  
  We call the curl binary, specifying the service and the port we want to reach.  
  Here I rely on [Kubernetes DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) to reach the nginx service. Another option is to write the IP address directly.  
  To get the IP address of a service, type `kubectl get svc`. In my case the IP address is`172.17.0.4` so the command become `curl '172.17.0.4:80';`
  To get the IP address of a pod, type `kubectl get pods -o wide`

---

I hope this was useful, feel free to leave a comment in case you have any questions. Good luck for your exam !

Thank you for taking the time to read my article. If you’re as passionate about cloud technology as I am, make sure to check out my other article or follow me on Medium.  
I‘m always sharing new insights and information, and I’d love to have you along for the journey!
