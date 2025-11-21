import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to YYYY-MM-DD HH:MM
 * @param date - Date string, number, or Date object
 * @returns Formatted date string
 */
export function formatDate(date: string | number | Date | undefined | null): string {
  const d = date === undefined || date === null || date === '' ? new Date() : new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

function languageToFilepath(language?: string): string {
  switch (language) {
    case 'css':
      return '/styles.css'
    case 'js':
    case 'javascript':
      return '/App.js'
    case 'ts':
    case 'typescript':
      return '/App.ts'
    case 'jsx':
      return '/App.jsx'
    case 'tsx':
      return '/App.tsx'
    case 'vue':
      return '/src/App.vue'
    case undefined:
    default:
      return '/App.tsx'
  }
}

/**
 * Normalize filepath for code editor component
 * @param filename - Optional filename, defaults to language-based filepath if not provided
 * @param language - Programming language to determine default filepath
 * @returns Normalized filepath with leading slash
 */
export function normalizeFilepath(filename?: string, language?: string): string {
  if (filename == null || filename === '')
    return languageToFilepath(language)

  if (!filename.startsWith('/'))
    return `/${filename}`

  return filename
}
