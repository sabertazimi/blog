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

## Redux Concepts

- 单一数据源: 整个应用程序的状态存储在单个对象树中 (容易跟踪/调试)
- 状态只读: 通过 dispatch(action) 间接更改状态, 不直接写入状态
- 纯函数更改状态: reducer(state, action) => newState

## Store

Redux 中只有一个全局唯一 store 状态树, 且由 reducers 创建 store.

```js
export default appStore = createStore(rootReducers, initState);
```

### Create Store

```ts
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
```

### Configure Store

By default, `configureStore` from Redux Toolkit will:

- Call `applyMiddleware` with a default list of middlewares
  - [Async thunk middleware](https://github.com/reduxjs/redux-thunk).
  - [Immutability check middleware](https://redux-toolkit.js.org/api/immutabilityMiddleware):
    throw error when detecting mutations in reducers during a dispatch.
  - [Serializability check middleware](https://redux-toolkit.js.org/api/serializabilityMiddleware):
    throw error when deeply detecting non-serializable values in state tree
    (functions, promises, symbols, and other non-plain-data values).
- Call `composeWithDevTools` to set up the Redux DevTools Extension.

```ts
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
```

## State

在 Redux 中 State 并不显式定义:

- 初态与变化态皆由 Reducers 定义并控制
- Actions 中保存着 action.type 外, 还保存着供 Reducers 进行有效状态变化的其他信息(可自定义)
- 调用 Dispatch 方法自动向 Store 传递一个 Action(因为只有一个全局 Store, 故无需额外指定 Store 参数),
  Store 遍历调用其中的 Reducers, 根据 switch 语句进行匹配 action 处理
- reducer 只保存最基本的 state, 可计算出的 state 放在 mapStateToProps(selector) 中直接计算后绑定至 props
- 将数据保存在 Redux 存储中, 并在组件内部保持 UI 相关状态

### Persisted State

```js
// localStorage.getItem('state')/localStorage.setItem('state', serializedState)
const persistedState = loadLocalStorageState();
const appStore = createStore(rootReducers, persistedState);

appStore.subscribe(
  throttle(() => {
    saveLocalStorageState({
      todos: store.getState().todos,
    });
  }, 1000)
);
```

### Normalized State

[Redux normalizing state shape](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape):

- Only have one copy of each particular piece of data in state (no duplication).
- Normalized data is kept in lookup table (key-value store),
  where item IDs are keys, items themselves are values.
- There may also be an array of all of the IDs for a particular item type.

Normalizing data:

- Each type of data gets its own `table` in state.
- Each `data table` should store individual items in an `{ key, value }` object:
  `"p1" : { id : "p1", author : "user1", comments : ["comment1", "comment2"] }`.
- Any references to individual items should be item ID.
- Arrays of IDs should be used to indicate ordering.

```ts
const state = {
  users: {
    ids: ['user1', 'user2', 'user3'],
    entities: {
      user1: { id: 'user1', firstName, lastName },
      user2: { id: 'user2', firstName, lastName },
      user3: { id: 'user3', firstName, lastName },
    },
  },
};

const userId = 'user2';
const userObject = state.users.entities[userId];
```

Normalize nesting data with [Normalizr](https://github.com/paularmstrong/normalizr):

```ts
const data = {
  entities: {
    authors: { byId: {}, allIds: [] },
    books: { byId: {}, allIds: [] },
    authorBook: {
      byId: {
        1: {
          id: 1,
          authorId: 5,
          bookId: 22,
        },
        2: {
          id: 2,
          authorId: 5,
          bookId: 15,
        },
        3: {
          id: 3,
          authorId: 42,
          bookId: 12,
        },
      },
      allIds: [1, 2, 3],
    },
  },
};
```

```ts
const blogPosts = [
  {
    id: 'post1',
    author: { username: 'user1', name: 'User 1' },
    body: '......',
    comments: [
      {
        id: 'comment1',
        author: { username: 'user2', name: 'User 2' },
        comment: '.....',
      },
      {
        id: 'comment2',
        author: { username: 'user3', name: 'User 3' },
        comment: '.....',
      },
    ],
  },
  {
    id: 'post2',
    author: { username: 'user2', name: 'User 2' },
    body: '......',
    comments: [
      {
        id: 'comment3',
        author: { username: 'user3', name: 'User 3' },
        comment: '.....',
      },
      {
        id: 'comment4',
        author: { username: 'user1', name: 'User 1' },
        comment: '.....',
      },
      {
        id: 'comment5',
        author: { username: 'user3', name: 'User 3' },
        comment: '.....',
      },
    ],
  },
  // and repeat many times
];

const normalizedBlogPosts = {
  posts: {
    byId: {
      post1: {
        id: 'post1',
        author: 'user1',
        body: '......',
        comments: ['comment1', 'comment2'],
      },
      post2: {
        id: 'post2',
        author: 'user2',
        body: '......',
        comments: ['comment3', 'comment4', 'comment5'],
      },
    },
    allIds: ['post1', 'post2'],
  },
  comments: {
    byId: {
      comment1: {
        id: 'comment1',
        author: 'user2',
        comment: '.....',
      },
      comment2: {
        id: 'comment2',
        author: 'user3',
        comment: '.....',
      },
      comment3: {
        id: 'comment3',
        author: 'user3',
        comment: '.....',
      },
      comment4: {
        id: 'comment4',
        author: 'user1',
        comment: '.....',
      },
      comment5: {
        id: 'comment5',
        author: 'user3',
        comment: '.....',
      },
    },
    allIds: ['comment1', 'comment2', 'comment3', 'comment4', 'comment5'],
  },
  users: {
    byId: {
      user1: {
        username: 'user1',
        name: 'User 1',
      },
      user2: {
        username: 'user2',
        name: 'User 2',
      },
      user3: {
        username: 'user3',
        name: 'User 3',
      },
    },
    allIds: ['user1', 'user2', 'user3'],
  },
};
```

#### Entity Adapter Tool

[createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter):

- Build normalized state.
- Return normalized state CURD operation reducers.
- Get data selectors by `getSelectors`.

```ts
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from './api';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// State = { ids: [], entities: {}, status: 'idle', error: null };
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
      })
      // Use the `addOne` reducer for the fulfilled case
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);

export default postsSlice.reducer;
```

## Action

Because of `ActionCreator.toString()` override,
action creators returned by `createAction()`
can be used directly as **keys** for `case reducers` passed to `createReducer()`.

```ts
import { createAction } from '@reduxjs/toolkit';

const increment = createAction<number | undefined>('counter/increment');

let action = increment(); // { type: 'counter/increment' }
action = increment(3); // returns { type: 'counter/increment', payload: 3 }
console.log(increment.toString());
console.log(`The action type is: ${increment}`);
// 'counter/increment'
// 'The action type is: counter/increment'
```

```ts
import { createAction, nanoid } from '@reduxjs/toolkit';

const addTodo = createAction('todos/add', function prepare(text: string) {
  return {
    payload: {
      text,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    },
  };
});

console.log(addTodo('Write more docs'));
/**
 * {
 *   type: 'todos/add',
 *   payload: {
 *     text: 'Write more docs',
 *     id: '4AJvwMsWeHCChcWYga3dj',
 *     createdAt: '2019-10-03T07:53:36.581Z'
 *   }
 * }
 **/
```

:::tip RTK Pitfall
Strongly recommend to only use string action types.
:::

Redux Toolkit rests on the assumption that you use string action types.
Specifically, some of its features rely on the fact that with strings,
`toString()` method of `createAction()` action creator returns matching action type.

This is not the case for non-string action types because `toString()`
will return the string-converted type value rather than the type **itself**.

```ts
const INCREMENT = Symbol('increment');
const increment = createAction(INCREMENT);

increment.toString();

// returns the string 'Symbol(increment)',
// not the INCREMENT symbol itself.
assert(increment.toString() === INCREMENT, false);

const counterReducer = createReducer(0, {
  // The following case reducer will NOT trigger for
  // increment() actions because `increment` will be
  // interpreted as a string, rather than being evaluated
  // to the INCREMENT symbol.
  [increment]: (state, action) => state + action.payload,

  // You would need to use the action type explicitly instead.
  [INCREMENT]: (state, action) => state + action.payload,
});
```

## Reducer

- [Reducing Boilerplate](https://redux.js.org/recipes/reducing-boilerplate)

必须保持无任何副作用: 不修改传入参数, 不调用副作用函数
`(api/date.now()/math.random())`

### Reducer Boilerplate

```js
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const reducer = createReducer(initialState, {
  reset: () => initialState,
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count + 1 }),
  [ActionTypes.ADD_TODO]: (state, action) => {},
});
```

### Reducer Enhancer

Implement reducer enhancer with `higher order reducer`,
like [Redux Undo](https://github.com/omnidan/redux-undo):

```js
function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
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
      default: {
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
    }
  };
}
```

```js
// This is a reducer
import { createStore } from 'redux';

function todos(state = [], action) {
  /* ... */
}

// This is also a reducer!
const undoableTodos = undoable(todos);
const store = createStore(undoableTodos);

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux',
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'Implement Undo',
});

store.dispatch({
  type: 'UNDO',
});
```

### RTK Reducer API

`createReducer`: `builder.addCase` and `builder.addMatcher`:

- If there is an exact match for the action type,
  the corresponding `case reducer` (`CaseReducer<State, Action>`) will execute first.
- Any matchers that return true
  will execute in the order they were defined.
- If a default case reducer is provided,
  and no case or matcher reducers ran,
  the default case reducer will execute.
- If no case or matcher reducers ran,
  the original existing state value will be returned unchanged.
- `ActionCreator` from RTK has method `ActionCreator.match(action: Action)`,
  can used to TypeScript type narrowing.

```ts
// Simple matcher
function isNumberValueAction(
  action: AnyAction
): action is PayloadAction<{ value: number }> {
  return typeof action.payload.value === 'number';
}
```

```ts
import { createReducer } from '@reduxjs/toolkit';

const reducer = createReducer(0, builder => {
  builder
    .addCase('increment', state => state + 1)
    .addMatcher(
      action => action.startsWith('i'),
      state => state * 5
    )
    .addMatcher(
      action => action.endsWith('t'),
      state => state + 2
    );
});

console.log(reducer(0, { type: 'increment' }));
// Returns 7, as the 'increment' case and both matchers all ran in sequence:
// - case 'increment": 0 => 1
// - matcher starts with 'i': 1 => 5
// - matcher ends with 't': 5 => 7
```

`createReducer` and `createSlice`
uses [immer](https://github.com/immerjs/immer)
to let you write reducers as if they were mutating the state directly.
In reality, the reducer receives a proxy state
that translates all mutations into equivalent copy operations.

:::danger Mutating State Case
Only write **mutating** logic in RTK `createSlice` and `createReducer` API.
:::

```ts
import { createAction, createReducer } from '@reduxjs/toolkit';

interface Todo {
  text: string;
  completed: boolean;
}

const addTodo = createAction<Todo>('todos/add');
const toggleTodo = createAction<number>('todos/toggle');

const todosReducer = createReducer([] as Todo[], builder => {
  builder
    .addCase(addTodo, (state, action) => {
      // This push() operation gets translated into
      // the same extended-array creation as in the previous example.
      const todo = action.payload;
      state.push(todo);
    })
    .addCase(toggleTodo, (state, action) => {
      // The "mutating" version of this case reducer is
      // much more direct than the explicitly pure one.
      const index = action.payload;
      const todo = state[index];
      todo.completed = !todo.completed;
    });
});
```

:::tip Reducer Pitfall
Ensure that either mutate state argument or return a new state, but **not both**.
:::

Following reducer would throw an exception if a toggleTodo action is passed:

```ts
import { createAction, createReducer } from '@reduxjs/toolkit';

interface Todo {
  text: string;
  completed: boolean;
}

const toggleTodo = createAction<number>('todos/toggle');

const todosReducer = createReducer([] as Todo[], builder => {
  builder.addCase(toggleTodo, (state, action) => {
    const index = action.payload;
    const todo = state[index];

    // This case reducer both mutates the passed-in state...
    todo.completed = !todo.completed;

    // And returns a new value.
    // This will throw an exception.
    // In this example, the easiest fix is to remove the `return` statement.
    return [...state.slice(0, index), todo, ...state.slice(index + 1)];
  });
});
```

Other pitfalls for `State Proxy` in [ImmerJS](https://immerjs.github.io/immer/pitfalls):

- `Draft` objects in `Immer` are wrapped in `Proxy`,
  so you cannot use `==` or `===` to test equality:
  - Use `original` instead: `const index = original(list).indexOf(element)`.
  - Use unique `id` field instead.

## Slice

Slice API is standard approach for writing Redux logic.
Internally, it uses `createAction` and `createReducer`,
also use `Immer` to write immutable updates.

```ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState = { value: 0 } as CounterState;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

`extraReducers` allows `createSlice` to respond to
**other** action types besides the types it has generated.

If two fields from reducers and extraReducers
happen to end up with the **same** action type string,
the function from **reducers** will be used to handle that action type.

```ts
import type { Action, AnyAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

interface RejectedAction extends Action {
  error: Error;
}

interface Item {
  id: string;
  text: string;
}

// Counter actions
const incrementBy = createAction<number>('incrementBy');
const decrement = createAction('decrement');

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

const todosSlice = createSlice({
  name: 'todo',
  initialState: [] as Item[],
  // Todo reducers
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.push(action.payload);
      },
      // Action creator prepare callback
      prepare: (text: string) => {
        const id = nanoid();
        return { payload: { id, text } };
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(incrementBy, (state, action) => {
        // action is inferred correctly here if using TS
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction
        (state, action) => {}
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {});
  },
});
```

## Selector

- Keep the Redux state minimal,
  derive additional values from root state whenever possible.

The actual state is easier to read.
Less logic is needed to calculate those additional values
and keep them in sync with rest of data.
The original state is still there as a reference and isn't being replaced.

- Extract data getting and normalization logic from components.

Making change to data format in reducers,
then change reusable selector in `slice.ts`.
No need to change `Component.tsx` logic.

- Memorize state changes.

Keep `useSelector` away from returns a new array reference:

```ts
// ❌ Bad: cause always re-render problem
function App() {
  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state);
    // Returns a new array reference every time.
    return allPosts.filter(post => post.user === userId);
  });
}
```

### UseSelector Hook

`useSelector` automatically subscribes to Redux store,
any time an action is dispatched,
it will call its selector function again right away.

If value returned by selector changes from last time it ran
(**strict `===` reference comparisons**),
`useSelector` will force component to re-render with the new data.

### CreateSelector API

`createSelector` API
([Reselect](https://github.com/reduxjs/reselect) under the hood):

- Takes one or more **Input Selector** functions,
  plus an **Output Selector** function as arguments.
- `Output Selector` will only re-run when outputs of `Input Selector` have changed.
  With `createSelector` to write memorized selector functions:
- `Input Selector` should usually just extract and return values,
  `Output Selector` should do expensive transformation work.

```ts
// Good
const selectAllPosts = state => state.posts.posts;
const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId);

// Memorized selector function
const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  // Output selector will only re-run when `posts` or `userId` has changed.
  (posts, userId) => posts.filter(post => post.user === userId)
);
```

`Reselect` will run input selectors with all of given arguments,
If any of input selectors results are `===` different than before,
it will re-run output selector.
Otherwise it will skip re-running and just return cached final result from before.

```ts
const state1 = getState();
// Output selector runs, because it's the first call.
selectPostsByUser(state1, 'user1');
// Output selector does _not_ run, because the arguments haven't changed.
selectPostsByUser(state1, 'user1');
// Output selector runs, because `userId` changed.
selectPostsByUser(state1, 'user2');

dispatch(reactionAdded());
const state2 = getState();
// Output selector does not run, because `posts` and `userId` are the same.
selectPostsByUser(state2, 'user2');

// Add some more posts.
dispatch(addNewPost());
const state3 = getState();
// Output selector runs, because `posts` has changed.
selectPostsByUser(state3, 'user2');
```

### Selector Best Practice and Pitfalls

```ts
// ❌ DO NOT memoize: will always return a consistent reference
const selectTodos = state => state.todos;
const selectNestedValue = state => state.some.deeply.nested.field;
const selectTodoById = (state, todoId) => state.todos[todoId];

// ❌ DO NOT memoize: deriving data, but will return a consistent result
const selectItemsTotal = state => {
  return state.items.reduce((result, item) => {
    return result + item.total;
  }, 0);
};
const selectAllCompleted = state => state.todos.every(todo => todo.completed);

// ✅ SHOULD memoize: returns new references when called
const selectTodoDescriptions = state => state.todos.map(todo => todo.text);
```

## Thunk

Redux Toolkit `configureStore` function automatically
sets up the thunk middleware by default,
recommend using thunks as the standard approach for writing async logic with Redux.

### Thunk Middleware Implementation

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    next =>
    action => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }

      return next(action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

### Create Async Thunk API

`createAsyncThunk` API provides:

- Less boilerplate code for `state.status` (`idle | loading | error`) manipulation.
- **Typed** async thunk function.

`AppThunk` type definition:

```ts
import type { Action, ThunkAction } from '@reduxjs/toolkit';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

**Typed** async thunk function:

```ts
interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

interface PendingAction<ThunkArg> {
  type: string;
  payload: undefined;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

interface RejectedAction<ThunkArg> {
  type: string;
  payload: undefined;
  error: SerializedError | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
    condition: boolean;
  };
}

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string;
  payload: RejectedValue;
  error: { message: 'Rejected' };
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
  };
}

type Pending = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => PendingAction<ThunkArg>;

type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>;

type Rejected = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => RejectedAction<ThunkArg>;

type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>;
```

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchUserById = createAsyncThunk<
  // Return type of the payload creator
  ReturnType,
  // First argument to the payload creator
  number,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: State;
    extra: {
      jwt: string;
    };
  }
>('users/fetchById', async (userId, thunkApi) => {
  const response = await fetch(`https://reqres.in/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
  });

  return (await response.json()) as ReturnType;
});
```

State status manipulation:

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAPI } from './userAPI';

// First, create the thunk.
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
  }
);

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // Standard reducer logic, with auto-generated action types per reducer.
  },
  extraReducers: builder => {
    // Add reducers for additional action types and handle loading state as needed.
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array.
      state.entities.push(action.payload);
    });
  },
});

