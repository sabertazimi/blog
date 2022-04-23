import { Colors, getColorByName } from '@config';
import type { TagsType, TagType } from '@types';
import { Tag } from 'antd';
import Link from 'next/link';
import React from 'react';

interface Props {
  tags: TagsType;
  activeTag?: TagType;
}

const TagsCloud = ({ tags, activeTag }: Props): JSX.Element => {
  let tagsList = Object.keys(tags).sort((a, b) => {
    return tags[b] - tags[a];
  });

  if (activeTag) {
    tagsList = tagsList.filter(tag => tag !== activeTag);
  }

  return (
    <div>
      {activeTag ? (
        <Tag className="mb-3" color={getColorByName(activeTag)}>
          <Link href={`/tag/${activeTag}`}>
            <a className="text-lg font-extrabold">
              {activeTag} &nbsp; {tags[activeTag]}
            </a>
          </Link>
        </Tag>
      ) : null}
      {tagsList.map(tag => {
        return (
          <Tag
            key={tag}
            className="mb-3"
            color={activeTag ? Colors.gray : getColorByName(tag)}
          >
            <Link href={`/tag/${tag}`}>
              <a className="text-lg font-extrabold">
                {tag} &nbsp; {tags[tag]}
              </a>
            </Link>
          </Tag>
        );
      })}
      {activeTag ? (
        <Tag className="mb-3 bg-primary border-primary">
          <Link href="/tags">
            <a className="text-lg font-extrabold text-light">All</a>
          </Link>
        </Tag>
      ) : null}
    </div>
  );
};

export default TagsCloud;
