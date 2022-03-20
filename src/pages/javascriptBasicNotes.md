---
layout: post
title: 'JavaScript Basic Notes'
subtitle: 'Be a Stupid Learner'
date: 2017-07-1
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - JavaScript
  - Frontend Development
  - Web Development
---

# JavaScript Basic Notes

## 常量

常数值 **加括号** 可转化为对象.

## 变量

### Primitive Values

Primitive data types:

- Null.
- Undefined.
- Boolean.
- Number.
- String.
- Symbol.
- BigInt.

#### undefined

- 对象属性未定义时，该属性值为 undefined
- 未初始化变量的初值为 undefined(表示 等待被赋值)

#### null

当引用为空或引用对象不存在时，值为 null

#### float

计算浮点数时，应先计算整数，再利用移位/乘法/除法转化为浮点数

```js
const a = (1 + 2) / 10; // a = 0.1 + 0.2;
```

#### 非数 NaN

- `NaN === NaN`: `false`.

```js
typeof NaN; // 'number'
Number.isNaN();
Number.isFinite();
```

```js
function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}
```

#### number

##### Infinity

Infinity represents all values greater than 1.7976931348623157e+308.
Infinity will be converted to `null` with `JSON.stringify()`.

```js
const largeNumber = 1.7976931348623157e308;
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
const largerNumber = 1.7976931348623157e309;

console.log(largeNumber); // 1.7976931348623157e+308
console.log(largerNumber); // Infinity
console.log(46 / 0); // Infinity
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.MAX_VALUE); // Infinity
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
console.log(-1.7976931348623157e309); // -Infinity
console.log(-46 / 0); // -Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.MIN_VALUE); // -Infinity

console.log(Math.max()); // -Infinity
console.log(Math.min()); // Infinity
```

#### string

##### 引用特性

- 赋值与传参 传递 string 字符串常量 的引用
- 所有 string 量 都是不可变量,当对 string 进行操作后，将先会在堆区创建副本，再通过副本进行修改，并返回副本的索引
- 没有被任何变量引用的 string: 垃圾回收

```js
const goodString = "I've been a good string";
console.log(typeof goodString); // string
console.log(goodString instanceof String); // false
console.log(Object.prototype.toString.call(goodString)); // [object String]

// eslint-disable-next-line no-new-wrappers
const badString = new String("I've been a naughty string");
console.log(typeof badString); // object
console.log(badString instanceof String); // true
console.log(Object.prototype.toString.call(badString)); // [object String]

const isPrimitiveString = value => typeof value === 'string';
console.log(isPrimitiveString(goodString)); // true
console.log(isPrimitiveString(badString)); // false

const isObjectWrappedString = value => value instanceof String;
console.log(isObjectWrappedString(goodString)); // false
console.log(isObjectWrappedString(badString)); // true

const isString = value => typeof value === 'string' || value instanceof String;
console.log(isString(goodString)); // true
console.log(isString(badString)); // true

const isStringAlternative = value =>
  Object.prototype.toString.call(badString) === '[object String]';
console.log(isStringAlternative(goodString)); // true
console.log(isStringAlternative(badString)); // true
```

##### 非对象特性(基本变量)

- 字符串中的字符不可枚举(for in 循环)
- delete 无法删除某位字符

##### 基本操作

+=: 字符串连接操作

#### Object Wrappers for Primitive Type

Using the wrapper function without the new keyword
is a useful way of coercing a value into a primitive type.

```js
// Not recommended (primitive object wrapper):
// eslint-disable-next-line no-new-wrappers
typeof new String(37); // object

// Safe (type coercion with wrapper function):
typeof String(37); // string

// Primitive strings:
// eslint-disable-next-line no-self-compare
'37' === '37'; // true

// Object-wrapped string:
// eslint-disable-next-line no-new-wrappers
new String(37) === '37'; // false

// Type-coerced string:
String(37) === '37'; // true
```

### Variable Hoisting

`var` 表达式和 `function` 声明都将会被提升到当前作用域 (全局作用域/函数作用域) 顶部,
其余表达式顺序不变.

<!-- eslint-disable vars-on-top -->
<!-- eslint-disable no-var -->

```js
// 我们知道这个行不通 (假设没有未定义的全局变量)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// 在引用变量后创建变量声明将会因变量提升而起作用。
// 注意: 真正的值 `true` 不会被提升。
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 解释器将变量提升到函数的顶部
// 这意味着我们可以将上边的例子重写为：
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// 使用 const 和 let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

<!-- eslint-enable vars-on-top -->
<!-- eslint-enable no-var -->
<!-- eslint-disable vars-on-top -->
<!-- eslint-disable no-var -->

```js
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}
```

<!-- eslint-enable vars-on-top -->
<!-- eslint-enable no-var -->

### Reference Values

- Object e.g Date.
- Array.
- Function.

### Date

- [Definitive Guide](https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript)

```js
const now = new Date();
now.getFullYear(); // 1-n
now.getMonth(); // Warn: 0-11
now.getDate(); // 1-n
now.getDay(); // Warn: 0-6
now.toString();
now.toDateString();
now.toTimeString();
now.toLocaleString();
now.toLocaleDateString();
now.toLocaleTimeString();

const daysOfMonth = (year, month) => {
  // `0` for last month of next month
  return new Date(year, month + 1, 0).getDate();
};

const prevYear = year => {
  return new Date(year - 1, 0).getFullYear();
};

const nextYear = year => {
  return new Date(year + 1, 0).getFullYear();
};

const prevMonth = (year, month) => {
  return new Date(year, month - 1).getMonth();
};

