---
title: "Implementing authentication and authorization for a Kubernetes application — the easy way"
author: "Lino Layani"
date: 2023-02-11T15:51:02.948Z
lastmod: 2024-01-26T13:19:11-06:00
tags: ["kubernetes", "oauth2proxy", "authentication", "authorization"]

summary: ""

cover:
  image: "/posts/2023/implementing-authentication-and-authorisation-for-a-kubernetes-application-the-easy-way/images/1.png"
  alt: "Implementing authentication and authorisation for a Kubernetes application — the easy way"

images:
  - "/posts/2023/implementing-authentication-and-authorisation-for-a-kubernetes-application-the-easy-way/images/1.png"
  - "/posts/2023/implementing-authentication-and-authorisation-for-a-kubernetes-application-the-easy-way/images/2.png"
---

Ever wanted to restrict access to your Kubernetes App to authenticated Google users without writing a single line of code in your application ? Fantastic !

That’s what we are going to learn today using **OAuth2Proxy**.

First we will deploy **nginx**. It’s gonna represent the **application we want to secure the access to**.  
Then we will create a **OAuth Client in Google API**.  
Finally we will configure **OAuth2Proxy** to handle the authentication for us.  
Sounds great ? Let’s dive in ! ✨

---

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

---

## Step 2: Get your Google API client ID

Follow the steps described in this [post from Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) with this configuration:

![image](/posts/2023/implementing-authentication-and-authorisation-for-a-kubernetes-application-the-easy-way/images/2.png#center)

The creation of the OAuth2 Client ID will prompt two values: the **Client ID** and the **Client Secret**.  
Store them, we will need them on the next step.

---

## Step 3: Deploy OAuth2Proxy

### Generate the cookie secret

OAuht2Proxy store the session data in an encrypted cookie. The string used to encrypt the cookie is called a **cookie secret**.

Let's generate a strong cookie secret, following the recommendation of the documentation:
`dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64 | tr -d — ‘\n’ | tr — ‘+/’ ‘-\_’; echo`

### Deploying the service

Apply the following manifest. Replace the placeholders with the values of the cookie secret and the values from step 2.

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

---

## Testing the workflow

Let’s expose OAuth2Proxy to the outside world:  
`kubectl port-forward services/oauth2-proxy 4180:4180`

Open your browser on [http://localhost:4180](http://localhost:4180)  
You will be magically prompted your google credentials before accessing nginx.

Happy coding ! ✨
