---
layout:     post
title:      "GCC Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - GNU
    - GCC
    - Linux
---

* [UsefulTools](#usefultools)
	* [GCC](#gcc)

### UsefulTools

- 用于创建代码文档资料的 NDoc
- 用于生成解决方案的 NAnt
- 用于生成代码的 CodeSmith
- 用于监视代码的 FxCop
- 用于编译少量代码的 Snippet Compiler
- 两种不同的转换器工具：ASP.NET 版本转换器和 Visual Studio .NET 项目转换器
- 用于生成正则表达式的 Regulator
- 用于分析程序集的 .NET Reflector
- 用于单元测试的NUnit

#### GCC

- -E: cpp(c preprocessor) 预处理 => .i
- -S: cll                 编译   => .s
- -c: as(assemble)        汇编   => .o
- -time                    Time the execution of each subprocess
- -std=<standard>          Assume that the input sources are for <standard>
- -B <directory>           Add <directory> to the compiler's search paths
- -v                       Display the programs invoked by the compiler
- -o <file>                Place the output into <file>
- -shared                  Create a shared library
- - Wall
- - v --help
