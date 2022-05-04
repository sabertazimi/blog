import { classNames } from '@components/utils';
import styles from './InlineCode.module.css';

interface Props {
  children?: string;
  className?: string;
}

const InlineCode = ({ children, className }: Props): JSX.Element => (
  <code
    className={classNames(
      className,
      styles.code,
      'dark:text-light dark:shadow-primary dark:shadow-xl'
    )}
  >
    {children}
  </code>
);

export default InlineCode;
