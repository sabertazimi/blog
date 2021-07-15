import { useState, useEffect, useCallback } from 'react';

let frameId = 0;
let ticking = false;

const useResponsive = ({ maxWidth, minWidth, onUpdate, getWidth } = {}) => {
  const [visible, setVisible] = useState(true);

  const fitsMaxWidth = useCallback(
    (width, maxWidth) => !maxWidth || width <= maxWidth,
    []
  );
  const fitsMinWidth = useCallback(
    (width, minWidth) => !minWidth || width >= minWidth,
    []
  );

  const isVisible = useCallback(
    (width, { maxWidth, minWidth }) =>
      fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth),
    [fitsMaxWidth, fitsMinWidth]
  );

  const _getWidth = useCallback(() => {
    if (getWidth) {
      return getWidth();
    }

    return window.innerWidth || 0;
  }, [getWidth]);

  const handleResize = (event) => {
    if (ticking) return;

    ticking = true;
    frameId = requestAnimationFrame(() => handleUpdate(event));
  };

  const handleUpdate = (event) => {
    const width = _getWidth();
    const nextVisible = isVisible(width, { maxWidth, minWidth });

    if (visible !== nextVisible) {
      setVisible(nextVisible);
    }

    if (onUpdate) {
      onUpdate(event, { maxWidth, minWidth, width });
    }

    ticking = false;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleUpdate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  });

  return visible;
};

export default useResponsive;
