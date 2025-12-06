# Copilot Coding Agent Instructions

## Repository Overview

This is a **Next.js-based blog system** with full i18n support, MDX content management, and a modern tech stack. The blog features a landing page with animations, advanced MDX rendering with code highlighting, live code editing, math support, and comprehensive testing.

- **Type**: Blog/Content Management System
- **Size**: ~40 MDX posts, ~50 React components, ~10 utility libraries
- **Primary Languages**: TypeScript (95%), CSS (3%), JavaScript (2%)
- **Framework**: Next.js 16 with App Router and Turbopack
- **Package Manager**: pnpm 10.24.0 (required - do not use npm or yarn)
- **Node Version**: Node.js 20+ (LTS)
- **Target Runtime**: Vercel deployment, with support for static site generation

### Tech Stack

**Core**: Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4, Shadcn UI  
**Content**: next-mdx-remote, Shiki (syntax highlighting), Sandpack (live editor), KaTeX (math)  
**i18n**: next-intl (English and Chinese locales)  
**Testing**: Vitest (unit), Playwright (E2E across Chrome/Firefox/Safari)  
**Linting**: ESLint (Flat Config), Stylelint, Prettier with Tailwind plugin

## Build & Development Commands

**IMPORTANT**: Always use `pnpm` - never use `npm` or `yarn`. The project requires pnpm 10.24.0.

### Installation

```bash
pnpm install
```

**Time**: ~15-20 seconds on first install. Always run after cloning or when dependencies change.

### Development Server

```bash
pnpm dev
```

- Starts Next.js dev server with Turbopack at `http://localhost:3000`
- Hot module reloading enabled
- Ready in ~1 second after initial compilation
- Use Ctrl+C to stop

### Building

```bash
pnpm build
```

- **Time**: ~30-40 seconds (includes TypeScript checking and static page generation)
- **Critical**: Requires `fetch-depth: 0` in git checkout for git-based post timestamps
- Generates ~40 static pages for all locales and posts
- Output: `.next/` directory (git-ignored)
- **Note**: Displays "Not for Vercel build, fallback to local GitHub data" message during local builds - this is expected behavior

### Production Server

```bash
pnpm serve
```

- Starts production server on port 3000
- Must run `pnpm build` first

### Linting

```bash
# Run all linters (ESLint + Stylelint + TypeScript)
pnpm lint

# Run only ESLint and Stylelint
pnpm lint:style

# Run only TypeScript type checking
pnpm lint:type-check

# Auto-fix linting issues
pnpm lint:fix
```

- **Time**: ~5-10 seconds for full lint
- ESLint uses Flat Config (eslint.config.mjs)
- Always run before committing

### Testing

#### Unit Tests

```bash
# Watch mode (for development)
pnpm test

# Run all tests with coverage
pnpm test:all
```

- **Time**: ~35-40 seconds for full suite
- **Framework**: Vitest with jsdom
- **Location**: `__tests__/**/*.test.ts(x)`
- **Coverage**: Generates coverage report in terminal and coverage/ directory
- **Setup Files**: Multiple mocks in `__tests__/mocks/` and `__tests__/setup.ts`

#### E2E Tests

```bash
# Install Playwright browsers (first time only)
pnpm playwright install --with-deps

# Run E2E tests
pnpm e2e

# View test report
pnpm e2e:report

# Interactive UI mode
pnpm e2e:ui
```

- **Time**: ~5-10 minutes (tests all 3 browsers)
- **Location**: `e2e/*.spec.ts`
- **Browsers**: Chrome, Firefox, Safari (WebKit)
- **Important**: E2E tests automatically build the app first (`pnpm build && pnpm serve`)
- **Timeout**: 300 seconds for web server startup
- **CI Behavior**: Retries failed tests 2 times on CI

## Project Architecture

### Directory Structure