const nextMonth = (year, month) => {
  return new Date(year, month + 1).getMonth();
};
```

```js
const getDateItemList = (year, month) => {
  const days = daysOfMonth(year, month);
  const currentDateItemList = [...Array(days).keys()].map(index => {
    return DateItem(year, month, 1 + index);
  });

  const firstDayItem = DateItem(year, month, 1);
  const firstDayWeekday = firstDayItem.day;
  const lastMonthDays = daysOfMonth(year, month - 1);
  const prefixDays = firstDayWeekday === 0 ? 7 : firstDayWeekday;
  const prefixFirstDay = lastMonthDays - prefixDays + 1;
  const prefixYear = prevYear(year);
  const prefixMonth = prevMonth(year, month);
  const prefixDateItemList = [...Array(prefixDays).keys()].map(index => {
    return DateItem(prefixYear, prefixMonth, prefixFirstDay + index);
  });

  const lastDayItem = DateItem(year, month, days);
  const lastDayWeekday = lastDayItem.day;
  const suffixDays = lastDayWeekday === 6 ? 7 : 6 - lastDayWeekday;
  const suffixYear = nextYear(year);
  const suffixMonth = nextMonth(year, month);
  const suffixDateItemList = [...Array(suffixDays).keys()].map(index => {
    return DateItem(suffixYear, suffixMonth, 1 + index);
  });

  const dateItemList = [
    ...prefixDateItemList,
    ...currentDateItemList,
    ...suffixDateItemList,
  ];

  return dateItemList;
};
```

### Array

- 与 Object 同源
- 关联数组：`arrayName[“string”] = value;` 实际为 Array 对象添加属性`{string:value}`
- 缓存数组长度:`int l = list.length`(访问`length`造成运算)
- `[]`数组，`{}`对象

数组在 数值运算环境 中转化为 0(空数组)/num(单一元素数组)/NaN(多元素数组/NaN 数组)

#### Array Length

- 数组下标满足 [0, 2^32-1) 即可
- 运用大于 length 的下标, length 自动增大，不会发生数组边界错误
- length 等于 数组最后一个整数属性名+1, length 不一定等于 数组中有效元素个数

#### Array Literals

不使用构造函数,使用数组字面量创建数组

```js
const arr1 = new Array(3); // 数组长度
const arr2 = new Array(3.14); // RangeError
```

```js
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function (arg) {
    // 其余对象返回值 [object Object/Number/String/Boolean]
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

#### Array Methods

##### Array Sort

`toExchange`:

- `return 1`: a, b 交换位置.
- `return -1`: a, b 不交换位置.

```js
arr.sort(toExchange);
```

##### Array Stack

```js
arr.unshift(value); // 添加数组首元素
arr.push(value); // 添加数组尾元素
arr.shift(); // 删除数组首元素
arr.pop(); // 删除数组尾元素
```

##### Array Slice and Merge

- slice 不改变原数组, splice 改变原数组

```js
[].concat(otherArray);
[string].join('连接符'); // 将字符串数组连接成字符串o
string(charArray).split('割断点'); // 选择割断符,返回字符串数组
[].slice(start, end); // [start] - [end - 1]
[].splice(); // 功能强大的多态方法
```

##### Array Replace

```js
[].replace(oldSubStr, newStr);
```

##### Array Query

```js
''.substr(start, end);
[].indexOf(char); // -1 or other
```

##### Array Traverse

```js
[] / obj.forEach(function (val) {}); // 遍历数组/对象所有元素(val为单个元素)
```

##### Deep Clone of Array

```js
const nestedArray = [1, [2], 3];
const arrayCopy = JSON.parse(JSON.stringify(nestedArray));

// Make some changes
arrayCopy[0] = '1'; // change shallow element
arrayCopy[1][0] = '3'; // change nested element
console.log(arrayCopy); // [ '1', [ '3' ], 3 ]

// Good: Nested array NOT affected
console.log(nestedArray); //  1, [ 2 ], 3 ]
```

##### Array Other Methods

```js
[].reverse();
```

```js
// Tips
// 反转字符串
const reverseStr = normalizedStr.split('').reverse().join('');
```

##### Array Tips

- 对字符串每个元素进行单独操作 e.g map/filter

```js
str
  .split('')
  .map(function (subStr) {
    return decode(subStr.charCodeAt(0));
  })
  .join('');

str.split('').someOperator().join('');
```

- 实现 contains 方法

```js
!arr.includes(item);
```

- 改变某一处字母

```js
after = after.charAt(0).toUpperCase() + after.slice(1);
```

- 删除只能指定元素

```js
arr.splice(index, 1);
```

- Remove Duplicate Elements

```js
// 1: "Set"
[...new Set(array)];

// 2: "Filter"
array.filter((item, index) => array.indexOf(item) === index);

// 3: "Reduce"
array.reduce(
  (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
  []
);
```

##### 高阶函数

```js
[].map(item => item + 1); // map over
[].filter(item => item === 0); // list comprehension
[].reduce(
  (previous, current, currentIndex, arr) => current + previous,
  initial
); // fold function
```

### 类型检测

#### Best Practice

```js
function typeOf(o) {
  const _toString = Object.prototype.toString;
  const _type = {
    undefined: 'undefined',
    number: 'number',
    boolean: 'boolean',
    string: 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Error]': 'error',
    '[object JSON]': 'json',
  };

  return _type[typeof o] || _type[_toString.call(o)] || (o ? 'object' : 'null');
}
```

#### Null 检测

不应使用 typeof 检测 null, 应使用 ===/!==

```js
/*
 * ECMAScript 标准的重大 bug
 */
typeof null; // => object
```

#### 自定义对象检测

value instanceof constructor(查找原型链)

#### 属性检测

- 由于属性值可能为 0 值表达式, 不应使用 0 值表达式(0/''/null/undefined) 检测属性值
- 应使用 for in 进行属性检测

### 强制类型转化(Type Coercion)

- 字符串 -> 整数：`+string`/`Number(string)`/`parseInt(string, arg1)`
- any -> `bool`：`!!any`
- const -> `object`: `(const)`

> parseInt(): 遇到非数字字符立即停止运行，返回当前转化值; 将 0 开头字符串解析为八进制数，0x 开头字符串解析为十六进制数

```js
parseInt(str, base);
```

- boolean 在 数值运算环境 中 true => 1, false => 0
- 数组在 数值运算环境 中 转化为 0(空数组)/num(单一元素数组)/NaN(多元素数组/NaN 数组)
- 对象在 逻辑运算环境 中 转化为 true , 包括 false 的封装对象
- 对象在 数值运算环境 中 先利用 valueOf(object), 再利用 toString() 转化为数字, 若转化失败, 则返回 NaN
- 对象与 数值加号运算: 先数值加, (**失败后**)再字符串加

```js
// good
const totalScore = String(this.reviewScore);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;
```

#### 对象转换

对象转换为布尔值:

- 直接转换为 true（包装类型也一样），不调用 valueOf 和 toString

对象转换为数字:

- 如果对象具有 valueOf 方法且返回原始值(string、number、boolean、undefined、null)，
  则将该原始值转换为数字(转换失败会返回 NaN)，并返回这个数字
- 如果对象具有 toString 方法且返回原始值(string、number、boolean、undefined、null)，
  则将该原始值转换为数字(转换失败会返回 NaN)，并返回这个数字
- 转换失败，抛出 TypeError

对象转换为字符串:

- 如果对象具有 toString 方法且返回原始值(string、number、boolean、undefined、null)，则将该原始值转换为字符串，并返回该字符串
- 如果对象具有 valueOf 方法且返回原始值(string、number、boolean、undefined、null)，则将该原始值转换为字符串，并返回该字符串
  转换失败，抛出 TypeError

```js
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf;
const toString = Object.prototype.toString;

// 添加valueOf日志
// eslint-disable-next-line no-extend-native
Object.prototype.valueOf = function () {
  console.log('valueOf');
  return valueOf.call(this);
};
// 添加toString日志
// eslint-disable-next-line no-extend-native
Object.prototype.toString = function () {
  console.log('toString');
  return toString.call(this);
};
const a = {};
// eslint-disable-next-line no-new-wrappers
const b = new Boolean(false);

if (a) {
  console.log(1);
}

if (b) {
  console.log(2);
}

// output:
// 1
// 2
// 未调用valueOf和toString，符合 [对象到布尔值] 的转换规则
```

```js
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf;
const toString = Object.prototype.toString;

// 添加valueOf日志
// eslint-disable-next-line no-extend-native
Object.prototype.valueOf = function () {
  console.log('valueOf');
  return valueOf.call(this);
};
// 添加toString日志
// eslint-disable-next-line no-extend-native
Object.prototype.toString = function () {
  console.log('toString');
  return toString.call(this);
};

let a = {};
console.log(++a);

// output:
// valueOf
// toString
// NaN
// 1. valueOf方法返回的是对象本身，不是原始值，继续执行
// 2. toString方法返回的是”[object Object]”，是原始值(字符串)，将字符串转换为数字NaN
```

```js
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf;
const toString = Object.prototype.toString;

// 添加valueOf日志
// eslint-disable-next-line no-extend-native
Object.prototype.valueOf = function () {
  console.log('valueOf');
  return '1'; // 强制返回原始值
};
// 添加toString日志
// eslint-disable-next-line no-extend-native
Object.prototype.toString = function () {
  console.log('toString');
  return toString.call(this);
};

let a = {};
console.log(++a);

// output:
// valueOf
// 2
// valueOf 返回原始值(字符串)，直接将该字符串转换为数字，得到 1
```

```js
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf;
const toString = Object.prototype.toString;

// 添加valueOf日志
// eslint-disable-next-line no-extend-native
Object.prototype.valueOf = function () {
  console.log('valueOf');
  return valueOf.call(this);
};
// 添加toString日志
// eslint-disable-next-line no-extend-native
Object.prototype.toString = function () {
  console.log('toString');
  return toString.call(this);
};

const a = {};
alert(a);

// output:
// toString
// 弹出 "[object Object]"
// 调用toString方法，返回了字符串”[object Object]”，对象最终转换为该字符串
```

```js
// 保存原始的valueOf
const valueOf = Object.prototype.valueOf;
const toString = Object.prototype.toString;

// 添加valueOf日志
// eslint-disable-next-line no-extend-native
Object.prototype.valueOf = function () {
  console.log('valueOf');
  return valueOf.call(this);
};
// 添加toString日志
// eslint-disable-next-line no-extend-native
Object.prototype.toString = function () {
  console.log('toString');
  return this;
};

const a = {};
alert(a);

// output:
// toString
// valueOf
// Uncaught TypeError: Cannot convert object to primitive value
// 调用toString方法，返回的不是 primitive value，继续执行
// 调用valueOf方法，返回的不是 primitive value，继续执行
// 抛出 TypeError
```

## 运算符

### Loose Comparison

`==` 与 `!=`, [JS Loose Comparison](https://felix-kling.de/js-loose-comparison):

- Type(x) === Type(y): return `x === y` (Strict Equality Comparison)
- Type(x) !== Type(y):
  - x and y are `undefined` or `null`: return true
  - return comparison between `ToNumber(x)` and `ToPrimitive(y)`

### Strict Equal

`===` 与 `!==`:

- strings: same length, same characters in corresponding positions.
- numbers: numerically equal.
- objects: refer to same Object.
- Positive and negative `0` are equal to one another.
- `NaN` is not equal to anything, including `NaN`.
- `null` and `undefined` types are not equal with `===`, but equal with `==`.

<!-- eslint-disable eqeqeq -->

```js
const true1 = 0 == false; // true
const false1 = 0 === false; // false
const true2 = 1 == '1'; // true
const false2 = 1 === '1'; // false
const true3 = undefined == null; // true
const false3 = undefined === null; // false
const true4 = '0' == false; // true
const false4 = '0' === false; // false
// eslint-disable-next-line no-self-compare
const false5 = [] == []; // false, refer different objects in memory
// eslint-disable-next-line no-self-compare
const false6 = [] === []; // false, refer different objects in memory
// eslint-disable-next-line no-self-compare
const false7 = {} == {}; // false, refer different objects in memory
// eslint-disable-next-line no-self-compare
const false8 = {} === {}; // false, refer different objects in memory
```

<!-- eslint-enable eqeqeq -->

### 条件表达式

养成使用分号结束句子的习惯, 需分行显示的语句必须确保单行不会形成完整语义

```js
const i = a ? 1 : b ? 2 : c ? 3 : 4;
```

### Add Operator

`a + b`:

- 如果有一个是对象，则遵循对象对原始值的转换过程
  (Date 对象直接调用 toString 完成转换，
  其他对象通过 valueOf 转化，
  如果转换不成功则调用 toString)
- 如果两个都是对象，两个对象都遵循步骤 1 转换到字符串
- 两个数字，进行算数运算
- 两个字符串，直接拼接
- 一个字符串一个数字，直接拼接为字符串

### Dot Operator

`.` 优先级高于 `=`:
`el.data` 优先求值, 引用 `old`, 指向 `old.data`.
`5` => `el`, `5` => `el.data` (`old.data`).

```js
let el = { data: 1 };
const old = el;

el.data = el = 5;
console.log(el); // 5
console.log(el.data); // undefined
console.log(old); // { data: 5 }
console.log(old.data); // 5
```

## 控制流程

### Switch Case Statement

用方法查询代替 switch/case 语句

```js
function doAction(action) {
  const actions = {
    hack() {
      return 'hack';
    },

    slash() {
      return 'slash';
    },

    run() {
      return 'run';
    },
  };

  if (typeof actions[action] !== 'function') {
    throw new TypeError('Invalid action.');
  }

  // 闭包方法集
  return actions[action]();
}
```

## 对象

### 对象三大特征

- 原型代理(享元模式): 利用享元模式共享公有属性与通用方法
- 实例状态(原型克隆): 利用原型克隆拥有各自属性值
- 封装性(闭包式继承): 利用闭包方法实现属性私有化

即共用方法,单独属性,封装细节

### Prototype Chain

![原型链](./figures/Prototype.png)

- 实例化对象仅有属性`__proto__`, 没有属性`prototype`, 函数才具有属性 `prototype` (指向引擎为其自动创建的原型对象)
- 所有引用类型 (包括对象/数组/函数/构造函数) 都有属性`__proto__`(隐式原型)
- 所有函数/构造函数的 `__proto__` 都指向 `Function.prototype`
- 除`Object.prototype.__proto__`指向 null 外, 其余函数/构造函数的原型对象的`__proto__` 都指向 `Object.prototype`
- 除`Object.create()`外, 所新建对象的 `__proto__` 指向构造该对象的构造函数的`原型对象(prototype)`
- 除`typeof Function.prototype` 为 'function' 外, 其余函数/构造函数的原型对象都为 '对象'(`typeof` 为 'object')
- 先有`Object.prototype`(原型链顶端), `Function.prototype` 继承`Object.prototype`而产生, 最后`Object/Function/Array/其它构造函数`继承`Function.prototype`而产生
- `__proto__`:
  `[[proto]]` getter is `Object.getPrototypeOf(object)`,
  `[[proto]]` setter is `Object.setPrototypeOf(object, prototype)`.

> `Object` ---`__proto__`--> `Function.prototype` ---`__proto__`
> --> `Object.prototype` ---`__proto__`--> `null`

```js
function Foo(value) {
  this.val = value;
}

// auto create FooPrototype
// Foo.prototype -> FooPrototype
// FooPrototype.constructor -> [function Foo]
//
// foo.__proto__ -> FooPrototype
const foo = new Foo(2);
```

```js
// true because of `Object` is `function Object()` and inherited from `Function.prototype`
// Object has its own `prototype` property refer to `Object.prototype`
Object[[proto]] === Function.prototype;
// true because of `Array` is `function Array()` and inherited from `Function.prototype`
// Array has its own `prototype` property refer to `Array.prototype`
Array[[proto]] === Function.prototype;
// true because of Function is `function Function()` and inherited from `Function.prototype`
// Function has its own `prototype` property refer to `Function.prototype`
Function[[proto]] === Function.prototype;
// true because of Object.prototype is the top of inheritance chains (null is Object.prototype.__proto__)
// all `object/function/array instance`.__proto__......__proto__ refer to Object.prototype
Function[[proto]][[proto]] === Object.prototype;

// =>
Object instanceof Function; // true
Function instanceof Object; // true
```

### 构造函数

- 首字母大写
- 所有函数(包括构造函数)有 prototype 属性

#### 构造对象的三种形式

##### 对象字面量

对象字面量由 Object 构造函数 隐式构造

```js
const obj = {
  name: 'sabertazimi',
};

console.log(obj[[proto]] === Object.prototype); // true
```

##### New Constructor

new 构造函数作用原理如下:

- 形成原型链: 隐式原型指向构造函数的原型对象 `obj.__proto__ = constructor.prototype`
- 构造函数对象(Constructor)与原型对象(Prototype)之间形成闭环:
  - Constructor.prototype = Prototype
  - Prototype.constructor = Constructor

```js
function newInstance(constructor, ...args) {
  // var this = Object.create(Person.prototype);
  // this.__proto__ = F.prototype
  // F.prototype = Person.prototype
  // 即 this.__proto__ = Person.prototype;
  const obj = {};
  obj[[proto]] = constructor.prototype;
  constructor.apply(obj, args);
  return obj;
}

// =>
const instance = new Constructor(arguments);
```

```js
function Employee(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}

const employee = newInstance(Employee, 'Jack');
// =>
const employee = new Employee('Jack');
```

##### Object Create API

```js
Object.create = function (o) {
  if (arguments.length > 1) {
    throw new Error(
      'Object.create implementation only accepts the first parameter.'
    );
  }
  function F() {}
  F.prototype = o;
  return new F();
};

// new F() lead to `f.__proto__ === F.prototype` true
// `F.prototype === o` true
// `f.__proto__ === o` true
```

#### Constructor Return Value

- 返回 this 或 user-defined literal object
- 当返回值为**基本类型**时,仍然可得到 this 指针指向的原有对象

```js
const ObjectMaker = function () {
  this.name = 'This is it';
  // user-defined literal object
  // 直接忽略this.name
  const that = {};
  that.name = "And that's that";
  return that;
};
```

#### Instance Of Constructor

若 在实例对象的原型链(`__proto__`)中 能找到 构造函数的`prototype`属性(Prototype 对象), 则返回`true`, 否则返回`false`

```js
// true only if
// 1. Foo.__proto__ === Bar.prototype
// 2. Foo.__proto__......__proto__ === Bar.prototype
console.log(Foo instanceof Bar);
```

#### Constructor Best Practice

```js
function Foo() {
  if (!new.target) {
    throw new Error('Foo() must be called with new');
  }
}
```

```js
function Waffle() {
  // 当未使用 `new` 关键字时, `this` 指向全局对象
  if (!(this instanceof Waffle)) {
    return new Waffle();
  }

  // 正常构造函数
  this.tastes = 'yummy';
}
```

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
    super();
  }
}

