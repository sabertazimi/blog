import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Divider } from 'antd';
import { Header, Footer, Container } from '@components';

const Layout = ({ banner, children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div>
      <Header />
      <Container className="min-h-screen px-0 pt-0 pb-28 md:pt-24">
        <animated.div style={props}>
          <Divider style={{ margin: '3em 0em', fontWeight: 800 }}>
            {banner || 'Life'}
          </Divider>
          {children}
        </animated.div>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
