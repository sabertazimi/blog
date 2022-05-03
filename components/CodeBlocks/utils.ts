const normalizeCode = (code: string = '') => code.replace(/\n+$/, '');

const normalizeLanguage = (language: string) => {
  switch (language) {
    case 'html':
      return 'HTML';
    case 'xml':
      return 'XML';
    case 'yml':
    case 'yaml':
      return 'YAML';
    case 'css':
      return 'CSS';
    case 'json':
      return 'JSON';
    case 'md':
    case 'markdown':
      return 'Markdown';
    case 'js':
    case 'javascript':
      return 'JavaScript';
    case 'ts':
    case 'typescript':
      return 'TypeScript';
    case 'coffee':
    case 'coffeescript':
      return 'CoffeeScript';
    case 'jsx':
    case 'tsx':
      return 'React';
    case 'objc':
    case 'objectivec':
      return 'Objective-C';
    default:
      return language?.charAt(0)?.toUpperCase() + language?.slice(1) || 'Code';
  }
};

export { normalizeCode, normalizeLanguage };
