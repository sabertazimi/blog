---
layout: post
title: 'Design Patterns Notes'
subtitle: 'Be a Stupid Learner'
date: 2017-05-15
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - Design Patterns
  - Architecture
  - Development
  - Computer Science
---

# Design Patterns Basic Notes

## Basic Patterns

### SOLID Principles

- Single Responsibility Principle 单一功能原则
- Open/Closed Principle 开闭原则
- Liskov Substitution Principle 里氏替换原则
- Interface Segregation Principle 接口隔离原则
- Dependency Inversion Principle 依赖反转原则

> SOLID Principles

- 单一职责是所有设计原则的基础
- 开闭原则是设计的终极目标
- 里氏替换原则强调的是子类替换父类后程序运行时的正确性, 它用来帮助实现开闭原则
- 接口隔离原则用来帮助实现里氏替换原则, 同时它也体现了单一职责
- 依赖倒置原则是过程式设计与面向对象设计的分水岭, 同时它也被用来指导接口隔离原则

#### Single Responsibility Principle

Too much functionality is in one class and you modify a piece of it,
it can be difficult to understand how that will affect other dependent modules.

#### Open Closed Principle

Allow users to add new functionalities without changing existing code,
open for extension, close for modification.

#### Liskov Substitution Principle

Objects of ParentType can be replaced with objects of SubType without altering.
Altering shows that SubType should not be subtype of ParentType
(break Open Closed Principle),
you should re-design ParentType and SubType.

#### Interface Segregation Principle

Clients should not be forced to depend upon interfaces that they do not use.

#### Dependency Inversion Principle

- High-level modules should not depend on low-level modules.
  Both should depend on abstractions.
- Abstractions should not depend upon details.
  Details should depend on abstractions.

### Literal Pattern

- 不要使用 new Boolean()/new Number()/new String()
- 避免使用 new Object()/new Array()

### Closure and IIFE

### Check Pattern

- `O || {}` `O || (O = {})`
- `if (O && O.property)`
- `if (typeof v === " ")`
- `toString. apply(var)`

### 函数(function)

#### 参数

- 函数不应依赖于全局变量，实现与执行全局环境的的解耦
- 全局变量应以函数参数/依赖的形式，注入函数内部

### 解耦

#### 事件处理与 UI 逻辑

- 事件处理函数与应用逻辑函数分开成单独函数,提高代码重用率
- 应用逻辑函数不依赖于 event 对象，其属性值作为参数传入，易于解耦与测试

```js
const MyApp = {

    // 事件处理函数
    handleClick: function(event) {

        /* 将事件的属性作为参数，传递给应用逻辑函数
         * 使得应用逻辑函数不依赖于 event 对象，易于解耦与测试
         */
        this.showPopup(event.clientX, event.clientY);
    }

    // 应用逻辑函数
    showPopup: function(x, y) {
        const popup = document.getElementById('popup');
        popup.style.left = x + 'px';
        popup.style.top  = y + 'px';
        popup.className = 'reveal';
    }
}
```

### Env and Config

配置文件以 .env/JS(Object)/JSON/JSONP/XML/YML 格式单独存放，方便读取

### Stand Library Idioms

- use `Number.isNaN` not `isNaN`
- use `Number.isFinite` not `isFinite`

### Other

!!result 转化成 Boolean

## Modular Patterns

### Object Literal

通过对象字面量创建命名空间

```javascript
APP.namespace = function (namespaceString) {
  var parts = namespaceString.split('.'),
    parent = APP,
    i;
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
    //关键: 向内嵌套
    parent = parent[parts[i]];
  }
  // 返回最内层模块
  return parent;
};
```

```javascript
// assign returned value to a local var
var module2 = APP.namespace('APP.modules.module2');
module2 === APP.modules.module2; // true
// skip initial `APP`
APP.namespace('modules.module51');
// long namespace
APP.namespace('once.upon.a.time.there.was.this.long.nested.property');
```

### IIFE Pattern

立即函数模式, 通过调用立即函数，返回一个对象，暴露(exposed to public)公共接口(特权/公共方法):

- 闭包: 定义私有变量与特权方法
- 返回对象: 即使通过外部代码改变返回对象的接口，也不会影响原接口

```js
var obj = (function () {
    // private member
  var name = "tazimi",

    // private method
    // excluded in return object

      // privileged method
      function getName() {
        return name;
      },
    function setName(n) {
      if (typeof n === 'string') {
          name = n;
      }
      return this;
    },

    // public method
    function logName() {
      console.log(name);
    };

    // 闭包
    return {
    // 公共接口: 特权/公共方法

        // 特权方法
      getName: getName,
    setName: setName,

    // 公共方法
    log: logName;
    };
}());
```

```js
var App = App || {};
App.utils = {};

(function () {
  var val = 5;

  this.getValue = function () {
    return val;
  };

  this.setValue = function (newVal) {
    val = newVal;
  };

  // also introduce a new sub-namespace
  this.tools = {};
}.apply(App.utils));

// inject new behavior into the tools namespace
// which we defined via the utilities module

(function () {
  this.diagnose = function () {
    return 'diagnosis';
  };
}.apply(App.utils.tools));
```

- jQuery Plugin Pattern: 通过给立即函数传参，注入全局变量/其他依赖

### UMD Pattern

