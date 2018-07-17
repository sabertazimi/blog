import React, { Component } from 'react';

import {
  Header,
  Footer,
  BookGrid
} from '../components';

class Book extends Component {
  render() {
    return (
      <div>
        <Header headingHidden={true} />
        <BookGrid />
        <Footer />
      </div>
    );
  }
}

export default Book;
