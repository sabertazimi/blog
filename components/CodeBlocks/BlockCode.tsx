import CopyButton from '@components/CopyButton';
import { classNames } from '@components/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styles from './BlockCode.module.css';
import theme from './monokai';
import { normalizeCode } from './utils';

interface Props {
  enableLine: boolean;
  enableCopy: boolean;
  children?: string;
  className?: string;
}

const BlockCode = ({
  enableLine,
  enableCopy,
  children,
  className,
}: Props): JSX.Element => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={normalizeCode(children)}
    language={className?.replace('language-', '') as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={classNames(className, styles.code)} style={style}>
        {enableCopy ? <CopyButton code={normalizeCode(children)} /> : null}
        {tokens.map((line, index) => (
          <div key={index} {...getLineProps({ line, key: index })}>
            {enableLine ? (
              <span className={styles.line}>{index + 1}</span>
            ) : null}
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default BlockCode;