Universal Module Definition:

- 先判断是否支持 Node.js 的模块(exports)，存在则使用 Node.js 模块模式
- 再判断是否支持 AMD(define)，存在则使用 AMD 方式加载模块

```js
(function (window, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    window.eventUtil = factory();
  }
})(this, function () {
  //module ...
});
```

## Common Design Patterns

![Common Design Patterns](figures/DesignPatterns.png)

### Classification

#### Creation Patterns

- Factory Method(工厂方法) | 通过将数据和事件接口化来构建若干个子类。
- Abstract Factory(抽象工厂) | 建立若干族类的一个实例，这个实例不需要具体类的细节信息。（抽象类）
- Builder(建造者) | 将对象的构建方法和其表现形式分离开来，总是构建相同类型的对象。
- Prototype(原型) | 一个完全初始化的实例，用于拷贝或者克隆。
- Singleton(单例) | 一个类只有唯一的一个实例，这个实例在整个程序中有一个全局的访问点。

#### Structural Patterns

- Adapter(适配器) : 将不同类的接口进行匹配，调整，这样尽管内部接口不兼容但是不同的类还是可以协同工作的。
- Bridge(桥接模式) : 将对象的接口从其实现中分离出来，这样对象的实现和接口可以独立的变化。
- Composite(组合模式) : 通过将简单可组合的对象组合起来，构成一个完整的对象，这个对象的能力将会超过这些组成部分的能力的总和，即会有新的能力产生。
- Decorator(装饰器) : 动态给对象增加一些可替换的处理流程。
- Facade(外观模式) : 一个类隐藏了内部子系统的复杂度，只暴露出一些简单的接口。
- Flyweight(享元模式) : 一个细粒度对象，用于将包含在其它地方的信息 在不同对象之间高效地共享。
- Proxy(代理模式) : 一个充当占位符的对象用来代表一个真实的对象。

#### Behavioral Patterns

- Interpreter(解释器) : 将语言元素包含在一个应用中的一种方式，用于匹配目标语言的语法。
- Template Method(模板方法) : 在一个方法中为某个算法建立一层外壳，将算法的具体步骤交付给子类去做。
- Chain of Responsibility(响应链) : 一种将请求在一串对象中传递的方式，寻找可以处理这个请求的对象。
- Command(命令) : 封装命令请求为一个对象，从而使记录日志，队列缓存请求，未处理请求进行错误处理 这些功能称为可能。
- Iterator(迭代器) : 在不需要直到集合内部工作原理的情况下，顺序访问一个集合里面的元素。
- Mediator(中介者模式) : 在类之间定义简化的通信方式，用于避免类之间显式的持有彼此的引用。
- Observer(观察者模式) : 用于将变化通知给多个类的方式，可以保证类之间的一致性。
- State(状态) : 当对象状态改变时，改变对象的行为。
- Strategy(策略) : 将算法封装到类中，将选择和实现分离开来。
- Visitor(访问者) : 为类增加新的操作而不改变类本身。

### Prototype

关键方法 clone()

### Bridge

分离抽象和实现/分离对象的两种不同属性

e.g 从 2 个不同维度上扩展对象

### Composite

树形结构:

- 根结点
  - Component 抽象对象/接口 采用最大宽接口,定义内点和叶点的操作
  - 将内点特有的操作集设为缺省操作集(空实现)
- 内点
  - 持有父结点和子节点的引用(可使用 Flyweight 模式实现共享)
  - 操作集:内点操作集(可添加/删除组件)
- 叶点
  - 持有父结点引用
  - 操作集：叶点操作集(不可添加/删除组件)

### Strategy

改变对象的内核/算法, 一个 Strategy 对象封装一个算法

### State

一个 State 对象封装一个与状态相关的行为

### Iterator

一个 Iterator 对象封装访问和遍历一个聚集对象中的各个构件的方法

### IOC and DI

- IOC (inversion of control) 控制反转模式；控制反转是将组件间的依赖关系从程序内部提到外部来管理
- DI (dependency injection) 依赖注入模式；依赖注入是指将组件的依赖通过外部以参数或其他形式注入

```java
class DbMysql {
  public function query(){}
}

class Controller {
  public $db;
  public function __construct($dbMysql) {
    $this->db = $dbMysql;
  }
  public function action(){
    $this->db->query();
  }
}

$db = new DbMysql();
$c = new Controller($db);
$c->action();
```

With IOC container:

```java
class DbMysql {
  public function __construct($host, $name, $pwd) {
    // do something
  }
  public function query() {
    echo __METHOD__ . PHP_EOL;
  }
}

class DbRedis {
  public function __construct($host, $name, $pwd) {
    // do something
  }
  public function set() {
    echo __METHOD__ . PHP_EOL;
  }
}

class controller {
  public $mysql;
  public $redis;
  public function __construct($mysql, $redis) {
    $this->mysql = $mysql;
    $this->redis = $redis;
  }
  public function action() {
    $this->mysql->query();
    $this->redis->set();}
  }
}


class Container {
  public $bindings = [];
  public function bind($key, Closure $value) {
    $this->bindings[$key] = $value;
  }
  public function make($key) {
    $new = $this->bindings[$key];
    return $new();
  }
}

$app = new Container();
$app->bind('mysql', function () { return new DbMysql('host', 'name', 'pwd'); });
$app->bind('redis', function () { return new DbRedis('host', 'name', 'pwd'); });
$app->bind('controller', function () use ($app) {
  return new Controller($app->make('mysql'), $app->make('redis'));
});
$controller = $app->make('controller');
$controller->action();
/** * 输出： * DbMysql::query * DbRedis::set */
```

