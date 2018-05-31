import React, { Component } from 'react';
import {
  Button,
  Icon
} from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../constants';

import './ScrollToTopButton.css';

class ScrollToTopButton extends Component {
  scrollTo = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    const element = document.getElementsByClassName('blog-header')[0];

    if (element) {
      element.scrollIntoView({
        'behavior': 'smooth',
        'blcok': 'start'
      });
    }
  }


  render() {
    return (
      <Button
        animated='fade'
        color={PRIMARY_COLOR}
        inverted
        size='large'
        className='scroll-button'
        onClick={this.scrollTo}
        >
        <Button.Content visible>
          Top
        </Button.Content>
        <Button.Content hidden>
          <Icon name='up arrow'/>
        </Button.Content>
      </Button>
    );
  }
}

export default ScrollToTopButton;
