import React, { Component } from 'react';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Error from '../components/Error.js';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header headingHidden={true} />
        <Error message={{ header:'Not Found' }} history={ this.props.history }/>
        <Footer />
      </div>
    );
  }
}

export default NotFound;
