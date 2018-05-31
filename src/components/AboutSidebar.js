import React, { Component } from 'react';
import {
  Sidebar,
  Segment
} from 'semantic-ui-react';

import GithubCard from './GithubCard.js';

class AboutSidebar extends Component {
  render() {
    return (
      <Sidebar
        as={Segment}
        animation='push'
        width={this.props.width || 'wide'}
        visible={this.props.visible || false}
        compact
        vertical
        >
          <GithubCard username='sabertazimi'/>
      </Sidebar>
    );
  }
}

export default AboutSidebar;
