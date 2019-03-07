import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../../constants';

import './ScrollButton.css';

const ScrollButton = () => {
  const scrollTo = (event, data) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    const element = document.querySelector(
      data.direction === 'up' ? '.jumbotron' : '.blog-footer'
    );

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        blcok: 'start'
      });
    }
  };

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
        <Button.Content visible textAlign="center">
          Top
        </Button.Content>
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
        <Button.Content visible textAlign="center">Bottom</Button.Content>
        <Button.Content hidden>
          <Icon name="down arrow" />
        </Button.Content>
      </Button>
    </div>
  );
};

export default ScrollButton;
