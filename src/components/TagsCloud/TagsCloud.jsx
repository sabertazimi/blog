import React from 'react';
import { Link } from 'gatsby';
import { Label } from 'semantic-ui-react';
import { randomColor } from '../../utils';

const TagsCloud = ({ tags, activeTag }) => {
  let tagsList = Object.keys(tags).sort((a, b) => {
    return tags[b] - tags[a];
  });

  if (activeTag) {
    tagsList = tagsList.filter(tag => tag !== activeTag);
  }

  return (
    <Label.Group tag>
      {activeTag ? (
        <Label
          key={activeTag}
          color={randomColor()}
          as={Link}
          to={`/tags/${activeTag}`}
        >
          {activeTag} &nbsp;&nbsp; {tags[activeTag]}
        </Label>
      ) : null}
      {tagsList.map(tag => {
        return (
          <Label
            key={tag}
            color={activeTag ? 'grey' : randomColor()}
            as={Link}
            to={`/tags/${tag}`}
          >
            {tag} &nbsp;&nbsp; {tags[tag]}
          </Label>
        );
      })}
      {activeTag ? (
        <Label
          key='all'
          color={randomColor()}
          as={Link}
          to='/tags'
        >
          All
        </Label>
      ) : (
        null
      )}
    </Label.Group>
  );
};

export default TagsCloud;
