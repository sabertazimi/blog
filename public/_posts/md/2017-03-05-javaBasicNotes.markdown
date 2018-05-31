---
layout:     post
title:      "Java Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - OOP
    - Java
---

* [Java Basic Notes](#java-basic-notes)
	* [CMD操作](#cmd操作)
		* [运行](#运行)
		* [反汇编](#反汇编)
	* [基本结构](#基本结构)
		* [数据类型](#数据类型)
			* [整型](#整型)
				* [类型](#类型)
				* [前/后缀](#前后缀)
			* [浮点型](#浮点型)
				* [float型](#float型)
				* [double型](#double型)
			* [字符型](#字符型)
			* [布尔型](#布尔型)
			* [引用类型](#引用类型)
				* [数组(Array)](#数组array)
				* [类(Class)](#类class)
				* [接口(Interface)](#接口interface)
		* [常量](#常量)
		* [运算符](#运算符)
			* [短路与、短路或](#短路与短路或)
			* [移位符](#移位符)
			* [字符串连接运算符+:](#字符串连接运算符)
			* [==](#)
			* [()强制类型转换运算符](#强制类型转换运算符)
			* [+字符串连接符](#字符串连接符)
		* [字符串](#字符串)
			* [子串](#子串)
			* [相等](#相等)
			* [代码点<代码单元(单字符)](#代码点代码单元单字符)
			* [常用方法](#常用方法)
			* [构建字符串](#构建字符串)
		* [输入输出](#输入输出)
			* [Scanner类](#scanner类)
			* [格式化输出方法 System.out.printf()](#格式化输出方法-systemoutprintf)
			* [文件的输入与输出](#文件的输入与输出)
				* [输入(至内存)](#输入至内存)
				* [输出(至文件)](#输出至文件)
		* [表达式](#表达式)
		* [控制流程](#控制流程)
			* [块作用域](#块作用域)
			* [switch语句](#switch语句)
			* [loop语句](#loop语句)
				* [循环五要素](#循环五要素)
				* [for each 循环](#for-each-循环)
			* [break、continue语句](#breakcontinue语句)
				* [break：跳出当前循环层](#break跳出当前循环层)
					* [continue：跳过当前这次循环，进入下一次循环](#continue跳过当前这次循环进入下一次循环)
		* [大数值 ](#大数值-)
			* [java.math.BigInteger类](#javamathbiginteger类)
			* [java.math.BigDecimal类](#javamathbigdecimal类)
		* [数组](#数组)
			* [定义+引用](#定义引用)
			* [初始化](#初始化)
			* [方法](#方法)
			* [命令行参数——字符串数组String[] args](#命令行参数字符串数组string-args)
			* [排序](#排序)
			* [多维数组(数组的数组，引用的引用)](#多维数组数组的数组引用的引用)
	* [ 对象与类](#-对象与类)
		* [面向对象的三大特征](#面向对象的三大特征)
			* [封装性](#封装性)
			* [继承性](#继承性)
			* [多态性](#多态性)
		* [完整的Java源文件](#完整的java源文件)
		* [Behavior,State,Identity](#behaviorstateidentity)
		* [预定义类](#预定义类)
			* [构造器(Constructor)](#构造器constructor)
			* [GregoriaCalendar类(日历类)](#gregoriacalendar类日历类)
		* [用户自定义类 ](#用户自定义类-)
			* [完整的类定义](#完整的类定义)
			* [访问器方法(Accessor Method)](#访问器方法accessor-method)
			* [更改器方法(Mutator Method)](#更改器方法mutator-method)
		* [方法](#方法-1)
			* [方法参数](#方法参数)
			* [方法标签(Signature)](#方法标签signature)
		* [对象构造](#对象构造)
			* [构造器方法的定义](#构造器方法的定义)
			* [构造器方法的执行](#构造器方法的执行)
		* [包](#包)
		* [类路径](#类路径)
		* [文档注释](#文档注释)
			* [类注释：位于类定义前](#类注释位于类定义前)
			* [方法注释：位于方法定义前](#方法注释位于方法定义前)
			* [域注释：位于实例域定义前](#域注释位于实例域定义前)
			* [通用注释](#通用注释)
				* [@see与@link](#see与link)
			* [包注释](#包注释)
		* [类设计技巧](#类设计技巧)
			* [数据私有化](#数据私有化)
			* [数据初始化](#数据初始化)
			* [实例域封装化](#实例域封装化)
			* [构造器多样化](#构造器多样化)
			* [职责明晰化](#职责明晰化)
	* [继承](#继承)
		* [父类与子类(superclass and subclass)](#父类与子类superclass-and-subclass)
			* [属性的继承](#属性的继承)
			* [方法的继承](#方法的继承)
			* [方法的覆盖](#方法的覆盖)
			* [方法的重载](#方法的重载)
			* [super关键字](#super关键字)
			* [父类与子类的转换(Is-A关系)](#父类与子类的转换is-a关系)
		* [Object类](#object类)
			* [equals方法](#equals方法)
			* [hashCode方法](#hashcode方法)
			* [toString方法](#tostring方法)
		* [泛型数组列表](#泛型数组列表)
		* [对象包装器与自动装箱](#对象包装器与自动装箱)
			* [父类：Number](#父类number)
			* [final类(强不可变类)：无子类，不可改变数](#final类强不可变类无子类不可改变数)
			* [编译器特性](#编译器特性)
			* [API说明](#api说明)
		* [可变参数方法](#可变参数方法)
		* [枚举类](#枚举类)
			* [定义](#定义)
			* [扩展](#扩展)
		* [访问控制符](#访问控制符)
		* [非访问控制符](#非访问控制符)
			* [abstract](#abstract)
				* [abstract方法](#abstract方法)
				* [abstract类](#abstract类)
			* [final](#final)
				* [final局部变量(方法内的变量)](#final局部变量方法内的变量)
				* [final实例域](#final实例域)
				* [final方法](#final方法)
				* [final类](#final类)
			* [static](#static)
				* [static实例域(类域)](#static实例域类域)
				* [static方法](#static方法)
			* [static final 实例域](#static-final-实例域)
		* [反射(Reflection)](#反射reflection)
			* [反射机制](#反射机制)
			* [Class类](#class类)
			* [分析类的能力](#分析类的能力)
			* [分析对象](#分析对象)
			* [泛型数组实现](#泛型数组实现)
			* [调用任意方法(函数指针)](#调用任意方法函数指针)
	* [接口与内部类](#接口与内部类)
		* [接口](#接口)
			* [基本定义](#基本定义)
			* [接口方法](#接口方法)
			* [实现接口](#实现接口)
			* [接口作为方法参数](#接口作为方法参数)
			* [接口变量](#接口变量)
		* [对象克隆](#对象克隆)
			* [Cloneable接口](#cloneable接口)
			* [Object类的clone方法](#object类的clone方法)
			* [自定义clone方法](#自定义clone方法)
		* [回调](#回调)
			* [回调设计模式](#回调设计模式)
			* [ActionListener接口](#actionlistener接口)
		* [内部类](#内部类)
			* [内部类调用格式](#内部类调用格式)
			* [局部内部类](#局部内部类)
			* [匿名内部类](#匿名内部类)
			* [静态内部类：](#静态内部类)
		* [代理类](#代理类)
	* [图形程序设计](#图形程序设计)
		* [Swing组件继承层次](#swing组件继承层次)
		* [Swing组件功能层次](#swing组件功能层次)
		* [JFrame内部结构：重点位于ContentPane](#jframe内部结构重点位于contentpane)
		* [框架基础](#框架基础)
			* [位置和大小](#位置和大小)
			* [属性(get/set、is/set)](#属性getsetisset)
		* [自定义绘制组件](#自定义绘制组件)
			* [继承JComponent绘制法class](#继承jcomponent绘制法class)
			* [继承JPanel绘制法：另类用法](#继承jpanel绘制法另类用法)
			* [实现Shape接口绘制法：处理2D图形](#实现shape接口绘制法处理2d图形)
		* [图形颜色](#图形颜色)
			* [常用方法](#常用方法-1)
			* [Color类预定义颜色(Color.XX)](#color类预定义颜色colorxx)
			* [SystemColor类预定义颜色(SystemColor.XX)](#systemcolor类预定义颜色systemcolorxx)
		* [文本字体](#文本字体)
			* [字体风格](#字体风格)
			* [常用方法](#常用方法-2)
		* [显示图像](#显示图像)
	* [事件处理](#事件处理)
		* [定义与基础](#定义与基础)
			* [事件源与事件监听器](#事件源与事件监听器)
			* [实现ActionListner接口的事件监听器](#实现actionlistner接口的事件监听器)
				* [适用情况](#适用情况)
				* [事件监听器对象执行其他对象事件源产生事件影响](#事件监听器对象执行其他对象事件源产生事件影响)
			* [自动创建监听器：EventHandler类](#自动创建监听器eventhandler类)
			* [改变Swing组件观感(LookAndFeel)](#改变swing组件观感lookandfeel)
			* [适配器类XXAdapter类](#适配器类xxadapter类)
		* [动作](#动作)
			* [Aciton接口与AbstractAction类](#aciton接口与abstractaction类)
			* [基本方法](#基本方法)
			* [动作与点击按钮：将自定义动作与按钮关联](#动作与点击按钮将自定义动作与按钮关联)
			* [动作与按键映射：每个组件有三个输入映射和一个动作映射](#动作与按键映射每个组件有三个输入映射和一个动作映射)
		* [鼠标事件](#鼠标事件)
		* [AWT事件继承层次](#awt事件继承层次)
			* [事件类](#事件类)
			* [事件处理:监听器接口](#事件处理监听器接口)
			* [事件处理:适配器类:](#事件处理适配器类)
	* [Swing组件](#swing组件)
		* [Awt和Swing设计中的设计模式](#awt和swing设计中的设计模式)
			* [组合(composite)模式](#组合composite模式)
				* [定义](#定义-1)
				* [实例](#实例)
			* [装饰器(decorator)模式：保持接口，增强性能](#装饰器decorator模式保持接口增强性能)
				* [定义](#定义-2)
				* [对象](#对象)
					* [实例](#实例-1)
			* [策略(strategy)模式：动态改变行为](#策略strategy模式动态改变行为)
				* [定义](#定义-3)
				* [对象](#对象-1)
				* [设计原则](#设计原则)
				* [实例](#实例-2)
			* [模型-视图-控制器(model-view-controller)模式](#模型-视图-控制器model-view-controller模式)
		* [简单布局管理器](#简单布局管理器)
			* [流式布局(FlowLayout类)](#流式布局flowlayout类)
			* [边框布局(BorderLayout类)](#边框布局borderlayout类)
				* [视图](#视图)
				* [性质](#性质)
			* [网格布局(GridLayout类)](#网格布局gridlayout类)
				* [视图](#视图-1)
				* [性质](#性质-1)
		* [复杂布局管理器](#复杂布局管理器)
			* [网格组布局(GridBagLayout类)](#网格组布局gridbaglayout类)
				* [定义](#定义-4)
				* [关键](#关键)
				* [基本步骤](#基本步骤)
			* [组布局(GroupLayout类)：](#组布局grouplayout类)
			* [空布局(null，不使用布局管理器)](#空布局null不使用布局管理器)
			* [自定义布局](#自定义布局)
		* [文本组件](#文本组件)
			* [文本域(JTextField组件)](#文本域jtextfield组件)
			* [标签(JLabel组件)](#标签jlabel组件)
			* [密码域(JPassWordField组件)](#密码域jpasswordfield组件)
			* [文本区(JTextArea组件)](#文本区jtextarea组件)
			* [滚动窗格(JScrollPane类)](#滚动窗格jscrollpane类)
		* [选择组件](#选择组件)
			* [复选框(JCheckBox组件)](#复选框jcheckbox组件)
			* [单选按钮(ButtonGroup类add JRadioButton类)](#单选按钮buttongroup类add-jradiobutton类)
			* [边框](#边框)
			* [组合框(JComboBox组件，泛型类)](#组合框jcombobox组件泛型类)
			* [滑动条(JSlider组件)](#滑动条jslider组件)
		* [菜单组件](#菜单组件)
			* [创建菜单](#创建菜单)
			* [图标菜单项](#图标菜单项)
			* [单选按钮/复选框菜单项](#单选按钮复选框菜单项)
			* [弹出菜单(JPopupMenu组件)](#弹出菜单jpopupmenu组件)
			* [快捷键](#快捷键)
			* [启用/禁用菜单项](#启用禁用菜单项)
			* [工具栏(JToolBar组件)](#工具栏jtoolbar组件)
		* [对话框(顶级框架)](#对话框顶级框架)
			* [选项对话框(JOptionPane组件)](#选项对话框joptionpane组件)
			* [自定义对话框](#自定义对话框)
				* [基本步骤](#基本步骤-1)
			* [文件对话框(JFileChooser组件插入对话框)](#文件对话框jfilechooser组件插入对话框)
			* [颜色对话框(JColorChooser组件插入对话框)](#颜色对话框jcolorchooser组件插入对话框)
	* [部署应用程序](#部署应用程序)
		* [JNLP API](#jnlp-api)
		* [Applet](#applet)
		* [首选项](#首选项)
	* [异常、断言、日志、调试](#异常断言日志调试)
		* [处理错误](#处理错误)
			* [异常分类](#异常分类)
		* [捕获异常](#捕获异常)
			* [捕获多个异常](#捕获多个异常)
			* [重抛异常](#重抛异常)
			* [关闭异常：关闭频率低/不可能发生的异常](#关闭异常关闭频率低不可能发生的异常)
		* [记录日志](#记录日志)
		* [调试技巧](#调试技巧)
			* [使用断言](#使用断言)
			* [JUnit框架单元测试](#junit框架单元测试)
			* [日志代理](#日志代理)
			* [Throwable.printStackTrace();](#throwableprintstacktrace)
			* [GUI调试](#gui调试)
	* [泛型](#泛型)
		* [泛型类](#泛型类)
		* [泛型方法](#泛型方法)
		* [泛型变量T](#泛型变量t)
		* [泛型代码](#泛型代码)
		* [使用限制](#使用限制)
		* [通配符类型](#通配符类型)
		* [反射与泛型](#反射与泛型)
	* [集合](#集合)
		* [集合接口](#集合接口)
			* [Collection接口：泛型接口](#collection接口泛型接口)
				* [AbstractCollection类：实现Collection接口](#abstractcollection类实现collection接口)
				* [迭代器：泛型接口](#迭代器泛型接口)
				* [Iterable接口：泛型接口](#iterable接口泛型接口)
			* [Queue接口与Deque接口](#queue接口与deque接口)
		* [具体集合](#具体集合)
			* [数组列表(ArrayList implements List)](#数组列表arraylist-implements-list)
			* [链表(LinkedList implements List，Deque)](#链表linkedlist-implements-listdeque)
			* [散列集](#散列集)
			* [树集](#树集)
			* [比较接口](#比较接口)
				* [Comparable接口：泛型接口](#comparable接口泛型接口)
				* [Comparator接口(比较器)：泛型接口](#comparator接口比较器泛型接口)
			* [队列](#队列)
			* [映射表](#映射表)
		* [集合框架](#集合框架)
		* [集合算法	](#集合算法)
		* [早期集合](#早期集合)
	* [线程](#线程)
		* [线程基础](#线程基础)
		* [线程状态](#线程状态)
			* [new](#new)
			* [runnable           ](#runnable-----------)
			* [blocked/waiting/timed waiting：不活动状态](#blockedwaitingtimed-waiting不活动状态)
				* [blocked](#blocked)
				* [waiting](#waiting)
				* [timed waiting](#timed-waiting)
			* [terminated](#terminated)
		* [线程属性](#线程属性)
			* [优先级：默认情况下继承父线程的优先级](#优先级默认情况下继承父线程的优先级)
			* [Thread.setDaemon(true)](#threadsetdaemontrue)
			* [未捕获异常的处理器](#未捕获异常的处理器)
		* [中断线程](#中断线程)
			* [Interrupt方法](#interrupt方法)
			* [InterruptedException](#interruptedexception)
			* [处理InterruptedException](#处理interruptedexception)
		* [线程同步](#线程同步)
			* [锁对象(实例域)](#锁对象实例域)
			* [条件对象(实例域)](#条件对象实例域)
			* [内部锁：synchronized关键字](#内部锁synchronized关键字)
			* [截获内部锁](#截获内部锁)
			* [读写锁](#读写锁)
			* [监视器](#监视器)
			* [volatile关键字:修饰实例域](#volatile关键字修饰实例域)
			* [死锁](#死锁)
			* [ThreadLocal辅助类](#threadlocal辅助类)
		* [线程安全](#线程安全)
			* [原子整数](#原子整数)
			* [线程安全集合](#线程安全集合)
		* [异步计算](#异步计算)
		* [执行器](#执行器)
		* [同步器](#同步器)
		* [线程与Swing:事件分配线程](#线程与swing事件分配线程)
	* [Self-Defined Class](#self-defined-class)
	* [常用工具类](#常用工具类)
	* [输入与输出](#输入与输出)
		* [输入](#输入)
		* [输出](#输出)
	* [正则表达式](#正则表达式)
		* [基本写法](#基本写法)
		* [matcher.group(int)](#matchergroupint)

# Java Basic Notes

## CLI Tools

###	编译

javac name.java

### 运行

java name(无后缀类名)

### 反汇编

javap –c name(无后缀类名)

###	打包

jar {c t x u f} [v m e 0 M i] [-C 目录] 文件名

解释：
-   c：创建jar包
-   t：显示jar包内容
-   x：解压jar包
-   u：添加文件到jar包
-   f：命名jar包
-   v：显示详细执行过程报告
-   m：指定manufest.mf文件(对jar包做相关设置)
-   0：打包jar包是不压缩
-   M：不产生manufest.mf文件，覆盖m参数的设置
-   i：创建索引文件
-   C：进入某目录后再执行jar命令
-   5.	生成API文档：java doc –d [ ] 类名/包名

可选参数：

-   -author/-version：文档中显示作者和版本信息(默认不显示)
-   -link superlink 标准类名：为标准类添加超链接
-   -linksourse：方法/类名转化为超链接，指向生成的html格式的源文件
 
## Gradle Tool

```sh
$ sudo apt install gradle

$ gradle help
$ gradle tasks

$ gradle assemble
$ gradle build
$ gradle clean
$ gradle test
$ gradle jar
$ gradle javadoc
```

### build.gradle

```gradle
apply plugin: 'java'

jar {
    manifest {
        attributes 'Main-Class': 'com.sabertazimi.tao.Tao'
    }
}
```

## 基本结构

### 数据类型

#### 整型

##### 类型

-   byte型:1字节  -128~127
-   short型:2字节 -2^15~2^15 -1
-   int型:4字节   -2^31~2^31 -1(20亿)
-   long型:8字节  -2^63~2^63 -1

##### 前/后缀

-   二进制前缀      0b/0B  
-   八进制前缀      0  
-   十六进制前缀    0x/0X
-   长整型后缀      l/L

#### 浮点型

##### float型

后缀F:4字节 -3403E38~3.403E38(有效位数6~7位)

```java
float f = 1.2;    //ERROR
float f = 1.2F;   //OK
```

##### double型

后缀D(默认型):8字节 -1798E308~1.798E308(有效位数15位)

科学计数法：指数均为十进制，符号为e(尾数为十进制)/p(尾数为十六进制)

Double.POSITIVE_INFINITY，Double.NEGATIVE_INFINITY，Double.isNaN(检数)

千分位下划线分隔法 e.g 123_456.789_000

#### 字符型

-   1个char型占2个字节(Unicode编码)
-   ’ ’(定界符)内可用八/十六进制转义字符表示字符   

-   八:\xxx  
-   十六:\uxxxx(\u转义序列可出现在任何地方) e.g ‘\u0061’

改进的Unicode字符集:
-   代码点(前缀U+)分为17个代码级别(code plane)
-   第一个级别为经典Unicode代码，
-   其余附加级别U+10000至U+10FFFF。

#### 布尔型
只允许赋值为true、false(不可取0或非0值)，不可与整型相互转换

#### 引用类型

##### 数组(Array)

字符串String：不可变性(需要修改变量名所引用值，必须重新创建一个String对象例)  

旧的对象实例若被判定为垃圾便会被系统自动回收

##### 类(Class)

##### 接口(Interface)

### 常量

定义(随使用随定义)

### 运算符

#### 短路与、短路或

-   &&:第一个操作数为假不再向后运算
-   ||:第一个操作数为真不再向后运算

#### 移位符 

有符号右移>>:最高位补符号位 左操作数int/long，右操作数mod32/mod64

> e.g  int a >> 33即int a >> 1

无符号右移>>>:最高位补0

#### 字符串连接运算符+:

左右操作数 String字符串/其他类型(自动被转化为String)

#### ==

-   基本类型值相等，引用类型引用相等
-   基本类型：转换后比较；boolean型不与int型比较
-   引用类型：指向两个不同对象实例的变量不相等;若判断两个对象实例内容是否相等，必须调用equals()方法

#### ()强制类型转换运算符

-   只能在继承层次内进行强制类型转换(同一家族)
-   将父类转换为子类前，应使用instanceof运算符进行检查

#### +字符串连接符

调用toString方法 x.toString() ""+x;

### 字符串

#### 子串

stringTest.substring(a, b)方法返回长度为b-a的子串，a(包括)、b(不包括)为起止位置

#### 相等

-   内容相等：stringOne.equals(stringTwo)方法返回值true/false
-   不区分大小写equalsIgnoreCase

#### 代码点<代码单元(单字符)

#### 常用方法 
 
#### 构建字符串

StringBuilder类：单线程，功能同StringBuffer类(多线程)
 
### 输入输出

#### Scanner类

监视器，功能最强大的输入类，new Scanner(System.in)
 
#### 格式化输出方法 System.out.printf()
 
静态创建格式化字符串
 
#### 文件的输入与输出

##### 输入(至内存)

用File对象构造一个Scanner对象：new Scanner(Paths.get(“FileName”))(反斜杠需双写)

##### 输出(至文件)

用文件名构造一个PrintWriter对象：new PrintWriter(“FileName”),之后调用System.PrintWriter.print方法

### 表达式

-   整数提升:算术运算前byte,short,char提升为int 
-   没有”,”运算符和表达式语句

### 控制流程

合法语句：赋值语句和方法调用语句

#### 块作用域

-   不允许内层块与外层块变量同名(无C语言中的可见性)
-   块内声明变量不允许在块外使用：if块、for块、while块、普通block

#### switch语句

case标签变量类型：字符型(包装类)、三整型(包装类)、枚举常量、字符串类

#### loop语句

##### 循环五要素

-   初始化部分(init_statement);
-   循环条件部分(test_explanation);
-   循环体部分(body_statement);
-   迭代部分(alter_statement):自加/自减运算符改变条件变量
-   结束后处理

##### for each 循环

```java
//只读遍历；变量age只作用于for循环体
for (int age : arrayName) {}   
```

#### break、continue语句

##### break：跳出当前循环层

```java
label: 
{
break label;
} //可跳出任意语句块：跳至标签块末尾
```

###### continue：跳过当前这次循环，进入下一次循环

```java
  label:
  {
continue label;
} //跳至循环块首部
```

### 大数值  

#### java.math.BigInteger类
 
#### java.math.BigDecimal类
 
### 数组

#### 定义+引用

-   类型(包括类/对象) + [] + 标识符
-   类型(包括类/对象) + 标识符 + []

-   int a[N] 非法  数组是引用类型
-   不可对数组名进行自增操作(尽管[]与*具有类似作用)

#### 初始化

-   默认初始化数值类型为0/false，引用类型为null
-   使用new分配内存单元      

两种不同初始化方式：  

-   声明时：`MyDate[] dates = {new Mydate(),……};`
-   赋值时：`MyDate[] dates = new MyDate[] (匿名数组){new Mydate(),…..};`

#### 方法

-   属性:arrayName.length
-   打印:arrays.toString方法
-   复制:arrayName.Copy( source, 0, destination, 0, source.length);

```java
Arrays.copyOf(ArrayName, Array.length); //可用来增长数组长度
```

-   比较:Arrays.equals(type[] a,type[] b);

#### 命令行参数——字符串数组String[] args

args数组不包括程序名

#### 排序

Arrays.sort(ArrayName)快速排序方法

#### 多维数组(数组的数组，引用的引用)

-   多维数组的声明和初始化应按从高维到低维的顺序进行
    -   声明&初始化 int[][] t = new int[3][]; 
    -   子数组交换   atemp = a[i];a[i]=a[i+1];a[i+1]=atemp;
-   子数组长度可不一致：可先构造一维长度，再使用循环构造子数组各自长度 

##  对象与类

### 面向对象的三大特征

#### 封装性

-   模块化+信息隐蔽(隐藏细节(private)，只提供受保护的访问接口(public))
-   只可通过方法改变对象实例的状态(State)(Instance Field)

#### 继承性

父类和子类共享数据和方法（提高代码重用率和可维护性）

-   可继承成员：公有域、公有方法
-   不可继承成员：私有域、静态域、实例域初始化块、私有方法、静态方法、构造器方法

#### 多态性

不同的对象收到同一个消息(method调用)可产生不同效果(由对象内封装的细节决定)  

-   编译时多态：重载(Overload)
-   运行时多态：覆盖(Override)
-   根据对象实例的类型进行动态绑定(Dynamic Binding)
-   虚方法调用(Virtual Method Invoking) ：
    -   在调用方法时，程序会正确地调用子类对象的方法
    -   无法进行虚方法调用情况

-   static的方法：以声明类型(标识符前的类型)为准，无关实例类型
-   final/private方法：子类无法覆盖/继承父类同名方法，不存在虚化问题

### 完整的Java源文件

```java
package packageName;              //指定文件中的类所在的包，0个或1个
import packageName.[className|*];   //指定引入的类/API，0个或多个
public classDefinition                 //属性为public的类定义，0个或1个
interfaceDefinition and classDefinition  //接口或类定义，0个或多个
```

### Behavior,State,Identity

### 预定义类

#### 构造器(Constructor)

#### GregoriaCalendar类(日历类)

### 用户自定义类  

#### 完整的类定义

```java
[public] [abstact|final] class className[extends superclassName]
[implements interfaceNameList] {

//成员变量声明，可为多个：
//实例域一般添加private修饰符，保持封装性
[public | protected | private] [static] [final] [transient] [volatile]type variableName;

//方法(包括构造方法)定义及实现，可为多个
[public | protected | private] [static] [final | abstract] [native] [synchronized]
returnType methodName( [paramList] ) [throws exceptionList]{
    statements;
  }
}

class Class_Name{
   int/String characteristic;   //状态(State)：变量(实例域 instance field)
   constructor(){};             //标识(Identity)：构造器(constructor)
   void function(){};           //行为(Behavior)：函数(方法method)
}
```

#### 访问器方法(Accessor Method)

只访问实例域不进行修改的方法

```java
returnType get() {
    //保持封装性
    //返回引用类型对象时，必须返回克隆体对象引用而不是实例域对象引用
  return instanceFieldVariable.clone();
}
```

#### 更改器方法(Mutator Method)

修改实例域的方法

e.g add、set

### 方法

#### 方法参数

Java所有普通方法的参数传递方式:值传递

-   基本类型：传递值的拷贝

方法中无法更改原变量的值

-   引用类型：传递引用的拷贝

方法中无法更改原变量的引用(指针指向),只可更改引用对象的状态(State)

#### 方法标签(Signature)

-   方法名称
-   方法参数

方法返回值类型不是方法标签(不存在同名同参而不同返回值的方法)

### 对象构造

构造器方法完整定义：

```java
ClassName (ClassPropertiesVariableTable) {
    //进行输入参数合法化检查
    Property n = Variablea;   
    Statement Block;
}        
```
#### 构造器方法的定义

-   未定义任何构造器方法
系统会自动产生一个构造器方法，称为无参空默认构造器方法（defaultconstructor）
并将所有实例域初始化为默认值
-   注意事项
    -   不应在构造器中定义实例域同名变量
    -   在构造器中尽量只调用final/private方法(不会(继承后)被子类方法覆盖)
    -   this()可调用此类的其他构造方法，this()必须位于构造器方法首行

#### 构造器方法的执行

-   构造器方法前语句/语句块将先于构造器执行
-   编译器会在编译时在每个构造器方法内首行自动添加super();(若父类没有无参构造器方法编译出错)/人工显式调用父类构造器方法，直至实现Object类(超类)的构造器方法，再执行构造器方法语句

### 包

导入import

-   包的导入

```java
import java.包路径.*   //导入指定包的所有类
```

-   静态导入

```java
import static java.包路径.类名.*  //导入指令类的所有静态域和静态方法
```

### 类路径

package语句

### 文档注释

Java除了可以采用我们常见的注释方式（//、/* */(二型注释不可嵌套)）之外,Java语言规范还定义了一种特殊的Javadoc注释：

```java
/** 
*@author    对类的说明              标明开发该类模块的作者
*@version   对类的说明              标明该类模块的版本
*@see      对类、属性、方法的说明  参考转向，也就是相关主题
*@param    对方法的说明            对方法中某参数的说明
*@return    对方法的说明             对方法返回值的说明
*@exception 对方法的说明            对方法可能抛出的异常进行说明
*@Override   对方法覆盖的说明
*@FunctionalInterface 函数式接口：包含不超过一个abstract方法（可以有其他非abstract方法）
*/ 
```

#### 类注释：位于类定义前

```java
/**
*整体性描述
*
* @author 作者
* @version 1.0, 05/22/07
* @since version1.0
*/
```

#### 方法注释：位于方法定义前

```java
/**
*整体性描述
*
*@param             对方法的说明            对方法中某参数的说明
*@return            对方法的说明             对方法返回值的说明
*@exception/throws 对方法的说明            对方法可能抛出的异常进行说明
*/
```

#### 域注释：位于实例域定义前

```java
/**
 * 备注信息
 */
```

#### 通用注释

##### @see与@link

可在文档中看到引用(文本、类/方法/变量、超链接)

-   @see/@link package.class#feature label
-   @see/@link <a href = “……”> label </a>
-   @see/@link “text” 

区别: link注释可在任意位置，see注释需在类/方法/变量定义前

#### 包注释

新建package-info.java源文件:

```java
package 包路径
/**
 * 包注释
 */
```

### 类设计技巧

#### 数据私有化

保持封装性

#### 数据初始化

不依赖实例域默认值，且应进行数据合法化检查

#### 实例域封装化

过多相关的基本类型实例域可封装成一个轻型类

#### 构造器多样化

最低标准为显式无参构造器+一个带参数(包括合法化检查)构造器

#### 职责明晰化

一个类的方法应与类本身紧密相关，且不过少也不过多 

## 继承

### 父类与子类(superclass and subclass)

#### 属性的继承

-   可继承：公有域
-   不可继承：私有域、静态域、实例域初始化块
-   若要访问(修改)父类私有域，必须使用调用公有的super.get()方法得到父类私有域
-   初始化父类私有域：super(ParamList); 调用父类构造方法进行初始化

#### 方法的继承

-   可继承：公有方法
-   不可继承：私有方法、静态方法、构造器方法 

#### 方法的覆盖

标签相同(不可降低父类方法可见性)

#### 方法的重载

标签不同，属于新加方法

#### super关键字

不是隐式参数，是提示编译器执行的特殊关键字 

#### 父类与子类的转换(Is-A关系)

Subclass must be superclass,superclass may not be subclass.

-   可将子类引用赋值给父类变量(Upcasting)或替换父类作参数

```java
Person p = new Student();  //p仍是父类变量
```

> 注：若父类变量和子类变量引用同一个子类对象实例时，父类某些操作可能引起内存混乱
例如：先调用父类构造器方法构造子类，再调用子类扩展方法访问子类扩展私有域(根本未分配内存空间)

-   不可将父类引用赋值给子类变量

```java
Student s = new Person();  //ERROR:e.g. s.getStuID();
```

### Object类

#### equals方法

-   子类中覆盖(@override)父类equals方法：super.equals(superClassName other);
-   显式参数名：Object otherObject
-   if (this == otherObject) return true;
-   if (otherObject == null) return false;
-   if (getClass != otherObject.getClass()) return false;
-   ClassName other = (ClassName) otherObject;
-   return field == other.field

#### hashCode方法

-   String类hashCode：ΣStringChar[i]^(n-i-1), (i:0~(n-1))
-   Objec对象hashCode：内部ID(存储地址)
-   若重写equals方法，也应重写hashCode方法，使对象实例hashCode分布散列化
    -   return 各域hashCode值加权和:31x+y rule
        -   引用类型、包装类：hashCode()
        -   数组：Arrays.deepHashCode()
    -   return Objects.hash(field1,..,fieldn);  //自动组合各域hashCode
    -   hash值：return (key.hashCode() & 0x7fffffff) % M;

#### toString方法

-   设计return getClass().getName() + ”[“ + field + ”]”;
-   Object类toString方法：用于输出CassName和hashCode
-   数组直接继承Object类toSrting方法，输出数组需调用Arrays.(deep)toString();
-   自动调用：+ 字符串连接符、println(obj) 

### 泛型数组列表

ArrayList<ClassName> VariableName = new ArrayList<>(); 
 
-   toArray(ArrayName)转化为同类型普通数组存至ArrayName：可以创建一个ArrayList，再转化为数组，方便使用[]下标操作
-   插入、删除操作时间复杂度高(数据元素左/右移)

### 对象包装器与自动装箱

Void,Boolean,Byte,Character,Short,Integer, Long, Float, Double 类:包装器(Wrapper)类

#### 父类：Number

#### final类(强不可变类)：无子类，不可改变数

#### 编译器特性

-   自动装箱（auto-boxing） 

```java
Integer I = 10;
myArrayList.add(10);
```

-   自动拆箱（auto-unboxing）

```java
int i= I;
```

-   自动装箱+拆箱 

```java
Integer I = 0;I++; 

// 实际译为:
Integer I = Integer.valueOf(10); 
myArrayList.add(Integer.valueOf(10));
Int I =  I.intValue();
```
 
#### API说明
 
### 可变参数方法
 
### 枚举类

#### 定义
 
#### 扩展
 
### 访问控制符

public>protected(包作用域+)>默认(包作用域)>private(类作用域)

最大限度：不同包的非子类(所有类)、同一个包/不同包的子类、同一个包、同一个类    

### 非访问控制符

#### abstract 

##### abstract方法

语法形式：abstract + MethodName(ParamList)；

##### abstract类

-   定义
    -   若一个类包含abstract方法，则必须是abstract类
    -   一个abstract类可以不包含abstrat方法
    -   一个abstract类可以包含具体数据和具体方法
-   构造器方法
    -   需要实现构造器方法
    -   构造器方法可以被非abstract子类调用
    -   不能使用new构造abstract类对象实例

#### final

##### final局部变量(方法内的变量)

只读常量，必须进行一次初始化

##### final实例域

-   必须进行一次(类定义/构造器)初始化
-   final引用类型实例域的引用不可更改，但所引用对象的状态(State)可被更改

##### final方法

可继承，不可重写
##### final类

-   不可继承
-   实例域可以不是final实例域，方法自动成为final方法

#### static

##### static实例域(类域)

-   属于类整体，保存在类的内存区域的公共存储单元(不可继承)
-   可通过类名/对象实例名访问该属性

##### static方法

-   类方法，属于类整体(不可继承)
-   没有隐式参数(this/super)
-   只能处理该类中的static实例域/调用该类中的static方法
-   既可通过类名调用该方法(推荐)，又可通过对象实例名调用static方法
-   Tips:工厂模式：利用static方法可模拟构造器方法：可自定义构造器名和返回对象类型

#### static final 实例域

-   默认初始化(数值型为0，布尔型为false，引用型为null)
-   常结合public将变量设置为全局静态常量  e.g. e、PI

### 反射(Reflection)

#### 反射机制

-   运行中分析 类的能力
-   运行中查看对象
-   实现通用的数组操作代码
-   利用Method对象

#### Class类

#### 分析类的能力
 
#### 分析对象

#### 泛型数组实现
 
#### 调用任意方法(函数指针)
  
## 接口与内部类

### 接口

#### 基本定义

interface类型是引用类型

常量 + 方法

```java
 [修饰符(public)]interface 接口名 [extends 父接口名列表(多个接口)] {
//常量声明，可为多个
[public] [static] [final] type constantName= Value; 
//方法声明，可为多个
[public] [abstract] retumType methodName( [paramList] );
}
```

#### 接口方法

自动默认：public abstract方法(声明时无需关键字)

#### 实现接口

在类中必须实现(override)接口中的所有方法

#### 接口作为方法参数

-   设计此类方法时：
    -   可调用接口中公有静态常量/公有方法(interfaceVariableName.invokeMethod)
    -   可将接口参数传递给其他接口作参数的方法，调用其他方法
-   实际调用方法时：将实现了该接口的类作为参数传递给方法，可提高方法的灵活性

> 例子：Comparable接口和sort静态方法
 
#### 接口变量

-   不可创建interface实例(即不可用new关键字)
-   可声明一个interface变量，并使其引用实现了该接口的对象实例

```java
//TimePrinter：实现了ActionListener接口的类
ActionListener myListener = new TimePrinter();
```

### 对象克隆

#### Cloneable接口

标签接口(tagging interface)之一：无方法

#### Object类的clone方法

浅拷贝: 无法克隆目标对象实例域中的对象成员

#### 自定义clone方法

鉴于默认clone方法的局限性，需自定义用户需要的clone方法

-   实现接口：implements Cloneable
-   改变可见性&抛出异常: `public <returnType> clone() throws CloneNotSupportedException {};`
-   自定义克隆体：克隆子对象

### 回调

#### 回调设计模式

某个特定事件发生时采取某个特定动作

#### ActionListener接口
 
### 内部类

#### 内部类调用格式

-   声明与构造(实例化)

OuterClass.InnerClass variableName = OuterClass/this.new InnerClass();

-   定义：应使用private关键字

-   访问实例域/方法

内部类：this.fieldName/methodName
外部类：OuterClass.this.fieldName/methodName

#### 局部内部类

-   定义在方法中的内部类
-   修饰符：无/abstract/final
-   可访问外围类成员/final局部变量

#### 匿名内部类

在实际`构造父类/实现接口`时定义在构造器方法中的内部类 

-   外围为父类：内部类需要扩展该父类

```java
new SuperType (construction parameters)
{
    inner class methods and data{};  //直接定义实例域和方法，构造器参数传递给父类构造器
}
```

-   外围为接口：内部类需要实现该接口

```java
new InterfaceType () //一对括号
{
    Inner class methods and data{};  //需实现接口中的所有抽象方法
}
```

-   例子：积分、线程、回调函数(HookFunction)、事件处理(ActionListener)

#### 静态内部类： 

-   只可访问外围类的静态域/静态方法(可视作不可访问外围类)
-   实例化：new OuterClass.InnerClass()

### 代理类
 
## 图形程序设计

### Swing组件继承层次
 
### Swing组件功能层次
 
### JFrame内部结构：重点位于ContentPane
 
### 框架基础

#### 位置和大小

-   方法概览

```java
//继承于：Component类
//功能：设置JFrame的位置和大小
//坐标：相对于电脑屏幕
setLocation(x, y);
setBounds(x, y, width, height);
setLocationByPlatform(true);
```

-   动态设置

```java
//得到屏幕大小
Dimension screenSize = Toolkit.getDefaultToolKit().getScreenSize();
int screenWidth = screensSize.width;
int screenHeight = screenSize.height;
//根据屏幕大小设置框架大小
setSize(screenWidth / 2, screenHeight / 2);
setLocationByPlatform(true);
```

#### 属性(get/set、is/set)

-   标题

```java
//继承于：Frame类
//功能：标题属性
public String getTitle();
public void setTitle (String title);
```

-   定位

```java
//继承于：Window类
//功能：定位属性
public boolean isLocationByPlatform();
public void setLocationByPlatform (boolean b);
```

-   标题图标

```java
Image img = new ImageIcon(“icon.gif”).getImage();
setIconImage(img);
```

-   其他属性
 
### 自定义绘制组件

所有绘制都使用Graphics类作参数(包含绘制图案、图像、文本等的方法)

#### 继承JComponent绘制法class 

```java
class MyComponent extends JComponent
{   //@override
    public void paintComponent (Graphics g)
    {
        g.drawString(text, x, y);
    }
    //@override
    public Dimension getPreferredSize()
    {
        return new Dimension(DEFAULT_WIDTH, DEFAULT_HEIGHT)
    }
}
```

#### 继承JPanel绘制法：另类用法

```java
class MyJPanel extends JPanel
{
    public void paintComponent(Graphics g)
    {
        super.paintComponent(g);
        code for drawing;
    }
}
```
  
#### 实现Shape接口绘制法：处理2D图形
 
图形类继承关系图
 
### 图形颜色

#### 常用方法
 
#### Color类预定义颜色(Color.XX)
 
#### SystemColor类预定义颜色(SystemColor.XX)
 
### 文本字体

#### 字体风格
 
#### 常用方法
 
### 显示图像
 
## 事件处理

### 定义与基础

#### 事件源与事件监听器

#### 实现ActionListner接口的事件监听器

##### 适用情况

-   按钮点击事件(click button)
-   鼠标双击选择列表框某一选项
-   选择某一菜单项
-   文本域键入回车键
-   imer组件达到指定时间间隔

##### 事件监听器对象执行其他对象事件源产生事件影响

此时，可使用匿名内部类或Lambda表达式简化代码

```java
.addActionListener(new ActionListener() 
{
public void actionPerformed(ActionEvevt event) 
{
//code for procedure
} 
});
```

或

```java
.addActionListener( (e) -> {
//code for procedure
});
```

#### 自动创建监听器：EventHandler类
 
#### 改变Swing组件观感(LookAndFeel)
 
#### 适配器类XXAdapter类

此类实现相应接口所有方法，但每个方法方法体皆空;简化Listener实现，只需重写所需方法

```java
.addWindowLister(new WindowAdapter()
{
    //重写所需方法
});
```

### 动作

#### Aciton接口与AbstractAction类

Action接口可连接多个事件源，AbstractAction类是实现该接口的类(可继承此类编写动作)

#### 基本方法

-   actionPerformed：继承于ActionListener接口
-   enabled：启用/禁用动作
-   value：动作对象中的任意名/值  e.g.Action.NAME,“按键名称”
-   key为动作属性的名称，value为对应具体属性(如String、ImageIcon)
-   propertyChangeListener：将动作对象属性变化传给监听器，再传给其他组件对象

#### 动作与点击按钮：将自定义动作与按钮关联

JButton构造器：JButton(Action act);

#### 动作与按键映射：每个组件有三个输入映射和一个动作映射
  
-   建立输入映射(三种方式得到(次)顶层组件的输入映射)

```java
InputMap imap = panel.getInputMap(JComponent.InputMapFlag);
```

-   关联输入映射和动作映射:put方法含有两个参数

```java
imap.put(  KeyStroke.getKeyStroke(“ctrl Y”)  ,  Object actionMapKeyName );
```

-   建立动作映射

```java
ActionMap amap = panel.getActionMap();
```

-   关联动作映射和动作:put方法含有两个参数

```java
amap.put(Object actionMapkeyName  ,  Action act);
```

> 注：将Object设为String ”none” 时 表示 空动作(按键无效)
 
### 鼠标事件

### AWT事件继承层次
 
#### 事件类

-   语义事件类(semantic)：

ActionEvent、AdjustmentEvent、ItemEvent
 
-   低级事件类(low-level)

FocusEvent、MouseEvent、MouseWheelEvent、KeyEvent、WindowEvent
 
#### 事件处理:监听器接口
 
#### 事件处理:适配器类:

-   FocusAdapter 
-   MouseAdapter
-   MouseMotionAdapter
-   KeyAdapter
-   WindowAdapter
 
## Swing组件

### Awt和Swing设计中的设计模式

#### 组合(composite)模式

##### 定义

将对象组合成树形结构以表示”部分-整体“的层次结构，使得用户对单个对象和组合对象的使用具有一致性

##### 实例

容器与组件(具有共同接口) - 容器与组件具有层次结构,用户可对容器与组件实施同样的操作(点击、删除、输入等)

#### 装饰器(decorator)模式：保持接口，增强性能

##### 定义

以对客户透明的方式动态地给一个对象附加上更多的责任(对象前后本体未变化)

##### 对象

-   抽象组件(Component)角色: 给出一个抽象接口，以规范准备接收附加责任的对象(透明不变性)
-   具体组件(ConcreteComponent)角色: 定义一个将要接收附加责任的类(透明不变性)
-   装饰(Decorator)角色:
    -   持有一个组件对象的实例 
    -   定义一个与抽象构件组件接口一致的接口
    -   添加额外功能
具体装饰(ConcreteDecorator)角色: 负责给组件对象“贴上”附加的责任

###### 实例

带滚动条的面板

Component：面板,Decorator：滚动条

#### 策略(strategy)模式：动态改变行为

##### 定义

定义了不同的算法族，并且之间可以互相替换

##### 对象

-    环境对象：实现了抽象策略接口或者引用了具体策略类
-    抽象策略接口/类：接口/抽象类，环境对象中变化部分
-    具体策略类：实现了抽象策略接口，可有多个不同的具体策略类(动态变化)

##### 设计原则

把一个类中经常改变或者将来可能改变的部分提取出来，作为一个接口

##### 实例

布局管理器

环境对象：面板，抽象策略：抽象布局管理接口，具体策略：具体布局管理类

#### 模型-视图-控制器(model-view-controller)模式

-   组件三要素：外观、内容(状态)、行为
-   模型类：存储内容(状态)   state getter/setter
-   视图类：显示内容(状态)对应外观  一个模型可以有多个视图(模型的不同部分/形式)
-   控制器类：处理用户输入事件(点击鼠标、敲击键盘)，改变模型类/视图类状态，调用模型类/视图类中方法
 
一个模型类可以适用多个组件(如DefaultButtonModel是多种Button包装器类的模型对象):

几乎所有组件都有一个带后缀UI的视图对象;不是所有组件都有一个专门的控制器对象
 
### 简单布局管理器
 
#### 流式布局(FlowLayout类)

逐行填充组件，可设置对齐方式和组件间距
 
#### 边框布局(BorderLayout类)
 
##### 视图
 
##### 性质

改变面板大小时，只有中央组件大小变化

技巧：可在五个区块内添加子面板

```java
frame.add(panel, BorderLayout.CENTER/NORTH/SOUTH/WEST/EAST)
```

#### 网格布局(GridLayout类)

##### 视图
 
##### 性质

组件按行列排列，且大小一致(只能逐行逐列添加组件)
 
### 复杂布局管理器

#### 网格组布局(GridBagLayout类)

##### 定义

没有行列大小和个数限制的网格布局：行列大小可不一致，可合并相邻行/列(合并单元格)

##### 关键
gridBagPanel.add(component, GridBagConstraints);给每一个组件都构造一个GridBagConstraints类

##### 基本步骤

-   画框图
-   设置gridXX四值
-   设置fill/anchor值、
-   设置增量weightx/weight
    -   全部100：行列可随容器大小变化
    -   设置某一行/列所有weightx/weighty为0：此行/列保持默认大小

e. gridBagPanel.add(component, GridBagConstraints);

#### 组布局(GroupLayout类)：

通过(嵌套)组的水平与垂直计算(间距与组件)，实现灵活的布局:

-   GroupLayout类
-   Group类
-   ParallelGroup类
-   SequentialGroup类
 
#### 空布局(null，不使用布局管理器)
 
#### 自定义布局

实现LayoutManager接口，自定义setSizes(Container parent)
 
在layoutContainer方法中调用每个组件的setBounds方法，摆放组件

### 文本组件

JTextComponent抽象类

#### 文本域(JTextField组件)
 
#### 标签(JLabel组件)

标签无法响应用户输入事件，只提供标识功能
 
#### 密码域(JPassWordField组件)
 
#### 文本区(JTextArea组件)
 
#### 滚动窗格(JScrollPane类)

将文本区组件/其他组件插入到滚动窗格中，可实现文本区/其他组件的滚动
 
### 选择组件

#### 复选框(JCheckBox组件)

勾取选项(可自定义选项标签)：勾选/不勾选状态
 
```java
.addActionListener( if ( .isSelected() ) {……});
```

多个复选框可共用一个监听器，通过isSelected方法检测不同复选框的状态

#### 单选按钮(ButtonGroup类add JRadioButton类)

-   ButtonGroup对象负责调度任务：保证只有一个JRadioButton对象被按下
-   JRadioButton对象:add至JPanel对象,add至ButtonGroup对象,addActionListener注册监听器
 
#### 边框

在面板/子面板(TextPanel、ButtonPanel功能区等)调用setBorder方法填充边框
 
#### 组合框(JComboBox组件，泛型类)

下拉选框(N个选项Item)，.addActionListener( getItemAt( getSelectedIndex() ) )
 
#### 滑动条(JSlider组件)

可连续选择数值

```java
.addChangeListener(new ChangeListener()
{
    public void stateChanged(ChangeEvent event)
    {
        Jslider source = (JSlider) event.getSource();
        int Value = source.getValue();
        code for operating;   //with Value
    }
});
```

### 菜单组件

#### 创建菜单

JMenuBar –> JMenu -> JMenuItem
 
利用Action创建MenuItem：(调用insert方法)

```java
Action exitAction = new AbstractAction (“ Exit ”) //MenuItems text goes here
{
    public void actionPerformed (ActionEvent event)
    {
        code for action;
    }
};
```

#### 图标菜单项

-   JMenuItem类扩展AbstractButton类
-   同样地，JMenuItem类构造器/Action.putValue(Action.SMALL_ICON,……)；
 
#### 单选按钮/复选框菜单项

将MenuBar视作JPanel即可
 
#### 弹出菜单(JPopupMenu组件)

不依附于MenuBar的浮动菜单(Window系统下右键弹出菜单)
 
#### 快捷键

-   同样地，两个方式：MenuItem类构造器/Action.putValue(Action.MNEMONIC_KEY,……)；
-   加速器：不打开菜单项即可起作用的快捷键(如Ctrl+……)，关联JMenuItem
 
#### 启用/禁用菜单项
 
#### 工具栏(JToolBar组件)

-   同样地，JToolBar构造器/Action.putValue(Action.SHORT_DESCRIPTION,……)；
 
### 对话框(顶级框架)

-   模式对话框：弹出时不允许用户作其他交互
-   无模式对话框：弹出时允许用户作其他交互(如工具栏)

#### 选项对话框(JOptionPane组件)
 
#### 自定义对话框

##### 基本步骤

-   在构造器中调用超类Jdialog构造器方法
-   添加对话框的用户界面组件
-   添加事件处理器
-   设置对话框大小
 
#### 文件对话框(JFileChooser组件插入对话框)

-   文件选择器
-   文件过滤器：可添加文件视图类
 
#### 颜色对话框(JColorChooser组件插入对话框)
  
## 部署应用程序

### JNLP API
 
### Applet
 
### 首选项
  
## 异常、断言、日志、调试

### 处理错误

#### 异常分类
 
-   已检查异常：需要抛出声明(非RuntimeException)
-   未检查异常：不可控(Error)/可避免(RuntimeException：下标越界等)
-   子类覆盖父类方法(该方法)抛出必检异常数必须少于父类方法
 
### 捕获异常

原则：捕获知道如何处理的异常，传递不知如何处理的异常

#### 捕获多个异常

-   普通形式

```java
try 
{ 
    语句组(可能抛出异常的语句：抛出异常后，try语句块直接终止) 
} 
catch (匹配Exception ex) 
{
    子子异常类名 异常处理语句组； 
} 
catch (匹配Exception ex) 
{
    子异常类名 异常处理语句组； 
} 
catch (匹配Exception ex) 
{
    父异常类名 异常处理语句组； 
}
[ finally
{ 
    必定(即使try return)会被执行异常处理语句组：用于释放资源，不能捕获异常
}]
```

catch:0~n, finally:可选项（无论是否有break/return，都会被执行多遍）

-   更好的形式

```java
try
{
    try
    {
        code that might throw exceptions{};
    }
    finally
    {
        in.close();
    }
}
catch (IOException e)
{
    show error message{};
    throw exception{};
    throw new exception{};
}
```

-   常用catch处理语句

```java
System.out.println(“Error” + e);
System.out,println(“Cause” + e.getCause());
throw e;
throw new Exception(String)/(String, e); 
```

#### 重抛异常

-   将当前捕获的异常再次抛出：throw e;
-   重新生成并抛出一个新异常(沿调用堆栈传递)
    -   hrow new Exception("some message");
    -   throw new Exception("some message"，e);
    -   将原始异常作为新异常的initCause

```java 
catch (SQLException e)
{
    Throwable se = new ServletException(“database error”);
    se.initCause(e);
    throw se;
}
```

上级便可通过se.getCause()方法得到原始异常
 
#### 关闭异常：关闭频率低/不可能发生的异常

catch语句体为空，便可关闭捕获的异常

### 记录日志

### 调试技巧

#### 使用断言

assert表达式:字符串信息
 
#### JUnit框架单元测试

import static org.JUnit.Assert.*

为每个类构置一个main方法进行单元测试

#### 日志代理

Logger.getGlobal().info(" ……" + targetVariableName);

#### Throwable.printStackTrace();

#### GUI调试
 
## 泛型

### 泛型类

自定义类型  Class Person<T> {}

### 泛型方法

自定义方法  [修饰符] <T> T PeronMethod(Param) {}

### 泛型变量T

<T extends SuperClass & Interface>

类型变量用“，”分隔，限定类型用“&”分隔(一个父类+多个接口)

```java
<T extends Comparable & Serializable>
```

### 泛型代码

翻译关键：擦除类型参数，用Object/限定类型代换

-   虚拟机中没有泛型
-   多态性：合成桥方法
-   类型安全性：必要时插入强制类型转换

### 使用限制

-   T类型变量：不可为基本类型，必须为引用类型
-   类型查询(getClass()/instanceof)：返回原始类型(如Person)，不返回T类型
-   不可创建参数化类型的数组(如Person<T>[])
-   不可实例化类型变量(如new T()、new T[])
-   不可在静态域/方法中引用类型变量(如private static T variableName)
-   泛型类不可扩展Throwable及其子类(因此泛型类不可被抛出/捕获)

### 通配符类型

```java
<? extends SuperClass>
<? super SubClass>
```

### 反射与泛型
 
## 集合

### 集合接口

#### Collection接口：泛型接口

##### AbstractCollection类：实现Collection接口

将size和iterator抽象化，将contains、toString具体化

##### 迭代器：泛型接口

-   工作位置: 迭代器位于两元素间
-   工作机制
    -   previos方法：迭代器越过前一元素，并将该元素的引用作为返回值
    -   next方法：迭代器越过下一元素，并将该元素的引用作为返回值
-   工作方法
    -   add方法：将新元素的引用插入至迭代器当前位置
    -   remove方法：与previos/next相互依赖，删除前一次越过元素(不可连续调用remove方法)
    -   next->( remove )->next->remove
-   使用原则
    -   给容器附加多个只读迭代器，单独附加唯一一个读写迭代器
    -   并发修改检测: 只检测结构性改变(改变长度),不检测数值性改变(如set方法)

##### Iterable接口：泛型接口

任何实现了Iterable接口及其子接口(如Collection接口)的对象都可使用for each循环

```java
public interface Iterable<E>
{
    Iterator<E> iterator();
}
```
 
#### Queue接口与Deque接口

Deque extends Queue extends Collection)
 
### 具体集合
 
#### 数组列表(ArrayList implements List)

-   随机访问：利用索引值访问元素
-   get/set(int Index)方法：效率高

#### 链表(LinkedList implements List，Deque)

-   非随机存取：必须从头/尾开始遍历链表访问元素
-   E get(int Index)方法：效率极低

ListIterator:

-   add方法：依赖于迭代器位置
-   remove方法：依赖于迭代器状态
-   previousIndex方法：返回迭代器前一元素的整数索引
-   nextIndex方法：返回迭代器后一元素的整数索引
 
#### 散列集

HashSet implements Set：无序无重复元素集，基于HashTable

-   散列表：列表/链表数组(多个列表/链表)，每个列表/链表成为桶(bucket)
    -   元素的桶的整数索引：元素散列码mod桶的总数(余数)
    -   桶数：预计元素个数的75%~150% e.g 标准类库桶数为2的n次方，默认值16
    -   散列冲突(hash collision)：目标桶已满
    -   再散列(rehashed)：创建大通数(如双倍桶数)的新散列表，丢弃原散列表
    -   装填因子(load factor)：再散列时机决定因素，一般为0.75(75%桶中含有至少一个元素)
    -   hash值：return (key.hashCode() & 0x7fffffff) % M;
-   方法
    -   add：先查找对象存在性，不存在则添加元素
    -   contains：重写方法
-   散列集迭代器：依次访问所有桶
 
#### 树集

TreeSet implements SortedSet，NavigableSet：有序集
 
#### 比较接口

##### Comparable接口：泛型接口

```java
// A<B负值，A==B零，A>B正值(B代表other)
public interface Comparable<T>
{
    int compareTo(T other);
} 
```

##### Comparator接口(比较器)：泛型接口

```java
// A<B负值，A==B零，A>B正值
public interface Comparator<T>
{
    int compare(T a, T b);
}

SortedSet<Item> setSortedByName = new TreeSet<>(Comparetor comp)；//实现比较器的类
```
 
#### 队列

-   双端队列: ArrayDeque类与LinkedList类
-   优先级队列: PriorityQueue类, 未对所有元素进行排序
    -   add和remove方法: 引用最小元素
 
#### 映射表

实现Map接口，未实现Collection接口

-   散列/比较函数只作用于键key
-   添加/删除/检索对象时，必须提供键key
-   键key具有唯一性

### 集合框架
 
RandomAccess接口：标记接口，无任何方法，标记一个集合是否支持高效的随机访问

### 集合算法	
 
### 早期集合
    
## 线程

### 线程基础

线程：分享CPU、共享内存(多个线程访问同一数据/对象)

线程一般用于需长时间执行的任务：循环、下载、浏览图片
 
### 线程状态
 
#### new

创建线程的方法：

-   父类:继承Thread类，重写run方法
-   接口:new Thread(Runnable Task)实现Runnable接口的类：实名类/匿名类/Lambda表达式

#### runnable            

thread.start() 线程处于可运行状态：可能在运行，可能不在运行，不必始终保持运行

#### blocked/waiting/timed waiting：不活动状态 

##### blocked

获取锁不得时，进入阻塞状态

##### waiting

等待调度器时，进入等待状态

##### timed waiting

调用含超时参数的方法时，进入计时等待状态保持到超时或通知

Object.wait、Thread.sleep、Thread.join、Lock.tryLock、Condition.await

#### terminated

run方法正常退出或抛出未捕获异常时，进入(自然/意外)死亡状态
 
### 线程属性

#### 优先级：默认情况下继承父线程的优先级

-   需防止低优先级线程被饿死(因此不要依赖优先级进行编程)
-   MIN_PRIORITY(1)~NORM_PRIORITY(5)~MAX_PRIORITY(10)
-   每当线程调度器选择新线程时,首选具有较高优先级的线程
 
#### Thread.setDaemon(true)

设置为后台线程：随时可能中断

虚拟机会在只有后台线程时退出,后台线程不可访问固有资源(文件、数据库等)
 
#### 未捕获异常的处理器

实现Thread.UncaughtExceptionHandler接口

不安装默认处理器时,默认处理器为空
 
### 中断线程

#### Interrupt方法

对一个线程调用此方法时,线程将进入中断状态 

#### InterruptedException

对一个阻塞线程(调用sleep/wait方法等)调用interrupt方法时，抛出此异常
 
#### 处理InterruptedException
 
### 线程同步

两个线程都有多个语句，无法保证一个线程所有语句全部执行完再调用另一个线程,必然会出现交错调用不同线程中的语句现象，导致调用混乱现象

#### 锁对象(实例域)

可重复(持有计数)，可共用(共用锁对象的方法可互相调用)
  
#### 条件对象(实例域)

管理有锁却不能正常工作的线程

一个锁对象可以有多个相关的条件对象
 
#### 内部锁：synchronized关键字

每个对象都有一个内部锁，可将静态方法声明为synchronized

等价于  wait/notifyAll

等价于  await/signalAll
 
#### 截获内部锁
 
#### 读写锁
 
#### 监视器
 
#### volatile关键字:修饰实例域

声明一个域可并发更新,通知编译器和虚拟器注意此特性

#### 死锁

所有线程处于等待或阻塞状态

e.g. 两个线程互相等待状态

#### ThreadLocal辅助类
 
### 线程安全

java.util.concurrent并发API：线程安全(同时只有一个线程调用某对象)

#### 原子整数

```java
AtomicInteger.getAndIncrement();     //cnt++;
AtomicInteger.getAndDecrement();    //cnt—
AtomicBoolead、AtomicLong、AtomicReference类
```

#### 线程安全集合

-   阻塞队列
-   高效映射表、队列
-   写数组列表和写数组集的拷贝 - CopyOnWriteArrayList类、CopyOnWriteArraySet类
-   同步包装器(synchronization wrapper) - 任何集合类通过同步包装器变成线程安全集合类
 
### 异步计算
 
### 执行器

线程池：创建大量生命周期短的线程
 
-   CachedThreadPool：提交任务多，创建新线程
-   FixedThreadPool：提交任务多，等待当前任务完成再运行其他任务 
-   SingleThreadExecutor：逐一执行提交任务
-   ScheduledExecutorServiec接口：预定执行/重复执行任务

以上工厂方法返回：实现ExecutorService接口的ThreadPoolExecutor对象

-   创建

```java
ExecutorService pool = Executors.newCachedThreadPool();
```

-   方法

```
pool.execute(myTask);    pool.shutdown();
````

-   Future对象用于查询任务完成情况
 
### 同步器

### 线程与Swing:事件分配线程

事件分配线程不应进行input/output/sleep调用(可能使线程阻塞)
 
-   Timer类(亦是线程)：每隔一段时间重复执行MyTask
-   更新图形化界面：SwingUtilites.invokeLater(Runnable MyTask);

```java
EventQueue.invokeLater(new Runnable()
{
public void run()
{
    Statements;
}
});
```

-   指定布局(Layout)

以下可合成一个方法: 
-   创建组件(Component)
-   添加组件(getContentPane.add(Component)  //得到Container类) 
-   响应事件(Event)
-   设置属性(size、location、bounds、locationByPlatform、title、iconImage、visible、resizable、undecorated、extendedState)


```java
// 取得点击按钮的名字
String itemName = ((JRadioButton) e.getSource()).getText();  
//Source：事件源(点击按钮事件)
```

## Self-Defined Class

@override:
-   euqals
-   hashCode
-   toString
-   Comparable(compareTo)
-   Cloneable(clone)

## 常用工具类

-   java.lang             Java语言的核心类库
-   java.util              实用工具 
-   java.io               标准输入/输出类库
-   java.awt/javax.swing   图形用户界面(GUI)的类库 
-   java.net              网络功能的类库
-   java.sql              数据库访问的类库 
-   java.io               输入输出流

## 输入与输出

### 输入

-   InputStream类：read(字节)
-   Reader类：read(char)

### 输出

-   OutputStream类：write、flush、close
-   Writer类：write(char,String)、flush、close 

## 正则表达式

### 基本写法

([字符]){数量}\位置

### matcher.group(int)

0表示整个正则表达式，i表示第i个圆括号
