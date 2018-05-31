---
layout:     post
title:      "Algorithm Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Algorithm
    - C
    - C++
---

* [Algorithm Basic Notes](#algorithm-basic-notes)
	* [Sorting Algorithm](#sorting-algorithm)
	* [Tree Algorithm](#tree-algorithm)
		* [Binary Search Tree](#binary-search-tree)
		* [2-3Tree Banlance Tree](#2-3tree-banlance-tree)
		* [Red-Black BST](#red-black-bst)
			* [基本性质](#基本性质)
			* [基本操作](#基本操作)
		* [B Tree](#b-tree)
			* [插入/删除](#插入删除)
		* [Fibonacci Heap](#fibonacci-heap)
		* [K-Dimensional Tree](#k-dimensional-tree)
	* [Search Algorithm](#search-algorithm)
		* [Fisrt Search](#fisrt-search)
		* [cycle detection](#cycle-detection)
	* [Dynamic Programming](#dynamic-programming)
		* [子问题](#子问题)
		* [范例](#范例)
	* [Greedy Algorithm](#greedy-algorithm)
	* [Map Algorithm](#map-algorithm)
		* [图的表示](#图的表示)
		* [广度优先遍历](#广度优先遍历)
			* [ v.color](#-vcolor)
			* [ v.pi](#-vpi)
			* [ v.d](#-vd)
			* [ 利用队列实现广度优先遍历](#-利用队列实现广度优先遍历)
		* [深度优先遍历](#深度优先遍历)
			* [v.color](#vcolor)
			* [v.pi](#vpi)
			* [v.d/v.f](#vdvf)
		* [拓扑排序](#拓扑排序)
			* [Kahn 算法](#kahn-算法)
			* [DFS(深度优先)](#dfs深度优先)
		* [单源最短路径](#单源最短路径)
			* [DAG Shortest Paths](#dag-shortest-paths)
			* [Bellman-Ford Algorithm](#bellman-ford-algorithm)
			* [Dijkstra Algorithm](#dijkstra-algorithm)
		* [结点对最短路径](#结点对最短路径)
			* [Floyd-Warshall Algorithm](#floyd-warshall-algorithm)
		* [MaxFLow Problem](#maxflow-problem)
			* [最大流模型](#最大流模型)
			* [ 残存网络](#-残存网络)
			* [ MaxFlow-Mincut Theorem 最大流最小割定理](#-maxflow-mincut-theorem-最大流最小割定理)
			* [Ford-Fulkerson Algorithm](#ford-fulkerson-algorithm)

# Algorithm Basic Notes

## Sorting Algorithm

### Selection Sort

### Insertion Sort-Shell Sort

### Merge Sort

### Quick Sort

*   partition: 哨兵(最后再将其归位) + 大循环 + 2 小循环, 交换元素法
*   partition: 辅助数组 brr, 3 循环(3 次扫描 arr) 分别将小/等/大于 guard 的数加入 brr
*   partition: 哨兵(最后再将其归位) + lo + hi, 外加 2 个动指针 leftlimit 与 rightlimit, 表示小于区的上界和大于区的上界

### Heap Sort(Priority Queue)

### Radix-Sorts 基数排序(可用于混乱shuffle数组):

*   从个位到高位放入桶
*   从高位到个位放入桶

> Sorting Algorithms Performance

![Performance](img/SortingPerformance.png)

## Tree Algorithm

### Binary Search Tree

Hibbard Deletion

### 2-3Tree Banlance Tree

1. 插入:
  - 1+1=2node -> 3node
  - **1+2=3node -> 4node** -> 2node
  - 将4node结点中间元素移至父结点，其余2元素分离为子2node节点

### Red-Black BST

- 基于2-3Tree，将3node用红色标记
- 关键：将红色标记向上传递至根部

#### 基本性质

1. 非红即黑
2. 根黑
3. 叶黑          e.g T.null 黑哨兵
4. 红父孩子黑
5. 简单路径同黑
6. 右孩子不红    e.g 父黑两孩红 -> 父红两孩黑(flip); 父黑右红 -> 父左旋变红, 右孩子变黑(left-rotate)

#### 基本操作

1. 插入(插入红点, 旋转+重新着色(反色)保持红黑性质)
2. 删除(删除红点, 旋转+重新着色(反色)保持红黑性质)

### B Tree

t: 每个内部结点至少 t 个孩子(t-1 个 key), 至多 2t 个孩子(2t-1 个 key)

#### 插入/删除

下溯的同时,分裂满结点

### Fibonacci Heap

BST + 循环双向链表:

-   一个根树(根结点)循环双向链表
-   n 个孩子循环双向链表: 每个根树的每层结点形成一个循环双向链表

### K-Dimensional Tree

- 分隔空间数据

e.g 左子树：左下方   右子树：右上方

## Search Algorithm

### Fisrt Search
- DFS(深度优先)：栈实现
- BFS(广度优先)：队列实现

![Search Algorithm Performance](img/SearchPerformance.jpg)

### cycle detection
- 许多图论算法不适用于存在环路的复杂图,故使用循环检测剔除意外情况

**处理方法：可将环路元素(如强联通分支)视作单一元素，忽视其内部结构**
```java
a = b+1;b = c+1;c = a+1;
//a extends b;b extends c;c extends a;
```

## Dynamic Programming

-   最优解结构特征: 一个选择 + 子问题的最优解 - 所有(可**重复求解**)子问题的最优解可**独立求解**(不互相影响)
-   递归定义最优解: 列出递归表达式
-   自底向上求解最优解
-   构造最优解(额外信息数组)

### 子问题

-   子问题可映射为有向图, 并对其进行拓扑排序: 共有 O(n) 个子问题, 每个子问题最多 O(n) 种选择, 则算法时间复杂度为 O(n^2).其对应子问题图有 n 个顶点, 每个顶点最多有 n-1 条边.
-   递归生成可以重复求解的子问题,而不是不断生成新的子问题

### 范例

-   切割钢条问题: max{p[i], r[n-i]}
-   矩阵相乘链问题
-   最大公共子序列问题: r[i, j] = max{r[i, j-1], r[i-1, j]}
-   无权最短路径: path[i, j] = min{path[i, r], [r, j]}

## Greedy Algorithm

-   最优解结构特征: 一个选择 + 子问题的最优解 - 所有(可**重复求解**)子问题的最优解可**独立求解**(不互相影响)
-   递归定义最优解: 列出递归表达式
-   自底向上求解最优解: 每次不进行多次选择, 只进行一次 **贪心选择**
-   构造最优解(额外信息数组)

## Map Algorithm

### 图的表示

-   邻接链表法
-   邻接矩阵法

### 广度优先遍历

####  v.color

-   white: 未被发现/访问
-   gray: 已被发现(进入队列), 邻接结点未全部发现
-   black: 已被发现, 邻接结点全部发现

####  v.pi

广度优先树父结点

####  v.d

距离 = v.pi.d + 1

####  利用队列实现广度优先遍历

### 深度优先遍历

利用 递归/栈 实现深度优先遍历

#### v.color

-   white: 未被发现/访问
-   gray: 已被发现, 未二次访问
-   black: 已被发现, 二次访问(比其深的所有结点皆被发现)

当第一个访问 edge(u,v) 时:

-   v.color == white: 树边
-   v.color == gray : 后向边(v 为 深度优先**森林** 的祖父结点)
-   v.color == black: 前向边/横向边(v 为较深的结点/子结点)
-   无向图深度优先遍历不会出现 前向边/横向边

#### v.pi

比 v 浅的结点(比 v 更早被发现的结点)

#### v.d/v.f

-   v.d = ++time: 被发现的时间戳(入栈)
-   v.f = ++time: 被二次访问的时间戳(出栈)
-   time`<`v.d, white; v.d`<`time`<`v.f, gray: time`>`v.f, black

### 拓扑排序

目标集合: 拓扑排序后集合, 先入顶点高序, 后入顶点低序

#### Kahn 算法

不断将图中入度为 0 的点移入目标集合

#### DFS(深度优先)

当深度遍历至较深处, 并开始回溯时, 将此时访问的顶点加入目标集合(v.f 降序)

### 单源最短路径

```cpp
void Relax(int u, int v, int w) {
    if v.d > u.d + w[u][v] {
        v.pi = u;
        v.d = v.pi.d + w[v.pi][v];
    }
}
```

#### DAG Shortest Paths

先将图进行拓扑排序(深度优先遍历), 再按照拓扑排序顺序, 依次对每个结点(拓扑排序)的邻接边进行 relax

> a -> b -> c --> d, 且 a--b, a--c, b--d, c--d: relax(a, b), relax(a, c), relax(b, d), relax(c, d)

#### Bellman-Ford Algorithm

对每条边进行 n 次(结点总数) relax

#### Dijkstra Algorithm

贪心算法: 每次选取不属于 S 集合(white) 且 v.d 最小(gray)的结点, 对其所有邻接边进行 relax, 并将其加入 S 集合(black)

-   white: 不属于 S 集合
-   gray: 不属于 S 集合 且 v.d 最小
-   black: 属于 S 集合

### 结点对最短路径

动态规划:l^m(i, j) = min(l^m-1(i, j), min(1<=k<=n){l^m-1(i, k)+w(k, j)})

> m: 中间结点个数

#### Floyd-Warshall Algorithm

d^k(i, j) = w(i, j), k = 0
    | min(d^k-1(i, j), d^k-1(i, k) + d^k-1(k, j)), k >= 1

pi^(i, j) = pi^k-1(i, j) or pi^k-1(k, j)

> k: 中间结点个数

```cpp
Matrix floyd_warshall(Matrix W) {
    int n = W.rows;
    Matrix D^0 = W;

    for (int k = 1;k < n+1; k++) {
        D^k = new Matrix(n);

        for (int i = 1; i < n+1; i++) {
            for (int j = 1; j < n+1; J++) {
                d^k[i][j] = min(d^k-1[i][j], d^k-1[i][k]+d^k-1[k][j]);
            }
        }
    }

    return D^n;
}
```

### MaxFLow Problem

![Ford Fulkerson Algorithm](img/FordFulkersonAlgorithm.png)

#### 最大流模型

最大流模型必须满足以下条件:

-   无双向边
-   唯一的源点 s 和 唯一的汇点 t

对于不符合该模型的问题可进行简单转化:

-   双向边: 添加额外结点, 切割双向边的其中一条, 使得双向边变成 3 条单向边

> a --> b, b --> a: a --> c, c --> b, b --> a

-   多源点/汇点: 添加一个总源点/汇点

####  残存网络

-   若原图 u --> v 总容量 > 0, 则残存网络中 边 u --> v:剩余容量, 边 v --> u: 已用容量
-   增广路径: 残存网络中一条可行通路

####  MaxFlow-Mincut Theorem 最大流最小割定理

-   切割的净流量: 流出-流入
-   切割的容量: 流出总容量(无需减流入总容量)
-   最小切割: 容量最小的切割

最大流最小割定理: 以下三个命题等价

-   f 是 G 的一个最大流
-   残存网络 Gf 不含增广路径
-   |f| = c(S, T)(切割的容量): |f| <= c(S, T)(流网络中任意流 f <= 任意切割容量 c(S, T))

#### Ford-Fulkerson Algorithm

不断寻找增广路径