const a = new A(); // logs "A"
const b = new B(); // logs "B"

class C {
  constructor() {
    console.log(new.target);
  }
}
class D extends C {
  constructor() {
    super();
  }
}

const c = new C(); // logs class C{constructor(){console.log(new.target);}}
const d = new D(); // logs class D extends C{constructor(){super();}}
```

### 全局对象

```js
// 立即函数模式:
// 此时返回值不是函数本身,而是函数执行后的return语句返回值
const global = (function () {
  // 返回全局对象
  return this;
})();
```

### 私有属性与特权方法

#### 私有属性

实现方式: 闭包

```js
function Gadget() {
  // private member
  const name = 'iPod';
  // public function
  this.getName = function () {
    return name;
  };
}
```

#### 特权方法

getter:返回基本类型值/**引用**类型**深拷贝**(POLA 最低授权原则)

```js
function Gadget() {
  // private member
  const pref = {};
  // public function
  this.getPref = function () {
    return pref.clone();
  };
}
```

Best Practice: **即使函数模式 + 揭示模式**

- 实现私有属性与私有方法
- 提供私有方法的公共(读/执行 not 写)接口,公共接口发生意外,私有方法仍安全

```js
// 匿名即时函数模式.
const obj = (function () {
  // private member
  const name = 'tazimi';
  // private method
  const getName = function getName() {
    return name;
  };
  // 闭包
  return {
    // 公共接口 - 私有方法
    getName,
  };
})();
```

### 静态属性与方法

#### 静态属性

实现方式: 闭包/原型代理

#### 静态方法

直接向构造函数添加方法

```js
Object.isArray = function () {};
```

### 模块化对象

命名空间+依赖模式+私有属性/特权方法+初始化模式+揭示模式(公共接口)+即时函数模式

package+import+private field/methods+constructor+public methods

Best Practice:

```js
// 命名空间模式
APP.namespace('APP.utilities.array');

// 形参: 导入全局变量
APP.utilities.array = (function (app, global) {
  // 依赖模式
  const uObj = APP.utilities.object;
  const uLang = APP.utilities.lang;

  // 私有属性
  const arrStr = '[object Array]';
  const toStr = Object.prototype.toString;

  // 私有方法
  const inArray = function (haystack, needle) {
    for (let i = 0, max = haystack.length; i < max; i += 1) {
      if (haystack[i] === needle) {
        return i;
      }
    }

    return -1;
  };
  const isArray = function (a) {
    return toStr.call(a) === arrayString;
  };

  // 初始化模式:
  // 初始化代码, 只执行一次.

  // 揭示公共接口.
  return {
    isArray,
    indexOf: inArray,
  };
})(APP, this);
```

### 普通属性

编写函数时,一般用[]访问对象属性

### 普通方法

为 prototype 添加方法,可以通过实现语法糖 method()简化代码(链模式)

```js
if (typeof Function.prototype.method !== 'function') {
  // eslint-disable-next-line no-extend-native
  Function.prototype.method = function (name, implementation) {
    this.prototype[name] = implementation;
    return this;
  };
}
```

```js
const Person = function (name) {
  this.name = name;
}
  .method('getName', function () {
    return this.name;
  })
  .method('setName', function (name) {
    this.name = name;
    return this;
  });
```

### Class 式继承

#### 代理构造函数(运用中继者)

可用于所有继承模式中,减少内存消耗 **Best Practice**:

```js
const inherit = (function () {
  // 减少继承过程中父类的实例化,减少资源消耗
  // 实例化一个空类所需资源更少
  const F = function () {};
  return function (C, P) {
    // c.__proto__ = C.prototype = f
    // f.__proto__ = F.prototype
    // F.prototype = P.prototype
    // c.__proto__.__proto__ = f.__proto__ = P.prototype
    F.prototype = P.prototype; // f.__proto__ = F.prototype = P.prototype
    C.prototype = new F(); // C.prototype = f
    C.prototype.constructor = C;
    C.super = P.prototype; // 此句可提高代码的重用性
  };
})();
```

```js
Child.prototype.add = function () {
  return Child.super.add.call(this);
};
```

#### 类继承(**借用构造函数**)与原型继承(**设置原型**) 混合继承模式

- `child.prototype = new Parent();`
- `Parent.apply(this, arguments);`

此模式会使得子类属性继承 2 次 **Best Practice**:

```js
function Parent(name) {
  this.name = name || 'Adam';
}
// adding functionality to the prototype
Parent.prototype.say = function () {
  return this.name;
};

// child constructor
function Child(...args) {
  Parent.apply(this, args);
}

Child.prototype = new Parent(); // 设置原型链,建立继承关系
Child.prototype.constructor = Child; // 使得 Prototype 对象与 Constructor 对象形成闭环
```

#### Class Simulation

复制式地继承，将会消耗大量内存单元 **Best Practice**:

```js
const classSim = function (Parent, props) {
  // 新的构造函数
  const Child = function (...args) {
    if (
      Child.uber &&
      Object.prototype.hasOwnProperty.call(Child.uber, '_construct')
    ) {
      Child.uber._construct.apply(this, args);
    }
    if (Object.prototype.hasOwnProperty.call(Child.prototype, '_construct')) {
      Child.prototype._construct.apply(this, args);
    }
  };

  // 类式继承
  Parent = Parent || Object;

  // 代理构造函数F
  const F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;

  // 添加属性与方法
  for (const i in props) {
    if (Object.prototype.hasOwnProperty.call(props, i)) {
      Child.prototype[i] = props[i];
    }
  }

  // return the "class"
  return Child;
};
```

```js
const SuperMan = classSim(Man, {
  _construct(what) {
    console.log("SuperMan's constructor");
  },
  getName() {
    const name = SuperMan.uber.getName.call(this);
    return `I am ${name}`;
  },
});
```

### 原型链继承

#### 共享 - 原型代理(prototype)

构造函数的原型对象被设置为新实例的原型引用

```js
f.prototype = o;
```

```js
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error(
        'Object.create implementation only accepts the first parameter.'
      );
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

```js
const switchProto = {
  isOn: function isOn() {
    return this.state;
  },

  toggle: function toggle() {
    this.state = !this.state;
    return this;
  },

  state: false,
};

const switchInstance = Object.create(switchProto);
```

#### 独立 - 原型克隆

此时属性与方法不共享，实例对象各自拥有一份拷贝

##### 浅克隆

