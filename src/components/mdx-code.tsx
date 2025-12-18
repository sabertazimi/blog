'use client'

import type { JSX, ReactElement } from 'react'
import type { BundledLanguage } from 'shiki/bundle/web'
import {
  SiAngular,
  SiAstro,
  SiC,
  SiCoffeescript,
  SiCplusplus,
  SiCss,
  SiGnometerminal,
  SiGnubash,
  SiGooglesheets,
  SiGraphql,
  SiHandlebarsdotjs,
  SiHtml5,
  SiJavascript,
  SiJinja,
  SiJson,
  SiJulia,
  SiLaravel,
  SiLess,
  SiLit,
  SiMarkdown,
  SiMarko,
  SiMdx,
  SiOpenjdk,
  SiPhp,
  SiPostcss,
  SiPostgresql,
  SiPug,
  SiPython,
  SiR,
  SiReact,
  SiRuby,
  SiSass,
  SiStylus,
  SiSvelte,
  SiTypescript,
  SiVuedotjs,
  SiWebassembly,
  SiXml,
  SiYaml,
  SiZsh,
} from '@icons-pack/react-simple-icons'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { CodeIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Fragment, useEffect, useState } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'
import { MDXEditor } from '@/components/mdx-editor'
import { CopyButton } from '@/components/ui/copy-button'
import { Skeleton } from '@/components/ui/skeleton'
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

const LanguageIcons: Partial<Record<BundledLanguage, React.ElementType>> = {
  // Markup Languages
  'html': SiHtml5,
  'html-derivative': SiHtml5,
  'xml': SiXml,

  // Styling Languages
  'css': SiCss,
  'less': SiLess,
  'sass': SiSass,
  'scss': SiSass,
  'styl': SiStylus,
  'stylus': SiStylus,
  'postcss': SiPostcss,

  // Scripting Languages
  'js': SiJavascript,
  'javascript': SiJavascript,
  'cjs': SiJavascript,
  'mjs': SiJavascript,
  'jsx': SiReact,
  'ts': SiTypescript,
  'typescript': SiTypescript,
  'cts': SiTypescript,
  'mts': SiTypescript,
  'tsx': SiReact,
  'ts-tags': SiTypescript,
  'coffee': SiCoffeescript,
  'coffeescript': SiCoffeescript,

  // Frontend Frameworks
  'vue': SiVuedotjs,
  'vue-html': SiVuedotjs,
  'vue-vine': SiVuedotjs,
  'svelte': SiSvelte,
  'astro': SiAstro,
  'angular-html': SiAngular,
  'angular-ts': SiAngular,
  'lit': SiLit,
  'marko': SiMarko,

  // Markdown
  'md': SiMarkdown,
  'markdown': SiMarkdown,
  'mdc': SiMarkdown,
  'mdx': SiMdx,

  // Data formats
  'json': SiJson,
  'json5': SiJson,
  'jsonc': SiJson,
  'jsonl': SiJson,
  'yaml': SiYaml,
  'yml': SiYaml,
  'csv': SiGooglesheets,

  // Shell Scripts
  'shell': SiGnometerminal,
  'shellscript': SiGnometerminal,
  'sh': SiGnometerminal,
  'bash': SiGnubash,
  'zsh': SiZsh,

  // Backend languages
  'c': SiC,
  'cpp': SiCplusplus,
  'c++': SiCplusplus,
  'java': SiOpenjdk,
  'php': SiPhp,
  'python': SiPython,
  'py': SiPython,
  'r': SiR,
  'julia': SiJulia,
  'jl': SiJulia,

  // Query languages
  'sql': SiPostgresql,
  'graphql': SiGraphql,
  'gql': SiGraphql,

  // Template engines
  'handlebars': SiHandlebarsdotjs,
  'hbs': SiHandlebarsdotjs,
  'pug': SiPug,
  'jade': SiPug,
  'jinja': SiJinja,
  'blade': SiLaravel,
  'haml': SiRuby,

  // Others
  'http': CodeIcon,
  'hurl': CodeIcon,
  'wasm': SiWebassembly,
  'wit': SiWebassembly,
  'glsl': SiWebassembly,
  'wgsl': SiWebassembly,
  'regex': CodeIcon,
  'regexp': CodeIcon,
  'jison': CodeIcon,
  'imba': CodeIcon,
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
            showLineNumbers ? 'px-0' : 'px-4',
            isHighlighted ? 'border-l-primary/50 bg-primary/5' : 'hover:bg-muted/50',
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

export function MDXCode({
  children,
  line = 'false',
  nocopy = 'false',
  lines = '',
  title = '',
  live = 'false',
}: MDXCodeProps) {
  const codeElement = children
  const code = trimTrailingNewlines(codeElement?.props?.children)
  const languageClass = codeElement?.props?.className
  const language = parseLanguageFromClassName(languageClass)
  const languageName = getLanguageDisplayName(language)
  const LanguageIcon = LanguageIcons[language] ?? CodeIcon
  const highlightLines = parseHighlightLines(lines)
  const showLineNumbers = line === 'true'
  const showCopyButton = nocopy !== 'true'
  const isLive = live === 'true'
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState<JSX.Element | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLive && mounted && resolvedTheme !== null && resolvedTheme !== undefined) {
      const theme = resolvedTheme === 'dark' ? 'dark' : 'light'
      highlight(code, language, highlightLines, showLineNumbers, theme)
        .then(setHighlightedCode)
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[MDXCode] Failed to highlight code with language "${language}":`, error)
          }
        })
    }
  }, [code, language, highlightLines, showLineNumbers, isLive, resolvedTheme, mounted])

  if (isLive) {
    return <MDXEditor live language={language} code={code} />
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
        <div className="inline-flex items-center gap-2">
          <LanguageIcon className="size-4" />
          <span className="text-muted-foreground text-xs font-medium">{title || languageName}</span>
        </div>
        {showCopyButton && <CopyButton variant="outline" content={code} />}
      </div>
      <div
        className={cn(
          'border-border overflow-x-auto rounded-b-lg border',
          '[&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0',
          '[&_pre]:bg-transparent [&_pre]:p-0!',
          '[&_code]:grid [&_code]:py-4 [&_code]:text-sm',
        )}
      >
        {highlightedCode}
      </div>
    </div>
  )
}