```
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Locale-based routing (en-US, zh-CN)
│   │   │   ├── about/            # About page
│   │   │   ├── post/[slug]/      # Dynamic post pages
│   │   │   ├── posts/            # Posts listing page
│   │   │   ├── tag/[tagName]/    # Tag filter pages
│   │   │   ├── page.tsx          # Home/landing page
│   │   │   ├── layout.tsx        # Root layout with providers
│   │   │   └── not-found.tsx     # 404 page
│   │   ├── globals.css           # Global styles and CSS variables
│   │   ├── providers.tsx         # Theme and i18n providers
│   │   ├── robots.ts             # robots.txt generator
│   │   └── sitemap.ts            # Sitemap generator
│   ├── components/               # React components
│   │   ├── ui/                   # Shadcn UI components (button, card, dialog, etc.)
│   │   ├── mdx-*.tsx             # MDX-specific components (code, image, editor, admonition)
│   │   ├── post-*.tsx            # Post-related components (card, header, footer, toc, etc.)
│   │   └── *.tsx                 # Other components (navigation, profile, language switcher)
│   ├── i18n/                     # Internationalization
│   │   ├── routing.ts            # i18n routing config (locales, default locale)
│   │   ├── request.ts            # Request-level i18n config
│   │   ├── navigation.ts         # Locale-aware navigation helpers
│   │   └── utils.ts              # i18n utilities
│   ├── layouts/                  # Layout components
│   │   └── default-layout.tsx
│   ├── lib/                      # Utility functions and data fetching
│   │   ├── get-posts-data.ts     # MDX file processing and parsing
│   │   ├── get-github-data.ts    # GitHub API integration
│   │   ├── get-build-time.ts     # Build timestamp
│   │   ├── get-routes.ts         # Route generation
│   │   ├── seo.ts                # SEO utilities
│   │   ├── site.ts               # Site configuration
│   │   ├── social.ts             # Social sharing utilities
│   │   └── utils.ts              # General utilities
│   ├── types/                    # TypeScript types
│   │   ├── index.d.ts
│   │   └── i18n.ts
│   └── proxy.ts                  # next-intl middleware
├── contents/                     # Blog posts (MDX files)
│   ├── en-US/                    # English posts
│   └── zh-CN/                    # Chinese posts
├── messages/                     # i18n translation JSON files
│   ├── en-US.json
│   └── zh-CN.json
├── public/                       # Static assets
│   ├── fonts/
│   ├── images/
│   └── photos/
├── __tests__/                    # Unit tests
│   ├── components/               # Component tests
│   ├── lib/                      # Library tests
│   ├── i18n/                     # i18n tests
│   ├── mocks/                    # Test mocks
│   └── setup.ts                  # Test setup
└── e2e/                         # Playwright E2E tests
```

### Key Configuration Files