```js
_.extend = function (obj, ...args) {
  each(...args, function (source) {
    for (const prop in source) {
      obj[prop] = source[prop];
    }
  });
  return obj;
};
```

##### 深克隆

```js
function extendDeep(parent, child) {
  let i;
  const toStr = Object.prototype.toString;
  const astr = '[object Array]';
  child = child || {};

  for (i in parent) {
    if (Object.prototype.hasOwnProperty.call(parent, i)) {
      // 若属性为对象,则进行深克隆
      if (typeof parent[i] === 'object') {
        child[i] = toStr.call(parent[i]) === astr ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }

  return child;
}
```

##### 属性混入 - 多重继承

```js
function mix(...args) {
  const child = {};

  for (let arg = 0; arg < args.length; arg += 1) {
    for (const prop in args[arg]) {
      if (Object.prototype.hasOwnProperty.call(args[arg], prop)) {
        child[prop] = args[arg][prop];
      }
    }
  }

  return child;
}
```

```js
const cake = mix(
  { eggs: 2, large: true },
  { butter: 1, salted: true },
  { flour: '3 cups' },
  { sugar: 'sure!' }
);
```

#### 封装 - 工厂方法(闭包)

```js
function factory() {
  const highlander = {
    name: 'MacLeod',
  };

  // 利用闭包，返回私有对象，实现工厂方法
  return {
    get: function get() {
      return highlander;
    },
  };
}
```

### 包装类对象

基本变量只会临时转变为包装类对象,若需添加额外属性/方法:

- new Number/String/Boolean();
- 改变内置原型

```js
// primitive string
const greet = 'Hello there';
// primitive is converted to an object
// in order to use the split() method
greet.split(' ')[0]; // "Hello"
// attempting to augment a primitive is not an error
greet.smile = true;
// but it doesn't actually work
typeof greet.smile; // "undefined"
```

不使用 new 关键字,包装类构造函数返回值为基本类型

```js
typeof Number(1); // "number"
typeof Number('1'); // "number"
// eslint-disable-next-line no-new-wrappers
typeof Number(new Number()); // "number"
typeof String(1); // "string"
typeof Boolean(1); // "boolean"
```

### 错误对象

```js
const err = {
  name: 'XXError',
  message: 'something wrong',
  extra: 'This was rather embarrassing',
  remedy: genericErrorHandler, // 处理错误的函数名.
};

try {
  throwError();
} catch (e) {
  console.log(e.message);
  e.remedy(); // genericErrorHandler.
}
```

Avoid using try-catch inside a loop:

```js
const object = ['foo', 'bar'];

try {
  for (let i = 0; i < object.length; i++) {
    // do something that throws an exception
  }
} catch (e) {
  // handle exception
}
```

## 函数

- 函数是对象
- 函数提供局部作用域
- Object 是 Function 的实例对象, **Function.prototype**是 Object 的实例对象

```js
Object[[proto]] === Function.prototype; // true
Function[[proto]] === Function.prototype; // true
Function[[proto]][[proto]] === Object.prototype; // true
```

### Invocation Patterns and This Bindings

#### Implicit Binding

- Function Invocation 普通调用模式: `this` 绑定至全局对象/`undefined` (`strict mode`)
  - setTimeout 和 setInterval 中传入的 Callbacks
    会自动转变为 Function Invocation,
    `this` bind to global/undefined object.
  - 同理, React Class Component 中传入的 Event Handlers
    会自动转变为 Function Invocation,
    需要显式地 `this.handleClick = this.handleClick.bind(this);`
- Method Invocation 方法调用模式: this 绑定至此方法所属的对象

```js
add(1, 2); // this -> global

const obj = {
  value: 1,
  foo() {
    // 若不将 this 赋值给 that, 而在内部函数中直接使用 this.value
    // 则会发生错误: 内部函数的 this 指向全局对象而不是obj
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    function inner() {
      return that.value;
    }

    return inner();
  },
};

obj.foo(); // 1
```

```js
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName() {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
setTimeout(batman.logName, 1000);
// after 1 second logs "undefined"
```

#### Explicit Binding

Apply/Bind/Call Invocation:
函数引用不可以改变函数定义作用域 (scope)，但可以改变函数执行作用域 (context).

```js
this.construct = Foo;
this.construct(options);
// =>
Foo.call(this, options);
```

#### Constructor Binding

Constructor Invocation: this 绑定至传入的空对象

#### Arrow Function Binding

- `this` defined where arrow function defined (not called) (**lexical scope**)
- `apply`/`call`/`bind` can't change `this` in arrow function

```js
const obj = {
  foo() {
    const inner = () => {
      return this.value;
    };

    return inner();
  },
};

const func = obj.foo;

obj.foo(); // `this` in `inner` function refer to `obj`
func(); // `this` in `inner` function refer to `window`
```

### prototype

- **实例化对象没有 prototype 属性**
- 每个函数都有 prototype 属性
- prototype 属性 指向 函数的原型对象 (由 js 引擎自动创建)
- 每个函数的 `__proto__` 都指向 `Function.prototype`

### arguments

- 不是数组,但有 length 属性(实参个数)
- Array.prototype/[].func.apply(arguments, ...);

#### Arguments Callee

- 引用 arguments 所属 function, 可以利用 callee 实现匿名递归函数
- arguments.callee.length: 形参个数

```js
try {
  // eslint-disable-next-line no-caller
  if (arguments.length !== arguments.callee.length) {
    throw new Error('传递的参数个数不匹配');
  }
} catch (err) {
  console.log(err);
  return this;
}
```

### 作用域链

- 函数每次运行时，都会新建执行环境内部对象，执行完后销毁此对象
- 每个执行环境拥有独立的作用域链,例如 独立全局对象、独立**活动对象**,
- 可动态改变作用域链的语句: with/try catch(异常对象入列，位于作用域链链首)
- `scope` -> `(list) [0]活动对象` -> `[1]全局对象`.

#### 全局对象 window

含有 全局对象如 window/document，全局方法，全局 this 指针等

#### 活动对象(Activation Object)

### 函数表达式

```js
// 变量提升
// eslint-disable-next-line no-var
var foo;
// eslint-disable-next-line no-const-assign
foo = function foo() {};

console.log(foo.name);

// 函数声明
function foo() {}

// 函数表达式
const foo = function foo() {};

const obj = {
  say: function say() {},
};
```

函数声明对于函数内部而言无法修改 (const)

```js
const b = 10;
(function b() {
  // eslint-disable-next-line no-func-assign
  b = 20;
  console.log(b);
})();

// print out function b { ... }
```

### 函数入参

**无副作用**的函数: 注意是否需要拷贝传入对象,使原有对象不受函数影响,并返回新对象

```js
// 除非必要,否则不改变原有对象
const obj = {
  value: 2,
};

function setValue(obj, val) {
  obj.value = val;
  return obj;
}
```

```js
// 好习惯: 改变新对象,返回新对象
const obj = {
  value: 2,
};

function setValue(obj, val) {
  const instance = extend({}, obj, { value: val });
  return instance;
}
```

### 回调函数

```js
// check if callback is callable
if (typeof callback !== 'function') {
  callback = false;
}

// now callback:
if (callback) {
  callback();
}
```

```js
const findNodes = function (callback) {
  let i = 100000;
  const nodes = [];
  let found;

  // check if callback is callable
  if (typeof callback !== 'function') {
    callback = false;
  }

  while (i) {
    i -= 1;

    // now callback:
    if (callback) {
      callback(found);
    }

    nodes.push(found);
  }

  return nodes;
};
```

当回调函数为对象方法时 (特别时方法中使用 this 指针),
需同时传入对象参数,
并利用 `apply/call` 改变执行环境.

```js
const findNodes = function (callbackObj, callback) {
  if (typeof callback === 'function') {
    callback.call(callbackObj, found);
  }
};

const findNodes = function (callbackObj, callback) {
  if (typeof callback === 'string') {
    callback = callbackObj[callback];
  }

  if (typeof callback === 'function') {
    callback.call(callbackObj, found);
  }
};
```

### 自定义函数/惰性函数定义

(Self-Defining Function)/(Lazy Function Definition)

- 第一次执行时,进行初始化并重新定义函数变量
- 第二次执行时,不再进行初始化(函数被重定义至真正函数)
- 第一次执行为 promise, 将重复使用的部分进行初始化，之后的调用不再浪费新空间，提高代码效率

```js
// definition
// eslint-disable-next-line no-var
var foo = function () {
  // initialize code;
  const t = new Date();

  foo = function () {
    return t;
  };

  // 使得第一次调用可以产生预期值,保证每次调用的行为保持一致
  return foo();
};

// first run: same behavior as second run
console.log(foo()); // t
// second run
console.log(foo()); // t
```

```js
// eslint-disable-next-line no-var
var addEvent = function (el, type, handle) {
  addEvent = el.addEventListener
    ? function (el, type, handle) {
        el.addEventListener(type, handle, false);
      }
    : function (el, type, handle) {
        el.attachEvent(`on${type}`, handle);
      };

  // 保持每次调用对外表现行为一致
  addEvent(el, type, handle);
};
```

### 即时函数

即时函数自动执行(定义即执行)：匿名包装器

#### 即时函数模式

- 函数表达式
- 末尾添加括号(传参),使函数立即执行
- 将整个函数置于括号内

```js
(function () {
  console.log('watch out');
})();
```

#### 模式作用

- 使得匿名函数内部的代码能够立即执行
- 不泄漏只使用一次的局部变量与方法
- 创建命名空间，防止变量命名冲突

#### 即时函数返回值

var foo = (function () {}());

foo 不被赋予 function 值,而被赋予函数执行后的返回值;
此返回值可设为函数可产生闭包。

```js
const getResult = (function () {
  const res = 2 + 2;
  return function () {
    return res;
  };
})();
```

### Bind Invocation

- `Function.call(contextObj, arg1, arg2,...)`
- `Function.apply(contextArray, [arg1, arg2, ...]/arguments)`
- call 效率高于 apply.

```js
window.function.call();
window.function.apply();
// js解释器临时将数组/字符串包装成对象原型.
[].arrayStaticFunction.call();
[].arrayStaticFunction.apply();
Array.prototype.arrayStaticFunction.call();
Array.prototype.arrayStaticFunction.apply();
''.stringStaticFunction.call();
''.stringStaticFunction.apply();
String.prototype.stringStaticFunction.call();
String.prototype.stringStaticFunction.apply();
```

