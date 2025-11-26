import { describe, expect, it } from 'vitest'
import AboutMe from '@/components/about-me'
import { mockProfile, mockRepos } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('AboutMe', () => {
  const totalStars = mockRepos.reduce((sum, repo) => sum + repo.stars, 0)

  it('should render profile card', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} totalStars={totalStars} />)

    expect(screen.getByText(mockProfile.username)).toBeInTheDocument()
    expect(screen.getByText(mockProfile.bio ?? '')).toBeInTheDocument()
  })

  it('should render stat cards with correct data', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} totalStars={totalStars} />)

    expect(screen.getByText('Total Repositories')).toBeInTheDocument()
    expect(screen.getByText(mockRepos.length.toString())).toBeInTheDocument()
    expect(screen.getByText('Public Repositories')).toBeInTheDocument()
    expect(screen.getByText('Total Stars')).toBeInTheDocument()
    expect(screen.getByText(totalStars.toString())).toBeInTheDocument()
    expect(screen.getByText('Across all projects')).toBeInTheDocument()
  })

  it('should render featured repositories section', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} totalStars={totalStars} />)

    expect(screen.getByText('Featured Repositories')).toBeInTheDocument()
  })

  it('should render all repository cards', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} totalStars={totalStars} />)

    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
      expect(screen.getByText(repo.language)).toBeInTheDocument()
    })
  })

  it('should render correct number of repository cards', () => {
    render(<AboutMe profile={mockProfile} repos={mockRepos} totalStars={totalStars} />)

    const repoLinks = screen
      .getAllByRole('link')
      .filter(link => mockRepos.some(repo => link.getAttribute('href') === repo.repoUrl))
    expect(repoLinks).toHaveLength(mockRepos.length)
  })

  it('should calculate total stars correctly', () => {
    const repos = [
      { name: 'repo1', language: 'TypeScript', stars: 10, repoUrl: 'https://github.com/user/repo1' },
      { name: 'repo2', language: 'JavaScript', stars: 20, repoUrl: 'https://github.com/user/repo2' },
      { name: 'repo3', language: 'Python', stars: 30, repoUrl: 'https://github.com/user/repo3' },
    ]
    const calculatedTotalStars = repos.reduce((sum, repo) => sum + repo.stars, 0)

    render(<AboutMe profile={mockProfile} repos={repos} totalStars={calculatedTotalStars} />)
    expect(screen.getByText('60')).toBeInTheDocument()
  })

  it('should render empty repos list gracefully', () => {
    render(<AboutMe profile={mockProfile} repos={[]} totalStars={0} />)

    expect(screen.getByText('Total Repositories')).toBeInTheDocument()
    const zeros = screen.getAllByText('0')
    expect(zeros.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('Featured Repositories')).toBeInTheDocument()
  })
})
