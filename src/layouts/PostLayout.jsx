import React from 'react';
import { Header, Footer, ScrollButton } from 'components';

const PostLayout = ({ children }) => (
  <div>
    <Header />
    <div style={{ width: '100%', padding: '0 0 3em 0', overflow: 'hidden' }}>
      {children}
      <ScrollButton />
    </div>
    <Footer />
  </div>
);

export default PostLayout;