相当于:

```js
context.function(arguments);
```

#### Function Bind

- change function runtime context (ignore innovation pattern `function/method/new/call/apply`)
- curry function
- can't change `this` in arrow function

```js
const boundFunc = func.bind(context, arg1, arg2, argN);
```

#### Function Call and Apply

```js
function bind(o, m) {
  return function (...args) {
    return m.apply(o, args);
  };
}
```

```js
const one = {
  name: 'object',
  say(greet) {
    return `${greet}, ${this.name}`;
  },
};
const two = { name: 'another object' };
const twoSay = bind(two, one.say);

twoSay('yo'); // "yo, another object"
```

### 多态方法

```js
const greet = function greet(options, ...rest) {
  // 运用 if/switch 方法分情况调用函数, 实现多态方法.
  if (typeof options === 'string' && typeof methods[options] === 'function') {
    // 方法集中含有此方法:
    return methods[options](...rest);
  }
};
```

hasOwnProperty:

- 使用其它对象的`hasOwnProperty`，并将其上下文设置为`foo`

`({}).hasOwnProperty.call(foo, 'bar'); // true`

- 推荐总是使用`hasOwnProperty`进行`for in`循环

### eval

- 不要使用`eval()`函数
- 不要使用字符串作参数 new Function();(会调用`eval`函数)
- 不要使用字符串作`setTimeOut`/`setInterval`的第一个参数(会调用`eval`函数)

```js
// Anti-pattern:
const property = 'name';
// eslint-disable-next-line no-eval
alert(eval(`obj.${property}`));
// Preferred:
const property = 'name';
alert(obj[property]);

// Anti-pattern:
// eslint-disable-next-line no-implied-eval
setTimeout('myFunc()', 1000);
// eslint-disable-next-line no-implied-eval
setTimeout('myFunc(1, 2, 3)', 1000);
// Preferred:
setTimeout(myFunc, 1000);
setTimeout(function () {
  myFunc(1, 2, 3);
}, 1000);
```

### 常用函数

#### Object Descriptor

对象的属性描述符:

- Object.defineProperty(O,Prop,descriptor)
- Object.defineProperties(O,descriptors)

数据描述符:

- configurable：是否可以被删除，默认 false
- enumerable：是否可以被枚举(for in)，默认 false
- writable：是否是只读 property，默认是 false,有点像 C#中的 const
- value：值，默认是 undefined

存取描述符:

- get: 返回 property 值的方法, 默认是 undefined
- set：为 property 设置值的方法, 默认是 undefined

```js
Object.defineProperty(o, 'age', {
  value: 24,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(o, 'sex', {
  value: 'male',
  writable: false, //  不可赋值
  enumerable: false, //  不可遍历/枚举
  configurable: false,
});
```

```js
Object.defineProperties(o, {
  age: {
    value: 24,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  sex: {
    value: 'male',
    writable: false,
    enumerable: false,
    configurable: false,
  },
});
```

#### Object Functions

- `Object.create(prototype[,descriptors])`

```js
const o = Object.create({
  say() {
    alert(this.name);
  },
  name: 'Byron',
});
```

- Object.getOwnPropertyDescriptor(O,property)
- Object.getOwnPropertyNames
- Object.keys() - 仅获取可枚举的属性

```js
const props = Object.getOwnPropertyDescriptor(o, 'age');
console.log(props);
// Object {value: 24, writable: true, enumerable: true, configurable: true}

console.log(Object.getOwnPropertyNames(o)); // ["age", "sex"]
console.log(Object.keys(o)); // ["age"]
```

- Object.preventExtensions(O)/Object.isExtensible(O) - 不可新增属性，可删除/修改属性
- Object.seal(O)/Object.isSealed(O) - 不可新增/删除属性，可修改属性
- Object.freeze(O)/Object.isFrozen(O) - 不可新增/删除/修改属性

#### 类型判断

```js
Boolean(val); // true
Array(val); // Array[<3个空存储位置>]
```

#### 解析函数

```js
parseInt(val, 2 / 8 / 10);
```

#### 数学函数

```js
Math.floor(Math.random * arr.length);
Math.min / Math.max; // 最小值/最大值
```

#### 时间函数

##### Interval Function

Combine setInterval/setTimeout function with Closure:

```js
// 选择排序: 具有两重循环
const animation = setInterval(() => {
  // interval - (外)循环结束条件
  if (i >= dataLength) {
    clearInterval(animation);
    // 结束动画
    setTimeout(() => {
      for (let n = 0; n < dataLength; n++) {
        ele_arr[n].className = 'data-list__item finish';

        // eslint-disable-next-line no-loop-func
        (function (index) {
          setTimeout(() => {
            ele_arr[index].className = 'data-list__item';
          }, 500);
        })(n);
      }
    }, 200);
    return;
  }

  // 内循环
  j = i;
  temp = data_queue[i];
  while (j > 0 && data_queue[j - 1] >= temp) {
    list_element.replaceChild(
      _createItemElement(data_queue[j - 1]),
      ele_arr[j]
    );
    data_queue[j] = data_queue[j - 1];
    ele_arr[j].className = 'data-list__item change';

    // eslint-disable-next-line no-loop-func
    (function (index) {
      setTimeout(() => {
        ele_arr[index].className = 'data-list__item';
      }, 200);
    })(j);
    j--;
  }
  list_element.replaceChild(_createItemElement(temp), ele_arr[j]);
  data_queue[j] = temp;
  i++;
}, 200);
```

### 常用模式

#### API 模式

##### 回调模式

##### 配置对象

```js
const conf = {
  name: 'name',
  eMail: 'test@gmail.com',
};

addPerson(conf);
```

##### 返回函数(闭包)

一个函数的返回值设为另一个函数

##### Curry 化

##### 链模式

```js
return this;
```

#### 初始化模式

##### 即使函数

##### 即使对象初始化

obj.init();

##### 初始化分支

浏览器探嗅: 执行此功能的 if/else 语句只执行一次.

检测浏览器对 H5/CSS3/ES5/ES2016 的支持情况,不足则自行编写函数补充功能.

```js
if (typeof target === 'undefined') {
  initialization();
}
```

## 模块化

### 命名空间

通过传参匿名函数,创建命名空间,进行模块包裹

```js
const app = {};

(function (exports) {
  (function (exports) {
    const api = {
      moduleExists: function test() {
        return true;
      },
    };
    // 闭包式继承,扩展exports对象为api对象
    $.extend(exports, api);
  })(typeof exports === 'undefined' ? window : exports);
  // 将api对象绑定至app对象上
})(app);
```

```js
// global object
const APP = {};
// constructors
APP.Parent = function () {};
APP.Child = function () {};
// a variable
APP.some_var = 1;
// an object container
APP.modules = {};
// nested objects
APP.modules.module1 = {};
APP.modules.module1.data = { a: 1, b: 2 };
APP.modules.module2 = {};
```

#### 通用命名空间函数

```js
APP.namespace = function (namespaceString) {
  let parts = namespaceString.split('.');
  let parent = APP;
  let i;
  // strip redundant leading global
  if (parts[0] === 'APP') {
    // remove leading global
    parts = parts.slice(1);
  }
  for (i = 0; i < parts.length; i += 1) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    // 关键: 向内嵌套
    parent = parent[parts[i]];
  }
  // 返回最内层模块名
  return parent;
};
```

```js
// assign returned value to a local var
const module2 = APP.namespace('APP.modules.module2');
module2 === APP.modules.module2; // true
// skip initial `APP`
APP.namespace('modules.module51');
// long namespace
APP.namespace('once.upon.a.time.there.was.this.long.nested.property');
```

### 沙盒模式

#### 实现沙盒构造函数

- 私有属性绑定至 this/prototype
- 特权方法绑定至 modules/prototype

```js
function Sandbox(...args) {
  // the last argument is the callback
  const callback = args.pop();
  // modules can be passed as an array or as individual parameters
  let modules = args[0] && typeof args[0] === 'string' ? args : args[0];

  // make sure the function is called
  // as a constructor
  if (!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback);
  }

  // add properties to `this` as needed:
  this.a = 1;
  this.b = 2;

  // now add modules to the core `this` object
  // no modules or "*" both mean "use all modules"
  if (!modules || modules === '*') {
    modules = [];
    for (const i in Sandbox.modules) {
      if (Object.prototype.hasOwnProperty.call(Sandbox.modules, i)) {
        modules.push(i);
      }
    }
  }

  // initialize the required modules
  for (let i = 0; i < modules.length; i += 1) {
    Sandbox.modules[modules[i]](this);
  }

  // call the callback
  callback(this);
}
```

```js
// any prototype properties as needed
Sandbox.prototype = {
  name: 'My Application',
  version: '1.0',
  getName() {
    return this.name;
  },
};
```

静态属性 - 使用添加的方法/模块

```js
Sandbox.modules = {};
Sandbox.modules.dom = function (box) {
  box.getElement = function () {};
  box.getStyle = function () {};
  box.foo = 'bar';
};
Sandbox.modules.event = function (box) {
  // access to the Sandbox prototype if needed:
  // box.constructor.prototype.m = "mmm";
  box.attachEvent = function () {};
  box.detachEvent = function () {};
};
Sandbox.modules.ajax = function (box) {
  box.makeRequest = function () {};
  box.getResponse = function () {};
};
```

#### 沙盒使用方式

```js
Sandbox(['ajax', 'event'], function (box) {
  // console.log(box);
});

Sandbox('*', function (box) {
  // console.log(box);
});
Sandbox(function (box) {
  // console.log(box);
});

Sandbox('dom', 'event', function (box) {
  // work with dom and event
  Sandbox('ajax', function (box) {
    // another sandbox "box" object
    // this "box" is not the same as
    // the "box" outside this function
    // ...
    // done with Ajax
  });
  // no trace of Ajax module here
});
```

## JavaScript DOM API

- DOM Level 0
- DOM Level 1
  - DOM Core
  - DOM HTML
- DOM Level 2
  - DOM2 Core
  - DOM2 HTML
  - DOM2 Events
  - DOM2 Style
  - DOM2 Traversal
  - DOM2 Range
  - DOM2 Views
- DOM Level 3
  - DOM3 Core
  - DOM3 Load and Save
  - DOM3 Validation

