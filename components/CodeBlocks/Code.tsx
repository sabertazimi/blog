import { classNames } from '@components/utils';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import type { ReactNode } from 'react';
import styles from './Code.module.css';

interface Props {
  className?: string;
  children?: ReactNode;
}

const normalizeLanguage = (language: string) => {
  switch (language) {
    case 'html':
    case 'xml':
      return 'markup';
    case 'md':
      return 'markdown';
    case 'js':
      return 'javaScript';
    case 'ts':
      return 'typescript';
    case 'oc':
      return 'objectivec';
    case 'yml':
      return 'yaml';
    default:
      return 'typescript';
  }
};

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
    language={normalizeLanguage(className.replace('language-', '')) as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <code {...props} className={className} style={style}>
        {tokens.map((line, index) => (
          <div key={index} {...getLineProps({ line, key: index })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </code>
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
