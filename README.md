# blog

[![Author](https://img.shields.io/badge/author-sabertaz-lightgrey?style=for-the-badge)](https://github.com/sabertazimi)
[![LICENSE](https://img.shields.io/github/license/sabertazimi/blog?style=for-the-badge)](https://raw.githubusercontent.com/sabertazimi/blog/master/LICENSE)

[![Code Lines](https://img.shields.io/tokei/lines/github/sabertazimi/blog?style=for-the-badge&logo=visualstudiocode)](https://github.com/sabertazimi/blog)
[![Netlify Status](https://img.shields.io/netlify/a182a53a-297d-425b-88d6-323ce7039495?logo=netlify&style=for-the-badge)](https://app.netlify.com/sites/sabertaz/deploys)
[![Continuous Integration](https://img.shields.io/github/workflow/status/sabertazimi/blog/Continuous%20Integration/master?style=for-the-badge&logo=github)](https://github.com/sabertazimi/blog/actions/workflows/ci.yml)

A [blog](https://sabertazimi.github.io/blog) system based on React and Gatsby.

## Features

- Add posts to `src/pages`
- Tags cloud page
- Books page
- Github information card
- Beautiful footer
- Scroll to top/bottom fixed buttons
- Social share fixed buttons
- Nice animation
- Typing effect for title

## Post Template

yaml front + markdown body

```markdown
---
layout:     post
title:      "JavaScript Basic Notes"
subtitle:   "Daily I learned"
author:     "sabertazimi"
date:       2019-02-29
tags:
    - Web
    - Front End
    - JavaScript
---

content ...
```

## Installation

```bash
npm install
```

## Development

```bash
# http://localhost:8000
npm start
```

## Deployment

Build for `/` path:

```bash
# deploy public/ directory with nginx server etc.
npm run build
```

Build for `/xxx` prefix path:

```bash
npm run build:gh-pages
```

## Reference

- [Bungee Font](https://fonts.google.com/specimen/Bungee)

## Contact

[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sabertazimi@gmail.com)
[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sabertazimi)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sabertazimi)
