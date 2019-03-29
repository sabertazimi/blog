import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Header, Footer, ScrollButton } from '../components';

const PostLayout = ({ posts, children }) => (
  <div>
    <Header posts={posts} />
    <Segment
      style={{ width: '100%', padding: '0 0 3em 0', overflow: 'hidden' }}
      vertical
    >
      {children}
      <ScrollButton />
    </Segment>
    <Footer />
  </div>
);

export default PostLayout;
