import { render, screen } from '@utils'
import { axe } from 'jest-axe'
import type { JSXElementConstructor, ReactNode } from 'react'
import ErrorBoundary from './ErrorBoundary'

describe('ErrorBoundary', () => {
  const ComponentWithError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow)
      throw new Error('ComponentWithError')
    else
      return <div>App</div>
  }
  const ENV = { ...process.env }
  let mockConsoleError: jest.SpyInstance

  beforeEach(() => {
    process.env = { ...ENV, NODE_ENV: 'development' }
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(jest.fn())
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

  it('should render children accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>,
    )

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })

  it('should render alert message accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError shouldThrow />
      </ErrorBoundary>,
    )

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
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
