import React, { Component } from 'react';
import { SimpleLayout } from '../layouts';
import { BookGrid } from '../components';

class Books extends Component {
  state = {
    booklist: [
      {
        title: 'awesome-notes',
        author: 'sabertazimi',
        url: 'https://sabertazimi.github.io/awesome-notes',
        description: 'Daily I Learned Notes',
      },
    ],
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

export default Books;
