# Copilot Coding Agent Instructions

## Repository Overview

**Next.js blog system** with i18n, MDX content, animations, and comprehensive testing.

- **Type**: Blog/CMS | **Size**: ~40 MDX posts, ~50 components, ~10 libs
- **Languages**: TypeScript (95%), CSS, JavaScript
- **Stack**: Next.js (App Router, Turbopack), React, TypeScript, Tailwind CSS, Shadcn UI, next-mdx-remote, Shiki, Sandpack, KaTeX, next-intl (en-US/zh-CN)
- **Testing**: Vitest (unit), Playwright (E2E: Chrome/Firefox/Safari)
- **Package Manager**: **pnpm only** (never npm/yarn) | **Node**: LTS

## Essential Commands (Always use pnpm)

```bash
pnpm install              # ~15-20s. Always run first or when deps change
pnpm dev                  # Dev server at localhost:3000, ready in ~1s
pnpm build                # ~30-40s. REQUIRES fetch-depth:0 for git timestamps. Outputs .next/
pnpm serve                # Production server (run pnpm build first)
pnpm lint                 # ~5-10s. ESLint + Stylelint + TypeScript
pnpm lint:fix             # Auto-fix linting issues
pnpm test                 # Unit tests (watch mode)
pnpm test:all             # ~35-40s. All unit tests with coverage
pnpm playwright install --with-deps  # First time: install E2E browsers
pnpm e2e                  # ~5-10min. E2E tests (auto-builds first, 300s timeout)
```

**Key Notes**:
- Build message "Not for Vercel build, fallback to local GitHub data" is expected locally
- E2E tests run on Chrome/Firefox/Safari, retry 2x on CI
- Unit test mocks in `__tests__/mocks/` - don't remove
- Always lint before committing

## Project Structure

**Key Directories**:
- `src/app/[locale]/` - App Router pages (home, about, post/[slug], posts, tag/[tagName], not-found)
- `src/components/` - React components (ui/, mdx-*.tsx, post-*.tsx, navigation, etc.)
- `src/i18n/` - i18n config (routing.ts, navigation.ts, utils.ts)
- `src/lib/` - Utilities (get-posts-data.ts, get-github-data.ts, site.ts, seo.ts, social.ts)
- `contents/[locale]/` - MDX blog posts (en-US/, zh-CN/)
- `messages/[locale].json` - i18n translations
- `__tests__/` - Unit tests with mocks/
- `e2e/` - Playwright E2E tests

**Config Files**:
- `tsconfig.json` - Strict mode, path aliases (@/*, @/images/*, @/tests/*)
- `next.config.ts` - React Compiler, next-intl plugin
- `eslint.config.mjs` - Flat Config, custom rules per file type
- `.prettierrc.json` - Tailwind plugin, printWidth 120, no semicolons
- `vitest.config.mts` - jsdom, coverage, setup files
- `playwright.config.ts` - 3 browsers, localhost:3000, timeout settings
- `components.json` - Shadcn registries (@animate-ui, @magicui, @shadcn-studio)

## CI/CD Pipeline (GitHub Actions)

**.github/workflows/ci.yml** - 4 jobs must pass:
1. **lint** (~10s): ESLint, Stylelint, TypeScript
2. **unit** (~40s): Tests with coverage → Codecov
3. **e2e** (~5-10min): Playwright (Chrome/Firefox/Safari) with browser caching
4. **build** (~40s): Production build with `fetch-depth: 0` → uploads .next artifact

**.github/workflows/codeql-analysis.yml** - Security scanning (JavaScript)

**CI Requirements**: Node LTS, pnpm via `pnpm/action-setup@v3`, `fetch-depth: 0` for build only

## Common Patterns

**MDX Posts**: Create in `contents/[locale]/filename.mdx` with YAML frontmatter (layout, title, description, author, date, thumbnail, tags). Slug = filename. Auto-appears on home/posts/tag pages. Features: code blocks (with title/highlighting), math ($inline$, $$block$$), admonitions (:::note/tip/warning/danger), emoji (:smile:), optimized images, live code (<Editor>).

**Components**: Shadcn: `pnpm dlx shadcn@latest add [component]`. Custom: add to src/components/, export from post-content.tsx for MDX. Style with Tailwind + globals.css variables.

**i18n**: Add locale in `src/i18n/routing.ts`, create `messages/[locale].json` and `contents/[locale]/`. Use `useTranslations()` or `getTranslations()`.

**Env Vars**: VERCEL (enables GitHub API), NODE_ENV (dev warnings). No .env needed locally.

## Troubleshooting

- **"pnpm not found"**: `npm install -g pnpm`
- **Git timestamp errors**: Need `fetch-depth: 0`
- **TypeScript errors**: `pnpm lint:type-check`
- **E2E timeout**: Check playwright.config.ts for timeout settings, build included
- **Playwright issues**: `pnpm playwright install --with-deps`
- **CSS warnings**: "Could not parse CSS" is non-fatal
- **Hot reload**: Restart with `pnpm dev`
- **Missing modules**: `pnpm install`

## Critical Constraints

1. **Only pnpm** (never npm/yarn)
2. **Don't modify** `src/components/ui/` (Shadcn components)
3. **Don't remove** `__tests__/mocks/` (required for tests)
4. **Maintain** locale structure in `contents/` and `messages/`
5. **Don't commit** `.next/`, `node_modules/`, `coverage/`, `playwright-report/`
6. **TypeScript strict mode** - all code properly typed
7. **File naming**: kebab-case (files), PascalCase (components)

## Commit & PR Guidelines

**All commits and PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/) style:**

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types** (defined in `.versionrc.json`): `feat`, `fix`, `ci`, `chore`, `refactor`, `test` etc.

**Examples**:
- `feat(mdx): add support for custom admonitions`
- `fix(i18n): resolve missing translations in zh-CN locale`
- `docs: update README with deployment instructions`

**Scope** is optional but recommended (e.g., `mdx`, `i18n`, `components`, `ci`, `deps`).

## Pre-PR Validation

✓ `pnpm install` ✓ `pnpm lint` ✓ `pnpm test:all` ✓ `pnpm build` ✓ Both locales work (if applicable) ✓ No security issues ✓ Conventional Commits style

## Quick Reference

**Entry**: `src/app/[locale]/page.tsx` | **Content**: `src/lib/get-posts-data.ts` | **Site config**: `src/lib/site.ts` | **MDX components**: `src/components/post-content.tsx` | **i18n**: `src/i18n/routing.ts` | **Test setup**: `__tests__/setup.ts`, `__tests__/mocks/`

**Root configs**: package.json, tsconfig.json (path aliases: @/*, @/images/*, @/tests/*), next.config.ts, eslint.config.mjs, vitest.config.mts, playwright.config.ts, .prettierrc.json, .stylelintrc.json, components.json, postcss.config.mjs

---

**Trust these instructions.** Only search if incomplete/incorrect or unexpected behavior occurs.
