import { render } from '@utils'
import Aside from './Aside'

describe('Aside', () => {
  const types = [
    'success',
    'tip',
    'info',
    'note',
    'warning',
    'caution',
    'error',
    'danger',
    'default',
  ]

  test('should render correctly (snapshot)', () => {
    const { container } = render(<Aside title="Aside">Aside</Aside>)

    expect(container).toMatchSnapshot()
  })

  test.each(types)(
    'should render different type correctly (snapshot)',
    type => {
      const { container } = render(
        <Aside type={type} title="Aside">
          Aside
        </Aside>
      )

      expect(container).toMatchSnapshot()
    }
  )
})
