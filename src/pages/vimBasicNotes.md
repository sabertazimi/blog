---
layout:     post
title:      "Vim Basic Notes"
subtitle:   "Be a Stupid Learner"
date:       2017-09-15
author:     "Sabertaz"
header-img: "images/home-bg.jpg"
tags:
    - Computer Science
    - GNU
    - Linux
    - Vim
---

# Vim Basic Notes

## Normal 模式命令

### 重复命令

`.`

_微型宏_: 重复上一次(插入命令 至 `<Esc>`)录制动作

`;`

重复 t/T/f/F

`@`

| 命令        | 作用                 |
| :---------- | :------------------- |
| @{register} | 重复寄存器中的宏命令 |
| @:          | 重复任意 Ex 命令     |
| @@          | 重复@命令            |

`:&`

重复:substitute

---

### 撤销命令

| 目的                     | 操作                  | 重复 | 回退 |
| :----------------------- | :-------------------- | :--- | :--- |
| 做出一个修改             | {edit}                | .    | u    |
| 在行内查找下一指定字符   | f{char}/t{char}       | ;    | ,    |
| 在行内查找上一指定字符   | F{char}/T{char}       | ;    | ,    |
| 在文档中查找下一处匹配项 | `/pattern<CR>`        | n    | N    |
| 在文档中查找上一处匹配项 | `?pattern<CR>`        | n    | N    |
| 执行替换                 | :s/target/replacement | &    | u    |
| 执行一系列修改           | qx{changes}q          | @x   | u    |

---

### 复合命令

#### 插入

| 复合命令 | 等效的长命令 |
| :------- | :----------- |
| C        | `c$`         |
| s        | `cl`         |
| S        | `^c`         |
| I        | `^i`         |
| A        | `$a`         |
| o        | `A<CR>`      |
| O        | `ko`         |

---

### 编辑命令

#### Operator + {motion} 精神

操作符命令 + 动作命令(范围)

> :h operator
> :h :map-operator

- _操作符命令_: 基本编辑命令

| 命令 | 作用                               |
| :--- | :--------------------------------- |
| c    | 修改                               |
| d    | 删除                               |
| y    | 复制到寄存器                       |
| g~   | 反转大小写                         |
| gu   | 转换为小写                         |
| gU   | 转换为大写                         |
| >    | 增加缩进                           |
| <    | 减小缩进                           |
| =    | 自动缩进                           |
| !    | 使用外部程序过滤{motion}所跨越的行 |

- _动作命令_(a(all)/i(in)/t(til))

> e.g \$/2l/aw/ap 或 /patterns

- 模式串: /patterns
- 0/\$: 行首/尾
- 文本对象: i/a
- 分隔符文本对象(seperator text objects)

