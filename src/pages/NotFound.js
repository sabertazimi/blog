import React, { Component } from 'react';

import {
  Header,
  Footer,
  Error
} from '../components';

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
