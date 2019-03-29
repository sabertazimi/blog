import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Header, Label } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants';

const ArticleHeader = ({ color, post }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div
      style={{
        width: '100%',
        padding: '10em 8em',
        background:
          'linear-gradient(135deg, #6bafd2 0%, #a4c8dc 38%, #d6cbca 58%, #eabc96 79%, #db8876 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <animated.div style={props}>
        {post.tags ? (
          post.tags.map(tag => {
            return (
              <Label
                key={tag}
                as={Link}
                to={`/tags/${tag}`}
                color={PRIMARY_COLOR}
                tag
                style={{
                  marginBottom: '1em',
                }}
              >
                {tag}
              </Label>
            );
          })
        ) : (
          <Label as={Link} to="/tags/all" color={PRIMARY_COLOR} tag>
            CS
          </Label>
        )}
        <Header as="h1" color={color} style={{ fontSize: '4em' }}>
          {post.title || 'Article'}
        </Header>
        <Label
          color="black"
          style={{
            marginBottom: '1em',
          }}
        >
          Posted on {new Date(post.date).toDateString() || 'Nowadays'}
        </Label>
        <Label color="black">({post.timeToRead} minutes)</Label>
      </animated.div>
    </div>
  );
};

export default ArticleHeader;
