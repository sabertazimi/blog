---
layout: post
title: 'Redux Basic Notes'
subtitle: 'Be a Stupid Learner'
date: 2018-03-12
author: 'Sabertaz'
header-img: 'images/home-bg.jpg'
tags:
  - Redux
  - React
  - JavaScript
  - Frontend Development
  - Web Development
---

# Redux Basic Notes

## Basic Concepts

- 单一数据源: 整个应用程序的状态存储在单个对象树中 (容易跟踪/调试)
- 状态只读: 通过 dispatch(action) 间接更改状态, 不直接写入状态
- 纯函数更改状态: reducer(state, action) => newState

### Store and State

#### Store

Redux 中只有一个全局唯一 store 状态树, 且由 reducers 创建 store.

```js
export default appStore = createStore(rootReducers, initState);
```

#### State

在 Redux 中 State 并不显式定义:

- 初态与变化态皆由 Reducers 定义并控制
- Actions 中保存着 action.type 外, 还保存着供 Reducers 进行有效状态变化的其他信息(可自定义)
- 调用 Dispatch 方法自动向 Store 传递一个 Action(因为只有一个全局 Store, 故无需额外指定 Store 参数),
  Store 遍历调用其中的 Reducers, 根据 switch 语句进行匹配 action 处理
- reducer 只保存最基本的 state, 可计算出的 state 放在 mapStateToProps(selector) 中直接计算后绑定至 props
- 将数据保存在 Redux 存储中, 并在组件内部保持 UI 相关状态

##### Persisted State

```js
// localStorage.getItem('state')/localStorage.setItem('state', serializedState)
const persistedState = loadLocalStorageState();
const appStore = createStore(rootReducers, persistedState);
const appStore.subscribe(throttle(() => {
    saveLocalStorageState({
        todos: store.getState().todos
    });
}, 1000));
```

### Reducers

- [Reducing Boilerplate](https://redux.js.org/recipes/reducing-boilerplate)

必须保持无任何副作用: 不修改传入参数, 不调用副作用函数
`(api/date.now()/math.random())`

```js
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  increment: state => ({ count: state.count + 1}),
  decrement: state => ({ count: state.count + 1}),
  [ActionTypes.ADD_TODO]: (state, action) => {
    ...;
  },
});
```

### Map to Props

dump components implementation

```js
// app.js
React.render(
  <Provider store={store}>{() => <MyRootComponent />}</Provider>,
  rootEl
);

// dump component
import { Component } from 'react';

export default class Counter extends Component {
  render() {
    return <button onClick={this.props.onIncrement}>{this.props.value}</button>;
  }
}
```

```js
import { Component } from 'react';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { increment } from '../actionsCreators';

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    value: state.counter,
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(increment()),
  };
}

export default connect(
  // Line 20
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```

## Middleware

### Middleware Basic Concepts

每一个 Middleware 可以得到:

1. 最初的 store 对象 (dispatch 属性还是原来的)，
   因此，可以通过 store.getState 获得最近的状态，
   以及通过原本的 dispatch 对象直接发布 action 对象，
   跳过其他 Middleware dispatch 方法（next）。
   上面 vanillaPromise 演示了这样的用法。
2. next 方法: 前一个 Middleware 返回的 dispatch 方法。
   当前 Middleware 可以根据自己对 action 的判断和处理结果，
   决定是否调用 next 方法，以及传入什么样的参数。

### Middleware Simple Implementation

```js
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let next = store.dispatch;
  middlewares.forEach((middleware) => (next = middleware(store)(next)));

  return Object.assign({}, store, { dispatch: next });
}
```

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';

// applyMiddleware takes createStore() and returns
// a function with a compatible API.
let createStoreWithMiddleware = applyMiddleware(
  logger,
  crashReporter
)(createStore);

// Use it like you would use createStore()let todoApp = combineReducers(reducers);
let store = createStoreWithMiddleware(todoApp);
```

### Scheduler Middleware

```js
/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the interval in this case.
 */
const timeoutScheduler = (store) => (next) => (action) => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  let intervalId = setTimeout(() => next(action), action.meta.delay);

  return function cancel() {
    clearInterval(intervalId);
  };
};
```

### redux-thunk Middleware

```js
// thunk middleware
const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);