// Later, dispatch the thunk as needed in the app.
dispatch(fetchUserById(123));
```

## Middleware

Redux middleware were designed to enable writing side effects logic:

- I/O: logging, saving files.
- AJAX HTTP request.
- Async timer.
- Modifying state outside of `reducer` function.
- Mutating arguments to `dispatch` function.
- Generating random numbers or unique random IDs
  (e.g `uuid()`/`Math.random()`/`Date.now()`).

### Middleware Basic Concepts

每一个 Middleware 可以通过上下文获取:

- original `store`:
  - original `store.dispatch`.
  - get state by `store.getState`.
  - 通过 `dispatch` 对象直接发布 `action` 对象.
- `next` 方法: 前一个 Middleware 返回的 `dispatch` 方法.
  当前 Middleware 可以根据自己对 action 的判断和处理结果,
  决定是否调用 `next` 方法 (是否跳过其他 Middleware 的 `dispatch`),
  以及传入什么样的参数.

从而实现如下功能:

- Execute extra logic when any action is dispatched.
- Pause, modify, delay, replace, or halt dispatched actions.
- Write extra code that has access to `dispatch` and `getState`.
- Teach `dispatch` how to accept other values besides plain action objects,
  such as **functions** (`action(dispatch, getState, extraArgument)`) and promises,
  by intercepting them and dispatching real action objects instead.

### Middleware Simple Implementation

- Raw Middleware: `store => next => action => T`.
- `middleware(store)`: `next => action => T`.
- `middleware(store)(next)`: `action => T`.
- `next`: `action => T`.
- `dispatch`: `action => T`.
- `middleware(store)(next)`, `next` and `dispatch` have same function signature:
  `type Dispatch = (action: Action | AsyncAction) => any`.
- After `middlewares.forEach`, set `next` to `store.dispatch`,
  make new `dispatch` get all functions from `middlewares`.

```js
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let next = store.dispatch;
  // Reduce middlewares with reverse order in Redux.
  middlewares.forEach(middleware => (next = middleware(store)(next)));

  // When user app execute `dispatch` function,
  // middlewares execute with forward order.
  return Object.assign({}, store, { dispatch: next });
}
```

```js
import { applyMiddleware, combineReducers, createStore } from 'redux';

