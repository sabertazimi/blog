import React from 'react';
import { Divider } from 'semantic-ui-react';

const ArticleDivider = ({ children }) => (
  <Divider as="h4" className="header" horizontal style={{ margin: '3em 0em' }}>
    {children}
  </Divider>
);

export default ArticleDivider;