const createStoreWithMiddleware = applyMiddleware(
  logger，
  thunk
  timeoutScheduler
)(createStore);
const store = createStoreWithMiddleware(combineReducers(reducers));

function addFave(tweetId) {
  return (dispatch, getState) => {
    if (getState.tweets[tweetId] && getState.tweets[tweetId].liked)
        return;

    dispatch({type: IS_LOADING});
    // Yay, that could be sync or async dispatching
    remote.addFave(tweetId).then(
      (res) => { dispatch({type: ADD_FAVE_SUCCEED}) },
      (err) => { dispatch({type: ADD_FAVE_FAILED, err: err}) },
  };
}

store.dispatch(addFave());
```

## Redux Internal

### Create Store

- use closure to store state and subscribe
- use middleware to change normal dispatch function

```js
const applyMiddleware =
  (...middlewares) =>
  (store) => {
    // should return (next) => (action) => { ... } function
    if (middlewares.length === 0) {
      return (dispatch) => dispatch;
    }

    if (middlewares.length === 1) {
      return middlewares[0];
    }

    // [ (next) => (action) => {...}, ... ] array
    // next: (action) => { ... } function
    const boundMiddlewares = middlewares.map((middleware) => middleware(store));

    return boundMiddlewares.reduce((a, b) => (next) => a(b(next)));
  };

const createStore = (reducer, middleware) => {
  // closure for storing global state
  let state = undefined;
  const subscribers = [];
  const coreDispatch = (action) => {
    validateAction(action);
    state = reducer(state, action);
    subscribers.forEach((handler) => handler());
  };
  const getState = () => state;

  const store = {
    dispatch: coreDispatch,
    getState,
    subscribe: (handler) => {
      subscribers.push(handler);

      // unsubscribe function
      return () => {
        const index = subscribers.indexOf(handler);

        if (index > 0) {
          subscribers.splice(index, 1);
        }
      };
    },
  };

  if (middleware) {
    // store default dispatch
    const dispatch = (action) => store.dispatch(action);

    // middleware = ({ dispatch, getState }) => (next) => (action) => { ... };
    // middleware is a higher-order function (return (action) => { ... });
    // dispatch, getState and coreDispatch are injected into middleware as arguments
    store.dispatch = middleware({
      dispatch,
      getState,
    })(coreDispatch);
  }

  coreDispatch({
    type: INIT_REDUX,
  });
  return store;
};
```

### Action Validation

```js
const isValidKey = (key) => {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
};

const validateAction = (action) => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }

  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type!');
  }

  if (!Object.keys(action).every(isValidKey)) {
    throw new Error(
      'Action only have `type`, `payload`, `error` or `meta` field!'
    );
  }
};
```

### Provider and Connection

- use Context to provide store (two methods):
  - inject store into every children recursively
  - use Consumer in Connect higher order component
    `<Consumer>{store => (<WrapperComponent store={store}>)}</Consumer>`

```js
export const Provider = ({ store, children }) => {
  const StoreContext = React.createContext(store);

  return (
    <StoreContext.Provider value={store}>
      <StoreContext.Consumer>
        {(store) => {
          const childrenWithStore = React.Children.map(children, (child) =>
            React.cloneElement(child, { store: store })
          );

          return <div>{childrenWithStore}</div>;
        }}
      </StoreContext.Consumer>
    </StoreContext.Provider>
  );
};

