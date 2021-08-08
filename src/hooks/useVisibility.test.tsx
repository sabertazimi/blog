import { fireEvent, render } from '@testing-library/react';
import React, { useRef } from 'react';
import useVisibility from './useVisibility';

const Header = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>(null);
  const onBottomPassed = jest.fn();
  const onBottomPassedReverse = jest.fn();

  useVisibility({
    ref: headerRef,
    onBottomPassed,
    onBottomPassedReverse,
  });

  return (
    <div
      ref={headerRef}
      style={{ display: 'block', width: '100%', height: '100vh' }}
    >
      App
    </div>
  );
};

describe('useVisibility', () => {
  test('should work correctly when scrolling and resizing', () => {
    const { container, rerender } = render(<Header />);
    fireEvent.scroll(window, { screenY: 50 });
    rerender(<Header />);
    fireEvent.resize(container, { innerWidth: 100, innerHeight: 100 });
    rerender(<Header />);
  });
});