- **package.json**: Scripts, dependencies (uses pnpm 10.24.0)
- **tsconfig.json**: TypeScript config with strict mode, path aliases (@/*, @/images/*, @/tests/*)
- **next.config.ts**: Next.js config with React Compiler and next-intl plugin
- **eslint.config.mjs**: ESLint Flat Config with custom rules per file type
- **.prettierrc.json**: Prettier with Tailwind CSS plugin (printWidth: 120, no semicolons)
- **.stylelintrc.json**: Stylelint extending @dg-scripts/stylelint-config
- **vitest.config.mts**: Vitest config with jsdom, coverage settings, and setup files
- **playwright.config.ts**: Playwright config for 3 browsers, baseURL localhost:3000
- **postcss.config.mjs**: PostCSS with @tailwindcss/postcss plugin
- **components.json**: Shadcn UI config with multiple registries (@animate-ui, @magicui, @shadcn-studio)

## CI/CD Pipeline

### GitHub Actions Workflows

Located in `.github/workflows/`:

1. **ci.yml** - Main CI pipeline with 4 jobs:
   - **lint**: ESLint, Stylelint, TypeScript checking (~10s)
   - **unit**: Unit tests with coverage, uploads to Codecov (~40s)
   - **e2e**: E2E tests with Playwright browser caching (~5-10min)
   - **build**: Production build, uploads .next artifact (~40s)
   - **publish**: GitHub release (only on version tags)

2. **codeql-analysis.yml** - Security scanning for JavaScript/TypeScript

3. **lighthouse.yml** - Performance auditing (not critical for PRs)

### CI Requirements

- All jobs must pass for PR approval
- **fetch-depth**: Use `fetch-depth: 0` for build job (git timestamps), `fetch-depth: 1` for others
- **Node version**: Uses `lts/*` (currently Node 20)
- **pnpm**: Installed via `pnpm/action-setup@v3`
- **Playwright caching**: Uses version-based cache key for browser binaries

## Common Patterns & Best Practices

### Adding MDX Posts

1. Create `.mdx` file in `contents/[locale]/` (e.g., `contents/en-US/my-post.mdx`)
2. Add YAML frontmatter:
   ```yaml
   ---
   layout: post
   title: 'Your Post Title'
   description: 'Post description'
   author: 'sabertaz'
   date: 2024-12-06
   thumbnail: '/photos/image.jpg'
   tags:
     - Tag1
     - Tag2
   ---
   ```
3. Posts automatically appear on home page, posts page, and tag pages
4. Slug is filename without extension

### MDX Features

- **Code blocks**: Use triple backticks with language, supports title and line highlighting
- **Math**: Inline `$E=mc^2$` or block `$$...$$` with KaTeX
- **Admonitions**: `:::note`, `:::tip`, `:::warning`, `:::danger`
- **Emoji**: `:smile:` → 😄
- **Images**: Automatically optimized with Next.js Image
- **Live code**: `<Editor>` component with Sandpack

### Adding Components

- **UI components**: Use Shadcn CLI: `pnpm dlx shadcn@latest add [component]`
- **Custom components**: Add to `src/components/` and export from `post-content.tsx` for MDX use
- **Styling**: Use Tailwind CSS classes and CSS variables from globals.css

### i18n

- **Adding locales**: Update `src/i18n/routing.ts`, create `messages/[locale].json`, create `contents/[locale]/`
- **Translation keys**: Access via `useTranslations()` hook or `getTranslations()` server function
- **Routing**: All pages under `[locale]/` with locale prefix in URL

### Environment Variables

- **VERCEL**: Automatically set on Vercel, enables GitHub API calls in `get-github-data.ts`
- **NODE_ENV**: Used for development warnings in mdx-code.tsx and mdx-editor.tsx
- No `.env` file required for local development

## Troubleshooting

### Build Failures

- **"pnpm: command not found"**: Install pnpm globally: `npm install -g pnpm@10.24.0`
- **Git timestamp errors**: Ensure `fetch-depth: 0` in git checkout
- **TypeScript errors**: Run `pnpm lint:type-check` to see full error details
- **Build timeout**: Increase timeout if needed, typical build takes ~30-40 seconds

### Test Failures

- **Playwright install issues**: Run `pnpm playwright install --with-deps` to install browsers
- **E2E timeout**: Playwright web server has 300s timeout, build can take time
- **Unit test mocks**: Check `__tests__/mocks/` for proper mock setup
- **CSS parsing warnings**: "Could not parse CSS stylesheet" warnings are non-fatal

### Development Issues

- **Hot reload not working**: Restart dev server with `pnpm dev`
- **Module not found**: Run `pnpm install` to ensure dependencies are installed
- **Port 3000 in use**: Kill existing process or change port in next.config.ts

## Important Constraints

1. **Never use npm or yarn** - only pnpm 10.24.0
2. **Do not modify** `src/components/ui/` files - these are Shadcn components
3. **Do not remove** test mocks in `__tests__/mocks/` - required for tests to pass
4. **Always maintain** locale structure in `contents/` and `messages/`
5. **Keep MDX posts** in locale-specific directories
6. **Do not commit** `.next/`, `node_modules/`, `coverage/`, `playwright-report/`
7. **TypeScript strict mode** is enabled - all code must be properly typed
8. **File naming**: Use kebab-case for files, PascalCase for React components

## Validation Checklist

Before submitting PR, ensure:

- [ ] `pnpm install` completes successfully
- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm test:all` passes with good coverage
- [ ] `pnpm build` completes successfully
- [ ] No TypeScript errors (`pnpm lint:type-check`)
- [ ] Changes work in both English and Chinese locales (if applicable)
- [ ] MDX posts render correctly (if added/modified)
- [ ] No security vulnerabilities introduced

## Quick Reference

**Root files**: README.md, package.json, tsconfig.json, next.config.ts, eslint.config.mjs, vitest.config.mts, playwright.config.ts, .prettierrc.json, .stylelintrc.json, components.json, postcss.config.mjs

**Main entry point**: `src/app/[locale]/page.tsx` (landing page)

**Content processing**: `src/lib/get-posts-data.ts` (reads MDX, generates metadata)

**Site config**: `src/lib/site.ts` (author, URL, social links, GitHub data)

**MDX components**: `src/components/post-content.tsx` (defines available MDX components)

**i18n setup**: `src/i18n/routing.ts` (locale configuration)

**Test setup**: `__tests__/setup.ts` and `__tests__/mocks/` (test environment)

---

**Trust these instructions**: Only search for additional information if something is incomplete, incorrect, or if you encounter unexpected behavior not covered here.
