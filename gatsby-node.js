/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fetch = require('node-fetch');
const { createFilePath } = require('gatsby-source-filesystem');

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

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  let githubProfile;
  let githubRepos;

  try {
    const profilePromise = fetch('https://api.github.com/users/sabertazimi');
    const reposPromise = fetch(
      'https://api.github.com/users/sabertazimi/repos'
    );
    const profileResponse = await profilePromise;
    const reposResponse = await reposPromise;
    const profileJSON = await profileResponse.json();
    const reposJSON = await reposResponse.json();
    githubProfile = {
      username: profileJSON.login,
      avatar: profileJSON.avatar_url,
      bio: profileJSON.bio,
      location: profileJSON.location,
      url: profileJSON.html_url,
      followers: profileJSON.followers,
      followersUrl: profileJSON.html_url + '/followers',
      following: profileJSON.following,
      followingUrl: profileJSON.html_url + '/following',
      createDate: new Date(profileJSON.created_at).toDateString(),
    };
    githubRepos = reposJSON
      .filter(repo => repo.stargazers_count > 0)
      .sort((repo1, repo2) =>
        repo1.stargazers_count < repo2.stargazers_count ? 1 : -1
      )
      .map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language,
        repoUrl: repo.html_url,
      }))
      .slice(0, 3);
  } catch (err) {
    console.error(err.message);
  }

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
            excerpt(pruneLength: 500)
            timeToRead
            html
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges.map(
      ({ node }, index, array) => {
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
      }
    );

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
    });

    createPage({
      path: '/posts',
      component: require.resolve('./src/templates/Posts.jsx'),
      context: { posts },
    });

    createPage({
      path: '/tags',
      component: require.resolve('./src/templates/Tags.jsx'),
      context: { tags, posts },
    });

    createPage({
      path: '/tags/all',
      component: require.resolve('./src/templates/Tags.jsx'),
      context: { tags, posts },
    });

    Object.keys(tags).forEach(tag => {
      createPage({
        path: `/tags/${tag}`,
        component: require.resolve('./src/templates/Tags.jsx'),
        context: {
          tags,
          activeTag: tag,
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
      context: {
        githubProfile,
        githubRepos,
      },
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
