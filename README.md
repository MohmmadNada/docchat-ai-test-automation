# DocChat AI — Test Automation

E2E test automation framework for [DocChat AI](https://sdet-chatbot.onrender.com), an AI-powered document Q&A chatbot.

## Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | E2E browser automation |
| TypeScript | Type-safe test authoring |
| Allure | Test reporting |
| GitHub Actions | CI pipeline |
| Playwright CLI | AI-agent browser exploration |

## Project Structure

```
.
├── .github/workflows/      # CI pipeline
├── .playwright/            # Playwright CLI config
├── data/
│   └── documents/          # Test fixture files (valid & invalid)
├── docs/
│   ├── TEST_PLAN.md        # Test strategy and scope
│   ├── BUGS.md             # Confirmed bug report with screenshots
│   └── test-cases/         # Checklist test cases per area
│       ├── TC_AUTH.md
│       ├── TC_UPLOAD.md
│       ├── TC_CHAT.md
│       └── TC_UI.md
├── tests/                  # Playwright test specs
├── playwright.config.ts
└── tsconfig.json
```

## Setup

```bash
npm install
npx playwright install
```

Create a `.env` file in the project root:

```
USER_NAME=your_username
USER_PASSWORD=your_password
```

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Interactive UI mode
npm run test:ui

# Debug mode
npm run test:debug
```

## Reports

```bash
# Open Playwright HTML report
npm run report

# Generate and open Allure report
npm run allure:generate
npm run allure:open
```

## Playwright CLI (AI-agent exploration)

```bash
# Open browser for manual exploration
npm run explore

# Open with codegen recording
npm run generate

# List active sessions
npm run cli:sessions
```

## CI

Tests run automatically on every push and pull request to `main` via GitHub Actions. The workflow:
1. Installs dependencies
2. Installs Playwright browsers
3. Runs the full test suite across Chromium, Firefox, and WebKit
4. Uploads HTML report and Allure results as artifacts (retained 30 days)

Override the target URL via the `BASE_URL` repository variable in GitHub Settings.

## Test Fixtures

All fixture files live in `data/documents/` and are committed to the repo. See [`data/documents/README.md`](data/documents/README.md) for the full list and naming conventions.

## Bug Report

See [`docs/BUGS.md`](docs/BUGS.md) for confirmed bugs with reproduction steps and screenshots.
