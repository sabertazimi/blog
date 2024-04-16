'use client'

import Badge from '@/components/Badge'
import { Card, Meta } from '@/components/Card'
import { Book as BookIcon } from '@/components/Icons'
import { Span } from '@/components/Texts'
import { getColorByName } from '@/config'
import type { Book } from '@/types'

interface Props {
  book: Book
}

function BookCard({ book }: Props): JSX.Element {
  const { title, url, author, description } = book

  return (
    <Badge.Ribbon text={title} color={getColorByName(title)}>
      <Card
        title={(
          <a href={url}>
            <BookIcon className="align-top text-6xl" />
            <Span size="xl">{title}</Span>
          </a>
        )}
      >
        <Meta title={description} description={`Written by ${author}`} />
      </Card>
    </Badge.Ribbon>
  )
}

export default BookCard
