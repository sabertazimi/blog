import { render } from '@testing-library/react';
import Code from './Code';
import InlineCode from './InlineCode';

describe('InlineCode', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(<InlineCode />);

    expect(container).toMatchSnapshot();
  });

  test('should render children correctly (snapshot)', () => {
    const { container } = render(<InlineCode>InlineCode</InlineCode>);

    expect(container).toMatchSnapshot();
  });

  test('should render raw code correctly (snapshot)', () => {
    const { container } = render(
      <InlineCode className="language-ts">InlineCode</InlineCode>
    );

    expect(container).toMatchSnapshot();
  });
});

describe('Code', () => {
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
    const { container } = render(<Code />);

    expect(container).toMatchSnapshot();
  });

  test('should render children correctly (snapshot)', () => {
    const { container } = render(
      <Code>
        <code>Code</code>
      </Code>
    );

    expect(container).toMatchSnapshot();
  });

  test.each(languages)(
    'should render language correctly (snapshot)',
    language => {
      const { container } = render(
        <Code>
          <code className={`language-${language}`}>Code</code>
        </Code>
      );

      expect(container).toMatchSnapshot();
    }
  );
});
