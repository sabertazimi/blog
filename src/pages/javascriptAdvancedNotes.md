---
layout: post
title: 'JavaScript Advanced Notes'
subtitle: 'Be a Stupid Learner'
date: 2018-03-11
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - Frontend Development
  - Web Development
  - JavaScript
---

# JavaScript Advanced Notes

## Modern JavaScript

### TC39

- [New Feature Process](http://tc39.github.io/process-document)

### Babel

```bash
babel example.js -o compiled.js
babel src -d lib -s
```

#### babel-node

A read-eval-print loop(REPL) can replace node REPL.

#### babel-core

提供 babel 转码 API

```bash
npm install babel-core --save
```

```js
const babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function (err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

#### Codemod

Use Babel to refactor code,
like [jscodeshift](https://github.com/facebook/jscodeshift).

### Variable

- 一方面规定, var/function 声明的全局变量,
  依旧是全局对象的属性, 意味着会`Hoisting`.
- 另一方面规定, let/const/class 声明的全局变量,
  不属于全局对象的属性, 意味着不会`Hoisting`.

#### let

- 块级作用域内定义的变量/函数，在块级作用域外 ReferenceError
- 不存在变量提升, 导致暂时性死区 (Temporal Dead Zone)
- `let` variable in `for-loop` closure,
  every closure for each loop
  binds the block-scoped variable.

```js
const a = 1;

b = 3; // temporal dead zone: throw reference error

let b = 2;
```

#### const

- const 一旦声明变量，就必须立即初始化，不能留到以后赋值
- 引用一个`Reference`变量时，只表示此变量地址不可变，但所引用变量的值/属性可变
  (xxx \* const, 即`const`指针, 指向一个变量)
- 不存在变量提升, 导致暂时性死区 (Temporal Dead Zone)
- 块级作用域

### Destructuring(Pattern Matching)

- **建议只要有可能，就不要在模式中放置圆括号**
- 赋值语句的非模式部分，可以使用圆括号

#### 默认值

- ES6 内部使用严格相等运算符（===），判断一个位置是否有值。若此位置无值，则使用默认值
- 如果一个数组成员不严格等于 undefined，默认值不会生效

```js
const [x = 1] = [undefined];
x; // 1

const [x = 1] = [null];
x; // null
```

```js
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError
```

#### Sample

##### swap

```js
[x, y] = [y, x];
```

##### 简化函数的参数与返回值

- 可用于工厂(factory)/设置(options)模式: 传参一般为 options 对象，具有固定的属性名
- 一次性定义多个参数
- 一次性定义多个参数的默认值

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})

// 可省略 var foo = config.foo || 'default foo';
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
const [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2,
  };
}
const { foo, bar } = example();
```

##### 解析 JSON 对象

```js
const jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309],
};

const { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

##### 遍历 map/list

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + ' is ' + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [, value] of map) {
  // ...
}
```

##### 加载特定模块

```js
const { SourceMapConsumer, SourceNode } = require('source-map');
```

#### Array Iterator Style Matching

等号右边必须为数组等实现了 Iterator 接口的对象,否则报错

- Array
- Set
- Generator 函数

```js
const [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

const [, , third] = ['foo', 'bar', 'baz'];
third; // "baz"

const [x, , y] = [1, 2, 3];
x; // 1
y; // 3

const [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

const [x, y, ...z] = ['a'];
x; // "a"
y; // undefined
z; // []

// Generator 函数
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const [first, second, third, fourth, fifth, sixth] = fibs();
sixth; // 5
```

#### Object Style Matching

- 真正被赋值的是后者，而不是前者

```js
const { pattern: variable } = { key: value };
```

- 解构赋值的规则: 只要等号右边的值不是对象，就先将其转为对象
- undefined/null 无法转化为对象

```js
const { prop: x } = undefined; // TypeError
const { prop: y } = null; // TypeError
```

```js
const { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo; // "aaa"
bar; // "bbb"

const { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };

const { baz } = { foo: 'aaa', bar: 'bbb' };
baz; // undefined
```

```js
const { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz; // "aaa"

const obj = { first: 'hello', last: 'world' };
const { first: f, last: l } = obj;
f; // 'hello'
l; // 'world'
```

```js
const { log, sin, cos } = Math;
```

#### String Style Matching

```js
const [a, b, c, d, e] = 'hello';
a; // "h"
b; // "e"
c; // "l"
d; // "l"
e; // "o"

let { length: len } = 'hello';
len; // 5
```

#### Number/Boolean Style Matching

number/boolean 会转化成对象

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true
```

#### Function Arguments Style Matching

```js
function add([x, y]) {
  return x + y;
}
add([1, 2]) // 3
  [([1, 2], [3, 4])].map(([a, b]) => a + b);
// [ 3, 7 ]

function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 严格为 undefined 时，触发默认值设置
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### String

```js
'z' === 'z'; // true
'\172' === 'z'; // true
'\x7A' === 'z'; // true
'\u007A' === 'z'; // true
'\u{7A}' === 'z'; // true
```

#### Methods

- string.codePointAt(index): 正确处理 4 字节存储字符
- string.fromCodePoint(codePoint)

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff;
}

String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y';
// true
```

- string.includes(substr)/startsWith(substr)/endsWith(substr)
- 使用第二个参数 n 时，endsWith 针对前 n 个字符，其他两个方法针对从第 n 个位置直到字符串结束

```js
const s = 'Hello world!';

s.startsWith('world', 6); // true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false
```

- repeat(times)

```js
'hello'.repeat(2); // "hellohello"
'na'.repeat(2.9); // "nana"

'na'.repeat(-0.9); // ""
'na'.repeat(-1); // RangeError

'na'.repeat(NaN); // ""
'na'.repeat(Infinity); // RangeError

'na'.repeat('na'); // ""
'na'.repeat('3'); // "nanana"
```

- padStart/padEnd(len, paddingStr)

```js
'1'.padStart(10, '0'); // "0000000001"
'12'.padStart(10, '0'); // "0000000012"
'123456'.padStart(10, '0'); // "0000123456"

'12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-09-12"
```

#### Template String

`str` 表示模板字符串

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.``\`Yo\` World!``In JavaScript this is // 多行字符串
 not legal.``${
  x // 引用变量
} + ${y * 2} = ${x + y * 2}``${obj.x + obj.y}``foo ${
  fn() // 调用函数
} bar`;
```

#### Tagged Templates

```js
const boldify = (parts, ...insertedParts) => {
  return parts
    .map((s, i) => {
      if (i === insertedParts.length) return s;
      return `${s}<strong>${insertedParts[i]}</strong>`;
    })
    .join('');
};

const name = 'Jamon Holmgren';
console.log(boldify`Hi, my name is ${name}!`);
// => "Hi, my name is <strong>Jamon Holmgren</strong>!"
```

```js
function template(strings, ...keys) {
  return function (...values) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

const t1Closure = template`${0}${1}${0}!`;
t1Closure('Y', 'A'); // "YAY!"
const t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', { foo: 'World' }); // "Hello World!"
```

- 编译模板(小型模板引擎)

```js
function compile(template) {
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  const script = `(function parse(data){
      var output = "";

      function echo(html){
        output += html;
      }

      ${template}

      return output;
    })`;

  return script;
}

const template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
const parse = compile(template);
div.innerHTML = parse({ supplies: ['broom', 'mop', 'cleaner'] });
// => <ul>
// =>   <li>broom</li>
// =>   <li>mop</li>
// =>   <li>cleaner</li>
// => </ul>

// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
const libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
```

- 国际化处理

```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`;
// "欢迎访问xxx，您是第xxxx位访问者！"
```

- XSS 攻击

```js
const message = SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    const arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

- 运行代码

```js
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`;

java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println(“Hello World!”); // Display the string.
  }
}
`;
HelloWorldApp.main();
```

### RegExp

- u 修饰符
- y (粘连全局符) 修饰符号隐含了头部匹配的标志

```js
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

const s = '𠮷𠮷';

s.length; // 4
codePointLength(s); // 2
```

#### RegExp Group

```js
const string = 'Favorite GitHub Repos: tc39/ecma262 v8/v8.dev';
const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;

for (const match of string.matchAll(regex)) {
  console.log(`${match[0]} at ${match.index} with '${match.input}'`);
  console.log(`owner: ${match.groups.owner}`);
  console.log(`repo: ${match.groups.repo}`);
}
```

### Number

- 0bxxx/0Bxxx
- 0oxxx/0Oxxx
- Number.isFinite()/isNaN()/parseInt()/parseFloat()/isInteger()/isSafeInteger()
- Number.EPSILON/`MAX_SAFE_INTEGER`/`MIN_SAFE_INTEGER`
- \*\* 指数运算符
- BigInt

```js
const a = 2172141653;
const b = 15346349309;
a * b;
// => 33334444555566670000
BigInt(a) * BigInt(b);
// => 33334444555566667777n
```

### Internationalization

#### Number Intl

```js
const nfFrench = new Intl.NumberFormat('fr');
nf.format(12345678901234567890n);
// => 12 345 678 901 234 567 890
```

#### String Intl

```js
const lfEnglish = new Intl.ListFormat('en');
// const lfEnglish = new Intl.ListFormat('en', { type: 'disjunction' }); => 'or'

lfEnglish.format(['Ada', 'Grace', 'Ida']);
// => 'Ada, Grace and Ida'
```

#### Time Intl

```js
const rtfEnglish = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

rtf.format(-1, 'day'); // 'yesterday'
rtf.format(0, 'day'); // 'today'
rtf.format(1, 'day'); // 'tomorrow'
rtf.format(-1, 'week'); // 'last week'
rtf.format(0, 'week'); // 'this week'
rtf.format(1, 'week'); // 'next week'
```

```js
const dtfEnglish = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

dtfEnglish.format(new Date()); // => 'May 7, 2019'
dtfEnglish.formatRange(start, end); // => 'May 7 - 9, 2019'
```

### Array

```js
[...Array(5).keys()]; // => [0, 1, 2, 3, 4]
```

#### Array.includes

no more `indexOf() > -1`

#### Array.from

强大的**函数式**方法

- 伪数组对象(array-like object)
- 可枚举对象(iterable object)
- 克隆数组
- map 函数

```js
// Set
// Map

// NodeList对象
const ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  const args = Array.from(arguments);
  // ...
}

Array.from('hello');
// => ['h', 'e', 'l', 'l', 'o']

const namesSet = new Set(['a', 'b']);
Array.from(namesSet); // ['a', 'b']

// 克隆数组
Array.from([1, 2, 3]);
// => [1, 2, 3]

Array.from(arrayLike, (x) => x * x);
// =>
Array.from(arrayLike).map((x) => x * x);

Array.from([1, 2, 3], (x) => x * x);
// [1, 4, 9]
```

#### Array.copyWithin

替换数组元素，修改原数组

```js
Array.prototype.copyWithin(target, (start = 0), (end = this.length));
```

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)[
  // => [4, 5, 3, 4, 5]

  // -2相当于3号位，-1相当于4号位
  (1, 2, 3, 4, 5)
].copyWithin(0, -2, -1);
// => [4, 2, 3, 4, 5]

// 将2号位到数组结束，复制到0号位
const i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// => Int32Array [3, 4, 5, 4, 5]
```

#### Array.find

```js
arr.find(fn);
arr.findIndex(fn);
```

#### Array.flat

`[2, [2, 2]] => [2, 2, 2]`

#### Array.flatMap

map + flat

#### Spread Array

```js
arr2.push(...arr1);
```

```js
var obj = { x: 1, y: 2, z: 3 };

obj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...obj]; // print [1, 2, 3]
```

### New Object API

- Object.keys()
- Object.values()
- Object.entries()

