import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ComponentWithError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow) {
      throw new Error('ComponentWithError');
    } else {
      return <div>App</div>;
    }
  };
  const ENV = { ...process.env };
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    process.env = { ...ENV, NODE_ENV: 'development' };
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    process.env = ENV;
    mockConsoleError.mockRestore();
  });

  test('should render children correctly (snapshot)', () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render alert message correctly (snapshot)', () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError shouldThrow />
      </ErrorBoundary>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render children accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should render alert message accessibility guidelines (AXE)', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponentWithError shouldThrow />
      </ErrorBoundary>
    );

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  test('should render alert message when error happened', () => {
    const { rerender } = render(<ComponentWithError />, {
      wrapper: ErrorBoundary,
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    rerender(<ComponentWithError shouldThrow />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(mockConsoleError).toHaveBeenCalledTimes(3);
  });
});
