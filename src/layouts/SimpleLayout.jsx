import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Header, Footer, ScrollButton } from '../components';

const SimpleLayout = ({ children }) => (
  <div>
    <Header />
    <Segment
      style={{ width: '100%', padding: '6em 0em', overflow: 'hidden' }}
      vertical
    >
      {children}
      <ScrollButton />
    </Segment>
    <Footer />
  </div>
);

export default SimpleLayout;
