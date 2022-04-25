import { colors, getColorByName } from '@config';
import type { Tags, Tag } from '@types';
import { Tag as AntTag } from 'antd';
import Link from 'next/link';

interface Props {
  tags: Tags;
  activeTag?: Tag;
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
        <AntTag className="mb-3" color={getColorByName(activeTag)}>
          <Link href={`/tag/${activeTag}`}>
            <a className="text-lg font-extrabold">
              {activeTag} &nbsp; {tags[activeTag]}
            </a>
          </Link>
        </AntTag>
      ) : null}
      {tagsList.map(tag => {
        return (
          <AntTag
            key={tag}
            className="mb-3"
            color={activeTag ? colors.gray : getColorByName(tag)}
          >
            <Link href={`/tag/${tag}`}>
              <a className="text-lg font-extrabold">
                {tag} &nbsp; {tags[tag]}
              </a>
            </Link>
          </AntTag>
        );
      })}
      {activeTag ? (
        <AntTag className="mb-3 bg-primary border-primary">
          <Link href="/tags">
            <a className="text-lg font-extrabold text-light">All</a>
          </Link>
        </AntTag>
      ) : null}
    </div>
  );
};

export default TagsCloud;
