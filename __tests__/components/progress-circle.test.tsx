import { describe, expect, it } from 'vitest'
import { ProgressCircle } from '@/components/progress-circle'
import { render, screen } from '@/tests/test-utils'

describe('ProgressCircle', () => {
  it('should render progressbar with correct role', () => {
    render(<ProgressCircle value={50} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toBeInTheDocument()
  })

  it('should have correct aria attributes', () => {
    render(<ProgressCircle value={75} min={0} max={100} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '75')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
  })

  it('should clamp value within min and max', () => {
    const { rerender } = render(<ProgressCircle value={150} min={0} max={100} />)

    let progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '100')

    rerender(<ProgressCircle value={-10} min={0} max={100} />)
    progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
  })

  it('should render with custom size', () => {
    render(<ProgressCircle value={50} size={48} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('viewBox', '0 0 48 48')
  })

  it('should apply custom className', () => {
    render(<ProgressCircle value={50} className="custom-class" />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveClass('custom-class')
  })

  it('should render two circles for progress visualization', () => {
    render(<ProgressCircle value={50} />)

    const progressbar = screen.getByRole('progressbar')
    const circles = progressbar.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
  })

  it('should handle custom min and max values', () => {
    render(<ProgressCircle value={50} min={25} max={75} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    expect(progressbar).toHaveAttribute('aria-valuemin', '25')
    expect(progressbar).toHaveAttribute('aria-valuemax', '75')
  })
})
