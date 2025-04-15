import { test, expect } from '@playwright/test';

test.describe('Weather backend tests', () => {
  test('check if wind value is correctly defined', async ({ request }) => {
    // Arrange:
    const url = '/api/v2/data/random/weatherToday?location=Warsaw';

    // Act:
    const response = await request.get(url);
    expect(response.status()).toBe(200);

    const data = await response.json();

    // Assert:
    expect(data.weather).toBeDefined();
    expect(data.weather.length).toBeGreaterThan(0);

    const windValue = data.weather[0].wind;
    expect(typeof windValue).toBe('number');
    expect(windValue).toBeGreaterThanOrEqual(0);
  });
});