// applyMiddleware takes createStore() and returns
// a function with a compatible API.
const createStoreWithMiddleware = applyMiddleware(
  logger,
  crashReporter
)(createStore);

// Use it like you would use createStore()let todoApp = combineReducers(reducers);
const store = createStoreWithMiddleware(todoApp);
```

### Scheduler Middleware

```js
/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the interval in this case.
 */
const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  const intervalId = setTimeout(() => next(action), action.meta.delay);

  return function cancel() {
    clearInterval(intervalId);
  };
};
```

### Thunk Middleware

```js
// thunk middleware
const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);

const createStoreWithMiddleware = applyMiddleware(
  logger,
  thunk,
  timeoutScheduler
)(createStore);
const store = createStoreWithMiddleware(combineReducers(reducers));

function addFave(tweetId) {
  return (dispatch, getState) => {
    if (getState.tweets[tweetId] && getState.tweets[tweetId].liked) {
      return;
    }

    dispatch({ type: IS_LOADING });
    // Yay, that could be sync or async dispatching
    remote.addFave(tweetId).then(
      res => {
        dispatch({ type: ADD_FAVE_SUCCEED });
      },
      err => {
        dispatch({ type: ADD_FAVE_FAILED, err });
      }
    );
  };
}

store.dispatch(addFave());
```

### Typed Middleware

```ts
export interface Middleware<
  DispatchExt = {}, // optional override return behavior of `dispatch`
  S = any, // type of the Redux store state
  D extends Dispatch = Dispatch // type of the dispatch method
