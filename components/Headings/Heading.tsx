import { cx } from '@components/utils';
import { Typography } from 'antd';
import type { TitleProps } from 'antd/lib/typography/Title';

// Keep `H3` `margin-top`.
const Heading = ({
  children,
  className,
  ...props
}: TitleProps): JSX.Element => (
  <Typography.Title
    {...props}
    className={cx('mdx-heading mb-6 dark:text-light', className)}
  >
    {children}
  </Typography.Title>
);

export default Heading;
