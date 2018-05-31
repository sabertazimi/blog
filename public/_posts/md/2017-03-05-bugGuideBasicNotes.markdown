---
layout:     post
title:      "Bug Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Software
---

* [Bug List](#bug-list)
	* [Basic Bug](#basic-bug)
	* [C Bug](#c-bug)

# Bug List

## Basic Bug

-   必须进行输入验证 - 永远不要相信用户输入
-   永不使用未经验证的数值的长度或大小
-   必须返回正确的错误状态
-   注意(隐式)类型转换 

## C Bug

-   栈缓冲区溢出
-   空指针解引用
-   (隐式)类型转换
-   GOT覆写(Global Offset Table)

## 低概率/偶发性 Bug

*   多进程完全异步编程的复杂性
*   逐渐地内存泄漏
