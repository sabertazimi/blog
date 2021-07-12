---
layout: post
title: 'CSS Advanced Notes'
subtitle: 'Be a Stupid Learner'
date: 2017-04-13
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - Frontend Development
  - Web Development
  - CSS
---

# CSS Advanced Notes

content -> centering -> font family -> spacing -> color&contrast
-> balance(position) -> primary/secondary color -> custom font -> images/links

## Typography Principles

- The typeface (font-family)
- Type (modular) scale
- Responsiveness of the text (size unit and breakpoints)
- Spacing and vertical rhythm
- Colors (theming)

> refer to: font-family, font-size, spacing, color

- [reference](https://noti.st/rar/mz1rIY/golden-rules-of-typography-on-the-web)
- [Praticel Typography](https://practicaltypography.com)

### font-size and spacing

- set a base-size
- multiples of base-size
- use rem for most font-size, use em for some spacing (needing responsive design)

```scss
$xs: $base / $ratio / $ratio;
$sm: $base / $ratio;
$md: $base;
$lg: $base * $ratio;
$xl: $base * $ratio * ratio;
```

#### font-size

- rem is better
- em for responsive layout (etc. layer2 font based-on layer1 font in dropdown menu)
- make text legible: at least `16px`

#### spacing

make text breathe:

- margin/padding: at least `15px`
- line-height: `1.4`
- word-spacing
- letter-spacing
- 60-100 characters per line

#### vertical rhythms

keep vertical spaces between elements on a page
consistent (and relative) to each other:

- Set the vertical white space between elements to a multiple of base-size
- Set the line-height of all text elements to a multiple of base-size

### Table

- remove fills, gridlines, border and bolding
- left-align text, right-align numbers
  and align headings with data
- put white space to work to group and separate

## Grid System

- Must have different traits at different sizes
- Must be fluid between breakpoints
- Must have enough control to decide which columns will transform and at which point
- Classes should ideally still make sense at all breakpoints

## Form Design Principles

### Buttons Placement Principles

- Align the primary button to the left edge of the inputs
- Put the back button above the form
- Put tangentially related actions above the form
- Place extra buttons based on what they do
- In some single field forms put the button next to the input (e.g `search` button)
- Put buttons on multi select forms above the form

> <https://adamsilver.io/articles/where-to-put-buttons-in-forms>

## Graceful Degration

write old browser css code,
then write modern browser css code

```css
.grid {
  display: flex;
}

/* old browser dosen't support this rule */
/* old browser will ignore this rule */
.grid {
  display: grid;
}
```

## CSS Houdini

- [Draft](https://drafts.css-houdini.org)
- [Implementaion Status](https://ishoudinireadyyet.com/)

CSS Houdini bring many API:

- css properties and values api:
  custom properties (--var, var(--var)), custom function (--darken(--var))
- css layout api (layoutWorklet):
  layout below (display: flex/grid), layout above (css-sizing: min-content/max-content/fit-content)
- css paint api (paintWorklet):
  background, background-color, background-image
- css composite api (compositeWorklet)

to let developers enhance css without any browser updates

## CSS Performance

### Basic Perf Tips

- use `audits` panel to diagnose
- use CSS shorthand and color shortcuts
- eliminate unneeded zeros and units
- remove unused CSS by `coverage` panel of Devtools
- `link` is parallel, `@import` isn't parallel

### CSS Selectors

减少选择器的复杂性，与构造样式本身的其他工作相比，
选择器复杂性可以占用计算元素样式所需时间的 50%以上

### CSS Triggers

- [CSS Triggers](https://github.com/GoogleChromeLabs/css-triggers)
- [JS DOM API Triggers](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

avoid to frequently change css property
or call JS DOM API triggering layout stage (reflow)

### reset.css

- `*` selector has poor performance

### will-change

告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作

```css
 {
  will-change: auto;
  will-change: scroll-position;
  will-change: contents;
  will-change: transform; /* Example of <custom-ident> */
  will-change: opacity; /* Example of <custom-ident> */
  will-change: left, top; /* Example of two <animateable-feature> */

  will-change: unset;
  will-change: initial;
  will-change: inherit;
}
```

### contain

[CSS Containment](https://developers.google.com/web/updates/2016/06/css-containment)

contain 属性允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分。
这使得浏览器在重新计算布局、样式、绘图或它们的组合的时候，只会影响到有限的 DOM 区域，而不是整个页面

```css
/* 无布局包含*/
contain: none;

/* 布局包含 layout、style、paint 和 size*/
contain: strict;

/* 布局包含layout、style 和 paint */
contain: content;

/* 布局包含 size */
contain: size;

/* 布局包含 layout */
contain: layout;

/* 布局包含 style */
contain: style;

/* 布局包含 paint */
contain: paint;
```

- size: 声明这个元素的尺寸会变化，不需要去检查它依赖关系中的尺寸变化
- style: 声明那些同时会影响这个元素和其子孙元素的属性，都在这个元素的包含范围内
- layout: 声明没有外部元素可以影响它内部的布局，反之亦然
- paint: 声明这个元素的子孙节点不会在它边缘外显示。如果一个元素在视窗外或因其他原因导致不可见，则同样保证它的子孙节点不会被显示

### window.requestAnimationFrame

- reflow: `javascript -> style -> layout -> paint -> composite`
- repaint: `paint -> composite`

告诉浏览器希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用

> 若想要在下次重绘时产生另一个动画画面，callback 必须调用 requestAnimationFrame

```js
const start = null;
const element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) {
    start = timestamp;
  }

  const progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';

  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

### CSS Loading Tips

- Lazyload any CSS not needed for Start Render:
  - This could be Critical CSS;
  - or splitting your CSS into Media Queries.
- Avoid @import:
  - In your HTML;
  - but in CSS especially;
  - and beware of oddities with the Preload Scanner.
- Be wary of synchronous CSS and JavaScript order:
  - JavaScript defined after CSS won’t run until CSSOM is completed;
  - so if your JavaScript doesn’t depend on your CSS;
    - load it before your CSS;
  - but if it does depend on your CSS:
    - load it after your CSS.
- Load CSS as the DOM needs it:
  - This unblocks Start Render and allows progressive rendering.

```html
<link rel="preload" href="/path/to/split.css" as="style" />
<link
  rel="stylesheet"
  href="/path/to/split.css"
  media="print"
  onload="this.media='all'"
/>
```

### Animation

#### Best Practice

- [High Performance Tips](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations)
- all animation: `keyframe` animation or `transitions` is best
- js-based animation: `requestAnimationFrame` is better than `setTimeout`/`setInterval`
- position animation:`transform: translate(npx, npx)` is better than `top`/`right`/`bottom`/`left`
- scale animation: `transform: scale(n)` better than `width`/`height`
- rotation animation: `transform: rotate(ndeg)` is better
- opacity/visibility animation: `opacity: 0...1` is better

#### DevTools for Animation

- [DevTools for Animation Performance](https://calibreapp.com/blog/investigate-animation-performance-with-devtools)
- slower CPU simulation in `performance` panel
- enable paint instrumentation in `performance` panel
- FPS meter in `rendering` panel
- paint flashing in `rendering` panel
- `layers` panel

#### Animation Internal

- `width`/`height`/`margin`/`left`/`top` in `Layout` stage
- `box-shadow`/`border-radius`/`background`/`outline`/`color` in `Paint` stage
- `cursor`/`z-index`/`transform`/`opacity` in `Composite Layers` stage
- `top`/`left` has very large time to `paint` each frame

## CSS Hacks

- [Browser Hacks](https://github.com/4ae9b8/browserhacks)

```css
/* stylelint-disable */
/***** Selector Hacks ******/

/* IE6 and below */
* html #uno {
  color: red;
}

/* IE7 */
*:first-child + html #dos {
  color: red;
}

/* IE7, FF, Saf, Opera  */
html > body #tres {
  color: red;
}

/* IE8, FF, Saf, Opera (Everything but IE 6,7) */
html>/**/body #cuatro {
  color: red;
}

/* Opera 9.27 and below, safari 2 */
html:first-child #cinco {
  color: red;
}

/* Safari 2-3 */
html[xmlns*=''] body:last-child #seis {
  color: red;
}

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:nth-of-type(1) #siete {
  color: red;
}

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:first-of-type #ocho {
  color: red;
}

