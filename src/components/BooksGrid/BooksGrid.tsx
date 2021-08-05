import React from 'react';
import { Row, Col } from 'antd';
import { Book } from '@types';
import BookCard from './BookCard';

interface Props {
  bookList: Book[];
}

const BooksGrid = ({ bookList }: Props): JSX.Element => (
  <Row>
    {bookList.map((bookData, index) => (
      <Col span={24} key={index}>
        <BookCard data={bookData} />
      </Col>
    ))}
  </Row>
);

export default BooksGrid;
