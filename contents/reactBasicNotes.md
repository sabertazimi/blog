---
layout: post
title: 'React Basic Notes'
subtitle: 'Be a Stupid Learner'
date: 2018-01-3
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - React
  - JavaScript
  - Frontend Development
  - Web Development
---

# React Basic Notes

## React Core Packages

- `Scheduler` 调度器: 调度任务的优先级, 高优任务优先进入 `Reconciler`.
- `Reconciler` 协调器:
  - 装载 `Renderer`.
  - 接收 `ReactDOM` 和 `React` 模块 (用户代码) 发起的更新请求:
    - `ReactFiberReconciler.updateContainer`.
    - `ReactFiberClassComponent.setState`.
    - `ReactFiberHooks.dispatchAction`.
  - 找出变化组件, 构建 Fiber Tree.
- `Renderer` 渲染器:
  - 引导 `React` 应用启动 (e.g `ReactDOM.createRoot(rootNode).render(<App />)`).
  - 实现 `HostConfig` 协议, 将变化的组件渲染到页面上.

其中 `Reconciler` 构建 Fiber Tree 的过程被包装成一个回调函数, 传入 `Scheduler` 模块等待调度.
`Scheduler` 将回调函数进一步包装成任务对象, 放入多优先级调度的任务队列, 循环消费任务队列, 直至队列清空.
Scheduler Work Loop (任务调度循环) 负责调度 `Task`,
Reconciler Work Loop (`Fiber` 构造循环) 负责实现 `Task`.

`React` runtime main logic:

- Updates: `Add`/`Delete`/`Mutation` updates from `User Code`.
- Registration:
  - `Reconciler` receive updates request from `User Code`.
  - `Scheduler` register new `Task`.
- Execution:
  - `Scheduler` consume `Task` in `TaskQueue` in work loop.
  - `Reconciler` execute `Task` work.
    - `Fiber` 构造循环: construct `Fiber` tree.
    - `commitRoot`: render `Fiber` tree with `Renderer`.
- 任务调度循环与 `Fiber` 构造循环相互配合可实现**可中断渲染**:
  - 渲染中断 (`Reconciler.renderRootConcurrent().shouldYield()`):
    - 存在更高优先级任务 (Priority Scheduling).
    - 当前帧没有剩余时间 (Time Slicing).
  - 渲染恢复 (`Scheduler.workLoop()`):
    将 `callback()` 返回的任务放入任务队列, 继续进行调度直至清空任务队列.

[![React Core Packages](./figures/ReactCorePackages.png)](https://7kms.github.io/react-illustration-series/main/macro-structure)

## React Virtual DOM

- Reduce rendering times with reconciliation algorithm,
  improving rendering efficiency.
- Cross platform code.
- Functional programming without details on DOM manipulation.
- Virtual DOM 很多时候都不是最优的操作,
  但它具有普适性, 在效率与可维护性之间达到平衡.
- [SnabbDOM](https://github.com/snabbdom/snabbdom):
  virtual DOM library focus on modularity and performance.

## React Core Workflow

### Create RootContainer

#### Legacy Root

- [react-dom/src/client/ReactDOMLegacy](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMLegacy.js):
  - **render**.
  - legacyRenderSubtreeIntoContainer.
  - legacyCreateRootFromDOMContainer.
- [react-reconciler/src/ReactFiberReconciler](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.new.js):
  - **createContainer**.
- [react-dom/src/client/ReactDOMComponentTree](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponentTree.js):
  - markContainerAsRoot.
- [react-reconciler/src/ReactFiberRoot](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberRoot.new.js):
  - **createFiberRoot**.
- [react-reconciler/src/ReactFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.new.js):
  - createHostRootFiber.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js):
  - **initializeUpdateQueue**.
- [react-dom/src/events/DOMPluginEventSystem](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/DOMPluginEventSystem.js):
  - listenToAllSupportedEvents:
    事件统一在 rootContainer 上处理 dispatchDiscreteEvent.

#### Concurrent Root

- [react-dom/src/client/ReactDOMRoot](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMRoot.js):
  - **createRoot**.
- [react-reconciler/src/ReactFiberReconciler](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.new.js):
  - **createContainer**.
- [react-dom/src/client/ReactDOMComponentTree](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponentTree.js):
  - markContainerAsRoot.
- [react-reconciler/src/ReactFiberRoot](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberRoot.new.js):
  - **createFiberRoot**.
- [react-reconciler/src/ReactFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.new.js):
  - createHostRootFiber.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js):
  - **initializeUpdateQueue**.
- [react-dom/src/events/DOMPluginEventSystem](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/DOMPluginEventSystem.js):
  - listenToAllSupportedEvents:
    事件统一在 rootContainer 上处理 dispatchDiscreteEvent.
- `ReactDOMRoot.render(<App />)`.

### Update RootContainer

- [react-dom/src/client/ReactDOMLegacy](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMLegacy.js):
  - render.
  - legacyRenderSubtreeIntoContainer.
- [react-dom/src/client/ReactDOMRoot](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMRoot.js):
  - render.
- [react-reconciler/src/ReactFiberReconciler](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.new.js):
  - **updateContainer**.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js):
  - createUpdate.
  - enqueueUpdate.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **scheduleUpdateOnFiber**.
  - **ensureRootIsScheduled**.
- [react-reconciler/src/ReactFiberSyncTaskQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberSyncTaskQueue.new.js):
  - flushSyncCallbacks.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **performSyncWorkOnRoot**.
  - renderRootSync.
  - workLoopSync.
  - **performUnitOfWork**.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):
  - **beginWork**.
  - **updateHostRoot**/**updateXXXComponent**.
  - `ReactDOMComponent.createElement`.
  - reconcileChildren.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.new.js):
  - reconcileChildFibers.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **completeUnitOfWork**.
- [react-reconciler/src/ReactFiberCompleteWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCompleteWork.new.js)
  - **completeWork**.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **commitRoot**.
- [react-dom/src/client/ReactDOMHostConfig](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js):
  - appendChildToContainer.
  - finalizeInitialChildren.
- [react-dom/src/client/ReactDOMComponent](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponent.js):
  - setInitialProperties:
    设置初始化属性, 处理特殊元素和事件.

```ts
// Legacy Mode
import type { ReactElement } from 'react';
import Reconciler from './reconciler';
import type { Container } from './types';

const Renderer = {
  render: (
    element: ReactElement,
    container: Container | null,
    callback?: Function
  ): void => {
    if (container) {
      const root = Reconciler.createContainer(container, 0, false, null);
      Reconciler.updateContainer(element, root, null);
    }
  },
};

export default Renderer;
```

```ts
// Modern Mode
import type { ReactElement } from 'react';
import Reconciler from './reconciler';
import type { Container, OpaqueRoot } from './types';

const Renderer = {
  createRoot: (
    container: Container | null,
    callback?: Function
  ): OpaqueRoot => {
    if (container) {
      const root = Reconciler.createContainer(container, 0, false, null);

      root.render = function (element: ReactElement) {
        Reconciler.updateContainer(element, this, null);
      };

      return root;
    }
  },
};

export default Renderer;
```

### ReactComponent SetState

- [react-dom/src/events/ReactDOMEventListener](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/ReactDOMEventListener.js):
  - dispatchDiscreteEvent.
- [react/src/ReactBaseClasses](https://github.com/facebook/react/blob/main/packages/react/src/ReactBaseClasses.js):
  - **setState**.
- [react-reconciler/src/ReactFiberClassComponent](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.new.js):
  - enqueueSetState.
- [react-reconciler/src/ReactUpdateQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js):
  - createUpdate.
  - enqueueUpdate.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **scheduleUpdateOnFiber**.
  - discreteUpdates.
- [react-reconciler/src/ReactFiberSyncTaskQueue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberSyncTaskQueue.new.js):
  - flushSyncCallbacks.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **performSyncWorkOnRoot**.
  - workLoopSync.
  - **performUnitOfWork**.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):
  - **beginWork**.
  - **updateXXXComponent**.
  - reconcileChildren.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.new.js):
  - reconcileChildFibers.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **completeUnitOfWork**.
- [react-reconciler/src/ReactFiberCompleteWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCompleteWork.new.js)
  - **completeWork**.
- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - **commitRoot**.
  - commitMutationEffects.
- [react-reconciler/src/ReactFiberCommitWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCommitWork.new.js):
  - commitWork.
- [react-dom/src/client/ReactDOMHostConfig](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js):
  - commitUpdate.
- [react-dom/src/client/ReactDOMComponentTree](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponentTree.js):
  - updateFiberProps.
- [react-dom/src/client/ReactDOMComponent](https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMComponent.js):
  - updateProperties:
    Apply the diff.

### ClassComponent Update

- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - performSyncWorkOnRoot.
  - workLoopSync.
  - performUnitOfWork.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):
  - beginWork
  - **updateClassComponent**.
- [react-reconciler/src/ReactFiberClassComponent](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.new.js):
  - updateClassInstance.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):
  - finishClassComponent.
  - **instance.render** (User defined Component).
  - **reconcileChildren**.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.new.js):
  - reconcileChildFibers.

### FunctionComponent Update

- [react-reconciler/src/ReactFiberWorkLoop](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):
  - performSyncWorkOnRoot.
  - workLoopSync.
  - performUnitOfWork.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):
  - beginWork.
  - **updateFunctionComponent**.
- [react-reconciler/src/ReactFiberHooks](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js):
  - renderWithHooks.
  - **FunctionComponent()** (User defined Function).
  - **Hooks**: useXXX -> mountXXX -> updateXXX.
- [react-reconciler/src/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):
  - **reconcileChildren**.
- [react-reconciler/src/ReactChildFiber](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactChildFiber.new.js):
  - reconcileChildFibers.

## React Scheduler

Work loop in scheduler focus on **Task Scheduling**,
not only including `Reconciler.performSyncWorkOnRoot`/`Reconciler.performConcurrentWorkOnRoot`,
but also for non-react tasks
(meaning `Scheduler` module can work standalone without `React`).

### Scheduler Priority

React 16, unstable concurrent mode with
[`Priorities`](https://github.com/facebook/react/blob/main/packages/scheduler/src/SchedulerPriorities.js):

- ImmediatePriority: 立即执行优先级, 级别最高, `expirationTime = -1`.
- UserBlockingPriority: 用户阻塞优先级, `expirationTime = 250`.
- NormalPriority: 正常优先级, `expirationTime = 5000`.
- LowPriority: 低优先级, `expirationTime = 10000`.
- IdlePriority: 可闲置优先级, `expirationTime = maxSigned31BitInt`.

React 17, stable concurrent mode with
[`Lanes`](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberLane.new.js):

```ts
export type Lanes = number;
export type Lane = number;

export const TotalLanes = 31;

export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;

export const InputContinuousHydrationLane: Lane = /*    */ 0b0000000000000000000000000000010;
export const InputContinuousLane: Lanes = /*            */ 0b0000000000000000000000000000100;

export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000000001000;
export const DefaultLane: Lanes = /*                    */ 0b0000000000000000000000000010000;

const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000000000000100000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111111111111000000;
const TransitionLane1: Lane = /*                        */ 0b0000000000000000000000001000000;
const TransitionLane2: Lane = /*                        */ 0b0000000000000000000000010000000;
const TransitionLane3: Lane = /*                        */ 0b0000000000000000000000100000000;
const TransitionLane4: Lane = /*                        */ 0b0000000000000000000001000000000;
const TransitionLane5: Lane = /*                        */ 0b0000000000000000000010000000000;
const TransitionLane6: Lane = /*                        */ 0b0000000000000000000100000000000;
const TransitionLane7: Lane = /*                        */ 0b0000000000000000001000000000000;
const TransitionLane8: Lane = /*                        */ 0b0000000000000000010000000000000;
const TransitionLane9: Lane = /*                        */ 0b0000000000000000100000000000000;
const TransitionLane10: Lane = /*                       */ 0b0000000000000001000000000000000;
const TransitionLane11: Lane = /*                       */ 0b0000000000000010000000000000000;
const TransitionLane12: Lane = /*                       */ 0b0000000000000100000000000000000;
const TransitionLane13: Lane = /*                       */ 0b0000000000001000000000000000000;
const TransitionLane14: Lane = /*                       */ 0b0000000000010000000000000000000;
const TransitionLane15: Lane = /*                       */ 0b0000000000100000000000000000000;
const TransitionLane16: Lane = /*                       */ 0b0000000001000000000000000000000;

const RetryLanes: Lanes = /*                            */ 0b0000111110000000000000000000000;
const RetryLane1: Lane = /*                             */ 0b0000000010000000000000000000000;
const RetryLane2: Lane = /*                             */ 0b0000000100000000000000000000000;
const RetryLane3: Lane = /*                             */ 0b0000001000000000000000000000000;
const RetryLane4: Lane = /*                             */ 0b0000010000000000000000000000000;
const RetryLane5: Lane = /*                             */ 0b0000100000000000000000000000000;

export const SomeRetryLane: Lane = RetryLane1;

export const SelectiveHydrationLane: Lane = /*          */ 0b0001000000000000000000000000000;

const NonIdleLanes = /*                                 */ 0b0001111111111111111111111111111;

export const IdleHydrationLane: Lane = /*               */ 0b0010000000000000000000000000000;
export const IdleLane: Lanes = /*                       */ 0b0100000000000000000000000000000;

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000;
```

### Scheduler Workflow

Scheduler main [workflow](https://github.com/facebook/react/blob/main/packages/scheduler/src/forks/Scheduler.js):

`scheduleCallback(callback)`
-> `push(queue, newTask)` (Wrap `callback` into `task`)
(For delayed task -> `requestHostTimeout(handleTimeout, delayTime)`)
-> `requestHostCallback(flushWork)`
-> `messageChannelPort.postMessage(null)`
-> `performWorkUntilDeadline()`
-> `flushWork(hasTimeRemaining, currentTime)`:
-> `workLoop(hasTimeRemaining, currentTime)`:

将 Reconciler 的工作 (Callback)
包装成 Task 组成 Task Queue,
按照时间分片机制,
不断地消费 Task Queue.

对于延时任务 (Delayed Task),
会将其先放入 Timer Queue,
等待延时完成后再将其放入 Task Queue.

### Scheduler Time Slicing

```ts
// 时间切片周期, 默认是 5ms.
// 如果一个 task 运行超过该周期, 下一个 task 执行前, 会把控制权归还浏览器.
const yieldInterval = 5;
const maxYieldInterval = 300;

let deadline = 0; // currentTime + yieldInterval.
let needsPaint = false;
let isMessageLoopRunning = false;
let scheduledHostCallback = null;

const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;

const scheduling = navigator.scheduling;
const getCurrentTime = performance.now;

// 请求回调:
const requestHostCallback = callback => {
  // 1. 保存 callback.
  scheduledHostCallback = callback;

  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    // 2. 通过 MessageChannel 发送消息.
    port.postMessage(null);
  }
};

// 取消回调:
const cancelHostCallback = () => {
  scheduledHostCallback = null;
};

const requestHostTimeout = (callback, ms) => {
  taskTimeoutID = setTimeout(() => {
    callback(getCurrentTime());
  }, ms);
};

const cancelHostTimeout = () => {
  clearTimeout(taskTimeoutID);
  taskTimeoutID = -1;
};

// 是否让出主线程 (time slice):
const shouldYieldToHost = () => {
  const currentTime = getCurrentTime();

  if (currentTime >= deadline) {
    if (needsPaint || scheduling.isInputPending()) {
      // There is either a pending paint or a pending input.
      return true;
    }

    // There's no pending input.
    // Only yield if we've reached the max yield interval.
    return currentTime >= maxYieldInterval;
  } else {
    // There's still time left in the frame.
    return false;
  }
};

// 请求绘制:
const requestPaint = () => {
  needsPaint = true;
};

// 实际回调函数处理:
const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    // 1. 设置 currentTime 与 deadline.
    const currentTime = getCurrentTime();
    deadline = currentTime + yieldInterval;
    const hasTimeRemaining = true;

    try {
      // 2. 执行回调, 返回是否有还有剩余任务.
      const hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);

      if (!hasMoreWork) {
        // 没有剩余任务, 退出.
        isMessageLoopRunning = false;
        scheduledHostCallback = null;
      } else {
        port.postMessage(null); // 有剩余任务, 发起新的调度.
      }
    } catch (error) {
      port.postMessage(null); // 如有异常, 重新发起调度.
      throw error;
    }
  } else {
    isMessageLoopRunning = false;
  }

  needsPaint = false; // Reset.
};
```

### Scheduler Task Queue

Task queue is [MinHeap](https://github.com/facebook/react/blob/main/packages/scheduler/src/SchedulerMinHeap.js),
storing Tasks.

```ts
const newTask = {
  id: taskIdCounter++,
  callback, // Work from reconciler.
  priorityLevel,
  startTime,
  expirationTime,
  sortIndex: -1, // MinHeap queue indexing.
};
```

```ts
const scheduleCallback = (priorityLevel, callback, options) => {
  const currentTime = getCurrentTime();
  const startTime = currentTime;
  const expirationTime = startTime + timeout[priorityLevel]; // -1/250/5000/10000/MAX_INT.
  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };

  if (startTime > currentTime) {
    // Delayed task.
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);

    // All tasks are delayed, and this is the task with the earliest delay.
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      }

      // Schedule a timeout.
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    // Normal task.
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);

    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
};

const handleTimeout = currentTime => {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      const firstTimer = peek(timerQueue);

      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
};
```

### Scheduler Work Loop

当 `callback()` 返回函数时, 表明产生连续回调 (e.g 出现更高优先任务/时间分片用完, 渲染中断),
需将返回的函数再次放入任务队列, 继续进行调度直至清空任务队列 (渲染恢复).

```ts
function flushWork(hasTimeRemaining, initialTime) {
  // We'll need a host callback the next time work is scheduled.
  isHostCallbackScheduled = false;

  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }

  isPerformingWork = true; // Lock.
  const previousPriorityLevel = currentPriorityLevel;

  try {
    return workLoop(hasTimeRemaining, initialTime);
  } finally {
    // Restore context.
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  advanceTimers(currentTime);
  currentTask = peek(taskQueue);

  while (currentTask !== null) {
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // This currentTask hasn't expired, and we've reached the deadline.
      break;
    }

    const callback = currentTask.callback;

    if (typeof callback === 'function') {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();

      if (typeof continuationCallback === 'function') {
        // 产生了连续回调 (如 Fiber树太大, 出现了中断渲染), 保留 currentTask.
        currentTask.callback = continuationCallback;
      } else {
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }

      advanceTimers(currentTime);
    } else {
      // 如果任务被取消 (currentTask.callback = null), 将其移出队列.
      pop(taskQueue);
    }

    currentTask = peek(taskQueue);
  }

  // Return whether there's additional work.
  if (currentTask !== null) {
    return true;
  } else {
    const firstTimer = peek(timerQueue);

    // 存在延时任务, 继续进行调度.
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }

    return false;
  }
}
```

## React Fiber

React Fiber 的目标是提高其在动画、布局和手势等领域的适用性.
它的主要特性是 `Incremental Rendering` : 将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力.

### React Fiber Type

`Fiber` [definition](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactInternalTypes.js):

- Component type.
- Current props and state.
- Pointers to parent, sibling, and child components,
- Pointer to DOM/class instance.
- Other internal metadata to track rendering process.

```ts
export interface Fiber {
  tag: WorkTag;
  key: string | null;
  elementType: any;
  type: any; // Tag/Class/Function.
  stateNode: any; // DOM/class instance.
  ref: (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject | null;

  // Singly Linked List Tree Structure.
  return: Fiber | null; // DFS parent Fiber node.
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  // Props and state for output.
  pendingProps: any;
  memoizedProps: any;
  updateQueue: mixed; // Updates from diff(pendingProps, memoizedProps).
  memoizedState: any;

  // Context API.
  dependencies: Dependencies | null; // (Contexts, Events) dependencies.

  mode: TypeOfMode; // NoMode/BlockingMode/ConcurrentMode bit.

  // Effects.
  flags: Flags;
  subtreeFlags: Flags;
  deletions: Array<Fiber> | null;
  nextEffect: Fiber | null; // Next effect Fiber node.
  firstEffect: Fiber | null; // First effect Fiber node.
  lastEffect: Fiber | null; // Last effect Fiber node.

  // Priority.
  lanes: Lanes;
  childLanes: Lanes;
  alternate: Fiber | null; // `current` Fiber and `workInpProgress` Fiber.

  // Performance statistics for React DevTool.
  actualDuration?: number;
  actualStartTime?: number;
  selfBaseDuration?: number;
  treeBaseDuration?: number;
}
```

### React Fiber Work Tag

常见的 Fiber [类型](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js):

- HostComponent: HTML native tag.
- ClassComponent.
- FunctionComponent.

```ts
type WorkTag =
  | 'FunctionComponent'
  | 'ClassComponent'
  | 'IndeterminateComponent'
  | 'HostRoot'
  | 'HostPortal'
  | 'HostComponent'
  | 'HostText'
  | 'Fragment'
  | 'Mode'
  | 'ContextConsumer'
  | 'ContextProvider'
  | 'ForwardRef'
  | 'Profiler'
  | 'SuspenseComponent'
  | 'MemoComponent'
  | 'SimpleMemoComponent'
  | 'LazyComponent'
  | 'IncompleteClassComponent'
  | 'DehydratedFragment'
  | 'SuspenseListComponent'
  | 'FundamentalComponent'
  | 'ScopeComponent'
  | 'Block'
  | 'OffscreenComponent'
  | 'LegacyHiddenComponent';
```

### React Fiber Mode

React [运行模式](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactTypeOfMode.js):
所有 `Fiber.mode` 保持一致 (包括 `FiberRoot`).

```ts
type TypeOfMode = number;

const NoMode = /*                         */ 0b000000;
const ConcurrentMode = /*                 */ 0b000001;
const ProfileMode = /*                    */ 0b000010;
const DebugTracingMode = /*               */ 0b000100;
const StrictLegacyMode = /*               */ 0b001000;
const StrictEffectsMode = /*              */ 0b010000;
const ConcurrentUpdatesByDefaultMode = /* */ 0b100000;
```

### React Fiber Effects

- Insert DOM elements: `Placement` tag.
- Update DOM elements: `Update` tag.
- Delete DOM elements: `Deletion` tag.
- Update Ref property: `Ref` tag.
- `useEffect` callback: `got Passive` tag.
  - `useEffect(fn)`: `Mount` and `Update` lifecycle.
  - `useEffect(fn, [])`: `Mount` lifecycle.
  - `useEffect(fn, [deps])`:
    `Mount` lifecycle and
    `Update` lifecycle with `deps` changed.

React create effects when `Render` stage,
then update effects to real DOM when `Commit` stage.

常见的 Effect [标志位](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberFlags.js):

```ts
type Flags = number;

const NoFlags = /*                      */ 0b000000000000000000;
const PerformedWork = /*                */ 0b000000000000000001;
const Placement = /*                    */ 0b000000000000000010;
const Update = /*                       */ 0b000000000000000100;
const PlacementAndUpdate = /*           */ 0b000000000000000110;
const Deletion = /*                     */ 0b000000000000001000;
const ContentReset = /*                 */ 0b000000000000010000;
const Callback = /*                     */ 0b000000000000100000;
const DidCapture = /*                   */ 0b000000000001000000;
const Ref = /*                          */ 0b000000000010000000;
const Snapshot = /*                     */ 0b000000000100000000;
const Passive = /*                      */ 0b000000001000000000;
const PassiveUnmountPendingDev = /*     */ 0b000010000000000000;
const Hydrating = /*                    */ 0b000000010000000000;
const HydratingAndUpdate = /*           */ 0b000000010000000100;
const LifecycleEffectMask = /*          */ 0b000000001110100100;
const HostEffectMask = /*               */ 0b000000011111111111;
const Incomplete = /*                   */ 0b000000100000000000;
const ShouldCapture = /*                */ 0b000001000000000000;
const ForceUpdateForLegacySuspense = /* */ 0b000100000000000000;
const PassiveStatic = /*                */ 0b001000000000000000;
const BeforeMutationMask = /*           */ 0b000000001100001010;
const MutationMask = /*                 */ 0b000000010010011110;
const LayoutMask = /*                   */ 0b000000000010100100;
const PassiveMask = /*                  */ 0b000000001000001000;
const StaticMask = /*                   */ 0b001000000000000000;
const MountLayoutDev = /*               */ 0b010000000000000000;
const MountPassiveDev = /*              */ 0b100000000000000000;
```

### React Fiber Lanes

[Assign `Lane` to `Update`](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):

- Legacy 模式: 返回 SyncLane.
- Blocking 模式: 返回 SyncLane.
- Concurrent 模式:
  - 正常情况: 根据当前的调度优先级来生成一个 lane.
  - 处于 Suspense 过程中: 会优先选择 `TransitionLanes` 通道中的空闲通道 (或最高优先级).

```ts
export function requestUpdateLane(fiber: Fiber): Lane {
  const mode = fiber.mode;

  if ((mode & BlockingMode) === NoMode) {
    // Legacy 模式.
    return SyncLane;
  } else if ((mode & ConcurrentMode) === NoMode) {
    // Blocking 模式.
    return getCurrentPriorityLevel() === ImmediateSchedulerPriority
      ? SyncLane
      : SyncBatchedLane;
  }

  // Concurrent 模式.
  if (currentEventWipLanes === NoLanes) {
    currentEventWipLanes = workInProgressRootIncludedLanes;
  }

  const isTransition = requestCurrentTransition() !== NoTransition;

  if (isTransition) {
    // 特殊情况, 处于 Suspense 过程中.
    if (currentEventPendingLanes !== NoLanes) {
      currentEventPendingLanes =
        mostRecentlyUpdatedRoot !== null
          ? mostRecentlyUpdatedRoot.pendingLanes
          : NoLanes;
    }

    return findTransitionLane(currentEventWipLanes, currentEventPendingLanes);
  }

  // 正常情况, 获取调度优先级.
  let lane;
  const schedulerPriority = getCurrentPriorityLevel();

  if (
    (executionContext & DiscreteEventContext) !== NoContext &&
    schedulerPriority === UserBlockingSchedulerPriority
  ) {
    // `executionContext` 存在输入事件, 且调度优先级是用户阻塞性质.
    lane = findUpdateLane(InputDiscreteLanePriority, currentEventWipLanes);
  } else {
    // 调度优先级转换为车道模型.
    const schedulerLanePriority =
      schedulerPriorityToLanePriority(schedulerPriority);
    lane = findUpdateLane(schedulerLanePriority, currentEventWipLanes);
  }

  return lane;
}
```

[Global `renderLanes`](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberLane.new.js):

Fiber 树构造过程中 (`Render Phase`),
若 Fiber 对象或 Update 对象优先级 (`fiber.lanes`/`update.lane`) 比全局渲染优先级低,
则将会被忽略 (节点未更新, 可以直接复用).

```ts
export function getNextLanes(root: FiberRoot, wipLanes: Lanes): Lanes {
  const pendingLanes = root.pendingLanes;

  if (pendingLanes === NoLanes) {
    return NoLanes;
  }

  let nextLanes = NoLanes;
  const suspendedLanes = root.suspendedLanes;
  const pingedLanes = root.pingedLanes;
  const nonIdlePendingLanes = pendingLanes & NonIdleLanes;

  if (nonIdlePendingLanes !== NoLanes) {
    const nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;

    if (nonIdleUnblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
    } else {
      const nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;

      if (nonIdlePingedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
      }
    }
  } else {
    const unblockedLanes = pendingLanes & ~suspendedLanes;

    if (unblockedLanes !== NoLanes) {
      nextLanes = getHighestPriorityLanes(unblockedLanes);
    } else {
      if (pingedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(pingedLanes);
      }
    }
  }

  if (nextLanes === NoLanes) {
    return NoLanes;
  }

  if (
    wipLanes !== NoLanes &&
    wipLanes !== nextLanes &&
    (wipLanes & suspendedLanes) === NoLanes
  ) {
    const nextLane = getHighestPriorityLane(nextLanes);
    const wipLane = getHighestPriorityLane(wipLanes);

    if (
      nextLane >= wipLane ||
      (nextLane === DefaultLane && (wipLane & TransitionLanes) !== NoLanes)
    ) {
      return wipLanes;
    }
  }

  if (
    allowConcurrentByDefault &&
    (root.current.mode & ConcurrentUpdatesByDefaultMode) !== NoMode
  ) {
    // Do nothing, use the lanes as they were assigned.
  } else if ((nextLanes & InputContinuousLane) !== NoLanes) {
    nextLanes |= pendingLanes & DefaultLane;
  }

  const entangledLanes = root.entangledLanes;

  if (entangledLanes !== NoLanes) {
    const entanglements = root.entanglements;
    let lanes = nextLanes & entangledLanes;

    while (lanes > 0) {
      const index = pickArbitraryLaneIndex(lanes);
      const lane = 1 << index;
      nextLanes |= entanglements[index];
      lanes &= ~lane;
    }
  }

  return nextLanes;
}
```

Lanes model [use case](https://github.com/facebook/react/pull/18796):

```ts
// task 与 batchTask 的优先级是否重叠:
// 1. expirationTime:
const isTaskIncludedInBatch = priorityOfTask >= priorityOfBatch;
// 2. Lanes:
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0;

// 当同时处理一组任务, 该组内有多个任务, 且每个任务的优先级不一致:
// 1. expirationTime:
const isTaskIncludedInBatch =
  taskPriority <= highestPriorityInRange &&
  taskPriority >= lowestPriorityInRange;
// 2. Lanes:
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0;

// 从 group 中增删 task:
// 1. expirationTime (need list):
task.prev.next = task.next;

let current = queue;
while (task.expirationTime >= current.expirationTime) {
  current = current.next;
}
task.next = current.next;
current.next = task;

const isTaskIncludedInBatch =
  taskPriority <= highestPriorityInRange &&
  taskPriority >= lowestPriorityInRange;

// 2. Lanes:
batchOfTasks &= ~task; // Delete task.
batchOfTasks |= task; // Add task.
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0;
```

### React Fiber Trees

- `current` Fiber tree: rendered to screen.
- `workInProgress` Fiber tree: under reconciliation.
- When `workInProgress` Fiber tree complete `render` + `commit`,
  swap 2 Fiber tree:
  - Reuse Fiber objects.
  - Reduce memory usage and GC time.
- `FiberRoot`:
  - `FiberRoot.current = currentHostRootFiber`.
  - `FiberRoot.finishedWork = workInProgressHostRootFiber`.
  - `currentHostRootFiber.stateNode = FiberRoot`.
  - `workInProgressHostRootFiber.stateNode = FiberRoot`.
  - `currentHostRootFiber.alternate = workInProgressHostRootFiber`
  - `workInProgressHostRootFiber.alternate = currentHostRootFiber`
- `ReactElement` tree -> `Fiber` tree -> `DOM` tree.

[![React Fiber Trees](./figures/ReactFiberTrees.png)](https://7kms.github.io/react-illustration-series/main/fibertree-prepare)

### React Fiber Work Loop

[![React Fiber Work Loop](./figures/ReactFiberWorkLoop.png)](https://7kms.github.io/react-illustration-series/main/reconciler-workflow)

## React Reconciler

### Reconciler Render Workflow

Reconciler construct Fiber tree:

- scheduleUpdateOnFiber:
  - 首次 render 直接调用 `performWorkOnRoot`.
  - 再次 render 需要调用 `ensureRootIsScheduled`.
- ensureRootIsScheduled.
- flushSyncCallbacks.
- performSyncWorkOnRoot / performConcurrentWorkOnRoot:
  - `performConcurrentWorkOnRoot` 支持可中断渲染:
    - 此函数首先检查是否处于 render 过程中,
      是否需要恢复上一次渲染.
    - 如果本次渲染被中断,
      此函数最后返回一个新的 `performConcurrentWorkOnRoot` 函数,
      等待下一次 Scheduler 调度.
- renderRootSync / renderRootConcurrent:
  - 此函数会调用 `prepareFreshStack`, 重置 FiberRoot 上的全局属性, 重置 Fiber Work Loop 全局变量.
  - 此函数会设置 `workInProgressRoot = FiberRoot`, 表示正在进行 render.
  - 此函数退出前, 会重置 `workInProgressRoot = null`, 表示没有正在进行中的 render.
  - 此函数退出前, 会挂载 `FiberRoot.finishedWork = workInProgressHostRootFiber`.
    此时 `HostRootFiber` 上挂载了副作用队列, 层级越深子节点副作用越靠前.
- workLoopSync / workLoopConcurrent:
  循环调用 `performUnitOfWork`,
  直到 `workInProgress === null` 或用完当前时间分片.
- **performUnitOfWork(workInProgress)**:
  - 存在子节点， `beginWork` 与 `completeUnitOfWork` 不在同一次循环里调用:
    执行完 `beginWork` 后,
    优先向下遍历, 执行子节点的 `beginWork` 与 `completeUnitOfWork`,
    在 N 次循环后再向上回溯.
  - 不存在子节点， `beginWork` 与 `completeUnitOfWork` 在同一次循环里调用.
  - 若 `beginWork` 返回 `next` 节点,
    则设置 `workInProgress = next` 进行 DFS 遍历,
    再次调用此函数.
  - 若 `beginWork` 返回 `null` 节点,
    则调用 `completeUnitOfWork` 函数完成节点处理.
  - 若存在兄弟节点,
    `completeUnitOfWork` 会设置 `workInProgress = siblingFiber` 进行 DFS 遍历,
    再次调用此函数.
  - 若到达子叶节点,
    `completeUnitOfWork` 会设置 `workInProgress = returnFiber` 进行 DFS 回溯,
    再次调用此函数.
- **beginWork**:
  - 根据 `ReactElement` 对象创建所有的 Fiber 节点, 最终构造出 Fiber 树形结构
    (设置 `return` 和 `sibling` 指针).
  - 调用 `updateXXX`, 设置 `fiber.flags`/`fiber.stateNode` 等状态.
  - 非子叶节点返回子节点, 进行 DFS 遍历; 子叶节点返回 `null`, 直接进入 `completeUnitOfWork` 阶段.
- **updateHostRoot/updateXXXComponent**:
  - 根据 `fiber.pendingProps`/`fiber.updateQueue` 等输入数据状态,
    计算 `fiber.memoizedState` 作为输出状态.
  - ClassComponent:
    - 构建 `React.Component` 实例.
    - 把新实例挂载到 `fiber.stateNode` 上.
    - 执行 `render` 之前的生命周期函数.
    - 执行 `render` 方法, 获取下级 `ReactElement`.
    - 设置 `fiber.flags`, 标记副作用.
  - FunctionComponent:
    - 执行 `renderWithHooks()` -> `FunctionComponent()`, 获取下级 `ReactElement`.
    - 设置 `fiber.flags`, 标记副作用.
  - HostComponent.
    - `pendingProps.children` 作为下级 `ReactElement`.
    - 如果下级节点是文本节点, 则设置下级节点为 `null` (进入 `completeUnitOfWork` 阶段).
    - 设置 `fiber.flags`, 标记副作用.
  - 根据实际情况, 设置 `fiber.flags`, 标记副作用.
  - 根据获取的下级 `ReactElement` 对象, 调用 `reconcileChildren` 生成 `Fiber` 子节点 (只生成次级子节点).
- `ReactDOMComponent.createElement()` / `ReactClassComponent.render()` / `ReactFunctionComponent()`.
- **reconcileChildren**.
- mountChildFibers/reconcileChildFibers:
  - `mountChildFibers`: similar logic, not tracking side effects.
  - `reconcileChildFibers`: similar logic, tracking side effects.
  - `reconcileSingleElement`.
  - `reconcileSingleTextNode`.
  - `reconcileSinglePortal`.
  - `reconcileChildrenArray`.
  - `reconcileChildrenIterator`.
- **completeUnitOfWork**:
  - 当 `reconcileChildren` 返回值为 `null` 时, 表示 DFS 进行到子叶节点,
    `performUnitOfWork` 会调用 `completeUnitOfWork` 函数.
  - 调用 `completeWork` 进行 `render`.
  - 把当前 Fiber 对象的副作用队列 (`firstEffect` 与 `lastEffect`)
    加到父节点的副作用队列之后, 更新父节点的 `firstEffect` 和 `lastEffect` 指针.
  - 识别 `beginWork` 阶段设置的 `fiber.flags`,
    若当前 Fiber 存在副作用 (Effects),
    则将当前 Fiber 加入到父节点的 Effects 队列,
    等待 Commit 阶段处理.
  - 将 `workInProgress` 设置为 `siblingFiber` (DFS 遍历) 或 `returnFiber` (DFS 回溯),
    继续构建 Fiber 树.
- **completeWork**:
  - 创建 DOM 实例, 绑定至 `HostComponent`/`HostText` `fiber.stateNode` (局部状态).
  - 设置 DOM 节点属性, 绑定事件.
  - 设置 `fiber.flags`, 收集副作用.

```ts
export function scheduleUpdateOnFiber(
  fiber: Fiber,
  lane: Lane,
  eventTime: number
) {
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);

