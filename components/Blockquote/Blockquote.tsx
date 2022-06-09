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
      'dark:border dark:bg-black dark:shadow-xl dark:shadow-primary'
    )}
  >
    {children}
  </blockquote>
);

export default Blockquote;
