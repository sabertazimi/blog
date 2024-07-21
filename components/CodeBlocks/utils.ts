import parseNumericRange from 'parse-numeric-range'
import type { Language } from 'prism-react-renderer'

const normalizeCode = (code: string = '') => code.replace(/\n+$/, '')

function isLanguage(language: string): language is Language {
  return language.length > 0
}

function normalizeLanguage(languageClass?: string): Language {
  if (languageClass != null) {
    const language = languageClass.replace('language-', '')

    if (isLanguage(language))
      return language
  }

  return 'typescript'
}

function normalizeLanguageName(language: string): string {
  switch (language) {
    case 'html':
      return 'HTML'
    case 'xml':
      return 'XML'
    case 'yml':
    case 'yaml':
      return 'YAML'
    case 'css':
      return 'CSS'
    case 'json':
      return 'JSON'
    case 'md':
    case 'markdown':
      return 'Markdown'
    case 'js':
    case 'javascript':
      return 'JavaScript'
    case 'ts':
    case 'typescript':
      return 'TypeScript'
    case 'coffee':
    case 'coffeescript':
      return 'CoffeeScript'
    case 'jsx':
    case 'tsx':
      return 'React'
    case 'objc':
    case 'objectivec':
      return 'Objective-C'
    default:
      return language.charAt(0).toUpperCase() + language.slice(1)
  }
}

function normalizeLines(expression: string): Set<number> {
  return new Set(parseNumericRange(expression))
}

export {
  normalizeCode,
  normalizeLanguage,
  normalizeLanguageName,
  normalizeLines,
}