  if (lane === SyncLane) {
    if (
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // 初次渲染.
      performSyncWorkOnRoot(root);
    } else {
      // 对比更新.
      ensureRootIsScheduled(root, eventTime);
    }
  }

  mostRecentlyUpdatedRoot = root;
}

function performSyncWorkOnRoot(root) {
  // 1. 获取本次render的优先级, 初次构造返回 NoLanes.
  const lanes = getNextLanes(root, NoLanes);
  // 2. 从root节点开始, 至上而下更新.
  const exitStatus = renderRootSync(root, lanes);
  // 3. 将最新的 Fiber 树挂载到 root.finishedWork 节点上.
  const finishedWork: Fiber = root.current.alternate;
  root.finishedWork = finishedWork;
  root.finishedLanes = lanes;
  // 4. 进入 Commit 阶段.
  commitRoot(root);
}

function performConcurrentWorkOnRoot(root) {
  const originalCallbackNode = root.callbackNode;

  // 1. 刷新 pending 状态的 effects, 有可能某些 effect 会取消本次任务.
  const didFlushPassiveEffects = flushPassiveEffects();

  if (didFlushPassiveEffects) {
    if (root.callbackNode !== originalCallbackNode) {
      // 任务被取消, 退出调用.
      return null;
    } else {
      // Current task was not canceled. Continue.
    }
  }

  // 2. 获取本次渲染的优先级.
  const lanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );

  // 3. 构造 Fiber 树.
  const exitStatus = renderRootConcurrent(root, lanes);

  if (
    includesSomeLane(
      workInProgressRootIncludedLanes,
      workInProgressRootUpdatedLanes
    )
  ) {
    // 如果在 render 过程中产生了新 update, 且新 update 的优先级与最初 render 的优先级有交集.
    // 那么最初 render 无效, 丢弃最初 render 的结果, 等待下一次调度.
    prepareFreshStack(root, NoLanes);
  } else if (exitStatus !== RootIncomplete) {
    // 4. 异常处理: 有可能fiber构造过程中出现异常.
    if (exitStatus === RootError) {
      processError();
    }

    const finishedWork = root.current.alternate; // Fiber
    root.finishedWork = finishedWork;
    root.finishedLanes = lanes;

    // 5. 输出: 渲染 Fiber树.
    finishConcurrentRender(root, exitStatus, lanes);
  }

  // 退出前再次检测, 是否还有其他更新, 是否需要发起新调度.
  ensureRootIsScheduled(root, now());

  if (root.callbackNode === originalCallbackNode) {
    // 渲染被阻断, 返回一个新的 performConcurrentWorkOnRoot 函数, 等待下一次调度.
    return performConcurrentWorkOnRoot.bind(null, root);
  }

  return null;
}

function renderRootSync(root: FiberRoot, lanes: Lanes) {
  const prevExecutionContext = executionContext;
  executionContext |= RenderContext;

  // 如果 FiberRoot 变动, 或者 update.lane 变动, 都会刷新栈帧, 丢弃上一次渲染进度.
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    // 刷新栈帧.
    prepareFreshStack(root, lanes);
  }
  do {
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  } while (true);

  // 重置全局变量, 表明 render 结束.
  executionContext = prevExecutionContext;
  workInProgressRoot = null;
  workInProgressRootRenderLanes = NoLanes;
  return workInProgressRootExitStatus;
}

function renderRootConcurrent(root: FiberRoot, lanes: Lanes) {
  const prevExecutionContext = executionContext;
  executionContext |= RenderContext;
  const prevDispatcher = pushDispatcher();

  // 如果 FiberRoot 变动, 或者 update.lane变动, 都会刷新栈帧, 丢弃上一次渲染进度.
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    resetRenderTimer();
    // 刷新栈帧.
    prepareFreshStack(root, lanes);
    startWorkOnPendingInteractions(root, lanes);
  }

  const prevInteractions = pushInteractions(root);

  do {
    try {
      workLoopConcurrent();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  } while (true);

  // 重置全局变量.
  resetContextDependencies();
  popDispatcher(prevDispatcher);
  executionContext = prevExecutionContext;

  // Check if the tree has completed.
  if (workInProgress !== null) {
    // Still work remaining.
    return RootIncomplete;
  } else {
    // Completed the tree.
    // Set this to null to indicate there's no in-progress render.
    workInProgressRoot = null;
    workInProgressRootRenderLanes = NoLanes;

    // Return the final exit status.
    return workInProgressRootExitStatus;
  }
}

function prepareFreshStack(root: FiberRoot, lanes: Lanes) {
  // 重置 FiberRoot 上的属性.
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  const timeoutHandle = root.timeoutHandle;

  if (timeoutHandle !== noTimeout) {
    root.timeoutHandle = noTimeout;
    cancelTimeout(timeoutHandle);
  }

  if (workInProgress !== null) {
    let interruptedWork = workInProgress.return;
    while (interruptedWork !== null) {
      unwindInterruptedWork(interruptedWork);
      interruptedWork = interruptedWork.return;
    }
  }

  // 重置全局变量.
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null); // currentHostRootFiber.alternate.
  workInProgressRootRenderLanes =
    subtreeRenderLanes =
    workInProgressRootIncludedLanes =
      lanes;
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootFatalError = null;
  workInProgressRootSkippedLanes = NoLanes;
  workInProgressRootUpdatedLanes = NoLanes;
  workInProgressRootPingedLanes = NoLanes;
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield.
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork: Fiber): void {
  // unitOfWork 就是被传入的 workInProgress.
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork, subtreeRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    // 如果没有派生出新的下级节点, 则进入 completeWork 阶段, 传入的是当前 unitOfWork.
    completeUnitOfWork(unitOfWork);
  } else {
    // 如果派生出新的下级节点, 则递归处理.
    workInProgress = next;
  }
}

function _performUnitOfWork_Recursive(unitOfWork: Fiber): void {
  beginWork(unitOfWork.alternate, unitOfWork, subtreeRenderLanes);
  if (unitOfWork.child) _performUnitOfWork_Recursive(unitOfWork.child);
  completeUnitOfWork(unitOfWork);
  if (unitOfWork.sibling) _performUnitOfWork_Recursive(unitOfWork.sibling);
}

function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // 1. 设置 workInProgress 优先级为 NoLanes (最高优先级).
  const updateLanes = workInProgress.lanes;
  didReceiveUpdate = false;
  workInProgress.lanes = NoLanes;

  // 2. 根据 workInProgress 节点的类型, 用不同的方法派生出子节点.
  switch (workInProgress.tag) {
    case ClassComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes);
    case HostText:
      return updateHostText(current, workInProgress);
    case Fragment:
      return updateFragment(current, workInProgress, renderLanes);
  }
}

function completeUnitOfWork(unitOfWork: Fiber): void {
  let completedWork = unitOfWork;

  // 外层循环控制并移动指针 (workInProgress/completedWork).
  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;

    if ((completedWork.flags & Incomplete) === NoFlags) {
      // 1. 处理 Fiber 节点, 会调用渲染器 (关联 Fiber 节点和 DOM 对象, 绑定事件等).
      const next = completeWork(current, completedWork, subtreeRenderLanes);

      if (next !== null) {
        // 如果派生出其他的子节点, 则回到 beginWork 阶段进行处理.
        workInProgress = next;
        return;
      }

      // 重置子节点的优先级.
      resetChildLanes(completedWork);

      if (
        returnFiber !== null &&
        (returnFiber.flags & Incomplete) === NoFlags
      ) {
        // 2. 收集当前 Fiber 节点以及其子树的副作用 Effects.
        // 2.1 把子节点的副作用队列添加到父节点上.
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = completedWork.firstEffect;
        }

        if (completedWork.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
          }

          returnFiber.lastEffect = completedWork.lastEffect;
        }

        // 2.2 如果当前 Fiber 节点有副作用, 将其添加到子节点的副作用队列之后.
        const flags = completedWork.flags;

        if (returnFiber.lastEffect !== null) {
          returnFiber.lastEffect.nextEffect = completedWork;
        } else {
          returnFiber.firstEffect = completedWork;
        }

        returnFiber.lastEffect = completedWork;
      }
    }

    const siblingFiber = completedWork.sibling;

    if (siblingFiber !== null) {
      // 如果有兄弟节点, 返回之后再次进入 beginWork 阶段.
      workInProgress = siblingFiber;
      return;
    }

    // 移动指针, 指向下一个节点.
    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);

  // 已回溯到根节点, 设置 workInProgressRootExitStatus = RootCompleted.
  if (workInProgressRootExitStatus === RootIncomplete) {
    workInProgressRootExitStatus = RootCompleted;
  }
}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case HostRoot: {
      const fiberRoot: FiberRoot = workInProgress.stateNode;

      if (fiberRoot.pendingContext) {
        fiberRoot.context = fiberRoot.pendingContext;
        fiberRoot.pendingContext = null;
      }

      if (current === null || current.child === null) {
        // 设置 fiber.flags.
        workInProgress.flags |= Snapshot;
      }

      return null;
    }
    case HostComponent: {
      popHostContext(workInProgress);
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;
      const currentHostContext = getHostContext();

      // 1. 创建 DOM 对象.
      const instance = createInstance(
        type,
        newProps,
        rootContainerInstance,
        currentHostContext,
        workInProgress
      );

      // 2. 把子树中的 DOM 对象 append 到本节点的 DOM 对象之后.
      appendAllChildren(instance, workInProgress, false, false);

      // 3. 设置 stateNode 属性, 指向 DOM 对象.
      workInProgress.stateNode = instance;

      if (
        // 4. 设置DOM对象的属性, 绑定事件等.
        finalizeInitialChildren(
          instance,
          type,
          newProps,
          rootContainerInstance,
          currentHostContext
        )
      ) {
        // 设置 fiber.flags (Update).
        markUpdate(workInProgress);
      }

      if (workInProgress.ref !== null) {
        // 设置 fiber.flags (Ref).
        markRef(workInProgress);
      }

      return null;
    }
  }
}
```

#### Host Root Fiber Rendering

```ts
function updateHostRoot(current, workInProgress, renderLanes) {
  // 1. 状态计算, 更新整合到 workInProgress.memoizedState.
  const updateQueue = workInProgress.updateQueue;
  const nextProps = workInProgress.pendingProps;
  const prevState = workInProgress.memoizedState;
  const prevChildren = prevState !== null ? prevState.element : null;
  cloneUpdateQueue(current, workInProgress);
  // 遍历 updateQueue.shared.pending, 提取有足够优先级的 update对象, 计算出最终的状态 workInProgress.memoizedState.
  processUpdateQueue(workInProgress, nextProps, null, renderLanes);
  const nextState = workInProgress.memoizedState;

  // 2. 获取下级 ReactElement 对象.
  const nextChildren = nextState.element;
  const root: FiberRoot = workInProgress.stateNode;

  // 3. 根据 ReactElement 对象, 调用 reconcileChildren 生成 Fiber 子节点 (只生成次级子节点).
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
```

#### Host Component Fiber Rendering

```ts
function updateHostComponent(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  // 1. 状态计算, 由于 HostComponent 是无状态组件, 只需要收集 nextProps.
  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const prevProps = current !== null ? current.memoizedProps : null;

  // 2. 获取下级 ReactElement 对象.
  let nextChildren = nextProps.children;
  const isDirectTextChild = shouldSetTextContent(type, nextProps);

  if (isDirectTextChild) {
    // 如果子节点只有一个文本节点, 不用再创建一个 HostText 类型的 Fiber.
    nextChildren = null;
  } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
    // 设置 fiber.flags.
    workInProgress.flags |= ContentReset;
  }

  // 设置 fiber.flags.
  markRef(current, workInProgress);

  // 3. 根据 ReactElement 对象, 调用 reconcileChildren 生成 Fiber 子节点(只生成次级子节点)
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
```

#### Class Component Fiber Rendering

#### Function Component Fiber Rendering

### Reconciler Update Workflow

[Update and Update Queue](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js):

- `UpdateQueue` 是一个**循环队列**.
- 创建 `Update` 时机 (`createUpdate`/`enqueueUpdate`):
  - `ReactFiberReconciler.updateContainer`.
  - `ReactFiberClassComponent.setState`.
  - `ReactFiberHooks.dispatchAction`.
- `Reconciler.Render` 阶段, 调用 `XXXClassInstance`/`useXXX`,
  遍历处理 Update Queue (`processUpdateQueue`/`HooksDispatcherOnUpdate`), 计算出 memoizedState,
  利用 pendingProps 与 memoizedState 产生新的 ReactElement (`ClassComponent.render()`/`FunctionComponent()`).

```ts
interface Update<State> {
  lane: Lane;
  tag: 'UpdateState' | 'ReplaceState' | 'ForceUpdate' | 'CaptureUpdate';
  payload: any;
  callback: (() => mixed) | null;
  next: Update<State> | null;
  _eventTime: number;
}

interface SharedQueue<State> {
  pending: Update<State> | null;
}

interface UpdateQueue<State> {
  baseState: State;
  firstBaseUpdate: Update<State> | null;
  lastBaseUpdate: Update<State> | null;
  shared: SharedQueue<State>;
  effects: Array<Update<State>> | null; // Updates with `callback`.
}
```

[ReactFiberClassComponent.setState](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberClassComponent.new.js):

```ts
const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    // 1. 获取 ClassComponent 实例对应的 Fiber 节点.
    const fiber = getInstance(inst);
    // 2. 创建 Update 对象.
    const eventTime = requestEventTime();
    const lane = requestUpdateLane(fiber);
    const update = createUpdate(eventTime, lane);
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    // 3. 将 Update 对象添加到当前 Fiber 节点的 updateQueue.
    enqueueUpdate(fiber, update);
    // 4. 请求调度, 进入 Reconciler.
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  },
};
```

[ReactFiberHooks.dispatchAction](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js):

```ts
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A
) {
  // 1. 创建 Update 对象.
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(fiber);
  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  };

  // 2. 将 Update 对象添加到当前 Hook 对象的 updateQueue.
  const pending = queue.pending;

  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  queue.pending = update;

  // 3. 请求调度, 进入 Reconciler.
  scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```

- createUpdate.
- enqueueUpdate.
- scheduleUpdateOnFiber.
- **markUpdateLaneFromFiberToRoot**:
  找出 Fiber 树中受到本次 `Update` 影响的所有节点 (存在更新可能),
  设置这些节点的 `fiber.lanes` 或 `fiber.childLanes`.
- ensureRootIsScheduled.
- flushSyncCallbacks.
- performSyncWorkOnRoot / performConcurrentWorkOnRoot.
- renderRootSync / renderRootConcurrent.
- workLoopSync / workLoopConcurrent.
- **performUnitOfWork(workInProgress)**.
- **beginWork**:
  - 若判断当前 Fiber 节点无需更新, 调用 `bailoutOnAlreadyFinishedWork` 循环检测子节点是否需要更新:
    - `instance.shouldComponentUpdate() === false`.
    - `workInProgress.pendingProps === current.memoizedProps`.
    - `hasLegacyContextChange() === false`.
    - `checkIfContextChanged(fiber.dependencies) === false`.
    - `includesSomeLane(fiber.lanes, renderLanes) === false`.
  - 若判断当前 Fiber 节点需要更新, 调用 `UpdateXXXComponent` 进行更新.
- **bailoutOnAlreadyFinishedWork**:
  - 若 `includesSomeLane(renderLanes, workInProgress.childLanes) === false`
    表明子节点无需更新, 可直接进入回溯阶段 (`completeUnitOfWork`).
  - 若 `includesSomeLane(renderLanes, workInProgress.childLanes) === true`,
    表明子节点需要更新, clone 并返回子节点.
- **updateHostRoot/updateXXXComponent**.
- `ReactClassComponent.render()` / `ReactFunctionComponent()` / `ReactDOMComponent.createElement()`:
  遍历处理 Update Queue (`processUpdateQueue`/`HooksDispatcherOnUpdate`), 计算出 memoizedState,
  利用 pendingProps 与 memoizedState 产生新的 ReactElement.
- **reconcileChildren**:
  - 通过 ReactElement 与 OldFiber, 产生或复用 ChildFiber.
  - 设置 `fiber.flags`, 标记副作用: `Placement`/`Deletion`/etc.
  - 对于 `Deletion` Fiber, 在 `beginWork` 阶段提前将其添加到父节点的 Effects 队列中
    (该节点会脱离 Fiber 树, 不会再进入 `completeWork` 阶段, 无法在此阶段收集此节点副作用).
- reconcileChildFibers.
- **completeUnitOfWork**: 收集副作用.
- **completeWork**: 收集副作用.

```ts
// 标记所有可能存在更新的节点, 并设置 fiber.lanes 与 fiber.childLanes.
function markUpdateLaneFromFiberToRoot(
  sourceFiber: Fiber, // 被更新的节点.
  lane: Lane
): FiberRoot | null {
  // 设置 sourceFiber.lanes.
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
  let alternate = sourceFiber.alternate;

  if (alternate !== null) {
    // 同时设置 sourceFiber.alternate.lanes.
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  }

  // 从 sourceFiber 开始, 向上遍历所有 Fiber, 直到 HostRootFiber.
  // 设置沿途所有 fiber.childLanes 与 fiber.alternate.childLanes.
  let node = sourceFiber;
  let parent = sourceFiber.return;

  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane);
    alternate = parent.alternate;

    if (alternate !== null) {
      alternate.childLanes = mergeLanes(alternate.childLanes, lane);
    }

    node = parent;
    parent = parent.return;
  }

  if (node.tag === HostRoot) {
    const root: FiberRoot = node.stateNode;
    return root;
  } else {
    return null;
  }
}

function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const updateLanes = workInProgress.lanes;

  if (current !== null) {
    // 进入对比.
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;
    if (
      oldProps !== newProps ||
      hasLegacyContextChanged() ||
      (__DEV__ ? workInProgress.type !== current.type : false)
    ) {
      didReceiveUpdate = true;
    } else if (!includesSomeLane(renderLanes, updateLanes)) {
      // 当前渲染优先级 renderLanes 不包括 fiber.lanes, 表明当前 Fiber 节点无需更新.
      didReceiveUpdate = false;
      // 调用 bailoutOnAlreadyFinishedWork 循环检测子节点是否需要更新.
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
  }

  // 当前节点需要更新.
  workInProgress.lanes = NoLanes; // 最高优先级

  switch (workInProgress.tag) {
    case ClassComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes);
    case HostText:
      return updateHostText(current, workInProgress);
    case Fragment:
      return updateFragment(current, workInProgress, renderLanes);
  }
}

function bailoutOnAlreadyFinishedWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    // 渲染优先级不包括 workInProgress.childLanes, 表明子节点也无需更新.
    // 返回 null, 直接进入回溯阶段.
    return null;
  } else {
    // Fiber 自身无需更新, 但子节点需要更新, clone 并返回子节点.
    cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }
}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case HostComponent: {
      // 非文本节点.
      popHostContext(workInProgress);
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;

      if (current !== null && workInProgress.stateNode !== null) {
        // 处理改动.
        updateHostComponent(
          current,
          workInProgress,
          type,
          newProps,
          rootContainerInstance
        );

        if (current.ref !== workInProgress.ref) {
          markRef(workInProgress);
        }
      }

      return null;
    }
    case HostText: {
      // 文本节点.
      const newText = newProps;

      if (current !== null && workInProgress.stateNode !== null) {
        const oldText = current.memoizedProps;
        // 处理改动.
        updateHostText(current, workInProgress, oldText, newText);
      }

      return null;
    }
  }
}