| 分隔符文本对象 | 选择区域                       |
| :------------- | :----------------------------- |
| a) 或 ab       | 一对圆括号(parentheses)        |
| i) 或 ib       | 圆括号(parentheses) 内部       |
| a} 或 aB       | 一对花括号{braces}             |
| i} 或 iB       | 花括号{braces} 内部            |
| a]             | 一对方括号[brackets]           |
| i]             | 方括号[brackets] 内部          |
| a>             | 一对尖括号 `<angle brackets>`  |
| i>             | 尖括号 `<angle brackets>` 内部 |
| a'             | 一对单引号'single quotes'      |
| i'             | 单引号'single quotes' 内部     |
| a"             | 一对双引号"double quotes"      |
| i"             | 双引号"double quotes" 内部     |
| a\`            | 一对反引号\`backticks\`        |
| i\`            | 反引号\`backticks\` 内部       |
| at             | 一对 XML 标签`<xml>tags</xml>` |
| it             | XML 标签内部                   |

- 范围文本对象(range text objects)

| 范围文本对象 | 选择范围           |
| :----------- | :----------------- |
| iw           | 当前单词           |
| aw           | 当前单词及一个空格 |
| iW           | 当前字串           |
| aW           | 当前字串及一个空格 |
| is           | 当前句子           |
| as           | 当前句子及一个空格 |
| ip           | 当前段落           |
| ap           | 当前段落及一个空行 |

#### 插入编辑命令

| 复合命令 | 等效的长命令 |
| :------- | :----------- |
| C        | c\$          |
| s        | cl           |
| S        | ^c           |
| I        | ^i           |
| A        | \$a          |
| o        | `A<CR>`      |
| O        | ko           |

#### register

{register}{operator}{motion} / `<C-r>{register}`

| 寄存器符号 | 作用                      | 使用范例                        |
| :--------- | :------------------------ | :------------------------------ |
| ""         | 无名寄存器                | e.g `yiw` / `diw`               |
| "a ~ "z    | 有名寄存器                | e.g `"ayiw`                     |
| "0         | 复制专用寄存器            | e.g `yiw` + `diw` + `"0p`       |
| "\_        | 黑洞寄存器/有去无回寄存器 | e.g `"_diw`                     |
| "+         | 系统剪贴板寄存器          | e.g `"+p` / `InsertMode <C-r>+` |
| "\*        | 上次高亮文本寄存器        | e.g `"+p` / `InsertMode <C-r>*` |
| "=         | 表达式寄存器              | e.g `"+p` / `InsertMode <C-r>=` |
| "%         | 当前文件名                |                                 |
| "#         | 轮换文件名                |                                 |
| ".         | 上次插入的文本            |                                 |
| ":         | 上次执行的 Ex 命令        |                                 |
| "/         | 上次查找的模式            |                                 |

`:reg {register}` 显示寄存器内容

#### 删除

{number}{register}d/s/x{motion}

#### 复制

{number}{register}y{motion}

#### 粘贴

{number}{register}p{motion}

#### 选择

`*`

选中包含光标处字符的单词

#### 跳转

##### 基本域

| 命令          | 光标动作                          |
| :------------ | :-------------------------------- |
| %             | 跳转至下一个配对的范围符号        |
| j             | 向下移动一个实际行                |
| gj            | 向下移动一个屏幕行                |
| k             | 向上移动一个实际行                |
| gk            | 向上移动一个屏幕行                |
| w             | 正向移动到下一单词的开头          |
| b             | 反向移动到当前单词/上一单词的开头 |
| e             | 正向移动到当前单词/下一单词的结尾 |
| ge            | 反向移动到上一单词的结尾          |
| 0             | 移动到实际行的行首                |
| g0            | 移动到屏幕行的行首                |
| \$            | 移动到实际行的行尾                |
| g\$           | 移动到屏幕行的行尾                |
| ^             | 移动到实际行的第一个非空白字符    |
| g^            | 移动到屏幕行的第一个非空白字符    |
| \_            | first char of line                |
| g\_           | last char of line                 |
| H             | jump to top of screen             |
| M             | jump to middle of screen          |
| L             | jump to bottom of screen          |
| zt            | current line to top of screen     |
| zz            | current line to middle of screen  |
| zb            | current line to bottom of screen  |
| `<C-u>/<C-d>` | 翻半页                            |
| `<C-b>/<C-f>` | 翻半页                            |
| gd            | jump to defination                |
| gi            | jump to last insert position      |
| #             | jump to previous same word        |
| \*            | jump to next same word            |

> :set path?

查看'path'值

| 命令                            | 作用                            |
| :------------------------------ | :------------------------------ |
| [count]G                        | 跳转到指定的行号                |
| `/pattern<CR>/?pattern<CR>/n/N` | 跳转到下一个/上一个模式出现之处 |
| %                               | 跳转到匹配的括号所在之处        |
| (/)                             | 跳转到上一句/下一句的开头       |
| {/}                             | 跳转到上一段/下一段的开头       |
| gf                              | 跳转到光标下的文件名            |
| gg                              | 文首                            |
| G                               | 文尾                            |
| `<N>`gg                         | jump to line                    |
| `<N>`%                          | jump to percent of file         |
| `<C-]>`                         | 跳转到光标下关键字的定义之处    |
| \`{mark}                        | 跳转到一个位置标记              |

##### 标记

m{alpha} 标记当前光标处,标记名为 alpha

| 位置标记  | 跳转到                           |
| :-------- | :------------------------------- |
| \`{alpha} | 自定义标记处                     |
| \`\`      | 当前文件中上次跳转动作之前的位置 |
| \`.       | 上次修改的地方                   |
| \`^       | 上次插入的地方                   |
| \`[       | 上次修改或复制的起始位置         |
| \`]       | 上次修改或复制的结束位置         |
| \`<       | 上次高亮选区的起始位置           |
| \`>       | 上次高亮选区的结束位置           |

##### 拼写检查

| 命令 | 作用                             |
| :--- | :------------------------------- |
| ]s   | 跳到下一处拼写错误               |
| [s   | 跳到上一处拼写错误               |
| z=   | 为当前单词提供更正建议           |
| zg   | 把当前单词添加到拼写文件中       |
| zw   | 把当前单词从拼写文件中删除       |
| zug  | 撤销针对当前单词的 zg 或 zw 命令 |

#### 查找

##### 字符

| 命令 | 光标动作                          |
| :--- | :-------------------------------- |
| w    | 正向移动到下一单词的开头          |
| b    | 反向移动到当前单词/上一单词的开头 |
| e    | 正向移动到当前单词/下一单词的结尾 |
| ge   | 反向移动到上一单词的结尾          |
| ;    | 重复/f/F/t/T                      |
| ,    | 撤销/f/F/t/T                      |

`<C-a>/<C-x>`: 查找数字,递增/减数字

##### /pattern ?pattern

###### 原字符

| 原字符      | 作用                               | 范例             |
| :---------- | :--------------------------------- | :--------------- |
| `\c`        | 忽略大小写                         |                  |
| `\C`        | 大小写敏感                         |                  |
| `\v`        | 开启 very magic 模式(可省略转义符) |
| < 与 >      | \v 模式下的单词定界符              |                  |
| `%(` 与 `)` | 分组符                             | `/\v%(And|D)rew` |
| `\V`        | 开启原义模式(可省略转义符):        |
| `\w`        | 匹配单词类字符(alpha,number,"\_")  |                  |
| `\W`        | 匹配非单词字符                     |                  |
| `\x`        | 匹配十六进制数`[0-9a-fA-F]`        |                  |
| `\_s`       | 匹配空白符`/`换行符                |                  |
| `\zs`       | 界定一个匹配的开始                 |                  |
| `\ze`       | 界定一个匹配的结束                 |                  |

###### Flags

置于 patterns 末尾

| Flags | 作用                                                      |
| :---- | :-------------------------------------------------------- |
| /g    | 全局                                                      |
| /e    | 光标至匹配词末尾                                          |
| /c    | 确认或拒绝每一处修改                                      |
| /n    | 会抑制正常的替换行为,只报告本次 substitute 命令匹配的个数 |
| /e    | 屏蔽错误提示                                              |
| /&    | 重复上次 flags                                            |

#### 替换

> :h gU

- gU{motion} 小写转大写 e.gUaw
- r{char} 替换光标所在字符
- gr{char}
- R/gR 进入替换模式

#### 缩进

##### >{motion}

e.g >G: 缩进全文

##### ={motion}

`gg=G` 自动缩进全文

#### 注释

##### \\{motion}

> vim-commentary 插件

\\\ 注释行
\\ap 注释段落

#### 历史记录

u: 回退命令
`<C-r>`: 前进命令

## Insert 模式命令

### 模式转换

`<C-o>` - 进入临时 normal 模式

### I 插入

#### 特殊字符

> :h digraphs-default
> :h digraph-table
> :digraphs

| 命令                  | 作用                                   |
| :-------------------- | :------------------------------------- |
| `<C-v>{123}`          | 以十进制字符编码插入字符               |
| `<C-v>u{1234}`        | 以十六进制字符编码插入字符             |
| `<C-v>{nondigit}`     | 按原义插入非数字字符                   |
| `<C-k>{char1}{char2}` | 插入以二合字母{char1}{char2}表示的字符 |

### I 删除

| 命令    | 作用                     |
| :------ | :----------------------- |
| `<C-h>` | 删除前一个字符(同退格键) |
| `<C-w>` | 删除前一个单词           |
| `<C-u>` | 删至行首                 |

### I 粘贴

- `<C-r>{register}` 粘贴
- `<C-r><C-p>{register}` 智能粘贴

| 寄存器 | 作用                                            |
| :----- | :---------------------------------------------- |
| 0      | 普通寄存器                                      |
| =      | 算术寄存器: 在下方输入表达式后,自动粘贴运算结果 |

---

## 可视模式 (Visual Mode)

| 命令      | 作用                                    |
| :-------- | :-------------------------------------- |
| v         | 激活面向字符的可视模式                  |
| V         | 激活面向行的可视模式                    |
| `<C-v>`   | 激活面向列块的可视模式                  |
| gv        | 重选上次的高亮选区                      |
| `shift-v` | select current line                     |
| gq        | split selected line into multiple lines |

- o 切换高亮选区的活动端

## 底行模式

> :h ex-cmd-index

*黑魔法*列表:

- :normal 将 Ex 命令与 Normal 指令结合在一起的*黑魔法*
- :args 文件列表
- :argdo {Excommands} 对存于文件列表的所有文件执行 Ex 命令
- :global 对 patterns 执行 EX 命令

| 命令                                          | 作用                          |
| :-------------------------------------------- | :---------------------------- |
| :edit/:write                                  | 读写文件                      |
| :tabnew                                       | 创建新标签页                  |
| :split                                        | 分割窗口                      |
| :prev/:next                                   | 前/后标签页                   |
| :bprev/:bnext                                 | 前/后缓冲区列表               |
| :copy                                         | 命令对快速复制一行非常好用    |
| :[range]delete [x]                            | 删除范围内的行[到寄存器 x 中] |
| :[range]yank [x]                              | 复制范围的行[到寄存器 x 中]   |
| :[line]put [x]                                | 在行后粘贴寄存器 x 中的内容   |
| :[range]copy/t/co{address}                    | 行拷贝到{address} 行之下      |
| :[range]move/m {address}                      | 行移动到{address} 行之下      |
| :[range]join                                  | 连接指定范围内的行            |
| :[range]normal {commands}                     | 每一行执行命令{commands}      |
| :[range]substitute/{pattern}/{string}/[flags] | {pattern}替换为{string}       |
| :[range]global/{pattern}/[cmd]                | 对指定范围内匹配              |
| :shell                                        | 打开内置 shell                |
| :!{commands}                                  | 执行外部命令                  |
| :args {arglist}                               | 文件列表                      |
| :argdo {Excommands}                           | 对文件列表中的文件执行命令    |
| :grep                                         |                               |
| :vimgrep                                      |                               |
| :make                                         |                               |

```bash
cnoremap <expr> %% getcmdtype( ) == ':' ? expand('%:h').'/' : '%%'
```

### 补全

#### 自动补全

`<C-d>`

#### 粘贴补全

`<C-r><C-w>`: 将光标所在单词粘贴至命令行

#### 补全历史记录

q/ 或 q: 弹出历史记录窗口

### Range

- {start},{end}
- number 表示行号,`.`表示当前行,`$`表示最后一行,`%`表示所有行
- `/start_pattern/,/end_pattern/`

| 符号 | 地址                       |
| :--- | :------------------------- |
| 1    | 文件的第一行               |
| \$   | 文件的最后一行             |
| 0    | 虚拟行,位于文件第一行上方  |
| .    | 光标所在行                 |
| 'm   | 包含位置标记 m 的行        |
| '<   | 高亮选区的起始行           |
| '>   | 高亮选区的结束行           |
| %    | 整个文件(:1,\$ 的简写形式) |

> e.g 1 第 1 行
> % 所有行
> 2,\$ 第 2 行 - 最后一行
> `/<html>/,/<\/html>/` 标签 html 所有行

### 撤销/重复

- @: 重复命令
- `<C-o>` 撤销命令

### Shell

| 命令                 | 作用                                               |
| :------------------- | :------------------------------------------------- |
| :shell               | 启动一个 shell (输入 exit 返回 Vim)                |
| :!{cmd}              | 在 shell 中执行{cmd}                               |
| :read !{cmd}         | 在 shell 中执行{cmd} ,并把其标准输出插入到光标下方 |
| :[range]write !{cmd} | 在 shell 中执行{cmd} ,以[range] 作为其标准输入     |
| :[range]!{filter}    | 使用外部程序{filter} 过滤指定的[range]             |

### Range 替换

> Abolish.vim:超级 substitute 命令

`:[range]s[ubstitute]/{pattern}/{string}/[flags]`

#### Range 替换原字符

| 原字符  | 作用                               |
| :------ | :--------------------------------- |
| \c      | 忽略大小写                         |
| \C      | 大小写敏感                         |
| \v      | 开启 very magic 模式(可省略转义符) |
| < 与 >  | \v 模式下的单词定界符              |
| %( 与 ) | 分组符                             |
| \V      | 开启原义模式(可省略转义符)         |
| \w      | 匹配单词类字符(alpha,number,"\_")  |
| \W      | 匹配非单词字符                     |
| \x      | 匹配十六进制数[0-9a-fA-F]          |
| \_s     | 匹配空白符/换行符                  |
| \zs     | 界定一个匹配的开始                 |
| \ze     | 界定一个匹配的结束                 |

#### Range 替换 Flags

置于 patterns 末尾

| Flags | 作用                                                      |
| :---- | :-------------------------------------------------------- |
| /g    | 全局                                                      |
| /e    | 光标至匹配词末尾                                          |
| /c    | 确认或拒绝每一处修改                                      |
| /n    | 会抑制正常的替换行为,只报告本次 substitute 命令匹配的个数 |
| /e    | 屏蔽错误提示                                              |
| /&    | 重复上次 flags                                            |

| /c 后选项 | 作用                              |
| :-------- | :-------------------------------- |
| y         | 替换此处匹配                      |
| n         | 忽略此处匹配                      |
| q         | 退出替换过程                      |
| l         | “last” —— 替换此处匹配后退出      |
| a         | “all” —— 替换此处与之后所有的匹配 |
| `<C-e>`   | 向上滚动屏幕                      |
| `<C-y>`   | 向下滚动屏幕                      |

#### 替换域中的特殊字符

符号 作用
|:---------------|:--------------------------------------------------|
|\r|插入一个换行符|
|\t|插入一个制表符|
|\\|插入一个反斜杠|
|\1|插入第 1 个子匹配|
|\2|插入第 2 个子匹配(以此类推,最多到\9)|
|\0|插入匹配模式的所有内容|
|&|插入匹配模式的所有内容|
|~|使用上一次调用:substitute 时的{string}|
|\={Vim script}|执行{Vim Script} 表达式;并将返回的结果作为替换{string}|

### global

- :[range] global[!] /{pattern}/[ExCommands]
- :g/{start}/ .,{finish} [cmd]

> ':g/re/d' 删除所有的匹配行
> ':v/re/d' 只保留匹配行
> 追加存储 TODO 项至 a 寄存器
> `:g/TODO/yank A` > `:reg a`

## 文件与缓冲区

### File Search

built-in fuzzy file search `:find` or `:tabnew`

```vim
set nocompatible
set number

