import React from 'react';
import { Link } from 'gatsby';
import { List } from 'semantic-ui-react';

const ListPostPreviews = ({ posts }) => (
  <List
    divided
    animated
    relaxed="very"
    size="massive"
    verticalAlign="middle"
    style={{ marginTop: '2em' }}
  >
    {posts.map((post, index) => (
      <List.Item key={post.title || index}>
        <List.Content floated="right">{post.author}</List.Content>
        <List.Content>
          <List.Header as={Link} to={`${post.slug}`}>
            {post.title}
          </List.Header>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default ListPostPreviews;