function updateHostComponent(
  current: Fiber,
  workInProgress: Fiber,
  type: Type,
  newProps: Props,
  rootContainerInstance: Container
) {
  const oldProps = current.memoizedProps;

  if (oldProps === newProps) {
    return;
  }

  const instance: Instance = workInProgress.stateNode;
  const currentHostContext = getHostContext();
  const updatePayload = prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  );
  workInProgress.updateQueue = updatePayload;

  // 如果有属性变动, 设置 fiber.flags |= Update, 等待 Commit 阶段处理.
  if (updatePayload) {
    markUpdate(workInProgress);
  }
}

function updateHostText(
  current: Fiber,
  workInProgress: Fiber,
  oldText: string,
  newText: string
) {
  // 如果有属性变动, 设置 fiber.flags |= Update, 等待 Commit 阶段处理.
  if (oldText !== newText) {
    markUpdate(workInProgress);
  }
}
```

### Reconciler Diff Workflow

Reconciler:

- O(n) incomplete tree comparison: only compare same level nodes.
- `ReactElement` + Old Children Fiber -> New Children Fiber.
- Create new children fiber (non exist/need update),
  drop useless children fiber,
  reuse old children fiber,
  set `fiber.flags`: `Placement`/`Deletion`.
  prepare for `Commit` stage.
- `key` prop to hint for Fiber nodes reuse.
- Detailed diff [algorithm](https://7kms.github.io/react-illustration-series/algorithm/diff).

#### Different Types Elements

- Rebuild element and children.

#### Same Type DOM Elements

- Only update the changed attributes.
- Use `key` attribute to match children.

`Best Practice`: give `key` to `<li>/<tr>/<tc>` elements
(stable, predictable, unique and not array indexed).

#### Same Type Component Elements

- Update the props to match the new element.

#### Reconcile Array Elements

- 第一次循环: 比较公共序列:
  - 从左到右逐一遍历, 遇到一个无法复用的节点则退出循环.
- 第二次循环: 比较非公共序列
  - 在第一次循环的基础上, 如果 oldFiber 队列遍历完成, 证明 newChildren 队列中剩余的对象全部都是新增.
  - 此时继续遍历剩余的 newChildren 队列即可, 没有额外的 diff 比较.
  - 在第一次循环的基础上, 如果 oldFiber 队列没有遍历完,
    需要将 oldFiber 队列中剩余的对象都添加到一个 Map 集合中, 以 oldFiber.key 作为键.
  - 此时继续遍历剩余的 newChildren 队列, 需要用 newChild.key 到 Map 集合中进行查找,
    将匹配上的 oldFiber 取出与 newChild 进行 diff 比较.
- 清理工作:
  - 在第二次循环结束后,
    若 Map 集合中还有剩余的 oldFiber,
    则说明 oldFiber 都是被删除的节点, 需要打上删除标记 (`Deletion`).

### Reconciler Commit Workflow

#### Renderer and HostConfig Protocol

`Renderer`:

- Implementing `HostConfig` [protocol](https://github.com/facebook/react/blob/main/packages/react-reconciler/README.md).
- Rendering fiber tree to real contents:
  - Web: DOM node.
  - Native: native UI.
  - Server: SSR strings.
- Real renderer [demo](https://github.com/sabertazimi/awesome-web/tree/main/packages/react-renderer/src/renderer).

`HostConfig` protocol:

- `isPrimaryRender: true`.
- `supportsHydration: true`: SSR renderer.
- `supportsMutation: true`: React DOM renderer.
- `supportsPersistence: true`: React Native renderer.
- Platform timer functions:
  - now.
  - scheduleTimeout.
  - cancelTimeout.
- Creation operations:
  - createInstance.
  - createTextInstance.
- UI tree operations:
  - appendInitialChild.
  - appendChild.
  - appendChildToContainer.
  - removeChildFromContainer.
  - removeChild.
  - clearContainer.
- Update props operations:
  - finalizeInitialChildren.
  - prepareUpdate.
  - commitUpdate.
  - commitTextUpdate.
  - shouldSetTextContent.
  - resetTextContent.
- Context and schedule operations:
  - getRootHostContext.
  - getChildHostContext.
  - getPublicInstance.
  - prepareForCommit.
  - resetAfterCommit.
  - preparePortalMount.

#### Commit Root

- `FiberRoot.finishedWork`:
  - 副作用队列挂载在根节点上 (`finishedWork.firstEffect`).
  - 最新 DOM 对象挂载在 HostComponent Fiber 上 (`fiber.stateNode`).
- `BeforeMutation` phase:
  - Read the state of the host tree right before DOM mutation.
  - Process
    `Passive`/`Snapshot`/`Deletion`
    effects fiber.
  - `instance.getSnapshotBeforeUpdate`.
- `Mutation` phase.
  - Mutate the host tree, render UI.
  - Process
    `ContentReset`/`Ref`/`Visibility`/`Placement`/`Update`/`Deletion`/`Hydrating`
    effects fiber.
- `Layout` phase.
  - After DOM mutation.
  - Process `Update | Callback` effects fiber.
  - `instance.componentDidMount/componentDidUpdate` (**synchronous**).
  - `instance` callback for `setState`.
  - `useLayoutEffect` (**synchronous**).
- `CommitEffects` functions located in
  [ReactFiberCommitWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCommitWork.new.js).

```ts
function commitRoot(root: FiberRoot, recoverableErrors: null | Array<mixed>) {
  const previousUpdateLanePriority = getCurrentUpdatePriority();
  const prevTransition = ReactCurrentBatchConfig.transition;

  try {
    ReactCurrentBatchConfig.transition = null;
    setCurrentUpdatePriority(DiscreteEventPriority);
    commitRootImpl(root, recoverableErrors, previousUpdateLanePriority);
  } finally {
    ReactCurrentBatchConfig.transition = prevTransition;
    setCurrentUpdatePriority(previousUpdateLanePriority);
  }

  return null;
}

function commitRootImpl(
  root: FiberRoot,
  recoverableErrors: null | Array<mixed>,
  renderPriorityLevel: EventPriority
) {
  do {
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  flushRenderPhaseStrictModeWarningsInDEV();

  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    throw new Error('Should not already be working.');
  }

  const finishedWork = root.finishedWork;
  const lanes = root.finishedLanes;

  if (finishedWork === null) {
    return null;
  }

  // 清空 FiberRoot 对象上的属性.
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  root.callbackNode = null;
  root.callbackPriority = NoLane;

  // Update the first and last pending times on this root.
  // The new first pending time is whatever is left on the root fiber.
  const remainingLanes = mergeLanes(
    finishedWork.lanes,
    finishedWork.childLanes
  );

  if (root === workInProgressRoot) {
    // We can reset these now that they are finished.
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  }

  // If there are pending passive effects, schedule a callback to process them.
  // Do this as early as possible before anything else in commit phase.
  if (
    (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
    (finishedWork.flags & PassiveMask) !== NoFlags
  ) {
    if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true;
      pendingPassiveEffectsRemainingLanes = remainingLanes;
      scheduleCallback(NormalSchedulerPriority, () => {
        flushPassiveEffects();
        return null;
      });
    }
  }

  // Check if there are any effects in the whole tree.
  const subtreeHasEffects =
    (finishedWork.subtreeFlags &
      (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !==
    NoFlags;
  const rootHasEffect =
    (finishedWork.flags &
      (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !==
    NoFlags;

  if (subtreeHasEffects || rootHasEffect) {
    // Store context.
    const prevTransition = ReactCurrentBatchConfig.transition;
    const previousPriority = getCurrentUpdatePriority();
    const prevExecutionContext = executionContext;
    ReactCurrentBatchConfig.transition = null;
    setCurrentUpdatePriority(DiscreteEventPriority);
    executionContext |= CommitContext;

    // Reset this to null before calling life cycles.
    ReactCurrentOwner.current = null;

    // `BeforeMutation` phase:
    // read the state of the host tree right before we mutate it.
    // `getSnapshotBeforeUpdate` is called.
    commitBeforeMutationEffects(root, finishedWork);

    // `Mutation` phase:
    // mutate the host tree.
    commitMutationEffects(root, finishedWork, lanes);

    resetAfterCommit(root.containerInfo);

    // The workInProgress tree is now the current tree (during `componentDidMount`/`Update`).
    root.current = finishedWork;

    // `Layout` phase:
    // `useLayoutEffect` is called.
    commitLayoutEffects(finishedWork, root, lanes);

    // Tell Scheduler to yield at the end of the frame,
    // so the browser has an opportunity to paint.
    requestPaint();

    // Restore context.
    executionContext = prevExecutionContext;
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig.transition = prevTransition;
  } else {
    // No effects.
    root.current = finishedWork;
  }

  const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;

  if (rootDoesHavePassiveEffects) {
    // This commit has passive effects:
    // Stash a reference to them.
    rootDoesHavePassiveEffects = false;
    rootWithPendingPassiveEffects = root;
    pendingPassiveEffectsLanes = lanes;
  } else {
    // There were no passive effects:
    // immediately release the cache pool for this render.
    releaseRootPooledCache(root, remainingLanes);
  }

  // Always call this before exiting `commitRoot`,
  // to ensure that any additional work on this root is scheduled.
  ensureRootIsScheduled(root, now());

  // If the passive effects are the result of a discrete render,
  // flush them synchronously at the end of the current task
  // so that the result is immediately observable.
  if (
    includesSomeLane(pendingPassiveEffectsLanes, SyncLane) &&
    root.tag !== LegacyRoot
  ) {
    flushPassiveEffects();
  }

  // If layout work was scheduled, flush it now.
  flushSyncCallbacks();

  return null;
}
```

```ts
const BeforeMutationMask = Update | Snapshot | ChildDeletion | Visibility;

const MutationMask =
  Placement |
  Update |
  ChildDeletion |
  ContentReset |
  Ref |
  Hydrating |
  Visibility;

const LayoutMask = Update | Callback | Ref | Visibility;
```

#### Before Mutation Phase

- `Passive` effects:
  - `FunctionComponent` fiber (hooks):
    If there are pending passive effects,
    schedule a callback (**asynchronous**) to process them,
    **as early as possible** before anything else in commit phase.
  - `useXXX` hooks normally run in **asynchronous** mode.
  - `useEffect` (**asynchronous**) run after `useLayoutEffect`.
- `Snapshot` effects:
  - `HostRoot` fiber: `HostConfig.clearContainer`.
  - `ClassComponent` fiber: `instance.getSnapShotBeforeUpdate`.
- `Deletion` effects: `commitBeforeMutationEffectsDeletion` -> `HostConfig.beforeActiveInstanceBlur`.

```ts
// `Passive` effects.
scheduleCallback(NormalSchedulerPriority, () => {
  flushPassiveEffects();
  return null;
});

function flushPassiveEffects(): boolean {
  // Returns whether passive effects were flushed.
  if (pendingPassiveEffectsRenderPriority !== NoSchedulerPriority) {
    const priorityLevel =
      pendingPassiveEffectsRenderPriority > NormalSchedulerPriority
        ? NormalSchedulerPriority
        : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = NoSchedulerPriority;
    return runWithPriority(priorityLevel, flushPassiveEffectsImpl);
  }

  return false;
}

function flushPassiveEffectsImpl() {
  if (rootWithPendingPassiveEffects === null) {
    return false;
  }

  rootWithPendingPassiveEffects = null;
  pendingPassiveEffectsLanes = NoLanes;

  // 1. 执行 effect.destroy().
  const unmountEffects = pendingPassiveHookEffectsUnmount;
  pendingPassiveHookEffectsUnmount = [];

  for (let i = 0; i < unmountEffects.length; i += 2) {
    const effect = unmountEffects[i];
    const fiber = unmountEffects[i + 1];
    const destroy = effect.destroy;
    effect.destroy = undefined;

    if (typeof destroy === 'function') {
      destroy();
    }
  }

  // 2. 执行新 effect.create(), 重新赋值到 effect.destroy.
  const mountEffects = pendingPassiveHookEffectsMount;
  pendingPassiveHookEffectsMount = [];

  for (let i = 0; i < mountEffects.length; i += 2) {
    const effect = mountEffects[i];
    const fiber = mountEffects[i + 1];
    effect.destroy = create();
  }
}
```

```ts
// `Snapshot` effects.
function commitBeforeMutationEffects(root: FiberRoot, firstChild: Fiber) {
  HostConfig.prepareForCommit(root.containerInfo);
  nextEffect = firstChild;

  // DFS traverse.
  while (nextEffect !== null) {
    const fiber = nextEffect;
    const deletions = fiber.deletions;

    if (deletions !== null) {
      for (let i = 0; i < deletions.length; i++) {
        const deletion = deletions[i];
        commitBeforeMutationEffectsDeletion(deletion);
      }
    }

    const child = fiber.child;

    if (
      (fiber.subtreeFlags & BeforeMutationMask) !== NoFlags &&
      child !== null
    ) {
      // 1. Visit children.
      nextEffect = child;
    } else {
      while (nextEffect !== null) {
        const fiber = nextEffect;
        commitBeforeMutationEffectsOnFiber(fiber);
        const sibling = fiber.sibling;

        // 2. Visit sibling.
        if (sibling !== null) {
          nextEffect = sibling;
          break;
        }

        nextEffect = fiber.return;
      }
    }
  }
}

function commitBeforeMutationEffectsOnFiber(finishedWork: Fiber) {
  const current = finishedWork.alternate;
  const flags = finishedWork.flags;

  if ((flags & Snapshot) !== NoFlags) {
    switch (finishedWork.tag) {
      case ClassComponent: {
        if (current !== null) {
          const prevProps = current.memoizedProps;
          const prevState = current.memoizedState;
          const instance = finishedWork.stateNode;

          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          const snapshot = instance.getSnapshotBeforeUpdate(
            finishedWork.elementType === finishedWork.type
              ? prevProps
              : resolveDefaultProps(finishedWork.type, prevProps),
            prevState
          );
          instance.__reactInternalSnapshotBeforeUpdate = snapshot;
        }

        break;
      }
      case HostRoot: {
        if (supportsMutation) {
          const root = finishedWork.stateNode;
          HostConfig.clearContainer(root.containerInfo);
        }

        break;
      }
      case FunctionComponent:
      case ForwardRef:
      case SimpleMemoComponent:
      case HostComponent:
      case HostText:
      case HostPortal:
      case IncompleteClassComponent:
        // Nothing to do for these component types.
        break;
      default: {
        throw new Error(
          'This unit of work tag should not have side-effects. This error is ' +
            'likely caused by a bug in React. Please file an issue.'
        );
      }
    }
  }
}

function commitBeforeMutationEffectsDeletion(deletion: Fiber) {
  if (doesFiberContain(deletion, focusedInstanceHandle)) {
    shouldFireAfterActiveInstanceBlur = true;
    beforeActiveInstanceBlur(deletion);
  }
}
```

#### Mutation Phase

- `ContentReset` effects: `commitResetTextContent` -> `HostConfig.resetTextContext`.
- `Ref` effects: `commitAttachRef`/`commitDetachRef` -> `HostConfig.getPublicInstance`.
- `Visibility` effects:
  - `SuspenseComponent` fiber:
    `markCommitTimeOfFallback`.
  - `OffscreenComponent` fiber:
    `hideOrUnhideAllChildren` -> `HostConfig.hideInstance/hideTextInstance/unhideInstance/unhideTextInstance`.
- `Placement` effects:
  `commitPlacement`
  -> `insertOrAppendPlacementNode`/`insertOrAppendPlacementNodeIntoContainer`
  -> `HostConfig.appendChild/insertBefore/appendChildToContainer/insertInContainerBefore`.
- `Update` effects: `commitWork` -> `HostConfig.commitUpdate/commitTextUpdate/commitHydratedContainer/replaceContainerChildren`.
- `Deletion` effects: `commitDeletion` -> `HostConfig.removeChild/removeChildFromContainer/clearSuspenseBoundaryFromContainer`.
- `Hydrating` effects.

```ts
export function commitMutationEffects(
  root: FiberRoot,
  firstChild: Fiber,
  committedLanes: Lanes
) {
  inProgressLanes = committedLanes;
  inProgressRoot = root;
  nextEffect = firstChild;

  while (nextEffect !== null) {
    const fiber = nextEffect;
    const deletions = fiber.deletions;

    if (deletions !== null) {
      for (let i = 0; i < deletions.length; i++) {
        const childToDelete = deletions[i];
        commitDeletion(root, childToDelete, fiber);
      }
    }

    const child = fiber.child;

    if ((fiber.subtreeFlags & MutationMask) !== NoFlags && child !== null) {
      // 1. Visit children.
      nextEffect = child;
    } else {
      while (nextEffect !== null) {
        const fiber = nextEffect;
        commitMutationEffectsOnFiber(fiber, root, lanes);
        const sibling = fiber.sibling;

        // 2. Visit sibling.
        if (sibling !== null) {
          nextEffect = sibling;
          break;
        }

        nextEffect = fiber.return;
      }
    }
  }

  inProgressLanes = null;
  inProgressRoot = null;
}

function commitMutationEffectsOnFiber(
  finishedWork: Fiber,
  root: FiberRoot,
  lanes: Lanes
) {
  const flags = finishedWork.flags;

  if (flags & ContentReset) {
    commitResetTextContent(finishedWork);
  }

  if (flags & Ref) {
    const current = finishedWork.alternate;

    if (current !== null) {
      // 先清空 ref, 在第三阶段 (Layout), 再重新赋值.
      commitDetachRef(current);
    }

    if (finishedWork.tag === ScopeComponent) {
      commitAttachRef(finishedWork);
    }
  }

  if (flags & Visibility) {
    switch (finishedWork.tag) {
      case SuspenseComponent: {
        const newState: OffscreenState | null = finishedWork.memoizedState;
        const isHidden = newState !== null;

        if (isHidden) {
          const current = finishedWork.alternate;
          const wasHidden = current !== null && current.memoizedState !== null;

          if (!wasHidden) {
            markCommitTimeOfFallback();
          }
        }

        break;
      }
      case OffscreenComponent: {
        const newState: OffscreenState | null = finishedWork.memoizedState;
        const isHidden = newState !== null;
        const current = finishedWork.alternate;
        const wasHidden = current !== null && current.memoizedState !== null;
        const offscreenBoundary: Fiber = finishedWork;

        if (supportsMutation) {
          hideOrUnhideAllChildren(offscreenBoundary, isHidden);
        }

        break;
      }
    }
  }

  const primaryFlags = flags & (Placement | Update | Hydrating);

  switch (primaryFlags) {
    case Placement: {
      // Placement
      commitPlacement(finishedWork);
      finishedWork.flags &= ~Placement; // Clear bit.
      break;
    }
    case PlacementAndUpdate: {
      // Placement
      commitPlacement(finishedWork);
      finishedWork.flags &= ~Placement; // Clear bit.

      // Update
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
      break;
    }
    case Hydrating: {
      finishedWork.flags &= ~Hydrating; // Clear bit.
      break;
    }
    case HydratingAndUpdate: {
      finishedWork.flags &= ~Hydrating; // Clear bit.

      // Update
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
      break;
    }
    case Update: {
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
      break;
    }
  }
}
```

#### Layout Phase

- `Update | Callback` effects:
  - `instance.componentDidMount/componentDidUpdate` (**synchronous**).
  - `instance` callback for `setState`.
  - `useLayoutEffect` (**synchronous**).
  - `HostConfig.getPublicInstance/commitMount`.

```ts
function commitLayoutEffects(
  finishedWork: Fiber,
  root: FiberRoot,
  committedLanes: Lanes
): void {
  inProgressLanes = committedLanes;
  inProgressRoot = root;
  nextEffect = finishedWork;

  while (nextEffect !== null) {
    const fiber = nextEffect;
    const firstChild = fiber.child;

    if ((fiber.subtreeFlags & LayoutMask) !== NoFlags && firstChild !== null) {
      // 1. Visit children.
      nextEffect = firstChild;
    } else {
      while (nextEffect !== null) {
        const fiber = nextEffect;

        if ((fiber.flags & LayoutMask) !== NoFlags) {
          const current = fiber.alternate;
          commitLayoutEffectOnFiber(root, current, fiber, committedLanes);
        }

        // Complete `commitLayoutEffects`.
        if (fiber === subtreeRoot) {
          nextEffect = null;
          break;
        }

        const sibling = fiber.sibling;

        // 2. Visit sibling.
        if (sibling !== null) {
          nextEffect = sibling;
          break;
        }

        nextEffect = fiber.return;
      }
    }
  }

  inProgressLanes = null;
  inProgressRoot = null;
}

function commitLayoutEffectOnFiber(
  finishedRoot: FiberRoot,
  current: Fiber | null,
  finishedWork: Fiber,
  committedLanes: Lanes
): void {
  if ((finishedWork.flags & LayoutMask) !== NoFlags) {
    switch (finishedWork.tag) {
      case FunctionComponent:
      case ForwardRef:
      case SimpleMemoComponent: {
        if (
          !enableSuspenseLayoutEffectSemantics ||
          !offscreenSubtreeWasHidden
        ) {
          commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
        }

        break;
      }
      case ClassComponent: {
        const instance = finishedWork.stateNode;

        if (finishedWork.flags & Update) {
          if (!offscreenSubtreeWasHidden) {
            if (current === null) {
              instance.componentDidMount();
            } else {
              const prevProps =
                finishedWork.elementType === finishedWork.type
                  ? current.memoizedProps
                  : resolveDefaultProps(
                      finishedWork.type,
                      current.memoizedProps
                    );
              const prevState = current.memoizedState;

              instance.componentDidUpdate(
                prevProps,
                prevState,
                instance.__reactInternalSnapshotBeforeUpdate
              );
            }
          }
        }

        const updateQueue = finishedWork.updateQueue;

        if (updateQueue !== null) {
          // 处理 update 回调函数, e.g: `this.setState({}, callback)`.
          commitUpdateQueue(finishedWork, updateQueue, instance);
        }

        break;
      }
      case HostRoot: {
        const updateQueue = finishedWork.updateQueue;

        if (updateQueue !== null) {
          let instance = null;

          if (finishedWork.child !== null) {
            switch (finishedWork.child.tag) {
              case HostComponent:
                instance = getPublicInstance(finishedWork.child.stateNode);
                break;
              case ClassComponent:
                instance = finishedWork.child.stateNode;
                break;
            }
          }

          // 处理 update 回调函数, e.g: `this.setState({}, callback)`.
          commitUpdateQueue(finishedWork, updateQueue, instance);
        }

        break;
      }
      case HostComponent: {
        const instance: Instance = finishedWork.stateNode;

        if (current === null && finishedWork.flags & Update) {
          const type = finishedWork.type;
          const props = finishedWork.memoizedProps;
          commitMount(instance, type, props, finishedWork);
        }

        break;
      }
      case SuspenseComponent: {
        commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        break;
      }
      case HostText:
      case HostPortal:
      case Profiler:
      case SuspenseListComponent:
      case IncompleteClassComponent:
      case ScopeComponent:
      case OffscreenComponent:
      case LegacyHiddenComponent: {
        break;
      }

      default:
        throw new Error(
          'This unit of work tag should not have side-effects. This error is ' +
            'likely caused by a bug in React. Please file an issue.'
        );
    }
  }

  // 重新设置ref.
  if (finishedWork.flags & Ref) {
    commitAttachRef(finishedWork);
  }
}
```

### Reconciler Performance Tips

- Render: 通过一些启发式算法跳过没有发生变更的子树.
- Commit:
  - 维护了一个列表用于记录变化的 Fiber, 不再访问其他 Fiber.
  - 首次渲染 (Mount) 时只有 `HostRootFiber.flags` 会设置 `Placement`,
    在 Commit 阶段只会执行一次插入操作.
- GC:
  - Reuse `OldFiber` objects when `Bailout`.
  - `current` Fiber tree and `workInProgress` Fiber tree for `Double Buffering`.

### Minimal Reconciler Implementation

```ts
const performWork = deadline => {
  if (!nextUnitOfWork) {
    resetNextUnitOfWork();
  }

  // whether current status is idle status or not
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }

  // checks if there's pending work
  // if exist, performWork in **next frame** when idle
  if (nextUnitOfWork || updateQueue.length > 0) {
    requestIdleCallback(performWork);
  }
};

const scheduleUpdate = (instance, partialState) => {
  updateQueue.push({
    from: CLASS_COMPONENT,
    instance,
    partialState,
  });

  requestIdleCallback(performWork);
};

// React.render function
const render = (elements, container) => {
  updateQueue.push({
    from: HOST_ROOT,
    dom: container,
    newProps: {
      children: elements,
    },
  });

  requestIdleCallback(performWork);
};
```

## Props and States

### setState

- `setState` Synchronous Way:
  When it comes `blocking mode`
  (`ReactDOM.createBlockingRoot(rootNode).render(<App />)`),
  `setState` works in synchronous mode:
  `scheduleUpdateOnFiber` -> `ensureRootIsScheduled` -> **`flushSyncCallbackQueue`**.
- `setState` Asynchronous Way:
  At most of the other time, `setState` works in asynchronous mode,
  including `legacy mode`(`ReactDOM.render(<App />, rootNode)`)
  and `concurrent mode`(`ReactDOM.createRoot(rootNode).render(<App />)`).
- 在异步模式下, 为了防止子组件在处理事件时多次渲染,
  将多个 `setState` (包括父组件) 移到浏览器事件之后执行
  (Batched Updates: 此时 React 内部变量 `isBatchingUpdates` 变成 true),
  可以提升 React 性能.
  未来会在更多的可以 Batched Updates 的场景下将 `setState` 设为异步执行,
  所以编写代码时最好将 setState 总是当做异步执行函数.

```tsx
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }

  render() {
    return <div>Example</div>;
  }
}

// => 0 0 2 3
```

### componentDidMount

- don't `setState` directly in this method
- can use `setInterval`/`setTimeout`/AJAX request/`fetch` in this method,
  and call `setState` as `callback` inside these functions

```tsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch('https://api.example.com/items')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

### Props Validation

- `React.PropTypes.array/bool/func/number/object/string/symbol/node/element`.
- `React.PropTypes.any.isRequired`.
- `React.PropTypes.objectOf(React.PropsTypes.number)`.
- `React.PropTypes.arrayOf(React.PropsTypes.number)`.
- `React.PropTypes.instanceOf/oneOf/oneOfType(type)`.

## Element and Component

React Element 实际上是纯对象,
可由 `React.createElement()`/`JSX`/`Element Factory Helper` 创建,
并被 React 在必要时渲染成真实的 DOM Nodes.

```ts
type ReactInternalType =
  | 'react.element'
  | 'react.portal'
  | 'react.fragment'
  | 'react.strict_mode'
  | 'react.profiler'
  | 'react.provider'
  | 'react.context'
  | 'react.forward_ref'
  | 'react.suspense'
  | 'react.suspense_list'
  | 'react.memo'
  | 'react.lazy'
  | 'react.block'
  | 'react.server.block'
  | 'react.fundamental'
  | 'react.scope'
  | 'react.opaque.id'
  | 'react.debug_trace_mode'
  | 'react.offscreen'
  | 'react.legacy_hidden';

export interface ReactElement<Props> {
  $$typeof: any;
  key: string | number | null;
  type:
    | string
    | ((props: Props) => ReactElement<any>)
    | (new (props: Props) => ReactComponent<any>)
    | ReactInternalType;
  props: Props;
  ref: Ref;

  // ReactFiber
  _owner: any;

  // __DEV__
  _store: { validated: boolean };
  _self: React$Element<any>;
  _shadowChildren: any;
  _source: Source;
}
```

```ts
ReactDOM.render(
  {
    type: Form,
    props: {
      isSubmitted: false,
      buttonText: 'OK!',
    },
  },
  document.getElementById('root')
);

// React: You told me this...
const FormElement = {
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!',
  },
};

// React: ...And Form told me this...
const ButtonElement = {
  type: Button,
  props: {
    children: 'OK!',
    color: 'blue',
  },
};

// React: ...and Button told me this! I guess I'm done.
const HTMLButtonElement = {
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!',
      },
    },
  },
};
```

### JSX

在 JSX 中, 小写标签被认为是 HTML 标签.
但是, 含有 `.` 的大写和小写标签名却不是.

- `<component />`: 转换为 `React.createElement('component')` (e.g HTML native tag).
- `<obj.component />`: 转换为 `React.createElement(obj.component)`.
- `<Component />`: 转换为 `React.createElement(Component)`.

#### JSX Transform

- [New JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

```ts
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

```ts
// Inserted by a compiler
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

ESLint config for new JSX transform:

```json
{
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

TypeScript config for new JSX transform:

```json
{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "module": "esnext",
    "target": "es2015",
    "jsx": "react-jsx",
    "strict": true
  }
}
```

### Functional and Class component

- 函数型组件没有实例, 类型组件具有实例, 但实例化的工作由 react 自动完成
- With React Hooks, functional component can get
  `state`, `lifecycle hooks` and performance optimization
  consistent to class component.

### Stateless and Stateful component

React Component
[definition](https://github.com/facebook/react/blob/main/packages/react/src/ReactBaseClasses.js):

- `React.Component`.
- `React.PureComponent`.

```ts
interface NewLifecycle<P, S, SS> {
  getSnapshotBeforeUpdate?(
    prevProps: Readonly<P>,
    prevState: Readonly<S>
  ): SS | null;

  componentDidUpdate?(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot?: SS
  ): void;
}

interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS> {
  componentDidMount?(): void;

  shouldComponentUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): boolean;

  componentWillUnmount?(): void;

  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
}

