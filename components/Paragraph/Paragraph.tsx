import { Typography } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Paragraph = ({ children, ...props }: Props): JSX.Element => (
  <Typography.Paragraph {...props}>
    <p className="mt-0 mb-9 leading-relaxed tracking-wide">{children}</p>
  </Typography.Paragraph>
);

export default Paragraph;