With dependency injection:

```js
// dependency provider
export interface IProvider<T> {
  provide(): T;
}

@injectable()
export class NameProvider implements IProvider<string> {
  provide() {
    return "World";
  }
}

// top module
import * as React from "react";
import { IProvider } from "./providers";

export class Hello extends React.Component {
  private readonly nameProvider: IProvider<string>;

  render() {
    return <h1>Hello {this.nameProvider.provide()}!</h1>;
  }
}
```

### Class Pattern

```js
var Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = 'male';
};

// Define a subclass constructor for for "Superhero":
var Superhero = function (firstName, lastName, powers) {
  // Invoke the superclass constructor on the new object
  // then use .call() to invoke the constructor as a method of
  // the object to be initialized.
  Person.call(this, firstName, lastName);

  // Finally, store their powers, a new array of traits not found in a normal "Person"
  this.powers = powers;
};
SuperHero.prototype = Object.create(Person.prototype);
```

```js
var superman = new Superhero('Clark', 'Kent', ['flight', 'heat-vision']);
console.log(superman);
```

### Mix-In Pattern

将多个对象的属性混入同一个对象,达到继承/扩展/组合的效果

- 不改变原型链

```js
function mix() {
  var arg,
    prop,
    child = {};

  for (arg = 0; arg < arguments.length; arg += 1) {
    for (prop in arguments[arg]) {
      if (arguments[arg].hasOwnProperty(prop)) {
        child[prop] = arguments[arg][prop];
      }
    }
  }

  return child;
}
```

```js
var cake = mix(
  { eggs: 2, large: true },
  { butter: 1, salted: true },
  { flour: '3 cups' },
  { sugar: 'sure!' }
);
```

- 改变原型链

```js
// Extend an existing object with a method from another
function mix(receivingClass, givingClass) {
  // mix-in provide certain methods
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] =
        givingClass.prototype[arguments[i]];
    }
  }
  // mix-in provide obj
  else {
    for (var methodName in givingClass.prototype) {
      if (!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] =
          givingClass.prototype[methodName];
      }
    }
  }
}
```

### Singleton Pattern

原型与构造函数指针运作正常

```javascript
function Universe() {
  // 缓存实例
  var instance;

  // anti-Self-Defined Function Pattern
  // 反-自定义函数模式: 先重写,再初始化
  Universe = function Universe() {
    return instance;
  };

  // 保存原型,使其一直保持于同一位置
  // (this指针指向不重要)
  Universe.prototype = this;

  instance = new Universe();
  // 重定向constructor指针
  instance.constructor = Universe;
  // 功能代码
  instance.start_time = 0;
  instance.bang = 'Big';

  return instance;
}
```

### Abstract Factory

```js
var AbstractVehicleFactory = (function () {
  // Storage for our vehicle types
  var types = {};

  function _getVehicle(type, customizations) {
    var Vehicle = types[type];
    return Vehicle ? new Vehicle(customizations) : null;
  }
  function _registerVehicle(type, Vehicle) {
    var prototype = Vehicle.prototype;

    // only register classes that fulfill the vehicle contract
    if (prototype.drive && prototype.breakDown) {
      types[type] = Vehicle;
    }

    return AbstractVehicleFactory;
  }

  return {
    getVehicle: _getVehicle,
    registerVehicle: _registerVehicle,
  };
})();
```

### Factory Method

```js
module.exports = (function () {
  function VehicleFactory() {
    var publicVehicle = new Object();

    // specific factory
    function Car(options) {
      this.type = 'car';
      this.doors = options.doors || 4;
      this.state = options.state || 'brand new';
      this.color = options.color || 'silver';
      this.speed = options.speed || 10;
    }
    function Truck(options) {
      this.type = 'truck';
      this.state = options.state || 'used';
      this.wheelSize = options.wheelSize || 'large';
      this.color = options.color || 'blue';
      this.speed = options.speed || 8;
    }

    // public features of vehicle , added to __proto__
    function _run() {
      var args = [].slice.call(arguments);

      if (args.length === 0) {
        console.log(this.type + ' - run with: ' + this.speed + 'km/s');
      } else if (toString.apply(args[0]) === '[object Number]') {
        this.speed = args[0];
      }
    }
    function _withColor() {
      var args = [].slice.call(arguments);

      if (args.length === 0) {
        console.log(
          'The color of this ' + this.type + ' product is : ' + this.color
        );
      } else if (toString.apply(args[0]) === '[object String]') {
        this.color = args[0];
      }
    }
    // provide a function to change other public features
    function _reform(funcName, newFunc) {
      if (
        typeof this[funcName] === 'function' ||
        typeof this.prototype[funcName] === 'function'
      ) {
        delete this[funcName];
        this.prototype[funcName] = newFunc;
      }
    }
    // provide a function to add new public features
    function _addFeature(funcName, newFunc) {
      if (typeof this[funcName] === 'undefined') {
        this[funcName] = newFunc;
        this.prototype[funcName] = newFunc;
      }
    }

    // private features, added to obj

    // core: create method
    this.create = function (options) {
      var vehicleClass = '',
        newVehicle = {};

      if (options.type === 'car') {
        vehicleClass = Car;
      } else {
        vehicleClass = Truck;
      }

      // create new vehicle with options, by pre-defined specific constructor
      newVehicle = new vehicleClass(options);
      // set up prototype
      newVehicle.__proto__ = publicVehicle;
      newVehicle.prototype = publicVehicle;

      // add public feature
      newVehicle.prototype.run = _run;
      newVehicle.prototype.withColor = _withColor;
      newVehicle.prototype.reform = _reform;
      newVehicle.prototype.addFeature = _addFeature;

      // add private(separately) feature

      // return new obj
      return newVehicle;
    };
  }

  // define more factory

  return {
    vehicleFactory: VehicleFactory,
  };
})();
```

