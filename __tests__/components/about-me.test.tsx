import { describe, expect, it } from 'vitest'
import { AboutMe } from '@/components/about-me'
import { mockProfile, mockRepos } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('AboutMe', () => {
  it('should render profile card', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} />)

    expect(screen.getByText(`@${mockProfile.username}`)).toBeInTheDocument()
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument()
    expect(screen.getByText(mockProfile.bio!)).toBeInTheDocument()
  })

  it('should render stat cards with correct data', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} />)

    expect(screen.getByText('Total Repositories')).toBeInTheDocument()
    expect(screen.getByText(mockProfile.publicRepos.toString())).toBeInTheDocument()
    expect(screen.getByText('Public repositories')).toBeInTheDocument()
    expect(screen.getByText('Total Stars')).toBeInTheDocument()
    expect(screen.getByText(mockProfile.totalStars.toString())).toBeInTheDocument()
    expect(screen.getByText('Across all projects')).toBeInTheDocument()
  })

  it('should render featured repositories section', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Featured Repositories')
  })

  it('should render all repository cards', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} />)

    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
      expect(screen.getByText(repo.language)).toBeInTheDocument()
    })
  })

  it('should render correct number of repository cards', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} />)

    const repoLinks = screen
      .getAllByRole('link')
      .filter(link => mockRepos.some(repo => link.getAttribute('href') === repo.repoUrl))
    expect(repoLinks).toHaveLength(mockRepos.length)
  })

  it('should render empty repos list gracefully', () => {
    render(<AboutMe profile={mockProfile} repos={[]} />)

    expect(screen.getByText('Total Repositories')).toBeInTheDocument()
    expect(screen.getByText(mockProfile.publicRepos.toString())).toBeInTheDocument()
    expect(screen.getByText('Featured Repositories')).toBeInTheDocument()

    mockRepos.forEach((repo) => {
      expect(screen.queryByText(repo.name)).not.toBeInTheDocument()
      expect(screen.queryByText(repo.language)).not.toBeInTheDocument()
    })
  })
})
