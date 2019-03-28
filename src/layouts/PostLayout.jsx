import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Header, Footer, ScrollButton } from '../components';

const PostLayout = ({ children }) => (
  <div>
    <Header />
    <Segment
      style={{ width: '100%', padding: '3em 0', overflow: 'hidden' }}
      vertical
    >
      {children}
      <ScrollButton />
    </Segment>
    <Footer />
  </div>
);

export default PostLayout;
