import React from 'react';
import { Row, Col } from 'antd';
import { useSiteMetadata } from '@hooks';
import BookCard from './BookCard';

const BooksGrid = () => {
  const { bookList } = useSiteMetadata();

  return (
    <Row>
      {bookList.map((bookData, index) => (
        <Col span={24} key={index}>
          <BookCard data={bookData} />
        </Col>
      ))}
    </Row>
  );
};

export default BooksGrid;
