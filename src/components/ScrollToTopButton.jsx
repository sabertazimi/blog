import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../constants';

import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const scrollTo = (event, data) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    const element = document.getElementsByClassName(
      data.direction === 'up' ? 'blog-header' : 'blog-footer'
    )[0];

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
        animated="fade"
        color={PRIMARY_COLOR}
        inverted
        size="large"
        className="scroll-button"
        direction="up"
        onClick={scrollTo}
      >
        <Button.Content visible>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Button.Content>
        <Button.Content hidden>
          <Icon name="up arrow" />
        </Button.Content>
      </Button>
      <Button
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

export default ScrollToTopButton;
