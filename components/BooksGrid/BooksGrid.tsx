import type { Book } from '@types';
import { Col, Row } from 'antd';
import BookCard from './BookCard';

interface Props {
  books: Book[];
}

const BooksGrid = ({ books }: Props): JSX.Element => (
  <Row>
    {books.map((book, index) => (
      <Col span={24} key={index}>
        <BookCard book={book} />
      </Col>
    ))}
  </Row>
);

export default BooksGrid;
