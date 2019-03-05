/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const slug = createFilePath({ node, getNode, basePath: 'pages' });
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });
      break;
    }
    case 'SitePage':
      break;
    case 'SitePlugin':
      break;
    default:
      break;
  }
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return graphql(`
    query {
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
            excerpt(pruneLength: 200)
            timeToRead
            html
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges.map(({ node }, index, array) => {
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

      return {
        slug: node.fields.slug,
        ...node.frontmatter,
        excerpt: node.excerpt,
        timeToRead: node.timeToRead,
        html: node.html,
        prevPost,
        nextPost,
      };
    });

    const tags = [].concat
      .apply([], posts.map(post => post.tags || []))
      .reduce((acc, cur) => {
        if (!acc[cur]) acc[cur] = 0;
        acc[cur] += 1;
        return acc;
      }, {});

    createPage({
      path: '/',
      component: require.resolve('./src/templates/Home.jsx'),
      context: { posts },
    });

    createPage({
      path: '/tags',
      component: require.resolve('./src/templates/Tags.jsx'),
      context: { tags },
    });

    createPage({
      path: '/tags/all',
      component: require.resolve('./src/templates/Tags.jsx'),
      context: { tags },
    });

    Object.keys(tags).forEach(tag => {
      createPage({
        path: `/tags/${tag}`,
        component: require.resolve('./src/templates/Tags.jsx'),
        context: {
          posts: posts.filter(post => post.tags && post.tags.includes(tag)),
        },
      });
    });

    createPage({
      path: '/books',
      component: require.resolve('./src/templates/Books.jsx'),
    });

    createPage({
      path: '/about',
      component: require.resolve('./src/templates/About.jsx'),
    });

    posts.forEach(post => {
      createPage({
        path: post.slug,
        component: require.resolve('./src/templates/Post.jsx'),
        context: { post },
      });
    });
  });
};
