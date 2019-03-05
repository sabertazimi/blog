import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SimpleLayout } from '../layouts';

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `}
    render={data => (
      <SimpleLayout>
        <div style={{ margin: '3rem auto', maxWidth: 600 }}>
          <h2>About me</h2>
          <p style={{ fontSize: '18px' }}>
            I'm {data.site.siteMetadata.author}, please mail to{' '}
            <a href="mailto:sabertazimi@gmail.com">sabertazimi@gmail.com</a>
          </p>
        </div>
      </SimpleLayout>
    )}
  />
);
