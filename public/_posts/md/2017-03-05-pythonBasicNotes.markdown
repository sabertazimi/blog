---
layout:     post
title:      "Python Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Python
---

 [Python Basic Notes](#python-basic-notes)
	* [控制语句](#控制语句)
	* [表达式](#表达式)
		* [lambda表示匿名函数（匿名函数体只能是表达式）](#lambda表示匿名函数匿名函数体只能是表达式)
	* [面试题](#面试题)
		* [Basic](#basic)
			* [Python是如何进行内存管理的？](#python是如何进行内存管理的)
			* [什么是lambda函数？它有什么好处？](#什么是lambda函数它有什么好处)
			* [Python里面如何实现tuple和list的转换？](#python里面如何实现tuple和list的转换)
			* [请写出一段Python代码实现删除一个list里面的重复元素。](#请写出一段python代码实现删除一个list里面的重复元素)
			* [Python里面如何拷贝一个对象？（赋值，浅拷贝，深拷贝的区别）](#python里面如何拷贝一个对象赋值浅拷贝深拷贝的区别)
			* [介绍一下except的用法和作用？](#介绍一下except的用法和作用)
			* [Python里面match()和search()的区别？](#python里面match和search的区别)
			* [用Python匹配HTML tag的时候，<.*>和<.*？>有什么区别？](#用python匹配html-tag的时候和有什么区别)

# Python Basic Notes

## 控制语句

- if语句，当条件成立时运行语句块。经常与else, elif(相当于else if) 配合使用。
- for语句，遍历列表、字符串、字典、集合等迭代器，依次处理迭代器中的每个元素。
- while语句，当条件为真时，循环运行语句块。
- try语句。与except,finally配合使用处理在程序运行中出现的异常情况。
- class语句。用于定义类型。
- def语句。用于定义函数和类型的方法。
- pass语句。表示此行为空，不运行任何操作。
- assert语句。用于程序调适阶段时测试运行条件是否满足。
- with语句。Python2.6以后定义的语法，在一个场景中运行语句块。比如，运行语句块前加密，然后在语句块运行退出后解密。
- yield语句。在迭代器函数内使用，用于返回一个元素。自从Python 2.5版本以后。这个语句变成一个运算符。
- raise语句。制造一个错误。
- import语句。导入一个模块或包。
- from import语句。从包导入模块或从模块导入某个对象。
- import as语句。将导入的对象赋值给一个变量。
- in语句。判断一个对象是否在一个字符串/列表/元组里。

## 表达式

- +  加法或者取正
- -  减法或者取负
- `*`  乘法
- /  除法
- // 整除
- `**` 乘方
- ~  取补
- %  取模
- `<<` 左移
- `>>` 右移
- `&`  二进制AND
- |  二进制OR
- ^  二进制XOR
- `>`  大于
- `<`  小于
- =  等于/赋值
- == 等于（判断）
- != 不等于
- `<=` 小于等于
- `>=` 大于等于
- += 加上后等于
- () 更改类型；添加执行对象；添加测试条件
- #  添加注释
>（~  |  ^  &  <<  >>必须应用于整数）

> and, or, not表示逻辑运算
is, is not用于比较两个变量是否是同一个对象
in, not in用于判断一个对象是否属于另外一个对象

> 列表推导式（list comprehension）
比如计算0-9的平方和:

- `>>>` `sum(x * x for x in range(10))`

### lambda表示匿名函数（匿名函数体只能是表达式）


`y if cond else x`表示条件表达式
意思是当cond为真时，表达式的值为y，否则表达式的值为x
 C++和Java里的cond?y:x。

## 面试题

### Basic

#### Python是如何进行内存管理的？

Python的内存管理主要有三种机制：引用计数机制、垃圾回收机制和内存池机制。

- 引用计数

当给一个对象分配一个新名称或者将一个对象放入一个容器（列表、元组或字典）时，该对象的引用计数都会增加。

当使用del对对象显示销毁或者引用超出作用于或者被重新赋值时，该对象的引用计数就会减少。

可以使用sys.getrefcount()函数来获取对象的当前引用计数。多数情况下，引用计数要比我们猜测的大的 多。对于不可变数据（数字和字符串），解释器会在程序的不同部分共享内存，以便节约内存。

- 垃圾回收

当一个对象的引用计数归零时，它将被垃圾收集机制处理掉。

当两个对象a和b相互引用时，del语句可以减少a和b的引用计数，并销毁用于引用底层对象的名称。然而由于每个对象都包含一个对其他对象的应用，因此引用计数不会归零，对象也不会销毁。（从而导致内存泄露）。为解决这一问题，解释器会定期执行一个循环检测器，搜索不可访问对象的循环并删除它们。

- 内存池机制

Python提供了对内存的垃圾收集机制，但是它将不用的内存放到内存池而不是返回给操作系统。
1. Pymalloc机制。为了加速Python的执行效率，Python引入了一个内存池机制，用于管理对小块内存的申请和释放。
2. Python中所有小于256个字节的对象都使用pymalloc实现的分配器，而大的对象则使用系统的 malloc。
3. 对于Python对象，如整数，浮点数和List，都有其独立的私有内存池，对象间不共享他们的内存池。也就是说如果你分配又释放了大量的整数，用于缓存这些整数的内存就不能再分配给浮点数。

#### 什么是lambda函数？它有什么好处？

lambda 表达式，通常是在需要一个函数，但是又不想费神去命名一个函数的场合下使用，也就是指匿名函数

lambda函数：首要用途是指点短小的回调函数

lambda [arguments]： expression

```python
>>> a=lambda x，y：x+y
>>> a(3，11)
```

#### Python里面如何实现tuple和list的转换？

直接使用tuple和list函数就行了，type()可以判断对象的类型。

#### 请写出一段Python代码实现删除一个list里面的重复元素。

这个地方用set可以实现。

#### Python里面如何拷贝一个对象？（赋值，浅拷贝，深拷贝的区别）

赋值（=），就是创建了对象的一个新的引用，修改其中任意一个变量都会影响到另一个。

浅拷贝：创建一个新的对象，但它包含的是对原始对象中包含项的引用（如果用引用的方式修改其中一个对象，另外一个也会修改改变）{1，完全切片方法；2，工厂函数，如list()；3，copy模块的copy()函数}

深拷贝：创建一个新的对象，并且递归的复制它所包含的对象（修改其中一个，另外一个不会改变）{copy模块的deep.deepcopy()函数}

#### 介绍一下except的用法和作用？

try…except…except…[else…][finally…]

执行try下的语句，如果引发异常，则执行过程会跳到except语句。对每个except分支顺序尝试执行，如果引发的异常与except中的异常组匹配，执行相应的语句。如果所有的except都不匹配，则异常会传递到下一个调用本代码的最高层try代码中。

try下的语句正常执行，则执行else块代码。如果发生异常，就不会执行

如果存在finally语句，最后总是会执行。

#### Python里面match()和search()的区别？

re模块中match(pattern，string [，flags])，检查string的开头是否与pattern匹配。

re模块中research(pattern，string [，flags])，在string搜索pattern的第一个匹配值。

```python
>>> print(re.match(‘super’， ‘superstition’).span())
(0， 5)
>>> print(re.match(‘super’， ‘insuperable’))
None
>>> print(re.search(‘super’， ‘superstition’).span())
(0， 5)
>>> print(re.search(‘super’， ‘insuperable’).span())
(2， 7)
```

#### 用Python匹配HTML tag的时候，<.*>和<.*？>有什么区别？

术语叫贪婪匹配( <.*> )和非贪婪匹配( <.*？> )

例如：

```python
test <.*> ：
test <.*？> ：
```
