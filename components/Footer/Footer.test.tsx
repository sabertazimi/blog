import mockData from '@/mocks/data'
import { render } from '@/utils'
import { axe } from 'jest-axe'
import Footer from './Footer'

describe('Footer', () => {
  const mockTime = mockData.time

  it('should render correctly (snapshot)', () => {
    const { container } = render(<Footer buildTime={mockTime} />)

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<Footer buildTime={mockTime} />)

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })
})
