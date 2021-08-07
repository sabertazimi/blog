import { Divider } from 'antd';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ArticleDivider = ({ children }: Props): JSX.Element => (
  <Divider className="mx-0 my-8 font-extrabold">{children}</Divider>
);

export default ArticleDivider;
