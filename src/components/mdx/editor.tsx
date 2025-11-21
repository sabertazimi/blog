'use client'

import type { SandpackPredefinedTemplate, SandpackTheme } from '@codesandbox/sandpack-react'
import type { ReactElement, ReactNode } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { monokaiPro } from '@codesandbox/sandpack-themes'
import { Children, isValidElement } from 'react'
import { normalizeFilepath } from '@/lib/utils'

interface EditorProps {
  template?: SandpackPredefinedTemplate
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

function Editor({ template = 'react-ts', children }: EditorProps) {
  // eslint-disable-next-line react/no-children-to-array -- Transform children to array for processing
  const codeSnippets = Children.toArray(children)
  const files = codeSnippets.reduce((result: Record<string, { code: string }>, codeSnippet) => {
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
    const language = codeElement.props.className?.replace('language-', '')
    const filePath = normalizeFilepath(filename, language)
    const code = codeElement.props.children

    result[filePath] = {
      code,
    }

    return result
  }, {})

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
          showTabs: true,
          externalResources: [],
        }}
        template={template}
        theme={monokaiPro as SandpackTheme}
      />
    </div>
  )
}

export default Editor
