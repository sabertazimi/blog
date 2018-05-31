---
layout:     post
title:      "C Naming Convention Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - C
    - C++
---

* [常用缩写词](#常用缩写词)
* [Header File](#header-file)

## 常用缩写词

|原词|缩写|
|:-------------:|:-------------:|
|addition|add|
|answer|ans|
|array|arr|
|average|avg|
|buffer|buf或buff|
|capture|cap或capt|
|check|chk|
|count|cnt|
|column|col|
|control|ctrl|
|decode|dec|
|define|def|
|delete|del|
|destination|dst或dest|
|display|disp|
|division|div|
|encode|enc|
|environment|env|
|error|err|
|float|flt|
|frequency|freq|
|header|hdr|
|index|idx|
|image|img|
|increment|inc|
|initalize|init|
|iteration|itr|
|length|len|
|memory|mem|
|middle|mid|
|make|mk|
|message|msg|
|multiplication|mul|
|number|num|
|operand|opnd|
|optimization|opt|
|operator|optr|
|packet|pkt|
|positon|pos|
|previous|pre或prev|
|payload|type|pt|
|pointer|ptr|
|return|code|rc|
|record|rcd|
|receive|recv|
|result|res|
|return|ret|
|source|src|
|stack|stk|
|string|str|
|subtraction|sub|
|table|tab|
|temporary|tmp或temp|
|total|tot|
|time|stamp|ts|
|value|val|

## Header File 
**防止其他文件重复#include本文件**
```C
#ifndef MONGOOSE_HEADER_INCLUDED 
#define    MONGOOSE_HEADER_INCLUDED 

/*.................................
 * do something here
 *.................................
 */

#endif /* MONGOOSE_HEADER_INCLUDED */
```