/* saf3+, chrome1+ */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  #diez {
    color: red;
  }
}

/* iPhone / mobile webkit */
@media screen and (max-device-width: 480px) {
  #veintiseis {
    color: red;
  }
}

/* Safari 2 - 3.1 */
html[xmlns*='']:root #trece {
  color: red;
}

/* Safari 2 - 3.1, Opera 9.25 */
*|html[xmlns*=''] #catorce {
  color: red;
}

/* Everything but IE6-8 */
:root * > #quince {
  color: red;
}

/* IE7 */
* + html #dieciocho {
  color: red;
}

/* Firefox only. 1+ */
#veinticuatro,
x:-moz-any-link {
  color: red;
}

/* Firefox 3.0+ */
#veinticinco,
x:-moz-any-link,
x:default {
  color: red;
}

/***** Attribute Hacks ******/

/* IE6 */
#once {
  _color: blue;
}

/* IE6, IE7 */
#doce {
  *color: blue; /* or #color: blue */
}

/* Everything but IE6 */
#diecisiete {
  color/**/: blue;
}

/* IE6, IE7, IE8 */
#diecinueve {
  color: blue\9;
}

/* IE7, IE8 */
#veinte {
  color/*\**/: blue\9;
}

/* IE6, IE7 -- acts as an !important */
#veintesiete {
  color: blue !ie;
} /* string after ! can be anything */
/* stylelint-enable */
```

## Design Principles

### 费茨定律

人机交互和人体工程学中人类活动的模型,
它预测了从任意位置快速移动到一个目标位置所需的时间,
由 2 个位置的距离（D）和目标大小（S）有关, 正比于 D, 反比于 S:

- 关联性强的 UI 放置在一起
- 大拇指点击热区
- 屏幕边界视为无限大 (容易到达)
- 关机滑动距离长

### 米勒定律

人的短时记忆能力广度为 7±2 个信息块:

- 手机号/银行卡号/超大数字分段放置, 信息分层 e.g `134 9999 9999`, `999, 999, 999`
- 文章布局时增大段落间 margin, 改变部分文字的粗细/字体/颜色
- 导航/选项卡不超过 9 个 (超过 9 个可使用 dropdown/submenu)

### 席克定律

用户所面临的选择数量越多,
做出选择所花费的时间就越长,
在人机交互的界面中选项越多,
意味着用户做出决策的时间越长:

- 减少选项并提供默认值
- 分类分层
- 分步分页 (大部分手机应用注册界面)

### 泰斯勒定律

泰斯勒定律又称复杂性守恒定律,
该定律认为每一个过程都有其固有的复杂性,
这个复杂性存在一个临界点,
超过了这个点就不能再简化了,
你只能将固有的复杂性从一个地方移动到另外一个地方:

- 智能手机: 按键的复杂度转为手机操作系统的复杂度
- 智能推荐: 用户自己选择筛选条件的复杂度转为人工智能算法的复杂度
