import { describe, expect, it } from 'vitest'
import FormattedDate from '@/components/formatted-date'
import { render, screen } from '@/tests/test-utils'

describe('FormattedDate', () => {
  it('should render formatted date', () => {
    render(<FormattedDate date="2025-01-01" />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement).toHaveAttribute('dateTime', '2025-01-01T00:00:00.000Z')
  })

  it('should render date with time when showTime is true', () => {
    render(<FormattedDate date="2025-01-01T12:30:00Z" showTime />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement.textContent).toBeTruthy()
  })

  it('should return null for invalid dates', () => {
    const { rerender } = render(<FormattedDate date={undefined} />)
    expect(screen.queryByRole('time')).not.toBeInTheDocument()

    rerender(<FormattedDate date={null} />)
    expect(screen.queryByRole('time')).not.toBeInTheDocument()
  })

  it('should handle different date formats', () => {
    const dateObject = new Date('2025-01-01')
    const { rerender } = render(<FormattedDate date={dateObject} />)
    expect(screen.getByRole('time')).toBeInTheDocument()

    const timestamp = dateObject.getTime()
    rerender(<FormattedDate date={timestamp} />)
    expect(screen.getByRole('time')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<FormattedDate date="2025-01-01" className="custom-class" />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toHaveClass('custom-class')
  })

  it('should render correctly in different locales', () => {
    const { unmount: unmountEN } = render(<FormattedDate date="2025-01-01" />, { locale: 'en-US' })
    const timeElementEN = screen.getByRole('time')
    const textEN = timeElementEN.textContent
    expect(textEN).toBeTruthy()
    unmountEN()

    render(<FormattedDate date="2025-01-01" />, { locale: 'zh-CN' })
    const timeElementZH = screen.getByRole('time')
    const textZH = timeElementZH.textContent
    expect(textZH).toBeTruthy()

    expect(textEN).not.toBe(textZH)
  })
})
