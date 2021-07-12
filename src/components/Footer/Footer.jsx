import React from 'react';
import { List, Divider, Container, Segment } from 'semantic-ui-react';
import SocialButton from '@/components/SocialButton';
import { useBuildTime, useSiteMetadata } from '@/hooks';
import { SocialType } from '@/config';

const Footer = () => {
  const buildTime = useBuildTime();
  const { author, siteUrl, github, twitter, facebook, weibo } =
    useSiteMetadata();

  return (
    <Segment inverted style={{ padding: '5em 0em' }} vertical>
      <Container
        textAlign="center"
        className="blog-footer"
        style={{ maxWidth: 960 }}
      >
        <SocialButton
          type={SocialType.website}
          url={`${siteUrl}`}
          style={{ margin: '0 1em 1em' }}
        />
        <SocialButton
          type={SocialType.github}
          url={`https://github.com/${github}`}
          style={{ margin: '0 1em 1em' }}
        />
        <SocialButton
          type={SocialType.twitter}
          url={`https://twitter.com/${twitter}`}
          style={{ margin: '0 1em 1em' }}
        />
        <SocialButton
          type={SocialType.facebook}
          url={`https://facebook.com/${facebook}`}
          style={{ margin: '0 1em 1em' }}
        />
        <SocialButton
          type={SocialType.weibo}
          url={`https://weibo.com/${weibo}`}
          style={{ margin: '0 1em 1em' }}
        />
        <Divider inverted section />
        <List horizontal inverted divided link>
          <List.Item>
            Copyright &copy;{' '}
            <a href={`https://github.com/${github}`}>{author}</a>{' '}
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
