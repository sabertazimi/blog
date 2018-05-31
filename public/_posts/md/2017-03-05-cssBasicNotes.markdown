---
layout:     post
title:      "CSS Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - CSS
---

* [CSS 3 Basic Notes](#css-3-basic-notes)
	* [属性排序](#属性排序)
		* [概述](#概述)
			* [显示属性](#显示属性)
			* [自身属性](#自身属性)
			* [文本属性](#文本属性)
		* [详细](#详细)
			* [显示属性](#显示属性-1)
			* [自身属性](#自身属性-1)
			* [文本属性](#文本属性-1)
	* [命名规范](#命名规范)
		* [页面结构](#页面结构)
		* [导航](#导航)
		* [功能](#功能)
		* [CSS Files](#css-files)
	* [CSS Selector](#css-selector)
		* [pseudo-class-selector](#pseudo-class-selector)
			* [元素选择器](#元素选择器)
			* [关系选择器](#关系选择器)
			* [属性选择器](#属性选择器)
			* [伪类](#伪类)
			* [伪元素](#伪元素)
	* [常用属性](#常用属性)
		* [全局属性值](#全局属性值)
		* [box](#box)
			* [z-index](#z-index)
			* [overflow/overflow-x/overflow-y](#overflowoverflow-xoverflow-y)
			* [text-overflow](#text-overflow)
			* [resize](#resize)
			* [box-sizing](#box-sizing)
			* [height](#height)
			* [column](#column)
			* [Awesome Box Patterns](#awesome-box-patterns)
			* [Block Formatting Context](#block-formatting-context)
				* [Create BFC](#create-bfc)
			* [Flow Patterns](#flow-patterns)
			* [Float Patterns](#float-patterns)
				* [清除浮动](#清除浮动)
				* [Best Practice](#best-practice)
			* [Layer Patterns](#layer-patterns)
			* [Flex Patterns](#flex-patterns)
				* [父元素属性](#父元素属性)
				* [子元素属性](#子元素属性)
				* [Best Practice](#best-practice-1)
			* [分栏问题](#分栏问题)
				* [两栏布局](#两栏布局)
				* [三栏布局](#三栏布局)
			* [居中问题](#居中问题)
				* [不定 block 元素水平居中](#不定-block-元素水平居中)
				* [垂直居中问题](#垂直居中问题)
				* [混合布局](#混合布局)
		* [list-style-type/image](#list-style-typeimage)
		* [custom style](#custom-style)
			* [custom methods](#custom-methods)
				* [transition+transform](#transitiontransform)
				* [直接使用animation](#直接使用animation)
			* [transition](#transition)
			* [transform](#transform)
			* [animation](#animation)
		* [align](#align)
			* [text-align](#text-align)
			* [vertical-align](#vertical-align)
		* [opacity](#opacity)
		* [border](#border)
			* [border-radius](#border-radius)
			* [border-image](#border-image)
		* [background](#background)
			* [background-image](#background-image)
			* [(moz/webkit)background-clip](#mozwebkitbackground-clip)
			* [(moz/webkit)background-origin](#mozwebkitbackground-origin)
			* [background-size](#background-size)
			* [Best Practice](#best-practice-2)
				* [单背景极简欢迎首页](#单背景极简欢迎首页)
		* [text](#text)
		* [font](#font)
			* [font-size](#font-size)
			* [font-style](#font-style)
			* [font-variant](#font-variant)
			* [font-size-adjust](#font-size-adjust)
			* [custom function - @font-face](#custom-function---font-face)
			* [Font Best Practice](#font-best-practice)
		* [filter](#filter)
	* [media query](#media-query)
		* [设备类型](#设备类型)
		* [设备特性](#设备特性)
	* [常用组件](#常用组件)
		* [form](#form)
			* [select](#select)
		* [header](#header)
			* [nav](#nav)
				* [基本原则](#基本原则)
		* [button](#button)
		* [footer](#footer)
		* [picture](#picture)
			* [圆形图片](#圆形图片)
		* [Animation Tips](#animation-tips)
		* [Layout](#layout)
			* [相同单元](#相同单元)
			* [元素定位](#元素定位)
	* [Design](#design)
		* [Color](#color)
			* [Scheme](#scheme)
			* [Lib](#lib)
	* [UI Libraries && Components](#ui-libraries--components)
		* [Utils](#utils)
		* [Society](#society)
		* [Mouse Effect](#mouse-effect)
		* [Message](#message)
			* [Calendar](#calendar)
			* [Time](#time)
		* [Documentation](#documentation)
		* [Editor](#editor)
			* [Emoji](#emoji)
		* [Video](#video)
		* [Images](#images)
			* [Size](#size)
			* [Slide](#slide)
			* [Filter](#filter-1)
			* [Icons](#icons)
		* [Animation](#animation-1)
			* [Particles](#particles)
			* [ Hover](#-hover)
			* [Prompt](#prompt)
			* [Message](#message-1)
		* [Content](#content)
			* [Card](#card)
			* [List](#list)
			* [Nav](#nav-1)
			* [Menu](#menu)
		* [Graph/Chart](#graphchart)
			* [Graph](#graph)
			* [Chart](#chart)
		* [Form](#form-1)
			* [Input](#input)
			* [Search Bar](#search-bar)
			* [Select](#select-1)
			* [Validate](#validate)
		* [Layout](#layout-1)
			* [Page](#page)
			* [Grid](#grid)
			* [Split](#split)
			* [Scroll](#scroll)
			* [Position](#position)
			* [Mail](#mail)
			* [Slide](#slide-1)
			* [Gallery](#gallery)
		* [Geometry](#geometry)
			* [Blocks](#blocks)
		* [Template](#template)
		* [Framework](#framework)
	* [JS Libraries](#js-libraries)
		* [Table](#table)
		* [File](#file)
			* [File Tree View](#file-tree-view)

# CSS 3 Basic Notes

## Best Practice

### Normalize

```css
html {
    box-sizing: border-box
    margin: 0;
    padding: 0;
    font-size: 100%;
}

*, *:before, *:after {
    box-sizing: inherit;
    margin: inherit;
    padding: inherit;
}

body {
    line-height: 1.5;
}
```

### gap

```css
* + * {
    margin-top: 1.5em;
}
```

### rem vs em

*   Size in em if the property scales according to it’s font-size
*   Size everything else in rem

## 属性排序

### 概述

> 显示属性 -> 自身属性 -> 文本属性

#### 显示属性

-   display
-   list-style
-   position
-   float
-   clear

#### 自身属性

-   width
-   height
-   margin
-   padding
-   border
-   background

#### 文本属性

-   color
-   font
-   text-decoration
-   vertical-align
-   white-space
-   other text
-   content

### 详细

#### 显示属性

-   display
-   visibility
-   float
-   clear
-   position
-   top
-   right
-   bottom
-   left
-   z-index

#### 自身属性

-   width
-   min-width
-   max-width
-   height
-   min-height
-   max-height
-   overflow
-   margin
-   margin-top
-   margin-right
-   margin-bottom
-   margin-left
-   padding
-   padding-top
-   padding-right
-   padding-bottom
-   padding-left
-   border-width
-   border-top-width
-   border-right-width
-   border-bottom-width
-   border-left-width
-   border-style
-   border-top-style
-   border-right-style
-   border-bottom-style
-   border-left-style
-   border-color
-   border-top-color
-   border-right-color
-   border-bottom-color
-   border-left-color
-   outline
-   list-style
-   table-layout
-   caption-side
-   border-collapse
-   border-spacing
-   empty-cells

#### 文本属性

-   font
-   font-family
-   font-size
-   line-height
-   font-weight
-   text-align
-   text-indent
-   text-transform
-   text-decoration
-   letter-spacing
-   word-spacing
-   white-space
-   vertical-align
-   color
-   background
-   background-color
-   background-image
-   background-repeat
-   background-position
-   opacity
-   cursor
-   content
-   quotes

## 命名规范

### 页面结构

-   容器: container
-   页头：header
-   内容：content/container
-   页面主体：main
-   页尾：footer
-   导航：nav
-   侧栏：sidebar
-   栏目：column
-   页面外围控制整体佈局宽度：wrapper
-   左右中：left right center

### 导航

-   导航：nav
-   主导航：mainnav
-   子导航：subnav
-   顶导航：topnav
-   边导航：sidebar
-   左导航：leftsidebar
-   右导航：rightsidebar
-   菜单：menu
-   子菜单：submenu
-   标题: title
-   摘要: summary

### 功能

-   标志：logo
-   广告：banner
-   登陆：login
-   登录条：loginbar
-   注册：register
-   搜索：search
-   功能区：shop
-   标题：title
-   加入：joinus
-   状态：status
-   按钮：btn
-   滚动：scroll
-   标籤页：tab
-   文章列表：list
-   提示信息：msg
-   当前的: current
-   小技巧：tips
-   图标: icon
-   注释：note
-   指南：guild
-   服务：service
-   热点：hot
-   新闻：news
-   下载：download
-   投票：vote
-   合作伙伴：partner
-   友情链接：link
-   版权：copyright

### CSS Files

-   主要的 master.css
-   模块 module.css
-   基本共用 base.css
-   布局、版面 layout.css
-   主题 themes.css
-   专栏 columns.css
-   文字 font.css
-   表单 forms.css
-   补丁 mend.css
-   打印 print.css

## CSS Selector

![CSS 3 Selector](images/css3-selector-lest.png)

### pseudo-class-selector

#### 元素选择器

```css
p {
    line-height:1.5em;
    margin-bottom:1em;
}
```

#### 关系选择器

-   E F：所有后代选择器

```css
ul li {
    margin-bottom:0.5em;
}
```

E > F：直接子选择器

```css
ul > li {list-style:none;} //仅限ul的直接子元素li，忽略嵌套子元素
```

E + F：直接相邻兄弟选择器

```css
li + li {
    border-top:1px
    solid #ddd;
}
```

E ~ F：一般兄弟选择器

```css
//定位具有相同父元素的，h1标签之后的所有p标签
h1 ~ p {
    color:#f00;
}
```

#### 属性选择器

`E[attr]`

```css
input[required] {border:1px solid #f00;} //定位页面里所有具有必填属性"required"的input
```

`E[attr=val]`

```css
input[type=password] {border:1px solid #aaa;} //定位页面里的密码输入框
```

`E[attr|=val]`

```csss
p[class|=a] {color:#333;}
//定位页面里所有的P段落里具有class属性且属性值为a或是a-开始的，比如class="a"以及class="a-b"
```

`E[attr~=val]`

```css
div[title~=english] {color:#f88;} //定位页面里所有具有属性title且属性值里拥有完整单词english的div容器，比如title="english"以及title="a english"
```

`E[attr^=val]`

```css
div[class^=a] {color:#666;}
//定位页面里具有属性class且属性值以a开头的div容器，比如class="a"以及class="ab"
```

`E[attr$=val]`

```css
div[class$=a] {color:#f00;}
//定位页面里具有属性class且属性值以a结尾的div窗口，比如class="nba"以及class="cba"
```

`E[attr*=val]`

```css
a[title*=link] {text-decoration:underline;}
//定位所有title里具有link字符串的a链接
```

#### 伪类

-   :link：未访问的链接；
-   :visited：已访问的链接，不建议使用；
-   :hover：鼠标移动到容器，不仅限于链接，可用于页面中的任何元素；
-   :active：被激活时的状态，不仅限于链接，可用于任何具有tabindex属性的元素；
-   :focus：获得焦点时状态，不仅限于链接，可用于任何具有tabindex属性的元素：
-   :enabled：已启用的界面元素：`input`
-   :disabled：已禁用的界面元素：`input`
-   :target：该选择器定位当前活动页面内定位点的目标元素, #anchor-name `#info:target {font-size:24px;}`
-   :default：应用于一个或多个作为一组类似元素中的默认元素的UI元素；
-   :valid：应用于输入验证有效元素，基于input的type/pattern属性
-   :invalid：应用于输入验证无效元素，
-   :in-range：应用于具有范围限制的元素，其中该值位于限制内；比如具有min和max属性的number和range输入框；
-   :out-of-range：与:in-range选择相反，其中该值在限制范围外；
-   :required：应用于具有必填属性required的表单控件；
-   :optional：应用于没有必填属性required的所有表单控件
-   :read-only：应用于其内容无法供用户修改的元素；
-   :read-write：应用于其内容可供用户修改的元素，比如输入框；
-   :root：根元素，始终指html元素；
-   E F:nth-child(n)：该选择器定位元素E的第n个子元素的元素F,可省略E
-   E F:nth-last-child(n)：该选择器定位元素E的倒数第n个子元素的元素F,可省略E
-   E F:nth-of-type(n)：该选择器定位元素E的第n个指定类型子元素,可省略E
-   E F:nth-lash-of-type(n)：该选择器定位元素E的导数第n个指定类型子元素,可省略E
-   E F:first-child
-   E F:last-child
-   E F:first-of-type
-   E F:last-of-type
-   E F:only-child
-   E F:only-of-type
-   E:empty：没有子元素的元素，没有子元素包括文本节点；
-   E:lang(en)：具有使用双字母缩写(en)表示的语言的元素；
-   E:not(exception)：该选择器将选择与括号内的选择器不匹配的元素：

#### 伪元素

-   ::first-line：匹配文本首行；
-   ::first-letter：匹配文本首字母；
-   ::selection：匹配突出显示的文本：

```css
//定义选中的文本颜色与背景色
::selection {background:#444; color:#fff;}
```

-   ::before 与 ::after ：使用 contnet 属性生成额外的内容并插入在标记中：

```css
a:after { content: "↗"; }
```

attr() – 调用当前元素的属性

```css
a:after { content:"(" attr(href) ")"; }
```

url() / uri() – 用于引用媒体文件

```css
h1::before { content: url(logo.png); }
```

counter() –  调用计数器，可以不使用列表元素实现序号功能,配合CSS3中`counter-increment`和`counter-reset`属性

```css
h2:before {
    counter-increment: chapter;
    content: "Chapter " counter(chapter);
}
```

-   [利用伪类画额外图形](https://css-tricks.com/examples/ShapesOfCSS/)

```css
.first-details-intro::after {
     width: 0;
     height: 0;
     content: "";
     position: absolute;
     top: 50%;
     right: 0;
     border-top: 15px solid transparent;
     border-right: 25px solid #fff;
     border-bottom: 15px solid transparent;
}
```

## 常用属性

### 全局属性值

-   auto
-   inherit
-   initial 指定为默认值，用于消除样式
-   none

### box

#### z-index

数值越大，处于可视的优先级越大

#### overflow/overflow-x/overflow-y

visible,hidden,scroll,auto

#### text-overflow

-   clip     切除溢出部分
-   ellipsis 省略号标志

#### resize

前置属性:overflow

```css
/*允许用户修改元素尺寸*/
resize: none/both/horizontal/vertical/inherit;
```

#### box-sizing

content-box(default), padding-box, border-box

#### height

XXvh(viewport height)

直接计算宽度/高度

```js
cal(50% - 100px);
cal(10em + 3px);
```

#### column

```css
/*子元素分列*/
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

-   column-count
-   column-width
-   column-gap         分隔距离
-   column-rule(style) 分隔线

#### Awesome Box Patterns

#### Block Formatting Context

-   一个BFC包含创建该上下文元素的所有子元素，但不包括创建了新BFC的子元素的内部元素
-   一个元素不能同时存在于两个BFC中: 可让处于BFC内部的元素与外部的元素相互隔离

##### Create BFC

-   根元素或其它包含它的元素
-   position: absolute/fixed
-   float: left/right
-   overflow: hidden
-   display: inline-block
-   display: flex/inline-flex
-   display: table-cell

#### Flow Patterns

block 元素宽度为 100%, inline 元素从左至右分布

#### Float Patterns

##### 清除浮动

**Best Practice**: 为父容器添加 clearfix class - `display: table` 防止外边距塌陷, `clear: both` 清楚浮动

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

##### Best Practice

-   段中部分元素浮动(结合 margin/padding), 可实现内嵌效果
-   分栏布局


#### Layer Patterns

**position**

-   static(使top/bottom/left/right属性无效化)
-   relative: 使元素相对于 static 布局, 可使用`top/bottom/left/right`属性进行平移
    -   `top:+px`   : 下移
    -   `bottom:+px`: 上移
    -   `left:+px`  : 右移
    -   `right:+px` : 左移
-   absolute: 使元素相对于 浏览器窗口/父元素 布局, 可使用`top/bottom/left/right`属性进行定位
    -   `top:+px`   : 使元素距离窗口上方距离为正
    -   `bottom:+px`: 使元素距离窗口下方距离为正
    -   `left:+px`  : 使元素距离窗口左方距离为正
    -   `right:+px` : 使元素距离窗口右方距离为正
-   fixed: 使元素想对于 浏览器窗口 布局, 但不受滑动条影响, 可使用`top/bottom/left/right`属性进行定位

```css
/* 使子元素可以相对于父元素布局*/

.parent {
	position: relative;
}

.children {
	position: absolute;

	top:auto;
	left: 0;
}
```

#### Flex Patterns

##### 父元素属性

```css
display: flex;
flex-direction: row/column;
flex-wrap: nowrap/wrap/wrap-reverse;
justify-content: flex-start/flex-end/center/space-between/space-around;
align-content: flex-start/flex-end/center/space-between/space-around;
align-items: flex-start/flex-end/center/baseline/stretch;
```

##### 子元素属性

```css
flex: number;  /*宽/高度权重*/
order: number; /*显示顺序*/
flex-basis: number;
flex-shrink: number;
flex-grow: number;
align-self: auto/flex-start/flex-end/center/baseline/stretch;
```

##### Best Practice

```css
.container {
  display: -webkit-flex;
  display: flex;
}

.initial {
  /*width: 100px~200px*/
  -webkit-flex: initial;
          flex: initial;
  width: 200px;
  min-width: 100px;
}
.none {
  /*width: 200px*/
  -webkit-flex: none;
          flex: none;
  width: 200px;
}
.flex1 {
  /*width: left width * 1/3*/
  -webkit-flex: 1;
          flex: 1;
}
.flex2 {
  /*width: left width * 2/3*/
  -webkit-flex: 2;
          flex: 2;
}
```

```css
/*子元素全部居中对齐*/
.vertical-container {
  height: 300px;

  display: -webkit-flex;
  display:         flex;

  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;
}
```

```css
.layer {
    display: flex;
    margin: 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
    flex-grow: 1;
}

```

#### 分栏问题

-   float 左右元素 + margin 中间元素
-   float 元素 + width: %

##### 两栏布局

利用父元素 relative 与 子元素 absolute 进行布局

```css
.div-1 {
    position:relative;
}

.div-1a {
    position:absolute;
    top:0;
    right:0;
    width:200px;
}

.div-1b {
    position:absolute;
    top:0;
    left:0;
    width:200px;
}
```

##### 三栏布局

```html
<div class="main">
    <div class="body">
    </div>
</div>
<div class="left"></div>
<div class="right"></div>
```

```css
html,
body {
    margin: 0;
    height: 100%;
    font-size: 1.5rem;
}

.left {
    margin-left: -100%;
}

.right {
    margin-left: -120px;
}

.left,
.right {
    height: 100%;
    float: left;
    background-color: #a0b3d6;
}

.left {
    width: 200px;
}

.right {
    width: 120px;
}

.main,
.body {
    height: 100%;
    background-color: #ffe6b8;
}

.main {
    width: 100%;
    float: left;
}

.body {
    /* 内容区域实体, 左右 margin 值为 .left/.right 宽度*/
    margin: 0 130px 0 210px;
}
```

#### 居中问题

[CSS Tricks - Centering CSS Complete Guide](https://css-tricks.com/centering-css-complete-guide/)

##### 不定 block 元素水平居中

-   将元素改为 inline 型

```css
.container{
    text-align: center;
}
.container ul{
    display: inline;
}
```

-   父元素 float, 父子元素 relative

```css
.container{
    float:left;
    position:relative;
    left:50%
}

.container ul{
    position:relative;
    left:-50%;
}
```

##### 垂直居中问题

```css
.container{
    height:100px;
    line-height:100px;
}
```

```css
.container{
    height:300px;
    display:table-cell;     /* IE8以上及Chrome、Firefox */
    vertical-align:middle;  /* IE8以上及Chrome、Firefox */
}
```

##### 混合布局

在子容器中在设置新元素即可

### list-style-type/image

改变ul/ol前标记类型

### custom style

transition添加于普通类选择器
animation添加于普通类选择器或伪类选择器
transform添加于普通类选择器与伪类选择器

#### custom methods

##### transition+transform

```css
.div {
    transform: scaleX(0);
    transition: **transform** .5s ease;
}

.div:hover {
    transform: scaleX(1);
}
```

##### 直接使用animation

#### transition

-   transition-property: color;
-   transition-duration: 1s;
-   transition-timing-function: cubic-bezier(.42, 0, .58, 1);
-   transition-delay: .5s;

#### transform

-   matrix()/matrix3d();
-   rotateX/Y/Z();
-   scaleX/Y/Z();
-   skewX/Y/Z();
-   translateX/Y/Z();

#### animation

**Tip : fade in body style**

```css
@keyframes body-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

body {
    animation-name: body-fade-in;
    animation-duration: 2.5s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
}

```


```css
@keyframes name {
    0%/from {
        color: red;
    }
    50% {
        color: blue;
    }
    100%/to {
        color: green;
    }
}

/*直接动画*/
.div {
    animation-name: name;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(.42, 0, .58, 1);
    animation-delay: .5s;
}

/*hover后再播放动画，高级化transform+transition*/
.div:hover {
    animation-name: name;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(.42, 0, .58, 1);
    animation-delay: .5s;
}
```

-   animation-iteration-count: 执行次数 infinite
-   animation-direction: 执行方向
	-   normal    0%->100%方向
	-   alternate/alternate-reverse 不断交替方向
	-   reverse   100%->0%方向

### align

#### text-align

justify(自适应，左右都无空格)

#### vertical-align

垂直对齐方式

### opacity

0 ~ 1, 渐进效果常用属性

### border

#### border-radius

```css
[ <length> | <percentage> ]{1,4} [ / [ <length> | <percentage> ]{1,4} ]?
```

#### border-image

```css
<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>
```

### background

#### background-image

-   url()
-   linear-gradient()
-   radial-gradient()

#### (moz/webkit)background-clip

指定背景显示范围  content-box/padding-box/border-box

#### (moz/webkit)background-origin

指定背景绘制起点  content-box/padding-box/border-box

#### background-size

-   contain
-   cover

#### Best Practice

##### 单背景极简欢迎首页

```css
.jumbotron {
	background-image: url("");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	height: 1px;
	width: 1px;
}
```

### text

```css
.text {
	text-align: center;
	text-decoration: underline/line-through;  /* 下划线与删除线 */
}

.paragraph {
    text-indent: 2em;     /* 段落缩进 */
	line-height: 1.5em;   /* 行间距  */
	letter-spacing: 50px; /* 字间距  */
	word-spacing: 50px;   /* 词间距  */
}
```

### font

#### font-size

**Best Practice**

```css
html {
    /*浏览器默认size为16px，此时将html-size自动计算为10px*/
    font-size:62.5%;
}

small {
    /*11px*/
    font-size: 1.1rem;
}

strong {
    /*18px*/
    font-size: 1.8rem;
}
```

#### font-style

normal,italic,oblique

#### font-variant

normal,small-caps(小型大写字母)

#### font-size-adjust

-   使字体保持大小，不随字体类型改变而改变
-   不同字体有不同的值(x-height/字体尺寸)

#### custom function - @font-face

使用户使用服务端提供的字体(bootstrap中有使用@font-face)

```css
@font-face {
    /*:call <SNR>105_SparkupNext()*/
    font-family:mySpecialFont;
    font-style/font-weight/font-variant:inherit;
    src:url(‘./Colleen.ttf’);
}

/*selector {*/
    /*:call <SNR>105_SparkupNext()*/
    /*font-family:mySpecialFont;*/
/*}*/
```

#### Font Best Practice

```css
    text-decoration: none;
	text-transform: uppercase;

    color: black;
	line-height: 100px;

    letter-spacing: 1.3px;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 400;
```

```css
小米米官网: {
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

淘宝技术研发中心: {
    font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
}

加网: {
    font: 14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
}

淘宝UED: {
    font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
}

一淘UX: {
    font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}

{
    font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;

}
```

```css
宋体 SimSun
黑体 SimHei
微软雅黑 Microsoft YaHei
微软正黑体 Microsoft JhengHei
新宋体 NSimSun
新细明体 PMingLiU
细明体 MingLiU
标楷体 DFKai-SB
仿宋 FangSong
楷体 KaiTi
仿宋_GB2312 FangSong_GB2312
楷体_GB2312 KaiTi_GB2312

宋体：SimSun

华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light


新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei

隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei
```

### filter

来源自SVG的滤镜特效

```css
filter: url(resources.svg);/*引用SVG filter元素*/
filter: blur(5px);         /*模糊*/
filter: brightness(0.4);   /*高光*/
filter: contrast(200%);    /*对比度*/
filter: drop-shadow(16px 16px 20px blue);  /*阴影*/
filter: grayscale(50%);    /*灰度*/
filter: hue-rotate(90deg); /*色相旋转*/
filter: invert(75%);       /*颜色翻转/反相*/
filter: opacity(25%);      /*透明度*/
filter: saturate(30%);     /*饱和度*/
filter: sepia(60%);        /*老照片*/

/* Apply multiple filters */
filter: contrast(175%) brightness(3%);

/* Global values */
filter: inherit;
filter: initial;
filter: unset;
```

## media query

```css
@media (not/only) 设备类型 and ( (not) 设备特性),
(not/only) 设备类型 and ( (not) 设备特性-1) and ( (not) 设备特性-2) {
    样式代码
}
```

```css
/*screen size : 500px ~ 1000px*/
@media screen and (min-width: 500px) and (max-width: 1000px) {
    .container {
        width: 750px;
    }
}
```

### 设备类型

|类型|解释|
|:---------------:|:--------------------:|
|all|所有设备|
|braille|盲文|
|embossed|盲文打印|
|handheld|手持设备|
|print|文档打印或打印预览模式|
|projection|项目演示，比如幻灯|
|screen|彩色电脑屏幕|
|speech|演讲|
|tty|固定字母间距的网格的媒体，比如电传打字机|
|tv|电视|

### 设备特性

|属性|值|Min/Max|描述|
|:----------:|:-------:|:-----:|:---------------:|
|aspect-ratio|整数/整数|yes|渲染界面的宽高比例|
|device-aspect-ratio|整数/整数|yes|设备屏幕的宽高比例|
|color|整数|yes|每种色彩的字节数|
|color-index|整数|yes|色彩表中的色彩数|
|height|length|yes|渲染界面的高度|
|width|length|yes|渲染界面的宽度|
|device-height|length|yes|设备屏幕的输出高度|
|device-width|length|yes|设备屏幕的输出宽度|
|grid|整数|no|是否是基于格栅的设备|
|monochrome|整数|yes|单色帧缓冲器中每像素字节|
|resolution|分辨率(“dpi/dpcm”)|yes|分辨率|
|scan|Progressive interlaced|no|tv媒体类型的扫描方式|
|orientation|Portrait/landscape|no|横屏或竖屏|

## 常用组件

-   **reset.css**

### form

#### select

```css
.custom-select {
    width: 15%;
    height: 35px;
    margin-right: 20px;

    /* 消除默认箭头 */
    text-indent: 0.01px;
    text-overflow: "";

    /* 自定义边框 */
    border: 0;

    /* 将箭头图片移至右端 */
    background: url('../img/arrow.png') no-repeat;
    background-color: #fff;
    background-position: right;

    /* 消除默认样式 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.custom-select:focus {
    border: 1px solid #e74f4d;
}

.custom-select option {
    width: 100%;
    height: 25px;
    padding-left: 30px;

    color: #323333;
    background-color: #fff;

    line-height: 25px;
}

.custom-select option:hover {
    color: #fff;
    background: url(../img/tick.png) no-repeat 8px center;
    background-color: #e74f4d;
}
```

### header

#### nav

##### 基本原则

对 a 标签进行样式设置

```css
ul {
    /* 垂直菜单设置宽度, 水平菜单不设置宽度*/
    list-style: none;
}

/* 水平菜单 */
li {
    float: left;
}

a {
    display: block;
    text-decoration: none;
}

```

### button

-   padding

```css
a.btn-custom {
	border-radius: 0;
	background-color: black;
	padding: 10px 40px;
    text-align: center;
    line-height: 100px;
}
```

### footer

### picture

#### 圆形图片

```css
{
    border-radius: 50%;
    overflow: hidden;
}
```

### Animation Tips

切换动画时, 需要先把之前的动画清楚(防止出现闪烁 Bug )

### Layout

#### 相同单元

-   ul + li + float
-   .container{text-align:center;} + .content{width: xx%;}

#### 元素定位

-   align
-   margin + padding
-   position + top/bottom/left/right
-   float
-   flex

## Design

content -> centering -> font family -> spacing -> color&contrast -> balance(position) -> primary/secondary color -> custom font -> images/links

> reference: [web design in 4 minutes](http://jgthms.com/web-design-in-4-minutes/#share)

### Color

#### Scheme 

-   floralwhite + #7986cb
-   http://www.gradifycss.com/

#### Lib

-   https://github.com/adriantoine/kewler

## UI Libraries && Components

-   http://microjs.com/

### Utils

-   [CSS Reset](https://github.com/necolas/normalize.css)
-   [Feature/Browser Detection](https://github.com/Modernizr/Modernizr)

### Society

-   [一键分享](https://github.com/overtrue/share.js)
-   [sharing](https://github.com/mxstbr/sharing)

### Mouse Effect

-   https://github.com/processing/p5.js
-   https://github.com/yoannmoinet/nipplejs

### Message

#### Calendar

-   [GitHub Style Calendar](https://github.com/DKirwan/calendar-heatmap)

#### Time

-    [bower install pickadate](https://github.com/amsul/pickadate.js)

### Documentation

-   https://github.com/usablica/intro.js

### Editor

-   [Wang Editor - Rich Text Editor](https://github.com/wangfupeng1988/wangEditor)
-   [React Built In Editor](https://github.com/facebook/draft-js)

#### Emoji

-   [OwO Keyboard Emoji](https://github.com/DIYgod/OwO)
-   [Emoji Panel](https://github.com/TimeToKnow/emoji-panel)

### Video

-   [HTML5 Video Player - video.js](https://github.com/videojs/video.js)
-   [plyr](https://github.com/selz/plyr)

### Images

#### Size

-   [Variant Size Pictures](https://github.com/imulus/retinajs)

#### Slide

-   https://github.com/hustcc/placeholder.js
-   [Pictures Viewer Gallery](https://github.com/fengyuanchen/viewerjs)

#### Filter

-   [Pictures Color Style Filter](https://github.com/we-are-next/cssco)
-   [Rainyday Effect](https://github.com/maroslaw/rainyday.js)
-   [Canvas Manipulation](https://github.com/meltingice/CamanJS/)
-   https://github.com/HumbleSoftware/js-imagediff

#### Icons

-   [SVG Logos](https://github.com/gilbarbara/logos)


### Animation

-   [Awesome Effect Library - Effeckt.css](https://github.com/h5bp/Effeckt.css)
-   [animate.css](https://github.com/daneden/animate.css)
-   [anime.js](https://github.com/juliangarnier/anime)
-   [Velocity Animation](https://github.com/julianshapiro/velocity)
-   [Ramjet](https://github.com/rich-harris/ramjet)
-   [barba.js](https://github.com/luruke/barba.js)
-   [Scroll Up Animation](https://github.com/michalsnik/aos)
-   [Mottojs - animated words](https://github.com/jrainlau/motto)

#### Particles

-   https://github.com/MapleRecall/html5-particles

####  Hover

-   [Hovering Button Effects](https://github.com/IanLunn/Hover)
-   [Balloon Hovering Tooltips](https://github.com/kazzkiq/balloon.css)
-   [Hint.css - Tooltips](https://github.com/chinchang/hint.css)

#### Prompt

-   [GalGame ChatView](https://github.com/webcyou/MessageViewJS)
-   https://github.com/FezVrasta/popper.js
-   https://github.com/wavded/humane-js
-   [Desktop Notification](https://github.com/Nickersoft/push.js)
-   [Nodejs Notification](https://github.com/mikaelbr/node-notifier)

#### Message

-   [Awesome Prompt Messenger](https://github.com/HubSpot/messenger)
-   [TheaterJS - Typing Effect](https://github.com/Zhouzi/TheaterJS)

### Content

#### Card

-   [GitHub Information Card](https://github.com/lepture/github-cards)
-   https://github.com/bootcards/bootcards

#### List

-   [Sortable](https://github.com/RubaXa/Sortable)

#### Nav

-   https://github.com/VPenkov/okayNav

#### Menu

-   [Menu Icon Click Animation](https://github.com/jonsuh/hamburgers)

### Graph/Chart

#### Graph

-   [Sigmajs - Graph Drawing](https://github.com/jacomyal/sigma.js)

#### Chart

-   [HTML5 Chart](https://github.com/chartjs/Chart.js)

### Form

#### Input

-   [Super Placeholder](https://github.com/chinchang/superplaceholder.js)

#### Search Bar

-   [React Search Bar](https://github.com/searchkit/searchkit)

#### Select

-   [Awesome Chosen](https://github.com/harvesthq/chosen)

#### Validate

-   [jQuery Form Validator](https://github.com/victorjonsson/jQuery-Form-Validator)

### Layout

#### Page

-   [Full Page Layout](https://github.com/alvarotrigo/fullPage.js)
-   [One Page Layout](https://github.com/davist11/jQuery-One-Page-Nav)

#### Grid

-   [Bricks Layout](https://github.com/callmecavs/bricks.js)
-   [Brick Layer](https://github.com/ademilter/bricklayer)

#### Split

-   [SplitJS](https://github.com/nathancahill/Split.js)

#### Scroll

-   [视差滚动](https://github.com/Prinzhorn/skrollr)

#### Position

-   [定位元素 - tether](https://github.com/HubSpot/tether)

#### Mail

-   [Mail Generator](https://github.com/eladnava/mailgen)

#### Slide

-   [One Page Style Vertical-Silde](https://github.com/MopTym/doSlide)
-   [Awesome Slide Gallery](https://github.com/kenwheeler/slick)
-   [Awesome PPT/Prezi](https://github.com/impress/impress.js)

#### Gallery

-   [Light Gallery](https://github.com/sachinchoolur/lightgallery.js/)
-   [Photo Swipe](https://github.com/dimsemenov/PhotoSwipe)

### Geometry

#### Blocks

-   [obelisk.js](https://github.com/nosir/obelisk.js)

### Template

-   [Free Bootstrap 3 Admin Template](https://github.com/puikinsh/gentelella)

### Framework

-   [HTML Presentation Framework](https://github.com/hakimel/reveal.js)
-   [React Material UI](https://github.com/callemall/material-ui)

## JS Libraries

### Table

-   [jQuery Plugin for Render Data](https://github.com/DataTables/DataTables)
-   [Extended Bootstrap Table](https://github.com/wenzhixin/bootstrap-table)

### File

#### File Tree View

-   https://github.com/zTree/zTree_v3