```js
const score = {
  jamon: 42,
  todd: 19,
  ken: 4,
  gant: 41,
};

Object.keys(score).map((k) => score[k]);
// => [ 42, 19, 4, 41 ]

Object.values(score);
// => [ 42, 19, 4, 41 ]

Object.entries(score);
/**
 * =>
 * [
 * [ 'jamon', 42 ],
 * [ 'todd', 19 ],
 * [ 'ken', 4 ],
 * [ 'gant', 41 ],
 * ]
 */
```

```js
const object = { x: 42, y: 50, abc: 9001 };
const result = Object.fromEntries(
  Object.entries(object)
    .filter(([key, value]) => key.length === 1)
    map(([key, value]) => [key, value * 2])
);
```

```js
const map = new Map(Object.entries(object));
const objectCopy = Object.fromEntries(map);
```

### Arrow Function

- no thisArgs binding
- no arguments binding
- no prototype binding
- no suited for `New` constructor
- not suited as methods of plain object
  (`this` in arrow function would be refer to `window`)

### Modules

```js
import { lastName as surname } from './profile.js';
```

```js
export const firstName = 'Michael';
export const lastName = 'Jackson';
export const year = 1958;
```

```js
// profile.js
const firstName = 'Michael';
const lastName = 'Jackson';
const year = 1958;

export { firstName, lastName, year };
```

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
- CommonJS 模块输出的是一个值的拷贝,
  ES6 模块 Export 分 3 种情况:
  1. `export default xxx`输出`value`,
  2. `export xxx`输出`reference`.
     `defaultThing` and `anotherDefaultThing` shows ES6 export default value,
     `importedThing` and `module.thing` shows ES6 export normal reference,
     and `Destructuring Behavior` create a brand new value.
  3. function/class special case:
     `export default function/class thing() {}; // function/class expressions`
     export default reference,
     `function/class thing() {}; export default thing; // function/class statements`
     export default value.

Export default value:

```js
// module.js
let thing = 'initial';

export { thing };
export default thing;

setTimeout(() => {
  thing = 'changed';
}, 500);

// main.js
import { thing, default as defaultThing } from './module.js';
import anotherDefaultThing from './module.js';

setTimeout(() => {
  console.log(thing); // "changed"
  console.log(defaultThing); // "initial"
  console.log(anotherDefaultThing); // "initial"
}, 1000);
```

Export normal reference:

```js
// module.js
export let thing = 'initial';

setTimeout(() => {
  thing = 'changed';
}, 500);

// main.js
import { thing as importedThing } from './module.js';
const module = await import('./module.js');
let { thing } = await import('./module.js'); // Destructuring Behavior

setTimeout(() => {
  console.log(importedThing); // "changed"
  console.log(module.thing); // "changed"
  console.log(thing); // "initial"
}, 1000);
```

To sum up:

```js
// These give you a live reference to the exported thing(s):
import { thing } from './module.js';
import { thing as otherName } from './module.js';
import * as module from './module.js';
const module = await import('./module.js');
// This assigns the current value of the export to a new identifier:
let { thing } = await import('./module.js');

// These export a live reference:
export { thing };
export { thing as otherName };
export { thing as default };
export default function thing() {}
// These export the current value:
export default thing;
export default 'hello!';
```

### Class 语法糖

```js
class A {
  constructor(value) {
    this.val = value;
  }
}

class B extends A {
  constructor(value) {
    super(value);
  }
}

const b = new B(6);

console.log(B.__proto__ === A);
console.log(B.prototype.constructor === B);
console.log(B.prototype.__proto__ === A.prototype);
console.log(b.__proto__ === B.prototype);

function AA(value) {
  this.val = value;
}

function BB(value) {
  AA.call(this, value);
}

BB.prototype = Object.create(AA.prototype);
BB.prototype.constructor = BB;

const bb = new BB(6);

console.log(BB.__proto__ === Function.prototype); // not consistence with class syntax
console.log(BB.prototype.constructor === BB);
console.log(BB.prototype.__proto__ === AA.prototype);
console.log(bb.__proto__ === BB.prototype);
```

禁止对复合对象字面量进行导出操作 (array literal, object literal)

### Map

```js
const map = new Map([
  // You define a map via an array of 2-element arrays. The first
  // element of each nested array is the key, and the 2nd is the value
  ['name', 'Jean-Luc Picard'],
  ['age', 59],
  ['rank', 'Captain'],
]);

// To get the value associated with a given `key` in a map, you
// need to call `map.get(key)`. Using `map.key` will **not** work.
map.get('name'); // 'Jean-Luc Picard'
```

```js
const map = new Map([]);

const n1 = new Number(5);
const n2 = new Number(5);

map.set(n1, 'One');
map.set(n2, 'Two');

// `n1` and `n2` are objects, so `n1 !== n2`. That means the map has
// separate keys for `n1` and `n2`.
map.get(n1); // 'One'
map.get(n2); // 'Two'
map.get(5); // undefined

// If you were to do this with an object, `n2` would overwrite `n1`
const obj = {};
obj[n1] = 'One';
obj[n2] = 'Two';

obj[n1]; // 'Two'
obj[5]; // 'Two'
```

```js
const objectClone = new Map(Object.entries(object));
const arrayClone = new Map(Array.from(map.entries));
const map = new Map([
  ['name', 'Jean-Luc Picard'],
  ['age', 59],
  ['rank', 'Captain'],
]);

// The `for/of` loop can loop through iterators
for (const key of map.keys()) {
  key; // 'name', 'age', 'rank'
}

for (const v of map.values()) {
  v; // 'Jean-Luc Picard', 59, 'Captain'
}

for (const [key, value] of map.entries()) {
  key; // 'name', 'age', 'rank'
  value; // 'Jean-Luc Picard', 59, 'Captain'
}
```

### WeakMap

WeakMap 结构与 Map 结构基本类似,
唯一的区别就是 WeakMap 只接受对象作为键名 (null 除外),
而且键名所指向的对象不计入垃圾回收机制.

它的键所对应的对象可能会在将来消失.
一个对应 DOM 元素的 WeakMap 结构,
当某个 DOM 元素被清除,
其所对应的 WeakMap 记录就会自动被移除.

有时候我们会把对象作为一个对象的键用来存放属性值,
普通集合类型比如简单对象会阻止垃圾回收器对这些作为属性键存在的对象的回收,
有造成内存泄漏的危险,
而 WeakMap/WeakSet 则更加安全些.

### Symbol

- A Symbol is a **unique** and **immutable** primitive value
  and may be used as the key of an Object property.
- Symbols don't auto-convert to "strings" and can't convert to numbers

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'b', done: false }
iter.next(); // { value: 'c', done: false }
iter.next(); // { value: undefined, done: true }
```

### Iterator

- 一个数据结构只要具有 Symbol.iterator 属性 (其为 function), 就可以认为是 "可遍历的" (iterable)
- implement iterator with `Symbol.iterator`

#### Synchronous Iterator

```js
const Iterable = {
  [Symbol.iterator]() {
    return Iterator;
  },
};

const Iterator = {
  next() {
    return IteratorResult;
  },
  return() {
    return IteratorResult;
  },
  throw(e) {
    throw e;
  },
};

const IteratorResult = {
  value: any,
  done: boolean,
};

const Iterator = {
  next() {
    return IteratorResult;
  },
  [Symbol.iterator]() {
    return this;
  },
};
```

```js
function methodsIterator() {
  let index = 0;
  let methods = Object.keys(this)
    .filter((key) => {
      return typeof this[key] === 'function';
    })
    .map((key) => this[key]);

  // iterator object
  return {
    next: () => ({
      // Conform to Iterator protocol
      done: index >= methods.length,
      value: methods[index++],
    }),
  };
}

let myMethods = {
  toString: function () {
    return '[object myMethods]';
  },
  sumNumbers: function (a, b) {
    return a + b;
  },
  numbers: [1, 5, 6],
  [Symbol.iterator]: methodsIterator, // Conform to Iterable Protocol
};

for (let method of myMethods) {
  console.log(method); // logs methods `toString` and `sumNumbers`
}
```

#### Asynchronous Iterator

```js
const AsyncIterable = {
  [Symbol.asyncIterator]() {
    return AsyncIterator;
  },
};

const AsyncIterator = {
  next() {
    return Promise.resolve(IteratorResult);
  },
  return() {
    return Promise.resolve(IteratorResult);
  },
  throw(e) {
    return Promise.reject(e);
  },
};

