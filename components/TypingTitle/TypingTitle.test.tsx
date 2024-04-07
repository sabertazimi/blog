import { render, screen, waitFor } from '@utils'
import TypingTitle from './TypingTitle'

describe('TypingTitle', () => {
  vi.mock('typed.js')

  it('should render correctly (snapshot)', () => {
    const { container } = render(<TypingTitle />)

    expect(container).toMatchSnapshot()
  })

  it('should work correctly', async () => {
    render(<TypingTitle />)

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })
})
