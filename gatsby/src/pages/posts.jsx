import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SimpleLayout } from '../layouts';
// import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts } }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          totalCount
          edges {
            previous {
              frontmatter {
                title
              }
            }
            next {
              frontmatter {
                title
              }
            }
            node {
              frontmatter {
                title
                subtitle
                date
                author
                header_img
                tags
              }
              excerpt
              timeToRead
              wordCount {
                words
              }
              html
            }
          }
        }
      }
    `}
    render={data => (
      <SimpleLayout>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>
              {node.frontmatter.title}{' '}
              <span>
                — {new Date(node.frontmatter.date).toLocaleString()} by {node.frontmatter.author}
              </span>
            </h3>
            <p>{node.excerpt}</p>
            <span>{node.timeToRead} minutes to Read.</span>
          </div>
        ))}
      </SimpleLayout>
    )}
  />
);
