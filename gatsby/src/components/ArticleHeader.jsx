import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../constants';

const ArticleHeader = ({ color, post }) => (
  <div>
    <div style={{ padding: '8em 8em' }} className="jumbotron">
      {post.tags ? (
        post.tags.map((tag, index) => {
          return (
            <Label
              key={index}
              as="a"
              href={`/tags/${tag}`}
              color={PRIMARY_COLOR}
              tag
            >
              {tag}
            </Label>
          );
        })
      ) : (
        <Label as="a" href="/tags/all" color={PRIMARY_COLOR} tag>
          CS
        </Label>
      )}
      <Header as="h1" color={color} style={{ fontSize: '4em' }}>
        {post.title || 'Article'}
      </Header>
      <Label color="black">
        Posted on {new Date(post.date).toDateString() || 'Nowadays'}
      </Label>
      <Label color="black">({post.timeToRead} minutes)</Label>
    </div>
  </div>
);

export default ArticleHeader;
