---
layout:     post
title:      "Go Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Go
---

* [Go Basic Notes](#go-basic-notes)
	* [CLI](#cli)
		* [Installation](#installation)
		* [Basic Command](#basic-command)
			* [Build](#build)
			* [Test](#test)
			* [Clean](#clean)
			* [Modules](#modules)
	* [Packages](#packages)
		* [package and import](#package-and-import)
	* [Variable](#variable)
		* [Type Declaration](#type-declaration)
		* [Type conversions](#type-conversions)
		* [struct](#struct)
	* [Flow Control](#flow-control)
		* [if](#if)
		* [for](#for)
		* [switch](#switch)
		* [defer](#defer)
			* [ 执行时机](#-执行时机)
			* [实质](#实质)
			* [应用场景](#应用场景)
	* [Function](#function)
		* [Parameters and Return Value](#parameters-and-return-value)

# Go Basic Notes

## CLI

### Installation

```sh
$ sudo apt install golang
$ echo "export $GOPATH=$HOME/Work/Source/goproj"
```

```sh
goproj
|--- bin
|--- src

```

### Basic Command

```sh
$ go version
$ go run main.go
$ go fmt /path/to/test
```

*   go 的大部分工具的作用基本单位为 package(directories)

#### Build

```sh
# generate library
$ go build path/to/libpack
$ go install path/to/libpack

# generate binary
$ go install path/to/mainpack
```

#### Test

```sh
# path/to/pack/demo.go
# path/to/pack/demo_test.go
$ go test path/to/pack
```

#### Clean

```sh
$ go clean -i path/to/pack
```

#### Modules

*   remote packages

```sh
$ go get github.com/golang/example/hello
$ $GOPATH/bin/hello
```

## Packages

### package and import

*   for path/to/pack:

```go
package pack
```

```go
import (
    "path/to/pack"
)
```

*   只有首字母大写的函数才可被成功导出, 首字母小写的函数为文件私有函数

## Variable

### Type Declaration

*   Go 将类型置于变量名后的理由: reads clearly, from left to right
*   `:=` 不可用在函数外

```go
// 简写类型/赋值
var i,j int = 1, 2

// 省略类型
var c, python, java = true, false, "no!"

// 省略 var 关键字
javascript, ruby, cpp:= true, false, "no!"

// 声明块
import (
    "math/cmplx"
)

var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
)
```

### Type conversions

```go
var x int = 3
var y uint = uint(x)
z := uint(x)
```

### struct

```go
type Vertex struct {
    X int
    Y int
}

var (
    v1 = Vertex{1, 2}
    v2 = Vertex{X: 1}   // Y: 0
    v3 = Vertex{}       // X: 0, Y: 0
    vp = &Vertex{1, 2}  // *Vertex
)
```

### array

数组的长度是其类型的一部分

```go
var a [2]string
a[0] = "Hello"
a[1] = "Golang"

fmt.Println(a[0], a[1])
fmt.Println(a)
```

### slice

*   s[lo:lo] == nil

```go
p := []int{2, 3, 5, 7, 11, 13}

fmt.Println("p[1:4] ==", p[1:4])
fmt.Println("p[:3] ==", p[:3])  // p[0:3]        => 0, 1, 2
fmt.Println("p[4:]" ==, p[4:])  // p[4:len(p)-1] => 4, ..., len(p)-2
```

*   make 函数创建 slice

```go
a := make([]int, 5)     // len(a) = 5
b := make([]int, 0, 5)  // len(b) = 0, cap(b) = 5
b = b[:cap(5)]          // len(b) = 5, cap(b) = 5
```

*   len && cap

```go
// just shorten/extend, not drop elements
// change len(p), keep cap(p)
p = p [:0]
p = p[:4]

// drop its elements
// change len(p) and cap(p)
p = p[2:]
```

*   append

```go
append(s, 2, 3, 4)
```

*   range(iterator): 返回 2 个值(index int, element copy(s[index]) T), 在每一次迭代 index+=1

```go
pow := []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
    for i := range pow {
        fmt.Printf("index == %d\n", i)
    }

    for _, v := range pow {
        fmt.Printf("value == %d\n", v)
    }

    for i, v := range pow {
        fmt.Printf("2**%d = %d\n", i, v)
    }
}
```

### map

```go
type Vertex struct {
    Lat, Long float64
}

var m map[string]Vertex = make(map[string]Vertex)
m["Bell Labs"] = Vertex{
    40.68433, -74.39967
}

ml := map[string]Vertex{
    "Bell Labs": Vertex{
        40.68433, -74.39967,
    },
    "Google": {37.42202, -122.08408},
}

delete(m, "Bell Labs")

element, ok_flag := m["Google"]
```

## Flow Control

### if

```go
if x < 0 {
    return true
}

// scope of v: only in if/else statement
if v := math.Pow(x, n); v < lim {
    return v
} else {
    fmt.Printf("%g >= %g\n", v, lim)
}
```

### for

```go
for sum < 1000 {
    sum += sum
}

// scope of i: only in for statement
for i := 0; i < 10; i++ {
    sum += i
}
```

### switch

*   switch 中的case 自动break(除非使用 fallthrough 语句)

```go
switch time.Saturday {
    case today+0:
        fmt.Println("Today.")
    case today+1:
        fmt.Println("Tomorrow.")
    case today+2:
        fmt.Println("In two days.")
    default:
        fmt.Println("Too far away.")
}

// scope of os: only in switch statement
switch os := runtime.GOOS; os {
    case "darwin":
        fmt.Println("OS X.")
    case "linux":
        fmt.Println("Linux.")
    default:
        fmt.Printf("%s", os)
}

// alias for if-else long chain
switch {    // switch true
    case t.Hour() < 12:
        fmt.Println("Good morning!")
    case t.Hour() < 17:
        fmt.Println("Good afternoon!")
    default:
        fmt.Println("Good evening!")
}
```

### defer

defer 语句会将函数执行延迟至上层函数返回处(函数参数会立刻生成):

####  执行时机

函数设置返回值后, 即将返回调用函数前(若 defer 函数修改返回变量, 则会造成返回值与预期不一致)

```go
func main() {
    defer fmt.Println("!")
    defer fmt.Println("world")
    fmt.Println("hello")
}

=>

func main() {
    fmt.Println("hello")
    fmt.Println("world")
    fmt.Println("!")
}
```

#### 实质

`return_value` = xxx -> invoke defer functions(stack) -> return void

```go
func f() (result int) {
    defer func() {
        result++
    }()

    return 0
}

=>

func f() (result int) {
    result = 0

    func() {
        result++
    }()

    return
}
```

#### 应用场景

*   资源回收

```go
mu.Lock()
defer mu.Unlock()
```

*   panic 异常的捕获

```go
func f() {
    defer func() {
        if r:= recover(); r!= nil {
            fmt.Println("Recovered in f", r)
        }
    }()

    fmt.Println("Calling g.")
    g()
    fmt.Println("Returned normally from g.")
}

func g() {
    panic("ERROR")
}
```

*   保证语句(在发生异常的情况下)始终会被执行
*   有意修改返回值

## Function

### Parameters and Return Value

*   简写参数类型
*   多值返回函数
*   命名返回值(注释文档)

```go
func swap(x, y string) (string, string) {
    return y, x
}

func swap_(x, y string) (x_, y_ string) {
    x_, y_ = y, x
    return
}

func main() {
    a, b := swap("hello", "golang")
    a_, b_ := swap_("hello", "golang")
    fmt.Println(a, b)
    fmt.Println(a_, b_)
}
```

### Methods

*   Go 中没有 class, 但可以在 struct/同一个包内的type 上(receiver)定义方法

```go
type Vertex struct {
    X, Y float64
}

func (v *Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
    v := &Vertex{3, 4}
    fmt.Println(v.Abs())
}
```

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
    if f < 0 {
        return float64(-f)
    } else {
        return float64(f)
    }
}

func main() {
    f := MyFloat(-math.Sqrt2)
    fmt.Println(f.Abs())
```

#### Pointer/Value Receiver

*   pointer receiver: 可以改变原值(call by reference)
*   value receive: 不可以改变原值(call by value)
*   调用 methods 时, 可以不考虑 v 是 value/pointer, go 会自动处理

```go
func (v *Vertex) changeV() {
    v.X += 1
    v.Y += 1
}

v.changeV() => (&v).changeV()
```

```go
func (v Vertex) Abs() {
    return abs(v)
}

(&v).Abs() => v.Abs()
```

*   Best Practice: 在同一个类型上定义的所有方法最好统一 receiver 类型(全部 value receivers 或 全部 pointer receivers)

### Interface

#### 值

(value, type)

```go
var i I
var t *T
i = t   // => (nil, *T)
```

```go
var i I     // => (nil, nil)
```

#### Type assetions

*   单返回值: 断言失败时产生 panic
*   双返回值: 断言失败时不产生 panic

```go
// create empty interface, ("hello", string)
var i interface{} = "hello"

s := i.(string)
s, ok := i.(string) // => true
f, ok := i.(float64)// => false(no panic)
f := i.(float64)    // => false with panic
```

*   type switches

```go
switch v := i.(type) {
    case int;
        fmt.Println("Int.")
    case string:
        fmt.Println("String.")
    default:
        fmt.Printf("Other type.")
}
```

## Concurrent

### goroutine

```go
go f(x, y, z)   // => excute in a new goroutine with share memory
```

### channels

*   typed conduit(类型管道)
*   block excution

```go
var c chan int = make(chan int)

c <- sum    // send sum to channel c
v := <-c    // receive from channel c, assign value to v
```

```go
func sum(s []int, c chan int) {
    sum := 0

    for _, v := range s {
        sum += v
    }

    c <- sum
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}

    c := make(chan int)

    go sum(s[:len(s)/2], c)
    go sum(s[len(s/2):], c)

    x, y = <-c, <-c

    fmt.Println(x, y, x+y)
}
```

#### select

*   select(当所有情况都不满足时)可被阻塞

```go
for {
    select {
        case c <- x:
            x, y = y, x+y
        case <- quit:
            fmt.Println("quit")
            return
    }
}
```

#### Worker Pools

```go
package main

import "fmt"
import "time"

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Println("worker", id, "processing job", j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 9; j++ {
        jobs <- j
    }

    close(jobs)

    for a := 1; a <= 9; a++ {
        <-results
    }
}
```