### Adapter Pattern

适配器通过内部使用新接口规定的属性/方法, 创建一个外观与旧接口一致 的方法

- old.method();
- adapter.method(); // 实现此 method 时,使用了新接口规定的属性/方法

```js
// old interface
function Shipping() {
  this.request = function (zipStart, zipEnd, weight) {
    // ...
    return '$49.75';
  };
}

// new interface
function AdvancedShipping() {
  this.login = function (credentials) {
    /* ... */
  };
  this.setStart = function (start) {
    /* ... */
  };
  this.setDestination = function (destination) {
    /* ... */
  };
  this.calculate = function (weight) {
    return '$39.50';
  };
}

// adapter interface
function AdapterShipping(credentials) {
  var shipping = new AdvancedShipping();

  shipping.login(credentials);

  return {
    request: function (zipStart, zipEnd, weight) {
      shipping.setStart(zipStart);
      shipping.setDestination(zipEnd);
      return shipping.calculate(weight);
    },
  };
}
```

```js
var shipping = new Shipping();
var adapterShipping = new AdapterShipping(credentials);

// original shipping object and interface
var cost = shipping.request('78701', '10010', '2 lbs');
log.add('Old cost: ' + cost);
// new shipping object with adapted interface
cost = adapter.request('78701', '10010', '2 lbs');
```

### Decorator Pattern

- 重写/重载/扩展对象原有的行为(method),但不改变对象原有属性
- 可以添加新属性，并围绕新属性扩展对象的原行为 e.g 原对象只会说中文，装饰后同时说中文与英文
- 避免了通过继承来为类型添加新的职责的形式可取，通过继承的方式容易造成子类的膨胀
- 保持接口的一致性，动态改变对象的外观/职责
- ConcreteDecorator 类: private ClassName component;(拥有一个对象引用)

```js
const __decorate = function (decorators, target, key, desc) {
  const argumentsLength = arguments.length;
  let descriptorOrTarget;
  let decorator;

  if (argumentsLength < 3) {
    // class decorator
    descriptorOrTarget = target;
  } else if (desc === null) {
    // method decorator
    descriptorOrTarget = Object.getOwnPropertyDescriptor(target, key);
  }

  for (let i = decorators.length - 1; i >= 0; i--) {
    if ((decorator = decorators[i])) {
      if (argumentsLength < 3) {
        // if the decorator function returns a value use it;
        // otherwise use the original.
        descriptorOrTarget =
          decorator(descriptorOrTarget) || descriptorOrTarget;
      } else {
        // if the decorator function returns a descriptor use it;
        // otherwise use the original.
        descriptorOrTarget =
          decorator(target, key, descriptorOrTarget) || descriptorOrTarget;
      }
    }
  }

  if (argumentsLength > 3 && descriptorOrTarget) {
    Object.defineProperty(target, key, descriptorOrTarget);
  }

  return descriptorOrTarget;
};
```

#### Decorator Implementation

关键在于实现传递方式, 两种方式:

- uber 属性获得每次装饰后结果
- 循环叠加每次装饰后结果

```javascript
// 构造函数
function Sale(price) {
  this.price = price || 100;
}
Sale.prototype.getPrice = function () {
  return this.price;
};

// 定义具体装饰器
// 通过uber属性获得上一次装饰后的结果
Sale.decorators = {};
Sale.decorators.fedTax = {
  getPrice: function () {
    var price = this.uber.getPrice();
    price += (price * 5) / 100;
    return price;
  },
};
Sale.decorators.quebec = {
  getPrice: function () {
    var price = this.uber.getPrice();
    price += (price * 7.5) / 100;
    return price;
  },
};
Sale.decorators.money = {
  getPrice: function () {
    return '$' + this.uber.getPrice().toFixed(2);
  },
};
Sale.decorators.cdn = {
  getPrice: function () {
    return 'CDN$ ' + this.uber.getPrice().toFixed(2);
  },
};

Sale.prototype.decorate = function (decorator) {
  var F = function () {},
    overrides = this.constructor.decorators[decorator],
    i,
    newObj;

  // 临时代理构造函数
  F.prototype = this;
  newObj = new F();
  // 传递实现的关键
  // 通过uber属性获得上一次装饰后的结果
  newObj.uber = F.prototype;

  for (i in overrides) {
    if (overrides.hasOwnProperty(i)) {
      newObj[i] = overrides[i];
    }
  }

  return newObj;
};
```

