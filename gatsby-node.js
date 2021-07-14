/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();
const config = require('./gatsby-config');

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
  const profileResponse = await octokit.rest.users.getByUsername({
    username: config.siteMetadata.socialList.github,
  });
  const reposResponse = await octokit.request('GET /users/{username}/repos', {
    username: config.siteMetadata.socialList.github,
  });

  const { data: profileJSON } = profileResponse;
  const { data: reposJSON } = reposResponse;

  const githubProfile = {
    username: profileJSON.login,
    avatar: profileJSON.avatar_url,
    bio: profileJSON.bio,
    location: profileJSON.location,
    url: profileJSON.html_url,
    followers: profileJSON.followers,
    followersUrl: `${profileJSON.html_url}/followers`,
    following: profileJSON.following,
    followingUrl: `${profileJSON.html_url}/following`,
    createDate: new Date(profileJSON.created_at).toDateString(),
  };

  const githubRepos = reposJSON
    .filter((repo) => repo.stargazers_count > 0)
    .sort((repo1, repo2) =>
      repo1.stargazers_count < repo2.stargazers_count ? 1 : -1
    )
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      language: repo.language,
      repoUrl: repo.html_url,
    }))
    .slice(0, 3);

  const result = await graphql(`
    query PostsDataQuery {
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
            excerpt(pruneLength: 500)
            tableOfContents(maxDepth: 4)
            html
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(`Error while running GraphQL query.`);
    return;
  }

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

      // post data details
      return {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        subtitle: node.frontmatter.subtitle,
        author: node.frontmatter.author,
        tags: node.frontmatter.tags,
        date: node.frontmatter.date,
        timeToRead: node.timeToRead,
        excerpt: node.excerpt,
        toc: node.tableOfContents,
        html: node.html,
        prevPost,
        nextPost,
      };
    }
  );

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

  const homePageTemplate = require.resolve('./src/templates/Home.jsx');
  const postsPageTemplate = require.resolve('./src/templates/Posts.jsx');
  const tagsPageTemplate = require.resolve('./src/templates/Tags.jsx');
  const booksPageTemplate = require.resolve('./src/templates/Books.jsx');
  const aboutPageTemplate = require.resolve('./src/templates/About.jsx');
  const postPageTemplate = require.resolve('./src/templates/Post.jsx');

  createPage({
    path: '/',
    component: homePageTemplate,
  });

  createPage({
    path: '/posts',
    component: postsPageTemplate,
  });

  createPage({
    path: '/tags',
    component: tagsPageTemplate,
  });

  createPage({
    path: '/tags/all',
    component: tagsPageTemplate,
  });

  Object.keys(tags).forEach((tag) => {
    createPage({
      path: `/tags/${tag}`,
      component: tagsPageTemplate,
      context: {
        activeTag: tag,
      },
    });
  });

  createPage({
    path: '/books',
    component: booksPageTemplate,
  });

  createPage({
    path: '/about',
    component: aboutPageTemplate,
    context: {
      github: {
        profile: githubProfile,
        repos: githubRepos,
      },
    },
  });

  posts.forEach((post) => {
    createPage({
      path: post.slug,
      component: postPageTemplate,
      context: { post },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@config': path.resolve(__dirname, './src/config'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@images': path.resolve(__dirname, './src/images'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@templates': path.resolve(__dirname, './src/templates'),
      },
    },
  });
};
