import React, { useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants';
import './ScrollButton.css';

const ScrollButton = () => {
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

  useEffect(() => {
    const topAnchor  = document.createElement('div');
    topAnchor.id = 'scroll-top-anchor';
    topAnchor.style.position = 'absolute';
    topAnchor.style.top = 0;
    document.body.appendChild(topAnchor);

    return () => {
      topAnchor.remove();
    };
  });

  return (
    <div>
      <Button
        style={{ width: '100px' }}
        animated="fade"
        color={PRIMARY_COLOR}
        inverted
        size="large"
        className="scroll-button"
        direction="up"
        onClick={scrollTo}
      >
        <Button.Content visible>Top</Button.Content>
        <Button.Content hidden>
          <Icon name="up arrow" />
        </Button.Content>
      </Button>
      <Button
        style={{ width: '100px' }}
        animated="fade"
        color={PRIMARY_COLOR}
        inverted
        size="large"
        className="scroll-button scroll-button-bottom"
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
