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
        path: `${__dirname}/src/_posts/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-offline',
  ],
};
