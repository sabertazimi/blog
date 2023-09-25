import { render, screen, waitFor } from '@utils';
import { axe } from 'jest-axe';
import TypingTitle from './TypingTitle';

describe('TypingTitle', () => {
  jest.mock('typed.js');

  test('should render correctly (snapshot)', () => {
    const { container } = render(<TypingTitle />);

    expect(container).toMatchSnapshot();
  });

  test('Should render accessibility guidelines (AXE)', async () => {
    const { container } = render(<TypingTitle />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should work correctly', async () => {
    render(<TypingTitle />);

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