interface Component<P = {}, S = {}, SS = any>
  extends ComponentLifecycle<P, S, SS> {}

class Component<P, S> {
  readonly props: Readonly<P> & Readonly<{ children?: ReactNode | undefined }>;
  state: Readonly<S>;

  static contextType?: Context<any> | undefined;
  context: any;

  constructor(props: Readonly<P> | P);

  setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void
  ): void;

  forceUpdate(callback?: () => void): void;

  render(): ReactNode;
}

class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {}
```

#### Stateless component

采用函数型声明, 不使用 `setState()`, 一般作为表现型组件.

#### Stateful component

- 采用类型声明, 使用 setState(), 一般作为容器型组件(containers)
- 结合 Redux 中的 connect 方法, 将 store 中的 state 作为此类组件的 props

```tsx
class Component {
  render() {
    this.setState((prevState, props) => ({
      counter: prevState.counter + props.increment,
    }));

    return <div>Component</div>;
  }
}
```

### Component Lifecycle

- Reconciliation phase:
  - constructor.
  - getDerivedStateFromProps.
  - getDerivedStateFromError.
  - shouldComponentUpdate.
  - `ClassComponent` `render` function.
  - `setState` updater functions.
  - `FunctionComponent` body function.
  - `useState`/`useReducer`/`useMemo` updater functions.
  - `UNSAFE_componentWillMount`.
  - `UNSAFE_componentWillReceiveProps`.
  - `UNSAFE_componentWillUpdate`.
- Commit phase:
  - componentDidMount.
  - getSnapshotBeforeUpdate.
  - componentDidUpdate.
  - componentWillUnmount.
  - componentDidCatch.

因为协调阶段可能被中断、恢复，甚至重做,
React 协调阶段的生命周期钩子可能会被调用多次,
**协调阶段的生命周期钩子不要包含副作用**: e.g `fetch` promises, `async` functions.
通过 [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)
可以自动检测应用中隐藏的问题.

#### Creation and Mounting Phase

`constructor(props, context)`
-> `getDerivedStateFromProps()`
-> `render()`
-> `componentDidMount()`.

#### Updating Phase

Update for three reasons:

- Parent/top components (re-)rendering.
- `this.setState()` called.
- `this.forceUpdate()` called.

`getDerivedStateFromProps()`
-> `shouldComponentUpdate(nextProps, nextState)`
-> `render()`
-> `getSnapshotBeforeUpdate()`
-> `componentDidUpdate(prevProps, prevState)`.

getSnapshotBeforeUpdate:
在最新的渲染输出提交给 DOM 前将会立即调用,
这对于从 DOM 捕获信息（比如：滚动位置）很有用.

#### Unmounting Phase

componentWillUnmount()

### Render Function

- Default render behavior (without any `memo`/`useMemo`/`PureComponent`):
  when a parent component renders,
  React will recursively render **all child components** inside of it
  (because `props.children` is always a new reference when parent re-rendering).
- Render logic:
  - Can't mutate existing variables and objects.
  - Can't create random values like `Math.random()` or `Date.now()`.
  - Can't make network requests.
  - Can't queue state updates.

### React Element API

#### React Clone Element API

Modify children properties:

```tsx
const CreateTextWithProps = ({ text, ASCIIChar, ...props }) => {
  return (
    <span {...props}>
      {text}
      {ASCIIChar}
    </span>
  );
};

const RepeatCharacters = ({ times, children }) => {
  return React.cloneElement(children, {
    ASCIIChar: children.props.ASCIIChar.repeat(times),
  });
};

function App() {
  return (
    <div>
      <RepeatCharacters times={3}>
        <CreateTextWithProps text="Foo Text" ASCIIChar="." />
      </RepeatCharacters>
    </div>
  );
}
```

```tsx
const RadioGroup = props => {
  const RenderChildren = () =>
    React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        name: props.name,
      });
    });

  return <div>{<RenderChildren />}</div>;
};

const RadioButton = props => {
  return (
    <label>
      <input type="radio" value={props.value} name={props.name} />
      {props.children}
    </label>
  );
};

function App() {
  return (
    <RadioGroup name="numbers">
      <RadioButton value="first">First</RadioButton>
      <RadioButton value="second">Second</RadioButton>
      <RadioButton value="third">Third</RadioButton>
    </RadioGroup>
  );
}
```

#### React Children API

- `React.Children.toArray(children)`.
- `React.Children.forEach(children, fn)`.
- `React.Children.map(children, fn)`.
- `React.Children.count(children)`.
- `React.Children.only(children)`.

```tsx
import { Children, cloneElement } from 'react';

function Breadcrumbs({ children }) {
  const arrayChildren = Children.toArray(children);

  return (
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
      }}
    >
      {Children.map(arrayChildren, (child, index) => {
        const isLast = index === arrayChildren.length - 1;

        if (!isLast && !child.props.link) {
          throw new Error(
            `BreadcrumbItem child no. ${index + 1}
            should be passed a 'link' prop`
          );
        }

        return (
          <>
            {child.props.link ? (
              <a
                href={child.props.link}
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                <div style={{ marginRight: '5px' }}>
                  {cloneElement(child, {
                    isLast,
                  })}
                </div>
              </a>
            ) : (
              <div style={{ marginRight: '5px' }}>
                {cloneElement(child, {
                  isLast,
                })}
              </div>
            )}
            {!isLast && <div style={{ marginRight: '5px' }}></div>}
          </>
        );
      })}
    </ul>
  );
}

function BreadcrumbItem({ isLast, children }) {
  return (
    <li
      style={{
        color: isLast ? 'black' : 'blue',
      }}
    >
      {children}
    </li>
  );
}

export default function App() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem link="https://example.com/">Example</BreadcrumbItem>
      <BreadcrumbItem link="https://example.com/hotels/">Hotels</BreadcrumbItem>
      <BreadcrumbItem>A Fancy Hotel Name</BreadcrumbItem>
    </Breadcrumbs>
  );
}
```

### Refs

Refs 用于返回对元素的引用.
但在大多数情况下, 应该避免使用它们.
当需要直接访问 DOM 元素或组件的实例时, 它们可能非常有用:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.k

`Ref` 通过将 Fiber 树中的 `instance` 赋给 `ref.current` 实现

```ts
function commitAttachRef(finishedWork: Fiber) {
  // finishedWork 为含有 Ref effectTag 的 Fiber
  const ref = finishedWork.ref;

  // 含有 ref prop, 这里是作为数据结构
  if (ref !== null) {
    // 获取 ref 属性对应的 Component 实例
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        // 对于 HostComponent, 实例为对应 DOM 节点
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        // 其他类型实例为 fiber.stateNode
        instanceToUse = instance;
    }

    // 赋值 ref
    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      ref.current = instanceToUse;
    }
  }
}
```

```tsx
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>();

  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

#### String Refs

**不建议使用** [`String Refs`](https://github.com/facebook/react/pull/8333#issuecomment-271648615):

- React 无法获取 `this` 引用, 需要持续追踪当前`render`出的组件, 性能变慢.
- `String Refs` 不可组合化, `Callback Refs` 可组合化.

```tsx
class Foo extends Component {
  render() {
    return <input onClick={() => this.action()} ref="input" />;
  }

  action() {
    console.log(this.refs.input.value);
  }
}
```

```tsx
class App extends React.Component {
  renderRow = index => {
    // ref 会绑定到 DataTable 组件实例, 而不是 App 组件实例上
    return <input ref={`input-${index}`} />;

    // 如果使用 function 类型 ref, 则不会有这个问题
    // return <input ref={input => this['input-' + index] = input} />;
  };

  render() {
    return <DataTable data={this.props.data} renderRow={this.renderRow} />;
  }
}
```

#### Forward Refs

不能在函数式组件上使用`ref`属性,
因为它们没有实例, 但可以在函数式组件内部使用`ref`.
Ref forwarding 是一个特性,
它允许一些组件获取接收到 ref 对象并将它进一步传递给子组件.

```tsx
// functional component
const ButtonElement = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
));

// Create ref to the DOM button:
// get ref to `<button>`
const ref = React.createRef();
<ButtonElement ref={ref}>{'Forward Ref'}</ButtonElement>;
```

```tsx
type Ref = HTMLButtonElement;
interface Props {
  children: React.ReactNode;
  type: 'submit' | 'button';
}

const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

#### Callback Refs

```tsx
class UserInput extends Component {
  setSearchInput = input => {
    this.input = input;
  };

  render() {
    return (
      <>
        <input type="text" ref={this.setSearchInput} />
        <button type="submit">Submit</button>
      </>
    );
  }
}
```

### Compound Components

Compound components [example](https://dev.to/alexi_be3/react-component-patterns-49ho):

```tsx
import * as React from 'react';

interface Props {
  onStateChange?(e: string): void;
  defaultValue?: string;
}

interface State {
  currentValue: string;
  defaultValue?: string;
}

interface RadioInputProps {
  label: string;
  value: string;
  name: string;
  imgSrc: string;
  key: string | number;
  currentValue?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

const RadioImageForm = ({
  children,
  onStateChange,
  defaultValue,
}: React.PropsWithChildren<Props>): React.ReactElement => {
  const [state, setState] = React.useState<State>({
    currentValue: '',
    defaultValue,
  });

  // Memoized so that providerState isn't recreated on each render
  const providerState = React.useMemo(
    () => ({
      onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setState({
          currentValue: value,
        });
        onStateChange?.(value);
      },
      ...state,
    }),
    [state, onStateChange]
  );

  return (
    <div>
      <form>
        {React.Children.map(children, (child: React.ReactElement) =>
          React.cloneElement(child, {
            ...providerState,
          })
        )}
      </form>
    </div>
  );
};

const RadioInput = ({
  currentValue,
  onChange,
  label,
  value,
  name,
  imgSrc,
  key,
}: RadioInputProps): React.ReactElement => (
  <label className="radio-button-group" key={key}>
    <input
      type="radio"
      name={name}
      value={value}
      aria-label={label}
      onChange={onChange}
      checked={currentValue === value}
      aria-checked={currentValue === value}
    />
    <img alt="" src={imgSrc} />
  </label>
);

RadioImageForm.RadioInput = RadioInput;

export default RadioImageForm;
```

- Compound components manage their own internal state,
  which they share among several child components.
- When importing a compound component,
  automatically import child components available on compound component.

```tsx
import type { CSSProperties, ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  rest?: any;
}

const Header = ({ children, style, ...rest }: Props): JSX.Element => (
  <div style={{ ...style }} {...rest}>
    {children}
  </div>
);

const Body = ({ children, style, ...rest }: Props): JSX.Element => (
  <div style={{ ...style }} {...rest}>
    {children}
  </div>
);

const Footer = ({ children, style, ...rest }: Props): JSX.Element => (
  <div style={{ ...style }} {...rest}>
    {children}
  </div>
);

const getChildrenOnDisplayName = (children: ReactNode[], displayName: string) =>
  React.Children.map(children, child =>
    child.displayName === displayName ? child : null
  );

const Card = ({ children }: { children: ReactNode[] }): JSX.Element => {
  const header = getChildrenOnDisplayName(children, 'Header');
  const body = getChildrenOnDisplayName(children, 'Body');
  const footer = getChildrenOnDisplayName(children, 'Footer');

  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{body}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

Header.displayName = 'Header';
Body.displayName = 'Body';
Footer.displayName = 'Footer';
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

const App = () => (
  <div>
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Body>Body</Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  </div>
);

export default App;
```

## React Synthetic Events

- Events Delegation:
  - React 16: delegate events handlers on `document` DOM node.
  - React 17: delegate events handlers on `app` root DOM node.
- Events Dispatching: dispatch native events to `React.onXXX` handlers by `SyntheticEvent`.
  - 收集监听器: `const listeners = accumulateSinglePhaseListeners(targetFiber, eventName)`.
  - 派发合成事件: `dispatchQueue.push({ new SyntheticEvent(eventName), listeners })`.
  - 执行派发:
    `processDispatchQueue(dispatchQueue, eventSystemFlags)`
    -> `executeDispatch(event, listener, currentTarget)`.
  - Capture event: 从上至下调用 Fiber 树中绑定的回调函数.
  - Bubble event: 从下至上调用 Fiber 树中绑定的回调函数.

[![React Synthetic Events](./figures/ReactSyntheticEvents.png)](https://7kms.github.io/react-illustration-series/main/synthetic-event)

[react-dom/src/events/DOMPluginEventSystem](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/DOMPluginEventSystem.js):

```ts
function listenToAllSupportedEvents(rootContainerElement: EventTarget) {
  if (enableEagerRootListeners) {
    // 1. 节流优化, 保证全局注册只被调用一次.
    if (rootContainerElement[listeningMarker]) {
      return;
    }

    rootContainerElement[listeningMarker] = true;

    // 2. 遍历 allNativeEvents 监听冒泡和捕获阶段的事件.
    allNativeEvents.forEach(domEventName => {
      if (!nonDelegatedEvents.has(domEventName)) {
        listenToNativeEvent(
          domEventName,
          false, // 冒泡阶段监听.
          rootContainerElement,
          null
        );
      }

      listenToNativeEvent(
        domEventName,
        true, // 捕获阶段监听.
        rootContainerElement,
        null
      );
    });
  }
}

function listenToNativeEvent(
  domEventName: DOMEventName,
  isCapturePhaseListener: boolean,
  rootContainerElement: EventTarget,
  targetElement: Element | null,
  eventSystemFlags?: EventSystemFlags = 0
): void {
  const target = rootContainerElement;
  const listenerSet = getEventListenerSet(target);
  const listenerSetKey = getListenerSetKey(
    domEventName,
    isCapturePhaseListener
  );

  // 利用 Set 数据结构, 保证相同的事件类型只会被注册一次.
  if (!listenerSet.has(listenerSetKey)) {
    if (isCapturePhaseListener) {
      eventSystemFlags |= IS_CAPTURE_PHASE;
    }

    // 注册事件监听.
    addTrappedEventListener(
      target,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    );
    listenerSet.add(listenerSetKey);
  }
}

function addTrappedEventListener(
  targetContainer: EventTarget,
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags,
  isCapturePhaseListener: boolean,
  isDeferredListenerForLegacyFBSupport?: boolean
) {
  // 1. 构造 listener.
  const listener = createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags
  );

  // 2. 注册事件监听.
  let unsubscribeListener;

  if (isCapturePhaseListener) {
    unsubscribeListener = addEventCaptureListener(
      targetContainer,
      domEventName,
      listener
    );
  } else {
    unsubscribeListener = addEventBubbleListener(
      targetContainer,
      domEventName,
      listener
    );
  }
}

// 注册原生冒泡事件.
function addEventBubbleListener(
  target: EventTarget,
  eventType: string,
  listener: Function
): Function {
  target.addEventListener(eventType, listener, false);
  return listener;
}

// 注册原生捕获事件.
function addEventCaptureListener(
  target: EventTarget,
  eventType: string,
  listener: Function
): Function {
  target.addEventListener(eventType, listener, true);
  return listener;
}
```

[react-dom/src/events/ReactDOMEventListener](https://github.com/facebook/react/blob/main/packages/react-dom/src/events/ReactDOMEventListener.js):

```ts
// 派发原生事件至 React.onXXX.
function createEventListenerWrapperWithPriority(
  targetContainer: EventTarget,
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags
): Function {
  // 1. 根据优先级设置 listenerWrapper.
  const eventPriority = getEventPriorityForPluginSystem(domEventName);
  let listenerWrapper;

  switch (eventPriority) {
    case DiscreteEvent:
      listenerWrapper = dispatchDiscreteEvent;
      break;
    case UserBlockingEvent:
      listenerWrapper = dispatchUserBlockingUpdate;
      break;
    case ContinuousEvent:
    default:
      listenerWrapper = dispatchEvent;
      break;
  }

  // 2. 返回 listenerWrapper.
  return listenerWrapper.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer
  );
}

function dispatchDiscreteEvent(
  domEventName,
  eventSystemFlags,
  container,
  nativeEvent
) {
  const previousPriority = getCurrentUpdatePriority();
  const prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = null;

  try {
    setCurrentUpdatePriority(DiscreteEventPriority);
    dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig.transition = prevTransition;
  }
}

function dispatchContinuousEvent(
  domEventName,
  eventSystemFlags,
  container,
  nativeEvent
) {
  const previousPriority = getCurrentUpdatePriority();
  const prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = null;

  try {
    setCurrentUpdatePriority(ContinuousEventPriority);
    dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig.transition = prevTransition;
  }
}

function dispatchEvent(
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags,
  targetContainer: EventTarget,
  nativeEvent: AnyNativeEvent
) {
  let blockedOn = findInstanceBlockingEvent(
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  );

  if (blockedOn === null) {
    dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      return_targetInst,
      targetContainer
    );
    clearIfContinuousEvent(domEventName, nativeEvent);
    return;
  }

  if (
    queueIfContinuousEvent(
      blockedOn,
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    )
  ) {
    nativeEvent.stopPropagation();
    return;
  }

  // We need to clear only if we didn't queue because queueing is accumulative.
  clearIfContinuousEvent(domEventName, nativeEvent);

  if (
    eventSystemFlags & IS_CAPTURE_PHASE &&
    isDiscreteEventThatRequiresHydration(domEventName)
  ) {
    while (blockedOn !== null) {
      const fiber = getInstanceFromNode(blockedOn);

      if (fiber !== null) {
        attemptSynchronousHydration(fiber);
      }

      const nextBlockedOn = findInstanceBlockingEvent(
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      );

      if (nextBlockedOn === null) {
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        );
      }

      if (nextBlockedOn === blockedOn) {
        break;
      }

      blockedOn = nextBlockedOn;
    }

    if (blockedOn !== null) {
      nativeEvent.stopPropagation();
    }

    return;
  }

  dispatchEventForPluginEventSystem(
    domEventName,
    eventSystemFlags,
    nativeEvent,
    null,
    targetContainer
  );
}
```

## React Reusability Patterns

### HOC

Higher Order Components.

Solve:

- Reuse code with using ES6 classes.
- Compose multiple HOCs.

Pros:

- Reusable (abstract same logic).
- HOC is flexible with input data
  (pass input data as parameters or derive it from props).

Cons:

- Wrapper hell: `withA(withB(withC(withD(Comp))))`.
- Implicit dependencies: which HOC providing a certain prop.
- Name collision/overlap props: overwrite the same name prop silently.
- HOC is not flexible with output data (to WrappedComponent).

```tsx
// ToggleableMenu.jsx
function withToggleable(Clickable) {
  return class extends React.Component {
    constructor() {
      super();
      this.toggle = this.toggle.bind(this);
      this.state = { show: false };
    }

    toggle() {
      this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
      return (
        <div>
          <Clickable {...this.props} onClick={this.toggle} />
          {this.state.show && this.props.children}
        </div>
      );
    }
  };
}

class NormalMenu extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default withToggleable(NormalMenu);
```

```tsx
class Menu extends React.Component {
  render() {
    return (
      <div>
        <ToggleableMenu title="First Menu">
          <p>Some content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Second Menu">
          <p>Another content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Third Menu">
          <p>More content</p>
        </ToggleableMenu>
      </div>
    );
  }
}
```

### Render Props

Children/Props as render function:

Solve:

- Reuse code with using ES6 classes.
- Lowest level of indirection.
- No naming collision.

e.g `Context` or `ThemesProvider` is designed base on Render Props.

Pros:

- Separate presentation from logic.
- Extendable.
- Reusable (abstract same logic).
- Render Props is flexible with output data
  (children parameters definition free).

Cons:

- Wrapper hell (when many cross-cutting concerns are applied to a component).
- Minor memory issues when defining a closure for every render.
- Unable to optimize code with `React.memo`/`React.PureComponent`
  due to `render()` function always changes.
- Render Props is not flexible with input data
  (restricts children components from using the data at outside field).

```tsx
class Toggleable extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = { show: false };
  }

  toggle() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    return this.props.children(this.state.show, this.toggle);
  }
}

const ToggleableMenu = props => (
  <Toggleable>
    {(show, onClick) => (
      <div>
        <div onClick={onClick}>
          <h1>{props.title}</h1>
        </div>
        {show && props.children}
      </div>
    )}
  </Toggleable>
);
```

```tsx
class Menu extends React.Component {
  render() {
    return (
      <div>
        <ToggleableMenu title="First Menu">
          <p>Some content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Second Menu">
          <p>Another content</p>
        </ToggleableMenu>
        <ToggleableMenu title="Third Menu">
          <p>More content</p>
        </ToggleableMenu>
      </div>
    );
  }
}
```

### React Hooks Reuse Pattern

- No wrapper hell: every hook is just one line of code.
- No implicit dependencies: explicit one certain call for one certain hook.
- No name collision and overlap props due to flexible data usage.
- No need for `JSX`.
- Flexible data usage.
- Flexible optimization methods:
  - Avoid re-render with hook deps list.
  - `useMemo` hook for memorized values.
  - `useCallback` hook for memorized functions.
  - `useRef` hook for lifecycle persistent values.
- Recap related-logic into separate well-structured hooks.
- Reuse same stateful logic with custom hooks.

## React Hooks

- Reuse stateful logic between components
  (avoid wrapper hell in render props or HOC)
- Split one complex component into smaller functions
- Use more of React features **without classes**
- Class components will read `this.props` **too early** or **too late**,
  because of mutable `this` in React
  (however `props` argument of function components is immutable),
  that says function components capture the **rendered values**.
  more details on
  [Overreacted](https://overreacted.io/how-are-function-components-different-from-classes/).

### Hooks Types

Hooks
[definition](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js):

- 从 React 内部 (Reconciler) 看, Hooks 可分为三类:
  - State Hooks (`useState/useReducer/useContext/useRef/useCallback/useMemo`):
    主要作用于 `Reconciler.Render` 阶段, `fiber.pendingProps/memoizedProps/memoizedState/updateQueue`.
  - Effect Hooks (`useLayoutEffect`/`useEffect`):
    在 `Reconciler.Render` 阶段设置 `fiber.flags` (effects flags),
    主要作用于 `Reconciler.Commit` 阶段, 功能接近 `ClassComponent.LifeCycle`.
  - Hybrid Hooks (`useDeferredValue/useTransition/useId/useSyncExternalStore`):
    State + Effect Hooks, 既保存状态, 又产生副作用.

```ts
interface Hook {
  // hook 保存的数据.
  memoizedState: any;
  // 本次更新以 baseState 为基础计算新的 state.
  baseState: any;
  // 本次更新开始时已有的 update 队列.
  baseQueue: Update<any, any> | null;
  // 本次更新需要增加的 update 队列.
  queue: UpdateQueue<any, any> | null;
  // 指向下一个 hook.
  next: Hook | null;
}

interface Update<S, A> {
  lane: Lane;
  action: A;
  hasEagerState: boolean;
  eagerState: S | null;
  next: Update<S, A>;
}

interface UpdateQueue<S, A> {
  pending: Update<S, A> | null;
  interleaved: Update<S, A> | null;
  dispatch: ((A) => mixed) | null;
  lanes: Lanes;
  lastRenderedReducer: ((S, A) => S) | null;
  lastRenderedState: S | null;
}

interface Effect {
  tag: HookFlags;
  create: () => (() => void) | void;
  destroy: (() => void) | void;
  deps: Array<mixed> | null;
  next: Effect;
}

type HookType =
  | 'useState'
  | 'useReducer'
  | 'useContext'
  | 'useRef'
  | 'useEffect'
  | 'useInsertionEffect'
  | 'useLayoutEffect'
  | 'useCallback'
  | 'useMemo'
  | 'useImperativeHandle'
  | 'useDebugValue'
  | 'useDeferredValue'
  | 'useTransition'
  | 'useMutableSource'
  | 'useSyncExternalStore'
  | 'useId'
  | 'useCacheRefresh';
```

### Hooks Memoized State

- `FunctionComponent` 内部所有 Hooks memoized state
  组成 `FunctionComponent` `Fiber` memoized state.
- `FunctionComponent` `Fiber`: `fiber.memoizedState` 指向第一个 `Hook`.

| Hooks       | Memoized State                                 |
| ----------- | ---------------------------------------------- |
| useRef      | `ref: { current }`                             |
| useMemo     | `[nextValue, deps]`                            |
| useCallback | `[callback, deps]`                             |
| useState    | `state`                                        |
| useEffect   | `effect: { tag, create, destroy, deps, next }` |

### Hooks Workflow

- `Reconciler.Render`/`Reconciler.Update`:
  `performUnitOfWork` -> `beginWork` -> `updateFunctionComponent`
  -> `renderWithHooks` -> `mountXXX`/`updateXXX`/`rerenderXXX`
  -> `reconcileChildren`.
- `Reconciler.Commit`:
  - `Update` layout effect (`useLayoutEffect`):
    - `Mutation` phase: `commitWork` -> `commitHooKEffectListUnmount` -> `effect.destroy`.
    - `Layout` phase: `commitLifeCycles` -> `commitHookEffectListMount` -> `effect.create`.
  - `Update | Passive` passive effect (`useEffect`):
    - `Layout` phase: `commitLifeCycles` -> `schedulePassiveEffects`, 收集 Effects.
    - `scheduleCallback` -> `flushPassiveEffects` -> `effect.destroy` -> `effect.create`.
  - 只有 `effect.tag` 包含 `HasEffect` 时才会调用 `effect.destroy` 和 `effect.create`.
- `renderWithHooks`:
  - `HooksDispatcherOnMount`: `mountXXX`.
  - `HooksDispatcherOnUpdate`: `updateXXX`.
  - `HooksDispatcherOnRerender`: `updateXXX`/`rerenderXXX`.
- **`mountXXX`**: `mountWorkInProgressHook` -> respective mount logic.
- **`updateXXX`**: `updateWorkInProgressHook` -> respective update logic.

[ReactReconciler/ReactFiberBeginWork](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberBeginWork.new.js):

```ts
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const updateLanes = workInProgress.lanes;

  switch (workInProgress.tag) {
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
  }
}

function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps: any,
  renderLanes
) {
  const context = prepareToReadContext(workInProgress, renderLanes);

  // 进入 Hooks 相关逻辑, 最后返回下级 ReactElement 对象.
  const nextChildren = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    context,
    renderLanes
  );

  const hasId = checkDidRenderIdHook();

  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderLanes);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  if (getIsHydrating() && hasId) {
    pushMaterializedTreeId(workInProgress);
  }

  // React DevTools reads this flag.
  workInProgress.flags |= PerformedWork;

  // 进入 Reconcile 函数, 生成下级 Fiber 节点.
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  // 返回下级 Fiber 节点.
  return workInProgress.child;
}
```

[ReactReconciler/ReactFiberHooks](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js):

```ts
// 渲染优先级.
let renderLanes: Lanes = NoLanes;

// 当前正在构造的 Fiber, 等同于 workInProgress.
let currentlyRenderingFiber: Fiber = null;

// Hooks 链表被存储在 fiber.memoizedState:
// currentHook = fiber(current).memoizedState.
let currentHook: Hook | null = null;
// workInProgressHook = fiber(workInProgress).memoizedState.
let workInProgressHook: Hook | null = null;

// 在 FunctionComponent 的执行过程中, 是否再次发起了更新.
// 只有 FunctionComponent 被完全执行之后才会重置.
// 当 render 异常时, 通过该变量可以决定是否清除 render 过程中的更新.
let didScheduleRenderPhaseUpdate = false;

// 在本次 FunctionComponent 的执行过程中, 是否再次发起了更新.
// 每一次调用 FunctionComponent 都会被重置.
let didScheduleRenderPhaseUpdateDuringThisPass = false;

