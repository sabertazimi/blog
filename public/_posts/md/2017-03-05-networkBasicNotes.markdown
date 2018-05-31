---
layout:     post
title:      "Computer Networking Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Computer Networking
---

# Computer NetWorking Notes

## Computer Network and Internet

### What is Internet

end-to-end principle: implement features in the end-system/hosts where possible

> congestion implemented on Transport Layer

#### Consist

Internet Service Provider -> Packet Switch/Communication Link -> Host/End System

#### Delay

nodal = proc + queue + trans + prop: 总时延 = 产生/到达时延 + 排队时延 + 传输时延 + 传播时延

#### Layer

*   Application Layer Protocol: HTTP SMTP (message, stream of data)
*   Transport Layer Protocol: TCP UDP (segment, segment of data)
*   Network Layer Protocol: IP (因特网的粘合剂) (**unreliable** datagram, packet of data)
*   Data Link Layer Protocol: Wifi PPP(点对点) 以太网 (frame)
*   Physical Layer Protocol 

#### Layering Principle

*   modularity
*   well defined service: simple service model provided by lower level, providing for higher level
*   reuse
*   separation of concerns
*   continuous improvement: change inner structure of layer independently

## Application Layer

### Application Layer Protocol

defines:

*   types of messages exchanged
*   syntax of various message types(fields defination)
*   semantics of fields
*   rules fsor when/how to send/respond to messages

### HTTP

*   HTTP -> Socket Interface -> TCP
*   stateless protocol

#### Non-Persistent Connections and Persistent Connections

*   non-persistent connections: 1 http request with 1 tcp connection
*   persistent connections: multiple http request with 1 tcp connection

#### HTTP Message Format

*    http request format

```http
request line -> (method field, object url field, protocol version)
header lines -> Host/Connections(close -> non-persistent connection)/User-agent/Accept-language
\r\n
entity body
```

*   http response format

```http
status line -> (protocol version, status code, corresponding status message)
header lines -> Connections/Date/Server/Last-Modified/Content-Length(bytes)/Content-Type
\r\n
entity body
```

#### Cookies

*   first request header -> without cookie
*   first response header -> Set-cookie: `numebr` to client
*   client store identification number for specific site into cookies files
*   second request header -> cookie: `number` (extract identification number for specific site from cookies files)
*   function: create **User Session Layer** on top of stateless HTTP

### Process

#### Port to Transport Layer

*   bandwidth-sensitive application: UDP
*   reliable-sensitive application: TCP

```sh
email                   - SMTP              - TCP
remote terminal access  - Telnet            - TCP
Web                     - HTTP/HTTPS        - TCP
file tranfer            - FTP               - TCP
streaming multimedia    - HTTP/HTTPS/RTP    - TCP/UDP
internet telephony      - SIP/RTP           - UDP
```
#### Address

*   (32 bits network layer  )IP  : find specific host/end-system
*   (16 bits transport layer)port: find specific process

## Transport Layer

### TCP(Transmission Control Protocol)

*   connection-oriented service
*   in-sequence stream of bytes service
*   reliable delivery
*   **congestion control**

#### 3-way handshake

*   SYN -> SYN/ACK -> ACK
*   FIN(toB) -> [Data+]ACK(toA) -> FIN(toA) -> ACK(toB)

### UDP(User Datagram Protocol)

*   lightweight and connectionless
*   datagram service
*   unreliable delivery
*   udp header: source port(16 bit), destination port(16 bit), checksum(16 bit), length(16 bit)

### ICMP (Internet Control Message Protocol)

*   report error conditions back
*   help diagnose problems
*   site above IP

#### ICMP Message Type

*     0 type 0 code: echo reply(by ping)
*     3 type 0 code: destination network unreachable
*     3 type 1 code: destination host unreachable
*     3 type 3 code: destination port unreachable
*     8 type 0 code: echo request(by ping)
*    11 type 0 code: TTL(time to live) Expired(by ping)

### Error Detection

*   TCP/IP: checksums(1 bit)
*   Ethernet(Link Layer): cylic redundancy code(2 bit/more)
*   SSL(Secure Sockets Layer)/TLS(Transport Layer Security): message authentication code(**MAC**)(cryptographic data) - prevent malicious attacks

### Slide Window and Retransmission

*   SWZ N and RWS 1: go back N
*   SWZ N and RWZ N: selective repeat

## Network Layer

### IP Service Model

*   prevent packets looping forever(TTL/time to live field in header): if TTL gets decreased to zero, then drop this datagram
*   limit fragment packets size(Packet ID, Flags, Fragment Offset)
*   reduce changes of wrong destination(Checksum, Destination Address)

### IPv4 Addresses

*   32 bits long: a.b.c.d

#### Address Structure

*   historical: class A: 0-network(7 bits)-host(24 bits) class B: 10-network(14 bits)-host(16 bits) class C: 110-network(21 bits)-host(8 bits)
*   today: 171.64.0.0/16 means 171.64.0.0 to 171.64.255.255, A/24 describes 256 addresses, A/20 describes 4096 addresses
*   longest prefix matching and netmask(A/16 e.g 0.0.0.0/0 => matching all addresses)

### ARP(Address Resolution Protocol)

*   generates mappings between link layer and network layer addresses cached in nodes
*   request-reply protocol: who has network address X => I have network address X
*   request sent to link layer broadcast address, reply sent to requesting address
*   when request to dest ARP packet header with empty DEST HARDWARE ADDRESS field and opcode 1(request)
*   when reply to src ARP packet header with dest hardware address as SRC HARDWARE ADDRESS field, src hardware address as DEST HARDWARE ADDRESS field and opcode 2(reply)
*   if A and B aren't in same sub-net, they delivery ARP boardcast with third public gateway

### Packet Format

#### Endian

*   network is big-endian
*   in x86 processor, use `htons()/ntohs()/htonl()/ntohl()` host - network -short/long helper function to transform format

```c
#include <arpa/inet.h>

uint16_t http_port = 80;
uint16_t packet_port = ntohs(packet->port);

if (packet_port == http_port) {
    // OK
}
```

## Wireshark

### Set Up

```sh
$ sudo dpkg-reconfigure wireshark-common
$ sudo gpasswd -a $USER wireshark
```

## Other Tools

*   ifconfig + egrep
*   netstat + egrep
*   tcpdump
*   nslookup