const IteratorResult = {
  value: any,
  done: boolean,
};
```

```js
function remotePostsAsyncIteratorsFactory() {
  let i = 1;
  let done = false;

  const asyncIterableIterator = {
    // the next method will always return a Promise
    async next() {
      // do nothing if we went out-of-bounds
      if (done) {
        return Promise.resolve({
          done: true,
          value: undefined,
        });
      }

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${i++}`
      ).then((r) => r.json());

      // the posts source is ended
      if (Object.keys(res).length === 0) {
        done = true;
        return Promise.resolve({
          done: true,
          value: undefined,
        });
      } else {
        return Promise.resolve({
          done: false,
          value: res,
        });
      }
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return asyncIterableIterator;
}

(async () => {
  const ait = remotePostsAsyncIteratorsFactory();

  await ait.next(); // { done:false, value:{id: 1, ...} }
  await ait.next(); // { done:false, value:{id: 2, ...} }
  await ait.next(); // { done:false, value:{id: 3, ...} }
  // ...
  await ait.next(); // { done:false, value:{id: 100, ...} }
  await ait.next(); // { done:true, value:undefined }
})();
```

```js
// tasks will run in parallel
ait.next().then(...);
ait.next().then(...);
ait.next().then(...);
```

### Generator

- [Synchronous Generators](https://dev.to/jfet97/javascript-iterators-and-generators-synchronous-generators-3ai4)

#### Basic Usage

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }
g.return(); // { value: undefined, done: true }
g.return(1); // { value: 1, done: true }
```

iterable object

```js
const users = {
  james: false,
  andrew: true,
  alexander: false,
  daisy: false,
  luke: false,
  clare: true,

  *[Symbol.iterator]() {
    // this === 'users'
    for (const key in this) {
      if (this[key]) yield key;
    }
  },
};
```

early return

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next(); // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next(); // { value: undefined, done: true }
```

#### Complex Usage

The generator function itself is not iterable, call it to get the iterable-iterator

```js
for (const v of someOddNumbers) {
  console.log(v);
} // => TypeEror: someOddNumbers is not iterable

for (const v of number()) {
  console.log(v); // 1 3 5 7
}
```

messaging system

```js
function* lazyCalculator(operator) {
  const firstOperand = yield;
  const secondOperand = yield;

  switch (operator) {
    case '+':
      yield firstOperand + secondOperand;
      return;
    case '-':
      yield firstOperand - secondOperand;
      return;
    case '*':
      yield firstOperand * secondOperand;
      return;
    case '/':
      yield firstOperand / secondOperand;
      return;
  }
}

const g = gen('*');
g.next(); // { value: undefined, done: false }
g.next(10); // { value: undefined, done: false }
g.next(2); // { value: 20, done: false }
g.next(); // { value: undefined, done: true }
```

error handling

```js
function* generator() {
  try {
    yield 1;
  } catch (e) {
    console.log(e);
  }

  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const it = generator();

it.next(); // {value: 1, done: false}

// the error will be handled and printed ("Error: Handled!"),
// then the flow will continue, so we will get the
// next yielded value as result.
it.throw(Error('Handled!')); // {value: 2, done: false}

it.next(); // {value: 3, done: false}

// now the generator instance is paused on the
// third yield that is not inside a try-catch.
// the error will be re-thrown out
it.throw(Error('Not handled!')); // !!! Uncaught Error: Not handled! !!!

// now the iterator is exhausted
it.next(); // {value: undefined, done: true}
```

Generator based control flow goodness for nodejs and the browser,
using promises, letting you write non-blocking code in a nice-ish way
(just like [tj/co](https://github.com/tj/co)).

```js
function coroutine(generatorFunc) {
  const generator = generatorFunc();
  nextResponse();

  function nextResponse(value) {
    const response = generator.next(value);

    if (response.done) {
      return;
    }

    if (value.then) {
      value.then(nextResponse);
    } else {
      nextResponse(response.value);
    }
  }
}

coroutine(function* bounce() {
  yield bounceUp;
  yield bounceDown;
});
```

#### Asynchronous Generator

```js
const asyncSource = {
  async *[Symbol.asyncIterator]() {
    yield await new Promise((res) => setTimeout(res, 1000, 1));
  },
};

async function* remotePostsAsyncGenerator() {
  let i = 1;

  while (true) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${i++}`
    ).then((r) => r.json());

    // when no more remote posts will be available,
    // it will break the infinite loop.
    // the async iteration will end
    if (Object.keys(res).length === 0) {
      break;
    }

    yield res;
  }
}
```

```js
// do you remember it?
function* chunkify(array, n) {
  yield array.slice(0, n);
  array.length > n && (yield* chunkify(array.slice(n), n));
}

async function* getRemoteData() {
  let hasMore = true;
  let page;

  while (hasMore) {
    const { next_page, results } = await fetch(URL, { params: { page } }).then(
      (r) => r.json()
    );

    // return 5 elements with each iteration
    yield* chunkify(results, 5);

    hasMore = next_page != null;
    page = next_page;
  }
}
```

### Proxy and Reflect

modify default object behavior with `Proxy` and `Reflect`

```js
// new Proxy(target, handler)
Proxy(target, {
  set: function (target, name, value, receiver) {
    const success = Reflect.set(target, name, value, receiver);
    if (success) {
      log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  },
});
```

APIs of handler:

- get
- set
- has
- apply
- construct
- ownKeys
- deleteProperty
- defineProperty
- isExtensible
- preventExtensions
- getPrototypeOf
- setPrototypeOf
- getOwnPropertyDescriptor

#### Default Zero Value with Proxy

```js
const withZeroValue = (target, zeroValue = 0) =>
  new Proxy(target, {
    get: (obj, prop) => (prop in obj ? obj[prop] : zeroValue),
  });

let pos = { x: 4, y: 19 };
console.log(pos.z); // => undefined
pos = withZeroValue(pos);
console.log(pos.z); // => 0
```

#### Negative Array Indice with Proxy

```js
const negativeArray = (els) =>
  new Proxy(target, {
    get: (target, propKey, receiver) =>
      Reflect.get(
        target,
        +propKey < 0 ? String(target.length + +propKey) : propKey,
        receiver
      ),
  });
```

#### Hiding Properties with Proxy

```js
const hide = (target, prefix = '_') =>
  new Proxy(target, {
    has: (obj, prop) => !prop.startsWith(prefix) && prop in obj,
    ownKeys: (obj) =>
      Reflect.ownKeys(obj).filter(
        (prop) => typeof prop !== 'string' || !prop.startsWith(prefix)
      ),
    get: (obj, prop, rec) => (prop in rec ? obj[prop] : undefined),
  });

let userData = hide({
  firstName: 'Tom',
  mediumHandle: '@tbarrasso',
  _favoriteRapper: 'Drake',
});

'_favoriteRapper' in userData; // has: false
Object.keys(userData); // ownKeys: ['firstName', 'mediumHandle']
userData._favoriteRapper; // get: undefined
```

#### Read Only Object with Proxy

```js
const NOPE = () => {
  throw new Error('Can\'t modify read-only object');
};

const NOPE_HANDLER = {
  set: NOPE,
  defineProperty: NOPE,
  deleteProperty: NOPE,
  deleteProperty: NOPE,
  preventExtensions: NOPE,
  setPrototypeOf: NOPE
  get: (obj, prop) => {
    if (prop in obj) {
      return Reflect.get(obj, prop);
    }

    throw new ReferenceError(`Unknown prop "${prop}"`);
  }
};

const readOnly = target => new Proxy(target, NODE_HANDLER)
```

#### Range Judgement with Proxy

```js
const range = (min, max) =>
  new Proxy(Object.create(null), {
    has: (_, prop) => +prop >= min && +prop <= max,
  });

const X = 10.5;
const nums = [1, 5, X, 50, 100];

if (X in range(1, 100)) {
  // => true
}

nums.filter((n) => n in range(1, 10));
// => [1, 5]
```

## Functional JavaScript

- predictable (pure and immutable)
- safe (pure and immutable)
- transparent (pure and immutable)
- modular (composite)

### Pros

- type safe and state safe
- explicit flow of data
- concurrency safety

### Cons

- verbose
- more object creation
- more garbage collection
- more memory usage

With help of `immutable.js`,
object creation/garbage collection/memory usage can be alleviated.

For example, in vanilla.js, `map2 === map1` become `false`,
but in immutable.js `map2 === map1` become `true`
(copy free due to immutable data).

```js
const map1 = { 'b': 2 };
const map2 = map1.set{ 'b': 2 };
```

### Closure

两个函数都维持着对外部作用域 Counter 的引用,
因此总可以访问 Counter 作用域内定义的变量 count (外部局部变量)

- 函数外部不可对函数内部进行赋值或引用
- 函数中的闭包函数可对函数进行赋值或引用(函数对于闭包来说是外部, 即内部引用外部)
- 特权性质: 从外部通过闭包方法访问内部(函数作用域)局部变量 (private getter)
- local scope -> outer functions scope -> global scope
- Closure Performance: avoid unnecessary closure creation

```js
// global scope
var e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // log 20
```

```js
// BAD
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
}

// GOOD: avoid unnecessary
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
};
MyObject.prototype.getMessage = function () {
  return this.message;
};
```

#### 闭包函数的结构

优先级: this > 局部变量 > 形参 > arguments > 函数名

### Partial Application

```js
const partialFromBind = (fn, ...args) => {
  return fn.bind(null, ...args);
};

const partial = (fn, ...args) => {
  return (...rest) => {
    return fn(...args, ...rest);
  };
};
```

### Currying

chain of multiple single argument functions

```js
const add = (x) => (y) => x + y;
```

```javascript
function schonfinkelize(fn) {
  const slice = Array.prototype.slice,
    stored_args = slice.call(arguments, 1);

  return function () {
    const new_args = slice.call(arguments),
      args = stored_args.concat(new_args);
    return fn.apply(null, args);
  };
}

const addOne = schonfinkelize(add, 1);
// addOne(3) === 4;
const addFive = schonfinkelize(addOne, 1, 3);
// addFive(4) === 9;
```

### API

#### `[]`.map

相当于 Haskell 中的 List Map

#### `[]`.filter

相当于 Haskell 中的 List Filter

#### `[]`.reduce

相当于 Haskell 中的 fold

#### `[]`.sort

## Internal JavaScript

Under the hood

### Variables Lifecycle

- Creation phase (**Hoisting**)
  - Declaration phase: 在作用域中注册变量
  - Initialization phase: 分配内存, 在作用域中绑定变量 (`undefined`)
- Execution phase/Assignment phase

### Exection Context

#### Global Exection Context

- create global object (`window`)
- create `this` object(refer to `window`)
- declare and initialize variable(`undefined`)/function, store them into memory

#### Function Exection Context

- create arguments object
- create `this` object
- declare and initialize variable(`undefined`)/function, store them into memory

如果 JavaScript 引擎在函数执行上下文中找不到变量,
它会在最近的父级执行上下文中查找该变量.
这个查找链将会一直持续, 直到引擎查找到全局执行上下文.
这种情况下, 如果全局执行上下文也没有该变量, 那么将会抛出引用错误 (Reference Error).
子函数“包含”它父级函数的变量环境，把这个概念称为**闭包(Closure)**,
即使父级函数执行环境已经从执行栈弹出了, 子函数还是可以访问父级函数变量 x (通过作用域链).

### Event Loop

![Event Loop](./images/event_loop.jpg)

The job of the **event loop** is to look into the call stack
and determine if the call stack is empty or not.
If the **call stack** is empty,
it looks into the **ES6 job queue** and **message queue** to see
if there’s any pending call back waiting to be executed:

- ES6 job queue: used by `Promises` (higher priority)
- message queue: used by `setTimeout`, `DOM events`
- 微任务 Microtask，有特权, 可以插队:
  process.nextTick,
  Promises.then (Promise 构造函数是同步函数),
  Object.observer, MutationObserver
- 宏任务 Macrotask，没有特权:
  setTimeout, setInterval,
  setImmediate, I/O,
  MessageChannel, postMessage,
  UI rendering, UI Interaction Events
- Microtask 优先于 Macrotask
- 浏览器为了能够使得 JS 内部 (macro)task 与 DOM 任务能够有序的执行,
  会在一个 (macro)task 执行结束后, 在下一个 (macro)task 执行开始前, 对页面进行重新渲染.
  当 JS 引擎从任务队列中取出一个宏任务来执行, 如果执行过程中有遇到微任务,
  那么执行完该宏任务就会去执行宏任务内的所有微任务, 然后更新 UI.
  后面就是再从任务队列中取出下一个宏任务来继续执行, 以此类推.

```js
for (let ii = 0; ii < macrotask.length; ii++) {
  eval(macrotask[ii])();

  if (microtask.length != 0) {
    // process all microtasks
    for (let __i = 0; __i < microtask.length; __i++) {
      eval(microtask[__i])();
    }

    // empty microtask
    microtask = [];
  }

  // next macrotask in next loop iteration
}
```

```js
const bar = () => {
  console.log('bar');
};

const baz = () => {
  console.log('baz');
};

const foo = () => {
  console.log('foo');
  setTimeout(bar, 0);
  new Promise((resolve, reject) => {
    resolve('Promise resolved');
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  baz();
};

foo();

// foo
// baz
// Promised resolved
// bar
```

As above code, using `setTimeout` with `0` seconds timer
helps to defer execution of `Promise` and `bar` until the **stack** is **empty**.

```js
console.log('1');

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
    process.nextTick(function foo() {
      console.log(4);
    });
  });
});

Promise.resolve().then(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6);
  });
  Promise.resolve().then(() => {
    console.log(7);
  });
});

process.nextTick(function foo() {
  console.log(8);
  process.nextTick(function foo() {
    console.log(9);
  });
});

console.log('10');
// 1 10 8 9 5 7 2 3 4 6
```

Promise 构造函数本身是同步函数

```js
console.log('script start');

const promise1 = new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise1 end');
}).then(function () {
  console.log('promise2');
});

setTimeout(function () {
  console.log('settimeout');
});

console.log('script end');

// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

`await a(); b()` 等价于 `Promise(a()).then(b())`: a 是同步执行, b 是 microtask

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end');

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

当调用栈没有同步函数时, 直接执行任务队列里的函数

```js
function test() {
  console.log('start');

  setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
      console.log('children2-1');
    });
  }, 0);

  setTimeout(() => {
    console.log('children3');
    Promise.resolve().then(() => {
      console.log('children3-1');
    });
  }, 0);

  Promise.resolve().then(() => {
    console.log('children1');
  });
  console.log('end');
}

test();

// start
// end
// children1
// children2
// children2-1
// children3
// children3-1
```

## Browser Internal

- Chrome: Blink (based on Webkit) + V8
- Firefox: Gecko + SpiderMonkey
- Safari: Webkit + JavaScriptCore (Nitro)
- Edge: Trident/EdgeHTML + Chakra

### Browser Process

- 浏览器进程: 主要负责界面显示、用户交互、子进程管理，同时提供存储等功能.
- GPU 进程: 实现 3D CSS, 绘制 UI 界面.
- 网络进程：主要负责页面的网络资源加载.
- 渲染进程：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页,
  排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中.
  默认情况下, Chrome 会为每个 Tab 标签创建一个渲染进程.
  出于安全考虑, 渲染进程都是运行在沙箱模式下.
