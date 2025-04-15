import { test, expect, Page } from '@playwright/test';

test.describe('Chat functionality tests - redirecting through route', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeWebSocket(/ws/, (ws) => {
      // https://playwright.dev/docs/api/class-websocketroute
      // from page to server
      const server = ws.connectToServer();
      ws.onMessage((message) => {
        console.log('sending: ', message);
        server.send(message);
      });
    });

    await page.goto('/practice/websocket-chat-v5.html'); // Open the chat page
  });

  test('should send a message between users', async ({ page, browser }) => {
    // Arrange:
    const username1 = 'JohnWeb';
    const password1 = '123';
    const messageText1 = 'Hello world!';

    const username2 = 'MariaWeb';
    const password2 = '123';
    const messageText2 = 'Hello You Too!';

    const context = await browser.newContext();
    const page2 = await context.newPage();
    await page2.goto('/practice/websocket-chat-v5.html');

    // Act:
    await test.step('User 1 logs in', async () => {
      await chatPage.usernameInput(page).fill(username1);
      await chatPage.passwordInput(page).fill(password1);
      await chatPage.loginButton(page).click();

      // Assert:
      await expect(chatPage.welcomeUsername(page)).toContainText(username1);
      await expect(chatPage.statusText(page)).toContainText('Disconnected');
    });

    await test.step('User 2 logs in', async () => {
      await chatPage.usernameInput(page2).fill(username2);
      await chatPage.passwordInput(page2).fill(password2);
      await chatPage.loginButton(page2).click();

      // Assert:
      await expect(chatPage.welcomeUsername(page2)).toContainText(username2);
      await expect(chatPage.statusText(page2)).toContainText('Disconnected');
    });

    await test.step('User 1 clicks join chat', async () => {
      await chatPage.joinChatButton(page).click();
      await expect(chatPage.statusText(page)).toContainText('Connected');
    });

    await test.step('User 2 clicks join chat', async () => {
      await chatPage.joinChatButton(page2).click();
      await expect(chatPage.statusText(page2)).toContainText('Connected');
    });

    await test.step('User 1 sends a message', async () => {
      await chatPage.messageInputGeneral(page).fill(messageText1);
      await chatPage.messageInputGeneral(page).press('Enter');

      // Assert:
      await expect(chatPage.messagesGeneral(page)).toContainText(messageText1);
      await expect(chatPage.messagesGeneral(page2)).toContainText(messageText1);
    });

    await test.step('User 2 sends a message', async () => {
      await chatPage.messageInputGeneral(page2).fill(messageText2);
      await chatPage.messageInputGeneral(page2).press('Enter');

      // Assert:
      await expect(chatPage.messagesGeneral(page)).toContainText(messageText2);
      await expect(chatPage.messagesGeneral(page2)).toContainText(messageText2);
    });

    await test.step('User 1 leaves chat', async () => {
      await chatPage.leaveChatButton(page).click();
      await expect(chatPage.statusText(page)).toContainText('Disconnected');
    });

    await test.step('User 2 leaves chat', async () => {
      await chatPage.leaveChatButton(page2).click();
      await expect(chatPage.statusText(page2)).toContainText('Disconnected');
    });
  });
});

const chatPage = {
  usernameInput: (page: Page) =>
    page.getByRole('textbox', { name: 'Username' }),
  passwordInput: (page: Page) =>
    page.getByRole('textbox', { name: 'Password' }),
  loginButton: (page: Page) => page.getByTestId('login-button'),
  welcomeUsername: (page: Page) => page.getByTestId('welcome-username'),
  joinChatButton: (page: Page) => page.getByTestId('join-chat-button'),
  messagesGeneral: (page: Page) => page.getByTestId('messages-general'),
  messageInputGeneral: (page: Page) =>
    page.getByTestId('message-input-general'),
  leaveChatButton: (page: Page) => page.getByTestId('leave-chat-button'),
  statusText: (page: Page) => page.getByTestId('status-text'),
};
