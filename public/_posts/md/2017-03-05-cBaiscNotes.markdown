---
layout:     post
title:      "C Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - C
    - C++
---

* [C Basic Notes](#c-basic-notes)
	* [编程习惯](#编程习惯)
		* [Macro](#macro)
			* [括号](#括号)
		* [头文件](#头文件)
			* [缺少标准库头文件](#缺少标准库头文件)
				* [缺少函数原型](#缺少函数原型)
				* [覆盖标准库函数原型](#覆盖标准库函数原型)
				* [缺少宏定义](#缺少宏定义)
			* [防止重复包括头文件](#防止重复包括头文件)
			* [头文件不申请内存单元](#头文件不申请内存单元)
		* [检查](#检查)
			* [边界检查](#边界检查)
			* [指针检查](#指针检查)
	* [类型转换](#类型转换)
		* [机器码转换](#机器码转换)
	* [Awesome Pointer(Tips and Best Practice)](#awesome-pointertips-and-best-practice)
		* [Error Prone Pointers(易错点)](#error-prone-pointers易错点)
		* [Debugging Malloc](#debugging-malloc)
			* [处理void指针](#处理void指针)
		* [利用void指针实现泛型(generic)](#利用void指针实现泛型generic)
			* [通用型 swap 函数](#通用型-swap-函数)
			* [通用型 lsearch 函数](#通用型-lsearch-函数)
				* [实现](#实现)
				* [int 实例](#int-实例)
				* [string 实例](#string-实例)
			* [泛型数据结构](#泛型数据结构)
				* [通用型栈](#通用型栈)
			* [Tools](#tools)
	* [Useful Functions](#useful-functions)
		* [Alloctor](#alloctor)
			* [memset](#memset)
			* [free](#free)
		* [Strings](#strings)
			* [strdup](#strdup)
			* [strchr/strstr](#strchrstrstr)
			* [strtok](#strtok)
			* [strcasecmp 不区分大小写](#strcasecmp-不区分大小写)
			* [getopt](#getopt)
		* [I/O](#io)
		* [Exceptions](#exceptions)
		* [Process](#process)
			* [fork/execve](#forkexecve)
			* [Other](#other)
		* [Threads](#threads)
			* [pthread.h](#pthreadh)
			* [Semaphore](#semaphore)
	* [联合体](#联合体)

# C Basic Notes

## 编程习惯

### Macro(宏)

#### 括号

尽量添加足够的括号,减少宏定义的二义性

#### 特殊用法

*   #: 字符串化
*   ##: 强制连接符
*   do { ... } while (0): 防止语法错误

### 头文件

#### 缺少标准库头文件

##### 缺少函数原型

链接成功 - 链接器自动装载库函数，不影响程序执行 **只警告，不报错**

##### 覆盖标准库函数原型

- 定义过多参数原型，调用时传入过多参数，函数正确执行(无视多余参数)
- 定义缺少参数原型，调用时传入不完整参数，函数错误执行，误把0xc(%ebp)，0x10(%ebp)，…等更多内存单元当作函数参数

##### 缺少宏定义

链接失败 - 宏定义会被识别为函数，但链接器查找不到相应库函数

#### 防止重复包括头文件

```c
#ifndef _FILENAME_H_
#define _FILENAME_H_

...
...
...

#endif
```

#### 头文件不申请内存单元

除了全局共享静态变量外, 头文件中的定义不允许申请实际的内存单元

### 检查

#### 边界检查

-   空/满栈检查
-   参数合法性检查    e.g elemSize > 0 检查

#### 指针检查

-   alloctor失败，需添加NULL检查:
    -   assert
    -   exit

## 类型转换

### 机器码转换

-   有符号类型转换: 进行符号扩展
-   无符号类型转换: 进行零扩展

## Awesome Pointer(Tips and Best Practice)

### Error Prone Pointers(易错点)

```c
int i = 37;
float f = *(float *)&i;

float f = 7.0;
short s = *(short *)&f;
```

-   悬挂指针
-   未初始化
-   改写未知区域
    -   下标越界
    -   内存上溢 e.g `gets(string);`
-   指针相关运算符优先级与结合性
-   返回局部变量的地址
-   重复释放内存空间
-   内存泄漏   e.g 未释放空间/未释放部分深度空间(多维数组)
-   不能引用void指针指向的内存单元

### Debugging Malloc

#### 处理void指针

Tips: 中途运用强制类型转换,使得void指针可以执行指针加减运算

```c
void *target = (char *)void_pointer + ...;
```

### 利用void指针实现泛型(generic)

#### 通用型 swap 函数

```c
void swap(void *vp1, void *vp2, int size) {
    char buffer[size];
    memcpy(buffer, vp1, size);
    memcpy(vp1, vp2, size);
    memcpy(vp2, buffer, size);
}
```

#### 通用型 lsearch 函数

##### 实现

```c
void *lsearch(void *key, void *base, int n, int elemSize, int (*cmpfn)(void *, void *)) {
    for (int i = 0;i < n;i++) {
        void * elemAddr = (char *)base + i * elemSize;
        if (cmpfn(key, elemAddr) == 0) {
            return elemAddr;
        }
    }

    return NULL;
}
```

##### int 实例

```c
int IntCmp(void *elem1, void *elem2) {
    int *ip1 = (int *)elem1;
    int *ip2 = (int *)elem2;
    return *ip1 - *ip2;
}
```

```c
int array[] = {4, 2, 3, 7, 11, 6},
    size = 6,
    target = 7;

// 应进行强制类型转换
int * found = (int *)lsearch(&target, array, 6, sizeof(int), IntCmp);

if (found == NULL) {
    printf("Not Found");
} else {
    printf("Found");
}
```

##### string 实例

```c
int StrCmp(void *vp1, void *vp2) {
    // 必须进行强制类型转换
    char *s1 = *(char **)vp1;
    char *s2 = *(char **)vp2;
    return strcmp(s1, s2);
}
```

```c
char *notes[] = {"Ab", "F#", "B", "Gb", "D"},
    *target = "Eb";
char ** found = lsearch(&target, notes, 5, sizeof(char *), StrCmp);
```

#### 泛型数据结构

##### 通用型栈

```c
typedef struct {
    void *elems;
    int elemSize;
    int logLen;
    int allocLen;
} stack;

void StackNew(stack *s, int elemSize);
void StackDispose(stack *s);
void StackPush(stack *s, void *elemAddr);
void StackPop(stack *s, void *elemAddr);
```

```c
void StackNew(stack *s, int elemSize) {
    // 参数合法性检查
    if (s->elemSize <= 0) {
        perror("ElemSize <= 0");
        return;
    }

    s->elemSize = elemSize;
    s->logLen = 0;
    s->allocLen = 4;
    s->elems = (int *)malloc(s->allocLen * elemSize);

    // NULL检查
    if (s->elems == NULL) {
        perror("No Mem");
        exit(0);
    }
}

void StackPush(stack *s, void *elemAddr) {
    // 满栈检查
    if (s->logLen == s->allocLen) {
        s->allocLen *= 2;
        s->elems = (int *)malloc(s->elems, s->allocLen * s->elemSize);
    }

    void *target = (char *)s->elems + s->logLen * s->elemSize;
    memcpy(target, elemAddr, s->elemSize);
    s->logLen++;
}

void StackPop(stack *s, void *elemAddr) {
    // 空栈检查
    if (s->logLen == 0) {
        perror("Empty Stack");
        return;
    }

    s->logLen--;
    void *source = (char *)s->elems + s->logLen * s->elemSize;
    memcpy(elemAddr, source, s->elemSize);
}
```

#### Tools

Valgrind - [GitHub Repo](https://github.com/svn2github/valgrind)

## Useful Functions

#### memset

#### free

**free函数会回退4/8字节，取出heap块的长度/信息,根据此信息进行heap块的释放.**

### Strings

#### strdup

string duplicate - `char *strdup(string)` 封装 allocator 细节

#### strchr/strstr

返回字符/串在字符串中出现的位置(地址)

#### strtok

#### strcasecmp 不区分大小写

#### getopt

解析命令行参数, 轻松地提取以 - 或 / 开头的参数

### I/O

####　sscanf

可以用作简易匹配读取函数

```c
// 提取除 http:// 外的字符串
sscanf(buf, "http://%s", url_part);
```

### Exceptions

perror(string) - 用来将上一个函数发生错误的原因输出到标准设备(stderr)

### Process

#### fork/execve

-   fork(): 创建当前进程的拷贝
-   execve(): 用另一程序的代码代替当前进程的代码
    - `int execve(char *filename, char *argv[], char *envp[])`

```c
void fork_exec(char *path, char *argv[]) {
    pid_t pid = fork();

    if (0 != pid) {
        printf("Parent: created a child %d\n", pid);
    } else {
        printf("Child: exec-ing new program now\n");
        execv(path, argv);
    }

    printf("This line printed by parent only!\n");
}
```

#### Other

-   getpid()
-   wait(int *child_status)/waitpid(pid)
-   exit()

### Threads

#### pthread.h

```c
typedef unsigned long int pthread_t;

/**
 * create thread
 * @param  {指向线程标识符的指针}   pthread_t *__thread
 * @param  {设置线程属性}         __const pthread_attr_t *__attr
 * @param  {线程运行函数的起始地址} void *(*__start_routine) (void *)
 * @param  {运行函数的参数}        void *__arg
 */
extern int pthread_create __P ((pthread_t *__thread, __const pthread_attr_t *__attr, void *(*__start_routine) (void *)， void *__arg));
　　
/**
 * 等待线程
 * @param  {被等待的线程标识符}                              pthread_t __th
 * @param  {一个用户定义的指针，它可以用来存储被等待线程的返回值} void **__thread_return
 */
extern int pthread_join __P ((pthread_t __th, void **__thread_return));

/**
 * 退出线程
 * @param  {函数的返回代码} (void *__retval)) __attribute__ ((__noreturn__)
 */
extern void pthread_exit __P ((void *__retval)) __attribute__ ((__noreturn__));

// 一个线程不能被多个线程等待，否则第一个接收到信号的线程成功返回，其余调用pthread_join的线程则返回错误代码ESRCH

// 以下为互斥锁相关函数

pthread_mutex_init
pthread_mutexattr_init

/**
 * 设置属性pshared
 * PTHREAD_PROCESS_PRIVATE
 * PTHREAD_PROCESS_SHARED
 */
pthread_mutexattr_setpshared

/**
 * 设置互斥锁类型
 * PTHREAD_MUTEX_NORMAL
 * PTHREAD_MUTEX_ERRORCHECK
 * PTHREAD_MUTEX_RECURSIVE
 * PTHREAD_MUTEX_DEFAULT
 */
pthread_mutexattr_settype

pthread_mutex_lock
pthread_mutex_unlock
pthread_delay_np
```

```c
InitThreadPackage;
ThreadNew;
ThreadSleep;
RunAllThreads;
SemaphoreNew(int > 0);
SemaphoreWait(lock);
SemaphoreSignal(lock);
```

#### Semaphore

-   哲学家就餐问题
-   将Semaphore变量的值在允许范围内(不至于使得线程锁失效)使得其取最大值，减少线程阻塞
-   EmptyBuf 8, FullBuf 0
-   双向通信，互相唤醒 - `Writer:sw(empty),ss(full);`  `Reader:sw(full),ss(empty);`

```c
void SellTickets(int agent, int *ticketsNum, Semaphore lock) {
	while (true) {
		// 当 lock == 0 时,当前进程阻塞, 等待 lock > 0
		// 当 lock > 0 时, 当前进程继续进行, 并且 lock--
		SemaphoreWait(lock);

		if (*ticketsNum == 0) break;  // 票已售磬

		(*ticketsNum)--;  // 售出一张票
		printf("Sell One Ticket.\n");

		// lock++ 使得 lock > 0
		// 若有其他进程调用了SemaphoreWait, 且因之前 lock == 0 而被阻塞, 则此时其他进程可继续进行
		SemaphoreSignal(lock);
	}

    // break to here
	// 作用同循环内的 Signal 函数
	SemaphoreSignal(lock);
}
```

## 联合体

-   机器码 e.g 理解 IEEE 754 标准
-   区分大/小端模式
