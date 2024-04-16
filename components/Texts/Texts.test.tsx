import Anchor from './Anchor'
import Delete from './Delete'
import Emphasis from './Emphasis'
import Strong from './Strong'
import { render } from '@/utils'

describe('Texts', () => {
  const Texts = {
    a: Anchor,
    strong: Strong,
    em: Emphasis,
    del: Delete,
  }

  it.each(Object.values(Texts))(
    'should render correctly (snapshot)',
    (Text) => {
      const { container } = render(<Text>Text</Text>)

      expect(container).toMatchSnapshot()
    },
  )
})
