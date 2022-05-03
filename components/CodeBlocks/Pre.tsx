import CopyButton from '@components/CopyButton';
import { classNames } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import BlockCode from './BlockCode';
import LiveCode from './LiveCode';
import styles from './Pre.module.css';
import { normalizeLanguage, normalizeLines } from './utils';

interface Props extends HTMLProps<HTMLPreElement> {
  live?: boolean;
  noline?: boolean;
  nocopy?: boolean;
  title?: string;
  lines?: string;
}

const Pre = ({
  live = false,
  noline = false,
  nocopy = false,
  title = '',
  lines = '',
  children,
  className,
}: Props): JSX.Element => {
  const codeElement = children as ReactElement;
  const code: string = codeElement?.props?.children;
  const languageClass: string = codeElement?.props?.className;
  const languageName = normalizeLanguage(
    languageClass?.replace('language-', '')
  );
  const highlightLines = normalizeLines(lines);

  return (
    <pre
      className={classNames(className, languageClass, styles.pre)}
      data-language={title || languageName}
    >
      {!nocopy ? <CopyButton code={code} /> : null}
      {live ? (
        <LiveCode code={code} className={languageClass} />
      ) : (
        <BlockCode
          enableLine={!noline}
          lines={highlightLines}
          className={languageClass}
        >
          {code}
        </BlockCode>
      )}
    </pre>
  );
};

export default Pre;
