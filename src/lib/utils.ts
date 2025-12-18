import type { ClassValue } from 'clsx'
import type { BundledLanguage } from 'shiki/bundle/web'
import { clsx } from 'clsx'
import parseNumericRange from 'parse-numeric-range'
import { bundledLanguages } from 'shiki/bundle/web'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get tag URL path
 * @param tag - Tag name
 * @returns Tag URL path (e.g., '/posts' or '/tag/react')
 */
export function getTagUrl(tag: string) {
  return tag === 'All' ? '/posts' : `/tag/${encodeURIComponent(tag)}`
}

/**
 * Language to default filepath mapping for code editor
 */
const LanguageDefaultFilepaths: Record<string, string> = {
  css: '/styles.css',
  js: '/App.js',
  javascript: '/App.js',
  ts: '/App.ts',
  typescript: '/App.ts',
  jsx: '/App.jsx',
  tsx: '/App.tsx',
  vue: '/src/App.vue',
}

/**
 * Normalize filepath for code editor component
 * Ensures filepath has leading slash and provides language-based defaults
 * @param filename - Optional filename
 * @param language - Programming language to determine default filepath
 * @returns Normalized filepath with leading slash (e.g., '/App.tsx')
 */
export function normalizeFilepath(filename?: string, language?: string): string {
  // If no filename provided, generate default based on language
  if (filename == null || filename === '') {
    return LanguageDefaultFilepaths[language ?? ''] ?? '/App.tsx'
  }

  // Ensure leading slash
  return filename.startsWith('/') ? filename : `/${filename}`
}

/**
 * Trim trailing newlines from code string
 * @param code - Code string to trim
 * @returns Code string without trailing newlines
 */
export function trimTrailingNewlines(code: string = ''): string {
  return code.replace(/\n+$/, '')
}

/**
 * Parse language identifier from MDX className
 * @param languageClass - MDX className (e.g., 'language-typescript')
 * @returns Language identifier for syntax highlighting (defaults to 'typescript')
 */
export function parseLanguageFromClassName(languageClass?: string): BundledLanguage {
  if (languageClass === undefined || languageClass === null || languageClass.trim() === '') {
    return 'typescript'
  }

  const language = languageClass.replace('language-', '')
  return language in bundledLanguages ? (language as BundledLanguage) : 'typescript'
}

/**
 * Convert display names that are not capitalized
 * Example: 'angular-ts' -> 'Angular'
 */
const LanguageDisplayNames: Record<string, string> = {
  'html': 'HTML',
  'xml': 'XML',
  'css': 'CSS',
  'styl': 'Stylus',
  'postcss': 'PostCSS',
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'cjs': 'JavaScript',
  'mjs': 'JavaScript',
  'jsx': 'React',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'cts': 'TypeScript',
  'mts': 'TypeScript',
  'tsx': 'React',
  'coffee': 'CoffeeScript',
  'coffeescript': 'CoffeeScript',
  'vue-html': 'Vue',
  'angular-html': 'Angular',
  'angular-ts': 'Angular',
  'md': 'Markdown',
  'markdown': 'Markdown',
  'mdc': 'Markdown',
  'mdx': 'MDX',
  'json': 'JSON',
  'json5': 'JSON',
  'jsonc': 'JSON',
  'jsonl': 'JSON',
  'yaml': 'YAML',
  'yml': 'YAML',
  'csv': 'CSV',
  'shellscript': 'Shell',
  'sh': 'Shell',
  'cpp': 'C++',
  'php': 'PHP',
  'py': 'Python',
  'jl': 'Julia',
  'cs': 'C#',
  'csharp': 'C#',
  'objc': 'Objective-C',
  'objectivec': 'Objective-C',
  'sql': 'SQL',
  'graphql': 'GraphQL',
  'gql': 'GraphQL',
  'http': 'HTTP',
  'https': 'HTTPS',
  'wasm': 'WebAssembly',
  'wit': 'WebAssembly',
  'glsl': 'GLSL',
  'wgsl': 'WGSL',
}

/**
 * Get formatted display name for programming language
 * @param language - Language identifier (e.g., 'typescript', 'jsx')
 * @returns Formatted display name (e.g., 'TypeScript', 'React'), or empty string if language is not provided
 */
export function getLanguageDisplayName(language?: string): string {
  if (language === undefined || language === null || language.trim() === '') {
    return ''
  }

  return LanguageDisplayNames[language] || language.charAt(0).toUpperCase() + language.slice(1)
}

/**
 * Parse line number range expression into set of line numbers
 * @param expression - Range expression (e.g., '1-3,5,7-9')
 * @returns Set of line numbers to highlight, or empty set if expression is not provided
 */
export function parseHighlightLines(expression?: string): Set<number> {
  if (expression === undefined || expression === null || expression.trim() === '') {
    return new Set()
  }

  return new Set(parseNumericRange(expression))
}
