import { classNames } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import Code from './Code';
import styles from './Pre.module.css';

interface Props extends HTMLProps<HTMLPreElement> {
  title?: string;
}

const normalizeLanguage = (language: string) => {
  switch (language) {
    case 'html':
      return 'HTML';
    case 'xml':
      return 'XML';
    case 'yml':
    case 'yaml':
      return 'YAML';
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
    case 'coffee':
    case 'coffeescript':
      return 'CoffeeScript';
    case 'jsx':
    case 'tsx':
      return 'React';
    case 'objc':
    case 'objectivec':
      return 'Objective-C';
    default:
      return language?.charAt(0)?.toUpperCase() + language?.slice(1) || 'Code';
  }
};

const Pre = ({
  title,
  children,
  className,
  ...props
}: Props): JSX.Element => {
  const codeElement = children as ReactElement;
  const code: string = codeElement?.props?.children;
  const languageClass: string = codeElement?.props?.className;
  const languageName = normalizeLanguage(
    languageClass?.replace('language-', '')
  );

  return (
    <pre
      className={classNames(className, languageClass, styles.pre)}
      data-language={title || languageName}
    >
      <Code {...props} className={languageClass}>
        {code}
      </Code>
    </pre>
  );
};

export default Pre;
