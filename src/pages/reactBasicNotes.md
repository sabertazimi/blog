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

## Core of React

- `Scheduler` 调度器: 度任务的优先级, 高优任务优先进入 `Reconciler`.
- `Reconciler` 协调器: 负责找出变化的组件.
- `Renderer` 渲染器: 负责将变化的组件渲染到页面上.

### React Virtual DOM

- Reduce rendering times with reconciliation algorithm,
  improving rendering efficiency.
- Cross platform code.
- Functional programming without details on DOM manipulation.
- Virtual Dom 很多时候都不是最优的操作,
  但它具有普适性, 在效率与可维护性之间达到平衡.
- [SnabbDOM](https://github.com/snabbdom/snabbdom):
  virtual DOM library focus on modularity and performance.

### React Fiber

- [A Simple React with Fiber Reconciliation](https://github.com/sabertazimi/meact)

React Fiber 的目标是提高其在动画、布局和手势等领域的适用性.
它的主要特性是 `Incremental Rendering` : 将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力.

#### React Fiber Metadata

[Fiber](https://github.com/facebook/react/blob/v17.0.0/packages/react-reconciler/src/ReactInternalTypes.js):

- Component type.
- Current props and state.
- Pointers to parent, sibling, and child components.
- Other internal metadata to track rendering process.

#### React Fiber Effects

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

#### React Fiber Trees

- current fiber tree: rendered to screen.
- workInProgress fiber tree: under reconciliation.
- When workInProgress fiber tree complete `render` + `commit`,
  swap 2 fiber tree:
  - reuse fiber objects.
  - reduce memory usage and GC time.

### React Scheduler

Polyfill for `requestIdleCallback` with priority control.

```js
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

#### Priority Scheduler

React 16, unstable concurrent mode:

- ImmediatePriority: 立即执行优先级, 级别最高, `expirationTime = -1`.
- UserBlockingPriority: 用户阻塞优先级, `expirationTime = 250`.
- NormalPriority: 正常优先级, `expirationTime = 5000`.
- LowPriority: 低优先级, `expirationTime = 10000`.
- IdlePriority: 可闲置优先级, `expirationTime = maxSigned31BitInt`.

React 17, stable concurrent mode with `Lanes`:

```js
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

### React Diff Stage

Reconciler

- O(n) incomplete tree comparison: only compare same level nodes.
- `key` prop to hint for nodes reuse.

### React Render Stage

Reconciler

#### Elements of Different Types

- rebuild element and children
- methods: `componentDidMount`/`componentWillUnmount`

#### DOM Elements of Same Type

- only update the changed attributes
- use `key` attribute to match children

`Best Practice`: give `key` to `<li>/<tr>/<tc>` elements
(stable, predictable, unique and not array indexed)

#### Component Elements of Same Type

- Update the props to match the new element
- Methods: `getDerivedStateFromProps`
- Then `render` called,
  diff algorithm recursively on the old result and the new result.

### React Commit Stage

Renderer

#### Before Mutation Stage

#### Mutation Stage

- `Placement` effects: `DOM.appendChild` called.

#### Layout Stage

- `componentDidMount` lifecycle function called **synchronously**.
- `useLayoutEffect` callback called **synchronously**.

#### useEffect Execution Time

`useEffect` callback called **asynchronously**
after three stages of `Commit`.

## Props and States

### setState

- `setState` Synchronous Way:
  When it comes `blocking mode`
  (`ReactDOM.createBlockingRoot(rootNode).render(<App />)`),
  setState works in synchronous mode.
- `setState` Asynchronous Way:
  At most of the other time, setState works in asynchronous mode,
  including `legacy mode`(`ReactDOM.render(<App />, rootNode)`)
  and `concurrent mode`(`ReactDOM.createRoot(rootNode).render(<App />)`).
- 在异步模式下, 为了防止子组件在处理事件时多次渲染,
  将多个 setState (包括父组件) 移到浏览器事件之后执行
  (Batched Updates: 此时 React 内部变量 isBatchingUpdates 变成 true),
  可以提升 React 性能.
  未来会在更多的可以 Batched Updates 的场景下将 setState 设为异步执行,
  所以编写代码时最好将 setState 总是当做异步执行函数.
- Batch Update: 事件处理.
- Not Batch Update: Async Work (setTimeout/Promise.then)

```jsx
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
    return null;
  }
}

// => 0 0 2 3
```

### componentDidMount

- don't `setState` directly in this method
- can use `setInterval`/`setTimeout`/AJAX request/`fetch` in this method,
  and call `setState` as `callback` inside these functions

```jsx
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

```jsx
static PropTypes = {
    arrayProps: React.PropTypes.array
    // array/bool/func/number/object/string/symbol/node/element
    // React.PropTypes.instanceOf/oneOf/oneOfType
    // React.PropTypes.arrayOf(React.PropsTypes.number)
    // React.PropTypes.objectOf(React.PropsTypes.number)
    // React.PropTypes.any.isRequired
}
```

## Element and Component

react element 实际上是纯对象, 可由 React.createElement()/JSX/element factory helper 创建,
并被 react 在必要时渲染成真实的 DOM 结点

```jsx
ReactDOM.render({
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}, document.getElementById('root'));

// React: You told me this...
{
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}

// React: ...And Form told me this...
{
  type: Button,
  props: {
    children: 'OK!',
    color: 'blue'
  }
}

// React: ...and Button told me this! I guess I'm done.
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

### JSX

在 JSX 中, 小写标签被认为是 HTML 标签.
但是, 含有 `.` 的大写和小写标签名却不是.

```jsx
<component /> 将被转换为 React.createElement('component') (i.e, HTML 标签)
<obj.component /> 将被转换为 React.createElement(obj.component)
<Component /> 将被转换为 React.createElement(Component)
```

#### JSX Transform

- [New JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

```js
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

```js
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

#### Stateless component

采用函数型声明, 不使用 setState(), 一般作为表现型组件

#### Stateful component

- 采用类型声明, 使用 setState(), 一般作为容器型组件(containers)
- 结合 Redux 中的 connect 方法, 将 store 中的 state 作为此类组件的 props

```jsx
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment,
}));
```

### Component Lifecycle

- reconciliation stage:
  constructor, getDerivedStateFromProps, getDerivedStateFromError,
  shouldComponentUpdate, render.
- commit stage:
  componentDidMount, getSnapshotBeforeUpdate, componentDidUpdate,
  componentWillUnmount, componentDidCatch.

因为协调阶段可能被中断、恢复，甚至重做,
React 协调阶段的生命周期钩子可能会被调用多次,
协调阶段的生命周期钩子不要包含副作用

#### Creation and Mounting Stage

constructor(props, context) -> getDerivedStateFromProps() -> render() -> componentDidMount()

#### Updating Stage

update for three reasons:

- parent/top (re-)render
- this.setState() called
- this.forceUpdate() called

getDerivedStateFromProps() -> shouldComponentUpdate(nextProps, nextState)
-> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate(prevProps, prevState)

getSnapshotBeforeUpdate:
在最新的渲染输出提交给 DOM 前将会立即调用,
这对于从 DOM 捕获信息（比如：滚动位置）很有用.

#### Unmounting Stage

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

```jsx
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

```jsx
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

```jsx
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
            {!isLast && <div style={{ marginRight: '5px' }}>></div>}
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

```jsx
function commitAttachRef(finishedWork: Fiber) {
  // finishedWork 为含有 Ref effectTag 的 fiber
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

- 尽可能不适用 `String Refs`
- React 无法获取 `this` 引用, 需要持续追踪当前`render`出的组件, 性能变慢

```jsx
class Foo extends Component {
  render() {
    return <input onClick={() => this.action()} ref="input" />;
  }
  action() {
    console.log(this.refs.input.value);
  }
}
```

```jsx
class App extends React.Component {
  renderRow = index => {
    // ref 会绑定到 DataTable 组件实例, 而不是 App 组件实例上
    return <input ref={'input-' + index} />;

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

```jsx
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

```jsx
class UserInput extends Component {
  setSearchInput = (input) => {
    this.input = input;
  }

  render () {
    return (
      <input
        type='text'
        ref={this.setSearchInput} /> // Access DOM input in handle submit
      <button type='submit'>Submit</button>
    );
  }
}
```

### Compound Components

[Compound components example](https://dev.to/alexi_be3/react-component-patterns-49ho):

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

## React Synthetic Events

- React 16: delegate events handlers on `document` node.
- React 17: delegate events handlers on `app` root node.

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

```jsx
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

```jsx
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

```jsx
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

```jsx
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

### Hooks Internal

- useXXX -> mountXXX -> updateXXX.
- mountXXX: mountWorkInProgressHook -> separated creation logic.
- updateXXX: updateWorkInProgressHook -> separated update logic.
- `hooks` 的值都存在组件的 `fiberNode` 的 `memorizedState` 属性上.

```js
function mountWorkInProgressHook() {
  // hook 实例
  const hook = {
    // hook 保存的数据.
    memoizedState: null,
    // 指向下一个 hook.
    next: hookForB,
    // 本次更新以 baseState 为基础计算新的 state.
    baseState: null,
    // 本次更新开始时已有的 update 队列.
    baseQueue: null,
    // 本次更新需要增加的 update 队列.
    queue: null,
  };

  if (workInProgressHook === null) {
    // Fist hook in the list.
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of list.
    workInProgressHook = workInProgressHook.next = hook;
  }
}
```

| Hooks       | Memoized State                                 |
| ----------- | ---------------------------------------------- |
| useRef      | `ref: { current }`                             |
| useMemo     | `[nextValue, deps]`                            |
| useCallback | `[callback, deps]`                             |
| useState    | `state`                                        |
| useEffect   | `effect: { tag, create, destroy, deps, next }` |

```js
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

```js
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

```js
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

### UseMemo Hook

- Returns a memoized value.
- Only recompute the memoized value when one of the dependencies has changed.
- **Shallow compare** diff.
- **Optimization** helps to
  avoid expensive calculations on every render
  (avoid re-render problem).

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

```jsx
const Button = ({ color, children }) => {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ Don’t recalculate until `color` changes
  );

  return (
    <button className={'Button-' + color + ' Button-text-' + textColor}>
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

```jsx
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
    // ... Fetch data and return it ...
  }, [query]); // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />;
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

### UseState Hook

- read rendered props/state
- return value of `useState` is `ref` to `hooks[idx]`:
  direct change to return value doesn't change state value
- return function of `useState` (`setState`) is to change value of `hooks[idx]`
- 由于 setState 更新状态 (dispatch action) 时基于 hook.BaseState,
  `setState(value + 1)` 与 `setState(value => value + 1)` 存在差异
- 当在 useEffect 中调用 setState 时, 最好使用 `setState(callback)` 形式,
  这样可以不用再 Deps List 中显式声明 state, 也可以避免一些 BUG

```ts
function mountState<T>(initialState: T) {
  const hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

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
  return [hook.memoizedState, dispatch];
}

function updateState<T>(initialState: T) {
  return updateReducer(basicStateReducer);
}
```

```js
setState(prevState => {
  // Object.assign would also work
  return { ...prevState, ...updatedValues };
});
```

```js
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

```jsx
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

```jsx
import { useState, useEffect } from 'react';

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

```jsx
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

const [state, dispatch] = useReducer(reducer, initialState);
```

### UseRef Hook

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

```jsx
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
}
```

#### Refs Update Mechanism

- Update a `ref`, no re-renderings happens.
- Update a `state`, the deep rendering mechanism works to re-render components.
- Store values in refs and have them updated,
  which is more **efficient** than `useState` (which can be expensive)
  when the values are to be updated multiple times within a second.

```jsx
function UserAvatar(props) {
  return <img src={props.src} />;
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

```jsx
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

[Complete Guide](https://overreacted.io/a-complete-guide-to-useeffect)

Circular effect list:

```js
function mountEffect(fiberFlags, hookFlags, create, deps) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HasEffect | hookFlags,
    create,
    undefined,
    nextDeps
  );
}

function updateEffect(fiberFlags, hookFlags, create, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;

    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;

      if (areHookInputsEqual(nextDeps, prevDeps)) {
        pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }

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
    create,
    destroy,
    deps,
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
3. React runs the effect for current props/state.

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

```jsx
// https://www.robinwieruch.de/react-hooks-fetch-data
import { useState, useEffect } from 'react';
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

#### Closure in UseEffect

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

```jsx
// BUG
function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1); // always 1 regardless `count` value change
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

```jsx
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

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

#### UseEffect State vs Class State

- 如同 `Closure in useEffect`, 每次调用 useEffect 时,
  会捕获那一次 render 时的 props 和 state.
- Class Component 中的 this.state.xxx 却总是指向最新的 state.

```jsx
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

```jsx
componentDidUpdate() {
  setTimeout(() => {
    console.log(`You clicked ${this.state.count} times`);
  }, 3000);
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

### UseLayoutEffect Hook

`useLayoutEffect` callback called **synchronously**
(fires synchronously after all DOM mutations),
substitute for `componentDidMount` lifecycle function.

If need to mutate the DOM or do need to perform DOM measurements,
`useLayoutEffect` is better than `useEffect`.

### UseInsertionEffect Hook

Allows CSS-in-JS libraries to address performance
issues of injecting styles in render.
This hook will run after the DOM is mutated,
but before layout effects read the new layout.

```js
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

```jsx
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

Debounce:

```js
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

```js
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

Allows external stores to support concurrent reads
by forcing updates to the store to be synchronous.

```js
import { useSyncExternalStore } from 'react';

// We will also publish a backwards compatible shim
// It will prefer the native API, when available
import { useSyncExternalStore } from 'use-sync-external-store/shim';

function App() {
  // Basic usage. getSnapshot must return a cached/memoized result
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  // Selecting a specific field using an inline getSnapshot
  const selectedField = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot().selectedField
  );
}
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

componentDidMount: `useLayoutEffect`.
`useEffect` got invoked after `componentDidMount`.

```jsx
const useMount = fn => {
  useEffect(() => void fn(), []);
};
```

componentWillUnmount

```jsx
const useUnmount = fn => {
  useEffect(() => fn, []);
};
```

componentDidUpdate

```jsx
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

Force Update

```jsx
const useUpdate = () => useState(0)[1];
```

```jsx
// @ts-ignore
import { useState } from 'react';

interface VoidFunction {
  (): void;
}

interface VoidFunctionCreator {
  (): VoidFunction;
}

const max: number = 9007199254740990; // Number.MAX_SAFE_INTEGER - 1;

const useForceUpdate: VoidFunctionCreator = (): VoidFunction => {
  const [, setState] = useState(0);
  const forceUpdate: VoidFunction = (): void => {
    setState((state: number) => (state + 1) % max);
  };
  return forceUpdate;
};

export default useForceUpdate;
```

isMounted

```jsx
const useIsMounted = () => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
    return () => setIsMount(false);
  }, []);

  return isMount;
};
```

### Custom Async Data Hook

- `useState` to store url and data
- `useEffect` to trigger async `fetch` actions

```jsx
import { useState, useEffect } from 'react';

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

```jsx
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, [url]);

  const doGet = (event, url) => {
    setUrl(url);
    event.preventDefault();
  };

  return { data, isLoading, isError, doGet };
};

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

```jsx
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

```jsx
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

// Usage
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  ...
}, [debouncedSearchTerm]);
```

### Custom EventListener Hook

```js
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

```js
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

### Custom Router Hook

```jsx
import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
import useForceUpdate from 'use-force-update';

const useReactRouter = () => {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);

  useEffect(() => routerContext.history.listen(forceUpdate), [routerContext]);

  return routerContext;
};
```

### Custom History Hook

```jsx
import { useReducer, useCallback } from 'react';

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
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case 'SET':
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case 'CLEAR':
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent,
      };
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
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(
    newPresent => dispatch({ type: 'SET', newPresent }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: 'CLEAR', initialPresent }),
    [dispatch]
  );

  // If needed we could also return past and future state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
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

```jsx
let cachedScripts = [];

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
        let script = document.createElement('script');
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

### Custom Media Query Hook

```tsx
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

### Custom Form Hook

```jsx
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

```jsx
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
  const fields = [];

  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (fieldNames instanceof Array) {
      fieldsToValidate = fields.filter(field =>
        fieldNames.includes(field.name)
      );
    } else {
      //if fieldNames not provided, validate all fields
      fieldsToValidate = fields;
    }
    const fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    return fieldsValid.every(Boolean);
  };

  const getFormData = () => {
    return fields.reduce((formData, f) => {
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
    isValid: () => fields.every(f => f.errors.length === 0),
    addField: field => fields.push(field),
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
        //Simulate 400 response from server
        usernameField.setErrors(['Make a longer username']);
      } else {
        //Simulate 201 response from server
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

### Custom Store Hook

Simple implementation:

```js
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
  collected: any;
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

```jsx
// ✅ Not affected by the data flow
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
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

```jsx
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- setting displayName for HOC

```jsx
// bad
export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```

### Props Style

- use `prop` not `prop={true}`
- filter out unnecessary props

```jsx
// bad
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...this.props} />
}

// good
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...relevantProps} />
}
```

### Refs Style

- use callback refs

```jsx
// bad
// deprecated
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```

### Alignment Style

```jsx
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Bar />
</Foo>

