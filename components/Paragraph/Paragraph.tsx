import { cx } from '@components/utils';
import { Typography } from 'antd';
import type { ReactNode } from 'react';
import styles from './Paragraph.module.css';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Paragraph = ({ children, className, ...props }: Props): JSX.Element => (
  <Typography.Paragraph
    {...props}
    className={cx(className, styles.p, 'dark:text-light')}
  >
    {children}
  </Typography.Paragraph>
);

export default Paragraph;
