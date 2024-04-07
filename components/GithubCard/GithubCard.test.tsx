import mockData from '@mocks/data'
import { render } from '@utils'
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
})
