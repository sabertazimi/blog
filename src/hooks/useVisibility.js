/**
 * `useVisibility` provides a set of callbacks for when a content appears in the viewport,
 * forked from `<Visibility />` React Semantic UI component,
 * https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/behaviors/Visibility/Visibility.js
 */
import { useEffect, useRef, useCallback } from 'react';

const useVisibility = ({ ref, onBottomPassed, onBottomPassedReverse }) => {
  const frameId = useRef(0);
  const ticking = useRef(false);
  const pageYOffset = useRef(0);
  const bottomPassed = useRef(false);

  const update = useCallback(
    (event) => {
      const getPageYOffset = () => {
        return window.pageYOffset;
      };

      ticking.current = false;

      // store visibility
      const oldBottomPassed = bottomPassed.current;

      // calculate visibility
      const { bottom } = ref.current.getBoundingClientRect();
      const newOffset = getPageYOffset();
      const direction = newOffset > pageYOffset.current ? 'down' : 'up';
      const newBottomPassed = bottom < 0;

      // update visibility
      bottomPassed.current = newBottomPassed;
      pageYOffset.current = newOffset;

      // fire callbacks according to visibility
      if (bottomPassed.current !== oldBottomPassed) {
        if (direction === 'up') {
          Boolean(onBottomPassedReverse) && onBottomPassedReverse();
        }

        if (direction === 'down') {
          Boolean(onBottomPassed) && onBottomPassed();
        }
      }
    },
    [ref, onBottomPassed, onBottomPassedReverse]
  );

  const handleUpdate = useCallback(
    (event) => {
      if (ticking.current) return;

      ticking.current = true;
      frameId.current = requestAnimationFrame(update);
    },
    [update]
  );

  useEffect(() => {
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);

      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [handleUpdate]);
};

export default useVisibility;
