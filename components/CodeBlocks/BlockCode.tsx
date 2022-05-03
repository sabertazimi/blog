import { classNames } from '@components/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styles from './BlockCode.module.css';
import theme from './monokai';

interface Props {
  enableLine?: boolean;
  lines?: Set<number>;
  children: string;
  className?: string;
}

const BlockCode = ({
  enableLine = true,
  lines = new Set(),
  children,
  className,
}: Props): JSX.Element => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={children}
    language={className?.replace('language-', '') as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={classNames(className, styles.code)} style={style}>
        {tokens.map((line, index) => (
          <div
            key={index}
            {...getLineProps({ line, key: index })}
            className={classNames(
              'token-line',
              lines.has(index + 1) ? styles.highlight : styles.hover
            )}
          >
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

export default BlockCode;
