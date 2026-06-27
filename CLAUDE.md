# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
# Setup (first time)
npm ci
npx playwright install --with-deps

# Run tests
npm test                                                        # all tests, headless
npm run test:headed                                             # visible browser
npm run test:ui                                                 # Playwright UI mode
npm run test:debug                                              # debug mode
npx playwright test --grep TC_UPL_001                          # single test by ID
npx playwright test tests/upload/upload.spec.ts                # single spec file

# Reports
npm run report                                                  # open Playwright HTML report
npm run allure:generate && npm run allure:open                  # Allure report

# Playwright CLI (AI-agent exploration)
npm run explore                                                 # open browser at app URL
npm run generate                                                # open with codegen recording
```

---

## 1. Tech Stack

| Layer | Tool |
|---|---|
| Test runner | Playwright + TypeScript |
| Language | TypeScript — strict mode |
| Browsers | Chromium, Firefox, WebKit |
| Target app | DocChat AI — https://sdet-chatbot.onrender.com |
| CI | GitHub Actions |
| Reports | Playwright HTML + Allure → `allure-results/` |
| Exploration | Playwright CLI (`@playwright/cli`) |

**Base URL:** always read from `process.env.BASE_URL ?? 'https://sdet-chatbot.onrender.com'` — never hardcode full URLs in test files or page objects. Use `page.goto('/')`, `page.goto('/login')`, etc.

---

## 2. Folder Structure

```
docchat-ai-test-automation/
├── src/
│   ├── pages/              # Page Object classes — one file per page
│   ├── fixtures/           # Custom Playwright fixture extensions
│   └── data/               # Test data JSON files (data-driven input)
├── tests/
│   └── <feature>/          # Spec files grouped by feature area
├── data/
│   └── documents/          # Binary/text fixture files for upload tests
├── docs/                   # Test plan, test cases, bug report, screenshots
├── global-setup.ts         # Suite-level: login once, save storageState
├── storageState.json       # Saved browser session (gitignored, generated at runtime)
├── playwright.config.ts
└── tsconfig.json
```

**How a test call flows:**
```
test file
  → imports test from src/fixtures/fixtures.ts    ← custom fixture, never raw Playwright
  → fixture injects src/pages/*
  → page reads src/data/*.json for inputs
```

---

## 3. Design Patterns

### Page Object Model (POM)
Each page in `src/pages/` maps to one application page or component. Locators and interactions are encapsulated inside the class — test files never interact with the DOM directly.

### Custom Fixtures (Dependency Injection)
`src/fixtures/fixtures.ts` extends Playwright's base `test` with pre-instantiated page objects. Tests declare what they need in the function signature; fixtures provide it. Never instantiate page objects inside test files.

### Global Authentication (Storage State)
`global-setup.ts` performs a single headless login before the suite runs and saves the session to `storageState.json`. All tests that need an authenticated state consume this file via the fixture — they never re-login through the UI.

### Data-Driven Testing
All external test inputs live in `src/data/*.json`. Parametrised scenarios (e.g. invalid file types, boundary sizes) use `test.each()` over the JSON array — never duplicated as separate test blocks.

---

## 4. Coding Standards

### TypeScript
- Strict mode enforced via `tsconfig.json` — no `any`, `strictNullChecks`, `noImplicitAny`
- Prefer `interface` for object shapes, `type` for unions/aliases
- All async functions must use `async/await` — no `.then()` chains
- Return types must be explicit on all public methods

### SOLID Principles Applied
| Principle | How it applies here |
|---|---|
| **S** — Single Responsibility | Each page class handles exactly one page. Fixtures only wire dependencies. |
| **O** — Open/Closed | Extend fixtures by composing them — never modify the base `test` import directly. |
| **L** — Liskov Substitution | Page classes are interchangeable within their fixture contract. |
| **I** — Interface Segregation | Fixtures expose only what tests need — no unnecessary page objects injected. |
| **D** — Dependency Inversion | Test files depend on fixture abstractions, not on `new XxxPage(page)` directly. |

### General
- No comments unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- No dead code, no `console.log` left in committed files
- DRY: if a sequence repeats across two tests, it belongs in a page method or fixture

---

## 5. Test Automation Best Practices

- **One concern per test** — each test asserts one behaviour; setup steps are not assertions
- **Use Playwright auto-waits** — never add `waitForTimeout`. Use `waitForURL`, `waitForSelector`, or rely on locator auto-waiting
- **Test IDs in names** — test titles must start with the TC ID followed by a behaviour-first description:
  `TC_UPL_001 — should reject an empty TXT file with an error message`
  The ID provides traceability and `--grep` targeting; the description makes failures self-documenting
- **Describe block naming** — top-level `describe` names the feature (`'File Upload'`). Nested `describe` uses `'given <precondition>'`: `'given a logged-in user'`. Full path becomes self-documenting: `File Upload › given a logged-in user › TC_UPL_001 — should reject…`
- **Non-deterministic AI responses** — never assert exact AI response text. Assert that a response exists, is non-empty, and that the source citation chip is visible
- **File upload** — the file input is hidden. Always use `page.on('filechooser', ...)` to intercept the native picker rather than calling `setInputFiles()` directly on the hidden input, as the latter bypasses client-side validation
- **Render cold start** — the app may take 30–60 s to wake up on first load. Use `waitForURL` with an extended timeout in CI rather than `waitForTimeout`

---

## 6. Anti-Patterns to Avoid

| Anti-Pattern | Why / What to do instead |
|---|---|
| Any `page.*` call in a spec file | Breaks POM. Spec files only call page object methods and make assertions |
| `setInputFiles()` on hidden input | Bypasses client-side validation — use `filechooser` event interception instead |
| `page.waitForTimeout()` / `sleep()` | Causes flakiness. Use Playwright's built-in auto-waits |
| Asserting exact AI response text | Responses are non-deterministic. Assert presence and structure only |
| `any` type in TypeScript | Defeats strict typing. Define an interface or type alias |
| Hardcoded credentials in test files | Read from `process.env` via `playwright.config.ts` or `.env` |
| Re-login in every test | Use `storageState.json` from global setup. Only `global-setup.ts` performs the actual login |
| Separate test blocks per scenario variant | Use `test.each()` with the JSON data array |
| Importing `test` from `@playwright/test` in spec files | Import from `src/fixtures/fixtures.ts` instead so page objects are injected |
| Magic numbers / hardcoded file paths in spec files | Reference `src/data/*.json` for inputs and `data/documents/` paths |

---

## 7. Component Rules

### Page Objects (`src/pages/`)
- Constructor signature: `constructor(private readonly page: Page) {}`
- Spec files must never call Playwright APIs directly — no `page.goto()`, `page.locator()`, `page.fill()`, or `page.click()` in a spec file
- Each page class must expose a `goto()` method for navigation
- All locators defined as `private readonly` properties in the constructor — never call `page.locator()` inline inside a method body
- Methods return `void` for actions, typed values for queries (`string`, `boolean`, `string[]`)
- No assertions inside page methods — assertions belong in the test
- No direct JSON imports — page classes receive data as method parameters

### Fixtures (`src/fixtures/fixtures.ts`)
- Extends Playwright `test` with pre-instantiated page objects
- Instantiate using `async ({ page }, use) => { await use(new XxxPage(page)) }`
- Applies `storageState` from `global-setup.ts` for authenticated tests
- Never duplicate fixture logic — extract a shared base fixture if setup is shared

### Test Data (`src/data/`)
- All parametrised inputs (invalid credentials, file type variants, boundary values) live here as JSON
- Spec files import the JSON and pass it to `test.each()` — they never define raw test data inline
- Document fixture files (binary) live in `data/documents/` — see `data/documents/README.md`

---

## 8. CI/CD

`.github/workflows/playwright.yml` triggers on push and pull request to `main`.

Steps: install → `playwright install --with-deps` → run tests → upload HTML report + Allure results (retained 30 days).

Override the target URL via the `BASE_URL` repository variable in GitHub Settings.

---

## 9. Git Conventions

- Conventional commits: `feat:`, `test:`, `fix:`, `chore:`, `ci:`, `docs:`
- One logical concern per commit — keep history meaningful
