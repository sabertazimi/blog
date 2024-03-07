import { render } from '@utils'
import H1 from './H1'
import H2 from './H2'
import H3 from './H3'
import H4 from './H4'
import H5 from './H5'
import H6 from './H6'

describe('Headings', () => {
  const Headings = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
  }

  test.each(Object.values(Headings))(
    'should render correctly (snapshot)',
    Heading => {
      const { container } = render(<Heading>Heading</Heading>)

      expect(container).toMatchSnapshot()
    }
  )
})
