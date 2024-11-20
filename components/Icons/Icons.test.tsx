import { render } from '@/utils'
import { axe } from 'jest-axe'
import Comment from './Comment'
import Hamburger from './Hamburger'

describe('Icons', () => {
  const Icons = [Comment, Hamburger]

  it.each(Icons)('should render %# icon correctly (snapshot)', (Icon) => {
    const { container } = render(<Icon />)

    expect(container).toMatchSnapshot()
  })

  it.each(Icons)(
    'should render %# icon accessibility guidelines (AXE)',
    async (Icon) => {
      const { container } = render(<Icon />)

      const a11y = await axe(container)

      expect(a11y).toHaveNoViolations()
    },
  )
})