// 在本次 FunctionComponent 的执行过程中, 重新发起更新的最大次数.
const RE_RENDER_LIMIT = 25;

export function renderWithHooks<Props, SecondArg>(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: (p: Props, arg: SecondArg) => any,
  props: Props,
  secondArg: SecondArg,
  nextRenderLanes: Lanes
): any {
  // Store context.
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  // Mount or Update hooks dispatcher.
  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;

  // 执行 FunctionComponent 函数, 执行 `useXXX`.
  let children = Component(props, secondArg);

  // Check if there was a render phase update
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    // Keep rendering in a loop for as long as render phase updates continue.
    // Use a counter to prevent infinite loops.
    let numberOfReRenders = 0;

    do {
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      localIdCounter = 0;

      if (numberOfReRenders >= RE_RENDER_LIMIT) {
        throw new Error(
          'Too many re-renders. React limits the number of renders to prevent ' +
            'an infinite loop.'
        );
      }

      numberOfReRenders += 1;

      // Start over from the beginning of the list
      currentHook = null;
      workInProgressHook = null;
      workInProgress.updateQueue = null;
      // Rerender hooks dispatcher.
      ReactCurrentDispatcher.current = HooksDispatcherOnRerender;

      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }

  // Restore context.
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  renderLanes = NoLanes;
  currentlyRenderingFiber = null;
  currentHook = null;
  workInProgressHook = null;
  didScheduleRenderPhaseUpdate = false;

  return children;
}

const HooksDispatcherOnMount: Dispatcher = {
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useInsertionEffect: mountInsertionEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useSyncExternalStore: mountSyncExternalStore,
  useId: mountId,
  unstable_isNewReconciler: enableNewReconciler,
  readContext,
};

const HooksDispatcherOnUpdate: Dispatcher = {
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useMutableSource: updateMutableSource,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
  unstable_isNewReconciler: enableNewReconciler,
  readContext,
};

const HooksDispatcherOnRerender: Dispatcher = {
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: rerenderState,
  useDebugValue: updateDebugValue,
  useDeferredValue: rerenderDeferredValue,
  useTransition: rerenderTransition,
  useMutableSource: updateMutableSource,
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
  unstable_isNewReconciler: enableNewReconciler,
  readContext,
};

// 创建 Hook, 挂载到 Hooks 链表.
function mountWorkInProgressHook(): Hook {
  // hook 实例
  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: hookForB,
  };

  if (workInProgressHook === null) {
    // Fist hook in the list.
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of list.
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook;
}

// 移动 Hooks 链表指针, 获取 workInProgressHook.
function updateWorkInProgressHook(): Hook {
  let nextCurrentHook: Hook | null;
  let nextWorkInProgressHook: Hook | null;

  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    nextCurrentHook = current ? current.memoizedState : null;
  } else {
    nextCurrentHook = currentHook.next;
  }

  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;
    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.
    if (nextCurrentHook === null) {
      throw new Error('Rendered more hooks than during the previous render.');
    }

    currentHook = nextCurrentHook;

    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }

  return workInProgressHook;
}

function commitHookEffectListMount(tag: number, finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null =
    finishedWork.updateQueue;
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;

    do {
      if ((effect.tag & tag) === tag) {
        const create = effect.create;
        effect.destroy = create();
      }

      effect = effect.next;
    } while (effect !== firstEffect);
  }
}

function commitHookEffectListUnmount(tag: number, finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null =
    finishedWork.updateQueue;
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;

    do {
      if ((effect.tag & tag) === tag) {
        // 根据传入的 tag 过滤 Effects 链表.
        const destroy = effect.destroy;
        effect.destroy = undefined;

        if (destroy !== undefined) {
          destroy();
        }
      }

      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

### Minimal Hooks Implementation

```ts
const MyReact = (function () {
  const hooks = [];
  let currentHook = 0; // array of hooks, and an iterator!
  return {
    render(Component) {
      const Comp = Component(); // run effects
      Comp.render();
      currentHook = 0; // reset for next render
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: array | undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // done with this hook
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // for setState's closure!
      const setState = newState => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
})();
```

```ts
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState('foo'); // 2nd state hook!
  MyReact.useEffect(() => {
    console.log('effect', count, text);
  }, [count, text]);
  return {
    click: () => setCount(count + 1),
    type: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render', { count, text }),
  };
}

let App;

App = MyReact.render(Counter);
// effect 0 foo
// render {count: 0, text: 'foo'}

App.click();
App = MyReact.render(Counter);
// effect 1 foo
// render {count: 1, text: 'foo'}

App.type('bar');
App = MyReact.render(Counter);
// effect 1 bar
// render {count: 1, text: 'bar'}

App.noop();
App = MyReact.render(Counter);
// // no effect run
// render {count: 1, text: 'bar'}

App.click();
App = MyReact.render(Counter);
// effect 2 bar
// render {count: 2, text: 'bar'}
```

```ts
function Component() {
  const [text, setText] = useSplitURL('www.netlify.com');
  return {
    type: txt => setText(txt),
    render: () => console.log({ text }),
  };
}

function useSplitURL(str) {
  const [text, setText] = MyReact.useState(str);
  const masked = text.split('.');
  return [masked, setText];
}

let App;

App = MyReact.render(Component);
// { text: [ 'www', 'netlify', 'com' ] }

App.type('www.reactjs.org');
App = MyReact.render(Component);
// { text: [ 'www', 'reactjs', 'org' ] }}
```

### UseState Hook

- Read rendered props/state.
- Return value of `useState` is `ref` to `hooks[idx]`:
  direct change to return value doesn't change state value.
- Return function of `useState` (`setState`) is to change value of `hooks[idx]`.
- 由于 setState 更新状态 (dispatch action) 时基于 hook.BaseState,
  `setState(value + 1)` 与 `setState(value => value + 1)` 存在差异.
- 当在 useEffect 中调用 setState 时, 最好使用 `setState(callback)` 形式,
  这样可以不用再 Deps List 中显式声明 state, 也可以避免一些 BUG.
- `dispatchAction`:
  - 创建 `Update` 对象.
  - 将 Update 对象添加到 hook.queue.pending 队列.
  - 根据 reducerEagerState 与 currentState, 决定是否发起新的 Reconciler 调度.

#### UseState Hooks Dispatcher

```ts
function mountState<T>(initialState: T) {
  const hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  // Setup Hook.
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  });
  const dispatch = (queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));

  // Return Hook state and dispatch action.
  return [hook.memoizedState, dispatch];
}

function updateState<T>(initialState: T) {
  const basicStateReducer = (state, action) => {
    return typeof action === 'function' ? action(state) : action;
  };

  return updateReducer(basicStateReducer);
}

function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A
) {
  // 1. 创建 Update 对象.
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(fiber);
  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  };

  // 2. 将 Update 对象添加到 hook.queue.pending 队列.
  const pending = queue.pending;
  if (pending === null) {
    // 首个 Update, 创建一个环形链表.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // 渲染时更新, 做好全局标记.
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate =
      true;
  } else {
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      const lastRenderedReducer = queue.lastRenderedReducer;

      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        const currentState: S = queue.lastRenderedState;
        const eagerState = lastRenderedReducer(currentState, action);
        update.eagerReducer = lastRenderedReducer;
        update.eagerState = eagerState;

        // 若在 Render 阶段, reducerEagerState === currentState,
        // 则可以无需再次计算状态, 跳过调度阶段, 后续直接使用 update.eagerState.
        if (is(eagerState, currentState)) {
          return;
        }
      }
    }

    // 3. 发起调度更新, 进入 Reconciler.
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
}
```

#### UseState Hooks Usage

```ts
setState(prevState => {
  // Object.assign would also work
  return { ...prevState, ...updatedValues };
});
```

```ts
let newState = baseState;
const firstUpdate = hook.baseQueue.next;
let update = firstUpdate;

// setState(value + 1) 与 setState(value => value + 1) 存在差异
// 遍历 baseQueue 中的每一个 update
do {
  if (typeof update.action === 'function') {
    newState = update.action(newState);
  } else {
    newState = action;
  }

  update = reconciler();
} while (update !== firstUpdate);
```

```tsx
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

```ts
import { useEffect, useState } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }

  return isOnline ? 'Online' : 'Offline';
}

// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange); // Run first effect

// Update with { friend: { id: 200 } } props
// Clean up previous effect
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange);
ChatAPI.subscribeToFriendStatus(200, handleStatusChange); // Run next effect

// Update with { friend: { id: 300 } } props
// Clean up previous effect
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange);
ChatAPI.subscribeToFriendStatus(300, handleStatusChange); // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```

### UseReducer Hook

- Use useState whenever manage a JS **primitive** (e.g. string, boolean, integer).
- Use useReducer whenever manage an **object** or **array**.
- It’s best to put states together in one state object
  when they conditionally dependent on each other (useReducer).
- Using useReducer over useState gives us predictable state transitions.
  It comes in very powerful when state changes become more complex.

#### UseReducer Hooks Dispatcher

```ts
function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: (I) => S
): [S, Dispatch<A>] {
  // 1. Create Hook.
  const hook = mountWorkInProgressHook();
  let initialState;

  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }

  // 2. Setup Hook.
  // 2.1 Set hook.memoizedState/hook.baseState.
  hook.memoizedState = hook.baseState = initialState;
  // 2.2 Set hook.queue.
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState,
  });
  // 2.3 Set hook.dispatch.
  const dispatch: Dispatch<A> = (queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));

  // 3. Return Hook state and dispatch action.
  return [hook.memoizedState, dispatch];
}

function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: (I) => S
): [S, Dispatch<A>] {
  // Get workInProgressHook.
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  queue.lastRenderedReducer = reducer;
  const current: Hook = currentHook;

  // The last rebase update that is NOT part of the base state.
  let baseQueue = current.baseQueue;
  // The last pending update that hasn't been processed yet.
  const pendingQueue = queue.pending;

  // Append hook.queue.pending to current.baseQueue.
  if (pendingQueue !== null) {
    // We have new updates that haven't been processed yet.
    // We'll add them to the base queue.
    if (baseQueue !== null) {
      // Merge the pending queue and the base queue.
      const baseFirst = baseQueue.next;
      const pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }

    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }

  // Calculate Hook state.
  if (baseQueue !== null) {
    // We have a queue to process.
    const first = baseQueue.next;
    let newState = current.baseState;

    let newBaseState = null;
    let newBaseQueueFirst = null;
    let newBaseQueueLast = null;
    let update = first;

    do {
      const updateLane = update.lane;

      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        // 优先级不够: 加入到 baseQueue, 等待下一次 render.
        const clone: Update<S, A> = {
          lane: updateLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null,
        };

        if (newBaseQueueLast === null) {
          newBaseQueueFirst = newBaseQueueLast = clone;
          newBaseState = newState;
        } else {
          newBaseQueueLast = newBaseQueueLast.next = clone;
        }

        // Update the remaining priority in the queue.
        currentlyRenderingFiber.lanes = mergeLanes(
          currentlyRenderingFiber.lanes,
          updateLane
        );
        markSkippedUpdateLanes(updateLane);
      } else {
        // This update does have sufficient priority (优先级足够).
        // Merge state.
        if (newBaseQueueLast !== null) {
          // Update baseQueue
          const clone: Update<S, A> = {
            lane: NoLane,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null,
          };
          newBaseQueueLast = newBaseQueueLast.next = clone;
        }

        // Process this update.
        if (update.hasEagerState) {
          // 性能优化:
          // If this update is a state update (not a reducer) and was processed eagerly,
          // we can use the eagerly computed state
          newState = update.eagerState;
        } else {
          // 调用 Reducer 获取最新状态.
          const action = update.action;
          newState = reducer(newState, action);
        }
      }

      update = update.next;
    } while (update !== null && update !== first);

    if (newBaseQueueLast === null) {
      newBaseState = newState;
    } else {
      newBaseQueueLast.next = newBaseQueueFirst;
    }

    // Mark that the fiber performed work,
    // but only if the new state is different from the current state.
    if (!is(newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }

    // 把计算后结果更新到 workInProgressHook.
    hook.memoizedState = newState;
    hook.baseState = newBaseState;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = newState;
  }

  // Return Hook state and dispatch action.
  const dispatch: Dispatch<A> = queue.dispatch;
  return [hook.memoizedState, dispatch];
}
```

#### UseReducer Hooks Usage

Use useState if:

- manage JavaScript primitives as state
- have simple state transitions
- want to have business logic within components
- have different properties that don’t change in any correlated manner
  and can be managed by multiple useState hooks
- state is co-located to your component
- for a small application

Use useReducer if:

- manage JavaScript objects or arrays as state
- have complex state transitions
- want to move business logic into reducers
- have different properties that are tied together
  and should be managed in one state object
- update state deep down in your component tree
- for a medium size application
- for easier testing
- for more predictable and maintainable state architecture

```ts
function App() {
  const [state, dispatch] = useState({ count: 0 });

  // 等价于
  const [state, dispatch] = useReducer(
    function basicStateReducer(state, action) {
      return typeof action === 'function' ? action(state) : action;
    },
    { count: 0 }
  );

  // 当需要更新 state 时, 有 2 种方式:
  // 1. 直接设置:
  dispatch({ count: 1 });
  // 2.通过回调函数设置:
  dispatch(state => ({ count: state.count + 1 }));
}
```

```tsx
const insertToHistory = state => {
  if (state && Array.isArray(state.history)) {
    // Do not mutate
    const newHistory = [...state.history];
    newHistory.push(state);
    return newHistory;
  }
  console.warn(`
    WARNING! The state was attempting capture but something went wrong.
    Please check if the state is controlled correctly.
  `);
  return state.history || [];
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-theme':
      return { ...state, theme: action.theme, history: insertToHistory(state) };
    case 'add-friend':
      return {
        ...state,
        friends: [...state.friends, action.friend],
        history: insertToHistory(state),
      };
    case 'undo': {
      const isEmpty = !state.history.length;
      if (isEmpty) return state;
      return { ...state.history[state.history.length - 1] };
    }
    case 'reset':
      return { ...initialState, history: insertToHistory(state) };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <div>App</div>;
};
```

### UseMemo Hook

- Returns a memoized value.
- Only recompute the memoized value when one of the dependencies has changed.
- **Shallow compare** diff.
- **Optimization** helps to
  avoid expensive calculations on every render
  (avoid re-render problem):
  - **Good use** for complex objects or expensive calculations.
  - **Donn't use** for primitive values or simple calculations.

#### UseMemo Hooks Dispatcher

```ts
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null
): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

#### UseMemo Hooks Usage

```tsx
const Button = ({ color, children }) => {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ Don’t recalculate until `color` changes
  );

  return (
    <button className={`Button-${color} Button-text-${textColor}`}>
      {children}
    </button>
  );
};
```

### UseCallback Hook

- Returns a memoized callback.
- 对事件句柄进行缓存, `useState` 的第二个返回值是 `dispatch`,
  但是每次都是返回新的函数, 使用 `useCallback`, 可以让它使用上次的函数.
  在虚拟 DOM 更新过程中, 如果事件句柄相同, 那么就不用每次都进行
  `removeEventListener` 与 `addEventListener`.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

#### UseCallback Hooks Dispatcher

```ts
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

#### UseCallback Hooks Usage

```tsx
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
    // ... Fetch data and return it ...
  }, [query]); // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />;
}

function Child({ fetchData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

### UseRef Hook

#### UseRef Hooks Dispatcher

```ts
function mountRef<T>(initialValue: T) {
  const hook = mountWorkInProgressHook();
  const ref = {
    current: initialValue,
  };
  Object.seal(ref);
  hook.memoizedState = ref;
  return ref;
}

function updateRef<T>(initialValue: T) {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
```

#### Refs Basis

- `ref` can bind to HTMLElement.
- `ref` can either be a state that does not need to change too often.
- `ref` can either be a state that should change as frequently as possible
  but should not trigger full re-rendering of the component.

#### Refs Values

- Mutable Value:
  `useRef()` is useful for for keeping any mutable value around.
  Updating reference values inside handlers/useEffect callbacks is good,
  updating reference values during rendering (outside callbacks) is bad.
- Lifecycle Persisted Value:
  `useRef()` creates a plain JavaScript object,
  is persisted (stays the same) between component re-renderings.
- Silent Value:
  update reference values don't trigger re-renderings.
- Latest Value:
  `useRef()` read rendered props/state from **the future**.
  It's good to get **latest** value of a particular prop or state
  (the updated reference value is available right away).

```tsx
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return <div>Example</div>;
}
```

#### Refs Update Mechanism

- Update a `ref`, no re-renderings happens.
- Update a `state`, the deep rendering mechanism works to re-render components.
- Store values in refs and have them updated,
  which is more **efficient** than `useState` (which can be expensive)
  when the values are to be updated multiple times within a second.

```tsx
function UserAvatar(props) {
  return <img src={props.src} alt="User Avatar" />;
}

function Username(props) {
  return <span>{props.name}</span>;
}

function User() {
  const user = useRef({
    name: 'UserName',
    avatarURL: 'https://avatar.com/avatar',
  });

  useEffect(() => {
    setTimeout(() => {
      user.current = {
        name: 'NewUserName',
        avatarURL: 'https://avatar.com/newavatar',
      };
    }, 5000);
  });

  // Only output once
  console.log('Rendered.');

  // Both children won't be re-rendered
  // due to shallow rendering mechanism
  return (
    <div>
      <Username name={user.name} />
      <UserAvatar src={user.avatarURL} />
    </div>
  );
}
```

### UseContext Hook

- Create custom `XXXContextProvider`:
  一般都不会裸露地使用 Context.Provider, 而是封装为独立的 Provider 组件,
  将子组件作为 props.children 传入, 这样当 Context 变化时 Provider 不会重新渲染它的子组件,
  由依赖了 context 的子组件自己进行重渲染, 未依赖的子组件不会重新渲染.
  **使用 `useMemo` 使得 value 不会导致不必要的重复渲染 (Re-rendering)**.
- Create custom `useXXXContext` hook:
  - Check whether component under `XXXContextProvider`.
  - Wrap complex context logic and only expose simple API (Facade design pattern).
  - Use `useMemo`/`useCallback` to **memorize values and functions**.
- Context 中只定义被大多数组件所共用的属性,
  use context to avoid **Prop Drilling**.

#### UseContext Hooks Dispatcher

- `HooksDispatcherOnMount.useContext = readContext`.
- `HooksDispatcherOnUpdate.useContext = readContext`.
- `HooksDispatcherOnRerender.useContext = readContext`.

```ts
export function createContext<T>(
  defaultValue: T,
  calculateChangedBits: ?((a: T, b: T) => number)
): ReactContext<T> {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  }

  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };
  context.Consumer = context;
  return context;
}

function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const updateLanes = workInProgress.lanes;
  workInProgress.lanes = NoLanes;

  switch (workInProgress.tag) {
    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderLanes);
    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderLanes);
  }
}

function updateContextProvider(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  const providerType: ReactProviderType<any> = workInProgress.type;
  const context: ReactContext<any> = providerType._context;

  const newProps = workInProgress.pendingProps;
  const oldProps = workInProgress.memoizedProps;
  const newValue = newProps.value; // <Provider value={}>{children}</Provider>

  // 更新 ContextProvider._currentValue:
  // workInProgress.type._context._currentValue = newValue;
  pushProvider(workInProgress, newValue);

  if (oldProps !== null) {
    // 更新阶段.
    // 对比 newValue 和 oldValue
    const oldValue = oldProps.value;
    const changedBits = calculateChangedBits(context, newValue, oldValue);

    if (changedBits === 0) {
      // value 没有变动, 进入 Bailout 逻辑.
      if (
        oldProps.children === newProps.children &&
        !hasLegacyContextChanged()
      ) {
        return bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderLanes
        );
      }
    } else {
      // value变动, 查找对应的 Consumers, 并使其能够被更新.
      // 向下遍历:
      // 从 ContextProvider 节点开始,
      // 向下查找所有 fiber.dependencies 依赖该 context 的节点.
      // 向上遍历:
      // 从 ContextConsumer 节点开始,
      // 向上遍历, 修改父路径上所有节点的 fiber.childLanes 属性, 表明其子节点有改动, 子节点会进入更新逻辑.
      propagateContextChange(workInProgress, context, changedBits, renderLanes);
    }
  }

  // 生成下级 Fiber.
  const newChildren = newProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}

function updateContextConsumer(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  const context: ReactContext<any> = workInProgress.type;
  const newProps = workInProgress.pendingProps;
  const render = newProps.children;

  // 读取 context.
  prepareToReadContext(workInProgress, renderLanes);
  const newValue = readContext(context, newProps.unstable_observedBits);

  // 生成下级 Fiber.
  const newChildren = render(newValue);
  reconcileChildren(current, workInProgress, newChildren, renderLanes);
  return workInProgress.child;
}

function prepareToReadContext(workInProgress: Fiber, renderLanes: Lanes): void {
  // Setup.
  currentlyRenderingFiber = workInProgress;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;
  const dependencies = workInProgress.dependencies;

  if (dependencies !== null) {
    const firstContext = dependencies.firstContext;

    if (firstContext !== null) {
      if (includesSomeLane(dependencies.lanes, renderLanes)) {
        // Context list has a pending update.
        // Mark that this fiber performed work.
        markWorkInProgressReceivedUpdate();
      }

      // Reset the work-in-progress list
      dependencies.firstContext = null;
    }
  }
}

function readContext<T>(
  context: ReactContext<T>,
  observedBits: void | number | boolean
): T {
  const contextItem = {
    context: context as ReactContext<mixed>,
    observedBits: resolvedObservedBits,
    next: null,
  };

  // 1. 构造一个 contextItem, 加入到 workInProgress.dependencies 链表.
  if (lastContextDependency === null) {
    lastContextDependency = contextItem;
    currentlyRenderingFiber.dependencies = {
      lanes: NoLanes,
      firstContext: contextItem,
      responders: null,
    };
  } else {
    lastContextDependency = lastContextDependency.next = contextItem;
  }

  // 2. 返回 currentValue.
  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}
```

#### UseContext Hooks Usage

```tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const CountContext = createContext();

function CountProvider(props) {
  const [count, setCount] = useState(0);

  // Use `useMemo`/`useCallback` to memorize values and functions.
  const value = useMemo(() => {
    return {
      count,
      setCount,
    };
  }, [count, setCount]);

  return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
  const context = useContext(CountContext);

  // Check whether component under `XXXContextProvider`.
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }

  // Wrap complex context logic, only expose simple API.
  const { count, setCount } = context;
  const increment = useCallback(() => setCount(c => c + 1), [setCount]);

  return {
    count,
    increment,
  };
}

export { CountProvider, useCount };
```

### UseEffect Hook

#### UseEffect Hooks Dispatcher

```ts
function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    UpdateEffect | PassiveEffect,
    HookPassive,
    create,
    deps
  );
}

function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags; // UpdateEffect | PassiveEffect.
  hook.memoizedState = pushEffect(
    HasEffect | hookFlags, // PassiveHook.
    create,
    undefined,
    nextDeps
  );
}

function updateEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps);
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;

    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 如果依赖不变, 新建 Effect (tag 不含 HookHasEffect).
        // Reconciler.Commit 阶段会跳过此 Effect.
        pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }

  // 如果依赖改变, 更改 fiber.flags, 新建 Effect.
  // Reconciler.Commit 阶段会再次执行此 Effect.
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  );
}

function pushEffect(tag, create, destroy, deps) {
  const effect = {
    tag,
    create, // User code: effect callback.
    destroy, // User code: destroy callback.
    deps, // User code: deps list.
    next: null,
  };

  let componentUpdateQueue = currentlyRenderingFiber.updateQueue;

  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;

    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      // Circular effect list.
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }

  return effect;
}
```

#### UseEffect Lifecycle

1. React renders UI for current props/state to screen.
2. React cleans up the effect for prev props/state.
3. React runs the effect for current props/state
   (`useEffect` got invoked after `componentDidMount`).

#### UseEffect Nasty Loop

The effect hook runs when the component `mounts`
but also when the component `updates`.
Because we are setting the state after every data fetch,
the component updates and the effect runs again.
It fetches the data again and again.
That’s a bug and needs to be avoided.

#### UseEffect Deps List

无论是将组件编写为类还是函数, 都必须为 effect 响应所有 props 和 state 的更新.
在传统的 Class Component, 需要编写代码去检测这些 props 和 state 是否变更
(shouldComponentUpdate, componentDidUpdate).
在 Function Component, 借助 useEffect Hook 可以实现自动检测.

That’s why provide an **empty array** as second argument to the effect hook
to avoid activating it on component updates
but **only for the mounting** of the component.
If one of the variables changes, the hook runs again.
For listeners binding, use `[]` deps list should be better.

Functions in useEffect:

- If only use some functions inside an effect, move them directly into that effect.
- Hoisting functions that don’t need props or state outside of component,
  and pull the ones that are used only by an effect inside of that effect.
- For useCallback function, it should be in deps list `useEffect(() => {}, [callback])`

```ts
// https://www.robinwieruch.de/react-hooks-fetch-data
import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return { data, isLoading, isError, doFetch };
};
```

#### UseEffect Closure

- useEffect Hook 会丢弃上一次渲染结果,
  它会清除上一次 effect,
  再建立下一个 effect
  (也会创建新的 Closure),
  下一个 effect 锁住新的 props 和 state
  (整个 Counter 函数在 re-render 时会被重复调用一次).
- setInterval 不会丢弃上一次结果,
  会引用旧状态 Closure 中的变量,
  导致其与 useEffect 所预期行为不一致.
- 可以通过 useRef 解决这一现象.

```tsx
// BUG
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // always 1 regardless `count` value change
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>{count}</h1>;
}
```

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

#### UseEffect State

- 如 `UseEffect Closure` 所述, 每次调用 useEffect 时,
  会捕获那一次 render 时的 props 和 state.
- Class Component 中的 this.state.xxx 却总是指向最新的 state.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
// Output:
// Mounted: You clicked 0 times
// Clicked 5 times in 3s
// You clicked 1 times
// You clicked 2 times
// You clicked 3 times
// You clicked 4 times
// You clicked 5 times
```

```tsx
class Counter {
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }

  render() {
    const { count } = this.props;

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => this.setState(count + 1)}>Click me</button>
      </div>
    );
  }
}
// Output:
// Mounted: You clicked 0 times
// Clicked 5 times in 3s
// You clicked 5 times
// You clicked 5 times
// You clicked 5 times
// You clicked 5 times
// You clicked 5 times
```

#### UseEffect Cleanup

- Avoid memory leaks.
- Prevent unexpected errors.
- Good user experience.

Cleanup API requests:

```ts
const App = () => {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      const response = await fetch('some api here', { signal });
      // do something with response
    };

    fetchData();

    return () => controller.abort();
  }, []);
};
```

Cleanup connections:

```ts
const App = () => {
  useEffect(() => {
    const socket = new WebSocket('url', protocols);
    // do what you want with the socket

    return () => socket.close();
  }, []);
};
```

Cleanup timeouts:

```ts
const App = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // do something in the timeout
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
};
```

:::caution React 18 Development Strict Mode

With `Strict Mode` in React 18,
React will simulate unmounting and remounting component in development mode:

- React mounts component:
  - Layout effects are created.
  - Effect effects are created.
- React simulates unmounting component:
  - Layout effects are destroyed.
  - Effects are destroyed.
- React simulates mounting component with previous state:
  - Layout effect setup code runs.
  - Effect setup code runs.

:::

#### UseEffect Reference

