import React, { useEffect } from 'react';
import { useResponsive } from '../../hooks';
import { Button, Icon } from 'semantic-ui-react';
import { BreakPoints, PRIMARY_COLOR } from '../../constants';

const ScrollButton = () => {
  const isnotMobile = useResponsive({ minWidth: BreakPoints.laptop });
  const baseStyle = {
    position: 'fixed',
    fontSize: isnotMobile ? '16px' : '12px',
    width: isnotMobile ? '100px' : '75px',
    right: isnotMobile ? '50px' : '10px',
    bottom: isnotMobile ? '15%' : '8%',
  };
  const topStyle = {
    ...baseStyle,
  };
  const bottomStyle = {
    ...baseStyle,
    bottom: isnotMobile ? '7%' : '2%',
  };

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
    <div>
      <Button
        style={topStyle}
        animated="fade"
        color={PRIMARY_COLOR}
        size="large"
        direction="up"
        onClick={scrollTo}
      >
        <Button.Content visible>Top</Button.Content>
        <Button.Content hidden>
          <Icon name="up arrow" />
        </Button.Content>
      </Button>
      <Button
        style={bottomStyle}
        animated="fade"
        color={PRIMARY_COLOR}
        size="large"
        direction="down"
        onClick={scrollTo}
      >
        <Button.Content visible>Bottom</Button.Content>
        <Button.Content hidden>
          <Icon name="down arrow" />
        </Button.Content>
      </Button>
    </div>
  );
};

export default ScrollButton;