> {
  ext: DispatchExt;
}
```

```ts
import type { Middleware } from 'redux';
import type { RootState } from '../store';

export const exampleMiddleware: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = store => next => action => {
  const state = store.getState(); // correctly typed as RootState
};
```

## RTK Query

### Server State Management

- Tracking loading state in order to show UI spinners.
- Avoiding duplicate requests for the same data.
- Optimistic updates to make the UI feel faster
  - Requires asynchronous APIs for fetching and updating.
  - Updating `out of date` data in the background.
- Managing cache lifetimes as the user interacts with the UI.
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview).
- [React Query](https://github.com/tannerlinsley/react-query).

### Basic RTK Query Usage

- Query hooks.
- Mutation hooks.
- Refetch function.
- Cache tags.

```ts
// Import the RTK Query methods from the React-specific entry point.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object.
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api`.
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'.
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  // The "endpoints" represent operations and requests for this server.
  endpoints: builder => ({
    getPost: builder.query({
      query: postId => `/posts/${postId}`,
    }),
    // The `getPosts` endpoint is a "query" operation that returns data.
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'.
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export the auto-generated hook for the `getPost` query endpoint
export const { useGetPostQuery, useGetPostsQuery, useAddNewPostMutation } =
  apiSlice;
```

```ts
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
  reducer: {
    // ... Other reducers.
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

```tsx
import React from 'react';
import { useGetPostsQuery } from '../api';
import { PostExcerpt, Spinner } from '../components';

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(
    () => posts.slice().sort((a, b) => b.date.localeCompare(a.date)),
    [posts]
  );

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = sortedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  );
};
```

```tsx
import React, { useState } from 'react';
import { useAddNewPostMutation } from '../api';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
  };
};
```

### RTK Query Cache Mechanism

RTK Query creates a **cache key** for each `unique endpoint` + `argument` combination,
and stores the results for each cache key separately.

Use the same query hook multiple times,
pass it different query parameters,
and each result will be cached separately in Redux `store`.

It iss important to note that the query parameter must be a **single value**
(a primitive value or an object containing multiple fields, same as with `createAsyncThunk`).
RTK Query will do **shallow stable** comparison of fields,
and re-fetch the data if any of them have changed.

By default, **unused data is removed from the cache after 60 seconds**,
can be configured in root API slice definition
or overridden in individual endpoint definitions using `keepUnusedDataFor` flag.

RTK query [cache utils](https://redux-toolkit.js.org/rtk-query/api/created-api/cache-management-utils):

```ts
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
  }),
});
```

1. The `PATCH /posts/:postId` from the editPost mutation.
2. A `GET /posts/:postId` as the getPost query is refetched.
3. A `GET /posts` as the getPosts query is refetched.

### RTK Query Selector

```ts
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const emptyUsers = [];

