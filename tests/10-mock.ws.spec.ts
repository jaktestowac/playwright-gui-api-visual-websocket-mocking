import { test, expect, Page } from '@playwright/test';

test.describe('Chat functionality tests - mock websockets', () => {
  const mockedData1 = {
    type: 'practiceChatMessage',
    username: 'JohnWeb',
    message: 'Hello! Sending mocked data to the server!',
    recipient: null,
  };

  const mockedData2 = {
    type: 'practiceChatMessage',
    username: 'John🔥🔥🔥',
    message: 'Mocking @#$%^&*(',
    recipient: null,
  };

  test.beforeEach(async ({ page }) => {
    await page.routeWebSocket('', (ws) => {
      // from page to server
      ws.send(JSON.stringify(mockedData1));
      ws.send(JSON.stringify(mockedData2));
    });

    await page.goto('/practice/websocket-chat-v5.html'); // Open the chat page
  });

  test('should send a message between users', async ({ page, browser }) => {
    // Arrange:
    const username1 = 'JohnWeb';
    const password1 = '123';

    // Act:
    await test.step('User 1 logs in', async () => {
      await chatPage.usernameInput(page).fill(username1);
      await chatPage.passwordInput(page).fill(password1);
      await chatPage.loginButton(page).click();

      // Assert:
      await expect(chatPage.welcomeUsername(page)).toContainText(username1);
      await expect(chatPage.statusText(page)).toContainText('Disconnected');
    });

    await test.step('User 1 clicks join chat', async () => {
      await chatPage.joinChatButton(page).click();
      await expect(chatPage.statusText(page)).toContainText('Connected');
    });

    await test.step('User 1 check message 1', async () => {
      // Assert:
      await expect(chatPage.messagesGeneral(page)).toContainText(
        mockedData1.message,
      );
      await expect(chatPage.messagesGeneral(page)).toContainText(
        mockedData1.username,
      );
    });

    await test.step('User 1 check message 2', async () => {
      // Assert:
      await expect(chatPage.messagesGeneral(page)).toContainText(
        mockedData2.message,
      );
      await expect(chatPage.messagesGeneral(page)).toContainText(
        mockedData2.username,
      );
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
