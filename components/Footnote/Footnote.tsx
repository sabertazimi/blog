import type { ReactNode } from "react";
import {classNames}from '@components/utils';
import styles from './Footnote.module.css';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Footnote = ({children, className, ...props}:Props):JSX.Element => (
  <div {...props} className={classNames(className, styles.footnote)}>
    {children}
  </div>
)

export default Footnote;
