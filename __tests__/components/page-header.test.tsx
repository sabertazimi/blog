import { describe, expect, it } from 'vitest'
import PageHeader from '@/components/page-header'
import { render, screen } from '@/tests/test-utils'

describe('PageHeader', () => {
  const defaultProps = {
    title: 'Test Page Title',
    description: 'Test page description',
  }

  it('should render title', () => {
    render(<PageHeader {...defaultProps} />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(defaultProps.title)
  })

  it('should render description', () => {
    render(<PageHeader {...defaultProps} />)

    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
  })

  it('should render flickering grid by default', () => {
    render(<PageHeader {...defaultProps} />)

    const grid = screen.getByTestId('flickering-grid-wrapper')
    expect(grid).toBeInTheDocument()
  })

  it('should not render flickering grid when disabled', () => {
    render(<PageHeader {...defaultProps} showFlickeringGrid={false} />)

    const grid = screen.queryByTestId('flickering-grid-wrapper')
    expect(grid).not.toBeInTheDocument()
  })

  it('should render children when provided', () => {
    render(
      <PageHeader {...defaultProps}>
        <div data-testid="test-child">Test Child</div>
      </PageHeader>,
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })

  it('should apply correct heading styles', () => {
    render(<PageHeader {...defaultProps} />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('text-primary', 'text-4xl', 'font-extrabold')
  })
})
