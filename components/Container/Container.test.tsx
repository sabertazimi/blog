import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Container from './Container';

describe('Container', () => {
  test('should render correctly (snapshot)', () => {
    const { container } = render(
      <Container role="main">
        <h1>Container</h1>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <Container role="main">
        <h1>Container</h1>
      </Container>
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should render children correctly', () => {
    render(
      <Container role="main">
        <h1>Container</h1>
      </Container>
    );

    expect(screen.getByRole('main')).toContainElement(
      screen.getByText('Container')
    );
  });
});
