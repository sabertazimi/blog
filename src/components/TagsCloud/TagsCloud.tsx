import { Colors, getColorByName } from '@config';
import type { TagType, TagsType } from '@types';
import { Tag } from 'antd';
import { Link } from 'gatsby';
import React from 'react';

interface Props {
  tags: TagsType;
  activeTag: TagType;
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
          <Link className="text-lg font-extrabold" to={`/tags/${activeTag}`}>
            {activeTag} &nbsp; {tags[activeTag]}
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
            <Link className="text-lg font-extrabold" to={`/tags/${tag}`}>
              {tag} &nbsp; {tags[tag]}
            </Link>
          </Tag>
        );
      })}
      {activeTag ? (
        <Tag className="mb-3 bg-primary border-primary">
          <Link className="text-lg font-extrabold text-light" to="/tags">
            All
          </Link>
        </Tag>
      ) : null}
    </div>
  );
};

export default TagsCloud;
