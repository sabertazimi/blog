import { getColorByName } from '@config';
import type { PostMetaType } from '@types';
import { Tag } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  post: PostMetaType;
}

const ArticleHeader = ({ post }: Props): JSX.Element => {
  const { tags, title, date, gitTime, timeToRead } = post;
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div
      className={classNames(
        'w-full px-32 py-40',
        'bg-center bg-no-repeat bg-cover',
        'bg-gradient-primary'
      )}
    >
      <animated.div style={props}>
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
            Posted on {date ? new Date(date).toDateString() : 'Nowadays'}
          </div>
        </Tag>
        <Tag className="tag-black">
          <div className="text-base font-extrabold">
            Last updated on{' '}
            {gitTime ? new Date(gitTime).toDateString() : 'Nowadays'}
          </div>
        </Tag>
        <Tag className="tag-black">
          <div className="text-base font-extrabold">({timeToRead} minutes)</div>
        </Tag>
      </animated.div>
    </div>
  );
};

export default ArticleHeader;
