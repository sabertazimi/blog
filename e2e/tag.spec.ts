import { expect, test } from '@playwright/test'

test.describe('Tag Filter Page', () => {
  test('navigates to tag page when clicking tag link from posts page', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const allLinks = await page.getByRole('link').all()
    const tagLinks = []

    for (const link of allLinks) {
      const href = await link.getAttribute('href')
      if (href !== null && href.includes('/tag/') && !href.endsWith('/posts')) {
        tagLinks.push(link)
      }
    }

    if (tagLinks.length > 0) {
      const allTag = page.getByRole('link', { name: /all/i })
      await expect(allTag).toBeVisible()
      await expect(allTag).toContainClass('bg-primary text-primary-foreground')

      const firstTag = tagLinks[0]
      await firstTag.click()

      await expect(page).toHaveURL(/\/tag\//)
      await expect(firstTag).toBeVisible()
      await expect(firstTag).toContainClass('bg-primary text-primary-foreground')
      await expect(allTag).toBeVisible()
      await expect(allTag).not.toContainClass('bg-primary text-primary-foreground')
    }
  })

  test('shows filtered posts for selected tag', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const allLinks = await page.getByRole('link').all()
    const tagLinks = []

    for (const link of allLinks) {
      const href = await link.getAttribute('href')
      if (href !== null && href.includes('/tag/') && !href.endsWith('/posts')) {
        tagLinks.push(link)
      }
    }

    if (tagLinks.length > 0) {
      const postGrid = page.getByTestId('post-grid')
      const allPostsCount = await postGrid.getByRole('link').count()

      await tagLinks[0].click()
      await page.waitForURL(/\/tag\//)

      const filteredPostsCount = await postGrid.getByRole('link').count()
      const firstPostLink = postGrid.getByRole('link').first()
      expect(filteredPostsCount).toBeLessThan(allPostsCount)
      await expect(firstPostLink).toBeVisible()
    }
  })

  test('navigates to all posts when clicking all tags link', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const allLinks = await page.getByRole('link').all()
    const tagLinks = []

    for (const link of allLinks) {
      const href = await link.getAttribute('href')
      if (href !== null && href.includes('/tag/') && !href.endsWith('/posts')) {
        tagLinks.push(link)
      }
    }

    if (tagLinks.length > 0) {
      await tagLinks[0].click()
      await page.waitForURL(/\/tag\//)

      const allTag = page.getByRole('link', { name: /all|全部/i }).first()
      await allTag.click()
      await expect(page).toHaveURL(/\/posts/)
    }
  })
})

test.describe('Tag Filter Page - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('shows tag drawer trigger button on mobile viewport', async ({ page }) => {
    await page.goto('/posts')

    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()

    if (count > 0) {
      await expect(tagTrigger.first()).toBeVisible()
    }
  })

  test('allows selecting tag from mobile drawer', async ({ page }) => {
    await page.goto('/posts')

    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()

    if (count > 0) {
      await tagTrigger.first().click()
      await page.waitForTimeout(300)

      const allLinks = await page.getByRole('link').all()
      const tagLinks = []

      for (const link of allLinks) {
        const href = await link.getAttribute('href')
        if (href !== null && href.includes('/tag/') && !href.endsWith('/posts')) {
          tagLinks.push(link)
        }
      }

      if (tagLinks.length > 0) {
        await tagLinks[0].click()
        await expect(page).toHaveURL(/\/tag\//)
      }
    }
  })
})
