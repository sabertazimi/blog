import React from 'react';
import { graphql } from 'gatsby';
import { SimpleLayout } from '../layouts';
import { Article } from '../components';

export default ({ data, pageContext: { prev, next } }) => {
  const { markdownRemark } = data;

  const post = {
    ...markdownRemark.frontmatter,
    prevPost: {
      ...prev,
    },
    nextPost: {
      ...next,
    },
    html: markdownRemark.html,
  };

  return (
    <SimpleLayout>
      <Article post={post} />
    </SimpleLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        subtitle
        date
        tags
      }
      html
    }
  }
`;
