<h1 align="center">
  Next.js Blog Starter
</h1>

[![Author](https://img.shields.io/badge/author-sabertaz-lightgrey?style=for-the-badge)](https://github.com/sabertazimi)
[![LICENSE](https://img.shields.io/github/license/sabertazimi/blog?style=for-the-badge)](https://github.com/sabertazimi/blog/blob/main/LICENSE)

[![Code Lines](https://img.shields.io/tokei/lines/github/sabertazimi/blog?style=for-the-badge&logo=visualstudiocode)](https://github.com/sabertazimi/blog)
[![Top Language](https://img.shields.io/github/languages/top/sabertazimi/blog?logo=typescript&style=for-the-badge)](https://github.com/https://github.com/sabertazimi/blog/search?l=typescript)

[![CI](https://img.shields.io/github/workflow/status/sabertazimi/blog/CI/main?style=for-the-badge&logo=github)](https://github.com/sabertazimi/blog/actions/workflows/ci.yml)
[![CodeQL](https://img.shields.io/github/workflow/status/sabertazimi/blog/CodeQL/main?label=CodeQL&logo=github&style=for-the-badge)](https://github.com/sabertazimi/blog/actions/workflows/codeql-analysis.yml)
[![Jest Coverage](https://img.shields.io/codecov/c/github/sabertazimi/blog?logo=codecov&style=for-the-badge)](https://codecov.io/gh/sabertazimi/blog)

A great [blog](https://sabertazimi.github.io/blog) system based on React and Next.js.

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
# http://localhost:3000
npm start
```

**Open the source code and start editing!**

Your site is now running at `http://localhost:3000`!

## 💫 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsabertazimi%2Fblog&project-name=blog&repo-name=blog&demo-title=Sabertaz%20Blog&demo-url=https%3A%2F%2Fblog.tazimi.dev)

Build for `/` path:

```bash
# Deploy with Vercel.
npm run build
```

## Fold Structure

A quick look at the top-level files and directories you'll see in a Next.js project.

```bash
.
├── node_modules
├── __mocks__
├── src
├── .gitignore
├── .tokeignore
├── .eslintrc.json
├── .markdownlint.json
├── .prettierrc.json
├── .stylelintrc.json
├── .versionrc.json
├── jest.config.js
├── jest.setup.js
├── tsconfig.json
├── postcss.config.js
├── tailwind.config.js
├── LICENSE
├── package.json
└── README.md
```

1. **`/node_modules`**: This directory contains all of the modules of code.
2. **`/__mocks__`**: mock API for 3rd-party libraries for Jest testing.
3. **`/src`**: This directory contains all of the code related to the front-end.
4. **`.gitignore`**: This file tells git which files it should not track.
5. **`.tokeignore`**: This is a configuration file for [Code Lines](https://github.com/XAMPPRocky/tokei).
6. **`.eslintrc.json`**: This is a configuration file for [ESLint](https://eslint.org).
7. **`.markdownlint.json`**: This is a configuration file for [MarkdownLint](https://github.com/DavidAnson/markdownlint).
8. **`.prettierrc.json`**: This is a configuration file for [Prettier](https://prettier.io).
9. **`.stylelintrc.json`**: This is a configuration file for [StyleLint](https://stylelint.io).
10. **`.versionrc.json`**: This is a configuration file for [Standard Version](https://github.com/conventional-changelog/standard-version).
11. **`jest.config.js`**: This is configuration file for [Jest](https://jestjs.io).
12. **`jest.setup.js`**: This is Jest basic setup script (after environment setup).
13. **`tsconfig.json`**: This is a configuration file for [TypeScript](https://www.typescriptlang.org).
14. **`postcss.config.js`**: This is a configuration file for [PostCSS](https://postcss.org).
15. **`tailwind.config.js`**: This is a configuration file for [Tailwind.css](https://tailwindcss.com).
16. **`LICENSE`**: This Next.js starter is licensed under the `MIT` license.
17. **`package.json`**: A manifest file for Node.js projects.
18. **`README.md`**: A text file containing useful reference information.

## Contact

[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sabertazimi@gmail.com)
[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sabertazimi)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sabertazimi)