- 插件进程：主要是负责插件的运行, 因插件易崩溃，所以需要通过隔离以保证插件进程崩溃不会对浏览器和页面造成影响.

### Render Engine

Parser/Script -> DOM Tree -> Styled Tree -> Layout -> Paint -> Composite

#### HTML Parser

DTD is context-sensitive grammar.
Use State Machine pattern to implement a tokenizer

```js
Data -> Tag Open -> Tag Name -> Tag Close -> Data
```

tokenizer send tokens to constructor, constructing DOM tree

```js
initial -> before HTML -> before head -> in head -> after head
-> in body -> after body -> after after body -> EOF token
```

#### CSS Parser

CSS is context-free grammar.
Webkit use flex/bison (bottom-to-up), Gecko use up-to-bottom.

```js
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ] ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
  ;
```

#### Layout

为避免对所有细小更改都进行整体布局，浏览器采用了一种“dirty 位”系统。
如果某个呈现器发生了更改，或者将自身及其子代标注为“dirty”，则需要进行布局:

- 父呈现器确定自己的宽度
- 父呈现器依次处理子呈现器，并且：
  - 放置子呈现器（设置 x,y 坐标）
  - 如果有必要，调用子呈现器的布局（如果子呈现器是 dirty 的，或者这是全局布局，或出于其他某些原因），
    这会计算子呈现器的高度
- 父呈现器根据子呈现器的累加高度以及边距和补白的高度来设置自身高度，此值也可供父呈现器的父呈现器使用
- 将其 dirty 位设置为 false

#### Paint

Paint Order:

- 背景颜色
- 背景图片
- 边框
- 子代
- 轮廓

## Effective JavaScript

### Memory Leak

- useless global vars (bind to window or document)
- useless callback functions (e.g setInterval/setTimeout)
- useless DOM reference
- closure
- circular reference

### 禁用特性

- with () {}
- eval()
- 少用 new
- 少用 cotinue
- 少用 forEach()

### 局部变量/函数参数

- 局部变量引用全局变量/全局变量作为参数传入函数: 加快符号解析
- 局部变量缓存 DOM 元素
- 局部变量缓存布局信息
- 局部变量引用嵌套成员: 加快原型链查找
- 局部变量引用方法时，应注意会动态改变 this 指针

```js
const DOM = tazimi.util.Dom;

DOM.method.call(/* 关注 this 指针*/);
```

### 字符串

```js
str = str + 'one' + 'two';
```

### 函数

#### 作用域链

由于作用域链的关系，标识符解析时，寻找局部变量速度远快于寻找全局变量速度.故应将全局变量作为参数传入函数进行调用，不但效率高，而且易于维护与测试.
即 利用局部变量引用全局变量，加快标识符解析

### 循环

#### **倒序**循环可提升性能

```js
for (let i = item.length; i--; ) {
  process(items[i]);
}

let j = items.length;
while (j--) {
  process(items[i]);
}

let k = items.length;
do {
  process(items[k]);
} while (k--);
```

#### Duff's Device(达夫设备)

```js
let i = items.length % 8;

while (i) {
  process(items[i--]);
}

i = Math.floor(items.length / 8);

while (i) {
  process(items[i--]);
  process(items[i--]);
  process(items[i--]);
  process(items[i--]);
  process(items[i--]);
  process(items[i--]);
  process(items[i--]);
  process(items[i--]);
}
```

### Exception

#### Call Stack Overflow

调用栈尺寸限制异常，应立即定位在代码中的递归实例上

```js
try {
  recursion();
} catch (ex) {
  console.error('error info');
}
```

### Event Delegate(事件委托)

- 事件委托利用的是事件冒泡机制，只制定一事件处理程序，就可以管理某一类型的所有事件
- 使用事件委托，只需在 DOM 树中尽量最高的层次上添加一个事件处理程序
- increases performance and reduces memory consumption
- no need to register new event listeners for newer children

```js
window.onload = function () {
  const oUl = document.getElementById('ul');
  const aLi = oUl.getElementsByTagName('li');

  oUl.onmouseover = function (e) {
    const e = e || window.event;
    const target = e.target || e.srcElement;

    //alert(target.innerHTML);

    if (target.nodeName.toLowerCase() == 'li') {
      target.style.background = 'red';
    }

    // 阻止默认行为并取消冒泡
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.returnValue = false;
      e.cancelBubble = true;
    }
  };

  oUl.onmouseout = function (e) {
    const e = e || window.event;
    const target = e.target || e.srcElement;

    //alert(target.innerHTML);

    if (target.nodeName.toLowerCase() == 'li') {
      target.style.background = '';
    }

    // 阻止默认行为并取消冒泡
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.returnValue = false;
      e.cancelBubble = true;
    }
  };
};
```

### 缓存模式

缓存对象属性与 DOM 对象

### 加载脚本

合并脚本后再进行高级加载技术

#### 延迟加载

```html
... The full body of the page ...
<script>
window.onload = function () {
  const script = document.createElement("script");
  script.src = "all_lazy_20100426.js";
  document.documentElement.firstChild.appendChild(script);
};
</script>
</body>
</html>
```

#### 动态加载

```javascript
function requireScript(file, callback) {
  const script = document.getElementsByTagName('script')[0];
  const newjs = document.createElement('script');

  // IE
  newjs.onreadystatechange = function () {
    if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
      newjs.onreadystatechange = null;
      callback();
    }
  };
  // others
  newjs.onload = function () {
    callback();
  };

  // 添加至html页面
  newjs.src = file;
  script.parentNode.insertBefore(newjs, script);
}

requireScript('the_rest.js', function () {
  Application.init();
});
```

### DOM Performance

- 局部变量缓存 DOM 元素
- 局部变量缓存布局信息

```js
const btn = document.getElementById('btn');
```

- HTML Collection 转化成数组再操作

```js
function toArray(coll) {
  for (let i = 0, a = [], len = coll.length; i < len; i++) {
    a[i] = coll[i];
  }

  return a;
}
```

- children 优于 childNodes
- childElementCount 优于 childNodes.length
- firstElementChild 优于 firstChild
- lastElementChild 优于 lastChild
- nextElementSibling 优于 nextSibling 优于 `childNodes[next]`
- previousElementSibling 优于 previousSibling

#### 重排与重绘

- 重排: 重新构造渲染树
- 重绘: 重新绘制受影响部分

**获取**或改变布局的操作会导致渲染树**变化队列**刷新,执行渲染队列中的"待处理变化",重排 DOM 元素

```js
offsetTop / Left / Width / Height;
scrollTop / Left / Width / Height;
clientTop / Left / Width / Height;
getComputedStyle();
```

#### 批量修改 DOM

- 先 display="none", 修改完成后，display=""
- 使待修改 DOM 元素脱离标准文档流(改变布局／定位方式)，可减少其他元素的重绘次数
- document.createDocumentFragment()

```js
const fragment = document.createDocumentFragment();
appendDataToElement(fragment, data);
document.getElementById('mylist').appendChild(fragment);
```

- oldNode.cloneNode(true);

```js
const old = document.getElementById('mylist');
const clone = old.cloneNode(true);

appendDataToElement(clone, data);
old.parentNode.replaceChild(clone, old);
```

#### requestAnimationFrame

run scripts as early as possible:
`requestAnimationFrame()` runs after the CPU work is done (UI events and JS scripts),
and just before the frame is rendered (layout, paint, composite etc.).

### CSS

在 js 中(除定位属性) 外，不直接操作 element.style.attr/element.cssText:

```js
element.classList.add('className');
element.className += ' className';
```

```js
script -> style -> layout -> paint -> composite
```

Make `script` stage become: read then write.
Interleaved read and write will triger multiple times
of relayout/repaint/recomposite.

```js
// bad
// Forced Synchronous Layout
read css -> write css (re-layout/paint/composite)
-> read css -> write css (re-layout/paint/composite)
-> read css -> write css (re-layout/paint/composite)

// good
read css -> write css (only re-layout/paint/composite once)
```

### 定时器(防止脚本阻塞)

JavaScript 　代码与 UI 共享线程

setTimeout()/setInterval()

- 第二个参数: 不是执行时间, 是加入执行队列时间
- 若其他位于执行队列中的函数执行时间超过延时，则用户感觉不到延时的存在
- 模拟有间隙的循环，使得 UI 更新得以进入浏览器线程的执行队列中

```js
const button = document.getElementById('myButton');

button.onclick = function () {
  oneMethod();

  setTimeout(function () {
    document.getElementById('notice').style.color = 'red';
  }, 250);
};
```

- 分解任务

```js
function saveDocument(id) {
  // 利用闭包封装待执行任务
  const tasks = [openDocument, writeText, closeDocument, updateUI];

  setTimeout(function () {
    // 执行下一个任务
    const task = tasks.shift();
    task(id);

    // 检查是否还有其他任务
    if (tasks.length > 0) {
      // 递归调用(每次参数不同)
      setTimeout(arguments.callee, 25);
    }
  }, 25);
}
```

```js
function processArray(items, process, callback) {
  // 克隆原数组
  const todo = items.concat();

  setTimeout(function () {
    process(todo.shift());

    if (todo.length > 0) {
      setTimeout(arguments.callee, 25);
    } else {
      callback(items);
    }
  }, 25);
}
```

- 批处理任务

```js
function timedProcessArray(items, process, callback) {
  // 克隆原始数组
  const todo = items.concat();

  setTimeout(function () {
    const start = +new Date();

    // 一次批处理任务持续 0.05s
    do {
      process(todo.shift());
    } while (todo.length < 0 && +new Date() - start < 50);

    if (todo.length > 0) {
      setTimeout(arguments.callee, 25);
    } else {
      callback(items);
    }
  }, 25);
}
```

### 计时器

```js
/*
 * usage: start -> stop -> getTime
 */
const Timer = {
  _data: {},

  start: function(key) {
    Timer._data[key] = new Date();
  },
  stop: function(key) {
    const time = Timer._data[key];

    if (time) {
      Timer._data[key] = new Date() - time;
    }
  },
  getTime: function(key) {
    return Timer._data[key];
  };
}
```

### Web Worker

#### 运行环境

- navigation 对象: appName, appVersion, userAgent, platform
- location 对象: 所有属性只读
- ECMAScript 对象: Object/Array/Date
- XMLHttpRequest 方法
- setTimeout/setInterval 方法
- self 对象: 指向全局 worker 对象
- importScripts 方法: 加载外部依赖
- close 方法: 停止 worker

#### Web Worker Loader

```js
// 文件名为index.js
function work() {
  onmessage = ({ data: { jobId, message } }) => {
    console.log('i am worker, receive:-----' + message);
    postMessage({ jobId, result: 'message from worker' });
  };
}

const makeWorker = (f) => {
  let pendingJobs = {};

  const worker = new Worker(
    URL.createObjectURL(new Blob([`(${f.toString()})()`]))
  );

  worker.onmessage = ({ data: { result, jobId } }) => {
    // 调用 resolve, 改变 Promise 状态
    pendingJobs[jobId](result);
    delete pendingJobs[jobId];
  };

  return (...message) =>
    new Promise((resolve) => {
      const jobId = String(Math.random());
      pendingJobs[jobId] = resolve;
      worker.postMessage({ jobId, message });
    });
};

const testWorker = makeWorker(work);

testWorker('message from main thread').then((message) => {
  console.log('i am main thread, i receive:-----' + message);
});
```

#### worker 实例

- 先 on ,后 post
- main.js/worker.js 的 onmessage 与 postMessage 相互触发

```js
/*
 * jsonparser.js
 */
self.onmessage = function (event) {
  const jsonText = event.data,
    jsonData = JSON.parse(jsonText);

  self.postMessage(jsonData);
};
```

