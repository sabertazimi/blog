---
layout:     post
title:      "C++ Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - C
    - C++
---

* [C++ Basic Notes](#c-basic-notes)
	* [Basic Workflow](#basic-workflow)
		* [初始化与回收](#初始化与回收)
	* [变量](#变量)
		* [指针](#指针)
		* [reference (引用类型)](#reference-引用类型)
			* [性质](#性质)
			* [作为函数参数](#作为函数参数)
			* [特性](#特性)
		* [volatile 类型](#volatile-类型)
	* [运算符](#运算符)
		* [左/右值运算符(运算结果为左/右值)](#左右值运算符运算结果为左右值)
		* [sizeof](#sizeof)
	* [Expression (表达式)](#expression-表达式)
		* [左/右值表达式](#左右值表达式)
	* [联合(union)](#联合union)
		* [位段](#位段)
	* [函数](#函数)
		* [参数的默认值(defalut)](#参数的默认值defalut)
		* [内联函数(inline)](#内联函数inline)
	* [类](#类)
		* [访问控制权限](#访问控制权限)
		* [构造函数](#构造函数)
			* [调用形式](#调用形式)
			* [构造函数体](#构造函数体)
			* [默认无参构造函数](#默认无参构造函数)
			* [构造顺序](#构造顺序)
			* [深拷贝构造函数](#深拷贝构造函数)
		* [析构函数](#析构函数)
		* [构造与析构(重点)(P148)](#构造与析构重点p148)
			* [派生树](#派生树)
		* [`new` 与 `delete`/`delete []`](#new-与-deletedelete-)
			* [stack 与 heap](#stack-与-heap)
			* [指针成员](#指针成员)
		* [this 指针](#this-指针)
		* [成员指针 与 指针成员](#成员指针-与-指针成员)
			* [成员指针 - 指向成员的指针](#成员指针---指向成员的指针)
			* [定义含指针成员的类](#定义含指针成员的类)
		* [函数成员](#函数成员)
			* [const/volatile 关键字](#constvolatile-关键字)
			* [mutable 关键字](#mutable-关键字)
		* [静态成员](#静态成员)
			* [静态数据成员](#静态数据成员)
				* [特性](#特性-1)
				* [定义](#定义)
			* [静态函数成员](#静态函数成员)
				* [引用形式](#引用形式)
				* [特性](#特性-2)
			* [静态成员指针](#静态成员指针)
			* [static 关键字](#static-关键字)
		* [友元](#友元)
			* [成员友元函数](#成员友元函数)
		* [单继承](#单继承)
			* [派生控制权限](#派生控制权限)
			* [父类与子类(public 派生控制权)](#父类与子类public-派生控制权)
		* [虚函数](#虚函数)
			* [特性](#特性-3)
			* [功能](#功能)
			* [纯虚函数 与 抽象类](#纯虚函数-与-抽象类)
			* [易错点](#易错点)
	* [作用域(Scope)](#作用域scope)
		* [面向过程的作用域](#面向过程的作用域)
		* [面向对象的作用域](#面向对象的作用域)
			* [命名空间(namespace)](#命名空间namespace)
	* [运算符重载](#运算符重载)
		* [重载原则](#重载原则)
		* [++/--](#--)
		* [->](#-)
		* [=](#)
		* [强制类型转换(P172)](#强制类型转换p172)
	* [模板](#模板)
		* [调用形式](#调用形式-1)
	* [异常](#异常)
		* [异常对象的析构](#异常对象的析构)
	* [多态](#多态)
	* [STL](#stl)
		* [Container](#container)
		* [Methods](#methods)
			* [empty/size](#emptysize)
			* [assign/insert/erase](#assigninserterase)
			* [erase/remove](#eraseremove)
			* [reserve/swap](#reserveswap)
	* [Awesome Tips / Best Practice](#awesome-tips--best-practice)
	* [Exercise](#exercise)
		* [静态成员](#静态成员-1)
		* [友元函数](#友元函数)
		* [单继承](#单继承-1)
			* [构造与析构](#构造与析构)
		* [虚函数](#虚函数-1)
		* [Error](#error)
		* [Inherits Output](#inherits-output)

# C++ Basic Notes

## Basic Workflow

### 初始化与回收

*   Treat global program as a object: 开工函数与收工函数
*   Normal Object: 构造函数与析构函数

## 变量

const 变量 代替 #define 宏定义

### 指针

*   只读指针可赋值为 普通对象地址
*   普通指针不可赋值为 只读对象地址

```cpp
int *p = const int;         // x
int *p = int;               // o
const int *p = const int;   // o
const int *p = int;         // o
```

### reference (引用类型)

#### 性质

引用类型(&)实质上是一种语法糖,编译器将引用变量最终全部编译为指针变量

#### 作为函数参数

向函数传递引用类型实参时,若:

*   实参与形参类型不一致(**必须完全一致**)
*   实参为(右)值表达式

则会生成一个内部匿名变量,用于函数调用. 此时,对参数进行的操作将**无法改变实参原有值**,使得 call by reference 失效.

#### 特性

*   普通全局引用变量必须在定义时初始化初始化(左值表达式)

```cpp
int &x = 1;   // warning: 引用匿名变量
int &k = j++; // warning: 引用匿名变量
```

*   引用变量不分配存储单元: 不能引用 引用变量, 不能作为指针所指对象, 不能作为数组元素

```cpp
int & &x;       // error
int & *p;       // error
int & s[4];     // error
```

*   引用变量的值按字节(指针/地址)编码: 不能引用位段(无法按字节编码)

```cpp
int &w = a.j; // error
```

*   引用变量不能引用引用变量, 只能引用另一个引用变量所引用的变量/地址

```cpp
int x = 10;
int &j = x;
int &&m = j;  // error
int &m = j;   // pass: m = j => x
```

*   引用变量可以引用 register 变量, 编译器会将其自动转为 auto 变量(为其分配地址)

```cpp
register int i = 0,
register int &j = i;
```

*   引用变量在一定程度上具有指针性质

```cpp
int x = 1;
const int &p = x;   // pass

x = 7;  // pass
p = 7;  // error
```

### volatile 类型

*   volatile 表示可被其他线程/进程改变的变量
*   volatile 变量常作为全局变量, 用于同步各进程
*   const 表示不可被本线程/进程修改的变量

```cpp
volatile int x;

x = 3;

if (4 == x) {
    cout << "X changed by other routines.";
}
```

## 运算符

### 左/右值运算符(运算结果为左/右值)

*   左值运算符: 前置++/--, =/+=/*=/&=/op=
*   右值运算符: 强制类型转换(不可对其运算结果进行取地址), +/*/binary

### sizeof

```cpp
sizeof 数值
sizeof(数值)
sizeof(类型)

sizeof(printf("abcd")); // 无输出
```

## Expression (表达式)

### 左/右值表达式

左值表达式一定可作(右)值表达式, (右)值表达式不可作左值表达式:

*   左值表达式  : 变量, 赋值表达式, 前缀自操作表达式, 返回值为引用类型的函数调用

```cpp
bar;
y = 6;
i -= 10;
++i;

int &f(void);
f() = j;
```

*   (右)值表达式: 常量, 强制类型转换表达式, 后缀自操作表达式, 算数表达式

```cpp
20;
(type)x;
i++;
y + 2;
```

## 联合(union)

匿名联合具有以下性质:

*   没有对象的全局匿名联合必须 static
*   只可定义 public 成员
*   数据成员与联合本身作用域相同
*   数据成员共享存储空间

### 位段

class/struct/union 都可定义位段成员, 但类型必须为 char/short/int/enum, 不可为 long/float/array/class

## 函数

### 参数的默认值(defalut)

-   不能在 **函数原型声明** 与 **函数定义** 中 **同时** 定义参数的默认值,会产生默认值冲突
-   所有缺省参数必须位于参数列表右边
-   不能用前一个参数初始化后一个参数
-   当同时有 `int g(void)` `int g(int x = 1)` 时, 不能调用 g() (具有二义性)

```cpp
int bar(int x , int y = 5, int z = m(u,v));
int foo(int x, int y = x++);    // error
```

### 内联函数(inline)

以下情况会造成内联失败:

*   内联函数中使用 分支/循环/开关/函数调用
*   内联函数定义出现在调用后面(先调用后定义)
*   其他函数访问了内联函数入口地址
*   内联函数定义为(纯)虚函数

内联最终结果:

*   内联成功后, 原函数会被编译器清除
*   不管内联是否成功, 内联函数作用域局限于当前源文件
*   全局 extern main 函数不能定义为内联函数(否则会使得主函数作用域变小, 操作系统无法访问主函数)
*   在类体内实现的任何函数自动变为内联函数

## 类

### 访问控制权限

public > protected > private + friend > private

### 构造函数

#### 调用形式

构造函数不可被显式调用(类前缀), 必须隐式调用(省略类前缀)

#### 构造函数体

*   构造函数体前: 初始化只读成员、引用成员、对象成员、其他数据成员, 初始化顺序以**定义顺序**为准, **无关构造函数体前出现顺序**
*   构造函数体内: 再次赋值其他数据成员(不可再次只读成员、引用成员、对象成员)

#### 默认无参构造函数

*   当定义了含参构造函数后, 编译器将不会再为对象自动添加无参构造函数
*   默认无参构造函数不会初始化只读/引用成员, 且只会调用对象成员的无参构造函数(若对象成员没有无参构造函数,则编译器报错)
*   对于局部对象, 将随机初始化普通数据成员; 对于全局对象, 将普通数据成员初始化为0. 由于默认无参构造函数的存在, 当对象只含有普通数据成员(无只读/引用/指针成员, 且对象成员有无参构造函数), 可以不显式定义构造函数

```cpp
class Foo {
    const int b;
    int c, &d, e, f;
    String g, h;

public:
    // 初始化顺序: b, c, d, e, f, g, h
    Foo(int bar): d(c), c(bar), g(bar), b(bar), e(bar) {
        c += bar;
        f = bar;
    }
};
```

```cpp
B z(7, 8); => B z(7, 8);    ///< 2 参
B z = (7, 8); => B z(8);    ///< 1 参
```

#### 构造顺序

*    同一派生树上所有虚基类(自左向右, 自下向上)(递归)
*    (继承顺序)直接基类(递归)
*    (定义顺序)所有成员
*    构造函数体

#### 深拷贝构造函数

*   形式为 Foo:Foo(Foo &obj) 的构造函数,可使得对象作为实参传递时自动进行深拷贝复制

```cpp
ARRAY::ARRAY(ARRAY &r) {
    p = new int[size = r.size];

    for (int i = 0;i < size; i++) {
        p[i] = r.p[i];
    }
}
```

### 析构函数

*   析构函数即可显式调用,又可隐式调用
*   析构函数与全局 main 函数 没有重载函数
*   作用域结束时会自动调用析构函数
*   调用 exit/abort 时, 需手动调用析构函数释放资源

```cpp
String x("global");

int main(void) {
    short error = 0;
    String y("local");

    // set error flag
    switch (error) {
        case 0:
            return;
        case 1:
            y.~String();
            exit(1);
        default:
            x.~String();
            y.~String();
            abort();
    }

    return 0;
}
```

-   设置 **析构标志** 防止重复析构同一对象

```cpp
String::~String() {
    // check flag
    if (s == NULL) {
        return;
    }

    cout<<"Deconstruct:"<<s;

    free(s);

    // set flag
    s = NULL;
}
```

### 构造与析构(重点)(P148)

*   按定义顺序自左下至右上地构造**所有**虚基类
*   按定义顺序构造直接基类
*   按定义顺序构造数据成员(对象/const/引用/普通成员)
*   执行类构造函数体
*   递归执行以上过程

#### 派生树

*   一个对象/对象成员一颗单独的派生树
*   单独的派生树中, 合并同名虚基类, 不合并同名基类, 并 { name(type), ...} 标示数据成员


### `new` 与 `delete`/`delete []`

#### stack 与 heap

*   string str("sabertazimi") 创建在栈上, 自动析构
*   new/malloc 返回堆指针, delete/free 的对象是**堆指针**/**(&引用变量)**, 完全由程序员管理创建与回收

```cpp
int x = 5;
int *p = &x;
int &q = x;

delete p;   // address of x
delete &q;  // address of x
```

#### 指针成员

*   普通指针/不含指针成员的对象变量分配/回收内存可**混用** malloc/new/free/delete/delete []
*   创建/回收含有**指针成员**的类时,只能用 new/delete/delete [](分配对象内存+调用构造/析构函数), 不能用 malloc/free(只作用于对象本身,不调用构造/析构函数,即不为指针成员分配/回收内存), 否则会造成**指针成员**未分配内存/内存泄露
*   new 对象数组实质: malloc 对象 + 调用对象无参构造函数

### this 指针

普通函数成员比**静态函数**成员多一个隐含参数 this 指针, 其会随着函数类型的不同而改变类型

*   this 指针指向对象起始地址处(对象首成员地址)
*   一般函数: `class_type *const this;`
*   const 函数: `const class_type *const this;`, 可以修改 this 所指对象的**非只读静态数据成员**
*   volatile 函数: `volatile class_type *const this;`
*   当 this 指针类型不同时, 亦会**产生重载函数**

### 成员指针 与 指针成员

#### 成员指针 - 指向成员的指针

*   成员指针**不是地址**, 而是**偏移量**
*   考虑到越界问题,成员指针不可移动
*   成员指针不可进行类型转换, 不可将其转换为其他类型, 也不可将其他类型转换为它
*   作用: 成员别名 `(a.*pf)() => a.size()`
*   优先级: . > * > .*(结合性: 自左向右)

```cc
int A::*pi = &A::i;         ///< 数据成员指针
int (A::*pf)(void) = &A::f;     ///< 函数成员指针

long x = a.*pi;     ///< x = a.*pi = a.*(&A::i) = a.A::i = a.i;
x = (a.*pf)();      ///< x = (a.*pf)() = (a.*(&A::f))() = (a.A::f)() = a.f()

pi++, pf+=1;        ///< Error: 成员指针不可移动
x = (long)pi;       ///< Error: pi 不能转换为 long int
```

#### 定义含指针成员的类

-   深拷贝构造函数: T(const T &)
-   深拷贝赋值运算函数: virtual T& operator=(const T &)
-   虚析构函数: virtual ~T()   
-   定义`T &p = *new T()`后, 使用`delete &p`释放内存
-   定义`T *p = new T()`后, 使用`delete p`释放内存

### 函数成员

#### const/volatile 关键字

*   修饰函数成员隐含参数 * this 对象指针,表示不可修改/挥发对象
*   被修饰函数成员不能修改对象自身(即对象的**普通数据成员**), 可以修改对象的**非只读静态**数据成员
*   构造函数/析构函数不可被 const/volatile 修饰: 在构造/析构函数中, 对象必须可以被修改(No const), 且处于稳定状态(No volatile)

#### mutable 关键字

*   mutable 不可修饰引用成员
*   mutable 成员不可用 const/volatile/static 修饰
*   const 函数中可以修改 mutable 成员

### 静态成员

#### 静态数据成员

##### 特性

*   静态数据成员脱离对象实例存在 `Person::totalNum`
*   静态数据成员存储单元不属于任何对象实例

##### 定义

*   不能在**构造函数/析构函数**中**创建/释放**静态数据成员的存储单元
*   在类体内声明静态数据成员, 在类体外定义并初始化静态数据成员  `List * List::head = NULL;`(包括**私有**静态数据成员)
*   **局部类/union 类不可定义静态数据成员, 局部类/union 类可以定义静态函数成员**

#### 静态函数成员

*   静态函数成员不含隐含参数(this 对象指针)
*   构造/析构/virtual/const/volatile 函数(均有 this 对象指针)不能定义为静态函数成员
*   体内实现为 inline 函数, 体外实现不能有 static 关键字

##### 引用形式

*   抽象类型 `List::sort()`
*   对象实例 `list.sort()`

##### 特性

*   只能直接修改当前对象静态数据成员
*   可以通过静态函数成员的函数参数, 传入对象实例指针, 从而间接修改非静态数据成员

#### 静态成员指针

除了具有访问权限外, 静态成员指针就是普通指针(可以进行指针加减运算)

```cpp
int *d = &CROWD::number;
int (*f)() = &CROWD::getnumber;
```

#### static 关键字

*   位于 class 体内: 表示该成员/方法共享存储单元(不限定作用域)
*   位于 class 体外: 表示该变量/函数具有静态存储周期(限定作用域为当前文件)

### 友元

*   在重载函数中, (函数签名不一致的) 未声明的函数只能访问类的共有成员
*   friend 声明不能与存储类型关键字共用(static/virtual)
*   定义友元函数(使用 friend 修饰函数声明)时: 友元函数**不是此处**的函数成员, 可随意指定 返回类型与访问控制权限

#### 成员友元函数

可在 3 处实现函数体:

*   函数定义处(本类): 内联函数成员
*   友元声明处(它类): 内联友元函数(作用域局限于**当前程序文件**)
*   类体外(**不使用 friend 关键字**)

### 单继承

#### 派生控制权限

*   降低/维持权限
*   class 缺省为 private 派生控制, struct 缺省为 public 派生控制
*   只可恢复至基类原权限, 不可随意修改基类成员权限

#### 父类与子类(public 派生控制权)

*   子类对象地址可以赋值给父类指针, 子类指针可以直接赋值给父类指针
*   父类对象地址不可以赋值给子类指针, 父类指针即使强制类型转换后也不可以赋值给子类指针

### 虚函数

#### 特性

*   无限传递性: 派生类中原型相同的函数自动成为虚函数
*   具有隐式参数(this 对象指针): 不能为静态函数成员(静态函数无 this 参数)/非函数成员(本类友元函数), 可以为它类成员友元函数
*   构造函数不能为虚函数, 析构函数可以为虚函数
*   virtual 与 friend/static 关键字不可共用
*   union 既不能定义基类也不能定义派生类, 故不能在 union 中定义虚函数

#### 功能

实现运行时多态. 最好将普通函数成员**全部**定义为 虚函数

#### 纯虚函数 与 抽象类

*   纯虚函数具有虚函数的所有特性
*   具有纯虚函数的类自动成为抽象类

```cc
struct A {
    virtual void f1() = 0;
    virtual void f2() = 0;
};
```

#### 易错点

*   virtual 关键字只能在 struct/class 体内使用, 在体外实现相应函数成员时, 应**去掉** virtual 关键字
*   当在**函数成员**中调用虚函数时, 会根据 this 所指真实对象动态调用虚函数(如在基类函数成员中调用虚函数, 可能实际调用的是子类的虚函数)
*   使用**基类指针/基类引用**指向派生类时, 只可按**基类访问控制权限**调用**基类**拥有的方法
*   不可以**new 抽象类(堆实例)/构造抽象类的栈实例**, 函数参数/返回值不可直接定义为抽象类(调用时无法构造栈实例), 但可以定义为**抽象类的引用/指针**

```cpp
Parent *p = new Child(5);
p->~Child();    // Error: method not defined
p->~Parent();   // Success: invoke Child::~Child()
```

## 作用域(Scope)

*   标识符的作用域越小,访问的优先级别越高
*   单目运算符 `::` 可访问全局符号  e.g `::process++ // 自加全局变量 process`

### 面向过程的作用域

*   作用于表达式内
*   作用于函数内
*   作用于程序文件内
*   作用于整个程序

### 面向对象的作用域

*   作用于**函数成员**内
*   作用于**类/派生类**内
*   作用于**基类**内
*   作用于**虚基类**内

#### 命名空间(namespace)

*   指定一个完全的命名空间时, 不会将任何标识符加入当前作用域. 可**重新定义**同名局部符号

```cpp
namespace A {
    int a = 0;
    namespace B {
        int a = 0;
    }
    namespace C {

    }
    namespace D {

    }
    using namespace B;
    using namespace C;
}

using namespace A;
int a = 5;      ///< Right: 全局变量 a 与 A中的a 同名
```

*   指定一个命名空间的具体成员时, 会将成员符号加入当前作用域

```cpp
namespace A {
    float a = 0,
          b = 0;
    float d(float y) {
        return y;
    }
}

namespace B {
    void g(void) {
        cout<<"B\n">>;
    }
}

int main(void) {
    using A::a;
    using A::d;
    using B::g;

    long a = 1;     ///< Error: a 已被加入当前 main 函数作用域(A::a), 不可重复定义
    a = d(2.1);     ///< Right: A::a = A::d(2.1);

    return 0;
}
```

*   可以为嵌套命名空间定义别名

```cpp
namespace A {
    namespace B {
        namespace C {
            int k = 4;
        }
    }
}

namespace ABCD = A::B::C;

using ABCD::k;      ///< refer to A::B::C::k
```

## 运算符重载

|运算符|重载方式|
|:---------------:|:--------------------:|
|sizeof  .  .*  ::  ?:|不可重载|
|=  ->  () []|(必须有 this 指针)普通函数成员|
|new delete|(不可有 this 指针)静态函数成员 普通函数|
|其他运算符|普通函数成员 普通函数|

### 重载原则

*   若运算符为左值运算符, 则重载返回类型为非 const 引用类型
*   若运算符为非左值运算符, 则重载返回类型为普通类型(栈内存)或 const 类型
*   重载为普通函数成员, this 占据第一个参数位置
*   重载不改变运算符的优先级与结合性

### ++/--

```cpp
A &A::operator++();     ///< 前置++
A A::operator++(int);   ///< 后置++, int 参数只起区分作用
```

### ->

只能重载为普通函数成员, 只有一个参数(+ this), 返回类型必须为指针/引用类型

```cpp
struct A {
    int a;
};

class B {
    A x;
public:
    A *operator->() {
        return &x;
    }
};

int main(void) {
    B b;
    int i = b->a;               // i = b.x.a
    i = (*b.operator->()).a;    // i = b.x.a
    i = b.operator->()->a;      // i = b.x.a
}
```

### =

*   所有对象都有默认的 = 重载: 浅拷贝赋值运算

### 强制类型转换(P172)

*   当定义只有一个参数的构造函数时, 进行运算时会自动发生类型转换(利用右值调用此构造函数, 生成中间变量赋给左值)

```cpp
Complex m;
m + 2 => m + 2.0 => m + Complex(2.0);
```

## 模板

### 调用形式

-   函数标签相同的覆盖函数
-   通过函数模板自动生成可匹配参数的实例函数
-   通过强制类型转换,调用已经手动生成的可匹配参数的实例函数
-   调用失败

## 异常

### 异常对象的析构

catch (const A *a) 形式

## 多态

*   编译时多态(重载): 静态绑定(同名不同参的)重载函数 - 一个方法, 多种参数(f(void) => f@, f(int) => f@i, f(int, int) => f@ii)
*   运行时多态(多态): 动态绑定(upcasting)虚函数 - 一个接口, 多个方法(父子表现不同, 兄弟表现不同)

```cpp
Parent c = new Child();
c.speak("Hello World!") // => "Child: Hello World!"
```

## STL

*   工作方式: copy in, copy out

### Container

*   序列容器: vector string deque list
*   关联容器: set multiset map multimap
*   连续内存容器: vector string deque
*   链表容器: list slit hash

### Methods

#### empty/size

list.empty() 优于 list.size() == 0

#### assign/insert/erase

```cpp
void container::insert(InputIterator begin, InputIterator end);
void container::insert(iterator position, InputIterator begin, InputIterator end);

iterator container::erase(iterator begin, iterator end);    // 序列容器
void container::erase(iterator begin, iterator end);        // 关联容器

void container::assign(InputIterator begin, InputIterator end);
```

```cpp
v1.assign(v2.begin() + v2.size() / 2, v2.end());
v1.insert(v1.end(), v2.begin() + v2.size() / 2, v2.end())   // 将 v2 一半元素插入 v1 尾部
```

#### erase/remove

*   对于连续内存容器 vector/string/deque:

```cpp
c.erase(remove(c.begin(), c.end(), 1963), c.end())

bool badValue(int);
c.erase(remove_if(c.begin(), c.end(), badValue), c.end());
```

*   对于 list:

```cpp
c.remove(1963)

bool badValue(int);
c.remove_if(badValue);  // higher order function
```

*   对于关联容器:

```cpp
c.erase(1963);
```

#### reserve/swap

```cpp
v.reserve(1000);    // 强制分配 1000 个元素内存单元, 防止反复回收/释放, 提高执行效率

string(s).swap(s);  // 回收多余内存单元(shrink to fit), 提高内存利用率
```

## Awesome Tips / Best Practice

*   普通函数成员 与 析构函数 全部定义为虚函数
*   不改变对象实例的函数 全部定义为 const 函数
*   被改变参数/返回值 全部定义为 引用类型
*   深拷贝(赋值)函数参数/返回值 全部定义为 引用类型
*   函数(传值)参数全部定义为 const & 类型: 既减少值的多余复制, 又保证原值不会被误修改

## Exercise

### 静态成员

*   静态函数成员只能直接修改当前对象静态数据成员, 可以通过传参修改参数的普通数据成员
*   静态函数成员体内实现为 inline 函数, 体外实现不能有 static 关键字
*   不能在**构造函数/析构函数**中 创建/释放 静态数据成员的存储单元
*   在类体内声明静态数据成员, 在类体外定义并初始化静态数据成员  `List * List::head = NULL;`(**包括私有静态数据成员**)
*   **局部类/union 类不可定义静态数据成员, 局部类/union 类可以定义静态函数成员**

### 友元函数

*   定义友元函数(使用 friend 修饰函数声明)时: 友元函数**不是此处**的函数成员, 可随意指定 返回类型与访问控制权限

### 单继承

*   只可恢复至基类原权限, 不可随意修改基类成员权限
*   子类对象地址可以赋值给父类指针, 子类指针可以直接赋值给父类指针
*   父类对象地址不可以赋值给子类指针, 父类指针即使强制类型转换后也不可以赋值给子类指针

#### 构造与析构

*   构造函数体前: 初始化只读成员、引用成员、对象成员、其他数据成员, 初始化顺序以**定义顺序**为准, **无关构造函数体前出现顺序**
*   构造函数体内: 再次赋值其他数据成员(不可再次只读成员、引用成员、对象成员)
*   当定义了含参构造函数后, 编译器将不会再为对象自动添加无参构造函数
*   默认无参构造函数不会初始化只读/引用成员, 且只会调用对象成员的无参构造函数(若对象成员没有无参构造函数,则编译器报错)

### 虚函数

*   virtual 关键字只能在 struct/class 体内使用, 在体外实现相应函数成员时, 应**去掉** virtual 关键字
*   当在**函数成员**中调用虚函数时, 会根据 this 所指真实对象动态调用虚函数(如在父类函数成员中调用虚函数, 可能实际调用的是子类的虚函数)
*   使用**基类指针/基类引用**指向派生类时, 只可按**基类访问控制权限**调用**基类**拥有的方法
*   不可以**new 抽象类(堆实例)/构造抽象类的栈实例**, 函数参数/返回值不可直接定义为抽象类(调用时无法构造栈实例), 但可以定义为**抽象类的引用/指针**

### Error

*   class 体内声明为 friend/static/virtual 方法, class 体外实现时**不加 friend/static/virtual 关键字**
*   const/static 使用错误

```cpp
static int x;
A(x++, y++);　// 若 A 中改变x, 会使得 x++ 无效化
```

*   不可以**new 抽象类(堆实例)/构造抽象类的栈实例**, 函数参数/返回值不可直接定义为抽象类(调用时无法构造栈实例), 但可以定义为**抽象类的引用/指针**
*   返回类型不匹配错误
*   初始化构造函数不存在(基类定义有参构造函数, 派生类必须显示调用父类构造函数)错误
*   引用/const/对象成员初始化错误
*   访问控制权限错误(e.g 在全局声明一个只有私有构造函数的类实例)
*   派生控制权限错误(只可恢复原先权限, 不可任意修改父类成员权限)
*   运算符重载分类错误(不可重载, 只可重载为...)
*   成员指针与普通指针(静态成员指针)的混用错误
*   单参数构造函数与强制类型转换重载函数在表达式中的隐式调用错误
*   指针不可指向引用等引用类型的特性错误
    *   引用变量不分配存储单元: 不能引用 引用变量, 不能作为指针所指对象, 不能作为数组元素
    *   引用变量的值按字节(指针/地址)编码: 不能引用位段(无法按字节编码)
    *   引用变量不能引用引用变量, 只能引用另一个引用变量所引用的变量/地址
    *   引用变量可以引用 register 变量, 编译器会将其自动转为 auto 变量(为其分配地址)

### Inherits Output

*   每一行输出都为新的派生树(拥有独立的虚基类)
*   每个对象成员都为新的派生树(拥有独立的虚基类)