export const selectUsersResult = apiSlice.endpoints.getUsers.select();

export const selectAllUsers = createSelector(
  selectUsersResult,
  usersResult => usersResult?.data ?? emptyUsers
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find(user => user.id === userId)
);
```

### Splitting Query Endpoints

[RTK query code splitting](https://redux-toolkit.js.org/rtk-query/usage/code-splitting):

- `injectEndpoints()`:
  mutates original API slice object
  to add additional endpoint definitions
  and then returns it.
- `enhanceEndpoints()`:
  merged together on a per-definition basis.
- `apiSlice` and `extendedApiSlice` are the same object.

```ts
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();
```

### Transform Query Response

```ts
import { apiSlice } from '../api/apiSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: responseData => {
        return usersAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
```

### RTK Query Reference

- RTK Query real world [example](https://www.toptal.com/react/redux-toolkit-and-rtk-query).

## React Redux Binding Library

- `useSelector`.
- `useDispatch`:
  dispatch function reference will be stable
  as long as same store instance is being passed to the `<Provider>`.

### Typed React Redux Hooks

```ts
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type store from './store';

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Custom React Redux Hooks

```ts
import { shallowEqual, useSelector } from 'react-redux';

export default function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}
```

```ts
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function useActions(actions) {
  const dispatch = useDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch));
    }
    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
}
```

