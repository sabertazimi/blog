import { render, screen } from '@testing-library/react';
import Editor from './Editor';

describe('Editor', () => {
  test('should render sandpack correctly', () => {
    render(
      <Editor>
        <pre>
          <code className="tsx">const foo = bar();</code>
        </pre>
        {/* @ts-expect-error code meta data */}
        <pre filename="bar.tsx">
          <code className="tsx">const bar = foo();</code>
        </pre>
      </Editor>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toContainElement(
      screen.getByText('App.tsx')
    );
    expect(screen.getByRole('tablist')).toContainElement(
      screen.getByText('bar.tsx')
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByRole('group')).toContainElement(
      screen.getByText('const foo = bar();')
    );
  });
});
