# Next.js Blog Starter

[![Author](https://img.shields.io/badge/author-sabertaz-lightgrey?style=for-the-badge)](https://github.com/sabertazimi)
[![LICENSE](https://img.shields.io/github/license/sabertazimi/blog?style=for-the-badge)](https://github.com/sabertazimi/blog/blob/main/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/sabertazimi/blog?logo=typescript&style=for-the-badge)](https://github.com/sabertazimi/blog/search?l=typescript)

[![CI](https://img.shields.io/github/actions/workflow/status/sabertazimi/blog/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/sabertazimi/blog/actions/workflows/ci.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/sabertazimi/blog/codeql-analysis.yml?branch=main&label=CodeQL&logo=github&style=for-the-badge)](https://github.com/sabertazimi/blog/actions/workflows/codeql-analysis.yml)
[![Vitest Coverage](https://img.shields.io/codecov/c/github/sabertazimi/blog?logo=codecov&style=for-the-badge)](https://codecov.io/gh/sabertazimi/blog)

An awesome [blog](https://blog.tazimi.dev) system based on Next.js.

|                  Default                  |                             Custom                             |
| :---------------------------------------: | :------------------------------------------------------------: |
| ![Home](./.github/images/home.gif 'Home') | ![Home Custom](./.github/images/home-custom.gif 'Home Custom') |
|  ![MDX](./.github/images/mdx.png 'MDX')   |  ![MDX Custom](./.github/images/mdx-custom.png 'MDX Custom')   |
| ![Code](./.github/images/code.png 'Code') | ![Code Custom](./.github/images/code-custom.png 'Code Custom') |

## :sparkles: Features

### LLM-Ready

- **AI Agent Actions** - One-click "Read with Claude" or "Read with ChatGPT"
  to open articles in AI assistants with context
- **llms.txt API** - Auto-generated structured feed for LLM consumption at `/llms.txt`

### User Experience

- **Rich MDX Support** - GFM, KaTeX math, admonitions, emoji shortcodes,
  Shiki-based syntax highlighting, live code editor with Sandpack
- **Modern UI/UX** - Dark mode, smooth animations, command menu (⌘K),
  responsive design, progress indicators
- **Advanced Navigation** - Auto-generated TOC with active tracking,
  previous/next posts, tag filtering, search
- **Social & Interactive** - Giscus comments, share buttons, GitHub integration
- **RSS Feed** - Auto-generated RSS feeds at `/{locale}/feed.xml` for content subscription
- **Bilingual (i18n)** - Full English/Chinese support with locale-specific routing

### Developer Experience

- **Modern Stack** - Next.js App Router + Turbopack, React Compiler,
  TypeScript strict mode
- **Comprehensive Testing** - Vitest (unit), Playwright (E2E), Testing Library
- **Code Quality** - ESLint, Stylelint, Prettier, CI/CD with GitHub Actions
- **Performance** - Automatic code splitting, image optimization, Rust-based builds
- **SEO Ready** - Meta tags, sitemap, robots.txt, Open Graph, Twitter Cards

## :bookmark_tabs: Post Template

`.yaml` front matter + `.mdx` body:

```markdown
---
layout: post
title: 'Your Post Title'
description: 'Your post description'
author: 'Your Name'
date: 2026-01-01
thumbnail: '/thumbnails/your-thumbnail.jpg'
tags:
  - Your Tag 1
  - Your Tag 2
  - Your Tag 3
---

# Your Post Title

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

## :stars: Deployment

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsabertazimi%2Fblog&project-name=blog&repo-name=blog&demo-title=Sabertaz%20Blog&demo-url=https%3A%2F%2Fblog.tazimi.dev)

Build for production:

```bash
pnpm build
```

The optimized production build will be in the `.next` folder.

## :wrench: Configuration

### Site Configuration

Edit `src/lib/site.ts` to customize your blog:

```typescript
export const site = {
  author: 'Your Name',
  url: 'https://yourblog.com',
  // ... more settings
}
```

### i18n Configuration

Configure supported locales in `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ['en-US', 'zh-CN'],
  defaultLocale: 'en-US',
  localePrefix: 'always',
})
```

Add translations in `messages/[locale].json`:

```json
{
  "site": {
    "title": "Your Blog Title",
    "description": "Your blog description"
  },
  "common": {
    "loading": "Loading...",
    "backToTop": "Back to top"
  }
}
```

Organize MDX posts by locale in `content/[locale]/`:

```bash
content/
├── en-US/
│   ├── my-first-post.mdx
│   └── ...
└── zh-CN/
    ├── my-first-post.mdx
    └── ...
```

### Theme Customization

The blog uses Tailwind CSS with custom CSS variables.
Edit `src/app/globals.css` to customize colors:

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

[Nature](https://www.shadcn.io/theme/nature) theme:

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/nature.json
```

Claude theme:

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/claude.json
```

### Shadcn UI Registries

The project includes multiple component registries in `components.json`:

- **@animate-ui**: <https://animate-ui.com> - Animated UI components
- **@magicui**: <https://magicui.design> - Magic UI components
- **@shadcn-studio**: <https://shadcnstudio.com> - Shadcn Studio components, blocks, and themes

You can add components from these registries:

```bash
pnpm dlx shadcn@latest add @magicui/morphing-text
pnpm dlx shadcn@latest add @animate-ui/gravity-stars
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

## :open_file_folder: Project Structure

```bash
.
├── node_modules/
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── [locale]/              # Locale-based routing
│   │   │   ├── about/             # About page
│   │   │   ├── post/[slug]/       # Dynamic post pages
│   │   │   ├── posts/             # All posts page
│   │   │   ├── tag/[tagName]/     # Tag filter pages
│   │   │   ├── feed.xml/          # RSS feed generation
│   │   │   ├── layout.tsx         # Locale layout
│   │   │   ├── page.tsx           # Home page
│   │   │   └── not-found.tsx      # 404 page
│   │   ├── globals.css            # Global styles
│   │   ├── providers.tsx          # Context providers
│   │   ├── robots.ts              # robots.txt generation
│   │   └── sitemap.ts             # Sitemap generation
│   ├── components/                # React components
│   │   ├── ui/                    # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   ├── language-switcher.tsx  # Language switcher
│   │   ├── mdx-code.tsx           # Code block with Shiki
│   │   ├── mdx-editor.tsx         # Live code editor with Sandpack
│   │   ├── mdx-image.tsx          # Optimized image component
│   │   ├── post-card.tsx          # Post card component
│   │   ├── post-content.tsx       # MDX content renderer
│   │   └── ...
│   ├── i18n/                      # Internationalization
│   │   ├── routing.ts             # i18n routing config
│   │   ├── request.ts             # Request config
│   │   ├── navigation.ts          # Navigation helpers
│   │   └── utils.ts               # i18n utilities
│   ├── layouts/                   # Layout components
│   │   └── default-layout.tsx
│   ├── lib/                       # Utility functions
│   │   ├── get-posts-data.ts      # MDX processing
│   │   ├── utils.ts               # Helper functions
│   │   ├── get-routes.ts          # Route generation
│   │   ├── seo.ts                 # SEO utilities
│   │   └── ...
│   ├── types/                     # TypeScript type definitions
│   │   ├── index.d.ts
│   │   └── i18n.ts
│   └── proxy.ts                   # next-intl middleware
├── content/                       # Blog posts (.mdx files)
│   ├── en-US/                     # English posts
│   │   ├── post1.mdx
│   │   └── ...
│   └── zh-CN/                     # Chinese posts
│       ├── post1.mdx
│       └── ...
├── messages/                      # i18n translation files
│   ├── en-US.json
│   └── zh-CN.json
├── public/                        # Static assets
│   ├── fonts/
│   ├── images/
│   ├── thumbnails/
│   └── ...
├── e2e/                           # Playwright E2E tests
│   ├── home.spec.ts
│   ├── i18n.spec.ts
│   └── ...
├── .github/                       # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       └── codeql-analysis.yml
├── .gitignore
├── .prettierrc.json
├── components.json                # Shadcn UI config
├── eslint.config.mjs              # ESLint Flat Config
├── next.config.ts                 # Next.js configuration
├── package.json
├── playwright.config.ts           # Playwright configuration
├── postcss.config.mjs             # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── vitest.config.mts              # Vitest configuration
├── LICENSE
└── README.md
```

### Key Directories

1. **`src/app/[locale]/`**: Locale-based Next.js App Router pages with i18n support
2. **`src/components/`**: Reusable React components
3. **`src/components/ui/`**: Shadcn UI base components
4. **`src/i18n/`**: Internationalization configuration and utilities
5. **`src/lib/`**: Utility functions and data fetching logic
6. **`src/types/`**: TypeScript type definitions
7. **`content/`**: Blog posts in MDX format (organized by locale)
8. **`messages/`**: i18n translation JSON files
9. **`public/`**: Static assets (images, fonts, etc.)
10. **`e2e/`**: End-to-end tests with Playwright

## :package: Tech Stack

### Core Package

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

### Styling Toolkit

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Motion](https://motion.dev/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Simple Icons](https://simpleicons.org/) - Brand icons

### Content Helper

- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX support
- [next-intl](https://next-intl.dev/) - Internationalization
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

## :construction: Caveats

- `import` and `export` statements cannot be used **inside** MDX files due to `next-mdx-remote` limitations.
- If you need custom components in MDX, add them to `src/components/post-content.tsx`.
- See [explanation](https://github.com/hashicorp/next-mdx-remote/issues/143#issuecomment-1043067293) for details.

## :bookmark: Contact

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sabertazimi)
[![Email](https://img.shields.io/badge/-Gmail-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sabertazimi@gmail.com)
[![X](https://img.shields.io/badge/-X.com-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/sabertazimi)
