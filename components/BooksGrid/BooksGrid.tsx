import Col from '@components/Col';
import Row from '@components/Row';
import { siteConfig } from '@config';
import type { Book } from '@types';
import BookCard from './BookCard';

interface Props {
  books?: Book[];
}

const BooksGrid = ({ books = siteConfig.books }: Props): JSX.Element => (
  <Row>
    {books.map((book, index) => (
      <Col span={24} key={index}>
        <BookCard book={book} />
      </Col>
    ))}
  </Row>
);

export default BooksGrid;
