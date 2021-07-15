import { useState, useEffect, useCallback } from 'react';

let frameId = 0;
let ticking = false;

const useResponsive = ({ minWidth, maxWidth, onUpdate, getWidth } = {}) => {
  const [visible, setVisible] = useState(true);

  const handleUpdate = useCallback((event) => {
    const _getWidth = () => {
      if (getWidth) {
        return getWidth();
      }

      return window.innerWidth || 0;
    };

    const isVisible = (width, { maxWidth, minWidth }) => {
      const fitsMinWidth = !minWidth || width >= minWidth;
      const fitsMaxWidth = !maxWidth || width <= maxWidth;
      return fitsMinWidth && fitsMaxWidth;
    };

    const width = _getWidth();
    const nextVisible = isVisible(width, { maxWidth, minWidth });

    if (visible !== nextVisible) {
      setVisible(nextVisible);
    }

    if (onUpdate) {
      onUpdate(event, { maxWidth, minWidth, width });
    }

    ticking = false;
  }, [visible, minWidth, maxWidth, onUpdate, getWidth]);

  const handleResize = useCallback((event) => {
    if (ticking) return;

    ticking = true;
    frameId = requestAnimationFrame(() => handleUpdate(event));
  }, [handleUpdate]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleUpdate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [handleUpdate, handleResize]);

  return visible;
};

export default useResponsive;
