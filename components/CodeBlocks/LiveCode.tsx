import { classNames } from '@components/utils';
import styles from './LiveCode.module.css';
import { normalizeCode } from './utils';

interface Props {
  code?: string;
  className?: string;
}

const LiveCode = ({ code, className }: Props): JSX.Element => (
  <pre className={classNames(className, styles.code)}>
    {normalizeCode(code)}
  </pre>
);

export default LiveCode;
