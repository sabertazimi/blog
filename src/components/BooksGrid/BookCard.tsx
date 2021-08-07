import { BookOutlined } from '@ant-design/icons';
import { getColorByName } from '@config';
import { Book } from '@types';
import { Badge, Card } from 'antd';
import React from 'react';

interface Props {
  data: Book;
}

const BookCard = ({ data }: Props): JSX.Element => {
  const { title, url, author, description } = data;

  return (
    <Badge.Ribbon text={title} color={getColorByName(title)}>
      <Card
        hoverable
        title={
          <a href={url}>
            <BookOutlined className="text-6xl align-top" />
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
