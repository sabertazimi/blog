'use client'

import type { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import type { ReactElement, ReactNode } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { githubLight, sandpackDark } from '@codesandbox/sandpack-themes'
import { useTheme } from 'next-themes'
import { Children, isValidElement, useEffect, useState } from 'react'
import { normalizeFilepath } from '@/lib/utils'

interface MDXEditorProps {
  template?: SandpackPredefinedTemplate
  // Single-file mode (from live="true"): provide language and code
  live?: boolean
  language?: string
  code?: string
  // Multi-file mode (from <Editor> component): provide children
  children?: ReactNode
}

interface CodeProps {
  children: string
  className?: string
}

interface PreProps {
  children: ReactElement<CodeProps>
  filename?: string
}

function getSingleFileConfig(language: string, code: string): Record<string, { code: string }> {
  const filePath = normalizeFilepath(undefined, language)

  const isReactFile = language === 'jsx' || language === 'tsx'
  const hasImport = code.includes('import')
  const needsReactImport = isReactFile && !hasImport

  const finalCode = needsReactImport ? `import { useState } from 'react'\n\n${code}` : code

  return {
    [filePath]: { code: finalCode },
  }
}

function getMultiFileConfig(children: ReactNode): Record<string, { code: string }> {
  // eslint-disable-next-line react/no-children-to-array -- Transform children to array for processing
  const codeSnippets = Children.toArray(children)
  return codeSnippets.reduce((result: Record<string, { code: string }>, codeSnippet) => {
    if (!isValidElement(codeSnippet)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Editor] Invalid child element detected, skipping:', codeSnippet)
      }

      return result
    }

    const preElement = codeSnippet as ReactElement<PreProps>
    const codeElement = preElement.props?.children

    if (codeElement === null || codeElement === undefined || !isValidElement(codeElement)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Editor] Invalid code element structure, skipping:', preElement)
      }

      return result
    }

    const filename = preElement.props.filename
    const lang = codeElement.props.className?.replace('language-', '')
    const filePath = normalizeFilepath(filename, lang)
    const fileCode = codeElement.props.children

    result[filePath] = {
      code: fileCode,
    }

    return result
  }, {})
}

export function MDXEditor({ template = 'react-ts', live = false, language, code, children }: MDXEditorProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const files: Record<string, { code: string }> = live
    ? getSingleFileConfig(language!, code!)
    : getMultiFileConfig(children)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="my-6 shadow-xl">
      <Sandpack
        customSetup={{
          dependencies: {},
        }}
        files={files}
        options={{
          showLineNumbers: true,
          showInlineErrors: false,
          showTabs: !live,
          externalResources: [],
        }}
        template={template}
        theme={resolvedTheme === 'dark' ? sandpackDark : githubLight}
      />
    </div>
  )
}