export const connect =
  (mapStateToProps = () => ({}), mapDispatchToProps = () => ({})) =>
  (Component) => {
    class Connected extends React.Component {
      onStoreOrPropsChange(props) {
        const { store } = this.props;
        const state = store.getState();
        const stateProps = mapStateToProps(state, props);
        const dispatchProps = mapDispatchToProps(store.dispatch, props);
        this.setState({
          ...stateProps,
          ...dispatchProps,
        });
      }

      componentWillMount() {
        const { store } = this.props;
        this.onStoreOrPropsChange(this.props);
        this.unsubscribe = store.subscribe(() =>
          this.onStoreOrPropsChange(this.props)
        );
      }

      componentWillReceiveProps(nextProps) {
        this.onStoreOrPropsChange(nextProps);
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <Component {...this.props} {...this.state} />;
      }
    }

    return Connected;
  };
```

## Redux Best Practice

- 区分 Smart Component (know the state) 和 Dump Component (stateless)
- Component 里不要出现任何 async calls，交给 action creator 来做
- Reducer 尽量简单，复杂的交给 action creator
- Reducer 里 return 新 state 的时候：
- [Redux Devtools](https://github.com/gaearon/redux-devtools)
- [Redux React Style Guide](https://github.com/iraycd/React-Redux-Styleguide)
- [Simple Redux API](https://github.com/rematch/rematch)

```js
// add new item to state array
// bad and does not work case "ADD":
return state.push(newItem);
// Good case "ADD":
return [...state, newItem];

// delete new item to state array
// bad and does not work case "DELETE":
return state.splice(index, 1);
// Good case "DELETE":
return state.slice(0, index).concat(state.slice(index + 1));

// update new item to state array
// First way case "EDIT":
return state
  .slice(0, index)
  .concat([{ id: 'id', value: 'newValue' }])
  .slice(index + 1);
// Second way case "EDIT":
return state.map((item) => {
  if (item.id === 'id') {
    return {
      ...item,
      value: 'newValue',
    };
  } else {
    return item;
  }
});
```

- action creator 里，用 promise/async/await 以及 redux-thunk 来帮助你完成想要的功能

```js
// bad
const loadTodo = (id) => (dispatch, getState) => {
  // only fetch the todo if it isn't already loaded
  if (!getState().todos.includes(id)) {
    const todo = await fetch(`/todos/${id}`);
    dispatch(addTodo(todo));
  }
};

// good
const loadTodo = (id, todos) => (dispatch) => {
  // only fetch the todo if it isn't already loaded
  if (!todos.includes(id)) {
    const todo = await fetch(`/todos/${id}`);
    dispatch(addTodo(todo));
  }
};
```

- 在 test 里不管你用 tape 还是 mocha，请用 [enzyme.js](http://airbnb.io/enzyme/)
- 有些时候有些项目你并不需要 redux

```js
const fluxStandardAction = {
  type: 'ADD_TODO',
  payload: {
    text: 'Do something',
  },
  meta: meta,
};

const fluxStandardAction = {
  type: 'ADD_TODO',
  payload: new Error(),
  error: true,
};
```

### State Management

- Redux for global state:
  作为全局状态管理.
- RxJS for redux middleware:
  RxJS 管理所有输入的 input -> redux action 的调度过程.
- Mobx and `useState` for component state:
  作为组件局部状态管理器来用.
  对于只影响单个组件实例的状态,
  应作为 Local State 交由 `useState` 管理,
  而不是将其并入 Global Store.
- Complex UI Change: 用 component 归一化处理
- Complex Data Input: 用 RxJS/observable 归一化处理
- Complex State Change: 用 action/state 归一化处理

## Awesome Tools

### Libs

#### Data Types

- immutable.js: decrease useless copy and memory occupation

#### Network

- node-fetch
- isomorphic-fetch

#### Middleware Tool

- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Sage](https://github.com/yelouafi/redux-saga)
- [Redux Promise](https://github.com/acdlite/redux-promise)
- [Redux Diff Logger](https://github.com/fcomb/redux-diff-logger)

#### State Tool

- redux-undo
- reselect: memorize state transformation

### Debugging

- [Redux Devtools](https://github.com/gaearon/redux-devtools)
