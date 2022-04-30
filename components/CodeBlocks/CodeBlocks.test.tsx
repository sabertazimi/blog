import { render } from '@testing-library/react';
import Code from './Code';
import Pre from './Pre';

describe('Code', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<Code />);

    expect(container).toMatchSnapshot();
  });

  test('should render children correctly (snapshot)', () => {
    const { container } = render(<Code>Code</Code>);

    expect(container).toMatchSnapshot();
  });

  test('should render raw code correctly (snapshot)', () => {
    const { container } = render(<Code className="language-ts">Code</Code>);

    expect(container).toMatchSnapshot();
  });
});

describe('Pre', () => {
  const languages = [
    'html',
    'css',
    'json',
    'md',
    'markdown',
    'js',
    'javascript',
    'ts',
    'typescript',
    'jsx',
    'tsx',
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