```js
/*
 * main.js
 */
const worker = new Worker('jsonparse.js';

worker.onmessage = function(event) {
  const jsonData = event.data;
  evaluateData(jsonData);
};

worker.postMessage(jsonText);
```

### Ajax

#### 数据格式

| Format                           | Size (bytes) | Download (ms) | Parse (ms) |
| :------------------------------- | -----------: | ------------: | ---------: |
| Verbose XML                      |      582,960 |         999.4 |      343.1 |
| Verbose JSON-P                   |      487,913 |         598.2 |        0.0 |
| Simple XML                       |      437,960 |         475.1 |       83.1 |
| Verbose JSON                     |      487,895 |         527.7 |       26.7 |
| Simple JSON                      |      392,895 |         498.7 |       29.0 |
| Simple JSON-P                    |      392,913 |         454.0 |        3.1 |
| Array JSON                       |      292,895 |         305.4 |       18.6 |
| Array JSON-P                     |      292,912 |         316.0 |        3.4 |
| Custom Format (script insertion) |      222,912 |          66.3 |       11.7 |
| Custom Format (XHR)              |      222,892 |          63.1 |       14.5 |

#### Ajax 缓存

```js
const localCache = {};

function xhrRequest(url, callback) {
  // Check the local cache for this URL.
  if (localCache[url]) {
    callback.success(localCache[url]);
    return;
  }

  // If this URL wasn't found in the cache, make the request.
  const req = createXhrObject();

  req.onerror = function () {
    callback.error();
  };

  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.responseText === '' || req.status == '404') {
        callback.error();
        return;
      }

      // Store the response on the local cache.
      localCache[url] = req.responseText;
      callback.success(req.responseText);
    }
  };
}

req.open('GET', url, true);
// req.set();
req.send(null);
```

### Reduce Repeat Manipulation

- 特性/浏览器检测代码只运行一次
- 惰性定义模式/自定义模式

#### Debounce and Throttle

防抖动和节流本质是不一样的:

- debounce: 防抖动是将多次执行变为最后一次执行 (可用于检测某个连续的 DOM 操作结束, 如 scroll 停止)
- throttle: 节流是将多次执行变成每隔一段时间执行 (保证一定时间内只执行一次)

```js
// 这个是用来获取当前时间戳的
function now() {
  return +new Date();
}

/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args;

  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null;
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args);
        context = args = null;
      }
    }, wait);

  // 这里返回的函数是每次实际调用的函数
  return function (...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later();
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
      clearTimeout(timer);
      timer = later();
    }
  };
}
```

```js
// simple throttle
function throttle(action) {
  let isRunning = false;
  return function () {
    if (isRunning) return;
    isRunning = true;
    window.requestAnimationFrame(() => {
      action();
      isRunning = false;
    });
  };
}
```

```js
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 之前的时间戳
  var previous = 0;
  // 如果 options 没传则设为空对象
  if (!options) options = {};
  // 定时器回调函数
  var later = function () {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _.now();
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    // 获得当前时间戳
    var now = _.now();
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了2秒
    // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
```

#### RequestAnimationFrame Throttling

```js
let frameId = 0;
let ticking = false;

const handleResize = event => {
  if (ticking) return;
  ticking = true;
  frameId = requestAnimationFrame(() => handleUpdate(event));
};

const handleUpdate = event => {
  console.log('resize update');

  ...

  ticking = false;
};

useEffect(() => {
  window.addEventListener('resize', handleResize);
  handleUpdate();

  return () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(frameId);
  };
});
```

### First Paint Time

```js
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM 挂载时间: ', Date.now() - timerStart);
  // 性能日志上报
});

window.addEventListener('load', function () {
  console.log('所有资源加载完成时间: ', Date.now() - timerStart);
  // 性能日志上报
});
```

```js
// 计算加载时间
function getPerformanceTiming() {
  const performance = window.performance;
  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口');
    return;
  }

  const t = performance.timing;
  const times = {};
  //【重要】页面加载完成的时间
  //【原因】这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventEnd - t.navigationStart;
  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  times.domReady = t.domComplete - t.responseEnd;
  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  times.redirect = t.redirectEnd - t.redirectStart;
  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.ttfb = t.responseStart - t.navigationStart;
  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  times.request = t.responseEnd - t.requestStart;
  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  times.loadEvent = t.loadEventEnd - t.loadEventStart;
  // DNS 缓存时间
  times.appcache = t.domainLookupStart - t.fetchStart;
  // 卸载页面的时间
  times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
  // TCP 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart;
  return times;
}
```

### 算数逻辑运算

#### 位操作

- i%2 => `i&0x1`
- 位掩码

```js
const OPTION_A = 1,
  OPTION_B = 2,
  OPTION_C = 4,
  OPTION_D = 8,
  OPTION_E = 16;

const options = OPTION_A | OPTION_C | OPTION_D;
```

#### Math 对象

```js
Math.E;
Math.LN10;
Math.LN2;
Math.LOG2E;
Math.LOG10E;
Math.PI;
Math.SQRT1_2;
Math.SQRT2;

Math.abs(num);
Math.exp(num);
Math.log(num);
Math.pow(num, power);
Math.sqrt(num);
Math.acos(x);
Math.asin(x);
Math.atan(x);
Math.atan2(y, x);
Math.cos(x);
Math.sin(x);
Math.tan(x);
```

## Browser Performance

