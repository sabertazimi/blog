import React, { Component } from 'react';
import {
  Dimmer,
  Loader,
  Progress
} from 'semantic-ui-react';

class PageLoader extends Component {
  render() {
    const { message } = this.props;

    return (
      <Dimmer active>
        <Progress percent={100} color='blue' attached='top' inverted />
        <Loader>{ message || 'Loading' }</Loader>
      </Dimmer>
    );
  }
}

export default PageLoader;
