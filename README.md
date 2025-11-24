<p align="center">
  <a href="https://www.nextjs.org">
    <img
      src="./.github/banner.png"
      alt="Next.js"
    />
  </a>
</p>
<h1 align="center">
  Next.js Blog Starter
</h1>

[![Author](https://img.shields.io/badge/author-sabertaz-lightgrey?style=for-the-badge)](https://github.com/sabertazimi)
[![LICENSE](https://img.shields.io/github/license/sabertazimi/blog?style=for-the-badge)](https://github.com/sabertazimi/blog/blob/main/LICENSE)

[![Code Lines](https://tokei.rs/b1/github/sabertazimi/blog?style=for-the-badge&logo=visualstudiocode)](https://github.com/sabertazimi/blog)
[![Top Language](https://img.shields.io/github/languages/top/sabertazimi/blog?logo=typescript&style=for-the-badge)](https://github.com/https://github.com/sabertazimi/blog/search?l=typescript)

[![CI](https://img.shields.io/github/actions/workflow/status/sabertazimi/blog/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/sabertazimi/blog/actions/workflows/ci.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/sabertazimi/blog/codeql-analysis.yml?branch=main&label=CodeQL&logo=github&style=for-the-badge)](https://github.com/sabertazimi/blog/actions/workflows/codeql-analysis.yml)
[![Vitest Coverage](https://img.shields.io/codecov/c/github/sabertazimi/blog?logo=codecov&style=for-the-badge)](https://codecov.io/gh/sabertazimi/blog)

An awesome [blog](https://blog.tazimi.dev) system based on Next.js.

## :sparkles: Features

### Visual Features

- **Modern Landing Page**
  - Animated typing effect for title with morphing text
  - Gravity stars background animation
  - Flickering grid effects
  - Smooth page transitions with View Transitions API
- **Beautiful Post Cards**
  - Optimized image loading with Next.js Image
  - Dot pattern placeholders for loading states
  - Reading time estimation
  - Search posts with command menu (⌘K)
- **Advanced Tag System**
  - Separate pages for posts under each tag
  - Tag filtering with command menu (⌘K)
- **Rich MDX Support**
  - Optimized vertical rhythm for typography
  - Custom styled components for Markdown elements
  - **GitHub Flavored Markdown (GFM)** support
  - **KaTeX** math rendering support
  - **Admonition containers** (note, tip, warning, danger, etc.)
  - **Emoji shortcodes** support (`:smile:` → 😄)
  - **Image preview** with optimized loading
  - **Beautiful code blocks** powered by Shiki:
    - Dual theme support (light/dark mode)
    - Syntax highlighting for 200+ languages
    - Line numbers support
    - Line highlighting support
    - Custom code title support
    - One-click code copy button
  - **Live code editor** powered by Sandpack:
    - Interactive React/TypeScript playground
    - Real-time preview
    - Multi-file support
    - Hot module reloading
  - **Automatic navigation generation**:
    - Sidebar table of contents
    - Previous/next post navigation
    - Auto-linked headings with anchor links
- **GitHub Integration**
  - GitHub profile card with stats
  - Repository information cards
- **Social Features**
  - Disqus comments system
  - Share buttons for X, Facebook, and Weibo
- **User Experience**
  - Dark mode support with smooth transitions
  - Customized 404 not found page
  - Back to top button
  - Progress bar for page navigation
  - Mobile-first responsive design
  - Command menu for quick navigation (⌘K)
  - Smooth animations powered by Motion

### Development Features

- **Modern Tech Stack**
  - **Next.js** with App Router and Turbopack
  - **React** with React Compiler enabled
  - **TypeScript** with strict mode
  - **Tailwind CSS** with custom CSS variables
  - **Shadcn UI** component library
  - **pnpm** for fast package management
- **Code Quality**
  - **ESLint** with Flat Config
  - **Stylelint** for CSS linting
  - **Prettier** with Tailwind CSS plugin
  - **TypeScript** strict type checking
- **Testing**
  - **Vitest** for unit testing with coverage
  - **Playwright** for E2E testing (Chrome, Firefox, Safari)
  - **Testing Library** for React component testing
- **Performance**
  - Lightning fast HMR with Turbopack
  - Optimized builds with Rust compiler
  - Automatic code splitting
  - Image optimization with Next.js Image
- **SEO**
  - Meta tags optimization
  - Automatic sitemap generation
  - robots.txt support
  - Open Graph support
  - Twitter Card support
- **Developer Experience**
  - Hot module reloading
  - Dynamic route generation for Markdown posts
  - Separate components for everything
  - Fully customizable through Tailwind CSS
  - Out of box support for Vercel deployment
  - Git-based post update time tracking

## :bookmark_tabs: Post Template

`.yaml` front matter + `.mdx` body:

```markdown
---
layout: post
title: 'React Redux Basic Notes'
description: 'Daily I learned'
author: 'sabertaz'
date: 2022-02-03
thumbnail: '/photos/pen-writing-on-notebook.jpg'
tags:
  - Redux
  - React
  - JavaScript
  - Frontend Development
  - Web Development
---

# React Redux Basic Notes

## Introduction

Your content here...

## Math Support

Inline math: $E = mc^2$

Block math:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## Admonitions

:::note
This is a note admonition.
:::

:::tip
This is a tip admonition.
:::

:::warning
This is a warning admonition.
:::
```

## :rocket: Quick Start

### Prerequisites

- Node.js 18.17 or later
- pnpm 10 or later

### Installation

```bash
git clone https://github.com/sabertazimi/blog
cd blog
pnpm install
```

### Development

```bash
pnpm dev
```

**Open the source code and start editing!**

Your site is now running at `http://localhost:3000`!

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm serve
```

### Testing

```bash
# Run unit tests in watch mode
pnpm test

# Run unit tests with coverage
pnpm test:all

# Run E2E tests
pnpm e2e

# View E2E test report
pnpm e2e:report
```

### Linting

```bash
# Run all linters
pnpm lint

# Run ESLint and Stylelint
pnpm lint:style

# Run TypeScript type checking
pnpm lint:type-check

# Auto-fix linting issues
pnpm lint:fix
```

## :stars: Deployment

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsabertazimi%2Fblog&project-name=blog&repo-name=blog&demo-title=Sabertaz%20Blog&demo-url=https%3A%2F%2Fblog.tazimi.dev)

Build for production:

```bash
pnpm build
```

The optimized production build will be in the `.next` folder.

## :open_file_folder: Project Structure

```bash
.
├── node_modules/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── post/[slug]/       # Dynamic post pages
│   │   ├── posts/             # All posts page
│   │   ├── tag/[tagName]/     # Tag filter pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── robots.ts          # robots.txt generation
│   │   └── sitemap.ts         # Sitemap generation
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   ├── mdx-code.tsx       # Code block with Shiki
│   │   ├── mdx-editor.tsx     # Live code editor with Sandpack
│   │   ├── mdx-image.tsx      # Optimized image component
│   │   ├── post-card.tsx      # Post card component
│   │   ├── post-content.tsx   # MDX content renderer
│   │   └── ...
│   ├── layouts/               # Layout components
│   │   └── default-layout.tsx
│   ├── lib/                   # Utility functions
│   │   ├── get-posts-data.ts  # MDX processing
│   │   ├── utils.ts           # Helper functions
│   │   ├── routes.ts          # Route configuration
│   │   ├── seo.ts             # SEO utilities
│   │   └── ...
│   └── types/                 # TypeScript type definitions
│       └── index.d.ts
├── contents/                  # Blog posts (.mdx files)
│   ├── post1.mdx
│   ├── post2.mdx
│   └── ...
├── public/                    # Static assets
│   ├── fonts/
│   ├── photos/
│   └── ...
├── e2e/                       # Playwright E2E tests
│   └── home.spec.ts
│   └── ...
├── .github/                   # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       └── codeql-analysis.yml
├── .gitignore
├── .prettierrc.json
├── eslint.config.mjs          # ESLint Flat Config
├── next.config.ts             # Next.js configuration
├── package.json
├── playwright.config.ts       # Playwright configuration
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest configuration
├── LICENSE
└── README.md
```

### Key Directories

1. **`src/app/`**: Next.js App Router pages with file-based routing
2. **`src/components/`**: Reusable React components
3. **`src/components/ui/`**: Shadcn UI base components
4. **`src/lib/`**: Utility functions and data fetching logic
5. **`src/types/`**: TypeScript type definitions
6. **`contents/`**: Blog posts in MDX format
7. **`public/`**: Static assets (images, fonts, etc.)
8. **`e2e/`**: End-to-end tests with Playwright

## :wrench: Configuration

### Site Configuration

Edit `src/lib/site.ts` to customize your blog:

```typescript
export const site = {
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  url: 'https://yourblog.com',
  // ... more settings
}
```

### Theme Customization

The blog uses Tailwind CSS with custom CSS variables. Edit `src/app/globals.css` to customize colors:

```css
:root {
  --background: oklch(100% 0 0deg);
  --foreground: oklch(14.5% 0 0deg);
  --primary: oklch(20.5% 0 0deg);
  /* ... more colors */
}

.dark {
  --background: oklch(14.5% 0 0deg);
  --foreground: oklch(98.5% 0 0deg);
  /* ... more colors */
}
```

### MDX Components

Customize MDX components in `src/components/post-content.tsx`:

```typescript
const mdxComponents = {
  aside: MDXAdmonition,
  img: MDXImage,
  pre: MDXCode,
  Button,
  Editor: MDXEditor,
  // Add your custom components here
}
```

## :construction: Caveats

- `import` and `export` statements cannot be used **inside** MDX files due to `next-mdx-remote` limitations.
- If you need custom components in MDX, add them to `src/components/post-content.tsx`.
- See [explanation](https://github.com/hashicorp/next-mdx-remote/issues/143#issuecomment-1043067293) for details.

## :package: Tech Stack

### Core Package

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

### Styling Toolkit

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Motion](https://motion.dev/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library

### Content Helper

- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX support
- [Shiki](https://shiki.style/) - Syntax highlighting
- [Sandpack](https://sandpack.codesandbox.io/) - Live code editor
- [KaTeX](https://katex.org/) - Math rendering
- [remark](https://github.com/remarkjs/remark) - Markdown processing
- [rehype](https://github.com/rehypejs/rehype) - HTML processing

### Testing Library

- [Vitest](https://vitest.dev/) - Unit testing
- [Playwright](https://playwright.dev/) - E2E testing
- [Testing Library](https://testing-library.com/) - React testing

### Development Tool

- [ESLint](https://eslint.org/) - Linting
- [Stylelint](https://stylelint.io/) - CSS linting
- [Prettier](https://prettier.io/) - Code formatting
- [pnpm](https://pnpm.io/) - Package manager

## :bookmark: Contact

[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sabertazimi@gmail.com)
[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sabertazimi)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sabertazimi)