```js
if (document.implementation) {
  document.implementation.hasFeature('HTML', '1.0');
  // => DOM HTML
}
```

### DOM Tree

- Native object: JavaScript Native e.g. Array.
- Host object: provided by Browser e.g. HTML5 API.
- User-defined object.

```html
<table>
  <tr>
    <td align="center" colspan="2">element node</td>
  </tr>
  <tr>
    <td>text node</td>
    <td>attribute node</td>
  </tr>
</table>
```

### DOM Core

```js
document.createElement('nodeName');
document.createTextNode('String');

cloneNode();
node.remove();

parentElement.appendChild(childElement);
parentElement.insertBefore(newElement, targetElement);
parentElement.removeChild();
parentElement.replaceChild();
parentElement.replaceChildren();
parentElement.hasChildNode();

setAttribute();
getAttribute();

document.getElementById();
document.getElementsByTagName();
document.querySelector();
document.querySelectorAll();
```

```js
const showAlert = (type, message, duration = 3) => {
  const div = document.createElement('div');
  div.className = type;
  div.appendChild(document.createTextNode(message));
  container.insertBefore(div, form);
  setTimeout(() => div.remove(), duration * 1000);
};
```

#### Append DOM Node

| Method             | Node | HTML | Text | IE  | Event Listeners | Secure  |
| ------------------ | ---- | ---- | ---- | --- | --------------- | ------- |
| append             | Yes  | No   | Yes  | No  | Preserves       | Yes     |
| appendChild        | Yes  | No   | No   | Yes | Preserves       | Yes     |
| innerHTML          | No   | Yes  | Yes  | Yes | Loses           | Careful |
| insertAdjacentHTML | No   | Yes  | Yes  | Yes | Preserves       | Careful |

```js
const testDiv = document.getElementById('testDiv');

const para = document.createElement('p');
testDiv.appendChild(para);

const txt = document.createTextNode('Hello World');
para.appendChild(txt);
```

#### Insert DOM Node

```js
// 4 positions
//
// <!-- beforebegin -->
// <p>
// <!-- afterbegin -->
// foo
// <!-- beforeend -->
// </p>
// <!-- afterend -->
const p = document.querySelector('p');

p.insertAdjacentHTML('beforebegin', '<a></a>');
p.insertAdjacentText('afterbegin', 'foo');

// simply be moved element, not copied element
p.insertAdjacentElement('beforebegin', link);
```

```js
function insertAfter(newElement, targetElement) {
  const parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
```

#### Replace DOM Node

```js
node.replaceChild(document.createTextNode(text), node.firstChild);
node.replaceChildren(...nodeList);
```

#### DOM Node Type

Node 除包括元素结点 (tag) 外,
包括许多其它结点 (甚至空格符视作一个结点),
需借助 nodeType 找出目标结点.

```js
node.nodeType;
```

| nodeType | representation |
| :------- | :------------- |
| 1        | 元素结点       |
| 2        | 属性结点       |
| 3        | 文本结点       |

```js
node.nodeName;
node.nodeValue;
```

##### Traverse DOM Tree

```js
node.parentNode;
node.childNodes;
node.firstChild;
node.lastChild;
node.nextSibling;
node.previousSibling;
node.textContent;
// returns closest ancestor of current element matching selectors
node.closest(selectors);
```

Element-only navigation:
Navigation properties listed above refer to all nodes. For instance,
in childNodes we can see both text nodes, element nodes,
and even comment nodes if there exist.

```js
node.parentElement;
node.children;
node.firstElementChild;
node.lastElementChild;
node.previousElementSibling;
node.nextElementSibling;
```

#### Frag

减少 DOM 操作次数,减少页面渲染次数

```js
const frag = document.createDocumentFragment();

let p;
let t;

p = document.createElement('p');
t = document.createTextNode('first paragraph');
p.appendChild(t);
frag.appendChild(p);

p = document.createElement('p');
t = document.createTextNode('second paragraph');
p.appendChild(t);
frag.appendChild(p);

// 只渲染一次HTML页面
document.body.appendChild(frag);
```

```js
const oldNode = document.getElementById('result');
const clone = oldNode.cloneNode(true);
// work with the clone

// when you're done:
oldNode.parentNode.replaceChild(clone, oldNode);
```

### HTML DOM

```js
element.innerHTML;
element.textContent;
```

innerHTML: non-concrete, including all types of childNodes

`div.innerHTML = <p>Test<em>test</em>Test.</p>`

```html
<div>
  <p>Test<em>test</em>Test.</p>
</div>
```

```js
document.body;
documents.images;
documents.links;
documents.forms;
documents.forms[0].elements; // 第一个表单内的所有字段
element.alt = string;
element.classname = value;
```

```js
document.querySelector('cssSelector');
document.querySelectorAll('cssSelector');
```

### CSSOM

The CSS Object Model is a set of APIs allowing the manipulation of CSS from JavaScript.
It is much like the DOM, but for the CSS rather than the HTML.
It allows users to read and modify CSS style dynamically.

#### Inline Styles

```js
const style = element.style.XX;
const font = element.style.fontFamily;
const mt = element.style.marginTopWidth;
```

#### Getter and Setter Styles

- getPropertyValue
- setProperty
- removeProperty
- item
- `getPropertyPriority`: return `''` or `important`

```js
const box = document.querySelector('.box');

box.style.setProperty('color', 'orange');
box.style.setProperty('font-family', 'Georgia, serif');
op.innerHTML = box.style.getPropertyValue('color');
op2.innerHTML = `${box.style.item(0)}, ${box.style.item(1)}`;

box.style.setProperty('font-size', '1.5em');
box.style.item(0); // "font-size"

document.body.style.removeProperty('font-size');
document.body.style.item(0); // ""
```

#### Computed Styles

- shorthand style for full property
- longhand style for specific property
- `getPropertyValue` can get css variables too

```js
window.getComputedStyle(document.body).background;

// dot notation, same as above
window.getComputedStyle(el).backgroundColor;

// square bracket notation
window.getComputedStyle(el)['background-color'];

// using getPropertyValue()
// can get css variables property too
window.getComputedStyle(el).getPropertyValue('background-color');
```

#### CSS Class

```js
element.classList.add;
element.classList.remove;
element.classList.toggle;
```

**Tip**: bind class

```js
function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += ' ';
    newClassName += value;
    element.className = newClassName;
  }
}
```

#### CSS StyleSheet Interface

##### CSS Rules Definition

- type of `cssRules`:
  STYLE_RULE (1), IMPORT_RULE (3), MEDIA_RULE (4), KEYFRAMES_RULE (7)
- `selectorText` property of rules
- `style` property of rules

```js
const myRules = document.styleSheets[0].cssRules;
const p = document.querySelector('p');

for (i of myRules) {
  if (i.type === 1) {
    p.innerHTML += `<code>${i.selectorText}</code><br>`;
  }

  if (i.selectorText === 'a:hover') {
    i.selectorText = 'a:hover, a:active';
  }

  const myStyle = i.style;

  // Set the bg color on the body
  myStyle.setProperty('background-color', 'peachPuff');

  // Get the font size of the body
  myStyle.getPropertyValue('font-size');

  // Get the 5th item in the body's style rule
  myStyle.item(5);

  // Log the current length of the body style rule (8)
  myStyle.length;

  // Remove the line height
  myStyle.removeProperty('line-height');

  // log the length again (7)
  myStyle.length;

  // Check priority of font-family (empty string)
  myStyle.getPropertyPriority('font-family');
}
```

##### Media Rule

- `conditionText` property of media rule
- nested `cssRules`

```js
const myRules = document.styleSheets[0].cssRules;
const p = document.querySelector('.output');

for (i of myRules) {
  if (i.type === 4) {
    p.innerHTML += `<code>${i.conditionText}</code><br>`;

    for (j of i.cssRules) {
      p.innerHTML += `<code>${j.selectorText}</code><br>`;
    }
  }
}
```

##### Keyframe Rule

- `name` property of keyframe rule
- nested `cssRules`:
- `keyText` property of rules

```js
const myRules = document.styleSheets[0].cssRules;
const p = document.querySelector('.output');

for (i of myRules) {
  if (i.type === 7) {
    p.innerHTML += `<code>${i.name}</code><br>`;

    for (j of i.cssRules) {
      p.innerHTML += `<code>${j.keyText}</code><br>`;
    }
  }
}
```

##### Add and Remove CSS Rules

```js
const myStylesheet = document.styleSheets[0];
console.log(myStylesheet.cssRules.length); // 8

document.styleSheets[0].insertRule(
  'article { line-height: 1.5; font-size: 1.5em; }',
  myStylesheet.cssRules.length
);
console.log(document.styleSheets[0].cssRules.length); // 9
```

```js
const myStylesheet = document.styleSheets[0];
console.log(myStylesheet.cssRules.length); // 8

myStylesheet.deleteRule(3);
console.log(myStylesheet.cssRules.length); // 7
```

### DOM Events

- `event.preventDefault()`.
- `event.stopPropagation()`.
- `element.dispatchEvent(event)` to trigger events.
- Default `bubble` mode, can change to `capture` mode.

#### Events Checking

```js
function handleEvent(event) {
  node.matches(event.target); // return false or true
  node.contains(event.target); // return false or true
}
```

#### Global DOM Event

DOMContentLoaded:

- 当文档中没有脚本时, 浏览器解析完文档便能触发 DOMContentLoaded 事件
- 如果文档中包含脚本, 则脚本会阻塞文档的解析,
  而脚本需要等 CSSOM 构建完成才能执行
  - 在 DOM、CSSOM 构建完毕, `defer` 脚本执行完成之后, DOMContentLoaded 事件触发
  - HTML 文档构建不受 `async` 脚本影响,
    不需要等待 async 脚本执行与样式表加载,
    HTML 解析完毕后, DOMContentLoaded 立即触发
- 在任何情况下, DOMContentLoaded 的触发不需要等待图片等其他资源加载完成
- 当 HTML 文档解析完成就会触发 DOMContentLoaded,
  而所有资源加载完成之后, **load** 事件才会被触发

```js
document.addEventListener('DOMContentLoaded', event => {
  console.log('DOM fully loaded and parsed.');
});
```

#### Tab Visibility Event

- 切换标签页时改变网页标题/声音/视频