- `useEffect` complete [guide](https://overreacted.io/a-complete-guide-to-useeffect).

### UseLayoutEffect Hook

- `useLayoutEffect` callback called **synchronously**
  (fires synchronously after all DOM mutations),
  substitute for `componentDidMount` lifecycle function:
  `Update` effect flags, `HasEffect | Layout` hook flags.
- `useEffect` got invoked after `componentDidMount` **asynchronously**:
  `Update | Passive` effect flags, `HasEffect | Passive` hook flags.
- If need to mutate the DOM or do need to perform DOM measurements,
  `useLayoutEffect` is better than `useEffect`.

```ts
function mountLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    UpdateEffect, // Fiber Flags
    HookLayout, // Hook Flags
    create,
    deps
  );
}

function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return mountEffectImpl(
    UpdateEffect | PassiveEffect, // Fiber Flags
    HookPassive, // Hook Flags
    create,
    deps
  );
}

function updateLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(UpdateEffect, HookLayout, create, deps);
}

function updateEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null
): void {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps);
}
```

### UseInsertionEffect Hook

Allows CSS-in-JS libraries to address performance
issues of injecting styles in render.
This hook will run after the DOM is mutated,
but before layout effects read the new layout.

```tsx
function useCSS(rule) {
  if (!canUseDOM) {
    collectedRulesSet.add(rule);
  }

  useInsertionEffect(() => {
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });

  return rule;
}

function Component() {
  const className = useCSS(rule);
  return <div className={className} />;
}
```

### UseDebugValue Hook

```ts
function App() {
  const date = new Date();
  useDebugValue(date, date => date.toISOString());
}
```

### UseImperativeHandle Hook

```tsx
interface MyInputHandles {
  focus(): void;
}

const MyInput: RefForwardingComponent<MyInputHandles, MyInputProps> = (
  props,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return <input {...props} ref={inputRef} />;
};

export default React.forwardRef(MyInput);
```

### UseDeferredValue Hook

Debounce:

```tsx
import { useDeferredValue } from 'react';

function App() {
  const [text, setText] = useState('hello');

  // Debounced value.
  const deferredText = useDeferredValue(text, { timeoutMs: 2000 });

  return (
    <div>
      <input value={text} onChange={handleChange} />
      <List text={deferredText} />
    </div>
  );
}
```

### UseTransition Hook

`startTransition` 回调中的更新都会被认为是**非紧急处理**,
如果出现更紧急的更新 (User Input), 则上面的更新都会被中断,
直到没有其他紧急操作之后才会去继续执行更新.

Opt-in concurrent features (implementing debounce-like function):

```tsx
import { useRef, useState, useTransition } from 'react';
import Spinner from './Spinner';

function App() {
  const input = useRef('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // Urgent: show what was typed.
  setSearchInputValue(input);

  // Debounced callback.
  startTransition(() => {
    setSearchQuery(input);
  });

  return <div>{isPending && <Spinner />}</div>;
}
```

### UseId Hook

Generating unique IDs on client and server.

```tsx
function Checkbox() {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input type="checkbox" name="react" id={id} />
    </>
  );
}
```

### UseSyncExternalStore Hook

`Props`/`Context`/`useState`/`useReducer` are internal states
not affected by concurrent features.

External stores affected by concurrent features including:

- Global variables:
  - `document.body`.
- Date.
- Redux store.
- Zustand store.

`useSyncExternalStore` allows external stores to support concurrent reads
by forcing updates to the store to be synchronous.

```ts
type UseSyncExternalStore = (
  subscribe: (callback: Callback) => Unsubscribe,
  getSnapshot: () => State
) => State;
```

Simple demo from [React Conf 2021](https://www.youtube.com/watch?v=oPfSC5bQPR8):

```tsx
import { useSyncExternalStore } from 'react';

// We will also publish a backwards compatible shim
// It will prefer the native API, when available
import { useSyncExternalStore } from 'use-sync-external-store/shim';

const store = {
  state: { count: 0 },
  listeners: new Set(),
  setState: fn => {
    store.state = fn(store.state);
    store.listeners.forEach(listener => listener());
  },
  subscribe: callback => {
    store.listeners.add(callback);
    return () => store.listeners.delete(callback);
  },
  getSnapshot: () => {
    const snap = Object.freeze(store.state);
    return snap;
  },
};

function App() {
  // Basic usage. getSnapshot must return a cached/memoized result
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  // Selecting a specific field using an inline getSnapshot
  const selectedField = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot().count
  );

  return (
    <div>
      {state.count}
      {selectedField}
    </div>
  );
}
```

Migrate from `useState` + `useEffect` + `useRef` to `useSyncExternalStore`
for 3rd external stores libraries (e.g `Redux`):

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

const createStore = initialState => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;
  const setState = fn => {
    state = fn(state);
    listeners.forEach(listener => listener());
  };
  const subscribe = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

// Explicitly process external store for React v17.
// Sync external store state to React internal state
// with `useState` and `store.subscribe`:
// store.setState -> updater -> setState.
const useStoreLegacy = (store, selector) => {
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const updater = () => setState(selector(store.getState()));
    const unsubscribe = store.subscribe(updater);
    updater();
    return unsubscribe;
  }, [store, selector]);

  return state;
};

// Use `useSyncExternalStore` for React v18+.
const useStore = (store, selector) => {
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector])
  );
};

const store = createStore({ count: 0, text: 'hello' });

const Counter = () => {
  const count = useStore(
    store,
    useCallback(state => state.count, [])
  );

  const handleClick = () =>
    store.setState(state => ({ ...state, count: state.count + 1 }));

  return (
    <div>
      {count}
      <button onClick={handleClick}>+1</button>
    </div>
  );
};

const TextBox = () => {
  const text = useStore(
    store,
    useCallback(state => state.text, [])
  );

  const handleChange = event => {
    store.setState(state => ({ ...state, text: event.target.value }));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );
};

const App = () => (
  <div>
    <Counter />
    <Counter />
    <TextBox />
    <TextBox />
  </div>
);

React.createRoot(document.querySelector('#root')).render(<App />);
```

### Custom Hooks

- [ReactUse Hooks](https://github.com/streamich/react-use)
- [LibReact](https://github.com/streamich/libreact)
- [Alibaba Hooks](https://github.com/alibaba/hooks)
- [Platform Hooks: Browser APIs turned into Hooks](https://github.com/jaredpalmer/the-platform)
- [TypeScript Hooks](https://github.com/juliencrn/useHooks.ts)
- [Optimistic state hook](https://github.com/perceived-dev/optimistic-state)
- [Use Hooks Gallery](https://github.com/uidotdev/usehooks)
- [React Hooks Gallery](https://github.com/nikgraf/react-hooks)

### Custom LifeCycle Hooks

`componentDidMount`:

```ts
const useMount = fn => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn(), []);
};
```

componentWillUnmount:

```ts
const useUnmount = fn => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn, []);
};
```

componentDidUpdate:

```ts
const useUpdate = fn => {
  const mounting = useRef(true);

  useEffect(() => {
    if (mounting.current) {
      // first get called for componentDidMount lifecycle
      // so skip it
      mounting.current = false;
    } else {
      fn();
    }
  });
};
```

Force Update:

```ts
const useUpdate = () => useState(0)[1];
```

```ts
import { useState } from 'react';

interface VoidFunction {
  (): void;
}

interface VoidFunctionCreator {
  (): VoidFunction;
}

const max = 9007199254740990; // Number.MAX_SAFE_INTEGER - 1;

const useForceUpdate: VoidFunctionCreator = (): VoidFunction => {
  const [, setState] = useState(0);
  const forceUpdate: VoidFunction = (): void => {
    setState((state: number) => (state + 1) % max);
  };
  return forceUpdate;
};

export default useForceUpdate;
```

`isMounted`:

```ts
const useIsMounted = () => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
    return () => setIsMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMount;
};
```

### Custom Async Data Hook

- `useState` to store url and data.
- `useEffect` to trigger async `fetch` actions.

```ts
import { useEffect, useState } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

```tsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
  );
}
```

```ts
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(url);

      setData(result.data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const doGet = (event, url) => {
    setUrl(url);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
};
```

```tsx
function App() {
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doGet } = useDataApi(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <Fragment>
      <form
        onSubmit={event =>
          doGet(event, `http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
```

TypeScript fetch hook with caches:

```ts
import { useEffect, useReducer, useRef } from 'react';

import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched';
  data?: T;
  error?: string;
}

type Cache<T> = Record<string, T>;

// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string };

function useFetch<T = unknown>(
  url?: string,
  options?: AxiosRequestConfig
): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' };
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'request' });

      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] });
      } else {
        try {
          const response = await axios(url, options);
          cache.current[url] = response.data;

          if (cancelRequest.current) return;

          dispatch({ type: 'success', payload: response.data });
        } catch (error) {
          if (cancelRequest.current) return;

          dispatch({ type: 'failure', payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
```

### Custom Previous Hook

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

### Custom Interval Hook

```ts
import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
```

### Custom Debounce Hook

```ts
// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value
      // from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
```

```tsx
function App() {
  // Usage
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {}, [debouncedSearchTerm]);

  return <div>App</div>;
}
```

### Custom EventListener Hook

```ts
import { useCallback, useEffect } from 'react';

export default function useKeydown() {
  const handleKeydown = useCallback(() => {
    alert('key is pressed.');
  }, []);

  useMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
}
```

```ts
import { useEffect } from 'react';

export default function useEventListener({ event, handler }) {
  useMount(() => {
    document.addEventListener(event, handler);
    return () => {
      document.removeEventListener(event, handler);
    };
  });
}
```

### Custom Mouse Hook

```ts
import { useRef, useState } from 'react';

export default function useLongPress(time = 500) {
  const [action, setAction] = useState();

  const timerRef = useRef();
  const isLongPress = useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('LongPress');
    }, time);
  }

  function handleClick() {
    if (isLongPress.current) {
      return;
    }

    setAction('Click');
  }

  function handleMouseDown() {
    startPressTimer();
  }

  function handleMouseUp() {
    clearTimeout(timerRef.current);
  }

  function handleTouchStart() {
    startPressTimer();
  }

  function handleTouchEnd() {
    if (action === 'LongPress') {
      return;
    }

    clearTimeout(timerRef.current);
  }

  return {
    action,
    handlers: {
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  };
}
```

### Custom Observer Hook

```ts
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  // Update first entry
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

export default useIntersectionObserver;
```

```ts
function useComponentSize() {
  const [size, setSize] = React.useState({
    height: 0,
    width: 0,
  });
  const ref = React.useRef<any>();

  const onResize = React.useCallback(() => {
    if (!ref.current) {
      return;
    }

    const newHeight = ref.current.offsetHeight;
    const newWidth = ref.current.offsetWidth;

    if (newHeight !== size.height || newWidth !== size.width) {
      setSize({
        height: newHeight,
        width: newWidth,
      });
    }
  }, [size.height, size.width]);

  React.useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref, onResize]);

  return {
    ref,
    ...size,
  };
}
```

### Custom Locked Body Hook

```ts
import { useEffect, useLayoutEffect, useState } from 'react';

type ReturnType = [boolean, (locked: boolean) => void];

function useLockedBody(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked);

  // Do the side effect before render
  useLayoutEffect(() => {
    // Key point 1
    if (!locked) {
      return;
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Get the scrollBar width
    const root = document.getElementById('___gatsby'); // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Key point 2
    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

export default useLockedBody;
```

### Custom Script Loading Hook

```ts
import { useEffect, useState } from 'react';

export type Status = 'idle' | 'loading' | 'ready' | 'error';
export type ScriptElt = HTMLScriptElement | null;

function useScript(src: string): Status {
  const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle');

  useEffect(
    () => {
      if (!src) {
        setStatus('idle');
        return;
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      // **Cache mechanism**
      let script: ScriptElt = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          script?.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          );
        };

        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status') as Status);
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };

      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );

  return status;
}

export default useScript;
```

```ts
const cachedScripts = [];

const useScript = src => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src
      // that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        });
      } else {
        cachedScripts.push(src);

        // Create script
        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({
            loaded: true,
            error: true,
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
};
```

### Custom Media Query Hook

```ts
export default function useMedia<T>(
  queries: string[],
  values: T[],
  defaultValue: T
) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return values?.[index] || defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState<T>(getValue);

  useMount(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  });

  return value;
}
```

### Custom Cookie Hook

```ts
// https://github.com/tylerwolff/useCookie.
import { useState } from 'react';

const isBrowser = typeof window !== 'undefined';

function stringifyOptions(options) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      // Skip `days`.
      return acc;
    } else {
      if (options[key] === false) {
        return acc;
      } else if (options[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key]}`;
      }
    }
  }, '');
}

function getCookie(name, initialValue = '') {
  return (
    (isBrowser &&
      document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '')) ||
    initialValue
  );
}

function setCookie(name, value, options) {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options,
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}${stringifyOptions(optionsWithDefaults)}`;
}

function useCookie(key, initialValue) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const updateItem = (value, options) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem];
}
```

### Custom LocalStorage Hook

```tsx
// https://www.robinwieruch.de/react-uselocalstorage-hook.
const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) || fallbackState
  );

  // Update logic.
  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

const App = () => {
  const [isOpen, setOpen] = useLocalStorage('is-open', false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
};
```

### Custom Form Hook

#### UseState Only Form Hook

- `useState` for form entire state and form control data.
- Custom logic via hooks `params` function.

```ts
import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
```

#### UseState and UseRef Form Hook

- `useState` for form entire state.
- `useRef` for form control data.
- Custom logic via hooks `params` function.

```tsx
export const useField = (
  name,
  form,
  { defaultValue, validations = [], fieldsToValidateOnChange = [name] } = {}
) => {
  const [value, setValue] = useState(defaultValue);
  const [errors, setErrors] = useState([]);
  const [pristine, setPristine] = useState(true);
  const [validating, setValidating] = useState(false);
  const validateCounter = useRef(0);

  const validate = async () => {
    const validateIteration = ++validateCounter.current;
    setValidating(true);
    const formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    );
    errorMessages = errorMessages.filter(Boolean);
    if (validateIteration === validateCounter.current) {
      // this is the most recent invocation
      setErrors(errorMessages);
      setValidating(false);
    }
    return errorMessages.length === 0;
  };

  useEffect(() => {
    if (pristine) return; // Avoid validate on mount
    form.validateFields(fieldsToValidateOnChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const field = {
    name,
    value,
    errors,
    setErrors,
    pristine,
    onChange: e => {
      if (pristine) {
        setPristine(false);
      }
      setValue(e.target.value);
    },
    validate,
    validating,
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fields = useRef([]);

  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (fieldNames instanceof Array) {
      fieldsToValidate = fields.current.filter(field =>
        fieldNames.includes(field.name)
      );
    } else {
      // If fieldNames not provided, validate all fields.
      fieldsToValidate = fields.current;
    }
    const fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    return fieldsValid.every(Boolean);
  };

  const getFormData = () => {
    return fields.current.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true); // User has attempted to submit form at least once
      const formValid = await validateFields();
      const returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.current.every(f => f.errors.length === 0),
    addField: field => fields.current.push(field),
    getFormData,
    validateFields,
    submitted,
    submitting,
  };
};

const Field = ({
  label,
  name,
  value,
  onChange,
  errors,
  setErrors,
  pristine,
  validating,
  validate,
  formSubmitted,
  ...other
}) => {
  const showErrors = (!pristine || formSubmitted) && !!errors.length;

  return (
    <FormControl className="field" error={showErrors}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={() => !pristine && validate()}
        endAdornment={
          <InputAdornment position="end">
            {validating && <LoadingIcon className="rotate" />}
          </InputAdornment>
        }
        {...other}
      />
      <FormHelperText component="div">
        {showErrors &&
          errors.map(errorMsg => <div key={errorMsg}>{errorMsg}</div>)}
      </FormHelperText>
    </FormControl>
  );
};

const App = props => {
  const form = useForm({
    onSubmit: async (formData, valid) => {
      if (!valid) return;
      await timeout(2000); // Simulate network time
      if (formData.username.length < 10) {
        // Simulate 400 response from server.
        usernameField.setErrors(['Make a longer username']);
      } else {
        // Simulate 201 response from server.
        window.alert(
          `form valid: ${valid}, form data: ${JSON.stringify(formData)}`
        );
      }
    },
  });

  const usernameField = useField('username', form, {
    defaultValue: '',
    validations: [
      async formData => {
        await timeout(2000);
        return formData.username.length < 6 && 'Username already exists';
      },
    ],
    fieldsToValidateOnChange: [],
  });
  const passwordField = useField('password', form, {
    defaultValue: '',
    validations: [
      formData =>
        formData.password.length < 6 &&
        'Password must be at least 6 characters',
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword'],
  });
  const confirmPasswordField = useField('confirmPassword', form, {
    defaultValue: '',
    validations: [
      formData =>
        formData.password !== formData.confirmPassword &&
        'Passwords do not match',
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword'],
  });

  const requiredFields = [usernameField, passwordField, confirmPasswordField];

  return (
    <div id="form-container">
      <form onSubmit={form.onSubmit}>
        <Field
          {...usernameField}
          formSubmitted={form.submitted}
          label="Username"
        />
        <Field
          {...passwordField}
          formSubmitted={form.submitted}
          label="Password"
          type="password"
        />
        <Field
          {...confirmPasswordField}
          formSubmitted={form.submitted}
          label="Confirm Password"
          type="password"
        />
        <Button
          type="submit"
          disabled={
            !form.isValid() ||
            form.submitting ||
            requiredFields.some(f => f.pristine)
          }
        >
          {form.submitting ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};
```

#### UseState and UseRef with DOM Refs Form Hook

- `useState` for form entire state.
- `useRef` for form control data.
- `Function Refs` bind to native `<input />` elements.
- Custom logic via hooks `return` function.

```tsx
// https://github.com/react-hook-form/react-hook-form/blob/v7.29.0/src/logic/createFormControl.ts
const createFormControl = () => ({
  register: (name, options = {}) => {
    // Register input filed.
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled);

    set(_fields, name, {
      _f: {
        ...(field && field._f ? field._f : { ref: { name } }),
        name,
        mount: true,
        ...options,
      },
    });
    _names.mount.add(name);

    field
      ? disabledIsDefined &&
        set(
          _formValues,
          name,
          options.disabled
            ? undefined
            : get(_formValues, name, getFieldValue(field._f))
        )
      : updateValidAndValue(name, true, options.value);

    return {
      // Bind to Form Input Element.
      ref: (ref: HTMLInputElement | null): void => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);

          const fieldRef = isUndefined(ref.value)
            ? ref.querySelectorAll
              ? (ref.querySelectorAll('input,select,textarea')[0] as Ref) || ref
              : ref
            : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];

          if (
            radioOrCheckbox
              ? refs.find((option: Ref) => option === fieldRef)
              : fieldRef === field._f.ref
          ) {
            return;
          }

          set(_fields, name, {
            _f: {
              ...field._f,
              ...(radioOrCheckbox
                ? {
                    refs: [...refs.filter(live), fieldRef],
                    ref: { type: fieldRef.type, name },
                  }
                : { ref: fieldRef }),
            },
          });

          updateValidAndValue(name, false, undefined, fieldRef);
        } else {
          field = get(_fields, name, {});

          if (field._f) {
            field._f.mount = false;
          }

          (_options.shouldUnregister || options.shouldUnregister) &&
            !(isNameInFieldArray(_names.array, name) && _stateFlags.action) &&
            _names.unMount.add(name);
        }
      },
      value,
      min,
      max,
      required,
      disabled,
      ...fieldPropValues,
    };
  },
  // Higher order function: onSubmit (Use Code) => onSubmit (Bind to Form Element).
  handleSubmit: onSubmit => {
    return (event: SubmitEvent) => {
      onSubmit(this._getFormData());
    };
  },
});

const useForm = () => {
  // Detailed logic handlers: DOM refs, field getter/setter, submit handler.
  const formControl = useRef<FormControl>(createFormControl());
  // Entire form state: valid, errors etc.
  const formState = useState<FormState>();

  return {
    ...formControl.current,
  };
};

const App = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} type="text" />
      <input {...register('password')} type="password" />
    </form>
  );
};
```

### Custom URL Params Hook

Storing state in the URL:

```ts
export default function useStateParams<T>(
  initialState: T,
  paramsName: string,
  serialize: (state: T) => string,
  deserialize: (state: string) => T
): [T, (state: T) => void] {
  const history = useHistory();
  const search = new URLSearchParams(history.location.search);

  const existingValue = search.get(paramsName);
  const [state, setState] = useState<T>(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingValue]);

  const onChange = (s: T) => {
    setState(s);
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.set(paramsName, serialize(s));
    const pathname = history.location.pathname;
    history.push({ pathname, search: searchParams.toString() });
  };

  return [state, onChange];
}
```

### Custom Router Hook

```ts
import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
import useForceUpdate from 'use-force-update';

const useReactRouter = () => {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);

  useEffect(
    () => routerContext.history.listen(forceUpdate),
    [forceUpdate, routerContext]
  );

  return routerContext;
};
```

### Custom History Hook

```ts
import { useCallback, useReducer } from 'react';

// Initial state that we pass into useReducer
const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};

// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case 'REDO': {
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case 'SET': {
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case 'CLEAR': {
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent,
      };
    }
    default:
      throw new Error('Unsupported action type!');
  }
};

// Hook
const useHistory = initialPresent => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Setup our callback functions
  // We memoize with useCallback to prevent unnecessary re-renders

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [dispatch, canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [dispatch, canRedo]);

  const set = useCallback(
    newPresent => dispatch({ type: 'SET', newPresent }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: 'CLEAR', initialPresent }),
    [dispatch, initialPresent]
  );

  // If needed we could also return past and future state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
```

### Custom Store Hook

Simple implementation:

```ts
import { useState } from 'react';

export const store = {
  state: {},
  setState(value) {
    this.state = value;
    this.setters.forEach(setter => setter(this.state));
  },
  setters: [],
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store);

// this is the custom hook we'll call on components.
export default function useStore() {
  const [state, set] = useState(store.state);

  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  return [state, store.setState];
}
```

Complex [implementation](https://github.com/timc1/kbar):

```ts
import { deepEqual } from 'fast-equals';
import * as React from 'react';
import type {
  Action,
  ActionId,
  ActionTree,
  KBarOptions,
  KBarProviderProps,
  KBarState,
} from './types';
import { VisualState } from './types';

type useStoreProps = KBarProviderProps;

export default function useStore(props: useStoreProps) {
  if (!props.actions) {
    throw new Error(
      'You must define a list of `actions` when calling KBarProvider'
    );
  }

  const [state, setState] = React.useState<KBarState>({
    searchQuery: '',
    currentRootActionId: null,
    visualState: VisualState.hidden,
    actions: props.actions.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {}),
  });

  const currentState = React.useRef(state);
  currentState.current = state;

  const getState = React.useCallback(() => currentState.current, []);
  const publisher = React.useMemo(() => new Publisher(getState), [getState]);

  React.useEffect(() => {
    currentState.current = state;
    publisher.notify();
  }, [publisher, state]);

  const optionsRef = React.useRef((props.options || {}) as KBarOptions);

  const registerActions = React.useCallback((actions: Action[]) => {
    const actionsByKey: ActionTree = actions.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});

    setState(state => ({
      ...state,
      actions: {
        ...actionsByKey,
        ...state.actions,
      },
    }));

    return function unregister() {
      setState(state => {
        const actions = state.actions;
        const removeActionIds = Object.keys(actionsByKey);
        removeActionIds.forEach(actionId => delete actions[actionId]);
        return {
          ...state,
          actions: {
            ...state.actions,
            ...actions,
          },
        };
      });
    };
  }, []);

  return React.useMemo(() => {
    return {
      getState,
      query: {
        setCurrentRootAction: (actionId: ActionId | null | undefined) => {
          setState(state => ({
            ...state,
            currentRootActionId: actionId,
          }));
        },
        setVisualState: (
          cb: ((vs: VisualState) => VisualState) | VisualState
        ) => {
          setState(state => ({
            ...state,
            visualState: typeof cb === 'function' ? cb(state.visualState) : cb,
          }));
        },
        setSearch: (searchQuery: string) =>
          setState(state => ({
            ...state,
            searchQuery,
          })),
        registerActions,
      },
      options: optionsRef.current,
      subscribe: (
        collector: <C>(state: KBarState) => C,
        cb: <C>(collected: C) => void
      ) => publisher.subscribe(collector, cb),
    };
  }, [getState, publisher, registerActions]);
}

class Publisher {
  getState;
  subscribers: Subscriber[] = [];

  constructor(getState: () => KBarState) {
    this.getState = getState;
  }

  subscribe<C>(
    collector: (state: KBarState) => C,
    onChange: (collected: C) => void
  ) {
    const subscriber = new Subscriber(
      () => collector(this.getState()),
      onChange
    );
    this.subscribers.push(subscriber);
    return this.unsubscribe.bind(this, subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    if (this.subscribers.length) {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        return this.subscribers.splice(index, 1);
      }
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber.collect());
  }
}

class Subscriber {
  collected: any; // Previous state cache.
  collector;
  onChange;

  constructor(collector: () => any, onChange: (collected: any) => any) {
    this.collector = collector;
    this.onChange = onChange;
  }

