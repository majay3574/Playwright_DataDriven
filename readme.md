# 🧪 Playwright Automation Framework – Salesforce

This repository contains an end-to-end test automation framework built using [Playwright](https://playwright.dev/) with TypeScript. It follows industry best practices including the Page Object Model (POM), reusable utilities, data-driven testing, and rich test reporting.

---

## 📁 Project Structure

| Folder            | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `constants/`      | Contains static constants like selectors, environment URLs, or enums.        |
| `core/`           | Base wrapper classes and shared interfaces for common browser/context actions. |
| `data/`           | Test data in `JSON` or `CSV` format used for data-driven testing scenarios.  |
| `page/`           | Page Object Model (POM) classes for interacting with Salesforce application pages. |
| `reporter/`       | (Optional) Contains custom reporter logic (e.g., Allure/HTML reporters).     |
| `test-results/`   | Stores Playwright output such as traces, screenshots, and videos.            |
| `tests/`          | Test specifications written in `.test.ts`, structured per feature or module. |
| `utils/`          | Utility functions such as random data generation, file handling, or custom loggers. |

---

## 🚀 Running Tests
📦 Installation
Before running tests, install project dependencies:

```bash
npm install
```

### ✅ Run a Specific Test
```bash
npx playwright test tests/leadCreation.test.ts

🧪 Run All Tests

npx playwright test


🌐 Run with a Specific Browser

npx playwright test --project=chromium

🔍 Run by Title/Tag

npx playwright test --grep "Lead Creation"
```

📊 Allure Report Generation
Step 1: Install Allure CLI (if not already)
``` bash
npm install -g allure-commandline --save-dev

```
Step 2: Generate Allure Report

```bash
allure generate ./allure-results -o ./allure-report --clean

```

Step 3: Open the Allure Report
```bash
allure open ./allure-report
```

⚙️ Configuration
Playwright configuration is defined in:

playwright.config.ts

This file includes:
Browser/project definitions
Timeout and retry strategies
Reporter setup (e.g., Allure, HTML)
Trace, screenshot, and video recording setup
Test directory and exclusions
Parallelism and shard configuration

🧰 Additional Notes
🔐 Sensitive credentials or secrets must be excluded using .env files or CI secrets.
🔁 Data-driven tests should use the structure under data/.
🧪 Group similar test cases into subfolders in the tests/ directory for clarity.

