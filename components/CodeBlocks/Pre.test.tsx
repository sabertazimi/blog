import { render } from '@testing-library/react';
import Pre from './Pre';

describe('Pre', () => {
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

  test('should render empty children correctly (snapshot)', () => {
    const { container } = render(<Pre />);

    expect(container).toMatchSnapshot();
  });

  test('should render empty className correctly (snapshot)', () => {
    const { container } = render(
      <Pre>
        <code>Code</code>
      </Pre>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render live code correctly (snapshot)', () => {
    const { container } = render(
      <Pre live={true}>
        <code>Code</code>
      </Pre>
    );

    expect(container).toMatchSnapshot();
  });

  test.each(languages)(
    'should render different language correctly (snapshot)',
    language => {
      const { container } = render(
        <Pre>
          <code className={`language-${language}`}>Code</code>
        </Pre>
      );

      expect(container).toMatchSnapshot();
    }
  );
});
