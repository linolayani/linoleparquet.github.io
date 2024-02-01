---
title: What happens when you type test.webiste.com in your browser ?
author: Lino Layani
date: 2024-01-25T12:29:21-06:00
tags: ["interview", "networking"]

description: toto
summary: tata
---

Common interview question: You're on a LAN with IP `10.0.10.20`, you browse to a website at `https://test.website.com` (`10.0.20.5`), describe what happens.

This is a open question. There is no good nor bad answers and **multiple layers of understanding**. For the purpose of this article, I will present 3 layers of comprehensions.

---

## Level 1: The newbie

Knowledge:

- Web Server Processing
- Client Side Rendering

### Web Server Processing

What means **browsing tot the website https://test.website.com** in **technical terms**?
Your browser request to **render the webpage** hosted on the URL `https://test.website.com`. The webserver at this domain **receives the HTTP request** and **processes it**. It retrieves the requested resource, in this case, the homepage of `https://test.website.com`.

Note: Most webservers define the **index.html** file as their homepage.

### Client Side Rendering

The homepage is downloaded on the your browser. Most of the time, this html page has **dependencies** under the form of link and script. Commons dependencies are a **styling css file, a javascript script and javascript libraries**. At the rendering of the html file, theses dependencies are downloaded.

[Schema no1]
1: browse to https://test.website.com
2: webserver process the request
3: return the homepage
4: rendering of the html page

> **Answer no1**:  
> **Your navigator browse to https://test.website.com. The web server hosted on the URL https://test.website.com **receive the request** and **process it**. It retrieves the requested resource, in this case, the homepage of test.website.com. Your computer **renders the webpage** by **fetching homepage's dependencies**, and display it on your screen.**

---

## Level 2: The network connaiseur

Knowledge:

- TLS Handshake (if HTTPS)
- Port 80 and 443
- HTTP Request
- Web Server Processing
- HTTP Response
- Rendering the Web Page

A more experienced candidate might include **HTTP elements** in his reponse. He also might notice that the **protocol used is HTTPS**.

### TLS Handshake

The protocol used on that request is **HTTPS**. A TLS (Transport Layer Security) handshake takes place to secure the communication. The TLS Handshake consist of 5 phases:

- Hello Phase: Your browser says hello to the web server. The web server reponds with its own hello.
- Key Exchange Phase: Your browser and the server agree on a method to securely exchange encryption keys.
- Authentication Phase: The server proves its identity to your browser, assuring that it is indeed the legitimate website you intend to visit. This is typically done using SSL certificate.
- Ready to Communicate: Your browser and the server now have everything they need to communicate securely.
  https://www.youtube.com/watch?v=j9QmMEWmcfo

### HTTP Request

Your computer request the webpage through the HTTP GET method.
A basic HTTP request contains an URL and a method.
Some headers are included
XXX

### HTTP Response

The webserver send back a HTTP response to the client. The response includes the data and the metadata
XXX

[Schema no2]

1: browse to https://test.website.com
TLS handshake
Send a HTTP GET request
2: webserver process the request
Response the HTTP GET request
4: rendering of the html page

> **Answer no2**:  
> Your navigator browse to https://test.website.com. **An HTTPS connection is initalized with the webserver under the domain test.website.com: A **TLS handshake** takes place and an encrypted connection is opened on port 443.**  
> **Once the connection is established, your computer sends an HTTP GET request to the web server, specifying the resource you want to retrieve.**  
> The web server receives the HTTP request and processes it. It retrieves the requested resource, in this case, the homepage of test.website.com. along with his dependencies. **The web server sends an HTTP response back to your computer. The response includes the requested web page content, status codes, and other relevant information.** Your browser receives the HTTP response and renders the web page, displaying it on your screen.

---

## Level 3:

Knowledge:

- DNS Resolution
- Establishing a TCP Connection
- TLS Handshake (if HTTPS)
- HTTP Request
- Web Server Processing
- HTTP Response
- Rendering the Web Page

### DNS Resolution

When you browse to the website https://test.website.com, the first thing that will occur is the DNS (Domain Name Server) resolution. A client reach through HTTP with IP adresses. The action of resolving a domain with a
Your computer is looking for the IP address associated with the domain of the website, test.website.com. It checks in his local DNS cache first. If not found, it send a DNS query to the configured DNS server

### Establishing a TCP Connection

Schema:
1: browse to https://test.website.com
DNS Resolution
Open TCP Connection
TLS handshake
Send a HTTP GET request
2: webserver process the request
Response the HTTP GET request
4: rendering of the html page

> **Answer no3:**  
> **Your computer checks its local DNS cache to see if it already has the IP address linked to test.webiste.com. If not found, it sends a DNS query to your configured DNS server to resolve the domain name (test.webiste.com) to an IP address. The DNS server responds with the IP address (10.0.20.5) associated with test.webiste.com.**  
> **Your computer initiates a TCP (Transmission Control Protocol) connection to the IP address 10.0.20.5 on port 443 (default for HTTPS). A three-way handshake (SYN, SYN-ACK, ACK) occurs between your computer and the web server to establish a reliable connection.**  
> **A TLS handshake takes place and an encrypted connection is opened.** Once the connection is established, your computer sends an HTTP GET request to the web server, specifying the resource you want to retrieve (by default the homepage, which is commonely the index.html file).
> The web server (at IP address 10.0.20.5) receives the HTTP request and processes it.
> It retrieves the homepage of test.webiste.com, and sends an HTTP response back to your computer. The response includes the requested web page content, status codes, and other relevant information.
> Your browser receives the HTTP response and renders the web page, displaying it on your screen.

---

## Level 3+:

There are a lot of others subjects to cover on this question. If you want to learn more, you can check out these subjects

- ARP
  Packet lost
  What if not on a LAN ? default gateway
  Cookie

ChatGPT:

DNS Resolution:
Your computer checks its local DNS cache to see if it already has the IP address for test.webiste.com.
If not found, it sends a DNS query to your configured DNS server to resolve the domain name (test.webiste.com) to an IP address.
The DNS server responds with the IP address (10.0.20.5) associated with test.webiste.com.

Establishing a TCP Connection:
Your computer initiates a TCP (Transmission Control Protocol) connection to the IP address 10.0.20.5 on port 443 (default for HTTPS).
A three-way handshake (SYN, SYN-ACK, ACK) occurs between your computer and the web server to establish a reliable connection.

TLS Handshake (if HTTPS):
If the website uses HTTPS, a TLS (Transport Layer Security) handshake takes place to secure the communication.
This involves exchanging cryptographic parameters, verifying certificates, and ensuring an encrypted connection.

HTTP Request:
Once the connection is established, your computer sends an HTTP GET request to the web server, specifying the resource you want to retrieve (e.g., the homepage).

Web Server Processing:
The web server (at IP address 10.0.20.5) receives the HTTP request and processes it.
It retrieves the requested resource, in this case, the homepage of test.webiste.com.

HTTP Response:
The web server sends an HTTP response back to your computer.
The response includes the requested web page content, status codes, and other relevant information.

Rendering the Web Page:
Your browser receives the HTTP response and renders the web page, displaying it on your screen.
