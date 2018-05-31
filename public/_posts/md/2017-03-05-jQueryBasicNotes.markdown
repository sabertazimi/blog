---
layout:     post
title:      "JQuery Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - JQuery
---

* [JQuery](#jquery)
	* [Events](#events)
		* [Mouse](#mouse)
		* [Keyboard](#keyboard)
		* [Form](#form)
		* [Document/Window](#documentwindow)
	* [常用多态函数](#常用多态函数)
	* [window](#window)
	* [DOM](#dom)
		* [structure](#structure)
		* [class](#class)
		* [style](#style)
	* [Ajax](#ajax)
		* [$.getJSON](#getjson)
		* [$.ajax](#ajax-1)

# JQuery

## Events

### Mouse

-   click
-   dblclick
-   mouseenter
-   mouseleave

### Keyboard

-   keypress
-   keydown
-   keyup

### Form

-   submit
-   change
-   focus
-   blur

### Document/Window

-   load
-   resize
-   scroll
-   unload

## 常用多态函数

```js
data、html、css
$(document).ready(function(){});
```

## window

```js
$(window).scroll(function(event) {});
$(document).height()           //返回整个网页的高度
$(window).height()               //返回窗口高度
$(window).scrollTop()		//返回滚动条距网页顶部距离
```

## DOM

### structure

```javascript
$("selector").html("tag+text");
$("selector").text("text");

$("selector").clone();
$("selector").remove();
$("selector").appendTo("selector");

$("selector").parent();
$("selector").children();
```

```js
$("selector").index();
```

### class

```javascript
$("selector").addClass("");
$("selector").removeClass("");
```

```javascript
hidden
```

### style

```javascript
$("selector").css("color", "red");
$("selector").prop("disable", "true");
```

## Ajax

### $.getJSON

```javascript
$.getJSON(url, data, success(data, status, xhr));

$.getJSON("test.js", function(json){
  alert("JSON Data: " + json.users[3].name);
});
```

### $.ajax

```javascript
$.ajax({
    url: 'http://localhost:3000',
    type: 'GET'/'POST'/'PUT'/'DELETE',
    data: dataSchema,
    dataType: 'json'
    success: successCallback,
    error: errorHandle,
});
```
