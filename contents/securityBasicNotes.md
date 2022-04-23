---
layout: post
title: 'Security Basic Notes'
subtitle: 'Be a Stupid Learner'
date: 2017-10-05
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - Security
  - Web Development
  - Computer Science
---

# Security Basic Notes

## Curated List of Vulnerability

### Object Injection

- `__proto__.XX`
- `constructor`
- `hasOwnProperty`

#### Insecure Object Comparison

injection:

```js
const token = req.cookies.token;

// vulnerability:
// SESSIONS[constructor] => `true`
if (token && SESSIONS[token]) {
  next();
}
```

solutions:

- `crypto.timingSafeEqual`
- `object.hasOwnProperty(token)`

### SQL Injection

user input: ' or 1=1--

```sql
SELECT *
  FROM users
 WHERE email = 'user@email.com'
   AND pass  = '' or 1=1--' LIMIT 1
```

#### SQL Injection Protection

- Don’t allow multiple statements.
- Validate user input.
- Allowlist user input.
- Parameterized statements: use placeholders instead of variable interpolation.

```sql
-- Construct the SQL statement we want to run, specifying the parameter.
String sql = "SELECT * FROM users WHERE email = ?";
```

### Click Jacking

Hover a transparent malicious link upon the true button

#### Click Jacking Protection

- frame killing snippet

```html
<style>
  /* Hide page by default */
  html {
    display: none;
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

- X-Frame-Options

```js
// nodejs
response.setHeader('X-Frame-Options', 'DENY');
response.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
```

### Session Fixation

#### Protection

在 **HTTP Cookies** 中传输**复杂**的 Session IDs, 并在**成功连接**/**恶意篡改**后重置 Session IDs.

- where: not passing session IDs in queryStrings/requestBody,
  instead of passing them in **HTTP cookies**

```js
req.session.regenerate(function (err) {
  process(err);
});
```

- what: generate complex session IDs

```js
const generateSessionId = session => uid(24);
```

- how: reset session IDs after set up session successfully
- how: reset session IDs after it's been changed manually on client(Set-Cookies)

### XSS Attack

Cross-Site Scripting:

- Reflected XSS: url input (search pages) `http://localhost:8080/test?name=<script>alert('attack')</script>`.
- Stored XSS: store script into database.

user input: `<script> malicious code </script>`

#### XSS Protection

don't trust user:

- `replace(/<script>|<script/>/g, '')`
- `trim()`
- using template engine(handlebars, jade, etc...)

### CSRF

Cross-Site Request Forgery - 跨站请求伪造:

挟制用户在当前已登录的 Web 应用程序上执行**非本意**的操作,
利用已认证用户(长期 Cookies), 访问攻击者网站, 并被强制执行脚本,
在用户不知情的情况下提交 Get/Post Request with Cookies 给被攻击网站.

XSS 利用的是网站对用户(输入)的信任,
CSRF 利用的是网站对用户网页浏览器的信任.

#### CSRF Protection

- 确保 `GET request` 没有副作用.
- 确保 `request` 正常渠道发起 (Hidden token check in form).
- 开启同源策略 (**Same Origin Policy**).
- Addition Authentication: input password again.
- Express: `csurf` library.

```html
<a
  href="https://an.evil.site"
  target="_blank"
  rel="noopener noreferrer nofollow"
>
  进入一个“邪恶”的网站
</a>
```

```js
// old browser
'use strict';

function openUrl(url) {
  const newTab = window.open();
  newTab.opener = null;
  newTab.location = url;
}
```

### Distributed Denial of Service

DDoS, 攻击者不断地提出服务请求, 让合法用户的请求无法及时处理:

- Web 服务.
- 邮件服务.
- DNS 服务.
- 即时通讯服务.

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

#### File Upload Protection

对于上传文件:

- 隔离 + 禁止执行
- 重命名/Hash 化: 以防攻击者找到此文件
- 检查文件格式
- 检查 Content-Type Header
- 使用 Virus Scanner

### Malicious Redirects

#### Malicious Redirects Protection

Check the Referrer when doing redirects

```js
function isRelative(url) {
  return url && url.match(/^\/[^\/\\]/);
}
```

