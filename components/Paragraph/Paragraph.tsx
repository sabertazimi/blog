import { Typography } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Paragraph = (props: Props): JSX.Element => (
  <Typography.Paragraph {...props} />
);

export default Paragraph;
