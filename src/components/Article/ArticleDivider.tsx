import React from 'react';
import { Divider } from 'antd';

interface Props {
  children: React.ReactNode;
}

const ArticleDivider = ({ children }: Props): JSX.Element => (
  <Divider className="mx-0 my-8 font-extrabold">{children}</Divider>
);

export default ArticleDivider;
