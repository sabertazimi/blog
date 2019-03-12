import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Header } from '../components';

const LandingLayout = ({ children }) => (
  <div>
    <Header />
    <Segment
      style={{ width: '100%', padding: '6em', overflow: 'hidden' }}
      vertical
    >
      {children}
    </Segment>
  </div>
);

export default LandingLayout;
