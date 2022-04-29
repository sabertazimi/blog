import { classNames } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import styles from './Code.module.css';

interface Props extends HTMLProps<HTMLPreElement> {
  children?: ReactElement;
}

const alias = {
  md: 'Markdown',
  markdown: 'Markdown',
  js: 'JavaScript',
  jsx: 'React',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  tsx: 'React',
  typescript: 'TypeScript',
  vue: 'Vue',
};

type AliasKey = keyof typeof alias;

const getAlias = (language: string) =>
  alias[language.toLowerCase() as AliasKey] ?? language;

const Code = ({ children, className, ...props }: Props): JSX.Element => {
  const language = getAlias(
    (children?.props?.className as string)?.replace('language-', '') || 'Code'
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
