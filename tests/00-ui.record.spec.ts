import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/practice/websocket-chat-v5.html');
  await page.getByRole('cell', { name: 'JohnWeb' }).click();
  await page.getByTestId('login-button').click();
  await page.getByTestId('weather-title').getByText('Weather').click();
  await expect(page.getByTestId('weather-title').getByText('Weather')).toBeVisible();
  await expect(page.getByTestId('join-chat-button')).toBeVisible();
  await page.getByTestId('join-chat-button').click();
  await page.getByTestId('message-input-general').click();
  await page.getByTestId('message-input-general').fill('hej');
  await page.getByTestId('send-button-general').click();
});