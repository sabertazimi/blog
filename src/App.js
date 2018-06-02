import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import {
  Home,
  Tags,
  Post,
  NotFound
} from './pages';

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
