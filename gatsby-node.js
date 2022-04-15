/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('node:path');
const { execSync } = require('node:child_process');
const { createFilePath } = require('gatsby-source-filesystem');
const { Octokit } = require('@octokit/rest');
const config = require('./gatsby-config');

const octokit = new Octokit();

/** @param {import('gatsby').CreateNodeArgs} */
exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const slug = createFilePath({ node, getNode, basePath: 'pages' });
      const gitTime = execSync(
        `git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`
      ).toString();
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });
      createNodeField({
        node,
        name: 'gitTime',
        value: gitTime,
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

/** @param {import('gatsby').CreatePagesArgs} */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  let githubProfile = {
    username: 'sabertazimi',
    avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
    bio: 'CS',
    location: 'Wuhan',
    url: 'https://github.com/sabertazimi',
    followers: 42,
    followersUrl: 'https://github.com/sabertazimi/followers',
    following: 185,
    followingUrl: 'https://github.com/sabertazimi/following',
    createDate: 'Sat May 30 2015',
  };

  let githubRepos = [
    {
      name: 'awesome-notes',
      stars: 22,
      language: 'TypeScript',
      repoUrl: 'https://github.com/sabertazimi/awesome-notes',
    },
    {
      name: 'hust-lab',
      stars: 21,
      language: 'C',
      repoUrl: 'https://github.com/sabertazimi/hust-lab',
    },
    {
      name: 'dragon-zsh-theme',
      stars: 11,
      language: 'Shell',
      repoUrl: 'https://github.com/sabertazimi/dragon-zsh-theme',
    },
  ];

  try {
    const profileResponse = await octokit.rest.users.getByUsername({
      username: config.siteMetadata.socialList.github,
    });
    const reposResponse = await octokit.request('GET /users/{username}/repos', {
      username: config.siteMetadata.socialList.github,
    });

    const { data: profileJSON } = profileResponse;
    const { data: reposJSON } = reposResponse;

    githubProfile = {
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
  } catch (error) {
    console.warn(error.message);
    console.warn('GitHub API request error, fallback to local GitHub data.');
  }

  const result = await graphql(`
    query PostsDataQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
              gitTime
            }
            frontmatter {
              title
              subtitle
              author
              date
              tags
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
        gitTime: node.fields.gitTime,
        timeToRead: node.timeToRead,
        excerpt: node.excerpt,
        toc: node.tableOfContents,
        html: node.html,
        prevPost,
        nextPost,
      };
    }
  );

  const tags = posts
    .map(post => post.tags || [])
    .flat()
    .reduce((acc, cur) => {
      if (!acc[cur]) acc[cur] = 0;
      acc[cur] += 1;
      return acc;
    }, {});

  const homePageTemplate = require.resolve('./src/templates/Home.tsx');
  const postsPageTemplate = require.resolve('./src/templates/Posts.tsx');
  const tagsPageTemplate = require.resolve('./src/templates/Tags.tsx');
  const booksPageTemplate = require.resolve('./src/templates/Books.tsx');
  const aboutPageTemplate = require.resolve('./src/templates/About.tsx');
  const postPageTemplate = require.resolve('./src/templates/Post.tsx');

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

  Object.keys(tags).forEach(tag => {
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

  posts.forEach(post => {
    createPage({
      path: post.slug,
      component: postPageTemplate,
      context: { post },
    });
  });
};

/** @param {import('gatsby').CreateWebpackConfigArgs} */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@types': path.resolve(__dirname, 'src/types'),
      },
    },
  });
};