### User Enumeration

通过暴力工具得到被攻击网站的用户名单, 并利用社工得到密码

> 很显然, REST API 无法抵抗此种攻击
> E.g [GitHub User Profile](https://github.com)

#### User Enumeration Protection

##### Login Protection

使攻击者无法枚举用户名, 他无法确定是用户不存在还是密码错误

- Login error message: Unknown User **or** Password
- All login code-paths take the same time on average: time consuming operations
- All login code-paths take the same context: session IDs, cookies

##### Sign Up or Reset Protection

Not with name, should with email:

使攻击者无法枚举用户名, 他无法确定是用户不存在还是用户已存在

- Not Exist: Sending sign-up email
- Exist: Sending pwd-reset email

### Inline Document Type Definition in XML

Dangerous Macros:

- XML Bombs
- XML External Entities

#### XML Protection

Disable DTD parse in XML parser

### Information Leakage

- Server in Response Headers
- Cookies: SESSION_ID -> java
- URL: .jsp, .php, .asp
- Error Message
- AJAX responses
- JSON/XML responses
- Code Information

```json
[
  {
    "Server": "Apache/1.3.23",
    "Accept-Ranges": "bytes",
    "Content-length": 196,
    "Connection": "close",
    "Content-Type": "text/html",
    "Cookie": "SESSION_ID=XXXXX"
  },
  {
    "Server": "Microsoft-IIS/5.0",
    "Content-Type": "text/html",
    "Accept-Ranges": "bytes",
    "ETag": "b0aac0542e25c31",
    "Content-Length": 7369
  }
]
```

#### Information Leakage Protection

- `NODE_ENV=production`
- 处理/混淆/加密原始数据(raw data)
- 处理/混淆客户端代码
- 去除工具库的版本信息
- Disable the “Server” HTTP Header and Similar Headers
- Use Clean URLs without extensions
- Ensure Cookie Parameters are Generic
- Disable Client-Side Error Reporting
- Sanitize Data Passed to the Client
- Obfuscate JavaScript\
- Sanitize Template Files
- Ensure Correct Configuration of Web Root Directory

### Secure Treatment of Passwords

> [Hacks Explain](https://www.hacksplaining.com/prevention/password-mismanagement)

### 目录遍历攻击

GET /../../../passwd.key HTTP/1.1

#### Directory Protection

检查请求路径是否安全, 否则不返回响应

### 病毒 NPM 包

名字与流行包相近, 通过 postinstall 脚本执行病毒脚本，获取系统环境变量信息 e.g `crossenv`

#### Package Protection

- No typo in package.json
- 禁止执行 postinstall 脚本

### 正则表达式 DoS 攻击 (ReDoS)

正则表达式引擎采用回溯的方式匹配所有可能性，导致性能问题

#### ReDoS Protection

- 不使用 NFA 实现的正则表达式引擎, 使用 DFA 实现的正则表达式引擎
- 不定义性能消耗过大的正则表达式
- 不动态构造正则表达式 new RegExp()
- 禁止用户输入影响正则表达式构建/匹配

### Supply Chain Attack

Case:

- left-pad.
- eslint-scope.
- antd.
- faker.js.
- colors.js.
- node-ipc.

Solution:

- 代码质量.
- 测试完备性.
- 文档完备性.
- 工程完备性 (DevOps).
- 开发人员构成.
- 兼容性:
- 流行度.
- 历史遗留 Bug.
- 重复实现复杂度.
- 使用时长.
- 后续依赖版本更新策略.

Example:

- [OpenBase](https://openbase.com)
- [NPM Package Advisor](https://snyk.io/advisor)

## JWT

JSON Web Tokens is small, object-friendly
(compared to SAML, Security Assertion Markup Language Tokens)
and security for public/private key pair
(compared to SWT, Simple Web Tokens)

## Security Checklist

### 权限系统 (注册/注册/二次验证/密码重置)

- [ ] 任何地方都使用 HTTPS.
- [ ] 使用 `Bcrypt` 存储密码哈希 (没有使用盐的必要 - `Bcrypt` 干的就是这个事).
- [ ] `登出`之后销毁会话 ID .
- [ ] 密码重置后销毁所有活跃的会话.
- [ ] OAuth2 验证必须包含 `state` 参数.
- [ ] 登陆成功之后不能直接重定向到开放的路径（需要校验，否则容易存在钓鱼攻击）.
- [ ] 当解析用户注册/登陆的输入时，过滤 javascript://、 data:// 以及其他 CRLF 字符.
- [ ] 使用 secure/httpOnly cookies.
- [ ] 移动端使用 `OTP` 验证时，当调用 `generate OTP` 或者 `Resend OTP` API 时不能把 OTP
      （One Time Password） 直接返回。（一般是通过发送手机验证短信，邮箱随机 code 等方式，而不是直接 response）
- [ ] 限制单个用户 `Login`、`Verify OTP`、 `Resend OTP`、`generate OTP` 等 API 的调用次数，
      使用 Captcha 等手段防止暴力破解.
- [ ] 检查邮件或短信里的重置密码的 token，确保随机性（无法猜测）
- [ ] 给重置密码的 token 设置过期时间.
- [ ] 重置密码成功后，将重置使用的 token 失效.
- [ ] Nodejs 等不使用 sudo 运行

### 用户数据和权限校验

- [ ] 诸如`我的购物车`、`我的浏览历史`之类的资源访问，必须检查当前登录的用户是否有这些资源的访问权限.
- [ ] 避免资源 ID 被连续遍历访问，使用 `/me/orders` 代替 `/user/37153/orders` 以防你忘了检查权限，导致数据泄露。
- [ ] `修改邮箱/手机号码`功能必须首先确认用户已经验证过邮箱/手机是他自己的。
- [ ] 任何上传功能应该过滤用户上传的文件名，另外，为了普适性的原因（而不是安全问题），
      上传的东西应该存放到例如 S3 之类的云存储上面(用 lambda 处理)，而不是存储在自己的服务器，防止代码执行。
- [ ] `个人头像上传` 功能应该过滤所有的 `EXIF` 标签，即便没有这个需求.
- [ ] 用户 ID 或者其他的 ID，应该使用 [RFC compliant](http://www.ietf.org/rfc/rfc4122.txt)
      的 `UUID` 而不是整数. 你可以从 github 找到你所用的语言的实现.
- [ ] [JWT（JSON Web Token）](https://jwt.io/)很棒.当你需要构建一个 单页应用/API 时使用.

### 安卓和 iOS APP

- [ ] 支付网关的 `盐（salt）` 不应该被硬编码
- [ ] 来自第三方的 `secret` 和 `auth token` 不应该被硬编码
- [ ] 在服务器之间调用的 API 不应该在 app 里面调用
- [ ] 在安卓系统下，要小心评估所有申请的 [权限](https://developer.android.com/guide/topics/security/permissions.html)
- [ ] 在 iOS 系统下，使用系统的钥匙串来存储敏感信息（权限 token、api key、 等等） **不要** 把这类信息存储在用户配置里面
- [ ] 强烈推荐[证书绑定（Certificate pinning）](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning)

### 安全头信息和配置

- [ ] `添加` [CSP](https://en.wikipedia.org/wiki/Content_Security_Policy) 头信息，
      减缓 XSS 和数据注入攻击. 这很重要.
- [ ] `添加` [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) 头信息防止跨站请求伪造（CSRF）攻击.
      同时`添加` [SameSite](https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00)
      属性到 cookie 里面.
- [ ] `添加` [HSTS](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
      头信息防止 SSL stripping 攻击.
- [ ] `添加` 你的域名到 [HSTS 预加载列表](https://hstspreload.appspot.com/)
- [ ] `添加` [X-Frame-Options](https://en.wikipedia.org/wiki/Clickjacking#X-Frame-Options)
      防止点击劫持.
- [ ] `添加` [X-XSS-Protection](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#X-XSS-Protection)
      缓解 XSS 攻击.
- [ ] `更新` DNS 记录，增加 [SPF](https://en.wikipedia.org/wiki/Sender_Policy_Framework)
      记录防止垃圾邮件和钓鱼攻击.
- [ ] 如果你的 Javascript 托管在第三方的 CDN 上面，
      需要`添加` [内部资源集成检查](https://en.wikipedia.org/wiki/Subresource_Integrity) 。
      为了更加安全，添加[require-sri-for](https://w3c.github.io/webappsec-subresource-integrity/#parse-require-sri-for)
      CSP-directive 就不会加载到没有 SRI 的资源
- [ ] 使用随机的 CSRF token，业务逻辑 API 可以暴露为 POST 请求。
      不要把 CSRF token 通过 http 接口暴露出来，比如第一次请求更新的时候
- [ ] 在 get 请求参数里面，不要使用临界数据和 token。 暴露服务器日志的同时也会暴露用户数据

### 过滤输入

- [ ] 所有暴露给用户的参数输入都应该
      `过滤` 防止 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击.
- [ ] 使用参数化的查询防止 [SQL 注入](https://en.wikipedia.org/wiki/SQL_injection).
- [ ] 过滤所有具有功能性的用户输入，比如 `CSV导入`
- [ ] `过滤`一些特殊的用户输入，例如将 robots.txt 作为用户名，而你刚好提供了 coolCorp.io/username 之类的 url
      来提供用户信息访问页面。（此时变成 coolCorp.io/robots.txt，可能无法正常工作）
- [ ] 不要自己手动拼装 JSON 字符串，不管这个对象有多么小。请使用你所用的语言相应的库或者框架来编写
- [ ] `过滤` 那些有点像 URL 的输入，
      [SSRF](https://docs.google.com/document/d/1v1TkWZtrhzRLy0bYXBcdLUedXGb9njTNIJXa3u9akHM/edit#heading=h.t4tsk5ixehdd)
- [ ] 在输出显示给用户之前，`过滤`输出信息

### 操作

- [ ] 如果你的业务很小或者你缺乏经验，可以评估一下使用 AWS 或者一个 PaaS 平台来运行代码
- [ ] 在云上使用正规的脚本创建虚拟机
- [ ] 检查所有机器没有必要开放的`端口`
- [ ] 检查数据库是否没有设置密码或者使用默认密码，特别是 MongoDB 和 Redis
- [ ] 使用 SSH 登录你的机器，不要使用密码，而是通过 SSH key 验证来登录
- [ ] 及时更新系统，防止出现 0day 漏洞，比如 HeartBleed、ShellShock 等
- [ ] 修改服务器配置，HTTPS 使用 TLS1.2，禁用其他的模式。(值得这么做)
- [ ] 不要在线上开启 DEBUG 模式，有些框架，DEBUG 模式会开启很多权限以及后门，或者是暴露一些敏感数据到错误栈信息里面
- [ ] 对坏人和 DDOS 攻击要有所准备，使用那些提供 DDOS 清洗的主机服务
- [ ] 监控你的系统，同时记录到日志里面 (例如使用 [New Relic](https://newrelic.com/) 或者其他 ).
- [ ] 如果是 2B 的业务，坚持顺从需求。如果使用 AWS S3,可以考虑使用
      [数据加密](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html)
      功能. 如果使用 AWS EC2，考虑使用磁盘加密功能（现在系统启动盘也能加密了）

### 关于人

- [ ] 开一个邮件组（例如：security@coolcorp.io）和搜集页面，方便安全研究人员提交漏洞
- [ ] 取决于你的业务，限制用户数据库的访问
- [ ] 对报告 bug、漏洞的人有礼貌
- [ ] 把你的代码给那些有安全编码观念的同伴进行 review (More eyes)
- [ ] 被黑或者数据泄露时，检查数据访问前的日志，通知用户更改密码。你可能需要外部的机构来帮助审计
- [ ] 使用 [Netflix Scumblr](https://github.com/Netflix/Scumblr) 及时了解
      你的组织（公司）在社交网络或者搜索引擎上的一些讨论信息，比如黑客攻击、漏洞等等

## Security Best Practice

[Security Helmet](https://github.com/helmetjs/helmet):

- XSS Protection.
- Setting a `Context-Security-Policy` header.
- Ensure all connections to be HTTPS.
- Avoid Clicking-jacking using `X-Frame-Options`.
- Disable the `X-Powered-By` header.
