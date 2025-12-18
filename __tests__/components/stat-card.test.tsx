import { GitForkIcon } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { StatCard } from '@/components/stat-card'
import { render, screen } from '@/tests/test-utils'

describe('StatCard', () => {
  it('should render title, value, description and icon', () => {
    render(<StatCard title="Total Repositories" value={42} description="Public repositories" icon={GitForkIcon} />)

    expect(screen.getByText('Total Repositories')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('Public repositories')).toBeInTheDocument()
  })

  it('should render with different values', () => {
    render(<StatCard title="Total Stars" value={1000} description="Across all projects" icon={GitForkIcon} />)

    expect(screen.getByText('Total Stars')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('Across all projects')).toBeInTheDocument()
  })

  it('should render zero value correctly', () => {
    render(<StatCard title="Followers" value={0} description="No followers yet" icon={GitForkIcon} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
