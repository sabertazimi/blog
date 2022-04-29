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

  test('should render language correctly (snapshot)', () => {
    const { container } = render(
      <Code>
        <code className="language-ts">Code</code>
      </Code>
    );

    expect(container).toMatchSnapshot();
  });
});
