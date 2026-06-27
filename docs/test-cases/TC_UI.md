# TC_UI — UI / UX

**URL:** `/login` and `/`  
**Data-testids:** `theme-toggle`, `language-selector`

---

## Dark Mode

- [ ] **TC-UI-001** Dark mode toggle is visible in the header on both the login page and the chat page
- [ ] **TC-UI-002** Clicking the toggle switches the page to dark theme
- [ ] **TC-UI-003** Clicking the toggle again switches back to light theme
- [ ] **TC-UI-004** Dark mode preference persists after navigating between pages

---

## Language — English (default)

- [ ] **TC-UI-005** Page loads in English by default
- [ ] **TC-UI-006** Language selector button is visible in the header
- [ ] **TC-UI-007** Clicking the language selector opens a dropdown with "English" and "العربية" options
- [ ] **TC-UI-008** "English" option shows a checkmark when English is active

---

## Language — Arabic (RTL)

- [ ] **TC-UI-009** Selecting "العربية" switches all UI text to Arabic
- [ ] **TC-UI-010** Page layout switches to RTL (right-to-left) when Arabic is selected
- [ ] **TC-UI-011** Header elements reflow correctly in RTL (logo moves to right, buttons to left)
- [ ] **TC-UI-012** Upload zone text is displayed in Arabic
- [ ] **TC-UI-013** Switching back to English restores LTR layout and English text
- [ ] **TC-UI-014** Language preference persists across page navigations within the session

---

## Header

- [ ] **TC-UI-015** DocChat AI logo and "AI-powered document Q&A" subtitle are visible in the header
- [ ] **TC-UI-016** Header is fixed and visible while scrolling through a long chat history
- [ ] **TC-UI-017** All three header action buttons (language, theme, logout) are accessible via keyboard

---

## General

- [ ] **TC-UI-018** Page title is "Document Chat - AI-Powered Q&A"
- [ ] **TC-UI-019** App logo/favicon is displayed in the browser tab
- [ ] **TC-UI-020** No visible layout breaks at 1280 × 720 viewport
- [ ] **TC-UI-021** No visible layout breaks at 1440 × 900 viewport
