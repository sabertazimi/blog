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

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Pre />);

    expect(container).toMatchSnapshot();
  });

  test('should render children correctly (snapshot)', () => {
    const { container } = render(
      <Pre>
        <code>Code</code>
      </Pre>
    );

    expect(container).toMatchSnapshot();
  });

  test.each(languages)(
    'should render language correctly (snapshot)',
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
