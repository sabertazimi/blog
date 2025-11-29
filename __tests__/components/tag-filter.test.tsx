import { describe, expect, it } from 'vitest'
import TagFilter from '@/components/tag-filter'
import { mockTagsMeta } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('TagFilter', () => {
  it('should render all tags on desktop', () => {
    render(<TagFilter tagsMeta={mockTagsMeta} selectedTag="All" />)

    mockTagsMeta.allTags.forEach((tag) => {
      const displayTag = tag === 'All' ? 'All' : tag
      expect(screen.getAllByText(displayTag).length).toBeGreaterThan(0)
    })
  })

  it('should display tag counts', () => {
    render(<TagFilter tagsMeta={mockTagsMeta} selectedTag="All" />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should highlight selected tag', () => {
    render(<TagFilter tagsMeta={mockTagsMeta} selectedTag="React" />)

    const reactLinks = screen.getAllByRole('link', { name: /react/i })
    expect(reactLinks[0]).toHaveClass('border-primary', 'bg-primary', 'text-primary-foreground')
  })

  it('should render drawer trigger on mobile', () => {
    render(<TagFilter tagsMeta={mockTagsMeta} selectedTag="React" />)

    expect(screen.getByRole('button', { name: /react/i })).toBeInTheDocument()
  })

  it('should open drawer when trigger is clicked', async () => {
    const { user } = render(<TagFilter tagsMeta={mockTagsMeta} selectedTag="All" />)

    await user.click(screen.getByRole('button', { name: /all/i }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /select category/i })).toBeInTheDocument()
  })

  it('should not display zero or undefined tag counts', () => {
    const tagsMetaWithZero = {
      allTags: ['All', 'React', 'Empty'],
      tagCounts: { All: 10, React: 5, Empty: 0 },
    }

    render(<TagFilter tagsMeta={tagsMetaWithZero} selectedTag="All" />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should translate "All" tag', () => {
    render(<TagFilter tagsMeta={mockTagsMeta} selectedTag="All" />)

    expect(screen.getAllByText('All').length).toBeGreaterThan(0)
  })
})
