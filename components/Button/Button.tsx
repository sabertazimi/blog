import { cx } from '@components/utils';
import type { ButtonProps } from 'antd';
import { Button as AntButton } from 'antd';

interface Props extends ButtonProps {}

const Button = ({ className, ...props }: Props): JSX.Element => (
  <AntButton className={cx(className, 'rounded-none')} {...props} />
);

export default Button;
