---
layout: post
title: 'React Basic Notes'
subtitle: 'Be a Stupid Learner'
date: 2018-01-3
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - Frontend Development
  - Web Development
  - JavaScript
  - React
---

# React Basic Notes

## Core of React

### React Fiber

- [A Simple React with Fiber Reconciliation](https://github.com/sabertazimi/meactjs)

React Fiber 的目标是提高其在动画、布局和手势等领域的适用性.
它的主要特性是`Incremental Rendering`: 将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力.

#### React Fiber Metadata

[Fiber](https://github.com/facebook/react/blob/v17.0.0/packages/react-reconciler/src/ReactInternalTypes.js):

- Component type.
- Current props and state.
- Pointers to parent, sibling, and child components.
- Other internal metadata to track rendering process.

### React Render Stage

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

### React Commit Stage

#### Before Mutation Stage

#### Mutation Stage

- `Placement` effects: `DOM.appendChild` called.

#### Layout Stage

- `componentDidMount` lifecycle function called **synchronously**.
- `useLayoutEffect` callback called **synchronously**.

#### useEffect Execution Time

`useEffect` callback called **asynchronously**
after three stages of `Commit`.

## Props and State

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

```js
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

```js
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
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
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
          {items.map((item) => (
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

```js
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

```js
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

```js
<component /> 将被转换为 React.createElement('component') (i.e, HTML 标签)
<obj.component /> 将被转换为 React.createElement(obj.component)
<Component /> 将被转换为 React.createElement(Component)
```

### Functional and Class component

- 函数型组件没有实例, 类型组件具有实例, 但实例化的工作由 react 自动完成
- class component 具有更多特性: state, lifecycle hook, performance optimizations(shouldComponentUpdate()回调方法)

### Stateless and Stateful component

#### Stateless component

采用函数型声明, 不使用 setState(), 一般作为表现型组件

#### Stateful component

- 采用类型声明, 使用 setState(), 一般作为容器型组件(containers)
- 结合 Redux 中的 connect 方法, 将 store 中的 state 作为此类组件的 props

```js
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
  React will recursively render all child components inside of it
  (because `props.children` is always a new reference when parent re-rendering).
- Render logic:
  - Can't mutate existing variables and objects.
  - Can't create random values like `Math.random()` or `Date.now()`.
  - Can't make network requests.
  - Can't queue state updates.

### Refs

Refs 用于返回对元素的引用.
但在大多数情况下, 应该避免使用它们.
当需要直接访问 DOM 元素或组件的实例时, 它们可能非常有用:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.k

`Ref` 通过将 Fiber 树中的 `instance` 赋给 `ref.current` 实现

```js
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

#### String Refs

- 尽可能不适用 `String Refs`
- React 无法获取 `this` 引用, 需要持续追踪当前`render`出的组件, 性能变慢

```js
class Foo extends Component {
  render() {
    return <input onClick={() => this.action()} ref="input" />;
  }
  action() {
    console.log(this.refs.input.value);
  }
}
```

```js
class App extends React.Component {
  renderRow = (index) => {
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

你不能在函数式组件上使用`ref`属性,
因为它们没有实例, 但可以在函数式组件内部使用`ref`.
Ref forwarding 是一个特性,
它允许一些组件获取接收到 ref 对象并将它进一步传递给子组件.

```js
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

#### Callback Refs

```js
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

### HOC (Higher-Order Components)

Solve:

- reuse code with using ES6 classes
- compose multiple HOCs

Pros:

- reusable (abstract same logic)
- HOC is flexible with input data
  (pass input data as parameters or derive it from props)

Cons:

- wrapper hell: `withA(withB(withC(withD(Comp))))`
- indirection issues: which HOC providing a certain prop
- name collision/overlap props: overwrite the same name prop silently
- HOC is not flexible with output data (to WrappedComponent)

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
      this.setState((prevState) => ({ show: !prevState.show }));
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

### Render Props (Children as Function)

Solve:

- reuse code with using ES6 classes
- lowest level of indirection
- no naming collision

e.g `Context` or `ThemesProvider` is designed base on Render Props.

Pros:

- separate presentation from logic
- extendable
- reusable (abstract same logic)
- Render Props is flexible with output data
  (children parameters definition free)

Cons:

- wrapper hell (when many cross-cutting concerns are applied to a component)
- minor memory issues when defining a closure for every render
- unable to optimize code with `React.memo`/`React.PureComponent`
  due to `render()` function always changes.
- Render Props is not flexible with input data
  (restricts children components from using the data at outside field)

```jsx
class Toggleable extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = { show: false };
  }

  toggle() {
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  render() {
    return this.props.children(this.state.show, this.toggle);
  }
}

const ToggleableMenu = (props) => (
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

## Hooks

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

```js
// hook 实例
const hook = {
  // hook保存的数据
  memoizedState: null,
  // 指向下一个hook
  next: hookForB
  // 本次更新以 baseState 为基础计算新的state
  baseState: null,
  // 本次更新开始时已有的 update 队列
  baseQueue: null,
  // 本次更新需要增加的 update 队列
  queue: null,
};
```

### useMemo

- returns a memoized value
- only recompute the memoized value when one of the dependencies has changed
- **shallow compare** diff
- **optimization** helps to
  avoid expensive calculations on every render
  (avoid re-render problem)

```js
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

### useCallback

- returns a memoized callback
- 对事件句柄进行缓存, `useState` 的第二个返回值是 `dispatch`,
  但是每次都是返回新的函数, 使用 `useCallback`, 可以让它使用上次的函数.
  在虚拟 DOM 更新过程中, 如果事件句柄相同, 那么就不用每次都进行
  `removeEventListener` 与 `addEventListener`.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`

```js
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

### useState

- read rendered props/state
- return value of `useState` is `ref` to `hooks[idx]`:
  direct change to return value doesn't change state value
- return function of `useState` (`setState`) is to change value of `hooks[idx]`
- 由于 setState 更新状态 (dispatch action) 时基于 hook.BaseState,
  `setState(value + 1)` 与 `setState(value => value + 1)` 存在差异
- 当在 useEffect 中调用 setState 时, 最好使用 `setState(callback)` 形式,
  这样可以不用再 Deps List 中显式声明 state, 也可以避免一些 BUG

```js
setState((prevState) => {
  // Object.assign would also work
  return { ...prevState, ...updatedValues };
});
```

```js
let newState = baseState;
let firstUpdate = hook.baseQueue.next;
let update = firstUpdate;

// setState(value + 1) 与 setState(value => value + 1) 存在差异
// 遍历 baseQueue 中的每一个 update
do {
  if (typeof update.action === 'function') {
    newState = update.action(newState);
  } else {
    newState = action;
  }
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

### useReducer

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

```js
const insertToHistory = (state) => {
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

### useRef

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

```js
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

### useEffect

[Complete Guide](https://overreacted.io/a-complete-guide-to-useeffect)

#### useEffect Lifecycle

1. React renders UI for current props/state to screen.
2. React cleans up the effect for prev props/state.
3. React runs the effect for current props/state.

#### useEffect Nasty Loop

The effect hook runs when the component `mounts`
but also when the component `updates`.
Because we are setting the state after every data fetch,
the component updates and the effect runs again.
It fetches the data again and again.
That’s a bug and needs to be avoided.

#### useEffect Deps List

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

```js
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

  const doFetch = (url) => {
    setUrl(url);
  };

  return { data, isLoading, isError, doFetch };
};
```

#### Closure in useEffect

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

```js
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

```js
function Counter() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

#### useEffect State vs Class State

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

```js
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

### Hooks Usage Rules

- only call Hooks at the top level (don't inside loops, conditions or nested functions)
- only call Hooks from React function components

### Hooks Internal

```js
const MyReact = (function () {
  let hooks = [],
    currentHook = 0; // array of hooks, and an iterator!
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
      const setState = (newState) => (hooks[setStateHookIndex] = newState);
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
    type: (txt) => setText(txt),
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
    type: (txt) => setText(txt),
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

### Custom Hooks

- [More Custom Hooks](https://usehooks.com)

#### LifeCycle Hooks

componentDidMount: `useLayoutEffect`.
`useEffect` got invoked after `componentDidMount`.

```js
const useMount = (fn) => {
  useEffect(() => void fn(), []);
};
```

componentWillUnmount

```js
const useUnmount = (fn) => {
  useEffect(() => fn, []);
};
```

componentDidUpdate

```js
const useUpdate = (fn) => {
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

```js
const useUpdate = () => useState(0)[1];
```

```js
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

```js
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

#### Async Data Hook

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
        onSubmit={(event) =>
          doGet(event, `http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
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

#### Reducer Hook

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

#### Previous Hook

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

#### Store Hook

```js
import { useState } from 'react';

export const store = {
  state: {},
  setState(value) {
    this.state = value;
    this.setters.forEach((setter) => setter(this.state));
  },
  setters: [],
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store);

// this is the custom hook we'll call on components.
export function useStore() {
  const [state, set] = useState(store.state);

  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  return [state, store.setState];
}
```

#### History Hook

```js
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
const useHistory = (initialPresent) => {
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
    (newPresent) => dispatch({ type: 'SET', newPresent }),
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

#### Debounce Hook

```js
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

#### Context Hook

一般都不会裸露地使用 Context.Provider, 而是封装为独立的 Provider 组件,
将子组件作为 props.children 传入, 这样当 Context 变化时 Provider 不会重新渲染它的子组件,
由依赖了 context 的子组件自己进行重渲染, 未依赖的子组件不会重新渲染.
使用 `useMemo` 使得 value 不会重复创建.

```js
import React from 'react';

const CountContext = React.createContext();

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = React.useMemo(() => {
    return {
      count,
      setCount,
    };
  }, [count]);
  return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  const { count, setCount } = context;
  const increment = () => setCount((c) => c + 1);
  return {
    count,
    increment,
  };
}

export { CountProvider, useCount };
```

#### Router Hook

```js
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

#### Script Loading Hook

```js
// Hook
let cachedScripts = [];

const useScript = (src) => {
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

#### Form Hook

```js
import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
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
  let [value, setValue] = useState(defaultValue);
  let [errors, setErrors] = useState([]);
  let [pristine, setPristine] = useState(true);
  let [validating, setValidating] = useState(false);
  let validateCounter = useRef(0);

  const validate = async () => {
    let validateIteration = ++validateCounter.current;
    setValidating(true);
    let formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map((validation) => validation(formData, name))
    );
    errorMessages = errorMessages.filter((errorMsg) => !!errorMsg);
    if (validateIteration === validateCounter.current) {
      // this is the most recent invocation
      setErrors(errorMessages);
      setValidating(false);
    }
    let fieldValid = errorMessages.length === 0;
    return fieldValid;
  };

  useEffect(() => {
    if (pristine) return; // Avoid validate on mount
    form.validateFields(fieldsToValidateOnChange);
  }, [value]);

  let field = {
    name,
    value,
    errors,
    setErrors,
    pristine,
    onChange: (e) => {
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
  let [submitted, setSubmitted] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let fields = [];

  const validateFields = async (fieldNames) => {
    let fieldsToValidate;
    if (fieldNames instanceof Array) {
      fieldsToValidate = fields.filter((field) =>
        fieldNames.includes(field.name)
      );
    } else {
      //if fieldNames not provided, validate all fields
      fieldsToValidate = fields;
    }
    let fieldsValid = await Promise.all(
      fieldsToValidate.map((field) => field.validate())
    );
    let formValid = fieldsValid.every((isValid) => isValid === true);
    return formValid;
  };

  const getFormData = () => {
    return fields.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async (e) => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true); // User has attempted to submit form at least once
      let formValid = await validateFields();
      let returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.every((f) => f.errors.length === 0),
    addField: (field) => fields.push(field),
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
  let showErrors = (!pristine || formSubmitted) && !!errors.length;
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
          errors.map((errorMsg) => <div key={errorMsg}>{errorMsg}</div>)}
      </FormHelperText>
    </FormControl>
  );
};

const App = (props) => {
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
      async (formData) => {
        await timeout(2000);
        return formData.username.length < 6 && 'Username already exists';
      },
    ],
    fieldsToValidateOnChange: [],
  });
  const passwordField = useField('password', form, {
    defaultValue: '',
    validations: [
      (formData) =>
        formData.password.length < 6 &&
        'Password must be at least 6 characters',
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword'],
  });
  const confirmPasswordField = useField('confirmPassword', form, {
    defaultValue: '',
    validations: [
      (formData) =>
        formData.password !== formData.confirmPassword &&
        'Passwords do not match',
    ],
    fieldsToValidateOnChange: ['password', 'confirmPassword'],
  });

  let requiredFields = [usernameField, passwordField, confirmPasswordField];

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
            requiredFields.some((f) => f.pristine)
          }
        >
          {form.submitting ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};
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

```js
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

## ES6 Syntax

### Comments

```jsx
render() {
  {/* */}
  {/*

  */}
}
```

### Binding for This

```js
constructor() {
  this.handle = this.handle.bind(this);
}

handle(e) {
  this.setState({
    ...
  });
}
```

```js
state = {};
handle = (e) => {};
```

## React Style Guide

### Naming Style

- use PascalCase for `.jsx` and component constructor
- use camelCase for component instance reference
- use camelCase for props name

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

## MVC and MVVM

### Controller

- 处理请求的参数
- 渲染和重定向
- 选择 Model 和 Service
- 处理 Session 和 Cookies

### Comparison

- 初始渲染: Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新: 依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新: 脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

### Best Practice

- 组件细分化
- 组件
  - 只传入必要的 props
  - 使用 Immutable.js 或者 react.addons.update 实现不可变数据结构
  - 结合 React.addons.PureRenderMixin 来减少 reRender
- 在 shouldComponentUpdate 中优化组件减少 reRender
- 使用 context
- 少做 dom 操作，始终让 UI 能够基于 State 还原
- 在 store 和 action 中不 dom 操作或者访问 window.属性，只与数据打交道
- 推荐使用 ES6
- npm 的 debug 包, log 组件渲染的每个步骤和动作
- [Single Element Pattern](https://github.com/diegohaz/singel)

## Modern React

### Lazy and Suspense

```js
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

```js
const { lazy, Suspense } = React;

const Lazy = lazy(
  () =>
    new Promise((resolve) => {
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

```js
function contextWrapper(WrappedComponent, Context) {
  return class extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {(context) => <WrappedComponent context={context} {...this.props} />}
        </Context.Consumer>
      );
    }
  };
}
```

#### Ref with Context

```js
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
  onInput = (e) => {
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

```js
// TextArea.jsx
import React from 'react';
import { Consumer } from './Context';

const TextArea = () => (
  <Consumer>
    {(context) => (
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

- 在事件处理器内
- setTimeout 或 requestAnimationFrame 回调中的异步代码
- 在服务端渲染期间
- 错误边界代码本身中引发错误时

```js
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

```js
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

## Portals

Portals provide a first-class way to render children into a DOM node
that exists **outside** the DOM hierarchy of the parent component
`ReactDOM.createPortal(child, container)`.

```html
<div id="root"></div>
<div id="portal"></div>
```

```js
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

## React Performance

- use `key` correctly
- `shouldComponentUpdate`
- `React.memo/React.useMemo/React.PureComponent`:
  **shallow compare** on components,
  to prevent unnecessary re-renders caused by parent components.
- `React.memo`: **shallow compare** diff
- stateless component
- Immutable.js
- Isomorphic rendering
- Webpack bundle analyzer
- [Progressive React](https://houssein.me/progressive-react)

### Re-rendering Problem

The major difference is that
React.Component doesn’t implement the shouldComponentUpdate() lifecycle method
while React.PureComponent implements it.
If component's render() function renders the same result
given the same props and state,
use React.PureComponent/React.memo for a performance boost in some cases.

```js
import React, { PureComponent } from 'react';

const Unstable = (props) => {
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

```js
import React, { Component } from 'react';

const Unstable = React.memo((props) => {
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
  to memorize stateless components that **props not changed often**.
- memorized values
- memorized event handlers
- 在用`memo`或者`useMemo`做优化前
  ([Before You Memo](https://overreacted.io/before-you-memo/)),
  可以从不变的部分里分割出变化的部分.
  通过将变化部分的`state`向下移动从而抽象出变化的子组件,
  或者将变化内容提升到父组件从而将不变部分独立出来:

```js
// BAD
import { useState } from 'react';

export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
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

```js
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
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}
```

```js
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
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}
```

```js
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

```js
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

```js
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

```js
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

#### Awesome Library

- [Next.js for Isomorphic rendering](https://nextjs.org)

### Basic Example

[presentation](http://peerigon.github.io/talks/2018-07-20-js-camp-barcelona-bumpy-road-universal-javascript/#1)

webpack config

```js
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

start.server.js

```js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App.js';

export default () => ReactDOMServer.renderToString(<App />);
```

index.html.js

```js
const startApp = require('../dist/server.js').default;

module.exports = () => `<!DOCTYPE html>
<head>
  ...
</head>
<body>
  <div id="app">${startApp()}</div>
  <script src="/static/client.js"></script>
</body>
</html>
```

start.client.js

```js
import React from 'react';
import ReactDOMServer from 'react-dom';
import App from './App.js';

ReactDOM.hydrate(<App />, document.getElementById('app'));
```

- async fetch out of `<App />`

```js
const data = await fetchData();
const app = <App {...data} />

return {
  html: ReactDOMServer.renderToString(app);
  state: { data }
};
```

### Internationalization

- [react-intl](https://github.com/alibaba/react-intl-universal)

#### Simple Intl

```js
// locale/zh.js
export default ({
   hello: '你好，{name}'
});

// locale/en.js
export default ({
   hello: 'Hello，{name}'
}) ;
```

```js
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

## Testing

- [Complete Tutorial](https://www.robinwieruch.de/react-testing-tutorial/#react-enzyme-test-setup)
- [Jest and Enzyme Snapshots Testing](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)
- [Cypress - Testing Framework](https://www.cypress.io/)

### Shallow Renderer

浅层渲染 (Shallow Renderer) 对于在 React 中编写单元测试用例很有用.
它允许渲染一个一级深的组件并断言其渲染方法返回的内容, 而不必担心子组件未实例化或渲染.

```js
function MyComponent() {
  return (
    <div>
      <span className={'heading'}>{'Title'}</span>
      <span className={'description'}>{'Description'}</span>
    </div>
  );
}
```

```js
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

```js
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

```js
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

```js
npx create-react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
npm init react-app app-name --scripts-version @sabertazimi/react-scripts --use-npm
```

### React Scripts

#### React Scripts Initialization

Initialization in `react-scripts/scripts/init.js`:

- 可以用于改变默认 registry

```js
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
  `appPackage.homepage`, `appPackage.dependencies`, `appPackage.scripts`,
  `appPackage.eslintConfig`, `appPackage.browser`.

#### React Scripts Commands

Locating in `react-scripts/scripts/`:

- `start.js` for `react-scripts start`

```js
// 增加关机提示信息
['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    console.log(chalk.cyan('Gracefully shutting down. Please wait...\n'));
    devServer.close();
    process.exit();
  });
});
```

- `build.js` for `react-scripts build`
- `test.js` for `react-scripts test`
- `eject.js` for `react-scripts eject`

#### React Scripts Configuration

Config in `react-scripts/config/` directory:

- `env.js`: static environment variables
- `getHttpsConfig.js`: get HTTPS(SSL) config
- `modules.js`: locale modules webpack alias with `baseUrl`
- `paths.js`: configurable paths variables (most for Webpack config)
- `webpackDevServer.config.js`: Webpack Dev Server configuration
- `webpack.config.js`: Webpack configuration
  (paths, deps/devDeps, plugins, loader rules etc.)

```js
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

```js
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

### Other Packages in CRA Repo

- `babel-preset-react-app`: babel preset configuration
- `cra-template`/`cra-template-typescript`: CRA default templates
- `eslint-config-react-app`: eslint configuration
- `react-app-polyfill`: polyfills for various browsers
- `react-dev-utils`: most utility functions
  for paths, helpers, middleware, and webpack plugins.

### Custom CRA

- custom `packages/cra-template-*`: change HTML/CSS/JS boilerplate.
- custom `packages/react-scripts/config/`:
  change paths, deps/devDeps, plugins, loader rules etc.
- custom `packages/react-scripts/scripts/`: change react-scripts CLI behaviors.

#### CRA Templates

HTML/CSS/JSX boilerplate in `react-scripts/template/` directory,
now Templates are always named in the format cra-template-[template-name]
in `packages/cra-template` and `packages/cra-template-typescript`.

```bash
npx create-react-app my-app --template [template-name]
```

### Deployment

- [Official Documentation](https://facebook.github.io/create-react-app/docs/deployment)
- [Deploy Subdirectory](https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1)

## Styled Component

### Basic Usage

#### Shared CSS Styles

```js
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

```js
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

```js
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
  ${(props) =>
    props.gray &&
    css`
      background-color: #95a5a6;
    `}
  // Using props to create a green variant of the button
  ${(props) =>
    props.green &&
    css`
      background-color: #2ecc71;
    `}
  // Using props to create a red variant of the button
  ${(props) =>
    props.red &&
    css`
      background-color: #e74c3c;
    `}
  // We can also use a ternary operator for "binary" changes
  color: ${(props) => (props.gray ? '#2c3e50' : '#fff')};
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

```js
import { DatePicker as LibraryXDatePicker } from 'LibraryX';

const DatePicker = (props) => {
  return <LibraryXDatePicker {...props} />;
};

export default DatePicker;
```

## Interviews

- [React Interview Questions](https://github.com/semlinker/reactjs-interview-questions)
