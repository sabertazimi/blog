import mockData from '@mocks/data'
import { render } from '@utils'
import Footer from './Footer'

describe('Footer', () => {
  const mockTime = mockData.time

  it('should render correctly (snapshot)', () => {
    const { container } = render(<Footer buildTime={mockTime} />)

    expect(container).toMatchSnapshot()
  })
})
