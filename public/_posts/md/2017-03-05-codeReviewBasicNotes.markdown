---
layout:     post
title:      "Code Review Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Software Engineering
---

# Code Review Notes

## Tools

- checkstyle
- findbugs
- pmd

## Basic

- 逻辑正确
- 简单易懂
- 编程规范(linter)
- 模块化

- 多余或重复 代码/日志/测试
- 重复轮子(可被基本库替换)
- 无必要的全局变量
- 代码误注释
- 死循环(边界检查)

## Security

- 所有的数据输入是否都进行了检查（检测正确的类型，长度，格式和范围）并且进行了编码？
- 在哪里使用了第三方工具，返回的错误是否被捕获？
- 输出的值是否进行了检查并且编码？
- 无效的参数值是否能够处理？

## Documents

### 注释

- 数据结构
- 计量单位
- 描述代码意图
- 函数块
- 非常规行为/边界检查
- TODO标记
- FIXME标记
- 第三方库文档

## Test

- 代码是否可以测试？比如，不要添加太多的或是隐藏的依赖关系，不能够初始化对象，测试框架可以使用方法等。
- 是否存在测试，它们是否可以被理解？比如，至少达到你满意的代码覆盖(code coverage)。
- 单元测试是否真正的测试了代码是否可以完成预期的功能？
- 是否检查了数组的“越界“错误？
- 是否有可以被已经存在的API所替代的测
