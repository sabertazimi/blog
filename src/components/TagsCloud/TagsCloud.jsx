import React from 'react';
import { Link } from 'gatsby';
import { Label } from 'semantic-ui-react';

const TagsCloud = ({ tags }) => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
  ];

  const getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return colors[colorIdx];
  };

  const tagsList = Object.keys(tags).sort((a, b) => {
    return tags[b] - tags[a];
  });

  return (
    <Label.Group tag>
      {tagsList.map(tag => {
        return (
          <Label
            key={tag}
            color={getRandomColor()}
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
