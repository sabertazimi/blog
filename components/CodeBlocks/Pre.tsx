import { classNames } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import styles from './Pre.module.css';

interface Props extends HTMLProps<HTMLPreElement> {}

const normalizeLanguage = (language: string) => {
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

const Pre = ({ children, className, ...props }: Props): JSX.Element => {
  const childrenElement = children as ReactElement;
  const languageClass: string = childrenElement?.props?.className;
  const language = normalizeLanguage(languageClass?.replace('language-', ''));

  return (
    <pre
      {...props}
      className={classNames(className, languageClass, styles.pre)}
      data-language={language}
    >
      {children}
    </pre>
  );
};

export default Pre;