#### Decorators List

```javascript
// 构造函数
function Sale(price) {
  this.price = price > 0 || 100;
  this.decorators_list = [];
}
Sale.prototype.getPrice = function () {
  return this.price;
};

// 定义具体装饰器
Sale.decorators = {};
Sale.decorators.fedTax = {
  getPrice: function (price) {
    return price + (price * 5) / 100;
  },
};
Sale.decorators.quebec = {
  getPrice: function (price) {
    return price + (price * 7.5) / 100;
  },
};
Sale.decorators.money = {
  getPrice: function (price) {
    return '$' + price.toFixed(2);
  },
};

Sale.prototype.decorate = function (decorator) {
  this.decorators_list.push(decorator);
};
Sale.prototype.getPrice = function () {
  var price = this.price,
    i,
    max = this.decorators_list.length,
    name;

  for (i = 0; i < max; i += 1) {
    name = this.decorators_list[i];
    // 传递实现的关键
    // 通过循环叠加上一次装饰后的结果
    price = Sale.decorators[name].getPrice(price);
  }

  return price;
};
```

#### 实现 2

```js
// The constructor to decorate
function MacBook() {
  this.cost = function () {
    return 997;
  };
  this.screenSize = function () {
    return 11.6;
  };
}

// Decorator 1
function Memory(macBook) {
  var v = macBook.cost();
  macBook.cost = function () {
    return v + 75;
  };
}

// Decorator 2
function Engraving(macBook) {
  var v = macBook.cost();
  macBook.cost = function () {
    return v + 200;
  };
}

// Decorator 3
function Insurance(macBook) {
  var v = macBook.cost();
  macBook.cost = function () {
    return v + 250;
  };
}
```

```js
var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

// Outputs: 1522
console.log(mb.cost());

// Outputs: 11.6
console.log(mb.screenSize());
```

### Facade Pattern

将多个复杂的子系统封装+合并，实现一个复杂功能，但只暴露一个简单的接口 - 封装复杂逻辑

```js
var sabertazimi = {};

sabertazimi.addMyEvent = function (el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + ev, fn);
  } else {
    el['on' + ev] = fn;
  }
};
```

### Flyweight Pattern

减小内存开销:

- 内在信息 - 对象中的内部方法所需信息/属性, 一个单独的享元可替代大量具有相同内在信息的对象
- 外部状态作为方法参数:使之适应不同的外部状态(context)——对象实例差异处
- 某个类型的对象有大量的实例，对这些实例进行分类，合并相同分类的对象，只创建少量实例(享元)
- 通过享元工厂来管理一组享元，当所需享元已存在时，返回已存在享元;当所需享元不存在时，创建新享元

```js
function Flyweight(make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
}

var FlyWeightFactory = (function () {
  var flyweights = {};

  return {
    get: function (make, model, processor) {
      // 不存在所需享元，新建新享元
      if (!flyweights[make + model]) {
        flyweights[make + model] = new Flyweight(make, model, processor);
      }

      return flyweights[make + model];
    },

    getCount: function () {
      var count = 0;
      for (var f in flyweights) count++;
      return count;
    },
  };
})();

var Computer = function (make, model, processor, memory, tag) {
  this.flyweight = FlyWeightFactory.get(make, model, processor);
  this.memory = memory;
  this.tag = tag;
  this.getMake = function () {
    return this.flyweight.make;
  };
  // ...
};

function ComputerCollection() {
  var computers = {};
  var count = 0;

  return {
    add: function (make, model, processor, memory, tag) {
      computers[tag] = new Computer(make, model, processor, memory, tag);
      count++;
    },

    get: function (tag) {
      return computers[tag];
    },

    getCount: function () {
      return count;
    },
  };
}

(function () {
  var computers = new ComputerCollection();

  computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P');
  computers.add('Dell', 'Studio XPS', 'Intel', '6G', 'X997T');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'NT777');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', '0J88A');
  computers.add('HP', 'Envy', 'Intel', '4G', 'CNU883701');
  computers.add('HP', 'Envy', 'Intel', '2G', 'TXU003283');

  console.log('Computers: ' + computers.getCount());
  console.log('Flyweights: ' + FlyWeightFactory.getCount());
})();
```

### Proxy Pattern

通过一个代理对象，临时存储原对象方法调用产生的一系列结果(新建对象),减少重复对象的产生

```js
function GeoCoder() {
  this.getLatLng = function (address) {
    if (address === 'Amsterdam') {
      return '52.3700° N, 4.8900° E';
    } else if (address === 'London') {
      return '51.5171° N, 0.1062° W';
    } else if (address === 'Paris') {
      return '48.8742° N, 2.3470° E';
    } else if (address === 'Berlin') {
      return '52.5233° N, 13.4127° E';
    } else {
      return '';
    }
  };
}

function GeoProxy() {
  var geocoder = new GeoCoder();
  var geocache = {};

  return {
    getLatLng: function (address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      log.add(address + ': ' + geocache[address]);
      return geocache[address];
    },
    getCount: function () {
      var count = 0;
      for (var code in geocache) {
        count++;
      }
      return count;
    },
  };
}
```

### Command Pattern

有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁 (多个对象中的某个随机对象)，也不知道被请求的操作是什么.
此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此的耦合关系

