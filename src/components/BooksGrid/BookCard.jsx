import React from 'react';
import { Badge, Card, Typography } from 'antd';
import { getRandomColor } from '@config';

const BookCard = ({ data }) => {
  const { title, url, author, description } = data;

  return (
    <Badge.Ribbon text={title} color={getRandomColor()}>
      <Card
        hoverable
        title={
          <a href={url}>
            <Typography.Title level={2}>{title}</Typography.Title>
          </a>
        }
      >
        <Card.Meta title={description} description={`Written by ${author}`} />
      </Card>
    </Badge.Ribbon>
  );
};

export default BookCard;
