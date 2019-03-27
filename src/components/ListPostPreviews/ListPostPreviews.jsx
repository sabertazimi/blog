import React from 'react';
import { Link } from 'gatsby';
import { List } from 'semantic-ui-react';

const ListPostPreviews = ({ posts }) => (
  <List
    divided
    relaxed="very"
    verticalAlign="middle"
    size="massive"
    style={{ marginTop: '2em' }}
  >
    {posts.map(post => (
      <List.Item>
        <List.Content floated="right">{post.author}</List.Content>
        <List.Content>
          <List.Header key={post.title} as={Link} to={`${post.slug}`}>
            {post.title}
          </List.Header>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default ListPostPreviews;
