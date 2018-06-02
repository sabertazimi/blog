import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home.js';
import Tags from './pages/Tags.js';
import Post from './pages/Post.js';
import NotFound from './pages/NotFound.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/tags' render={ () => { return <Redirect to='/tags/all'/> } }/>
          <Route path='/tags/:tagName' component={Tags}/>
          <Route path='/posts/:mdFile' component={Post}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
