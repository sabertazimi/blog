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
        allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
          edges {
            node {
              base
              prettySize
              internal {
                mediaType
              }
            }
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
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Size</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.allFile.edges.map(({ node }, index) => (
                <tr key={index}>
                  <td>{node.base}</td>
                  <td>{node.prettySize}</td>
                  <td>{node.internal.mediaType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SimpleLayout>
    )}
  />
);
