<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img
      alt="Gatsby"
      src="https://www.gatsbyjs.com/Gatsby-Monogram.svg"
      width="60"
    />
  </a>
</p>
<h1 align="center">
  Gatsby's Blog Starter
</h1>

[![Author](https://img.shields.io/badge/author-sabertaz-lightgrey?style=for-the-badge)](https://github.com/sabertazimi)
[![LICENSE](https://img.shields.io/github/license/sabertazimi/blog?style=for-the-badge)](https://raw.githubusercontent.com/sabertazimi/blog/main/LICENSE)

[![Code Lines](https://img.shields.io/tokei/lines/github/sabertazimi/blog?style=for-the-badge&logo=visualstudiocode)](https://github.com/sabertazimi/blog)
[![Top Language](https://img.shields.io/github/languages/top/sabertazimi/blog?logo=typescript&style=for-the-badge)](https://github.com/https://github.com/sabertazimi/blog/search?l=typescript)

[![Continuous Integration](https://img.shields.io/github/workflow/status/sabertazimi/blog/Continuous%20Integration/main?style=for-the-badge&logo=github)](https://github.com/sabertazimi/blog/actions/workflows/ci.yml)
[![CodeQL](https://img.shields.io/github/workflow/status/sabertazimi/blog/CodeQL/main?label=CodeQL&logo=github&style=for-the-badge)](https://github.com/sabertazimi/blog/actions/workflows/codeql-analysis.yml)
[![Jest Coverage](https://raw.fastgit.org/sabertazimi/blog/gh-pages/coverage-lines.svg)](https://github.com/sabertazimi/blog/actions/workflows/ci.yml)

A great [blog](https://sabertazimi.github.io/blog) system based on React and Gatsby.

## Features

### Visual Features

- Great landing page.
- Typing effect for landing page title.
- Great fluid of post card.
- Great tags cloud page: separate page for posts under each tag.
- Great GitHub information card.
- Social share buttons.
- Syntax highlighting in code blocks using PrismJS.
- Nice animation for page transitions.
- ...and more.

### Development Features

- Dynamic route generation for Markdown posts.
- Automatically generated sidebar navigation, table of contents, previous/next links.
- Out of box support for Tailwind.css.
- Fully customizable through Tailwind.css.
- Mobile-first approach in development.
- Out of box support for GitHub Pages deployment with GitHub Actions.
- Separate components for everything.
- TypeScript static type checking.
- Disqus comments.
- Progressive web app: offline support & webapp manifest.
- ...and more.

## Post Template

`Yaml` Front + `Markdown` Body:

```markdown
---
layout: post
title: 'React Redux Basic Notes'
subtitle: 'Daily I learned'
author: 'sabertaz'
date: 2022-02-03
tags:
  - Redux
  - React
  - JavaScript
  - Frontend Development
  - Web Development
---

# React Redux Basic Notes

## Introduction

<... more contents>
```

## 🚀 Quick start

### Installation

```bash
git clone --depth=1 https://github.com/sabertazimi/blog
cd blog
npm install
```

### Development

```bash
# http://localhost:8000
npm start
```

**Open the source code and start editing!**

Your site is now running at `http://localhost:8000`!

> You'll also see a second link: \_`http://localhost:8000/___graphql`\_.
> This is a tool you can use to experiment with querying your data

## 💫 Deployment

Build for `/` path:

```bash
# Deploy public/ directory with GitHub Pages or Gatsby Cloud.
npm run build
```

Build for `/xxx` prefix path:

```bash
npm run build:gh-pages
```

More Github Pages deployment details in `.github/workflows/ci.yml`.

## Fold Structure

A quick look at the top-level files and directories you'll see in a Gatsby project.

```bash
.
├── node_modules
├── src
├── .gitignore
├── .prettierrc
├── .tokeignore
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── jsconfig.json
├── postcss.config.js
├── tailwind.config.js
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

1. **`/node_modules`**: This directory contains all of the modules of code.
2. **`/src`**: This directory contains all of the code related to the front-end.
3. **`.gitignore`**: This file tells git which files it should not track.
4. **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io).
5. **`.tokeignore`**: This is a configuration file for [Code Lines](https://github.com/XAMPPRocky/tokei).
6. **`gatsby-browser.js`**: This file is usage of the [Gatsby Browser APIs](https://www.gatsbyjs.com/docs/browser-apis).
7. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site.
8. **`gatsby-node.js`**: This file is usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis).
9. **`gatsby-ssr.js`**: This file is usage of the [Gatsby Server Side Rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis).
10. **`jsconfig.json`**: This is a configuration file for [VSCode](https://code.visualstudio.com).
11. **`postcss.config.js`**: This is a configuration file for [PostCSS](https://postcss.org).
12. **`tailwind.config.js`**: This is a configuration file for [Tailwind.css](https://tailwindcss.com/).
13. **`LICENSE`**: This Gatsby starter is licensed under the `MIT` license.
14. **`package.json`**: A manifest file for Node.js projects.
15. **`package-lock.json`**: This is automatically generated file based on NPM dependencies.
16. **`README.md`**: A text file containing useful reference information.

## Contact

[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sabertazimi@gmail.com)
[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sabertazimi)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sabertazimi)

## Reference

- [Bungee Font](https://fonts.google.com/specimen/Bungee)
