import CopyButton from '@components/CopyButton';
import { classNames, dynamic } from '@components/utils';
import type { HTMLProps, ReactElement } from 'react';
import BlockCode from './BlockCode';
import styles from './Pre.module.css';
import { normalizeCode, normalizeLanguage, normalizeLines } from './utils';

const LiveCode = dynamic(() => import('./LiveCode'));

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
  const code = normalizeCode(codeElement?.props?.children);
  const languageClass = codeElement?.props?.className as string;
  const language = languageClass?.replace('language-', '');
  const languageName = normalizeLanguage(language);
  const highlightLines = normalizeLines(lines);

  return (
    <pre
      className={classNames(className, languageClass, styles.pre)}
      data-language={title || languageName}
    >
      {!nocopy && !live ? <CopyButton code={code} /> : null}
      {live ? (
        <LiveCode language={language}>{code}</LiveCode>
      ) : (
        <BlockCode
          enableLine={!noline}
          lines={highlightLines}
          language={language}
        >
          {code}
        </BlockCode>
      )}
    </pre>
  );
};

export default Pre;
