import React, { Component } from 'react';

import { Error } from '../components';
import { SimpleLayout } from '../layouts';

class NotFound extends Component {
  render() {
    return (
      <SimpleLayout>
        <Error message={{ header:'Not Found' }} history={ this.props.history }/>
      </SimpleLayout>
    );
  }
}

export default NotFound;
