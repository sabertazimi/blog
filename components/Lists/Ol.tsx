import { cx } from '@components/utils';
import type { DetailedHTMLProps, OlHTMLAttributes } from 'react';
import styles from './Ol.module.css';

interface Props
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {}

const Ol = ({ children, className, ...props }: Props): JSX.Element => (
  <ol {...props} className={cx(className, styles.ol)}>
    {children}
  </ol>
);

export default Ol;
