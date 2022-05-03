import { render } from '@testing-library/react';
import BlockCode from './BlockCode';

describe('BlockCode', () => {
  const languages = [
    'html',
    'xml',
    'yml',
    'yaml',
    'css',
    'json',
    'md',
    'markdown',
    'js',
    'javascript',
    'ts',
    'typescript',
    'coffee',
    'coffeescript',
    'jsx',
    'tsx',
    'objc',
    'objectivec',
    'vue',
    'go',
    'java',
    'rust',
  ];

  test.each(languages)(
    'should render different language correctly (snapshot)',
    language => {
      const { container } = render(
        <BlockCode className={`language-${language}`}>
          const foo = bar();
        </BlockCode>
      );

      expect(container).toMatchSnapshot();
    }
  );
});