- 将方法/动作封装成对象, 使得外部通过唯一方法 execute/run 调用内部方法/动作
- 客户创建命令；调用者执行该命令；接收者在命令执行时执行相应操作
- 客户通常被包装为一个对象，但是这不是必然的
- 调用者接过命令并将其保存下来, 它会在某个时候调用该命令对象的 execute 方法
- 调用者进行 `commandObject.execute` 这种调用时，
  它所调用的方法将转而以 `receiver.action()` 这种形式调用恰当的方法

client and receiver

```js
const SimpleCommand = function (receiving) {
  this.receiving = receiving;
};

SimpleCommand.prototype.execute = function () {
  this.receiving.action();
};
```

```js
module.exports = (function () {
  var manager = {};

  // command to be encapsulated
  manager.isNull = function (nu) {
    return toString.apply(nu) === '[object Null]';
  };
  manager.isArray = function (arr) {
    return toString.apply(arr) === '[object Array]';
  };
  manager.isString = function (str) {
    return toString.apply(str) === '[object String]';
  };

  // public api
  function execute(command) {
    return (
      manager[command] &&
      manager[command].apply(manager, [].slice.call(arguments, 1))
    );
  }
  function run(command) {
    return (
      manager[command] &&
      manager[command].apply(manager, [].slice.call(arguments, 1))
    );
  }

  return {
    execute: execute,
    run: run,
  };
})();
```

command pattern in UI development, bind command to UI components:

- executor: UI components
- client and receiver: background tasks or other UI components
- executor -> client: command.execute() -> receiver: receiver.action()

e.g click `button` -> refresh `menu`

```js
// receiver
const MenuBar = {
  action() {
    this.refresh();
  },
  refresh() {
    console.log('refresh menu pages');
  },
};

// client: command object
// command: object with `action` implemented
const Command = (receiver) => {
  return function () {
    receiver.action();
  };
};
const RefreshMenuBarCommand = Command(MenuBar);

// executor
button.setCommand = (command) => {
  button.command = command;
};
button.setCommand(RefreshMenuBarCommand);

button.addEventLister('click', (event) => {
  button.command();
});
```

```js
const MenuCommand = function (action) {
  this.action = action;
};
MenuCommand.prototype.execute = function () {
  this.action();
};

const fileActions = new FileActions();
const EditActions = new EditActions();
const InsertActions = new InsertActions();
const HelpActions = new HelpActions();

const appMenuBar = new MenuBar();
//-----------
const fileMenu = new Menu('File');
const openCommand = new MenuCommand(fileActions.open);
const closeCommand = new MenuCommand(fileActions.close);
const saveCommand = new MenuCommand(fileActions.save);
const saveAsCommand = new MenuCommand(fileActions.saveAs);

fileMenu.add(new MenuItem('open', openCommand));
fileMenu.add(new MenuItem('Close', closeCommand));
fileMenu.add(new MenuItem('Save', saveCommand));
fileMenu.add(new MenuItem('Close', saveAsCommand));

appMenuBar.add(fileMenu);
//--------------
const editMenu = new Menu('Edit');
const cutCommand = new MenuCommand(EditActions.cut);
const copyCommand = new MenuCommand(EditActions.copy);
const pasteCommand = new MenuCommand(EditActions.paste);
const deleteCommand = new MenuCommand(EditActions.delete);

editMenu.add(new MenuItem('Cut', cutCommand));
editMenu.add(new MenuItem('Copy', copyCommand));
editMenu.add(new MenuItem('Paste', pasteCommand));
editMenu.add(new MenuItem('Delete', deleteCommand));

appMenuBar.add(editMenu);

//------------
const insertMenu = new Menu('Insert');
const textBlockCommand = new MenuCommand(InsertActions.textBlock);
insertMenu.add(new MenuItem('Text  Block', textBlockCommand));
appMenuBar.add(insertMenu);

//------------
const helpMenu = new Menu('Help');
const showHelpCommand = new MenuCommand(HelpActions.showHelp());
helpMenu.add(new MenuItem('Show Help', showHelpCommand));
appMenuBar.add(helpMenu);

document.getElementsByTagName('body')[0].appendChild(appMenuBar.getElement());
appMenuBar.show();
```

Command sequences to implement Macro/Batch/Undo command:

```js
const Cursor = function (width, height, parent) {
  this.width = width;
  this.height = height;
  this.commandStack = [];

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  parent.appendChild(this.canvas);

  this.ctx = this.canvas.getContext('2d');
  this.ctx.fillStyle = '#CCC000';
  this.move(0, 0);
};

Cursor.prototype = {
  move: function (x, y) {
    var _this = this;
    this.commandStack.push(function () {
      _this.lineTo(x, y);
    });
  },
  lineTo: function (x, y) {
    this.position.x += x;
    this.position.y += y;
    this.ctx.lineTo(this.position.x, this.position.y);
  },
  executeCommands: function () {
    this.position = { x: this.width / 2, y: this.height / 2 };
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    for (var i = 0; i < this.commandStack.length; i++) {
      this.commandStack[i]();
    }
    this.ctx.stroke();
  },
  undo: function () {
    this.commandStack.pop();
    this.executeCommands();
  },
};
```

### Mediator Pattern

一个 Mediator 对象封装对象间的协议:
中央集权的控制中心 - 所有观察者共享一个共有的被观察者(所有订阅者订阅同一个节点).

