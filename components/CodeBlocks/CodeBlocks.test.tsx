import { render } from '@testing-library/react';
import Code from './Code';
import InlineCode from './InlineCode';

const CodeBlocks = {
  code: InlineCode,
  pre: Code,
};

describe('CodeBlocks', () => {
  test.each(Object.values(CodeBlocks))(
    'should render correctly (snapshot)',
    CodeBlock => {
      const { container } = render(<CodeBlock>CodeBlock</CodeBlock>);

      expect(container).toMatchSnapshot();
    }
  );
});