  collect() {
    try {
      // Grab latest state.
      const recollect = this.collector();
      if (!deepEqual(recollect, this.collected)) {
        this.collected = recollect;
        if (this.onChange) {
          this.onChange(this.collected);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
}
```

### Custom Recoil Hook

Recoil [minimal implementation](https://github.com/bennetthardwick/recoil-clone):

- `Atom`: collect children callbacks as `listeners`, notify children when value changed.
- `Selector`: collect parent `Atoms` as `deps`, update value when parent Atoms notified.

```ts
interface Disconnector {
  disconnect: () => void;
}

class Stateful<T> {
  private listeners = new Set<(value: T) => void>();

  constructor(private value: T) {}

  protected _update(value: T) {
    this.value = value;
    this.notify();
  }

  snapshot(): T {
    return this.value;
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.snapshot());
    }
  }

  subscribe(callback: (value: T) => void): Disconnector {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }
}

class Atom<T> extends Stateful<T> {
  update(value: T) {
    super._update(value);
  }
}

interface GeneratorContext {
  get: <V>(dependency: Stateful<V>) => V;
}

type SelectorGenerator<T> = (context: GeneratorContext) => T;

export class Selector<T> extends Stateful<T> {
  private registeredDeps = new Set<Stateful>();

  constructor(private readonly generate: SelectorGenerator<T>) {
    super(undefined as any);
    const context = { get: dep => this.getDep(dep) };
    this.value = generate(context);
  }

  private getDep<V>(dep: Stateful<V>): V {
    if (!this.registeredDeps.has(dep)) {
      // Update when parent Atom changed.
      dep.subscribe(() => this.updateSelector());
      this.registeredDeps.add(dep);
    }

    return dep.snapshot();
  }

  private updateSelector() {
    const context = { get: dep => this.getDep(dep) };
    this.update(this.generate(context));
  }
}

export function atom<V>(value: { key: string; default: V }): Atom<V> {
  return new Atom(value.default);
}

export function selector<V>(value: {
  key: string;
  get: SelectorGenerator<V>;
}): Selector<V> {
  return new Selector(value.get);
}

// This hook will re-render whenever supplied `Stateful` value changes.
// It can be used with `Selector` or `Atom`.
export function useCoiledValue<T>(value: Stateful<T>): T {
  const [, updateState] = useState({});

  // Force update when value changed.
  useEffect(() => {
    const { disconnect } = value.subscribe(() => updateState({}));
    return () => disconnect();
  }, [value]);

  return value.snapshot();
}

// Similar to above method, but it also lets set state.
// It only can be used with `Atom`.
export function useCoiledState<T>(atom: Atom<T>): [T, (value: T) => void] {
  const value = useCoiledValue(atom);
  return [value, useCallback(value => atom.update(value), [atom])];
}
```

```ts
function generate(context) {
  // Register NameAtom as a dependency and get its snapshot value:
  // get(nameAtom) => selector.getDep(nameAtom)
  // => nameAtom.subscribe(() => selector.updateSelector) + selector.deps.add(nameAtom)
  const name = context.get(nameAtom);
  // Do the same for AgeAtom
  const age = context.get(ageAtom);

  // Return new value using parent atoms.
  // E.g. 'Bob is 20 years old'.
  return `${name} is ${age} years old.`;
}
```

### Custom Atom Hook

Simple global store based on:

- Subscribe pattern.
- UseState hook.

```ts
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

const store = new Map<string, any>();

class Atom<T> {
  key = nanoid();
  subscribers = new Map<
    MutableRefObject<boolean>,
    Dispatch<SetStateAction<T>>
  >();

  private _current: T;

  constructor(initialState: T) {
    store.set(this.key, initialState);
    this._current = initialState;
  }

  subscribe(
    ref: MutableRefObject<boolean>,
    action: Dispatch<SetStateAction<T>>
  ) {
    this.subscribers.set(ref, action);
  }

  unsubscribe(ref: MutableRefObject<boolean>) {
    this.subscribers.delete(ref);
  }

  setState(nextState: T) {
    this._current = nextState;
    store.set(this.key, nextState);
    this.subscribers.forEach(action => action(nextState));
  }

  get current() {
    return this._current;
  }
}

export const atom = <T>(initialState: T) => new Atom(initialState);

export const useAtomValue = <T>(atom: Atom<T>) => {
  const ref = useRef(false);
  const [state, setState] = useState(atom.current);

  if (ref.current === false) {
    ref.current = true;
    atom.subscribe(ref, setState);
  }
  useMount(() => () => atom.unsubscribe(ref));
  return state;
};

export const setAtomValue =
  <T>(atom: Atom<T>) =>
  (nextState: T) =>
    atom.setState(nextState);
```

### Hooks Best Practice

如果将一个函数任意地将其放在 useEffect Deps List 中
可能会导致重复无意义的 useEffect 执行
(因为每次 render 期间的此函数都会重新定义).
有两个解决办法:

- 对于被多次复用 Utils 函数 (且不依赖组件的任何值),
  应该提到组件外面的公共区域去定义.
- 对于只被特定 Effect Hook 调用的 Utils 函数,
  可以放到 useEffect 内部定义.
- 对于其他需要在组件内(或自定义 Hooks 内)定义的函数,
  可使用 useCallback 包裹函数, 并设置正确的 Deps List,
  尽可能地减少 render 时重新定义此函数.

```ts
// ✅ Not affected by the data flow
function getFetchUrl(query) {
  return `https://hn.algolia.com/api/v1/search?query=${query}`;
}

function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  // ...
}
```

- Don't forget to cleanup side effects (return function in useEffect)
- Set correct deps list for useEffect:
  - avoid object deps (should use object property).
  - enough deps list to avoid infinite loop rendering pitfall.
  - enough deps list to avoid stale closure.
- setState(state => state + 1) is better (avoid outdated state).
- Change `useState` to `useRef` when values not for rendering.
- Don't put any `if` statement before hooks function.
- Only call Hooks at the top level (don't inside loops, conditions or nested functions).
- Only call Hooks from React function components.

## React Style Guide

### Naming Style

- use PascalCase for `.jsx` and component constructor
- use camelCase for component instance reference
- use camelCase for props name

```ts
// bad
import reservationCard from './ReservationCard';
```

```ts
// good
import ReservationCard from './ReservationCard';
```

```tsx
// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- Setting displayName for HOC:

```tsx
// bad
function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  };
}

// good
function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```

### Props Style

- use `prop` not `prop={true}`
- filter out unnecessary props

```tsx
// bad
class Component {
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...this.props} />;
  }
}

// good
class Component {
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...relevantProps} />;
  }
}
```

### Refs Style

- use callback refs

```tsx
// bad
// deprecated
const Component = <Foo ref="myRef" />;

// good
const Component = (
  <Foo
    ref={ref => {
      this.myRef = ref;
    }}
  />
);
```

### Alignment Style

```tsx
// good
const Component = <Foo superLongParam="bar" anotherSuperLongParam="baz" />;

// if props fit in one line then keep it on the same line
const Component = <Foo bar="bar" />;

// children get indented normally
const Component = (
  <Foo superLongParam="bar" anotherSuperLongParam="baz">
    <Bar />
  </Foo>
);

// good
const Component = <div>{showButton && <Button />}</div>;
```

### Quotes Style

- Use `"` for JSX attributes, use `'` for all other JS:

```tsx
// bad
// <Foo bar='bar' />

// good
const App = <Foo bar="bar" />;

// bad
// <Foo style={{ left: "20px" }} />

// good
const App = <Foo style={{ left: '20px' }} />;
```

### Spacing Style

- A single space in self-closing tag.
- No pad JSX curly spaces>.

```tsx
// bad
// <Foo/>

// very bad
// <Foo                 />

// good
const App = <Foo />;
```

```tsx
// bad
// <Foo bar={ baz } />

// good
const App = <Foo bar={baz} />;
```

### Ordering of Class Component

1. optional static methods
2. constructor
3. getChildContext
4. getDerivedStateFromProps
5. componentDidMount
6. getDerivedStateFromProps
7. shouldComponentUpdate
8. getSnapshotBeforeUpdate
9. componentDidUpdate
10. componentWillUnmount
11. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
12. getter methods for render like getSelectReason() or getFooterContent()
13. optional render methods like renderNavigation() or renderProfilePicture()
14. render

### Project Structure Best Practice

- `components`:
  - 模块化隔离, 最小依赖, 测试友好.
  - 每个组件文件夹包含大写并与文件同名的组件,
    且其中除了注入服务操作外, render return 之前, 无任何代码.
  - `use`开头并与文件夹同名的服务.
  - `use`开头, `Service`结尾, 并与文件夹同名的可注入服务.
- `services`: 服务中只存在基础 Hooks, 自定义 Hooks, 第三方 Hooks,
  静态数据, 工具函数, 工具类.

### React Style Best Practice

- 组件细分化.
- 组件:
  - 只传入必要的 props.
  - 使用 `Immutable.js` 或者 `React.addons.update` 实现不可变数据结构.
  - 结合 `React.addons.PureRenderMixin` 来减少 reRender.
- 在 `shouldComponentUpdate` 中优化组件减少 reRender.
- 使用 Context API.
- 少做 DOM 操作，始终让 UI 能够基于 state 还原.
- 在 store 和 action 中不 DOM 操作或者访问 `window.属性`，只与数据打交道.
- 推荐使用 ES6.
- npm 的 debug 包, log 组件渲染的每个步骤和动作.
- [Single Element Pattern](https://github.com/diegohaz/singel).

## Modern React

### ES6 Binding for This

```tsx
class Component extends React.Component {
  state = {};
  handleES6 = event => {};

  constructor(props) {
    super(props);
    this.handleLegacy = this.handleLegacy.bind(this);
  }

  handleLegacy(event) {
    this.setState(prev => ({ ...prev }));
  }

  render() {
    return <div>Component</div>;
  }
}
```

### Context API

Context API provide a Dependency Injection style method,
to provide values to children components.

Context 中只定义被大多数组件所共用的属性
(avoid **Prop Drilling**):

- Global state.
- Theme.
- Preferred language.
- Application configuration.
- Authenticated user name.
- User settings.
- Collection of services.

频繁的 Context value 更改会导致依赖 value 的组件
穿透 `shouldComponentUpdate`/`React.memo` 进行 `forceUpdate`,
增加 `render` 次数, 从而导致性能问题.

```tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { fakeAuth } from './app/services/auth';

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = useCallback(cb => {
    return fakeAuth.signIn(() => {
      setUser('user');
      cb();
    });
  }, []);

  const signOut = useCallback(cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  }, []);

  const auth = useMemo(() => {
    return {
      user,
      signIn,
      signOut,
    };
  }, [user, signIn, signOut]);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth };
```

#### Ref with Context

```tsx
// Context.js
import React, { Component, createContext } from 'react';

// React team — thanks for Context API 👍
const context = createContext();
const { Provider: ContextProvider, Consumer } = context;

class Provider extends Component {
  // refs
  // usage: this.textareaRef.current
  textareaRef = React.createRef();

  // input handler
  onInput = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <ContextProvider
        value={{
          textareaRef: this.textareaRef,
          onInput: this.onInput,
        }}
      >
        {this.props.children}
      </ContextProvider>
    );
  }
}
```

```tsx
// TextArea.jsx
import React from 'react';
import { Consumer } from './Context';

const TextArea = () => (
  <Consumer>
    {context => (
      <textarea
        ref={context.textareaRef}
        className="app__textarea"
        name="snippet"
        placeholder="Your snippet…"
        onChange={context.onInput}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        wrap="off"
      />
    )}
  </Consumer>
);
```

### Error Boundary

以下是错误边界不起作用的情况:

- 在事件处理器内.
- setTimeout 或 requestAnimationFrame 回调中的异步代码.
- 在服务端渲染期间.
- 错误边界代码本身中引发错误时.

[React Error Boundary](https://github.com/bvaughn/react-error-boundary) library:

```tsx
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    info: null,
  };

  // key point
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops, something went wrong :(</h1>
          <p>The error: {this.state.error.toString()}</p>
          <p>Where it occurred: {this.state.info.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### React Fragment

```tsx
class Items extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Fruit />
        <Beverages />
        <Drinks />
      </React.Fragment>
    );
  }
}

class Fruit extends React.Component {
  render() {
    return (
      <>
        <li>Apple</li>
        <li>Orange</li>
        <li>Blueberry</li>
        <li>Cherry</li>
      </>
    );
  }
}

class Frameworks extends React.Component {
  render() {
    return (
      <>
        <p>JavaScript:</p>
        <li>React</li>,<li>Vuejs</li>,<li>Angular</li>
      </>
    );
  }
}
```

### React Portals

Portals provide a first-class way to render children into a DOM node
that exists **outside** the DOM hierarchy of the parent component
`ReactDOM.createPortal(child, container)`.

```html
<div id="root"></div>
<div id="portal"></div>
```

```tsx
const portalRoot = document.getElementById('portal');

class Portal extends React.Component {
  constructor() {
    super();
    this.el = document.createElement('div');
  }

  componentDidMount = () => {
    portalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    portalRoot.removeChild(this.el);
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

class Modal extends React.Component {
  render() {
    const { children, toggle, on } = this.props;

    return (
      <Portal>
        {on ? (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
              <div className="box">
                <h2 class="subtitle">{children}</h2>
                <button onClick={toggle} className="closeButton button is-info">
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Portal>
    );
  }
}

class App extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="box">
        <h1 class="subtitle">Hello, I am the parent!</h1>
        <button onClick={this.toggleModal} className="button is-black">
          Toggle Modal
        </button>
        <Modal on={showModal} toggle={this.toggleModal}>
          {showModal ? <h1>Hello, I am the portal!</h1> : null}
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Concurrent Features

```tsx
import * as ReactDOM from 'react-dom';
import App from 'App';

// Create a root by using ReactDOM.createRoot():
const root = ReactDOM.createRoot(document.getElementById('app'));

// Render the main <App/> element to the root:
root.render(<App />);
```

### Batching Updates

- All updates will be automatically batched,
  including updates inside of **promises, async code and native event handlers**.
- `ReactDOM.flushSync` can opt-out of automatic batching.

```ts
function handleClick() {
  // React 17: Re-rendering happens after both of the states are updated.
  // This is called batching.
  // This is also the default behavior of React 18.
  setIsBirthday(b => !b);
  setAge(a => a + 1);
}

// For the following code blocks,
// React 18 does automatic batching, but React 17 doesn't.
// 1. Promises:
function handleClick() {
  fetchSomething().then(() => {
    setIsBirthday(b => !b);
    setAge(a => a + 1);
  });
}

// 2. Async code:
setInterval(() => {
  setIsBirthday(b => !b);
  setAge(a => a + 1);
}, 5000);

// 3. Native event handlers:
element.addEventListener('click', () => {
  setIsBirthday(b => !b);
  setAge(a => a + 1);
});
```

Reconciler 注册调度任务时, 会通过节流与防抖提升调度性能:

- 在 Task 注册完成后, 会设置 `FiberRoot` 的属性, 代表现在已经处于调度进行中.
- 再次进入 `ensureRootIsScheduled` 时
  (比如连续 2 次 `setState`, 第二次 `setState` 同样会触发 Reconciler 与 Scheduler 执行),
  如果发现处于调度中, 则会通过节流与防抖, 保证调度性能.
- 节流:
  `existingCallbackPriority === newCallbackPriority`,
  新旧更新的优先级相同, 则无需注册新 Task, 继续沿用上一个优先级相同的 Task, 直接退出调用.
- 防抖:
  `existingCallbackPriority !== newCallbackPriority`,
  新旧更新的优先级不同, 则取消旧 Task, 重新注册新 Task.

[EnsureRootIsScheduled](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberWorkLoop.new.js):

```ts
function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
  const existingCallbackNode = root.callbackNode;
  const nextLanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );

  if (nextLanes === NoLanes) {
    if (existingCallbackNode !== null) {
      cancelCallback(existingCallbackNode);
    }

    root.callbackNode = null;
    root.callbackPriority = NoLane;
    return;
  }

  const newCallbackPriority = getHighestPriorityLane(nextLanes);
  const existingCallbackPriority = root.callbackPriority;

  // Debounce.
  if (existingCallbackPriority === newCallbackPriority) {
    // The priority hasn't changed. We can reuse the existing task. Exit.
    return;
  }

  // Throttle.
  if (existingCallbackNode != null) {
    // Cancel the existing callback. We'll schedule a new one below.
    cancelCallback(existingCallbackNode);
  }

  // Schedule a new callback.
  let newCallbackNode;

  if (newCallbackPriority === SyncLane) {
    if (root.tag === LegacyRoot) {
      scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root));
    } else {
      scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
    }

    if (supportsMicroTasks) {
      scheduleMicroTask(() => {
        if (executionContext === NoContext) {
          flushSyncCallbacks();
        }
      });
    } else {
      scheduleCallback(ImmediateSchedulerPriority, flushSyncCallbacks);
    }

    newCallbackNode = null;
  } else {
    const eventPriority = lanesToEventPriority(nextLanes);
    const schedulerPriorityLevel =
      eventPriorityToSchedulePriority(eventPriority);
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    );
  }

  root.callbackPriority = newCallbackPriority;
  root.callbackNode = newCallbackNode;
}
```

### Suspense

Extract loading/skeleton/placeholder components into single place:

```tsx
const App = () => (
  <Suspense fallback={<Skeleton />}>
    <Header />
    <Suspense fallback={<ListPlaceholder />}>
      <ListLayout>
        <List pageId={pageId} />
      </ListLayout>
    </Suspense>
  </Suspense>
);
```

:::tip React Bottlenecks

1. CPU bottleneck: Concurrency Feature (Priority Interrupt Mechanism).
2. I/O bottleneck: Suspense.

:::

#### Suspense and Lazy

Lazy loading and code splitting:

```tsx
import React, { Suspense, lazy } from 'react';

const Product = lazy(() => import('./ProductHandler'));

const App = () => (
  <div className="product-list">
    <h1>My Awesome Product</h1>
    <Suspense fallback={<h2>Product list is loading...</h2>}>
      <p>Take a look at my product:</p>
      <section>
        <Product id="PDT-49-232" />
        <Product id="PDT-50-233" />
        <Product id="PDT-51-234" />
      </section>
    </Suspense>
  </div>
);
```

```tsx
const { lazy, Suspense } = React;

const Lazy = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ default: () => <Resource /> });
      }, 4000);
    })
);

const Resource = () => (
  <div className="box">
    <h1>React Lazy</h1>
    <p>This component loaded after 4 seconds, using React Lazy and Suspense</p>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lazy />
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

#### Suspense for SSR

React v18+: enable `Suspense` on the server:

- Selective Hydration: one slow part doesn't slow down whole page.
- Streaming HTML: show initial HTML early and stream the rest HTML.
- Enable code splitting for SSR.

```tsx
const LandingPage = () => (
  <div>
    <FastComponent />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </div>
);
```

## React Performance

### React Performance Mental Model

**3L** - Less render times, less render calculations, less render nodes:

- 数据: 利用缓存 (复用数据与 VNode), 减少 re-render 次数.
- 计算: 精确判断更新时机和范围, 减少计算量, 优化 render 过程.
- 渲染: 精细粒度, 降低组件复杂度, 减少 DOM 数量.

### React Performance Best Practice

- Use `key` correctly.
- `React.useMemo` and `React.useCallback` (no anonymous functions).
- `shouldComponentUpdate`/`React.memo`/`React.PureComponent`:
  **shallow compare** on components
  to prevent unnecessary re-rendering **caused by parent components**.
- Lazy loading components (`React.lazy` and `React.Suspense`).
- Virtualized Lists.
- Stateless component: less props, less state, less nest (HOC or render props).
- `Immutable.js`.
- Isomorphic rendering.
- Webpack bundle analyzer.
- [Progressive React](https://houssein.me/progressive-react).
- `useDeferredValue`/`useTransition` hook for debounce concurrent features.

### Re-rendering Problem

React will recursively render **all child components** inside of it
(because `props.children` is always a new reference when parent re-rendering).

The major difference is that
`React.Component` doesn’t implement `shouldComponentUpdate()` lifecycle method
while `React.PureComponent` implements it.

If component `render()` function renders
the same result given the same props and state,
use `React.PureComponent`/`React.memo` for a performance boost in some cases.

```tsx
import React, { PureComponent } from 'react';

const Unstable = props => {
  console.log(' Rendered Unstable component ');

  return (
    <div>
      <p> {props.value}</p>
    </div>
  );
};

class App extends PureComponent {
  state = {
    value: 1,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Unstable value={this.state.value} />
      </div>
    );
  }
}

export default App;
```

```tsx
import React, { Component } from 'react';

const Unstable = React.memo(props => {
  console.log(' Rendered this component ');

  return (
    <div>
      <p> {props.value}</p>
    </div>
  );
});

class App extends Component {
  state = {
    value: 1,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return { value: 1 };
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Unstable value={this.state.value} />
      </div>
    );
  }
}

export default App;
```

Prevent useless re-rendering:

- `shouldComponentUpdate`.
- `React.PureComponent`: **shallow compare** diff.
- `React.memo`: **shallow compare** diff,
  to memorize stateless components that **props not changed often**,
  `export default React.memo(MyComponent, areEqual)`.
- Memorized values.
- Memorized event handlers.
- 在用 `memo` 或者 `useMemo` 做优化前
  ([Before You Memo](https://overreacted.io/before-you-memo)),
  可以从不变的部分里分割出变化的部分.
  通过将变化部分的 `state` 向下移动从而抽象出变化的子组件,
  或者将**变化内容提升** (**Lift Up**) 到父组件从而将不变部分独立出来:

```tsx
// BAD
// When <App> re-rendering, <ExpensiveTree> will re-rendering:
// <ExpensiveTree /> is actually <ExpensiveTree props={}>.
// Every time <App> re-rendering will pass a new `{}` reference to <ExpensiveTree>.
import { useState } from 'react';

export default function App() {
  const [color, setColor] = useState('red');

  return (
    <div>
      <input value={color} onChange={e => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}

function ExpensiveTree() {
  const now = performance.now();

  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }

  return <p>I am a very slow component tree.</p>;
}
```

```tsx
// GOOD
// <ExpensiveTree> will not re-rendering.
export default function App() {
  return (
    <>
      <Form />
      <ExpensiveTree />
    </>
  );
}

function Form() {
  const [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={e => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}
```

```tsx
// GOOD
// <ExpensiveTree> will not re-rendering.
export default function App() {
  return (
    <ColorPicker>
      <p>Hello, world!</p>
      <ExpensiveTree />
    </ColorPicker>
  );
}

function ColorPicker({ children }) {
  const [color, setColor] = useState('red');
  return (
    <div style={{ color }}>
      <input value={color} onChange={e => setColor(e.target.value)} />
      {children}
    </div>
  );
}
```

```tsx
// BAD
function App1(items) {
  return <BigListComponent style={{ width: '100%' }} items={items} />;
}

// GOOD
const bigListStyle = { width: '100%' };

function App2(items) {
  return <BigListComponent style={bigListStyle} items={items} />;
}
```

```tsx
// BAD: Inline function
function App1(items) {
  return <BigListComponent onClick={() => dispatchEvent()} />;
}

// GOOD: Reference to a function
const clickHandler = () => dispatchEvent();

function App2(items) {
  return <BigListComponent onClick={clickHandler} />;
}
```

```tsx
function Parent({ children, lastChild }) {
  return (
    <div className="parent">
      <ChildA /> {/* Only ChildA gets re-rendered */}
      {children} {/* Bailed out */}
      {lastChild} {/* Bailed out */}
    </div>
  );
}
```

### Code Splitting

```tsx
import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const formValidator = Yup.object().shape({
  /* ... */
});

export default class Form extends Component {
  render() {
    return <Formik validationSchema={formValidator}>{/* ... */}</Formik>;
  }
}
```

```tsx
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      Form: undefined,
    };
  }

  render() {
    const { Form } = this.state;

    return (
      <div className="app">
        {Form ? <Form /> : <button onClick={this.showForm}>Show form</button>}
      </div>
    );
  }

  showForm = async () => {
    const { default: Form } = await import('./Form');
    this.setState({ Form });
  };
}
```

## Server Side Rendering

Application code is written in a way that
it can be executed **both on the server and on the client**.
The browser displays the initial HTML (fetch from server),
simultaneously downloads the single-page app (SPA) in the background.
Once the client-side code is ready,
the client takes over and the website becomes a SPA.

前后端分离是一种进步，但彻底的分离，也不尽善尽美，
比如会有首屏加载速度和 SEO 方面的困扰。
前后端分离+服务端首屏渲染看起来是个更优的方案，
它结合了前后端分离和服务端渲染两者的优点，
既做到了前后端分离，又能保证首页渲染速度，还有利于 SEO。

### Pros of SSR

#### Performance

- Smaller first meaningful paint time
- HTML's strengths: progressive rendering
- Browsers are incredibly good at rendering partial content

#### SEO

- Search engine crawlers used to not execute scripts (or initial scripts)
- Search engine usually stop after a while (roughly 10 seconds)
- SPAs can't set meaningful HTTP status codes

### SSR Library

- [Next.js for Isomorphic rendering](https://nextjs.org)

### SSR Example

[presentation](http://peerigon.github.io/talks/2018-07-20-js-camp-barcelona-bumpy-road-universal-javascript/#1)

Webpack configuration:

```ts
const baseConfig = require('./baseConfig');

const webConfig = {
  ...baseConfig,
  target: 'web',
};

const nodeConfig = {
  ...baseConfig,
  target: 'node',
  output: {
    ...baseConfig.output,
    libraryTarget: 'commonjs2',
  },
  externals: [require('webpack-node-externals')()],
};

module.exports = { webConfig, nodeConfig };
```

`start.server.js`:

```tsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App.js';

const render = () => ReactDOMServer.renderToString(<App />);

export default render;
```

`index.html.js`:

```ts
const startApp = require('../dist/server.js').default;

module.exports = () => `<!DOCTYPE html>
    <head>
    </head>
    <body>
      <div id="app">${startApp()}</div>
      <script src="/static/client.js"></script>
    </body>
  </html>`;
```

`start.client.js`:

```tsx
import React from 'react';
import ReactDOMServer from 'react-dom';
import App from './App.js';

ReactDOM.hydrate(<App />, document.getElementById('app'));
```

Async fetch out of `<App />`:

```tsx
const data = await fetchData();
const App = <App {...data} />;

return {
  html: ReactDOMServer.renderToString(App),
  state: { data },
};
```

## React with TypeScript

- [React TypeScript CheatSheet](https://github.com/typescript-cheatsheets/react)
- [@types/react API](https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/types-react-ap.md)

### Props Types

```ts
export declare interface AppProps {
  children: React.ReactNode; // best
  style?: React.CSSProperties; // for style
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void; // form events!
  props: Props & React.HTMLProps<HTMLButtonElement>;
}
```

### React Refs Types

```tsx
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

### Function Component Types

Don't use `React.FC`/`React.FunctionComponent`:

- React 17:
  Unnecessary addition of `children` (hide some run-time error).
- React 18:
  `@types/react` v18 [remove implicit `children` in `React.FunctionComponent`](https://github.com/ant-design/ant-design/pull/34937).
- `React.FC` doesn't support generic components.
- Barrier for `<Comp>` with `<Comp.Sub>` types (**component as namespace pattern**).
- `React.FC` doesn't work correctly with `defaultProps`.

```tsx
// Declaring type of props
interface AppProps {
  message: string;
}

// Inferred return type
const App = ({ message }: AppProps) => <div>{message}</div>;

// Explicit return type annotation
const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// Inline types annotation
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

### Class Component Types

- `React.Component<P, S>`
- `readonly state: State`
- `static defaultProps`
- `static getDerivedStateFromProps`

```tsx
class MyComponent extends React.Component<{
  message?: string;
}> {
  render() {
    const { message = 'default' } = this.props;
    return <div>{message}</div>;
  }
}
```

```tsx
import React from 'react';
import Button from './Button';

type Props = typeof ButtonCounter.defaultProps & {
  name: string;
};

const initialState = { clicksCount: 0 };
type State = Readonly<typeof initialState>;

class ButtonCounter extends React.Component<Props, State> {
  readonly state: State = initialState;

  static defaultProps = {
    name: 'count',
  };

  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    // ...
  }

  render() {
    return <span>{this.props.foo}</span>;
  }
}
```

### Generic Component Types

```tsx
// 一个泛型组件
interface SelectProps<T> {
  items: T[];
}

class Select<T> extends React.Component<SelectProps<T>, any> {}

// 使用
const Form = () => <Select<string> items={['a', 'b']} />;
```

In `.tsx` file, `<T>` maybe considered `JSX.Element`,
use `extends {}` to avoid it:

```tsx
const foo = <T extends {}>(arg: T) => arg;
```

### Component Props Type

- `React.ComponentProps`
- `React.ComponentPropsWithRef`
- `React.ComponentPropsWithoutRef`

```tsx
import { Button } from 'library';

type ButtonProps = React.ComponentProps<typeof Button>;
type AlertButtonProps = Omit<ButtonProps, 'onClick'>;

const AlertButton: React.FC<AlertButtonProps> = props => (
  <Button onClick={() => alert('hello')} {...props} />
);
```

Typing existing untyped React components:

```ts
declare module 'react-router-dom' {
  import * as React from 'react';

  interface NavigateProps<T> {
    to: string | number;
    replace?: boolean;
    state?: T;
  }

  export class Navigate<T = any> extends React.Component<NavigateProps<T>> {}
}
```

### Component Return Type

- `JSX.Element`: return value of `React.createElement`.
- `React.ReactNode`: return value of a component.

```ts
function foo(bar: string) {
  return { baz: 1 };
}

type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

### React Event Types

- `React.SyntheticEvent`.
- `React.AnimationEvent`:
  CSS animations.
- `React.ChangeEvent`:
  `<input>`/`<select>`/`<textarea>` change events.
- `React.ClipboardEvent`:
  copy/paste/cut events.
- `React.CompositionEvent`:
  user indirectly entering text events.
- `React.DragEvent`:
  drag/drop interaction events.
- `React.FocusEvent`:
  elements gets/loses focus events.
- `React.FormEvent<HTMLElement>`:
  form focus/change/submit events.
- `React.InvalidEvent`:
  validity restrictions of inputs fails.
- `React.KeyboardEvent`:
  keyboard interaction events.
- `React.MouseEvent`:
  pointing device interaction events (e.g mouse).
- `React.TouchEvent`:
  touch device interaction events.
  Extends UIEvent.
- `React.PointerEvent`:
  advanced pointing device interaction events
  (includes mouse, pen/stylus, touchscreen),
  recommended for modern browser.
  Extends `UIEvent`.
- `React.TransitionEvent`:
  CSS transition.
  Extends UIEvent.
- `React.UIEvent`:
  base event for Mouse/Touch/Pointer events.
- `React.WheelEvent`:
  mouse wheel scrolling events.
- Missing `InputEvent` (extends `UIEvent`):
  `InputEvent` is still an experimental interface
  and not fully supported by all browsers.
  Use `SyntheticEvent` instead.

#### React Event Handler Types

- `React.ChangeEventHandler<HTMLElement>`.

#### React Form Event Types

```tsx
interface State {
  text: string;
}

class App extends React.Component<Props, State> {
  state = {
    text: '',
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };

  // typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ text: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}
```

```tsx
const Form = () => (
  <form
    ref={formRef}
    onSubmit={(e: React.SyntheticEvent) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };

      const email = target.email.value; // Type Checks
      const password = target.password.value; // Type Checks
    }}
  >
    <div>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
    </div>
    <div>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
    </div>
    <div>
      <input type="submit" value="Log in" />
    </div>
  </form>
);
```

### React HTML and CSS Types

- `React.DOMAttributes<HTMLElement>`
- `React.AriaAttributes<HTMLElement>`
- `React.SVGAttributes<HTMLElement>`
- `React.HTMLAttributes<HTMLElement>`
- `React.ButtonHTMLAttributes<HTMLButtonElement>`
- `React.HTMLProps<HTMLElement>`
- `React.CSSProperties`

#### React Input Types

```ts
type StringChangeHandler = (newValue: string) => void;
type NumberChangeHandler = (newValue: number) => void;
type BooleanChangeHandler = (newValue: boolean) => void;

interface BaseInputDefinition {
  id: string;
  label: string;
}

interface TextInputDefinition extends BaseInputDefinition {
  type: 'text';
  value: string;
  onChange: StringChangeHandler;
}

interface NumberInputDefinition extends BaseInputDefinition {
  type: 'number';
  value: number;
  onChange: NumberChangeHandler;
}

interface CheckboxInputDefinition extends BaseInputDefinition {
  type: 'checkbox';
  value: boolean;
  onChange: BooleanChangeHandler;
}

type Input =
  | TextInputDefinition
  | NumberInputDefinition
  | CheckboxInputDefinition;
```

### React Portals Types

```tsx
const modalRoot = document.getElementById('modal-root') as HTMLElement;

export class Modal extends React.Component {
  el: HTMLElement = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
```

```tsx
import type React from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const Modal: React.FC<{}> = ({ children }) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const current = el.current;
    modalRoot!.appendChild(current);
    return () => modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
```

```tsx
import { Modal } from '@components';

function App() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <div id="modal-root"></div>
      {showModal && (
        <Modal>
          <div>
            I'm a modal!{' '}
            <button onClick={() => setShowModal(false)}>close</button>
          </div>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
    </div>
  );
}
```

### React Redux Types

```ts
const initialState = {
  name: '',
  points: 0,
  likesGames: true,
};

type State = typeof initialState;
```

```ts
export function updateName(name: string) {
  return {
    type: 'UPDATE_NAME',
    name,
  } as const;
}

export function addPoints(points: number) {
  return {
    type: 'ADD_POINTS',
    points,
  } as const;
}

export function setLikesGames(value: boolean) {
  return {
    type: 'SET_LIKES_GAMES',
    value,
  } as const;
}

type Action = ReturnType<
  typeof updateName | typeof addPoints | typeof setLikesGames
>;

// =>
// type Action = {
//   readonly type: 'UPDATE_NAME';
//   readonly name: string;
// } | {
//   readonly type: 'ADD_POINTS';
//   readonly points: number;
// } | {
//   readonly type: 'SET_LIKES_GAMES';
//   readonly value: boolean;
// }
```

```ts
import type { Reducer } from 'redux';

const reducer = (state: State, action: Action): Reducer<State, Action> => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.name };
    case 'ADD_POINTS':
      return { ...state, points: action.points };
    case 'SET_LIKES_GAMES':
      return { ...state, likesGames: action.value };
    default:
      return state;
  }
};
```

### React Hooks Types

- `useState<T>`
- `Dispatch<T>`
- `SetStateAction<T>`
- `RefObject<T>`
- `MutableRefObject<T>`
- More [TypeScript Hooks](https://github.com/juliencrn/useHooks.ts).

#### UseState Hook Type

```tsx
function App() {
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const handleClick = () => setUser(newUser);

  return <div>App</div>;
}
```

#### UseReducer Hook Type

- Use [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
  for reducer actions.

```tsx
const initialState = { count: 0 };
type State = typeof initialState;

type Action =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error('Error');
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        +
      </button>
    </>
  );
}
```

#### UseRef Hook Type

##### DOM Element Ref Type

- If possible, prefer as specific as possible.
- Return type is `RefObject<T>`.

```tsx
function Foo() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) throw new Error('divRef is not assigned');

    doSomethingWith(divRef.current);
  });

  return <div ref={divRef}>etc</div>;
}
```

##### Mutable Value Ref

- Return type is `MutableRefObject<T>`.

```tsx
function Foo() {
  const intervalRef = useRef<number | null>(null);

  // You manage the ref yourself (that's why it's called MutableRefObject!)
  useEffect(() => {
    intervalRef.current = setInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  // The ref is not passed to any element's "ref" prop
  return (
    <button onClick={() => clearInterval(intervalRef.current)}>
      Cancel timer
    </button>
  );
}
```

#### Custom Hooks Types

Use `as const` type assertion to avoid type inference
(especially for `[first, second]` type).

```ts
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = () => {
    setState(true);
  };

  // return `[boolean, () => void]` as want
  // instead of `(boolean | () => void)[]`
  return [isLoading, load] as const;
}
```

More hooks

```ts
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface ReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(x => !x);

  return { value, setValue, setTrue, setFalse, toggle };
}

export default useBoolean;
```

```ts
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

function useEventListener<T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap,
  handler: (event: Event) => void,
  element?: RefObject<T>
) {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      savedHandler?.current(event);
    };

    targetElement.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}

export default useEventListener;
```

```ts
import { useEffect, useReducer, useRef } from 'react';

import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched';
  data?: T;
  error?: string;
}

type Cache<T> = Record<string, T>;

// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string };

function useFetch<T = unknown>(
  url?: string,
  options?: AxiosRequestConfig
): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' };
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'request' });

      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] });
      } else {
        try {
          const response = await axios(url, options);
          cache.current[url] = response.data;

          if (cancelRequest.current) return;

          dispatch({ type: 'success', payload: response.data });
        } catch (error) {
          if (cancelRequest.current) return;

          dispatch({ type: 'failure', payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
```

## React Testing

- [Jest and Enzyme snapshots testing](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675).
- [Cypress: E2E testing framework](https://github.com/cypress-io/cypress).
- [GitHub CI for UI testing](https://storybook.js.org/blog/how-to-automate-ui-tests-with-github-actions).
- [React testing tutorial](https://www.robinwieruch.de/react-testing-tutorial).

### Shallow Renderer

浅层渲染 (Shallow Renderer) 对于在 React 中编写单元测试用例很有用.
它允许渲染一个一级深的组件并断言其渲染方法返回的内容, 而不必担心子组件未实例化或渲染.

```tsx
function MyComponent() {
  return (
    <div>
      <span className={'heading'}>{'Title'}</span>
      <span className={'description'}>{'Description'}</span>
    </div>
  );
}
```

```tsx
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);

const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className={'heading'}>{'Title'}</span>,
  <span className={'description'}>{'Description'}</span>,
]);
```

### Test Renderer

测试渲染器 (Test Renderer) 可用于将组件渲染为纯 JavaScript 对象,
而不依赖于 DOM 或原生移动环境.
该包可以轻松获取由 ReactDOM 或 React Native 平台所渲染的视图层次结构 (类似于 DOM 树) 的快照,
而无需使用浏览器或 jsdom.

```tsx
import TestRenderer from 'react-test-renderer';

const Link = ({ page, children }) => <a href={page}>{children}</a>;

const testRenderer = TestRenderer.create(
  <Link page={'https://www.facebook.com/'}>{'Facebook'}</Link>
);

console.log(testRenderer.toJSON());
// {
//   type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ]
// }
```

### Enzyme Mindset

`React Internals`:

- Enzyme tests ultimately prevent from modifying component without changing the test.
- Enzyme tests slowed down development speed and productivity,
  since every small change requires rewriting some part of tests.
- Enzyme provide access the DOM of the component.
  So using enzyme,
  we are not bound to test the internals
  but we can test the DOM too.

```bash
npm i -D enzyme enzyme-adapter-react-16 @types/enzyme
```

```tsx
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DataTable } from './components';

configure({ adapter: new Adapter() });

describe(() => {
  it('renders in table rows based on provided columns', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' },
    ];
    const data = [
      { id: 5, name: 'John', email: 'john@example.com' },
      { id: 6, name: 'Liam', email: 'liam@example.com' },
      { id: 7, name: 'Maya', email: 'maya@example.com', someTest: 10 },
      {
        id: 8,
        name: 'Oliver',
        email: 'oliver@example.com',
        hello: 'hello world',
      },
      { id: 25, name: 'Amelia', email: 'amelia@example.com' },
    ];

    // Shallow render Data Table
    const container = shallow(<DataTable data={data} cols={cols} />);

    // There should be ONLY 1 table element
    const table = container.find('table');
    expect(table).toHaveLength(1);

    // The table should have ONLY 1 thead element
    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    // The number of th tags should be equal to number of columns
    const headers = thead.find('th');
    expect(headers).toHaveLength(cols.length);
    // Each th tag text should equal to column header
    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(cols[idx].header);
    });

    // The table should have ONLY 1 tbody tag
    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    // tbody tag should have the same number of tr tags as data rows
    const rows = tbody.find('tr');
    expect(rows).toHaveLength(data.length);
    // Loop through each row and check the content
    rows.forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells).toHaveLength(cols.length);
      expect(cells.at(0).text()).toEqual(data[rowIndex].id);
      expect(cells.at(1).text()).toEqual(data[rowIndex].name);
      expect(cells.at(2).text()).toEqual(data[rowIndex].email);
    });
  });
});
```

### React Testing Library Mindset

`User behavior` and `A11Y`:

- Rather than tests focusing on the **implementation** (props and state) (Enzyme),
  tests are more focused on **user behavior** (react-testing-library).
- React testing library enforce to
  use `placeholder`, `aria`, `test-ids` to access elements,
  benefiting for a11y components
  (write tests > build accessible components > tests pass).

But sometimes may need to test the internals of the component
when just testing the DOM from user’s perspective may not make sense.

So depending on the use cases,
we can choose between these two libraries
or just install them all for individual use cases.

> Enzyme for Internal API, React testing library for user behavior.

### React Testing Library Installation

```bash
npm i -D @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
```

### React Testing Library Basis

```tsx
import React from 'react';

/**
 * render: render the component
 * screen: finding elements along with user
 **/
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, Welcome } from './';

describe('Welcome should', () => {
  test('has correct welcome message', () => {
    render(<Welcome firstName="John" lastName="Doe" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John Doe');
  });

  test('has correct input value', () => {
    render(<Welcome firstName="John" lastName="Doe" />);
    expect(screen.getByRole('form')).toHaveFormValues({
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('handles click correctly', () => {
    render(<Checkbox />);
    userEvent.click(screen.getByText('Check'));
    expect(screen.getByLabelText('Check')).toBeChecked();
  });
});
```

```tsx
import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';

import { App } from './App';
import { api } from './api';

// Normally you can mock entire module using jest.mock('./api);
const mockCreateItem = (api.createItem = jest.fn());

test('allows users to add items to their list', async () => {
  const todoText = 'Learn spanish';
  mockCreateItem.mockResolvedValueOnce({ id: 123, text: todoText });

  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText('What needs to be done?');
  const button = getByText('Add #1');

  fireEvent.change(input, { target: { value: todoText } });
  fireEvent.click(button);

  await wait(() => getByText(todoText));

  expect(mockCreateItem).toBeCalledTimes(1);
  expect(mockCreateItem).toBeCalledWith(
    '/items',
    expect.objectContaining({ text: todoText })
  );
});
```

### React Testing Library Events

#### FireEvent API

- `fireEvent` trigger DOM event: `fireEvent(node, event)`.
- `fireEvent.*` helpers for default event types:
  - click fireEvent.click(node).
  - See [all supported events](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js).

#### UserEvent API

[User Event](https://testing-library.com/docs/ecosystem-user-event)
provides more advanced simulation of browser interactions
than the built-in `fireEvent method`.

```bash
npm i -D @testing-library/user-event @testing-library/dom
```

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('click', () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" type="checkbox" />
    </div>
  );

  userEvent.click(screen.getByText('Check'));
  expect(screen.getByLabelText('Check')).toBeChecked();
});
```

### React Hooks Testing Library

#### Basic Hook Testing

```ts
import { useCallback, useState } from 'react';

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(x => x + 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, reset };
}
```

```ts
import { act, renderHook } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should reset counter to updated initial value', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    {
      initialProps: { initialValue: 0 },
    }
  );

  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});
```

#### Async Hook Testing

```ts
import React, { useCallback, useContext, useState } from 'react';

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(CounterStepContext);
  const increment = useCallback(() => setCount(x => x + step), [step]);
  const incrementAsync = useCallback(
    () => setTimeout(increment, 100),
    [increment]
  );
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, incrementAsync, reset };
}
```

```ts
import { renderHook } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter());
  result.current.incrementAsync();
  await waitForNextUpdate();
  expect(result.current.count).toBe(1);
});
```

#### Error Hook Testing

```ts
import React, { useCallback, useContext, useState } from 'react';

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(CounterStepContext);
  const increment = useCallback(() => setCount(x => x + step), [step]);
  const incrementAsync = useCallback(
    () => setTimeout(increment, 100),
    [increment]
  );
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  if (count > 9000) {
    throw new Error("It's over 9000!");
  }

  return { count, increment, incrementAsync, reset };
}
```

```ts
import { act, renderHook } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

