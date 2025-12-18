import { describe, expect, it, vi } from 'vitest'
import { MDXCode } from '@/components/mdx-code'
import { render, screen, waitFor } from '@/tests/test-utils'

vi.mock('shiki/bundle/web', () => ({
  codeToHast: vi.fn(async () =>
    Promise.resolve({
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'pre',
          children: [
            {
              type: 'element',
              tagName: 'code',
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {},
                  children: [{ type: 'text', value: 'const x = 1' }],
                },
              ],
            },
          ],
        },
      ],
    }),
  ),
  bundledLanguages: {},
}))

describe('MDXCode', () => {
  const createCodeElement = (code: string, language = 'typescript') => ({
    props: {
      children: code,
      className: `language-${language}`,
    },
  })

  it('should render skeleton while loading', () => {
    const codeElement = createCodeElement('const x = 1')
    render(<MDXCode>{codeElement as any}</MDXCode>)

    expect(screen.getAllByRole('status')).toHaveLength(5)
  })

  it('should render highlighted code after loading', async () => {
    const codeElement = createCodeElement('const x = 1')
    render(<MDXCode>{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.getByText('const x = 1')).toBeInTheDocument()
    })
  })

  it('should render language name in header', async () => {
    const codeElement = createCodeElement('const x = 1', 'typescript')
    render(<MDXCode>{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })
  })

  it('should render custom title when provided', async () => {
    const codeElement = createCodeElement('const x = 1')
    render(<MDXCode title="example.ts">{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.getByText('example.ts')).toBeInTheDocument()
    })
  })

  it('should render copy button by default', async () => {
    const codeElement = createCodeElement('const x = 1')
    render(<MDXCode>{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
    })
  })

  it('should render line numbers when line is true', async () => {
    const codeElement = createCodeElement('const x = 1')
    render(<MDXCode line="true">{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  it('should not render copy button when nocopy is true', async () => {
    const codeElement = createCodeElement('const x = 1')
    render(<MDXCode nocopy="true">{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument()
    })
  })

  it('should render MDXEditor when live is true', async () => {
    const codeElement = createCodeElement('const x = 1', 'jsx')
    render(<MDXCode live="true">{codeElement as any}</MDXCode>)

    await waitFor(() => {
      expect(screen.getByTestId('mdx-editor-mock')).toBeInTheDocument()
    })
    expect(screen.getByText(/Language:/)).toBeInTheDocument()
    expect(screen.getByText(/Code:/)).toBeInTheDocument()
  })
})
