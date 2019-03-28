import React, { useState, useEffect } from 'react';
import { useResponsive } from '../../hooks';
import { Button, Icon, Visibility } from 'semantic-ui-react';
import { BreakPoints, PRIMARY_COLOR } from '../../constants';

const ScrollButton = () => {
  const [direction, setDirection] = useState('down');
  const isnotMobile = useResponsive({ minWidth: BreakPoints.laptop });

  const buttonSize = isnotMobile ? 'large' : 'small';
  const buttonStyle = {
    position: 'fixed',
    right: isnotMobile ? '30px' : '10px',
    bottom: isnotMobile ? '4%' : '2%',
    margin: 0,
    zIndex: 999,
  };

  const onScroll = (e, { calculations }) =>
    setDirection(calculations.direction);

  const scrollTo = (event, data) => {
    event.preventDefault();
    event.stopPropagation();

    const element = document.querySelector(
      data.direction === 'up' ? '#scroll-top-anchor' : '.blog-footer'
    );

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        blcok: 'start',
      });
    }
  };

  // only run when mounting
  useEffect(() => {
    const topAnchor = document.createElement('div');
    topAnchor.id = 'scroll-top-anchor';
    topAnchor.style.position = 'absolute';
    topAnchor.style.top = 0;
    document.body.appendChild(topAnchor);

    return () => {
      topAnchor.remove();
    };
  }, []);

  return (
    <Visibility onUpdate={onScroll} once={false}>
      {direction === 'down' ? (
        <Button
          style={buttonStyle}
          color={PRIMARY_COLOR}
          size={buttonSize}
          direction="up"
          onClick={scrollTo}
        >
          <Icon name="up arrow" style={{margin: 0}}/>
        </Button>
      ) : (
        <Button
          style={buttonStyle}
          color={PRIMARY_COLOR}
          size={buttonSize}
          direction="down"
          onClick={scrollTo}
        >
          <Icon name="down arrow" style={{margin: 0}}/>
        </Button>
      )}
    </Visibility>
  );
};

export default ScrollButton;
