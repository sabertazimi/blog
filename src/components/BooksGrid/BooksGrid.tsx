import type { Book } from '@types';
import { Col, Row } from 'antd';
import React from 'react';
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
