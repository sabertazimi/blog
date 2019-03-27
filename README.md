# react-blog

[![Build Status](https://travis-ci.org/sabertazimi/react-blog.svg?branch=master)](https://travis-ci.org/sabertazimi/react-blog)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a182a53a-297d-425b-88d6-323ce7039495/deploy-status)](https://app.netlify.com/sites/tazimi/deploys)

A [blog](https://blog.tazimi.dev) system based on React, Semantic UI and Gatsby.

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

```bash
# deploy public/ directory with nginx server etc.
npm run build
```

## Todos

- Search support
- Archives page

## Reference

- [Bungee](https://fonts.google.com/specimen/Bungee)