syntax on
filetype plugin indent on

" :find filepath
" :tabnew filepath
" :tabp :tabn
" :b partOfFilepath
" :ls
set path+=**
set wildmenu
set wildmode=list:longest,full
```

`:ls` to list opened file, `:b` to jump to specific file

### 缓冲区

| 命令                         | 作用             |
| :--------------------------- | :--------------- |
| :b{bufferNumber/bufferName}  | 跳转至指定缓冲区 |
| :bd{bufferNumber/bufferName} | 删除指定缓冲区   |

### 保存文件

| 命令     | 作用                                     |
| :------- | :--------------------------------------- |
| :w[rite] | 把缓冲区内容写入磁盘                     |
| :e[dit]! | 把磁盘文件内容读入缓冲区(即回滚所做修改) |
| :qa[ll]! | 关闭所有窗口,摒弃修改而无需警告          |
| :wa[ll]! | 把所有改变的缓冲区写入磁盘               |

### 窗口

- 创建窗口

| 命令             | 作用                                    |
| :--------------- | :-------------------------------------- |
| `<C-w>s`         | 水平切分当前窗口,新窗口仍显示当前缓冲区 |
| `<C-w>v`         | 垂直切分当前窗口,新窗口仍显示当前缓冲区 |
| :sp[lit] {file}  | 水平切分当前窗口,并在新窗口中载入{file} |
| :vsp[lit] {file} | 垂直切分当前窗口,并在新窗口中载入{file} |

- 切换窗口

| 命令                | 作用             |
| :------------------ | :--------------- |
| `<C-w>w/<C-w><C-w>` | 在窗口间循环切换 |
| `<C-w>h`            | 切换到左边的窗口 |
| `<C-w>j`            | 切换到下边的窗口 |
| `<C-w>k`            | 切换到上边的窗口 |
| `<C-w>l`            | 切换到右边的窗口 |

- 自定义窗口

> :h window-moving

| 命令                                   | 作用                               |
| :------------------------------------- | :--------------------------------- |
| `<C-w>=`                               | 使所有窗口等宽、等高               |
| `<C-w>_`                               | 最大化活动窗口的高度               |
| `<C-w>\`||最大化活动窗口的宽度         |
| `[N]<C-w>_`                            | 把活动窗口的高度设为[N]行          |
| `[N]<C-w>\`||把活动窗口的宽度设为[N]列 |
| :windo lcd {path}                      | 设置当前标签页的所有窗口的工作目录 |

- 关闭窗口

| Ex 命令    | Normal 命令 | 作用                            |
| :--------- | :---------- | :------------------------------ |
| `:clo[se]` | `<C-w>c`    | 关闭活动窗口                    |
| `:on[ly]`  | `<C-w>o`    | 只保留活动窗口,关闭其他所有窗口 |

### 标签

- 新建/关闭标签页

| 命令                    | 作用                                |
| :---------------------- | :---------------------------------- |
| `:tabe[dit] {filename}` | 在新标签页中打开{filename}          |
| `<C-w>T`                | 把当前窗口移到一个新标签页          |
| `:tabc[lose]`           | 关闭当前标签页及其中的所有窗口      |
| `:tabo[nly]`            | 只保留活动标签页,关闭所有其他标签页 |

- 切换标签页

| Ex 命令          | Normal 命令 | 作用                     |
| :--------------- | :---------- | :----------------------- |
| `:tabn[ext] {N}` | `{N}gt`     | 切换到编号为{N} 的标签页 |
| `:tabn[ext]`     | gt          | 切换到下一标签页         |
| `:tabp[revious]` | gT          | 切换到上一标签页         |

-重排标签页

:tabmove [N] - N 为 0 时,当前标签页移至首;N 省略时,至尾

### 文件管理器

| Ex 命令       | 作用                                      |
| :------------ | :---------------------------------------- |
| `:edit ./:e.` | 打开文件管理器,并显示当前工作目录         |
| `:Explore/:E` | 打开文件管理器,并显示活动缓冲区所在的目录 |

## 宏

| 命令                | 作用                                                |
| :------------------ | :-------------------------------------------------- |
| q{register}         | 开始录制宏,并将其保存到指定寄存器,再次按 q 结束录制 |
| {number}@{register} | 命令执行指定寄存器的内容                            |
| @@                  | 重复@命令                                           |

> register 为小写时,覆盖录制宏;register 为大写时,追加录制宏

## Tools

### Vundle

```bash
git clone https://github.com/VundleVim/Vundle.vim ~/.vim/bundle/Vundle.vim
```

```bash
:PluginInstall
```

### airline/CtrlP/colorschemes

- built-in fuzzy file search `:find`
- need config
- :AirlineTheme {theme}
- :colorscheme {theme}

```vim
set nocompatible
set number

