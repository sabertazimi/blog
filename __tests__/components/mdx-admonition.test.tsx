import { describe, expect, it } from 'vitest'
import { MDXAdmonition } from '@/components/mdx-admonition'
import { render, screen } from '@/tests/test-utils'

describe('MDXAdmonition', () => {
  it('should render with default info type when type is not provided', () => {
    render(<MDXAdmonition>Test content</MDXAdmonition>)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('should render with provided type', () => {
    render(<MDXAdmonition type="warning">Warning content</MDXAdmonition>)

    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Warning content')).toBeInTheDocument()
  })

  it('should render with custom title', () => {
    render(
      <MDXAdmonition type="success" title="Custom Title">
        Success content
      </MDXAdmonition>,
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Success content')).toBeInTheDocument()
  })

  it('should render children content', () => {
    render(
      <MDXAdmonition type="note">
        <p>Note paragraph</p>
      </MDXAdmonition>,
    )

    expect(screen.getByText('Note paragraph')).toBeInTheDocument()
  })

  it('should fallback to info type for invalid type', () => {
    render(<MDXAdmonition type="invalid-type">Content</MDXAdmonition>)

    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('should render all admonition types correctly', () => {
    const types = ['success', 'tip', 'info', 'note', 'warning', 'caution', 'error', 'danger'] as const

    types.forEach((type) => {
      const { unmount } = render(
        <MDXAdmonition type={type}>
          Content for
          {type}
        </MDXAdmonition>,
      )

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent(/Content for/i)
      expect(alert).toHaveTextContent(type)

      unmount()
    })
  })

  it('should not render empty title when title is empty string', () => {
    render(
      <MDXAdmonition type="info" title="">
        Content
      </MDXAdmonition>,
    )

    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<MDXAdmonition className="custom-class">Content</MDXAdmonition>)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-class')
  })
})
