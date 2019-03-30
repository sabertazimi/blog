import React from 'react';
import { Divider } from 'antd';

const ArticleDivider = ({ children }) => (
  <Divider style={{ margin: '2em 0', fontWeight: 800 }}>{children}</Divider>
);

export default ArticleDivider;
