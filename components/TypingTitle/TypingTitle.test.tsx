import { render, screen, waitFor } from '@utils'
import { axe } from 'jest-axe'
import TypingTitle from './TypingTitle'

describe('typingTitle', () => {
  jest.mock('typed.js')

  it('should render correctly (snapshot)', () => {
    const { container } = render(<TypingTitle />)

    expect(container).toMatchSnapshot()
  })

  it('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<TypingTitle />)

    const a11y = await axe(container)

    expect(a11y).toHaveNoViolations()
  })

  it('should work correctly', async () => {
    render(<TypingTitle />)

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })
})
