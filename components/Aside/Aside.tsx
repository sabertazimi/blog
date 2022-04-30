import Alert from '@components/Alert';
import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import styles from './Aside.module.css';

interface Props {
  type?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const getAlias = (type?: string) => {
  switch (type) {
    case 'success':
    case 'tip':
      return 'success';
    case 'info':
    case 'note':
      return 'info';
    case 'warning':
    case 'caution':
      return 'warning';
    case 'error':
    case 'danger':
      return 'error';
    default:
      return 'info';
  }
};

const Aside = ({
  type,
  title,
  children,
  className,
  ...props
}: Props): JSX.Element => (
  <Alert
    {...props}
    type={getAlias(type)}
    message={title}
    description={children}
    showIcon
    className={classNames(className, styles.admonition)}
  />
);

export default Aside;