syntax on
filetype plugin indent on

set shiftwidth=4
set softtabstop=4

set spell spelllang=en_us
scriptencoding utf-8

set mouse=a
set mousehide

set ignorecase
set smartcase

" :find filepath
" :tabnew filepath
" :tabp :tabn
" :b partOfFilepath
" :ls
set path+=**
set wildmenu
set wildmode=list:longest,full

" NERDtree like setup for netrw
let g:netrw_banner = 0
let g:netrw_liststyle = 3
let g:netrw_browse_split = 4
let g:netrw_altv = 1
let g:netrw_winsize = 25
" let g:netrw_list_hide=netrw_gitignore#Hide()
" let g:netrw_list_hide.=',\(^\|\s\s\)\zs\.\S\+'
augroup ProjectDrawer
autocmd!
autocmd VimEnter * :Vexplore
augroup END

" ctags setup
command! MakeTags !ctags -R .

" colorschemes config
colorscheme Monokai

" airline config
" set laststatus=2
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#left_sep = ' '
let g:airline#extensions#tabline#left_alt_sep = '|'

" CtrlP config
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'
let g:ctrlp_working_path_mode = 'ra'
let g:ctrlp_user_command = 'find %s -type f'
```

### YouCompleteMe

need compile and config

```bash
sudo apt-get install build-essential cmake python-dev python3-dev
cd ~/.vim/bundle/YouCompleteMe
./install.py --clang-completer
```

```vim
let g:ycm_global_ycm_extra_conf = '~/.vim/bundle/YouCompleteMe/cpp/ycm/.ycm_extra_conf.py'
```

### ctags

```vim
" ^] jump
" g^] for ambiguous tags
" ^t jump back
command! MakeTags !ctags -R .
```

| 命令             | 作用                                                |
| :--------------- | :-------------------------------------------------- |
| `<C-]>`          | 跳转到匹配当前光标所在关键字的第一处标签            |
| `g<C-]>`         | 跳转至匹配当前光标所在的关键字                      |
| :tag {keyword}   | 跳转到匹配{keyword}的第一处标签                     |
| :tjump {keyword} | 提示用户从匹配{keyword}的多处标签中指定一处进行跳转 |
| :pop 或 `<C-t>`  | 反向遍历标签历史                                    |
| :tag             | 正向遍历标签历史                                    |
| :tnext           | 跳转到下一处匹配的标签                              |
| :tprev           | 跳转到上一处匹配的标签                              |
| :tfirst          | 跳转到第一处匹配的标签                              |
| :tlast           | 跳转到最后一处匹配的标签                            |
| :tselect         | 提示用户从标签匹配列表中选择一项进行跳转            |

### make

| QuickFix 命令 | 作用                         |
| :------------ | :--------------------------- |
| :cnext        | 跳转到下一项                 |
| :cprev        | 跳转到上一项                 |
| :cfirst       | 跳转到第一项                 |
| :clast        | 跳转到最后一项               |
| :cnfile       | 跳转到下一个文件中的第一项   |
| :cpfile       | 跳转到上一个文件中的最后一项 |
| :cc N         | 跳转到第 n 项                |
| :copen        | 打开 quickfix 窗口           |
| :cclose       | 关闭 quickfix 窗口           |

### 内置补全

In insert mode

| 命令         | 补全类型         |
| :----------- | :--------------- |
| `<C-n>`      | 普通关键字       |
| `<C-x><C-n>` | 当前缓冲区关键字 |
| `<C-x><C-i>` | 包含文件关键字   |
| `<C-x><C-]>` | tag 关键字       |
| `<C-x><C-k>` | 字典查找         |
| `<C-x><C-l>` | 整行补全         |
| `<C-x><C-f>` | 文件名补全       |
| `<C-x><C-o>` | 全能（Omni）补全 |

可供弹出式菜单使用的命令

| 按键操作          | 作用                                            |
| :---------------- | :---------------------------------------------- |
| `<C-n>`           | 使用来自补全列表的下一个匹配项(next 匹配项)     |
| `<C-p>`           | 使用来自补全列表的上一个匹配项(previous 匹配项) |
| `<Down>`          | 选择来自补全列表的下一个匹配项                  |
| `<Up>`            | 选择来自补全列表的上一个匹配项                  |
| `<C-y>`           | 确认使用当前选中的匹配项(yes)                   |
| `<C-e>`           | 还原最早输入的文本(从自动补全中 exit)           |
| `<C-h>`(与`<BS>`) | 从当前匹配项中删除一个字符                      |
| `<C-l>`           | 从当前匹配项中增加一个字符                      |
| {char}            | 中止自动补全并插入字符{char}                    |

### git

- Gblame + key o
- Glog + `[q`/`]q`/`[Q`/`]Q`
- Gdiff
- Gcommit/Gstatus
- Gpull/Gpush

## Documentation

`:help`:

- `:help ^n`: `<C-n>` docs in normal mode
- `:help i_^n`: `<C-n>` docs in insert mode
- `:help c_^n`: `<C-n>` docs in commandline mode
- `:helpgrep command`: search docs includes `command`

## Error

### Swap Backup File

can't open swap or backup file:

- create `:set directory?` directory
- chown of directory to `${whoami}`

### Error Encoding

```vim
set fileencodings=utf-8,gb2312,gb18030,gbk,ucs-bom,cp936,latin1
set fileformats=unix,dos,mac
set enc=utf8
set fencs=utf8,gbk,gb2312,gb18030
set termencoding=utf-8
```
