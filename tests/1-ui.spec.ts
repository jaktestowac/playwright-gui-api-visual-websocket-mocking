import { test, expect } from '@playwright/test';

/*
For easier structure we skipped page object pattern.
In real life we would use it to separate the logic of the page and the tests.
For more implementation details check the video:
https://www.youtube.com/playlist?list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7
*/
test.describe('Chat functionality tests', () => {
  const username = 'JohnWeb';
  const password = '123';

  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/websocket-chat-v5.html'); // Open the chat page

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    const loginButton = page.getByTestId('login-button');

    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  });

  test('should send a message', async ({ page }) => {
    // Arrange:
    const welcomeUsername = page.getByTestId('welcome-username');
    const joinChatButton = page.getByTestId('join-chat-button');
    const messagesGeneral = page.getByTestId('messages-general');
    const messageInputGeneral = page.getByTestId('message-input-general');
    const leaveChatButton = page.getByTestId('leave-chat-button');
    const statusText = page.getByTestId('status-text');

    const messageText = 'Hello world!';

    // Assert:
    await expect(welcomeUsername).toContainText(username);
    await expect(statusText).toContainText('Disconnected');

    await joinChatButton.click();
    await expect(statusText).toContainText('Connected');

    await messageInputGeneral.fill(messageText);
    await messageInputGeneral.press('Enter');

    // Assert:
    await expect(messagesGeneral).toContainText(messageText);
    // await leaveChatButton.click();

    // // Assert:
    // await expect(statusText).toContainText('Disconnected');
  });

  test('should show wind value', async ({ page }) => {
    await expect(page.getByTestId('wind')).toBeVisible();
  });
});
