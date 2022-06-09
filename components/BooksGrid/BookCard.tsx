import Badge from '@components/Badge';
import { Card, Meta } from '@components/Card';
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
        title={
          <a href={url}>
            <BookIcon className="align-top text-6xl" />
            <span className="text-span-xl">{title}</span>
          </a>
        }
      >
        <Meta title={description} description={`Written by ${author}`} />
      </Card>
    </Badge.Ribbon>
  );
};

export default BookCard;