```js
window.addEventListener('visibilitychange', () => {
  switch (document.visibilityState) {
    case 'hidden':
      console.log('Tab隐藏');
      break;
    case 'visible':
      console.log('Tab被聚焦');
      break;
    default:
      throw new Error('Unsupported visibility!');
  }
});
```

```js
const videoElement = document.getElementById('videoElement');

// AutoPlay the video if application is visible
if (document.visibilityState === 'visible') {
  videoElement.play();
}

// Handle page visibility change events
function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange, false);
```

#### Form Events

- [CheckValidity API](https://developer.mozilla.org/docs/Web/API/HTMLSelectElement/checkValidity)
- [FromData API](https://developer.mozilla.org/docs/Web/API/FormData)
- [Forms Constraint Validation](https://www.sitepoint.com/html-forms-constraint-validation-complete-guide)

```js
// <form className='validated-form' noValidate onSubmit={onSubmit}>

const onSubmit = event => {
  event.preventDefault();

  const form = event.target;
  const isValid = form.checkValidity(); // returns true or false
  const formData = new FormData(form);

  const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
    acc[key] = form.elements[key].validationMessage;
    return acc;
  }, {});

  setErrors(validationMessages);

  console.log({
    validationMessages,
    data,
    isValid,
  });

  if (isValid) {
    // here you do what you need to do if is valid
    const data = Array.from(formData.keys()).reduce((acc, key) => {
      acc[key] = formData.get(key);
      return acc;
    }, {});
  }
};
```

```js
function validateForm(e) {
  const form = e.target;

  if (form.checkValidity()) {
    // form is valid - make further checks
  } else {
    // form is invalid - cancel submit
    e.preventDefault();
    // apply invalid class
    Array.from(form.elements).forEach(i => {
      if (i.checkValidity()) {
        // field is valid - remove class
        i.parentElement.classList.remove('invalid');
      } else {
        // field is invalid - add class
        i.parentElement.classList.add('invalid');
      }
    });
  }
}
```

#### Input Events

- focus/focusin/focusout event
- input/change event
- select event

```js
const input = document.querySelector('input');

input.addEventListener('select', event => {
  const log = document.getElementById('log');
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd
  );
  log.textContent = `You selected: ${selection}`;
});
```

#### Mouse Events

```js
onclick;
ondbclick;
onmouse - down / move / enter / out / leave / over;
```

For click event, no need for X/Y to judge internal/outside state.
Use DOM API `element.contains` to check is a better way.

```js
window.addEventListener('click', event => {
  if (document.getElementById('main').contains(event.target)) {
    process();
  }
});
```

[Drag Event](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent):

- dragstart: start point.
- dragend
- dragenter: call `event.preventDefault()` in drop zone.
- dragover: call `event.preventDefault()` in drop zone.
- dragleave
- drop: end point.

Key point for implementing DnD widget is
[DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer):

- Bindings between Drag Zone and Drop Zone.
- `DataTransfer.dropEffect` and `DataTransfer.effectAllowed` to define DnD UI type.
- `DataTransfer.getData` and `DataTransfer.setData` to transfer data.
- `DataTransfer.files` and `DataTransfer.items` to transfer data.

[Context Menu Event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event):

```js
const noContext = document.getElementById('noContextMenu');

noContext.addEventListener('contextmenu', e => {
  e.preventDefault();
});
```

#### Key Events

`onkeypress/up/down`

```js
document.onkeydown = function (event) {
  // eslint-disable-next-line no-caller
  const e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode === 13) {
    // enter 键
    // coding
  }
};
```

- event.key => [keyName](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

```js
'Alt';
'CapsLock';
'Control';
'Fn';
'Numlock';
'Shift';
'Enter';
'Tab';
' '; // space bar

'ArrowDown';
'ArrowLeft';
'ArrowRight';
'ArrowUp';
'Home';
'End';
'PageDOwn';
'PageUp';

'Backspace';
'Delete';
'Redo';
'Undo';
```

#### Clipboard Event

- copy
- cut
- paste

```js
const source = document.querySelector('div.source');

source.addEventListener('copy', event => {
  const selection = document.getSelection();
  event.clipboardData.setData(
    'text/plain',
    selection.toString().concat('copyright information')
  );
  event.preventDefault();
});
```

#### Frame Events

- onresize.
- onload.
- onscroll.
- onerror.

#### User-Defined Handler

```js
function myHandler(e) {
  // get event and source element
  const e = e || window.event;
  const src = e.target || e.srcElement;

  // 事件授权
  if (src.nodeName.toLowerCase() !== 'button') {
    return;
  }

  // actual work: update label
  parts = src.innerHTML.split(': ');
  parts[1] = parseInt(parts[1], 10) + 1;
  src.innerHTML = `${parts[0]}: ${parts[1]}`;
  // no bubble
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
  if (typeof e.cancelBubble !== 'undefined') {
    e.cancelBubble = true;
  }
  // prevent default action
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof e.returnValue !== 'undefined') {
    e.returnValue = false;
  }
}
```

### Document

```js
document.write();
document.URI;
document.title;
```

### Window

```js
window.location(string);
window.innerWidth(number);
window.closed(boolean);
```

**Tip**: 实现 jQuery 中`\$(document).ready(function(){});

```js
// initialize.
window.onload = readyFunction;

function readyFunction() {}
```

```js
// add more ready function
function addLoadEvent(func) {
  const oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldOnLoad();
      func();
    };
  }
}
```

#### location API

| 属性     | 描述                                        |
| :------- | :------------------------------------------ |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚）       |
| host     | 设置或返回主机名和当前 URL 的端口号         |
| hostname | 设置或返回当前 URL 的主机名                 |
| href     | 设置或返回完整的 URL                        |
| pathname | 设置或返回当前 URL 的路径部分               |
| port     | 设置或返回当前 URL 的端口号                 |
| protocol | 设置或返回当前 URL 的协议                   |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分） |

```js
window.addEventListener(
  'hashchange',
  event => {
    // event.oldURL
    // event.nweURL
    if (window.location.hash === '#someCoolFeature') {
      someCoolFeature();
    }
  },
  false
);
```

### Rect API

`getBoundingClientRect`:

[![Client Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect/element-box-diagram.png)](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

#### Width and Height API

- offsetWidth/offsetHeight = content + padding + border
- clientWidth/clientHeight = content + padding

```js
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
```

#### Window Height

- outerHeight: 是整个浏览器窗口的大小，包括窗口标题、工具栏、状态栏等
- innerHeight: 是 DOM 视口的大小，包括滚动条
- offsetHeight: 整个可视区域大小，包括 border 和 scrollbar 在内
- clientHeight: 内部可视区域大小
- scrollHeight: 元素内容的高度，包括溢出部分

> In case of transforms,
> the offsetWidth and offsetHeight returns the layout width and height (all the same),
> while getBoundingClientRect() returns the rendering width and height.

#### Scroll Size

- scrollTop/scrollY/pageYOffset: 元素内容向上滚动了多少像素，如果没有滚动则为 0
- scrollLeft/scrollX/PageXOffset: 元素内容向右滚动了多少像素，如果没有滚动则为 0

```js
const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

const x = supportPageOffset
  ? window.pageXOffset
  : isCSS1Compat
  ? document.documentElement.scrollLeft
  : document.body.scrollLeft;
const y = supportPageOffset
  ? window.pageYOffset
  : isCSS1Compat
  ? document.documentElement.scrollTop
  : document.body.scrollTop;
```

```js
if (window.innerHeight + window.pageYOffset === document.body.scrollHeight) {
  console.log('Scrolled to Bottom!');
}
```

#### DOM Left and Top Property

- offsetLeft/offsetTop: 表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent 对象）左上角的距离
- scrollLeft/scrollTop: 元素滚动条位置, 被隐藏的内容区域左侧/上方的像素大小

```js
const isElementInViewport = el => {
  const { top, height, left, width } = el.getBoundingClientRect();
  const w = window.innerWidth || document.documentElement.clientWidth;
  const h = window.innerHeight || document.documentElement.clientHeight;

  return top <= h && top + height >= 0 && left <= w && left + width >= 0;
};
```

### Mutation Observer API

如果文档中连续插入 1000 个 `<li>` 元素，就会连续触发 1000 个插入事件，
执行每个事件的回调函数，这很可能造成浏览器的卡顿；
而 Mutation Observer 完全不同，只在 1000 个段落都插入结束后才会触发，而且只触发一次.

Mutation Observer 有以下特点:

- 它等待所有脚本任务完成后，才会运行，即采用异步方式
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条地个别处理 DOM 变动
- 它即可以观察发生在 DOM 节点的所有变动，也可以观察某一类变动

```js
const mutationObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log(mutation);
  });
});

// 开始侦听页面的根 HTML 元素中的更改。
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
});
```

```js
const target = document.querySelector('#container');
const callback = (mutations, observer) => {
  mutations.forEach(mutation => {
    switch (mutation.type) {
      case 'attributes':
        // the name of the changed attribute is in
        // mutation.attributeName
        // and its old value is in mutation.oldValue
        // the current value can be retrieved with
        // target.getAttribute(mutation.attributeName)
        break;
      case 'childList':
        // any added nodes are in mutation.addedNodes
        // any removed nodes are in mutation.removedNodes
        break;
      default:
        throw new Error('Unsupported mutation!');
    }
  });
};

const observer = new MutationObserver(callback);
observer.observe(target, {
  attributes: true,
  attributeFilter: ['foo'], // only observe attribute 'foo'
  attributeOldValue: true,
  childList: true,
});
```

## Ajax

### 基本用法

```js
const XHR = (function () {
  const standard = {
    createXHR() {
      return new XMLHttpRequest();
    },
  };
  const newActionXObject = {
    createXHR() {
      return new ActionXObject('Msxml12.XMLHTTP');
    },
  };
  const oldActionXObject = {
    createXHR() {
      return new ActionXObject('Microsoft.XMLHTTP');
    },
  };

  // 根据兼容性返回对应的工厂对象
  // 此立即函数运行一次即可完成兼容性检查，防止重复检查
  if (standard.createXHR()) {
    return standard;
  } else {
    try {
      newActionXObject.createXHR();
      return newActionXObject;
    } catch (o) {
      oldActionXObject.createXHR();
      return oldActionXObject;
    }
  }
})();
```

```js
const request = XHR.createXHR();
```

```js
// 3rd argument : async mode
request.open('GET', 'example.txt', true);

