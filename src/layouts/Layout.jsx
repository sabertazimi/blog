import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Divider } from 'antd';
import { Header, Footer, Container } from 'components';
import { useResponsive } from 'hooks';
import { BreakPoints } from 'config';

const Layout = ({ banner, posts, children }) => {
  const isnotMobile = useResponsive({ minWidth: BreakPoints.mobile });

  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div>
      <Header posts={posts} />
      <div style={{ padding: `${isnotMobile ? '7em' : '0'} 0em 3em 0` }}>
        <animated.div style={props}>
          <Container text style={{ maxWidth: 960 }}>
            <Divider style={{ margin: '3em 0em', fontWeight: 800 }}>
              {banner || 'Life'}
            </Divider>
            {children}
            <Divider style={{ margin: '3em 0em', fontWeight: 800 }}>
              {banner || 'Life'}
            </Divider>
          </Container>
        </animated.div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
