import { classNames } from '@components/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styles from './BlockCode.module.css';
import theme from './monokai';
import { normalizeCode } from './utils';

interface Props {
  enableLine?: boolean;
  lines?: Set<number>;
  children?: string;
  className?: string;
}

const BlockCode = ({
  enableLine = true,
  lines = new Set(),
  children,
  className,
}: Props): JSX.Element => {
  const code = normalizeCode(children);
  const language = className?.replace('language-', '') as Language;

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classNames(className, styles.code)} style={style}>
          {tokens.map((line, index) => (
            <div key={index} {...getLineProps({ line, key: index })}>
              {lines.has(index + 1) ? (
                <span className={styles.highlight}></span>
              ) : (
                <span className={styles.hover}></span>
              )}
              {enableLine ? (
                <span className={styles.number}>{index + 1}</span>
              ) : (
                <span className={styles.placeholder}></span>
              )}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default BlockCode;
