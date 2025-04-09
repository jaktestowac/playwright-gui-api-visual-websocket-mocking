# Webinar: Testing on Different Levels: GUI • API • Visual • WebSocket • Mocking? by jaktestowac.pl

This repository contains code used during Webinar organized by jaktestowac.pl:

_"Testing on Different Levels: GUI • API • Visual • WebSocket • Mocking"_

(Polish: _"Testy na różnych poziomach: GUI • API • Wizualne • WebSocket • Mockowanie"_)

by [jaktestowac.pl](https://jaktestowac.pl/contribution-playwright/) team.

More:

[Testy na różnych poziomach!](https://jaktestowac.pl/poziomy/)

## Overview

Repository contains tests for the following topics:

- **GUI testing**
- **API testing**
- **Visual testing** - pixel-perfect comparison of screenshots between versions
- **Visual testing** + **Masking** - automatic detection of front-end changes and ignoring dynamic elements of the interface
- **WebSocket testing** - testing bidirectional real-time communication
- **Mocking** - mocking API responses and network interactions, simulating various test scenarios and errors, isolating tests from external dependencies

## Who we are?

We are **Test Architects and Senior Lead Tech Quality Engineers**, who are passionate about testing.
We are constantly looking for new ways to improve our skills and share our knowledge with others.

We are actively involved in the Playwright community, contributing to the project and sharing our knowledge with others. We have been using Playwright in **different companies and projects since 2021**.

We believe in the power of open source and the importance of giving back to the community.

Read more about our **[Contribution to Playwright and Community](https://jaktestowac.pl/contribution-playwright/)**

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org) (v20 or later LTS version)
- [npm](https://www.npmjs.com/)
- our free application to practice automation - [🦎 GAD](https://github.com/jaktestowac/gad-gui-api-demo)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jaktestowac/playwright-gui-api-visual-websocket-mocking.git
   cd playwright-gui-api-visual-websocket-mocking
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running Tests

Run all tests:

```bash
npm run test
```

Run specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Run tests with UI mode:

```bash
npx playwright test --ui
```

Generate test report:

```bash
npx playwright show-report
```

## Troubleshooting

Common issues and solutions:

1. **Tests fail on first run**

   - Ensure 🦎 GAD application is running
   - Check if correct Node.js version is installed

2. **Browser launch fails**
   ```bash
   npx playwright install
   ```

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- Additional resources - [Testy na różnych poziomach!](https://jaktestowac.pl/poziomy/)
- [Free Playwright Resources](https://jaktestowac.pl/darmowy-playwright/) - our free resources to learn Playwright

## Contact

Feel free to reach out to us:

- Website: [jaktestowac.pl](https://jaktestowac.pl)
- LinkedIn: [jaktestowac.pl](https://www.linkedin.com/company/jaktestowac/)

Happy testing and automating tests!🚀

jaktestowac.pl Team ❤️💚
