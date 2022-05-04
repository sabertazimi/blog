import { classNames } from '@components/utils';
import { Typography } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Paragraph = ({ children, className, ...props }: Props): JSX.Element => (
  <Typography.Paragraph
    {...props}
    className={classNames(
      className,
      'mt-0 mb-9 leading-relaxed tracking-wide dark:text-light'
    )}
  >
    {children}
  </Typography.Paragraph>
);

export default Paragraph;