// bad
{showButton &&
  <Button />
}

// bad
{
  showButton &&
    <Button />
}

// good
{showButton && (
  <Button />
)}

// good
{showButton && <Button />}
```

### Quotes Style

- use `"` for JSX attributes, use `'` for all other JS

```jsx
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### Spacing Style

- a single space in self-closing tag
- no pad JSX curly spaces

```jsx
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

```jsx
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
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

```jsx
constructor() {
  this.handle = this.handle.bind(this);
}

handle(e) {
  this.setState({
    ...
  });
}
```

```jsx
state = {};
handle = e => {};
```

### Lazy and Suspense

```jsx
import React, { lazy, Suspense } from 'react';

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

```jsx
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

```jsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { fakeAuth } from './app/services/auth';

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = cb => {
    return fakeAuth.signIn(() => {
      setUser('user');
      cb();
    });
  };

  const signOut = cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

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

```jsx
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

```jsx
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

```jsx
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
      error: error,
      info: info,
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

```jsx
class Items extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Fruit />
        <Beverages />
        <Drinks />
      </React.Fragment>
    )
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
    )
  }
}

class Frameworks extends React.Component {
  render () {
    return (
      [
        <p>JavaScript:</p>
        <li>React</li>,
        <li>Vuejs</li>,
        <li>Angular</li>
      ]
    )
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

```jsx
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

### Concurrent Mode

```js
import * as ReactDOM from 'react-dom';
import App from 'App';

// Create a root by using ReactDOM.createRoot():
const root = ReactDOM.createRoot(document.getElementById('app'));

// Render the main <App/> element to the root:
root.render(<App />);
```

Automatic batching in promises, async code and native event handlers:

```js
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

### Batching Updates

All updates will be automatically batched,
including updates inside of
**timeouts, promises, native event handlers**:

```js
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18+ will only re-render once at the end (that's batching!)
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18+ will only re-render once at the end (that's batching!)
}, 1000);
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
- Immutable.js.
- Isomorphic rendering.
- Webpack bundle analyzer.
- [Progressive React](https://houssein.me/progressive-react).

### Re-rendering Problem

React will recursively render **all child components** inside of it
(because `props.children` is always a new reference when parent re-rendering).

The major difference is that
`React.Component` doesn’t implement `shouldComponentUpdate()` lifecycle method
while `React.PureComponent` implements it.

If component `render()` function renders
the same result given the same props and state,
use `React.PureComponent`/`React.memo` for a performance boost in some cases.

```jsx
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

```jsx
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

- shouldComponentUpdate
- React.PureComponent: **shallow compare** diff
- React.memo: **shallow compare** diff,
  to memorize stateless components that **props not changed often**,
  `export default React.memo(MyComponent, areEqual)`.
- memorized values
- memorized event handlers
- 在用`memo`或者`useMemo`做优化前
  ([Before You Memo](https://overreacted.io/before-you-memo/)),
  可以从不变的部分里分割出变化的部分.
  通过将变化部分的`state`向下移动从而抽象出变化的子组件,
  或者将变化内容提升到父组件从而将不变部分独立出来:

```jsx
// BAD
import { useState } from 'react';

export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={e => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}

function ExpensiveTree() {
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  return <p>I am a very slow component tree.</p>;
}
```

```jsx
// GOOD
export default function App() {
  return (
    <>
      <Form />
      <ExpensiveTree />
    </>
  );
}

function Form() {
  let [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={e => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}
```

```jsx
// GOOD
export default function App() {
  return (
    <ColorPicker>
      <p>Hello, world!</p>
      <ExpensiveTree />
    </ColorPicker>
  );
}

function ColorPicker({ children }) {
  let [color, setColor] = useState('red');
  return (
    <div style={{ color }}>
      <input value={color} onChange={e => setColor(e.target.value)} />
      {children}
    </div>
  );
}
```

```jsx
// BAD
function App(items) {
  return <BigListComponent style={{ width: '100%' }} items={items} />;
}

// GOOD
const bigListStyle = { width: '100%' };

function App(items) {
  return <BigListComponent style={bigListStyle} items={items} />;
}
```

```jsx
// BAD: Inline function
function App(items) {
  return <BigListComponent onClick={() => dispatchEvent()} />;
}

// GOOD: Reference to a function
const clickHandler = () => dispatchEvent();

function App(items) {
  return <BigListComponent onClick={clickHandler} />;
}
```

### Code Splitting

```jsx
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

```jsx
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

```jsx
module.exports = [
  webConfig,
  nodeConfig,
];

const webConfig = {}
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
```

`start.server.js`:

```jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App.js';

export default () => ReactDOMServer.renderToString(<App />);
```

index.html.js

```jsx
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

```jsx
import React from 'react';
import ReactDOMServer from 'react-dom';
import App from './App.js';

ReactDOM.hydrate(<App />, document.getElementById('app'));
```

Async fetch out of `<App />`:

```jsx
const data = await fetchData();
const app = <App {...data} />

return {
  html: ReactDOMServer.renderToString(app);
  state: { data }
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

- Unnecessary addition of children (hide some run-time error).
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

```tsx
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
  return <const>{
    type: 'UPDATE_NAME',
    name,
  };
}

export function addPoints(points: number) {
  return <const>{
    type: 'ADD_POINTS',
    points,
  };
}

export function setLikesGames(value: boolean) {
  return <const>{
    type: 'SET_LIKES_GAMES',
    value,
  };
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
  setUser(newUser);
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

## Testing

- [Jest and Enzyme snapshots testing](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675).
- [Cypress: E2E testing framework](https://github.com/cypress-io/cypress).
- [GitHub CI for UI testing](https://storybook.js.org/blog/how-to-automate-ui-tests-with-github-actions).
- [React testing tutorial](https://www.robinwieruch.de/react-testing-tutorial).

### Shallow Renderer

浅层渲染 (Shallow Renderer) 对于在 React 中编写单元测试用例很有用.
它允许渲染一个一级深的组件并断言其渲染方法返回的内容, 而不必担心子组件未实例化或渲染.

```jsx
function MyComponent() {
  return (
    <div>
      <span className={'heading'}>{'Title'}</span>
      <span className={'description'}>{'Description'}</span>
    </div>
  );
}
```

```jsx
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

```jsx
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

### Enzyme

```bash
npm install --save-dev enzyme enzyme-adapter-react-16
```

```jsx
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

## Create React App

- [Custom React Scripts](https://auth0.com/blog/how-to-configure-create-react-app/)

```jsx
npx create-react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
npm init react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
```

### Create React APP CLI

`createReactApp.js`:

`init` -> commander setup -> `createApp()`
-> process CLI args -> `run()`
-> process `react-scripts@version` and `cra-template-xxx@version`
-> install `react`, `react-dom`, `react-scripts` and `cra-template-xxx`
-> invoke `react-scripts init` for further process.

### React Scripts

#### React Scripts Initialization

Initialization in `react-scripts/scripts/init.js`:

- 可以用于改变默认 registry

```jsx
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

- `start.js` for `react-scripts start`
- `build.js` for `react-scripts build`
- `test.js` for `react-scripts test`
- `eject.js` for `react-scripts eject`

##### React Scripts Start

When develop `react-scripts` locally
with `react-scripts start`,
it will use `templatePath` located in
`react-scripts/config/paths.js`
to find local template.

#### React Scripts Configuration

Config in `react-scripts/config/` directory:

- `env.js`: static environment variables
- `getHttpsConfig.js`: get HTTPS(SSL) config
- `modules.js`: locale modules webpack alias with `baseUrl`
- `paths.js`: configurable paths variables (most for Webpack config)
- `webpackDevServer.config.js`: Webpack Dev Server configuration
- `webpack.config.js`: Webpack configuration
  (paths, deps/devDeps, plugins, loader rules etc.)

```jsx
// add support for Ant Design UI
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    plugins: [
      [
        require.resolve('babel-plugin-import'),
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css",
        },
      ],
    ],
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
  },
}
```

```jsx
// add Webpack bundle analyzer plugin
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

{
  plugins: [
    isEnvDevelopment &&
      new BundleAnalyzerPlugin({
        analyzerPort: 5000,
      }),
  ];
}
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

```jsx
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
- Use `path={`${process.env.PUBLIC_URL}/about`}`
  in `Routes.js` when using `react-router-dom`.
- Or use `basename` for `react-router@^4`.

```jsx
// renders <a href="/calendar/today">
<BrowserRouter basename="/calendar">
  <Link to="/today" />
</BrowserRouter>
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

- custom `packages/cra-template-*`: change HTML/CSS/JS boilerplate.
- custom `packages/react-scripts/config/`:
  change paths, deps/devDeps, plugins, loader rules etc.
- custom `packages/react-scripts/scripts/`: change react-scripts CLI behaviors.

#### Other Packages in CRA Repo

- `babel-preset-react-app`: babel preset configuration
- `cra-template`/`cra-template-typescript`: CRA default templates
- `eslint-config-react-app`: eslint configuration
- `react-app-polyfill`: polyfills for various browsers
- `react-dev-utils`: most utility functions
  for paths, helpers, middleware, and webpack plugins.

#### Custom React Scripts

In `Create React App`
[code](https://github.com/facebook/create-react-app/blob/main/packages/create-react-app/createReactApp.js):

```js
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

```js
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

```jsx
// locale/zh-CN.js
export default ({
   hello: '你好，{name}'
});

// locale/en-US.js
export default ({
   hello: 'Hello，{name}'
}) ;
```

```jsx
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

### Styled Basic Usage

#### Shared CSS Styles

```jsx
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

#### Extend Styled Component

```jsx
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

#### Props for Styled Component

```jsx
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

## Framework Paradigm

- full-featured frameworks vs composing micro-libs
- JSX vs templates

> Evan You on Vue.js: Seeking the Balance in Framework Design | JSConf.Asia 2019

- functional vs imperative
- immutable vs mutable
- referential equality testing vs change tracking

> 打破框架的范式之争, 其实是改变思路. 从思考不同范式之间的竞争关系, 转变成思考多个范式之间的协同关系.
> useRef in React, Composition in Vue

### Third-party Libraries Usage

- Look for Libraries that Have Accessibility Built in.
- Limit the Number of Third-party Libraries Use.
- Wrap Third-party Dependencies:

```jsx
import { DatePicker as LibraryXDatePicker } from 'LibraryX';

const DatePicker = props => {
  return <LibraryXDatePicker {...props} />;
};

export default DatePicker;
```

### MVC and MVVM

#### Controller

- 处理请求的参数
- 渲染和重定向
- 选择 Model 和 Service
- 处理 Session 和 Cookies

### Framework Paradigm Comparison

- 初始渲染: Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新: 依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新: 脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化
- Angular: 脏检查, React: Virtual DOM, Vue: Watch.

### Framework Paradigm Reference

- Even You presentation on [JSConf Asia 2019](https://www.youtube.com/watch?v=ANtSWq-zI0s).
- Framework paradigm [guide](https://mp.weixin.qq.com/s/mZ7KuFjyCWNCAq7HnXg96A).

### Micro Frontend

通过 `single-spa` 包装的主应用是一个基座,
它提供相应的协议,
子应用按照协议进行包装就可以接入主应用.
主应用就像插座,
子应用就像不同的电器,
只要遵循某种协议就可以轻松实现可插拔操作.

`single-spa` 子项目的的挂载、更新、卸载等操作,
并不是 `single-spa` 原生提供的,
用户可以根据自己的需要来自行实现子应用的挂载, 卸载及更新等逻辑.
`single-spa` 通过 `reroute` 和路由控制来调用子应用.
在 `single-spa` 的开发过程中,
需要自己手动去写调用子应用的方法.

#### Application EntryPoint

- HTML Entry.
- JavaScript Entry.

#### Styles Isolation

- Shadow DOM container.
- CSS scoped / CSS selector renaming.

#### Scripts Isolation

- Runtime sandbox.
- `window` proxy.

#### Application Communication

- Pub-Sub Pattern.
- Callback registration.

## Interviews

- [React Interview Questions](https://github.com/semlinker/reactjs-interview-questions)
