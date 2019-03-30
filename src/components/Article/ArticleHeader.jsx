import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Tag } from 'antd';
import { Colors } from 'config';

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
              <Tag
                key={tag}
                color={Colors.primary}
                style={{ marginBottom: '1em' }}
              >
                <Link to={`/tags/${tag}`} style={{ fontWeight: 800 }}>
                  {tag}
                </Link>
              </Tag>
            );
          })
        ) : (
          <Tag color={Colors.primary}>
            <Link to="/tags/all">CS</Link>
          </Tag>
        )}
        <h1 style={{ color, fontSize: '4em', marginTop: '0.3em 0 0.2em 0' }}>
          {post.title || 'Article'}
        </h1>
        <Tag color="black" style={{ marginBottom: '1em', fontWeight: 800 }}>
          Posted on {new Date(post.date).toDateString() || 'Nowadays'}
        </Tag>
        <Tag color="black" style={{ fontWeight: 800 }}>
          ({post.timeToRead} minutes)
        </Tag>
      </animated.div>
    </div>
  );
};

export default ArticleHeader;
