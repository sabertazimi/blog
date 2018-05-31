---
layout:     post
title:      "Haskell Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Functional Programming
    - Haskell
---

* [Haskell Basic Notes](#haskell-basic-notes)
	* [Platform](#platform)
		* [ghci](#ghci)
		* [ghc](#ghc)
	* [Unique Mark](#unique-mark)
		* [:+](#)
		* [_](#-1)
		* [<-](#-)
		* [=>](#-2)
		* [->](#--1)
	* [Expression](#expression)
	* [Type](#type)
		* [基本类型](#基本类型)
			* [Int](#int)
			* [Integer](#integer)
			* [Float](#float)
			* [Double](#double)
			* [Bool](#bool)
			* [Char](#char)
			* [`[Char]`/String](#charstring)
			* [Ordering](#ordering)
			* [Word](#word)
			* [Rational](#rational)
		* [List](#list)
			* [Operator](#operator)
			* [Function](#function)
			* [Range](#range)
			* [List Comprehension(数学定义)](#list-comprehension数学定义)
		* [Tuple(原组)](#tuple原组)
			* [内部差异性](#内部差异性)
			* [外部差异性](#外部差异性)
			* [Tuple Function](#tuple-function)
				* [二元组](#二元组)
				* [三元组](#三元组)
		* [泛型](#泛型)
		* [函数类型](#函数类型)
	* [基本语法](#基本语法)
		* [名字/函数定义](#名字函数定义)
			* [模式匹配(Pattern Matching)](#模式匹配pattern-matching)
				* [Best Practice](#best-practice)
				* [常用模式](#常用模式)
					* [as模式](#as模式)
					* [List](#list-1)
					* [Tuple](#tuple)
			* [guard模式 与 where绑定](#guard模式-与-where绑定)
			* [let绑定](#let绑定)
			* [case表达式](#case表达式)
	* [Typeclass](#typeclass)
		* [=>符号](#符号)
		* [Basic Typeclass](#basic-typeclass)
			* [Eq](#eq)
			* [Ord](#ord)
			* [Show](#show)
			* [Read](#read)
			* [Enum](#enum)
			* [Bounded](#bounded)
			* [Num](#num)
			* [Integral](#integral)
			* [Floating](#floating)
			* [*Functor*](#functor)
			* [Control.Applicative](#controlapplicative)
				* [Maybe](#maybe)
				* [`[]`](#-3)
				* [IO](#io)
				* [ZipList](#ziplist)
				* [多个 functors](#多个-functors)
				* [高度封装函数: *liftA2*](#高度封装函数-lifta2)
			* [Control.Monad](#controlmonad)
				* [Maybe Monad](#maybe-monad)
					* [实现](#实现)
					* [do 表示法](#do-表示法)
				* [List Monad](#list-monad)
				* [MonadPlus](#monadplus)
				* [Monad Algorithms](#monad-algorithms)
					* [马走日](#马走日)
			* [Foldable](#foldable)
			* [Data.Monoid](#datamonoid)
		* [自定义Typeclass](#自定义typeclass)
		* [`data` type](#data-type)
			* [函数特性](#函数特性)
			* [记录语法(Record Syntax)](#记录语法record-syntax)
			* [类型参数(Type Parameters)](#类型参数type-parameters)
				* [Maybe value constructor](#maybe-value-constructor)
			* [Deriving(派生)](#deriving派生)
			* [type定义](#type定义)
			* [高级数据结构](#高级数据结构)
				* [栈](#栈)
				* [链表](#链表)
				* [二叉树](#二叉树)
	* [函数](#函数)
		* [递归函数](#递归函数)
			* [List](#list-2)
		* [高阶函数](#高阶函数)
			* [Curry化](#curry化)
			* [map函数](#map函数)
			* [filter函数](#filter函数)
			* [fold函数与scan函数](#fold函数与scan函数)
			* [lambda表达式](#lambda表达式)
			* [$函数](#函数-1)
			* [.函数与 Function composition(函数组合)](#函数与-function-composition函数组合)
		* [常用函数](#常用函数)
			* [无参函数](#无参函数)
			* [前缀函数](#前缀函数)
			* [中缀函数](#中缀函数)
				* [+](#-4)
				* [++](#-5)
				* [:](#-6)
				* [!!](#-7)
			* [数学函数](#数学函数)
				* [System.Random](#systemrandom)
			* [数字函数](#数字函数)
	* [模块](#模块)
		* [import](#import)
		* [建立模块](#建立模块)
			* [单一模块](#单一模块)
			* [子模块](#子模块)
		* [常用基础模块](#常用基础模块)
			* [Data.List](#datalist)
				* [修正Prelude模块](#修正prelude模块)
			* [Data.Char](#datachar)
			* [Data.Map](#datamap)
			* [Data.Set](#dataset)
	* [输入与输出](#输入与输出)
		* [IO action](#io-action)
			* [return](#return)
		* [Command Line](#command-line)
		* [BtyeString](#btyestring)
		* [常用输入输出函数](#常用输入输出函数)
			* [输出](#输出)
				* [putChar/putStr/putStrLn](#putcharputstrputstrln)
				* [print](#print)
				* [File/System.IO](#filesystemio)
					* [writeFile](#writefile)
					* [appendFile](#appendfile)
			* [输入](#输入)
				* [getChar :: IO Char](#getchar--io-char)
				* [getContents](#getcontents)
				* [File](#file)
					* [handle](#handle)
					* [withFile](#withfile)
					* [readFile](#readfile)
			* [Action](#action)
				* [when](#when)
				* [sequence](#sequence)
				* [mapM mapM_ Control.Monad.forM](#mapm-mapm_-controlmonadform)
				* [Control.Monad.forever](#controlmonadforever)
				* [hSetBuffering](#hsetbuffering)
				* [hFlush](#hflush)
			* [Other](#other)
				* [lines](#lines)
				* [interact](#interact)
				* [System.Directory - removeFile/renameFile](#systemdirectory---removefilerenamefile)
	* [异常](#异常)
		* [catch](#catch)
	* [Advanced Monad](#advanced-monad)
		* [Writer Monad](#writer-monad)
			* [Control.Monad.Writer](#controlmonadwriter)
		* [Reader Monad](#reader-monad)
		* [State Monad](#state-monad)
			* [Control.Monad.State](#controlmonadstate)
			* [Control.Monad.State (MonadState)](#controlmonadstate-monadstate)
			* [实例](#实例)
		* [Error Monad](#error-monad)
		* [Useful Monad Functions](#useful-monad-functions)
			* [liftM](#liftm)
			* [join](#join)
			* [filterM](#filterm)
			* [foldM](#foldm)
			* [`<=<`(组合函数)](#组合函数)
		* [Self-Defined Monad](#self-defined-monad)
	* [注释](#注释)
		* [符号](#符号-1)

# Haskell Basic Notes

函数式编程语言的一般思路：先取一个初始的集合并将其变形，执行过滤条件，最终取得正确的结果。

## Platform

```shell
apt-get install haskell-Platform
apt-get install ghc-mod
atom plugins : language-haskell autocomplete-haskell ide-haskell haskell-ghc-mod
```

### ghci

-   :l - load file
-   :r - reload file
-   :cd
-   :edit - $EDITOR
-   :m - module
-   :q - quit
-   :?
-   :k - kind
-   :t - type function
-   :info - data/Typeclass

### ghc

`runghc *.hs/*.lhs`

## Unique Mark

### :+

复数符 - 2 :+ 3 -> 2+3i

### _

泛匹配符: 表示不关心此部分具体内容

### <-

属于符号,用于ListRange中.

### =>

类型约束分隔符

### ->

## Expression

if语句也是表达式

```haskell
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1
```

## Type

### 基本类型

```haskell
ghci> :t 'a'
'a' :: Char

ghci> :t True
True :: Bool

ghci> :t "HELLO!"
"HELLO!" :: [Char]

ghci> :t (True, 'a')
(True, 'a') :: (Bool, Char)
```

#### Int

有限整数

#### Integer

无限整数(效率低)

#### Float

单精度浮点数

#### Double

双精度浮点数

#### Bool

True/False

#### Char

#### `[Char]`/String

#### Ordering

LT,GT,EQ

#### Word

Data.Word - unsigned int

#### Rational

有理数类型,用于高精度数学运算

### List

#### Operator

-   ++
-   :
-   !!
-   \>/</==

#### Function

-   head List 首元素
-   last List 尾元素
-   init List 除去尾元素的部分
-   tail List 除去首元素的部分

-   length List 长度

*Tips*:

```haskell
fromIntegral (length [1,2,3,4]) + 3.2
```

-   null List BestPractice: 检查一个 List 是否为空

```haskell
ghci> null [1,2,3]
False
ghci> null []
True
```

-   reverse List 反转
-   take num List 返回List前num个元素组成的List

```haskell
ghci> take 3 [5,4,3,2,1]
[5,4,3]
ghci> take 5 [1,2]
[1,2]
ghci> take 0 [6,6,6]
[]
```

-   drop num List 删除List前num个元素

```haskell
ghci> drop 3 [8,4,2,1,5,6]
[1,5,6]
ghci> drop 0 [1,2,3,4]
[1,2,3,4]
ghci> drop 100 [1,2,3,4]
[]
```

-   maximum List 返回最大元素
-   minimun List 返回最小元素

-   sum List 返回List元素和
-   product List 返回List元素积

-   elem ``elem`` List 判断元素存在性

```haskell
ghci> 4 `elem` [3,4,5,6]
True
ghci> 10 `elem` [3,4,5,6]
False
```

-   cycle List  返回循环无限数组(*Haskell惰性特性*)
-   repeat Elem 返回循环无限数组(*Haskell惰性特性*)
-   replicate num Elem 返回循环无限数组

```haskell
take 10 (cycle [1,2,3]) -> [1,2,3,1,2,3,1,2,3,1]
take 10 (repeat 5)      -> [5,5,5,5,5,5,5,5,5,5]
replicate 3 10          -> [10,10,10]
```

-   takeWhile :: (a -> Bool) -> `[a]` -> `[a]`  遇到不符合限制条件的元素便停止遍历List

```haskell
ghci> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
166650
```

#### Range

三要素: , 与 ..

-   上限
-   下限
-   步长(*仅可标明一次*)

```haskell
上下限: [1..20]
步长为2: [2,4..20]
步长为13无限List: [13,26..]
take 24 [13,26..]

```

#### List Comprehension(数学定义)

由类似集合定义的离散数学定义,来定义复杂的List:

**`[expression | filter]`**

**`[expression | x <\- Range, Predicate(断言/限制条件)]`**

-   Range: `,`分隔多个Range(一般为List)
-   Predicate: `,`分隔多个断言;每个断言均为Boolean表达式

```haskell
ghci> [x*2 | x <- [1..10], x*2 >= 12]
[12,14,16,18,20]

ghci> [ x | x <- [50..100], x `mod` 7 == 3]
[52,59,66,73,80,87,94]


boomBangs xs = [ if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]

ghci> boomBangs [7..13]
["BOOM!","BOOM!","BANG!","BANG!"]
```

-   多个Range


```haskell
ghci> [ x*y | x <- [2,5,10], y <- [8,10,11]]
[16,20,22,40,50,55,80,100,110]
```

-   嵌套Comprehension

```haskell
ghci> let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]

ghci> [ [ x | x <- xs, even x ] | xs <- xxs]
[[2,2,4],[2,4,6,8],[2,4,2,6,2,6]]
```

### Tuple(原组)

#### 内部差异性

-   同一Tuple里可存放不同Type的项

#### 外部差异性

-   数目不同或某项不同的Tuple属于不同Type
	-   不可置于同一List中
	-   不同长度的Tuple不可比较(比较符只可用于相同Type)

#### Tuple Function

##### 二元组

fst/snd tuple 返回首项/尾项

zip List1 List2 对应项配对,组成二元组List

```haskell
ghci> zip [5,3,2,6,2,7,2,5,4,6,6] ["im","a","turtle"]
[(5,"im"),(3,"a"),(2,"turtle")]

ghci> zip [1..] ["apple", "orange", "cherry", "mango"]
[(1,"apple"),(2,"orange"),(3,"cherry"),(4,"mango")]
```

##### 三元组

```haskell
first :: (a, b, c) -> a
first (x, _, _) = x

second :: (a, b, c) -> b
second (_, y, _) = y

third :: (a, b, c) -> c
third (_, _, z) = z
```

### 泛型

运用Type变量(只可为*单字符*),实现泛型参数与多态函数

借助 Typeclass 可轻松实现多态函数

```haskell
ghci> :t head
head :: [a] -> a

-- a 和 b 可为同类型
-- 第一个参数与返回值必须同类型
ghci> :t fst
fst :: (a, b) -> a

-- 所有参数必须同类型,且必须为Num成员
ghci> :t (*)
(*) :: (Num a) => a -> a -> a
```

### 函数类型

-   单个参数

```haskell
removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
```

-   多个参数

```haskell
addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z
```

## 基本语法

### 名字/函数定义

#### 模式匹配(Pattern Matching)

当函数拥有多个函数体(模式)时,会从上至下进行匹配各模式,一旦匹配则只应用这一函数体.

##### Best Practice

-   代替if-else/switch语句
-   递归算法(将递归基础作为首模式,递归函数体作为尾模式)
-   List Range中亦可使用模式匹配

```haskell
addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)
```

##### 常用模式

###### as模式

all@(pattern) - all为指向pattern整体的引用

```haskell
all@(x:y:xs) -- 其中all与(x:y:xs)等价
```

```haskell
capital :: String -> String
capital "" = "Empty string, whoops!"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]
```

###### List

-   x:xs
-   x:y:z:xs

```haskell
head' :: [a] -> a
head' [] = error "Can't call head on an empty list, dummy!"
head' (x:_) = x
```

```haskell
length' :: (Num b) => [a] -> b
length' [] = 0
length' (_:xs) = 1 + length' xs
```

```haskell
sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs
```

###### Tuple

-   (x, y)
-   (x, y, z)

#### guard模式 与 where绑定

子模式匹配: 运用布尔表达式实现判断,应用对应函数体

-   关键符号: | 与 where
-   |     分隔函数体
-   where
    -   可见性: 定义只对本模式可见的(私有)名字与(私有)函数
    -   where定义在最外层,使得各模式共享(私有)名字与(私有)函数
    -   名字定义时可使用模式匹配  `where (head:_) = firstname`

```haskell
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= skinny = "You're underweight, you emo, you!"
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"
    | otherwise     = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2
          skinny = 18.5
          normal = 25.0
          fat = 30.0
```

#### let绑定

类似where,绑定对象为表达式/函数

```haskell
let bindings
in  expressions
```

```haskell
let sideArea = 2 * pi * r * h
    topArea = pi * r ^2
in  sideArea + 2 * topArea
```

-   可见性:in作用域,只对本guard可见
-   可使用模式匹配
-   可用于List Range中

#### case表达式

-   模式匹配是case表达式的特殊情况(语法糖:简化写法)
-   在函数中,模式匹配只能用于参数定义中,而case表达式可用于其他地方(let/where绑定 普通表达式 guard语句)

```haskell
case expression of pattern -> result
                   pattern -> result
                   pattern -> result
                   ...
```

```haskell
describeList :: [a] -> String
describeList xs = "The list is " ++ case xs of [] -> "empty."
                                               [x] -> "a singleton list."
                                               xs -> "a longer list."
```

## Typeclass

```haskell
ghci> :t (==)
(==) :: (Eq a) => a -> a -> Bool

ghci> :t fromIntegral
fromIntegral :: (Integral a, Num b) => a -> b
```

### =>符号

=>左部: 类约束(Class Constraint)
=>右部: 函数类型(参数/返回值类型),其中参数类型同属Class

### Basic Typeclass

> ghci> :info typeClassName

#### Eq

-   功能: 成员类型可判断相等性
-   成员: 大部分基本类型(不包含函数类型)
-   方法: == 与 /= 函数

```haskell
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x == y = not (x /= y)
    x /= y = not (x == y)
```

#### Ord

Ord成员必为Eq成员: class (Eq a) => Ord a where

-   功能: 成员类型可排序
-   成员: 大部分基本类型(不包含函数类型)
-   方法:
    -   < > <= >= 函数
    -   compare函数 (Ord a) => a -> a -> Ordering

#### Show

-   功能: 成员类型可用字符串表示
-   成员: 大部分基本类型(不包含函数类型)
-   方法: show函数 (Show a) => a -> String

*Tips*: 结合Read, 可用于字符串与数值之间的转化

#### Read

-   功能: 可以将字串转为Read某成员类型
-   成员: 大部分基本类型(不包含函数类型)
-   方法: read函数 (Read a) => String -> a

*Tips*: 结合Show, 可用于字符串与数值之间的转化

#### Enum

-   功能: 连续性(可枚举), 其成员类型可用于*Range*中
-   成员: () Bool Char Ordering Int Integer Float Double

```haskell
[Thursday .. Sunday]
```

```haskell
ghci> succ Monday
Tuesday
ghci> pred Saturday
Friday
```

#### Bounded

-   功能: 成员类型具有上下限
-   方法: minBound/maxBound函数 (Bounded a) => a *无参多态常量/定义*

```haskell
ghci> minBound :: Day
Monday
ghci> maxBound :: Day
Sunday
```

#### Num

-   功能: 成员类型具有数字特征
-   成员: 实数 整数 - Int Integer Float Double
-   方法: + - * abs 函数
-   实例: 所有数字都是多态常量/定义(可视为函数)

```haskell
ghci> :t 20
20 :: (Num t) => t
```

#### Integral

-   功能: 成员类型具有数字特征
-   成员: 整型 - Int Integer

#### Floating

-   功能: 成员类型具有数字特征
-   成员: 浮点型 - Float Double

|typeclass|method feature|
|:----------:|:--------------------:|
|Functor|f a + (a -> b) -> f b|
|Applicative|f a + f (a -> b) -> f b|
|Monad|m a + (a -> m b) -> m b|

#### *Functor*

-   成员: Maybe a, [], Either a, IO
    -   成员kind必须为 `* -> *`
	-   f *一元类型构造符(type constructor)*
-   必须遵守准则:
    -   fmap id = id
	-   fmap (f . g) F = fmap f (fmap g F)

```haskell
ghci> :info Functor
class Functor (f :: * -> *) where
    fmap :: (a -> b) -> f a -> f b
    ($) :: a -> f b -> f a
```

```haskell
instance Functor [] where
    fmap = map

instance Functor Maybe where
    fmap f (Just x) = Just (f x)
    fmap f Nothing = Nothing

instance Functor (Either a) where
    fmap f (Right x) = Right (f x)
    fmap f (Left x) = Left x

instance Functor IO where
    fmap f action = do
        result <- action
        return (f result)
```

#### Control.Applicative

-   成员: f :: `* -> *` *一元类型构造符(type constructor)*
-   <*>: 参数为 2 个 functor 实例,其中一个包含一个函数

```haskell
(<$>) :: (Functor f) => (a -> b) -> f a -> f b
f <$> x = fmap f x
```

-   作用: 可以用单一一个函数操作多个 functors

```haskell
class (Functor f) => Applicative f where
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b
```

##### Maybe

```haskell
instance Applicative Maybe where
    pure = Just
    Nothing <*> _ = Nothing
    (Just f) <*> something = fmap f something
```

##### `[]`

```haskell
instance Applicative [] where
    pure x = [x]
    fs <*> xs = [f x | f <- fs, x <- xs]
```

##### IO

```haskell
instance Applicative IO where
    pure = return
    a <*> b = do
        f <- a
        x <- b
        return (f x)
```

##### ZipList

```haskell
instance Applicative ZipList where
        pure x = ZipList (repeat x)
        ZipList fs <*> ZipList xs = ZipList (zipWith (\f x -> f x) fs xs)
```

##### 多个 functors

```haskell
ghci> pure (+) <*> Just 3 <*> Just 5
Just 8
ghci> pure (+) <*> Just 3 <*> Nothing
Nothing
ghci> pure (+) <*> Nothing <*> Just 5
Nothing
```

```haskell
ghci> (*) <$> [2,5,10] <*> [8,10,11]
[16,20,22,40,50,55,80,100,110]
```

```haskell
myAction :: IO String
myAction = (++) <$> getLine <*> getLine
```

```haskell
ghci> getZipList $ max <$> ZipList [1,2,3,4,5,3] <*> ZipList [5,3,1,2]
[5,3,3,4]
```

##### 高度封装函数: *liftA2*

对两个 applicatives 运用二元函数

```haskell
liftA2 :: (Applicative f) => (a -> b -> c) -> f a -> f b -> f c
liftA2 f a b = f <$> a <*> b

ghci> liftA2 (:) (Just 3) (Just [4])
Just [3,4]
ghci> (:) <$> Just 3 <*> Just [4]
Just [3,4]
```

#### Control.Monad

-   成员: 类型构造符(type constructor)

```haskell
class Monad m where
    return :: a -> m a

{- bind -}(>>=) :: m a -> (a -> m b) -> m b

    (>>) :: m a -> m b -> m b
    x >> y = x >>= \_ -> y

    fail :: String -> m a
    fail msg = error msg
```

-   特性: 允许返回值之间具有弹性交互

```haskell
{- 当出现异常后,之后所有的值都变为Nothing -}
ghci> return (0,0) >>= landRight 2 >>= landLeft 2 >>= landRight 2
Just (2,4)
ghci> return (0,0) >>= landLeft 1 >>= landRight 4 >>= landLeft (-1) >>= landRight (-2)
Nothing
```

-   Monad Laws:
	-   return 满足 Left identity: `retrun x >>= f 等于 f x`
	-   return 满足 right identity: `m >>= return 等于 m`
	-   Associativity: 结合律 `(m >>= f) >>= g 等于 m >>= (\x -> f x >>= g) `

```haskell
ghci> return 3 >>= (\x -> Just (x+100000))
Just 100003
ghci> (\x -> Just (x+100000)) 3
Just 100003

ghci> Just "move on up" >>= (\x -> return x)
Just "move on up"
ghci> [1,2,3,4] >>= (\x -> return x)
[1,2,3,4]
ghci> putStrLn "Wah!" >>= (\x -> return x)
Wah!

{-Tips: 利用结合律合并两个 Monadic Function-}
(<=<) :: (Monad m) => (b -> m c) -> (a -> m b) -> (a -> m c)
f <=< g = (\x -> g x >>= f)
ghci> let f x = [x,-x]
ghci> let g x = [x*3,x*2]
ghci> let h = f <=< g
ghci> h 3
[9,-9,6,-6]
```

##### Maybe Monad

具有失败可能性的context封装,灵活处理异常(返回值为Nothing)

###### 实现

```haskell
applyMaybe :: Maybe a -> (a -> Maybe b) -> Maybe b
applyMaybe Nothing f  = Nothing
applyMaybe (Just x) f = f x
```

```haskell
instance Monad Maybe where
    return x = Just x
    Nothing >>= f = Nothing
    Just x >>= f  = f x
    fail _ = Nothing
```

###### do 表示法

-   在 do expression 中，每一行都是一个 monadic value
-   检查返回值，使用 <-

```haskell
foo :: Maybe String
foo = do
    x <- Just 3
    y <- Just "!"
    Just (show x ++ y)

foo :: Maybe String
foo = Just 3   >>= (\x ->
      Just "!" >>= (\y ->
      Just (show x ++ y)))

routine :: Maybe Pole
routine = do
    start <- return (0,0)
    first <- landLeft 2 start
    Nothing
    second <- landRight 2 first
    landLeft 1 second
```

##### List Monad

-   non-detetminism(不确定性)

```haskell
ghci> (*) <$> [1,2,3] <*> [10,100,1000]
[10,100,1000,20,200,2000,30,300,3000]
```

-   实现

```haskell
instance Monad [] where
    return x = [x]
    xs >>= f = concat (map f xs)
    fail _ = []
```

-   返回值交互: 下例中 n 与 return (n, ch) 进行交互
    -   list comprehension 与 do 表示法 均是 >>= 的语法糖
	-   list comprehension: <- 与 条件表达式
	-   do 表示法: <- 与 guard函数

```haskell
ghci> [1,2] >>= \n -> ['a','b'] >>= \ch -> return (n,ch)
[(1,'a'),(1,'b'),(2,'a'),(2,'b')]

{- do 表示法 -}
listOfTuples :: [(Int,Char)]
listOfTuples = do
    n <- [1,2]
    ch <- ['a','b']
    return (n,ch)

sevensOnly :: [Int]
sevensOnly = do
    x <- [1..50]
    guard ('7' `elem` show x)
    return x

{- list comprehension -}
ghci> [ (n,ch) | n <- [1,2], ch <- ['a','b'] ]
[(1,'a'),(1,'b'),(2,'a'),(2,'b')]
```

##### MonadPlus

使Monad具有Monoid的性质(二元封闭运算)

```haskell
instance MonadPlus [] where
    mzero = []
    mplus = (++)
```

##### Monad Algorithms

###### 马走日

-   计算出可移动位置

```haskell
moveKnight :: KnightPos -> [KnightPos]
moveKnight (c,r) = do
    (c',r') <- [(c+2,r-1),(c+2,r+1),(c-2,r-1),(c-2,r+1)
                ,(c+1,r-2),(c+1,r+2),(c-1,r-2),(c-1,r+2)
                ]
    guard (c' `elem` [1..8] && r' `elem` [1..8])
    return (c',r')
```

-   利用 >>= 向后传递多个可交互的位置

```haskell
in3 start = return start >>= moveKnight >>= moveKnight >>= moveKnight

in3 :: KnightPos -> [KnightPos]
in3 start = do
    first <- moveKnight start
    second <- moveKnight first
    moveKnight second
```

-   最后完成完整函数: 产生所有三步的可能位置，检查其中一个位置是否在里面

```haskell
canReachIn3 :: KnightPos -> KnightPos -> Bool
canReachIn3 start end = end `elem` in3 start
```

#### Foldable

```haskell
import qualified Data.Foldable as F

foldMap :: (Monoid m, Foldable t) => (a -> m) -> t a -> m
```

```haskell
instance F.Foldable Tree where
    foldMap f Empty = mempty
    foldMap f (Node x l r) = F.foldMap f l `mappend`
                                f x           `mappend`
                                F.foldMap f r
```

#### Data.Monoid

-   成员: 必须为具体类型(*不可是类型构造符(type constructor))
-   准则(Monoid Law):
    -   *结合律* a·(b·c) = (a·b)·c
    -   无需满足 a `mappend` b == b `mappend` a

```haskell
class Monoid m where
    mempty :: m             -- identity
    mappend :: m -> m -> m
    mconcat :: [m] -> m
    mconcat = foldr mappend mempty
```

-   实例

```haskell
instance Monoid [a] where
    mempty = []
    mappend = (++)
```

```haskell
newtype Product a =  Product { getProduct :: a }
    deriving (Eq, Ord, Read, Show, Bounded)

instance Num a => Monoid (Product a) where
    mempty = Product 1
    Product x `mappend` Product y = Product (x * y)

ghci> getProduct $ Product 3 `mappend` Product 4 `mappend` Product 2
24
```

```haskell
newtype Any = Any { getAny :: Bool }
    deriving (Eq, Ord, Read, Show, Bounded)

instance Monoid Any where
    mempty = Any False
    Any x `mappend` Any y = Any (x || y)

ghci> getAny . mconcat . map Any $ [False, False, False, True]
True
```

```haskell
newtype All = All { getAll :: Bool }
    deriving (Eq, Ord, Read, Show, Bounded)

instance Monoid All where
    mempty = All True
    All x `mappend` All y = All (x && y)

ghci> getAll . mconcat . map All $ [True, True, False]
False
```

```haskell
instance Monoid Ordering where
    mempty = EQ
    LT `mappend` _ = LT
    EQ `mappend` y = y
    GT `mappend` _ = GT

-- Tips:
-- mappend 在左边不等于 EQ 的情况下都会回传左边的值。相反地则回传右边的值
-- 可代替多个 if/else 语句
import Data.Monoid

lengthCompare :: String -> String -> Ordering
lengthCompare x y = (length x `compare` length y) `mappend`
                    (vowels x `compare` vowels y) `mappend`
                    (x `compare` y)
    where vowels = length . filter (`elem` "aeiou")
```

```haskell
instance Monoid a => Monoid (Maybe a) where
    mempty = Nothing
    Nothing `mappend` m = m
    m `mappend` Nothing = m
    Just m1 `mappend` Just m2 = Just (m1 `mappend` m2)

instance Monoid (First a) where
    mempty = First Nothing
    First (Just x) `mappend` _ = First (Just x)
    First Nothing `mappend` x = x

ghci> getFirst $ First (Just 'a') `mappend` First Nothing
Just 'a'
```

### 自定义 Typeclass

-   创建新类: *可以只有声明没有实现*

```haskell
class ClassName where
    defining code
```

-   创建已有类的实例: *必须实现所有已声明函数*
    -   作用等同于deriving(自由度更大)
    -   可以重写函数,去除默认函数处理,达到特定目的

```haskell
-   先创建新类型
data TrafficLight = Red | Yellow | Green

instance Eq TrafficLight where
    Red == Red = True
    Green == Green = True
    Yellow == Yellow = True
    _ == _ = False

instance Show TrafficLight where
    show Red = "Red light"
    show Yellow = "Yellow light"
    show Green = "Green light"
```

-   创建新类和实现实例时,使用class constraint
    - 可达到*类似于*继承的效果
    - 可达到限制类型的效果

```haskell
class (Eq a) => Num a where
    ...

instance (Eq m) => Eq (Maybe m) where
    Just x == Just y = x == y
    Nothing == Nothing = True
    _ == _ = False
```

### `data` type

```haskell
data SelfDefinedTypeName = ValueConstructorName ValueType .. | .. deriving (Typeclass, ..)
```

-   data范例

```haskell
data Point = Point Float Float deriving (Show)
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)
```

-   导出data

```haskell
module Shapes
( Point(..)
, Shape(..)
) where
```

-   后构造器 > 前构造器

> e.g True > False

```haskell
data Bool = False | True deriving (Ord)
```

#### 函数特性

data type也是函数,若省略参数亦会造成Curry化.

> e.g map fx list

```haskell
ghci> map (Circle 10 20) [4,5,6,6]
[Circle 10.0 20.0 4.0,Circle 10.0 20.0 5.0,Circle 10.0 20.0 6.0,Circle 10.0 20.0 6.0]
```

-   Value Constructor:使用`ValueConstructorName ValueType ..`可构造出一个该类型的定义/名字

```haskell
ghci > Circle 10 20 30
Circle 10 20 30
```

#### 记录语法(Record Syntax)

-   定义

```haskell
data Person = Person { firstName :: String
                     , lastName :: String
                     , age :: Int
                     , height :: Float
                     , phoneNumber :: String
                     , flavor :: String
                     } deriving (Show)
```

-   使用

```haskell
ghci> Car {company="Ford", model="Mustang", year=1967}
Car {company = "Ford", model = "Mustang", year = 1967}
```

#### 类型参数(Type Parameters)

提高代码的复用性

```haskell
data Car a b c = Car { company :: a
                       , model :: b
                       , year :: c
                        } deriving (Show)
```

```haskell
tellCar :: (Show a) => Car String String a -> String
tellCar (Car {company = c, model = m, year = y}) = "This " ++ c ++ " " ++ m ++ " was made in " ++ show y
```

##### Maybe value constructor

```haskell
data Maybe a = Nothing | Just a
```

-   Just可实现转化:

```haskell
Just :: a -> Maybe a
```

#### Deriving(派生)

```haskell
data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday
           deriving (Eq, Ord, Show, Read, Bounded, Enum)
```

```haskell
ghci> Wednesday
Wednesday
ghci> show Wednesday
"Wednesday"
ghci> read "Saturday" :: Day
Saturday

ghci> Saturday == Sunday
False
ghci> Saturday == Saturday
True
ghci> Saturday > Friday
True
ghci> Monday `compare` Wednesday
LT

ghci> minBound :: Day
Monday
ghci> maxBound :: Day
Sunday

ghci> succ Monday
Tuesday
ghci> pred Saturday
Friday
ghci> [Thursday .. Sunday]
[Thursday,Friday,Saturday,Sunday]

ghci> [minBound .. maxBound] :: [Day]
[Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday]
```

#### type定义

为data声明别名 - `typedef`

```haskell
type String = [Char]
type PhoneNumber = String
type Name = String
type PhoneBook = [(Name,PhoneNumber)]
```

-   type类型参数: 匹配data类型参数

```haskell
type AssocList k v = [(k,v)]

type IntMap v = Map.Map Int v
type IntMap = Map.Map Int
```

类型别名,只可以在 Haskell 的类型部分中使用:

-   定义新类型
-   类型声明
-   类型注释(::)
-   禁止: 定义名字/定义 *AssocList [(1,2),(4,5),(7,9)]*

#### 高级数据结构

##### 栈

```haskell
type Stack = [Int]

pop :: Stack -> (Int,Stack)
pop (x:xs) = (x,xs)

push :: Int -> Stack -> ((),Stack)
push a xs = ((),a:xs)
```

##### 链表

```haskell
data List a = Empty | Cons a (List a) deriving (Show, Read, Eq, Ord)
data List a = Empty | Cons { listHead :: a, listTail :: List a} deriving (Show, Read, Eq, Ord)
```

##### 二叉树

```haskell
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)
```

```haskell
singleton :: a -> Tree a
singleton x = Node x EmptyTree EmptyTree

treeInsert :: (Ord a) => a -> Tree a -> Tree a
treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right)
      | x == a = Node x left right
      | x < a  = Node a (treeInsert x left) right
      | x > a  = Node a left (treeInsert x right)

treeElem :: (Ord a) => a -> Tree a -> Bool
treeElem x EmptyTree = False
treeElem x (Node a left right)
    | x == a = True
    | x < a  = treeElem x left
    | x > a  = treeElem x right

ghci> let nums = [8,6,4,1,7,3,5]
ghci> let numsTree = foldr treeInsert EmptyTree nums
```

## 函数

### 递归函数

-   边界条件
-   递归基础
-   递归函数体

#### List

-   边界条件: 空List
-   递归函数体: x:xs 取出首元素进行一般操作,对尾部进行递归操作.

```haskell
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "maximum of empty list"
maximum' [x] = x
{-
maximum' (x:xs)
    | x > maxTail = x
    | otherwise = maxTail
    where maxTail = maximum' xs
-}
maximum' (x:xs) = max x (maximum' xs)
```

```haskell
replicate' :: (Num i, Ord i) => i -> a -> [a]
replicate' n x
    | n <= 0    = []
    | otherwise = x:replicate' (n-1) x
```

```haskell
take' :: (Num i, Ord i) => i -> [a] -> [a]
take' n _
    | n <= 0   = []
take' _ []     = []
take' n (x:xs) = x : take' (n-1) xs
```

```haskell
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]
```

```haskell
repeat' :: a -> [a]
repeat' x = x:repeat' x
```

```haskell
zip' :: [a] -> [b] -> [(a,b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y):zip' xs ys
```

```haskell
elem' :: (Eq a) => a -> [a] -> Bool
elem' a [] = False
elem' a (x:xs)
    | a == x    = True
    | otherwise = a `elem'` xs
```

*Awesome Quick Sort*

```haskell
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
  let smallerSorted = quicksort [a | a <- xs, a <= x]
      biggerSorted = quicksort [a | a <- xs, a > x]
  in smallerSorted ++ [x] ++ biggerSorted
```

### 高阶函数

#### Curry化

当传入不全参数时,会改变函数的类型,*返回值从单类型变成函数类型*.

-   当传入不全参数时:
-   compare 的类型变为 (Ord a) => a -> (a -> Ordering)

```haskell
compareWithHundred :: (Num a, Ord a) => a -> Ordering
compareWithHundred x = compare 100 x
```

-   通过给二元中缀函数传递唯一参数:
-   中缀函数类型由 a -> a -> a 转为 a -> a

```haskell
divideByTen :: (Floating a) => a -> a
divideByTen = (/10)

ghci> :t (/10)
(/10) :: (Fractional a) => a -> a
```

-   包装函数:
    -   传入一个二元函数作为参数,便可实现zipWithFunc
    -   若在定义时便传入一个函数参数,便可实现Curry化

```haskell
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys


ghci> zipWith' (+) [4,2,5,6] [2,6,2,3]
[6,8,7,9]
ghci> zipWith' max [6,3,2,1] [7,3,1,5]
[7,3,2,5]
ghci> zipWith' (++) ["foo "，"bar "，"baz "] ["fighters"，"hoppers"，"aldrin"]
["foo fighters","bar hoppers","baz aldrin"]
ghci> zipWith' (*) (replicate 5 2) [1..]
[2,4,6,8,10]
ghci> zipWith' (zipWith' (*)) [[1,2,3],[3,5,6],[2,3,4]] [[3,2,2],[3,4,5],[5,4,3]]
[[3,4,6],[9,20,30],[10,12,12]]
```

-   通过Curry化,还可省略参数

```haskell
foo a = bar b a ->
foo = bar b
```
#### map函数

映射函数 - List Comprehension的函数化

```haskell
map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs
```

-   如果map传入的函数参数的类型为 a -> a -> a,则返回的List类型为`[a -> a]`(f x传参不完全,造成了Curry化).

```haskell
ghci> let listOfFuns = map (*) [0..]
ghci> (listOfFuns !! 4) 5
20
```

```haskell
ghci> map (+3) [1,5,3,1,6]
[4,8,6,4,9]
ghci> map (++ "!") ["BIFF"，"BANG"，"POW"]
["BIFF!","BANG!","POW!"]
ghci> map (replicate 3) [3..6]
[[3,3,3],[4,4,4],[5,5,5],[6,6,6]]
ghci> map (map (^2)) [[1,2],[3,4,5,6],[7,8]]
[[1,4],[9,16,25,36],[49,64]]
ghci> map fst [(1,2),(3,5),(6,3),(2,6),(2,5)]
[1,3,6,2,2]
```

#### filter函数

过滤函数 - Comprehension的函数化

```haskell
filter :: (a -> Bool) -> [a] -> [a]
filter _ [] = []
filter p (x:xs)
    | p x       = x : filter p xs
    | otherwise = filter p xs
```

```haskell
ghci> filter (>3) [1,5,3,2,1,6,4,3,2,1]
[5,6,4]
ghci> filter (==3) [1,2,3,4,5]
[3]
ghci> filter even [1..10]
[2,4,6,8,10]
ghci> let notNull x = not (null x) in filter notNull [[1,2,3],[],[3,4,5],[2,2],[],[],[]]
[[1,2,3],[3,4,5],[2,2]]
ghci> filter (`elem` ['a'..'z']) "u LaUgH aT mE BeCaUsE I aM diFfeRent"
"uagameasadifeent"
ghci> filter (`elem` ['A'..'Z']) "i lauGh At You BecAuse u r aLL the Same"
"GAYBALLS"
```

#### fold函数与scan函数

![折叠函数](img/foldl.png)

> 如图中所示,左折叠时将acc视为第0个元素;右折叠时将acc视为最后一个元素.

-   三要素:
    -   二元函数  \acc x ->  function 或 \x acc -> function
    -   初始累加值
    -   待折叠List
-   工作原理:
    -   不断从List中取出元素,进行二元函数调用,直至List被取空
    -   调用参数分别为 新取出元素x 与 之前n次调用后的累加值acc
    -   返回值作为下次调用的累加值acc

-   左折叠函数
    -   foldl `\acc x ->`
    -   foldl1: 取List首元素作为初始累加值

```haskell
foldl :: (Foldable t) => (b -> a -> b) -> b -> t a -> b
```

```haskell
sum' :: (Num a) => [a] -> a
sum' xs = foldl (\acc x -> acc + x) 0 xs
```

-   右折叠函数
    -   foldr `\x acc ->`
    -   foldr1: 取List尾元素作为初始累加值

```haskell
foldr :: (Foldable t) => (a -> b -> b) -> b -> t a -> b
```

```haskell
map' :: (a -> b) -> [a] -> [b]
map' f xs = foldr (\x acc -> f x : acc) [] xs
```

-   更多范例

```haskell
maximum' :: (Ord a) => [a] -> a
maximum' = foldr1 (\x acc -> if x > acc then x else acc)

reverse' :: [a] -> [a]
reverse' = foldl (\acc x -> x : acc) []

product' :: (Num a) => [a] -> a
product' = foldr1 (*)

filter' :: (a -> Bool) -> [a] -> [a]
filter' p = foldr (\x acc -> if p x then x : acc else acc) []

head' :: [a] -> a
head' = foldr1 (\x _ -> x)

last' :: [a] -> a
last' = foldl1 (\_ x -> x)
```

-   scanl/scanr/scanl1/scanr1函数会将每次折叠的结果都记录在一个List中

```haskell
ghci> scanl (+) 0 [3,5,2,1]
[0,3,8,10,11]
ghci> scanr (+) 0 [3,5,2,1]
[11,8,3,1,0]
ghci> scanl1 (\acc x -> if x > acc then x else acc) [3,4,5,3,7,9,2,1]
[3,4,5,5,7,9,9,9]
ghci> scanl (flip (:)) [] [3,2,1]
[[],[3],[2,3],[1,2,3]]
```

-   逆波兰表达式

```haskell
import Data.List

solveRPN :: String -> Float
solveRPN = head . foldl foldingFunction [] . words
where   foldingFunction (x:y:ys) "*" = (x * y):ys
        foldingFunction (x:y:ys) "+" = (x + y):ys
        foldingFunction (x:y:ys) "-" = (y - x):ys
        foldingFunction (x:y:ys) "/" = (y / x):ys
        foldingFunction (x:y:ys) "^" = (y ** x):ys
        foldingFunction (x:xs) "ln" = log x:xs
        foldingFunction xs "sum" = [sum xs]
        foldingFunction xs numberString = read numberString:xs
```

#### lambda表达式

`\args -> function`

```haskell
ghci> zipWith (\a b -> (a * 30 + 3) / b) [5,4,3,2,1] [1,2,3,4,5]
[153.0,61.5,31.0,15.75,6.6]

ghci> map (\(a,b) -> a + b) [(1,2),(3,5),(6,3),(2,6),(2,5)]
[3,8,9,8,7]

flip' :: (a -> b -> c) -> b -> a -> c
flip' f = \x y -> f y x
```

#### $函数

`($) :: (a -> b) -> a -> b`

-   特性: 优先级最低,右结合
-   功能: 改变优先级,相当于在右方添加括号

```haskell
f (g (z x)) <-> f $ g $ z x
```

#### .函数与 Function composition(函数组合)

`(.) :: (b -> c) -> (a -> b) -> a -> c`

`f . g = \x -> f (g x)` - f 的参数类型必须与 g 的返回值类型相同

-   功能: 可以去除函数调用括号

```haskell
fn x = ceiling (negate (tan (cos (max 50 x))))
-> 去括号: fn x = ceiling . negate . tan . cos . max 50 x
-> Curry化: fn = ceiling . negate . tan . cos . max 50
```

-   Best Practice: 三种不同的函数写法

```haskell
oddSquareSum :: Integer
oddSquareSum = sum (takeWhile (<10000) (filter odd (map (^2) [1..])))

oddSquareSum :: Integer
oddSquareSum = sum . takeWhile (<10000) . filter odd . map (^2) $ [1..]

oddSquareSum :: Integer
oddSquareSum =
    let oddSquares = filter odd $ map (^2) [1..]
        belowLimit = takeWhile (<10000) oddSquares
    in  sum belowLimit
```

### 常用函数

#### 无参函数

“定义”(或者“名字”)

```haskell
tazimi = "It's a-me, tazimi!"
```

#### 前缀函数

```haskell
> succ 8
9
```

\`FunctionName\` - 可使前缀函数变为中缀函数

```haskell
> 92 `div` 10
9
```

#### 中缀函数

##### +

从类型定义可以看出,+左右两边参数必须为同类型

```haskell
ghci> :t (+)
(+) :: (Num a) => a -> a -> a
```

##### ++

List连接符,遍历前一List

```haskell
ghci> [1,2,3,4] ++ [9,10,11,12]
[1,2,3,4,9,10,11,12]
ghci> "hello" ++ " " ++ "world"
"hello world"
```

##### :

连接单个元素

```haskell
ghci> 'A':" SMALL CAT"
"A SMALL CAT"
ghci> 5:[1,2,3,4,5]
[5,1,2,3,4,5]
```

##### !!

引用符

```haskell
ghci> [9.4,33.2,96.2,11.2,23.25] !! 1
33.2
```

#### 数学函数

-   x `mod` y
-   `even arg`
-   `odd arg`

##### System.Random

-   `random :: (RandomGen g, Random a) => g -> (a, g)`
-    getStdGen
-    newStdGen

#### 数字函数

-   fromInteger函数  (Num a) => Integer -> a
-   fromIntegral函数 (Integral a, Num b) => a -> b

## 模块

### import

```haskell
import Data.List
import Data.List (nub，sort)
import Data.List hiding (nub)
```

```haskell
import qualified Data.Map
```

调用Map中的filter时,必须使用Data.Map.filter.

```haskell
import quelified Data.Map as M

Data.Map.filter <-> M.filter
```

### 建立模块

#### 单一模块

新建一个 ``Geometry.hs`` 的文件

```haskell
module Geometry
( sphereVolume
，sphereArea
，cubeVolume
，cubeArea
，cuboidArea
，cuboidVolume
) where

sphereVolume :: Float -> Float
sphereVolume radius = (4.0 / 3.0) * pi * (radius ^ 3)

sphereArea :: Float -> Float
sphereArea radius = 4 * pi * (radius ^ 2)

cubeVolume :: Float -> Float
cubeVolume side = cuboidVolume side side side

cubeArea :: Float -> Float
cubeArea side = cuboidArea side side side

cuboidVolume :: Float -> Float -> Float -> Float
cuboidVolume a b c = rectangleArea a b * c

cuboidArea :: Float -> Float -> Float -> Float
cuboidArea a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2

rectangleArea :: Float -> Float -> Float
rectangleArea a b = a * b
```

-   使用

```haskell
import Geometry
```

#### 子模块

把 ``Geometry`` 分成三个子模块

建立一个 ``Geometry`` 文件夹(注意*首字母*要大写),新建三个文件

-   sphere.hs

```haskell
module Geometry.Sphere
( volume
，area
) where

volume :: Float -> Float
volume radius = (4.0 / 3.0) * pi * (radius ^ 3)

area :: Float -> Float
area radius = 4 * pi * (radius ^ 2)
```

-   cuboid.hs

```haskell
module Geometry.Cuboid
( volume
，area
) where

volume :: Float -> Float -> Float -> Float
volume a b c = rectangleArea a b * c

area :: Float -> Float -> Float -> Float
area a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2

rectangleArea :: Float -> Float -> Float
rectangleArea a b = a * b
```

-   cube.hs

```haskell
module Geometry.Cube
( volume
，area
) where

import qualified Geometry.Cuboid as Cuboid

volume :: Float -> Float
volume side = Cuboid.volume side side side

area :: Float -> Float
area side = Cuboid.area side side side
```

-   使用

```haskell
import Geometry.Sphere
```

```haskell
import qualified Geometry.Sphere as Sphere
import qualified Geometry.Cuboid as Cuboid
import qualified Geometry.Cube as Cube
```

### 常用基础模块

[Learn you a haskell for great good](https://github.com/MnO2/learnyouahaskell-zh/blob/develop/zh-cn/ch07/module.md)

#### Data.List

**intersperse**

**intercalate**

**transpose**

```haskell
ghci> transpose [[1,2,3],[4,5,6],[7,8,9]]
[[1,4,7],[2,5,8],[3,6,9]]
ghci> transpose ["hey","there","guys"]
["htg","ehu","yey","rs","e"]
```

```haskell
ghci> map sum $ transpose [[0,3,5,9],[10,0,0,9],[8,5,1,-1]]
[18,8,6,17]
```

**foldl'** 和 **foldl1'** 是它们各自惰性实现的严格版本,可*防止溢出*问题.

**concat** - 移除一级嵌套

```haskell
ghci> concat ["foo","bar","car"]
"foobarcar"
ghci> concat [[3,4,5],[2,3,4],[2,1,1]]
[3,4,5,2,3,4,2,1,1]
```

**concatMap** 函数与 ``map`` 一个 List 之后再 ``concat`` 它等价

```haskell
ghci> concatMap (replicate 4) [1..3]
[1,1,1,1,2,2,2,2,3,3,3,3]
```

**and**

```haskell
ghci> and $ map (>4) [5,6,7,8]
True
ghci> and $ map (==4) [4,4,4,3,4]
False
```

**or**

```haskell
ghci> or $ map (==4) [2,3,4,5,6,1]
True
ghci> or $ map (>4) [1,2,3]
False
```

**any** 和 **all** 使用 ``any`` 或 ``all`` 会更多些

```haskell
ghci> any (==4) [2,3,5,6,1,4]
True
ghci> all (>4) [6,9,10]
True
ghci> all (`elem` ['A'..'Z']) "HEYGUYSwhatsup"
False
ghci> any (`elem` ['A'..'Z']) "HEYGUYSwhatsup"
True
```

**iterate** 取一个函数和一个值作参数。它会用该值去调用该函数并用所得的结果再次调用该函数，产生一个无限的 List.

```haskell
ghci> take 10 $ iterate (*2) 1
[1,2,4,8,16,32,64,128,256,512]
ghci> take 3 $ iterate (++ "haha") "haha"
["haha","hahahaha","hahahahahaha"]
```

**splitAt**

```haskell
ghci> splitAt 3 "heyman"
("hey","man")
ghci> splitAt 100 "heyman"
("heyman","")
ghci> splitAt (-3) "heyman"
("","heyman")
ghci> let (a,b) = splitAt 3 "foobar" in b ++ a
"barfoo"
```

**takeWhile** 一旦遇到不符合条件的某元素就停止

```haskell
ghci> takeWhile (>3) [6,5,4,3,2,1,2,3,4,5,4,3,2,1]
[6,5,4]
ghci> takeWhile (/=' ') "This is a sentence"
"This"
```

```haskell
ghci> sum $ takeWhile (<10000) $ map (^3) [1..]
53361
```

**dropWhile** 扔掉符合条件的元素。一旦限制条件返回 ``False``，它就返回 List 的余下部分

```haskell
ghci> dropWhile (/=' ') "This is a sentence"
" is a sentence"
ghci> dropWhile (<3) [1,2,2,2,3,4,5,4,3,2,1]
[3,4,5,4,3,2,1]
```

**span** - 扩展``takeWhile``

```haskell
ghci> let (fw，rest) = span (/=' ') "This is a sentence" in "First word:" ++ fw ++ "，the rest:" ++ rest
"First word: This，the rest: is a sentence"
```

**break** - 取反`span`

```haskell
ghci> break (==4) [1,2,3,4,5,6,7]
([1,2,3],[4,5,6,7])
ghci> span (/=4) [1,2,3,4,5,6,7]
([1,2,3],[4,5,6,7])
```

**sort**

```haskell
ghci> sort [8,5,3,2,1,6,4,2]
[1,2,2,3,4,5,6,8]
ghci> sort "This will be sorted soon"
" Tbdeehiillnooorssstw"
```

**group**

```haskell
ghci> group [1,1,1,1,2,2,2,2,3,3,2,2,2,5,6,7]
[[1,1,1,1],[2,2,2,2],[3,3],[2,2,2],[5],[6],[7]]
```

```haskell
ghci> map (\l@(x:xs) -> (x,length l)) . group . sort $ [1,1,1,1,2,2,2,2,3,3,2,2,2,5,6,7]
[(1,4),(2,7),(3,2),(5,1),(6,1),(7,1)]
```

**inits** 和 **tails**

```haskell
ghci> inits "w00t"
["","w","w0","w00","w00t"]
ghci> tails "w00t"
["w00t","00t","0t","t",""]
ghci> let w = "w00t" in zip (inits w) (tails w)
[("","w00t"),("w","00t"),("w0","0t"),("w00","t"),("w00t","")]
```

**isInfixOf** 从一个List中搜索一个子List

```haskell
search :: (Eq a) => [a] -> [a] -> Bool
search needle haystack =
  let nlen = length needle
  in foldl (\acc x -> if take nlen x == needle then True else acc) False (tails haystack)
```

```haskell
ghci> "cat" `isInfixOf` "im a cat burglar"
True
ghci> "Cat" `isInfixOf` "im a cat burglar"
False
ghci> "cats" `isInfixOf` "im a cat burglar"
False
```

**isPrefixOf** 与 **isSuffixOf**

```haskell
ghci> "hey" `isPrefixOf` "hey there!"
True
ghci> "hey" `isPrefixOf` "oh hey there!"
False
ghci> "there!" `isSuffixOf` "oh hey there!"
True
ghci> "there!" `isSuffixOf` "oh hey there"
False
```

**elem** 与 **notElem**

**partition**

```haskell
ghci> partition (`elem` ['A'..'Z']) "BOBsidneyMORGANeddy"
("BOBMORGAN","sidneyeddy")
ghci> partition (>3) [1,3,5,6,3,2,1,0,3,7]
([5,6,7],[1,3,3,2,1,0,3])
```
**find**

```haskell
ghci> find (>4) [1,2,3,4,5,6]
Just 5
ghci> find (>9) [1,2,3,4,5,6]
Nothing
ghci> :t find
find :: (a -> Bool) -> [a] -> Maybe a
```

**elemIndex** '可能' (Maybe)返回我们找的元素的索引,若这一元素不存在，就返回 ``Nothing``.

```haskell
ghci> :t elemIndex
elemIndex :: (Eq a) => a -> [a] -> Maybe Int
ghci> 4 `elemIndex` [1,2,3,4,5,6]
Just 3
ghci> 10 `elemIndex` [1,2,3,4,5,6]
Nothing
```

**elemIndices** 与``elemIndex``相似.

```haskell
ghci> ' ' `elemIndices` "Where are the spaces?"
[5,9,13]
```

**findIndex** 与 ``find`` 相似.
**findIndices** 返回所有符合条件的索引.

```haskell
ghci> findIndex (==4) [5,3,2,1,6,4]
Just 5
ghci> findIndex (==7) [5,3,2,1,6,4]
Nothing
ghci> findIndices (`elem` ['A'..'Z']) "Where Are The Caps?"
[0,6,10,14]
```

```haskell
ghci> zipWith3 (\x y z -> x + y + z) [1,2,3] [4,5,2,2] [2,2,3]
[7,9,8]
ghci> zip4 [2,3,3] [2,2,2] [5,5,3] [2,2,2]
[(2,2,5,2),(3,2,5,2),(3,2,3,2)]
```

在处理来自文件或其它地方的输入时，**lines** 会非常有用.

```haskell
ghci> lines "first line\nsecond line\nthird line"
["first line","second line","third line"]
```

**unlines** 是 ``lines`` 的反函数.

```haskell
ghci> unlines ["first line"，"second line"，"third line"]
"first line\nsecond line\nthird line\n"
```

**words** 和 **unwords** 可以把一个字串分为一组单词或执行相反的操作.

```haskell
ghci> words "hey these are the words in this sentence"
["hey","these","are","the","words","in","this","sentence"]
ghci> words "hey these are the words in this\nsentence"
["hey","these","are","the","words","in","this","sentence"]
ghci> unwords ["hey","there","mate"]
"hey there mate"
```

**nub** 可以将一个 List 中的重复元素全部筛掉.

```haskell
ghci> nub [1,2,3,4,3,2,1,2,3,4,3,2,1]
[1,2,3,4]
ghci> nub "Lots of words and stuff"
"Lots fwrdanu"
```

**delete**

```haskell
ghci> delete 'h' "hey there ghang!"
"ey there ghang!"
ghci> delete 'h' . delete 'h' $ "hey there ghang!"
"ey tere ghang!"
ghci> delete 'h' . delete 'h' . delete 'h' $ "hey there ghang!"
"ey tere gang!"
```

**\\** 差集

```haskell
ghci> [1..10] \\ [2,5,9]
[1,3,4,6,7,8,10]
ghci> "Im a big baby" \\ "big"
"Im a  baby"
```

**union** 并集

```haskell
ghci> "hey man" `union` "man what's up"
"hey manwt'sup"
ghci> [1..7] `union` [5..10]
[1,2,3,4,5,6,7,8,9,10]
```

**intersection** 交集

```haskell
ghci> [1..7] `intersect` [5..10]
[5,6,7]
```

**insert**

```haskell
ghci> insert 4 [1,2,3,5,6,7]
[1,2,3,4,5,6,7]
ghci> insert 'g' $ ['a'..'f'] ++ ['h'..'z']
"abcdefghijklmnopqrstuvwxyz"
ghci> insert 3 [1,2,4,3,2,1]
[1,2,3,4,3,2,1]
```

##### 修正Prelude模块

``length``，``take``，``drop``，``splitAt``，``!!`` 和 ``replicate``
``Data.List`` 中包含了更通用的替代版,如: ``genericLength，genericTake，genericDrop，genericSplitAt，genericIndex`` 和 ``genericReplicate``

``nub``, ``delete``, ``union``, ``intsect`` 和 ``group`` 函数也有各自的通用替代版 ``nubBy``，``deleteBy``，``unionBy``，``intersectBy`` 和 ``groupBy``，它们的区别就是前一组函数使用 ``(==)`` 来测试是否相等，而带 ``By`` 的那组则取一个函数作参数来判定相等性.

```haskell
ghci> let values = [-4.3，-2.4，-1.2，0.4，2.3，5.9，10.5，29.1，5.3，-2.4，-14.5，2.9，2.3]
ghci> groupBy (\x y -> (x > 0) == (y > 0)) values
[[-4.3,-2.4,-1.2],[0.4,2.3,5.9,10.5,29.1,5.3],[-2.4,-14.5],[2.9,2.3]]
```

```haskell
on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
f `on` g = \x y -> f (g x) (g y)
```

```haskell
ghci> groupBy ((==) `on` (> 0)) values
[[-4.3,-2.4,-1.2],[0.4,2.3,5.9,10.5,29.1,5.3],[-2.4,-14.5],[2.9,2.3]]
```

``sort``，``insert``，``maximum`` 和 ``min`` 都有各自的通用版本。如 ``groupBy`` 类似，**sortBy**，**insertBy**，**maximumBy** 和 **minimumBy** 都取一个函数来比较两个元素的大小.

```haskell
ghci> let xs = [[5,4,5,4,4],[1,2,3],[3,5,4,3],[],[2],[2,2]]
ghci> sortBy (compare `on` length) xs
[[],[2],[2,2],[1,2,3],[3,5,4,3],[5,4,5,4,4]]
```

#### Data.Char

-   **isControl** 判断一个字符是否是控制字符。
-   **isSpace** 判断一个字符是否是空格字符，包括空格，tab，换行符等.
-   **isLower** 判断一个字符是否为小写.
-   **isUper** 判断一个字符是否为大写。
-   **isAlpha** 判断一个字符是否为字母.
-   **isAlphaNum** 判断一个字符是否为字母或数字.
-   **isPrint** 判断一个字符是否是可打印的.
-   **isDigit** 判断一个字符是否为数字.
-   **isOctDigit** 判断一个字符是否为八进制数字.
-   **isHexDigit** 判断一个字符是否为十六进制数字.
-   **isLetter** 判断一个字符是否为字母.
-   **isMark** 判断是否为 unicode 注音字符，你如果是法国人就会经常用到的.
-   **isNumber** 判断一个字符是否为数字.
-   **isPunctuation** 判断一个字符是否为标点符号.
-   **isSymbol**判断一个字符是否为货币符号.
-   **isSeperater** 判断一个字符是否为 unicode 空格或分隔符.
-   **isAscii** 判断一个字符是否在 unicode 字母表的前 128 位。
-   **isLatin1** 判断一个字符是否在 unicode 字母表的前 256 位.
-   **isAsciiUpper** 判断一个字符是否为大写的 ascii 字符.
-   **isAsciiLower** 判断一个字符是否为小写的 ascii 字符.

```haskell
ghci> all isAlphaNum "bobby283"
True
ghci> all isAlphaNum "eddy the fish!"
False
```

```haskell
ghci> words "hey guys its me"
["hey","guys","its","me"]
ghci> groupBy ((==) `on` isSpace) "hey guys its me"
["hey"," ","guys"," ","its"," ","me"]
ghci>
```

```haskell
ghci> filter (not . any isSpace) . groupBy ((==) `on` isSpace) $ "hey guys its me"
["hey","guys","its","me"]
```

```haskell
ghci> generalCategory ' '
Space
ghci> generalCategory 'A'
UppercaseLetter
ghci> generalCategory 'a'
LowercaseLetter
ghci> generalCategory '.'
OtherPunctuation
ghci> generalCategory '9'
DecimalNumber
ghci> map generalCategory " \t\nA9?|"
[Space,Control,Control,UppercaseLetter,DecimalNumber,OtherPunctuation,MathSymbol]
```

-   **toUpper** 将一个字符转为大写字母，若该字符不是小写字母，就按原值返回.
-   **toLower** 将一个字符转为小写字母，若该字符不是大写字母，就按原值返回.
-   **toTitle** 将一个字符转为 title-case，对大多数字元而言，title-case 就是大写.
-   **digitToInt** 将一个字符转为 Int 值，而这一字符必须得在 ``'1'..'9','a'..'f'``或``'A'..'F'`` 的范围之内.

```haskell
ghci> map digitToInt "34538"
[3,4,5,3,8]
ghci> map digitToInt "FF85AB"
[15,15,8,5,10,11]
```

```haskell
ghci> intToDigit 15
'f'
ghci> intToDigit 5
'5'
```

**ord** 与 **char** 函数可以将字符与其对应的数字相互转换.

```haskell
ghci> ord 'a'
97
ghci> chr 97
'a'
ghci> map ord "abcdefgh"
[97,98,99,100,101,102,103,104]
```

```haskell
encode :: Int -> String -> String
encode shift msg =
  let ords = map ord msg
      shifted = map (+ shift) ords
  in map chr shifted
```

```haskell
decode :: Int -> String -> String
decode shift msg = encode (negate shift) msg
```

#### Data.Map

```haskell
findKey :: (Eq k) => k -> [(k,v)] -> v
findKey key xs = snd . head . filter (\(k,v) -> key == k) $ xs
```

```haskell
findKey :: (Eq k) => k -> [(k,v)] -> Maybe v
findKey key [] = Nothing
findKey key ((k,v):xs) =
     if key == k then
         Just v
     else
         findKey key xs
```

```haskell
findKey :: (Eq k) => k -> [(k,v)] -> Maybe v
findKey key = foldr (\(k,v) acc -> if key == k then Just v else acc) Nothing
```

**fromList** 取一个关联列表，返回一个与之等价的 Map。

```haskell
Map.fromList :: (Ord k) => [(k，v)] -> Map.Map k v
```

若其中存在重复的键,就将其忽略.

```haskell
ghci> Map.empty
fromList []
```

**insert**

```haskell
ghci> Map.insert 5 600 (Map.insert 4 200 ( Map.insert 3 100  Map.empty))
fromList [(3,100),(4,200),(5,600)]
ghci> Map.insert 5 600 . Map.insert 4 200 . Map.insert 3 100 $ Map.empty
fromList [(3,100),(4,200),(5,600)]
```

```haskell
fromList' :: (Ord k) => [(k,v)] -> Map.Map k v
fromList' = foldr (\(k,v) acc -> Map.insert k v acc) Map.empty
```

**null**

```haskell
ghci> Map.null Map.empty
True
```

**size**

```haskell
ghci> Map.size $ Map.fromList [(2,4),(3,3),(4,2),(5,4),(6,4)]
5
```

**singleton**

```haskell
ghci> Map.singleton 3 9
fromList [(3,9)]
ghci> Map.insert 5 9 $ Map.singleton 3 9
fromList [(3,9),(5,9)]
```

**lookup**

**member**

```haskell
ghci> Map.member 3 $ Map.fromList [(3,6),(4,3),(6,9)]
True
ghci> Map.member 3 $ Map.fromList [(2,5),(4,5)]
False
```

**map** 与 **filter** 与其对应的 ``List`` 版本相似

``toList`` 是 ``fromList`` 的反函数

```haskell
ghci> Map.toList . Map.insert 9 2 $ Map.singleton 4 3
[(4,3),(9,2)]
```

**keys** 与 **elems**

```haskell
phoneBook =
    [("betty","555-2938")
    ,("betty","342-2492")
    ,("bonnie","452-2928")
    ,("patsy","493-2928")
    ,("patsy","943-2929")
    ,("patsy","827-9162")
    ,("lucille","205-2928")
    ,("wendy","939-8282")
    ,("penny","853-2492")
    ,("penny","555-2111")
    ]
```

```haskell
phoneBookToMap :: (Ord k) => [(k, String)] -> Map.Map k String
phoneBookToMap xs = Map.fromListWith (\number1 number2 -> number1 ++ ", " ++ number2) xs
```

```haskell
ghci> Map.lookup "patsy" $ phoneBookToMap phoneBook
"827-9162, 943-2929, 493-2928"
ghci> Map.lookup "wendy" $ phoneBookToMap phoneBook
"939-8282"
ghci> Map.lookup "betty" $ phoneBookToMap phoneBook
"342-2492，555-2938"
```

```haskell
phoneBookToMap :: (Ord k) => [(k，a)] -> Map.Map k [a]
phoneBookToMap xs = Map.fromListWith (++) $ map (\(k,v) -> (k,[v])) xs
ghci> Map.lookup "patsy" $ phoneBookToMap phoneBook
["827-9162","943-2929","493-2928"]
```

在遇到重复元素时，单选最大的那个值.

```haskell
ghci> Map.fromListWith max [(2,3),(2,5),(2,100),(3,29),(3,22),(3,11),(4,22),(4,15)]
fromList [(2,100),(3,29),(4,22)]
```

将相同键的值都加在一起.

```haskell
ghci> Map.fromListWith (+) [(2,3),(2,5),(2,100),(3,29),(3,22),(3,11),(4,22),(4,15)]
fromList [(2,108),(3,62),(4,37)]
```

**insertWith**

```haskell
ghci> Map.insertWith (+) 3 100 $ Map.fromList [(3,4),(5,103),(6,339)]
fromList [(3,104),(5,103),(6,339)]
```

#### Data.Set

*内部元素排序且唯一*

```haskell
import qualified Data.Set as Set
```

**fromList**

```haskell
ghci> let set1 = Set.fromList text1
ghci> let set2 = Set.fromList text2
ghci> set1
fromList " .?AIRadefhijlmnorstuy"
ghci> set2
fromList " !Tabcdefghilmnorstuvwy"
```

```haskell
ghci> Set.intersection set1 set2
fromList " adefhilmnorstuy"
```

**difference** 差集

```haskell
ghci> Set.difference set1 set2
fromList ".?AIRj"
ghci> Set.difference set2 set1
fromList "!Tbcgvw"
```

``union`` 并集

```haskell
ghci> Set.union set1 set2
fromList " !.?AIRTabcdefghijlmnorstuvwy"
```

``null``，``size``，``member``，``empty``，``singleton``，``insert``，``delete``

```haskell
ghci> Set.null Set.empty
True
ghci> Set.null $ Set.fromList [3,4,5,5,4,3]
False
ghci> Set.size $ Set.fromList [3,4,5,3,4,5]
3
ghci> Set.singleton 9
fromList [9]
ghci> Set.insert 4 $ Set.fromList [9,3,8,1]
fromList [1,3,4,8,9]
ghci> Set.insert 8 $ Set.fromList [5..10]
fromList [5,6,7,8,9,10]
ghci> Set.delete 4 $ Set.fromList [3,4,5,4,3,4,5]
fromList [3,5]
```

```haskell
ghci> Set.fromList [2,3,4] `Set.isSubsetOf` Set.fromList [1,2,3,4,5]
True
ghci> Set.fromList [1,2,3,4,5] `Set.isSubsetOf` Set.fromList [1,2,3,4,5]
True
ghci> Set.fromList [1,2,3,4,5] `Set.isProperSubsetOf` Set.fromList [1,2,3,4,5]
False
ghci> Set.fromList [2,3,4,8] `Set.isSubsetOf` Set.fromList [1,2,3,4,5]
False
```

执行 ``map`` 和 ``filter``:

```haskell
ghci> Set.filter odd $ Set.fromList [3,4,5,6,7,2,3,4]
fromList [3,5,7]
ghci> Set.map (+1) $ Set.fromList [3,4,5,6,7,2,3,4]
fromList [3,4,5,6,7,8]
```

-   删除重复元素

```haskell
ghci> let setNub xs = Set.toList $ Set.fromList xs
ghci> setNub "HEY WHATS CRACKALACKIN"
" ACEHIKLNRSTWY"
ghci> nub "HEY WHATS CRACKALACKIN"
"HEY WATSCRKLIN"
```

## 输入与输出

### IO action

`name <- IO action`: 将action绑定至名字上,IO String -> String

```haskell
name <- getLine
name <- return String

name <- putStrLn String
```

在一个`do block`中,最后一个`action`不能绑定任何名字,它会被绑定成为`do block`的结果值.

```haskell
main = do
    foo <- putStrLn "Hello, what's your name?"
    name <- getLine
    putStrLn ("Hey " ++ name ++ ", you rock!")
```

#### return

-   return功能:将 pure value 包成 I/O actions,不会终止函数/程序
-   return作用:
    -   if condition then I/O action else I/O action
    -   改变`do block形成的I/O action`的结果值:  otherIOaction -> return pureValue

> e.g return "haha" - String -> IO String

```haskell
main = do
    line <- getLine
    if null line
        then return ()
        else do
            putStrLn $ reverseWords line
            main

reverseWords :: String -> String
reverseWords = unwords . map reverse . words
```

### Command Line

> System.Environment

-   getArgs: `getArgs :: IO [String]`
-   getProgName: `getProgName :: IO String`

```haskell
import System.Environment
import Data.List

main = do
    args <- getArgs
    progName <- getProgName
    mapM putStrLn args
    putStrLn progName
```

```haskell
import System.Environment
import System.Directory
import System.IO
import Data.List

dispatch :: [(String, [String] -> IO ())]
dispatch =  [ ("add", add)
            , ("view", view)
            , ("remove", remove)
            ]

main = do
    (command:args) <- getArgs
    let (Just action) = lookup command dispatch
    action args

add :: [String] -> IO ()
add [fileName, todoItem] = appendFile fileName (todoItem ++ "\n")

view :: [String] -> IO ()
view [fileName] = do
    contents <- readFile fileName
    let todoTasks = lines contents
        numberedTasks = zipWith (\n line -> show n ++ " - " ++ line) [0..] todoTasks
    putStr $ unlines numberedTasks

remove :: [String] -> IO ()
remove [fileName, numberString] = do
    handle <- openFile fileName ReadMode
    (tempName, tempHandle) <- openTempFile "." "temp"
    contents <- hGetContents handle
    let number = read numberString
        todoTasks = lines contents
        newTodoItems = delete (todoTasks !! number) todoTasks
    hPutStr tempHandle $ unlines newTodoItems
    hClose handle
    hClose tempHandle
    removeFile fileName
    renameFile tempName fileName
```

### BtyeString

-   `Data.ByteString`
-   `Data.ByteString.Lazy`

lazy bytestrings 像装了一堆大小为 64K 的 strict bytestrings 的 list

```haskell
import qualified Data.ByteString.Lazy as B
import qualified Data.ByteString as S
```

-   pack/unpack
-   fromChunks/toChunks
-   cons/empty/head/tail/init/null/length/map/reverse/foldl/foldr/concat/takeWhile/filter

### 常用输入输出函数

#### 输出

##### putChar/putStr/putStrLn

```haskell
putStr :: String -> IO ()
putStr [] = return ()
putStr (x:xs) = do
    putChar x
    putStr xs
```

##### print

print = putStrLn . show

##### File/System.IO

-   `hPutStr`
-   `hPutStrLn`

###### writeFile

`writefile :: FilePath -> String -> IO ()` - WriteMode, not AppendMode

###### appendFile

#### 输入

##### getChar :: IO Char

```haskell
main = do
    c <- getChar
    if c /= ' '
        then do
            putChar c
            main
        else return ()
```

##### getContents

getContents :: IO String (Lazy I/O) - 内容暂存在文件,需要使用时读取至内存区

```haskell
import Data.Char

main = do
    contents <- getContents
    putStr (map toUpper contents)
```

##### File

###### handle

-   `data IOMode = ReadMode | WriteMode | AppendMode | ReadWriteMode`
-   `openFile :: FilePath(String) -> IOMode -> IO Handle`
-   `hGetContents :: Handle -> IO String`
-   `hClose :: Handle -> IO ()`

-   `hGetChar`
-   `hGetLine`

```hasekll
import System.IO

main = do
    handle <- openFile "girlfriend.txt" ReadMode
    contents <- hGetContents handle
    putStr contents
    hClose handle
```

###### withFile

`withFile :: FilePath -> IOMode -> (Handle -> IO a) -> IO a`

```haskell
import System.IO

main = do
    withFile "girlfriend.txt" ReadMode (\handle -> do
            contents <- hGetContents handle
            putStr contents)
```

###### readFile

```haskell
contents <- readFile "girlfriend.txt"
```

#### Action

##### when

Control.Monad.when :: (Applicative f) => Bool -> f () -> f ()

`when bool表达式 I/O-Action` - 真时返回Action,假时`return ()`

```haskell
import Control.Monad

main = do
    c <- getChar
    when (c /= ' ') $ do
        putChar c
        main
```

##### sequence

sequence :: `[IO a]` -> IO `[a]`

```haskell
main = do
    rs <- sequence [getLine, getLine, getLine]
    print rs
```

##### mapM mapM_ Control.Monad.forM

= sequence . map

```haskell
ghci> mapM print [1,2,3]
1
2
3
[(),(),()]
ghci> mapM_ print [1,2,3]
1
2
3
```

##### Control.Monad.forever

接受一个 I/O action 并回传一个永远作同一件事的 I/O action

以下代码实现了循环结构:

```haskell
import Control.Monad
import Data.Char

main = forever $ do
    putStr "Give me some input: "
    l <- getLine
    putStrLn $ map toUpper l
```

##### hSetBuffering

`data BufferMode = NoBuffering | LineBuffering | BlockBuffering (Maybe Int)`
`hSetBuffering :: Handle -> BufferMode -> IO ()`

```haskell
main = do
    withFile "something.txt" ReadMode (\handle -> do
        hSetBuffering handle $ BlockBuffering (Just 2048)
        contents <- hGetContents handle
        putStr contents)
```

##### hFlush

#### Other

##### lines

`lines :: String -> [String] ` - 按换行符将段落切割成句子

##### interact

-   arguments: String -> String 的函数
-   return: 一个 I/O action
-   function: I/O action 会读取输入，调用提供的函数，然后把函数的结果打印出来

```haskell
main = interact shortLinesOnly

shortLinesOnly :: String -> String
shortLinesOnly input =
    let allLines = lines input
        shortLines = filter (\line -> length line < 10) allLines
        result = unlines shortLines
    in result
```

```haskell
main = interact $ unlines . filter ((<10) . length) . lines
```

```haskell
respondPalindromes = unlines . map (\xs ->
    if isPalindrome xs then "palindrome" else "not a palindrome") . lines
        where isPalindrome xs = xs == reverse xs
```

##### System.Directory - removeFile/renameFile

## 异常

System.IO.Error

### catch

catch :: IO a -> (IOError -> IO a) -> IO a

```haskell
import System.Environment
import System.IO
import System.IO.Error

main = toTry `catch` handler

toTry :: IO ()
toTry = do (fileName:_) <- getArgs
            contents <- readFile fileName
            putStrLn $ "The file has " ++ show (length (lines contents)) ++ " lines!"

handler :: IOError -> IO ()
handler e
    | isDoesNotExistError e = putStrLn "The file doesn't exist!"
    | isFullError e = freeSomeSpace
    | isIllegalOperation e = notifyCops
    | otherwise = ioError e
```

## Advanced Monad

### Writer Monad

Writer 可以让我们在计算的同时搜集所有 log 纪录，并汇集成一个 log 并附加在结果上

```haskell
applyLog :: (a,String) -> (a -> (b,String)) -> (b,String)
applyLog (x,log) f = let (y,newLog) = f x in (y,log ++ newLog)
```

```haskell
ghci> (30, "A freaking platoon.") `applyLog` isBigGang
(True,"A freaking platoon.Compared gang size to 9")
ghci> ("Bathcat","Got outlaw name.") `applyLog` (\x -> (length x, "Applied length"))
(7,"Got outlaw name.Applied length")
```

#### Control.Monad.Writer

```haskell
instance (Monoid w) => Monad (Writer w) where
    return x = Writer (x, mempty)
    (Writer (x,v)) >>= f = let (Writer (y, v')) = f x in Writer (y, v `mappend` v')
```

```haskell
import Control.Monad.Writer

logNumber :: Int -> Writer [String] Int
logNumber x = Writer (x, ["Got number: " ++ show x])

multWithLog :: Writer [String] Int
multWithLog = do
    a <- logNumber 3
    b <- logNumber 5
    return (a*b)
```

### Reader Monad

```haskell
instance Monad ((->) r) where
    return x = \_ -> x
    h >>= f = \w -> f (h w) w
```

### State Monad

#### Control.Monad.State

```haskell
newtype State s a = State { runState :: s -> (a,s) }

instance Monad (State s) where
    return x = State $ \s -> (x,s)
    (State h) >>= f = State $ \s -> let (a, newState) = h s
                                        (State g) = f a
                                    in  g newState
```

#### Control.Monad.State (MonadState)

```haskell
get = State $ \s -> (s,s)
put newState = State $ \s -> ((),newState)
```

#### 实例

```haskell
import Control.Monad.State

pop :: State Stack Int
pop = State $ \(x:xs) -> (x,xs)

push :: Int -> State Stack ()
push a = State $ \xs -> ((),a:xs)

stackManip :: State Stack Int
stackManip = do
  push 3
  a <- pop
  pop
```

### Error Monad

```haskell
instance (Error e) => Monad (Either e) where
    return x = Right x
    Right x >>= f = f x
    Left err >>= f = Left err
    fail msg = Left (strMsg msg)
```

```haskell
ghci> :t strMsg
strMsg :: (Error a) => String -> a
ghci> strMsg "boom!" :: String
"boom!"
```

### Useful Monad Functions

[HustCSer Repo](https://github.com/HustCSer/learnyouahaskell-zh/blob/online-reading/zh-cn/ch13/for-a-few-monads-more.md)

#### liftM

#### join

#### filterM

#### foldM

#### `<=<`(组合函数)

### Self-Defined Monad

## 注释

### 符号

-   --      单行注释
-   {- -}   块注释
-   {-# #-} (文件头部)编译器参数
