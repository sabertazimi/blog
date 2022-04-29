import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import styles from './InlineCode.module.css';

interface Props {
  className?: string;
  children?: ReactNode;
}

const InlineCode = ({ children, className, ...props }: Props): JSX.Element =>
  className?.includes('language-') ? (
    <code {...props} className={className}>
      {children}
    </code>
  ) : (
    <code {...props} className={classNames(className, styles.code)}>
      {children}
    </code>
  );

export default InlineCode;
