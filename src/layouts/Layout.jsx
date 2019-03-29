import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Divider, Container, Segment } from 'semantic-ui-react';
import { Header, Footer } from '../components';
import { useResponsive } from '../hooks';
import { BreakPoints } from '../constants';

const Layout = ({ banner, posts, children }) => {
  const isnotMobile = useResponsive({ minWidth: BreakPoints.mobile });

  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div>
      <Header posts={posts} />
      <Segment
        style={{ padding: `${isnotMobile ? '9em' : '0'} 0em 3em 0` }}
        vertical
      >
        <animated.div style={props}>
          <Container text style={{ maxWidth: 960 }}>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em' }}
            >
              {banner || 'Life'}
            </Divider>
            {children}

            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em' }}
            >
              {banner || 'Life'}
            </Divider>
          </Container>
        </animated.div>
      </Segment>
      <Footer />
    </div>
  );
};

export default Layout;
