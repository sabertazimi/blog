import Editor from './Editor'
import { render, screen } from '@/utils'

describe('Editor', () => {
  it('should render sandpack correctly', () => {
    render(
      <Editor>
        <pre>
          <code className="tsx">const foo = bar();</code>
        </pre>
        {/* @ts-expect-error code metadata */}
        <pre filename="bar.tsx">
          <code className="tsx">const bar = foo();</code>
        </pre>
      </Editor>,
    )

    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toContainElement(
      screen.getByText('App.tsx'),
    )
    expect(screen.getByRole('tablist')).toContainElement(
      screen.getByText('bar.tsx'),
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toContainElement(
      screen.getByText('const'),
    )
    expect(screen.getByRole('textbox')).toContainElement(
      screen.getByText('foo'),
    )
    expect(screen.getByRole('textbox')).toContainElement(
      screen.getByText('bar'),
    )
  })
})
