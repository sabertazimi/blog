import CopyButton from '@components/CopyButton';
import { classNames } from '@components/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import type { ReactNode } from 'react';
import styles from './Code.module.css';
import theme from './monokai';

interface Props {
  className?: string;
  children?: ReactNode;
}

const normalizeCode = (code: string) => code.replace(/\n+$/, '');

const InlineCode = ({ children, className, ...props }: Props): JSX.Element => (
  <code {...props} className={classNames(className, styles.inline)}>
    {children}
  </code>
);

const BlockCode = ({
  children,
  className,
  ...props
}: {
  children: string;
  className: string;
}): JSX.Element => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={normalizeCode(children)}
    language={className.replace('language-', '') as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        {...props}
        className={classNames(className, styles.block)}
        style={style}
      >
        <CopyButton code={normalizeCode(children)} />
        {tokens.map((line, index) => (
          <div key={index} {...getLineProps({ line, key: index })}>
            <span className={styles['line-number']}>{index + 1}</span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

const Code = ({ children, className, ...props }: Props): JSX.Element =>
  className?.includes('language-') ? (
    <BlockCode {...props} className={className}>
      {children as string}
    </BlockCode>
  ) : (
    <InlineCode {...props} className={className}>
      {children}
    </InlineCode>
  );

export default Code;
