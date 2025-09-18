---
title: "The often misunderstood difference between ENTRYPOINT and CMD in Docker"
author: "Lino Layani"
date: 2022-09-10T20:27:36.859Z
lastmod: 2024-01-26T13:18:53-06:00
tags: ["docker", "cmd", "entrypoint", "cloud"]

summary: "Both the entrypoint and cmd are crucial for configuring the init process of a container. What exactly is the difference between those two ?"

cover:
  image: "/posts/2022/difference-entrypoint-cmd-in-docker/images/1.png"
  alt: "The often misunderstood difference between ENTRYPOINT and CMD in Docker"

images:
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/1.png"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/2.png"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/3.gif"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/4.gif"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/5.png"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/6.gif"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/7.gif"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/8.png"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/9.gif"
  - "/posts/2022/difference-entrypoint-cmd-in-docker/images/10.gif"
---

> **TL;DR**  
> Init process formula: `ENTRYPOINT` + `CMD`  
> The `ENTRYPOINT` instruction specifies a **system call** executed when the **container starts**.  
> The `CMD` instruction specifies **arguments** fed to the `ENTRYPOINT`.  
> If no `ENTRYPOINT` is defined, the default `ENTRYPOINT`, `/bin/sh -c`, is executed.

## Using ENTRYPOINT alone

The `_ENTRYPOINT_` instruction specifies the system call executed at the startup of container.

There are two main ways to define the `ENTRYPOINT`:

- in the Dockerfile, as an instruction
- in the command `docker run`, as a command line argument `--entrypoint`. This override the `ENTRYPOINT` defined in the Dockerfile

Let’s take an example. Let’s start by defining the `ENTRYPOINT` in the Dockerfile.

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/2.png#center)

When we run the container, The entrypoint is executed.

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/3.gif#center)

We can override the entrypoint by passing it as a command line argument:

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/4.gif#center)

## Using ENTRYPOINT and CMD together

The `CMD` instruction can complete the `ENTRYPOINT` instruction.  
Let’s take an example. We re-use the Dockerfile written before, and append the line `CMD[“HOME”]` at the end.

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/5.png#center)

Let’s run the container:

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/6.gif#center)

The container execute the command composed by the `ENTRYPOINT` and the `CMD` instruction. In this case it will be `/bin/printenv HOME`.  
It’s possible to override the `CMD` present in the Dockerfile by specifying it it the command line. One can see the `CMD` present in the Dockerfile as the default option.  
Here we’re gonna override the default `CMD` with the custom value `HOSTNAME`. We can see that the output of our container has changed: It now consist of the value of the environment variable `HOSTNAME.`

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/7.gif#center)

## Using CMD alone

We can also define solely the `CMD` in the Dockerfile.  
When no `ENTRYPOINT` is defined, the default system call is executed: `/bin/sh -c`.  
Let’s take this Dockerfile to illustrate that:

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/8.png#center)

Here we run the container using the `CMD` defined in the Dockerfile:

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/9.gif#center)

It’s also possible to override the default CMD by passing another CMD in the command line:

![image](/posts/2022/difference-entrypoint-cmd-in-docker/images/10.gif#center)

## Conclusion

System call formula: `_ENTRYPOINT_` + `_CMD_`  
The `_ENTRYPOINT_` instruction specifies a system call that will be executed when the container starts.  
The `_CMD_` instruction specifies arguments that will be fed to the `_ENTRYPOINT_`.  
If no `_ENTRYPOINT_` is defined, the default `_ENTRYPOINT_`, `_/bin/sh -c_`, will be executed.
