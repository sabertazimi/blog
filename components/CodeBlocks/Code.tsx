import CopyButton from '@components/CopyButton';
import { classNames } from '@components/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styles from './Code.module.css';
import theme from './monokai';

interface Props {
  live?: boolean;
  noline?: boolean;
  nocopy?: boolean;
  children?: string;
  className?: string;
}

interface InlineProps {
  code?: string;
  className?: string;
}

interface BlockProps {
  enableLine?: boolean;
  enableCopy?: boolean;
  code?: string;
  className: string;
}

interface LiveProps {
  code?: string;
  className?: string;
}

const normalizeCode = (code: string = '') => code.replace(/\n+$/, '');

const InlineCode = ({ code, className }: InlineProps): JSX.Element => (
  <code className={classNames(className, styles.inline)}>{code}</code>
);

const BlockCode = ({
  enableLine,
  enableCopy,
  code,
  className,
}: BlockProps): JSX.Element => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={normalizeCode(code)}
    language={className.replace('language-', '') as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={classNames(className, styles.block)} style={style}>
        {enableCopy ? <CopyButton code={normalizeCode(code)} /> : null}
        {tokens.map((line, index) => (
          <div key={index} {...getLineProps({ line, key: index })}>
            {enableLine ? (
              <span className={styles['line-number']}>{index + 1}</span>
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

const LiveCode = ({ code, className }: LiveProps): JSX.Element => (
  <pre className={className}>{code}</pre>
);

const Code = ({
  live = false,
  noline = false,
  nocopy = false,
  children,
  className,
}: Props): JSX.Element =>
  live ? (
    <LiveCode code={children} className={className} />
  ) : className?.includes('language-') ? (
    <BlockCode
      enableLine={!noline}
      enableCopy={!nocopy}
      code={children}
      className={className}
    />
  ) : (
    <InlineCode code={children} className={className} />
  );

export default Code;
