import { graphql, useStaticQuery } from 'gatsby';

const usePostsMetadata = () => {
  const data = useStaticQuery(
    graphql`
      query PostsMetadataQuery {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
                author
                tags
                date
              }
              timeToRead
            }
          }
        }
      }
    `
  );

  const posts = data.allMarkdownRemark.edges.map(({ node }, index, array) => {
    const prevPost =
      index === array.length - 1
        ? null
        : {
            slug: array[index + 1].node.fields.slug,
            title: array[index + 1].node.frontmatter.title,
          };
    const nextPost =
      index === 0
        ? null
        : {
            slug: array[index - 1].node.fields.slug,
            title: array[index - 1].node.frontmatter.title,
          };

    // post data details
    return {
      slug: node.fields.slug,
      title: node.frontmatter.title,
      subtitle: node.frontmatter.subtitle,
      author: node.frontmatter.author,
      tags: node.frontmatter.tags,
      date: node.frontmatter.date,
      timeToRead: node.timeToRead,
      prevPost,
      nextPost,
    };
  });

  const tags = [].concat
    .apply(
      [],
      posts.map((post) => post.tags || [])
    )
    .reduce((acc, cur) => {
      if (!acc[cur]) acc[cur] = 0;
      acc[cur] += 1;
      return acc;
    }, {});

  return { posts, tags };
};

export default usePostsMetadata;
