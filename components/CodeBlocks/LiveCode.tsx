import { classNames } from '@components/utils';
import styles from './LiveCode.module.css';
import { normalizeCode } from './utils';

interface Props {
  children?: string;
  className?: string;
}

const LiveCode = ({ children, className }: Props): JSX.Element => (
  <pre className={classNames(className, styles.code)}>
    {normalizeCode(children)}
  </pre>
);

export default LiveCode;
