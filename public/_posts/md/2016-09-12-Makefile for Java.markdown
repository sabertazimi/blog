---
layout:     post
title:      "Makefile for Java"
subtitle:   "为学习 Tao 编译器铺路"
date:       2016-09-12
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Linux
    - Makefile
    - Java
---

最近在通过 [Tao 语言编译器](https://www.gitbook.com/book/moskize91/write-a-compiler-step-by-step/details) 预习编译原理.

本子开 JetBrains 的 IDE 时时间过长, 于是花了一点时间, 通过 google 和 stack overflow, 编写了一个可以自动寻找 src 文件夹下所有 java 源文件(可进行深层嵌套)进行编译的 Makefile.

在进行编写时, 遇到最大的问题便是 wildcard 并不提供递归遍历子目录的功能, 所幸在 SO 上找到了解答. 下面给出 Makefile 核心代码:

```makefile
JFLAGS = -encoding UTF-8 -d $(CLASS_PATH) -sourcepath $(SOURCE_PATH) -classpath $(CLASS_PATH) -g
JC = javac
JVM= java
RM= rm -fr
MV= mv
MKDIR=mkdir -p
SOURCE_PATH= src/main/java
TEST_PATH= src/test/java
CLASS_PATH= build/classes/main
JAR_PATH= build/libs
MAIN_CLASS = com.sabertazimi.tao.Tao
MAIN_JAR = tao.jar

.SUFFIXES: .java .class
.java.class:
	$(JC) $(JFLAGS) $*.java

rwildcard=$(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2) $(filter $(subst *,%,$2),$d))

SOURCE=$(call rwildcard, $(SOURCE_PATH), *.java)
CLASSES=$(SOURCE:.java=.class)

default: classes
classes: $(CLASSES)

.PHONY= build dir run clean show help

build:
	make clean
	make dir
	make

dir:
	$(MKDIR) $(SOURCE_PATH)
	$(MKDIR) $(TEST_PATH)
	$(MKDIR) $(CLASS_PATH)
	$(MKDIR) $(JAR_PATH)

run:
	# $(JVM) -cp $(CLASS_PATH) $(MAIN_CLASS)
	$(JVM) -jar $(JAR_PATH)/$(MAIN_JAR)

clean:
	$(RM) $(CLASS_PATH)/*
	$(RM) $(JAR_PATH)/*

show:
	@echo 'SOURCE FILES  = $(SOURCE)'
	@echo 'COMPILE FLAGS = $(JFLAGS)'

help:
	@echo 'Generic Makefile for Java Programs version 1.0'
	@echo
	@echo 'Usage: make [TARGET]'
	@echo 'TARGETS:'
	@echo '  all       (=make) compile and link.'
	@echo '  build     generate .class bytecode.'
	@echo '  run       run main class.'
	@echo '  clean     clean generated files.'
	@echo '  show      show variables (for debug use only).'
	@echo '  help      print this message.'
	@echo
	@echo 'Report bugs to <sabertazimi@gmail.com>.'

```

以上是去除了注释部 Makefile, 使用它只需四步:

*   创建 src/ 与 build/ 目录结构:

```sh
$ make dir
```

*   在 src 下创建源文件:

```sh
$ vim src/main/java/com/sabertazimi/tao/Tao.java (com.sabertazimi.tao.Tao)
```

*   修改 Makefile 中的 MAIN_CLASS 与 MAIN_JAR 宏, 使其适适配 main 函数所在主类

> e.g com.sabertazimi.tao.Tao 与 tao.jar

*   最后:

```sh
make build && make run
```

完整注释版本请见 - [sabertazimi/hust-lab](https://github.com/sabertazimi/hust-lab/tree/master/compilers/tao)

> 当然, gradle 依然是坠吼的!

