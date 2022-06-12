import { cx } from '@components/utils';
import type { DividerProps } from 'antd';
import { Divider as AntDivider } from 'antd';
import styles from './Divider.module.css';

interface Props extends DividerProps {}

const Divider = ({
  type = 'horizontal',
  className,
  children,
}: Props): JSX.Element => (
  <AntDivider
    type={type}
    className={cx(
      styles.divider,
      className,
      'dark:border-light dark:text-light'
    )}
  >
    {children}
  </AntDivider>
);

export default Divider;
