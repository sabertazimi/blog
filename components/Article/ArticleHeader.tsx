import { SlideRight } from '@components/Motion';
import { getColorByName } from '@config';
import type { PostMeta } from '@types';
import { Tag } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  post: PostMeta;
}

const ArticleHeader = ({
  post: { tags, title, createTime, updateTime, timeToRead },
}: Props): JSX.Element => (
  <div
    className={classNames(
      'w-full px-32 py-40',
      'bg-center bg-no-repeat bg-cover',
      'bg-gradient-primary'
    )}
  >
    <SlideRight>
      {tags ? (
        tags.map(tag => {
          return (
            <Tag key={tag} color={getColorByName(tag)}>
              <Link href={`/tag/${tag}`}>
                <a className="text-base font-extrabold">{tag}</a>
              </Link>
            </Tag>
          );
        })
      ) : (
        <Tag className="bg-primary border-primary">
          <Link href="/tags">
            <a className="text-light">CS</a>
          </Link>
        </Tag>
      )}
      <h1 className="my-8 text-8xl text-light">{title}</h1>
      <Tag className="tag-black">
        <div className="text-base font-extrabold">
          Posted on{' '}
          {createTime ? new Date(createTime).toDateString() : 'Nowadays'}
        </div>
      </Tag>
      <Tag className="tag-black">
        <div className="text-base font-extrabold">
          Last updated on{' '}
          {updateTime ? new Date(updateTime).toDateString() : 'Nowadays'}
        </div>
      </Tag>
      <Tag className="tag-black">
        <div className="text-base font-extrabold">({timeToRead} minutes)</div>
      </Tag>
    </SlideRight>
  </div>
);

export default ArticleHeader;
