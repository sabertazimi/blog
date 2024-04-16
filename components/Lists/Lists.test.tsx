import Item from './Item'
import Ol from './Ol'
import Ul from './Ul'
import { render } from '@/utils'

describe('Lists', () => {
  const Lists = {
    ul: Ul,
    ol: Ol,
    li: Item,
  }

  it.each(Object.values(Lists))(
    'should render correctly (snapshot)',
    (List) => {
      const { container } = render(<List>List</List>)

      expect(container).toMatchSnapshot()
    },
  )
})
