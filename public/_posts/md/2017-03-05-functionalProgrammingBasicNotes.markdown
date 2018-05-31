---
layout:     post
title:      "Functional Programming Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Functional Programming
    - Standard ML
---

* [Functional Programming Basic Notes](#functional-programming-basic-notes)
	* [Rules for expressions](#rules-for-expressions)
		* [samples](#samples)
	* [Standard ML](#standard-ml)
		* [functions](#functions)
		* [tuples](#tuples)
		* [lists](#lists)
		* [let expressions](#let-expressions)
		* [options](#options)
		* [boolean operations](#boolean-operations)

# Functional Programming Basic Notes

## Defination for Functionanl Programming

*   avoid mutation
*   first class functions
*   recursive data structures and recursive functions
*   laziness

## Datatype

### Datatype Binding

tagged union, every constructor name as tag, fields for different constructors can't exist at the same time

### Built-in Tagged Constructor

*   NONE
*   SOME i
*   []
*   x :: xs (infix constructor)
*   ()

### Type Constructor

type constructor: datatype bindings with variables

```sml
datatype 'a mylist = EMPTY | CONS of 'a * 'a mylist
mylist isn't a type, int list is a type
```

*   'a , 'a equivalent/different
*   'a, 'b different
*   ''a, ''a equivalent

## Pattern Matching

*   null/isSome check tag part（variant）
*   hd/tl/valOf check data part (extract data)

```sml
case e of
      p1 => e1
    | pn => en

val p = e (* declare multiple variables once time in p(pattern) *)

fun foo p = e (* declare multiple callee arguments(hidden to caller) once time in p(pattern) *)
```

In SML, all functions only take 1 argument, a tuple/record:

fun f (x, y, z) = x + y + z seems that takes 3 arguments, but truly owing to pattern matching only takes 1 tuple argument
Likewise, fun f () = 0 takes 1 empty tuple argument.

Futher more, tuples is syntactic sugar for records.

> As a whole: all functions only take 1 record argument owing to pattern matching.

## Tail Position, Tail expression, Tail Call and Tail Recursion

recursive defination for Tail Position:

*   if E isn't in tail position, then sub expressions of E aren't in tail position
*   if E is in tail position, then some sub expressions of E are in tail position

```sml
if eb then e1 else e2 
```

is in tail position, then e1 and e2 are in tail position, not eb

```sml
f (x, e)
```

is in tail position, then f is in tail position(tail call), not x and e

```sml
fun factorial n =
    let
        fun aux(n, acc) =
            if
                n = 0
            then
                acc
            else
                aux (n-1, n*acc)
    in
        aux (n,1)
    end
```

## Rules for expressions

*   Syntactic: syntax rules
*   Semantic: type checking rules
*   Runtime: evaluation rules

### samples

```ml
syntax: if e1 then e2 else e3
type: e1 = bool,  e2 = e3 = any
evaluation: e1 ? e2 : e3
```

## Standard ML

### functions

```ml
syntax: fun name (arg1: type1, .., argn: typen) = body
type: name = type1 * ... * typen -> body_type
lazy evaluation
```

### tuples

```ml
(* tuples *)
syntax: e = (e1, ..., en)
type: e1 * ... * en (can become fun's arguments list)
evaluation: #1 e, #2 e, ..., #n e
```

### lists

```ml
(* lists *)
syntax: l = [e1, ..., en]
type: [] = elem_type list; hd(head) l = elem_type, tl(tail) x = elem_type list
evaluation: cons = e :: l; null [] = false; 

> 6 :: [1, 3, 5]
```

### let expressions

```ml
syntax: let
            b1 b2 ... bn
        in
            body
        end
type: whole let type = body_type
evaluation: whole let result = body_result
```

### options

*   NONE  : type = 'a option
*   SOME e: type = `e_type` option
*   isSome: type = 'a option -> bool
*   valOf : type = 'a option -> 'a

### boolean operations

*   e1 andalso e2: keyword
*   e1 orelse e2 : keyword
*   not e1       : bool -> bool
*   `=`(equal) `<>`(not equal) `>` `<` `>=` `<=`: require two same type elem

### closure

#### lexical scope vs dynamic scope

*   lexical scope: function where defined
*   dynamic scope: function where called

#### compose and pipeline

```sml
fun sqrt_of_abs = Math.sqrt o Real.fromInt o abs

infix !>
fun x !> f = f x

fun sqrt_of_abs i = i !> abs !> Real.fromInt !> Math.sqrt
```

#### curry and uncurry

```sml
fun carry f x y = f (x, y)
fun uncarry f (x, y) = f x y

fun range (i, j) = if i > j then [] else i :: range(i+1, j)
fun countup = curry range 1

val arr = countup 7 (* maps to [1, 2, ..., 7] *)
```

## Type inference
