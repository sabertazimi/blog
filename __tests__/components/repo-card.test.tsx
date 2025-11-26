import { describe, expect, it } from 'vitest'
import RepoCard from '@/components/repo-card'
import { mockRepos } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('RepoCard', () => {
  it('should render repository information', () => {
    const repo = mockRepos[0]
    render(<RepoCard repo={repo} />)

    expect(screen.getByText(repo.name)).toBeInTheDocument()
    expect(screen.getByText(repo.language)).toBeInTheDocument()
    expect(screen.getByText(repo.stars.toString())).toBeInTheDocument()
  })

  it('should render as a link to repository URL', () => {
    const repo = mockRepos[0]
    render(<RepoCard repo={repo} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', repo.repoUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render multiple repositories correctly', () => {
    const { rerender } = render(<RepoCard repo={mockRepos[0]} />)
    expect(screen.getByText('test-repo-1')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()

    rerender(<RepoCard repo={mockRepos[1]} />)
    expect(screen.getByText('test-repo-2')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })
})
