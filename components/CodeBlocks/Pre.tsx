import { classNames } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import BlockCode from './BlockCode';
import LiveCode from './LiveCode';
import styles from './Pre.module.css';
import { normalizeLanguage } from './utils';

interface Props extends HTMLProps<HTMLPreElement> {
  live?: boolean;
  noline?: boolean;
  nocopy?: boolean;
  title?: string;
}

const Pre = ({
  live = false,
  noline = false,
  nocopy = false,
  title,
  children,
  className,
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
      {live ? (
        <LiveCode className={languageClass}>{code}</LiveCode>
      ) : (
        <BlockCode
          enableLine={!noline}
          enableCopy={!nocopy}
          className={languageClass}
        >
          {code}
        </BlockCode>
      )}
    </pre>
  );
};

export default Pre;
