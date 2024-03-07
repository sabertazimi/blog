import { render } from '@utils'
import ImageCard from './ImageCard'

describe('ImageCard', () => {
  test('should render placeholder image correctly (snapshot)', () => {
    const { container } = render(<ImageCard />)

    expect(container).toMatchSnapshot()
  })

  test('should render local image correctly (snapshot)', () => {
    const { container } = render(<ImageCard src="/public/images/landing.jpg" />)

    expect(container).toMatchSnapshot()
  })
})
