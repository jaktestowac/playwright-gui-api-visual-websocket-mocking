import { test, expect } from '@playwright/test';

test.describe('Chat visual tests (mocking)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/websocket-chat-v5.html'); // Open the chat page
  });

  test('should check wether canvas (mocking)', async ({ page }) => {
    // Arrange:
    const temperatureChart = page.getByTestId('temperatureChart');

    await page.route('**/api/v2/data/random/weather**', async (route) => {
      await route.fulfill({ json: mockWeatherData });
      //   await route.fulfill({ json: mockWeatherData2 });
    });

    await page.goto('/practice/websocket-chat-v5.html'); // Open the chat page

    // Act: login
    await page.getByRole('cell', { name: 'JohnWeb' }).click();
    await page.getByTestId('login-button').click();

    // Assert: visual test
    await expect(temperatureChart).toHaveScreenshot();
  });
});

const mockWeatherData = {
  params: {
    daysBefore: 7,
    daysAfter: 7,
    location: 'Warsaw',
    date: '2025-04-05',
  },
  weather: [
    {
      date: '2025-03-30',
      location: 'Warsaw',
      temperature: 31,
      condition: 'Partly Cloudy',
      icon: 'fa-cloud-sun',
      humidity: 75.32,
      wind: 8.58,
      feelsLike: 30,
    },
    {
      date: '2025-03-31',
      location: 'Warsaw',
      temperature: 15,
      condition: 'Rainy',
      icon: 'fa-cloud-rain',
      humidity: 55.04,
      wind: 1.02,
      feelsLike: 15,
    },
    {
      date: '2025-04-01',
      location: 'Warsaw',
      temperature: 16,
      condition: 'Partly Cloudy',
      icon: 'fa-cloud-sun',
      humidity: 79.03,
      wind: 0,
      feelsLike: 14,
    },
    {
      date: '2025-04-02',
      location: 'Warsaw',
      temperature: 24,
      condition: 'Thunderstorm',
      icon: 'fa-bolt',
      humidity: 76.28,
      wind: 0,
      feelsLike: 28,
    },
    {
      date: '2025-04-03',
      location: 'Warsaw',
      temperature: 30,
      condition: 'Sunny',
      icon: 'fa-sun',
      humidity: 43.2,
      wind: 4.36,
      feelsLike: 25,
    },
    {
      date: '2025-04-04',
      location: 'Warsaw',
      temperature: 32,
      condition: 'Sunny',
      icon: 'fa-sun',
      humidity: 44.12,
      wind: 6.06,
      feelsLike: 33,
    },
    {
      date: '2025-04-05',
      location: 'Warsaw',
      temperature: 35,
      condition: 'Rainy',
      icon: 'fa-cloud-rain',
      humidity: 81.34,
      wind: 6.58,
      feelsLike: 37,
    },
    {
      date: '2025-04-06',
      location: 'Warsaw',
      temperature: 25,
      condition: 'Sunny',
      icon: 'fa-sun',
      humidity: 41.16,
      wind: 0,
      feelsLike: 28,
    },
    {
      date: '2025-04-07',
      location: 'Warsaw',
      temperature: 34,
      condition: 'Sunny',
      icon: 'fa-sun',
      humidity: 82.13,
      wind: 5.66,
      feelsLike: 32,
    },
    {
      date: '2025-04-08',
      location: 'Warsaw',
      temperature: 22,
      condition: 'Partly Cloudy',
      icon: 'fa-cloud-sun',
      humidity: 77.72,
      wind: 0,
      feelsLike: 20,
    },
    {
      date: '2025-04-09',
      location: 'Warsaw',
      temperature: 19,
      condition: 'Cloudy',
      icon: 'fa-cloud',
      humidity: 33.01,
      wind: 10.86,
      feelsLike: 24,
    },
    {
      date: '2025-04-10',
      location: 'Warsaw',
      temperature: 34,
      condition: 'Partly Cloudy',
      icon: 'fa-cloud-sun',
      humidity: 24.08,
      wind: 0,
      feelsLike: 33,
    },
    {
      date: '2025-04-11',
      location: 'Warsaw',
      temperature: 27,
      condition: 'Cloudy',
      icon: 'fa-cloud',
      humidity: 74.62,
      wind: 5.62,
      feelsLike: 24,
    },
  ],
};

const mockWeatherData2 = {
  weather: [
    {
      date: '2025-03-30',
      location: 'Warsaw',
      temperature: 30,
    },
    {
      date: '2025-03-31',
      location: 'Warsaw',
      temperature: 32,
    },
    {
      date: '2025-04-01',
      location: 'Warsaw',
      temperature: 30,
    },
    {
      date: '2025-04-02',
      location: 'Warsaw',
      temperature: 32,
    },
  ],
};
