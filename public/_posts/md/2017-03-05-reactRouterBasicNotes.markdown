---
layout:     post
title:      "React Router Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - Reactjs
    - React Router
---

# React Router Basic Notes

## Router and Route

parent routes are active when child routes are active

### Nested Route

Key Notes: In component of parent route, should render {this.props.children}

```js
import {
    Router,
    Route,
    hashHistory
} from 'react-router';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/repos" component={Repos}>
                <Route path="/reops/:userName/:repoName" component={Repo} />
            </ Route>
        </ Route>
    </ Router>
),document.getElementById('app'));
```

> In App.js: render() { return (<div>... {this.props.children}</ div>); }

> In Repos.js: render() { return (<div>... {this.props.children}</ div>); }

### URL Params

```js
<Route path="/repos/:userName/:repoName" component={Repo} />
```

```js
// In Repo.js
<div>{this.props.params.userName}</ div>
<div>{this.props.params.repoName}</ div>
```

### IndexRoute

-   has no path
-   becomes this.props.children of the parent

### Clean URLs

replace hashHistory for browserHistory

### Change Route

*   onEnter = { () => store.dispatch(createRouteAction(params))}
