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
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
        plugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {
                sh: 'bash',
              },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Sabertazimi' Blog",
        short_name: 'Blog',
        start_url: '/',
        display: 'standalone',
        icon: 'static/favicon.ico',
        include_favicon: true,
      },
    },
    'gatsby-plugin-offline',
  ],
};
