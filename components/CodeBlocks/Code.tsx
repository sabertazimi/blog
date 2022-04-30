import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import styles from './Code.module.css';

interface Props {
  className?: string;
  children?: ReactNode;
}

const Code = ({ children, className, ...props }: Props): JSX.Element =>
  className?.includes('language-') ? (
    <code {...props} className={className}>
      {children}
    </code>
  ) : (
    <code {...props} className={classNames(className, styles.inline)}>
      {children}
    </code>
  );

export default Code;