### Observer Pattern

- 被观察者(Subject)维护一组观察者列表，每当被观察者状态改变时，调用 notify 函数，此函数中调用观察者(Observer)的 update 函数(可自定义)
- decouple subject and observer: each depends on `Abstraction` not `Implementation`

```js
function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.Add = function (obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function () {
  this.observerList = [];
};

ObserverList.prototype.Count = function () {
  return this.observerList.length;
};

ObserverList.prototype.Get = function (index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

ObserverList.prototype.Insert = function (obj, index) {
  var pointer = -1;

  if (index === 0) {
    this.observerList.unshift(obj);
    pointer = index;
  } else if (index === this.observerList.length) {
    this.observerList.push(obj);
    pointer = index;
  }

  return pointer;
};

ObserverList.prototype.IndexOf = function (obj, startIndex) {
  var i = startIndex,
    pointer = -1;

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      pointer = i;
    }
    i++;
  }

  return pointer;
};

ObserverList.prototype.RemoveAt = function (index) {
  if (index === 0) {
    this.observerList.shift();
  } else if (index === this.observerList.length - 1) {
    this.observerList.pop();
  }
};

//  被观察者维护一个观察者列表
function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function (observer) {
  this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function (observer) {
  this.observers.RemoveAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function (context) {
  var observerCount = this.observers.Count();
  for (var i = 0; i < observerCount; i++) {
    this.observers.Get(i).Update(context);
  }
};

// The Observer
function Observer() {
  this.Update = function () {
    // ...
  };
}

// Extend an object with an extension
function extend(extension, obj) {
  for (var key in extension) {
    obj[key] = extension[key];
  }
}
```

### Pub-Sub Pattern

- 观察者模式中主体和观察者是互相感知
- 发布-订阅模式是借助第三方来实现调度, 发布者和订阅者之间互不感知

#### Implementation

- pubSub.js

```js
module.exports = (function (window, doc, undef) {
  var pubSub = {};

  var topics = {},
    subUid = -1;

  pubSub.publish = function (topic, args) {
    // undefined check
    if (!topics[topic]) {
      return false;
    }

    setTimeout(function () {
      var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);

    return true;
  };

  pubSub.subscribe = function (topic, func) {
    // undefined check
    if (!topics[topic]) {
      topics[topic] = [];
    }

    // add observer to observerList (topics)
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func,
    });
    return token;
  };

  pubSub.unsubscribe = function (token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  };

  return pubSub;
})(this, this.document, undefined);
```

- test.js

```js
var pubsub = require('./pubSub.js');

// add observer to observerList
var testFirstSub = pubsub.subscribe('login', function (topic, data) {
  console.log(topic + ': ' + data);
});

// subject broadcast/notify, observer update
pubsub.publish('login', 'hello world!');
pubsub.publish('login', ['test', 'a', 'b', 'c']);
pubsub.publish('login', [{ color: 'blue' }, { text: 'hello' }]);

setTimeout(function () {
  pubsub.unsubscribe(testFirstSub);
}, 0);

// permanent subscribe
pubsub.subscribe('sum', function (topic, data) {
  if (toString.apply(data) !== '[object Array]') {
    console.log('Please input array: * ' + data + ' * is not array!');
  } else {
    var tmp = data.filter(function (item) {
      return toString.apply(item) === '[object Number]';
    });

    if (tmp.length) {
      var sum = tmp.reduce(function (previous, current) {
        return previous + current;
      }, 0);
      console.log('Sum of ' + data + ' : ' + sum);
    } else {
      console.log(
        'Please input number array: * ' + data + ' * is not number array!'
      );
    }
  }

  return this;
});

pubsub.publish('login', 'hello again!');
pubsub.publish('sum', 'hello again!');
pubsub.publish('sum', [1, 2, 3, 4, 5]);
pubsub.publish('sum', ['a', 'b', 'c', 'd', 'e']);
```

- in jQuery

```js
// Equivalent to subscribe(topicName, callback)
$(document).on('topicName', function () {
  //..perform some behavior
});

// Equivalent to publish(topicName)
$(document).trigger('topicName');

// Equivalent to unsubscribe(topicName)
$(document).off('topicName');
```

- MicroEvent.js

```js
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 *
 * - pure javascript - server compatible, browser compatible
 * - don't rely on the browser doms
 * - super simple - you get it immediately, no mystery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
 */

var MicroEvent = function () {};
MicroEvent.prototype = {
  bind: function (event, fct) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  unbind: function (event, fct) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  },
  trigger: function (event /* , args... */) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    }
  },
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
 */
MicroEvent.mixin = function (destObject) {
  var props = ['bind', 'unbind', 'trigger'];
  for (var i = 0; i < props.length; i++) {
    if (typeof destObject === 'function') {
      destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
    } else {
      destObject[props[i]] = MicroEvent.prototype[props[i]];
    }
  }
  return destObject;
};

// export in common js
if (typeof module !== 'undefined' && 'exports' in module) {
  module.exports = MicroEvent;
}
```

#### Sample

##### Ajax Callback

- 当请求返回，并且实际的数据可用的时候，会生成一个通知
- 如何使用这些事件（或者返回的数据），都是由订阅者自己决定的
- 可以有多个不同的订阅者，以不同的方式使用返回的数据
- Ajax 层: 唯一的责任 - 请求和返回数据，接着将数据发送给所有想要使用数据的地方

