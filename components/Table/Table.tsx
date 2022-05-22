import { classNames } from '@components/utils';
import { HTMLProps } from 'react';
import styles from './Table.module.css';

interface Props extends HTMLProps<HTMLTableElement> {}

const Table = ({ children, className, ...props }: Props): JSX.Element => (
  <table
    {...props}
    className={classNames(
      className,
      styles.table,
      'dark:shadow-primary dark:shadow-xl'
    )}
  >
    {children}
  </table>
);

export default Table;
