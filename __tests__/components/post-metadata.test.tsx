import { describe, expect, it } from 'vitest'
import PostMetadata from '@/components/post-metadata'
import { render, screen } from '@/tests/test-utils'

describe('PostMetadata', () => {
  it('should render create time when provided', () => {
    render(<PostMetadata createTime="2025-01-01" />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement).toHaveAttribute('dateTime', '2025-01-01T00:00:00.000Z')
  })

  it('should render update time when provided', () => {
    render(<PostMetadata updateTime="2025-01-15" />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement).toHaveAttribute('dateTime', '2025-01-15T00:00:00.000Z')
  })

  it('should render reading time when provided', () => {
    render(<PostMetadata readingTime={5} />)

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === '5 minute'
      }),
    ).toBeInTheDocument()
  })

  it('should render all metadata when all props provided', () => {
    render(<PostMetadata createTime="2025-01-01" updateTime="2025-01-15" readingTime={5} />)

    const timeElements = screen.getAllByRole('time')
    expect(timeElements).toHaveLength(2)
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === '5 minute'
      }),
    ).toBeInTheDocument()
  })

  it('should not render create time when empty string', () => {
    render(<PostMetadata createTime="" />)

    expect(screen.queryByRole('time')).not.toBeInTheDocument()
  })

  it('should not render update time when empty string', () => {
    render(<PostMetadata updateTime="" />)

    expect(screen.queryByRole('time')).not.toBeInTheDocument()
  })

  it('should not render reading time when zero', () => {
    render(<PostMetadata readingTime={0} />)

    expect(screen.queryByText(/minute/i)).not.toBeInTheDocument()
  })

  it('should not render anything when no props provided', () => {
    render(<PostMetadata />)

    expect(screen.queryByRole('time')).not.toBeInTheDocument()
    expect(screen.queryByText(/minute/i)).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<PostMetadata createTime="2025-01-01" className="custom-class" />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toHaveClass('custom-class')
  })

  it('should render both create and update times with different icons', () => {
    render(<PostMetadata createTime="2025-01-01" updateTime="2025-01-15" />)

    const timeElements = screen.getAllByRole('time')
    expect(timeElements).toHaveLength(2)
    expect(timeElements[0]).toHaveAttribute('dateTime', '2025-01-01T00:00:00.000Z')
    expect(timeElements[1]).toHaveAttribute('dateTime', '2025-01-15T00:00:00.000Z')
  })
})
