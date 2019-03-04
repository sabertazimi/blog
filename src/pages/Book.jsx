import React, { Component } from 'react';

import { BookGrid } from '../components';
import { SimpleLayout } from '../layouts';

class Book extends Component {
  state = {
      'booklist': [
        {
          'title': 'awesome-notes',
          'author': 'sabertazimi',
          'url': 'https://sabertazimi.github.io/awesome-notes',
          'description': 'Daily I Learned Notes'
        },
      ]
  };

  render() {
    const { booklist } = this.state;

    return (
      <SimpleLayout>
        <BookGrid booklist={booklist} />
      </SimpleLayout>
    );
  }
}

export default Book;
