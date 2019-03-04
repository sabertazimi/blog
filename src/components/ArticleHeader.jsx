import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Header, Label } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../constants';
import headingPNG from '../heading.png';

const ArticleHeader = ({ color, mdFile }) => (
  <Spring
    from={{ opacity: 0, transform: 'translateX(-200px)' }}
    to={{ opacity: 1, transform: 'translateX(0)' }}
    config={{ delay: 500 }}
  >
    {props => (
      <div style={{ props }}>
        <div
          className="jumbotron"
          style={{ backgroundImage: `url(${headingPNG})` }}
        />
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
    )}
  </Spring>
);

export default ArticleHeader;
