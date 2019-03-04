import React, { Component } from 'react';
import {
  Dimmer,
  Loader,
} from 'semantic-ui-react';

class PageLoader extends Component {
  render() {
    const { message } = this.props;

    return (
      <Dimmer active>
        <Loader>{ message || 'Loading' }</Loader>
      </Dimmer>
    );
  }
}

export default PageLoader;
