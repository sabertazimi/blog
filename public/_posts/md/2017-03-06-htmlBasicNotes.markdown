---
layout:     post
title:      "HTML Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-06
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - HTML
---

* [HTML5 Basic Notes](#html5-basic-notes)
	* [Emmet](#emmet)
		* [嵌套操作](#嵌套操作)
		* [属性操作](#属性操作)
		* [字符操作](#字符操作)
		* [缺省元素](#缺省元素)
	* [Structure](#structure)
		* [section](#section)
		* [header](#header)
		* [hgroup](#hgroup)
		* [nav](#nav)
		* [main](#main)
		* [address](#address)
		* [aside](#aside)
		* [footer](#footer)
		* [blockquote](#blockquote)
		* [pre](#pre)
	* [Form](#form)
			* [novalidate](#novalidate)
		* [表单元素共有属性](#表单元素共有属性)
			* [form=form_name](#formform_name)
			* [formaction=target_name](#formactiontarget_name)
			* [formmethod=post/get](#formmethodpostget)
			* [formenctype](#formenctype)
			* [formtarget](#formtarget)
			* [formnovalidate](#formnovalidate)
			* [autofocus](#autofocus)
			* [required](#required)
		* [labels](#labels)
			* [隐式control属性](#隐式control属性)
		* [input](#input)
			* [type](#type)
				* [text](#text)
				* [radio](#radio)
				* [checkbox](#checkbox)
				* [search](#search)
				* [tel](#tel)
				* [url](#url)
				* [email](#email)
				* [date/month/week/time/datetime-local](#datemonthweektimedatetime-local)
			* [indeterminate](#indeterminate)
			* [`list` && `autocomplete`](#list--autocomplete)
			* [pattern](#pattern)
			* [validity](#validity)
		* [output](#output)
		* [textarea](#textarea)
			* [maxlength](#maxlength)
			* [cols](#cols)
			* [wrap](#wrap)
		* [menu](#menu)
		* [dialog](#dialog)
		* [datalist](#datalist)
	* [Content](#content)
		* [details > summary | datalist](#details--summary--datalist)
			* [datagrid](#datagrid)
			* [配合autocomplete属性](#配合autocomplete属性)
			* [open(boolean)](#openboolean)
		* [dl>(multi)dt + (multi)dd](#dlmultidt--multidd)
		* [summary](#summary)
		* [mark](#mark)
		* [ins](#ins)
		* [del](#del)
		* [u](#u)
		* [em](#em)
		* [strong](#strong)
		* [small](#small)
		* [hr](#hr)
		* [`<progress value="" max="">`](#progress-value-max)
		* [meter](#meter)
			* [value](#value)
			* [min](#min)
			* [max](#max)
			* [low](#low)
			* [high](#high)
			* [optimum](#optimum)
		* [wbr](#wbr)
	* [Media](#media)
		* [canvas](#canvas)
		* [figure](#figure)
		* [figcaption](#figcaption)
		* [img](#img)
			* [src](#src)
			* [alt](#alt)
		* [a(anchor)](#aanchor)
			* [href](#href)
			* [id/name](#idname)
			* [target](#target)
		* [embed](#embed)
		* [command](#command)
	* [Information](#information)
		* [time](#time)
			* [pubdate](#pubdate)
			* [datetime](#datetime)
	* [Attributes](#attributes)
		* [Global Attributes](#global-attributes)
			* [contentEditable](#contenteditable)
			* [hidden](#hidden)
			* [spellcheck](#spellcheck)
			* [tabindex](#tabindex)
	* [Geolocation API](#geolocation-api)
	* [Web RTC API](#web-rtc-api)
	* [Web Workers API](#web-workers-api)

# HTML5 Basic Notes

## Emmet

### 嵌套操作

孩子 : >

``` html
div>ul>li
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

兄弟 : +

```html
div+ul>li
<div></div>
<ul>
    <li></li>
</ul>
```

上级：^

```html
ul>li^div
<ul>
    <li></li>
</ul>
<div></div>

ul>li>a^^div
<ul>
    <li><a href=""></a></li>
</ul>
<div></div>
```

重复：*

```html
ul>li*3
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

分组：()

```html
div>(p>span)*2
<div>
    <p><span></span></p>
    <p><span></span></p>
</div>
```

### 属性操作

id:#  class:.

```html
div#header+div.main+div#footer
<div id="header"></div>
<div class="main"></div>
<div id="footer"></div>
```

属性值:[]

```html
a[title=test target=_self]
<a title="test" target="_self" href=""></a>
```

数列值：$

```html
p.item$*3
<p class="item1"></p>
<p class="item2"></p>
<p class="item3"></p>

p.item$$*3
<p class="item01"></p>
<p class="item02"></p>
<p class="item03"></p>
```

数列操作符：@

```html
p.item$@-*3   @- = -1
<p class="item3"></p>
<p class="item2"></p>
<p class="item1"></p>

p.item$@3*3  @3 = 从3开始3次
<p class="item3"></p>
<p class="item4"></p>
<p class="item5"></p>

p.item$@-3*3 @-3 = 3次后到3结束
<p class="item5"></p>
<p class="item4"></p>
<p class="item3"></p>
```

### 字符操作

字符操作：{}

```html
a{click}
<a href="">click</a>

a>{click}+span{me}
<a href="">click<span>me</span></a>
```

### 缺省元素

```html
.header+.footer
 = div.header+div.footer

ul>.item*3
= ul>li.item*3

table>.row*4>.cell*3
=  table>tr.row*4>td.cell*3
```

## Structure

[Reference Website](http://www.html5jscss.com/html5-semantics-section.html)

### section

必须含有**hx**标题子标签

### header

### hgroup

### nav

-   传统导航条
-   侧边栏导航
-   页内跳转
-   翻页操作

### main

-   每个网页只有1个`main`元素
-   `main`不可为`article`、`aside`、`header`、`footer`、`nav`孩子

### address

联系信息 - QQ、住址、电子邮箱、主页链接

### aside

名词解释的附属部分/友情链接/广告

### footer

### blockquote

长文本引用

### pre

代码段

## Form

```html
<form action="表单提交的后台地址接口" method="post"提交方式，一般为post>
	<fieldset 若内容比较多，用来分区>
		<legend>这是分区的标题</legend>
		<label for="file">选择照片按钮</label>
		<input type="file" id="file">

	</fieldset>

	<fieldset>
		<legend>这是分区的标题</legend>
		<div>选择尺寸：</div>
		<input type="checkbox"多选框 name="size"数据名称，交给后台 value="5"值 id="cb_0" checked disabled 默认勾选，无法更改>
		<label for="cb_0">5寸</label>
		<!-- 一个input一个label，一一对应，同类name相同 -->
		<input type="radio"单选框 name="material" value="fushi" id="rd_0">
		<label for="rd_0">富士，单选第一个</label>

		<input type="text"单行文本框，默认 id="dexcription" placeholder="里面是提示" value="这里是默认内容" readonly只读 hidden隐藏>
		<input type="submit"提交按钮> == <button type="submit">提交</button>
		<input type="reset"重置按钮>  == <button type="reset">重置</button>

		<div>
			<label for="delivery" 功能提示信息，通过for与标签对应>配送方式</label>
			<select id="delivery"下拉选择>
			<optgroup label="group1"给选项分组>
				<option value="0">快递</option>
				<option value="1">EMS</option>
			</optgroup>
				<option value="2" selected>平邮</option>
			</select>
		</div>

		<div>
			<label for="feedback">意见反馈,多行文本框</label>
			<textarea name="feedback" rows="4"4行 id="feedback"></textarea>
		</div>
	</fieldset>
</form>

<input type="email">
<input type="url">
<input type="number">
<input type="tel">
<input type="search">
<input type="range">
<input type="color">
<input type="date picker(data,month,week,time,datetime,datetime-local)">
```

#### novalidate

关闭表单的提交验证

### 表单元素共有属性

#### form=form_name

使表单元素可放置于表单之外

#### formaction=target_name

使表单元素可提交到不同页面

#### formmethod=post/get

使表单元素以不同的方式提交

#### formenctype

-   默认值：application/x-www-form-urlencoded  提交前编码所有字符
-   multipart/form-data  不编码字符，**上传控件表单元素**必须使用改值
-   text/plain  表单元素数据中的空格->`+`

#### formtarget

定义表单提交后加载页面打开方式

-   blank     在新窗口中打开被链接文档
-   self      默认:在相同的框架中打开被链接文档
-   parent    在父框架集中打开被链接文档
-   top       在整个窗口中打开被链接文档
-   framename 在指定的框架中打开被链接文档

#### formnovalidate

取消表单元素的提交验证

将submit元素的formnovalidate属性值为true，使整个表单提交验证失效，实现加提交；
进而弹出再次确认按钮(真提交)。

#### autofocus

#### required

### labels

指定表单元素的标签

```html
<label for="input_id">OS : </label>
```

#### 隐式control属性

javascript tips：通过control属性改变标签对应表单元素的值

```javascript
var textbox = $('#label_id').control;
textbox.value = '666666';   //  等同于 input.value = '666666';
```

### input

#### type

##### text

##### radio

name相同时, 多个 radio 组成一个 radio group

##### checkbox

##### search

搜索条

##### tel

电话号码 - 无输入检查

##### url

##### email

##### date/month/week/time/datetime-local

```javasrcipt
stepUp();
stepDown();
```

```html
input.valueAsNumber
input.valueAsDate
```

#### indeterminate

javascript tips：检查type=checkbox的状态

```javascript
if (checkbox.indeterminate) {

} else {
    if (checkbox.checked) {

    } else {

    }
}
```

#### `list` && `autocomplete`

为输入框指定智能提示数据

```html
<input list=datalist_id autocomplete=on >
```

#### pattern

通过正则表达式指定输入格式

```html
<input pattern="[0-9][A-Z]{3}">
```

#### validity

返回ValidityState对象，拥有ValidityState.valid属性

### output

input元素的镜像元素

### textarea

#### maxlength

#### cols

每行可显示字符最大数

#### wrap

-   hard:换行时加入换行标志，**此时必须指定**`cols`属性
-   soft:不加入换行标志

### menu

### dialog

### datalist

```html
style="display: none";

<datalist id="register-prompt" style="display:none;">
    <option value="Windows">Windows</option>
    <option value="Mac OS">Mac OS</option>
    <option value="Linux">Linux</option>
</datalist>
```

## Content

### details > summary | datalist

**Attr** -

#### datagrid

#### 配合autocomplete属性

#### open(boolean)

默认open=false

### dl>(multi)dt + (multi)dd

defined list>defined tab + defined data

### summary

折叠/收缩时触发toggle事件

### mark

突出/高亮显示，无关原文作者

### ins

insert text

### del

delete text

### u

underline text

### em

原文作者文章重点

### strong

原文作者段落强调

### small

-   免责声明、注意事项、法律规定、版权声明
-   不改变文字样式

### hr

下划线

### `<progress value="" max="">`

value/max 百分比

### meter

#### value
#### min
#### max
#### low
#### high
#### optimum

### wbr

软换行

## Media

### canvas

-   绘制路径 beginPath() -> draw() -> closePath()
-   Path2D对象
-   绘制样式 颜色、渐变、变换、阴影
-   绘制图形 fill/stroke/clip

```javascript
vat context = canvas.getContext('2d');
```

```javascript
// 根据参数画线
function drawLine(fromX, fromY, toX, toY) {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
}

// 根据参数画圆
function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
    context.stroke();
}

// 改变 canvas 中图形颜色
function changeColor(color){
    context.fillStyle = color;
    context.fill();
}
```

[Canvas API](Demo/canvas-cheat-sheet.html)

### figure

流内容 如代码、文件、图片、音频、视频

### figcaption

figure可拥有唯一的0/1个figcaption

<figcaption>figure_title</figcaption>

### img

**Attr** -

#### src

#### alt

(图片崩溃时文本)、title(提示信息)、class(CSS类选择器)

### a(anchor)

**Attr** -

#### href

超链接指向--超链接/#id/#name

#### id/name

当前锚点标识

#### target

定义被链接文档出现方式

-   blank     在新窗口中打开被链接文档
-   self      默认:在相同的框架中打开被链接文档
-   parent    在父框架集中打开被链接文档
-   top       在整个窗口中打开被链接文档
-   framename 在指定的框架中打开被链接文档

### embed

插入媒体流

### command

## Information

### time

**Attr** -

#### pubdate

-   boolean 代表当前`<time>`表示整个网页的时间

#### datetime

```html
<time datetime="2010-11-13T20:00Z"></time>
<time datetime="2010-11-13T20:00+09:00"></time>
```

-   `T` 分隔日期与时间
-   `Z` 使用UTC标准时间
-   `+` 时差

## Attributes

### Global Attributes

#### contentEditable

-boolean

#### hidden

**boolean**

#### spellcheck

**boolean**

#### tabindex

**-1**
编程可获得焦点，tab键不可获得焦点

## Geolocation API

```js
if (window.navigator.geolocation) {
        //getCurrentPosition第三个参数为可选参数
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
        // 指示浏览器获取高精度的位置，默认为false
        enableHighAccuracy: true,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 5000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
    });
} else {
    alert("Your browser does not support Geolocation!");
}
```

locationError为获取位置信息失败的回调函数，可以根据错误类型提示信息：

```js
locationError: function(error){
    switch(error.code) {
        case error.TIMEOUT:
            showError("A timeout occured! Please try again!");
            break;
        case error.POSITION_UNAVAILABLE:
            showError('We can\'t detect your location. Sorry!');
            break;
        case error.PERMISSION_DENIED:
            showError('Please allow geolocation access for this to work.');
            break;
        case error.UNKNOWN_ERROR:
            showError('An unknown error occured!');
            break;
    }
}
```

locationSuccess为获取位置信息成功的回调函数，返回的数据中包含经纬度等信息，结合Google Map API 即可在地图中显示当前用户的位置信息，如下：

```js
locationSuccess: function(position){
    var coords = position.coords;
    var latlng = new google.maps.LatLng(
        // 维度
        coords.latitude,
        // 精度
        coords.longitude
    );
    var myOptions = {
        // 地图放大倍数
        zoom: 12,
        // 地图中心设为指定坐标点
        center: latlng,
        // 地图类型
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // 创建地图并输出到页面
    var myMap = new google.maps.Map(
        document.getElementById("map"),myOptions
    );
    // 创建标记
    var marker = new google.maps.Marker({
        // 标注指定的经纬度坐标点
        position: latlng,
        // 指定用于标注的地图
        map: myMap
    });
    //创建标注窗口
    var infowindow = new google.maps.InfoWindow({
        content:"您在这里<br/>纬度："+
            coords.latitude+
            "<br/>经度："+coords.longitude
    });
    //打开标注窗口
    infowindow.open(myMap,marker);
}
```

```navigator.geolocation.watchPosition(locationSuccess, locationError, positionOption)```自动更新地理位置

## Web Storage API

代替cookies

```js
if(!localStorage.getItem('bgcolor')) {
  populateStorage();
} else {
  setStyles();
}

function populateStorage() {
  localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
  localStorage.setItem('font', document.getElementById('font').value);
  localStorage.setItem('image', document.getElementById('image').value);

  setStyles();
}

function setStyles() {
  var currentColor = localStorage.getItem('bgcolor');
  var currentFont = localStorage.getItem('font');
  var currentImage = localStorage.getItem('image');

  document.getElementById('bgcolor').value = currentColor;
  document.getElementById('font').value = currentFont;
  document.getElementById('image').value = currentImage;

  htmlElem.style.backgroundColor = '#' + currentColor;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute('src', currentImage);
}
```

## Web Files API

## Web Sockets API

通信功能

```js
WebSocket WebSocket(
  in DOMString url,
  in optional DOMString protocols
);

WebSocket WebSocket(
  in DOMString url,
  in optional DOMString[] protocols
);
```

```js
function WebSocketTest()
{
  if ("WebSocket" in window)
  {
     alert("WebSocket is supported by your Browser!");
     // Let us open a web socket
     var ws = new WebSocket("ws://localhost:9998/echo");
     ws.onopen = function()
     {
        // Web Socket is connected, send data using send()
        ws.send("Message to send");
        alert("Message is sent...");
     };
     ws.onmessage = function (evt)
     {
        var received_msg = evt.data;
        alert("Message is received...");
     };
     ws.onclose = function()
     {
        // websocket is closed.
        alert("Connection is closed...");
     };
  }
  else
  {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }
}
```

## Web RTC API

多媒体通信

## Web Workers API

多线程处理