request.onreadystatechange = function () {
  // do something
  /*
  switch(request.readyState) {
    case 0: initialize
    case 1: loading
    case 2: loaded
    case 3: transaction
    case 4: complete
  }
  */
  if (request.readyState === 4) {
    const para = document.createElement('p');
    const txt = document.createTextNode(request.responseText);
    para.appendChild(txt);
    document.getElementById('new').appendChild(para);
  }
};

request.send(null);
```

### 简单封装

```js
ajax({
  url: './TestXHR.aspx', // 请求地址
  type: 'POST', // 请求方式
  data: { name: 'super', age: 20 }, // 请求参数
  dataType: 'json',
  success(response, xml) {
    // 此处放成功后执行的代码
  },
  fail(status) {
    // 此处放失败后执行的代码
  },
});

function ajax(options) {
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  const params = formatParams(options.data);
  let xhr;

  // 创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // IE6及其以下版本浏览器
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };

  // 连接 和 发送 - 第二步
  if (options.type === 'GET') {
    xhr.open('GET', `${options.url}?${params}`, true);
    xhr.send(null);
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true);
    // 设置表单提交时的内容类型
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
  }
}

// 格式化参数
function formatParams(data) {
  const arr = [];
  for (const name in data) {
    arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`);
  }
  arr.push(`v=${Math.random()}`.replace('.', ''));
  return arr.join('&');
}
```

### 跨域请求

```html
<!-- HTML -->
<meta http-equiv="Access-Control-Allow-Origin" content="*" />
```

```js
Response.Headers.Add('Access-Control-Allow-Origin', '*');
```

```js
$.ajax({
  url: 'http://map.oicqzone.com/gpsApi.php?lat=22.502412986242&lng=113.93832783228',
  type: 'GET',
  dataType: 'JSONP', // 处理Ajax 跨域问题.
  success(data) {
    $('body').append(`Name: ${data}`);
  },
});
```

## JSON

```js
const obj = JSON.parse(json);
const json = JSON.stringify(obj);
```

`JSON.stringify`:

- `Symbol`/`function`/`NaN`/`Infinity`/`undefined`: `null`/ignored.
- `BitInt`: throw `TypeError`.
- Circular reference object: throw `TypeError`.
- `toJSON` method:

```js
const obj = {
  name: 'zc',
  toJSON() {
    return 'return toJSON';
  },
};

// return toJSON
console.log(JSON.stringify(obj));

// "2022-03-06T08:24:56.138Z"
JSON.stringify(new Date());
```

## Regular Expression

```js
const re = /pattern/gim;
```

### RegExp Flags

- g 全局匹配
- m 多行匹配
- i 大小写敏感匹配
- u 修饰符
- y (粘连全局符) 修饰符号隐含了头部匹配的标志

```js
function codePointLength(text) {
  const result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

const s = '𠮷𠮷';

s.length; // 4
codePointLength(s); // 2
```

### RegExp Character Classes

| 符号       | 说明                                       |
| :--------- | :----------------------------------------- |
| .          | 匹配除换行符以外的任意字符                 |
| \w         | 匹配字母或数字或下划线或汉字               |
| \s         | 空白符(" " \n \r \t \f)                    |
| \S         | 非空白符(alpha number)                     |
| \d         | 匹配数字                                   |
| \b         | 匹配单词的开始或结束                       |
| ^          | 匹配字符串的开始                           |
| \$         | 匹配字符串的结束                           |
| \W         | 匹配任意不是字母，数字，下划线，汉字的字符 |
| \S         | 匹配任意不是空白符的字符                   |
| \D         | 匹配任意非数字的字符                       |
| \B         | 匹配不是单词开头或结束的位置               |
| `[^x]`     | 匹配除了 x 以外的任意字符                  |
| `[^aeiou]` | 匹配除了 aeiou 这几个字母以外的任意字符    |

### RegExp Quantifiers

| 符号  | 说明              |
| :---- | :---------------- |
| `*`   | 重复零次或更多次  |
| +     | 重复一次或更多次  |
| ?     | 重复零次或一次    |
| {n}   | 重复 n 次         |
| {n,}  | 重复 n 次或更多次 |
| {n,m} | 重复 n 到 m 次    |

| 懒惰限定符 | 说明                              |
| :--------- | :-------------------------------- |
| `*?`       | 重复任意次，但尽可能少重复        |
| +?         | 重复 1 次或更多次，但尽可能少重复 |
| ??         | 重复 0 次或 1 次，但尽可能少重复  |
| {n,m}?     | 重复 n 到 m 次，但尽可能少重复    |
| {n,}?      | 重复 n 次以上，但尽可能少重复     |

### 反向引用

位置编号 - 左括号的顺序

```js
// eslint-disable-next-line no-useless-backreference
const regExp = /((<\/?\w+>.*\2))/g;
```

- `\1 \2 \3`: 第 n 个子表达式匹配的结果字符
- `$1 $2 $3`: 第 n 个子表达式匹配的结果字符

### RegExp 静态属性

反向引用的值可以从 `RegExp()` 构造函数中取得:

- `RegExp.$1`.
- `RegExp.$_`.
- `RegExp.$&`.
- `RegExp.$+`.
- `RegExp.$*`.

| 长名         | 短名 | 说明                     |
| :----------- | :--- | :----------------------- |
| input        | \$\_ | 最后用于匹配的格式字符串 |
| lastMatch    | `$&` | 最后匹配的结果字符       |
| lastParen    | \$+  | 最后匹配的分组/子表达式  |
| leftContext  | \$`  | 匹配结果字符串前的字符   |
| rightContext | \$\' | 匹配结果字符串后的字符   |
| multiline    | \$\* | 指定是否开启多行模式     |

### RegExp Group and Ranges

- group
- lookahead (零宽断言)

| 分类     | 代码/语法      | 说明                                            |
| :------- | :------------- | :---------------------------------------------- |
| 捕获     | (exp)          | 匹配 exp,并捕获文本到自动命名的组里             |
|          | `(?<name>exp)` | 匹配 exp,并捕获文本到名称为 name 的组里         |
|          | (?:exp)        | 匹配 exp,不捕获匹配的文本，也不给此分组分配组号 |
| 零宽断言 | (?=exp)        | 匹配 exp 前面的位置                             |
|          | (?<=exp)       | 匹配 exp 后面的位置                             |
|          | (?!exp)        | 匹配后面跟的不是 exp 的位置                     |
|          | `(?<!exp)`     | 匹配前面不是 exp 的位置                         |
| 注释     | (?#comment)    | 用于提供注释让人阅读                            |

```js
const string = 'Favorite GitHub Repos: tc39/ecma262 v8/v8.dev';
const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;

for (const match of string.matchAll(regex)) {
  console.log(`${match[0]} at ${match.index} with '${match.input}'`);
  console.log(`owner: ${match.groups.owner}`);
  console.log(`repo: ${match.groups.repo}`);
}
```

### RegExp Best Practice

- 不使用 new RegExp(),使用正则表达式字面量
- 将正则表达式赋值给变量，防止正则表达式重复创建
- 以简单(唯一性)字元开始，如 `^/$ x \u363A [a-z] \b`, 避免以分组表达式开始:
  e.g `\s\s*` 优于 `\s{1,}`.
- 减少表达式的重叠匹配.
- 减少分支表达式,并将最常用的分支放在最前面.
- 无需反向引用时，使用非捕获组:
  e.g `(?:...)` 优于 `(...)`.

### RegExp 常用函数

#### test

```js
/[a-z|A-Z|0-9]/gim.test(str);
```

```js
const ignoreList = [
  // # All
  '^npm-debug\\.log$', // Error log for npm
  '^\\..*\\.swp$', // Swap file for vim state

  // # macOS
  '^\\.DS_Store$', // Stores custom folder attributes
  '^\\.AppleDouble$', // Stores additional file resources
  '^\\.LSOverride$', // Contains the absolute path to the app to be used
  '^Icon\\r$', // Custom Finder icon: http://superuser.com/questions/298785/icon-file-on-os-x-desktop
  '^\\._.*', // Thumbnail
  '^\\.Spotlight-V100(?:$|\\/)', // Directory that might appear on external disk
  '\\.Trashes', // File that might appear on external disk
  '^__MACOSX$', // Resource fork

  // # Linux
  '~$', // Backup file

  // # Windows
  '^Thumbs\\.db$', // Image file cache
  '^ehthumbs\\.db$', // Folder config file
  '^Desktop\\.ini$', // Stores custom folder attributes
  '@eaDir$', // "hidden" folder where the server stores thumbnails
];

export const junkRegex = new RegExp(ignoreList.join('|'));

export function isJunk(filename) {
  return junkRegex.test(filename);
}
```

#### replace

```js
replace(regExp, str / func);
```

##### replace arguments

第二个参数若为函数式参数,replace 方法会向它传递一系列参数:

- 第一个参数: 匹配结果字符串
- 第 n 个参数: 子表达式匹配结果字符串
- 倒数第二个参数: 匹配文本在源字符串中的下标位置
- 最后一个参数: 源字符串自身

###### Replace best practice

- 使用２个子表达式修剪字符串,字符串总长度影响性能
- 使用循环修剪字符串(分别用 正/负循环 修剪 首/尾空白符),空白字符长度影响性能

```js
if (!String.prototype.trim) {
  // eslint-disable-next-line no-extend-native
  String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}
```

```js
if (!String.prototype.trim) {
  // eslint-disable-next-line no-extend-native
  String.prototype.trim = function () {
    const str = this.replace(/^\s+/, '');
    let end = str.length - 1;
    const ws = /\s/;

    while (ws.test(str.charAt(end))) {
      end--;
    }

    return str.slice(0, end + 1);
  };
}
```

### 常用正则表达式

#### 中英文

`/^[\u4e00-\u9fa5a-zA-Z]+$/i`

#### 数字

`/^[1-9]*$/i`

#### 空字符与空格字符

`/[(^\s+)(\s+$)]/g`

## 错误处理

Error and Exception

### 错误类型

- Error
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError
- 自定义错误

```js
function MyError(...args) {
  Error.call(this, args);
  this.message = args[0];
}

MyError.prototype = new Error('Error');
MyError.prototype.constructor = MyError;
```

### 异常作用

- 在可能失败的地方抛出异常，对失败处做标签，易于**调试与测试**
- 修复 bug 后，可考虑是否在此处抛出异常
