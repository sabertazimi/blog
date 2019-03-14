import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { List, Divider, Container, Segment } from 'semantic-ui-react';
import SocialButton from './SocialButton';

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          buildTime
        }
      }
    `}
    render={data => (
      <Segment inverted style={{ padding: '5em 0em' }} vertical>
        <Container
          textAlign="center"
          className="blog-footer"
          style={{ maxWidth: 960 }}
        >
          <SocialButton type="github" url="https://github.com/sabertazimi" />
          <SocialButton type="twitter" url="https://twitter.com/sabertazimi" />
          <SocialButton
            type="facebook"
            url="https://facebook.com/sabertazimi"
          />
          <SocialButton type="weibo" url="https://weibo.com/sabertazimi" />
          <Divider inverted section />
          <List horizontal inverted divided link>
            <List.Item>
              Copyright &copy;{' '}
              <a href="https://github.com/sabertazimi/react-blog">
                sabertazimi
              </a>{' '}
              {new Date().getFullYear()}
            </List.Item>
            <List.Item>
              Built with <a href="https://reactjs.org">React</a> and{' '}
              <a href="https://www.semantic-ui.com">Semantic UI</a>
            </List.Item>
            <List.Item>
              Last Updated at{' '}
              <a href="https://www.google.com/search?q=time">
                {new Date(data.site.buildTime).toLocaleString()}
              </a>
            </List.Item>
          </List>
        </Container>
      </Segment>
    )}
  />
);

export default Footer;
