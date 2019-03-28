import React, { useState, useEffect } from 'react';
import { useResponsive } from '../../hooks';
import { Button, Icon, Visibility } from 'semantic-ui-react';
import { BreakPoints, PRIMARY_COLOR } from '../../constants';

const ScrollButton = () => {
  const [direction, setDirection] = useState('down');
  const isnotMobile = useResponsive({ minWidth: BreakPoints.laptop });

  const buttonStyle = {
    position: 'fixed',
    fontSize: isnotMobile ? '16px' : '12px',
    width: isnotMobile ? '100px' : '75px',
    right: isnotMobile ? '50px' : '10px',
    bottom: isnotMobile ? '5%' : '2%',
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
      {direction === 'up' ? (
        <Button
          style={buttonStyle}
          animated="fade"
          color={PRIMARY_COLOR}
          size="large"
          direction="up"
          onClick={scrollTo}
        >
          <Button.Content visible>
            <Icon name="anchor" />
          </Button.Content>
          <Button.Content hidden>
            <Icon name="up arrow" />
          </Button.Content>
        </Button>
      ) : (
        <Button
          style={buttonStyle}
          animated="fade"
          color={PRIMARY_COLOR}
          size="large"
          direction="down"
          onClick={scrollTo}
        >
          <Button.Content visible>
            <Icon name="anchor" />
          </Button.Content>
          <Button.Content hidden>
            <Icon name="down arrow" />
          </Button.Content>
        </Button>
      )}
    </Visibility>
  );
};

export default ScrollButton;
