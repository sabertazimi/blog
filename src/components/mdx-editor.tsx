'use client'

import type { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import type { ReactElement, ReactNode } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { githubLight, sandpackDark } from '@codesandbox/sandpack-themes'
import { Children, isValidElement } from 'react'
import { useTheme } from '@/hooks/use-theme'
import { normalizeFilepath } from '@/lib/utils'

interface MDXEditorProps {
  template?: SandpackPredefinedTemplate
  language?: string
  code?: string
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

function MDXEditor({ template = 'react-ts', language, code, children }: MDXEditorProps) {
  const theme = useTheme()
  let files: Record<string, { code: string }>
  const isSingleFile
    = language !== undefined && language !== null && language !== '' && code !== undefined && code !== null && code !== ''

  if (isSingleFile) {
    const filePath = normalizeFilepath(undefined, language)
    files = {
      [filePath]: { code },
    }
  } else {
    // eslint-disable-next-line react/no-children-to-array -- Transform children to array for processing
    const codeSnippets = Children.toArray(children)
    files = codeSnippets.reduce((result: Record<string, { code: string }>, codeSnippet) => {
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
          showTabs: !isSingleFile,
          externalResources: [],
        }}
        template={template}
        theme={theme === 'dark' ? sandpackDark : githubLight}
      />
    </div>
  )
}

export default MDXEditor
