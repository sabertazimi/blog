import React, { ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
import { Divider } from 'antd';
import { Container } from '@components';
import { Header, Footer } from '@containers';

interface Props {
  banner: string;
  children: ReactNode;
}

const Layout = ({ banner, children }: Props): JSX.Element => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div>
      <Header />
      <Container className="min-h-screen px-0 pt-0 pb-28 md:pt-24">
        <animated.div style={props}>
          <Divider className="mx-0 my-12 font-extrabold">
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
