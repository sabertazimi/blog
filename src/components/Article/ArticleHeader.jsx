import React from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { Tag } from 'antd';
import { Colors, getRandomColor } from '@config';

const ArticleHeader = ({ post }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div
      className="bg-gradient-primary"
      style={{
        width: '100%',
        padding: '10em 8em',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <animated.div style={props}>
        {post.tags ? (
          post.tags.map((tag) => {
            return (
              <Tag key={tag} className="mb-3" color={getRandomColor()}>
                <Link className="text-base font-extrabold" to={`/tags/${tag}`}>
                  {tag}
                </Link>
              </Tag>
            );
          })
        ) : (
          <Tag className="mb-3" color={getRandomColor()}>
            <Link to="/tags/all">CS</Link>
          </Tag>
        )}
        <h1 className="mx-0 mb-1 text-8xl" style={{ color: Colors.light }}>
          {post.title || 'Article'}
        </h1>
        <Tag
          className="mb-3"
          color={Colors.black}
        >
          <div className="text-base font-extrabold">
            Posted on {new Date(post.date).toDateString() || 'Nowadays'}
          </div>
        </Tag>
        <Tag
          className="mb-3"
          color={Colors.black}
        >
          <div className="text-base font-extrabold">
            ({post.timeToRead} minutes)
          </div>
        </Tag>
      </animated.div>
    </div>
  );
};

export default ArticleHeader;
