import { axe } from 'jest-axe'
import ArticleComments from './ArticleComments'
import { render } from '@/utils'

describe('ArticleComments', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<ArticleComments />)

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<ArticleComments />)

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })
})
