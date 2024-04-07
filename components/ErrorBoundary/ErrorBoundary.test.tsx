import { render, screen } from '@utils'
import type { JSXElementConstructor, ReactNode } from 'react'
import type { MockInstance } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

describe('ErrorBoundary', () => {
  const ComponentWithError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow)
      throw new Error('ComponentWithError')
    else
      return <div>App</div>
  }
  const ENV = { ...process.env }
  let mockConsoleError: MockInstance

  beforeEach(() => {
    process.env = { ...ENV, NODE_ENV: 'development' }
    mockConsoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(vi.fn())
  })

  afterEach(() => {
    process.env = ENV
    mockConsoleError.mockRestore()
  })

  it('should render children correctly (snapshot)', () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render alert message correctly (snapshot)', () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError shouldThrow />
      </ErrorBoundary>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render alert message when error happened', () => {
    const { rerender } = render(<ComponentWithError />, {
      wrapper: ErrorBoundary as JSXElementConstructor<{ children: ReactNode }>,
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(<ComponentWithError shouldThrow />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(mockConsoleError).toHaveBeenCalledTimes(3)
  })
})
