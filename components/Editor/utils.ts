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

function normalizeFilepath(filename?: string, language?: string): string {
  if (filename == null || filename === '')
    return languageToFilepath(language)

  if (!filename.startsWith('/'))
    return `/${filename}`

  return filename
}

export { normalizeFilepath }
