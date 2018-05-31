---
layout:     post
title:      "OJ Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Algorithm
    - OJ
---

* [OJ Basic Notes](#oj-basic-notes)
	* [C++ Notes for OJ](#c-notes-for-oj)
		* [map](#map)
	* [Dynamic Programming](#dynamic-programming)
		* [Digital Bits Dynamic Programming(数位 DP)](#digital-bits-dynamic-programming数位-dp)
			* [题目模式](#题目模式)
			* [解题模式](#解题模式)

# OJ Basic Notes

## C++ Notes for OJ

### Implementation Pattern(OOP Pattern)

```cpp
#define FIN             freopen("input.txt","r",stdin)
#define FOUT            freopen("output.txt","w",stdout)
#define fst             first
#define snd             second

typedef long long LL;
typedef pair < int, int >PII;

const int INF = 0x3f3f3f3f;
const int MAXN = 500 + 5;
const int MAXP = 6 + 5;

int T, N, M, P, res;
char buf[MAXN];
int usr[MAXN], usr_cnt;

struct MST {
    struct Edge {
        int u, v, w;
        Edge() {}
        Edge(int u, int v, int w):u(u), v(v), w(w) {}
        bool operator <(const Edge & e) const {
            return w < e.w;
        }
    } edges[MAXN * MAXP];

    int par[MAXN], tot;

    void init() {
        memset(par, -1, sizeof(par));
        tot = 0;
    }

    int Find(int x) {
        return -1 == par[x] ? x : (par[x] = Find(par[x]));
    }

    void add_edge(int u, int v, int w) {
        edges[tot++] = Edge(u, v, w);
    }

    int Kruskal() {
        memset(par, -1, sizeof(par));
        int u, v, w, pu, pv, cnt = 0, ret = 0;
        sort(edges, edges + tot);
        for (int i = 0; i < tot; i++) {
            if (cnt == usr_cnt - 1)
                break;
            u = edges[i].u, v = edges[i].v, w = edges[i].w;
            pu = Find(u), pv = Find(v);
            if (pu == pv)
                continue;
            par[pv] = pu;
            ret += w;
            cnt++;
        }
        return ret;
    }
} mst;

struct Dijkstra {
    struct Edge {
        int v, w, next;
        Edge() {}
        Edge(int v, int w, int next):v(v), w(w), next(next) {}
    } edges[MAXN * MAXP * 2];

    struct QNode {
        int u, w;
        QNode() {}
        QNode(int u, int w):u(u), w(w) {}
        bool operator >(const QNode & e) const {
            return w > e.w;
        }
    } cur;

    int head[MAXN], tot;
    int dist[MAXN];
    bool vis[MAXN];
    priority_queue < QNode, vector < QNode >, greater < QNode > >Q;

    void init() {
        tot = 0;
        memset(head, -1, sizeof(head));
        memset(dist, 0x3f, sizeof(dist));
        memset(vis, false, sizeof(vis));
    }

    void add_edge(int u, int v, int w) {
        edges[tot] = Edge(v, w, head[u]);
        head[u] = tot++;
    }

    int dijkstra(int src, int dst) {
        int u, v, w;
        Q.push(QNode(src, dist[src] = 0));
        while (!Q.empty()) {
            cur = Q.top();
            Q.pop();
            u = cur.u;
            if (vis[u])
                continue;
            vis[u] = true;
            for (int i = head[u]; ~i; i = edges[i].next) {
                v = edges[i].v, w = edges[i].w;
                if (!vis[v] && dist[v] > dist[u] + w) {
                    dist[v] = dist[u] + w;
                    Q.push(QNode(v, dist[v]));
                }
            }
        }
        return dist[dst];
    }
} dij;

int solve() {
    int u, v, w;

    if (usr_cnt == N) {
        mst.init();

        for (int i = 1; i <= M; i++) {
            scanf("%d %d %d", &u, &v, &w);
            mst.add_edge(u, v, w);
        }

        return mst.Kruskal();
    } else if (usr_cnt == 2) {
        dij.init();

        for (int i = 1; i <= M; i++) {
            scanf("%d %d %d", &u, &v, &w);
            dij.add_edge(u, v, w);
            dij.add_edge(v, u, w);
        }

        return dij.dijkstra(usr[0], usr[1]);
    }
}

int main()
{

#ifndef ONLINE_JUDGE
    FIN;
#endif				// ONLINE_JUDGE

    scanf("%d", &T);

    while (T--) {
        usr_cnt = 0;
        scanf("%d %d %d", &N, &M, &P);
        scanf("%s", buf + 1);

        for (int i = 1; i <= N; i++) {
            if (buf[i] == '1')
                usr[usr_cnt++] = i;
        }

        res = solve();
        printf("%d\n", res);
    }

    return 0;
}
```

### algorithm

#### sort

*  in map: auto sort

```cpp
struct Node {
    bool operator<(const Node &o) {
        return *this < o;
    }
};

map<Node> mps;
```

*   sort vector

```cpp
bool cmp(const elem &i, const elem &j) {
    return i < j;
}

sort(vec.start(), vec.end(), cmp);
```


### map

*   insert/update: mp[key] = value;
*   search: mp.count(key)/mp.find(key), 不会插入空元素

## Simulation

### Painting

*   对于实际操作, 直接覆写至状态数组即可, 无需关心边界条件(效果会立即生效)

> e.g 交接处方块 , 2 次写 1, maps[i][j] = 1, 不用担心重复计数

## String

```cpp
sstream::stringstream

sort()
transform(toupper/tolower)

string::size_type
string::npos(vector.end())

str.find() == string::npos/string::size_type
str.substr(int pos, int len)

getline(cin/sin, strbuf)
```

*   string::size_type pre, post 指针: 进行逐行匹配

## Map Theory

### Shortest Paths

*   Dijkstra
*   Floyd

### Minial Spanning Tree

*   Kruskal(tFind/tUnion)

### BFS(mark array/queue)

*   Shortest Paths
*   Diameter(直径) of Tree(Two pass for BFS)

### DFS(mark array/stack/recursion)

*   Longest Paths

### Connected Component

#### Strongly Connected Component

*   Tarjan Alogirthm(v.index(DFS 时此点被访问的顺序) == v.lowlink(从 v 出发经有向边可达到的所有结点中最小的 index))

#### tUnion + tFind

quickly figure out connection of map

## Dynamic Programming

### Digital Bits Dynamic Programming(数位 DP)

#### 题目模式

*   给定区间 [a, b], 求满足特定要求的数, 要求一般与大小无关, 与数位的组成相关
*   规模巨大, 无法枚举

> 递增数: 1234, 2579; 双峰数: 19280, 26193; 含49: 49, 149, 1492; 整除13: 26, 39 ...

#### 解题模式

f(a, b) = f(b, 0) - f(a - 1, 0)

暴力 + 存储 = 记忆化搜索:

*   暴力枚举每一位的 (0, ...,9)
*   利用 dp[pos][state] 与 dfs(pos, state, k, flag) 进行存储

```cpp
/// \brief 数字处理函数
/// \param num 原始数据
/// \param digit 保存每个数位的值
/// \param state 初始状态
int f(int num){
    int ans;
    int pos = 0;

    while(num){
        digit[++pos]=num%10;
        num=num/10;
    }

    return dfs( pos, state , true);
}

/// \brief dfs 函数, 从高位开始遍历
/// \param f     记忆化数组
/// \param pos   当前数位下标
/// \param state 之前数字的状态
/// \param flag  上限标志
int dfs(int pos, int state, bool flag) {
    if (pos == -1) {
        return state == target_state;
    }
    if (!exception && ~f[pos][state]) {
        return f[pos][state]
    }

    int ans = 0;

    // 对于每一个数位, 求出枚举界限
    // 一般从 0 枚举至 9, 当到达特殊位置时, 枚举上限可能改变
    int next = exception ? digit[i] : 9;

    for (int digit = 0; digit <= next; digit++) {
        ans += dfs(pos - 1, new_state(state, digit), exception && digit == next);
    }

    return flag ? ans : f[pos][state] = ans;
}
```

```cpp
typedef long long ll;

int a[20];

ll dp[20][state];   //不同题目状态不同

ll dfs(int pos, int state, bool lead, bool limit) {
    // 递归边界, 按位枚举最低位是0, pos == -1 表示枚举结束
    if (pos == -1) {
        // 若可以保证每一位都合法, 则 return 1; 否则 return 0
        return 1;
    }

    // 记忆化
    if (!limit && !lead && dp[pos][state] != -1) {
        return dp[pos][state];
    }

    // 根据 limit 判断枚举的上界 up
    int up = limit ? a[pos] : 9;

    // 开始计数
    ll ans=0;

    // 枚举: 把不同情况的个数加到ans
    for(int i = 0;i <= up; i++)  
    {
        // 当前数位枚举的数是i，根据题目的约束条件分类讨论
        // 计算不同情况下的个数, 根据 state 变量来保证 i 的合法性
        // 一定要保证枚举数的合法性

        // 比如要求数位上不能有 62 连续出现, 那么state 就要保存前一位 pre
        // 前一位如果是 6 那么位不能是 2

        // 当不合法时, 直接 continue
        if() ...
        else if()...

        ans += dfs(pos-1, new_state(pos, state) /*状态转移*/, lead && i==0, limit && i == a[pos])
    }

    // 计算结束, 记录状态
    if (!limit && !lead) {
        dp[pos][state] = ans;
    }

    return ans;
}

ll solve(ll x) {
    int pos=0;

    // 数位分解
    while(x) {
        a[pos++] = x % 10;
        x /= 10;
    }

    // 从最高位开始枚举
    // 最高位前导为 0, 且受上限限制(无法枚举至 9)
    return dfs(pos-1, state /*一系列状态 */, true, true);
}

int main(void) {
    ll le,ri;

    while (~scanf("%lld %lld", &le, &ri)) {
        // 初始化dp数组为-1
        printf("%lld\n", solve(ri)-solve(le-1));
    }

    return 0;
}
```

## Math

### Matrix Fast Power

```cpp
typedef vector<vector> mat;

mat mul(mat& A, mat& B) {
    mat C(A.size(), vec(B[0].size()));
    for(int i = 0; i < (int)A.size(); ++i)
        for(int j = 0; j < (int)B[0].size(); ++j)
                for(int k = 0; k < (int)B.size(); ++k)
                        C[i][j] ^= A[i][k] & B[k][j];
    return C;
}

mat pow(mat A, int p) {
    mat E(A.size(), vec(A.size()));
    for(int i = 0; i < (int)A.size(); ++i) E[i][i] = 1;
    while(p){
        if(p & 1) E = mul(E, A);
        A = mul(A, A);
        p >>= 1;
    }
    return E;
}
```
