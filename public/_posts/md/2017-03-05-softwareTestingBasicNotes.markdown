---
layout:     post
title:      "Software Testing Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Software Testing
---

* [Notes](#notes)
	* [ 测试模型](#-测试模型)
		* [PIE模型](#pie模型)
		* [启发式测试策略模型(Heuristic Test Strategy Model)——软件功能测试(难以实现完全自动化)](#启发式测试策略模型heuristic-test-strategy-model软件功能测试难以实现完全自动化)
		* [用户体验测试(对软件功能测试的有益补充)](#用户体验测试对软件功能测试的有益补充)
	* [测试规模](#测试规模)
	* [基础概念](#基础概念)
	* [测试方法](#测试方法)
		* [图结构覆盖方法](#图结构覆盖方法)
		* [数据流覆盖方法](#数据流覆盖方法)
		* [逻辑覆盖方法](#逻辑覆盖方法)
		* [随机测试方法](#随机测试方法)
		* [黑盒/组合测试方法](#黑盒组合测试方法)
		* [定位Fault](#定位fault)
		* [模糊测试](#模糊测试)
	* [移动设备:(机型,屏幕,环境)碎片化 ，耗电量](#移动设备机型屏幕环境碎片化-耗电量)
	* [Useful Demos/Tools](#useful-demostools)

# Notes

##  测试模型

### PIE模型

(Execution)Fault,(Infection)Error,(Propagation)Failure

### 启发式测试策略模型(Heuristic Test Strategy Model)——软件功能测试(难以实现完全自动化)

- 关注价值(Value)：用户得到价值
- 风险驱动(Risk)：降低价值/用户体验的风险项
- 产品元素(Product Elements)
- 结构(Structure):产品物理元素(如代码、硬件、配置文件)
- 功能(Function):产品功能
- 数据(Data):产品所操作的数据(如输入、输出)
- 接口(Interface):产品所使用/暴露出的接口
- 平台(Platform):产品所依赖的外部元素(如操作系统、输入/输出设备)
- 操作(Operation):产品被使用的方式(如键盘、鼠标、触摸等命令操作)
- 时间(Time):影响产品的时间因素
- 组合元素:测试产品功能间协作

### 用户体验测试(对软件功能测试的有益补充)

- 功能性体验
- 易用性体验
- 性能体验
- 可靠性体验(如软件兼容性)

## 测试规模
Unit/Module/Integration/System Testing

## 基础概念
测试路径:起始顶点至终止顶点

## 测试方法

### 图结构覆盖方法
- 顶点覆盖,边覆盖,边对覆盖(三顶点,两邻边)
- VC/EC/EPC法

### 数据流覆盖方法
- 数据流覆盖:定义处覆盖,使用处覆盖
- DU法(Data&Use)

### 逻辑覆盖方法
- 逻辑覆盖:条件处覆盖,判定处覆盖
- DC(Decision),CC(Condition)法
- MC/DC法
- MCC法(完全覆盖)

### 随机测试方法
- ART(随机测试):每个用例间"距离"尽可能远

### 黑盒/组合测试方法
- 等价类划分:合法输入(软件功能),非法输入(异常处理)
- 等价类的边界值分析:合法MIN,MIN+,MAX-,MAX  非法:MIN-,MAX+
- 决策表+组合测试:简化决策表(考虑输入相关性)
  - 组合用例:维度与测试准度成正比
  - 约束用例:需避开约束输入(输入相关性,同时输入会成为无效输入)
  - 测试用例约简+测试用例优先级:额外贪心算法进行化简+排序测试用例求得近似解
### 定位Fault
- 代码可疑度=
(失败测试用例经过数/失败测试用例总数)/
(成功测试用例经过数/成功测试用例总数+失败测试用例经过数/失败测试用例总数)

即在执行过目标代码的测试用例中失败测试用例占比

### 模糊测试

Fuzzing - 是一种通过向目标系统提供非预期的输入并监视异常结果来发现软件漏洞的方法

## 移动设备:(机型,屏幕,环境)碎片化 ，耗电量

## Useful Demos/Tools
- JUnit
- SeleniumIDE
- PICT
- GuiTar
- Randoop
- 压力测试(Apache Jmeter)
- 移动测试(Monkey:Random Testing)
