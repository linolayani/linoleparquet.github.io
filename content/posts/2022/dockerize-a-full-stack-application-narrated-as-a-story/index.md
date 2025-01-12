---
title: "Dockerize a full stack application, narrated as a story"
author: "Lino Layani"
date: 2022-06-29T05:27:41.333Z
lastmod: 2024-01-26T13:18:48-06:00
draft: true

summary: "In this article you are going to follow the path many of us has followed to dockerize a full stack application. Let’s dig into it ! ☀️"

cover:
  image: "/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/1.png"
  alt: "Dockerize a full stack application, narrated as a story"

images:
  - "/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/1.png"
  - "/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/2.png"
  - "/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/3.png"
---

In this article you are going to follow the path many of us has followed to dockerize a full stack application. Let’s dig into it ! ☀️  
To follow along [here](https://github.com/linoleparquet/docker-compose-mern-stack) is the git repository containing the code

![image](/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/1.png#center)

### Analyse the code

I took as source code an easy MERN stack available [here](https://github.com/Ram-the-coder/MERN-Stack-Todo-List-App).  
First, let’s analyze the code.

#### Backend

The folder called `backend` is a node project using the framework Express.  
We can install his dependencies defined in the file `package.json` by running `npm install`, and launch the server by running `npm start`

It contains a `server.js` file that expose all 4 CRUD operations. It will store and read the data in a mongoDB database.

> Note: CRUD stands for Create Read Update and Delete. Those are the four basic operations of persistent storage.`const PORT = 4000;  
const MONGO_HOST = &#34;localhost:27017&#34;;`

The variable `PORT` define the port where the server will listen to.  
The variable `MONGO_HOST` define the location where the server will reach out the mongo database.

#### Frontend

The frontend part is stored in the `frontend` folder. It&#39;s a React project.  
Just as the backend part, we can install the dependencies and run a development server by running `npm install` then `npm start`.  
This launch a development server on default port for react applications: 3000.

#### Relation between the backend and the frontend:

The frontend call the backend through hard coded URL in his components:  
Exemple with `create-todo.components.js`:
`axios  
  .post(&#34;http://localhost:4000/todos/add&#34;, newTodo)  
  .then((res) =&gt; console.log(res.data));`

### Get the application to work

As seen on the first step, the backend application needs to connect to a mongoDB service on localhost:27017.  
Let’s use a docker container to resolve this dependency.

run : `docker run -p27017:27017 --name my-mongo -d mongo`

Let’s understand this command:  
`docker run` : run a container

- `docker run` : run a container
- `-p27017:27017`: map port 27017 of the container to our host
- `--name my-mongo` : name the container mongo. Useful to manage it (start, stop, delete) afterward
- `-d` : run the container in daemon mode.
- `mongo`: Name of the image to run. [https://hub.docker.com/\_/mongo](https://hub.docker.com/_/mongo)`$ curl localhost:27017  
It looks like you are trying to access MongoDB over HTTP on the native driver port.`

mongoDB is up and running on port 27017 of our machine, we can now start our backend server with the following commands:
`cd backend  
npm i &amp;&amp; npm start  
Server is running on port 4000  
MongoDB database connection established successfully`

And finally let’s run our development frontend server:
`cd frontend  
npm i &amp;&amp; npm start`
![image](/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/2.png#center)

Our todo list is up and running, and fully functional 🎉  
Yay ! Let’s now Dockerize it

### Dockerize the backend

Let’s start by dockerizing the backend service.

Set this `Dockerfile` on the `backend` folder:
``FROM node:16-alpine`# Create app directory  
WORKDIR /usr/src/app`# Install app dependencies

# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY package\*.json ./  
RUN npm install`COPY server.js server.js`# Exposing the port defined  
EXPOSE 4000```# Running the application  
CMD [ &#34;node&#34;, &#34;server.js&#34; ]`

Let’s build the docker image: `docker build -t todo-backend:v1 backend/  
`And run it: `docker run -p4000:4000 todo-backend:v1`
`MongoNetworkError: failed to connect to server [localhost:27017] on first connect [Error: connect ECONNREFUSED 127.0.0.1:27017`

What’s going on? Our mongoDB server is still up and running !  
If we re-run the previous setup everything works nicely !  
The logs says that the backend failed to connect to mongoDB on localhost:27017, but if I `curl localhost:27017` mongoDB answers me just as before ! 🤔

Yep. Let’s not forget what changed from our previous setup.  
Our backend service used to run on our machine, ad now it run on a container, which means that his definition of localhost has changed.  
On the previous setup localhost referred to our machine, whereas now it refers to the container. The backend service try to reach mongoDB on his container. To fix that let’s find a way to get the backend container to communicate with the mongoDB container.

### Networking is fun !

What we have here is a networking problematic : container backend wants to reach container mongoDB on port 27017. How do we do that? That’s where we introduce Docker Compose.

We have to adjust the variable `MONGO_HOST` in the `server.js` file, so it reach mongoDB.  
To do so, we want to replace localhost by the IP address of the mongoDB container.

Thankfully docker-compose embed a DNS resolution tool. Instead of looking for the IP address of the mongoDB container, we can simply set the name of the service describing the container in our docker-compose file.  
In our case, it will be `mongodb`

Let’s update our variable `MONGO_HOST` in consequence:
`const MONGO_HOST = &#34;mongodb:27017&#34;;`

We re-build the image: `docker build -t todo-backend:v2 backend/`  
And adjust the version of the backend image in our docker-compose file. Let&#39;s run docker-compose up again.  
Success !! The backend service is up and running again !

> Note: There are more elegant ways to achieve this, by using a environment variable

But wait, an error is logged at the startup of our backend service:
`(node:1) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [mongodb:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 172.22.0.2:27017]  
    at Pool.&lt;anonymous&gt; (/usr/src/app/node_modules/mongodb/lib/core/topologies/server.js:431:11)  
    at Pool.emit (events.js:198:13)  
    at connect (/usr/src/app/node_modules/mongodb/lib/core/connection/pool.js:580:14)  
    at makeConnection (/usr/src/app/node_modules/mongodb/lib/core/connection/connect.js:39:11)  
    at callback (/usr/src/app/node_modules/mongodb/lib/core/connection/connect.js:261:5)  
    at Socket.err (/usr/src/app/node_modules/mongodb/lib/core/connection/connect.js:286:7)  
    at Object.onceWrapper (events.js:286:20)  
    at Socket.emit (events.js:198:13)  
    at emitErrorNT (internal/streams/destroy.js:91:8)  
    at emitErrorAndCloseNT (internal/streams/destroy.js:59:3)  
    at process._tickCallback (internal/process/next_tick.js:63:19)  
(node:1) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)  
(node:1) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.`

Apparently that’s because the backend container is up before the mongoDB container serve the 27017, and his first attempt to reach the 27017 port is unsuccessful.  
So we want to wait for the mongoDB container to be fully up before starting our backend container. We will override the command of the backend container so it first test the connection to the port 271017 of the mongoDB container, and then start the server.  
We will use the native nc tool to do so.  
Our backend service now looks like that:
`backend:  
  image: todo-backend:v2  
  ports:  
    - 4000:4000  
  command: &gt;  
    /bin/sh -c &#34;  
      while ! nc -z mongodb 27017 ; do  
        echo &#39;Waiting for mongodb service to be up and running&#39;;  
        sleep 1  
      done  
      node server.js;  
      &#34;`

And … Success ! Logs are now without errors 🎉

> **Note**: there are other ways to achieve this:
>
> - [using an init container](https://stackoverflow.com/questions/70322031/does-docker-compose-support-init-container), require docker-compose version 1.29
> - [implementing an health check](https://medium.com/geekculture/how-to-successfully-implement-a-healthcheck-in-docker-compose-efced60bc08e), require docker-compose version

### Dockerize the frontend

#### 1. bundle up the code into a docker container

Let’s package our code running npn run build. This will create a build folder, with a production ready version of our code of our app.  
Then we need to serve this folder through a HTTP server. We will use nginx.

Here is our Dockerfile:
` FROM node:10-alpine as builder  
WORKDIR /usr/src/app  
COPY . .  
RUN npm install  
RUN npm run build````FROM nginx:alpine  
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html  
EXPOSE 80 `

Let’s build our frontend container with the command  
`docker build -t todo-frontend:v1 frontend/`  
And run it with `docker run -p80:80 todo-frontend:v1`

Open your favorite navigator and visit `localhost:80  
`The frontend is well displayed ! But if we open the console we can see the following error:
`Failed to load resource: net::ERR_CONNECTION_REFUSED  :4000/todos:1`

How can we fix that? 🤔

#### Connect frontend and backend

To understand this error, we have to realize that the frontend code is executed on the client navigator. It means that `localhost` refers to the localhost of the client machine, which is a separate network from the docker-compose network. We need to find a way to reach the backend container, which is available from the docker-compose network.

What we want to put in place is called a reverse proxy. We will achieve this through an nginx configuration: the idea here is to use the frontend container as a reverse proxy to intercept backend calls from the navigator of the client and redirect them to the backend container. The code executed on the navigator will reach port 80 of his localhost, which is mapped to the port 80 of the container.

Here is a schema explaining what we want to put in place:

1.  Navigator call the frontend container which is available through localhost on port 80. Every request that are aimed to the backend container are suffixed by `/api`
2.  The nginx server is configured to handle those kind of request thanks to the proxy pass configuration: It forward the request to the backend container.
    ![image](/posts/2022//dockerize-a-full-stack-application-narrated-as-a-story/images/3.png#center)

Here is the configuration of the nginx:
` server {  
    listen 80;  
    root /usr/share/nginx/html;````    location /api/ {  
        proxy_pass http://backend:4000/;  
    }  
} `

We also have to adjust the value of the `BACKEND_HOST` variable each time the frontend calls the backend. So in every component, we define:
``const BACKEND_HOST = window[&#34;location&#34;][&#34;origin&#34;] + &#34;/api&#34;;` `

`window[“location”][“origin”]` is the url of the actual window.  
We add `/api` to adapt the nginx configuration.

Let’s create a new image:  
`docker build -t todo-frontend:v2 frontend/`

Here is the final version of our docker-compose:

Run the whole thing and.. Tada ! The application is up and running, available on `[http://localhost](http://localhost) `🎉
