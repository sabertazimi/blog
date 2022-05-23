import { cx } from '@components/utils';
import type { BlockquoteHTMLAttributes } from 'react';
import styles from './Blockquote.module.css';

interface Props extends BlockquoteHTMLAttributes<HTMLElement> {}

const Blockquote = ({ children, className, ...props }: Props): JSX.Element => (
  <blockquote
    {...props}
    className={cx(
      className,
      styles.blockquote,
      'dark:bg-black dark:border',
      'dark:shadow-primary dark:shadow-xl'
    )}
  >
    {children}
  </blockquote>
);

export default Blockquote;
