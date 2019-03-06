import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {
  List,
  Grid,
  Icon,
  Button,
  Divider,
  Container,
  Segment,
} from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../../constants';

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
        <Container textAlign="center" className="blog-footer">
          <Grid columns={4} stackable inverted>
            <Grid.Row>
              <Grid.Column>
                <Button
                  as="a"
                  inverted
                  icon
                  circular
                  href="https://github.com/sabertazimi"
                  color={PRIMARY_COLOR}
                >
                  <Icon name="github alternate" size="huge" />
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  as="a"
                  inverted
                  icon
                  circular
                  href="https://twitter.com/sabertazimi"
                  color={PRIMARY_COLOR}
                >
                  <Icon name="twitter" size="huge" />
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  as="a"
                  inverted
                  icon
                  circular
                  href="https://plus.google.com/110832319520817806130"
                  color={PRIMARY_COLOR}
                >
                  <Icon name="google" size="huge" />
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  as="a"
                  inverted
                  icon
                  circular
                  href="https://www.facebook.com/sabertazimi"
                  color={PRIMARY_COLOR}
                >
                  <Icon name="facebook f" size="huge" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
              <a href="http://www.semantic-ui.com">Semantic UI</a>
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
