import { act, render, screen } from '@testing-library/react';
import LandingNav from './LandingNav';

describe('LandingNav', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should render routes correctly (snapshot)', () => {
    const { container } = render(<LandingNav />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(container).toMatchSnapshot();
  });

  test('should render route with correct structure', () => {
    render(<LandingNav />);

    const nav = screen.getByRole('navigation');
    const icon = screen.getByRole('img');

    expect(nav).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    const navButton = screen.getByTestId('hamburger-button');

    expect(navButton).toBeInTheDocument();
    expect(navButton).toContainElement(icon);

    const navLinks = screen.getAllByRole('link');

    navLinks.forEach(navLink => expect(navLink).toBeInTheDocument());
    navLinks.forEach(navLink => expect(nav).toContainElement(navLink));
  });
});
