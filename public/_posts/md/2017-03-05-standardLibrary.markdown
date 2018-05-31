---
layout:     post
title:      "C Standard Library Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - C
    - C++
---

* [`<assert.h>`](#asserth)
* [`<ctype.h>`](#ctypeh)
* [`<errno.h>`](#errnoh)
* [`<float.h>/<limits.h>`](#floathlimitsh)
* [`<locale.h>`](#localeh)
* [`<math.h>`](#mathh)
* [`<setjmp.h>`](#setjmph)
* [`<signal.h>`](#signalh)
* [`<stdarg.h>`](#stdargh)
* [`<stddef.h>`](#stddefh)
* [`<string.h>`](#stringh)

## `<assert.h>`
- 关闭断言
```C
#define NDEBUG
#include <assert.h>
```
- 开启断言
```C
#undef NDEBUG
#include <assert.h>
```

## `<ctype.h>`
- 可检测字符

getc、fgetc、getchar函数可返回值(EOF值/unsigned char类型)
- 不可检测字符

非EOF值/非unsigned char类型(*会引发严重错误*)

![ctype functions](img/ctype.h.jpg)

## `<errno.h>`
- errno的值在程序启动时为零，但是不会被任何库函数设为零
```C
errno = 0;
y = sqrt(x);
if (errno != 0) {
    printf("invalid x : %e\n", x);
}
```
```C
#ifndef _I386_ERRNO_H
#define _I386_ERRNO_H
#define EPERM 1 /* Operation not permitted */
#define ENOENT 2 /* No such file or directory */
#define ESRCH 3 /* No such process */
#define EINTR 4 /* Interrupted system call */
#define EIO 5 /* I/O error */
#define ENXIO 6 /* No such device or address */
#define E2BIG 7 /* Arg list too long */
#define ENOEXEC 8 /* Exec format error */
#define EBADF 9 /* Bad file number */
#define ECHILD 10 /* No child processes */
#define EAGAIN 11 /* Try again */
#define ENOMEM 12 /* Out of memory */
#define EACCES 13 /* Permission denied */
#define EFAULT 14 /* Bad address */
#define ENOTBLK 15 /* Block device required */
#define EBUSY 16 /* Device or resource busy */
#define EEXIST 17 /* File exists */
#define EXDEV 18 /* Cross-device link */
#define ENODEV 19 /* No such device */
#define ENOTDIR 20 /* Not a directory */
#define EISDIR 21 /* Is a directory */
#define EINVAL 22 /* Invalid argument */
#define ENFILE 23 /* File table overflow */
#define EMFILE 24 /* Too many open files */
#define ENOTTY 25 /* Not a typewriter */
#define ETXTBSY 26 /* Text file busy */
#define EFBIG 27 /* File too large */
#define ENOSPC 28 /* No space left on device */
#define ESPIPE 29 /* Illegal seek */
#define EROFS 30 /* Read-only file system */
#define EMLINK 31 /* Too many links */
#define EPIPE 32 /* Broken pipe */
#define EDOM 33 /* Math argument out of domain of func */
#define ERANGE 34 /* Math result not representable */
#define EDEADLK 35 /* Resource deadlock would occur */
#define ENAMETOOLONG 36 /* File name too long */
#define ENOLCK 37 /* No record locks available */
#define ENOSYS 38 /* Function not implemented */
#define ENOTEMPTY 39 /* Directory not empty */
#define ELOOP 40 /* Too many symbolic links encountered */
#define EWOULDBLOCK EAGAIN /* Operation would block */
#define ENOMSG 42 /* No message of desired type */
#define EIDRM 43 /* Identifier removed */
#define ECHRNG 44 /* Channel number out of range */
#define EL2NSYNC 45 /* Level 2 not synchronized */
#define EL3HLT 46 /* Level 3 halted */
#define EL3RST 47 /* Level 3 reset */
#define ELNRNG 48 /* Link number out of range */
#define EUNATCH 49 /* Protocol driver not attached */
#define ENOCSI 50 /* No CSI structure available */
#define EL2HLT 51 /* Level 2 halted */
#define EBADE 52 /* Invalid exchange */
#define EBADR 53 /* Invalid request descriptor */
#define EXFULL 54 /* Exchange full */
#define ENOANO 55 /* No anode */
#define EBADRQC 56 /* Invalid request code */
#define EBADSLT 57 /* Invalid slot */
#define EDEADLOCK EDEADLK
#define EBFONT 59 /* Bad font file format */
#define ENOSTR 60 /* Device not a stream */
#define ENODATA 61 /* No data available */
#define ETIME 62 /* Timer expired */
#define ENOSR 63 /* Out of streams resources */
#define ENONET 64 /* Machine is not on the network */
#define ENOPKG 65 /* Package not installed */
#define EREMOTE 66 /* Object is remote */
#define ENOLINK 67 /* Link has been severed */
#define EADV 68 /* Advertise error */
#define ESRMNT 69 /* Srmount error */
#define ECOMM 70 /* Communication error on send */
#define EPROTO 71 /* Protocol error */
#define EMULTIHOP 72 /* Multihop attempted */
#define EDOTDOT 73 /* RFS specific error */
#define EBADMSG 74 /* Not a data message */
#define EOVERFLOW 75 /* Value too large for defined data type */
#define ENOTUNIQ 76 /* Name not unique on network */
#define EBADFD 77 /* File descriptor in bad state */
#define EREMCHG 78 /* Remote address changed */
#define ELIBACC 79 /* Can not access a needed shared library */
#define ELIBBAD 80 /* Accessing a corrupted shared library */
#define ELIBSCN 81 /* .lib section in a.out corrupted */
#define ELIBMAX 82 /* Attempting to link in too many shared libraries */
#define ELIBEXEC 83 /* Cannot exec a shared library directly */
#define EILSEQ 84 /* Illegal byte sequence */
#define ERESTART 85 /* Interrupted system call should be restarted */
#define ESTRPIPE 86 /* Streams pipe error */
#define EUSERS 87 /* Too many users */
#define ENOTSOCK 88 /* Socket operation on non-socket */
#define EDESTADDRREQ 89 /* Destination address required */
#define EMSGSIZE 90 /* Message too long */
#define EPROTOTYPE 91 /* Protocol wrong type for socket */
#define ENOPROTOOPT 92 /* Protocol not available */
#define EPROTONOSUPPORT 93 /* Protocol not supported */
#define ESOCKTNOSUPPORT 94 /* Socket type not supported */
#define EOPNOTSUPP 95 /* Operation not supported on transport endpoint */
#define EPFNOSUPPORT 96 /* Protocol family not supported */
#define EAFNOSUPPORT 97 /* Address family not supported by protocol */
#define EADDRINUSE 98 /* Address already in use */
#define EADDRNOTAVAIL 99 /* Cannot assign requested address */
#define ENETDOWN 100 /* Network is down */
#define ENETUNREACH 101 /* Network is unreachable */
#define ENETRESET 102 /* Network dropped connection because of reset */
#define ECONNABORTED 103 /* Software caused connection abort */
#define ECONNRESET 104 /* Connection reset by peer */
#define ENOBUFS 105 /* No buffer space available */
#define EISCONN 106 /* Transport endpoint is already connected */
#define ENOTCONN 107 /* Transport endpoint is not connected */
#define ESHUTDOWN 108 /* Cannot send after transport endpoint shutdown */
#define ETOOMANYREFS 109 /* Too many references: cannot splice */
#define ETIMEDOUT 110 /* Connection timed out */
#define ECONNREFUSED 111 /* Connection refused */
#define EHOSTDOWN 112 /* Host is down */
#define EHOSTUNREACH 113 /* No route to host */
#define EALREADY 114 /* Operation already in progress */
#define EINPROGRESS 115 /* Operation now in progress */
#define ESTALE 116 /* Stale NFS file handle */
#define EUCLEAN 117 /* Structure needs cleaning */
#define ENOTNAM 118 /* Not a XENIX named type file */
#define ENAVAIL 119 /* No XENIX semaphores available */
#define EISNAM 120 /* Is a named type file */
#define EREMOTEIO 121 /* Remote I/O error */
#define EDQUOT 122 /* Quota exceeded */
#define ENOMEDIUM 123 /* No medium found */
#define EMEDIUMTYPE 124 /* Wrong medium type */
#endif
```

## `<float.h>/<limits.h>`
- 宏定义：`CHAR/UCHAR/SCHAR/SHRT/USHRT/INT/UINT/LONG/ULONG/FLT/DBL/LDBL`有关的``MIN/MAX/EPSILON``

## `<locale.h>`
- 实现时间/单位/货币等一系列的国际化
- 常用函数
```C
_CRTIMP char * __cdecl setlocale(int, const char *);
_CRTIMP struct lconv * __cdecl localeconv(void);
```
- int值
```C
#define LC_ALL          0
#define LC_COLLATE      1
#define LC_CTYPE        2
#define LC_MONETARY     3
#define LC_NUMERIC      4
#define LC_TIME         5
```

## `<math.h>`
数学函数库(包括后缀f(float)/l(long double))

## `<setjmp.h>`
- 常用函数
```C
int setjmp(jmp_buf env);
void longjmp(jmp_buf env, int val);
```
- 使用：用于if/else、loop、switch语句
  1. 直接调用setjmp函数时，返回值为0;
  2. 调用longjmp函数时，若val值不为0,则跳转至上次setjmp返回值为0处，继续向后执行语句
- 功能
  1. 实现非本地(局部)跳转(跨越多层函数调用栈进行跳转)
  2. 实现类Java异常机制(异常抛出及捕获)

## `<signal.h>`
**信号处理程序中所有数据应为volatile类型**
```C
_CRTIMP int __cdecl raise(int);
_CRTIMP void (__cdecl * __cdecl signal(int, void (__cdecl *)(int)))(int);
```

## `<stdarg.h>`
用于编写可变参数函数
```C
void printargs(int arg1, ...) /* 输出所有int类型的参数，直到-1结束 */
{
    va_list ap;
    int i;
    va_start(ap, arg1);
    for (i = arg1; i != -1; i = va_arg(ap, int))
    printf("%d ", i);
    va_end(ap);
    putchar('\n');

}
```

## `<stddef.h>`
- 宏
  - NULL Null 指针常量
  - `offsetof(type, member-desginator)`

获得字段在结构体中的偏移量
- 类型
  - `ptrdiff_t`

  带符号的整数类型, 用来表示指针相减的结果类型
  - `wchar_t`

  宽字符类型

  - `size_t`
  无符号整数类型, 用来表示sizeof操作符的结果类型

## `<string.h>`
- men系函数：操作任意字符序列
- strn系函数：操作非空字符序列
- str系函数：操作字符串序列('\0')

