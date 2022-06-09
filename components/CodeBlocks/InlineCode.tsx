import { cx } from '@components/utils';
import styles from './InlineCode.module.css';

interface Props {
  children?: string;
  className?: string;
}

const InlineCode = ({ children, className }: Props): JSX.Element => (
  <code
    className={cx(
      className,
      styles.code,
      'dark:text-light dark:shadow-xl dark:shadow-primary'
    )}
  >
    {children}
  </code>
);

export default InlineCode;
