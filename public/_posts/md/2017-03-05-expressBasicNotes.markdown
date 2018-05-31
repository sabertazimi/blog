---
layout:     post
title:      "Express Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Nodejs
    - Express
---

* [Express Basic Notes](#express-basic-notes)
	* [Middleware Function](#middleware-function)
		* [ Principle: `next()/next(err)` OR res.end()/res.send()](#-principle-nextnexterr-or-resendressend)
		* [Template](#template)
		* [Use](#use)
		* [Useful Middleware](#useful-middleware)
	* [Http](#http)
		* [Res](#res)
			* [res.local](#reslocal)
		* [Req](#req)

# Express Basic Notes

## Middleware Function

###  Principle: `next()/next(err)` OR res.end()/res.send() 

### Template

```js
function (req, res, next) {
    next();
    // OR res.send();
}

function (err, req, res, next) {
    next(err);
    // OR res.send();
}
```

### Use

```js
app.use(middlewareFunction);
```

### Useful Middleware

-   basicAuth
-   bodyParser
-   compiler
-   cookieParser
-   csrf: 跨域请求(依赖 session bodyparser)
-   directory
-   errorHandle
-   favicon
-   limit: 限制请求个数,防止 Dos 攻击
-   logger
-   methodOverride
-   profiler: 置于所有中间件之前,记录响应时间和内存使用
-   query
-   responseTime
-   router
-   session
-   static
-   staticCache
-   vhost

## Http

### Res

#### res.local

res.locals中的所有属性都会传递到模板的上下文中

在app.js中, use页面控制器之前, 加入:

```js
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
```

所有的页面模板中便可以使用{{user}}

### Req

-   req.body.{{inputName}}: 处理表单
-   req.params.routeName: /users/:id -> req.params.id
-   req.query: queryString.parse() 处理后的查询字符串对象
