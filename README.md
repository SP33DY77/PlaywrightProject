# EventHub Playwright Automation

End-to-end test automation framework built with **Playwright** and **JavaScript** for testing the EventHub web application.

The project demonstrates UI automation, API-based authentication, Page Object Model design, and CI execution with GitHub Actions.

---

## Tech Stack

* **Playwright** - End-to-End test automation
* **JavaScript (Node.js)**
* **API Testing**
* **Page Object Model (POM)**
* **GitHub Actions** - Continuous Integration

---

## Project Structure

```
PlaywrightProject
│
├── EventHubPO
│   ├── LoginPage.js
│   └── EventHubAPI
│       ├── LoginPageAPI.js
│       └── AuthHelper.js
│
├── tests
│   ├── eventhubValidLogin.spec.js
│   ├── eventhubValidLoginAPI.spec.js
│   └── eventhubOrder.spec.js
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## Test Coverage

The framework currently covers:

### UI Tests

✅ Login page validation
✅ Login with valid credentials
✅ Login validation with incorrect data
✅ Empty input validation
✅ Dashboard verification
✅ Event verification and ordering flow

### API Tests

✅ User authentication through API
✅ Token extraction
✅ Reusing authentication state in UI tests

---

## Framework Design

The project follows the **Page Object Model (POM)** approach.

Benefits:

* Better test maintenance
* Reusable page methods
* Separation between test logic and page locators
* Cleaner test structure

Example:

```
Test
 |
 └── Page Object
        |
        └── Locators + Actions
```

---

## API Authentication Flow

Instead of performing UI login before every test:

```
API Login
    |
    ↓
Receive authentication token
    |
    ↓
Store token in browser localStorage
    |
    ↓
Open authenticated application
    |
    ↓
Execute UI tests
```

This makes tests faster and reduces unnecessary UI actions.

---

## Installation

Clone repository:

```bash
git clone https://github.com/SP33DY77/PlaywrightProject.git
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run specific test:

```bash
npx playwright test tests/eventhubValidLoginAPI.spec.js
```

---

## Test Reports

Generate HTML report:

```bash
npx playwright show-report
```

The framework also provides:

* Screenshots on failure
* Trace files for debugging
* Test execution logs

---

## CI/CD

Tests are executed automatically using **GitHub Actions**.

CI pipeline includes:

* Installing dependencies
* Installing Playwright browsers
* Running automated tests
* Generating test reports

---

## Future Improvements

Planned improvements:

* Add Playwright fixtures
* Implement storageState authentication
* Add environment configuration
* Move test data to external files
* Add TypeScript support
* Expand API test coverage

---

## Author

**SP33DY77**

QA Automation Engineer | Playwright | JavaScript
