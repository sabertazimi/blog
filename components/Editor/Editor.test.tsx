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
    expect(screen.getByText('App.tsx')).toBeInTheDocument();
    expect(screen.getByText('bar.tsx')).toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('const foo = bar();')).toBeInTheDocument();
  });
});
