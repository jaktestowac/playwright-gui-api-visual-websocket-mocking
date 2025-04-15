import { test, expect } from '@playwright/test';

test.describe('Chat visual tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/websocket-chat-v5.html');
    await page.getByRole('cell', { name: 'JohnWeb' }).click();
    await page.getByTestId('login-button').click();
  });

  test('should check full site screenshot (will fail ❌)', async ({ page }) => {
    // Assert: visual test
    await expect(page).toHaveScreenshot();
  });

  test('should check full site screenshot: max diff', async ({ page }) => {
    // Assert: visual test
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
  });

  test('should check full site screenshot: mask', async ({ page }) => {
    // Assert: visual test
    await expect(page).toHaveScreenshot({
      mask: [
        page.locator('.weather-details-container'),
        page.locator('.main-nav-menu'),
      ],
    });
  });

  test('should check wether canvas (will fail when condition change)', async ({
    page,
    baseURL,
  }) => {
    // for first run comment below route
    await page.route(
      '/api/v2/data/random/weather?location=Warsaw*',
      async (route) => {
        await route.continue({
          url: `${baseURL}/api/v2/data/random/weather?location=Berlin`,
        });
      },
    );

    await page.reload();
    // Arrange:
    const temperatureChart = page.getByTestId('temperatureChart');

    // Assert: visual test
    await expect(temperatureChart).toHaveScreenshot();
  });
});
