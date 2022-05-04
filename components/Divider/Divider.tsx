import type { DividerProps } from 'antd';
import { Divider as AntDivider } from 'antd';

interface Props extends DividerProps {}

const Divider = ({
  type = 'horizontal',
  className = 'mx-0 my-12 leading-relaxed tracking-wide font-extrabold dark:border-light dark:text-light',
  children,
}: Props): JSX.Element => (
  <AntDivider type={type} className={className}>
    {children}
  </AntDivider>
);

export default Divider;
