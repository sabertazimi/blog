---
layout:     post
title:      "Web Security Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Web Security
---

* [Security Basic Notes](#security-basic-notes)
	* [Curated List of Vulnerability(漏洞)](#curated-list-of-vulnerability漏洞)
		* [SQL Injection](#sql-injection)
			* [Protection](#protection)
		* [Click Jacking](#click-jacking)
			* [Protection](#protection-1)
		* [Session Fixation](#session-fixation)
			* [Protection](#protection-2)
		* [XSS(Cross-Site-Scripting) Attack](#xsscross-site-scripting-attack)
			* [Protection](#protection-3)
		* [CSRF(Cross-Site Request Forgery) - 跨站请求伪造](#csrfcross-site-request-forgery---跨站请求伪造)
			* [Protection](#protection-4)
		* [File Upload Vulnerabilities](#file-upload-vulnerabilities)
			* [Protection](#protection-5)
		* [Malicious Redirects](#malicious-redirects)
			* [Protection](#protection-6)
		* [User Enumeration](#user-enumeration)
			* [Protection](#protection-7)
				* [Login](#login)
				* [Signup/Reset(not with name, should with email)](#signupresetnot-with-name-should-with-email)
		* [Inline Document Type Definition in XML](#inline-document-type-definition-in-xml)
			* [Protection](#protection-8)
		* [Information Leakage](#information-leakage)
			* [Protection](#protection-9)
		* [Secure Treatment of Passwords](#secure-treatment-of-passwords)

# Security Basic Notes

## Curated List of Vulnerability(漏洞)

### SQL Injection

user input: ' or 1=1--

```sql
SELECT *
  FROM users
 WHERE email = 'user@email.com'
   AND pass  = '' or 1=1--' LIMIT 1
```

#### Protection

parameterized statements

```js
// Construct the SQL statement we want to run, specifying the parameter.
String sql = "SELECT * FROM users WHERE email = ?";
```

### Click Jacking

Hover a transparent malicious link upon the true button

#### Protection

-   frame killing snippet

```html
<style>
    /* Hide page by default */
    html {
        display : none;
    }
</style>

<script>
    if (self == top) {
        // Everything checks out, show the page.
        document.documentElement.style.display = 'block';
    } else {
        // Break out of the frame.
        top.location = self.location;
    }
</script>
```

-    X-Frame-Options

```js
// nodejs
response.setHeader("X-Frame-Options", "DENY");
response.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
```

### Session Fixation

#### Protection

在 **HTTP Cookies** 中传输**复杂**的 Session IDs, 并在**成功连接**/**恶意篡改**后重置 Session IDs.

-   where: not passing session IDs in queryStrings/requestBody, instead of passing them in **HTTP cookies**

```js
req.session.regenerate(function(err) {
    // New session here
})
```
-   what: generate complex session IDs

```js
const generateSessionId = sess => uid(24);
```

-   how: reset session IDs after set up session successfully
-   how: reset session IDs after it's been changed manually on client(Set-Cookies)

### XSS(Cross-Site-Scripting) Attack

-   Reflected XSS: url input(search pages)

user input: <script> malicious code </script>

#### Protection

don't trust user:

-   `replace(/<script>|<script/>/g, '')`
-   `trim()`
-   using template engine(handlebars, jade, etc...)

### CSRF(Cross-Site Request Forgery) - 跨站请求伪造

挟制用户在当前已登录的Web应用程序上执行非本意的操作 - 利用已认证用户(长期 Cookies), 访问攻击者网站, 并被强制执行脚本, 在用户不知情的情况下提交 Get/Post Request with Cookies 给被攻击网站.

#### Protection

-   GET request 没有副作用
-   确保 request 正常渠道发起(hidden token check in form)
-   addition authentication: input password again

```js
express/csurf library
```

### File Upload Vulnerabilities

当使用 JS 代码限制上传文件类型时, 攻击者 Disable JS in Browser, 并上传 malicious code file.

```php
<?php
    if (isset($_REQUEST['cmd'])) {
        $cmd = ($_REQUEST['cmd']);
        system($cmd);
    } else {
        echo 'What is your bidding?';
    }
?>
```

#### Protection

对于上传文件:

-   隔离 + 禁止执行
-   重命名/Hash 化: 以防攻击者找到此文件
-   检查文件格式
-   检查 Content-Type Header
-   使用 Virus Scanner

### Malicious Redirects

#### Protection

Check the Referer when doing redirects

```js
function isRelative(url) {
    return url && url.match(/^\/[^\/\\]/);
}
```

### User Enumeration

通过暴力工具得到被攻击网站的用户名单, 并利用社工得到密码

> 很显然, REST API 无法抵抗此种攻击
> E.g [GitHub User Profile](https://github.com)

#### Protection

##### Login

使攻击者无法枚举用户名, 他无法确定是用户不存在还是密码错误

-   Login error message: Unkonwn User **or** Password
-   All login code-paths take the same time on average: time consuming operations
-   All login code-paths take the same context: session IDs, cookies

##### Signup/Reset(not with name, should with email)

使攻击者无法枚举用户名, 他无法确定是用户不存在还是用户已存在

-   Not Exist: Sending sign-up email
-   Exist: Sending pwd-reset email

### Inline Document Type Definition in XML

Dangerous Macros:

-   XML Bombs
-   XML Externel Entities

#### Protection

Disable DTD parse in XML parser

### Information Leakage

-   Server in Response Headers
-   Cookies: JSESSIONID -> java
-   URL: .jsp, .php, .asp
-   Error Message
-   AJAX responses
-   JSON/XML reponses
-   Code Information

```json
{
    Server: Apache/1.3.23
    Accept-Ranges:  bytes
    Content-length: 196
    Connection: close
    Content-Type: text/html
    Cookie: JSESSIONID=XXXXX
}
{
    Server: Microsoft-IIS/5.0
    Content-Type: text/html
    Accept-Ranges: bytes
    ETag: "b0aac0542e25c31"
    Content-Length: 7369
}
```

#### Protection

-   处理/混淆/加密原始数据(raw data)
-   处理/混淆客户端代码
-   去除工具库的版本信息
-   Disable the “Server” HTTP Header and Similar Headers
-   Use Clean URLs without extensions
-   Ensure Cookie Parameters are Generic
-   Disable Client-Side Error Reporting
-   Sanitize Data Passed to the Client
-   Obfuscate JavaScript\
-   Sanitize Template Files
-   Ensure Correct Configuration of Web Root Directory

### Secure Treatment of Passwords

> [Hacks Explain](https://www.hacksplaining.com/prevention/password-mismanagement)