### React Redux API Reference

[`batch`](https://react-redux.js.org/api/batch):

```ts
import { batch } from 'react-redux';

function myThunk() {
  return (dispatch, getState) => {
    // Only result in one combined re-render, not two.
    batch(() => {
      dispatch(increment());
      dispatch(increment());
    });
  };
}
```

## Redux Server Side Rendering

- Client side:
  a new Redux store will be created with state provided from server.
- Server side:
  provide the initial state of app.

`client.jsx`:

```jsx
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import counterApp from './reducers';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(counterApp, preloadedState);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

`server.js`:

```js
import path from 'path';
import Express from 'express';
import qs from 'qs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/App';

const app = Express();
const port = 3000;

app.use('/static', Express.static('static'));

app.use(handleRender);

function handleRender(req, res) {
  // `parseInt` to prevent XSS attack
  const params = qs.parse(req.query);
  const counter = parseInt(params.counter, 10) || 0;

  const preloadedState = { counter };
  const store = createStore(counterApp, preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const finalState = store.getState();
  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
  // https://redux.js.org/usage/server-rendering#security-considerations
  // `replace(/</g, '\\u003c')` to prevent XSS attack
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);
```

## Redux Internal

### Store Constructor Implementation

- Use closure to store state and subscribe.
- Use middleware to change normal dispatch function.

```js
const applyMiddleware =
  (...middlewares) =>
  store => {
    // should return (next) => (action) => { ... } function
    if (middlewares.length === 0) {
      return dispatch => dispatch;
    }

    if (middlewares.length === 1) {
      return middlewares[0];
    }

    // [ (next) => (action) => {...}, ... ] array
    // next: (action) => { ... } function
    const boundMiddlewares = middlewares.map(middleware => middleware(store));

    return boundMiddlewares.reduce((a, b) => next => a(b(next)));
  };

const createStore = (reducer, middleware) => {
  // closure for storing global state
  let state;
  const subscribers = [];
  const coreDispatch = action => {
    validateAction(action);
    state = reducer(state, action);
    subscribers.forEach(handler => handler());
  };
  const getState = () => state;

  const store = {
    dispatch: coreDispatch,
    getState,
    subscribe: handler => {
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
    const dispatch = action => store.dispatch(action);

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
const isValidKey = key => {
  return ['type', 'payload', 'error', 'meta'].includes(key);
};

const validateAction = action => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }

  if (typeof action.type === 'undefined') {
    throw new TypeError('Action must have a type!');
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

```jsx
export const Provider = ({ store, children }) => {
  const StoreContext = React.createContext(store);

  return (
    <StoreContext.Provider value={store}>
      <StoreContext.Consumer>
        {store => {
          const childrenWithStore = React.Children.map(children, child =>
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
  Component => {
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

## Redux Performance

### Redux Code Splitting

- [Redux Code Splitting Guide](https://redux.js.org/usage/code-splitting).
- [Redux Dynamic Modules](https://github.com/microsoft/redux-dynamic-modules):
  Modularize Redux by dynamically loading reducers and middlewares
  (contribute to **code splitting**).

### Redux Performance Pitfalls

- All `reducers` are called to produce the `next` store state.
- All `mapStateToProps`/`useSelectors` of mounted components are called.
- As every `mapStateToProps`/`useSelector`
  that returned a different reference
  from the previous render,
  the associated components are rendered
  (**re-rendering** problem).

### Redux Performance Best Practice

- Normal React performance tips: `React.memo`, `useMemo`, `useCallback` etc.
- Normalize large array state via `createEntityAdapter` API:
  - Use `Ids` array as minimal core data (other than whole `Data[]`).
  - Fast element lookup in normalized state (other than slow `Array.find()`).
- Create memorized selectors via `createSelector` API.

## Redux Best Practice

### Redux Necessity

Necessity for importing Redux
(状态多, 变化快, 更新复杂):

- Lots of state.
- Frequent update state.
- Complex update state.

### Redux Style Guide

Redux style [guide](https://redux.js.org/style-guide/style-guide):

- Only one store per app.
- Avoid mutate state without ImmerJS.
- Avoid side effects in reducers.
- Avoid non-serializable values in state store.
- Normalize complex nested/relational state.
- Keep state minimal and derive additional values.
- Split large data selection into multiple small `useSelector`.

### Redux Tips

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
state.push(newItem);
// Good case "ADD":
[...state, newItem];

// delete new item to state array
// bad and does not work case "DELETE":
state.splice(index, 1);
// Good case "DELETE":
state.slice(0, index).concat(state.slice(index + 1));

// update new item to state array
// First way case "EDIT":
state
  .slice(0, index)
  .concat([{ id: 'id', value: 'newValue' }])
  .slice(index + 1);
// Second way case "EDIT":
state.map(item => {
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

- Action creator: 用 promise/async/await 以及 redux-thunk 实现异步操作.

```js
// bad
const loadTodo = id => async (dispatch, getState) => {
  // only fetch the todo if it isn't already loaded
  if (!getState().todos.includes(id)) {
    const todo = await fetch(`/todos/${id}`);
    dispatch(addTodo(todo));
  }
};

// good
const loadTodo = (id, todos) => async dispatch => {
  // only fetch the todo if it isn't already loaded
  if (!todos.includes(id)) {
    const todo = await fetch(`/todos/${id}`);
    dispatch(addTodo(todo));
  }
};
```

```js
const fluxStandardAction = {
  type: 'ADD_TODO',
  payload: {
    text: 'Do something',
  },
  meta,
};

const fluxStandardAction = {
  type: 'ADD_TODO',
  payload: new Error('Error'),
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
- `Jotai`/`Recoil`:
  Split state into different atoms.
  Atoms can be imported for any specific component **without single-entry point**.
  Each atom handling different app domain/context (reducer).

## Redux Tools

### Immutable Data Tools

- ImmerJS.
- Immutable.js: decrease useless copy and memory occupation.

### Middleware Tools

- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Sage](https://github.com/yelouafi/redux-saga)
- [Redux Promise](https://github.com/acdlite/redux-promise)
- [Redux Diff Logger](https://github.com/fcomb/redux-diff-logger)
- [Redux Dynamic Modules](https://github.com/microsoft/redux-dynamic-modules):
  Modularize Redux by dynamically loading reducers and middlewares
  (contribute to **code splitting**).

### State Tools

- Reselect: memorize state transformation.
- Redux undo.

### Debugging Tools

- [Redux Devtools](https://github.com/gaearon/redux-devtools)

## Redux Reference

- Redux ToolKit quick start [guide](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux).
