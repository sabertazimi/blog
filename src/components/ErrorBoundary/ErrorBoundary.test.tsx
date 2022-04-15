import { render, screen } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import ErrorBoundary from './ErrorBoundary';

const ComponentWithError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    console.error('ComponentWithError');
    throw new Error('ComponentWithError');
  } else {
    return <div>App</div>;
  }
};

describe('ErrorBoundary', () => {
  const OLD_ENV = { ...process.env };
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    process.env = { ...OLD_ENV, NODE_ENV: 'development' };
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    process.env = OLD_ENV;
    mockConsoleError.mockRestore();
  });

  test('should render children correctly (snapshot)', () => {
    const tree = create(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render alert message correctly (snapshot)', () => {
    const tree = create(
      <ErrorBoundary>
        <ComponentWithError shouldThrow />
      </ErrorBoundary>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render alert message when error happened', () => {
    const { rerender } = render(<ComponentWithError />, {
      wrapper: ErrorBoundary,
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    rerender(<ComponentWithError shouldThrow />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(mockConsoleError).toHaveBeenCalledTimes(7);
  });
});
