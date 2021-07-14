import React from 'react';
import { Row, Col } from 'antd';
import { useSiteMetadata } from '@/hooks';
import BookCard from './BookCard';

const BooksGrid = () => {
  const { booklist } = useSiteMetadata();

  return (
    <Row>
      {booklist.map((bookData, index) => (
        <Col span={24}>
          <BookCard key={index} data={bookData} />
        </Col>
      ))}
    </Row>
  );
};

export default BooksGrid;
