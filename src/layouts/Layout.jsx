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
      <div className="pt-0 pb-12 px-0 lg:pt-24">
        <animated.div style={props}>
          <Container style={{ maxWidth: 960 }}>
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
