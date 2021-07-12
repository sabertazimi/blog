import React from 'react';
import { List, Divider, Container, Segment } from 'semantic-ui-react';
import SocialButton from './SocialButton';
import { useBuildTime, useSiteMetadata } from '@/hooks';

const Footer = () => {
  const buildTime = useBuildTime();
  const { siteUrl, github, twitter, facebook, weibo } = useSiteMetadata();

   return (
      <Segment inverted style={{ padding: '5em 0em' }} vertical>
        <Container
          textAlign="center"
          className="blog-footer"
          style={{ maxWidth: 960 }}
        >
          <SocialButton type="rocket" url={`${siteUrl}`} />
          <SocialButton type="github" url={`https://github.com/${github}`} />
          <SocialButton type="twitter" url={`https://twitter.com/${twitter}`} />
          <SocialButton
            type="facebook"
            url={`https://facebook.com/${facebook}`}
          />
          <SocialButton type="weibo" url={`https://weibo.com/${weibo}`} />
          <Divider inverted section />
          <List horizontal inverted divided link>
            <List.Item>
              Copyright &copy;{' '}
              <a href={`https://github.com/${github}`}>
                sabertazimi
              </a>{' '}
              {new Date().getFullYear()}
            </List.Item>
            <List.Item>
              Built with <a href="https://reactjs.org">React</a> and{' '}
              <a href="https://gatsbyjs.org">Gatsby</a>
            </List.Item>
            <List.Item>
              Last Updated at{' '}
              <a href="https://www.google.com/search?q=time">
                {new Date(buildTime).toLocaleString()}
              </a>
            </List.Item>
          </List>
        </Container>
      </Segment>
    );
};

export default Footer;
