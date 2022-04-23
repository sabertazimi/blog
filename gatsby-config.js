const path = require('node:path');

/** @type {import('gatsby').GatsbyConfig} */
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
        url: 'https://sabertazimi.github.io/awesome-notes',
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
        path: path.join(__dirname, 'contents/'),
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
        theme_color: '#1890ff',
        background_color: '#f8f9fa',
        display: 'standalone',
        icon: 'src/images/favicon.ico',
        include_favicon: true,
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: [
          'node_modules',
          '.cache',
          'public',
          'build',
          'dist',
          'coverage',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        devMode: false,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#40a9ff',
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
