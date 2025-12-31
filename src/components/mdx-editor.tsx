'use client'

import type { SandpackPredefinedTemplate, SandpackTheme } from '@codesandbox/sandpack-react'
import type { ReactElement, ReactNode } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
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

/**
 *
 * @param {string} theme - 'light' or 'dark'
 * @returns {SandpackTheme} The theme object
 * @see https://github.com/antfu/vscode-theme-vitesse/blob/main/themes/vitesse-light.json
 * @see https://github.com/antfu/vscode-theme-vitesse/blob/main/themes/vitesse-dark.json
 */
function buildThemeFromPalette(theme?: string): SandpackTheme {
  const isDark = theme === 'dark'

  if (isDark) {
    return {
      colors: {
        surface1: '#121212',
        surface2: '#181818',
        surface3: '#191919',
        base: '#808080',
        clickable: '#999999',
        disabled: '#4d4d4d',
        hover: '#c5c5c5',
        accent: '#80a665',
        error: '#cb7676',
        warning: '#d4976c',
        errorSurface: '#cb767620',
        warningSurface: '#d4976c20',
      },
      syntax: {
        plain: '#dbd7caee',
        comment: { color: '#758575dd', fontStyle: 'italic' },
        keyword: '#4d9375',
        definition: '#80a665',
        punctuation: '#666666',
        property: '#b8a965',
        tag: '#4d9375',
        static: '#cb7676',
        string: '#c98a7d',
      },
      font: {
        body: 'var(--font-sans)',
        mono: 'var(--font-mono)',
        size: '13px',
        lineHeight: '20px',
      },
    }
  }

  return {
    colors: {
      surface1: '#ffffff',
      surface2: '#f7f7f7',
      surface3: '#f0f0f0',
      base: '#24292e',
      clickable: '#959da5',
      disabled: '#d1d4d8',
      hover: '#24292e',
      accent: '#24292e',
      error: '#ab5959',
      warning: '#a65e2b',
      errorSurface: '#ab595920',
      warningSurface: '#a65e2b20',
    },
    syntax: {
      plain: '#393a34',
      comment: { color: '#a0ada0', fontStyle: 'italic' },
      keyword: '#1e754f',
      definition: '#59873a',
      punctuation: '#999999',
      property: '#998418',
      tag: '#1e754f',
      static: '#ab5959',
      string: '#b56959',
    },
    font: {
      body: 'var(--font-sans)',
      mono: 'var(--font-mono)',
      size: '13px',
      lineHeight: '20px',
    },
  }
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
        theme={buildThemeFromPalette(resolvedTheme)}
      />
    </div>
  )
}
