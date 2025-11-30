import { expect, test } from '@playwright/test'

test.describe('Tag Filter Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('navigates between all posts page and tag page when clicking tag link', async ({ page }) => {
    const tagLink = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    await tagLink.first().click()
    await expect(page).toHaveURL(/\/tag\//)

    const allTag = page.getByRole('link', { name: /all/i }).first()
    await allTag.click()
    await expect(page).toHaveURL(/\/posts/)
  })

  test('displays filtered posts for selected tag', async ({ page }) => {
    const tagLink = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const postGrid = page.getByTestId('post-grid')
    const allPostsCount = await postGrid.locator('a[href*="/post/"]').count()

    await tagLink.first().click()
    await expect(page).toHaveURL(/\/tag\//)

    const filteredPostsCount = await postGrid.locator('a[href*="/post/"]').count()
    const firstPostLink = postGrid.locator('a[href*="/post/"]').first()

    expect(filteredPostsCount).toBeGreaterThan(0)
    expect(filteredPostsCount).toBeLessThanOrEqual(allPostsCount)
    await expect(firstPostLink).toBeVisible()
  })
})