- [Performance 工具指北](https://zhuanlan.zhihu.com/p/41017888)

### Browser Caches

- [Dive into Browser Caches](https://github.com/ljianshu/Blog/issues/23)

从缓存位置上来说分为四种, 并且各自有优先级,
当依次查找缓存且都没有命中的时候, 才会去请求网络:

- Service Worker: PWA
- (In-) Memory Cache: reload Tab page
- (On-) Disk Cache: big files
- Push Cache: HTTP/2

```js
self.addEventListener('install', (event) => {
  async function buildCache() {
    const cache = await caches.open(cacheName);
    return cache.addAll(['/main.css', '/main.mjs', '/offline.html']);
  }
  event.waitUntil(buildCache());
});

self.addEventListener('fetch', (event) => {
  async function cachedFetch(event) {
    const cache = await caches.open(cacheName);
    let response = await cache.match(event.request);
    if (response) return response;
    response = await fetch(event.request);
    cache.put(event.request, response.clone());
    return response;
  }
  event.respondWith(cachedFetch(event));
});
```

#### HTTP Cache

浏览器缓存，也称 HTTP 缓存,
分为强缓存和协商缓存.
优先级较高的是强缓存,
在命中强缓存失败的情况下或者`Cache-Control: no-cache`时,
才会走协商缓存.

强缓存是利用 HTTP 头中的 Expires 和 Cache-Control 两个字段来控制的.
强缓存中, 当请求再次发出时, 浏览器会根据其中的 expires 和 cache-control 判断目标资源是否 `命中` 强缓存,
若命中则直接从缓存中获取资源, 不会再与服务端发生通信.
Cache-Control 相对于 expires 更加准确，它的优先级也更高.
当 Cache-Control 与 expires 同时出现时，以 Cache-Control 为准.

```bash
expires: Wed, 12 Sep 2019 06:12:18 GMT
cache-control: max-age=31536000
```

协商缓存机制下,
浏览器需要向服务器去询问缓存的相关信息,
进而判断是重新发起请求、下载完整的响应,
还是从本地获取缓存的资源.
如果服务端提示缓存资源未改动 (Not Modified),
资源会被重定向到浏览器缓存,
这种情况下网络请求对应的状态码是 `304`.

Last-Modified 是一个时间戳,
如果启用了协商缓存,
它会在首次请求时随着 Response Headers 返回:

```bash
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
```

随后每次请求时, 会带上一个叫 If-Modified-Since 的时间戳字段,
它的值正是上一次 response 返回给它的 last-modified 值:

```bash
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT
```

服务器可能无法正确感知文件的变化 (未实际改动或改动过快),
为了解决这样的问题, Etag 作为 Last-Modified 的补充出现了.
Etag 是由服务器为每个资源生成的唯一的标识字符串,
这个标识字符串可以是基于文件内容编码的,
因此 Etag 能够精准地感知文件的变化.

#### Code Caching

- cold run: `download -> compile -> store into on-disk cache`
- warm run: `fetch from browser cache -> compile -> store metadata`
- hot run: `fetch scripts and metadata from browser cache -> skip compile`
- positive case: IIFE function heuristics
- passive case: too small (`< 1KB`) and inline scripts

### Browser Pefermance Monitoring

前端性能监控分为两种方式，一种叫做合成监控（Synthetic Monitoring，SYN），另一种是真实用户监控（Real User Monitoring，RUM）。

#### 合成监控

在一个模拟场景里, 去提交一个需要做性能审计的页面,
通过一系列的工具、规则去运行你的页面, 提取一些性能指标, 得出一个审计报告.

常见的工具有 Google 的 Lighthouse，webpagetest，pagespeed 等

| 优点                                   |             缺点             |
| :------------------------------------- | :--------------------------: |
| 实现简单                               |     无法还原全部真实场景     |
| 能采集到丰富的数据，如硬件指标或瀑布图 |    登录等场景需要额外解决    |
| 不影响真实用户的访问性能               |       单次数据不够稳定       |
| 可以提供页面加载幻灯片等可视化分析途径 | 数据量较小，无法发挥更大价值 |

#### 真实用户监控

用户在页面访问之后就会产生各种各样的性能指标,
之后会将这些性能指标上传的我们的日志服务器上,
进行数据的提起清洗加工,
最后在监控平台上进行展示和分析的一个过程.

- 真实用户监控的优缺点

| 优点                                   | 缺点                             |
| :------------------------------------- | :------------------------------- |
| 无需配置模拟条件，完全还原真实场景     | 影响真实用户的访问性能及流量消耗 |
| 不存在登录等需要额外解决的场景         | 无法采集硬件相关指标             |
| 数据样本足够庞大，可以减少统计误差     | 无法采集完整的资源加载瀑布图     |
| 新年数据可与其它数据关联，产生更大价值 | 无法可视化展示加载过程           |

#### 对比

| 对比项         | 合成监控               | 真实用户监控               |
| :------------- | :--------------------- | :------------------------- |
| 实现难度及成本 | 较低                   | 较高                       |
| 采集数据丰富度 | 丰富                   | 基础                       |
| 数据样本量     | 较小                   | 大(视业务体量)             |
| 适合场景       | 定性分析, 小数据量分析 | 定量分析, 业务数据深度挖掘 |

#### 方案

在真实用户性能数据采集时, 要关注四个方面的东西:

- 使用标准的 API
- 定义合适的指标
- 采集正确的数据
- 上报关联的维度

#### 使用标准的 API

采集性能数据时先抹平 Navigation Timing spec 差异
优先使用 PerformanceTimeline API
(在复杂场景，亦可考虑优先使用 PerformanceObserver)

#### 定义合适的指标

First Meaningful Paint: 首次有效渲染时长,
它的一个核心的想法是渲染并不一定代表着用户看到了主要内容,
Load 也不一定代表用户看到主要内容.
假设当一个网页的 DOM 结构发生剧烈的变化的时候,
就是这个网页主要内容出现的时候,
那么在这样的一个时间点上,
就是用户看到主要内容的一个时间点.

它的优点是相对校准的估算出内容渲染时间, 贴近用户感知.
但缺点是无原生 API 支持, 算法推导时 DOM 节点不含权重.

- First Contentful Paint
- First Meaningful Paint
- First Ipnut Delay
- Time to Interactive

#### 上报关联的维度

不同的页面操作/页面打开方式/浏览器环境都会对我们页面加载的性能会有影响,
需要上报这些维度的数据, 以便深入性能分析:

- 当前页面是否可见
- 页面加载方式: 直接打开/刷新打开/前进后退打开
- 是否启用 HTTP2
- 是否启用 Service Worker

#### Speed Tools

- [Speedup Tools](https://developers.google.com/web/fundamentals/performance/speed-tools)
- [FID Tracking](https://github.com/GoogleChromeLabs/first-input-delay)
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights)
- [Lighthouse (`audit` tab)](https://github.com/GoogleChrome/lighthouse)

### Data Format and Size

- [optimize images for web](https://www.keycdn.com/blog/optimize-images-for-web)
- [Images Optimization Techniques](https://evilmartians.com/chronicles/images-done-right-web-graphics-good-to-the-last-byte-optimization-techniques)

#### Images Format

mp4 smaller than gif (`ffmpeg`)

```html
<!-- ffmpeg -i dog.gif dog.mp4 -->
<video autoplay loop muted playsinline>
  <source src="dog.mp4" type="video/mp4" />
</video>
```

WebP 25-35% smaller than jpg/png

```html
<picture>
  <source type="image/webp" srcset="flower.webp" />
  <source type="image/jpeg" srcset="flower.jpg" />
  <img src="flower.jpg" />
</picture>
```

#### Images Compression

- [Imagemin](https://github.com/Klathmon/imagemin-webpack-plugin)

#### Images Scaling

responsive images: provide 3~5 different sizes
reduce image transfer sizes by average of ~20%

- [Sharp](https://github.com/lovell/sharp)
- [Jimp](https://github.com/oliver-moran/jimp)

```html
<img
  srcset="flower-small.jpg 480w, flower-large.jpg 1080w"
  sizes="50vw"
  src="flower-large.jpg"
/>
```

### Data Loading

- [Resources Priority](https://developers.google.com/web/fundamentals/performance/resource-prioritization)

#### Data Preloading

```js
<link rel="preload" as="script" href="critical.js">
<link rel="modulepreload" href="critical-module.mjs">

<link rel="preload" as="image" href="...">
<link rel="preload" as="font" href="..." crossorigin>
<link rel="preload" as="fetch" href="..." crossorigin>
```

#### Images Lazy Loading

Lazy Loading Polyfill:

```html
<img data-src="flower.jpg" class="lazyload" />
```

```js
window.addEventListener('scroll', function (event) {
  Array.from(document.querySelectorAll('.lazyload')).forEach((image) => {
    if (image.slideIntoView(event.getBoundingClientRect())) {
      image.setAttribute('src', image.dataset.src);
    }
  });
});
```

Observer Lazy Loading:

```js
const observer = new IntersectionObserver((nodes) => {
  nodes.forEach((v) => {
    if (v.isIntersecting) {
      v.target.src = v.target.dataset.src;
      observer.unobserve(v.target);
    }
  });
});

const imgs = document.querySelectorAll('img.lazyload');
imgs.forEach((v) => observer.observe(v));
```

Native Lazy Loading:

```html
<img src="flower.jpg" lazyload="auto" />
<img src="flower.jpg" lazyload="on" />
<img src="flower.jpg" lazyload="off" />
```

#### JavaScript Lazy Loading

- [Script Priorities](https://addyosmani.com/blog/script-priorities)
- `defer`: downloads the script while the document is still parsing,
  but waits until the document has finished parsing before executing it
  (**in order**)
- `async`: downloads the script during parsing the document,
  but will **pause** the parser to execute the script
- If the scripts rely on each other, use defer
- If the script is independent, use async
- If put JavaScript in `<head>`, in such script can't access DOM directly
  (DOM haven't get parsed)

Best practice: lazy loading scripts not execute immediately
(**Chrome Coverage Devtools**)

```html
<script src="myscript.js"></script>
<script src="myscript.js" async></script>
<script src="myscript.js" defer></script>
```

```jsx
const DetailsComponent = lazy(() => import('./details'));
const PageComponent = () => {
  <Suspense fallback={<div>Loading...</div>}>
    <DetailsComponent />
  </Suspense>;
};
```

#### Prefetch

```html
<link rel="preload" /> <link rel="prefetch" />
```

[Why not to prefetch prerender](https://addyosmani.com/blog/what-not-to-prefetch-prerender):

- avoid prefetching pages for authentication
- avoid over-prefetching to limit accidental DOS
- avoid prefetching pages key to checkout
- avoid prefetching large resources
- avoid prefetching cross-origin resources

#### Babel Config for JavaScript

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true,
          "node": ">= 8",
          "browsers": "> 0.25%"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

```js
<script type="module" src="main.mjs"></script>
<script nomodule src="legacy.js"></script>
```

### V8 Good Parts

- source code (parser) AST (interpreter) bytecode
- send profilling data from bytecode to optimizing compiler, generate optimized code
- **Ignition** interpreter
- **TurboFan** optimizing compiler (2 for SpiderMonkey/Edge, 3 for Safari)

#### Object Shape

- [Shapes ICS](https://mathiasbynens.be/notes/shapes-ics)

```js
// o1 and o2 have the same shape
// JSObject(1, 2) => Shape('x', 'y')
// JSObject(3, 4) => Shape('x', 'y')
// 'x' => 0 Offset, Writable, Enumerable, Configurable
// 'y' => 1 Offset, Writable, Enumerable, Configurable
const o1 = { x: 1, y: 2 };
const o2 = { x: 3, y: 4 };
```

Shape Transform

```js
// Shape chain: Shape(empty) => Shape(x) => Shape(x, y)
const o = {};
o.x = 1;
o.y = 2;

// Shape chain: Shape(empty) => Shape(y) => Shape(y, x)
const o = {};
o.y = 2;
o.x = 1;

// Shape chain: Shape(x)
const o = { x: 1 };
```

array shape: Shape('length'), 'length' => 0 Offset, Writable

#### Inline Cache

V8 use ICs to memorize information (same shape) where to find properties on objects:

- always initialize objects in the same way (generate the same shape)
- don't add property to objects dynamically (invalid inline cache)
- don't mess with property attributes of array elements

#### V8 Perf Tools

- [deoptigate](https://github.com/thlorenz/deoptigate)
- [turbolizer](https://github.com/thlorenz/turbolizer)
- [v8 map processor](https://github.com/thlorenz/v8-map-processor)

#### Awesome V8 Performance Tutorial

- [v8 perf](https://github.com/thlorenz/v8-perf)

### Perf and Analysis Tools

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
- [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report)

Audits of Chrome: PWA, best practices, SEO, performance, device simulator

#### Inspect Android Device

- enable developmemnt mode and USB debugging in Android Device
- link Android and PC with USB cable
- open `chrome://inspect/#devices` to start inspecting

### Performance Best Practice

- use monomorphic objects due to shape and inline caches
- use monomorphic fucntion in hot code paths
- resource optimization
- code splitting
- lazy loading
- offline caching (PWA)

## Testing and Debugging

### Log

- 时间，包含时区信息和毫秒
- 日志级别
- 会话标识
- 功能标识
- 精炼的内容: 场景信息（谁，什么功能等），状态信息(开始，中断，结束)以及重要参数
- 其他信息：版本号，线程号

#### Log Clock

- `performance.now()` is more precise (100 us)
- `performance.now()` is strictly monotonic (unaffected by changes of machine time)

```js
let lastVisibilityChange = 0;
window.addEventListener('visibilitychange', () => {
  lastVisibilityChange = performance.now();
});

// don’t log any metrics started before the last visibility change
// don't log any metrics if the page is hidden
// discard perf data from when the machine was not running app at full speed
if (metric.start < lastVisibilityChange || document.hidden) return;
```

```js
requestAnimationFrame(() => {
  requestAnimationFrame((timestamp) => {
    metric.finish(timestamp);
  });
});
```

### Headless Testing

- [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v1.16.0&show=api-class-page)
- [Puppeteer Recipes](https://addyosmani.com/blog/puppeteer-recipes)

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

#### Browser Context

```js
// Create a new incognito browser context
const context = await browser.createIncognitoBrowserContext();
// Create a new page inside context.
const page = await context.newPage();
// ... do stuff with page ...
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

#### DOM Testing

`page.$(selector)` same to `querySelector`

#### Event Testing

```js
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async (browser) => {
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewport({ width: 50, height: 50 });
  await watchDog;
  await browser.close();
});
```

```js
const [response] = await Promise.all([
  page.waitForNavigation(), // The promise resolves after navigation has finished
  page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

```js
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(
  (request) =>
    request.url() === 'http://example.com' && request.method() === 'GET'
);
return firstRequest.url();
```

```js
const firstResponse = await page.waitForResponse(
  'https://example.com/resource'
);
const finalResponse = await page.waitForResponse(
  (response) =>
    response.url() === 'https://example.com' && response.status() === 200
);
return finalResponse.ok();
```

```js
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browserContext.waitForTarget(
  (target) => target.url() === 'https://www.example.com/'
);
```

#### Operation Simulation Testing

```js
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

```js
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

#### Tracing Testing

```js
await page.tracing.start({ path: 'trace.json' });
await page.goto('https://www.google.com');
await page.tracing.stop();
```

#### Other Puppeterr Testing API

- `page.setOfflineMode`
- `page.setGeolocation`
- `page.metrics`
- `page.accessibility`
- `page.coverage`

### Frameworks

#### Unit 测试

- Jasmine
- Mocha

#### UI 测试

- 用户行为: Karma/Selenium
- 功能测试: Phantomjs/Slimerjs/Karma

### 可测试代码

- 完整注释
- 最小复杂度 = (扇入 \* 扇出) ^ 2
- 可隔离性: 最小依赖性 + 松耦合性

#### 范例

- 使用依赖注入，将外部对象移至函数参数处(不在函数内部调用构造器): 易于构造 mock/stub, 降低扇出(函数复杂度)

### 圈复杂度

V(G) = e - n + 2 **<10**

### 函数复杂度

函数复杂度 = (扇入 \* 扇出) ^ 2

#### 扇出(引用) **<7**

- 所引用外部对象/方法之和
- 高扇出: 高复杂度/高依赖性/高耦合度

#### 扇入(被引用)

- 其他对象/方法引用此函数的次数之和
- 顶层抽象代码 与 不常用功能 应保持低扇入

### 耦合度

#### 内容耦合(5)

```js
O.property = 'tazimi';
O.method = function () {};
O.prototype.method = function () {};
```

#### 公共耦合(4)

共享全局变量

```js
const Global = 'global';

function A() {
  Global = 'A';
}
function B() {
  Global = 'B';
}
```

#### 控制耦合(3)

```js
const absFactory = new AbstractFactory({ env: 'TEST' });
```

#### 印记耦合(2)

```js
O.prototype.makeBread = function (args) {
  return new Bread(args.type, args.size);
};

O.makeBread({ type: wheat, size: 99, name: 'foo' });
```

#### 数据耦合(1)

#### 无耦合(0)

### 单元测试

#### 测试原则

- 代码覆盖率
- 非法值测试
- 边界测试
- 非边界测试

#### 隔离被测代码

- 编写代码时，保持最小复杂度(最小依赖，最低耦合)
- 利用 mock/stub 模拟外部依赖/测试数据

#### mock/stub/spy

- mock: 模拟对象中的方法/接口
- stub: 模拟对象中的返回值
- spy: 在原有对象的基础上，增加监视用变量/方法 e.g assert/调用次数/参数限制

```js
const mockery = require('mockery');
mockery.enable();

describe('Sum suite File', function () {
  beforeEach(function () {
    mockery.registerAllowable('./mySumFS', true);
  });

  afterEach(function () {
    mockery.deregisterAllowable('./mySumFS');
  });

  it('Adds Integers!', function () {
    const filename = 'numbers';
    const fsMock = {
      readFileSync: function (path, encoding) {
        expect(path).toEqual(filename);
        expect(encoding).toEqual('utf8');
        return JSON.stringify({ a: 9, b: 3 });
      },
    };

    mockery.registerMock('fs', fsMock);
    const mySum = require('./mySumFS');
    expect(mySum.sum(filename)).toEqual(12);
    mockery.deregisterMock('fs');
  });
});
```

### Monkey Patch

```js
let _wr = function (type) {
  let orig = window.history[type];

  return function () {
    let rv = orig.apply(this, arguments);
    let e = new Event(type.toLowerCase());
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};

window.history.pushState = _wr('pushState');
window.history.replaceState = _wr('replaceState');

window.addEventListener('pushstate', function (event) {
  // doing something
});

window.addEventListener('replacestate', function (event) {
  // doing something
});
```

### Tools API

#### console API

```js
var devtools = /./;
devtools.toString = function () {
  this.opened = true;
};

console.log('%c', devtools);
// devtools.opened will become true if/when the console is opened
```

```js
console.log / info / warn / error;
console.dir / dirxml / table; // different output style
console.assert;
console.group / groupEnd;
console.time / timeEnd;
console.profile / profileEnd;
console.count;
console.trace;
```

`console.log`

```js
// `sprinf` style log
console.log('%d %o %s', integer, object, string);
console.log('%c ...', 'css style');
```

`console.table`

```js
// display array of object (tabular data)
const transactions = [
  {
    id: '7cb1-e041b126-f3b8',
    seller: 'WAL0412',
    buyer: 'WAL3023',
    price: 203450,
    time: 1539688433,
  },
  {
    id: '1d4c-31f8f14b-1571',
    seller: 'WAL0452',
    buyer: 'WAL3023',
    price: 348299,
    time: 1539688433,
  },
  {
    id: 'b12c-b3adf58f-809f',
    seller: 'WAL0012',
    buyer: 'WAL2025',
    price: 59240,
    time: 1539688433,
  },
];

console.table(data, ['id', 'price']);
```

#### JS API

```js
debugger;
```

```js
copy(obj); // to clipborad
```

```js
window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage); // 异常信息
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.log('error: ' + error); // 异常堆栈信息
  // ...
  // 异常上报
};

window.addEventListener('error', function () {
  console.log(error);
  // ...
  // 异常上报
});
```

##### Trace Property (Vue Internal)

```js
const traceProperty = (object, property) => {
  let value = object[property];
  Object.defineProperty(object, property, {
    get() {
      console.trace(`${property} requested`);
      return value;
    },
    set(newValue) {
      console.trace(`setting ${property} to `, newValue);
      value = newValue;
    },
  });
};
```

#### Node API

- node --inspect
- [ndb](https://github.com/GoogleChromeLabs/ndb)

```bash
node --inspect
ndb index.js
```

### Browser Compatibility

#### 特性检测

**不使用特性/浏览器推断**，往往容易推断错误(且会随着浏览器更新产生新的错误)

```js
// 特性检测
if (document.getElementById) {
  element = document.getElementById(id);
}
```

## Chrome Dev Tools

### Shortcuts

- c-d: go to next word
- c-f in `Elements` panel: search DOM node
- c-m: go to next bracket
- c-p: go to files
- cs-p: go to anywhere
- cs-o: go to functions

long click reload: multiple reload options e.g clean cache

### Elements Panel

- break on elements

#### Style Tab

- color picker
- filter: class filter, pseudo filter, css style filter

### Console Panel

- getEventListeners(dom)
- monitorEvents(dom, events)
- unmonitorEvents(dom)
- debug(fn)
- undebug(fn)
- monitor(fn)
- unmonitor(fn)

#### Console Settings

- preserve log
- show timestamps
- Verbose: additional performance log
- click filename, filter error messages
- add folder to workspace

#### capture default eventListener

> \$0: the reference to the currently selected element in the Elements panel

```js
const listener = getEventListeners($0).click[0].listener;
$0.removeEventListener('click', listener);
$0.addEventListener('click', (e) => {
  // do something
  // ...

  // then
  listener(e);
});
```

### Source Panel

- add log points
- multiple breakpoints: source, XHR/fetch, DOM, global/event listeners
- open a source file, right click code, `Blackbox script` item
- [Local Overrides](https://developers.google.com/web/updates/2018/01/devtools#overrides)
  for persistent changes to css styles

### Network Panel

- throtting: simulate different network environment
- initiator：go to files

### Performance Panel

- C+S+P: performance monitor
- C+S+P: FPS
- script->style->layout->paint->composite timeline
- performance tips
- [Timeline Events](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference)
- [Performance Analysis Reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)

### Simulation DevTools

- cs-p: type `3G` (slow network)
- cs-p: type `sensor` (geolocation)

### Testing DevTools

- cs-p: type `audit`
- cs-p: type `coverage`

#### Memory Panel

#### JS Profiler Panel

#### Layer Panel

tool for composite stage analysis

### Rendering Panel

- re-paint area
- FPS monitor
- scroll event
- paint flashing
- layout/layer border

### More Tools

- layers
- animations
- coverage

## JavaScript Style Guide

- [Airbnb Guide](https://github.com/airbnb/javascript)

### Naming Style

- 变量: 名词前缀
- 方法/函数: 动词前缀
- \_method: 表示私有化方法
- 普通函数: 驼峰命名法(camelCase)
- 构造函数: 帕斯卡命名法(PascalCase)
- 缩略词和缩写都必须是全部大写/小写
- 对于 jQuery 对象的变量使用 \$ 作为前缀

### Variable Style

- no single `let/const`
- sort `let/const`

```js
// bad
let i,
  len,
  dragonball,
  items = getItems(),
  goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

- no chains assignment (create implict global variable)

```js
// bad
(function example() {
  // JavaScript 把它解释为
  // let a = ( b = ( c = 1 ) );
  // let 关键词只适用于变量 a ；变量 b 和变量 c 则变成了全局变量。
  let a = (b = c = 1);
})();

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
})();

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError
```

- use `()` wrap multiple line

```js
// bad
const foo = superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = superLongLongLongLongLongLongLongLongFunctionName();

// good
const foo = 'superLongLongLongLongLongLongLongLongString';
```

### Object Style

- use literal

```js
// bad
const item = new Object();

// good
const item = {};
```

- use object-shorthand

```js
// bad
const atom = {
  lukeSkywalker: lukeSkywalker,
  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  lukeSkywalker,
  addValue(value) {
    return atom.value + value;
  },
};
```

- use Object.prototype.XX not object.xx

```js
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // 在模块范围内的缓存中查找一次
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
```

- use object spread not object.assign

```js
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // 变异的 `original` ಠ_ಠ
delete copy.a; // 这....

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 });

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

- use `.` for static name, use `[]` for variable name

```js
// good
const isJedi = luke.jedi;

function getProp(prop) {
  return luke[prop];
}
```

### Array Style

- use literal
- use `push` not `[]`
- use array spread (best) or `Array.from` (good)

```js
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

### Destruct Style

对于多个返回值使用对象解构，而不是数组解构

```js
// bad
function processInput(input) {
  // 处理代码...
  return [left, right, top, bottom];
}

// 调用者需要考虑返回数据的顺序。
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // 处理代码...
  return { left, right, top, bottom };
}

// 调用者只选择他们需要的数据。
const { left, top } = processInput(input);
```

### String Style

- use `'` not `"`
- use \`\${}\` not `'str1' + 'str2'`

### Function Style

- use naming function expression not function declaration

```js
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// 从变量引用调用中区分的词汇名称
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

- use `...args` not `arguments`

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

- use default parameters not default expression pattern

```js
// bad
function handleThings(opts) {
  this.opts = opts || {};
}

// good
function handleThings(opts = {}) {
  this.opts = opts;
}
```

- no reassign parameters: side effect and bad performance

### Arrow Function Style

- `()` and `{}` should pair

```js
// bad
arr.map((x) => x + 1);
arr.map((x, index) => x + index);
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
arr.map((x) => x + 1);
arr.map((x, index) => {
  return x + index;
});
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

- use `()` wrap multiple line return value

```js
// bad
['get', 'post', 'put'].map((httpMethod) =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
);

// good
['get', 'post', 'put'].map((httpMethod) =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
);
```

### Module Style

- import first

```js
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

- no shorthand `export from`

```js
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

- path occurs once

```js
// bad
import foo from 'foo';
// … 其他导入 … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// best
import foo, { named1, named2 } from 'foo';
```

- not export `let`

```js
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

### Iterator and Generator Style

- no iterator, 应该使用 JavaScript 的高阶函数代替 for-in 或者 for-of:
  - 使用 `map/reduce/filter/any/every/some/find/findIndex/ ...` 遍历数组
  - 使用 `Object.keys() / Object.values() / Object.entries()` 迭代对象生成数组

```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map((num) => num + 1);
```

- use `function*` for generator

```js
// bad
function* foo() {
  // ...
}

// bad
const bar = function* () {
  // ...
};

// good
function* foo() {
  // ...
}

// good
const foo = function* () {
  // ...
};
```

### Expression Style

if 语句使用 ToBoolean 的抽象方法来计算表达式的结果:

- Objects 的取值为： true
- Undefined 的取值为： false
- Null 的取值为： false
- Booleans 的取值为： 布尔值的取值
- Numbers 的取值为：如果为 +0, -0, or NaN 值为 false 否则为 true
- Strings 的取值为: 如果是一个空字符串 '' 值为 false 否则为 true

对于布尔值使用简写，但是对于字符串和数字进行显式比较

```js
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}
```

use `{}` warp `case` when exists `const`/`let`/`function`/`class` declaration

```js
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

### 换行 Style

- 键入最后一个运算符后再换行, 运算符置于行尾可使 automatic semicolon insertion 机制失效
- 换行后保持 2 个缩进层次

```js
// bad
const arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [1, 2];

// good
const arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [1, 2];
```

- use `()` wrap multiple line assignment or arguments

```js
// good
const foo = superLongLongLongLongLongLongLongLongFunctionName();

['get', 'post', 'put'].map((httpMethod) =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
);
```

### 空格 Style

Good places to use a white space include:

- ,/; 后
- +,-,\*,/,<,>,= 前后
- function () {}
- function foo() {}
- } if/for/while () {}
- } else {}
- no space inner `()` `[]`
- use space inner `{}`

```javascript
let d = 0,
  a = b + 1;

if (a && b && c) {
  d = a % c;
  a += d;
}

// antipattern
// missing or inconsistent spaces
// make the code confusing
let d = 0,
  a = b + 1;

if (a && b && c) {
  d = a % c;
  a += d;
}
```

### 注释 Style

- 上方插入空行
- 与下方语句统一缩进

```js
/*
 * comments
 * comments
 */
```

#### 模块

```js
/*
 * @module myapp
 * @namespace MYAPP
 */
```

#### 对象

```js
/*
 * @class mathStuff
 */
```

#### 属性

```js
/*
 * @property propertyName
 * @type Number/String
 */
```

#### 方法/函数

```js
/*
 * @constructor
 * @method sum
 * @param {Number}/{String} instructions
 * @return {Number}/{String} instructions
 */
```

## SSR

- [Server Side Rendering with Puppeteer](https://developers.google.com/web/tools/puppeteer/articles/ssr)
- [Rendering on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)

```js
if (isBotAgent) {
  // return pre-rendering static html to search engine crawler
  // like Gatsby
} else {
  // server side rendering at runtime for real interactive users
  // ReactDOMServer.renderToString()
}
```

## SEO

### SEO Tutorials

- [SEO Basics](https://developers.google.com/search/docs/guides/javascript-seo-basics)
- [SPA SEO Basics](https://snipcart.com/spa-seo)

### SEO Tips

- [server-side rendering](https://css-tricks.com/server-side-react-rendering)
  (e.g next.js)
- [prerendering](https://github.com/chrisvfritz/prerender-spa-plugin)
- mobile performance optimization
  (e.g minify resources, code splitting, CDN, lazy loading, minimize reflows)
- [SEO-friendly routing and URL management](https://reacttraining.com/react-router)
- [Google webmaster tools](https://www.google.com/webmasters)

#### SEO Metadata

```js
const seo = {
  title: 'About',
  description: 'This is an awesome site that you definitely should check out.',
  url: 'https://www.mydomain.com/about',
  image: 'https://mydomain.com/images/home/logo.png',
};

<Helmet
  title={`${seo.title} | Code Mochi`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: seo.description,
    },
    { property: 'og:title', content: `${seo.title} | Code Mochi` },
    { property: 'og:url', content: seo.url },
    { property: 'og:image', content: seo.image },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'twitter:image:src', content: seo.image },
    { property: 'twitter:title', content: `${seo.title} | Code Mochi` },
    { property: 'twitter:description', content: seo.description },
  ]}
/>;
```

## PWA

Progressive Web Apps:

- served over `HTTPS`
- provide a manifest
- register a `ServiceWorker`
  (web cache for offline and performance)
- consists of website, web app manifest,
  service worker, expanded capabilities
  and OS integration

### Service Worker

#### SW Pros

- cache
- offline
- background
- custom request to minimize network
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)

#### SW Costs

- need startup time

```js
// 20~100 ms for desktop
// 100 ms for mobile
const entry = performance.getEntriesByName(url)[0];
const swStartupTime = entry.requestStart - entry.workerStart;
```

- cache reads aren't always instant:
  - cache hit time = read time (only this case better than `NO SW`),
  - cache miss time = read time + network latency,
  - cache slow time = slow read time + network latency,
  - SW asleep = SW boot latency + read time ( + network latency),
  - NO SW = network latency.

```js
const entry = performance.getEntriesByName(url)[0];

// no remote request means this was handled by the cache
if (entry.transferSize === 0) {
  const cacheTime = entry.responseStart - entry.requestStart;
}
```

```js
const cacheStart = performance.now();
const response = await caches.match(event.request);
const cacheEnd = performance.now();
```

#### SW Demo

- SW Serving Strategy
- SW Caching Strategy

```js
// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
```

#### SW for Broken Images

```js
function isImage(fetchRequest) {
  return fetchRequest.method === 'GET' && fetchRequest.destination === 'image';
}

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response.ok) return response;

        // User is online, but response was not ok
        if (isImage(e.request)) {
          // Get broken image placeholder from cache
          return caches.match('/broken.png');
        }
      })
      .catch((err) => {
        // User is probably offline
        if (isImage(e.request)) {
          // Get broken image placeholder from cache
          return caches.match('/broken.png');
        }
      })
  );
});

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('precache').then((cache) => {
      // Add /broken.png to "precache"
      cache.add('/broken.png');
    })
  );
});
```

### PWA Library

- [Workbox](https://github.com/GoogleChrome/workbox)

### PWA Tutorials

- [Extensive Guide](https://www.smashingmagazine.com/2018/11/guide-pwa-progressive-web-applications)

## HTTP/2

在 HTTP/1.x 中，每次请求都会建立一次 HTTP 连接:

- 串行的文件传输. 当请求 a 文件时, b 文件只能等待
- 连接数过多

HTTP/2 的多路复用就是为了解决上述的两个性能问题.
在 HTTP/2 中, 有两个非常重要的概念, 分别是帧（frame）和流（stream）.
帧代表着最小的数据单位, 每个帧会标识出该帧属于哪个流, 流也就是多个帧组成的数据流.
多路复用, 就是在一个 TCP 连接中可以存在多条流, 避免队头阻塞问题和连接数过多问题.

## Security

### Content Security Policy Level 3

CSP help prevent from XSS

```json
{
  "header": {
    "Content-Security-Policy": "
      script-src 'nonce-random123' 'strict-dynamic' 'unsafe-eval';
      object-src 'none'; base-uri 'none'
    "
  }
}
```

```html
<script>
  alert('xss');
</script>
// XSS injected by attacker - blocked by CSP
<script nonce="random123">
  alert('this is fine!)
</script>
<script nonce="random123" src="https://cdnjs.com/lib.js"></script>
```

nonce only CSP block 3rd lscripts and dynamic scripts generate by trusted users,
'strict-dynamic' can tackle it.

```html
<!-- Content-Security-Policy: script-src 'nonce-random123' 'strict-dynamic' -->
<script nonce="random123">
  const s = document.createElement('script)
  s.src = '/path/to/script.js';
  document.head.appendChild(s); // can execute correctly
</script>
```

### Trusted Types

- TrustedURL
- TrustedHTML
- TrustedScript
- TrustedScriptURL

```js
// fallback policy
TrustedTypes.createPolicy(
  'default',
  {
    createHTML(s) {
      console.error('Please fix! Insecure string assignment detected:', s);
      return s;
    },
  },
  true
);
```

```js
// Content-Security-Policy-Report-Only: trusted-types myPolicy; report-uri /cspReport
const SanitizingPolicy = TrustedTypes.createPolicy('myPolicy', {
  createHTML(s: string) => myCustomSanitizer(s)
}, false);

const trustedHTML = SanitizingPolicy.createHTML(foo);
element.innerHTML = trustedHTML;
```

### CSRF

```python
# Reject cross-origin requests to protect from
# CSRF, XSSI & other bugs
def allow_request(req):
  # Allow requests from browsers which don't send Fetch Metadata
  if not req['sec-fetch-site']:
    return True

  # Allow same-site and browser-initiated requests
  if req['sec-fetch-site'] in ('same-origin', 'same-site', 'none'):
    return True

  # Allow simple top-lelve navigations from anywhere
  if req['sec-fetch-mode'] == 'navigate' and req.method == 'GET':
    return True

  return False
```

### Object Property

- `object[constructor]`
- `object.__proto__`

### Sandbox

```js
// 简化伪代码示例
frame = document.body.appendChild(document.createElement('iframe',{
  src: 'about:blank',
  sandbox: "allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation",
  style: 'display: none;',
}))

window = new Proxy(frame.contentWindow, { ... })
document = new Proxy(document, { ... })
...


sandbox = new Function(`
  return function ({ window, location, history, document }, code){
    with(window) {
      ${code}
    }
}`)

sandbox().call(window, { window, location, history, document }, code)
```

### User Fingerprint

Use Canvas or WebGL to generate user
[fingerprint](https://yinzhicao.org/TrackingFree/crossbrowsertracking_NDSS17.pdf).

```js
function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '18pt Arial';
  context.textBaseline = 'top';
  context.fillText('Hello, user.', 2, 2);
  return canvas.toDataURL('image/jpeg');
}

getCanvasFingerprint();
```

## HTTP Protocol

### HTTP 2

HTTP/2 = `HTTP` + `HPack / Strem` + `TLS 1.2+` + `TCP`

- 二进制传输 (乱序二进制帧 Stream)
- Header 压缩 (HPack)
- 多路复用
- Server Push
- 事实加密 (Chrome/Firefox 只支持 HTTP/2 over TLS 1.2+)

### HTTP 3

HTTP/3 = `HTTP` + `QPack / Strem` + `QUIC / TLS 1.3+` + `UDP`

- 解决多次握手高延迟问题
- 解决队头 (数据重传) 阻塞 (后续数据) 问题
- QUIC 协议保证传输可靠、实现快速握手、集成 TLS 加密、实现多路复用

## DevOps

### Static Assets

Fingerprinting is a technique that makes the name of a file,
dependent on the **contents** of the file,
not on the **timestamp** differ from servers.
When the file contents change,
the filename is also changed.
For content that is static or infrequently changed,
this provides an easy way to tell whether two versions of a file are identical,
even across different servers or deployment dates.

When a filename is unique and based on its content, HTTP headers
can be set to encourage **caches**(code: `200`) everywhere
(whether at CDNs, at ISPs, in networking equipment, or in web browsers)
to keep their own copy of the content.
When the content is updated(),
the fingerprint will change.
This will cause the remote clients to request a new copy of the content.
This is generally known as cache busting.

### CI System

- Full builds upon continuous deployment.
- Incremental builds are a product of time.

### Release System

### Blue Green Deployment

两套系统, 一套稳定的绿色系统, 一套即将发布的蓝色系统.
不断切换并迭代发布到生产环境中.

### Rolling Update

多个集群实例的服务中, 在不影响服务的情况下,
停止一个或多个实例, 逐步进行版本更新.

### Gray Release

#### Gray Release Introduction

Canary Release: 全量或增量部署新文件, 并逐步把流量切换至新 CDN URL.
根据灰度白名单, 将灰度测试用户的 CDN Assets
更换至不同 Version Number 或者 Fingerprint 的新版本前端页面文件.

#### Gray Release Solution

通过灰度发布收集用户反馈 (转化率等指标),
决定后续是否全面将所有流量切至新版本,
或者完全放弃新版本,
亦或是通过 FLAGS 结合用户特征图像,
(如用户级别, UA, Cookie
Location, IP,
Feature List 等)
只向部分流量投放新版本.
可以实现千人千页,
每个用户获得由不同的功能 (FLAGS 开启关闭) 组成的不同页面.

业界成熟的灰度方案:

- 简单灰度逻辑通过 Nginx 配置做规则判断(路由, 参数, IP, Cookie 等), upstream 到不同的服务器:
  - 新代码部署到 A 边.
  - 符合灰度策略的小部分流量切到 A 边, 剩余大部分流量仍去往 B 边
  - 验证 A 边功能是否正常可用/好用
  - 验证无误后, 大部分流量转到 A 边, 灰度流量去往 B 边
  - 验证 B 边功能是否正常可用/好用
  - 验证无误后, 流量像往常一样均分到 AB 边

```bash
# Canary Deployment
map $COOKIE\_canary $group {
  # canary account
  ~\*devui$ server\_canary;
  default server\_default;
}

# 流量均分, 注释掉其中某一边, 另一边为灰度流量访问边
upstream server\_canary {
  server 11.11.11.11:8000 weight=1 max\_fails=1 fail\_timeout=30s;
  server 22.22.22.22 weight=1 max\_fails=1 fail\_timeout=30s;
}

# 流量均分, 注释掉其中某一边, 另一边为正常流量访问边
upstream server\_default {
  server 11.11.11.11:8000 weight=2 max\_fails=1 fail\_timeout=30s;
  server 22.22.22.22 weight=2 max\_fails=1 fail\_timeout=30s;
}

# 配置 8000 端口的转发规则, 并且 expose port
server {
  listen 8000;
  server\_name \_;
  root /var/canaryDemo;

  # Load configuration files for the default server block.
  include /etc/nginx/default.d/\*.conf;

  location / {
    root /var/canaryDemo;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}

server {
  listen 80 default\_server;
  listen \[::\]:80 default\_server;
  server\_name \_;
  # root /usr/share/nginx/html;
  root /var/canaryDemo;

  # Load configuration files for the default server block.
  include /etc/nginx/default.d/\*.conf;

  location / {
    proxy\_pass http://$group;
    # root /var/canaryDemo;
    # index index.html;
  }

  error\_page 404 /404.html;
    location = /40x.html {
  }

  error\_page 500 502 503 504 /50x.html;
  location = /50x.h
}
```

- 复杂灰度逻辑通过 Nginx + Lua 新增一个灰度中心服务,
  结合业务来做流量的灰度与切换, 控制 HTML 入口文件,
  使灰度规则与业务代码解耦.

#### Gray Release Performance

- 前端优化:
  每一个页面都需要去获取灰度规则，这个灰度请求将阻塞页面.
  可以使用 localStrage 存储这个用户是否为灰度用户,
  然后定期的更新 localStrage,
  取代大量的请求造成的体验问题.

- 后端优化:
  利用 MemCache 在内存中缓存灰度规则与灰度用户列表,
  提升灰度发布性能.