```js
(function ($) {

   // Pre-compile template and "cache" it using closure
   var resultTemplate = _.template($( "#resultTemplate" ).html());

   // Subscribe to the new search tags topic
   $.subscribe( "/search/tags" , function( tags ) {
       $( "#searchResults" )
                .html("


  Searched for:" + tags + "

");
   });

   // Subscribe to the new results topic
   $.subscribe( "/search/resultSet" , function( results ){

       $( "#searchResults" ).append(resultTemplate( results ));

   });

   // Submit a search query and publish tags on the /search/tags topic
   $( "#flickrSearch" ).submit( function( e ) {

       e.preventDefault();
       var tags = $(this).find( "#query").val();

       if ( !tags ){
        return;
       }

       $.publish( "/search/tags" , [ $.trim(tags) ]);

   });


   // Subscribe to new tags being published and perform
   // a search query using them. Once data has returned
   // publish this data for the rest of the application
   // to consume

   $.subscribe("/search/tags", function( tags ) {
     // Ajax Request
     $.getJSON( "http://api.flickr.com/services/feeds/", {
              tags: tags,
              tagMode: "any",
              format: "json"
            },

          function( data ){

              if( !data.items.length ) {
                return;
              }

              $.publish( "/search/resultSet" , data.items  );
       });

   });
}());
```

## MVC Pattern

在 MVC 中，视图位于我们架构的顶部，其背后是控制器.
模型在控制器后面，而因此我们的视图了解得到我们的控制器，而控制器了解得到模型.
这里，我们的视图有对模型的直接访问.
然而将整个模型完全暴露给视图可能会有安全和性能损失,
这取决于我们应用程序的复杂性.
MVVM 则尝试去避免这些问题.

在 MVP 中，控制器的角色被代理器所取代，代理器和视图处于同样的地位,
视图和模型的事件都被它侦听着并且接受它的调解.
不同于 MVVM，没有一个将视图绑定到视图模型的机制，因此我们转而依赖于每一个视图都实现一个允许代理器同视图去交互的接口.

MVVM 进一步允许我们创建一个模型的特定视图子集，包含了状态和逻辑信息,
避免了将模型完全暴露给视图的必要。
不同于 MVP 的代理器，视图模型并不需要去引用一个视图。
视图可以绑定到视图模型的属性上面，视图模型则去将包含在模型中的数据暴露给视图。
像我们所提到过的，对视图的抽象意味着其背后的代码需要较少的逻辑。

## jQuery Pattern

### Plugin Pattern

```js
(function ($) {
  $.extend($.fn, {
    myPlugin: function () {
      // your plugin logic
    },
  });
})(jQuery);
```

```js
// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
(function ($, window, document, undefined) {
  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.

  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in our plugin).

  // Create the defaults once
  var pluginName = 'defaultPluginName',
    defaults = {
      propertyName: 'value',
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
    // Place initialization logic here
    // We already have access to the DOM element and
    // the options via the instance, e.g. this.element
    // and this.options
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
```

## Domain Driven Design

### Interface Layer

主要负责与外部系统进行交互与通信:

- Dubbo Services
- RESTful API

### Application Layer

Application Service 层只是很薄的一层,
它内部并不实现任何逻辑,
只是负责协调和转发,
委派业务动作给更下层的领域层.

### Domain Layer

Domain 层是领域模型系统的核心,
负责维护面向对象的领域模型,
几乎全部的业务逻辑都会在这一层实现.
内部主要包含 Entity, ValueObject, Domain Event, Repository.

### Infrastructure Layer

主要为 Interface, Application 和 Domain 三层提供支撑.

## 高并发系统设计

### Concurrent Code Layer

- Mutex Performance
- Database Caches
- Update Merge
- BloomFilter
- Asynchronous
- Multi-Thread

### Concurrent DataBase Layer

- DataBase Type: RDBMS -> NoSQL -> NewSQL
- Table Structure Design
- Index Design
- Split Table
- Read and Write Separation
- Data Slice and Data Partition
- Hot Data Cache

### Concurrent Architecture Layer

- Microservices
- Scale Friendly
- FailFast
- Data PreFetch
- Multi-Level Caches

## 高可用系统设计

### Load Balance Design

- Hardware Load Balance
- Software Load Balance
- Load Balance Algorithms:
  Random, RoundRobin, WeightRoundRobin, ConsistentHash
- Error Machines Auto Detection
- Error Services Auto Retirement
- Services Retry Automation
- Recovery Services Auto Detection

### Idempotence Design

在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同.

#### Write Idempotence Design

- Mutex
- Key Index
- Token
- Data Version
- State Machine

### CAP Theory

A distributed system to simultaneously provide
more than two out of the following three guarantees:

- Consistency:
  Every read receives the most recent write or an error.
- Availability:
  Every request receives a (non-error) response,
  without the guarantee that it contains the most recent write.
- Partition tolerance:
  The system continues to operate
  despite an arbitrary number of messages
  being dropped (or delayed) by the network between nodes.

### 服务熔断

### 服务降级

## Reference

- [JavaScript Design Patterns](http://www.dofactory.com/javascript/design-patterns)
