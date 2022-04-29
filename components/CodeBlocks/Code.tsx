import { classNames } from '@components/utils';
import type { HTMLProps } from 'react';
import styles from './Code.module.css';

interface Props extends HTMLProps<HTMLPreElement> {}

const Code = ({ children, className, ...props }: Props): JSX.Element => (
  <pre {...props} className={classNames(className, styles.code)}>
    {children}
  </pre>
);

export default Code;
