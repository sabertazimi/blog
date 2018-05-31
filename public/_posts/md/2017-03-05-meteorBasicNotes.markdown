---
layout:     post
title:      "Meteor Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - Meteor
---

* [Meteor Notes](#meteor-notes)
	* [特殊文件夹](#特殊文件夹)
	* [Basic Command](#basic-command)
		* [create and run](#create-and-run)
		* [list package](#list-package)
		* [add package](#add-package)
		* [android platform](#android-platform)
		* [发布](#发布)
	* [常用Package](#常用package)
		* [barbatus:stars-rating 1.0.7](#barbatusstars-rating-107)
		* [accounts-password 1.1.4](#accounts-password-114)
		* [accounts-ui 1.1.6](#accounts-ui-116)
		* [[iron:router](https://atmospherejs.com/iron/router)](#ironrouterhttpsatmospherejscomironrouter)
		* [twbs:bootstrap 3.3.6](#twbsbootstrap-336)
		* [ecmascript 0.1.6](#ecmascript-016)
		* [jquery 1.11.4](#jquery-1114)
		* [mongo 1.1.3](#mongo-113)
	* [传递数据](#传递数据)
	* [设置事件](#设置事件)
	* [Meteor.user()](#meteoruser)
	* [Session](#session)
	* [MongoDB](#mongodb)
	* [安全性](#安全性)
		* [package的安全性](#package的安全性)
		* [MongoDB/Collection的安全性](#mongodbcollection的安全性)

# Meteor Notes

## 特殊文件夹

public(存放assets)、client、server、lib

## Basic Command

### create and run

```bash
meteor create app_folder_name
cd app_folder_name
meteor
```

### list package

```bash
meteor search .或package_name
```

### add package

```bash
meteor add package_name
```

### android platform

```bash
meteor add-platform android
meteor install-sdk android  // ~/.meteor/android-bundle
meteor run android 或 meteor run android-device
 --mobile-server https://hostname:port  指定(http可不写schema)
```

### 发布

```bash
meteor deploy domain/ip address
meteor deploy –delete domain/ip address
```

## 常用Package

### barbatus:stars-rating 1.0.7

Stars rating control

```js
	{{>starsRating mutable=true class="js-rate-image" id=_id}}

	var rating = $(event.currentTarget).data("userrating");
```

### accounts-password 1.1.4

Password support for accounts

### accounts-ui 1.1.6

Simple templates to add login widgets to an app

```html
	 {{> loginButtons}}
```

### [iron:router](https://atmospherejs.com/iron/router)

```html
<template name="ApplicationLayout">
    {{> yield "navbar"}}	<!--规定html区域-->
    {{> yield "main"}}		<!--规定html区域-->
</template>
```

```javascript
Router.configure( {
    layoutTemplate: "ParentTemplateName"  //e.g"ApplicationLayout"
});
```


```javascript
Router.route('/', function () {
  this.render('MyTemplate');
});

Router.route('/items', function () {
  this.render('Items');
});

Router.route('/items', function () {
  this.render('TemplateName': {
	to: "yieldFunctionArgument"    //规定html区域
  });
});

Router.route('/items/_id', function () {
  this.render('TemplateName'{
	to:"yieldFunctionArgument",    //规定html区域
	data:function() {    //传递Template中的特定数据
		return Collection.FindOne({_id: this.params._id});
	}
	});
});

Router.route('/items/:_id', function () {
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
});

Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});

Router.route('/restful', {where: 'server'})
  .get(function () {
    this.response.end('get request\n');
  })
  .post(function () {
    this.response.end('post request\n');
});
```

### twbs:bootstrap 3.3.6

The most popular front-end framework for developing responsive, mobile first projects on the web.

### ecmascript 0.1.6

Compiler plugin that supports ES2015+ in all .js files

### jquery 1.11.4

Manipulate the DOM using CSS selectors

### mongo 1.1.3

Adaptor for using MongoDB and Minimongo over DDP

## 传递数据

```js
//data_variable为对象
Template.html_templatetag_name.helpers(data_variable);
//data_variable为对象数组
Template.html_templateTag_name.helpers(
	{
		property_name:data_variable, e.g Collection.find()、数组名、函数
		prepertyn:data_variablen
	}
);    //传递一个匿名对象参数，它拥有一个对象数组字段/实例域

Template.body.helpers
```

html invoke:

```html
{{#each property_name}}  <img src=”{{img_src}}” alt=”{{img_alt}}”>  {{/each}}
{{#if property_name}} {{/if}}

{{property function_argument}}
```

## 设置事件

```js
//传递一个匿名对象参数，拥有一个函数字段/实例域
Template.templateTag_name.events({
	'click .inner_class_name/#inner_id_name' : function (event) {
		//TODO with coding
		//$(event.target) 选择产生事件的对象
		//$(event.currentTarget)
	},
	'submit jqueryid/jqueryclass' : function(event) {
		event.target.inputTag_name.value;
	}
});
```

## Meteor.user()

```js
Meteor.user()
Meteor.users.find()
Meteor.users.findOne(filter)
Meteor.user().email[num].address
Meteor.user().username
Meteor.user()._id
```

```html
{{#if currentUser}}   {{/if}}
```

## Session

-   将对象的某一个属性设为过滤器

```js
Session.set("userFilter", Object.property_nmae);
```

-   通过get得到过滤器属性值(已设置过滤器为有效值，未设置过滤器为NULL)

```js
{ property_name: Session.get("userFilter") }
```

-   移除过滤器

```js
Session.set("userFilter", undefined);
```

## MongoDB

-   `Meteor.startup( function() {});`

当客户端启动应用时，运行isClient与isServer代码

作用：a.若数据库无数据，则预存一定量数据

-    `new Mongo.Collection(“name_string”);`

创建Mongo集合——

```js
find( {selector },                   //选择器 propername:filter_value
	{sort : { fieldname : -1 } }  , //从小至大排列的filter
	limit:number
)
```

count、insert(对象{})、remove(Mongo Filter)

update({键值对}、{$set	{键值对}})
	可通过update读入用户操作，更新数据库，可再次反馈给用户

allow（安全性）

## 安全性

### package的安全性

meteor remove insecure

### MongoDB/Collection的安全性
