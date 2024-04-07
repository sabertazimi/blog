import { siteConfig } from '@config'
import { render } from '@utils'
import SocialGroup from './SocialGroup'

describe('SocialGroup', () => {
  const mockUrl = siteConfig.siteUrl

  it('should render correctly (snapshot)', () => {
    const { container } = render(<SocialGroup url={mockUrl} />)

    expect(container).toMatchSnapshot()
  })
})
