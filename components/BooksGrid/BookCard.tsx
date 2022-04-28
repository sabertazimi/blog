import Badge from '@components/Badge';
import Card from '@components/Card';
import { Book as BookIcon } from '@components/Icons';
import { getColorByName } from '@config';
import type { Book } from '@types';

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props): JSX.Element => {
  const { title, url, author, description } = book;

  return (
    <Badge.Ribbon text={title} color={getColorByName(title)}>
      <Card
        hoverable
        title={
          <a href={url}>
            <BookIcon className="text-6xl align-top" />
            <span className="text-span-xl">{title}</span>
          </a>
        }
      >
        <Card.Meta title={description} description={`Written by ${author}`} />
      </Card>
    </Badge.Ribbon>
  );
};

export default BookCard;