it('should throw when over 9000', () => {
  const { result } = renderHook(() => useCounter(9000));

  act(() => {
    result.current.increment();
  });

  expect(result.error).toEqual(Error("It's over 9000!"));
});
```

### React Testing Library API

- `getByXXX` queries: common use case.
- `queryByXXX` queries: not throw error when nothing match.
- `findByXXX` queries: `getBy` queries + `waitFor`.

| API        | No Match | 1 Match | 1+ Match | Await |
| ---------- | -------- | ------- | -------- | ----- |
| getBy      | throw    | return  | throw    | No    |
| queryBy    | null     | return  | throw    | No    |
| findBy     | throw    | return  | throw    | Yes   |
| getAllBy   | throw    | array   | array    | No    |
| queryAllBy | []       | array   | array    | No    |
| findAllBy  | throw    | array   | array    | Yes   |

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionCreateStepTwo from './TransactionCreateStepTwo';

test('if amount and note is entered, pay button becomes enabled', async () => {
  render(
    <TransactionCreateStepTwo sender={{ id: '5' }} receiver={{ id: '5' }} />
  );

  expect(await screen.findByRole('button', { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), '50');
  userEvent.type(screen.getByPlaceholderText(/add a note/i), 'dinner');
  expect(await screen.findByRole('button', { name: /pay/i })).toBeEnabled();
});
```

### React Testing Library Reference

- [React testing library cheat sheet](https://testing-library.com/docs/react-testing-library/cheatsheet)

## Create React App

- [Custom React Scripts](https://auth0.com/blog/how-to-configure-create-react-app/)

```bash
npx create-react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
npm init react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
```

### Create React APP CLI

`createReactApp.js`:

`init`
-> commander setup
-> `createApp()`
-> process CLI args
-> `run()`
-> process `react-scripts@version` and `cra-template-xxx@version`
-> install `react`, `react-dom`, `react-scripts` and `cra-template-xxx`
-> invoke `react-scripts init` for further process.

### React Scripts

#### React Scripts Initialization

Initialization in `react-scripts/scripts/init.js`:

- 可以用于改变默认 registry:

```ts
'use strict';

const registries = {
  npm: 'https://registry.npmjs.org',
  yarn: 'https://registry.yarnpkg.com',
  aliyun: 'https://registry.npm.taobao.org',
};

module.exports = registries;
```

- 自定义安装默认依赖 (`react`, `react-dom`, `react-router`, `redux` etc.)
- 额外安装模板依赖 `packages.dependencies` in `cra-template/template.json`
- Setup `package.json`:
  `appPackage.eslintConfig`, `appPackage.browserslist`.
  `appPackage.dependencies`, `appPackage.scripts`
  and merge rest config in `packages` in `cra-template/template.json`
  (ignore `).
- Copy template files from `cra-template-xxx/template` directory.
- Setup git repository.
- Install deps and devDeps list from `react-scripts` and `cra-template-xxx`.
- Uninstall `cra-template-xxx` package.
- Setup first git commit.
- Print available scripts.
- Done.

#### React Scripts Commands

Locating in `react-scripts/scripts/`:

- `start.js` for `react-scripts start`.
- `build.js` for `react-scripts build`.
- `test.js` for `react-scripts test`.
- `eject.js` for `react-scripts eject`.

##### React Scripts Start

When develop `react-scripts` locally
with `react-scripts start`,
it will use `templatePath` located in
`react-scripts/config/paths.js`
to find local template.

#### React Scripts Configuration

Config in `react-scripts/config/` directory:

- `env.js`: static environment variables.
- `getHttpsConfig.js`: get HTTPS(SSL) config.
- `modules.js`: locale modules webpack alias with `baseUrl`.
- `paths.js`: configurable paths variables (most for Webpack config).
- `webpackDevServer.config.js`: Webpack Dev Server configuration.
- `webpack.config.js`: Webpack configuration
  (paths, deps/devDeps, plugins, loader rules etc.).

```ts
// Add support for Ant Design UI.
const webpackConfig = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
    plugins: [
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
    ],
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
  },
};
```

```ts
// Add Webpack bundle analyzer plugin.
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackConfig = {
  plugins: [
    isEnvDevelopment &&
      new BundleAnalyzerPlugin({
        analyzerPort: 5000,
      }),
  ].filter(Boolean),
};
```

### CRA Usage

#### CRA CSS

```css
@import-normalize; /* bring in normalize.css styles */

/* rest of app styles */
```

#### CRA Public Folder

- None of the files in public folder get post-processed or minified.
- Missing files will not be called at compilation time,
  and will cause `404` errors for your users.
- Result filenames won’t include `content hashes`
  so you’ll need to add query arguments or rename them every time they change.

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

```tsx
class Component {
  render() {
    // Note: this is an escape hatch and should be used sparingly!
    // Normally recommend using `import` for getting asset URLs
    // as described in “Adding Images and Fonts” section.
    return <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Here" />;
  }
}
```

#### CRA Environment Variables

- Create custom environment variables beginning with `REACT_APP_`.
  Any other variables except `NODE_ENV` will be ignored.
- HTML access environment variables `%REACT_APP_XXX%`.
- JavaScript access environment variables via `process.env.REACT_APP_XXX`.
- [`.env`](https://github.com/motdotla/dotenv)
  file define permanent environment variables:
  - `npm start`: `.env.development.local`>`.env.local`>`.env.development`>`.env`.
  - `npm run build`: `.env.production.local`>`.env.local`>`.env.production`>`.env`.
  - `npm test`: `.env.test.local`>`.env.test`>`.env`.
- Environment variables [list](https://create-react-app.dev/docs/advanced-configuration).

```bash
GENERATE_SOURCEMAP=false
REACT_APP_NOT_SECRET_CODE=abcdef
```

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<title>%REACT_APP_WEBSITE_NAME%</title>
```

```tsx
const App = () => (
  <div>
    <small>
      You are running this application in <b>{process.env.NODE_ENV}</b> mode.
    </small>
    <form>
      <input
        type="hidden"
        defaultValue={process.env.REACT_APP_NOT_SECRET_CODE}
      />
    </form>
  </div>
);
```

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

#### CRA Code Splitting

Code splitting for [production build](https://create-react-app.dev/docs/production-build)
with `import('dep').then();`:

```ts
import type { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Code splitting into separate chunk
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

#### CRA Service Worker

- [PWA Template](https://github.com/cra-template/pwa)

#### CRA Deployment

- [Official Documentation](https://facebook.github.io/create-react-app/docs/deployment).
- [Deploy Subdirectory](https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1).
- `Cache-Control: max-age=31536000` for `build/static` assets,
  `Cache-Control: no-cache` for everything else.
  `build/static` file contents hash is embedded into the filename.
- Change `homepage` in `package.json`:
  - `"homepage": "."`.
  - `"homepage": "https://example.com/relative/path/"`.
- Use `path={'${process.env.PUBLIC_URL}/about'}`
  in `Routes.js` when using `react-router-dom`.
- Or use `basename` for `react-router@^4`.

```tsx
// renders <a href="/calendar/today">
function App() {
  return (
    <BrowserRouter basename="/calendar">
      <Link to="/today" />
    </BrowserRouter>
  );
}
```

#### SPA Deployment

- Deployment services [guide](https://hiddedevries.nl/en/blog/2020-06-27-how-deployment-services-make-client-side-routing-work).

`vercel.json`:

```json
{
  "routes": [{ "src": "/[^.]+", "dest": "/", "status": 200 }]
}
```

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

[Netlify](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps):

```bash
/*    /index.html   200
```

GitHub Pages:

```bash
# 404 fallback
ln -s index.html 404.html
```

### Custom CRA

- Custom `packages/cra-template-*`: change HTML/CSS/JS boilerplate.
- Custom `packages/react-scripts/config/`:
  change paths, deps/devDeps, plugins, loader rules etc.
- Custom `packages/react-scripts/scripts/`: change react-scripts CLI behaviors.

#### CRA MonoRepo

- `babel-preset-react-app`: babel preset configuration.
- `cra-template`/`cra-template-typescript`: CRA default templates.
- `eslint-config-react-app`: eslint configuration.
- `react-app-polyfill`: polyfills for various browsers.
- `react-dev-utils`:
  most utility functions for paths, helpers, middleware, and webpack plugins.

#### Custom React Scripts

In `Create React App`
[code](https://github.com/facebook/create-react-app/blob/main/packages/create-react-app/createReactApp.js):

```ts
const templatesVersionMinimum = '3.3.0';

// Assume compatibility if we can't test the version.
if (!semver.valid(packageVersion)) {
  packageVersion = templatesVersionMinimum;
}

// Only support templates when used alongside new react-scripts versions.
const supportsTemplates = semver.gte(packageVersion, templatesVersionMinimum);
if (supportsTemplates) {
  allDependencies.push(templateToInstall);
}
```

Due to version checking for template feature,
custom react scripts should
publish with version `^3.3.0` or `^4.x.x`.

#### Custom CRA Templates

HTML/CSS/JSX boilerplate in `react-scripts/template/` directory,
now Templates are always named in the format cra-template-[template-name]
in `packages/cra-template` and `packages/cra-template-typescript`.

```bash
npx create-react-app my-app --template [template-name]
```

Dependencies in `template.json`
will bump to latest minor version automatically.

In `react-scripts/scripts/utils/verifyTypeScriptSetup.js`,
if template `src` don't exist `react-app-env.d.ts` file,
it will create automatically with `reference` to `react-scripts` types:

```ts
// Reference `react-scripts` types
if (!fs.existsSync(paths.appTypeDeclarations)) {
  fs.writeFileSync(
    paths.appTypeDeclarations,
    `/// <reference types="react-scripts" />${os.EOL}`
  );
}
```

## React Internationalization

- [XLIFF](https://en.wikipedia.org/wiki/XLIFF):
  XML Localization Interchange File Format.
- [ICU](https://github.com/unicode-org/icu):
  International Components for Unicode.
- [BCP 47](https://github.com/wooorm/bcp-47):
  IETF BCP 47 language tag.

### Simple i18n Implementation

```ts
// locale/zh-CN.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  hello: '你好，{name}',
};
```

```ts
// locale/en-US.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  hello: 'Hello，{name}',
};
```

```ts
import IntlMessageFormat from 'intl-messageformat';
import zh from '../locale/zh';
import en from '../locale/en';
const MESSAGES = { en, zh };
const LOCALE = 'en'; // 这里写上决定语言的方法，例如可以从 cookie 判断语言

class Intl {
  get(key, defaultMessage, options) {
    let msg = MESSAGES[LOCALE][key];

    if (msg == null) {
      if (defaultMessage != null) {
        return defaultMessage;
      }

      return key;
    }

    if (options) {
      msg = new IntlMessageFormat(msg, LOCALE);
      return msg.format(options);
    }

    return msg;
  }
}

export default Intl;
```

### React i18n Library

- [react-intl](https://github.com/alibaba/react-intl-universal)

### i18n Solution

- [奇安信前端国际化平台](https://mp.weixin.qq.com/s/QfTf02GrEXrbCnQswnWFuQ)

## Styled Component

### Shared CSS Styles

```tsx
// Import React.js, styled-components and css
import React from 'react';
import styled, { css } from 'styled-components';
const container = document.querySelector('.container');

// Define new const with bold style
const headingStyle = css`
  font-weight: bold;
`;

// Define typography styles
const H1 = styled.h1`
  font-size: 54px;
  // Using headingStyle const
  ${headingStyle}
`;
const H2 = styled.h2`
  font-size: 36px;
  // Using headingStyle const
  ${headingStyle}
`;
const H3 = styled.h3`
  font-size: 24px;
  // Using headingStyle const
  ${headingStyle}
`;
const H4 = styled.h4`
  font-size: 16px;
  // Using headingStyle const
  ${headingStyle}
`;
const H5 = styled.h5`
  font-size: 14px;
  // Using headingStyle const
  ${headingStyle}
`;
const H6 = styled.h6`
  font-size: 12px;
  // Using headingStyle const
  ${headingStyle}
`;
const Text = styled.p`
  font-size: 16px;
`;
const Small = styled.small`
  font-size: 80%;
`;

// Use our styles
const WrapperContainer = () => (
  <div>
    <H1>Heading h1</H1>
    <H2>Heading h2</H2>
    <H3>Heading h3</H3>
    <H4>Heading h4</H4>
    <H5>Heading h5</H5>
    <H6>Heading h6</H6>
    <Text>Body text</Text>
    <Small>Small text</Small>
  </div>
);

ReactDOM.render(<WrapperContainer />, container);
```

### Styled Component Extension

```tsx
// Import React.js and styled-components
import React from 'react';
import styled from 'styled-components';

const container = document.querySelector('.container');

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
`;

// Using extend to create a red variant of the button
const RedButton = Button.extend`
  background-color: #e74c3c;
`;

// Using extend to create a green variant of the button
const GreenButton = Button.extend`
  background-color: #2ecc71;
`;

// Use our styles
const WrapperContainer = () => (
  <div>
    <Button>Default button</Button>
    <RedButton>Red button</RedButton>
    <GreenButton>Green button</GreenButton>
  </div>
);

ReactDOM.render(<WrapperContainer />, container);
```

### Styled Component Props

```tsx
// Import React.js, styled-components and css
import React from 'react';
import styled, { css } from 'styled-components';

const container = document.querySelector('.container');

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;

  // Using props to create a gray variant of the button
  ${props =>
    props.gray &&
    css`
      background-color: #95a5a6;
    `}
  // Using props to create a green variant of the button
  ${props =>
    props.green &&
    css`
      background-color: #2ecc71;
    `}
  // Using props to create a red variant of the button
  ${props =>
    props.red &&
    css`
      background-color: #e74c3c;
    `}
  // We can also use a ternary operator for "binary" changes
  color: ${props => (props.gray ? '#2c3e50' : '#fff')};
`;

const WrapperContainer = () => (
  <div>
    <Button>Default button</Button>
    {/* Button with prop "red" */}
    <Button red>Red button</Button>
    {/* Button with prop "green" */}
    <Button green>Green button</Button>
  </div>
);

ReactDOM.render(<WrapperContainer />, container);
```

## Micro Frontends

通过 `single-spa` 包装的主应用是一个基座,
它提供相应的协议,
子应用按照协议进行包装就可以接入主应用.
主应用就像插座,
子应用就像不同的电器,
只要遵循某种协议就可以轻松实现可插拔操作.

:::tip Single SPA Lifecycle

- Register.
- Load.
- Bootstrap.
- Mount.
- Unmount.
- Unload.

:::

`single-spa` 子项目的的挂载、更新、卸载等操作,
并不是 `single-spa` 原生提供的,
用户可以根据自己的需要来自行实现子应用的挂载, 卸载及更新等逻辑.
`single-spa` 通过 `reroute` 和路由控制来调用子应用.
在 `single-spa` 的开发过程中,
需要自己手动去写调用子应用的方法.

### Application EntryPoint

- HTML Entry (`import-html-entry` from `qiankun`).
- JavaScript Entry.

### Styles Isolation

- Shadow DOM container.
- CSS module.
- CSS scoped namespace.
- CSS selector renaming.
- CSS in JS.

### Scripts Isolation

- Snapshot sandbox: 类似中断恢复机制, 备份快照 -> 子应用挂载/运行/卸载 -> 恢复快照.
- Proxy sandbox: `window` proxy (`fakeWindow` for every sub-app).
- Runtime sandbox.

```ts
class SnapshotSandbox {
  constructor() {
    this.proxy = window; // window属性.
    this.modifyPropsMap = {}; // 记录在 window 上的修改.
  }

  active() {
    this.windowSnapshot = {}; // 快照.

    for (const prop in window) {
      if (window.hasOwn(prop)) {
        this.windowSnapshot[prop] = window[prop];
      }

      Object.keys(this.modifyPropsMap).forEach(p => {
        window[p] = this.modifyPropsMap[p];
      });
    }
  }

  inactive() {
    for (const prop in window) {
      if (window.hasOwn(prop)) {
        if (window[prop] !== this.windowSnapshot[prop]) {
          this.modifyPropsMap[prop] = window[prop];
          window[prop] = this.windowSnapshot[prop];
        }
      }
    }
  }
}
```

### Application Communication

- Pub-Sub Pattern.
- Callback registration.
- Global store.

## Interviews

- [React Interview Questions](https://github.com/semlinker/reactjs-interview-questions)
