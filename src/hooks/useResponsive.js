import { useState, useEffect, useRef, useCallback } from 'react';

const useResponsive = ({ minWidth, maxWidth, onUpdate, getWidth } = {}) => {
  const frameId = useRef(0);
  const ticking = useRef(false);
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

    ticking.current = false;
  }, [visible, minWidth, maxWidth, onUpdate, getWidth]);

  const handleResize = useCallback((event) => {
    if (ticking.current) return;

    ticking.current = true;
    frameId.current = requestAnimationFrame(() => handleUpdate(event));
  }, [handleUpdate]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleUpdate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId.current);
    };
  }, [handleUpdate, handleResize]);

  return visible;
};

export default useResponsive;
