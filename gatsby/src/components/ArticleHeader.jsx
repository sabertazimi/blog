import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../constants';

const ArticleHeader = ({ color, mdFile }) => (
  <div>
    <div className="jumbotron" />
    <div style={{ padding: '8em 8em' }}>
      {mdFile.tags ? (
        mdFile.tags.map((tag, index) => {
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
        {mdFile.title || 'Article'}
      </Header>
      <Label color="black">
        Posted on {new Date(mdFile.date).toDateString() || 'Nowadays'}
      </Label>
    </div>
  </div>
);

export default ArticleHeader;
