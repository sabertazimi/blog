import { describe, expect, it } from 'vitest'
import NotFoundResult from '@/components/not-found-result'
import { render, screen } from '@/tests/test-utils'

describe('NotFoundResult', () => {
  it('should render container with correct classes', () => {
    render(<NotFoundResult />)

    const container = screen.getByTestId('not-found-container')
    expect(container).toHaveClass('container', 'mx-auto', 'flex')
  })

  it('should render not found text', () => {
    render(<NotFoundResult />)

    const title = screen.getByTitle('Not Found')
    expect(title).toBeInTheDocument()
  })

  it('should render not found SVG', () => {
    render(<NotFoundResult />)

    const title = screen.getByTitle('Not Found')
    const svg = title.closest('svg')
    expect(svg).toBeInTheDocument()
    expect(svg?.tagName).toBe('svg')
  })
})
