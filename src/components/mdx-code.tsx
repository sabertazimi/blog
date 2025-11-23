'use client'

import type { JSX, ReactElement } from 'react'
import type { BundledLanguage } from 'shiki/bundle/web'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, useEffect, useState } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'
import MDXEditor from '@/components/mdx-editor'
import { CopyButton } from '@/components/ui/copy-button'
import { Skeleton } from '@/components/ui/skeleton'
import { useTheme } from '@/hooks/use-theme'
import {
  cn,
  getLanguageDisplayName,
  parseHighlightLines,
  parseLanguageFromClassName,
  trimTrailingNewlines,
} from '@/lib/utils'

interface CodeProps {
  children: string
  className?: string
}

interface MDXCodeProps {
  children: ReactElement<CodeProps>
  line?: string
  nocopy?: string
  lines?: string
  title?: string
  live?: string
}

async function highlight(
  code: string,
  lang: BundledLanguage,
  highlightLines: Set<number>,
  showLineNumbers: boolean,
  theme: 'light' | 'dark',
) {
  const hast = await codeToHast(code, {
    lang,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    defaultColor: theme,
  })

  if (hast.type === 'root' && hast.children.length > 0 && hast.children[0]?.type === 'element') {
    const pre = hast.children[0]
    if (pre.children.length > 0 && pre.children[0]?.type === 'element') {
      const codeElement = pre.children[0]
      let lineNumber = 0

      codeElement.children.forEach((line) => {
        if (line.type === 'element') {
          lineNumber++
          const properties = line.properties ?? {}
          const isHighlighted = highlightLines.has(lineNumber)

          if (showLineNumbers) {
            line.children.unshift({
              type: 'element',
              tagName: 'span',
              properties: {
                'className': 'inline-block w-12 select-none pr-4 text-right text-muted-foreground/50',
                'data-line-number': lineNumber,
              },
              children: [{ type: 'text', value: String(lineNumber) }],
            })
          }

          properties.className = cn(
            'block min-h-[1.5rem] border-l-2 border-transparent',
            showLineNumbers ? 'pl-4 pr-4' : 'px-4',
            isHighlighted ? 'border-l-primary/50 bg-primary/5' : 'hover:bg-muted/30',
          )
          properties['data-line'] = lineNumber
          line.properties = properties
        }
      })
    }
  }

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}

function MDXCode({ children, line = 'false', nocopy = 'false', lines = '', title = '', live = 'false' }: MDXCodeProps) {
  const codeElement = children
  const code = trimTrailingNewlines(codeElement?.props?.children)
  const languageClass = codeElement?.props?.className
  const language = parseLanguageFromClassName(languageClass)
  const languageName = getLanguageDisplayName(language)
  const highlightLines = parseHighlightLines(lines)
  const showLineNumbers = line === 'true'
  const showCopyButton = nocopy !== 'true'
  const isLive = live === 'true'
  const theme = useTheme()

  const [highlightedCode, setHighlightedCode] = useState<JSX.Element | null>(null)

  useEffect(() => {
    if (!isLive) {
      void highlight(code, language, highlightLines, showLineNumbers, theme).then(setHighlightedCode)
    }
  }, [code, language, highlightLines, showLineNumbers, isLive, theme])

  if (isLive) {
    return <MDXEditor template="react-ts" code={code} language={language} />
  }

  if (!highlightedCode) {
    return (
      <div className="group relative my-6">
        <div className="border-border bg-muted/30 flex items-center justify-between rounded-t-lg border border-b-0 px-4 py-2">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="border-border space-y-2 overflow-x-auto rounded-b-lg border p-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    )
  }

  return (
    <div className="group relative my-6">
      <div className="border-border bg-muted/30 flex items-center justify-between rounded-t-lg border border-b-0 px-4 py-2">
        <span className="text-muted-foreground text-xs font-medium">{title || languageName}</span>
        {showCopyButton && <CopyButton variant="outline" content={code} />}
      </div>
      <div
        className={cn(
          'border-border overflow-x-auto rounded-b-lg border',
          '[&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0',
          '[&_pre]:bg-transparent [&_pre]:p-0',
          '[&_code]:grid [&_code]:text-sm',
        )}
      >
        {highlightedCode}
      </div>
    </div>
  )
}

export default MDXCode
