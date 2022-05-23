import { cx } from '@components/utils';
import type { ReactNode } from 'react';
import styles from './Footnote.module.css';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Footnote = ({ children, className, ...props }: Props): JSX.Element => (
  <div {...props} className={cx(className, styles.footnote)}>
    {children}
  </div>
);

export default Footnote;
