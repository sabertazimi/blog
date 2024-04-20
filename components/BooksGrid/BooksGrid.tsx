import BookCard from './BookCard'
import Col from '@/components/Col'
import Row from '@/components/Row'
import { siteConfig } from '@/config'
import type { Book } from '@/types'

interface Props {
  books?: Book[]
}

function BooksGrid({ books = siteConfig.books }: Props): JSX.Element {
  return (
    <div role="grid">
      <Row>
        {books.map(book => (
          <Col span={24} key={book.title}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default BooksGrid
