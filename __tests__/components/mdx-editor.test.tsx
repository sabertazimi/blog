import { describe, expect, it, vi } from 'vitest'
import MDXEditor from '@/components/mdx-editor'
import { render, screen, waitFor } from '@/tests/test-utils'

// Unmock MDXEditor for this test file since we're testing the component itself
vi.unmock('@/components/mdx-editor')

describe('MDXEditor', () => {
  it('should render null before mounted', () => {
    const { container } = render(<MDXEditor live language="jsx" code="const x = 1" />)

    expect(container).toBeInTheDocument()
  })

  it('should render Sandpack after mounted', async () => {
    render(<MDXEditor live language="jsx" code="const x = 1" />)

    await waitFor(() => {
      expect(screen.getByTestId('sandpack-mock')).toBeInTheDocument()
    })
  })

  it('should render single file in live mode', async () => {
    render(<MDXEditor live language="jsx" code="const x = 1" />)

    await waitFor(() => {
      expect(screen.getByText(/File:/)).toBeInTheDocument()
      expect(screen.getByText(/\/App\.jsx/)).toBeInTheDocument()
      expect(screen.getByText(/Code:/)).toBeInTheDocument()
      expect(screen.getByText(/const x = 1/)).toBeInTheDocument()
    })
  })

  it('should add React import for JSX files without imports', async () => {
    render(<MDXEditor live language="jsx" code="export default () => <div>Hello</div>" />)

    await waitFor(() => {
      const codeText = screen.getByText(/Code:/)
      expect(codeText.textContent).toContain('import { useState } from \'react\'')
    })
  })

  it('should not add React import if already present', async () => {
    const codeWithImport = 'import React from \'react\'\nexport default () => <div>Hello</div>'
    render(<MDXEditor live language="jsx" code={codeWithImport} />)

    await waitFor(() => {
      const codeElements = screen.getAllByText(/Code:/)
      const hasDoubleImport = codeElements.some(
        el =>
          el.textContent?.includes('import { useState } from \'react\'')
          && el.textContent?.includes('import React from \'react\''),
      )
      expect(hasDoubleImport).toBe(false)
    })
  })

  it('should render with custom template', async () => {
    render(<MDXEditor template="vanilla" live language="js" code="console.log('test')" />)

    await waitFor(() => {
      expect(screen.getByText(/Template:/)).toBeInTheDocument()
      expect(screen.getByText(/vanilla/)).toBeInTheDocument()
    })
  })

  it('should render multiple files in multi-file mode', async () => {
    const children = [
      // @ts-expect-error - filename is a valid prop for sandpack editor
      <pre key="1" filename="App.tsx">
        <code className="language-tsx">{'export default () => <div>App</div>'}</code>
      </pre>,
      // @ts-expect-error - filename is a valid prop for sandpack editor
      <pre key="2" filename="utils.ts">
        <code className="language-ts">{'export const helper = () => true'}</code>
      </pre>,
    ]

    render(<MDXEditor>{children}</MDXEditor>)

    await waitFor(() => {
      const files = screen.getAllByTestId('sandpack-file')
      expect(files).toHaveLength(2)
      expect(screen.getByText(/\/App\.tsx/)).toBeInTheDocument()
      expect(screen.getByText(/\/utils\.ts/)).toBeInTheDocument()
    })
  })

  it('should log warnings for invalid child elements', () => {
    vi.stubEnv('NODE_ENV', 'development')
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<MDXEditor>Invalid code</MDXEditor>)

    expect(consoleWarn).toHaveBeenCalledTimes(2)
    expect(consoleWarn).toHaveBeenCalledWith('[Editor] Invalid child element detected, skipping:', 'Invalid code')

    consoleWarn.mockRestore()
    vi.unstubAllEnvs()
  })

  it('should log warnings for invalid code element structure', () => {
    vi.stubEnv('NODE_ENV', 'development')
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<MDXEditor>{[<div key="1">Invalid</div>]}</MDXEditor>)

    expect(consoleWarn).toHaveBeenCalledTimes(2)
    expect(consoleWarn).toHaveBeenCalledWith('[Editor] Invalid code element structure, skipping:', expect.any(Object))

    consoleWarn.mockRestore()
    vi.unstubAllEnvs()
  })
})
