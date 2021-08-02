import { graphql, useStaticQuery } from 'gatsby';
import { PostType, TagType, TagsType } from '@types';

interface PostsMetadataNode {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      subtitle: string;
      author: string;
      date: string;
      tags: TagType[];
    };
    timeToRead: number;
  };
}

const usePostsMetadata = (): {
  posts: PostType[];
  tags: TagsType;
} => {
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
                date
                tags
              }
              timeToRead
            }
          }
        }
      }
    `
  );

  const posts: PostType[] = data.allMarkdownRemark.edges.map(
    (
      { node }: PostsMetadataNode,
      index: number,
      array: PostsMetadataNode[]
    ) => {
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
    }
  );

  const tags: TagsType = posts
    .map((post) => post.tags || [])
    .flat()
    .reduce((acc: TagsType, cur: TagType) => {
      if (!acc[cur]) acc[cur] = 0;
      acc[cur] += 1;
      return acc;
    }, {});

  return { posts, tags };
};

export default usePostsMetadata;
