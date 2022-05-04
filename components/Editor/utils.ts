const normalizeFilepath = (filename?: string): string => {
  if (!filename) {
    return '';
  }

  if (!filename.startsWith('/')) {
    return `/${filename}`;
  }

  return filename;
};

const languageToFilepath = (language?: string): string => {
  switch (language) {
    case 'css':
      return '/styles.css';
    case 'js':
    case 'javascript':
      return '/App.js';
    case 'ts':
    case 'typescript':
      return '/App.ts';
    case 'jsx':
      return '/App.jsx';
    case 'tsx':
      return '/App.tsx';
    case 'vue':
      return '/src/App.vue';
    default:
      return '/App.tsx';
  }
};

export { languageToFilepath, normalizeFilepath };
