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
 * Format date to YYYY-MM-DD HH:MM
 * @param date - Date string, number, or Date object
 * @returns Formatted date string
 */
export function formatDate(date: string | number | Date | undefined | null, showTime: boolean = false): string {
  const d = date === undefined || date === null || date === '' ? new Date() : new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  return showTime ? `${year}-${month}-${day} ${hour}:${minute}` : `${year}-${month}-${day}`
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
const LANGUAGE_DEFAULT_FILEPATHS: Record<string, string> = {
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
    return LANGUAGE_DEFAULT_FILEPATHS[language ?? ''] ?? '/App.tsx'
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
 * Language display name mapping
 */
const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  html: 'HTML',
  xml: 'XML',
  yml: 'YAML',
  yaml: 'YAML',
  css: 'CSS',
  json: 'JSON',
  md: 'Markdown',
  markdown: 'Markdown',
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  coffee: 'CoffeeScript',
  coffeescript: 'CoffeeScript',
  jsx: 'React',
  tsx: 'React',
  objc: 'Objective-C',
  objectivec: 'Objective-C',
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

  return LANGUAGE_DISPLAY_NAMES[language] || language.charAt(0).toUpperCase() + language.slice(1)
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
