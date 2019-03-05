---
layout:     post
title:      "React Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - Reactjs
---

* [React Basic Notes](#react-basic-notes)
	* [props and state](#props-and-state)
		* [getInitialState() and constructor(props, context)](#getinitialstate-and-constructorprops-context)
		* [componentDidMount()](#componentdidmount)
		* [componentWillReceiveProps()](#componentwillreceiveprops)
		* [props validation](#props-validation)
	* [element and component](#element-and-component)
		* [functional/class component](#functionalclass-component)
		* [stateful/stateless component](#statefulstateless-component)
		* [component lifecycle](#component-lifecycle)
			* [creation](#creation)
			* [updates](#updates)
			* [unmount](#unmount)
	* [ES6 Syntax](#es6-syntax)
		* [this.setState()](#thissetstate)
	* [MVC模式](#mvc模式)
		* [Controller](#controller)
		* [Best Practice](#best-practice)
	* [Components/Plugins](#componentsplugins)
		* [Documents](#documents)
		* [Data](#data)
		* [UI](#ui)
			* [Animation](#animation)
			* [Charts](#charts)
			* [Search Bar](#search-bar)
			* [Scroll Bar](#scroll-bar)
			* [Mouse](#mouse)
		* [Debug/Test](#debugtest)

# React Basic Notes

## props and state

### getInitialState() and constructor(props, context)

### componentDidMount()

### componentWillReceiveProps()

当此方法被调用时, 不代表 props 一定被改变. 当使用此方法监听 props 变化时, 必须额外检查 props 是否确实被改变.

### props validation

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

## element and component

react element 实际上是纯对象, 可由 React.createElement()/JSX/element factory helper 创建, 并被 react 在必要时渲染成真实的DOM结点

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

### functional/class component

-   函数型组件没有实例, 类型组件具有实例, 但实例化的工作由 react 自动完成
-   class component 具有更多特性: state, lifecycle hook, performance optimizations(shouldComponentUpdate()回调方法)

### stateful/stateless component

#### stateless component

采用函数型声明, 不使用 setState(), 一般作为表现型组件

#### stateful component

*   采用类型声明, 使用 setState(), 一般作为容器型组件(containers)
*   结合 Redux 中的 connect 方法, 将 store 中的 state 作为此类组件的 props

### component lifecycle

#### creation

constructor(props, context) -> componentWillMount() -> render() -> componentDidMount()

#### updates

update for three reasons:

-   parent/top (re-)render
-   this.setState() called
-   this.forceUpdate() called

componentWillReceiveProps(nextProps) -> shouldComponentUpdate(nextProps, nextState) -> componentWillUpdate(nextProps, nextState) -> render() -> componentDidUpdate(prevProps, prevState)

#### unmount

componentWillUnmount()

## ES6 Syntax

### this.setState()

```js
constructor() {
    this.handle = this.handle.bind(this);
}

handle(e) {
    this.setState({

    });
}
```

## MVC模式

### Controller

- 处理请求的参数
- 渲染和重定向
- 选择Model和Service
- 处理Session和Cookies

### Best Practice

- 组件细分化
- 组件
  - 只传入必要的props
  - 使用immutablejs或者react.addons.update实现不可变数据结构
  - 结合React.addons.PureRenderMixin来减少reRender
- 在shouldComponentUpdate中优化组件减少reRender
- 使用context
- 少做dom操作，始终让UI能够基于State还原
- 在store和action中不dom操作或者访问window.属性，只与数据打交道
- 推荐使用ES6
- npm的debug包，log组件渲染的每个步骤和动作

## Components/Plugins

-   [**Starter Kit Collection**](http://andrewhfarmer.com/starter-project)
-   [React Storybook]{https://github.com/kadirahq/react-storybook)

### Documents

-   [Blog Generator](https://github.com/gatsbyjs/gatsby)
-   [React Built In Editor](https://github.com/facebook/draft-js)

### Data

-   [Baobab](https://github.com/Yomguithereal/baobab)
-   [React Resolver](https://github.com/ericclemmons/react-resolver)
-   [RxJS Middleware](https://github.com/redux-observable/redux-observable)

### Data to View

-   [reselect](https://github.com/reactjs/reselect)

### UI

-   [React Material UI](https://github.com/callemall/material-ui)

#### Animation

-   [React Animation npm install react-set-animate --save](https://github.com/FunctionFoundry/react-set-animate)

#### Charts

-   [React Chartjs](https://github.com/jhudson8/react-chartjs)

#### Search Bar

-   https://github.com/searchkit/searchkit

#### Scroll Bar

-   [React Scroll Box](https://github.com/smikhalevski/react-scroll-box)

#### Mouse

-   [React Draftjs](https://github.com/draft-js-plugins/draft-js-plugins)

### Debug/Test

-   [React Testing Utilities](https://github.com/airbnb/enzyme)
-   [React Component hierachy](https://github.com/team-gryff/react-monocle)
-   Chrome Extensions -  React Dev Tools/Redux Dev Tools
