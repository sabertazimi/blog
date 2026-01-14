# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Quick Start

```bash
# First time setup
pnpm install                    # ~15-20s
pnpm playwright install --with-deps  # E2E browsers (first time only)

# Development
pnpm dev                        # Start dev server at localhost:3000 (~1s)

# Common Tasks
pnpm lint                       # Run all linters (~5-10s)
pnpm lint:fix                   # Auto-fix linting issues
pnpm test                       # Unit tests (watch mode)
pnpm test:all                   # Unit tests with coverage (~35-40s)
pnpm e2e                        # E2E tests (~5-10min, includes build)
pnpm build                      # Production build (~30-40s)

# Important: Always use pnpm (never npm/yarn)
```

## Architecture Overview

Modern bilingual blog built with Next.js App Router, featuring i18n, MDX content, animations, and comprehensive testing.

### Core Stack

- **Next.js** with App Router and Turbopack
- **React** with React Compiler enabled (automatic optimizations)
- **TypeScript** in strict mode
- **Tailwind CSS** (no config file, uses PostCSS)
- **pnpm** as package manager

### Key Features

#### Internationalization (i18n)

- Full i18n support with next-intl
- Locale-based routing: `/[locale]/...` structure
- Supported locales: `en-US` (default) and `zh-CN`
- Content organized by locale in `content/[locale]/`
- Translation files in `messages/[locale].json`

#### Content Management

- MDX-based blog posts with front matter
- Content processing pipeline:
  - `gray-matter` for front matter parsing
  - `next-mdx-remote` for server-side MDX rendering
  - `remark` plugins: gfm, math, directives, gemoji, github
  - `rehype` plugins: slug, autolink-headings, external-links, katex, mdx-code-props
- Rich features: KaTeX math, admonitions, syntax highlighting with Shiki, live code editor with Sandpack

#### Component Architecture

- Server components by default (Next.js App Router)
- Client components marked with `'use client'` when needed
- Shadcn UI components in `src/components/ui/` (do not modify)
- Custom MDX components configured in `src/components/post-content.tsx`
- Path aliases: `@/` for `src/`, `@/images/` for `public/images/`, `@/tests/` for `__tests__/`

#### Styling System

- Tailwind CSS with custom CSS variables in `src/app/globals.css`
- Component variants managed with class-variance-authority (CVA)
- Style merging with `cn()` utility from `src/lib/utils.ts`
- Dark mode support with next-themes
- Typography plugin for prose content

## Project Structure

```plaintext
src/
├── app/[locale]/          # Locale-based pages (App Router)
├── components/            # React components
│   ├── ui/               # Shadcn UI base components (don't modify)
│   └── ...               # Custom components
├── lib/                  # Utilities and business logic
├── i18n/                 # Internationalization config
└── types/                # TypeScript definitions

content/[locale]/         # Blog posts organized by language
messages/[locale].json    # Translation files
public/                   # Static assets (fonts, images)
__tests__/                # Unit tests with mocks/ (don't remove)
e2e/                      # Playwright E2E tests
```

## Development Guidelines

### Code Standards

- Follow conventional commits: `type(scope): description`
- Use Context7 MCP or Shadcn MCP for documentation queries
- React Compiler eliminates need for manual useMemo/useCallback
- Server components first, client components only when necessary
- Use `data-slot` attribute for component styling hooks
- TypeScript strict mode is enforced - no `any` types
- File naming: kebab-case (files), PascalCase (components)

### Testing Strategy

- **Unit tests**: Vitest with jsdom environment for utility functions
- **Component tests**: @testing-library/react for React components
- **E2E tests**: Playwright for user journey testing (Chrome/Firefox/Safari)
- E2E tests focus on user behavior, not implementation details
- Use semantic selectors (`getByRole`, `getByLabel`) over CSS classes

### Important Constraints

- MDX files cannot use import/export statements due to next-mdx-remote limitations
- Custom MDX components must be registered in `src/components/post-content.tsx`
- Don't modify `src/components/ui/` (Shadcn components)
- Don't remove `__tests__/mocks/` (required for tests)

## Configuration Files

Key config files at root:

- `package.json` - Dependencies and scripts
- `tsconfig.json` - Strict mode, path aliases (`@/*`, `@/images/*`, `@/tests/*`)
- `next.config.ts` - React Compiler, next-intl plugin
- `eslint.config.mjs` - Flat Config, custom rules per file type
- `vitest.config.mts` - jsdom, coverage, setup files
- `playwright.config.ts` - 3 browsers, localhost:3000, timeout settings
- `components.json` - Shadcn registries (@animate-ui, @magicui, @shadcn-studio)

## CI/CD Pipeline

GitHub Actions workflows in `.github/workflows/`:

- `ci.yml` - 4 jobs: lint, unit, e2e, build (all must pass)
- `codeql-analysis.yml` - Security scanning

CI requirements:

- Node.js LTS
- pnpm via `pnpm/action-setup@v3`
- `fetch-depth: 0` for build job (git timestamps)

## Common Issues & Solutions

- **"pnpm not found"**: `npm install -g pnpm`
- **Git timestamp errors**: Need `fetch-depth: 0`
- **TypeScript errors**: `pnpm lint:type-check`
- **E2E timeout**: Check playwright.config.ts timeout settings
- **Playwright issues**: `pnpm playwright install --with-deps`
- **Hot reload**: Restart with `pnpm dev`
- **Missing modules**: `pnpm install`
- **Build message**: "Not for Vercel build, fallback to local GitHub data" is expected locally

## Commit Guidelines

All commits and PRs titles must follow [Conventional Commits](https://www.conventionalcommits.org/) style:

```md
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types defined in `.versionrc.json`.

## Pre-PR Validation

Ensure all pass:

- ✓ `pnpm install`
- ✓ `pnpm lint`
- ✓ `pnpm test:all`
- ✓ `pnpm build`
- ✓ Both locales work (if applicable)
- ✓ No security issues
- ✓ Conventional Commits style

## Quick Reference

- **Entry point**: `src/app/[locale]/page.tsx`
- **Content processing**: `src/lib/get-posts-data.ts`
- **Site config**: `src/lib/site.ts`
- **MDX components**: `src/components/post-content.tsx`
- **i18n config**: `src/i18n/routing.ts`
- **Test setup**: `__tests__/setup.ts`, `__tests__/mocks/`
- **Utilities**: `src/lib/utils.ts` (cn function, etc.)

## Constraints

- DO NOT add Claude co-authorship footer to commits
