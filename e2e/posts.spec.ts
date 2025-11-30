import { expect, test } from '@playwright/test'

test.describe('Posts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('shows page title and main heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Posts|文章/)

    const mainHeading = page.getByRole('heading', { level: 1 }).first()
    await expect(mainHeading).toBeVisible()
  })

  test('renders post cards with clickable links', async ({ page }) => {
    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await expect(firstPostLink).toBeVisible()
  })

  test('navigates to post detail when clicking post card', async ({ page }) => {
    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await firstPostLink.click()

    await expect(page).toHaveURL(/\/post\//)
  })

  test('shows tag filter links on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })

    const allTagLink = page.getByRole('link', { name: /all/i }).first()
    await expect(allTagLink).toBeVisible()
  })
})

test.describe('Posts Page - Chinese Locale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh-CN/posts')
  })

  test('shows Chinese page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/文章|Posts/)

    const mainHeading = page.getByRole('heading', { level: 1 }).first()
    await expect(mainHeading).toBeVisible()
  })

  test('renders Chinese post cards', async ({ page }) => {
    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await expect(firstPostLink).toBeVisible()
  })
})
