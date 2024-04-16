import cx from 'classnames'
import dynamic from 'next/dynamic'
import type { HTMLProps, ReactElement } from 'react'
import BlockCode from './BlockCode'
import styles from './Pre.module.css'
import {
  normalizeCode,
  normalizeLanguage,
  normalizeLanguageName,
  normalizeLines,
} from './utils'
import CopyButton from '@/components/CopyButton'

const LiveCode = dynamic(() => import('./LiveCode'))

interface Props extends HTMLProps<HTMLPreElement> {
  live?: boolean
  noline?: boolean
  nocopy?: boolean
  title?: string
  lines?: string
}

interface CodeProps {
  children?: string
  className?: string
}

function Pre({
  live = false,
  noline = false,
  nocopy = false,
  title = '',
  lines = '',
  children,
  className,
}: Props): JSX.Element {
  const codeElement = children as ReactElement<CodeProps>
  const code = normalizeCode(codeElement?.props?.children)
  const languageClass = codeElement?.props?.className
  const language = normalizeLanguage(languageClass)
  const languageName = normalizeLanguageName(language)
  const highlightLines = normalizeLines(lines)

  return (
    <pre
      className={cx(
        className,
        languageClass,
        styles.pre,
        'dark:shadow-xl dark:shadow-primary',
      )}
      data-language={title || languageName}
    >
      {!nocopy && !live ? <CopyButton code={code} /> : null}
      {live
        ? (
          <LiveCode language={language}>{code}</LiveCode>
          )
        : (
          <BlockCode
            enableLine={!noline}
            lines={highlightLines}
            language={language}
          >
            {code}
          </BlockCode>
          )}
    </pre>
  )
}

export default Pre
