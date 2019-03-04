import React from 'react';
import {
  Sidebar,
  Segment
} from 'semantic-ui-react';

import { GithubCard } from '../containers';

const AboutSidebar = ({ width, visible }) => (
  <Sidebar
    as={Segment}
    animation='push'
    width={width || 'wide'}
    visible={visible || false}
    compact
    vertical
  >
    <GithubCard username='sabertazimi'/>
  </Sidebar>
);

export default AboutSidebar;
