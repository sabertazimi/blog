import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useRef } from 'react';
import useVisibility from './useVisibility';

const onBottomPassed = jest.fn();
const onBottomPassedReverse = jest.fn();

const Header = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null);

  useVisibility({
    ref: headerRef,
    onBottomPassed,
    onBottomPassedReverse,
  });

  return <div>Header</div>;
};

const HeaderWithRef = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null);

  useVisibility({
    ref: headerRef,
    onBottomPassed,
    onBottomPassedReverse,
  });

  return (
    <div>
      <div
        ref={headerRef}
        style={{
          boxSizing: 'border-box',
          display: 'block',
          margin: '0 auto',
          padding: '0',
          width: '100%',
          height: '50px',
        }}
      >
        Header
      </div>
      <div
        style={{
          boxSizing: 'border-box',
          display: 'block',
          margin: '0 auto',
          padding: '0',
          width: '100%',
          height: '150vh',
        }}
      >
        Body
      </div>
      <div
        style={{
          boxSizing: 'border-box',
          display: 'block',
          margin: '0 auto',
          padding: '0',
          width: '100%',
          height: '50px',
        }}
      ></div>
    </div>
  );
};

describe('useVisibility', () => {
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    mockConsoleError.mockRestore();
  });

  test('should log error message when missing ref', async () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledTimes(1);
    });
  });

  test('should invoke callbacks when scrolling', async () => {
    render(<HeaderWithRef />);
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    await waitFor(() => {
      expect(onBottomPassed).not.toBeCalled();
      expect(onBottomPassedReverse).not.toBeCalled();
    });
  });
});
