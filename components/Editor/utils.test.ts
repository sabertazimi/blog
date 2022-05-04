import { languageToFilepath, normalizeFilepath } from './utils';

describe('languageToFilepath', () => {
  test('should return /styles.css if language is css', () => {
    expect(languageToFilepath('css')).toBe('/styles.css');
  });

  test('should return /App.js if language is js', () => {
    expect(languageToFilepath('js')).toBe('/App.js');
    expect(languageToFilepath('javascript')).toBe('/App.js');
  });

  test('should return /App.ts if language is ts', () => {
    expect(languageToFilepath('ts')).toBe('/App.ts');
    expect(languageToFilepath('typescript')).toBe('/App.ts');
  });

  test('should return /App.jsx if language is jsx', () => {
    expect(languageToFilepath('jsx')).toBe('/App.jsx');
  });

  test('should return /App.tsx if language is tsx', () => {
    expect(languageToFilepath('tsx')).toBe('/App.tsx');
  });

  test('should return /src/App.vue if language is vue', () => {
    expect(languageToFilepath('vue')).toBe('/src/App.vue');
  });

  test('should return /App.tsx if language is not provided', () => {
    expect(languageToFilepath()).toBe('/App.tsx');
  });
});

describe('normalizeFilepath', () => {
  test('should return empty string if no filename is provided', () => {
    expect(normalizeFilepath()).toBe('');
  });

  test('should return filename if it starts with /', () => {
    expect(normalizeFilepath('/foo.tsx')).toBe('/foo.tsx');
  });

  test('should return /filename if it does not start with /', () => {
    expect(normalizeFilepath('foo.tsx')).toBe('/foo.tsx');
  });
});
