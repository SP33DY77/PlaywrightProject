# EventHub Playwright Automation

This repository contains Playwright end-to-end and API automation tests for the EventHub application. The suite demonstrates UI testing, API authentication, order flow validation, and request mocking with the Page Object Model (POM).

## Features

- UI automation for login and dashboard flows
- API-based authentication with token reuse
- Order creation and validation tests
- Mocking of bookings API to test empty-state scenarios
- HTML test reporting with Playwright

## Tech Stack

- Playwright
- JavaScript / Node.js
- Page Object Model (POM)
- REST API testing via Playwright request context

## Project Structure

```text
PlaywrightProject/
├── EventHubPO/
│   ├── DashboardPage.js
│   ├── LoginPage.js
│   ├── LoginPayload.json
│   ├── LoginPayloadFake.json
│   ├── OrderData.json
│   └── EventHubAPI/
│       ├── AuthHelper.js
│       ├── LoginPageAPI.js
│       └── OrderAPI.js
├── tests/
│   ├── eventhubDashboard.spec.js
│   ├── eventhubInvalidLoginAPI.spec.js
│   ├── eventhubOrderAPI.spec.js
│   ├── eventhubOrderMocking.spec.js
│   ├── eventhubValidLogin.spec.js
│   └── eventhubValidLoginAPI.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/eventhubOrderMocking.spec.js
```

Run in headed mode:

```bash
npx playwright test --headed
```

## Viewing Reports

Open the HTML report after a test run:

```bash
npx playwright show-report
```

## Notes

- Tests use the Playwright configuration from [playwright.config.js](playwright.config.js).
- The mocking example in [tests/eventhubOrderMocking.spec.js](tests/eventhubOrderMocking.spec.js) shows how to return an empty bookings response for zero-order scenarios.

## License

ISC

