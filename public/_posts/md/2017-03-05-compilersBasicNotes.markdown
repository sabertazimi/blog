---
layout:     post
title:      "Compiler Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Compiler
    - C
    - C++
---

* [Compiler Basic Notes](#compiler-basic-notes)
	* [Basic Concepts](#basic-concepts)
		* [Defination of compilers](#defination-of-compilers)
		* [Structure of compilers](#structure-of-compilers)
	* [文法与语言](#文法与语言)
		* [符号与符号串](#符号与符号串)
		* [文法与语言的形式化表示](#文法与语言的形式化表示)
		* [乔姆斯基文法体系](#乔姆斯基文法体系)
		* [上下文无关文法](#上下文无关文法)
			* [文法表示](#文法表示)
			* [形式化表示](#形式化表示)
				* [简易表示](#简易表示)
				* [巴科斯范式(Backus-Naur Form)](#巴科斯范式backus-naur-form)
		* [正规文法](#正规文法)
		* [正则语言(Regular Expressions)](#正则语言regular-expressions)
			* [基本定义](#基本定义)
			* [形式表示](#形式表示)
			* [正则语法糖(Syntax Sugar)](#正则语法糖syntax-sugar)
		* [分析树](#分析树)
			* [推导类型](#推导类型)
			* [句型分析](#句型分析)
			* [meaning function(多对一)](#meaning-function多对一)
			* [二义性文法(一对多)](#二义性文法一对多)
				* [文法重写](#文法重写)
				* [优先级与结合性](#优先级与结合性)
		* [文法规则](#文法规则)
	* [Lexical Analysis](#lexical-analysis)
		* [Tokenizer - 词法分析器](#tokenizer---词法分析器)
			* [转移图算法](#转移图算法)
			* [关键字(keyword)处理](#关键字keyword处理)
		* [有限状态自动机(Finite Automaton)](#有限状态自动机finite-automaton)
			* [确定有限状态自动机(Deterministic Finite Automaton)](#确定有限状态自动机deterministic-finite-automaton)
				* [状态转移表实现 DFA](#状态转移表实现-dfa)
			* [非确定有限状态自动机(Nondeterministic Finite Automaton)](#非确定有限状态自动机nondeterministic-finite-automaton)
		* [自动词法分析器](#自动词法分析器)
			* [Thompson 算法: RegExp --> NFA](#thompson-算法-regexp----nfa)
			* [子集构造算法: NFA --> DFA](#子集构造算法-nfa----dfa)
			* [Hopcroft 算法](#hopcroft-算法)
			* [实现](#实现)
				* [DFA](#dfa)
					* [有向图](#有向图)
					* [转移表](#转移表)
	* [Syntax Analysis(语法分析)](#syntax-analysis语法分析)
		* [自顶向下分析](#自顶向下分析)
			* [避免回溯](#避免回溯)
			* [递归下降分析算法(Recursive Descent/预测分析算法)](#递归下降分析算法recursive-descent预测分析算法)
				* [算法实现](#算法实现)
			* [LL(1)分析算法](#ll1分析算法)
				* [nullable sets](#nullable-sets)
				* [first sets](#first-sets)
				* [follow sets](#follow-sets)
				* [select sets](#select-sets)
				* [分析表](#分析表)
				* [解决冲突(分析表某项有多个编号)](#解决冲突分析表某项有多个编号)
					* [消除直接左递归](#消除直接左递归)
					* [消除间接左递归](#消除间接左递归)
				* [非 LL(1) 文法/语言](#非-ll1-文法语言)
		* [自底向上分析](#自底向上分析)
			* [LR(0) 分析算法(移进-归约(reduce)算法)](#lr0-分析算法移进-归约reduce算法)
				* [短语(Handles)](#短语handles)
				* [分析表构造](#分析表构造)
				* [驱动代码](#驱动代码)
				* [解决冲突(SLR/LR(1)/LALR)](#解决冲突slrlr1lalr)
			* [LALR(k)](#lalrk)
			* [SLR](#slr)
				* [实现](#实现-1)
		* [抽象语法树](#抽象语法树)
			* [语法制导翻译(Syntax-Directed Translation)](#语法制导翻译syntax-directed-translation)
			* [抽象语法](#抽象语法)
			* [AST 的实现](#ast-的实现)
				* [数据结构](#数据结构)
				* [相关算法](#相关算法)
				* [构造算法](#构造算法)
	* [Semantic Analysis(语义分析)](#semantic-analysis语义分析)
		* [类型系统(type system)](#类型系统type-system)
			* [Type Checking](#type-checking)
			* [Type Environments](#type-environments)
			* [Typing Methods](#typing-methods)
		* [符号表(上下文相关)](#符号表上下文相关)
		* [类型检查](#类型检查)
		* [作用域检查](#作用域检查)
		* [类型相容性](#类型相容性)
		* [错误诊断](#错误诊断)
	* [Immediate Representation(IR)](#immediate-representationir)
		* [三地址码](#三地址码)
		* [控制流图](#控制流图)
			* [Block](#block)
			* [数据流分析与程序重写](#数据流分析与程序重写)
				* [数据分析方法](#数据分析方法)
					* [到达定义分析](#到达定义分析)
					* [活性分析](#活性分析)
	* [代码优化](#代码优化)
		* [组织管理](#组织管理)
			* [Activation Record(AR) / Frame](#activation-recordar--frame)
			* [全局变量](#全局变量)
			* [堆区](#堆区)
		* [优化类型](#优化类型)
		* [局部优化](#局部优化)
		* [全局优化](#全局优化)
			* [Dead Code Elimination](#dead-code-elimination)
			* [Constant Propagation](#constant-propagation)
			* [Liveness Analysis](#liveness-analysis)
			* [寄存器分配(Register Allocation/Graph Coloring)](#寄存器分配register-allocationgraph-coloring)
	* [Code Generation(代码生成)](#code-generation代码生成)
		* [递归下降代码生成算法](#递归下降代码生成算法)
			* [基于栈计算机](#基于栈计算机)
			* [基于寄存器计算机 (RISC)](#基于寄存器计算机-risc)
	* [Garbage Collection](#garbage-collection)
		* [Mark and Sweep](#mark-and-sweep)
		* [Stop and Copy](#stop-and-copy)
	* [Compilers Exercise](#compilers-exercise)
		* [C Declaration Interpreter](#c-declaration-interpreter)
		* [Cool(Classrom Object-Oriented Language)](#coolclassrom-object-oriented-language)
		* [Parser Implemention](#parser-implemention)

# Compiler Basic Notes

## Basic Concepts

### Defination of compilers

*   `program_code` ---compiler---> executable
*   data ---executable---> output

> e.g Fortran(formula translation) 1 project

### Structure of compilers

front-end to back-end:

*   front-end: src ---lexical analysis---> tokens ---parsing/syntax analysis---> AST(Abstract Syntax Tree) ---semantic analysis---> intermediate
*   back-end: intermediate ---...---> ... ---...---> ... ---code generation---> dist

details:

*   lexical analysis(词法分析)
*   parsing/syntax analysis(语法分析)
*   semantic analysis(语义分析): type and scope
*   optimization
*   code generation: translate to other high level language/assembly code/machine code

## 文法与语言

### 符号与符号串

*   字母表/符号集: 元素的非空有穷集合
*   符号串: 字母表中的符号组成的任何有穷序列
*   固有头/尾: 非空首/尾子串
*   闭包:   Σ* = Σ0 U Σ1 U ... U Σn ...
*   正闭包: Σ* = Σ1 U ... U Σn ...

### 文法与语言的形式化表示

*   文法(Grammar) G = (Vn, Vt, P, S) - 非终结符集, 终结符集, 规则/产生式集, 开始符号
*   语言(Language) L(G) = {x | S -*> x, x <- Vt*} 文法 G 一切句子的集合
*   句型: rhs of P, 句子: 不含非终结符的右部
*   直接推导: v -> w, 闭包推导: v -*> w, 正闭包推导: v -+> w

### 乔姆斯基文法体系

*   ((((3)2)1)0)
*   0 型文法: 任意文法
*   1 型文法: 上下文有关文法(context sensitive)  αAβ -> αηβ
*   2 型文法(语法工具): 上下文无关文法           A -> α
*   3 型文法(词法工具): 正规文法

### 上下文无关文法

#### 文法表示

G = (S, N, T, P):

*   S: 开始符
*   N: 非终结符集合
*   T: 终结符集合
*   P: 产生式规则集合 X -> beta1, beta2, ..., betan, X <- N, beta <- N+T

#### 形式化表示

##### 简易表示

```Bison
Sentence -> Noun Verb Noun
Noun -> sheep
	|	tiger
	|	grass
	|	water
Verb -> eat
	|	drink
```

> S: Sentence, N: Sentence/Verb/Noun, T: sheep/tiger/grass/water/eat/drink

```Bison
E -> num
	|id
	|E + E
	|E `*` E
```

> S: E, N: E, T: num/id/+/*

##### 巴科斯范式(Backus-Naur Form)

*   ::=             : "被定义为"
*   "word"          : 字符本身
*   双引号外的字     : 语法部分
*   尖括号( < > )   : 必选项(非终结符)
*   方括号( `[ ]` ) : 0/1
*   大括号( { } )   : 0/n
*   竖线( | )       : "OR"

### 正规文法

正规文法可与正则语言相互转化:

*   A -> aB|Ba
*   A -> a

### 正则语言(Regular Expressions)

#### 基本定义

对于给定的字符集 C:

*   空串 "\0" 是正则表达式
*   任意 char <- C 是正则表达式
*   若 M, N 是正则表达式, 则 M|N = {M, N}, MN = {mn|m <- M, n <- N}, M* = {"\0", M, MM, MMM, ...} (选择/连接/闭包)也是正则表达式

#### 形式表示

```regexp
// 具有顺序性
e -> "\0"		// basic defination
	| c			// basic defination
	| e | e		// recursive defination
	| ee		// recursive defination
	| e*		// recursive defination
```

#### 正则语法糖(Syntax Sugar)

*   `[a-z]` : a|...|z
*   c?      : 0/1 个c
*   c+      : 1/n 个 c
*   c{i, j} : i-j 个 c
*   "a*"    : a* 自身(非 kleen 闭包)
*   .       : 除 ‘\n’ 外的任意字符

```regexp
// 标识符
[a-zA-Z\_][a-zA-Z\_0-9]*

// decimal integer
(+|-)?(0|[1-9][0-9]*)

// decimal float
(+|-)?(0|[1-9][0-9]*|)?\.[0-9]+
```

### 分析树

进行文法推导时生成的树:

*   根        : 开始符
*   内部结点  : 非终结符
*   叶子结点  : 终结符
*   层        : 一步推导(优先级影响推导顺序)
*   叶子结点串: 最终表达式
*   后序遍历  : 最终结果

#### 推导类型

*   最左推导(leftmost)
*   最右推导(rightmost)(**规范推导**)

#### 句型分析

*   短语: 若 S -*> Aβ, A -+> α, 则称 α 是句型 αβ 相对于非终结符 A 的短语
*   直接短语: S -*> Aβ, A -> α
*   一个右句型的直接短语称为该句型的句柄(用于**自下而上**的归约分析)
*   最左归约: 归约最左的句柄, 最右归约: 归约最右的句柄

#### meaning function(多对一)

L(syntax) = semantic: 多个语法对应一个语义(不同形式的表达式对应同一个意思)

#### 二义性文法(一对多)

*   最左推导与最右推导得出的分析树不一致
*   若给定文法 G, 对于句子 s, 其有 2 种不同的分析树, 则称 G 是二义性文法
*   若一个上下文无关语言的所有文法都是二义性文法, 则称此语言是先天二义语言

##### 文法重写

```Bison
E -> E + T
	|T
T -> T * F
	|F
F -> num
	|id
```

> 消除 + 与 `*` 的二义性, 如 3+4`*`5

##### 优先级与结合性

声明优先级与结合性可在一定程度上消除文法的二义性

### 文法规则

*   有害规则: 使文法产生二义性的规则
*   多余规则: 不可达/不可终止的规则
*   2 型文法的 ε 规则: 当语言中不含有 ε 符号串, 则一定存在终结符集不含有 ε 的等价文法(代入法消除 ε)
*   保证非终结符 A 的有效性: S -*> αAβ, A -+> t

## Lexical Analysis

### Tokenizer - 词法分析器

*   Maximal match
*   Higher priority match

#### 转移图算法

```c
token nextToken(void) {
	char c = getChar();
	switch(c) {
		case '<':
			c = getChar();
			switch (c) {
				case '=':
					return LE;
				case '>':
					return NE;
				default:
					rollback();
					return LT;
			}

		case '=':
			return EQ;
		case '>':
			c = getChar();
			switch (c) {
				case '=':
					return GE;
				case '<':
					return NE;
				default:
					rollback();
					return GT;
			}
	}
}
```

#### 关键字(keyword)处理

*   根据 完美哈希算法(无冲突哈希函数) , 建立所有关键字对应的关键字完美哈希表
*   读入有效标识符(字符串型)后, 查询关键字哈希表, 检查当前标识符是否为关键字

```c
#define KEYWORD_MAXLEN 10

hash_one(char *str, int len) {
    unsigned int keyValue = 0;

    for (int i = 0; i < len; i++) {
        keyValue += str[i] * ((int)pow(33, len - i));
    }

    keyValue = (keyValue * 3 + 7) % KEYWORD_MAXLEN;
	return keyValue;
}
```

```c
#define KEYWORD_HASH_SEED 131

hash_two(char *str, int len) {
	unsigned int keyValue = 0,
    			 hash = 0;

    for (int i = 0; i < len; i++) {
        hash = hash * KEYWORD_HASH_SEED + str[i];
    }

    keyValue = hash & 0x7fffffff;
    return keyValue;
}
```

### 有限状态自动机(Finite Automaton)

#### 确定有限状态自动机(Deterministic Finite Automaton)

*   Only a transition for a state with a input
*   No epsilon moves

M = (AlphaSet/InputSet, StateSet, currentState, FiniteStateSet, transferFunction)

```c
A = {a, b}, SS = {0, 1, 2}, cS = 0, FS = {2},
transferFunction = {
	(cS0, a) -> cS1, (cS0, b) -> cS0,
	(cS1, a) -> cS2, (cS1, b) -> cS1,
	(cS2, a) -> cS2, (cS2, b) -> cS2,
}
```

##### 状态转移表实现 DFA

|状态\字符|a|b|
|:----------:|:-----:|:-----:|
|0|1|0|
|1|2|1|
|2|2|2|

#### 非确定有限状态自动机(Nondeterministic Finite Automaton)

transferFunction 中的次态不确定/不唯一(为一个开集合):

*   Multiple transitions for a state with a input
*   can epsilon moves

> (cS0, a) -> {cS1, cS2}

### 自动词法分析器

RegExp --Thompson 算法--> NFA --子集构造算法--> DFA --Hopcroft 最小化算法--> 词法分析器代码

#### Thompson 算法: RegExp --> NFA

*   直接构造基本 RegExp
*   递归构造复合 RegExp
*   epsilon : i --epsilon--> f
*   RegExp  : i --NFA(RegExp)--> f
*   选择    : i --NFA(RegExp1)--> f, i --NFA(RegExp2)--> f
*   连接    : i --NFA(RegExp1)--> m --NFA(RegExp2)--> f
*   闭包    : i --epsilon--> m --epsilon--> f, m --RegExp--> m

#### 子集构造算法: NFA --> DFA

由 Thompson 算法生成的 NFA, 当且仅当输入为 epsilon 时, 次态不唯一

*   将所有可达到次态作为一个集合 s, 视为单一次态 s
*   delta(Sigma) + epsilon-closure(深度/广度优先遍历找寻可达到次态边界)

```cpp
DFA subset_construction(NFA nfa) {
	s0 = eps_closure(n0);

	StateSet += s0;
	enqueue(s0);

	while (workqueue != []) {
		dequeue(s);

		foreach (ch in InputSet) {
			next_state = eps_closure(delta(s, ch));
			Fn[s, ch] = next_state;		// DFA 中的转移函数

			if (next_state not in StateSet) {
				StateSet += next_state;
				enqueue(next_state);
			}
		}
	}

	return DFA(StateSet, Fn);
}
```

#### Hopcroft 算法

最小化 DFA(数字逻辑中的最简状态表), 合并等价状态(等价类)

```cpp
split(StateSet S) {
	foreach (char ch) {
		if (ch can split S) {
			split S into S1, ..., Sk;
		}
	}
}

hopcroft(DFA) {
	split all nodes into InitStateSet and FiniteStateSet (Two State Sets);

	while (set is still changes) {
		split(S);
	}
}
```

#### 实现

##### DFA

###### 有向图

###### 转移表

*   行: 现态
*   列: 输入
*   值: 次态/ERROR/-1

驱动代码: table 用于实现 switch/case, stack 用于实现最长匹配

```cpp
next_token() {
	state = 0;
	stack = [];

	while (state != ERROR) {
		c = getChar();

		if (state is ACCEPT/FINITE) {
			clear(stack);
		}

		push(state);
		state = table[state][c];
	}

	while (state is not ACCEPT/FINITE) {
		state = pop();
		rollback();
	}
}
```

## Syntax Analysis(语法分析)

Tokens + Grammar --Syntax Analysis--> AST(Abstract Syntax Tree)

### 自顶向下分析

*   从开始符号出发推导任意句子 t, 与给定句子 s 进行比较分析
*   利用分析树进行逐叶子匹配, 若匹配失败则进行回溯

```cpp
bool top_down_parsing(tokens[]) {
	i = 0;
	stack = [S];

	while (stack != []) {
		if (stack[top] is a terminal t) {
			t == tokens[i] ? pop(i++) : backtrack();
		} else if (stack[top] is a nonterminal T) {
			pop();
			push(T next expansion);	// 自右向左压栈, e.g pop(S), push(N_right), push(V), push(N_left)
		} else {
			throw new SyntaxError();
		}
	}

	return i >= tokens.length && is_empty(stack) ? true : false;
}
```

#### 避免回溯

利用前看符号避免回溯

```Bison
Sentence -> Noun Verb Noun
Noun -> sheep
	|	tiger
	|	grass
	|	water
Verb -> eat
	|	drink
```

> tiger eat water: 向前看非终结符推导出的所有终结符中匹配tiger的终结符; 不向前看,则先推导 N, 再推导 n, 但 n 不一定匹配 tiger, 则需进行回溯; 向前看一个字符, 直接推导 N --> n, 同时直接找寻匹配 tiger 的终结符

```Bison
S -> N V N
N -> (sheep)tiger
V -> eat
N -> (sheep-tiger-grass)water
```

#### 递归下降分析算法(Recursive Descent/预测分析算法)

*   分治算法: 每个非终结符构造一个**分析函数**
*   前看符号: 用**前看符号**指导产生式规则的选择(expansion)

```cpp
parse_S(tokens[]) {
	parse_N(tokens[0]);
	parse_V(tokens[1]);
	parse_N(tokens[2]);
}

parse_N(token) {
	if (token == s|t|g|w) {
		return true;
	} else {
		throw new SyntaxError();
	}
}

parse_V(token) {
	if (token == e|d) {
		return true;
	} else {
		throw new SyntaxError();
	}
}
```

##### 算法实现

*   tip one: use save pointer to implement roll back
*   tip two: use logical OR expression to replace nested if-else structure

```c
bool term(TOKEN tok) {
    return *next++ == tok;
}

bool E1(void) {
    return T();
}

bool E2(void) {
    return T()
        && term(PLUS)
        && E();
}

bool E(void) {
    // roll back pointer
    TOKEN *save = next;

    return (next = save, E1())
        || (next = save, E2());
}

bool T1(void) {
    return term(INT);
}

bool T2(void) {
    return term(INT)
        && term(TIMES)
        && T();
}

bool T3(void) {
    return term(OPEN)
        && E()
        && term(CLOSE);
}

bool T(void) {
    // roll back pointer
    TOKEN *save = next;

    return (next = save, T1())
        || (next = save, T2())
        || (next = save, T3());
}
```

```cpp
// X -> a
// 	|	XX
// 	|	aXXX
// 	|	aXXXXb
parse_X() {
	token = nextToken();

	switch (token) {
		case ...: // i: token == atom_char or parse_XX();
		case ...: // j: token == atom_char, token = nextToken(), parse_XXX();
		case ...: // k: token == atom_char, token = nextToken(), parse_XXXX(), token=nextToken(), token == b
		default: throw new SyntaxError();
	}
}
```

#### LL(1)分析算法

*   从左(L)向右读入程序(left to right scan)
*   最左(L)推导: 优先推导最左侧非终结符(leftmost derivation)
*   一个(1)前看符号(look ahead)
*   分治算法: 每个非终结符构造一个**first set** 和一个 **follow set**, 最后为每个规则构造一个 **select set**
*   分析表驱动(由 first sets/follow sets/select sets 推导分析表)

```cpp
bool ll1_parsing(tokens[]) {
	i = 0;
	stack = [S];

	while (stack != []) {
		if (stack[top] is a terminal t) {
			t == tokens[i] ? pop(i++) : throw new SyntaxError();
		} else if (stack[top] is a nonterminal T) {
			pop();
			// push(T correct expansion);
			// 自右向左压栈, e.g pop(S), push(N_right), push(V), push(N_left)
			push(select_table[T][tokens[i]] 对应项(规则编号)所对应规则的右边式子);
		} else {
			throw new SyntaxError();
		}
	}

	return i >= tokens.length && is_empty(stack) ? true : false;
}
```


##### nullable sets

*   存在规则: X -> epsilon
*   或者    : X -> Y1Y2...Yn, 且存在规则 Y1 -> epsilon, ..., Yn -> epsilon
*   即      : X -*>  epsilon (epsilon <- first(X))

```cpp
nullable = {};

while (nullable is still changing) {
	foreach (production p: X -> beta) {
		if ((beta == epsilon) || (beta == Y1...Yn && Y1 <- nullable && ... && Yn <- nullable)) {
			nullable += X;
		}
	}
}
```

##### first sets

first(X) = {t | X -*> talpha} U {epsilon | X-*>epsilon} :

*   first(t)  = {t}
*   epsilon<-first(X): X -> epsilon or X -> A1...An, epsilon<-first(Ai)
*   first(alpha)<-first(X): X -> A1..Analpha, epsilon<-first(Ai)

first sets 不动点算法:

```cpp
foreach (nonterminal N) {
	first(N) = {};
}

while (some sets is changing) {
	foreach (production p: N->beta1...betan) {
		foreach (betai from beta1 upto betan) {
			if (betai == a) {
			// e.g N->abX: first(N) += {a}
				first(N) += {a};
				break;
			} else if (betai == M) {
				first(N) += first(M);
				if (M is not in nullable) {
					break;
				} // else continue this loop to add first(beta_next) into first(N)
			}
		}
	}
}
```

|Nonterminal|First Set|
|:-----:|:----------:|
|S|{s, t, g, w}|
|N|{s, t, g, w}|
|V|{e, d}|

##### follow sets

follow(X) = {t | S -*> beta X t epsilon} :

*   for X -> AB:
    *   first(B) <- follow(A), follow(X) <- follow(B)
    *   if B -*> epsilon: follow(X) <- follow(A)
*   A -> alpha X beta: first(beta) - {epsilon} <- follow(X)
*   $ <- follow(S)

follow sets 不动点算法:

```cpp
foreach (nonterminal N) {
	follow(N) = {};
}

while (some sets is changing) {
	foreach (production p: N->beta1...betan) {

        // temp: follow(left) <- follow(right)
		temp = follow(N);

		foreach (betai from betan downto beta1) {
			if (betai == a) {
				temp = {a};
			} else if (betai == M) {
				follow(M) += temp
				temp = (M is not nullable) ? (first(M)) : (temp + first(M))
			}
		}
	}
}
```

##### select sets

*   当 N -> Y1...Yn 右边 Y 全为 nullable 时, select(p) += follow(N)

select sets 不动点算法:

```cpp
foreach (production p) {
	select(p) = {}
}

calculate_select_set(production p: N->beta1...betan) {
	foreach (betai from beta1 upto betan) {
		if (betai == a) {
			select(p) += {a};
			break;
		} else if (betai == M) {
			select(p) += first(M);
			if (M is not in nullable) {
				break;
			}
		}
	}

	// all betas are in nullable (当前规则的所有右边符号都是可空集)
	//　故, select(p) 必须包括 follow(M) (当推导出右边符号都为空时, first(p) 即为 follow(M))
	if (i > n) {
		first(N) += follow(N);
	}
}
```

##### 分析表

*   结合 nullable sets 准确求出 first sets
*   再利用 first sets 准确求出 follow sets
*   再利用 first sets, 并结合 follow sets(全空集修正) 准确求出 分析表:

```Bison
0: z -> d
1:	|	X Y Z
2: Y -> c
3:	|
4: X -> Y
5:	|	a
```
nullable = {X, Y}

||X|Y|Z|
|:-----:|:-----:|:-----:|:-----:|
|first|{a, c}|{c}|{a, c, d}|
|follow|{a, c, d}|{a, c, d}|{}|

|production|0|1|2|3|4|5|
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|select|{d}|{a, c, d}|{c}|{a, c, d}|{a, c, d}|{a}|

|Non\Terminal|a|c|d|
|Z|1|1|0, 1|
|Y|3|2, 3|3|
|X|4, 5|4|4|

> 数字为规则编号

##### 解决冲突(分析表某项有多个编号)

通过文法重写消除左递归, 使文法适应 L(最左推导):

*   改写成右递归文法
*   规定优先级与结合性
*   提取左公因式(Common Prefix)

```Bison
E -> T+E
    |T

E -> TX
X -> +E
    |epsilon
```

###### 消除直接左递归

```Bison
S -> Salpha1
    |Salpha2
    ...
    |Salphan
    |beta1
    |beta2
    ...
    |betam

S -> beta1S'
    |beta2S'
    ...
    |betanS'
S'-> alpha1S'
    |alpha2S'
    ...
    |alphanS'
    |epsilon
```

###### 消除间接左递归

*   把文法 G 的所有非终结符按任一顺序排列, e.g A1, A2, …, An
*   消除 Ai 规则中的直接左递归: 把形如 Ai→Ajγ 的产生式改写成 Ai→δ1γ /δ2γ /…/δkγ(其中 Aj→δ1 /δ2 /…/δk 是关于的 Aj 全部规则)
*   去掉多余的规则(不可达规则)

```cpp
#include <iostream>
#include <string>
#include <fstream>

using namespace std;

struct WF {
    string left;	//定义产生式的左部
    string right;	//定义产生式的右部
};

/*
 * count: number of non-terminal symbols
 */
void Removing(WF *p,char *q,int n,int count) {

    int count1 = n;
    int flag = 0;

	// 判断第一个非终结符是否存在直接左递归 if(p[i].left[0]==q[0])
    for (int i = 0; i < n; i++) {
        if (p[i].left[0] == p[i].right[0]) {
            flag++;
        }
    }

	// 如果存在直接左递归则消除直接左递归
    if (flag != 0)
    {
        for (int i = 0; i < n; i++) {
            if (p[i].left[0] == q[0]) {
                if (p[i].left[0] == p[i].right[0]) {
                	string str;
                    str = p[i].right.substr(1,int (p[i].right.length()));	// 取右部第二位开始的字串赋给str

                    // E->E+T => E'->+TE'
                    string temp = p[i].left;
                    string temp1 = "'";
                    p[i].left = temp+temp1;
                    p[i].right = str+p[i].left;
                } else {
                    // E->T => E->TE'
                    string temp=p[i].left;
                    string temp1="'";
                    temp=temp+temp1;
                    p[i].right=p[i].right+temp;
                }
            }
        }

        string str="'";
        p[count1].left=p[0].left[0]+str;
        p[count1].right="ε";
    }


	// 对每一个非终结符迭代
    for ( int i = 0; i <= count; i++) {

    	// 对每一个小于 i 的非终结符
        for (int j = 0; j < i; j++) {

        	// 对每一个产生式
            for (int g = 0; g < n; g++) {

            	// i 非终结符与第 g 产生式左边第一个字母相等
                if (q[i] == p[g].left[0]) {

					// g 产生式右边产生式第一个符号与第 j 个非终结符相等
                    if (p[g].right[0] == q[j]) {
                        for (int h = 0; h < n*n; h++) {
                            if (p[h].left[0] == q[j] && int (p[h].left.length()) == 1) {
                                string str;
                                str = p[g].right.substr(1,int (p[g].right.length ()));
                                p[++count1].left = p[g].left;
                                p[count1].right = p[h].right + str;
                            }
                        }

                        p[g].left="";
                        p[g].right="";
                    }
                }
            }
        }
    }

	// 去除间接递归产生式
    for(int i = 0; i <= count; i++) {
        flag = 0;

        for (int j = 0; j < n*n; j++) {
            if (p[j].left[0] == q[i]) {
                if(p[j].left[0] == p[j].right[0]) {
                    flag++;
                }
            }
        }

        if (flag != 0) {
            for (int j = 0; j <= n*n; j++) {
                if (p[j].left[0] == q[i]) {
                    if (p[j].left[0] == p[j].right[0]) {
                        string str;
                        str = p[j].right.substr(1,int (p[j].right.length()));
                        string temp = p[j].left;
                        string temp1 = "'";
                        p[j].left = temp + temp1;
                        p[j].right = str + p[j].left;
                    } else {
                        string temp = p[j].left;
                        string temp1 = "'";
                        temp = temp + temp1;
                        p[j].right = p[j].right + temp;
                    }
                }
            }

            string str = "'";
            p[++count1].left = q[i] + str;
            p[count1].right = "ε";
        }
    }
}

int Delete(WF *p,int n) {
    return 0;
}

int main() {
    ofstream OutFile("jieguo.txt");

    int i,
    	j,
    	flag = 0,
    	count = 1,
    	n;

    cout<<"请输入文法产生式个数n："<<endl;
    cin>>n;
    WF *p=new WF[50];
    cout<<"请输入文法的个产生式："<<endl;

	// input productions
    for (i = 0; i < n; i++) {
        cin>>p[i].left;
        cout<<"->"<<endl;
        cin>>p[i].right;
        cout<<endl;
    }
    cout<<endl;
    OutFile<<"即输入的文法产生式为："<<endl;

    // cout<<"即输入的文法产生式为："<<endl;
    for (i = 0; i < n; i++) {
        // cout<<p[i].left<<"-->"<<p[i].right<<endl;
        OutFile<<p[i].left<<"-->"<<p[i].right<<endl;
    }
    OutFile<<"*********************"<<endl;

    // cout<<"*********************"<<endl;
    char q[20];				// 对产生式的非终结符排序并存取在字符数组q
    q[0] = p[0].left[0];	// 把产生式的第一个非终结符存入q中

	// 对非终结符排序并存取
    for (i = 1; i < n; i++) {
        flag = 0;
        for (j = 0; j < i; j++) {
			// 根据j<i循环避免重复非终结符因此由标志位判断
            if(p[i].left==p[j].left) {
            	flag++;
            }
        }

        if(flag==0) {
        	// 没有重复加入q数组中
            q[count++]=p[i].left[0];
        }
    }
    count--;

	// 调用消除递归子函数
    Removing(p,q,n,count);
    // 删除无用产生式
    Delete(p,n);

    OutFile<<"消除递归后的文法产生式为："<<endl;
    // cout<<"消除递归后的文法产生式为："<<endl;
    for (i = 0; i <= count; i++) {
        for (int j = 0; j <= n*n; j++) {
            if ((p[j].left[0] == q[i]) && int (p[j].left.length ()) == 1) {
                OutFile<<p[j].left<<"-->"<<p[j].right<<endl;
				// cout<<p[j].left<<"-->"<<p[j].right<<endl;
            } else {
            	continue;
            }
        }

        for (j = 0; j <= n*n; j++) {
            if((p[j].left[0] == q[i]) && int (p[j].left.length ()) == 2) {
                OutFile<<p[j].left<<"-->"<<p [j].right<<endl;
        		// cout<<p[j].left<<"-->"<<p[j].right<<endl;
            } else {
            	continue;
            }
        }
    }
    return 0;
}
```

##### 非 LL(1) 文法/语言

*   ambiguous grammar
*   left recursive grammar
*   not left factored grammar(未提取展开式的公因子)

### 自底向上分析

```Bison
0: S -> E
1: E -> E + T
2:	|	T
3: T -> T * F
4:	|	F
5: F -> n
```

```instance
2 + 3 * 4
=> F + 3 * 4
=> T + 3 * 4
=> E + 3 * 4
=> E + T * 4
=> E + T * F
=> E + T
=> E
=> S
```

>   最右推导(优先推导最右侧非终结符)逆过程

#### LR(0) 分析算法(移进-归约(reduce)算法)

*   从左向右读入程序(left to right scan), 逆向最右推导(rightmost derivation), 不用前看符号
*   添加伪开始符号: S' -> . S$   `$表示 tokens/file 结束符`
*   移进        : 读入记号 `push(token[i])`
*   归约(reduce):         `pop(right expansion)` `push(left expansion)`

##### 短语(Handles)

```Bison
S -*> αXω -> αβω
```

β 是 αβω 的一个短语(Handle)

##### 分析表构造

LR(0) 分析表构造算法: (原理同于 Hopcroft 算法)

*   E -> A, A -> B, B -> C ... :Recursively, right hand side of C production will be reduced to E finally

```cpp
closure(production_set p) {
	while (p is still changing) {
		foreach (p's item i: A -> b . B ...) {
			p += {B -> . y...}
		}
	}
}

goto(production_set p, token x) {
	temp = {}

	foreach (p's item i: A -> b . x...) {
		temp += {A -> bx . ...}
	}

	return closure(temp)
}
```

```cpp
p0 = closure(S'' -> . S $)
(production_with_dot_)set = {p0}
Q = enqueue(p0)

while (Q is not empty) {
	p = dequeue(Q)

	foreach (x <- Nonterminal||Terminal) {
		q = goto(p, x)

		if (x <- Terminal) {
			ACTION[p, x] = q
		} else {
			GOTO[p, x] = q
		}

		if (q not <- set) {
			set += {q}
			enqueue(q)
		}
	}
}
```

##### 驱动代码

LR(0) 驱动算法:

```cpp
stack[];
push($)
push(state1)

while (true) {
	token t = nextToken()
	state s = stack[top]

	if (ACTION[s, t] == shifti) {
		push(t)
		push(statei)
	} else if (ACTION[s, t] == reducej) {
		// X is the left side of production j: X->beta
		// beta is the right side of production j: X->beta

		// pop up right side
		pop(beta && bundle state variables)

		// current state after pop up all bundle state(of beta)
		state s = stack[top]

		// push left side
		push(X)

		// transfer state after reduce
		push(GOTO[s, X])
	} else {
		throw new SyntaxError();
	}
}
```

##### 解决冲突(SLR/LR(1)/LALR)

采取与 first/follow/select sets 以及 前看符号 类似策略:

*   `production_with_dot_set` 中的 item 修改为 `X -> [beta1 . betan..., a]` 二元组
*   closure(production_set p) 中闭包规则从 `X -> [a . Y beta,a]` 修改为 `Y -> [.y, b]` b <- select(beta a)

#### LALR(k)

#### SLR

Simple LR: improves LR(k) shift/reduce heuristic

New reduce rule:

*   state contains item X -> β.
*   next_token <- follow(X)

##### 实现

*   stack pair: `<input, state>`
*   state i: if has item X -> α.aβ , goto[i, a] = j then action[i, a] = shift j(shift then to state j)
*   state i: if has item X -> α. , a <- follow(X) then action[i, a] = reduce(X -> α)
*   state i: if has item S' -> S then action[i, $] = accept
*   otherwise: action[i, a] = error

### 抽象语法树

#### 语法制导翻译(Syntax-Directed Translation)

在进行归约(reduce)的同时, 进行语义动作:

*   给每条产生规则附加一个语义动作

```bison
exp : exp '+' exp { $$ = $1 + $3; }
;
```

*   在分析栈中压入 symbol, value, state (原本只压入 symbol, state)

```cpp
push(right side symbol);
push(right side value);
push(next state);
```

#### 抽象语法

*   表达语法结构的内部表示, 作为前端(词法语法分析)和后端(代码生成)的中间件, tokens --语法分析器--> 抽象语法(树) --代码生成器--> 目标代码
*   抽象语法无需考虑左/右递归, 左公因子提取, 分隔符等

```Bison
// 具体语法
E: E + T
 | T
 ;
T: T * F
 | F
 ;
F: n
 | (E)
 ;

// 抽象语法
E: n
 | E + E
 | E * E
```

#### AST 的实现

##### 数据结构

```Bison
E: n
 | E + E
 | E * E
```

```c
enum kind {
	E_INT,
	E_ADD,
	E_TIMES
};

struct exp {
	enum kind kind;
};

struct exp_int {
	enum kind kind;
	int value;
};

struct exp_add {
	enum kind kind;
	struct exp *left;
	struct exp *right;
};

struct exp_times {
	enum kind kind;
	struct exp *left;
	struct exp *right;
};

struct exp_int *new_exp_int(int value) {
	struct exp_int *p = (struct exp_int *)malloc(sizeof(struct exp_int));
	if (!p) throw new Error();
	p->kind = E_INT;
	p->value = value;
	return p;
}

struct exp_add *new_exp_add(exp *left, exp *right) {
	struct exp_add *p = (struct exp_add *)malloc(sizeof(struct exp_add));
	if (!p) throw new Error();
	p->kind = E_ADD;
	p->left = left;
	p->right = right;
	return p;
}

struct exp_times *new_exp_times(exp *left, exp *right) {
	struct exp_tiems *p = (struct exp_times *)malloc(sizeof(struct exp_times));
	if (!p) throw new Error();
	p->kind = E_TIMES;
	p->left = left;
	p->right = right;
	return p;
}
```

##### 相关算法

```cpp
int nodes_num(exp *e) {
	switch (e->kind) {
		case E_INT:
			return 1;
		case E_ADD:		// fall through
		case E_TIMES:
			return 1 + nodes_num(e->left) + nodes_num(e->right);
		default:
			throw new SyntaxError("compile bug");
	}
}
```

```cpp
int pretty_print(exp *e) {
	switch (e->kind) {
		case E_INT:
			printf("%d", e->value);
			return 1;
		case E_ADD:
			printf("(");
			pretty_print(e->left);
			printf(")");
			printf("+");
			printf("(");
			pretty_print(e->right);
			printf(")");
			return 1;
		case E_TIMES:
			printf("(");
			pretty_print(e->left);
			printf(")");
			printf("*");
			printf("(");
			pretty_print(e->right);
			printf(")");
			return 1;
		default:
			throw new SyntaxError();
			break;
	}
}
```

##### 构造算法

利用语法制导翻译, 在语法动作(action)/语法归约(reduce)中加入生成语法树的代码(自底(叶子)向上(根)构造函数)

```Bison
E: E + E { $$ = new_exp_add($1, $3); }
 | E * E { $$ = new_exp_times($1, $3); }
 | n     { $$ = new_exp_int($1); }
 ;
```

## Semantic Analysis(语义分析)

*   声明检查(identifiers declaration)
*   定义检查:
    *   class 仅可定义一次
    *   method 在同一 class 中仅可定义一次
*   类型检查(types)
*   作用域检查
*   继承关系(inheritance relationships)
*   上下文**相关**分析(检查抽象语法树上下文相关的属性)

AST + semantic of programming language --semantic analysis--> intermediate

e.g 变量/函数必须先声明再使用; 每个表达式必须有合适类型(左值/右值); 函数调用与函数定义保持一致(函数签名)

```Bison
P: D S
 ;

D: T id ';' D
 |
 ;

T: int
 | bool
 ;

S: id = E
 | printi (E)
 | printb (E)
 ;

E: n
 | id
 | true
 | false
 | E + E
 | E && E
 ;
```

### 类型系统(type system)

#### Type Checking

`├ e: T` meas e 可计算为类型为 T 的值

#### Type Environments

*   Object(identifier) = Type
*   `O` Type environments 是一个函数, 将 object identifiers 映射成 types
*   `O ├ e: T` 表示在 O 函数作用下, 可证明 e 的类型为 T

```type
// input x
// output T
O[T/x](x) = T

O[T/x](y) = O(y)
```

```type
[Var]
O(x) = T
----------
O ├ x: T

[Let without Init]
O[T0/x] ├ e1: T1
--------------------
O ├ let x: T0 in e1: T1
```
#### Typing Methods

*   Method(ClassName, functionName) = (Type1, ..., Typen, Typen+1)
*   Typen+1 为返回值的类型, 即方法自身的类型

```type
[Dispatch]
O,M ├ e0: T0
O,M ├ e1: T1
...
O,M ├ en: Tn
M(T0, func) = (T1', ..., Tn', Tn+1')
Ti <= Ti'
----------
O,M ├ e0.func(e1, ..., en): Tn+1'
```

### 符号表(上下文相关)

用来存储程序中变量的相关信息:

*   类型: 字典结构 (key, type)
*   作用域:
    *   进入作用域, 插入元素(插入哈希表首, 屏蔽外部同名变量); 离开作用域, 删除元素
    *   进入作用域, 压入新符号表; 离开作用域, 弹出栈顶符号表
*   访问控制权
*   命名空间: 变量, 标签, 形参, 标号 各自拥有一类符号表

可将符号表实现为:

*   哈希表: 查找时间复杂度 O(1);
*   红黑树: 查找时间复杂度 O(lg N);

```cpp
#ifndef XX_SEMANTIC_TABLE_H
#define XX_SEMANTIC_TABLE_H

typedef enum type type_t;
typedef char * key_t;    // typedef int hash_t; typedef hash_t key_t;
typedef struct value {
	type_t type;
	scope_t scope;
} value_t;

typedef ... table_t;	// 符号表数据结构

table_t new_table(void);
int table_insert(table_t table, key_t id, value_t info);
value_t table_search(table_t table, key_t id);

#endif
```

### 类型检查

*   table: 字典结构 (key, type) (Hash Table/Red Black Tree)
*   type environment(Object, Methods, Class) is passed from parent to child(down the tree)
*   types are passed from child to parent(up the tree)

```cpp
TypeCheck(Environment/OMC, e1+e2) = {
    T1 = TypeCheck(OMC, e1);
    T2 = TypeCheck(OMC, e2);
    Check T1 == T2 == Int;
    return Int;
}

TypeCheck(OMC, let x: T <- e0 in e1) = {
    T0 = TypeCheck(OMC, e0);
    T1 = TypeCheck(OMC.add(O(x)=T), e1);
    Check subtype(T0, T1);  // T0 <= T1
    return T1;
}
```

```cpp
enum type {INT, BOOL};
table_t table;	// symbol table

// dec_t, stm_t, exp_t: AST 中的结点

enum type check_prog(dec_t d, stm_t s) {
	// 生成符号表
	table = check_dec(d);
	// 根据符号表检查语句
	return check_stm(s);
}

// 生成符号表
table_t check_dec(dec_t d){
	foreach(T id <- d) {
		table_insert(table, id, T);
	}
}

enum type check_stm(table_t table, stm_t s) {
	switch (s->kind) {
		case STM_ASSIGN:
			t1 = table_search(table, id);
			t2 = check_exp(table, s->exp);
			if (t1 != t2) {
				throw new SemanticError("type mismatch");
			} else {
				return t1;
			}
		case STM_PRINTI:
			t = check_exp(s->exp);
			if (t != INT) {
				throw new SemanticError("type mismatch");
			} else {
				return INT;
			}
		case STM_PRINTB:
			t = check_exp(s->exp);
			if (t != BOOL) {
				throw new SemanticError("type mismatch");
			} else {
				return BOOL;
			}
	}
}

enum type check_exp(exp_t e) {
	switch (e->kind) {
		case EXP_INT:
			return INT;
		case EXP_ID:
			t = table_search(table, id);	// 查询符号表, 得到变量类型
			if (id not exist) {
				throw new SemanticError("id not found");
			} else {
				return t;
			}
		case EXP_TRUE:
			return BOOL;
		case EXP_FALSE:
			return BOOL;
		case EXP_ADD:
			enum type t1 = check_exp_type(e->left);
			enum type t2 = check_exp_type(e->right);
			if (t1 != INT || t2 != INT) {
				throw new SemanticError();
				break;
			} else {
				return INT;
			}
		case EXP_AND:
			enum type t1 = check_exp_type(e->left);
			enum type t2 = check_exp_type(e->right);
			if (t1 != BOOL || t2 != BOOL) {
				throw new SemanticError();
				break;
			} else {
				return BOOL;
			}
		default:
			throw new SemanticError();
			break;
	}
}
```

### 作用域检查

table:

*   进入作用域, 插入元素(插入哈希表首, 屏蔽外部同名变量); 离开作用域, 删除元素
*   进入作用域, 压入新符号表; 离开作用域, 弹出栈顶符号表

### 类型相容性

*   名字不同但结构相同的类型是否相等
*   面向对象的继承类: is-a 关系 Parent parent = child;

### 错误诊断

*   准确的错误信息: 出错位置等
*   大量的错误信息
*   一定的自纠功能

## Immediate Representation(IR)

*   树与有向无环图(DAG)
*   三地址码(3-address code)
*   控制流图(CFG)
*   静态单赋值形式(SSA)
*   连续传递风格(CPS)

### 三地址码

*   原子表达式
*   简单控制流 cjmp/jmp
*   抽象的机器代码(伪代码)

### 控制流图

#### Block

*   block_t: { label_t; stm_list; jmp_t; }
*   扫描三地址码, 生成blocks
*   图论算法:结点为 blocks, 边为跳转边

死基本块删除优化：删除遍历不到的语句块

#### 数据流分析与程序重写

*   根据数据流分析得到的信息, 对三地址码/控制流图进行重写
*   后端的每一个阶段都可进行数据流分析

> 常量传播优化: 将赋值语句右端变量直接替换为常量, 减少访存

##### 数据分析方法

###### 到达定义分析

分析变量的哪些定义点可以到达变量的使用点处, 若可达定义唯一则可进行常量传播优化:

*   in set = prior out set
*   out set = self set + in set - kill set(重复定义点)

###### 活性分析

*   寄存器分配优化 活跃区间不相交的变量可共用一个寄存器
*   并行优化 使用区间并行的计算可并行执行

## 代码优化

### 组织管理

#### Activation Record(AR) / Frame

用于管理过程活性(procedure activation)的信息:

*   result: 置于记录的顶层, 便于访问此结果
*   argument
*   return address
*   control link: 指向调用者(上级)

#### 全局变量

不存于 AR 中, 存于静态数据段

#### 堆区

new/malloc 得到的变量/对象不存于 AR 中, 存于堆区

### 优化类型

*   Local optimizations
*   Global optimizations
*   Inter-procedural optimizations

### 局部优化

*   常量折叠优化: 所有代入常量的地方全部代入常量 `1 + 2 => 3`
*   代数化简优化: `a=1*b => a=b` `2*a=>a<<1` (all tips from csapp)
*   复制传播(copy propagation)优化: 利用前面计算出来的结果, 直接替换后面所有出现在右边的已计算左式(寄存器)

### 全局优化

#### Dead Code Elimination

*   CFG中(控制流分析) 死代码块删除优化

#### Constant Propagation


CFG中(数据流分析-可达定义分析) 常量传播(constant propagation)优化:

*   **forwards analysis**
*   C(stm, x, in) = value of x before stm ; C(stm, x, out) = value of x after stm
*   bottom < c < top => C(stm, x, in) = least_upper_bound{ C(prev_stmi, x, out) }:
    *   C(prev_stm, x, out) = top(nondeterministic)  => C(stm, x, in) = top
    *   C(prev_stm1, x, out) != C(prev_stm2, x, out) => C(stm, x, in) = top
    *   C(prev_stami, x, out) = c/bottom(dead code)  => C(stm, x, in) = c
*   C(stm, x, in) = bottom => C(stm, x, out) = bottom
*   C(x := c, x, out) = c
*   C(x := f(), x, out) = top
*   init: set entry to C = top, set anywhere else to C = bottom

#### Liveness Analysis

CFG中 数据流分析-活性分析(liveness analysis), 可用于复制传播优化与寄存器分配优化:

*   **backwards analysis**
*   L(stm, x, out) = V { L(next_stm, x, in)}
*   L(... := f(x), x, in) = true
*   L(x := e, x, in) = false
*   L(none x, x, in) = L(none x, x, out)
*   init: L(...) = false

#### 寄存器分配(Register Allocation/Graph Coloring)

*   当 t1 与 t2 同时具有活性时, 不可共享寄存器; 反之, t1 与 t2 不同时具有活性, 可以共享寄存器
*   当 t1 与 t2 同时具有活性时, 添加一条边连接 t1 与 t2, 构建 register interference graph(RIG)
*   colors number = registers number, k-colorable problem

## Code Generation(代码生成)

为数据分配计算资源:

*   数据: 全局变量, 局部变量, 动态分配变量
*   资源: 寄存器(register), 数据区(.data, .bss), 代码区(.code), 栈区(runtime stack), 堆区(user heap)

> 当前局部变量应该放在寄存器还是内存区?

为代码选择计算指令(等价性):

*   代码: 表达式/语句/函数代码
*   指令: 算术/比较/跳转/调用/返回指令

```Bison
P: D S
 ;

D: T id ';' D
 |
 ;

T: int
 | bool
 ;

S: id = E
 | printi (E)
 | printb (E)
 ;

E: n
 | id
 | true
 | false
 | E + E
 | E && E
 ;
```

### 递归下降代码生成算法

#### 基于栈计算机

Mem + Stack + ALU

> JVM(Java Virtual Machine)

```Bison
s: push NUM
 | load x
 | store x
 | add
 | sub
 | times
 | div
 ;
```

```cpp
gen_prog(dec_t d, stm_t s) {
	gen_dec(d);
	gen_stm(s);
}

gen_dec(T id; D) {
	// stack_code(".int id")
	gen_type(T);
	emit(" id");

	gen_dec(D);
}

gen_type(type_t t) {
	switch(t-kind) {
		case INT:	// fall through
		case BOOL:
			emit(".int");
			break;
	}
}

gen_stm(stm_t s) {
	switch (s->kind) {
		STM_ASSIGN:
			gen_exp(s->exp);
			emit("store s->id");
			break;
		STM_PRINTI:
			gen_exp(s->exp);
			emit("printi");
			break;
		STM_PRINTB:
			gen_exp(s->exp);
			emit("printb");
			break;
	}
}

gen_exp(exp_t e) {
	switch (e->kind) {
		case EXP_INT:
			emit("push e->value");	// n
			break;
		case EXP_ID:
			emit("load e->value");	// id
			break;
		case EXP_BOOL:
			emit("push e->value");	// 1/0
			break;
		case EXP_ADD:
			gen_exp(e->left);
			gen_exp(e->right);
			emit("add");
			break;
		case EXP_AND:
			gen_exp(e->left);
			gen_exp(e->right);
			emit("and");
			break;
	}
}
```

#### 基于寄存器计算机 (RISC)

Mem + Reg + ALU

> MIPS ISA

```Bison
// src -> dist
s: movn n, r
 | mov r1, r2
 | load [x], r
 | store r, [x]
 | add r1, r2, r3
 | sub r1, r2, r3
 | times r1, r2, r3
 | div r1, r2, r3
```

```cpp
void gen_prog(dec_t d, stm_t s) {
	gen_dec(d);
	gen_stm(s);
}

void gen_dec(T id; D) {
	// reg_code(".int id")
	// 为变量分配寄存器
	gen_type(T);
	emit(" id");

	gen_dec(D);
}

void gen_type(type_t t) {
	switch(t-kind) {
		case INT:	// fall through
		case BOOL:
			emit(".int");
			break;
	}
}

void gen_stm(stm_t s) {
	switch (s->kind) {
		STM_ASSIGN:
			r = gen_exp(s->exp);
			emit("mov r, e->id");
			break;
		STM_PRINTI:
			r = gen_exp(s->exp);
			emit("printi r");
			break;
		STM_PRINTB:
			r = gen_exp(s->exp);
			emit("printb r");
			break;
	}
}

reg_t gen_exp(exp_t e) {
	switch (e->kind) {
		case EXP_INT:
			r = random_reg();
			emit("movn e->value, r");	// n
			return r;
		case EXP_ID:
			r = random_reg();
			emit("mov e->value, r");	// id
			return r;
		case EXP_BOOL:
			r = random_reg();
			emit("movn e->value, r");	// 1/0
			return r;
		case EXP_ADD:
			r1 = gen_exp(e->left);
			r2 = gen_exp(e->right);
			r = random_reg();
			emit("add r1, r2, r");
			return r;
		case EXP_AND:
			r1 = gen_exp(e->left);
			r2 = gen_exp(e->right);
			r = random_reg();
			emit("and r1, r2, r");
			return r;
	}
}
```

## Garbage Collection

### Mark and Sweep

*   mark phase: traces reachable objects (mark_bit |= 1)

```haskell
let todo = {all roots}
while todo != nil do
    pick v <- todo
    todo -= {v}
    if mark(v) == 0 then
        mark(v) |= 1
        let v1, ..., vn be the pointers contained in v
        todo += {v1, ..., vn}
    fi
od
```

*   sweep phase: collects garbage objects (mark_bit == 0)

```haskell
p = bottom of heap
while p < top of heap do
    if mark(p) == 1 then
        mark(p) = 0
    else
        add block p...(p + sizeof(p) - 1)  to freelist
    fi
    p += sizeof(p)
od
```

### Stop and Copy

copy all reachable objects in old space to new space(reserved for GC):

*   copied objects
*   scaned objects: pointers have been restored

## Compilers Exercise

### C Declaration Interpreter

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

#define MAXTOKENS 100
#define MAXTOKENLEN 64

enum type_tag {
    IDENTIFIER,
    QUALIFIER,
    TYPE,
};

struct token {
    char type;
    char string[MAXTOKENLEN];
};

int top = -1;
struct token stack[MAXTOKENS];
struct token ts;

#define pop stack[top--]
#define push(s) stack[++top] = s

enum type_tag classify_string(void) {
    char *s = ts.string;

    if (!strcmp(s, "const")) {
        strcpy(s, "read-only ");
        return QUALIFIER;
    }

    if (!strcmp(s, "volatile")) return QUALIFIER;
    if (!strcmp(s, "void")) return TYPE;
    if (!strcmp(s, "char")) return TYPE;
    if (!strcmp(s, "signed")) return TYPE;
    if (!strcmp(s, "unsigned")) return TYPE;
    if (!strcmp(s, "short")) return TYPE;
    if (!strcmp(s, "int")) return TYPE;
    if (!strcmp(s, "long")) return TYPE;
    if (!strcmp(s, "float")) return TYPE;
    if (!strcmp(s, "double")) return TYPE;
    if (!strcmp(s, "struct")) return TYPE;
    if (!strcmp(s, "union")) return TYPE;
    if (!strcmp(s, "enum")) return TYPE;

    return IDENTIFIER;
}

void gettoken(void) {
    char *p = ts.string;

    /* 略过空白字符 */
    while ((*p = getchar()) == ' ');

    if (isalnum(*p)) {
        /* 读入得标识符以ａ－Ｚ，０－９开头 */
        while (isalnum(*++p = getchar()));
        ungetc(*p, stdin);
        *p = '\0';
        ts.type = classify_string();
        return;
    }

    if (*p == '*') {
        strcpy(ts.string, "pointer to");
        ts.type = '*';
        return;
    }

    ts.string[1] = '\0';
    ts.type = *p;
    return;
}

void read_to_first_identifer(void) {
    gettoken();

	// read til identifier
    while (ts.type != IDENTIFIER) {
        push(ts);
        gettoken();
    }

    printf("%s is ", ts.string);
    gettoken();
}

void deal_with_arrays(void) {
    while (ts.type == '[') {
        printf("array ");
        gettoken();

		/* 数字或']' */
        if (isdigit(ts.string[0])) {
            printf("0..%d ", atoi(ts.string) - 1);
            gettoken();
        }

        gettoken();
        printf("of ");
    }
}

void deal_with_pointers(void) {
    while (stack[top].type == '*')
    {
        printf("%s ", pop.string);
    }
}

void deal_with_function_args(void) {
    while (ts.type != ')') {
        gettoken();
    }

    gettoken();
    printf("function returning ");
}

void deal_with_declarator(void) {
    /* 处理标识符之后可能存在的数组/函数 */

    switch (ts.type) {
    	case '[':
        	deal_with_arrays();
        	break;
    	case '(':
        	deal_with_function_args();
        	break;
    }

    deal_with_pointers();

    /* 处理在读入到标识符之前压入到堆栈中的符号 */
    while (top >= 0) {
        if (stack[top].type == '(') {
            pop;
            gettoken();  //读取')'之后的符号
            deal_with_declarator();
        } else {
            printf("%s", pop.string);
        }
    }
}

int main(void) {
    /* 将标记压入堆栈中, 直到遇见标识符 */
    read_to_first_identifer();
    deal_with_declarator();
    printf("\n");

    system("pause");
    return 0;
}
```

### Cool(Classrom Object-Oriented Language)

*   [Awesome Reference](http://web.stanford.edu/class/cs143/materials/cool-manual.pdf)

### Parser Implemention

```cpp
// 返回下一个Token(只测试该Token，不向前移动Token List的offset指针)
Token Peek(void);
```

```cpp
// 消费下一个Token
Token Next(void);
```

```cpp
// void Expect(expectedToken)
if (Peek() != expectedToken) {
    Error("expect %s, but got %s\n", expectedToken, Peek());
}
```

```cpp
// void Try(expectedToken)
if (Peek() == expectedToken) {
    Next(); // 消费之
    return true;
}

return false;
```
