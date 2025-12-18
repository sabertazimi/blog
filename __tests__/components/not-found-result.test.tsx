import { describe, expect, it } from 'vitest'
import { NotFoundResult } from '@/components/not-found-result'
import { render, screen } from '@/tests/test-utils'

describe('NotFoundResult', () => {
  it('should render container with correct classes', () => {
    render(<NotFoundResult />)

    const container = screen.getByTestId('not-found-container')
    expect(container).toHaveClass('container', 'mx-auto', 'flex')
  })

  it('should render 404 canvas', () => {
    render(<NotFoundResult />)

    const container = screen.getByRole('heading', { level: 1, name: '404' })
    const canvas = container.firstElementChild
    expect(canvas).toBeInTheDocument()
    expect(canvas?.tagName).toBe('CANVAS')
  })

  it('should render not found canvas', () => {
    render(<NotFoundResult />)

    const container = screen.getByRole('heading', { level: 2, name: 'Not Found' })
    const canvas = container.firstElementChild
    expect(canvas).toBeInTheDocument()
    expect(canvas?.tagName).toBe('CANVAS')
  })
})
