---
layout:     post
title:      "HTML Basic Notes"
subtitle:   "Be a Stupid Learner"
date:       2017-06-11
author:     "Sabertaz"
header-img: "images/home-bg.jpg"
tags:
    - Frontend Development
    - Web Development
    - HTML
---

# HTML5 Basic Notes

## Emmet

### 嵌套操作

孩子 : >

```html
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

重复：\*

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

id:# class:.

```html
div#header+div.main+div#footer
<div id="header"></div>
<div class="main"></div>
<div id="footer"></div>
```

属性值:[]

```html
a[title=test target=_self] <a title="test" target="_self" href=""></a>
```

数列值：\$

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
p.item$@-*3 @- = -1
<p class="item3"></p>
<p class="item2"></p>
<p class="item1"></p>

p.item$@3*3 @3 = 从3开始3次
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
.header+.footer = div.header+div.footer ul>.item*3 = ul>li.item*3
table>.row*4>.cell*3 = table>tr.row*4>td.cell*3
```

## Structure

[Reference Website](http://www.html5jscss.com/html5-semantics-section.html)

### section

必须含有**hx**标题子标签

### header footer

not only can the page `<body>` contain a header and a footer,
but so can every `<article>` and `<section>` element

### hgroup

### nav

- 传统导航条
- 侧边栏导航
- 页内跳转
- 翻页操作

### main

- 每个网页只有 1 个`main`元素
- `main`不可为`article`、`aside`、`header`、`footer`、`nav`孩子

### address

联系信息 - QQ、住址、电子邮箱、主页链接

### aside

名词解释的附属部分/友情链接/广告

### blockquote

长文本引用

### pre

代码段

## Head Tag

- [Meta Data in `head`](https://gethead.info/)

### Favicon

```html
<head>
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
</head>
```

## Form

- [Form Design Patterns](https://adamsilver.io/articles/form-design-from-zero-to-hero-all-in-one-blog-post)

```html
<form action="表单提交的后台地址接口" method="post" 提交方式，一般为post>
  <fieldset 若内容比较多，用来分区>
    <legend>这是分区的标题</legend>
    <label for="file">选择照片按钮</label>
    <input type="file" id="file" />
  </fieldset>

  <fieldset>
    <legend>这是分区的标题</legend>
    <div>选择尺寸：</div>
    <input
      type="checkbox"
      多选框
      name="size"
      数据名称，交给后台
      value="5"
      值
      id="cb_0"
      checked
      disabled
      默认勾选，无法更改
    />
    <label for="cb_0">5寸</label>
    <!-- 一个input一个label，一一对应，同类name相同 -->
    <input type="radio" 单选框 name="material" value="fushi" id="rd_0" />
    <label for="rd_0">富士，单选第一个</label>

    <input
      type="text"
      单行文本框，默认
      id="dexcription"
      placeholder="里面是提示"
      value="这里是默认内容"
      readonly只读
      hidden隐藏
    />
    <input type="submit" 提交按钮 /> == <button type="submit">提交</button>
    <input type="reset" 重置按钮 /> == <button type="reset">重置</button>

    <div>
      <label for="delivery" 功能提示信息，通过for与标签对应>配送方式</label>
      <select id="delivery" 下拉选择>
        <optgroup label="group1" 给选项分组>
          <option value="0">快递</option>
          <option value="1">EMS</option>
        </optgroup>
        <option value="2" selected>平邮</option>
      </select>
    </div>

    <div>
      <label for="feedback">意见反馈,多行文本框</label>
      <textarea name="feedback" rows="4" 4行 id="feedback"></textarea>
    </div>
  </fieldset>
</form>

<input type="email" />
<input type="url" />
<input type="number" />
<input type="tel" />
<input type="search" />
<input type="range" />
<input type="color" />
<input type="date picker(data,month,week,time,datetime,datetime-local)" />
```

### validate

- [Complete Guide for Form Validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
- [Complete Guide for Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)

### novalidate

关闭表单的提交验证

### 表单元素共有属性

#### form=form_name

使表单元素可放置于表单之外

#### formaction=target_name

使表单元素可提交到不同页面

#### formmethod=post/get

使表单元素以不同的方式提交

#### formenctype

- 默认值：application/x-www-form-urlencoded 提交前编码所有字符
- multipart/form-data 不编码字符，**上传控件表单元素**必须使用改值
- text/plain 表单元素数据中的空格->`+`

#### formtarget

定义表单提交后加载页面打开方式

- blank 在新窗口中打开被链接文档
- self 默认:在相同的框架中打开被链接文档
- parent 在父框架集中打开被链接文档
- top 在整个窗口中打开被链接文档
- framename 在指定的框架中打开被链接文档

#### formnovalidate

取消表单元素的提交验证

将 submit 元素的 formnovalidate 属性值为 true，使整个表单提交验证失效，实现加提交；
进而弹出再次确认按钮(真提交)。

#### autofocus

#### required

### labels

指定表单元素的标签

```html
<label for="input_id">OS : </label>
```

#### 隐式 control 属性

javascript tips：通过 control 属性改变标签对应表单元素的值

```javascript
var textbox = $('#label_id').control;
textbox.value = '666666'; //  等同于 input.value = '666666';
```

### input

#### type

##### text

##### radio

name 相同时, 多个 radio 组成一个 radio group

##### checkbox

##### search

搜索条

##### tel

电话号码 - 无输入检查

##### url

##### email

##### date/month/week/time/datetime-local

```javascript
stepUp();
stepDown();
```

```html
input.valueAsNumber input.valueAsDate
```

#### indeterminate

javascript tips：检查 type=checkbox 的状态

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
<input list="datalist_id" autocomplete="on" />
```

#### pattern

通过正则表达式指定输入格式

```html
<input pattern="[0-9][A-Z]{3}" />
```

#### validity

返回 ValidityState 对象，拥有 ValidityState.valid 属性

### output

input 元素的镜像元素

### textarea

#### maxlength

#### cols

每行可显示字符最大数

#### wrap

- hard:换行时加入换行标志，**此时必须指定**`cols`属性
- soft:不加入换行标志

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

### Form Demo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign Up Form</title>
    <link rel="stylesheet" href="css/normalize.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/main.css" />
  </head>
  <body>
    <form action="index.html" method="post">
      <h2>Your basic info</h2>

      <label for="name">Name</label>
      <input type="text" id="name" name="student_name" />

      <label for="mail">Email</label>
      <input type="email" id="mail" name="student_email" />

      <label for="password">Password</label>
      <input type="password" id="password" name="student_password" />

      <label>Age:</label>
      <input
        type="radio"
        id="under_16"
        value="under_16"
        name="user_age"
      /><label for="under_16" class="light">Under 16</label><br />
      <input type="radio" id="over_16" value="over_16" name="user_age" /><label
        for="over_16"
        class="light"
        >16 or Older</label
      >

      <h2>Your profile</h2>

      <label for="bio">Biography</label>
      <textarea id="bio" name="student_bio"></textarea>

      <label for="courses">Select Courses</label>
      <select id="courses" name="student_courses">
        <optgroup label="Engineering">
          <option value="computer_engineering"
            >Computer Science Engineering</option
          >
          <option value="slectrical_engineering">Electrical Engineering</option>
          <option value="mechanical_engineering">Mechanical Engineering</option>
          <option value="civil_engineering">Civil Engineering</option>
          <option value="chemical_engineering">Chemical Engineering</option>
        </optgroup>
        <optgroup label="Management">
          <option value="finance_management">Finance Management</option>
          <option value="technology_management">Technology Management</option>
          <option value="marketing_management">Marketing Management</option>
          <option value="business_administration"
            >Business Administration</option
          >
        </optgroup>
      </select>

      <label>Interests:</label>
      <input
        type="checkbox"
        id="engineering"
        value="interest_engineering"
        name="user_interest"
      /><label class="light" for="engineering">Engineering</label><br />
      <input
        type="checkbox"
        id="business"
        value="interest_business"
        name="user_interest"
      /><label class="light" for="business">Business</label><br />
      <input
        type="checkbox"
        id="law"
        value="interest_law"
        name="user_interest"
      /><label class="light" for="law">Law</label>

      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

## Content

### details > summary | datalist

**Attr** -

#### datagrid

#### 配合 autocomplete 属性

#### open(boolean)

默认 open=false

### dl>(multi)dt + (multi)dd

defined list>defined tab + defined data

### summary

折叠/收缩时触发 toggle 事件

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

- 免责声明、注意事项、法律规定、版权声明
- 不改变文字样式

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

### figure

流内容 如代码、文件、图片、音频、视频

### figcaption

figure 可拥有唯一的 0/1 个 figcaption

`<figcaption>figure_title</figcaption>`

### img

**Attr** -

#### src

#### alt

(图片崩溃时文本)、title(提示信息)、class(CSS 类选择器)

#### Responsive Images

```html
<!-- `img` element -->
<img src="foo" alt="bar" />

<!-- `img` element, `srcset` attribute -->
<img
  srcset="foo-320w.jpg 320w, foo-480w.jpg 480w, foo-800w.jpg 800w"
  sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
  src="foo-800w.jpg"
  alt="bar"
/>

<!-- `picture` and `source` elements, `srcset` attributes -->
<picture>
  <source media="(max-width: 799px)" srcset="foo-480w.jpg" />
  <source media="(min-width: 800px)" srcset="foo-800w.jpg" />
  <img src="foo-800w.jpg" alt="bar" />
</picture>
```

### a(anchor)

**Attr** -

#### href

超链接指向--超链接/#id/#name

#### id/name

当前锚点标识

#### target

定义被链接文档出现方式

- blank 在新窗口中打开被链接文档
- self 默认:在相同的框架中打开被链接文档
- parent 在父框架集中打开被链接文档
- top 在整个窗口中打开被链接文档
- framename 在指定的框架中打开被链接文档

### embed

插入媒体流

### command

## Information

### time

#### pubdate

- boolean 代表当前`<time>`表示整个网页的时间

#### datetime

```html
<time datetime="2010-11-13T20:00Z"></time>
<time datetime="2010-11-13T20:00+09:00"></time>
```

- `T` 分隔日期与时间
- `Z` 使用 UTC 标准时间
- `+` 时差

## Attributes

### dataset

```html
<td data-row="1" data-column="1"></td>
```

```js
const onChange = event => {
  const {
    currentTarget: {
      dataset: { row, column }
    }
  } = event;
};
```

### Global Attributes

#### contentEditable

-boolean

#### hidden

boolean

#### spellcheck

boolean

#### tabindex

**-1**: 编程可获得焦点，tab 键不可获得焦点

## Nginx Config

子域名设置:

```bash
sudo mkdir -p /var/www/blog/html
sudo chown -R $USER:$USER /var/www/blog/html
sudo chmod -R 755 /var/www
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/blog
# change 'root' and 'server_name' config, remove 'default_server' config
sudo vim /etc/nginx/sites-available/blog
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Accessbility

- 不要将颜色作为传达信息的唯一手段 (色盲/弱)
- 确保文本与其背景保持足够的对比
- 提供输入焦点的视觉提示
- 注意表单
- 避免组件识别障碍

### Semantic HTML

- [Definitive Guide](https://css-tricks.com/how-to-section-your-html)
- [Semantic HTML Presentation](http://justineo.github.io/slideshows/semantic-html/#/)

### Structure Access

- header
- main
- footer
- section
- article
- nav
- aside

#### Body Access

```html
<header>
  <nav>
    <ul>
      <li><a></a></li>
    </ul>
  </nav>
</header>

<main></main>

<footer></footer>
```

#### Article Access

The `<article>` element is used to represent a fully self-contained region of content

```html
<article>
  <header>
    <h1>Why you should buy more cheeses than you currently do</h1>
  </header>
  <section>
    <header>
      <h2>Part 1: Variety is spicy</h2>
    </header>
    <!-- cheesy content -->
  </section>
  <section>
    <header>
      <h2>Part 2: Cows are great</h2>
    </header>
    <!-- more cheesy content -->
  </section>
</article>
```

#### Radio Group with `fieldset` and `legend`

```html
<form>
  <fieldset>
    <legend>Choose one of these three items:</legend>
    <input id="one" type="radio" name="items" value="one" />
    <label for="one">Choice One</label><br />
    <input id="two" type="radio" name="items" value="two" />
    <label for="two">Choice Two</label><br />
    <input id="three" type="radio" name="items" value="three" />
    <label for="three">Choice Three</label>
  </fieldset>
</form>
```

### Element Access

#### Reference Access

- `<cite>`
- `<q>`
- `<blockquote>`
- `<code>`

```html
<p>
  Everytime Kenny is killed, Stan will announce
  <q cite="http://en.wikipedia.org/wiki/Kenny_McCormick#Cultural_impact">
    Oh my God, you/they killed Kenny! </q
  >.
</p>
```

```html
<blockquote cite="https://www.huxley.net/bnw/four.html">
  <p>
    Words can be like X-rays, if you use them properly – they'll go through
    anything. You read and you're pierced.
  </p>
</blockquote>

<cite>– Aldous Huxley, Brave New World</cite>
```

#### Text Access

- `<b>`
- `<strong>`
- `<mark>`
- `<ins>`
- `<del>`

不要将 `<b>` 元素与 `<strong>`、`<em>` 或 `<mark>` 元素混淆:

- `<strong>` 元素表示某些重要性的文本
- `<em>` 强调文本
- `<mark>` 元素表示某些相关性的文本

#### Button Access

Use `<button>` for clickable elements

#### Image Access

- alt=""

#### Audio/Source Access

- src=""
- type=""

#### Figure Access

```html
<figure>
  <img src="" alt="" />
  <br />
  <figcaption></figcaption>
</figure>
```

#### Form Access

- label[for] input

```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" />
</form>
```

#### Time Access

```html
<time datetime="2016-09-15">Thursday, September 15<sup>th</sup></time>
```

#### Address Access

```html
<footer>
  <section class="contact" vocab="http://schema.org/" typeof="LocalBusiness">
    <h2>Contact us!</h2>
    <address property="email">
      <a href="mailto:us@example.com">us@example.com</a>
    </address>
    <address property="address" typeof="PostalAddress">
      <p property="streetAddress">123 Main St., Suite 404</p>
      <p>
        <span property="addressLocality">Yourtown</span>,
        <span property="addressRegion">AK</span>,
        <span property="postalCode">12345</span>
      </p>
      <p property="addressCountry">United States of America</p>
    </address>
  </section>
</footer>
```

#### Color Contrast

- more than 4.5:1 ratio

#### Accesskey and Tabindex

```html
<a id="second" href="" accesskey="c"></a>
```

```js
document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        // escape
        case 27:
            // exit
            break;
        // enter || spacebar
        case 13 || 32:
            // submit or something
            break;
        // left arrow
        case 37:
            // move back / previous
            break;
        // right arrow
        case 39:
            // move forward
            break;
        // up arrow
        case 38:
            // move up
            break;
        // down arrow
        case 40:
            // move down
            break;
       }
}
```

```js
/**
 * Traps the tab key inside of the context, so the user can't accidentally get
 * stuck behind it.
 *
 * Note that this does not work for VoiceOver users who are navigating with
 * the VoiceOver commands, only for default tab actions. We would need to
 * implement something like the inert attribute for that (see https://github.com/WICG/inert)
 * @param  {object} e the Event object
 */
export function trapTabKey(e, context) {
  if (e.key !== 'Tab') return;

  let focusableItems = getFocusable(context);
  let focusedItem = document.activeElement;

  let focusedItemIndex = focusableItems.indexOf(focusedItem);

  if (e.shiftKey) {
    if (focusedItemIndex == 0) {
      focusableItems[focusableItems.length - 1].focus();
      e.preventDefault();
    }
  } else {
    if (focusedItemIndex == focusableItems.length - 1) {
      focusableItems[0].focus();
      e.preventDefault();
    }
  }
}
```

### ARIA

[Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria):

- `aria-label`
- `aria-labelledby="dropdownMenuButton"`: dropdown/form
- `aria-disabled="true"`: disable element
- `aria-controls="navbarSupportedContent"`: navigation
- `aria-expanded="false"`: dropdown
- `aria-haspopup="true"`: dropdown/popup
- `aria-current="pages`: breadcrumb
- `aria-valuenow`/`aria-valuemin`/`aria-valuemax`: progress
- `aria-describledBy`: input + small

```html
<button
  class="list-expander"
  aria-expanded="false"
  aria-controls="expandable-list-1"
>
  Expand List
</button>
<ul id="expandable-list-1">
  <li><a href="http://example.com">Sample Link</a></li>
  <li><a href="http://example.com">Sample Link 2</a></li>
  <li><a href="http://example.com">Sample Link 3</a></li>
</ul>
```

```js
const listExpander = document.querySelector('.list-expander');
const list = document.querySelector('#expandable-list-1');

listExpander.addEventListener('click', e => {
  if (list.getAttribute('aria-expanded') === 'true') {
    list.setAttribute('aria-expanded', 'false');
  } else {
    list.setAttribute('aria-expanded', 'true');
  }
});
```
