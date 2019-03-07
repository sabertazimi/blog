import React from 'react';
import { Link } from 'gatsby';
import { Label } from 'semantic-ui-react';
import { randomColor } from '../../utils';

const TagsCloud = ({ tags }) => {
  const tagsList = Object.keys(tags).sort((a, b) => {
    return tags[b] - tags[a];
  });

  return (
    <Label.Group tag>
      {tagsList.map(tag => {
        return (
          <Label
            key={tag}
            color={randomColor()}
            as={Link}
            to={`/tags/${tag}`}
          >
            {tag} &nbsp;&nbsp; {tags[tag]}
          </Label>
        );
      })}
    </Label.Group>
  );
};

export default TagsCloud;
