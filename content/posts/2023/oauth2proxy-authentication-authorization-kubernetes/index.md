---
title: "OAuth2Proxy: Implementing OAuth2 in Kubernetes, the easy way"
author: "Lino Layani"
date: 2023-02-11T15:51:02.948Z
lastmod: 2024-01-26T13:19:11-06:00
tags: ["kubernetes", "oauth2proxy", "authentication", "authorization"]

summary: ""

cover:
  image: "/posts/2023/oauth2proxy-authentication-authorization-kubernetes/images/1.png"
  alt: "Implementing authentication and authorization for a Kubernetes application — the easy way"

images:
  - "/posts/2023/oauth2proxy-authentication-authorization-kubernetes/images/1.png"
  - "/posts/2023/oauth2proxy-authentication-authorization-kubernetes/images/2.png"
---

Are you looking to **restrict access to your Kubernetes application** to authenticated users, without modifying a single line of your application’s code? If so, wonderful, you’re in the right place.

Here’s the plan:

Deploy nginx to represent the application we want to secure.  
Create an **OAuth Client** in the Google API Console.  
Configure **OAuth2Proxy** to manage authentication seamlessly on our behalf.

Let’s get started. ✨

## **Step 1: Deploy Nginx**

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

## Step 2: Get your Google API client ID

Follow the steps described in this [post from Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) with this configuration:

![image](/posts/2023/oauth2proxy-authentication-authorization-kubernetes/images/2.png#center)

The creation of the OAuth2 Client ID will prompt two values: the **Client ID** and the **Client Secret**.  
Store them, we will need them on the next step.

## Step 3: Deploy OAuth2Proxy

### Generate a cookie secret

OAuth2Proxy stores session data within an encrypted cookie. The key used to perform this encryption is referred to as the **cookie secret**.

Let's generate a strong cookie secret, following the recommendation of the documentation:
`dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64 | tr -d — ‘\n’ | tr — ‘+/’ ‘-\_’; echo`

### Deploying the service

Apply the manifest below, making sure to replace the placeholders with your generated cookie secret, and the values obtained in Step 2.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: oauth2-proxy
  name: oauth2-proxy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: oauth2-proxy
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: oauth2-proxy
    spec:
      containers:
        - name: oauth2-proxy
          image: quay.io/oauth2-proxy/oauth2-proxy:v7.3.0
          args:
            - --cookie-secret=<COOKIE_SECRET_HERE>
            - --client-id=<CLIENT_ID_HERE> # This value usually finish with ".apps.googleusercontent.com"
            - --client-secret=<CLIENT_SECRET_HERE>
            - --http-address=0.0.0.0:4180
            - --email-domain=*
            - --redirect-url=http://localhost:4180/oauth2/callback
            - --upstream=http://nginx
          ports:
            - containerPort: 4180
---
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: oauth2-proxy
  name: oauth2-proxy
spec:
  ports:
    - port: 4180
      protocol: TCP
      targetPort: 4180
  selector:
    app: oauth2-proxy
```

## Testing the workflow

Let’s expose OAuth2Proxy to the outside world:  
`kubectl port-forward services/oauth2-proxy 4180:4180`

Open your browser on [http://localhost:4180](http://localhost:4180)  
You will be magically prompted your google credentials before accessing nginx.

Happy coding ! ✨
