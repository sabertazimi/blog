---
layout:     post
title:      "Git Basic Notes"
subtitle:   "Be a stupid learner"
date:       2018-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - GNU
    - Linux
    - Git
---

* [Git Basic Note](#git-basic-note)
	* [Basic](#basic)
		* [Config](#config)
			* [Initialize](#initialize)
		* [File State](#file-state)
		* [.gitignore](#gitignore)
		* [diff](#diff)
		* [add](#add)
		* [commit](#commit)
			* [提交信息格式](#提交信息格式)
				* [Message Subject(First Line)](#message-subjectfirst-line)
					* [Type Values](#type-values)
					* [Scope Values](#scope-values)
				* [Message Body](#message-body)
				* [Message Footer](#message-footer)
		* [stash](#stash)
		* [revert](#revert)
		* [remove](#remove)
		* [move](#move)
		* [log](#log)
			* [pretty-format](#pretty-format)
			* [常用选项](#常用选项)
		* [show](#show)
		* [remote](#remote)
		* [tag](#tag)
		* [alias](#alias)
		* [merge](#merge)
		* [rebase](#rebase)
	* [Branch](#branch)
		* [Basic Workflow Commands](#basic-workflow-commands)
			* [Basic](#basic-1)
			* [remote](#remote-1)
		* [Advanced Branch Workflow](#advanced-branch-workflow)
			* [master类型 && develop类型](#master类型--develop类型)
				* [每一次的提交都必须有意义](#每一次的提交都必须有意义)
				* [开发型任务中的master类型与develop类型分支必须成对出现，master分支的推进只能来源与release分支和hotfix分支的合并，禁止在master分支上直接提交。](#开发型任务中的master类型与develop类型分支必须成对出现master分支的推进只能来源与release分支和hotfix分支的合并禁止在master分支上直接提交)
			* [feature类型分支满足：](#feature类型分支满足)
			* [release类型分支满足：](#release类型分支满足)
			* [hotfix类型分支满足:](#hotfix类型分支满足)
			* [issues类型分支满足：](#issues类型分支满足)
			* [trials类型分支满足：](#trials类型分支满足)
			* [basedOn类型分支满足:](#basedon类型分支满足)
			* [work类型分支满足：](#work类型分支满足)
	* [GitHub](#github)
		* [LICENSE](#license)
			* [Popular LICENSE](#popular-license)
			* [Unique LICENSE](#unique-license)
		* [Teamwork](#teamwork)
			* [Pull Request Work Flow](#pull-request-work-flow)
		* [Create Repo without Browser](#create-repo-without-browser)
		* [Wiki](#wiki)
			* [Wiki Git Access](#wiki-git-access)
		* [Shorten GitHub URL](#shorten-github-url)
	* [Commands List](#commands-list)
		* [Basic Commands](#basic-commands)
			* [git config](#git-config)
			* [git help](#git-help)
			* [git init](#git-init)
			* [git clone](#git-clone)
			* [git add](#git-add)
			* [git status](#git-status)
			* [git diff](#git-diff)
			* [git difftool](#git-difftool)
			* [git commit](#git-commit)
			* [git reset](#git-reset)
			* [git rm](#git-rm)
			* [git mv](#git-mv)
			* [git clean](#git-clean)
			* [git branch](#git-branch)
			* [git checkout](#git-checkout)
			* [git merge](#git-merge)
			* [git mergetool](#git-mergetool)
			* [git log](#git-log)
			* [git stash](#git-stash)
			* [git tag](#git-tag)
			* [git fetch](#git-fetch)
			* [git pull](#git-pull)
			* [git push](#git-push)
			* [git remote](#git-remote)
			* [git archive](#git-archive)
			* [git submodule](#git-submodule)
		* [检查与比较](#检查与比较)
			* [git show](#git-show)
			* [git shortlog](#git-shortlog)
			* [git describe](#git-describe)
		* [调试](#调试)
			* [git bisect](#git-bisect)
			* [git blame](#git-blame)
			* [git grep](#git-grep)
		* [补丁](#补丁)
			* [git cherry-pick](#git-cherry-pick)
			* [git rebase](#git-rebase)
			* [git revert](#git-revert)
		* [邮件](#邮件)
			* [git apply](#git-apply)
			* [git am](#git-am)
			* [git format-patch](#git-format-patch)
			* [git imap-send](#git-imap-send)
			* [git send-email](#git-send-email)
			* [git request-pull](#git-request-pull)
		* [外部系统](#外部系统)
			* [git svn](#git-svn)
			* [git fast-import](#git-fast-import)
		* [管理](#管理)
			* [git gc](#git-gc)
			* [git fsck](#git-fsck)
			* [git reflog](#git-reflog)
			* [git filter-branch](#git-filter-branch)
			* [git-note](#git-note)

# Git Basic Note

## Basic

### Config

-   /etc/gitconfig
-   ~/.gitconfig 或 ~/.config/git/config
-   repo/.git/config
-   git config --global color.ui true

#### Initialize

```shell
$ git config --global user.name "sabertazimi"
$ git config --global user.email sabertazimi@gmail.com
$ git config --global core.editor vim
$ git config --global push.default simple
$ git config --global credential.helper store
$ git config --global commit.template $HOME/.gitmsg.md
$ git config --global http.postbuffer 524288000
$ git config --list
```

```shell
$ git help
$ git --help
$ man git-
$ git help config
```

### File State

Untracked Unmodified(**Stable State**) Modified Staged

### .gitignore

文件 .gitignore 的格式规范如下：

-   所有空行或者以 ＃ 开头的行都会被 Git 忽略
-   可以使用标准的 glob 模式(简化正则表达式)匹配
-   匹配模式可以以（ / ）开头防止递归
-   匹配模式可以以（ / ）结尾指定目录
-   要跟踪指定模式以外的文件或目录，可以在模式前加上惊叹号（ ! ）取反
-   [GitHub gitignore Style](https://github.com/github/gitignore)

```bash
# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

### diff

查看未暂存(un-staged)差异

```shell
$ git diff
```

查看已暂存(staged)差异

```shell
$ git diff --staged
```

*显示空白字符错误(space/tab/return)*

```shell
git diff --check
```

### add

-   交互式的选择 add 特定部分

```shell
$ git add -p
```

### commit

-   -a: 跳过暂存阶段(git add)
-   -v: 显示详细diff信息

```shell
$ git commit -a -v
```

重新提交

```shell
$ git commit --amend -a -v
```

#### 提交信息格式

```html
firstline - <type>(<scope>): <subject>
  (emptyline)
<body>
  (emptyline)
<footer>
```

##### Message Subject(First Line)

no more than 50 characters

###### Type Values

- (production code change)
    - feat (new feature for the user)
    - fix (bug fix for the user)
    - docs (changes to the documentation)
    - refactor (refactoring production code, e.g. renaming a variable)
- (no production code change)
    - style (formatting, missing semi colons)
    - test (adding missing tests, refactoring tests)
    - chore (updating grunt tasks etc)

###### Scope Values

- init
- runner
- watcher
- config
- web-server
- proxy
- empty

##### Message Body

- uses the imperative, present tense: “change” not “changed” nor “changes”
- includes **motivation** for the change and contrasts with previous behavior

##### Message Footer

- referencing issues e.g. close #666, #888
- breaking changes 碎片式更改(特别是**用户端**)
e.g.`port-runner` command line option has changed to `runner-port`, so that it is
consistent with the configuration file syntax.
To migrate your project, change all the commands, where you use `--port-runner`
to `--runner-port`.

### stash

-   git stash: 备份当前的工作区的内容，将当前的工作区内容保存到Git栈
-   git stash pop: 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容
-   git stash list: 显示Git栈内的所有备份
-   git stash clear: 清空Git栈

### revert

-   重新提交前n次的commit

```shell
$ git revert -n
```

### remove

完全删除文件

```shell
$ git rm filename
```

--cached: 保留磁盘文件(仅从git库移除文件)

```shell
$ git rm --cached filename
```

### move

```shell
$ git mv old_path new_path
```

### log

-   -p: 打印diff差异信息
-   -n: n为十进制数字,显示最近n次信息
-   --stat: 打印简略统计信息
-   --graph: 显示分支合并历史
-   --pretty=: 设置日志格式
-   --author=: 指定作者
-   --committer=: 指定提交者
-   --after=/--since=: 限制日志时间
-   --before=/--until=: 限制日志时间 "2008-01-15" "2 years 1 day 3 minutes ago"
-   --decorate: 查看各个分支当前所指的对象(commit object)
-   --help


```shell
$ git log -p --stat --graph --pretty=format:"%h - %an, %ar : %s" --since=2.weeks path_name
```

#### pretty-format

|选项|说明|
|:-----:|:-------------------------:|
|%H|提交对象(commit)的完整哈希字串|
|%h|提交对象的简短哈希字串|
|%T|树对象(tree)的完整哈希字串|
|%t|树对象的简短哈希字串|
|%P|父对象(parent)的完整哈希字串|
|%p|父对象的简短哈希字串|
|%an|作者(author)的名字|
|%ae|作者的电子邮件地址|
|%ad|作者修订日期(可以用\|-date=\|选项定制格式)|
|%ar|作者修订日期，按多久以前的方式显示|
|%cn|提交者(committer)的名字|
|%ce|提交者的电子邮件地址|
|%cd|提交日期|
|%cr|提交日期,按多久以前的方式显示|
|%s|提交说明|

#### 常用选项

|选项|说明|
|:-----:|:-------------------------:|
|-p|打印diff差异信息|
|-n|n为十进制数字,显示最近n次信息|
|--stat|打印简略统计信息|
|--graph|显示分支合并历史|
|--pretty=|设置日志格式|
|--author=|指定作者|
|--committer=|指定提交者|
|--after=/--since=|限制日志时间|
|--before=/--until=|限制日志时间 "2008-01-15" "2 years 1 day 3 minutes ago"|
|--help|

### reflog

```sh
$ git reflog
$ git reset HEAD@{index}
```

### show

-   **查看其他分支 或 提交点的文件状态**

```shell
$ git show branchName/commitHash:fileName
```

### remote

添加与删除远程仓库源

```shell
$ git remote add <shortname> <remote-url>
$ git remote rm <shortname>
```

拉取和推送变更

```shell
$ git pull [remote-name]
$ git push [remote-name] [local-branch-name]:[remote-branch-name]
```

显示仓库信息

```shell
$ git remote show [remote-name]
```

重命名仓库缩写名

```shell
$ git remote rename <old> <new>
```

从本地操作,删除远程仓库的分支

```shell
$ git push origin --delete [remote-branch-name]
```

保存推送密码

```shell
$ git config --global credential.helper store
```

### tag

列出标记及其信息

```shell
$ git tag
$ git tag -l "v1.8-"
$ git show <tagname(v1.4)>
```

创建标签:

-   不加-m会调用core.editor)
-   省略commit序列,标签添加至最新提交

创建附注(annotated)标签

```shell
$ git tag -a <tagname(v1.4)> [commit序列]
```

创建轻量(lightweight)标签

```shell
$ git tag <tagname(v1.4)> [commit序列]
```

共享标签至远程库

```shell
$ git push [remote-name] <tagname>
$ git push [remote-name] --tags
```

### alias

-   !: 执行外部命令

```shell
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status

$ git config --global alias.unstage 'reset HEAD --'
$ git config --global alias.last 'log -1 HEAD'

$ git config --global alias.visual '!gitk'
```

### merge

合并的结果是生成一个新的快照(并提交)(新的提交对象)

### rebase

切换到工作分支,编码开发新特性

```shell
$ git checkout feature-branch
```

新特性开发完毕,变基操作以简洁提交历史

```shell
$ git rebase master

git rebase [basebranch] [topicbranch]
```

切换到主分支,合并特性分支

```shell
$ git checkout master
$ git merge feature-branch
```

## Branch

### Basic Workflow Commands

#### Basic

创建新分支

```shell
$ git branch <new-branch-name>
```

删除分支

```shell
$ git branch -d <branch-name>
```

切换分支

```shell
$ git checkout <branch-name>
```

切换到新分支

```shell
$ git checkout -b <new-branch-name>
```

打印分支信息

```shell
$ git branch -v(详细信息) -vv(详细远程信息) --merged(显示合并至当前分支的分支) --no-merged(显示未合并至当前分支的分支)
```

#### remote

本地分支跟踪远程分支(在此本地分支上运行git pull自动抓取),2种方式:

-   设置当前所在本地分支跟踪某一远程分支

```shell
$ git branch -u [remotename]/[branch]
```

-   创建并切换至新的本地分支(跟踪某一远程分支)
    -   --track: 本地分支由git自动命名
    -   -b: 本地分支由创建者命名

```shell
git checkout --track [new-local-branch]

git checkout -b [new-local-branch] [remotename]/[branch]
```

### Advanced Branch Workflow

1. master类型分支，名为?|master或master，其中?为开发代号
2. develop类型分支，名为?|develop或develop，其中?为开发代号
3. feature类型分支，名为feature/*或?|feature/*，其中*为特征描述
4. release类型分支，名为release-*或?|release-*，其中*为要发布的版本号
5. hotfix类型分支，名为hotfix-*或?|hotfix-*，其中*为要发布的版本号
6. issues类型分支，名为issues/*或?|issues/*，其中*为问题描述
7. trials类型分支，名为？%trials.*，？为此分支的父分支，*为描述的名称（或直接为？%trials）
8. basedOn类型分支，名为basedOn或?|basedOn，?为其来源的master分支的开发代号
9. work类型分支，名为work.***/basedOn-?-*，***代表此描述此work的名称，?为其所基于的分支的开发代号，最后一个*代表其在？|basedOn上所基于的分支的版本号或状态名

下面介绍模型中的约定，并定义gg-*这样的抽象动作来完成约定中的行为

约定:

#### master类型 && develop类型

*多长期分支模式*: master分支与develop分支都是长期分支,区别在于分支的**稳定性等级** - master > develop

e.g master/develop/next

##### 每一次的提交都必须有意义

git在每次提交的时候要求输入对此提交的概括，这个概括不能为空。

正确的提交概括：更新了程序doc
错误的提交概括：updates

##### 开发型任务中的master类型与develop类型分支必须成对出现，master分支的推进只能来源与release分支和hotfix分支的合并，禁止在master分支上直接提交。

> master分支上只有我们推送上去的稳定版本的程序，develop分支上的程序一直处于开发状态，不稳定。
在开发型任务中使用gg-init进行版本控制的初始化，建立配套的master～develop分支对。
在使用型任务中使用gg-work-init进行版本控制的初始化，拉取需要使用的稳定版本程序的master分支，并初始化对应的basedOn分支（见9）。

#### feature类型分支满足：

  1. 只能从develop类型分支上创建
  2. 最终必须合并到develop类型分支
  3. 最终分支被删除

> 每当有新特性需要加入的时候，我们应该从develop类型分支上新建一个feature类型分支，完成新特性的开发和测试后将特性合并到develop类型分支上。
在develop类型分支上使用gg-feature-open featureName建立并转向一个名为feature/featureName的新分支
在一个feature类型分支上使用gg-feature-close把这个分支的工作合并到develop类型分支上，删除此分支，完成一个特性的开发

#### release类型分支满足：

  1. 只能从develop类型分支上创建
  2. 最终必须同时合并到master类型分支(发布新的版本)和develop类型分支(基于新版本的进一步开发)
  3. 最终分支被删除

> 每当工作进入到一个较为稳定阶段的时候，我们可以使用gg-release-open versionNum建立并转向一个名为release-versionNum的临时分支，在这个分支上允许进行小的改动（比如修改一下readme文件中的版本号），然后使用gg-release-close将此版本合并（发布）到master类型分支上，同时合并到develop类型分支上，然后删除此分支。

#### hotfix类型分支满足:

  1.  只能从master类型分支上创建
  2.  最终必须同时合并到master类型分支(发布新的热补丁版本)和develop类型分支(基于新版本的进一步开发)
  3.  最终分支被删除

> 当新版本发布后发现必须马上解决的严重bug时，我们应该使用gg-hotfix-open versionNum建立并转向一个名为hotfix-versionNum的临时分支，在这个分支上完成bug的修复，然后使用gg-hotfix-close将此版本合并（发布）到master类型分支上，同时合并到develop类型分支上，然后删除此分支。

#### issues类型分支满足：

  1. 只能从develop类型分支上创建
  2. 最终必须合并到develop类型分支
  3. 最终分支被删除

> 注解：每当有（比较复杂的）问题需要解决的时候，我们应该从develop类型分支上新建一个issues类型分支，完成问题的调试后合并到develop类型分支上。
在develop类型分支上使用gg-issues-open featureName建立并转向一个名为issues/issuesName的新分支
在一个issues类型分支上使用gg-issues-close把这个分支的工作合并到develop类型分支上，然后删除此分支，解决了一个复杂的问题
issues类型和feature类型的实现方式一模一样，仅仅有名字上面的差别。

#### trials类型分支满足：

  1. 可以从除了release类型分支以外的任何类型分支上创建
  2. 在这个分支上请发挥想象力大胆实验
    - 接受实验结果，把实验过程并入父分支，称为good-close
    - 实验结果不理想，放弃实验结果，从实验开始前重新来过，称为bad-close
  3. 最终分支被删除

> 在满足条件的分支A上工作，时不时会冒出一些大胆的想法，这个时候使用gg-trials-open trialsName创建并转向一个名为A/trials.trialsName的实验分支，在这个分支上进行疯狂的实验，然后


#### basedOn类型分支满足:

  1. 从name|master建立并初始化为name|basedOn
  2. 只能从对应的master分支fork到此分支
  3. 禁止在这个分支上提交

> 这个分支是一个为了使工作流程更为清晰的缓存分支，分支上只有从master稳定分支上挑选出来的自己在工作中将要（尝试）使用的稳定版本。在basedOn类型分支上使用gg-select 版本号  从对应的master分支上选出一个稳定版本或使用gg-select-the-latest从对应的master分支上选择最新的版本，fork到这个分支，并加上inUse-versionNum的标签
从master到此分支的行为是fork，即有可能此分支的log为 (init)v1.0===>v0.9=====>v0.8======>v1.3,这个分支上的commit来源于master，但是其分支提交历史与master分支无关

#### work类型分支满足：

  1. 只能从basedOn类型分支上创建
  2. 可以借助basedOn分支升级

## GitHub

### LICENSE

#### Popular LICENSE

![Free Software License](img/6_free_software_licenses.png)

#### Unique LICENSE

-   CC BY-NC-SA 3.0 License

```html
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.
```

```markdown
**
**    May you do good and not evil.
**    May you find forgiveness for yourself and forgive others.
**    May you share freely, never taking more than you give.
**
**
```

```markdown
DBAD : DON'T BE A DICK PUBLIC LICENSE:

Do whatever you like with the original work, just don't be a dick.

Being a dick includes - but is not limited to - the following instances:

1a. Outright copyright infringement - Don't just copy this and change the name.
1b. Selling the unmodified original with no work done what-so-ever, that's REALLY being a dick.
1c. Modifying the original work to contain hidden harmful content. That would make you a PROPER dick.

If you become rich through modifications, related worksrvices, or supporting the original work, share the love. Only a dick would make loads off this work and not buy the original works creator(s) a pint.Code is provided with no warranty. Using somebody else's code and bitching when it goes wrong makes you a DONKEY dick. Fix the problem yourself. A non-dick would submit the fix back.
```

```markdown
Homework Public License(HPL)

Copyright (c) 2016 Yilong Liu

This is for your reference only,not for your cheating -  Just don't be a dick.

Being a dick includes - but is not limited to - the following instances:

1a. Outright copyright infringement - Don't just copy this and change the name.
1b. Reserve a copy of this project and tell your teacher that it is your own homework - Plagiarism is shame.

If you become rich through modifications, related worksrvices, or supporting the original work, share the love. Only a dick would make loads off this work and not buy the original works creator(s) a pint.Code is provided with no warranty. Using somebody else's code and bitching when it goes wrong makes you a DONKEY dick. Fix the problem yourself. A non-dick would submit the fix back.
```

```markdown
The Star And Thank Author License (SATA)

Copyright (c) 2016 sabertazimi(sabertazimi@gmail.com)

Project Url: https://github.com/sabertazimi/Awesome-Notes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

And wait, the most important, you shall star/+1/like the project(s) in project url
section above first, and then thank the author(s) in Copyright section.

Here are some suggested ways:

 - Email the authors a thank-you letter, and make friends with him/her/them.
 - Report bugs or issues.
 - Tell friends what a wonderful project this is.
 - And, sure, you can just express thanks in your mind without telling the world.

Contributors of this project by forking have the option to add his/her name and
forked project url at copyright and project url sections, but shall not delete
or modify anything else in these two sections.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

### Teamwork

如果在组织的托管空间创建版本库，一定要要为版本库指派一个拥有Push权限的团队，以免以“Fork + Pull”模式工作时，Pull Request没有人响应。

#### Pull Request Work Flow

1. Fork it.
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Ensure tests are passing.
4. Commit changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create new Pull Request.

### Create Repo without Browser

-   利用GitHub Repository API以及curl工具创建仓库

```shell
curl -u 'username' -d '{"name":"RepoName", "description":"description string", "homepage":"URL", "auto_init":true, "gitignore_template":"Meteor", "license_template":"mit"}' https://api.github.com/user/repos
```

-   上传本地代码至远程仓库

```bash
git init

echo "# RepoName" >> README.md
git add README.md
git commit

git remote add origin git@github.com:username/RepoName.git
git push -u origin master
```

或

```bash
git clone git@github.com:username/RepoName

echo "# RepoName" >> README.md
git add README.md
git commit
git push -u
```

### Purge

```sh
$ git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -5 | awk '{print$1}')"
$ git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch your-file-name' --tag-name-filter cat -- --all
```

### Wiki

#### Wiki Git Access

```shell
$ git clone git@github.com:user/repo.wiki.git
```

### Shorten GitHub URL

```bash
curl -i http://git.io -F "url=https://github.com/technoweenie" -F "code=t"
```

## Commands List

### Basic Commands

#### git config

#### git help

#### git init

#### git clone

#### git add

#### git status

#### git diff

#### git difftool

外置diff工具

#### git commit

#### git reset

#### git rm

#### git mv

#### git clean

从工作区中移除不想要的文件。可以是编译的临时文件或者合并冲突的文件。

#### git branch

#### git checkout

#### git merge

#### git mergetool

外置merge工具

#### git log

#### git stash

临时地保存一些还没有提交的工作，以便在分支上不需要提交未完成工作就可以清理工作目录。

#### git tag

#### git fetch

```sh
$ git fetch <repo_name> <branch_name>
```

#### git pull

#### git push

#### git remote

#### git archive

创建项目一个指定快照的归档文件

#### git submodule

管理一个仓库的其他外部仓库。 它可以被用在库或者其他类型的共
享资源上.submodule 命令有几个子命令, 如（ add 、 update 、 sync 等等）用来管理这些
资源.

### 检查与比较

#### git show

#### git shortlog

创建一个漂亮的 changelog 文件

#### git describe

接受任何可以解析成一个提交的东西，然后生成一个人类可读的字符串且不可变。 这是一种获得一个提交的描述的方式，它跟一个提交的 SHA-1 值一样是无歧义，但是更具可读性。

### 调试

#### git bisect
通过自动进行一个二分查找来找到哪一个特定的提交是导致 bug 或者问题的第一个提交。

#### git blame

#### git grep

查找任何字符串或者正则表达式

### 补丁

#### git cherry-pick

获得在单个提交中引入的变更，然后尝试将作为一个新的提交引入到你当前分支上

#### git rebase

#### git revert

### 邮件

#### git apply
应用一个通过 git diff 或者甚至使用 GNU diff 命令创建的补丁

#### git am
应用来自邮箱的补丁

#### git format-patch

mbox 的格式来生成一系列的补丁以便你可以发送到一个邮件列表中

#### git imap-send

将一个由 git format-patch 生成的邮箱上传至 IMAP 草稿文件夹

#### git send-email

通过邮件发送那些使用 git format-patch 生成的补丁

#### git request-pull

### 外部系统

#### git svn

#### git fast-import
对于其他版本控制系统或者从其他任何的格式导入，你可以使用 git fast-import 快速地将其他格式映射到 Git 可以轻松记录的格式

### 管理

#### git gc

在你的仓库中执行 ``garbage collection'' ，删除数据库中不需要的文件和将其他文件打包成一种更有效的格式

#### git fsck

检查内部数据库的问题或者不一致性

#### git reflog

分析你所有分支的头指针的日志来查找出你在重写历史上可能丢失的提交

#### git filter-branch

根据某些规则来重写大量的提交记录，例如从任何地方删除文件，或者通过过滤一个仓库中的一个单独的子目录以提取出一个项目

#### git-note

为特定commit添加note,一个commit只能有一个note

## Other tools

### diff && patch

```sh
$ diff -u <src> <dist>
$ diff -Nur <src_dir> <dist_dir>
```

```sh
$ patch -p[num] < patchfile
$ patch -dry -run -p[num] < patchfile
```

```sh
$ diff -Nur program_1.0 program_2.0 > program_2.0.patch
$ patch -p1 <../program_2.0.patch
```
