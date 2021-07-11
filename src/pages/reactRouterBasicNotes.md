---
layout:     post
title:      "React Router Basic Notes"
subtitle:   "Be a Stupid Learner"
date:       2018-02-20
author:     "Sabertaz"
header-img: "images/home-bg.jpg"
tags:
    - Frontend Development
    - Web Development
    - JavaScript
    - React
    - React Router
---

# React Router Basic Notes

## Router and Route

parent routes are active when child routes are active

### Basic Usage

```jsx
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/tags"
            render={() => {
              return <Redirect to="/tags/all" />;
            }}
          />
          <Route path="/tags/:tagName" component={Tags} />
          <Route path="/posts/:mdFile" component={Post} />
          <Route path="/book" component={Book} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
```

### Nested Route

Key Notes: In component of parent route, should render {this.props.children}

```js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}>
        <Route path="/reops/:userName/:repoName" component={Repo} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
```

> In App.js: `render() { return (<div>... {this.props.children}</ div>); }`
> In Repos.js: `render() { return (<div>... {this.props.children}</ div>); }`

### Private Route

```jsx
const PrivateRoute = ({
  component: Component,
  toAuth,
  ...rest
}) => {
  return (
    <Route {...rest} render={(props) => (
      auth.isAuthenticated() === true
      ? <Component {...props}/>
      : <Redirect to={
          pathname: toAuth,
          state: {
            from: props.location
          }
        }/>
    )}/>
  );
}
```

### URL Params

```js
<Route path="/repos/:userName/:repoName" component={Repo} />
```

```js
// In Repo.js
<div>{this.props.params.userName}</ div>
<div>{this.props.params.repoName}</ div>
```

### Component Props

- subroutes
- id/size
- etc...

```jsx
<Route render={props => <Component {...props} />} />
```

### Link/URL Props

```jsx
to={
  pathname: url,
  state: {
    ...
  }
}

...

const {
  ...
} = this.props.location.state;
```

### Clean URLs

replace hashHistory for browserHistory

### Change Route

- onEnter = { () => store.dispatch(createRouteAction(params))}
- return `<Redirect />` conditionaly and `withRouter` wrapper (`this.props.history.push('nextURL')`)

```jsx
class Login = () => {
  login = () => {
    // 1. login
    // 2. setState and pushHistory (500ms delay)
    auth.login(() => {
      const { from } = this.props.location.state || { from: { pathname: '/' }};
      this.setState({ redirect: true });
      this.props.history.push(from);
    }, 500);
  }

  render() {
    const { redirect } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' }};

    if (redirect) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

// apply `history` object to props of `Login` component
export default withRouter(Login);
```

## Deployment

### Relative Path

```js
<ConnectedRouter history={history} basename="/react-boilerplate">
  <Fragment>
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
      <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
      <Route
        path={`${process.env.PUBLIC_URL}/404`}
        render={() => <Redirect to={`${process.env.PUBLIC_URL}/`} />}
      />
    </Switch>
  </Fragment>
</ConnectedRouter>;

const Header = () => (
  <div>
    <NavLink to={`${process.env.PUBLIC_URL}/`}>Home</NavLink>
    <NavLink to={`${process.env.PUBLIC_URL}/about`}>About</NavLink>
  </div>
);
```

### Webpack Dev Server

- `publicPath: '/'`
- `historyApiFallback: true`

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
};
```

### Express Config

```js
app.use(express.static(path.resolve(__dirname, 'build')));

// always serve index.html for any request
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html');
});
```

### Nginx Config

```c
# always serve index.html for any request (react-router for single page application)
root /var/www/blog/html/build;
index index.html;
server_name blog.sabertazimi.cn;

location / {
   try_files $uri /index.html;
}
```

## A Simple React Router

- `<Route>` instances listen to `popstate` event to `forceUpdate`.
- When click `<Link>`/`<Reditect>`, `historyPush` or `historyReplace` get called,
  `<Route>` instances re-match and re-render.

```jsx
const instances = [];

const register = comp => instances.push(comp);
const unregister = comp => instances.splice(instances.indexOf(comp), 1);

const historyPush = path => {
  history.pushState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

const historyReplace = path => {
  history.replaceState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};
```

### Route Component

```jsx
const matchPath = (pathname, options) => {
  const { exact = false, path } = options;

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true
    };
  }

  const match = new RegExp(`^${path}`).exec(pathname);

  if (!match) {
    // There wasn't a match.
    return null;
  }

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) {
    // There was a match, but it wasn't
    // an exact match as specified by
    // the exact prop.

    return null;
  }

  return {
    path,
    url,
    isExact
  };
};

class Route extends Component {
  static propTypes: {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func
  };

  componentWillMount() {
    addEventListener('popstate', this.handlePop);
    register(this);
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.handlePop);
    unregister(this);
  }

  handlePop = () => {
    this.forceUpdate();
  };

  render() {
    const { path, exact, component, render } = this.props;

    const match = matchPath(location.pathname, { path, exact });

    if (!match) {
      return null;
    }

    if (component) {
      return React.createElement(component, { match });
    }

    if (render) {
      return render({ match });
    }

    return null;
  }
}
```

### Link Component

Whenever a `<Link>` is clicked and the location changes,
each `<Route>` will be aware of that and re-match and re-render with `instances`.

```jsx
class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    replace: PropTypes.bool
  };

  handleClick = event => {
    const { replace, to } = this.props;
    event.preventDefault();

    replace ? historyReplace(to) : historyPush(to);
  };

  render() {
    const { to, children } = this.props;

    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
```

### Redirect Component

```jsx
class Redirect extends Component {
  static defaultProps = {
    push: false
  };

  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { to, push } = this.props;

    push ? historyPush(to) : historyReplace(to);
  }

  render() {
    return null;
  }
}
```

## Reference

- [React Router Tutorial](https://www.youtube.com/playlist?list=PLqrUy7kON1mfJ1cQfJJ1FiULLNngvlFTD)
