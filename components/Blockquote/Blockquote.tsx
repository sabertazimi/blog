import { classNames } from '@components/utils';
import type { BlockquoteHTMLAttributes } from 'react';
import styles from './Blockquote.module.css';

interface Props extends BlockquoteHTMLAttributes<HTMLElement> {}

const Blockquote = ({ children, className, ...props }: Props): JSX.Element => (
  <blockquote {...props} className={classNames(className, styles.blockquote)}>
    {children}
  </blockquote>
);

export default Blockquote;