import { classNames } from '@components/utils';
import styles from './InlineCode.module.css';

interface Props {
  children?: string;
  className?: string;
}

const InlineCode = ({ children, className }: Props): JSX.Element => (
  <code className={classNames(className, styles.code)}>{children}</code>
);

export default InlineCode;
