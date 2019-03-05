module.exports = {
  siteMetadata: {
    title: 'React Blog',
    author: 'sabertazimi',
  },
  pathPrefix: '/react-blog',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/_posts/`,
      },
    },
    'gatsby-plugin-offline',
  ],
};
