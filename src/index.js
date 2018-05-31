import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.js';

import 'semantic-ui-css/semantic.min.css';

setTimeout(() => {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById('root'));
}, 2000);
