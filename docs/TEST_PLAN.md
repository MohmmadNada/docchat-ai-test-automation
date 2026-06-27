# DocChat AI — Test Plan

## Application Overview

**URL:** https://sdet-chatbot.onrender.com  
**Description:** An AI-powered document Q&A chatbot. Users upload documents (TXT, PDF, DOCX ≤ 1 MB) and ask questions answered by an LLM grounded in the document content.

---

## Scope

### In Scope
- Authentication (login, logout, auth guard)
- Document upload (valid files, invalid type, oversized, drag-and-drop)
- Document management (add, remove single, clear all with confirmation)
- Chat functionality (suggested questions, typed questions, send button state)
- Web Search mode toggle
- UI / UX (dark mode, language switching EN ↔ AR, RTL layout, responsive)

### Out of Scope
- Backend / API-level testing
- Performance and load testing
- Accessibility audit (WCAG compliance)
- Mobile native apps

---

## Test Types

| Type | Tool | Location |
|---|---|---|
| E2E (UI) | Playwright + TypeScript | `tests/` |
| Exploratory | playwright-cli | manual |

---

## Test Data

| Data | Location |
|---|---|
| Valid credentials | `.env` (USER_NAME, USER_PASSWORD) |
| Sample documents | `data/documents/` |

---

## Known Bugs

See [`docs/BUGS.md`](BUGS.md) for the full confirmed bug list with reproduction steps and screenshots.

| ID | Area | Title | Priority |
|---|---|---|---|
| BUG-001 | File Upload | Empty .txt file accepted without error | P2 |
| BUG-002 | Login | Raw Zod validation error exposed to user | P2 |
| BUG-003 | Chat | Long unbroken text overflows chat bubble | P3 |
| BUG-004 | File Upload | UI advertises .doc support but server rejects it | P2 |

---

## Test Case Files

| File | Area |
|---|---|
| [TC_AUTH.md](test-cases/TC_AUTH.md) | Authentication |
| [TC_UPLOAD.md](test-cases/TC_UPLOAD.md) | Document Upload & Management |
| [TC_CHAT.md](test-cases/TC_CHAT.md) | Chat Functionality |
| [TC_UI.md](test-cases/TC_UI.md) | UI / UX |

---
