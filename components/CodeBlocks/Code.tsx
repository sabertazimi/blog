import { classNames } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import styles from './Code.module.css';

interface Props extends HTMLProps<HTMLPreElement> {}

const getAlias = (language: string) => {
  switch (language) {
    case 'html':
      return 'HTML';
    case 'css':
      return 'CSS';
    case 'json':
      return 'JSON';
    case 'md':
    case 'markdown':
      return 'Markdown';
    case 'js':
    case 'javascript':
      return 'JavaScript';
    case 'ts':
    case 'typescript':
      return 'TypeScript';
    case 'jsx':
    case 'tsx':
      return 'React';
    default:
      return language?.charAt(0)?.toUpperCase() + language?.slice(1) || 'Code';
  }
};

const Code = ({ children, className, ...props }: Props): JSX.Element => {
  const childrenElement = children as ReactElement;
  const language = getAlias(
    (childrenElement?.props?.className as string)?.replace('language-', '')
  );

  return (
    <pre
      {...props}
      className={classNames(className, styles.code)}
      data-language={language}
    >
      {children}
    </pre>
  );
};

export default Code;
