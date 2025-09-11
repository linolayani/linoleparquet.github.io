---
title: What happens when you type test.webiste.com in your browser ?
author: Lino Layani
date: 2024-01-25T12:29:21-06:00
tags: ["interview", "networking"]
summary: Let's decompose a common interview question.

cover:
  image: "/posts/2024/what-happens-when-you-type-test.webiste.com-in-your-browser/images/thumbnail.jpg"
  alt: "What happens when you type test.webiste.com in your browser ?"
---

> You're on a LAN with IP `10.0.10.20`. You browse to a website at `https://test.website.com` (`10.0.20.5`). Describe what happens.

This is a open question. There is no good nor bad answers, and **multiple layers of understanding**.  
For the purpose of this article, I will introduce three levels of comprehension.

---

## First layer

### Web Server Processing

What "browsing to the website `https://test.website.com`" means in technical terms?  
Your browser request to **render the webpage** hosted on `test.website.com`.

The webserver registered at this domain **receives the HTTP request** and **processes it**. It retrieves the requested resource, in this case the homepage.

### Client Side Rendering

The homepage is downloaded on your browser. Most of the time, this html page has **dependencies** under the form of link and script.  
Commons dependencies are **stylesheets, scripts or images**. At the rendering of the html file, theses dependencies are downloaded.

### Answer n°1

![image](./images/answer-1.png#center)

> Your type `https://test.website.com` on your browser, thus **sending a request** to the web server. It receives the request and **process it**.
>
> It retrieves the requested resource, in this case, the homepage of test.website.com, and **return it** to your browser.
>
> Your browser **renders the webpage**: it fetches the homepage's dependencies and display it on your screen.

---

## Second layer

A more experienced candidate might include **HTTP concepts** in his response.  
He also might notice that the protocol used is **HTTPS**.

### TLS Handshake

The protocol used on that request is **HTTPS**. The TLS (Transport Layer Security) handshake is like a secure conversation that happens between your web browser and a website's server when you connect to a secure website. Here's a simplified explanation:

1. **_Hello Phase_**:  
   Your browser says "Hello" to the website's server.
   The server responds with its own "Hello."
   During this phase, they also exchange some information about the encryption methods they can use.

2. **_Key Exchange Phase_**:  
   Your browser and the server agree on a method to securely exchange encryption keys.
   Think of encryption keys as secret codes that will be used to scramble and unscramble the information being sent between your browser and the server.

3. **_Authentication Phase_**:  
   The server proves its identity to your browser, assuring that it is indeed the legitimate website you intend to visit.
   This is typically done using digital certificates, which are like online ID cards for websites.

4. **_Ready to Communicate_**:  
   Your browser and the server now have everything they need to communicate securely.
   They agree on a common encryption method and have exchanged the necessary keys.

5. **_Secure Data Transfer_**:  
   From this point on, any data exchanged between your browser and the server is encrypted using the agreed-upon keys.
   Even if someone were to intercept the data in transit, it would be extremely difficult to understand without the proper keys.

### HTTP Request

Your navigator request the webpage by sending an HTTP Request. An HTTP request consists of several components, including:

- **_Request Method_**: This indicates the action to be performed, such as GET, POST, or HEAD. In this typical web page request, the method is usually GET.
- **_Resource Path_**: The specific resource on the server that you are requesting, like "/index.html" or simply "/" for the homepage.
- **_Headers_**: Additional metadata accompanying the request, such as information about the browser, accepted content types, and more.
- **_Body_** (for some methods): For methods like POST, the request may include data in the body of the request.

### HTTP Response

Upon receiving the HTTP request, the web server processes it and generates an HTTP response. The HTTP response includes:

- **_Status Line_**: This line includes an HTTP status code (e.g., 200 OK for a successful request), indicating the outcome of the request.
- **_Headers_**: Similar to the request, response headers provide additional information about the server, the content type, and other details.
- **_Body_**: The actual content of the requested resource. For a web page, this is typically HTML, but it could also include other resources like images, stylesheets, or scripts.
- **_Cookies_**: The server might send cookies to your browser for session management or tracking purposes.

### Answer n°2

![image](./images/answer-2.png#center)

> An HTTPS connection is initialized with the webserver under the domain test.website.com: A **TLS handshake** takes place and an **encrypted connection** is opened on port 443.
>
> Once the connection is established, your computer sends an **HTTP GET request** to the web server.
>
> The web server receives the HTTP request and processes it. It retrieves the requested resource, in this case, the homepage of test.website.com, along with his dependencies.
>
> The web server sends an **HTTP response** back to your computer. The response includes the requested web page content, status codes, and other relevant information.
>
> Your browser receives the HTTP response and **renders the web page**, displaying it on your screen.

---

## Third layer

### DNS Resolution

When you browse to the website https://test.website.com, the first thing that will occur is the DNS (Domain Name Server) resolution. A client reach through HTTP with IP addresses. The action of resolving a domain with a
Your computer is looking for the IP address associated with the domain of the website, test.website.com. It checks in his local DNS cache first. If not found, it send a DNS query to the configured DNS server.

### TCP Connection

Establishing a TCP (Transmission Control Protocol) connection involves a series of steps between a client and a server. This is known as the "TCP three-way handshake". Here are the simplified steps:

1. **_Client initiates connection_**:  
   The client sends a request to establish a connection to the server. This request consist of a SYN (synchronize) packet.
   The client sets the sequence number (SEQ) in the packet to an initial value.

2. **_Server responds_**:  
   Upon receiving the SYN packet, the server acknowledges the request and responds with a SYN-ACK packet.
   The server also sets its own initial sequence number (SEQ) and acknowledges the client's sequence number.

3. **_Client acknowledges the response_**:  
   The client receives the SYN-ACK packet and sends an ACK (acknowledge) packet back to the server.
   The client also acknowledges the server's sequence number.

At this point, both the client and server have exchanged the necessary information to establish a connection. The TCP connection is now established and data can be transmitted between them.

![image](./images/tcp-handshake.png#center)

These steps ensure a reliable and ordered exchange of data between the client and server. The TCP protocol is designed to handle error recovery, flow control, and sequencing of data to ensure the reliable transmission of information across the network.

### Answer n°3

![image](./images/answer-3.png#center)

> Your computer **checks its local DNS cache** to see if it already has the IP address linked to test.website.com.  
> If not found, it **sends a DNS query** to your configured DNS server to resolve the domain name (test.website.com) to an IP address. The DNS server **responds with the IP address** (10.0.20.5) associated with test.website.com.
>
> Your computer initiates a **TCP connection** to the IP address 10.0.20.5 on the port 443, default port for HTTPS. A **three-way handshake** (SYN, SYN-ACK, ACK) occurs between your computer and the web server to establish an encrypted connection.
>
> Once the connection is established, your computer sends an **HTTP GET request** to the web server, specifying the resource you want to retrieve (by default the homepage, which is commonly the index.html file).  
> The web server (at IP address 10.0.20.5) receives the HTTP request and **processes it**.
>
> It retrieves the homepage of test.website.com, and sends an **HTTP response** back to your computer. The response includes the requested web page content, status codes, and other relevant information.
>
> Your browser receives the HTTP response and **renders the web page**, displaying it on your screen.

---
