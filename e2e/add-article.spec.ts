import { test, expect } from '@playwright/test'

test.describe('Add Article Flow E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.locator('nav#sidebar a', { hasText: '新增' }).click()
        await page.waitForLoadState("domcontentloaded")
    })

    test('should display all manual import form fields', async ({ page }) => {

        await expect(page.locator('label:visible', { hasText: '連結' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: '標題' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: 'Date' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: 'Author' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: '來源' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: '種類' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: '內容' })).toBeVisible()
        await expect(page.locator('label:visible', { hasText: '中文摘要 Title' })).toBeVisible()
        await expect(page.getByText('中文摘要', { exact: true }).nth(1)).toBeVisible()
        await expect(
            page.locator('label:visible', { hasText: '英文摘要 Title' })
        ).toBeVisible()

        await expect(
            page.getByText('英文摘要', { exact: true }).nth(1)
        ).toBeVisible()
    })

    test('should allow entering article details and resetting the form', async ({ page }) => {
        const titleInput = page
            .locator('div.field', {
                has: page.locator('label', { hasText: '標題' }),
            })
            .locator('input:visible')
        await titleInput.click()

        await titleInput.pressSequentially('Playwright Test Article Title')

        await expect(titleInput).toHaveValue('Playwright Test Article Title')

        await page.getByRole('button', { name: '重填' }).click()

        await page.evaluate(() => new Promise(requestAnimationFrame))

        await expect(titleInput).toHaveValue('')
    })
})
