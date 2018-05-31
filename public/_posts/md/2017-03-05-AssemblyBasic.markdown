---
layout:     post
title:      "Assembly Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Assembly
---

* [Assembly Basic Notes](#assembly-basic-notes)
	* [GCC/GDB/Kit](#gccgdbkit)
		* [GCC](#gcc)
		* [GDB](#gdb)
		* [MASM/LINK/TD](#masmlinktd)
			* [MASM](#masm)
			* [LINK](#link)
			* [TD](#td)
				* [Basic](#basic)
				* [Alt](#alt)
				* [代码区](#代码区)
				* [数据区](#数据区)
		* [NMAKE](#nmake)
		* [Objdump](#objdump)
	* [位运算](#位运算)
	* [Address](#address)
		* [mov](#mov)
		* [address](#address-1)
	* [常用命令](#常用命令)
		* [读取指令](#读取指令)
			* [mov](#mov-1)
		* [算术命令](#算术命令)
		* [转移命令](#转移命令)
	* [Control Flow](#control-flow)
		* [if](#if)
		* [loop](#loop)
			* [do/while](#dowhile)
			* [while/do](#whiledo)
			* [for](#for)
		* [switch(**Jump Table**)](#switchjump-table)
	* [Stack Frame](#stack-frame)
	* [Data Structure](#data-structure)
		* [Arrays](#arrays)

# Assembly Basic Notes

Load-ALU-Store模式 - 读入寄存器，算术逻辑单元运算，回写至内存

## GCC/GDB/Kit

### GCC

- `gcc -01/-02/-03 source.c`  —— 编译优化等级
- `gcc -S source.c` —— 编译成汇编代码(文本文件)
- `gcc -o source.c` —— 编译成Object代码(二进制文件)

### GDB

- `si`          单指令执行
- `x/i $pc`     执行si命令时打印汇编代码
- `disas`       显示汇编代码
- `bt`          查看函数堆栈
- `step1`       下一条汇编指令
- `info register`
- `x /numsizeformat $pc/rsp/rbp`

### MASM/LINK/TD

#### MASM

```shell
masm /Zi/Zd src dist
masm /I(path)           // 引用 标准库/宏
masm /I..\include
```

#### LINK

```shell
link /DEBUG src
```

#### TD

-   `tab`  切换分区
-   `alt`  功能键
-   `ctrl` 子功能键

##### Basic

-   `F2`: break
-   `F7`: step into
-   `F8`: step over

##### Alt

-   `Alt+F5`   : 临时跳转至 dos 界面
-   `Alt+Enter`: 全屏
-   `Alt+X`    : 退出

##### 代码区

-   `<C-A>` Assemble: 临时修改汇编指令
-   `<C-C>` Caller  : 从子程序处跳回至 Caller 处
-   `<C-F>` Follow  : 查看 CALL/JMP/INT 跳转至的子程序处
-   `<C-O>` Origin  : 跳转至 cs:ip 指向指令处

##### 数据区

-   `<C-C>` Change: 临时修改数据
-   `<C-D>` Display: 选择显示格式 e.g Byte/Word/Long/Comp/Float/Real/Double/Extended
-   `<C-G>` Goto: 跳转至指定地址区

### NMAKE

-   `$<`: 源文件名
-   `$?`: 所有源文件名
-   `$@`: 全路径的目标文件
-   `$*`: 除去扩展名的全路径的目标文件

```makefile
EXE = $(NAME).exe
OBJS = $(NAME).obj
SRCS = $(NAME).asm
SIMPLE_MODE = ;

LINK_FLAG = /subsystem:windows
ML_FLAG = /c/coff/Zi
MASM_FLAG = /Zi/Zd

$(EXE): $(OBJS)
    link $(LINK_FLAG) $(OBJS) $(SIMPLE_MODE)

$(OBJS): $(SRCS)
    masm $(MASM_FLAG) $(SRCS) $(SIMPLE_MODE)

clean:
    del *.obj
    del *.tr

test:
    td $(EXE)
```

### Objdump

`AT&T`反汇编工具

## 位运算

- `^`：无进位
- `p && *p++` : NULL检查

编码：2^n  e.g 一副牌的编码 2位牌色位+4位数字位

## Address

### mov

movX  src dest  #X:b/w/l/q （1/2/4/8字节）

### address

- D(Rb, Ri, S) —— MEM[ Reg[Rb] + S * Reg[Ri] + D]
- leal命令
  - `leal D(Rb, Ri, S)   dest`
        - 将地址模式表达式的址存入dest
        - 作用
            - 快速给指针赋值`p = &x[i]` 即`Mem[Reg[x] + i * size]->(x, size, I)`
            - 快速计算二次多项式 `x + i * k`

## 常用命令

### 读取指令

#### mov

内存数据重复读入寄存器 - 使得汇编代码与上下文无关,减少BUG产生可能性

```asm
R1 = MEM[SP + 8]
……
R1 = MEM[SP + 8]
……
R1 = MEM[SP + 8]
……
```

### 算术命令

### 转移命令

- Flags
    - CF：Carry Flag(unsigned)    进位标志——当有进位时设为1
    - OF：OverFolw Flag(signed) 溢出标志——当补码溢出时设为1
    - SF：Sign Flag(signed)           符号标志——当t<0时设为1
    - ZF：Zero Flag                        零标志——当t==0时设为1

- cmpX命令
    `cmpl Src2, Src1`
      根据Src1 – Src2(subl Src2, Src1)的结果设置标志寄存器的值

- testX命令
    `testl Src2, Src1`
      根据Src1 & Src2(andl Src2, Src1)的结果设置标志寄存器的值

    e.g testl %eax, %eax 实现符号函数
- setX命令 根据标志寄存器运算值，将值存入dest
    `setX dest`

## Control Flow

### if
`cmovC src, dest`(C表示Conditional——e/ne等)
    当条件成立时，src->dest  src与dest可分别用于存放两种情况的值

### loop

#### do/while

#### while/do

#### for

### switch(**Jump Table**)

`break; → leave`
              `ret`
- fallThrough(without break)
- mixing(连冒号)
- missing case

## Stack Frame

```ass
# 准备阶段
# Caller-Save: %eax %ecx %edx
# Callee-Save: %ebx %esi %edi
# 传参顺序: rdi, dsi, rdx, rcx, r8, r9, stack

pushl %ebp
movl %esp, %ebp
pushl %ebx

# 结束阶段

movl -4(%ebp), %ebx
movl %ebp, %esp
popl %ebp
ret
```

## Data Structure

### Arrays

```c
int get_sea_digit(int index, int dig) {
    return sea[index][dig];
}
```

```ass
# 访问二维数组元素
# %ecx = dig
# %eax = index
leal 0(,%ecx,4), %edx        # 4 * dig
leal (%eax,%eax,4), %eax     # 5 * index
movl sea(%edx,%eax,4), %eax  # * (sea + 4 * dig + 20 * index)
```
