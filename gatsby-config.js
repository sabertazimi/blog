module.exports = {
  siteMetadata: {
    title: 'Sabertaz Blog',
    author: 'Sabertaz',
    siteUrl: 'https://tazimi.dev',
    email: 'sabertazimi@gmail.com',
    disqusUrl: 'https://sabertaz-blog.disqus.com',
    landingTitles: [`I'm a coder.`, `I'm a learner.`],
    socialList: {
      github: 'sabertazimi',
      twitter: 'sabertazimi',
      facebook: 'sabertazimi',
      linkedin: 'sabertazimi',
      weibo: 'sabertazimi',
    },
    bookList: [
      {
        title: 'awesome-notes',
        author: 'sabertazimi',
        url: 'https://notes.tazimi.dev',
        description: 'Daily I Learned Notes',
      },
    ],
  },
  pathPrefix: '/blog',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        footnotes: true,
        gfm: true,
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
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-minify-html',
      options: {
        debug: false,
      },
    },
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        verbose: false,
        extensions: ['css', 'html', 'js', 'svg'],
      },
    },
  ],
};
