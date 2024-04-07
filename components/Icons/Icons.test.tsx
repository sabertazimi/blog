import { render } from '@utils'
import Comment from './Comment'
import Hamburger from './Hamburger'

describe('Icons', () => {
  const Icons = [Comment, Hamburger]

  it.each(Icons)('should render %# icon correctly (snapshot)', (Icon) => {
    const { container } = render(<Icon />)

    expect(container).toMatchSnapshot()
  })
})
