import { useState, useEffect } from 'react';

const useResponsive = ({ maxWidth, minWidth, onUpdate, getWidth } = {}) => {
  let frameId;
  let ticking;
  const [visible, setVisible] = useState(true);

  const fitsMaxWidth = (width, maxWidth) => !maxWidth || width <= maxWidth;
  const fitsMinWidth = (width, minWidth) => !minWidth || width >= minWidth;

  const isVisible = (width, { maxWidth, minWidth }) =>
    fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth);

  const _getWidth = () => {
    if (getWidth) {
      return getWidth();
    }

    return window.innerWidth || 0;
  };

  const handleResize = event => {
    if (ticking) return;

    ticking = true;
    frameId = requestAnimationFrame(() => handleUpdate(event));
  };

  const handleUpdate = event => {
    ticking = false;
    const width = _getWidth();
    const nextVisible = isVisible(width, { maxWidth, minWidth });

    if (visible !== nextVisible) {
      setVisible(nextVisible);
    }

    if (onUpdate) {
      onUpdate(event, { maxWidth, minWidth, width });
    }
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
