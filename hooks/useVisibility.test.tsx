import { fireEvent, render, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import useVisibility from './useVisibility';

describe('useVisibility', () => {
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
        <div ref={headerRef}>Header</div>
        <div>Main</div>
        <div>Footer</div>
      </div>
    );
  };

  test('should early return when missing ref', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    waitFor(() => expect(onBottomPassed).not.toBeCalled());
    waitFor(() => expect(onBottomPassedReverse).not.toBeCalled());
  });

  test('should invoke callbacks when scrolling', () => {
    render(<HeaderWithRef />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    waitFor(() => expect(onBottomPassed).toBeCalled());
    waitFor(() => expect(onBottomPassedReverse).toBeCalled());
  });
});
