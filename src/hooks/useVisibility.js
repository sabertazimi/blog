/**
 * `useVisibility` provides a set of callbacks for when a content appears in the viewport,
 * forked from `<Visibility />` React Semantic UI component,
 * https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/behaviors/Visibility/Visibility.js
 */
import { useState, useEffect, useRef, useCallback } from 'react';

const useVisibility = ({
  ref,
  onBottomPassed,
  onBottomPassedReverse,
  onBottomVisible,
  onBottomVisibleReverse,
  onPassing,
  onPassingReverse,
  onTopPassed,
  onTopPassedReverse,
  onTopVisible,
  onTopVisibleReverse,
  onOffScreen,
  onOnScreen,
  onUpdate,
}) => {
  const frameId = useRef(0);
  const ticking = useRef(false);
  const pageYOffset = useRef(0);

  const handleUpdate = useCallback(
    (event) => {
      if (onUpdate) {
        onUpdate(event);
      }

      ticking.current = false;
    },
    [onUpdate]
  );

  const handleResize = useCallback(
    (event) => {
      if (ticking.current) return;

      ticking.current = true;
      frameId.current = requestAnimationFrame(() => handleUpdate(event));
    },
    [handleUpdate]
  );

  useEffect(() => {
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);

      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [handleUpdate, handleResize]);
};

export default useVisibility;
