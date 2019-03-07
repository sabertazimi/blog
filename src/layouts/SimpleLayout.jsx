import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Divider, Container, Segment } from 'semantic-ui-react';
import { Header, Footer } from '../components';

const SimpleLayout = ({ children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div>
      <Header />
      <Segment style={{ padding: '3em 0em' }} vertical>
        <animated.div style={props} className="slideIn">
          <Container text>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em' }}
            >
              Tags
            </Divider>
            {children}

            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em' }}
            >
              Tags
            </Divider>
          </Container>
        </animated.div>
      </Segment>
      <Footer />
    </div>
  );
};

export default SimpleLayout;
