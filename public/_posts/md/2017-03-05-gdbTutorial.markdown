---
layout:     post
title:      "GDB Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - GNU
    - Linux
    - GDB
---

* [GDB Tutorial](#gdb-tutorial)
	* [Basic Command](#basic-command)
	* [set](#set)
	* [shell](#shell)
	* [Assemble](#assemble)
		* [Core Dump](#core-dump)
	* [Disasm](#disasm)
	* [Stack Frame](#stack-frame)

# GDB Tutorial

## Basic Command

- r(run)
- l(list)
- b(break)
   - b linenum
   - b filename:linenum
- display/format address

e.g display/i $pc

-   t 按二进制格式显示变量
-   d 按十进制格式显示变量
-   o 按八进制格式显示变量
-   u 按十六进制格式显示无符号整型
-   x 按十六进制格式显示变量
-   a 按十六进制格式显示变量
-   f 按浮点数格式显示变量
-   c 按字符格式显示变量
-   s 按字符串格式显示变量

- disas 显示汇编代码


- x /num-size-format $pc/rsp/rbp

e.g size:w(2字节) format:x/d/s(十六进制/十进制/字符串)
            2wx

- examine - 查看内存
n、f、u是可选的参数
  - n 是一个正整数，表示显示内存的长度，也就是说从当前地址向后显示几个地址的内容。
  - f 表示显示的格式，参见上面。如果地址所指的是字符串，那么格式可以是s，如果地十是指令地址，那么格式可以是i。
  - u 表示从当前地址往后请求的字节数，如果不指定的话，GDB默认是4个bytes。u参数可以用下面的字符来代替，b表示单字节，h表示双字节，w表示四字节，g表示八字节。当我们指定了字节长度后，GDB会从指内存定的内存地址开始，读写指定字节，并把其当作一个值取出来。
表示一个内存地址。

> 命令：x/3uh 0x54320 表示，从内存地址0x54320读取内容，h表示以双字节为一个单位，3表示三个单位，u表示按十六进制显示。

- s 	step into
  - step1 下一条汇编指令
- n 	next line
- p 	print
- q   	quit
- up    last stack
- bt(backtrace)	function stack 显示堆栈回溯信息
- info  breakpoints/register

## set

-   set disassembly
-   set variable

## shell

shell command

## Assemble

### Core Dump

```shell
ulimit -c unlimited
gdb -c core_file_path target_exe_path
```
## Disasm

-   CS Segment

```shell
(gdb) disass
(gdb) x/i
(gdb) x/5i $pc
(gdb) ni/si
```

-   Registers

```shell
(gdb) i r
(gdb) i r a
(gdb) i r ds
```

-   DS Segment

-   SS Segment

## Stack Frame

```shell
(gdb) bt
(gdb) frame n
(gdb) info locals
```
