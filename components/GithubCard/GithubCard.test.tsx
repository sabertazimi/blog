import mockData from '@/mocks/data'
import { render } from '@/utils'
import { axe } from 'jest-axe'
import GithubCard from './GithubCard'

describe('GithubCard', () => {
  const mockBaseProfile = mockData.baseProfile
  const mockProfile = mockData.profile
  const mockRepos = mockData.repos

  it('should render correctly (snapshot)', () => {
    const { container } = render(
      <GithubCard profile={mockProfile} repos={mockRepos} />,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render correctly when missing bio and location data (snapshot)', () => {
    const { container } = render(
      <GithubCard profile={mockBaseProfile} repos={mockRepos} />,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <GithubCard profile={mockProfile} repos={mockRepos} />,
    )

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })

  it('should render accessibility guidelines when missing bio and location data (AXE)', async () => {
    const { container } = render(
      <GithubCard profile={mockBaseProfile} repos={mockRepos} />,
    )

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })
})
