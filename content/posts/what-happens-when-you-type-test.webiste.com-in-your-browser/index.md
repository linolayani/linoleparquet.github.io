---
title: What happens when you type test.webiste.com in your browser ?
author: Lino Layani
date: 2024-01-25T12:29:21-06:00
tags: ["interview", "networking"]

description: Let's decompose a common interview question
summary: You're on a LAN with IP `10.0.10.20`, you browse to a website at `https://test.website.com` (`10.0.20.5`), describe what happens.

cover:
  image: "/posts/what-happens-when-you-type-test.webiste.com-in-your-browser/images/thumbnail.jpg"
  alt: "What happens when you type test.webiste.com in your browser ?"
  # caption: "" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
---

You're on a LAN with IP `10.0.10.20`. You browse to a website at `https://test.website.com` (`10.0.20.5`). Describe what happens.

This is a open question. There is no good nor bad answers, and **multiple layers of understanding**. For the purpose of this article, I will introduce three levels of comprehension.

---

## First layer

### Web Server Processing

What means **browsing to the website https://test.website.com** in **technical terms**?
Your browser request to **render the webpage** hosted on the URL `https://test.website.com`. The webserver at this domain **receives the HTTP request** and **processes it**. It retrieves the requested resource, in this case the homepage.

> Note: Most webservers define the **index.html** file as their homepage.

### Client Side Rendering

The homepage is downloaded on the your browser. Most of the time, this html page has **dependencies** under the form of link and script. Commons dependencies are a **stylesheets, scripts or images**. At the rendering of the html file, theses dependencies are downloaded.

### Answer n°1

![image](./images/answer-1.png#center)

> Your navigator browse to https://test.website.com. It send a request. The web server receive the request and process it.  
> It retrieves the requested resource, in this case, the homepage of test.website.com.  
> Your navigator renders the webpage: it fetchs the homepage's dependencies and display it on your screen.

---

## Second layer

A more experienced candidate might include **HTTP elements** in his reponse. He also might notice that the **protocol used is HTTPS**.

### TLS Handshake

The protocol used on that request is **HTTPS**. A TLS (Transport Layer Security) handshake takes place to secure the communication. The TLS Handshake consist of 5 phases:

- Hello Phase: Your browser says hello to the web server. The web server reponds with its own hello.
- Key Exchange Phase: Your browser and the server agree on a method to securely exchange encryption keys.
- Authentication Phase: The server proves its identity to your browser, assuring that it is indeed the legitimate website you intend to visit. This is typically done using SSL certificate.
- Ready to Communicate: Your browser and the server now have everything they need to communicate securely.
  https://www.youtube.com/watch?v=j9QmMEWmcfo

### HTTP Request

Your navigator request the webpage through the HTTP GET method.
An HTTP request consists of several components, including:

- **Request Method**: This indicates the action to be performed, such as GET, POST, or HEAD. In a typical web page request, the method is usually GET.
- **Resource Path**: The specific resource on the server that you are requesting, like "/index.html" or simply "/" for the homepage.
- **Headers**: Additional metadata accompanying the request, such as information about the browser, accepted content types, and more.
- **Body** (for some methods): For methods like POST, the request may include data in the body of the request.

### HTTP Response

Upon receiving the HTTP request, the web server processes it and generates an HTTP response.
The HTTP response includes:

- **Status Line**: This line includes an HTTP status code (e.g., 200 OK for a successful request), indicating the outcome of the request.
- **Headers**: Similar to the request, response headers provide additional information about the server, the content type, and other details.
- **Body**: The actual content of the requested resource. For a web page, this is typically HTML, but it could also include other resources like images, stylesheets, or scripts.
- **Cookies**: The server might send cookies to your browser for session management or tracking purposes.

### Answer n°2

![image](./images/answer-2.png#center)

> An HTTPS connection is initalized with the webserver under the domain test.website.com: A TLS handshake takes place and an encrypted connection is opened on port 443.  
> Once the connection is established, your computer sends an HTTP GET request to the web server, specifying the resource you want to retrieve.  
> The web server receives the HTTP request and processes it. It retrieves the requested resource, in this case, the homepage of test.website.com, along with his dependencies.  
> The web server sends an HTTP response back to your computer. The response includes the requested web page content, status codes, and other relevant information.
> Your browser receives the HTTP response and renders the web page, displaying it on your screen.

---

## Third layer

### DNS Resolution

When you browse to the website https://test.website.com, the first thing that will occur is the DNS (Domain Name Server) resolution. A client reach through HTTP with IP adresses. The action of resolving a domain with a
Your computer is looking for the IP address associated with the domain of the website, test.website.com. It checks in his local DNS cache first. If not found, it send a DNS query to the configured DNS server.

### Establishing a TCP Connection

### Answer n°3

![image](./images/answer-3.png#center)

> Your computer checks its local DNS cache to see if it already has the IP address linked to test.webiste.com.  
> If not found, it sends a DNS query to your configured DNS server to resolve the domain name (test.webiste.com) to an IP address. The DNS server responds with the IP address (10.0.20.5) associated with test.webiste.com.  
> Your computer initiates a TCP (Transmission Control Protocol) connection to the IP address 10.0.20.5 on port 443 (default for HTTPS). A three-way handshake (SYN, SYN-ACK, ACK) occurs between your computer and the web server to establish a reliable connection.  
> A TLS handshake takes place and an encrypted connection is opened.  
> Once the connection is established, your computer sends an HTTP GET request to the web server, specifying the resource you want to retrieve (by default the homepage, which is commonely the index.html file).  
> The web server (at IP address 10.0.20.5) receives the HTTP request and processes it.  
> It retrieves the homepage of test.webiste.com, and sends an HTTP response back to your computer. The response includes the requested web page content, status codes, and other relevant information.  
> Your browser receives the HTTP response and renders the web page, displaying it on your screen.

---
