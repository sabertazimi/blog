module.exports = {
  siteMetadata: {
    title: 'Sabertaz Blog',
    author: 'Sabertaz',
    siteUrl: `https://tazimi.dev`,
  },
  pathPrefix: '/blog',
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
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language language-',
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
        name: 'Sabertaz Blog',
        short_name: 'Blog',
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/favicon.ico',
        include_favicon: true,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-antd',
    'gatsby-disable-404',
  ],
};
